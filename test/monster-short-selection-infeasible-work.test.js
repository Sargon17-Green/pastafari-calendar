"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import {
  M,
  PastafariCalendar,
  ResponseCycle,
} from "../src/public-api.js";
import {
  M as BROWSER_M,
  ResponseCycle as BrowserResponseCycle,
} from "../browser/pastafari-calendar-core.js";
import {
  MONSTER_INFEASIBLE_LITERAL_REJECTIONS,
} from "../browser/short-selection-infeasible-work-detour.js";

function literalSmall(m, n, first, step) {
  const limit = Math.floor(m / n) * n;
  let accepted = first;
  let discarded = 0;
  while (accepted > limit) {
    discarded += 1;
    accepted += step;
    if (accepted > m) accepted = 1;
    if (accepted < 1) accepted = m;
  }
  return {
    accepted,
    discarded,
    choice: 1 + ((accepted - 1) % n),
  };
}

function shortcutSmall(m, n, first, step) {
  const limit = Math.floor(m / n) * n;
  const accepted = first <= limit ? first : step > 0 ? 1 : limit;
  const discarded = first <= limit
    ? 0
    : step > 0
      ? m - first + 1
      : first - limit;
  return {
    accepted,
    discarded,
    choice: 1 + ((accepted - 1) % n),
  };
}

function productionShortcutIndex(first, step, count) {
  const limit = count * (M / count);
  const accepted = first <= limit ? first : step > 0n ? 1n : limit;
  return (accepted - 1n) % count;
}

function withNodeValueCounter(run) {
  const descriptor = Object.getOwnPropertyDescriptor(ResponseCycle.prototype, "value");
  assert.equal(typeof descriptor?.value, "function");
  let calls = 0;
  Object.defineProperty(ResponseCycle.prototype, "value", {
    ...descriptor,
    value(...args) {
      calls += 1;
      return descriptor.value.apply(this, args);
    },
  });
  try {
    return run(() => calls);
  } finally {
    Object.defineProperty(ResponseCycle.prototype, "value", descriptor);
  }
}

test("small-domain literal walker equals the closed-form exception exhaustively", () => {
  let cases = 0;
  for (let m = 2; m <= 200; m += 1) {
    for (let n = 1; n <= m; n += 1) {
      const limit = Math.floor(m / n) * n;
      for (let first = 1; first <= m; first += 1) {
        for (const step of [1, -1]) {
          let literalAccepted = first;
          let literalDiscarded = 0;
          while (literalAccepted > limit) {
            literalDiscarded += 1;
            literalAccepted += step;
            if (literalAccepted > m) literalAccepted = 1;
            if (literalAccepted < 1) literalAccepted = m;
          }

          const shortcutAccepted = first <= limit ? first : step > 0 ? 1 : limit;
          const shortcutDiscarded = first <= limit
            ? 0
            : step > 0
              ? m - first + 1
              : first - limit;
          const literalChoice = 1 + ((literalAccepted - 1) % n);
          const shortcutChoice = 1 + ((shortcutAccepted - 1) % n);

          if (literalAccepted !== shortcutAccepted
              || literalDiscarded !== shortcutDiscarded
              || literalChoice !== shortcutChoice) {
            throw new Error(`exhaustive mismatch m=${m} n=${n} first=${first} step=${step}`);
          }
          cases += 1;
        }
      }
    }
  }
  assert.equal(cases, 5_373_398);
});
test("explicit short-selection boundaries stay exact", () => {
  const checks = [
    [17, 1, 17, 1],
    [17, 17, 17, -1],
    [18, 6, 18, 1],
    [17, 6, 1, 1],
    [17, 6, 12, -1],
    [17, 6, 13, 1],
    [17, 6, 17, -1],
    [13, 6, 13, 1],
    [199, 100, 101, 1],
    [199, 100, 199, -1],
  ];
  for (const [m, n, first, step] of checks) {
    assert.deepEqual(shortcutSmall(m, n, first, step), literalSmall(m, n, first, step));
  }
});

test("ordinary Monster rejection remains a literal response-by-response walk", () => {
  withNodeValueCounter((getCalls) => {
    const noRejection = new ResponseCycle(1n, 1);
    assert.equal(noRejection.chooseIndex(2n), 0n);
    assert.equal(getCalls(), 0);

    const forward = new ResponseCycle(M, 1);
    assert.equal(forward.chooseIndex(2n), 0n);
    assert.equal(getCalls(), 1);

    const remainder97 = M % 97n;
    const backward = new ResponseCycle(M, -1);
    assert.equal(backward.chooseIndex(97n), productionShortcutIndex(M, -1n, 97n));
    assert.equal(BigInt(getCalls()), 1n + remainder97);
  });
});

test("only infeasible short rejection skips the literal calls", () => {
  assert.equal(
    MONSTER_INFEASIBLE_LITERAL_REJECTIONS,
    441_797_328_000_000_000_000_000_000_000_000_000n,
  );
  const count = 1n << 126n;
  const limit = count * (M / count);
  assert.equal(limit, count);
  assert.ok(M - limit > MONSTER_INFEASIBLE_LITERAL_REJECTIONS);

  withNodeValueCounter((getCalls) => {
    const forward = new ResponseCycle(limit + 1n, 1);
    assert.equal(forward.chooseIndex(count), 0n);
    assert.equal(getCalls(), 0);

    const backward = new ResponseCycle(M, -1);
    assert.equal(backward.chooseIndex(count), count - 1n);
    assert.equal(getCalls(), 0);
  });
});

test("browser Monster receives the same short-selection detour", () => {
  assert.equal(BROWSER_M, M);
  const count = 2n;
  assert.equal(new BrowserResponseCycle(BROWSER_M, 1).chooseIndex(count), 0n);
  assert.equal(new BrowserResponseCycle(BROWSER_M, -1).chooseIndex(count), 1n);
});

test("hundreds of feasible real-M short rejections match the proven shortcut", () => {
  let compared = 0;
  for (let number = 2n; number <= 200n; number += 1n) {
    const limit = number * (M / number);
    if (limit === M) continue;
    for (const first of [limit + 1n, M]) {
      for (const step of [1n, -1n]) {
        const cycle = new ResponseCycle(first, step > 0n ? 1 : -1);
        assert.equal(cycle.chooseIndex(number), productionShortcutIndex(first, step, number));
        compared += 1;
      }
    }
  }
  assert.ok(compared > 500);
});

test("JDN 2448569 proves the astronomical step count before the Monster conversion", () => {
  const count = 139_548_951_046_557_754_165_589_546_187_539_495_800n;
  const first = 164_777_961_037_519_603_196_145_524_973_598_792_859n;
  const limit = count * (M / count);
  const rejectedAnswers = first - limit;

  assert.equal(limit, count);
  assert.equal(rejectedAnswers, 25_229_009_990_961_849_030_555_978_786_059_297_059n);
  assert.ok(rejectedAnswers >= MONSTER_INFEASIBLE_LITERAL_REJECTIONS);

  const calendar = new PastafariCalendar();
  assert.deepEqual(
    calendar.convertJdn(2_448_569n, { calculationJdn: 2_448_569n }).toJSON(),
    {
      year: "5000",
      cutletName: "הכד הריק",
      dayInCutlet: 128,
      monthName: "ערפל",
      dayInMonth: 27,
    },
  );
});
