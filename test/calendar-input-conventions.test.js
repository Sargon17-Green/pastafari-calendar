import assert from "node:assert/strict";
import test from "node:test";

import { CALENDAR_DEFINITIONS } from "../docs/calendar-converters.js";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  parseHebrewNumeral,
  usesTextualCalendarNumeral,
} from "../docs/calendar-input-conventions.js";

function monthField(calendarId) {
  const definition = CALENDAR_DEFINITIONS.find(({ id }) => id === calendarId);
  assert.ok(definition, `missing calendar definition: ${calendarId}`);
  const field = definition.fields.find(({ name }) => name === "month");
  assert.ok(field, `missing month field: ${calendarId}`);
  return field;
}

test("Hebrew day numerals accept traditional letter notation", () => {
  assert.equal(parseHebrewNumeral("א׳"), 1n);
  assert.equal(parseHebrewNumeral("י״ד"), 14n);
  assert.equal(parseHebrewNumeral("ט״ו"), 15n);
  assert.equal(parseHebrewNumeral("ט״ז"), 16n);
  assert.equal(parseHebrewNumeral("ל׳"), 30n);
  assert.equal(parseHebrewNumeral("30"), 30n);
});

test("Hebrew year numerals support omitted and explicit thousands", () => {
  assert.equal(parseHebrewNumeral("תשפ״ו", { year: true }), 5786n);
  assert.equal(parseHebrewNumeral("ה׳תשפ״ו", { year: true }), 5786n);
  assert.equal(parseHebrewNumeral("ה'תשפ\"ו", { year: true }), 5786n);
  assert.equal(parseHebrewNumeral("5786", { year: true }), 5786n);
  assert.equal(parseHebrewNumeral("ה׳", { year: true }), 5000n);
});

test("calendar-specific textual numerals are normalized without changing the converter API", () => {
  assert.deepEqual(
    normalizeCalendarInputValues("hebrew", { year: "תשפ״ו", month: "5", day: "ל׳" }),
    { year: "5786", month: "5", day: "30" },
  );
  assert.deepEqual(
    normalizeCalendarInputValues("japanese-imperial", { era: "reiwa", year: "元", month: "5", day: "1" }),
    { era: "reiwa", year: "1", month: "5", day: "1" },
  );
  assert.equal(usesTextualCalendarNumeral("hebrew", "year"), true);
  assert.equal(usesTextualCalendarNumeral("hebrew", "day"), true);
  assert.equal(usesTextualCalendarNumeral("hebrew", "month"), false);
  assert.equal(usesTextualCalendarNumeral("japanese-imperial", "year"), true);
  assert.equal(usesTextualCalendarNumeral("gregorian", "year"), false);
});

test("Hebrew month input uses names and distinguishes both Adar forms", () => {
  const choices = calendarMonthChoices("hebrew", monthField("hebrew"), "he-IL");
  assert.equal(choices.length, 13);
  assert.equal(choices[0].value, "1");
  assert.match(choices[0].label, /ניסן/u);
  assert.match(choices[6].label, /תשר/u);
  assert.match(choices[11].label, /אדר/u);
  assert.match(choices[12].label, /אדר/u);
  assert.notEqual(choices[11].label, choices[12].label);
});

test("named-month selectors are available for the supported civil calendar families", () => {
  for (const calendarId of [
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
  ]) {
    const choices = calendarMonthChoices(calendarId, monthField(calendarId), "en");
    assert.ok(Array.isArray(choices) && choices.length >= 12, calendarId);
    assert.ok(choices.every(({ value, label }) => value && label), calendarId);
  }
});

test("Bahai and old Hindu month labels use their calendar names rather than bare ordinals", () => {
  const bahai = calendarMonthChoices("bahai-tehran", monthField("bahai-tehran"), "en");
  assert.equal(bahai[0].label, "Bahá");
  assert.equal(bahai[18].value, "ayyami-ha");
  assert.equal(bahai[18].label, "Ayyám-i-Há");
  assert.equal(bahai[19].label, "‘Alá’");

  const solar = calendarMonthChoices("hindu-old-solar", monthField("hindu-old-solar"), "en");
  const lunar = calendarMonthChoices("hindu-old-lunar", monthField("hindu-old-lunar"), "en");
  assert.equal(solar[0].label, "Meṣa");
  assert.equal(solar[11].label, "Mīna");
  assert.equal(lunar[0].label, "Caitra");
  assert.equal(lunar[11].label, "Phālguna");
});
