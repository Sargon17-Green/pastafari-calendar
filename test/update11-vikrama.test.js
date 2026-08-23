"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import {
  OldHinduLunarDate,
  OldHinduSolarDate,
  VikramaDate,
  calendarDateToJdn,
  hinduToJdn,
  jdnToVikrama,
  vikramaToJdn,
} from "pastafari-calendar";
import * as browserVikrama from "../browser/vikrama-api.js";
import { createVikramaDetour } from "../browser/vikrama-detour.js";
import {
  referenceJdnToVikrama,
  referenceVikramaToJdn,
} from "../verification/update11/vikrama-reference.mjs";

const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION = Object.freeze({
  year: -41_162n,
  month: 8,
  monthName: "Kārttika",
  leapMonth: false,
  tithi: 16,
  leapTithi: false,
});

function plain(value) {
  return {
    year: value.year,
    month: value.month,
    monthName: value.monthName,
    leapMonth: value.leapMonth,
    tithi: value.tithi,
    leapTithi: value.leapTithi,
  };
}

test("Update 11 Foundation discriminator matches the source-locked Vikrama reference", () => {
  assert.deepEqual(plain(jdnToVikrama(FOUNDATION_JDN)), FOUNDATION);
  assert.deepEqual(plain(referenceJdnToVikrama(FOUNDATION_JDN)), FOUNDATION);
  assert.equal(vikramaToJdn(new VikramaDate(-41_162n, 8, 16)), FOUNDATION_JDN);
  assert.equal(referenceVikramaToJdn(FOUNDATION), FOUNDATION_JDN);
  assert.equal(calendarDateToJdn({ calendar: "vikrama", year: -41_162n, month: 8, tithi: 16 }), FOUNDATION_JDN);
});

test("Update 11 neighbor days are 15/16/17 and are not a Foundation-only fixture", () => {
  const expected = [15, 16, 17];
  for (let offset = -1; offset <= 1; offset += 1) {
    const actual = jdnToVikrama(FOUNDATION_JDN + BigInt(offset));
    assert.equal(actual.year, -41_162n);
    assert.equal(actual.month, 8);
    assert.equal(actual.monthName, "Kārttika");
    assert.equal(actual.leapMonth, false);
    assert.equal(actual.tithi, expected[offset + 1]);
    assert.equal(actual.leapTithi, false);
  }
});

test("Update 11 differential samples the entire Foundation +/-1000-day window", () => {
  for (let offset = -1000; offset <= 1000; offset += 1) {
    const jdn = FOUNDATION_JDN + BigInt(offset);
    assert.deepEqual(plain(jdnToVikrama(jdn)), plain(referenceJdnToVikrama(jdn)), `JDN ${jdn}`);
  }
});

test("Update 11 bounded inverse round-trips boundaries, leap month and repeated tithi", () => {
  const vectors = [
    -13_339_223n, -13_339_222n, // year boundary
    -13_339_194n, -13_339_193n, // month boundary
    -13_338_456n, -13_338_455n, -13_338_440n, -13_338_426n, -13_338_425n, // leap month
    -13_339_246n, -13_339_245n, // repeated tithi pair vicinity
  ];
  for (const jdn of vectors) {
    const value = jdnToVikrama(jdn);
    assert.deepEqual(plain(value), plain(referenceJdnToVikrama(jdn)), `reference at ${jdn}`);
    assert.equal(vikramaToJdn(value), jdn, `round trip at ${jdn}`);
  }
  assert.equal(jdnToVikrama(-13_338_455n).leapMonth, true);
  assert.equal(jdnToVikrama(-13_338_425n).leapMonth, false);
  assert.equal(jdnToVikrama(-13_339_245n).leapTithi, true);
});

