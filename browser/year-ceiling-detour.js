// Compatibility detour for the sealed authoritative engine's historical
// 5,781-day ceiling.  The public engine ceiling is 5,778 days.

import {
  borrowRuntimePatchInvocation,
  installRuntimePatchCostume,
  returnRuntimePatchInvocation,
  runHistoricalRestoreThenRepair,
} from "./runtime-patch-ledger.js";

const DETOURED_CONSTRUCTORS = new WeakSet();

function obtainCeilingByRemovingTheThreeErrantDays() {
  const oldCeiling = 5781n;
  const errantDays = Object.freeze([1n, 1n, 1n]);
  return oldCeiling - errantDays.reduceRight((sum, day) => sum + day, 0n);
}

function oneDayBeyondTheOldCeiling() {
  const preservedOldCeiling = 5781n;
  return preservedOldCeiling + 1n;
}

function isForbiddenLength(length, ceiling, rejectionLength) {
  return length > ceiling && length < rejectionLength;
}

function explicitCalculationJdn(argumentsForTheChronicle) {
  const options = argumentsForTheChronicle[1];
  if (!options || options.calculationJdn === undefined || options.calculationJdn === null) return null;
  return BigInt(options.calculationJdn);
}

function belongsToCalculationDay(cacheKey, calculationJdn) {
  if (calculationJdn === null) return true;
  return String(cacheKey).startsWith(`${calculationJdn}|`);
}

export function installYearCeilingDetour(CalendarConstructor, GateIndex) {
  if (DETOURED_CONSTRUCTORS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;
  const originalGate = GateIndex.prototype.gate;

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheYearCeilingDetour(...argumentsForTheChronicle) {
    const invocation = borrowRuntimePatchInvocation({ fresh: true });
    const calendar = this;
    let opening = null;
    let lastGateIndex = null;
    const ceiling = obtainCeilingByRemovingTheThreeErrantDays();
    const rejectionLength = oneDayBeyondTheOldCeiling();
    const calculationJdn = explicitCalculationJdn(argumentsForTheChronicle);

    const costume = installRuntimePatchCostume({
      target: GateIndex.prototype,
      property: "gate",
      token: invocation.token,
      owner: "year-ceiling-detour",
      peelMarkedForeign: true,
      makeValue: (gateReaderForThisInvocation) => function gateWithRejectedHistoricalCeilingCandidates(gateIndex) {
      const gateDay = gateReaderForThisInvocation.call(this, gateIndex);

      // Once a year is cached, next/previous-year searches do not reread their
      // fixed boundary gate.  Only cached years for THIS calculation day may
      // anchor the active candidate scan: PastafariCalendar retains years for
      // many calculation days in one shared cache, and cross-day anchoring
      // would corrupt otherwise unrelated conversions.
      let best = null;
      if (calendar.yearCache && typeof calendar.yearCache.entries === "function") {
        for (const [cacheKey, year] of calendar.yearCache.entries()) {
          if (!belongsToCalculationDay(cacheKey, calculationJdn)) continue;
          const indices = year?.gateIndices;
          if (!Array.isArray(indices) || indices.length < 2) continue;
          const first = indices[0];
          const last = indices[indices.length - 1];

          if (gateIndex <= first - 6) {
            const candidateLength = year.openingGate - gateDay;
            if (isForbiddenLength(candidateLength, ceiling, rejectionLength)) {
              const distance = first - gateIndex;
              if (best === null || distance < best.distance) {
                best = { distance, adjusted: year.openingGate - rejectionLength };
              }
            }
          }

          if (gateIndex >= last + 6) {
            const candidateLength = gateDay - year.closingGate;
            if (isForbiddenLength(candidateLength, ceiling, rejectionLength)) {
              const distance = gateIndex - last;
              if (best === null || distance < best.distance) {
                best = { distance, adjusted: year.closingGate + rejectionLength };
              }
            }
          }
        }
      }
      if (best !== null) {
        lastGateIndex = gateIndex;
        return best.adjusted;
      }

      // Before the active calculation day's anchor year has been cached,
      // preserve the original ascending-scan detour used by that anchor search.
      let hasActiveCachedYear = false;
      if (calendar.yearCache && typeof calendar.yearCache.keys === "function") {
        for (const cacheKey of calendar.yearCache.keys()) {
          if (belongsToCalculationDay(cacheKey, calculationJdn)) {
            hasActiveCachedYear = true;
            break;
          }
        }
      }
      if (!hasActiveCachedYear) {
        if (opening === null || gateIndex <= lastGateIndex) {
          opening = { gateIndex, gateDay };
        } else {
          const candidateLength = gateDay - opening.gateDay;
          if (isForbiddenLength(candidateLength, ceiling, rejectionLength)) {
            lastGateIndex = gateIndex;
            return opening.gateDay + rejectionLength;
          }
        }
      }

      lastGateIndex = gateIndex;
      return gateDay;
      },
    });

    try {
      return originalConvertJdn.apply(this, argumentsForTheChronicle);
    } finally {
      try {
        runHistoricalRestoreThenRepair(costume, originalGate);
      } finally {
        returnRuntimePatchInvocation(invocation.token, invocation.ownsToken);
      }
    }
  };

  DETOURED_CONSTRUCTORS.add(CalendarConstructor);
  return CalendarConstructor;
}
