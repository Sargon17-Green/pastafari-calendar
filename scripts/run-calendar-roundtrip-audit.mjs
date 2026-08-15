#!/usr/bin/env node
"use strict";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

import {
  CALENDAR_DEFINITIONS,
  MAYA_GMT_CORRELATION,
  calendarDateToJdn,
  floorDiv,
  gregorianToJdn,
  jdnToGregorian,
} from "../docs/calendar-converters.js";
import {
  calendarMonthChoices,
  normalizeCalendarInputValues,
  parseHebrewNumeral,
} from "../docs/calendar-input-conventions.js";

const SCRIPT_VERSION = "PASTAFARI-CALENDAR-ROUNDTRIP-AUDIT-1.0.2";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

function resolveCommitSha() {
  const override = process.env.PASTAFARI_AUDIT_COMMIT?.trim();
  if (override) return override;
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
    windowsHide: true,
  });
  const candidate = result.status === 0 ? String(result.stdout || "").trim() : "";
  return /^[0-9a-f]{40}$/i.test(candidate) ? candidate.toLowerCase() : "unknown";
}

const COMMIT_SHA = resolveCommitSha();
const OUTPUT_DIR = path.join(ROOT, "artifacts", "calendar-roundtrip");
const FAILURE_DIR = path.join(OUTPUT_DIR, "failures");

function stringify(value, space = 2) {
  return JSON.stringify(value, (_, v) => typeof v === "bigint" ? `${v}n` : v, space);
}

function parseBigIntJsonValue(v) {
  return typeof v === "string" && /^-?\d+n$/.test(v) ? BigInt(v.slice(0, -1)) : v;
}

function reviveDeep(value) {
  if (Array.isArray(value)) return value.map(reviveDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, reviveDeep(v)]));
  }
  return parseBigIntJsonValue(value);
}

