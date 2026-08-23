"use strict";

// Modified JavaScript port/derivative of CALENDRICA 4.0 Hindu calendar code.
// Upstream copyright: Edward M. Reingold and Nachum Dershowitz.
// Upstream license: Apache-2.0; see THIRD_PARTY_LICENSES/CALENDRICA-APACHE-2.0.txt.
// This file has been substantially adapted for the Pastafari Calendar project.

// Independent verification port of the Update 11 source lock.
// It imports no production calendar code and no Old Hindu converter.
// Source: CALENDRICA 4.0 calendar.l at
// 9afc1f3277b839db1a70c2350d6c708ac83df78f.

const JDN_OFFSET = 1_721_425;
const EPOCH = -1_132_959;
const SIDEREAL_YEAR = 365 + 279457 / 1080000;
const CREATION = EPOCH - 1_955_880_000 * SIDEREAL_YEAR;
const SIDEREAL_MONTH = 27 + 4644439 / 14438334;
const SYNODIC_MONTH = 29 + 7087771 / 13358334;
const ANOMALISTIC_YEAR = 1577917828000 / (4320000000 - 387);
const ANOMALISTIC_MONTH = 1577917828 / (57753336 - 488199);
const VIKRAMA_ERA = 3044;
const UJJAIN_PHI = 23 + 9 / 60;
const SINE_STEP = 225 / 60;
const INVERSE_RADIUS = 70;

export const REFERENCE_ID = "CALENDRICA_4_TRADITIONAL_HINDU_LUNAR_VIKRAMA_LOCKED";
export const REFERENCE_COMMIT = "9afc1f3277b839db1a70c2350d6c708ac83df78f";
export const MONTH_NAMES = Object.freeze([
  "Caitra", "Vaiśākha", "Jyaiṣṭha", "Āṣāḍha", "Śrāvaṇa", "Bhādrapada",
  "Āśvina", "Kārttika", "Mārgaśīrṣa", "Pauṣa", "Māgha", "Phālguna",
]);

const mathMod = (x, n) => ((x % n) + n) % n;
const modRange = (x, a, b) => (a === b ? x : a + mathMod(x - a, b - a));
const adjustedMod = (x, n) => 1 + mathMod(x - 1, n);
const sinDeg = x => Math.sin(x * Math.PI / 180);

function lispRound(x) {
  const lo = Math.floor(x);
  const fraction = x - lo;
  if (fraction < 0.5) return lo;
  if (fraction > 0.5) return lo + 1;
  return mathMod(lo, 2) === 0 ? lo : lo + 1;
}

function sineTable(k) {
  const exact = 3438 * sinDeg(k * SINE_STEP);
  const correction = 0.215 * Math.sign(exact) * Math.sign(Math.abs(exact) - 1716);
  return lispRound(exact + correction) / 3438;
}

function hinduSine(theta) {
  const position = theta / SINE_STEP;
  const fraction = mathMod(position, 1);
  return fraction * sineTable(Math.ceil(position)) + (1 - fraction) * sineTable(Math.floor(position));
}

function arcsinPositive(amplitude) {
  let k = 0;
  while (amplitude > sineTable(k)) {
    if (++k > 24) throw new Error("reference Hindu arcsine table overflow");
  }
  const below = sineTable(k - 1);
  return SINE_STEP * (k - 1 + (amplitude - below) / (sineTable(k) - below));
}
const hinduArcsin = amplitude => amplitude < 0 ? -arcsinPositive(-amplitude) : arcsinPositive(amplitude);

const meanPosition = (tee, period) => 360 * mathMod((tee - CREATION) / period, 1);
function truePosition(tee, period, epicycleSize, anomalyPeriod, shrink) {
  const center = meanPosition(tee, period);
  const offset = hinduSine(meanPosition(tee, anomalyPeriod));
  const epicycle = epicycleSize - Math.abs(offset) * shrink * epicycleSize;
  return mathMod(center - hinduArcsin(offset * epicycle), 360);
}
const solarLongitude = tee => truePosition(tee, SIDEREAL_YEAR, 14 / 360, ANOMALISTIC_YEAR, 1 / 42);
const lunarLongitude = tee => truePosition(tee, SIDEREAL_MONTH, 32 / 360, ANOMALISTIC_MONTH, 1 / 96);
const lunarPhase = tee => mathMod(lunarLongitude(tee) - solarLongitude(tee), 360);
const tithiAt = tee => 1 + Math.floor(lunarPhase(tee) / 12);
const zodiacAt = tee => 1 + Math.floor(solarLongitude(tee) / 30);
const calendarYearAt = tee => lispRound((tee - EPOCH) / SIDEREAL_YEAR - solarLongitude(tee) / 360);

function tropicalLongitude(date) {
  const days = date - EPOCH;
  const precession = 27 - Math.abs(108 * modRange((600 / 1577917828) * days - 1 / 4, -1 / 2, 1 / 2));
  return mathMod(solarLongitude(date) - precession, 360);
}

function dailyMotion(date) {
  const anomaly = meanPosition(date, ANOMALISTIC_YEAR);
  const epicycle = 14 / 360 - Math.abs(hinduSine(anomaly)) / 1080;
  const entry = Math.floor(anomaly / SINE_STEP);
  const derivative = sineTable(entry + 1) - sineTable(entry);
  return (360 / SIDEREAL_YEAR) * (1 + (-3438 / 225) * derivative * epicycle);
}

