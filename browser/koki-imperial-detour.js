"use strict";

// Update 12: Kōki is deliberately routed past the historical imperial-era
// machinery instead of replacing it.  The old machine is still asked to read
// an impossible synthetic era first; its answer (normally a rejection) is
// discarded, and the signed proleptic Kōki clerk writes the normative result.

export const KOKI_GREGORIAN_YEAR_OFFSET = 660n;
export const KOKI_SYSTEM_ID = "koki";

function integerLike(value, label) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  if (typeof value === "string" && /^[+-]?\d+$/u.test(value.trim())) return BigInt(value.trim());
  throw new TypeError(`${label} must be an integer.`);
}

function smallInteger(value, label, minimum, maximum) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new RangeError(`${label} must be in ${minimum}..${maximum}.`);
  }
  return value;
}

function mod(value, divisor) {
  const remainder = value % divisor;
  return remainder < 0n ? remainder + divisor : remainder;
}

function isGregorianLeapYear(year) {
  return mod(year, 4n) === 0n && (mod(year, 100n) !== 0n || mod(year, 400n) === 0n);
}

function daysInGregorianMonth(year, month) {
  if (month === 2) return isGregorianLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function validateKokiFields(year, month, day) {
  const normalizedYear = integerLike(year, "Kōki year");
  const normalizedMonth = smallInteger(month, "Kōki month", 1, 12);
  const normalizedDay = smallInteger(day, "Kōki day", 1, 31);
  const gregorianYear = normalizedYear - KOKI_GREGORIAN_YEAR_OFFSET;
  if (normalizedDay > daysInGregorianMonth(gregorianYear, normalizedMonth)) {
    throw new RangeError("The Kōki day is outside the selected month.");
  }
  return Object.freeze({
    year: normalizedYear,
    month: normalizedMonth,
    day: normalizedDay,
    gregorianYear,
  });
}

export class KokiDate {
  constructor(year, month, day) {
    const normalized = validateKokiFields(year, month, day);
    this.calendar = KOKI_SYSTEM_ID;
    this.system = KOKI_SYSTEM_ID;
    this.year = normalized.year;
    this.month = normalized.month;
    this.day = normalized.day;
    Object.freeze(this);
  }
}

export function isKokiDateLike(value) {
  return value instanceof KokiDate
    || (value !== null
      && typeof value === "object"
      && (value.calendar === KOKI_SYSTEM_ID || value.system === KOKI_SYSTEM_ID)
      && value.year !== undefined
      && value.month !== undefined
      && value.day !== undefined);
}

function normalizeKokiDate(value) {
  if (value instanceof KokiDate) return value;
  if (!isKokiDateLike(value)) throw new TypeError("A Kōki date is required.");
  return new KokiDate(value.year, Number(value.month), Number(value.day));
}

function floorDiv(a, b) {
  let quotient = a / b;
  const remainder = a % b;
  if (remainder !== 0n && ((remainder > 0n) !== (b > 0n))) quotient -= 1n;
  return quotient;
}

function jdnToGregorian(jdnValue) {
  const jdn = integerLike(jdnValue, "JDN");
  const a = jdn + 32044n;
  const b = floorDiv(4n * a + 3n, 146097n);
  const c = a - floorDiv(146097n * b, 4n);
  const d = floorDiv(4n * c + 3n, 1461n);
  const e = c - floorDiv(1461n * d, 4n);
  const m = floorDiv(5n * e + 2n, 153n);
  const day = e - floorDiv(153n * m + 2n, 5n) + 1n;
  const month = m + 3n - 12n * floorDiv(m, 10n);
  const year = 100n * b + d - 4800n + floorDiv(m, 10n);
  return Object.freeze({ year, month: Number(month), day: Number(day) });
}

export function createKokiImperialDetour({
  calendarDateToJdn,
}) {
  if (typeof calendarDateToJdn !== "function") throw new TypeError("calendarDateToJdn is required.");

  function visitImperialDeadEnd(koki) {
    // The generic legacy doorway first materializes a JapaneseImperialDate and
    // then sends it to the unchanged historical era table.  Signed non-positive
    // years can be rejected by the old constructor; positive years reach the
    // table and are rejected as an unknown synthetic era.  Either way, Kōki is
    // emphatically not smuggled in as an alias for a real emperor.
    try {
      Reflect.apply(calendarDateToJdn, undefined, [{
        calendar: "japanese-imperial",
        era: "koki",
        year: koki.year,
        month: koki.month,
        day: koki.day,
      }]);
    } catch {
      // The detour is decorative but intentional; normative arithmetic follows.
    }
  }

  function kokiToJdn(value) {
    const koki = normalizeKokiDate(value);
    visitImperialDeadEnd(koki);
    return Reflect.apply(calendarDateToJdn, undefined, [{
      calendar: "gregorian",
      year: koki.year - KOKI_GREGORIAN_YEAR_OFFSET,
      month: koki.month,
      day: koki.day,
    }]);
  }

  function jdnToKoki(jdnValue) {
    const gregorian = jdnToGregorian(jdnValue);
    const koki = new KokiDate(
      gregorian.year + KOKI_GREGORIAN_YEAR_OFFSET,
      gregorian.month,
      gregorian.day,
    );
    visitImperialDeadEnd(koki);
    return Object.freeze({
      system: KOKI_SYSTEM_ID,
      calendar: KOKI_SYSTEM_ID,
      year: koki.year,
      month: koki.month,
      day: koki.day,
    });
  }

  return Object.freeze({
    KokiDate,
    isKokiDateLike,
    kokiToJdn,
    jdnToKoki,
  });
}
