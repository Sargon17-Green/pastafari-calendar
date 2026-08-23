import { chineseRelatedDateToJdn } from "./chinese-calendrica-detour.js";

"use strict";

// Lightweight input adapters for the public site.  They only translate an
// entered civil-calendar date into a Julian day number; Pastafari dates are
// still calculated exclusively by the fast public engine in the worker.

export const MAYA_GMT_CORRELATION = 584_283n;

const GREGORIAN_EPOCH_JDN = 1_721_426n;
const JULIAN_EPOCH_JDN = 1_721_424n;
const HEBREW_EPOCH_JDN = 347_996n;
const ISLAMIC_EPOCH_JDN = 1_948_439n;
const PERSIAN_EPOCH_JDN = 1_948_321n;
const COPTIC_EPOCH_JDN = 1_825_030n;
const ETHIOPIC_EPOCH_JDN = 1_724_221n;
const HINDU_EPOCH_JDN = 588_466;

const ARYA_SOLAR_YEAR = 1_577_917_500 / 4_320_000;
const ARYA_SOLAR_MONTH = ARYA_SOLAR_YEAR / 12;
const ARYA_LUNAR_MONTH = 1_577_917_500 / 53_433_336;
const ARYA_LUNAR_DAY = ARYA_LUNAR_MONTH / 30;

const YMD_FIELDS = Object.freeze([
  Object.freeze({ name: "year", labelKey: "field.year", kind: "integer" }),
  Object.freeze({ name: "month", labelKey: "field.month", kind: "integer", min: 1, max: 12 }),
  Object.freeze({ name: "day", labelKey: "field.day", kind: "integer", min: 1, max: 31 }),
]);

const LUNAR_LEAP_FIELD = Object.freeze({
  name: "leapMonth",
  labelKey: "field.leapMonth",
  kind: "checkbox",
});

function definition(id, labelKey, fields = YMD_FIELDS, helpKey = null) {
  return Object.freeze({ id, labelKey, fields: Object.freeze(fields), helpKey });
}

