"use strict";

// Chinese calendar deterministic shadow engine for the public wrapper.
//
// Provenance:
// - Algorithmic structure is ported from CALENDRICA 4.0, Edward M. Reingold
//   and Nachum Dershowitz, Apache License 2.0.
// - The deep-antiquity Delta-T extension follows the project source rule
//   PASTAFARI_CHINESE_DEEP_DELTA_T_V1 in sources/chinese/农历规范算法.zh.md.
//
// This module intentionally avoids Intl/ICU. It does not modify the tangled
// authoritative implementation; public entry points can call it as a named
// shadow path.

export const PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID = "PASTAFARI_CHINESE_DEEP_DELTA_T_V1";

const RD_JDN_OFFSET = 1721425;
const DEG = Math.PI / 180;
const J2000 = 730120.5;
const MEAN_TROPICAL_YEAR = 365.242189;
const MEAN_SYNODIC_MONTH = 29.530588861;
const WINTER = 270;
const DEEP_DELTA_T_THRESHOLD_YEAR = -1999;
const DEEP_DELTA_T_FACTOR = 26 / 25;
const CHINESE_EPOCH = fixedFromGregorian(-2636, 2, 15);

function mod(x, n) { return ((x % n) + n) % n; }
function amod(x, n) { return mod(x - 1, n) + 1; }
function mod3(x, a, b) { return a === b ? x : a + mod(x - a, b - a); }
function quotient(m, n) { return Math.floor(m / n); }
function roundCL(x) { return Math.floor(x + 0.5); }
function poly(x, a) { let s = 0; for (let i = a.length - 1; i >= 0; i -= 1) s = s * x + a[i]; return s; }
function sinDeg(x) { return Math.sin(DEG * mod(x, 360)); }
function cosDeg(x) { return Math.cos(DEG * mod(x, 360)); }
function angle(d, m, s) { return d + (m + s / 60) / 60; }
function hr(x) { return x / 24; }

function assertSafeNumber(value, label) {
  const numeric = Number(value);
  if (!Number.isSafeInteger(numeric)) {
    throw new RangeError(`${label} is outside the deterministic Chinese shadow engine range.`);
  }
  return numeric;
}

export function isGregorianLeapYear(year) {
  return mod(year, 4) === 0 && ![100, 200, 300].includes(mod(year, 400));
}

export function fixedFromGregorian(year, month, day) {
  return 365 * (year - 1)
    + quotient(year - 1, 4)
    - quotient(year - 1, 100)
    + quotient(year - 1, 400)
    + quotient((367 * month - 362), 12)
    + (month <= 2 ? 0 : (isGregorianLeapYear(year) ? -1 : -2))
    + day;
}

export function gregorianYearFromFixed(date) {
  const d0 = date - 1;
  const n400 = quotient(d0, 146097);
  const d1 = mod(d0, 146097);
  const n100 = quotient(d1, 36524);
  const d2 = mod(d1, 36524);
  const n4 = quotient(d2, 1461);
  const d3 = mod(d2, 1461);
  const n1 = quotient(d3, 365);
  const year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
  return (n100 === 4 || n1 === 4) ? year : year + 1;
}

export function gregorianFromFixed(date) {
  const year = gregorianYearFromFixed(date);
  const priorDays = date - fixedFromGregorian(year, 1, 1);
  const correction = date < fixedFromGregorian(year, 3, 1) ? 0 : (isGregorianLeapYear(year) ? 1 : 2);
  const month = quotient(12 * (priorDays + correction) + 373, 367);
  const day = 1 + date - fixedFromGregorian(year, month, 1);
  return Object.freeze({ year, month, day });
}

function gregorianDateDifference(a, b) {
  return fixedFromGregorian(b[0], b[1], b[2]) - fixedFromGregorian(a[0], a[1], a[2]);
}

