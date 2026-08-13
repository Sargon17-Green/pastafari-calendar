"use strict";

import {
  cutletIndexFromInternalName,
  monthIndexFromInternalName,
} from "../i18n/calendar-identifiers.js?v=7-search-compare";

const FAST_MODULE_URL = new URL("./pastafari-calendar-fast.js", import.meta.url);
const MAX_CUTLET_DAYS = 6_000;
let enginePromise = null;

function toBigInt(value, name) {
  if (typeof value === "bigint") return value;
  if (typeof value === "string" && /^[+-]?\d+$/.test(value)) return BigInt(value);
  throw new TypeError(`${name} must be a bigint or a decimal integer string.`);
}

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") {
    throw new TypeError("The fast calendar returned an invalid result.");
  }

  const dayInCutlet = Number(source.dayInCutlet);
  const dayInMonth = Number(source.dayInMonth);
  if (!Number.isSafeInteger(dayInCutlet) || dayInCutlet < 1) {
    throw new RangeError("The fast calendar returned an invalid dayInCutlet value.");
  }
  if (!Number.isSafeInteger(dayInMonth) || dayInMonth < 1) {
    throw new RangeError("The fast calendar returned an invalid dayInMonth value.");
  }

  const cutletName = String(source.cutletName);
  const monthName = String(source.monthName);
  return {
    year: String(source.year),
    cutletName,
    cutletIndex: cutletIndexFromInternalName(cutletName),
    dayInCutlet,
    monthName,
    monthIndex: monthIndexFromInternalName(monthName),
    dayInMonth,
  };
}

function serializeError(error) {
  return {
    name: error?.name || "Error",
    message: error?.message || String(error),
    code: error?.code || null,
  };
}

async function ensureEngine() {
  if (!enginePromise) {
    enginePromise = import(FAST_MODULE_URL.href).then((moduleNamespace) => {
      if (typeof moduleNamespace.getCutletView !== "function") {
        throw new TypeError("The fast module does not export getCutletView().");
      }
      return moduleNamespace;
    });
  }
  return enginePromise;
}

function normalizeCutletView(rawView, requestedTargetJdn) {
  if (!rawView || typeof rawView !== "object" || !Array.isArray(rawView.days)) {
    throw new TypeError("The fast module returned an invalid cutlet view.");
  }

  const selectedJdn = toBigInt(rawView.selectedJdn, "view.selectedJdn");
  const startJdn = toBigInt(rawView.startJdn, "view.startJdn");
  const endJdn = toBigInt(rawView.endJdn, "view.endJdn");
  const previousCutletJdn = toBigInt(rawView.previousCutletJdn, "view.previousCutletJdn");
  const nextCutletJdn = toBigInt(rawView.nextCutletJdn, "view.nextCutletJdn");

  if (selectedJdn !== requestedTargetJdn || endJdn < startJdn) {
    throw new RangeError("The fast cutlet view returned inconsistent bounds.");
  }

  const expectedLength = Number(endJdn - startJdn + 1n);
  if (
    !Number.isSafeInteger(expectedLength)
    || expectedLength < 1
    || expectedLength > MAX_CUTLET_DAYS
    || rawView.days.length !== expectedLength
  ) {
    throw new RangeError("The fast cutlet view returned an invalid number of days.");
  }

  const selectedIndex = Number(requestedTargetJdn - startJdn);
  if (
    !Number.isSafeInteger(selectedIndex)
    || selectedIndex < 0
    || selectedIndex >= expectedLength
    || rawView.selectedIndex !== selectedIndex
  ) {
    throw new RangeError("The fast cutlet view returned an invalid selected index.");
  }
  if (previousCutletJdn !== startJdn - 1n || nextCutletJdn !== endJdn + 1n) {
    throw new RangeError("The fast cutlet view returned invalid neighboring anchors.");
  }

  const days = rawView.days.map((rawDay, index) => {
    const expectedJdn = startJdn + BigInt(index);
    const jdn = toBigInt(rawDay?.jdn, `view.days[${index}].jdn`);
    if (jdn !== expectedJdn) {
      throw new RangeError("The fast cutlet view returned non-contiguous days.");
    }
    const value = canonical(rawDay);
    if (value.dayInCutlet !== index + 1) {
      throw new RangeError("The fast cutlet view returned an invalid day sequence.");
    }
    return { jdn, ...value };
  });

  const selected = days[selectedIndex];
  if (String(rawView.year) !== selected.year || String(rawView.cutletName) !== selected.cutletName) {
    throw new RangeError("The fast cutlet view header does not match its selected day.");
  }

  return {
    selectedJdn,
    selectedIndex,
    startJdn,
    endJdn,
    previousCutletJdn,
    nextCutletJdn,
    year: selected.year,
    cutletName: selected.cutletName,
    cutletIndex: selected.cutletIndex,
    days,
  };
}

function serializeDay(day) {
  return {
    jdn: day.jdn,
    year: day.year,
    cutletName: day.cutletName,
    cutletIndex: day.cutletIndex,
    dayInCutlet: day.dayInCutlet,
    monthName: day.monthName,
    monthIndex: day.monthIndex,
    dayInMonth: day.dayInMonth,
  };
}

function normalizeRangeBounds(payload) {
  const startJdn = toBigInt(payload.startJdn, "startJdn");
  const endJdn = toBigInt(payload.endJdn, "endJdn");
  if (endJdn < startJdn) throw new RangeError("endJdn must not be earlier than startJdn.");
  const length = Number(endJdn - startJdn + 1n);
  if (!Number.isSafeInteger(length) || length < 1 || length > MAX_CUTLET_DAYS) {
    throw new RangeError(`A comparison range must contain 1..${MAX_CUTLET_DAYS} days.`);
  }
  return { startJdn, endJdn, length };
}

function materializeRange(engine, payload) {
  const { startJdn, endJdn, length } = normalizeRangeBounds(payload);
  const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
  const days = new Array(length);
  let targetJdn = startJdn;
  let outputIndex = 0;

  while (targetJdn <= endJdn) {
    const view = normalizeCutletView(
      engine.getCutletView(targetJdn, { calculationJdn }),
      targetJdn,
    );
    const firstIndex = Number(targetJdn - view.startJdn);
    const lastJdn = view.endJdn < endJdn ? view.endJdn : endJdn;
    const lastIndex = Number(lastJdn - view.startJdn);
    for (let index = firstIndex; index <= lastIndex; index += 1) {
      days[outputIndex] = serializeDay(view.days[index]);
      outputIndex += 1;
    }
    targetJdn = lastJdn + 1n;
  }

  if (outputIndex !== length) throw new RangeError("The fast range returned an invalid number of days.");
  return { startJdn, endJdn, calculationJdn, days };
}

export async function handlePastafariWorkerRequest(operation, payload = {}) {
  const engine = await ensureEngine();
  if (operation === "getCutletView") {
    const targetJdn = toBigInt(payload.targetJdn, "targetJdn");
    const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
    return normalizeCutletView(
      engine.getCutletView(targetJdn, { calculationJdn }),
      targetJdn,
    );
  }
  if (operation === "getRangeView") return materializeRange(engine, payload);
  throw new TypeError(`Unknown fast worker operation: ${String(operation)}`);
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
      const result = await handlePastafariWorkerRequest(message.operation, message.payload);
      globalThis.postMessage({ id: message.id, ok: true, result });
    } catch (error) {
      globalThis.postMessage({ id: message.id, ok: false, error: serializeError(error) });
    }
  });
}
