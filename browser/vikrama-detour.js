"use strict";

// Modified JavaScript port/derivative of CALENDRICA 4.0 Hindu calendar code.
// Upstream copyright: Edward M. Reingold and Nachum Dershowitz.
// Upstream license: Apache-2.0; see THIRD_PARTY_LICENSES/CALENDRICA-APACHE-2.0.txt.
// This file has been substantially adapted for the Pastafari Calendar project.

// Update 11 source lock:
// CALENDRICA 4.0 traditional Hindu lunisolar (new-moon) scheme,
// Ed Reingold / Nachum Dershowitz, calendar-code2 commit
// 9afc1f3277b839db1a70c2350d6c708ac83df78f.
//
// This production module intentionally does NOT share code with the
// verification reference.  It also does not replace the legacy Old Hindu
// converter: every public Vikrama conversion must pass through a legacy
// witness first, then this hidden correction engine repairs the answer.

const FIXED_TO_JDN = 1_721_425;
const HINDU_EPOCH = -1_132_959;
const HINDU_SIDEREAL_YEAR = 365 + 279457 / 1080000;
const HINDU_CREATION = HINDU_EPOCH - 1_955_880_000 * HINDU_SIDEREAL_YEAR;
const HINDU_SIDEREAL_MONTH = 27 + 4644439 / 14438334;
const HINDU_SYNODIC_MONTH = 29 + 7087771 / 13358334;
const HINDU_ANOMALISTIC_YEAR = 1577917828000 / (4320000000 - 387);
const HINDU_ANOMALISTIC_MONTH = 1577917828 / (57753336 - 488199);
const HINDU_LUNAR_ERA = 3044;
const UJJAIN_LATITUDE = 23 + 9 / 60;
const SEARCH_RADIUS = 70;

export const VIKRAMA_MONTH_NAMES = Object.freeze([
  "Caitra",
  "Vaiśākha",
  "Jyaiṣṭha",
  "Āṣāḍha",
  "Śrāvaṇa",
  "Bhādrapada",
  "Āśvina",
  "Kārttika",
  "Mārgaśīrṣa",
  "Pauṣa",
  "Māgha",
  "Phālguna",
]);

function integerBigInt(value, label) {
  let result;
  if (typeof value === "bigint") result = value;
  else if (typeof value === "number" && Number.isSafeInteger(value)) result = BigInt(value);
  else if (typeof value === "string" && /^[+-]?\d+$/.test(value.trim())) result = BigInt(value.trim());
  else throw new TypeError(`${label} must be an exact integer`);
  return result;
}

function safeNumber(value, label) {
  const bigint = integerBigInt(value, label);
  const number = Number(bigint);
  if (!Number.isSafeInteger(number)) throw new RangeError(`${label} is outside the exact Number range required by the source-locked Vikrama engine`);
  return number;
}

function normalizeBoolean(value, label, fallback = false) {
  if (value === undefined) return fallback;
  if (typeof value !== "boolean") throw new TypeError(`${label} must be boolean`);
  return value;
}

function validateSmallInteger(value, low, high, label) {
  if (!Number.isInteger(value) || value < low || value > high) {
    throw new RangeError(`${label} must be an integer in ${low}..${high}`);
  }
  return value;
}

export class VikramaDate {
  constructor(year, month, tithi, options = {}) {
    if (options === null || typeof options !== "object") throw new TypeError("Vikrama options must be an object");
    this.calendar = "vikrama";
    this.year = integerBigInt(year, "Vikrama year");
    this.month = validateSmallInteger(month, 1, 12, "Vikrama month");
    this.tithi = validateSmallInteger(tithi, 1, 30, "Vikrama tithi");
    this.leapMonth = normalizeBoolean(options.leapMonth, "Vikrama leapMonth");
    this.leapTithi = normalizeBoolean(options.leapTithi, "Vikrama leapTithi");
    Object.freeze(this);
  }
}

