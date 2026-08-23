"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import * as published from "../src/public-api.js";
import * as browserCore from "../browser/pastafari-calendar-core.js";
import * as docs from "../docs/calendar-converters.js";
import { createIntlCalendarSemanticFirewall } from "../browser/intl-calendar-semantic-firewall.js";

const FOUNDATION_JDN = -13_334_246n;

function chineseFoundation(ns) {
  return new ns.ChineseDate(-41_221n, 1, 22, { leapMonth: false });
}

function patchIntlDateTimeFormat(replacement, run) {
  const original = Intl.DateTimeFormat;
  Intl.DateTimeFormat = replacement;
  try { return run(); } finally { Intl.DateTimeFormat = original; }
}

function assertNormativeChineseFoundation() {
  assert.equal(published.chineseToJdn(chineseFoundation(published)), FOUNDATION_JDN);
  assert.equal(published.calendarDateToJdn(chineseFoundation(published)), FOUNDATION_JDN);
  assert.equal(browserCore.chineseToJdn(chineseFoundation(browserCore)), FOUNDATION_JDN);
  assert.equal(browserCore.calendarDateToJdn(chineseFoundation(browserCore)), FOUNDATION_JDN);
}

test("Update 13 closes the browser-core Chinese Intl contamination", () => {
  assertNormativeChineseFoundation();
  assert.equal(docs.calendarDateToJdn("chinese", {
    relatedYear: "-41221", month: "1", day: "22", leapMonth: false,
  }), FOUNDATION_JDN);
});

test("Update 13 Intl fault scenarios A-D cannot change normative Chinese semantics", () => {
  let calls = 0;
  const scenarios = [
    function ThrowingDateTimeFormat() {
      calls += 1;
      throw new Error("UPDATE13_INTL_THROW");
    },
    function FakePartsDateTimeFormat() {
      calls += 1;
      return { formatToParts: () => [{ type: "year", value: "garbage" }] };
    },
    function WrongButShapedDateTimeFormat() {
      calls += 1;
      return { formatToParts: () => [
        { type: "relatedYear", value: "999999" },
        { type: "month", value: "12" },
        { type: "day", value: "30" },
      ] };
    },
    function AlienNamesDateTimeFormat() {
      calls += 1;
      return { formatToParts: () => [
        { type: "era", value: "ERA_FROM_HOST" },
        { type: "month", value: "HOST_MONTH" },
        { type: "day", value: "22" },
      ] };
    },
  ];

  for (const replacement of scenarios) {
    calls = 0;
    patchIntlDateTimeFormat(replacement, assertNormativeChineseFoundation);
    assert.equal(calls, 0, "normative Chinese route must not consult Intl.DateTimeFormat");
  }
});

test("Update 13 late Intl patching after module load is harmless to normative Chinese", () => {
  patchIntlDateTimeFormat(function LateForbiddenIntl() {
    throw new Error("late monkey patch reached");
  }, assertNormativeChineseFoundation);
});

test("Update 13 deterministic Chinese failure never falls back to a host answer", () => {
  let intlCalls = 0;
  patchIntlDateTimeFormat(function TemptingHostAnswer() {
    intlCalls += 1;
    return { formatToParts: () => [
      { type: "relatedYear", value: "-41221" },
      { type: "month", value: "1" },
      { type: "day", value: "22" },
    ] };
  }, () => {
    assert.throws(
      () => browserCore.chineseToJdn({ calendar: "chinese", relatedYear: -41_221n, month: 13, day: 22, leapMonth: false }),
      RangeError,
    );
  });
  assert.equal(intlCalls, 0);
});

test("Update 13 semantic firewall cannot be poisoned by a legacy host result", () => {
  class FakeChineseDate {
    constructor(relatedYear, month, day) {
      this.calendar = "chinese";
      this.relatedYear = relatedYear;
      this.month = month;
      this.day = day;
      this.leapMonth = false;
    }
  }
  let genericCalls = 0;
  let chineseCalls = 0;
  const firewall = createIntlCalendarSemanticFirewall({
    calendarDateToJdn() { genericCalls += 1; return 9_999_999n; },
    chineseToJdn() { chineseCalls += 1; return 9_999_999n; },
  }, { ChineseDate: FakeChineseDate });

  const value = new FakeChineseDate(-41_221n, 1, 22);
  const witness = firewall.legacyChineseWitness(value);
  assert.equal(witness.source, "host-intl");
  assert.equal(witness.normative, false);
  assert.equal(witness.tainted, true);
  assert.equal(witness.value, 9_999_999n);
  assert.equal(chineseCalls, 1);

  assert.equal(firewall.chineseToJdn(value), FOUNDATION_JDN);
  assert.equal(firewall.calendarDateToJdn(value), FOUNDATION_JDN);
  assert.equal(chineseCalls, 1, "poisoned legacy answer must not be consulted again");
  assert.equal(genericCalls, 0, "generic legacy dispatcher must not see normative Chinese traffic");
});

test("Update 13 leaves explicitly host-backed docs APIs host-backed", () => {
  let calls = 0;
  patchIntlDateTimeFormat(function HostUnavailable() {
    calls += 1;
    throw new Error("UPDATE13_HOST_INTL_UNAVAILABLE");
  }, () => {
    assert.throws(
      () => docs.calendarDateToJdn("islamic-umalqura", { year: "1448", month: "1", day: "1" }),
      RangeError,
    );
    assert.throws(
      () => docs.calendarDateToJdn("solar-hijri-official", { year: "1405", month: "1", day: "1" }),
      RangeError,
    );
  });
  assert.ok(calls >= 2, "host-backed APIs must continue consulting Intl");
});
