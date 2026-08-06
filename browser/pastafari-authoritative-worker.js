"use strict";

const CORE_MODULE_URL = new URL("./pastafari-calendar-core.js", import.meta.url);
const MAX_CUTLET_DAYS = 6_000;

let enginePromise = null;
let preloadError = null;

function toBigInt(value, name) {
  if (typeof value === "bigint") return value;
  if (typeof value === "string" && /^[+-]?\d+$/.test(value)) return BigInt(value);
  throw new TypeError(`${name} must be a bigint or a decimal integer string.`);
}

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") {
    throw new TypeError("The authoritative calendar returned an invalid result.");
  }

  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function serializeError(error) {
  return {
    name: error?.name || "Error",
    message: error?.message || String(error),
    code: error?.code || null,
    stack: error?.stack || "",
  };
}

async function createEngine() {
  if (preloadError) throw preloadError;

  const moduleNamespace = await import(CORE_MODULE_URL.href);
  if (typeof moduleNamespace.PastafariCalendar !== "function") {
    throw new TypeError("The authoritative module does not export PastafariCalendar.");
  }
  if (typeof moduleNamespace.GregorianDate !== "function") {
    throw new TypeError("The authoritative module does not export GregorianDate.");
  }

  // The authoritative package has a known default-today binding defect. Every
  // public request supplies calculationJdn explicitly, but a fixed provider is
  // still passed so constructing the calendar never touches that defective path.
  const fixedToday = () => new moduleNamespace.GregorianDate(2000n, 1, 1);
  const calendar = new moduleNamespace.PastafariCalendar({ todayProvider: fixedToday });

  if (typeof calendar.convertJdn !== "function") {
    throw new TypeError("The authoritative calendar does not implement convertJdn().");
  }

  return Object.freeze({ moduleNamespace, calendar });
}

function ensureEngine() {
  if (!enginePromise) {
    enginePromise = createEngine().catch((error) => {
      preloadError = error;
      throw error;
    });
  }
  return enginePromise;
}

function convertOne(calendar, targetJdn, calculationJdn) {
  return canonical(calendar.convertJdn(targetJdn, { calculationJdn }));
}

function deriveCutletView(calendar, targetJdn, calculationJdn) {
  const selected = convertOne(calendar, targetJdn, calculationJdn);
  if (!Number.isSafeInteger(selected.dayInCutlet) || selected.dayInCutlet < 1) {
    throw new RangeError("The authoritative calendar returned an invalid dayInCutlet value.");
  }

  const startJdn = targetJdn - BigInt(selected.dayInCutlet - 1);
  const days = [];

  for (let offset = 0; offset < MAX_CUTLET_DAYS; offset += 1) {
    const jdn = startJdn + BigInt(offset);
    const value = offset === selected.dayInCutlet - 1
      ? selected
      : convertOne(calendar, jdn, calculationJdn);

    if (offset > 0 && value.dayInCutlet === 1) break;
    if (value.dayInCutlet !== offset + 1) {
      throw new RangeError(
        `The authoritative calendar returned a non-contiguous cutlet at JDN ${jdn}.`,
      );
    }

    days.push({ jdn, ...value });
  }

  if (days.length === 0 || days.length === MAX_CUTLET_DAYS) {
    throw new RangeError("The authoritative cutlet exceeded the safety limit.");
  }

  const endJdn = startJdn + BigInt(days.length - 1);
  return {
    selectedJdn: targetJdn,
    selectedIndex: Number(targetJdn - startJdn),
    startJdn,
    endJdn,
    previousCutletJdn: startJdn - 1n,
    nextCutletJdn: endJdn + 1n,
    year: selected.year,
    cutletName: selected.cutletName,
    days,
  };
}

function convertRange(calendar, startJdn, count, calculationJdn) {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer.");
  }
  if (count > MAX_CUTLET_DAYS * 3) {
    throw new RangeError("The requested authoritative range is too large.");
  }

  const result = new Array(count);
  for (let index = 0; index < count; index += 1) {
    result[index] = convertOne(calendar, startJdn + BigInt(index), calculationJdn);
  }
  return result;
}

export async function handlePastafariWorkerRequest(operation, payload = {}) {
  const { calendar } = await ensureEngine();

  switch (operation) {
    case "convert": {
      const targetJdn = toBigInt(payload.targetJdn, "targetJdn");
      const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
      return convertOne(calendar, targetJdn, calculationJdn);
    }

    case "convertJdnRange": {
      const startJdn = toBigInt(payload.startJdn, "startJdn");
      const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
      return convertRange(calendar, startJdn, payload.count, calculationJdn);
    }

    case "getCutletView": {
      const targetJdn = toBigInt(payload.targetJdn, "targetJdn");
      const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
      return deriveCutletView(calendar, targetJdn, calculationJdn);
    }

    default:
      throw new TypeError(`Unknown authoritative worker operation: ${String(operation)}`);
  }
}

const isDedicatedWorker = (
  typeof DedicatedWorkerGlobalScope !== "undefined"
  && globalThis instanceof DedicatedWorkerGlobalScope
);

if (isDedicatedWorker) {
  globalThis.addEventListener("message", async (event) => {
    const message = event.data;
    if (!message || !Number.isSafeInteger(message.id)) return;

    try {
      const result = await handlePastafariWorkerRequest(
        message.operation,
        message.payload,
      );
      globalThis.postMessage({ id: message.id, ok: true, result });
    } catch (error) {
      globalThis.postMessage({
        id: message.id,
        ok: false,
        error: serializeError(error),
      });
    }
  });

  // Load the large authoritative module before announcing readiness. This keeps
  // the expensive import inside the worker and makes the router's startup state
  // accurately reflect whether the engine can actually answer requests.
  ensureEngine().then(
    () => globalThis.postMessage({ kind: "ready" }),
    (error) => {
      // Announce protocol readiness so a queued request receives the concrete
      // import error instead of being represented only as a startup timeout.
      globalThis.postMessage({ kind: "ready", degraded: true, error: serializeError(error) });
    },
  );
}
