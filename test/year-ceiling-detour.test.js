import assert from "node:assert/strict";
import test from "node:test";

import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";
import { installYearCeilingDetourDetour } from "../browser/year-ceiling-detour-detour.js";
import { installYearCeilingDetourDetourDetour } from "../browser/year-ceiling-detour-detour-detour.js";
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
  // This historical soak case ceased to be a discriminator after the corrected
  // gate artifacts were rebuilt.  Keep it as a regression that public and fast
  // agree on the current normative result instead of pinning the obsolete tuple.
  assert.deepEqual(actual, {
    year: "4998",
    cutletName: "קרן",
    dayInCutlet: 942,
    monthName: "שלושה חלקים מחמישה",
    dayInMonth: 65,
  });
});


test("detour-of-a-detour catches the first +1 anchor-matrix row before cardinality", () => {
  class FakeGateIndex {
    constructor(closeDay, staleOpeningDay) {
      this.closeDay = closeDay;
      this.staleOpeningDay = staleOpeningDay;
    }
    gate(index) {
      const positions = new Map([
        [12, this.staleOpeningDay + 1n],
        [11, 10_000n], // true first-row opening after the descending probe
        [10, this.staleOpeningDay], // opening incorrectly retained by the older detour
        [17, this.closeDay],
      ]);
      return positions.get(index) ?? BigInt(index);
    }
  }

  class FakeCalendar {
    constructor(closeDay, staleOpeningDay) {
      this.gates = new FakeGateIndex(closeDay, staleOpeningDay);
      this.yearCache = new Map();
    }
    convertJdn(_target, { calculationJdn }) {
      void calculationJdn;
      return [12, 11, 10, 11, 17].map((index) => this.gates.gate(index));
    }
  }

  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);

  const legal = new FakeCalendar(15_778n, 10_000n).convertJdn(0n, { calculationJdn: 1n });
  assert.equal(legal.at(-1), 15_778n, "5,778 must survive the first-row turn");

  for (const forbiddenClose of [15_779n, 15_780n, 15_781n]) {
    // Keep the older detour's stale opening exactly 5,778 days before the close
    // so it cannot reject this row by itself. The second detour must recognize
    // the true opening at gate 11 and poison the forbidden length.
    const staleOpeningDay = forbiddenClose - 5_778n;
    const values = new FakeCalendar(forbiddenClose, staleOpeningDay).convertJdn(0n, { calculationJdn: 1n });
    assert.equal(values.at(-1), 15_782n, `${forbiddenClose - 10_000n}-day first-row candidate must be poisoned`);
    assert.equal(FakeGateIndex.prototype.gate, originalGate, "both gate wrappers must restore after each conversion");
  }
});

test("detour-of-a-detour restores its nested gate wrapper after a throw and repeated calls", () => {
  class FakeGateIndex { gate(index) { return BigInt(index); } }
  class FakeCalendar {
    constructor() { this.gates = new FakeGateIndex(); this.yearCache = new Map(); this.calls = 0; }
    convertJdn() {
      this.calls += 1;
      this.gates.gate(3);
      this.gates.gate(2);
      this.gates.gate(1);
      this.gates.gate(2);
      if (this.calls === 1) throw new Error("second-detour fault injection");
      return this.gates.gate(8);
    }
  }
  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();
  assert.throws(() => calendar.convertJdn(0n, { calculationJdn: 9n }), /second-detour fault injection/);
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
  assert.equal(calendar.convertJdn(0n, { calculationJdn: 9n }), 8n);
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
});


test("third detour reverses stale cached-boundary poisoning without weakening the real ceiling", () => {
  class FakeGateIndex {
    gate(index) {
      const positions = new Map([
        // Forward: stale year ends at 110, active year ends at 116.
        [110, 10_000n],
        [116, 12_000n],
        [122, 15_780n], // stale length 5,780; active length 3,780 (legal)
        [123, 17_779n], // active length 5,779 (truly forbidden)
        // Backward: stale year opens at 200, active year opens at 194.
        [200, 30_000n],
        [194, 27_000n],
        [188, 24_220n], // stale length 5,780; active length 2,780 (legal)
        [187, 21_220n], // active length 5,780 (truly forbidden)
      ]);
      return positions.get(index) ?? BigInt(index);
    }
  }

  class FakeCalendar {
    constructor() {
      this.gates = new FakeGateIndex();
      this.yearCache = new Map([
        ["222|5000", { openingGate: 5_000n, closingGate: 10_000n, gateIndices: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110] }],
        ["222|5001", { openingGate: 10_000n, closingGate: 12_000n, gateIndices: [110, 111, 112, 113, 114, 115, 116] }],
        ["222|4999", { openingGate: 30_000n, closingGate: 35_000n, gateIndices: [200, 201, 202, 203, 204, 205, 206] }],
        ["222|4998", { openingGate: 27_000n, closingGate: 30_000n, gateIndices: [194, 195, 196, 197, 198, 199, 200] }],
      ]);
    }
    convertJdn(_target, { probes, calculationJdn }) {
      void calculationJdn;
      return probes.map((index) => this.gates.gate(index));
    }
  }

  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetourDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();

  assert.deepEqual(
    calendar.convertJdn(0n, { calculationJdn: 222n, probes: [122, 123] }),
    [15_780n, 17_782n],
    "forward stale poisoning must be undone, while the nearest active 5,779-day candidate stays poisoned",
  );
  assert.deepEqual(
    calendar.convertJdn(0n, { calculationJdn: 222n, probes: [188, 187] }),
    [24_220n, 21_218n],
    "backward stale poisoning must be undone, while the nearest active 5,780-day candidate stays poisoned",
  );
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
});