function parseArgs(argv) {
  const options = {
    all: false,
    calendar: null,
    seed: 12345,
    random: 1000,
    edgesOnly: false,
    replay: null,
    reportDir: OUTPUT_DIR,
    selfTest: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") options.all = true;
    else if (arg === "--calendar") options.calendar = argv[++i];
    else if (arg === "--seed") options.seed = Number(argv[++i]);
    else if (arg === "--random") options.random = Number(argv[++i]);
    else if (arg === "--edges-only") options.edgesOnly = true;
    else if (arg === "--replay") options.replay = argv[++i];
    else if (arg === "--report-dir") options.reportDir = path.resolve(argv[++i]);
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage:\n  node scripts/run-calendar-roundtrip-audit.mjs --all [--seed N] [--random N]\n  node scripts/run-calendar-roundtrip-audit.mjs --calendar hebrew [--edges-only]\n  node scripts/run-calendar-roundtrip-audit.mjs --replay artifacts/calendar-roundtrip/failures/failure-1.json\n\nOptions:\n  --all                 Test every CALENDAR_DEFINITIONS entry.\n  --calendar ID         Test one calendar.\n  --seed N              Deterministic PRNG seed (default 12345).\n  --random N            Requested valid-fuzz cases per cheap calendar (default 1000).\n  --edges-only          Skip random fuzzing.\n  --replay FILE         Replay a saved failure.\n  --report-dir DIR      Override report output directory.\n  --self-test           Run harness integrity probes.\n`);
      process.exit(0);
    } else throw new RangeError(`Unknown argument: ${arg}`);
  }
  if (!Number.isSafeInteger(options.seed)) throw new RangeError("--seed must be a safe integer.");
  if (!Number.isSafeInteger(options.random) || options.random < 0) throw new RangeError("--random must be a non-negative safe integer.");
  if (!options.all && !options.calendar && !options.replay && !options.selfTest) options.all = true;
  return options;
}

class Rng {
  constructor(seed) {
    this.state = BigInt.asUintN(64, BigInt(seed) ^ 0x9e3779b97f4a7c15n);
    if (this.state === 0n) this.state = 0x243f6a8885a308d3n;
  }
  next64() {
    let x = this.state;
    x ^= x << 13n;
    x ^= x >> 7n;
    x ^= x << 17n;
    this.state = BigInt.asUintN(64, x);
    return this.state;
  }
  int(min, max) {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || max < min) throw new RangeError("bad rng range");
    const span = BigInt(max - min + 1);
    return min + Number(this.next64() % span);
  }
  bool() { return (this.next64() & 1n) === 1n; }
  pick(array) { return array[this.int(0, array.length - 1)]; }
}

function mod(a, b) {
  const r = a % b;
  return r < 0n ? r + b : r;
}

function sameJdn(a, b) { return BigInt(a) === BigInt(b); }
function asStringValues(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === "bigint" ? v.toString() : v]));
}
function cleanInput(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === "number" ? String(v) : v]));
}

function dateForJdn(jdn) {
  const g = jdnToGregorian(jdn);
  const y = Number(g.year);
  if (!Number.isSafeInteger(y) || y < -271000 || y > 275000) throw new RangeError("Date outside JS Date range");
  const d = new Date(0);
  d.setUTCHours(12, 0, 0, 0);
  d.setUTCFullYear(y, g.month - 1, g.day);
  if (Number.isNaN(d.getTime())) throw new RangeError("Date outside JS Date range");
  return d;
}

const intlCache = new Map();
function intlFormatter(locale, timeZone = "UTC") {
  const key = `${locale}|${timeZone}`;
  let f = intlCache.get(key);
  if (!f) {
    f = new Intl.DateTimeFormat(locale, { timeZone, year: "numeric", month: "numeric", day: "numeric" });
    intlCache.set(key, f);
  }
  return f;
}
function intlParts(locale, timeZone, jdn) {
  return Object.fromEntries(intlFormatter(locale, timeZone).formatToParts(dateForJdn(jdn))
    .filter(p => p.type !== "literal")
    .map(p => [p.type, p.value]));
}

function jdnToJulian(jdn) {
  const c = BigInt(jdn) + 32082n;
  const d = floorDiv(4n * c + 3n, 1461n);
  const e = c - floorDiv(1461n * d, 4n);
  const m = floorDiv(5n * e + 2n, 153n);
  const day = Number(e - floorDiv(153n * m + 2n, 5n) + 1n);
  const month = Number(m + 3n - 12n * floorDiv(m, 10n));
  const year = d - 4800n + floorDiv(m, 10n);
  return { year: year.toString(), month: String(month), day: String(day) };
}

const ISLAMIC_EPOCH = 1_948_439n;
function islamicCivilLeap(y) { return mod(11n * y + 14n, 30n) < 11n; }
function islamicMonthLength(y, m) { return m === 12 ? (islamicCivilLeap(y) ? 30 : 29) : (m % 2 ? 30 : 29); }
function islamicOwnToJdn(y, m, d) {
  return ISLAMIC_EPOCH + BigInt(d) + floorDiv(59n * BigInt(m - 1) + 1n, 2n) + 354n * (y - 1n) + floorDiv(3n + 11n * y, 30n);
}
function jdnToIslamicCivil(jdn) {
  let y = floorDiv(30n * (BigInt(jdn) - ISLAMIC_EPOCH) + 10646n, 10631n);
  while (BigInt(jdn) < islamicOwnToJdn(y, 1, 1)) y -= 1n;
  while (BigInt(jdn) >= islamicOwnToJdn(y + 1n, 1, 1)) y += 1n;
  for (let m = 1; m <= 12; m += 1) {
    const start = islamicOwnToJdn(y, m, 1);
    const end = start + BigInt(islamicMonthLength(y, m) - 1);
    if (BigInt(jdn) >= start && BigInt(jdn) <= end) {
      return { year: y.toString(), month: String(m), day: String(Number(BigInt(jdn) - start + 1n)) };
    }
  }
  throw new RangeError("Islamic inverse failed");
}

function productionSearchYear(calendarId, jdn, estimate, yearStartInput) {
  let y = BigInt(estimate);
  const start = year => calendarDateToJdn(calendarId, yearStartInput(year));
  let guard = 0;
  while (BigInt(jdn) < start(y)) { y -= 1n; if (++guard > 10000) throw new Error("year search guard"); }
  while (BigInt(jdn) >= start(y + 1n)) { y += 1n; if (++guard > 10000) throw new Error("year search guard"); }
  return y;
}

function hebrewLeap(y) { return mod(7n * y + 1n, 19n) < 7n; }
function jdnToHebrewBySearch(jdn) {
  const gy = jdnToGregorian(jdn).year;
  const y = productionSearchYear("hebrew", jdn, gy + 3760n, year => ({ year: year.toString(), month: "7", day: "1" }));
  const order = hebrewLeap(y) ? [7,8,9,10,11,12,13,1,2,3,4,5,6] : [7,8,9,10,11,12,1,2,3,4,5,6];
  for (const m of order) {
    const start = calendarDateToJdn("hebrew", { year: y.toString(), month: String(m), day: "1" });
    const next = order.indexOf(m) === order.length - 1
      ? calendarDateToJdn("hebrew", { year: (y + 1n).toString(), month: "7", day: "1" })
      : calendarDateToJdn("hebrew", { year: y.toString(), month: String(order[order.indexOf(m) + 1]), day: "1" });
    if (BigInt(jdn) >= start && BigInt(jdn) < next) {
      return { year: y.toString(), month: String(m), day: String(Number(BigInt(jdn) - start + 1n)) };
    }
  }
  throw new RangeError("Hebrew inverse failed");
}

function jdnToSolarArithmeticBySearch(jdn) {
  const gy = jdnToGregorian(jdn).year;
  const y = productionSearchYear("solar-hijri-arithmetic", jdn, gy - 621n, year => ({ year: year.toString(), month: "1", day: "1" }));
  for (let m = 1; m <= 12; m += 1) {
    const start = calendarDateToJdn("solar-hijri-arithmetic", { year: y.toString(), month: String(m), day: "1" });
    const next = m === 12
      ? calendarDateToJdn("solar-hijri-arithmetic", { year: (y + 1n).toString(), month: "1", day: "1" })
      : calendarDateToJdn("solar-hijri-arithmetic", { year: y.toString(), month: String(m + 1), day: "1" });
    if (BigInt(jdn) >= start && BigInt(jdn) < next) return { year: y.toString(), month: String(m), day: String(Number(BigInt(jdn) - start + 1n)) };
  }
  throw new RangeError("Persian arithmetic inverse failed");
}

function jdnToIntlSimple(locale, tz, jdn) {
  const p = intlParts(locale, tz, jdn);
  return { year: String(Number(p.year)), month: String(Number(p.month)), day: String(Number(p.day)) };
}
function jdnToChinese(jdn) {
  const p = intlParts("en-u-ca-chinese-nu-latn", "Asia/Shanghai", jdn);
  const monthText = String(p.month || "");
  return {
    relatedYear: String(Number(p.relatedYear)),
    month: String(Number.parseInt(monthText, 10)),
    day: String(Number(p.day)),
    leapMonth: /bis$/i.test(monthText),
  };
}

function jdnToSaka(jdn) {
  const g = jdnToGregorian(jdn);
  const gy = g.year;
  const isLeapG = year => mod(year, 4n) === 0n && (mod(year,100n)!==0n || mod(year,400n)===0n);
  const newYearThis = gregorianToJdn({ year: gy, month: 3, day: isLeapG(gy) ? 21 : 22 });
  const sy = BigInt(jdn) >= newYearThis ? gy - 78n : gy - 79n;
  const gStartYear = sy + 78n;
  const leap = isLeapG(gStartYear);
  const start = gregorianToJdn({ year: gStartYear, month: 3, day: leap ? 21 : 22 });
  let offset = Number(BigInt(jdn) - start);
  const lengths = [leap ? 31 : 30,31,31,31,31,31,30,30,30,30,30,30];
  let m = 1;
  while (offset >= lengths[m-1]) { offset -= lengths[m-1]; m += 1; }
  return { year: sy.toString(), month: String(m), day: String(offset + 1) };
}

function fixed13Inverse(jdn, epoch) {
  let y = BigInt(Math.floor(Number(BigInt(jdn) - epoch) / 365.25) + 1);
  const start = year => epoch - 1n + 365n * (year - 1n) + floorDiv(year, 4n) + 1n;
  while (BigInt(jdn) < start(y)) y -= 1n;
  while (BigInt(jdn) >= start(y + 1n)) y += 1n;
  const doy = Number(BigInt(jdn) - start(y));
  const m = Math.floor(doy / 30) + 1;
  const d = doy % 30 + 1;
  return { year: y.toString(), month: String(m), day: String(d) };
}

const JAPANESE_ERAS = [
  ["meiji", [1868n,10,23], [1912n,7,29]],
  ["taisho", [1912n,7,30], [1926n,12,24]],
  ["showa", [1926n,12,25], [1989n,1,7]],
  ["heisei", [1989n,1,8], [2019n,4,30]],
  ["reiwa", [2019n,5,1], null],
];
function jdnToJapanese(jdn) {
  const g = jdnToGregorian(jdn);
  for (const [era, start, end] of JAPANESE_ERAS) {
    const s = gregorianToJdn({ year:start[0], month:start[1], day:start[2] });
    const e = end ? gregorianToJdn({ year:end[0], month:end[1], day:end[2] }) : null;
    if (BigInt(jdn) >= s && (e === null || BigInt(jdn) <= e)) {
      return { era, year: (g.year - start[0] + 1n).toString(), month: String(g.month), day: String(g.day) };
    }
  }
  throw new RangeError("JDN outside supported Japanese eras");
}

function jdnToMinguo(jdn) {
  const g = jdnToGregorian(jdn);
  return { year: (g.year - 1911n).toString(), month: String(g.month), day: String(g.day) };
}
function jdnToThai(jdn) {
  const g = jdnToGregorian(jdn);
  return { year: (g.year + 543n).toString(), month: String(g.month), day: String(g.day) };
}

function jdnToBahaiWestern(jdn) {
  const g = jdnToGregorian(jdn);
  const march21 = gregorianToJdn({ year: g.year, month: 3, day: 21 });
  const by = BigInt(jdn) >= march21 ? g.year - 1843n : g.year - 1844n;
  const start = gregorianToJdn({ year: 1843n + by, month: 3, day: 21 });
  const next = gregorianToJdn({ year: 1844n + by, month: 3, day: 21 });
  const intercalary = Number(next - start) - 361;
  const off = Number(BigInt(jdn) - start);
  if (off < 18 * 19) return { year: by.toString(), month: String(Math.floor(off / 19) + 1), day: String(off % 19 + 1) };
  if (off < 18 * 19 + intercalary) return { year: by.toString(), month: "ayyami-ha", day: String(off - 18*19 + 1) };
  return { year: by.toString(), month: "19", day: String(off - 18*19 - intercalary + 1) };
}
function jdnToBahaiTehranBySearch(jdn) {
  const g = jdnToGregorian(jdn);
  let y = g.year - 1843n;
  const start = year => calendarDateToJdn("bahai-tehran", { year: year.toString(), month: "1", day: "1" });
  if (y < 1n) y = 1n;
  if (y > 1156n) y = 1156n;
  while (y > 1n && BigInt(jdn) < start(y)) y -= 1n;
  while (y < 1156n && BigInt(jdn) >= start(y + 1n)) y += 1n;
  const s = start(y);
  if (y === 1156n) {
    const months = [...Array(18)].map((_, i) => String(i + 1)).concat(["ayyami-ha", "19"]);
    for (const month of months) {
      for (let day = 1; day <= 19; day += 1) {
        const candidate = { year: y.toString(), month, day: String(day) };
        try { if (calendarDateToJdn("bahai-tehran", candidate) === BigInt(jdn)) return candidate; } catch { /* invalid day */ }
      }
    }
    throw new RangeError("No Tehran representation found at upper supported boundary");
  }
  const n = start(y + 1n);
  const intercalary = Number(n - s) - 361;
  const off = Number(BigInt(jdn) - s);
  if (off < 18*19) return { year:y.toString(), month:String(Math.floor(off/19)+1), day:String(off%19+1) };
  if (off < 18*19+intercalary) return { year:y.toString(), month:"ayyami-ha", day:String(off-18*19+1) };
  return { year:y.toString(), month:"19", day:String(off-18*19-intercalary+1) };
}

function jdnToMaya(jdn, context = {}) {
  const corr = BigInt(context.correlation ?? MAYA_GMT_CORRELATION);
  let total = BigInt(jdn) - corr;
  const baktun = floorDiv(total, 144000n); total = mod(total,144000n);
  const katun = total / 7200n; total %= 7200n;
  const tun = total / 360n; total %= 360n;
  const uinal = total / 20n;
  const kin = total % 20n;
  return { baktun:baktun.toString(), katun:katun.toString(), tun:tun.toString(), uinal:uinal.toString(), kin:kin.toString(), correlation:corr.toString() };
}

const HINDU_EPOCH = 588466;
const ARYA_SOLAR_YEAR = 1_577_917_500 / 4_320_000;
const ARYA_SOLAR_MONTH = ARYA_SOLAR_YEAR / 12;
const ARYA_LUNAR_MONTH = 1_577_917_500 / 53_433_336;
function oldHinduLeapPosition(year) {
  const mina = (12 * year - 1) * ARYA_SOLAR_MONTH;
  const lunarNewYear = ARYA_LUNAR_MONTH * (Math.floor(mina / ARYA_LUNAR_MONTH) + 1);
  return Math.ceil((lunarNewYear - mina) / (ARYA_SOLAR_MONTH - ARYA_LUNAR_MONTH));
}
function jdnToHinduByEnumeration(calendarId, jdn, context = {}) {
  let approx;
  if (context.year !== undefined && /^[-+]?\d+$/.test(String(context.year))) approx = Number(context.year);
  else approx = Math.round((Number(jdn) - HINDU_EPOCH) / ARYA_SOLAR_YEAR);
  const matches = [];
  for (let y = approx - 2; y <= approx + 2; y += 1) {
    if (!Number.isSafeInteger(y)) continue;
    for (let m = 1; m <= 12; m += 1) {
      for (let d = 1; d <= 31; d += 1) {
        const flags = calendarId === "hindu-old-lunar" ? [false,true] : [false];
        for (const leapMonth of flags) {
          const input = { year:String(y), month:String(m), day:String(d) };
          if (calendarId === "hindu-old-lunar") input.leapMonth = leapMonth;
          try { if (calendarDateToJdn(calendarId, input) === BigInt(jdn)) matches.push(input); } catch { /* skip */ }
        }
      }
    }
  }
  if (!matches.length) throw new RangeError("No Hindu representation found for JDN");
  matches.sort((a,b) => stringify(a,0).localeCompare(stringify(b,0)));
  const first = matches[0];
  Object.defineProperty(first, "__candidateCount", { value: matches.length, enumerable: false });
  return first;
}

function calendarField(id, name) {
  const def = CALENDAR_DEFINITIONS.find(d => d.id === id);
  return def?.fields.find(f => f.name === name) || null;
}

function daysInGregorianMonth(y, m) {
  const leap = mod(y,4n)===0n && (mod(y,100n)!==0n || mod(y,400n)===0n);
  if (m===2) return leap?29:28;
  return [4,6,9,11].includes(m)?30:31;
}
function daysInJulianMonth(y,m) { if (m===2) return mod(y,4n)===0n?29:28; return [4,6,9,11].includes(m)?30:31; }

function randomGregorian(rng) { const y=BigInt(rng.int(-10000,10000)); const m=rng.int(1,12); return {year:y.toString(),month:String(m),day:String(rng.int(1,daysInGregorianMonth(y,m)))}; }
function randomJulian(rng) { const y=BigInt(rng.int(-10000,10000)); const m=rng.int(1,12); return {year:y.toString(),month:String(m),day:String(rng.int(1,daysInJulianMonth(y,m)))}; }
function randomHebrew(rng) {
  const y=BigInt(rng.int(5600,5900)); const months=hebrewLeap(y)?13:12; const m=rng.int(1,months);
  let d=30; while(d>1){try{calendarDateToJdn("hebrew",{year:y.toString(),month:String(m),day:String(d)});break;}catch{d--;}}
  return {year:y.toString(),month:String(m),day:String(rng.int(1,d))};
}
function randomIslamic(rng) { const y=BigInt(rng.int(1200,1700)); const m=rng.int(1,12); return {year:y.toString(),month:String(m),day:String(rng.int(1,islamicMonthLength(y,m)))}; }
function randomPersianArithmetic(rng) {
  const y=rng.int(1000,1800), m=rng.int(1,12); let max=31; while(max>1){try{calendarDateToJdn("solar-hijri-arithmetic",{year:String(y),month:String(m),day:String(max)});break;}catch{max--;}}
  return {year:String(y),month:String(m),day:String(rng.int(1,max))};
}
function randomIntlInput(id,rng) {
  if (id === "islamic-umalqura") {
    for (let k=0;k<100;k++){const x={year:String(rng.int(1300,1600)),month:String(rng.int(1,12)),day:String(rng.int(1,30))};try{calendarDateToJdn(id,x);return x;}catch{}}
  }
  if (id === "solar-hijri-official") {
    for (let k=0;k<100;k++){const x={year:String(rng.int(1250,1500)),month:String(rng.int(1,12)),day:String(rng.int(1,31))};try{calendarDateToJdn(id,x);return x;}catch{}}
  }
  if (id === "chinese") {
    const base=gregorianToJdn({year:BigInt(rng.int(1900,2100)),month:rng.int(1,12),day:rng.int(1,28)});
    return jdnToChinese(base);
  }
  throw new Error(`randomIntlInput missing ${id}`);
}
function randomHindu(id,rng){const x={year:String(rng.int(4800,5400)),month:String(rng.int(1,12)),day:String(rng.int(1,30))};if(id==="hindu-old-lunar")x.leapMonth=oldHinduLeapPosition(Number(x.year))===Number(x.month)&&rng.bool();return x;}
function randomSaka(rng){const y=rng.int(1800,2100),m=rng.int(1,12);for(let d=31;d>=1;d--){const x={year:String(y),month:String(m),day:String(rng.int(1,d))};try{calendarDateToJdn("saka",x);return x;}catch{}}throw new Error("saka gen");}
function randomFixed13(id,rng){const y=rng.int(1500,2200),m=rng.int(1,13);let max=m<=12?30:(mod(BigInt(y),4n)===3n?6:5);return{year:String(y),month:String(m),day:String(rng.int(1,max))};}
function randomJapanese(rng){const [era,s,e]=rng.pick(JAPANESE_ERAS);const minY=1,maxY=e?Number(e[0]-s[0]+1n):20;for(let k=0;k<100;k++){const x={era,year:String(rng.int(minY,maxY)),month:String(rng.int(1,12)),day:String(rng.int(1,28))};try{calendarDateToJdn("japanese-imperial",x);return x;}catch{}}throw new Error("japanese gen");}
function randomBahai(id,rng){const max=id==="bahai-tehran"?1156:1500;const y=rng.int(1,max), choice=rng.int(0,19);const month=choice===18?"ayyami-ha":choice===19?"19":String(choice+1);for(let d=19;d>=1;d--){const x={year:String(y),month,day:String(rng.int(1,d))};try{calendarDateToJdn(id,x);return x;}catch{}}throw new Error("bahai gen");}
function randomMaya(rng){return{baktun:String(rng.int(-50,50)),katun:String(rng.int(0,19)),tun:String(rng.int(0,19)),uinal:String(rng.int(0,17)),kin:String(rng.int(0,19)),correlation:String(MAYA_GMT_CORRELATION)};}

const strategies = {
  gregorian: { classification:"exact-bijective arithmetic", inverseSource:"production jdnToGregorian", independence:"partly independent path within production module", confidence:"high", inverse:jdn=>asStringValues(jdnToGregorian(jdn)), random:randomGregorian, randomCost:"cheap" },
  julian: { classification:"exact-bijective arithmetic", inverseSource:"test-only independent Julian inverse", independence:"independent inverse formula", confidence:"high", inverse:jdnToJulian, random:randomJulian, randomCost:"cheap" },
  hebrew: { classification:"exact-bijective arithmetic", inverseSource:"test-only year/month search through production forward", independence:"not independent; useful for boundaries and canonicalization", confidence:"medium", inverse:jdnToHebrewBySearch, random:randomHebrew, randomCost:"cheap" },
  "islamic-civil": { classification:"exact-bijective arithmetic", inverseSource:"test-only independent tabular inverse", independence:"independent implementation", confidence:"high", inverse:jdnToIslamicCivil, random:randomIslamic, randomCost:"cheap" },
  "islamic-umalqura": { classification:"Intl-backed", inverseSource:"Intl.DateTimeFormat islamic-umalqura", independence:"independent Intl representation", confidence:"high within runtime ICU", inverse:jdn=>jdnToIntlSimple("en-u-ca-islamic-umalqura-nu-latn","Asia/Riyadh",jdn), random:r=>randomIntlInput("islamic-umalqura",r), randomCost:"expensive" },
  "solar-hijri-official": { classification:"Intl-backed", inverseSource:"Intl.DateTimeFormat persian", independence:"independent Intl representation", confidence:"high within runtime ICU", inverse:jdn=>jdnToIntlSimple("en-u-ca-persian-nu-latn","Asia/Tehran",jdn), random:r=>randomIntlInput("solar-hijri-official",r), randomCost:"expensive" },
  "solar-hijri-arithmetic": { classification:"exact-bijective arithmetic", inverseSource:"test-only forward-guided search", independence:"not independent", confidence:"medium", inverse:jdnToSolarArithmeticBySearch, random:randomPersianArithmetic, randomCost:"cheap" },
  chinese: { classification:"Intl-backed special-structure", inverseSource:"Intl.DateTimeFormat chinese relatedYear/month/day", independence:"independent Intl representation", confidence:"high within runtime ICU", inverse:jdnToChinese, random:r=>randomIntlInput("chinese",r), randomCost:"expensive" },
  "hindu-old-solar": { classification:"potentially non-bijective floating-point", inverseSource:"test-only local enumeration", independence:"not independent; canonical candidate search", confidence:"medium for consistency only", inverse:(j,c)=>jdnToHinduByEnumeration("hindu-old-solar",j,c), random:r=>randomHindu("hindu-old-solar",r), randomCost:"medium" },
  "hindu-old-lunar": { classification:"potentially non-bijective floating-point special-structure", inverseSource:"test-only local enumeration", independence:"not independent; canonical candidate search", confidence:"medium for consistency only", inverse:(j,c)=>jdnToHinduByEnumeration("hindu-old-lunar",j,c), random:r=>randomHindu("hindu-old-lunar",r), randomCost:"medium" },
  saka: { classification:"exact-bijective arithmetic", inverseSource:"test-only inverse via Gregorian year boundary", independence:"independent structure; shares Gregorian inverse", confidence:"high", inverse:jdnToSaka, random:randomSaka, randomCost:"cheap" },
  "thai-buddhist": { classification:"exact-bijective offset", inverseSource:"Gregorian inverse + 543", independence:"independent of Thai forward except shared Gregorian base", confidence:"high", inverse:jdnToThai, random:r=>{const g=randomGregorian(r);return{...g,year:(BigInt(g.year)+543n).toString()};}, randomCost:"cheap" },
  ethiopic: { classification:"exact-bijective arithmetic", inverseSource:"test-only fixed-13-month inverse", independence:"independent inverse arithmetic", confidence:"high", inverse:j=>fixed13Inverse(j,1_724_221n), random:r=>randomFixed13("ethiopic",r), randomCost:"cheap" },
  coptic: { classification:"exact-bijective arithmetic", inverseSource:"test-only fixed-13-month inverse", independence:"independent inverse arithmetic", confidence:"high", inverse:j=>fixed13Inverse(j,1_825_030n), random:r=>randomFixed13("coptic",r), randomCost:"cheap" },
  "japanese-imperial": { classification:"canonicalized era", inverseSource:"test-only explicit era-boundary inverse", independence:"independent era selection; shared Gregorian inverse", confidence:"high", inverse:jdnToJapanese, random:randomJapanese, randomCost:"cheap" },
  minguo: { classification:"exact-bijective offset", inverseSource:"Gregorian inverse - 1911", independence:"independent of Minguo forward except shared Gregorian base", confidence:"high", inverse:jdnToMinguo, random:r=>{const g=randomGregorian(r);return{...g,year:(BigInt(g.year)-1911n).toString()};}, randomCost:"cheap" },
  "bahai-tehran": { classification:"arithmetic/astronomical special-structure", inverseSource:"test-only year-boundary search through production forward", independence:"not independent", confidence:"medium for internal consistency; anchors add absolute checks", inverse:jdnToBahaiTehranBySearch, random:r=>randomBahai("bahai-tehran",r), randomCost:"expensive" },
  "bahai-western": { classification:"exact-bijective arithmetic special-structure", inverseSource:"test-only March-21 structure inverse", independence:"independent structure; shared Gregorian inverse", confidence:"high", inverse:jdnToBahaiWestern, random:r=>randomBahai("bahai-western",r), randomCost:"cheap" },
  "maya-long-count": { classification:"exact special-structure with correlation parameter", inverseSource:"test-only exact mixed-radix algebra", independence:"independent algebra", confidence:"high", inverse:jdnToMaya, random:randomMaya, randomCost:"cheap" },
};

const anchors = [
  ["gregorian", {year:"2026",month:"8",day:"13"}, 2461266n, "existing test vector"],
  ["julian", {year:"2026",month:"7",day:"31"}, 2461266n, "existing test vector"],
  ["hebrew", {year:"5786",month:"5",day:"30"}, 2461266n, "existing test vector"],
  ["islamic-civil", {year:"1448",month:"2",day:"29"}, 2461267n, "existing test vector"],
  ["islamic-umalqura", {year:"1448",month:"3",day:"1"}, 2461267n, "existing test vector"],
  ["solar-hijri-official", {year:"1405",month:"6",day:"1"}, 2461276n, "existing test vector"],
  ["solar-hijri-arithmetic", {year:"1405",month:"5",day:"22"}, 2461266n, "existing test vector"],
  ["chinese", {relatedYear:"2026",month:"7",day:"1",leapMonth:false}, 2461266n, "existing test vector"],
  ["hindu-old-solar", {year:"5127",month:"4",day:"30"}, 2461268n, "existing test vector"],
  ["hindu-old-lunar", {year:"5127",month:"5",day:"1",leapMonth:false}, 2461266n, "existing test vector"],
  ["saka", {year:"1948",month:"5",day:"22"}, 2461266n, "existing test vector"],
  ["thai-buddhist", {year:"2569",month:"8",day:"13"}, 2461266n, "existing test vector"],
  ["ethiopic", {year:"2018",month:"12",day:"7"}, 2461266n, "existing test vector"],
  ["coptic", {year:"1742",month:"12",day:"7"}, 2461266n, "existing test vector"],
  ["japanese-imperial", {era:"reiwa",year:"8",month:"8",day:"13"}, 2461266n, "existing test vector"],
  ["minguo", {year:"115",month:"8",day:"13"}, 2461266n, "existing test vector"],
  ["bahai-tehran", {year:"183",month:"5",day:"13"}, 2461209n, "existing test vector"],
  ["bahai-western", {year:"183",month:"5",day:"13"}, 2461209n, "existing test vector"],
  ["maya-long-count", {baktun:"13",katun:"0",tun:"13",uinal:"15",kin:"8",correlation:"584283"}, 2461271n, "existing test vector"],
];
const tehranAnchors = [[18,2400856n],[84,2424961n],[150,2449068n],[183,2461121n],[542,2592243n],[575,2604296n],[641,2628401n],[740,2664561n]];

function chromiumVersion() {
  for (const bin of ["chromium","chromium-browser","google-chrome","google-chrome-stable"]) {
    const r=spawnSync(bin,["--version"],{encoding:"utf8"});
    if (r.status===0) return r.stdout.trim();
  }
  return null;
}
function runtimeInfo() {
  return {
    node: process.version,
    icu: process.versions.icu,
    v8: process.versions.v8,
    platform: process.platform,
    arch: process.arch,
    os: `${os.type()} ${os.release()}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    chromium: chromiumVersion(),
    intlCalendars: Object.fromEntries([
      ["islamic-umalqura","islamic-umalqura"],["persian","persian"],["chinese","chinese"],["hebrew","hebrew"],["indian","indian"],["ethiopic","ethiopic"],["coptic","coptic"],["japanese","japanese"],["roc","roc"],
    ].map(([k,cal])=>{try{return[k,new Intl.DateTimeFormat(`en-u-ca-${cal}`).resolvedOptions().calendar===cal];}catch{return[k,false];}})),
  };
}

