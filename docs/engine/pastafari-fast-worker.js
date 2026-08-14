"use strict";

import {
  cutletIndexFromInternalName,
  monthIndexFromInternalName,
} from "../i18n/calendar-identifiers.js?v=8-year-structure";

const FAST_MODULE_URL = new URL("./pastafari-calendar-fast.js", import.meta.url);
const MAX_CUTLET_DAYS = 6_000;
const MAX_YEAR_DAYS = 5_778;
const MAX_YEAR_CUTLETS = 17;
let enginePromise = null;
const yearStructureCache = new Map();

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

function rememberYearStructure(key, structure) {
  if (yearStructureCache.has(key)) yearStructureCache.delete(key);
  yearStructureCache.set(key, structure);
  if (yearStructureCache.size > 8) yearStructureCache.delete(yearStructureCache.keys().next().value);
  return structure;
}

function collectYearStructure(engine, payload) {
  const targetJdn = toBigInt(payload.targetJdn, "targetJdn");
  const calculationJdn = toBigInt(payload.calculationJdn, "calculationJdn");
  const options = { calculationJdn };
  const selectedView = normalizeCutletView(engine.getCutletView(targetJdn, options), targetJdn);
  const year = selectedView.year;
  const cacheKey = `${calculationJdn.toString()}:${year}`;
  const cached = yearStructureCache.get(cacheKey);
  if (cached !== undefined) {
    yearStructureCache.delete(cacheKey);
    yearStructureCache.set(cacheKey, cached);
    return cached;
  }

  const views = [selectedView];
  let cursor = selectedView.previousCutletJdn;
  let foundStart = false;
  for (let attempt = 0; attempt < MAX_YEAR_CUTLETS; attempt += 1) {
    const view = normalizeCutletView(engine.getCutletView(cursor, options), cursor);
    if (view.year !== year) {
      foundStart = true;
      break;
    }
    if (view.nextCutletJdn !== views[0].startJdn) {
      throw new RangeError("Adjacent cutlets are not contiguous while building the year structure.");
    }
    views.unshift(view);
    cursor = view.previousCutletJdn;
  }
  if (!foundStart) throw new RangeError("The year contains more cutlets than the supported maximum.");

  cursor = selectedView.nextCutletJdn;
  let foundEnd = false;
  for (let attempt = 0; attempt < MAX_YEAR_CUTLETS; attempt += 1) {
    const view = normalizeCutletView(engine.getCutletView(cursor, options), cursor);
    if (view.year !== year) {
      foundEnd = true;
      break;
    }
    if (views.at(-1).nextCutletJdn !== view.startJdn) {
      throw new RangeError("Adjacent cutlets are not contiguous while building the year structure.");
    }
    views.push(view);
    cursor = view.nextCutletJdn;
  }
  if (!foundEnd) throw new RangeError("The year contains more cutlets than the supported maximum.");
  if (views.length < 6 || views.length > MAX_YEAR_CUTLETS) {
    throw new RangeError("The year returned an invalid cutlet count.");
  }

  const startJdn = views[0].startJdn;
  const endJdn = views.at(-1).endJdn;
  const length = Number(endJdn - startJdn + 1n);
  if (!Number.isSafeInteger(length) || length < 252 || length > MAX_YEAR_DAYS) {
    throw new RangeError("The year returned an invalid length.");
  }

  const cutlets = [];
  const monthsByIndex = new Map();
  let dayOfYear = 0;
  let previousMonthIndex = null;

  for (const view of views) {
    const cutletStart = dayOfYear + 1;
    for (const day of view.days) {
      dayOfYear += 1;
      if (day.year !== year) throw new RangeError("A cutlet crossed a year boundary unexpectedly.");
      const expectedJdn = startJdn + BigInt(dayOfYear - 1);
      if (day.jdn !== expectedJdn) throw new RangeError("Year days are not contiguous.");

      let month = monthsByIndex.get(day.monthIndex);
      if (!month) {
        month = {
          monthIndex: day.monthIndex,
          length: 0,
          firstDayOfYear: dayOfYear,
          lastDayOfYear: dayOfYear,
          runCount: 0,
        };
        monthsByIndex.set(day.monthIndex, month);
      }
      month.length += 1;
      month.lastDayOfYear = dayOfYear;
      if (day.dayInMonth !== month.length) {
        throw new RangeError("Month occurrence numbering is inconsistent within the year.");
      }
      if (day.monthIndex !== previousMonthIndex) month.runCount += 1;
      previousMonthIndex = day.monthIndex;
    }
    cutlets.push({
      cutletIndex: view.cutletIndex,
      startJdn: view.startJdn,
      endJdn: view.endJdn,
      length: view.days.length,
      startDayOfYear: cutletStart,
      endDayOfYear: dayOfYear,
    });
  }

  if (dayOfYear !== length) throw new RangeError("The materialized year length does not match its bounds.");
  const months = [...monthsByIndex.values()].map((month) => Object.freeze({ ...month }));
  if (months.length < 3 || months.length > 47) throw new RangeError("The year returned an invalid month count.");
  if (months.reduce((sum, month) => sum + month.length, 0) !== length) {
    throw new RangeError("Month lengths do not sum to the year length.");
  }

  return rememberYearStructure(cacheKey, Object.freeze({
    year,
    calculationJdn,
    startJdn,
    endJdn,
    length,
    cutletCount: cutlets.length,
    monthCount: months.length,
    cutlets: Object.freeze(cutlets.map((cutlet) => Object.freeze(cutlet))),
    months: Object.freeze(months),
  }));
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
  if (operation === "getYearStructure") return collectYearStructure(engine, payload);
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
