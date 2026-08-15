import assert from "node:assert/strict";
import test from "node:test";

import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";

function makeCachedScanFixture() {
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
        ["222|5000", {
          openingGate: 10000n,
          closingGate: 15000n,
          gateIndices: Array.from({ length: 11 }, (_, index) => 100 + index),
        }],
        // A deliberately unrelated calculation day.  It must never anchor
        // the scan for calculation day 222.
        ["111|5000", {
          openingGate: 999999n,
          closingGate: 1009999n,
          gateIndices: Array.from({ length: 11 }, (_, index) => 100 + index),
        }],
      ]);
    }

    convertJdn(_target, { calculationJdn, probe }) {
      void calculationJdn;
      return this.gates.gate(probe);
    }
  }

  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  return { FakeCalendar, FakeGateIndex, originalGate };
}

test("year-ceiling detour rejects forbidden cached candidates in both scan directions", () => {
  const { FakeCalendar, FakeGateIndex, originalGate } = makeCachedScanFixture();
  const calendar = new FakeCalendar();

  assert.equal(calendar.convertJdn(0n, { calculationJdn: 222n, probe: 85 }), 4218n);
  assert.equal(calendar.convertJdn(0n, { calculationJdn: 222n, probe: 86 }), 4222n);
  assert.equal(calendar.convertJdn(0n, { calculationJdn: 222n, probe: 124 }), 20778n);
  assert.equal(calendar.convertJdn(0n, { calculationJdn: 222n, probe: 125 }), 20782n);

  assert.equal(FakeGateIndex.prototype.gate, originalGate, "gate reader must be restored after conversion");
});

test("an unrelated cached calculation day does not disable a fresh anchor scan", () => {
  class FakeGateIndex {
    gate(index) {
      const special = new Map([
        [200, 10000n],
        [201, 15779n], // forbidden 5,779-day anchor candidate
        [202, 15778n], // allowed 5,778-day anchor candidate
      ]);
      return special.get(index) ?? BigInt(index);
    }
  }

  class FakeCalendar {
    constructor() {
      this.gates = new FakeGateIndex();
      this.yearCache = new Map([
        ["111|5000", {
          openingGate: 500000n,
          closingGate: 505000n,
          gateIndices: [10, 11, 12, 13, 14, 15, 16],
        }],
      ]);
    }

    convertJdn(_target, { calculationJdn, probes }) {
      void calculationJdn;
      return probes.map((probe) => this.gates.gate(probe));
    }
  }

  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();

  assert.deepEqual(
    calendar.convertJdn(0n, { calculationJdn: 222n, probes: [200, 201] }),
    [10000n, 15782n],
    "the forbidden 5,779-day anchor candidate must still be rejected even when another calculation day is cached",
  );

  assert.deepEqual(
    calendar.convertJdn(0n, { calculationJdn: 222n, probes: [200, 202] }),
    [10000n, 15778n],
    "the legal 5,778-day anchor candidate must remain unchanged",
  );
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