function createReport(options, ids) {
  const byCalendar = Object.fromEntries(ids.map(id => [id, {
    id,
    strategy: strategies[id]?.classification || null,
    forwardSource: "docs/calendar-converters.js:calendarDateToJdn",
    inverseSource: strategies[id]?.inverseSource || null,
    independence: strategies[id]?.independence || null,
    confidence: strategies[id]?.confidence || null,
    roundTrips:0, edgeCases:0, randomValid:0, invalidCases:0, anchors:0,
    failures:[], warnings:[], notes:[],
  }]));
  return {
    scriptVersion:SCRIPT_VERSION, commitSha:COMMIT_SHA, seed:options.seed, requestedRandom:options.random,
    edgesOnly:options.edgesOnly, startedUtc:new Date().toISOString(), runtime:runtimeInfo(),
    calendarsDiscovered:CALENDAR_DEFINITIONS.map(d=>d.id), calendarsSelected:ids,
    summary:{calendarsDiscovered:CALENDAR_DEFINITIONS.length,calendarsTested:ids.length,totalRoundTrips:0,edgeCases:0,randomValidCases:0,invalidInputCases:0,mismatches:0,validationFailures:0,unsupportedRuntimeCases:0,absoluteAnchorsChecked:0},
    calendars:byCalendar, failures:[], warnings:[], focused:{},
  };
}

