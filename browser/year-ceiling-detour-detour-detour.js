// A third turn around the year-ceiling maze.
//
// The historical detour deliberately scans every cached year for the active
// calculation day.  After more than one next/previous traversal that can make
// an older, non-active boundary poison a perfectly legal gate: a gate may be
// 5,779..5,781 days from some stale cached year while being legal relative to
// the nearest boundary that actually owns the current candidate scan.
//
// Do not simplify the older detours.  This wrapper keeps a gate reader from
// before the year-ceiling patches, lets the old detour tell its lie first, and
// only lies back when the nearest cached boundary proves that lie belongs to a
// stale year rather than to the active traversal.

import {
  borrowRuntimePatchInvocation,
  installRuntimePatchCostume,
  returnRuntimePatchInvocation,
  runHistoricalRestoreThenRepair,
} from "./runtime-patch-ledger.js";

const DETOURED_DETOURED_DETOURS = new WeakSet();

function explicitCalculationJdn(argumentsForTheChronicle) {
  const options = argumentsForTheChronicle[1];
  if (!options || options.calculationJdn === undefined || options.calculationJdn === null) return null;
  return BigInt(options.calculationJdn);
}

function belongsToCalculationDay(cacheKey, calculationJdn) {
  if (calculationJdn === null) return true;
  return String(cacheKey).startsWith(`${calculationJdn}|`);
}

function forbidden(length) {
  return length > 5_778n && length <= 5_781n;
}


function looksLikeHistoricalPoison(calendar, calculationJdn, gateIndex, claimedGateDay) {
  if (!calendar.yearCache || typeof calendar.yearCache.entries !== "function") return false;
  const rejectionLength = 5_782n;
  for (const [cacheKey, year] of calendar.yearCache.entries()) {
    if (!belongsToCalculationDay(cacheKey, calculationJdn)) continue;
    const indices = year?.gateIndices;
    if (!Array.isArray(indices) || indices.length < 2) continue;
    const first = indices[0];
    const last = indices[indices.length - 1];
    if (gateIndex <= first - 6 && claimedGateDay === year.openingGate - rejectionLength) return true;
    if (gateIndex >= last + 6 && claimedGateDay === year.closingGate + rejectionLength) return true;
  }
  return false;
}

function nearestCachedBoundary(calendar, calculationJdn, gateIndex, canonicalGateReader, gateThis) {
  if (!calendar.yearCache || typeof calendar.yearCache.entries !== "function") return null;

  let forward = null;
  let backward = null;
  for (const [cacheKey, year] of calendar.yearCache.entries()) {
    if (!belongsToCalculationDay(cacheKey, calculationJdn)) continue;
    const indices = year?.gateIndices;
    if (!Array.isArray(indices) || indices.length < 2) continue;

    const first = indices[0];
    const last = indices[indices.length - 1];
    if (gateIndex >= last + 6) {
      const distance = gateIndex - last;
      if (forward === null || distance < forward.distance) {
        forward = {
          direction: "forward",
          distance,
          boundaryIndex: last,
          boundaryDay: canonicalGateReader.call(gateThis, last),
        };
      }
    }
    if (gateIndex <= first - 6) {
      const distance = first - gateIndex;
      if (backward === null || distance < backward.distance) {
        backward = {
          direction: "backward",
          distance,
          boundaryIndex: first,
          boundaryDay: canonicalGateReader.call(gateThis, first),
        };
      }
    }
  }

  if (forward === null) return backward;
  if (backward === null) return forward;
  return forward.distance <= backward.distance ? forward : backward;
}

export function installYearCeilingDetourDetourDetour(CalendarConstructor, GateIndex) {
  if (DETOURED_DETOURED_DETOURS.has(CalendarConstructor)) return CalendarConstructor;

  const originalConvertJdn = CalendarConstructor.prototype.convertJdn;
  // Installation happens after gate-data shadowing and before the historical
  // year-ceiling detour.  Keep this reader as the private version of reality.
  const canonicalGateReader = GateIndex.prototype.gate;

  CalendarConstructor.prototype.convertJdn = function convertJdnThroughTheDetourAroundTheDetourAroundTheDetour(...argumentsForTheChronicle) {
    const invocation = borrowRuntimePatchInvocation();
    const calendar = this;
    const calculationJdn = explicitCalculationJdn(argumentsForTheChronicle);
    // At call time the outer historical detour has already installed its own
    // gate reader, so this is the value-producing liar we need to supervise.
    const gateReaderFromOlderDetour = GateIndex.prototype.gate;

    const costume = installRuntimePatchCostume({
      target: GateIndex.prototype,
      property: "gate",
      token: invocation.token,
      owner: "year-ceiling-detour-detour-detour",
      makeValue: (gateReaderForThisInvocation) => function gateSeenThroughTheThirdDetour(gateIndex) {
      const claimedGateDay = gateReaderForThisInvocation.call(this, gateIndex);
      // The historical detour can only manufacture a cached-boundary value at
      // exactly boundary ± 5,782.  Avoid rereading the canonical gate unless
      // the claimed value has that fingerprint; ordinary lookups stay on the
      // old spaghetti path with no extra gate read.
      if (!looksLikeHistoricalPoison(calendar, calculationJdn, gateIndex, claimedGateDay)) {
        return claimedGateDay;
      }

      const canonicalGateDay = canonicalGateReader.call(this, gateIndex);
      if (claimedGateDay === canonicalGateDay) return claimedGateDay;

      const activeBoundary = nearestCachedBoundary(
        calendar,
        calculationJdn,
        gateIndex,
        canonicalGateReader,
        this,
      );
      if (activeBoundary === null) return claimedGateDay;

      const activeLength = activeBoundary.direction === "forward"
        ? canonicalGateDay - activeBoundary.boundaryDay
        : activeBoundary.boundaryDay - canonicalGateDay;

      // If the nearest boundary really yields 5,779..5,781, the old lie is
      // legitimate and must survive.  Otherwise the mismatch was caused by a
      // stale cached year, so return the pre-ceiling gate value instead.
      return forbidden(activeLength) ? claimedGateDay : canonicalGateDay;
      },
    });

    try {
      return originalConvertJdn.apply(this, argumentsForTheChronicle);
    } finally {
      try {
        runHistoricalRestoreThenRepair(costume, gateReaderFromOlderDetour);
      } finally {
        returnRuntimePatchInvocation(invocation.token, invocation.ownsToken);
      }
    }
  };

  DETOURED_DETOURED_DETOURS.add(CalendarConstructor);
  return CalendarConstructor;
}
