import assert from "node:assert/strict";
import test from "node:test";

import * as api from "../src/public-api.js";
import * as rawApi from "../src/5efdcc3e6fb071cbaffdcb117507a169dd76.js";
import * as browserCore from "../browser/pastafari-calendar-core.js";
import * as docs from "../docs/calendar-converters.js";
import {
  CALENDARS,
  FOUNDATION_JDN,
  bahaiWesternToJdn,
  copticToJdn,
  daysInHebrewMonth,
  daysInIslamicCivilMonth,
  ethiopicToJdn,
  fromJdn,
  hebrewToJdn,
  islamicCivilToJdn,
  isFixedThirteenLeapYear,
  isHebrewLeapYear,
  isIslamicCivilLeapYear,
  sakaToJdn,
} from "../verification/update9/proleptic-negative-year-reference.mjs";

const FOUNDATION_VECTORS = Object.freeze([
  Object.freeze({
    id: "hebrew",
    docsId: "hebrew",
    Class: "HebrewDate",
    specific: "hebrewToJdn",
    input: Object.freeze({ year: -37460n, month: 3, day: 19 }),
    values: Object.freeze({ year: "-37460", month: "3", day: "19" }),
  }),
  Object.freeze({
    id: "islamic-civil",
    docsId: "islamic-civil",
    Class: "IslamicCivilDate",
    specific: "islamicCivilToJdn",
    extraSpecific: "islamicToJdn",
    input: Object.freeze({ year: -43126n, month: 3, day: 27 }),
    values: Object.freeze({ year: "-43126", month: "3", day: "27" }),
  }),
  Object.freeze({
    id: "saka",
    docsId: "saka",
    Class: "SakaDate",
    specific: "sakaToJdn",
    input: Object.freeze({ year: -41299n, month: 10, day: 1 }),
    values: Object.freeze({ year: "-41299", month: "10", day: "1" }),
  }),
  Object.freeze({
    id: "ethiopic",
    docsId: "ethiopic",
    Class: "EthiopicDate",
    specific: "ethiopicToJdn",
    input: Object.freeze({ year: -41227n, month: 3, day: 1 }),
    values: Object.freeze({ year: "-41227", month: "3", day: "1" }),
  }),
  Object.freeze({
    id: "coptic",
    docsId: "coptic",
    Class: "CopticDate",
    specific: "copticToJdn",
    input: Object.freeze({ year: -41503n, month: 3, day: 1 }),
    values: Object.freeze({ year: "-41503", month: "3", day: "1" }),
  }),
  Object.freeze({
    id: "bahai-western",
    docsId: "bahai-western",
    Class: "BahaiDate",
    specific: "bahaiToJdn",
    options: Object.freeze({ variant: "western-arithmetic" }),
    input: Object.freeze({ year: -43064n, month: 15, day: 11 }),
    values: Object.freeze({ year: "-43064", month: "15", day: "11" }),
  }),
]);

function instance(ns, vector, input = vector.input) {
  const C = ns[vector.Class];
  if (vector.options) return new C(input.year, input.month, input.day, vector.options);
  return new C(input.year, input.month, input.day);
}

function docsInput(input) {
  return { year: String(input.year), month: String(input.month), day: String(input.day) };
}

function assertRoundTrip(calendarId, input, jdn) {
  const back = fromJdn(calendarId, jdn);
  assert.equal(back.year, input.year, `${calendarId} round-trip year`);
  assert.equal(back.month, input.month, `${calendarId} round-trip month`);
  assert.equal(back.day, input.day, `${calendarId} round-trip day`);
}

test("Update 9 Foundation vectors agree across reference, docs, Node public API, and browser core", () => {
  for (const vector of FOUNDATION_VECTORS) {
    const expected = CALENDARS[vector.id].toJdn(vector.input);
    assert.equal(expected, FOUNDATION_JDN, `${vector.id} reference Foundation`);
    assert.equal(docs.calendarDateToJdn(vector.docsId, vector.values), expected, `${vector.id} docs public converter`);

    for (const ns of [api, browserCore]) {
      const date = instance(ns, vector);
      assert.equal(ns[vector.specific](date), expected, `${vector.id} specific converter`);
      assert.equal(ns.calendarDateToJdn(date), expected, `${vector.id} generic converter`);
      if (vector.extraSpecific) assert.equal(ns[vector.extraSpecific](date), expected, `${vector.id} extra converter`);
    }
    assertRoundTrip(vector.id, vector.input, expected);
  }
});