export function ephemerisCorrection(tee) {
  const year = gregorianYearFromFixed(Math.floor(tee));
  const c = gregorianDateDifference([1900, 1, 1], [year, 7, 1]) / 36525;
  const c2051 = (-20 + 32 * ((year - 1820) / 100) ** 2 + 0.5628 * (2150 - year)) / 86400;
  const y2000 = year - 2000;
  const c2006 = poly(y2000, [62.92, 0.32217, 0.005589]) / 86400;
  const c1987 = poly(y2000, [63.86, 0.3345, -0.060374, 0.0017275, 0.000651814, 0.00002373599]) / 86400;
  const c1900 = poly(c, [-0.00002, 0.000297, 0.025184, -0.181133, 0.553040, -0.861938, 0.677066, -0.212591]);
  const c1800 = poly(c, [-0.000009, 0.003844, 0.083563, 0.865736, 4.867575, 15.845535, 31.332267, 38.291999, 28.316289, 11.636204, 2.043794]);
  const y1700 = year - 1700;
  const c1700 = poly(y1700, [8.118780842, -0.005092142, 0.003336121, -0.0000266484]) / 86400;
  const y1600 = year - 1600;
  const c1600 = poly(y1600, [120, -0.9808, -0.01532, 0.000140272128]) / 86400;
  const y1000 = (year - 1000) / 100;
  const c500 = poly(y1000, [1574.2, -556.01, 71.23472, 0.319781, -0.8503463, -0.005050998, 0.0083572073]) / 86400;
  const y0 = year / 100;
  const c0 = poly(y0, [10583.6, -1014.41, 33.78311, -5.952053, -0.1798452, 0.022174192, 0.0090316521]) / 86400;
  const y1820 = (year - 1820) / 100;
  const other = poly(y1820, [-20, 0, 32]) / 86400;

  if (year < DEEP_DELTA_T_THRESHOLD_YEAR) return DEEP_DELTA_T_FACTOR * other;
  if (2051 <= year && year <= 2150) return c2051;
  if (2006 <= year && year <= 2050) return c2006;
  if (1987 <= year && year <= 2005) return c1987;
  if (1900 <= year && year <= 1986) return c1900;
  if (1800 <= year && year <= 1899) return c1800;
  if (1700 <= year && year <= 1799) return c1700;
  if (1600 <= year && year <= 1699) return c1600;
  if (500 <= year && year <= 1599) return c500;
  if (-500 < year && year < 500) return c0;
  return other;
}

function dynamicalFromUniversal(tee) { return tee + ephemerisCorrection(tee); }
function universalFromDynamical(tee) { return tee - ephemerisCorrection(tee); }
function julianCenturies(tee) { return (dynamicalFromUniversal(tee) - J2000) / 36525; }
function nutation(tee) { const c = julianCenturies(tee); return -0.004778 * sinDeg(poly(c, [124.90, -1934.134, 0.002063])) - 0.0003667 * sinDeg(poly(c, [201.11, 72001.5377, 0.00057])); }
function aberration(tee) { const c = julianCenturies(tee); return 0.0000974 * cosDeg(177.63 + 35999.01848 * c) - 0.005575; }

function solarLongitude(tee) {
  const c = julianCenturies(tee);
  const coefficients = [403406, 195207, 119433, 112392, 3891, 2819, 1721, 660, 350, 334, 314, 268, 242, 234, 158, 132, 129, 114, 99, 93, 86, 78, 72, 68, 64, 46, 38, 37, 32, 29, 28, 27, 27, 25, 24, 21, 21, 20, 18, 17, 14, 13, 13, 13, 12, 10, 10, 10, 10];
  const multipliers = [0.9287892, 35999.1376958, 35999.4089666, 35998.7287385, 71998.20261, 71998.4403, 36000.35726, 71997.4812, 32964.4678, -19.4410, 445267.1117, 45036.8840, 3.1008, 22518.4434, -19.9739, 65928.9345, 9038.0293, 3034.7684, 33718.148, 3034.448, -2280.773, 29929.992, 31556.493, 149.588, 9037.750, 107997.405, -4444.176, 151.771, 67555.316, 31556.080, -4561.540, 107996.706, 1221.655, 62894.167, 31437.369, 14578.298, -31931.757, 34777.243, 1221.999, 62894.511, -4442.039, 107997.909, 119.066, 16859.071, -4.578, 26895.292, -39.127, 12297.536, 90073.778];
  const addends = [270.54861, 340.19128, 63.91854, 331.26220, 317.843, 86.631, 240.052, 310.26, 247.23, 260.87, 297.82, 343.14, 166.79, 81.53, 3.50, 132.75, 182.95, 162.03, 29.8, 266.4, 249.2, 157.6, 257.8, 185.1, 69.9, 8.0, 197.1, 250.4, 65.3, 162.7, 341.5, 291.6, 98.5, 146.7, 110.0, 5.2, 342.6, 230.9, 256.1, 45.3, 242.9, 115.2, 151.8, 285.3, 53.3, 126.6, 205.7, 85.9, 146.1];
  let sigma = 0;
  for (let i = 0; i < coefficients.length; i += 1) sigma += coefficients[i] * sinDeg(addends[i] + multipliers[i] * c);
  const lambda = 282.7771834 + 36000.76953744 * c + 0.000005729577951308232 * sigma;
  return mod(lambda + aberration(tee) + nutation(tee), 360);
}