function risingSign(date) {
  const table = [1670, 1795, 1935, 1935, 1795, 1670];
  return table[mathMod(Math.floor(tropicalLongitude(date) / 30), 6)] / 1800;
}

function ascensionalDifference(date) {
  const sinDelta = 1397 / 3438 * hinduSine(tropicalLongitude(date));
  const radius = hinduSine(90 + hinduArcsin(sinDelta));
  const tanPhi = hinduSine(UJJAIN_PHI) / hinduSine(90 + UJJAIN_PHI);
  return hinduArcsin(-(sinDelta * tanPhi) / radius);
}

function equationOfTime(date) {
  const offset = hinduSine(meanPosition(date, ANOMALISTIC_YEAR));
  const equationSun = offset * 57.3 * (14 / 360 - Math.abs(offset) / 1080);
  return (dailyMotion(date) / 360) * (equationSun / 360) * SIDEREAL_YEAR;
}

function sunrise(date) {
  const siderealCorrection = dailyMotion(date) * risingSign(date);
  return date + 1 / 4 - equationOfTime(date)
    + (1577917828 / 1582237828 / 360) * (ascensionalDifference(date) + siderealCorrection / 4);
}

function newMoonBefore(tee) {
  const estimate = tee - lunarPhase(tee) / 360 * SYNODIC_MONTH;
  let low = estimate - 1;
  let high = Math.min(tee, estimate + 1);
  for (let i = 0; i < 256; i += 1) {
    const middle = (low + high) / 2;
    if (zodiacAt(low) === zodiacAt(high) || high - low < 2 ** -48) return middle;
    if (lunarPhase(middle) < 180) high = middle;
    else low = middle;
  }
  throw new Error("reference new-moon inversion did not converge");
}

export function referenceFixedToVikrama(fixed) {
  if (!Number.isSafeInteger(fixed)) throw new RangeError("reference fixed day must be a safe integer");
  const dawn = sunrise(fixed);
  const tithi = tithiAt(dawn);
  const previousTithi = tithiAt(sunrise(fixed - 1));
  const previousMoon = newMoonBefore(dawn);
  const followingMoon = newMoonBefore(Math.floor(previousMoon) + 35);
  const solarMonth = zodiacAt(previousMoon);
  const leapMonth = solarMonth === zodiacAt(followingMoon);
  const month = adjustedMod(solarMonth + 1, 12);
  const year = calendarYearAt(month <= 2 ? fixed + 180 : fixed) - VIKRAMA_ERA;
  return Object.freeze({
    year: BigInt(year),
    month,
    monthName: MONTH_NAMES[month - 1],
    leapMonth,
    tithi,
    leapTithi: tithi === previousTithi,
  });
}

function numericShape(value) {
  const yearBig = typeof value.year === "bigint" ? value.year : BigInt(value.year);
  const year = Number(yearBig);
  if (!Number.isSafeInteger(year)) throw new RangeError("reference Vikrama year outside safe range");
  if (!Number.isInteger(value.month) || value.month < 1 || value.month > 12) throw new RangeError("reference month outside 1..12");
  if (!Number.isInteger(value.tithi) || value.tithi < 1 || value.tithi > 30) throw new RangeError("reference tithi outside 1..30");
  if (typeof value.leapMonth !== "boolean" || typeof value.leapTithi !== "boolean") throw new TypeError("reference leap flags must be boolean");
  return { year, month: value.month, leapMonth: value.leapMonth, tithi: value.tithi, leapTithi: value.leapTithi };
}

function inverseEstimate(value) {
  const approx = EPOCH + SIDEREAL_YEAR * (value.year + VIKRAMA_ERA + (value.month - 1) / 12);
  return Math.floor(approx - SIDEREAL_YEAR * modRange(solarLongitude(approx) / 360 - (value.month - 1) / 12, -1 / 2, 1 / 2));
}

function equalDate(actual, expected) {
  return Number(actual.year) === expected.year
    && actual.month === expected.month
    && actual.leapMonth === expected.leapMonth
    && actual.tithi === expected.tithi
    && actual.leapTithi === expected.leapTithi;
}

export function referenceVikramaToFixed(input) {
  const wanted = numericShape(input);
  const center = inverseEstimate(wanted);
  for (let delta = 0; delta <= INVERSE_RADIUS; delta += 1) {
    const candidates = delta === 0 ? [center] : [center - delta, center + delta];
    for (const fixed of candidates) {
      if (equalDate(referenceFixedToVikrama(fixed), wanted)) return fixed;
    }
  }
  throw new RangeError("reference Vikrama representation is omitted or outside bounded inverse window");
}

export function referenceJdnToVikrama(jdn) {
  const j = typeof jdn === "bigint" ? jdn : BigInt(jdn);
  const fixed = Number(j - BigInt(JDN_OFFSET));
  if (!Number.isSafeInteger(fixed)) throw new RangeError("reference JDN outside safe range");
  return referenceFixedToVikrama(fixed);
}

export function referenceVikramaToJdn(value) {
  return BigInt(referenceVikramaToFixed(value) + JDN_OFFSET);
}
