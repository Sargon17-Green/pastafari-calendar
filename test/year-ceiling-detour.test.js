import assert from "node:assert/strict";
import test from "node:test";

import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";
import { discoverYearCandidates, selectYearCandidate } from "../verification/reference-oracle/reference.mjs";

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


test("year-ceiling detour poisons all three forbidden lengths but not 5,778", () => {
  class FakeGateIndex {
    gate(index) {
      const positions = new Map([
        [10, 10_000n],
        [16, 15_778n],
        [17, 15_779n],
        [18, 15_780n],
        [19, 15_781n],
      ]);
      return positions.get(index) ?? BigInt(index);
    }
  }
  class FakeCalendar {
    constructor() {
      this.gates = new FakeGateIndex();
      this.yearCache = new Map();
    }
    convertJdn(_target, { probes, calculationJdn }) {
      void calculationJdn;
      return probes.map((index) => this.gates.gate(index));
    }
  }
  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();
  assert.deepEqual(
    calendar.convertJdn(0n, { calculationJdn: 1n, probes: [10, 16, 10, 17, 10, 18, 10, 19] }),
    [10_000n, 15_778n, 10_000n, 15_782n, 10_000n, 15_782n, 10_000n, 15_782n],
  );
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
});

test("year-ceiling detour restores the gate reader after a thrown candidate search", () => {
  class FakeGateIndex { gate(index) { return BigInt(index); } }
  class FakeCalendar {
    constructor() { this.gates = new FakeGateIndex(); this.yearCache = new Map(); }
    convertJdn() { this.gates.gate(1); throw new Error("fault injection"); }
  }
  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();
  assert.throws(() => calendar.convertJdn(0n, { calculationJdn: 1n }), /fault injection/);
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
});

const runRealRegression = process.env.PASTAFARI_YEAR_CEILING_INTEGRATION === "1";

test("fresh corrected-gate anchor/next/previous candidate counts match the independent reference", {
  skip: !runRealRegression,
  timeout: 600_000,
}, async () => {
  const authoritative = await import("../browser/pastafari-calendar-core.js");
  const originalChoose = authoritative.SauceResult.prototype.chooseIndex;
  const events = [];
  authoritative.SauceResult.prototype.chooseIndex = function observedYearChoice(bowl, seal, count) {
    const selected = originalChoose.call(this, bowl, seal, count);
    if (Number(bowl) === 1 && [10, 11, 12].includes(Number(seal))) {
      events.push({ seal: Number(seal), count: Number(count), selectedOneBased: Number(selected) + 1 });
    }
    return selected;
  };

  const makeCalendar = () => new authoritative.PastafariCalendar({
    todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1),
  });
  const gates = new authoritative.GateIndex();
  const gateAt = (index) => gates.gate(index);
  const anchorReference = (calculationJdn) => {
    const containingGateIndex = gates.indexAtOrBefore(calculationJdn - 1n);
    const discovery = discoverYearCandidates({ mode: "anchor", calculationJdn, containingGateIndex, gateAt });
    const selection = selectYearCandidate({ calculationJdn, discovery });
    return { discovery, selection };
  };

  try {
    // Fresh anchor/cardinality discriminator. Historical 5,781 discovery has 42;
    // the normative set has 41 and chooses a different legal year.
    events.length = 0;
    const anchorC = -13_258_058n;
    const anchorRef = anchorReference(anchorC);
    assert.equal(anchorRef.discovery.cardinality, 41);
    assert.deepEqual(
      [anchorRef.selection.selectedCandidate.openGateIndex, anchorRef.selection.selectedCandidate.closeGateIndex, anchorRef.selection.selectedCandidate.yearLength],
      [139, 149, 4_785n],
    );
    const anchorCalendar = makeCalendar();
    const anchorActual = anchorCalendar.convertJdn(anchorC, { calculationJdn: anchorC });
    assert.deepEqual(events.filter((row) => row.seal === 10), [{ seal: 10, count: 41, selectedOneBased: 27 }]);
    assert.deepEqual(anchorCalendar.anchorCache.get(String(anchorC)).gateIndices, Array.from({ length: 11 }, (_, i) => 139 + i));
    assert.deepEqual(anchorActual.toJSON(), {
      year: "5000", cutletName: "אפר", dayInCutlet: 1, monthName: "נמר", dayInMonth: 81,
    });

    // Forward discriminator: fixed opening gate 147; the 5,779-day close at 156
    // must not enter the three-candidate normative set.
    events.length = 0;
    const nextC = -13_258_059n;
    const nextAnchor = anchorReference(nextC).selection.selectedCandidate;
    assert.equal(nextAnchor.closeGateIndex, 147);
    const nextDiscovery = discoverYearCandidates({ mode: "next", fixedGateIndex: 147, gateAt });
    const nextSelection = selectYearCandidate({ calculationJdn: nextC, discovery: nextDiscovery, selectionTargetJdn: gateAt(147) });
    assert.equal(nextDiscovery.cardinality, 3);
    assert.equal(nextDiscovery.beforeFiltering.some((candidate) => candidate.closeGateIndex === 156 && candidate.yearLength === 5_779n), true);
    assert.deepEqual([nextSelection.selectedCandidate.openGateIndex, nextSelection.selectedCandidate.closeGateIndex], [147, 153]);
    const nextCalendar = makeCalendar();
    const nextActual = nextCalendar.convertJdn(-13_258_058n, { calculationJdn: nextC });
    assert.deepEqual(events.filter((row) => row.seal === 11), [{ seal: 11, count: 3, selectedOneBased: 1 }]);
    assert.deepEqual(nextActual.toJSON(), {
      year: "5001", cutletName: "צחוק", dayInCutlet: 1, monthName: "טחול", dayInMonth: 1,
    });

    // Backward discriminator: fixed close gate 1163; the 5,781-day opening at
    // 1152 must be gone before the five-way seal-12 choice.
    events.length = 0;
    const previousC = -12_747_356n;
    const previousAnchor = anchorReference(previousC).selection.selectedCandidate;
    assert.equal(previousAnchor.openGateIndex, 1163);
    const previousDiscovery = discoverYearCandidates({ mode: "previous", fixedGateIndex: 1163, gateAt });
    const previousSelection = selectYearCandidate({ calculationJdn: previousC, discovery: previousDiscovery, selectionTargetJdn: gateAt(1163) });
    assert.equal(previousDiscovery.cardinality, 5);
    assert.equal(previousDiscovery.beforeFiltering.some((candidate) => candidate.openGateIndex === 1152 && candidate.yearLength === 5_781n), true);
    assert.deepEqual([previousSelection.selectedCandidate.openGateIndex, previousSelection.selectedCandidate.closeGateIndex], [1156, 1163]);
    const previousCalendar = makeCalendar();
    const previousActual = previousCalendar.convertJdn(-12_747_357n, { calculationJdn: previousC });
    assert.deepEqual(events.filter((row) => row.seal === 12), [{ seal: 12, count: 5, selectedOneBased: 2 }]);
    assert.deepEqual(previousActual.toJSON(), {
      year: "4999", cutletName: "צחוק", dayInCutlet: 143, monthName: "נמר", dayInMonth: 53,
    });
  } finally {
    authoritative.SauceResult.prototype.chooseIndex = originalChoose;
  }
});

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