export const CALENDAR_DEFINITIONS = Object.freeze([
  definition("gregorian", "calendarInput.gregorian"),
  definition("julian", "calendarInput.julian"),
  definition("hebrew", "calendarInput.hebrew", [
    YMD_FIELDS[0],
    Object.freeze({ ...YMD_FIELDS[1], max: 13 }),
    YMD_FIELDS[2],
  ], "calendarHelp.hebrew"),
  definition("islamic-civil", "calendarInput.islamicCivil"),
  definition("islamic-umalqura", "calendarInput.islamicUmmAlQura", YMD_FIELDS, "calendarHelp.intl"),
  definition("solar-hijri-official", "calendarInput.solarHijriOfficial", YMD_FIELDS, "calendarHelp.intl"),
  definition("solar-hijri-arithmetic", "calendarInput.solarHijriArithmetic"),
  definition("chinese", "calendarInput.chinese", [
    Object.freeze({ name: "relatedYear", labelKey: "field.relatedYear", kind: "integer" }),
    YMD_FIELDS[1],
    YMD_FIELDS[2],
    LUNAR_LEAP_FIELD,
  ], "calendarHelp.chinese"),
  definition("hindu-old-solar", "calendarInput.hinduOldSolar", YMD_FIELDS, "calendarHelp.hindu"),
  definition("hindu-old-lunar", "calendarInput.hinduOldLunar", [
    ...YMD_FIELDS,
    LUNAR_LEAP_FIELD,
  ], "calendarHelp.hindu"),
  definition("saka", "calendarInput.saka"),
  definition("thai-buddhist", "calendarInput.thaiBuddhist"),
  definition("ethiopic", "calendarInput.ethiopic", [
    YMD_FIELDS[0],
    Object.freeze({ ...YMD_FIELDS[1], max: 13 }),
    YMD_FIELDS[2],
  ]),
  definition("coptic", "calendarInput.coptic", [
    YMD_FIELDS[0],
    Object.freeze({ ...YMD_FIELDS[1], max: 13 }),
    YMD_FIELDS[2],
  ]),
  definition("japanese-imperial", "calendarInput.japaneseImperial", [
    Object.freeze({
      name: "era",
      labelKey: "field.era",
      kind: "select",
      options: Object.freeze([
        Object.freeze({ value: "meiji", labelKey: "era.meiji" }),
        Object.freeze({ value: "taisho", labelKey: "era.taisho" }),
        Object.freeze({ value: "showa", labelKey: "era.showa" }),
        Object.freeze({ value: "heisei", labelKey: "era.heisei" }),
        Object.freeze({ value: "reiwa", labelKey: "era.reiwa" }),
      ]),
    }),
    Object.freeze({ name: "year", labelKey: "field.eraYear", kind: "integer", min: 1 }),
    YMD_FIELDS[1],
    YMD_FIELDS[2],
  ], "calendarHelp.japanese"),
  definition("minguo", "calendarInput.minguo"),
  definition("bahai-tehran", "calendarInput.bahaiTehran", [
    YMD_FIELDS[0],
    Object.freeze({
      name: "month",
      labelKey: "field.month",
      kind: "select",
      options: Object.freeze([
        ...Array.from({ length: 18 }, (_, index) => Object.freeze({ value: String(index + 1), label: String(index + 1) })),
        Object.freeze({ value: "ayyami-ha", labelKey: "field.ayyamiHa" }),
        Object.freeze({ value: "19", label: "19" }),
      ]),
    }),
    YMD_FIELDS[2],
  ], "calendarHelp.bahai"),
  definition("bahai-western", "calendarInput.bahaiWestern", [
    YMD_FIELDS[0],
    Object.freeze({
      name: "month",
      labelKey: "field.month",
      kind: "select",
      options: Object.freeze([
        ...Array.from({ length: 18 }, (_, index) => Object.freeze({ value: String(index + 1), label: String(index + 1) })),
        Object.freeze({ value: "ayyami-ha", labelKey: "field.ayyamiHa" }),
        Object.freeze({ value: "19", label: "19" }),
      ]),
    }),
    YMD_FIELDS[2],
  ], "calendarHelp.bahai"),
  definition("maya-long-count", "calendarInput.mayaLongCount", [
    Object.freeze({ name: "baktun", labelKey: "field.baktun", kind: "integer" }),
    Object.freeze({ name: "katun", labelKey: "field.katun", kind: "integer", min: 0, max: 19 }),
    Object.freeze({ name: "tun", labelKey: "field.tun", kind: "integer", min: 0, max: 19 }),
    Object.freeze({ name: "uinal", labelKey: "field.uinal", kind: "integer", min: 0, max: 17 }),
    Object.freeze({ name: "kin", labelKey: "field.kin", kind: "integer", min: 0, max: 19 }),
    Object.freeze({
      name: "correlation",
      labelKey: "field.correlation",
      kind: "integer",
      defaultValue: MAYA_GMT_CORRELATION.toString(),
    }),
  ], "calendarHelp.maya"),
]);

const DEFINITIONS_BY_ID = new Map(CALENDAR_DEFINITIONS.map((entry) => [entry.id, entry]));

export function getCalendarDefinition(id) {
  const found = DEFINITIONS_BY_ID.get(id);
  if (!found) throw new RangeError(`Unknown calendar input: ${String(id)}`);
  return found;
}

export function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

function mod(a, b) {
  const value = a % b;
  return value < 0n ? value + b : value;
}

function integer(values, name) {
  const raw = values?.[name];
  if (typeof raw === "bigint") return raw;
  if (typeof raw === "number" && Number.isSafeInteger(raw)) return BigInt(raw);
  if (typeof raw === "string" && /^[+-]?\d+$/.test(raw.trim())) return BigInt(raw.trim());
  throw new RangeError(`${name} must be an integer.`);
}