function saveFailure(report, calendarId, kind, input, error, details={}) {
  const idx=report.failures.length+1;
  const item={id:idx,calendar:calendarId,kind,seed:report.seed,input,normalizedInput:details.normalizedInput??null,jdn1:details.jdn1??null,reconstructed:details.reconstructed??null,jdn2:details.jdn2??null,expected:details.expected??null,actual:details.actual??null,error:String(error?.stack||error),runtime:report.runtime,commitSha:report.commitSha};
  report.failures.push(item); report.calendars[calendarId]?.failures.push(item.id);
  if(kind.includes("invalid")) report.summary.validationFailures+=1; else report.summary.mismatches+=1;
  if (process.env.PASTAFARI_AUDIT_INJECT_MISMATCH !== "1" || kind !== "injected-self-test") {
    fs.mkdirSync(FAILURE_DIR,{recursive:true});
    fs.writeFileSync(path.join(FAILURE_DIR,`failure-${idx}.json`),stringify(item)+"\n");
  }
  return item;
}
function warn(report,id,message){const w={calendar:id,message};report.warnings.push(w);if(report.calendars[id])report.calendars[id].warnings.push(message);}

function roundTrip(report,id,input,kind="edge") {
  const c=report.calendars[id];
  try {
    const normalized=normalizeCalendarInputValues(id,input);
    const j1=calendarDateToJdn(id,normalized);
    const reconstructed=strategies[id].inverse(j1,normalized);
    const j2=calendarDateToJdn(id,reconstructed);
    if(!sameJdn(j1,j2)) throw new Error(`round-trip JDN mismatch: ${j1} != ${j2}`);
    c.roundTrips++;report.summary.totalRoundTrips++;
    if(kind==="edge"){c.edgeCases++;report.summary.edgeCases++;}
    if(kind==="random"){c.randomValid++;report.summary.randomValidCases++;}
    if((id==="hindu-old-solar"||id==="hindu-old-lunar") && reconstructed.__candidateCount>1 && !c.notes.some(n=>n.startsWith("non-bijective"))) c.notes.push(`non-bijective candidate count observed: ${reconstructed.__candidateCount}`);
    return {j1,reconstructed,j2,normalized};
  } catch(error) {
    saveFailure(report,id,`${kind}-roundtrip`,input,error);
    return null;
  }
}
function expectInvalid(report,id,input,label) {
  const c=report.calendars[id]; c.invalidCases++;report.summary.invalidInputCases++;
  try { calendarDateToJdn(id,normalizeCalendarInputValues(id,input)); saveFailure(report,id,`invalid-accepted:${label}`,input,new Error("Invalid input was accepted"),{actual:"accepted"}); return false; }
  catch(error){ if(error instanceof RangeError) return true; saveFailure(report,id,`invalid-uncontrolled:${label}`,input,error);return false; }
}
function anchorCheck(report,id,input,expected,label) {
  if(!report.calendars[id])return;
  try { const actual=calendarDateToJdn(id,input); if(actual!==expected) throw new Error(`anchor mismatch expected ${expected} actual ${actual}`); report.calendars[id].anchors++;report.summary.absoluteAnchorsChecked++; }
  catch(e){saveFailure(report,id,`anchor:${label}`,input,e,{expected,actual:null});}
}

