// Do not straighten this detour.  The authoritative engine is intentionally
// sealed in the Polish-chronicle wrapper, so the ceiling is enforced at the
// gate-reader seam rather than by editing its protected candidate search.
//
// A candidate begins by reading its opening gate and then reads later closing
// gates in ascending index order.  For the three now-forbidden lengths we lend
// the closing gate one day, just for that comparison.  The sealed engine then
// rejects it through its existing “too long” branch.  The original gate reader
// is restored before control returns, including when the conversion throws.

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

export function installYearCeilingDetour(CalendarConstructor, GateIndex) {
  if (DETOURED_CONSTRUCTORS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;
  const originalGate = GateIndex.prototype.gate;

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheYearCeilingDetour(...argumentsForTheChronicle) {
    let opening = null;
    let lastGateIndex = null;
    const ceiling = obtainCeilingByRemovingTheThreeErrantDays();
    const rejectionLength = oneDayBeyondTheOldCeiling();

    GateIndex.prototype.gate = function gateWithBorrowedClosingDay(gateIndex) {
      const gateDay = originalGate.call(this, gateIndex);

      if (opening === null || gateIndex <= lastGateIndex) {
        opening = { gateIndex, gateDay };
      } else {
        const candidateLength = gateDay - opening.gateDay;
        if (candidateLength > ceiling && candidateLength < rejectionLength) {
          lastGateIndex = gateIndex;
          return opening.gateDay + rejectionLength;
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
