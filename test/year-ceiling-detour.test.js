import assert from "node:assert/strict";
import test from "node:test";

import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";

class FakeGateIndex {
  gate(index) {
    const special = new Map([
      [85, 4221n],   // 10000 - 4221 = 5779 (forbidden backward candidate)
      [86, 4222n],   // 10000 - 4222 = 5778 (allowed backward candidate)
      [124, 20778n], // 20778 - 15000 = 5778 (allowed forward candidate)
      [125, 20779n], // 20779 - 15000 = 5779 (forbidden forward candidate)
    ]);
    return special.get(index) ?? BigInt(index);
  }
}

const originalGate = FakeGateIndex.prototype.gate;

class FakeCalendar {
  constructor() {
    this.gates = new FakeGateIndex();
    this.yearCache = new Map([
      ["current", {
        openingGate: 10000n,
        closingGate: 15000n,
        gateIndices: Array.from({ length: 11 }, (_, index) => 100 + index),
      }],
    ]);
  }

  convertJdn(_target, { probe }) {
    return this.gates.gate(probe);
  }
}

installYearCeilingDetour(FakeCalendar, FakeGateIndex);

test("year-ceiling detour rejects forbidden candidates in both scan directions", () => {
  const calendar = new FakeCalendar();

  assert.equal(calendar.convertJdn(0n, { probe: 85 }), 4218n);   // 10000 - 5782
  assert.equal(calendar.convertJdn(0n, { probe: 86 }), 4222n);   // 5778 remains valid
  assert.equal(calendar.convertJdn(0n, { probe: 124 }), 20778n); // 5778 remains valid
  assert.equal(calendar.convertJdn(0n, { probe: 125 }), 20782n); // 15000 + 5782

  assert.equal(FakeGateIndex.prototype.gate, originalGate, "gate reader must be restored after conversion");
});

const runRealRegression = process.env.PASTAFARI_YEAR_CEILING_INTEGRATION === "1";

test("real backward-search regression from soak batch 37 case 3", {
  skip: !runRealRegression,
  timeout: 600_000,
}, async () => {
  const authoritative = await import("../browser/pastafari-calendar-core.js");
  const fast = await import("../browser/pastafari-calendar-fast.js");
  const calculationJdn = 3_663_448n;
  const targetJdn = 3_654_335n;

  const makeCalendar = (moduleNamespace) => new moduleNamespace.PastafariCalendar({
    todayProvider: () => new moduleNamespace.GregorianDate(2000n, 1, 1),
  });
  const canonical = (value) => value.toJSON?.() ?? value;

  const actual = canonical(makeCalendar(authoritative).convertJdn(targetJdn, { calculationJdn }));
  const expected = canonical(makeCalendar(fast).convertJdn(targetJdn, { calculationJdn }));

  assert.deepEqual(actual, expected);
  assert.deepEqual(actual, {
    year: "4997",
    cutletName: "אפר",
    dayInCutlet: 288,
    monthName: "חרטה",
    dayInMonth: 19,
  });
});