test("Update 11 omitted tithi is rejected instead of guessed", () => {
  assert.deepEqual(plain(jdnToVikrama(-13_339_236n)), {
    year: -41_176n, month: 12, monthName: "Phālguna", leapMonth: false, tithi: 16, leapTithi: false,
  });
  assert.deepEqual(plain(jdnToVikrama(-13_339_235n)), {
    year: -41_176n, month: 12, monthName: "Phālguna", leapMonth: false, tithi: 18, leapTithi: false,
  });
  assert.throws(
    () => vikramaToJdn(new VikramaDate(-41_176n, 12, 17, { leapMonth: false, leapTithi: false })),
    RangeError,
  );
});

test("Update 11 explicitly preserves signed years -2,-1,0,1,2", () => {
  const starts = new Map([
    [-2n, 1_699_555n],
    [-1n, 1_699_938n],
    [0n, 1_700_293n],
    [1n, 1_700_647n],
    [2n, 1_701_031n],
  ]);
  for (const [year, jdn] of starts) {
    const actual = jdnToVikrama(jdn);
    assert.equal(actual.year, year);
    assert.equal(actual.month, 1);
    assert.equal(actual.tithi, 1);
    assert.equal(vikramaToJdn(actual), jdn);
  }
});

test("Update 11 package-root and browser side-door APIs are identical", () => {
  const vectors = [FOUNDATION_JDN - 1000n, FOUNDATION_JDN - 1n, FOUNDATION_JDN, FOUNDATION_JDN + 1n, FOUNDATION_JDN + 1000n, 2_461_266n];
  for (const jdn of vectors) {
    assert.deepEqual(plain(browserVikrama.jdnToVikrama(jdn)), plain(jdnToVikrama(jdn)));
    assert.equal(browserVikrama.vikramaToJdn(browserVikrama.jdnToVikrama(jdn)), jdn);
  }
});

test("Update 11 leaves legacy Old Hindu outputs unchanged", () => {
  assert.equal(hinduToJdn(new OldHinduLunarDate(-41_162n, 8, 16, { leapMonth: false })), -14_446_099n);
  assert.equal(hinduToJdn(new OldHinduSolarDate(-41_162n, 8, 16)), -14_446_083n);
  assert.equal(hinduToJdn(new OldHinduLunarDate(5127n, 5, 1, { leapMonth: false })), 2_461_266n);
});

test("Update 11 legacy witness failure cannot silently return a Vikrama date", () => {
  class FakeOldHinduLunarDate {
    constructor(year, month, day, options) {
      Object.assign(this, { year, month, day, leapMonth: options?.leapMonth ?? false });
    }
  }
  const sentinel = new Error("legacy witness exploded");
  const throwing = createVikramaDetour({
    OldHinduLunarDate: FakeOldHinduLunarDate,
    hinduToJdn() { throw sentinel; },
  });
  assert.throws(() => throwing.jdnToVikrama(FOUNDATION_JDN), error => error === sentinel);
  assert.throws(() => throwing.vikramaToJdn(new VikramaDate(-41_162n, 8, 16)), error => error === sentinel);

  const malformed = createVikramaDetour({
    OldHinduLunarDate: FakeOldHinduLunarDate,
    hinduToJdn() { return "not-a-jdn"; },
  });
  assert.throws(() => malformed.jdnToVikrama(FOUNDATION_JDN), TypeError);
  assert.throws(() => malformed.vikramaToJdn(new VikramaDate(-41_162n, 8, 16)), TypeError);
});

test("Update 11 does not depend on Intl or Temporal for Vikrama arithmetic", () => {
  const intl = globalThis.Intl;
  const temporal = globalThis.Temporal;
  try {
    globalThis.Intl = new Proxy({}, { get() { throw new Error("Intl touched"); } });
    globalThis.Temporal = new Proxy({}, { get() { throw new Error("Temporal touched"); } });
    assert.deepEqual(plain(jdnToVikrama(FOUNDATION_JDN)), FOUNDATION);
    assert.equal(vikramaToJdn(new VikramaDate(-41_162n, 8, 16)), FOUNDATION_JDN);
  } finally {
    globalThis.Intl = intl;
    if (temporal === undefined) delete globalThis.Temporal;
    else globalThis.Temporal = temporal;
  }
});
