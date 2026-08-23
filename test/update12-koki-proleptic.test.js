"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import * as published from "pastafari-calendar";
import * as browserCore from "../browser/koki-api.js";
import {
  calendarDateToJdn as docsCalendarDateToJdn,
  jdnToKoki as docsJdnToKoki,
  kokiToJdn as docsKokiToJdn,
} from "../docs/calendar-converters.js";
import {
  referenceJdnToKoki,
  referenceKokiToJdn,
} from "../verification/update12/reference-koki.mjs";

const FOUNDATION_JDN = -13_334_246n;

function plain(value) {
  return {
    system: value.system,
    calendar: value.calendar,
    year: value.year,
    month: value.month,
    day: value.day,
  };
}

test("Update 12 Foundation reproduces the Magillah Kōki anchor exactly", () => {
  const expected = { system: "koki", calendar: "koki", year: -40_561n, month: 12, day: 22 };
  assert.deepEqual(plain(referenceJdnToKoki(FOUNDATION_JDN)), expected);
  assert.deepEqual(plain(published.jdnToKoki(FOUNDATION_JDN)), expected);
  assert.deepEqual(plain(browserCore.jdnToKoki(FOUNDATION_JDN)), expected);
  assert.deepEqual(plain(docsJdnToKoki(FOUNDATION_JDN)), expected);
  assert.equal(published.kokiToJdn(new published.KokiDate(-40_561n, 12, 22)), FOUNDATION_JDN);
  assert.equal(browserCore.kokiToJdn(new browserCore.KokiDate(-40_561n, 12, 22)), FOUNDATION_JDN);
  assert.equal(docsKokiToJdn({ year: -40_561n, month: 12, day: 22 }), FOUNDATION_JDN);
  assert.equal(docsCalendarDateToJdn("koki", { year: "-40561", month: "12", day: "22" }), FOUNDATION_JDN);
});

test("Update 12 Kōki signed year zero semantics are explicit", () => {
  const vectors = [
    [{ year: -1n, month: 12, day: 31 }, { year: -1n, month: 12, day: 31 }],
    [{ year: 0n, month: 1, day: 1 }, { year: 0n, month: 1, day: 1 }],
    [{ year: 0n, month: 12, day: 31 }, { year: 0n, month: 12, day: 31 }],
    [{ year: 1n, month: 1, day: 1 }, { year: 1n, month: 1, day: 1 }],
    [{ year: 2n, month: 1, day: 1 }, { year: 2n, month: 1, day: 1 }],
  ];
  for (const [input, expected] of vectors) {
    const jdn = referenceKokiToJdn(input);
    const actual = published.jdnToKoki(jdn);
    assert.equal(actual.year, expected.year);
    assert.equal(actual.month, expected.month);
    assert.equal(actual.day, expected.day);
    assert.equal(published.kokiToJdn(new published.KokiDate(input.year, input.month, input.day)), jdn);
  }
});

test("Update 12 preserves Japanese imperial eras while Kōki remains a separate representation", () => {
  const boundaries = [
    ["meiji", 1n, 10, 23, 2_403_629n],
    ["taisho", 1n, 7, 30, 2_419_614n],
    ["showa", 1n, 12, 25, 2_424_875n],
    ["heisei", 1n, 1, 8, 2_447_535n],
    ["reiwa", 1n, 5, 1, 2_458_605n],
  ];
  for (const [era, year, month, day, expectedJdn] of boundaries) {
    assert.equal(
      published.japaneseImperialToJdn(new published.JapaneseImperialDate(era, year, month, day)),
      expectedJdn,
    );
  }

  const modernJdn = published.japaneseImperialToJdn(new published.JapaneseImperialDate("reiwa", 8n, 8, 23));
  assert.equal(modernJdn, 2_461_276n);
  assert.deepEqual(plain(published.jdnToKoki(modernJdn)), {
    system: "koki", calendar: "koki", year: 2686n, month: 8, day: 23,
  });
});

test("Update 12 Kōki is independent of Intl/ICU", () => {
  const original = Intl.DateTimeFormat;
  Intl.DateTimeFormat = function ForbiddenIntlDateTimeFormat() {
    throw new Error("Intl.DateTimeFormat must not be consulted by Kōki");
  };
  try {
    assert.deepEqual(plain(published.jdnToKoki(FOUNDATION_JDN)), {
      system: "koki", calendar: "koki", year: -40_561n, month: 12, day: 22,
    });
    assert.equal(published.kokiToJdn(new published.KokiDate(-40_561n, 12, 22)), FOUNDATION_JDN);
    assert.equal(docsCalendarDateToJdn("koki", { year: "-40561", month: "12", day: "22" }), FOUNDATION_JDN);
  } finally {
    Intl.DateTimeFormat = original;
  }
});

test("Update 12 rejects malformed Kōki inputs without widening unrelated validation", () => {
  for (const badYear of [NaN, Infinity, 1.5, {}, null, "1.5"]) {
    assert.throws(() => new published.KokiDate(badYear, 1, 1), TypeError);
  }
  assert.throws(() => new published.KokiDate(1n, 0, 1), RangeError);
  assert.throws(() => new published.KokiDate(1n, 13, 1), RangeError);
  assert.throws(() => new published.KokiDate(1n, 1, 0), RangeError);
  assert.throws(() => new published.KokiDate(1n, 2, 30), RangeError);
  assert.throws(() => published.kokiToJdn({ calendar: "not-koki", year: 1n, month: 1, day: 1 }), TypeError);
});

test("Update 12 public/browser/docs match the independent reference over ancient and modern samples", () => {
  const samples = [
    FOUNDATION_JDN - 1000n,
    FOUNDATION_JDN - 1n,
    FOUNDATION_JDN,
    FOUNDATION_JDN + 1n,
    FOUNDATION_JDN + 1000n,
    referenceKokiToJdn({ year: -2n, month: 1, day: 1 }),
    referenceKokiToJdn({ year: -1n, month: 1, day: 1 }),
    referenceKokiToJdn({ year: 0n, month: 1, day: 1 }),
    referenceKokiToJdn({ year: 1n, month: 1, day: 1 }),
    referenceKokiToJdn({ year: 2n, month: 1, day: 1 }),
    referenceKokiToJdn({ year: 2600n, month: 2, day: 29 }),
    referenceKokiToJdn({ year: 2660n, month: 2, day: 29 }),
    2_461_276n,
  ];
  for (const jdn of samples) {
    const expected = referenceJdnToKoki(jdn);
    assert.deepEqual(plain(published.jdnToKoki(jdn)), plain(expected));
    assert.deepEqual(plain(browserCore.jdnToKoki(jdn)), plain(expected));
    assert.deepEqual(plain(docsJdnToKoki(jdn)), plain(expected));
    assert.equal(published.kokiToJdn(published.jdnToKoki(jdn)), jdn);
  }
});
