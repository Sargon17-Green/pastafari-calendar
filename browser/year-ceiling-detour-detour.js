// A detour around the historical year-ceiling detour.
//
// The older detour deliberately leaves the sealed 5,781-day belief in place
// and poisons forbidden closing gates.  Its anchor scanner has one blind spot:
// after the preliminary descending opening-gate probe, the first real matrix
// row starts by moving one gate forward.  That single turn can be mistaken for
// a closing-gate probe, so a 5,779..5,781 candidate may be counted before the
// old detour poisons a later reread.
//
// Do not merge this into the old detour.  This layer exists specifically to
// make the detour-of-a-detour observable and independently removable.

import {
  borrowRuntimePatchInvocation,
  installRuntimePatchCostume,
  returnRuntimePatchInvocation,
  runHistoricalRestoreThenRepair,
} from "./runtime-patch-ledger.js";

const DETOURED_DETOURS = new WeakSet();

function threeLostDaysByTheScenicRoute() {
  return [1n, 1n, 1n].reduce((sum, crumb) => sum + crumb, 0n);
}

function shadowCeiling() {
  return 5781n - threeLostDaysByTheScenicRoute();
}

function rejectionReality() {
  return 5781n + 1n;
}

function forbidden(length) {
  return length > shadowCeiling() && length < rejectionReality();
}

function explicitCalculationJdn(argumentsForTheChronicle) {
  const options = argumentsForTheChronicle[1];
  if (!options || options.calculationJdn === undefined || options.calculationJdn === null) return null;
  return BigInt(options.calculationJdn);
}

function hasActiveYear(calendar, calculationJdn) {
  if (calculationJdn === null || !calendar.yearCache || typeof calendar.yearCache.keys !== "function") return false;
  const prefix = `${calculationJdn}|`;
  for (const key of calendar.yearCache.keys()) {
    if (String(key).startsWith(prefix)) return true;
  }
  return false;
}

export function installYearCeilingDetourDetour(CalendarConstructor, GateIndex) {
  if (DETOURED_DETOURS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheDetourAroundTheDetour(...argumentsForTheChronicle) {
    const invocation = borrowRuntimePatchInvocation();
    const calendar = this;
    const calculationJdn = explicitCalculationJdn(argumentsForTheChronicle);

    // Deliberately capture the gate reader at CALL time, not installation time.
    // The older year-ceiling detour is installed outside this wrapper and has
    // already replaced GateIndex.prototype.gate when execution reaches here.
    const gateReaderFromTheOlderDetour = GateIndex.prototype.gate;

    let previousGateIndex = null;
    let descendingRun = 0;
    let matrixHasTurnedTheCorner = false;
    let rowOpening = null;

    const costume = installRuntimePatchCostume({
      target: GateIndex.prototype,
      property: "gate",
      token: invocation.token,
      owner: "year-ceiling-detour-detour",
      makeValue: (gateReaderForThisInvocation) => function gateSeenThroughTheSecondDetour(gateIndex) {
      const gateDay = gateReaderForThisInvocation.call(this, gateIndex);

      // As soon as the active calculation day has a selected year, the older
      // detour's cache-aware next/previous machinery takes over.  This layer is
      // intentionally only the splint for the anchor matrix's first-row turn.
      if (hasActiveYear(calendar, calculationJdn)) {
        previousGateIndex = gateIndex;
        descendingRun = 0;
        matrixHasTurnedTheCorner = false;
        rowOpening = null;
        return gateDay;
      }

      if (previousGateIndex !== null) {
        const step = gateIndex - previousGateIndex;

        if (!matrixHasTurnedTheCorner) {
          if (step === -1) {
            descendingRun += 1;
          } else if (step === 1 && descendingRun >= 2) {
            // The preliminary opening scan just hit bottom and moved +1: this
            // is the first matrix-row opening that the old detour can miss.
            matrixHasTurnedTheCorner = true;
            rowOpening = { gateIndex, gateDay };
            descendingRun = 0;
          } else {
            descendingRun = step < 0 ? 1 : 0;
          }
        } else if (step < 0) {
          // Candidate rows restart by jumping back to their next opening gate.
          rowOpening = { gateIndex, gateDay };
        } else if (rowOpening !== null && gateIndex >= rowOpening.gateIndex + 6) {
          const candidateLength = gateDay - rowOpening.gateDay;
          if (forbidden(candidateLength)) {
            previousGateIndex = gateIndex;
            return rowOpening.gateDay + rejectionReality();
          }
        }
      }

      previousGateIndex = gateIndex;
      return gateDay;
      },
    });

    try {
      return originalConvertJdn.apply(this, argumentsForTheChronicle);
    } finally {
      try {
        runHistoricalRestoreThenRepair(costume, gateReaderFromTheOlderDetour);
      } finally {
        returnRuntimePatchInvocation(invocation.token, invocation.ownsToken);
      }
    }
  };

  DETOURED_DETOURS.add(CalendarConstructor);
  return CalendarConstructor;
}