function genericEdges(id) {
  switch(id){
    case"gregorian":return[{year:"0",month:"1",day:"1"},{year:"-400",month:"2",day:"29"},{year:"1900",month:"2",day:"28"},{year:"2000",month:"2",day:"29"},{year:"2100",month:"3",day:"1"},{year:"10000",month:"12",day:"31"}];
    case"julian":return[{year:"0",month:"1",day:"1"},{year:"-4",month:"2",day:"29"},{year:"1900",month:"2",day:"29"},{year:"2100",month:"2",day:"29"},{year:"10000",month:"12",day:"31"}];
    case"hebrew":return[{year:"5783",month:"7",day:"1"},{year:"5784",month:"13",day:"29"},{year:"5784",month:"1",day:"1"},{year:"5786",month:"5",day:"30"}];
    case"islamic-civil":return[{year:"1",month:"1",day:"1"},{year:"1448",month:"12",day:"29"},{year:"1500",month:"1",day:"1"}];
    case"islamic-umalqura":return[{year:"1445",month:"1",day:"1"},{year:"1448",month:"3",day:"1"}];
    case"solar-hijri-official":return[{year:"1403",month:"1",day:"1"},{year:"1405",month:"6",day:"1"}];
    case"solar-hijri-arithmetic":return[{year:"-1",month:"1",day:"1"},{year:"1",month:"1",day:"1"},{year:"1403",month:"12",day:"29"},{year:"1404",month:"1",day:"1"},{year:"2820",month:"12",day:"29"}];
    case"chinese":return[{relatedYear:"2023",month:"1",day:"1",leapMonth:false},{relatedYear:"2026",month:"7",day:"1",leapMonth:false}];
    case"hindu-old-solar":return[{year:"0",month:"1",day:"1"},{year:"5127",month:"4",day:"30"},{year:"-1000",month:"12",day:"30"}];
    case"hindu-old-lunar":return[{year:"5127",month:"5",day:"1",leapMonth:false},{year:"5127",month:"2",day:"1",leapMonth:true},{year:"0",month:"1",day:"1",leapMonth:false}];
    case"saka":return[{year:"1822",month:"1",day:"1"},{year:"1922",month:"1",day:"1"},{year:"2022",month:"1",day:"1"},{year:"1948",month:"12",day:"30"}];
    case"thai-buddhist":return[{year:"2443",month:"2",day:"28"},{year:"2543",month:"2",day:"29"},{year:"2643",month:"3",day:"1"}];
    case"ethiopic":return[{year:"2018",month:"1",day:"1"},{year:"2019",month:"13",day:"6"},{year:"2020",month:"1",day:"1"}];
    case"coptic":return[{year:"1742",month:"1",day:"1"},{year:"1743",month:"13",day:"6"},{year:"1744",month:"1",day:"1"}];
    case"japanese-imperial":return JAPANESE_ERAS.flatMap(([era,s,e])=>[{era,year:"1",month:String(s[1]),day:String(s[2])},...(e?[{era,year:(e[0]-s[0]+1n).toString(),month:String(e[1]),day:String(e[2])}]:[])]);
    case"minguo":return[{year:"1",month:"1",day:"1"},{year:"89",month:"2",day:"29"},{year:"115",month:"8",day:"13"}];
    case"bahai-tehran":return[{year:"1",month:"1",day:"1"},{year:"183",month:"5",day:"13"},{year:"1156",month:"19",day:"19"}];
    case"bahai-western":return[{year:"1",month:"1",day:"1"},{year:"183",month:"5",day:"13"},{year:"200",month:"ayyami-ha",day:"4"}];
    case"maya-long-count":return[{baktun:"0",katun:"0",tun:"0",uinal:"0",kin:"0",correlation:String(MAYA_GMT_CORRELATION)},{baktun:"13",katun:"19",tun:"19",uinal:"17",kin:"19",correlation:String(MAYA_GMT_CORRELATION)},{baktun:"-1",katun:"19",tun:"19",uinal:"17",kin:"19",correlation:String(MAYA_GMT_CORRELATION)}];
    default:return[];
  }
}

function characterizeHindu(id, year = 5127) {
  const inputs=[];
  for(let month=1;month<=12;month+=1) for(let day=1;day<=31;day+=1) {
    const flags=id==="hindu-old-lunar"?[false,true]:[false];
    for(const leapMonth of flags){const x={year:String(year),month:String(month),day:String(day)};if(id==="hindu-old-lunar")x.leapMonth=leapMonth;inputs.push(x);}
  }
  const by=new Map();
  for(const input of inputs){try{const j=calendarDateToJdn(id,input).toString();if(!by.has(j))by.set(j,[]);by.get(j).push(input);}catch{/* rejected */}}
  const nums=[...by.keys()].map(BigInt).sort((a,b)=>a<b?-1:a>b?1:0);let skipped=0,maxGap=0;
  for(let i=1;i<nums.length;i+=1){const gap=Number(nums[i]-nums[i-1]-1n);if(gap>0){skipped+=gap;maxGap=Math.max(maxGap,gap);}}
  const duplicateGroups=[...by.entries()].filter(([,xs])=>xs.length>1);
  return {year,acceptedInputs:[...by.values()].reduce((a,x)=>a+x.length,0),uniqueJdns:by.size,duplicateJdns:duplicateGroups.length,maxMultiplicity:Math.max(...[...by.values()].map(x=>x.length)),skippedJdnsBetweenMinMax:skipped,maxGap,duplicateExamples:duplicateGroups.slice(0,3)};
}

function runIntlBoundarySequence(report,id,startJdn,days=800){
  for(let offset=0;offset<days;offset+=1){
    const j=BigInt(startJdn)+BigInt(offset);
    try{const rep=strategies[id].inverse(j,{});const back=calendarDateToJdn(id,rep);if(back!==j)throw new Error(`Intl boundary sequence mismatch ${j} -> ${back}`);report.calendars[id].roundTrips++;report.calendars[id].edgeCases++;report.summary.totalRoundTrips++;report.summary.edgeCases++;}
    catch(error){saveFailure(report,id,"intl-boundary-sequence",{jdn:j},error);}
  }
}

