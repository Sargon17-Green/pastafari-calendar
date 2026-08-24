"use strict";

// Update 17 independent external-calendar reference aggregator.
// Only independent arithmetic/source-locked reference modules are imported.
// No production converter, public API, Intl/ICU path, or golden vector is read.
import {
  fromJdn as arithmeticFromJdn,
  floorDiv,
  mod,
} from "../update9/proleptic-negative-year-reference.mjs";
import { referenceJdnToGregorian, referenceGregorianToJdn } from "../update12/reference-koki.mjs";
import { referenceFixedToVikrama } from "../update11/vikrama-reference.mjs";
import { referenceJdnToKoki } from "../update12/reference-koki.mjs";
import { referenceJdnToChinese } from "./chinese-reference.mjs";

export const RD_JDN_OFFSET = 1_721_425n;
const PERSIAN_EPOCH_JDN = 1_948_321n;
const GMT_CORRELATION = 584_283n;

function asBig(value, label = "integer") {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  if (typeof value === "string" && /^[+-]?\d+$/u.test(value)) return BigInt(value);
  throw new TypeError(`${label} must be an integer`);
}

export function referenceJdnToJulian(jdnValue) {
  const jdn = asBig(jdnValue, "JDN");
  const c = jdn + 32082n;
  const d = floorDiv(4n * c + 3n, 1461n);
  const e = c - floorDiv(1461n * d, 4n);
  const m = floorDiv(5n * e + 2n, 153n);
  const day = e - floorDiv(153n * m + 2n, 5n) + 1n;
  const month = m + 3n - 12n * floorDiv(m, 10n);
  const astronomicalYear = d - 4800n + floorDiv(m, 10n);
  // The scroll preserves the historical Julian convention with no year zero.
  const historicalYear = astronomicalYear <= 0n ? astronomicalYear - 1n : astronomicalYear;
  return Object.freeze({
    astronomicalYear,
    historicalYear,
    era: historicalYear < 0n ? "BCE" : "CE",
    displayYear: historicalYear < 0n ? -historicalYear : historicalYear,
    month: Number(month),
    day: Number(day),
  });
}

function solarHijriYearStart(yearValue) {
  const year = asBig(yearValue, "Solar Hijri year");
  if (year === 0n) throw new RangeError("Solar Hijri has no year zero");
  const epBase = year - (year >= 0n ? 474n : 473n);
  const epYear = 474n + mod(epBase, 2820n);
  return PERSIAN_EPOCH_JDN - 1n
    + 365n * (epYear - 1n)
    + floorDiv(682n * epYear - 110n, 2816n)
    + floorDiv(epBase, 2820n) * 1_029_983n;
}

function nextNoZeroYear(year) {
  return year === -1n ? 1n : year + 1n;
}

export function referenceSolarHijriArithmeticToJdn({ year: yearValue, month, day }) {
  const year = asBig(yearValue, "Solar Hijri year");
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError("month must be 1..12");
  const start = solarHijriYearStart(year);
  const next = solarHijriYearStart(nextNoZeroYear(year));
  const yearLength = Number(next - start);
  const monthLength = month <= 6 ? 31 : month <= 11 ? 30 : yearLength - 336;
  if (!Number.isInteger(day) || day < 1 || day > monthLength) throw new RangeError("invalid Solar Hijri day");
  const monthDays = month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6;
  return start + BigInt(monthDays + day);
}

export function referenceJdnToSolarHijriArithmetic(jdnValue) {
  const jdn = asBig(jdnValue, "JDN");
  // Gregorian-year estimate is comfortably within one Solar-Hijri year.
  const g = referenceJdnToGregorian(jdn);
  let year = g.year - 621n;
  if (year === 0n) year = -1n;
  while (solarHijriYearStart(year) > jdn) year = year === 1n ? -1n : year - 1n;
  while (solarHijriYearStart(nextNoZeroYear(year)) <= jdn) year = nextNoZeroYear(year);
  const start = solarHijriYearStart(year);
  let ordinal = Number(jdn - start); // formula uses day 1 at start+1, so this is one-based
  let month;
  let day;
  if (ordinal <= 186) {
    month = Math.floor((ordinal - 1) / 31) + 1;
    day = (ordinal - 1) % 31 + 1;
  } else {
    ordinal -= 186;
    month = Math.floor((ordinal - 1) / 30) + 7;
    day = (ordinal - 1) % 30 + 1;
  }
  return Object.freeze({ year, month, day });
}

export function referenceJdnToThaiBuddhist(jdn) {
  const g = referenceJdnToGregorian(jdn);
  return Object.freeze({ year: g.year + 543n, month: g.month, day: g.day });
}

export function referenceJdnToMinguo(jdn) {
  const g = referenceJdnToGregorian(jdn);
  return Object.freeze({ year: g.year - 1911n, month: g.month, day: g.day });
}

export function referenceJdnToMayaLongCount(jdnValue) {
  const total = asBig(jdnValue, "JDN") - GMT_CORRELATION;
  let remainder = total;
  const baktun = floorDiv(remainder, 144_000n); remainder -= baktun * 144_000n;
  const katun = floorDiv(remainder, 7_200n); remainder -= katun * 7_200n;
  const tun = floorDiv(remainder, 360n); remainder -= tun * 360n;
  const uinal = floorDiv(remainder, 20n); remainder -= uinal * 20n;
  return Object.freeze({ baktun, katun, tun, uinal, kin: remainder });
}

export function referenceJdnToVikrama(jdnValue) {
  const fixed = Number(asBig(jdnValue, "JDN") - RD_JDN_OFFSET);
  if (!Number.isSafeInteger(fixed)) throw new RangeError("Vikrama fixed day outside safe integer range");
  return referenceFixedToVikrama(fixed);
}

export function referenceJdnRepresentations(jdnValue) {
  const jdn = asBig(jdnValue, "JDN");
  const gregorian = referenceJdnToGregorian(jdn);
  return Object.freeze({
    gregorian,
    julian: referenceJdnToJulian(jdn),
    hebrew: arithmeticFromJdn("hebrew", jdn),
    islamicCivil: arithmeticFromJdn("islamic-civil", jdn),
    solarHijriArithmetic: referenceJdnToSolarHijriArithmetic(jdn),
    chinese: referenceJdnToChinese(jdn),
    vikrama: referenceJdnToVikrama(jdn),
    saka: arithmeticFromJdn("saka", jdn),
    thaiBuddhist: referenceJdnToThaiBuddhist(jdn),
    ethiopic: arithmeticFromJdn("ethiopic", jdn),
    coptic: arithmeticFromJdn("coptic", jdn),
    koki: referenceJdnToKoki(jdn),
    minguo: referenceJdnToMinguo(jdn),
    bahaiWestern: arithmeticFromJdn("bahai-western", jdn),
    mayaLongCount: referenceJdnToMayaLongCount(jdn),
  });
}

export { referenceGregorianToJdn };