test("Update 9 boundary sweep around signed year zero", () => {
  const cases = [
    ["hebrew", "hebrew", { month: 7, day: 1 }, "HebrewDate", "hebrewToJdn"],
    ["islamic-civil", "islamic-civil", { month: 1, day: 1 }, "IslamicCivilDate", "islamicCivilToJdn"],
    ["saka", "saka", { month: 1, day: 1 }, "SakaDate", "sakaToJdn"],
    ["ethiopic", "ethiopic", { month: 13, day: 5 }, "EthiopicDate", "ethiopicToJdn"],
    ["coptic", "coptic", { month: 13, day: 5 }, "CopticDate", "copticToJdn"],
    ["bahai-western", "bahai-western", { month: 1, day: 1 }, "BahaiDate", "bahaiToJdn"],
  ];
  for (const [id, docsId, md, className, specific] of cases) {
    for (const year of [-2n, -1n, 0n, 1n, 2n]) {
      const input = { year, ...md };
      const expected = CALENDARS[id].toJdn(input);
      assert.equal(docs.calendarDateToJdn(docsId, docsInput(input)), expected, `${id} docs year ${year}`);
      const vector = { Class: className, specific, options: id === "bahai-western" ? { variant: "western-arithmetic" } : null, input };
      for (const ns of [api, browserCore]) {
        const date = instance(ns, vector, input);
        assert.equal(ns[specific](date), expected, `${id} specific year ${year}`);
        assert.equal(ns.calendarDateToJdn(date), expected, `${id} generic year ${year}`);
      }
      assertRoundTrip(id, input, expected);
    }
  }
});

test("Update 9 negative leap and non-leap cases use mathematical modulo/floor semantics", () => {
  const hebrewLeap = [-20n, -19n, -18n, -17n, -16n, -15n, -14n].find(isHebrewLeapYear);
  const hebrewPlain = [-20n, -19n, -18n, -17n, -16n, -15n, -14n].find((year) => !isHebrewLeapYear(year));
  assert.ok(hebrewLeap !== undefined);
  assert.ok(hebrewPlain !== undefined);
  assert.equal(api.hebrewToJdn(new api.HebrewDate(hebrewLeap, 13, 1)), hebrewToJdn({ year: hebrewLeap, month: 13, day: 1 }));
  assert.throws(() => api.hebrewToJdn(new api.HebrewDate(hebrewPlain, 13, 1)), RangeError);
  assert.equal(daysInHebrewMonth(hebrewLeap, 13), 29);

  const islamicLeap = [-60n, -59n, -58n, -57n, -56n, -55n].find(isIslamicCivilLeapYear);
  const islamicPlain = [-60n, -59n, -58n, -57n, -56n, -55n].find((year) => !isIslamicCivilLeapYear(year));
  assert.ok(islamicLeap !== undefined);
  assert.ok(islamicPlain !== undefined);
  assert.equal(api.islamicCivilToJdn(new api.IslamicCivilDate(islamicLeap, 12, 30)), islamicCivilToJdn({ year: islamicLeap, month: 12, day: 30 }));
  assert.throws(() => api.islamicCivilToJdn(new api.IslamicCivilDate(islamicPlain, 12, 30)), RangeError);
  assert.equal(daysInIslamicCivilMonth(islamicLeap, 12), 30);

  const fixedLeap = -1n;
  const fixedPlain = -2n;
  assert.equal(isFixedThirteenLeapYear(fixedLeap), true);
  assert.equal(isFixedThirteenLeapYear(fixedPlain), false);
  assert.equal(api.ethiopicToJdn(new api.EthiopicDate(fixedLeap, 13, 6)), ethiopicToJdn({ year: fixedLeap, month: 13, day: 6 }));
  assert.equal(api.copticToJdn(new api.CopticDate(fixedLeap, 13, 6)), copticToJdn({ year: fixedLeap, month: 13, day: 6 }));
  assert.throws(() => api.ethiopicToJdn(new api.EthiopicDate(fixedPlain, 13, 6)), RangeError);
  assert.throws(() => api.copticToJdn(new api.CopticDate(fixedPlain, 13, 6)), RangeError);

  assert.equal(api.sakaToJdn(new api.SakaDate(-78n, 1, 31)), sakaToJdn({ year: -78n, month: 1, day: 31 }));
  assert.throws(() => api.sakaToJdn(new api.SakaDate(-77n, 1, 31)), RangeError);

  assert.equal(api.bahaiToJdn(new api.BahaiDate(-48n, "ayyami-ha", 5, { variant: "western-arithmetic" })), bahaiWesternToJdn({ year: -48n, month: "ayyami-ha", day: 5 }));
  assert.throws(() => api.bahaiToJdn(new api.BahaiDate(-47n, "ayyami-ha", 5, { variant: "western-arithmetic" })), RangeError);
});

