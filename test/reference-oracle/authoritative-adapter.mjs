/**
 * Adapter for observations from the existing authoritative engine.
 *
 * IMPORTANT: this is runner-side code, not part of the reference oracle.
 * reference.mjs never imports this adapter or any production module.
 */
import {
  FOUNDATION_JDN as AUTHORITATIVE_FOUNDATION_JDN,
  GateIndex,
  GregorianDate,
  PastafariCalendar,
  dayNumber,
  makeSauceUncached,
} from "../../browser/pastafari-calendar-core.js";

function fixedToday() {
  return new GregorianDate(2000n, 1, 1);
}

function makeXorShift32(seed) {
  let state = Number(seed) >>> 0;
  if (state === 0) state = 0x6d2b79f5;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x1_0000_0000;
  };
}

/**
 * Run a synchronous observation while stubbing Math.random with a deterministic
 * PRNG.  The authoritative engine is intentionally allowed to keep all of its
 * random/noise machinery; the adapter merely makes the environment repeatable.
 */
export function withDeterministicMathRandom(seed, callback) {
  const previous = Math.random;
  Math.random = makeXorShift32(seed);
  try {
    return callback();
  } finally {
    Math.random = previous;
  }
}

export function observeAuthoritative(calculationJdn, targetJdn, options = {}) {
  const c = BigInt(calculationJdn);
  const t = BigInt(targetJdn);
  const seed = Number(options.randomSeed ?? 0x00c0ffee) >>> 0;

  return withDeterministicMathRandom(seed, () => {
    const rawSauce = makeSauceUncached(c, t);
    const response = rawSauce.responseCycle(1, 1);
    const gateChoice = rawSauce.chooseIndex(1, 1, 922);
    const result = {
      input: { calculationJdn: c, targetJdn: t },
      execution: {
        mathRandom: { mode: "xorshift32-stub", seed },
      },
      constants: { foundationJdn: AUTHORITATIVE_FOUNDATION_JDN },
      counters: {
        calculationDayNumber: dayNumber(c),
        targetDayNumber: dayNumber(t),
      },
      sauce: {
        final: {
          bowls: rawSauce.bowls.map((value) => BigInt(value)),
          lastDropPermutation: rawSauce.finalDropOrder.map((zeroBased) => Number(zeroBased) + 1),
        },
        // The current public authoritative surface does not expose per-drop or
        // per-stir internals.  Keep this explicitly absent rather than deriving
        // or fabricating an "authoritative" trace from another implementation.
        intermediate: undefined,
      },
      response: {
        bowl: 1,
        seal: 1n,
        first: BigInt(response.first),
        step: BigInt(response.step),
        choose922: BigInt(gateChoice),
      },
    };

    if (options.convertFinal) {
      const calendar = new PastafariCalendar({ todayProvider: fixedToday });
      const final = calendar.convertJdn(t, { calculationJdn: c });
      result.final = typeof final?.toJSON === "function" ? final.toJSON() : final;
    }

    if (Number.isSafeInteger(options.gateIndex)) {
      const gateIndex = new GateIndex();
      const index = options.gateIndex;
      const position = gateIndex.gate(index);
      let gap = null;
      if (index > 0) gap = position - gateIndex.gate(index - 1);
      if (index < 0) gap = gateIndex.gate(index + 1) - position;
      result.gate = { index, position, gap };
    }

    return result;
  });
}
