// Compatibility detour for the sealed authoritative engine's historical
// 5,781-day ceiling.  The public engine ceiling is 5,778 days.

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

export function installYearCeilingDetour(CalendarConstructor, GateIndex) {
  if (DETOURED_CONSTRUCTORS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;
  const originalGate = GateIndex.prototype.gate;

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheYearCeilingDetour(...argumentsForTheChronicle) {
    const calendar = this;
    let opening = null;
    let lastGateIndex = null;
    const ceiling = obtainCeilingByRemovingTheThreeErrantDays();
    const rejectionLength = oneDayBeyondTheOldCeiling();

    GateIndex.prototype.gate = function gateWithRejectedHistoricalCeilingCandidates(gateIndex) {
      const gateDay = originalGate.call(this, gateIndex);

      // Once a year is cached, the sealed engine's next/previous-year searches
      // do not reread their fixed boundary gate.  Recover that boundary from
      // the cached YearBounds and reject 5,779..5,781-day candidates in either
      // direction.  Prefer the nearest matching boundary so adjacent cached
      // years cannot steal one another's candidate scan.
      let best = null;
      if (calendar.yearCache && typeof calendar.yearCache.values === "function") {
        for (const year of calendar.yearCache.values()) {
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

      // Before Year 5000 has been cached, preserve the original ascending-scan
      // detour used by the anchor candidate search.
      if (!calendar.yearCache || calendar.yearCache.size === 0) {
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
    };

    try {
      return originalConvertJdn.apply(this, argumentsForTheChronicle);
    } finally {
      GateIndex.prototype.gate = originalGate;
    }
  };

  DETOURED_CONSTRUCTORS.add(CalendarConstructor);
  return CalendarConstructor;
}
