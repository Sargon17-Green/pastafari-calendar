"use strict";

// Independent Update 12 Kōki reference.
// Do not import production calendar code, Intl, ICU, fixtures, or expected vectors.

export const KOKI_OFFSET = 660n;

function integer(value, label) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  if (typeof value === "string" && /^[+-]?\d+$/u.test(value.trim())) return BigInt(value.trim());
  throw new TypeError(`${label} must be an integer.`);
}

function floorDiv(a, b) {
  let q = a / b;
  const r = a % b;
  if (r !== 0n && ((r > 0n) !== (b > 0n))) q -= 1n;
  return q;
}

function mod(a, b) {
  const r = a % b;
  return r < 0n ? r + b : r;
}

export function referenceGregorianLeapYear(yearValue) {
  const year = integer(yearValue, "Gregorian year");
  return mod(year, 4n) === 0n && (mod(year, 100n) !== 0n || mod(year, 400n) === 0n);
}

export function referenceGregorianMonthLength(year, month) {
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError("month must be in 1..12");
  if (month === 2) return referenceGregorianLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

export function referenceGregorianToJdn({ year: yearValue, month, day }) {
  const year = integer(yearValue, "Gregorian year");
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError("month must be in 1..12");
  const maxDay = referenceGregorianMonthLength(year, month);
  if (!Number.isInteger(day) || day < 1 || day > maxDay) throw new RangeError("invalid Gregorian day");
  const a = floorDiv(14n - BigInt(month), 12n);
  const y = year + 4800n - a;
  const m = BigInt(month) + 12n * a - 3n;
  return BigInt(day)
    + floorDiv(153n * m + 2n, 5n)
    + 365n * y
    + floorDiv(y, 4n)
    - floorDiv(y, 100n)
    + floorDiv(y, 400n)
    - 32045n;
}

export function referenceJdnToGregorian(jdnValue) {
  const jdn = integer(jdnValue, "JDN");
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

export function referenceKokiToJdn({ year: yearValue, month, day }) {
  const year = integer(yearValue, "Kōki year");
  return referenceGregorianToJdn({ year: year - KOKI_OFFSET, month, day });
}

export function referenceJdnToKoki(jdn) {
  const gregorian = referenceJdnToGregorian(jdn);
  return Object.freeze({
    system: "koki",
    calendar: "koki",
    year: gregorian.year + KOKI_OFFSET,
    month: gregorian.month,
    day: gregorian.day,
  });
}