test("third detour restores its gate wrapper after exceptions and repeated calls", () => {
  class FakeGateIndex {
    gate(index) {
      const positions = new Map([[110, 10_000n], [116, 12_000n], [122, 15_780n]]);
      return positions.get(index) ?? BigInt(index);
    }
  }
  class FakeCalendar {
    constructor() {
      this.gates = new FakeGateIndex();
      this.calls = 0;
      this.yearCache = new Map([
        ["222|5000", { openingGate: 5_000n, closingGate: 10_000n, gateIndices: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110] }],
        ["222|5001", { openingGate: 10_000n, closingGate: 12_000n, gateIndices: [110, 111, 112, 113, 114, 115, 116] }],
      ]);
    }
    convertJdn(_target, { calculationJdn }) {
      void calculationJdn;
      this.calls += 1;
      const value = this.gates.gate(122);
      if (this.calls === 1) throw new Error("third-detour fault injection");
      return value;
    }
  }

  const originalGate = FakeGateIndex.prototype.gate;
  installYearCeilingDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetourDetourDetour(FakeCalendar, FakeGateIndex);
  installYearCeilingDetour(FakeCalendar, FakeGateIndex);
  const calendar = new FakeCalendar();
  assert.throws(() => calendar.convertJdn(0n, { calculationJdn: 222n }), /third-detour fault injection/);
  assert.equal(FakeGateIndex.prototype.gate, originalGate);
  for (let i = 0; i < 100; i += 1) {
    assert.equal(calendar.convertJdn(0n, { calculationJdn: 222n }), 15_780n);
    assert.equal(FakeGateIndex.prototype.gate, originalGate);
  }
});

test("multiple consecutive public next/previous selections match the independent reference entry-for-entry", {
  skip: !runRealRegression,
  timeout: 600_000,
}, async () => {
  const authoritative = await import("../browser/pastafari-calendar-core.js");
  const gates = new authoritative.GateIndex();
  const gateAt = (index) => gates.gate(index);
  const calculationJdn = 821_446n;

  const referenceYears = new Map();
  const containingGateIndex = gates.indexAtOrBefore(calculationJdn - 1n);
  let discovery = discoverYearCandidates({ mode: "anchor", calculationJdn, containingGateIndex, gateAt });
  let selection = selectYearCandidate({ calculationJdn, discovery });
  referenceYears.set(5000, { discovery, selection });

  let forward = selection.selectedCandidate;
  for (let year = 5001; year <= 5002; year += 1) {
    discovery = discoverYearCandidates({ mode: "next", fixedGateIndex: forward.closeGateIndex, gateAt });
    selection = selectYearCandidate({
      calculationJdn,
      discovery,
      selectionTargetJdn: gateAt(forward.closeGateIndex),
    });
    referenceYears.set(year, { discovery, selection });
    forward = selection.selectedCandidate;
  }

  let backward = referenceYears.get(5000).selection.selectedCandidate;
  for (let year = 4999; year >= 4998; year -= 1) {
    discovery = discoverYearCandidates({ mode: "previous", fixedGateIndex: backward.openGateIndex, gateAt });
    selection = selectYearCandidate({
      calculationJdn,
      discovery,
      selectionTargetJdn: gateAt(backward.openGateIndex),
    });
    referenceYears.set(year, { discovery, selection });
    backward = selection.selectedCandidate;
  }

  const makeCalendar = () => new authoritative.PastafariCalendar({
    todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1),
  });

  const compareCachedYears = (calendar) => {
    for (const [cacheKey, year] of calendar.yearCache.entries()) {
      if (!String(cacheKey).startsWith(`${calculationJdn}|`)) continue;
      const yearNumber = Number(String(cacheKey).split("|").at(-1));
      const reference = referenceYears.get(yearNumber);
      if (!reference) continue;
      const candidate = reference.selection.selectedCandidate;
      assert.equal(year.gateIndices[0], candidate.openGateIndex, `year ${yearNumber} opening gate index`);
      assert.equal(year.gateIndices.at(-1), candidate.closeGateIndex, `year ${yearNumber} closing gate index`);
      assert.equal(year.openingGate, candidate.openingGate, `year ${yearNumber} opening gate day`);
      assert.equal(year.closingGate, candidate.closingGate, `year ${yearNumber} closing gate day`);
      assert.equal(year.closingGate - year.openingGate, candidate.yearLength, `year ${yearNumber} length`);
    }
  };

  const forwardCalendar = makeCalendar();
  forwardCalendar.convertJdn(827_224n, { calculationJdn });
  compareCachedYears(forwardCalendar);
  assert.equal(forwardCalendar.yearCache.get(`${calculationJdn}|5002`).closingGate, 827_226n,
    "the historical stale-boundary +2 poisoning must not reappear");

  const backwardCalendar = makeCalendar();
  backwardCalendar.convertJdn(805_838n, { calculationJdn });
  compareCachedYears(backwardCalendar);
});

