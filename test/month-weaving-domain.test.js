import assert from "node:assert/strict";
import test from "node:test";

import { MonthWeavingCounter } from "../src/public-api.js";
import { enumerateMonthWeavings } from "../verification/update14/month-weaving-reference.mjs";

function vectors({ maxMonths, maxLength, maxTotal }) {
  const result = [];
  for (let monthCount = 1; monthCount <= maxMonths; monthCount += 1) {
    const current = [];
    const visit = () => {
      if (current.length === monthCount) {
        if (current.reduce((sum, value) => sum + value, 0) <= maxTotal) {
          result.push([...current]);
        }
        return;
      }
      for (let length = 1; length <= maxLength; length += 1) {
        current.push(length);
        visit();
        current.pop();
      }
    };
    visit();
  }
  return result;
}

function compareLexicographically(left, right) {
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return left.length - right.length;
}

function seededGenerator(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
}

function randomBigIntBelow(next, limit) {
  if (limit <= 1n) return 0n;
  let value = 0n;
  for (let index = 0; index < 4; index += 1) {
    value = (value << 32n) | BigInt(next());
  }
  return value % limit;
}

function assertExactReference(lengths) {
  const expected = enumerateMonthWeavings(lengths);
  const counter = new MonthWeavingCounter(lengths);
  assert.equal(counter.count, BigInt(expected.length), `count mismatch for ${lengths}`);

  const seen = new Set();
  let previous = null;
  for (let index = 0; index < expected.length; index += 1) {
    const rank = BigInt(index);
    const actual = counter.unrank(rank);
    assert.deepEqual(actual, expected[index], `unrank mismatch for ${lengths} @ ${index}`);
    assert.equal(counter.rank(expected[index]), rank, `rank mismatch for ${lengths} @ ${index}`);
    assert.equal(counter.rank(actual), rank, `round-trip mismatch for ${lengths} @ ${index}`);
    if (previous !== null) {
      assert.ok(compareLexicographically(previous, actual) < 0, `non-monotone unrank for ${lengths}`);
    }
    previous = actual;
    const key = JSON.stringify(actual);
    assert.ok(!seen.has(key), `duplicate unrank output for ${lengths}`);
    seen.add(key);
  }
  assert.equal(seen.size, expected.length, `coverage mismatch for ${lengths}`);
}

test("MonthWeavingCounter reproduces the minimal historical ghost before the detour, and no longer exposes it", () => {
  const counter = new MonthWeavingCounter([2, 1]);
  assert.equal(counter.count, 1n);
  assert.deepEqual(counter.unrank(0n), [1, 1, 2]);
  assert.equal(counter.rank([1, 1, 2]), 0n);
  assert.throws(() => counter.unrank(1n), RangeError);
});

test("MonthWeavingCounter exhaustive small public domain equals the independent enumerator", () => {
  const domain = vectors({ maxMonths: 3, maxLength: 4, maxTotal: 9 });
  assert.equal(domain.length, 74);
  for (const lengths of domain) assertExactReference(lengths);
});

test("MonthWeavingCounter exact legal-domain reference cases preserve position-wise lexicographic order", () => {
  for (const lengths of [[4], [5], [4, 4], [4, 5], [5, 4], [4, 4, 4]]) {
    assertExactReference(lengths);
  }
});

test("MonthWeavingCounter legal month-length boundaries 4..123 have complete first/last rank round-trips", () => {
  for (let length = 4; length <= 123; length += 1) {
    const counter = new MonthWeavingCounter([length]);
    assert.equal(counter.count, 1n);
    const only = counter.unrank(0n);
    assert.equal(only.length, length);
    assert.equal(counter.rank(only), 0n);
  }

  const boundaryValues = [4, 5, 6, 31, 122, 123];
  for (const left of boundaryValues) {
    for (const right of boundaryValues) {
      const counter = new MonthWeavingCounter([left, right]);
      assert.ok(counter.count > 0n);
      const ranks = new Set([0n, counter.count - 1n]);
      if (counter.count > 1n) ranks.add(1n);
      if (counter.count > 2n) ranks.add(counter.count - 2n);
      ranks.add(counter.count / 2n);
      for (const rank of ranks) {
        const weaving = counter.unrank(rank);
        assert.equal(counter.rank(weaving), rank, `boundary round-trip ${left},${right} @ ${rank}`);
      }
    }
  }
});