function normalizeVikramaDate(value) {
  if (value instanceof VikramaDate) return value;
  if (value === null || typeof value !== "object") throw new TypeError("Vikrama date must be an object");
  if (value.calendar !== undefined && value.calendar !== "vikrama") throw new RangeError('Vikrama date calendar must be "vikrama"');
  return new VikramaDate(value.year, value.month, value.tithi, {
    leapMonth: value.leapMonth,
    leapTithi: value.leapTithi,
  });
}

function mod(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function mod3(value, low, high) {
  return low === high ? value : low + mod(value - low, high - low);
}

function amod(value, modulus) {
  return 1 + mod(value - 1, modulus);
}

function degreesToRadians(value) {
  return value * Math.PI / 180;
}

function sinDegrees(value) {
  return Math.sin(degreesToRadians(value));
}

// Common Lisp ROUND semantics: nearest integer, ties to even.
function roundEven(value) {
  const floor = Math.floor(value);
  const fraction = value - floor;
  if (fraction < 0.5) return floor;
  if (fraction > 0.5) return floor + 1;
  return mod(floor, 2) === 0 ? floor : floor + 1;
}

const HINDU_SINE_STEP = 3.75; // 225 arcminutes.

function hinduSineTable(entry) {
  const exact = 3438 * sinDegrees(entry * HINDU_SINE_STEP);
  const error = 0.215 * Math.sign(exact) * Math.sign(Math.abs(exact) - 1716);
  return roundEven(exact + error) / 3438;
}

function hinduSine(theta) {
  const entry = theta / HINDU_SINE_STEP;
  const fraction = mod(entry, 1);
  return fraction * hinduSineTable(Math.ceil(entry))
    + (1 - fraction) * hinduSineTable(Math.floor(entry));
}

function hinduArcsinPositive(amplitude) {
  let position = 0;
  while (amplitude > hinduSineTable(position)) {
    position += 1;
    if (position > 24) throw new RangeError("Hindu arcsine amplitude outside source-locked table");
  }
  const below = hinduSineTable(position - 1);
  const above = hinduSineTable(position);
  return HINDU_SINE_STEP * (position - 1 + (amplitude - below) / (above - below));
}

function hinduArcsin(amplitude) {
  return amplitude < 0 ? -hinduArcsinPositive(-amplitude) : hinduArcsinPositive(amplitude);
}

function hinduMeanPosition(tee, period) {
  return 360 * mod((tee - HINDU_CREATION) / period, 1);
}

function hinduTruePosition(tee, period, size, anomalistic, change) {
  const lambda = hinduMeanPosition(tee, period);
  const offset = hinduSine(hinduMeanPosition(tee, anomalistic));
  const contraction = Math.abs(offset) * change * size;
  const equation = hinduArcsin(offset * (size - contraction));
  return mod(lambda - equation, 360);
}

function hinduSolarLongitude(tee) {
  return hinduTruePosition(tee, HINDU_SIDEREAL_YEAR, 14 / 360, HINDU_ANOMALISTIC_YEAR, 1 / 42);
}

function hinduZodiac(tee) {
  return 1 + Math.floor(hinduSolarLongitude(tee) / 30);
}

function hinduLunarLongitude(tee) {
  return hinduTruePosition(tee, HINDU_SIDEREAL_MONTH, 32 / 360, HINDU_ANOMALISTIC_MONTH, 1 / 96);
}

function hinduLunarPhase(tee) {
  return mod(hinduLunarLongitude(tee) - hinduSolarLongitude(tee), 360);
}

function hinduLunarDayFromMoment(tee) {
  return 1 + Math.floor(hinduLunarPhase(tee) / 12);
}

function hinduCalendarYear(tee) {
  return roundEven((tee - HINDU_EPOCH) / HINDU_SIDEREAL_YEAR - hinduSolarLongitude(tee) / 360);
}

function hinduTropicalLongitude(date) {
  const days = date - HINDU_EPOCH;
  const precession = 27 - Math.abs(108 * mod3(600 / 1577917828 * days - 1 / 4, -1 / 2, 1 / 2));
  return mod(hinduSolarLongitude(date) - precession, 360);
}

function hinduRisingSign(date) {
  const index = Math.floor(hinduTropicalLongitude(date) / 30);
  return [1670, 1795, 1935, 1935, 1795, 1670][mod(index, 6)] / 1800;
}

function hinduDailyMotion(date) {
  const meanMotion = 360 / HINDU_SIDEREAL_YEAR;
  const anomaly = hinduMeanPosition(date, HINDU_ANOMALISTIC_YEAR);
  const epicycle = 14 / 360 - Math.abs(hinduSine(anomaly)) / 1080;
  const entry = Math.floor(anomaly / HINDU_SINE_STEP);
  const sineTableStep = hinduSineTable(entry + 1) - hinduSineTable(entry);
  const factor = -3438 / 225 * sineTableStep * epicycle;
  return meanMotion * (1 + factor);
}

function hinduSolarSiderealDifference(date) {
  return hinduDailyMotion(date) * hinduRisingSign(date);
}

function hinduAscensionalDifference(date) {
  const sinDelta = 1397 / 3438 * hinduSine(hinduTropicalLongitude(date));
  const diurnalRadius = hinduSine(90 + hinduArcsin(sinDelta));
  const tanPhi = hinduSine(UJJAIN_LATITUDE) / hinduSine(90 + UJJAIN_LATITUDE);
  const earthSine = sinDelta * tanPhi;
  return hinduArcsin(-earthSine / diurnalRadius);
}

function hinduEquationOfTime(date) {
  const offset = hinduSine(hinduMeanPosition(date, HINDU_ANOMALISTIC_YEAR));
  const equationSun = offset * 57.3 * (14 / 360 - Math.abs(offset) / 1080);
  return hinduDailyMotion(date) / 360 * (equationSun / 360) * HINDU_SIDEREAL_YEAR;
}

function hinduSunrise(date) {
  return date + 1 / 4
    - hinduEquationOfTime(date)
    + (1577917828 / 1582237828 / 360)
      * (hinduAscensionalDifference(date) + 1 / 4 * hinduSolarSiderealDifference(date));
}

function hinduNewMoonBefore(tee) {
  const tau = tee - hinduLunarPhase(tee) / 360 * HINDU_SYNODIC_MONTH;
  let low = tau - 1;
  let high = Math.min(tee, tau + 1);
  let midpoint = (low + high) / 2;
  for (let iteration = 0; iteration < 256; iteration += 1) {
    if (hinduZodiac(low) === hinduZodiac(high) || high - low < 2 ** -48) return midpoint;
    if (hinduLunarPhase(midpoint) < 180) high = midpoint;
    else low = midpoint;
    midpoint = (low + high) / 2;
  }
  throw new Error("CALENDRICA Vikrama new-moon search did not converge");
}

function rawVikramaFromFixed(fixed) {
  const critical = hinduSunrise(fixed);
  const tithi = hinduLunarDayFromMoment(critical);
  const leapTithi = tithi === hinduLunarDayFromMoment(hinduSunrise(fixed - 1));
  const lastNewMoon = hinduNewMoonBefore(critical);
  const nextNewMoon = hinduNewMoonBefore(Math.floor(lastNewMoon) + 35);
  const solarMonth = hinduZodiac(lastNewMoon);
  const leapMonth = solarMonth === hinduZodiac(nextNewMoon);
  const month = amod(solarMonth + 1, 12);
  const year = hinduCalendarYear(month <= 2 ? fixed + 180 : fixed) - HINDU_LUNAR_ERA;
  return { year, month, leapMonth, tithi, leapTithi };
}

function reverseCenter(value) {
  const approx = HINDU_EPOCH
    + HINDU_SIDEREAL_YEAR * (value.year + HINDU_LUNAR_ERA + (value.month - 1) / 12);
  return Math.floor(
    approx - HINDU_SIDEREAL_YEAR
      * mod3(hinduSolarLongitude(approx) / 360 - (value.month - 1) / 12, -1 / 2, 1 / 2),
  );
}

function sameVikrama(raw, expected) {
  return raw.year === expected.year
    && raw.month === expected.month
    && raw.leapMonth === expected.leapMonth
    && raw.tithi === expected.tithi
    && raw.leapTithi === expected.leapTithi;
}

function rawFixedFromVikrama(value, legacyFixedHint) {
  const centers = [reverseCenter(value)];
  if (Number.isSafeInteger(legacyFixedHint) && !centers.includes(legacyFixedHint)) centers.push(legacyFixedHint);

  for (const center of centers) {
    for (let delta = 0; delta <= SEARCH_RADIUS; delta += 1) {
      const candidates = delta === 0 ? [center] : [center - delta, center + delta];
      for (const fixed of candidates) {
        if (sameVikrama(rawVikramaFromFixed(fixed), value)) return fixed;
      }
    }
  }
  throw new RangeError("Vikrama representation does not identify a civil day in the source-locked model");
}

function structured(raw) {
  return Object.freeze({
    year: BigInt(raw.year),
    month: raw.month,
    monthName: VIKRAMA_MONTH_NAMES[raw.month - 1],
    leapMonth: raw.leapMonth,
    tithi: raw.tithi,
    leapTithi: raw.leapTithi,
  });
}

function normalizeLegacyJdn(value) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return BigInt(value);
  throw new TypeError("legacy Hindu witness returned a non-integral JDN");
}