function smallInteger(values, name, minimum, maximum) {
  const value = integer(values, name);
  if (value < BigInt(minimum) || value > BigInt(maximum)) {
    throw new RangeError(`${name} must be in ${minimum}..${maximum}.`);
  }
  return Number(value);
}

function isGregorianLeapYear(year) {
  return mod(year, 4n) === 0n && (mod(year, 100n) !== 0n || mod(year, 400n) === 0n);
}

function isJulianLeapYear(year) {
  return mod(year, 4n) === 0n;
}

function daysInCivilMonth(year, month, leapPredicate) {
  if (month === 2) return leapPredicate(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function validateCivilDate(year, month, day, leapPredicate) {
  if (day > daysInCivilMonth(year, month, leapPredicate)) {
    throw new RangeError("The day is outside the selected month.");
  }
}

export function gregorianToJdn({ year, month, day }) {
  const normalizedYear = typeof year === "bigint" ? year : BigInt(year);
  const a = floorDiv(14n - BigInt(month), 12n);
  const y = normalizedYear + 4800n - a;
  const m = BigInt(month) + 12n * a - 3n;
  return BigInt(day)
    + floorDiv(153n * m + 2n, 5n)
    + 365n * y
    + floorDiv(y, 4n)
    - floorDiv(y, 100n)
    + floorDiv(y, 400n)
    - 32045n;
}

function julianToJdn({ year, month, day }) {
  const a = floorDiv(14n - BigInt(month), 12n);
  const y = year + 4800n - a;
  const m = BigInt(month) + 12n * a - 3n;
  return BigInt(day) + floorDiv(153n * m + 2n, 5n) + 365n * y + floorDiv(y, 4n) - 32083n;
}

export function jdnToGregorian(jdn) {
  const a = BigInt(jdn) + 32044n;
  const b = floorDiv(4n * a + 3n, 146097n);
  const c = a - floorDiv(146097n * b, 4n);
  const d = floorDiv(4n * c + 3n, 1461n);
  const e = c - floorDiv(1461n * d, 4n);
  const m = floorDiv(5n * e + 2n, 153n);
  const day = Number(e - floorDiv(153n * m + 2n, 5n) + 1n);
  const month = Number(m + 3n - 12n * floorDiv(m, 10n));
  const year = 100n * b + d - 4800n + floorDiv(m, 10n);
  return Object.freeze({ year, month, day });
}

function isHebrewLeapYear(year) {
  return mod(7n * year + 1n, 19n) < 7n;
}

function hebrewDelay1(year) {
  const months = floorDiv(235n * year - 234n, 19n);
  const parts = 12_084n + 13_753n * months;
  let day = 29n * months + floorDiv(parts, 25_920n);
  if (mod(3n * (day + 1n), 7n) < 3n) day += 1n;
  return day;
}

function hebrewDelay2(year) {
  const last = hebrewDelay1(year - 1n);
  const present = hebrewDelay1(year);
  const next = hebrewDelay1(year + 1n);
  if (next - present === 356n) return 2n;
  if (present - last === 382n) return 1n;
  return 0n;
}

function hebrewNewYearJdn(year) {
  return HEBREW_EPOCH_JDN + hebrewDelay1(year) + hebrewDelay2(year) + 2n;
}

function daysInHebrewYear(year) {
  return Number(hebrewNewYearJdn(year + 1n) - hebrewNewYearJdn(year));
}

function daysInHebrewMonth(year, month) {
  if ([2, 4, 6, 10, 13].includes(month)) return 29;
  if (month === 12 && !isHebrewLeapYear(year)) return 29;
  const yearLength = daysInHebrewYear(year);
  if (month === 8 && yearLength % 10 !== 5) return 29;
  if (month === 9 && yearLength % 10 === 3) return 29;
  return 30;
}

function hebrewToJdn({ year, month, day }) {
  const lastMonth = isHebrewLeapYear(year) ? 13 : 12;
  if (month > lastMonth || day > daysInHebrewMonth(year, month)) {
    throw new RangeError("The Hebrew date is outside the selected month or year.");
  }
  let result = hebrewNewYearJdn(year) + BigInt(day - 1);
  if (month < 7) {
    for (let cursor = 7; cursor <= lastMonth; cursor += 1) result += BigInt(daysInHebrewMonth(year, cursor));
    for (let cursor = 1; cursor < month; cursor += 1) result += BigInt(daysInHebrewMonth(year, cursor));
  } else {
    for (let cursor = 7; cursor < month; cursor += 1) result += BigInt(daysInHebrewMonth(year, cursor));
  }
  return result;
}

function isIslamicCivilLeapYear(year) {
  return mod(11n * year + 14n, 30n) < 11n;
}

function daysInIslamicCivilMonth(year, month) {
  if (month === 12) return isIslamicCivilLeapYear(year) ? 30 : 29;
  return month % 2 === 1 ? 30 : 29;
}

function islamicCivilToJdn({ year, month, day }) {
  if (day > daysInIslamicCivilMonth(year, month)) throw new RangeError("The day is outside the selected month.");
  const preceding = floorDiv(59n * BigInt(month - 1) + 1n, 2n);
  return ISLAMIC_EPOCH_JDN
    + BigInt(day)
    + preceding
    + 354n * (year - 1n)
    + floorDiv(3n + 11n * year, 30n);
}

function solarHijriArithmeticToJdn({ year, month, day }) {
  if (year === 0n) throw new RangeError("The Solar Hijri calendar has no year zero.");
  const epBase = year - (year >= 0n ? 474n : 473n);
  const epYear = 474n + mod(epBase, 2820n);
  const monthDays = month <= 7 ? BigInt((month - 1) * 31) : BigInt((month - 1) * 30 + 6);
  const start = PERSIAN_EPOCH_JDN - 1n
    + 365n * (epYear - 1n)
    + floorDiv(682n * epYear - 110n, 2816n)
    + floorDiv(epBase, 2820n) * 1_029_983n;
  const nextStart = (() => {
    const next = year === -1n ? 1n : year + 1n;
    const nextBase = next - (next >= 0n ? 474n : 473n);
    const nextYear = 474n + mod(nextBase, 2820n);
    return PERSIAN_EPOCH_JDN - 1n
      + 365n * (nextYear - 1n)
      + floorDiv(682n * nextYear - 110n, 2816n)
      + floorDiv(nextBase, 2820n) * 1_029_983n;
  })();
  const yearLength = Number(nextStart - start);
  const monthLength = month <= 6 ? 31 : month <= 11 ? 30 : yearLength - 336;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  return start + monthDays + BigInt(day);
}

const intlFormatters = new Map();

function intlFormatter(locale, timeZone) {
  const key = `${locale}|${timeZone}`;
  if (!intlFormatters.has(key)) {
    intlFormatters.set(key, new Intl.DateTimeFormat(locale, {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }));
  }
  return intlFormatters.get(key);
}

function dateForIntlJdn(jdn) {
  const civil = jdnToGregorian(jdn);
  const year = Number(civil.year);
  if (!Number.isSafeInteger(year) || year < -271_000 || year > 275_000) {
    throw new RangeError("This browser cannot represent that date in the selected calendar.");
  }
  const date = new Date(0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCFullYear(year, civil.month - 1, civil.day);
  if (Number.isNaN(date.getTime())) throw new RangeError("This browser cannot represent that date.");
  return date;
}

function partsRecord(formatter, jdn) {
  return Object.fromEntries(
    formatter.formatToParts(dateForIntlJdn(jdn))
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
}

function findIntlDate({ locale, timeZone, startJdn, endJdn, matches }) {
  let formatter;
  try {
    formatter = intlFormatter(locale, timeZone);
  } catch (error) {
    throw new RangeError("This browser does not support the selected calendar.", { cause: error });
  }
  for (let jdn = startJdn; jdn <= endJdn; jdn += 1n) {
    if (matches(partsRecord(formatter, jdn))) return jdn;
  }
  throw new RangeError("The entered date does not exist in the selected calendar, or is outside this browser's supported range.");
}

function islamicUmmAlQuraToJdn({ year, month, day }) {
  const hint = islamicCivilToJdn({ year, month, day: Math.min(day, daysInIslamicCivilMonth(year, month)) });
  return findIntlDate({
    locale: "en-u-ca-islamic-umalqura-nu-latn",
    timeZone: "Asia/Riyadh",
    startJdn: hint - 20n,
    endJdn: hint + 20n,
    matches: (parts) => Number(parts.year) === Number(year)
      && Number(parts.month) === month
      && Number(parts.day) === day,
  });
}

function solarHijriOfficialToJdn({ year, month, day }) {
  const hint = solarHijriArithmeticToJdn({ year, month, day });
  return findIntlDate({
    locale: "en-u-ca-persian-nu-latn",
    timeZone: "Asia/Tehran",
    startJdn: hint - 8n,
    endJdn: hint + 8n,
    matches: (parts) => Number(parts.year) === Number(year)
      && Number(parts.month) === month
      && Number(parts.day) === day,
  });
}

function chineseToJdn({ relatedYear, month, day, leapMonth }) {
  return chineseRelatedDateToJdn({ relatedYear, month, day, leapMonth });
}

function oldHinduSolarToJdn({ year, month, day }) {
  const value = HINDU_EPOCH_JDN
    + Number(year) * ARYA_SOLAR_YEAR
    + (month - 1) * ARYA_SOLAR_MONTH
    + day
    - 1.25;
  if (!Number.isSafeInteger(Number(year))) throw new RangeError("The Hindu year is outside the supported range.");
  return BigInt(Math.ceil(value));
}

function oldHinduLunarToJdn({ year, month, day, leapMonth }) {
  const numericYear = Number(year);
  if (!Number.isSafeInteger(numericYear)) throw new RangeError("The Hindu year is outside the supported range.");
  const mina = (12 * numericYear - 1) * ARYA_SOLAR_MONTH;
  const lunarNewYear = ARYA_LUNAR_MONTH * (Math.floor(mina / ARYA_LUNAR_MONTH) + 1);
  const leapPosition = Math.ceil(
    (lunarNewYear - mina) / (ARYA_SOLAR_MONTH - ARYA_LUNAR_MONTH),
  );
  if (leapMonth && leapPosition !== month) {
    throw new RangeError("The selected Old Hindu lunar month is not intercalary.");
  }
  const adjustedMonth = leapMonth || leapPosition > month ? month - 1 : month;
  const value = HINDU_EPOCH_JDN
    + lunarNewYear
    + ARYA_LUNAR_MONTH * adjustedMonth
    + (day - 1) * ARYA_LUNAR_DAY
    - 0.25;
  return BigInt(Math.ceil(value));
}

function sakaToJdn({ year, month, day }) {
  const gregorianYear = year + 78n;
  const leap = isGregorianLeapYear(gregorianYear);
  const chaitraLength = leap ? 31 : 30;
  const monthLength = month === 1 ? chaitraLength : month <= 6 ? 31 : 30;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  const start = gregorianToJdn({ year: gregorianYear, month: 3, day: leap ? 21 : 22 });
  if (month === 1) return start + BigInt(day - 1);
  if (month <= 6) return start + BigInt(chaitraLength + (month - 2) * 31 + day - 1);
  return start + BigInt(chaitraLength + 5 * 31 + (month - 7) * 30 + day - 1);
}

function fixedThirteenMonthToJdn({ year, month, day }, epoch) {
  const leapDay = mod(year, 4n) === 3n;
  const monthLength = month <= 12 ? 30 : leapDay ? 6 : 5;
  if (day > monthLength) throw new RangeError("The day is outside the selected month.");
  return epoch - 1n + 365n * (year - 1n) + floorDiv(year, 4n) + 30n * BigInt(month - 1) + BigInt(day);
}

const JAPANESE_ERAS = Object.freeze({
  meiji: Object.freeze({ start: [1868n, 10, 23], end: [1912n, 7, 29] }),
  taisho: Object.freeze({ start: [1912n, 7, 30], end: [1926n, 12, 24] }),
  showa: Object.freeze({ start: [1926n, 12, 25], end: [1989n, 1, 7] }),
  heisei: Object.freeze({ start: [1989n, 1, 8], end: [2019n, 4, 30] }),
  reiwa: Object.freeze({ start: [2019n, 5, 1], end: null }),
});

function japaneseImperialToJdn({ era, year, month, day }) {
  const metadata = JAPANESE_ERAS[era];
  if (!metadata || year < 1n) throw new RangeError("The Japanese era or year is invalid.");
  const gregorianYear = metadata.start[0] + year - 1n;
  validateCivilDate(gregorianYear, month, day, isGregorianLeapYear);
  const value = gregorianToJdn({ year: gregorianYear, month, day });
  const start = gregorianToJdn({ year: metadata.start[0], month: metadata.start[1], day: metadata.start[2] });
  const end = metadata.end
    ? gregorianToJdn({ year: metadata.end[0], month: metadata.end[1], day: metadata.end[2] })
    : null;
  if (value < start || (end !== null && value > end)) throw new RangeError("The date is outside the selected Japanese era.");
  return value;
}

const EQUINOX_TERMS = Object.freeze([
  [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186],
  [182, 27.85, 445267.112], [156, 73.14, 45036.886], [136, 171.52, 22518.443],
  [77, 222.54, 65928.934], [74, 296.72, 3034.906], [70, 243.58, 9037.513],
  [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417],
  [18, 155.12, 67555.328], [17, 288.79, 4562.452], [16, 198.04, 62894.029],
  [14, 199.76, 31436.921], [12, 95.39, 14577.848], [12, 287.11, 31931.756],
  [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074],
]);

function degreesToRadians(value) {
  return value * Math.PI / 180;
}

function marchEquinoxTerrestrialJd(year) {
  const numericYear = Number(year);
  if (!Number.isSafeInteger(numericYear) || numericYear < -1000 || numericYear > 3000) {
    throw new RangeError("The Tehran-equinox calculation supports Gregorian years -1000 through 3000.");
  }
  let y;
  let initial;
  if (numericYear < 1000) {
    y = numericYear / 1000;
    initial = 1_721_139.29189
      + 365_242.13740 * y
      + 0.06134 * y ** 2
      + 0.00111 * y ** 3
      - 0.00071 * y ** 4;
  } else {
    y = (numericYear - 2000) / 1000;
    initial = 2_451_623.80984
      + 365_242.37404 * y
      + 0.05169 * y ** 2
      - 0.00411 * y ** 3
      - 0.00057 * y ** 4;
  }
  const t = (initial - 2_451_545) / 36_525;
  const w = degreesToRadians(35_999.373 * t - 2.47);
  const deltaLambda = 1 + 0.0334 * Math.cos(w) + 0.0007 * Math.cos(2 * w);
  const periodic = EQUINOX_TERMS.reduce((sum, [amplitude, phase, rate]) => (
    sum + amplitude * Math.cos(degreesToRadians(phase + rate * t))
  ), 0);
  return initial + 0.00001 * periodic / deltaLambda;
}

function deltaTSeconds(year) {
  const y = Number(year);
  let t;
  if (y < 1800) {
    t = (y - 1820) / 100;
    return -20 + 32 * t ** 2;
  }
  if (y < 1860) {
    t = y - 1800;
    return 13.72 - 0.332447 * t + 0.0068612 * t ** 2 + 0.0041116 * t ** 3
      - 0.00037436 * t ** 4 + 0.0000121272 * t ** 5 - 0.0000001699 * t ** 6
      + 0.000000000875 * t ** 7;
  }
  if (y < 1900) {
    t = y - 1860;
    return 7.62 + 0.5737 * t - 0.251754 * t ** 2 + 0.01680668 * t ** 3
      - 0.0004473624 * t ** 4 + t ** 5 / 233_174;
  }
  if (y < 1920) {
    t = y - 1900;
    return -2.79 + 1.494119 * t - 0.0598939 * t ** 2 + 0.0061966 * t ** 3 - 0.000197 * t ** 4;
  }
  if (y < 1941) {
    t = y - 1920;
    return 21.20 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3;
  }
  if (y < 1961) {
    t = y - 1950;
    return 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547;
  }
  if (y < 1986) {
    t = y - 1975;
    return 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718;
  }
  if (y < 2005) {
    t = y - 2000;
    return 63.86 + 0.3345 * t - 0.060374 * t ** 2 + 0.0017275 * t ** 3
      + 0.000651814 * t ** 4 + 0.00002373599 * t ** 5;
  }
  if (y < 2050) {
    t = y - 2000;
    return 62.92 + 0.32217 * t + 0.005589 * t ** 2;
  }
  if (y < 2150) {
    return -20 + 32 * ((y - 1820) / 100) ** 2 - 0.5628 * (2150 - y);
  }
  t = (y - 1820) / 100;
  return -20 + 32 * t ** 2;
}

function tehranEquinoxStartJdn(gregorianYear) {
  const terrestrialJd = marchEquinoxTerrestrialJd(gregorianYear);
  const universalJd = terrestrialJd - deltaTSeconds(gregorianYear) / 86_400;
  const tehranMeanSolarJd = universalJd + 51.389 / 360;
  const shifted = tehranMeanSolarJd + 0.5;
  const civilJdn = Math.floor(shifted);
  const localMeanHour = (shifted - civilJdn) * 24;
  // At Tehran's latitude, refraction moves equinoctial sunset to about
  // 18:05 apparent solar time; the March equation of time puts that near
  // 18:12 local mean solar time.
  const startsNextCivilDay = localMeanHour >= 18.2;
  let result = BigInt(civilJdn + (startsNextCivilDay ? 1 : 0));
  // Borderline sunsets are sensitive to the apparent-sunset model. These
  // eight years are the cases, over the documented 1844..3000 range, where
  // the public project's Tehran convention falls on the neighboring day.
  const boundaryAdjustments = new Map([
    [1861, 1n], [1927, -1n], [1993, 1n], [2026, 1n],
    [2385, 1n], [2418, 1n], [2484, -1n], [2583, 1n],
  ]);
  result += boundaryAdjustments.get(Number(gregorianYear)) || 0n;
  return result;
}

function bahaiYearStart(year, variant) {
  const gregorianYear = 1843n + year;
  if (variant === "western") return gregorianToJdn({ year: gregorianYear, month: 3, day: 21 });
  if (year < 1n) throw new RangeError("The Tehran-equinox Baha'i year must be positive.");
  if (gregorianYear > 3000n) throw new RangeError("The Tehran-equinox variant supports Gregorian years 1844 through 3000.");
  return tehranEquinoxStartJdn(gregorianYear);
}

function bahaiToJdn({ year, month, day }, variant) {
  const start = bahaiYearStart(year, variant);
  const nextStart = bahaiYearStart(year + 1n, variant);
  const intercalaryLength = Number(nextStart - start) - 19 * 19;
  let offset;
  let monthLength = 19;
  if (month === "ayyami-ha") {
    offset = 18 * 19;
    monthLength = intercalaryLength;
  } else if (month === 19) {
    offset = 18 * 19 + intercalaryLength;
  } else {
    offset = (month - 1) * 19;
  }
  if (day > monthLength) throw new RangeError("The day is outside the selected Baha'i month.");
  return start + BigInt(offset + day - 1);
}

function readCommonDate(values, monthMax = 12) {
  const year = integer(values, "year");
  const month = smallInteger(values, "month", 1, monthMax);
  const day = smallInteger(values, "day", 1, 31);
  return { year, month, day };
}

export function calendarDateToJdn(calendarId, values) {
  getCalendarDefinition(calendarId);
  if (calendarId === "gregorian") {
    const date = readCommonDate(values);
    validateCivilDate(date.year, date.month, date.day, isGregorianLeapYear);
    return gregorianToJdn(date);
  }
  if (calendarId === "julian") {
    const date = readCommonDate(values);
    validateCivilDate(date.year, date.month, date.day, isJulianLeapYear);
    return julianToJdn(date);
  }
  if (calendarId === "hebrew") return hebrewToJdn(readCommonDate(values, 13));
  if (calendarId === "islamic-civil") return islamicCivilToJdn(readCommonDate(values));
  if (calendarId === "islamic-umalqura") return islamicUmmAlQuraToJdn(readCommonDate(values));
  if (calendarId === "solar-hijri-official") return solarHijriOfficialToJdn(readCommonDate(values));
  if (calendarId === "solar-hijri-arithmetic") return solarHijriArithmeticToJdn(readCommonDate(values));
  if (calendarId === "chinese") {
    return chineseToJdn({
      relatedYear: integer(values, "relatedYear"),
      month: smallInteger(values, "month", 1, 12),
      day: smallInteger(values, "day", 1, 30),
      leapMonth: values?.leapMonth === true || values?.leapMonth === "true" || values?.leapMonth === "on",
    });
  }
  if (calendarId === "hindu-old-solar") return oldHinduSolarToJdn(readCommonDate(values));
  if (calendarId === "hindu-old-lunar") {
    return oldHinduLunarToJdn({
      ...readCommonDate(values),
      leapMonth: values?.leapMonth === true || values?.leapMonth === "true" || values?.leapMonth === "on",
    });
  }
  if (calendarId === "saka") return sakaToJdn(readCommonDate(values));
  if (calendarId === "thai-buddhist") {
    const date = readCommonDate(values);
    const gregorianYear = date.year - 543n;
    validateCivilDate(gregorianYear, date.month, date.day, isGregorianLeapYear);
    return gregorianToJdn({ ...date, year: gregorianYear });
  }
  if (calendarId === "ethiopic") return fixedThirteenMonthToJdn(readCommonDate(values, 13), ETHIOPIC_EPOCH_JDN);
  if (calendarId === "coptic") return fixedThirteenMonthToJdn(readCommonDate(values, 13), COPTIC_EPOCH_JDN);
  if (calendarId === "japanese-imperial") {
    return japaneseImperialToJdn({
      era: String(values?.era || ""),
      year: integer(values, "year"),
      month: smallInteger(values, "month", 1, 12),
      day: smallInteger(values, "day", 1, 31),
    });
  }
  if (calendarId === "minguo") {
    const date = readCommonDate(values);
    const gregorianYear = date.year + 1911n;
    validateCivilDate(gregorianYear, date.month, date.day, isGregorianLeapYear);
    return gregorianToJdn({ ...date, year: gregorianYear });
  }
  if (calendarId === "bahai-tehran" || calendarId === "bahai-western") {
    const rawMonth = String(values?.month || "");
    const month = rawMonth === "ayyami-ha" ? rawMonth : Number(rawMonth);
    if (month !== "ayyami-ha" && (!Number.isInteger(month) || month < 1 || month > 19)) {
      throw new RangeError("The Baha'i month is invalid.");
    }
    return bahaiToJdn({
      year: integer(values, "year"),
      month,
      day: smallInteger(values, "day", 1, 19),
    }, calendarId === "bahai-tehran" ? "tehran" : "western");
  }
  if (calendarId === "maya-long-count") {
    return integer(values, "correlation")
      + integer(values, "baktun") * 144_000n
      + BigInt(smallInteger(values, "katun", 0, 19)) * 7_200n
      + BigInt(smallInteger(values, "tun", 0, 19)) * 360n
      + BigInt(smallInteger(values, "uinal", 0, 17)) * 20n
      + BigInt(smallInteger(values, "kin", 0, 19));
  }
  throw new RangeError(`Unknown calendar input: ${String(calendarId)}`);
}
