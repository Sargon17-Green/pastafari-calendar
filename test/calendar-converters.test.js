import assert from "node:assert/strict";
import test from "node:test";

import {
  CALENDAR_DEFINITIONS,
  calendarDateToJdn,
  gregorianToJdn,
  jdnToGregorian,
} from "../docs/calendar-converters.js";

test("the public date search exposes every calendar family already supported by the project", () => {
  assert.deepEqual(CALENDAR_DEFINITIONS.map(({ id }) => id), [
    "gregorian",
    "julian",
    "hebrew",
    "islamic-civil",
    "islamic-umalqura",
    "solar-hijri-official",
    "solar-hijri-arithmetic",
    "chinese",
    "hindu-old-solar",
    "hindu-old-lunar",
    "saka",
    "thai-buddhist",
    "ethiopic",
    "coptic",
    "japanese-imperial",
    "minguo",
    "bahai-tehran",
    "bahai-western",
    "maya-long-count",
  ]);
});

test("representative dates from every input calendar convert to the established JDN", () => {
  const vectors = [
    ["gregorian", { year: "2026", month: "8", day: "13" }, 2_461_266n],
    ["julian", { year: "2026", month: "7", day: "31" }, 2_461_266n],
    ["hebrew", { year: "5786", month: "5", day: "30" }, 2_461_266n],
    ["islamic-civil", { year: "1448", month: "2", day: "29" }, 2_461_267n],
    ["islamic-umalqura", { year: "1448", month: "3", day: "1" }, 2_461_267n],
    ["solar-hijri-official", { year: "1405", month: "6", day: "1" }, 2_461_276n],
    ["solar-hijri-arithmetic", { year: "1405", month: "5", day: "22" }, 2_461_266n],
    ["chinese", { relatedYear: "2026", month: "7", day: "1", leapMonth: false }, 2_461_266n],
    ["chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false }, -13_334_246n],
    ["hindu-old-solar", { year: "5127", month: "4", day: "30" }, 2_461_268n],
    ["hindu-old-lunar", { year: "5127", month: "5", day: "1", leapMonth: false }, 2_461_266n],
    ["saka", { year: "1948", month: "5", day: "22" }, 2_461_266n],
    ["thai-buddhist", { year: "2569", month: "8", day: "13" }, 2_461_266n],
    ["ethiopic", { year: "2018", month: "12", day: "7" }, 2_461_266n],
    ["coptic", { year: "1742", month: "12", day: "7" }, 2_461_266n],
    ["japanese-imperial", { era: "reiwa", year: "8", month: "8", day: "13" }, 2_461_266n],
    ["minguo", { year: "115", month: "8", day: "13" }, 2_461_266n],
    ["bahai-tehran", { year: "183", month: "5", day: "13" }, 2_461_209n],
    ["bahai-western", { year: "183", month: "5", day: "13" }, 2_461_209n],
    ["maya-long-count", { baktun: "13", katun: "0", tun: "13", uinal: "15", kin: "8", correlation: "584283" }, 2_461_271n],
  ];
  for (const [calendarId, values, expected] of vectors) {
    assert.equal(calendarDateToJdn(calendarId, values), expected, calendarId);
  }
});

test("Gregorian JDN conversion round-trips across ordinary and signed years", () => {
  for (const date of [
    { year: -400n, month: 2, day: 29 },
    { year: 1n, month: 1, day: 1 },
    { year: 2000n, month: 2, day: 29 },
    { year: 2026n, month: 8, day: 13 },
    { year: 10_000n, month: 12, day: 31 },
  ]) {
    assert.deepEqual(jdnToGregorian(gregorianToJdn(date)), date);
  }
});

test("Tehran-equinox boundary years follow the project's established day convention", () => {
  const starts = [
    [18, 2_400_856n],
    [84, 2_424_961n],
    [150, 2_449_068n],
    [183, 2_461_121n],
    [542, 2_592_243n],
    [575, 2_604_296n],
    [641, 2_628_401n],
    [740, 2_664_561n],
  ];
  for (const [year, expected] of starts) {
    assert.equal(
      calendarDateToJdn("bahai-tehran", { year: String(year), month: "1", day: "1" }),
      expected,
    );
  }
});

test("invalid civil and era dates are rejected rather than normalized silently", () => {
  assert.throws(() => calendarDateToJdn("gregorian", { year: "2025", month: "2", day: "29" }), RangeError);
  assert.throws(() => calendarDateToJdn("japanese-imperial", { era: "heisei", year: "1", month: "1", day: "7" }), RangeError);
  assert.throws(() => calendarDateToJdn("bahai-tehran", { year: "1157", month: "1", day: "1" }), RangeError);
});

test("Old Hindu Lunar leap flags are accepted only at the model's intercalary month", () => {
  assert.equal(
    calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "1", day: "1", leapMonth: false }),
    2_461_119n,
  );
  assert.throws(
    () => calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "1", day: "1", leapMonth: true }),
    RangeError,
  );

  assert.equal(
    calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "2", day: "1", leapMonth: true }),
    2_461_148n,
  );
  assert.equal(
    calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "2", day: "30", leapMonth: true }),
    2_461_177n,
  );
  assert.equal(
    calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "2", day: "1", leapMonth: false }),
    2_461_178n,
  );

  assert.doesNotThrow(
    () => calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "1", day: "30", leapMonth: false }),
  );
  assert.throws(
    () => calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "3", day: "1", leapMonth: true }),
    RangeError,
  );
  assert.doesNotThrow(
    () => calendarDateToJdn("hindu-old-lunar", { year: "5127", month: "3", day: "1", leapMonth: false }),
  );

  for (let month = 1; month <= 12; month += 1) {
    assert.throws(
      () => calendarDateToJdn("hindu-old-lunar", { year: "5126", month: String(month), day: "1", leapMonth: true }),
      RangeError,
      `year 5126 month ${month}`,
    );
  }
});