function invertAngular(f, y, a, b) {
  let l = a;
  let u = b;
  for (let i = 0; i < 80 && u - l >= 1e-5; i += 1) {
    const x = (l + u) / 2;
    const left = mod(f(x) - y, 360) < 180;
    if (left) u = x;
    else l = x;
  }
  return (l + u) / 2;
}

function solarLongitudeAfter(lambda, tee) {
  const rate = MEAN_TROPICAL_YEAR / 360;
  const tau = tee + rate * mod(lambda - solarLongitude(tee), 360);
  return invertAngular(solarLongitude, lambda, Math.max(tee, tau - 5), tau + 5);
}

function estimatePriorSolarLongitude(lambda, tee) {
  const rate = MEAN_TROPICAL_YEAR / 360;
  const tau = tee - rate * mod(solarLongitude(tee) - lambda, 360);
  const delta = mod3(solarLongitude(tau) - lambda, -180, 180);
  return Math.min(tee, tau - rate * delta);
}

function meanLunarLongitude(c) { return mod(poly(c, [218.3164477, 481267.88123421, -0.0015786, 1 / 538841, -1 / 65194000]), 360); }
function lunarElongation(c) { return mod(poly(c, [297.8501921, 445267.1114034, -0.0018819, 1 / 545868, -1 / 113065000]), 360); }
function solarAnomaly(c) { return mod(poly(c, [357.5291092, 35999.0502909, -0.0001536, 1 / 24490000]), 360); }
function lunarAnomaly(c) { return mod(poly(c, [134.9633964, 477198.8675055, 0.0087414, 1 / 69699, -1 / 14712000]), 360); }
function moonNode(c) { return mod(poly(c, [93.2720950, 483202.0175233, -0.0036539, -1 / 3526000, 1 / 863310000]), 360); }

function lunarLongitude(tee) {
  const c = julianCenturies(tee);
  const Lp = meanLunarLongitude(c);
  const D = lunarElongation(c);
  const M = solarAnomaly(c);
  const Mp = lunarAnomaly(c);
  const F = moonNode(c);
  const E = poly(c, [1, -0.002516, -0.0000074]);
  const argsD = [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0, 3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2];
  const argsM = [0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0, -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0];
  const argsMp = [1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1, 1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3];
  const argsF = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0, 2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0];
  const coeff = [6288774, 1274027, 658314, 213618, -185116, -114332, 58793, 57066, 53322, 45758, -40923, -34720, -30383, 15327, -12528, 10980, 10675, 10034, 8548, -7888, -6766, -5163, 4987, 4036, 3994, 3861, 3665, -2689, -2602, 2390, -2348, 2236, -2120, -2069, 2048, -1773, -1595, 1215, -1110, -892, -810, 759, -713, -700, 691, 596, 549, 537, 520, -487, -399, -381, 351, -340, 330, 327, -323, 299, 294];
  let corr = 0;
  for (let i = 0; i < coeff.length; i += 1) corr += coeff[i] * (E ** Math.abs(argsM[i])) * sinDeg(argsD[i] * D + argsM[i] * M + argsMp[i] * Mp + argsF[i] * F);
  corr *= 1 / 1000000;
  const venus = 3958 / 1000000 * sinDeg(119.75 + c * 131.849);
  const jupiter = 318 / 1000000 * sinDeg(53.09 + c * 479264.29);
  const flatEarth = 1962 / 1000000 * sinDeg(Lp - F);
  return mod(Lp + corr + venus + jupiter + flatEarth + nutation(tee), 360);
}