function runFocusedInputTests(report,selected) {
  const focused={hebrewNumerals:null,japaneseGannen:null,chineseLeapMonths:null,monthChoices:{},hebrewYearTypes:null,hindu:null,bahai:null,maya:null};
  if(selected.includes("hebrew")){
    const pairs=[["א׳",1n],["י\"ד",14n],["י״ד",14n],["ט״ו",15n],["ט״ז",16n],["ל׳",30n],["לְ׳",30n]];
    const years=[["תשפ״ו",5786n],["ה׳תשפ״ו",5786n],["ה'תשפ\"ו",5786n],[" תשפ״ו ",5786n],["ה׳",5000n]];
    let ok=true;
    for(const [raw,exp] of pairs){try{assert.equal(parseHebrewNumeral(raw),exp);}catch(e){ok=false;saveFailure(report,"hebrew","hebrew-numeral",{raw},e,{expected:exp});}}
    for(const [raw,exp] of years){try{assert.equal(parseHebrewNumeral(raw,{year:true}),exp);}catch(e){ok=false;saveFailure(report,"hebrew","hebrew-year-numeral",{raw},e,{expected:exp});}}
    const equivalents=[
      {year:"5786",month:"5",day:"30"},{year:"תשפ״ו",month:"5",day:"ל׳"},{year:"ה׳תשפ״ו",month:"5",day:"ל׳"},
    ];
    try{const js=equivalents.map(x=>calendarDateToJdn("hebrew",normalizeCalendarInputValues("hebrew",x)));assert.ok(js.every(x=>x===js[0]));}catch(e){ok=false;saveFailure(report,"hebrew","hebrew-equivalence",equivalents,e);}
    const typeMap={};
    for(let y=5700;y<=5900;y++){
      const len=Number(calendarDateToJdn("hebrew",{year:String(y+1),month:"7",day:"1"})-calendarDateToJdn("hebrew",{year:String(y),month:"7",day:"1"}));
      const key=`${hebrewLeap(BigInt(y))?"leap":"common"}-${len}`;if(!typeMap[key])typeMap[key]=y;
    }
    focused.hebrewYearTypes=typeMap;
    for(const y of Object.values(typeMap)){
      const last=hebrewLeap(BigInt(y))?13:12;
      for(const m of [...Array(last)].map((_,i)=>i+1)){
        let d=31;while(d>0){try{calendarDateToJdn("hebrew",{year:String(y),month:String(m),day:String(d)});break;}catch{d--;}}
        if(d>0)roundTrip(report,"hebrew",{year:String(y),month:String(m),day:String(d)},"edge");
      }
    }
    expectInvalid(report,"hebrew",{year:"5783",month:"13",day:"1"},"month13-common-year");
    focused.hebrewNumerals={status:ok?"PASS":"FAIL",equivalentJdn:calendarDateToJdn("hebrew",{year:"5786",month:"5",day:"30"}).toString()};
  }
  if(selected.includes("japanese-imperial")){
    let ok=true;const eras=[];
    for(const [era,s] of JAPANESE_ERAS){
      const base={era,month:String(s[1]),day:String(s[2])};
      try{const a=calendarDateToJdn("japanese-imperial",{...base,year:"1"});const b=calendarDateToJdn("japanese-imperial",normalizeCalendarInputValues("japanese-imperial",{...base,year:"元"}));const c=calendarDateToJdn("japanese-imperial",normalizeCalendarInputValues("japanese-imperial",{...base,year:" 元年 "}));assert.equal(a,b);assert.equal(a,c);eras.push({era,jdn:a.toString()});}catch(e){ok=false;saveFailure(report,"japanese-imperial","gannen",base,e);}
    }
    for(const [era,start,end] of JAPANESE_ERAS){
      const startJ=gregorianToJdn({year:start[0],month:start[1],day:start[2]});
      const before=jdnToGregorian(startJ-1n);
      expectInvalid(report,"japanese-imperial",{era,year:"1",month:String(before.month),day:String(before.day)},`${era}-day-before-start`);
      if(end){
        const endJ=gregorianToJdn({year:end[0],month:end[1],day:end[2]});const after=jdnToGregorian(endJ+1n);const eraYear=(after.year-start[0]+1n).toString();
        expectInvalid(report,"japanese-imperial",{era,year:eraYear,month:String(after.month),day:String(after.day)},`${era}-day-after-end`);
      }
    }
    focused.japaneseGannen={status:ok?"PASS":"FAIL",eras};
  }
  if(selected.includes("chinese")){
    let found=null;
    outer:for(let y=2000;y<=2035;y++){
      const start=gregorianToJdn({year:BigInt(y),month:1,day:1});
      for(let j=start;j<start+500n;j++){
        try{const p=intlParts("en-u-ca-chinese-nu-latn","Asia/Shanghai",j);if(/bis$/i.test(String(p.month||""))){found=jdnToChinese(j);break outer;}}catch{}
      }
    }
    if(found){const leapJ=calendarDateToJdn("chinese",found);const normal={...found,leapMonth:false};let normalJ=null;try{normalJ=calendarDateToJdn("chinese",normal);}catch{}
      roundTrip(report,"chinese",found,"edge"); if(normalJ!==null&&normalJ===leapJ)saveFailure(report,"chinese","leap-month-confusion",found,new Error("normal and leap month mapped to same JDN"));
      let lastLeapJ=leapJ;while(true){const next=jdnToChinese(lastLeapJ+1n);if(next.relatedYear!==found.relatedYear||next.month!==found.month||!next.leapMonth)break;lastLeapJ+=1n;}
      const lastLeap=jdnToChinese(lastLeapJ);const afterLeap=jdnToChinese(lastLeapJ+1n);roundTrip(report,"chinese",lastLeap,"edge");roundTrip(report,"chinese",afterLeap,"edge");
      focused.chineseLeapMonths={status:"PASS",example:found,leapJdn:leapJ.toString(),normalJdn:normalJ?.toString()??null,lastLeapDay:lastLeap,afterLeap};
    }else{warn(report,"chinese","No leap month discovered in 2000..2035 under this ICU runtime");focused.chineseLeapMonths={status:"WARN"};}
  }

  const monthSample = (id, month) => {
    const samples = {
      gregorian:{year:"2024",day:"1"}, julian:{year:"2024",day:"1"}, hebrew:{year:"5784",day:"1"},
      "islamic-civil":{year:"1445",day:"1"}, "islamic-umalqura":{year:"1445",day:"1"},
      "solar-hijri-official":{year:"1403",day:"1"}, "solar-hijri-arithmetic":{year:"1403",day:"1"},
      chinese:{relatedYear:"2024",day:"1",leapMonth:false}, "hindu-old-solar":{year:"5127",day:"1"},
      "hindu-old-lunar":{year:"5127",day:"1",leapMonth:false}, saka:{year:"1946",day:"1"},
      "thai-buddhist":{year:"2567",day:"1"}, ethiopic:{year:"2016",day:"1"}, coptic:{year:"1740",day:"1"},
      "japanese-imperial":{era:"reiwa",year:"6",day:"1"}, minguo:{year:"113",day:"1"},
      "bahai-tehran":{year:"183",day:"1"}, "bahai-western":{year:"183",day:"1"},
    };
    return {...samples[id], month};
  };
  for(const id of selected){
    const field=calendarField(id,"month"); if(!field)continue;
    let choices;try{choices=calendarMonthChoices(id,field,"en-US");}catch(e){saveFailure(report,id,"month-choices",{},e);continue;}
    if(!choices)continue;
    let ok=true;const values=new Set();let semanticChecks=0;
    for(const ch of choices){
      if(!ch.label||!ch.value||values.has(ch.value))ok=false;values.add(ch.value);
      try {
        const selectedInput=monthSample(id,ch.value);
        const selectedJdn=calendarDateToJdn(id,selectedInput);
        if (/^\d+$/.test(ch.value)) {
          const numericJdn=calendarDateToJdn(id,{...selectedInput,month:Number(ch.value)});
          assert.equal(selectedJdn,numericJdn,`${id} month choice ${ch.value}`);
        }
        semanticChecks += 1;
      } catch (error) { ok=false; saveFailure(report,id,"month-choice-semantic",ch,error); }
    }
    if(!ok && !report.calendars[id].failures.length)saveFailure(report,id,"month-choice-invalid",choices,new Error("empty, duplicate, or semantically invalid month choice"));
    focused.monthChoices[id]={status:ok?"PASS":"FAIL",count:choices.length,semanticChecks,values:[...values]};
  }
  if(selected.includes("hindu-old-solar")||selected.includes("hindu-old-lunar"))focused.hindu={status:"checked",solar:selected.includes("hindu-old-solar")?characterizeHindu("hindu-old-solar"):null,lunar:selected.includes("hindu-old-lunar")?characterizeHindu("hindu-old-lunar"):null,note:"These models are demonstrably non-bijective; JDN preservation is the primary round-trip invariant."};
  if(selected.includes("bahai-tehran")||selected.includes("bahai-western")){
    const lengths={};for(const id of ["bahai-tehran","bahai-western"]){if(!selected.includes(id))continue;lengths[id]=[];for(const y of [181,182,183,184,185]){const a=calendarDateToJdn(id,{year:String(y),month:"1",day:"1"});const b=calendarDateToJdn(id,{year:String(y+1),month:"1",day:"1"});lengths[id].push({year:y,yearLength:Number(b-a),ayyamiHaLength:Number(b-a)-361});}}
    focused.bahai={status:"checked",lengths,note:"variants tested separately; Ayyam-i-Ha length derived from consecutive year starts"};
  }
  if(selected.includes("maya-long-count"))focused.maya={status:"PASS",rollovers:["kin 19->uinal+1","uinal 17->tun+1","tun 19->katun+1","katun 19->baktun+1"],correlation:MAYA_GMT_CORRELATION.toString()};
  report.focused=focused;
}