test("MonthWeavingCounter fixed-seed public and legal property sweep has no holes", () => {
  const seed = 0x14c0ffee;
  const next = seededGenerator(seed);
  let operations = 0;

  for (let caseIndex = 0; caseIndex < 48; caseIndex += 1) {
    const legal = caseIndex < 28;
    const monthCount = legal ? 3 + (next() % 3) : 1 + (next() % 5);
    const lengths = Array.from({ length: monthCount }, () => {
      if (legal) return 4 + (next() % 28);
      return 1 + (next() % 12);
    });
    const counter = new MonthWeavingCounter(lengths);
    assert.ok(counter.count > 0n);

    const ranks = new Set([0n, counter.count - 1n]);
    for (let sample = 0; sample < 1; sample += 1) {
      ranks.add(randomBigIntBelow(next, counter.count));
    }
    let previousRank = null;
    let previousValue = null;
    for (const rank of [...ranks].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))) {
      const weaving = counter.unrank(rank);
      assert.equal(counter.rank(weaving), rank, `seed=${seed} lengths=${lengths} rank=${rank}`);
      if (previousRank !== null && previousRank < rank) {
        assert.ok(compareLexicographically(previousValue, weaving) < 0);
      }
      previousRank = rank;
      previousValue = weaving;
      operations += 2;
    }
  }

  assert.ok(operations >= 200);
});

test("MonthWeavingCounter count/rank boundaries keep exact BigInt behavior", () => {
  const counter = new MonthWeavingCounter([20, 20, 20]);
  assert.ok(counter.count > BigInt(Number.MAX_SAFE_INTEGER));
  for (const rank of [0n, 1n, counter.count - 2n, counter.count - 1n]) {
    assert.equal(counter.rank(counter.unrank(rank)), rank);
  }
});

test("MonthWeavingCounter out-of-range and integer coercion behavior stays bounded", () => {
  const counter = new MonthWeavingCounter([2, 1]);
  assert.throws(() => counter.unrank(-1), RangeError);
  assert.throws(() => counter.unrank(counter.count), RangeError);
  assert.throws(() => counter.unrank(counter.count + 1n), RangeError);
  assert.throws(() => counter.unrank(0.5), RangeError);
  assert.throws(() => counter.unrank(Number.NaN), RangeError);
  assert.throws(() => counter.unrank(Number.POSITIVE_INFINITY), RangeError);
  assert.deepEqual(counter.unrank("0"), [1, 1, 2]); // legacy runtime coercion; not in IntegerLike types
  assert.deepEqual(counter.unrank(0n), [1, 1, 2]);
});

test("MonthWeavingCounter invalid rank objects are rejected", () => {
  const counter = new MonthWeavingCounter([2, 1, 2]);
  for (const invalid of [[], [1], [1, 1, 2, 3, 2], [1, 1, 2, 3, 3, 3], [1, 1, 3, 2, 3]]) {
    assert.throws(() => counter.rank(invalid));
  }
  assert.throws(() => counter.rank("1,1,2,3,3"), TypeError);
  assert.throws(() => counter.rank([1, 1, 2, 3, 3.5]), TypeError);
});

test("MonthWeavingCounter accidental public mutation does not activate the singleton detour on stale constructor state", () => {
  const stale = new MonthWeavingCounter([2, 2]);
  stale.lengths = [2, 1];
  assert.equal(stale.count, 2n); // exact legacy behavior: h still belongs to [2,2]

  const poisoned = new MonthWeavingCounter([2, 1]);
  assert.equal(poisoned.count, 1n);
  poisoned.h[1][1] = 999999n;
  assert.equal(poisoned.count, 1n);
  assert.deepEqual(poisoned.unrank(0n), [1, 1, 2]);
});