function nthNewMoon(n) {
  const n0 = 24724;
  const k = n - n0;
  const c = k / 1236.85;
  const approx = J2000 + poly(c, [5.09766, MEAN_SYNODIC_MONTH * 1236.85, 0.00015437, -0.000000150, 0.00000000073]);
  const E = poly(c, [1, -0.002516, -0.0000074]);
  const solarAn = poly(c, [2.5534, 1236.85 * 29.10535670, -0.0000014, -0.00000011]);
  const lunarAn = poly(c, [201.5643, 385.81693528 * 1236.85, 0.0107582, 0.00001238, -0.000000058]);
  const moonArg = poly(c, [160.7108, 390.67050284 * 1236.85, -0.0016118, -0.00000227, 0.000000011]);
  const omega = poly(c, [124.7746, -1.56375588 * 1236.85, 0.0020672, 0.00000215]);
  const Ef = [0, 1, 0, 0, 1, 1, 2, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const sc = [0, 1, 0, 0, -1, 1, 2, 0, 0, 1, 0, 1, 1, -1, 2, 0, 3, 1, 0, 1, -1, -1, 1, 0];
  const lc = [1, 0, 2, 0, 1, 1, 0, 1, 1, 2, 3, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 3, 4];
  const mc = [0, 0, 0, 2, 0, 0, 0, -2, 2, 0, 0, 2, -2, 0, 0, -2, 0, -2, 2, 2, 2, -2, 0, 0];
  const sine = [-0.40720, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208, -0.00111, -0.00057, 0.00056, -0.00042, 0.00042, 0.00038, -0.00024, -0.00007, 0.00004, 0.00004, 0.00003, 0.00003, -0.00003, 0.00003, -0.00002, -0.00002, 0.00002];
  let correction = -0.00017 * sinDeg(omega);
  for (let i = 0; i < sine.length; i += 1) correction += sine[i] * (E ** Ef[i]) * sinDeg(sc[i] * solarAn + lc[i] * lunarAn + mc[i] * moonArg);
  const addConst = [251.88, 251.83, 349.42, 84.66, 141.74, 207.14, 154.84, 34.52, 207.19, 291.34, 161.72, 239.56, 331.55];
  const addCoeff = [0.016321, 26.651886, 36.412478, 18.206239, 53.303771, 2.453732, 7.306860, 27.261239, 0.121824, 1.844379, 24.198154, 25.513099, 3.592518];
  const addFactor = [0.000165, 0.000164, 0.000126, 0.000110, 0.000062, 0.000060, 0.000056, 0.000047, 0.000042, 0.000040, 0.000037, 0.000035, 0.000023];
  const extra = 0.000325 * sinDeg(poly(c, [299.77, 132.8475848, -0.009173]));
  let additional = 0;
  for (let i = 0; i < addConst.length; i += 1) additional += addFactor[i] * sinDeg(addConst[i] + addCoeff[i] * k);
  return universalFromDynamical(approx + correction + extra + additional);
}

function lunarPhase(tee) {
  const phi = mod(lunarLongitude(tee) - solarLongitude(tee), 360);
  const t0 = nthNewMoon(0);
  const n = roundCL((tee - t0) / MEAN_SYNODIC_MONTH);
  const phiPrime = 360 * mod((tee - nthNewMoon(n)) / MEAN_SYNODIC_MONTH, 1);
  return Math.abs(phi - phiPrime) > 180 ? phiPrime : phi;
}

function newMoonBefore(tee) {
  const t0 = nthNewMoon(0);
  const phi = lunarPhase(tee);
  const n = roundCL((tee - t0) / MEAN_SYNODIC_MONTH - phi / 360);
  let k = n - 1;
  while (nthNewMoon(k) < tee) k += 1;
  return nthNewMoon(k - 1);
}

function newMoonAtOrAfter(tee) {
  const t0 = nthNewMoon(0);
  const phi = lunarPhase(tee);
  const n = roundCL((tee - t0) / MEAN_SYNODIC_MONTH - phi / 360);
  let k = n;
  while (nthNewMoon(k) < tee) k += 1;
  return nthNewMoon(k);
}

function chineseLocation(tee) {
  const year = gregorianYearFromFixed(Math.floor(tee));
  return { lat: angle(39, 55, 0), lon: angle(116, 25, 0), elev: 43.5, zone: year < 1929 ? hr(1397 / 180) : hr(8) };
}

function universalFromStandard(tee, loc) { return tee - loc.zone; }
function standardFromUniversal(tee, loc) { return tee + loc.zone; }
function midnightInChina(date) { return universalFromStandard(date, chineseLocation(date)); }
function chineseNewMoonBefore(date) { const tee = newMoonBefore(midnightInChina(date)); return Math.floor(standardFromUniversal(tee, chineseLocation(tee))); }
function chineseNewMoonOnOrAfter(date) { const tee = newMoonAtOrAfter(midnightInChina(date)); return Math.floor(standardFromUniversal(tee, chineseLocation(tee))); }
function currentMajorSolarTerm(date) { const s = solarLongitude(universalFromStandard(date, chineseLocation(date))); return amod(2 + quotient(s, 30), 12); }
function noMajorSolarTerm(date) { return currentMajorSolarTerm(date) === currentMajorSolarTerm(chineseNewMoonOnOrAfter(date + 1)); }

function chineseWinterSolsticeOnOrBefore(date) {
  const approx = estimatePriorSolarLongitude(WINTER, midnightInChina(date + 1));
  for (let day = Math.floor(approx) - 1; ; day += 1) {
    if (WINTER < solarLongitude(midnightInChina(day + 1))) return day;
    if (day > Math.floor(approx) + 20) throw new Error("Chinese winter solstice search failed.");
  }
}

function chineseNewYearInSui(date) {
  const s1 = chineseWinterSolsticeOnOrBefore(date);
  const s2 = chineseWinterSolsticeOnOrBefore(s1 + 370);
  const m12 = chineseNewMoonOnOrAfter(s1 + 1);
  const m13 = chineseNewMoonOnOrAfter(m12 + 1);
  const nextM11 = chineseNewMoonBefore(s2 + 1);
  const leap = roundCL((nextM11 - m12) / MEAN_SYNODIC_MONTH) === 12 && (noMajorSolarTerm(m12) || noMajorSolarTerm(m13));
  return leap ? chineseNewMoonOnOrAfter(m13 + 1) : m13;
}

function chineseNewYearOnOrBefore(date) {
  const newYear = chineseNewYearInSui(date);
  return date >= newYear ? newYear : chineseNewYearInSui(date - 180);
}

function priorLeapMonth(mprime, m) {
  if (m < mprime) return false;
  return noMajorSolarTerm(m) || priorLeapMonth(mprime, chineseNewMoonBefore(m));
}

function chineseSexagesimalName(n) { return { stem: amod(n, 10), branch: amod(n, 12) }; }

function stemBranchNames(yearInCycle) {
  const stems = ["jia", "yi", "bing", "ding", "wu", "ji", "geng", "xin", "ren", "gui"];
  const branches = ["zi", "chou", "yin", "mao", "chen", "si", "wu", "wei", "shen", "you", "xu", "hai"];
  const { stem, branch } = chineseSexagesimalName(yearInCycle);
  return { heavenlyStem: stems[stem - 1], earthlyBranch: branches[branch - 1], stem, branch };
}

function chineseFromFixedCore(fixedDay) {
  const date = assertSafeNumber(fixedDay, "fixedDay");
  const s1 = chineseWinterSolsticeOnOrBefore(date);
  const s2 = chineseWinterSolsticeOnOrBefore(s1 + 370);
  const m12 = chineseNewMoonOnOrAfter(s1 + 1);
  const nextM11 = chineseNewMoonBefore(s2 + 1);
  const m = chineseNewMoonBefore(date + 1);
  const leapYear = roundCL((nextM11 - m12) / MEAN_SYNODIC_MONTH) === 12;
  const month = amod(roundCL((m - m12) / MEAN_SYNODIC_MONTH) - (leapYear && priorLeapMonth(m12, m) ? 1 : 0), 12);
  const leap = leapYear && noMajorSolarTerm(m) && !priorLeapMonth(m12, chineseNewMoonBefore(m));
  const elapsedYears = Math.floor(1.5 - month / 12 + (date - CHINESE_EPOCH) / MEAN_TROPICAL_YEAR);
  const cycle = 1 + quotient(elapsedYears - 1, 60);
  const yearInCycle = amod(elapsedYears, 60);
  const day = 1 + date - m;
  return Object.freeze({
    cycle,
    yearInCycle,
    ...stemBranchNames(yearInCycle),
    month,
    leap,
    leapMonth: leap,
    day,
  });
}

export function chineseFromFixed(fixedDay) {
  const core = chineseFromFixedCore(fixedDay);
  const yearStart = fixedFromChinese({ cycle: core.cycle, yearInCycle: core.yearInCycle, month: 1, leap: false, day: 1 });
  return Object.freeze({
    ...core,
    relatedYear: BigInt(gregorianYearFromFixed(yearStart)),
  });
}

export function fixedFromChinese(value) {
  const cycle = assertSafeNumber(value?.cycle, "cycle");
  const yearInCycle = assertSafeNumber(value?.yearInCycle, "yearInCycle");
  const month = assertSafeNumber(value?.month, "month");
  const day = assertSafeNumber(value?.day, "day");
  const leap = value?.leap === true || value?.leapMonth === true;
  if (yearInCycle < 1 || yearInCycle > 60) throw new RangeError("Chinese yearInCycle must be in 1..60.");
  if (month < 1 || month > 12) throw new RangeError("Chinese month must be in 1..12.");
  if (day < 1 || day > 30) throw new RangeError("Chinese day must be in 1..30.");
  const midYear = Math.floor(CHINESE_EPOCH + ((cycle - 1) * 60 + (yearInCycle - 1) + 0.5) * MEAN_TROPICAL_YEAR);
  const newYear = chineseNewYearOnOrBefore(midYear);
  const p = chineseNewMoonOnOrAfter(newYear + 29 * (month - 1));
  const d = chineseFromFixedCore(p);
  const priorNewMoon = d.month === month && d.leap === leap ? p : chineseNewMoonOnOrAfter(p + 1);
  return priorNewMoon + day - 1;
}

function locateChineseNewYearForRelatedYear(relatedYear) {
  const year = assertSafeNumber(relatedYear, "relatedYear");
  const start = fixedFromGregorian(year, 1, 1) - 60;
  const end = fixedFromGregorian(year + 1, 1, 1) + 90;
  for (let fixedDay = start; fixedDay <= end; fixedDay += 1) {
    const chinese = chineseFromFixed(fixedDay);
    if (chinese.month === 1 && chinese.day === 1 && !chinese.leap && chinese.relatedYear === BigInt(year)) {
      return { fixedDay, chinese };
    }
  }
  throw new RangeError("The Chinese related year is outside the deterministic search range.");
}

export function chineseRelatedDateToFixed(value) {
  const relatedYear = assertSafeNumber(value?.relatedYear, "relatedYear");
  const month = assertSafeNumber(value?.month, "month");
  const day = assertSafeNumber(value?.day, "day");
  const leap = value?.leap === true || value?.leapMonth === true;
  const { chinese: yearDate } = locateChineseNewYearForRelatedYear(relatedYear);
  const fixedDay = fixedFromChinese({
    cycle: yearDate.cycle,
    yearInCycle: yearDate.yearInCycle,
    month,
    leap,
    day,
  });
  const actual = chineseFromFixed(fixedDay);
  if (actual.relatedYear !== BigInt(relatedYear) || actual.month !== month || actual.day !== day || actual.leap !== leap) {
    throw new RangeError("The entered Chinese date does not exist in the source-locked deterministic Chinese calendar.");
  }
  return fixedDay;
}

export function chineseRelatedDateToJdn(value) {
  return BigInt(chineseRelatedDateToFixed(value) + RD_JDN_OFFSET);
}

export function chineseStructuredDateToJdn(value) {
  return BigInt(fixedFromChinese(value) + RD_JDN_OFFSET);
}

export function jdnToChinese(jdn) {
  const fixedDay = assertSafeNumber(BigInt(jdn) - BigInt(RD_JDN_OFFSET), "jdn");
  return chineseFromFixed(fixedDay);
}