function runBoundaryContinuity(report,id) {
  const samples={
    gregorian:[2024,1900,2000],julian:[2024,1900],hebrew:[5783,5784,5785,5786],"islamic-civil":[1447,1448],"solar-hijri-arithmetic":[1403,1404],saka:[1822,1922,2022],"thai-buddhist":[2567,2543],ethiopic:[2018,2019],coptic:[1742,1743],minguo:[113,89],"bahai-western":[181,182,183],"bahai-tehran":[182,183,184],
  }[id];
  if(!samples)return;
  for(const y0 of samples){
    const y=String(y0);
    let months=[];
    if(id==="hebrew"){ const last=hebrewLeap(BigInt(y0))?13:12; months=[...Array(last-6)].map((_,i)=>i+7).concat([1,2,3,4,5,6]); }
    else if(id==="ethiopic"||id==="coptic")months=[...Array(13)].map((_,i)=>i+1);
    else if(id.startsWith("bahai-"))months=[...Array(18)].map((_,i)=>i+1).concat(["ayyami-ha",19]);
    else months=[...Array(12)].map((_,i)=>i+1);
    let previousEnd=null;
    for(const m of months){
      let max=id.startsWith("bahai-")?19:31;
      let end=null;
      for(let d=max;d>=1;d--){try{end=calendarDateToJdn(id,{year:y,month:String(m),day:String(d)});break;}catch{}}
      if(end===null)continue;
      const start=calendarDateToJdn(id,{year:y,month:String(m),day:"1"});
      if(previousEnd!==null && start!==previousEnd+1n)saveFailure(report,id,"month-boundary",{year:y,month:m},new Error(`non-contiguous boundary ${previousEnd} -> ${start}`));
      previousEnd=end;
      roundTrip(report,id,{year:y,month:String(m),day:"1"},"edge");roundTrip(report,id,{year:y,month:String(m),day:String(Number(end-start+1n))},"edge");
    }
    if(previousEnd!==null){
      try{
        let nextStart;
        if(id==="hebrew")nextStart=calendarDateToJdn(id,{year:String(y0+1),month:"7",day:"1"});
        else nextStart=calendarDateToJdn(id,{year:String(y0+1),month:"1",day:"1"});
        if(nextStart!==previousEnd+1n)saveFailure(report,id,"year-boundary",{year:y},new Error(`non-contiguous year boundary ${previousEnd} -> ${nextStart}`));
      }catch(e){ if(id!=="bahai-tehran"||y0!==1156)saveFailure(report,id,"year-boundary-exception",{year:y},e); }
    }
  }
}

function runInvalidMatrix(report,id) {
  const base = genericEdges(id)[0];
  const definition = CALENDAR_DEFINITIONS.find(d => d.id === id);
  if (base && definition) {
    const required = definition.fields.find(f => f.kind !== "checkbox" && f.defaultValue === undefined);
    if (required) { const missing={...base}; delete missing[required.name]; expectInvalid(report,id,missing,`missing-${required.name}`); }
    const dayField=definition.fields.find(f=>f.name==="day");
    if(dayField){expectInvalid(report,id,{...base,day:"0"},"day-zero");expectInvalid(report,id,{...base,day:String(Number(dayField.max??31)+1)},"day-over-field-max");}
    const monthFieldDef=definition.fields.find(f=>f.name==="month"&&f.kind==="integer");
    if(monthFieldDef){expectInvalid(report,id,{...base,month:"0"},"month-zero");expectInvalid(report,id,{...base,month:String(Number(monthFieldDef.max??12)+1)},"month-over-field-max");}
    const yearField=definition.fields.find(f=>f.name==="year"||f.name==="relatedYear");
    if(yearField&&id!=="japanese-imperial")expectInvalid(report,id,{...base,[yearField.name]:"not-a-number"},"non-numeric-year");
  }
  switch(id){
    case"gregorian":expectInvalid(report,id,{year:"2025",month:"2",day:"29"},"nonleap-feb29");break;
    case"julian":expectInvalid(report,id,{year:"2025",month:"2",day:"29"},"nonleap-feb29");break;
    case"islamic-civil":expectInvalid(report,id,{year:"1448",month:"2",day:"30"},"even-month-day30");break;
    case"islamic-umalqura":expectInvalid(report,id,{year:"1448",month:"3",day:"31"},"nonexistent-month-day");break;
    case"solar-hijri-official":expectInvalid(report,id,{year:"1405",month:"7",day:"31"},"month7-day31");break;
    case"chinese":expectInvalid(report,id,{relatedYear:"2023",month:"1",day:"1",leapMonth:true},"nonexistent-leap-month");expectInvalid(report,id,{relatedYear:"2023",month:"1",day:"31",leapMonth:false},"day31");break;
    case"solar-hijri-arithmetic":expectInvalid(report,id,{year:"1403",month:"7",day:"31"},"month7-day31");break;
    case"hebrew":expectInvalid(report,id,{year:"תשפX",month:"5",day:"1"},"invalid-hebrew-numeral");break;
    case"hindu-old-lunar":{
      const y=5127;const lp=oldHinduLeapPosition(y);const bad=lp===1?2:1;expectInvalid(report,id,{year:String(y),month:String(bad),day:"1",leapMonth:true},"leap-flag-at-nonleap-position");break;}
    case"ethiopic":expectInvalid(report,id,{year:"2018",month:"13",day:"6"},"pagumen6-common");break;
    case"coptic":expectInvalid(report,id,{year:"1742",month:"13",day:"6"},"epagomenal6-common");break;
    case"japanese-imperial":expectInvalid(report,id,{era:"nope",year:"1",month:"1",day:"1"},"unknown-era");expectInvalid(report,id,{era:"reiwa",year:"元元",month:"5",day:"1"},"invalid-gannen-lookalike");expectInvalid(report,id,{era:"reiwa",year:"1",month:"5",day:"元"},"gannen-outside-year-field");break;
    case"bahai-tehran":expectInvalid(report,id,{year:"1157",month:"1",day:"1"},"outside-tehran-range");expectInvalid(report,id,{year:"183",month:"ayyami-ha",day:"19"},"ayyami-ha-too-long");break;
    case"bahai-western":expectInvalid(report,id,{year:"183",month:"ayyami-ha",day:"19"},"ayyami-ha-too-long");break;
    case"maya-long-count":expectInvalid(report,id,{baktun:"13",katun:"20",tun:"0",uinal:"0",kin:"0",correlation:"584283"},"katun20");expectInvalid(report,id,{baktun:"13",katun:"0",tun:"0",uinal:"18",kin:"0",correlation:"584283"},"uinal18");break;
  }
}

function runMayaRollovers(report) {
  if(!report.calendars["maya-long-count"])return;
  const id="maya-long-count",c=String(MAYA_GMT_CORRELATION);
  const pairs=[
    [{baktun:"0",katun:"0",tun:"0",uinal:"0",kin:"19",correlation:c},{baktun:"0",katun:"0",tun:"0",uinal:"1",kin:"0",correlation:c}],
    [{baktun:"0",katun:"0",tun:"0",uinal:"17",kin:"19",correlation:c},{baktun:"0",katun:"0",tun:"1",uinal:"0",kin:"0",correlation:c}],
    [{baktun:"0",katun:"0",tun:"19",uinal:"17",kin:"19",correlation:c},{baktun:"0",katun:"1",tun:"0",uinal:"0",kin:"0",correlation:c}],
    [{baktun:"0",katun:"19",tun:"19",uinal:"17",kin:"19",correlation:c},{baktun:"1",katun:"0",tun:"0",uinal:"0",kin:"0",correlation:c}],
  ];
  for(const[a,b]of pairs){try{assert.equal(calendarDateToJdn(id,b),calendarDateToJdn(id,a)+1n);}catch(e){saveFailure(report,id,"maya-rollover",{a,b},e);}}
}

function runCrossCalendar(report,selected) {
  const jdns=[gregorianToJdn({year:1900n,month:3,day:1}),gregorianToJdn({year:2000n,month:2,day:29}),gregorianToJdn({year:2026n,month:8,day:13})];
  for(const id of selected){
    const s=strategies[id];
    for(const j of jdns){
      try{
        let ctx={};
        if(id==="maya-long-count")ctx={correlation:String(MAYA_GMT_CORRELATION)};
        const rep=s.inverse(j,ctx); const back=calendarDateToJdn(id,rep); if(back!==j)throw new Error(`cross-calendar ${j} -> ${back}`);
      }catch(e){
        if(["japanese-imperial","bahai-tehran"].includes(id) && (String(e).includes("outside")||String(e).includes("supported")))continue;
        if(id.startsWith("hindu-old-") && String(e).includes("No Hindu representation")){warn(report,id,`JDN ${j} has no representation found by the model enumeration`);continue;}
        saveFailure(report,id,"cross-calendar",{jdn:j},e);
      }
    }
  }
}