test("Update 9 invalid fields are still rejected for non-positive years", () => {
  const invalids = [
    ["hebrew", () => api.hebrewToJdn(new api.HebrewDate(-37460n, 14, 1))],
    ["hebrew-day", () => api.hebrewToJdn(new api.HebrewDate(-37460n, 3, 31))],
    ["islamic-civil", () => api.islamicCivilToJdn(new api.IslamicCivilDate(-43126n, 12, 31))],
    ["saka", () => api.sakaToJdn(new api.SakaDate(-41299n, 13, 1))],
    ["ethiopic", () => api.ethiopicToJdn(new api.EthiopicDate(-41227n, 13, 7))],
    ["coptic", () => api.copticToJdn(new api.CopticDate(-41503n, 13, 7))],
    ["bahai-western-month", () => api.bahaiToJdn(new api.BahaiDate(-43064n, 20, 1, { variant: "western-arithmetic" }))],
    ["bahai-western-day", () => api.bahaiToJdn(new api.BahaiDate(-43064n, 1, 20, { variant: "western-arithmetic" }))],
  ];
  for (const [label, run] of invalids) assert.throws(run, RangeError, label);
  assert.throws(() => api.calendarDateToJdn({ calendar: "hebrew", year: -1n, month: 7, day: 1 }), RangeError);
});

test("Update 9 leaves positive-year authoritative behavior unchanged", () => {
  const positives = [
    ["hebrew", () => new api.HebrewDate(5786n, 5, 30), () => new rawApi.HebrewDate(5786n, 5, 30), "hebrewToJdn"],
    ["islamic-civil", () => new api.IslamicCivilDate(1448n, 2, 29), () => new rawApi.IslamicCivilDate(1448n, 2, 29), "islamicCivilToJdn"],
    ["saka", () => new api.SakaDate(1948n, 5, 22), () => new rawApi.SakaDate(1948n, 5, 22), "sakaToJdn"],
    ["ethiopic", () => new api.EthiopicDate(2018n, 12, 7), () => new rawApi.EthiopicDate(2018n, 12, 7), "ethiopicToJdn"],
    ["coptic", () => new api.CopticDate(1742n, 12, 7), () => new rawApi.CopticDate(1742n, 12, 7), "copticToJdn"],
    ["bahai", () => new api.BahaiDate(183n, 5, 13, { variant: "western-arithmetic" }), () => new rawApi.BahaiDate(183n, 5, 13, { variant: "western-arithmetic" }), "bahaiToJdn"],
  ];
  for (const [label, publicFactory, rawFactory, fn] of positives) {
    assert.equal(api[fn](publicFactory()), rawApi[fn](rawFactory()), `${label} specific positive parity`);
    assert.equal(api.calendarDateToJdn(publicFactory()), rawApi.calendarDateToJdn(rawFactory()), `${label} generic positive parity`);
  }
});

test("Update 9 leaves non-normative Tehran Baha'i negative path rejected", () => {
  assert.throws(
    () => docs.calendarDateToJdn("bahai-tehran", { year: "-43064", month: "15", day: "11" }),
    RangeError,
  );
  assert.throws(
    () => api.bahaiToJdn(new api.BahaiDate(-43064n, 15, 11, { variant: "tehran-equinox" })),
    RangeError,
  );
});

test("Update 9 deterministic random negative sample agrees with independent reference", () => {
  let state = 0x09c0ffee >>> 0;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
  const make = {
    hebrew(year) { return { year, month: 7, day: 1 + Number(next() % 29) }; },
    "islamic-civil"(year) { return { year, month: 1 + Number(next() % 12), day: 1 }; },
    saka(year) { return { year, month: 1 + Number(next() % 12), day: 1 }; },
    ethiopic(year) { return { year, month: 1 + Number(next() % 13), day: 1 }; },
    coptic(year) { return { year, month: 1 + Number(next() % 13), day: 1 }; },
    "bahai-western"(year) { return { year, month: 1 + Number(next() % 18), day: 1 + Number(next() % 19) }; },
  };
  const meta = new Map(FOUNDATION_VECTORS.map((v) => [v.id, v]));
  for (const id of Object.keys(make)) {
    for (let i = 0; i < 50; i += 1) {
      const year = -1n - BigInt(next() % 50_000);
      const input = make[id](year);
      const expected = CALENDARS[id].toJdn(input);
      const vector = meta.get(id);
      const date = instance(api, vector, input);
      assert.equal(api[vector.specific](date), expected, `${id} random specific ${i}`);
      assert.equal(api.calendarDateToJdn(date), expected, `${id} random generic ${i}`);
      assert.equal(docs.calendarDateToJdn(vector.docsId, docsInput(input)), expected, `${id} random docs ${i}`);
      assertRoundTrip(id, input, expected);
    }
  }
});