test("new public 5,778 discriminators match reference cardinality and fast final tuple", {
  skip: !runRealRegression,
  timeout: 600_000,
}, async () => {
  const authoritative = await import("../browser/pastafari-calendar-core.js");
  const fast = await import("../browser/pastafari-calendar-fast.js");
  const gates = new authoritative.GateIndex();
  const gateAt = (index) => gates.gate(index);
  const originalChoose = authoritative.SauceResult.prototype.chooseIndex;

  const cases = [
    {
      calculationJdn: -14_035_472n,
      targetJdn: -14_009_523n,
      cardinality: 77,
      selectedOneBased: 47,
      forbidden: [-1430, -1417, 5_780n],
      expected: { year: "5006", cutletName: "עקרב", dayInCutlet: 296, monthName: "רימון", dayInMonth: 89 },
    },
    {
      calculationJdn: -15_557_375n,
      targetJdn: -15_552_346n,
      cardinality: 32,
      selectedOneBased: 2,
      forbidden: [-4468, -4457, 5_781n],
      expected: null,
    },
  ];

  for (const fixture of cases) {
    const containingGateIndex = gates.indexAtOrBefore(fixture.calculationJdn - 1n);
    const discovery = discoverYearCandidates({
      mode: "anchor",
      calculationJdn: fixture.calculationJdn,
      containingGateIndex,
      gateAt,
    });
    const selection = selectYearCandidate({ calculationJdn: fixture.calculationJdn, discovery });
    assert.equal(discovery.cardinality, fixture.cardinality);
    assert.equal(selection.selectedOneBased, fixture.selectedOneBased);
    assert.equal(
      discovery.beforeFiltering.some((candidate) =>
        candidate.openGateIndex === fixture.forbidden[0]
        && candidate.closeGateIndex === fixture.forbidden[1]
        && candidate.yearLength === fixture.forbidden[2]),
      true,
    );
    assert.equal(
      discovery.afterFiltering.some((candidate) => candidate.yearLength > 5_778n),
      false,
    );

    const events = [];
    authoritative.SauceResult.prototype.chooseIndex = function observedChoice(bowl, seal, count) {
      const selected = originalChoose.call(this, bowl, seal, count);
      if (Number(bowl) === 1 && Number(seal) === 10) {
        events.push({ count: Number(count), selectedOneBased: Number(selected) + 1 });
      }
      return selected;
    };

    try {
      const makeCalendar = (namespace) => new namespace.PastafariCalendar({
        todayProvider: () => new namespace.GregorianDate(2000n, 1, 1),
      });
      const actual = makeCalendar(authoritative).convertJdn(fixture.targetJdn, { calculationJdn: fixture.calculationJdn }).toJSON();
      const expected = makeCalendar(fast).convertJdn(fixture.targetJdn, { calculationJdn: fixture.calculationJdn }).toJSON();
      assert.deepEqual(events.filter((event) => event.count === fixture.cardinality), [
        { count: fixture.cardinality, selectedOneBased: fixture.selectedOneBased },
      ]);
      assert.deepEqual(actual, expected);
      if (fixture.expected) assert.deepEqual(actual, fixture.expected);
    } finally {
      authoritative.SauceResult.prototype.chooseIndex = originalChoose;
    }
  }
});