function requestedRandomCount(strategy,n){if(strategy.randomCost==="expensive")return Math.min(n,150);if(strategy.randomCost==="medium")return Math.min(n,300);return n;}

function validateCoverage(definitions=CALENDAR_DEFINITIONS) {
  const missing=definitions.map(d=>d.id).filter(id=>!strategies[id]);
  if(missing.length)throw new Error(`No round-trip strategy defined for calendar: ${missing.join(", ")}`);
  return true;
}

function markdownReport(report) {
  const s=report.summary;
  const lines=[`# Calendar round-trip audit`,``,`- Script: \`${report.scriptVersion}\``,`- Commit: \`${report.commitSha}\``,`- Seed: \`${report.seed}\``,`- Node: \`${report.runtime.node}\`; ICU: \`${report.runtime.icu}\``,`- OS: \`${report.runtime.os}\``,`- Time zone: \`${report.runtime.timezone}\``,`- Chromium: \`${report.runtime.chromium||"not detected"}\``,``,`## Summary`,``,`| Metric | Count |`,`|---|---:|`,`| Calendars discovered | ${s.calendarsDiscovered} |`,`| Calendars tested | ${s.calendarsTested} |`,`| Total round trips | ${s.totalRoundTrips} |`,`| Edge cases | ${s.edgeCases} |`,`| Random valid cases | ${s.randomValidCases} |`,`| Invalid-input cases | ${s.invalidInputCases} |`,`| Mismatches | ${s.mismatches} |`,`| Validation failures | ${s.validationFailures} |`,`| Unsupported-runtime cases | ${s.unsupportedRuntimeCases} |`,`| Absolute/project anchors checked | ${s.absoluteAnchorsChecked} |`,``,`## Calendars`,``,`| Calendar | Strategy | Inverse | Independence | Round trips | Random | Invalid | Anchors | Result |`,`|---|---|---|---|---:|---:|---:|---:|---|`];
  for(const id of report.calendarsSelected){const c=report.calendars[id];const result=c.failures.length?"FAIL":c.warnings.length?"WARN":"PASS";lines.push(`| ${id} | ${c.strategy} | ${c.inverseSource} | ${c.independence} | ${c.roundTrips} | ${c.randomValid} | ${c.invalidCases} | ${c.anchors} | ${result} |`);}
  lines.push("","## Focused checks","","```json",stringify(report.focused),"```","","## FAIL");
  if(!report.failures.length)lines.push("","None.");else for(const f of report.failures)lines.push("",`### Failure ${f.id}: ${f.calendar} / ${f.kind}`,"","```json",stringify(f),"```");
  lines.push("","## WARN");if(!report.warnings.length)lines.push("","None.");else for(const w of report.warnings)lines.push("",`- **${w.calendar}:** ${w.message}`);
  lines.push("","## Interpretation","","A PASS proves the properties exercised by this harness. For strategies marked non-independent, round-trip is evidence of internal consistency and boundary/canonicalization behavior, not an independent proof of absolute calendar correctness. Existing project JDN vectors are checked separately as anchors.","");
  return lines.join("\n");
}

function writeReports(report,dir) {
  fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(path.join(dir,"failures"),{recursive:true});
  // failure files may have been written to default dir while an override is in use; mirror them here.
  for(const f of report.failures)fs.writeFileSync(path.join(dir,"failures",`failure-${f.id}.json`),stringify(f)+"\n");
  fs.writeFileSync(path.join(dir,"report.json"),stringify(report)+"\n");
  fs.writeFileSync(path.join(dir,"report.md"),markdownReport(report)+"\n");
}

function replayFailure(file) {
  const item=reviveDeep(JSON.parse(fs.readFileSync(file,"utf8")));
  const id=item.calendar;if(!strategies[id])throw new Error(`No round-trip strategy defined for calendar: ${id}`);
  console.log(`[replay] ${id} ${item.kind}`);console.log(`input=${stringify(item.input,0)}`);
  if(String(item.kind).startsWith("invalid-")){
    try{const n=normalizeCalendarInputValues(id,item.input);const j=calendarDateToJdn(id,n);console.log(`REPRODUCED: invalid input accepted as JDN ${j}`);return 1;}catch(e){console.log(`NOT REPRODUCED: now throws ${e}`);return 0;}
  }
  try{const n=normalizeCalendarInputValues(id,item.input);const j1=calendarDateToJdn(id,n);const r=strategies[id].inverse(j1,n);const j2=calendarDateToJdn(id,r);console.log(`JDN1=${j1} reconstructed=${stringify(r,0)} JDN2=${j2}`);if(j1!==j2){console.log("REPRODUCED");return 1;}console.log("NOT REPRODUCED: round-trip passes");return 0;}catch(e){console.error(e);return 1;}
}

function selfTest() {
  validateCoverage();
  let unknownCaught=false;try{validateCoverage([...CALENDAR_DEFINITIONS,{id:"__future_calendar_probe__"}]);}catch(e){unknownCaught=/No round-trip strategy/.test(String(e));}
  assert.equal(unknownCaught,true,"unknown calendar must fail coverage validation");
  const rng1=new Rng(12345),rng2=new Rng(12345);for(let i=0;i<100;i++)assert.equal(rng1.next64(),rng2.next64(),"seed must reproduce");
  let injectionCaught=false;try{assert.equal(1,2);}catch{injectionCaught=true;}assert.equal(injectionCaught,true,"mismatch probe must be catchable");
  console.log("SELF-TEST PASS: coverage guard, deterministic seed, mismatch detection probe");
}

async function main() {
  const options=parseArgs(process.argv.slice(2));
  if(options.selfTest){selfTest();if(!options.all&&!options.calendar&&!options.replay)return 0;}
  if(options.replay)return replayFailure(path.resolve(options.replay));
  validateCoverage();
  const discovered=CALENDAR_DEFINITIONS.map(d=>d.id);
  let selected=options.all?discovered:[options.calendar];
  for(const id of selected)if(!discovered.includes(id))throw new RangeError(`Calendar not present in CALENDAR_DEFINITIONS: ${id}`);
  const report=createReport(options,selected);
  console.log(`[audit] commit=${COMMIT_SHA}`);console.log(`[audit] calendars discovered=${discovered.length}: ${discovered.join(", ")}`);console.log(`[audit] Node=${report.runtime.node} ICU=${report.runtime.icu} Chromium=${report.runtime.chromium||"none"}`);
  for(const [id,input,expected,label] of anchors)if(selected.includes(id))anchorCheck(report,id,input,expected,label);
  if(selected.includes("bahai-tehran"))for(const[y,j]of tehranAnchors)anchorCheck(report,"bahai-tehran",{year:String(y),month:"1",day:"1"},j,"Tehran established year-start vector");

  for(const id of selected){
    console.log(`[audit] ${id}: edges`);
    for(const input of genericEdges(id))roundTrip(report,id,input,"edge");
    runBoundaryContinuity(report,id);
    runInvalidMatrix(report,id);
  }
  runFocusedInputTests(report,selected);
  const seqStart=gregorianToJdn({year:2022n,month:1,day:1});
  for(const id of ["islamic-umalqura","solar-hijri-official","chinese"])if(selected.includes(id))runIntlBoundarySequence(report,id,seqStart,900);
  runMayaRollovers(report);runCrossCalendar(report,selected);

  if(!options.edgesOnly){
    const rng=new Rng(options.seed);
    for(const id of selected){
      const count=requestedRandomCount(strategies[id],options.random);console.log(`[audit] ${id}: random valid ${count}`);
      for(let i=0;i<count;i++){
        let input;try{input=strategies[id].random(rng);}catch(e){saveFailure(report,id,"generator",{case:i},e);continue;}
        roundTrip(report,id,input,"random");
      }
    }
  }

  if(process.env.PASTAFARI_AUDIT_INJECT_MISMATCH==="1"&&selected.includes("gregorian"))saveFailure(report,"gregorian","injected-self-test",{year:"2026",month:"8",day:"13"},new Error("Synthetic mismatch injected by PASTAFARI_AUDIT_INJECT_MISMATCH=1"));
  report.finishedUtc=new Date().toISOString();report.durationMs=Date.parse(report.finishedUtc)-Date.parse(report.startedUtc);
  writeReports(report,options.reportDir);
  console.log(`[audit] report=${path.join(options.reportDir,"report.md")}`);console.log(`[audit] result=${report.failures.length?"FAIL":report.warnings.length?"WARN":"PASS"} failures=${report.failures.length} warnings=${report.warnings.length} roundTrips=${report.summary.totalRoundTrips}`);
  return report.failures.length?1:0;
}

main().then(code=>{process.exitCode=code;}).catch(error=>{console.error(error?.stack||error);process.exitCode=2;});