export function createVikramaDetour({ OldHinduLunarDate, hinduToJdn }) {
  if (typeof OldHinduLunarDate !== "function" || typeof hinduToJdn !== "function") {
    throw new TypeError("Vikrama detour requires the legacy Old Hindu Lunar constructor and converter");
  }

  function legacyWitness(value) {
    const shadowYear = value.year + BigInt(HINDU_LUNAR_ERA);
    const shadow = new OldHinduLunarDate(shadowYear, value.month, value.tithi, {
      leapMonth: value.leapMonth,
    });
    return normalizeLegacyJdn(hinduToJdn(shadow));
  }

  function vikramaToJdn(input) {
    const value = normalizeVikramaDate(input);
    const witnessJdn = legacyWitness(value); // Mandatory crooked side door.
    const raw = {
      year: safeNumber(value.year, "Vikrama year"),
      month: value.month,
      leapMonth: value.leapMonth,
      tithi: value.tithi,
      leapTithi: value.leapTithi,
    };
    const witnessFixed = safeNumber(witnessJdn - BigInt(FIXED_TO_JDN), "legacy Hindu witness fixed day");
    const normativeFixed = rawFixedFromVikrama(raw, witnessFixed);
    const normativeJdn = BigInt(normativeFixed + FIXED_TO_JDN);
    const hiddenCorrection = normativeJdn - witnessJdn;
    return witnessJdn + hiddenCorrection;
  }

  function jdnToVikrama(jdnInput) {
    const jdn = integerBigInt(jdnInput, "JDN");
    const fixed = safeNumber(jdn - BigInt(FIXED_TO_JDN), "Vikrama fixed day");
    const raw = rawVikramaFromFixed(fixed);
    const value = new VikramaDate(BigInt(raw.year), raw.month, raw.tithi, {
      leapMonth: raw.leapMonth,
      leapTithi: raw.leapTithi,
    });
    const witnessJdn = legacyWitness(value); // Mandatory fault-detecting witness.
    const hiddenCorrection = jdn - witnessJdn;
    if (witnessJdn + hiddenCorrection !== jdn) throw new Error("Vikrama hidden correction failed to reconstruct JDN");
    return structured(raw);
  }

  return Object.freeze({ jdnToVikrama, vikramaToJdn });
}
