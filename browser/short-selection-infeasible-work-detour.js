// Monster-only detour for Scroll tablet 16 short selection.
//
// Ordinary rejected answers are still walked one by one through ResponseCycle.value().
// The Scroll's computational-note principle exemplified by footnote [^14] is used
// only after the exact amount of prescribed literal work has first been proved infeasible.
// This is not a general optimization license.  The bound below is
// deliberately absurd rather than a benchmark: grant the walker 10^18 rejected
// answers per second, continuously for fourteen billion years.  Reaching even that
// many answers is classified as work that cannot finish in any meaningful execution.
// No wall clock, CPU speed, timeout, cache, or Seer machinery participates.
export const MONSTER_INFEASIBLE_LITERAL_REJECTIONS =
  14_000_000_000n * 31_556_952n * 1_000_000_000_000_000_000n;

const alreadyFedThisNoodle = new WeakSet();

function exactRejectedAnswerCount(cycle, greatNumber, acceptanceLimit) {
  if (cycle.first <= acceptanceLimit) return 0n;
  return cycle.step > 0n
    ? greatNumber - cycle.first + 1n
    : cycle.first - acceptanceLimit;
}

function algebraicRankFromAccepted(accepted, count) {
  return (accepted - 1n) % count;
}
export function installMonsterShortSelectionInfeasibleWorkDetour(ResponseCycle, greatNumber) {
  if (typeof ResponseCycle !== "function" || typeof greatNumber !== "bigint" || greatNumber < 1n) {
    throw new TypeError("Monster short-selection detour needs ResponseCycle and the great number");
  }

  const prototype = ResponseCycle.prototype;
  if (!prototype || alreadyFedThisNoodle.has(prototype)) return ResponseCycle;

  const descriptor = Object.getOwnPropertyDescriptor(prototype, "chooseIndex");
  const fossilChooseIndex = descriptor?.value;
  if (typeof fossilChooseIndex !== "function") {
    throw new TypeError("Monster short-selection detour could not find chooseIndex");
  }

  Object.defineProperty(prototype, "chooseIndex", {
    ...descriptor,
    value(countInput) {
      // Let the sealed fossil do its old validation/ritual work first.  Its O(1)
      // clamp is not the authority for a rejected short choice below; the literal
      // walk (or the narrowly permitted infeasible-work exception) decides it.
      const fossilRank = fossilChooseIndex.call(this, countInput);
      const count = typeof countInput === "bigint" ? countInput : BigInt(countInput);

      // Wide Selection is a different Scroll rule.  Do not touch it here.
      if (count > greatNumber) return fossilRank;
      if (this.first < 1n || this.first > greatNumber) return fossilRank;

      const acceptanceLimit = count * (greatNumber / count);
      if (this.first <= acceptanceLimit) return fossilRank;
      const rejectedAnswers = exactRejectedAnswerCount(this, greatNumber, acceptanceLimit);
      let accepted;

      if (rejectedAnswers >= MONSTER_INFEASIBLE_LITERAL_REJECTIONS) {
        // Infeasible-work exception, not the ordinary algorithm.
        //
        // Proof of equivalence:
        // Rejected short answers are exactly the contiguous tail L+1..M.
        // If direction is forward and c>L, every c..M is rejected and the next
        // circular answer is 1, hence the first accepted answer is exactly 1.
        // If direction is backward and c>L, every c..L+1 is rejected and the
        // next answer is L, hence the first accepted answer is exactly L.
        // Therefore this branch returns precisely the answer that the literal
        // walk would reach; only the physically infeasible repeated steps vanish.
        accepted = this.step > 0n ? 1n : acceptanceLimit;
      } else {
        // Normal Monster path: actually ask for every next response, one by one.
        // Do not replace this with the closed form merely because it is faster.
        let offset = 0n;
        accepted = this.first;
        while (accepted > acceptanceLimit) {
          offset += 1n;
          accepted = this.value(offset);
        }
        if (offset !== rejectedAnswers) {
          throw new Error("Monster literal rejection walk lost its exact step count");
        }
      }
      const rank = algebraicRankFromAccepted(accepted, count);

      // The old clamp survives only as a sealed-fossil cross-check.  A mismatch
      // is a hard failure; it is never used to override the literal/exception path.
      if (rank !== fossilRank) {
        throw new Error("Monster short-selection detour disagrees with the sealed fossil");
      }
      return rank;
    },
  });

  alreadyFedThisNoodle.add(prototype);
  return ResponseCycle;
}
