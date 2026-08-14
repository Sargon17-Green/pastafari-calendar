"use strict";

import {
  calendarDateToJdn,
  gregorianToJdn,
  jdnToGregorian,
} from "./calendar-converters.js?v=8-year-structure";

const HEBREW_VALUES = Object.freeze({
  "א": 1n,
  "ב": 2n,
  "ג": 3n,
  "ד": 4n,
  "ה": 5n,
  "ו": 6n,
  "ז": 7n,
  "ח": 8n,
  "ט": 9n,
  "י": 10n,
  "כ": 20n,
  "ך": 20n,
  "ל": 30n,
  "מ": 40n,
  "ם": 40n,
  "נ": 50n,
  "ן": 50n,
  "ס": 60n,
  "ע": 70n,
  "פ": 80n,
  "ף": 80n,
  "צ": 90n,
  "ץ": 90n,
  "ק": 100n,
  "ר": 200n,
  "ש": 300n,
  "ת": 400n,
});

const HEBREW_LETTERS = /^[א-תךםןףץ]+$/u;
const HEBREW_MARKS = /[\u0591-\u05bd\u05bf-\u05c7]/gu;
const HEBREW_PUNCTUATION = /["'׳״’‘“”]/gu;
const EXPLICIT_THOUSANDS = /^([א-תךםןףץ]+)[׳'’](.*)$/u;

const BAHAI_MONTHS = Object.freeze([
  Object.freeze({ value: "1", label: "Bahá" }),
  Object.freeze({ value: "2", label: "Jalál" }),
  Object.freeze({ value: "3", label: "Jamál" }),
  Object.freeze({ value: "4", label: "‘Aẓamat" }),
  Object.freeze({ value: "5", label: "Núr" }),
  Object.freeze({ value: "6", label: "Raḥmat" }),
  Object.freeze({ value: "7", label: "Kalimát" }),
  Object.freeze({ value: "8", label: "Kamál" }),
  Object.freeze({ value: "9", label: "Asmá’" }),
  Object.freeze({ value: "10", label: "‘Izzat" }),
  Object.freeze({ value: "11", label: "Mashíyyat" }),
  Object.freeze({ value: "12", label: "‘Ilm" }),
  Object.freeze({ value: "13", label: "Qudrat" }),
  Object.freeze({ value: "14", label: "Qawl" }),
  Object.freeze({ value: "15", label: "Masá’il" }),
  Object.freeze({ value: "16", label: "Sharaf" }),
  Object.freeze({ value: "17", label: "Sulṭán" }),
  Object.freeze({ value: "18", label: "Mulk" }),
  Object.freeze({ value: "ayyami-ha", label: "Ayyám-i-Há" }),
  Object.freeze({ value: "19", label: "‘Alá’" }),
]);

const OLD_HINDU_SOLAR_MONTHS = Object.freeze([
  "Meṣa", "Vṛṣabha", "Mithuna", "Karka", "Siṃha", "Kanyā",
  "Tulā", "Vṛścika", "Dhanus", "Makara", "Kumbha", "Mīna",
]);

const OLD_HINDU_LUNAR_MONTHS = Object.freeze([
  "Caitra", "Vaiśākha", "Jyaiṣṭha", "Āṣāḍha", "Śrāvaṇa", "Bhādrapada",
  "Āśvina", "Kārttika", "Mārgaśīrṣa", "Pauṣa", "Māgha", "Phālguna",
]);

const INTL_MONTH_SPECS = Object.freeze({
  gregorian: Object.freeze({ calendar: "gregory" }),
  julian: Object.freeze({ calendar: "gregory" }),
  hebrew: Object.freeze({ calendar: "hebrew" }),
  "islamic-civil": Object.freeze({ calendar: "islamic-civil" }),
  "islamic-umalqura": Object.freeze({ calendar: "islamic-umalqura" }),
  "solar-hijri-official": Object.freeze({ calendar: "persian" }),
  "solar-hijri-arithmetic": Object.freeze({ calendar: "persian" }),
  chinese: Object.freeze({ calendar: "chinese" }),
  saka: Object.freeze({ calendar: "indian" }),
  "thai-buddhist": Object.freeze({ calendar: "buddhist" }),
  ethiopic: Object.freeze({ calendar: "ethiopic" }),
  coptic: Object.freeze({ calendar: "coptic" }),
  "japanese-imperial": Object.freeze({ calendar: "japanese" }),
  minguo: Object.freeze({ calendar: "roc" }),
});

const monthChoiceCache = new Map();

function parseHebrewLetters(raw) {
  const text = raw
    .normalize("NFC")
    .replace(HEBREW_MARKS, "")
    .replace(HEBREW_PUNCTUATION, "")
    .replace(/\s+/gu, "");
  if (!text || !HEBREW_LETTERS.test(text)) throw new RangeError("Invalid Hebrew numeral.");
  let total = 0n;
  for (const letter of text) {
    const value = HEBREW_VALUES[letter];
    if (value === undefined) throw new RangeError("Invalid Hebrew numeral.");
    total += value;
  }
  return total;
}

export function parseHebrewNumeral(raw, { year = false } = {}) {
  if (typeof raw === "bigint") return raw;
  if (typeof raw === "number" && Number.isSafeInteger(raw)) return BigInt(raw);
  const text = String(raw ?? "").trim();
  if (/^[+-]?\d+$/u.test(text)) return BigInt(text);
  if (!text) throw new RangeError("Missing Hebrew numeral.");

  const normalized = text.normalize("NFC").replace(HEBREW_MARKS, "").replace(/\s+/gu, "");
  if (year) {
    const thousands = normalized.match(EXPLICIT_THOUSANDS);
    if (thousands) {
      const high = parseHebrewLetters(thousands[1]);
      const low = thousands[2] ? parseHebrewLetters(thousands[2]) : 0n;
      return high * 1000n + low;
    }
  }

  let value = parseHebrewLetters(normalized);
  // Hebrew years are customarily written without the thousands component.
  // Decimal input remains exact, so historical years below 5000 can still be
  // entered unambiguously as decimal digits.
  if (year && value > 0n && value < 1000n) value += 5000n;
  return value;
}

export function usesTextualCalendarNumeral(calendarId, fieldName) {
  return (calendarId === "hebrew" && (fieldName === "year" || fieldName === "day"))
    || (calendarId === "japanese-imperial" && fieldName === "year");
}

export function normalizeCalendarInputValues(calendarId, values) {
  const normalized = { ...values };
  if (calendarId === "hebrew") {
    normalized.year = parseHebrewNumeral(values?.year, { year: true }).toString();
    normalized.day = parseHebrewNumeral(values?.day).toString();
  } else if (calendarId === "japanese-imperial") {
    const eraYear = String(values?.year ?? "").trim();
    if (eraYear === "元" || eraYear === "元年") normalized.year = "1";
  }
  return normalized;
}

function dateFromJdn(jdn) {
  const civil = jdnToGregorian(jdn);
  const year = Number(civil.year);
  if (!Number.isSafeInteger(year) || year < -271_000 || year > 275_000) {
    throw new RangeError("Month label date is outside the JavaScript Date range.");
  }
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(year, civil.month - 1, civil.day);
  if (Number.isNaN(date.getTime())) throw new RangeError("Month label date is not representable.");
  return date;
}

function intlMonthLabel(intlLocale, calendar, jdn) {
  const formatter = new Intl.DateTimeFormat(intlLocale, {
    calendar,
    month: "long",
    timeZone: "UTC",
  });
  const part = formatter.formatToParts(dateFromJdn(jdn)).find(({ type }) => type === "month");
  if (!part?.value) throw new RangeError(`Unable to format a ${calendar} month name.`);
  return part.value;
}

function gregorianMonthSample(month) {
  return gregorianToJdn({ year: 2024n, month, day: 15 });
}

function sampleJdn(calendarId, month) {
  switch (calendarId) {
    case "gregorian":
    case "julian":
    case "thai-buddhist":
    case "japanese-imperial":
    case "minguo":
      return gregorianMonthSample(month);
    case "hebrew":
      return calendarDateToJdn("hebrew", { year: "5784", month: String(month), day: "1" });
    case "islamic-civil":
      return calendarDateToJdn(calendarId, { year: "1445", month: String(month), day: "1" });
    case "islamic-umalqura":
      return calendarDateToJdn(calendarId, { year: "1445", month: String(month), day: "1" });
    case "solar-hijri-official":
    case "solar-hijri-arithmetic":
      return calendarDateToJdn(calendarId, { year: "1403", month: String(month), day: "1" });
    case "chinese":
      return calendarDateToJdn(calendarId, {
        relatedYear: "2024",
        month: String(month),
        day: "1",
        leapMonth: false,
      });
    case "saka":
      return calendarDateToJdn(calendarId, { year: "1946", month: String(month), day: "1" });
    case "ethiopic":
      return calendarDateToJdn(calendarId, { year: "2016", month: String(month), day: "1" });
    case "coptic":
      return calendarDateToJdn(calendarId, { year: "1740", month: String(month), day: "1" });
    default:
      throw new RangeError(`No month-name sample is defined for ${calendarId}.`);
  }
}

function localizedNumber(value, intlLocale) {
  try {
    return new Intl.NumberFormat(intlLocale, { useGrouping: false }).format(Number(value));
  } catch {
    return String(value);
  }
}

function hebrewMonthLabel(month, intlLocale) {
  const calendar = INTL_MONTH_SPECS.hebrew.calendar;
  if (month === 12) {
    const common = intlMonthLabel(
      intlLocale,
      calendar,
      calendarDateToJdn("hebrew", { year: "5783", month: "12", day: "1" }),
    );
    const leap = intlMonthLabel(
      intlLocale,
      calendar,
      calendarDateToJdn("hebrew", { year: "5784", month: "12", day: "1" }),
    );
    return common === leap ? common : `${common} / ${leap}`;
  }
  return intlMonthLabel(intlLocale, calendar, sampleJdn("hebrew", month));
}

function staticMonthChoices(calendarId) {
  if (calendarId === "bahai-tehran" || calendarId === "bahai-western") return BAHAI_MONTHS;
  const labels = calendarId === "hindu-old-solar"
    ? OLD_HINDU_SOLAR_MONTHS
    : calendarId === "hindu-old-lunar"
      ? OLD_HINDU_LUNAR_MONTHS
      : null;
  if (!labels) return null;
  return Object.freeze(labels.map((label, index) => Object.freeze({ value: String(index + 1), label })));
}

export function calendarMonthChoices(calendarId, field, intlLocale = "en") {
  if (field?.name !== "month") return null;

  const staticChoices = staticMonthChoices(calendarId);
  if (staticChoices) return staticChoices;

  const spec = INTL_MONTH_SPECS[calendarId];
  if (!spec) return null;
  const maximum = Number(field.max ?? 12);
  if (!Number.isInteger(maximum) || maximum < 1 || maximum > 13) return null;

  const cacheKey = `${calendarId}|${intlLocale}|${maximum}`;
  if (monthChoiceCache.has(cacheKey)) return monthChoiceCache.get(cacheKey);

  const choices = Object.freeze(Array.from({ length: maximum }, (_, index) => {
    const month = index + 1;
    let label;
    try {
      label = calendarId === "hebrew"
        ? hebrewMonthLabel(month, intlLocale)
        : intlMonthLabel(intlLocale, spec.calendar, sampleJdn(calendarId, month));
    } catch {
      label = localizedNumber(month, intlLocale);
    }
    return Object.freeze({ value: String(month), label });
  }));
  monthChoiceCache.set(cacheKey, choices);
  return choices;
}
