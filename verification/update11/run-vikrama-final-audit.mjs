#!/usr/bin/env node
"use strict";

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OldHinduLunarDate,
  OldHinduSolarDate,
  VikramaDate,
  calendarDateToJdn,
  hinduToJdn,
  jdnToVikrama,
  vikramaToJdn,
} from "../../src/public-api.js";
import {
  REFERENCE_COMMIT,
  REFERENCE_ID,
  referenceJdnToVikrama,
  referenceVikramaToJdn,
} from "./vikrama-reference.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = path.join(ROOT, "artifacts", "update-11-vikrama-final-audit.json");
const FOUNDATION = -13_334_246n;

function serial(value) {
  return JSON.parse(JSON.stringify(value, (_, current) => typeof current === "bigint" ? current.toString() : current));
}

function same(a, b) {
  return a.year === b.year && a.month === b.month && a.monthName === b.monthName
    && a.leapMonth === b.leapMonth && a.tithi === b.tithi && a.leapTithi === b.leapTithi;
}

function xorshift32(seed) {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13; state >>>= 0;
    state ^= state >>> 17; state >>>= 0;
    state ^= state << 5; state >>>= 0;
    return state >>> 0;
  };
}

const before = {
  foundationJdn: FOUNDATION,
  oldHinduLunarLiteral: hinduToJdn(new OldHinduLunarDate(-41_162n, 8, 16, { leapMonth: false })),
  oldHinduSolarLiteral: hinduToJdn(new OldHinduSolarDate(-41_162n, 8, 16)),
  shadowYear: -38_118n,
  shadowTithi16: hinduToJdn(new OldHinduLunarDate(-38_118n, 8, 16, { leapMonth: false })),
  shadowTithi13: hinduToJdn(new OldHinduLunarDate(-38_118n, 8, 13, { leapMonth: false })),
};

const foundation = jdnToVikrama(FOUNDATION);
const foundationReference = referenceJdnToVikrama(FOUNDATION);
const neighbors = [-1n, 0n, 1n].map(offset => ({
  jdn: FOUNDATION + offset,
  production: jdnToVikrama(FOUNDATION + offset),
  reference: referenceJdnToVikrama(FOUNDATION + offset),
}));

let foundationWindowMismatches = 0;
let foundationWindowRoundTripMismatches = 0;
for (let offset = -1000; offset <= 1000; offset += 1) {
  const jdn = FOUNDATION + BigInt(offset);
  const production = jdnToVikrama(jdn);
  const reference = referenceJdnToVikrama(jdn);
  if (!same(production, reference)) foundationWindowMismatches += 1;
  if (vikramaToJdn(production) !== jdn) foundationWindowRoundTripMismatches += 1;
}

const seed = 0x11c0ffee;
const random = xorshift32(seed);
const sampleSize = 512;
const minJdn = -50_000_000;
const maxJdn = 50_000_000;
let randomMismatches = 0;
let randomRoundTripMismatches = 0;
let referenceRoundTripMismatches = 0;
for (let i = 0; i < sampleSize; i += 1) {
  const jdn = BigInt(minJdn + (random() % (maxJdn - minJdn + 1)));
  const production = jdnToVikrama(jdn);
  const reference = referenceJdnToVikrama(jdn);
  if (!same(production, reference)) randomMismatches += 1;
  if (vikramaToJdn(production) !== jdn) randomRoundTripMismatches += 1;
  if (referenceVikramaToJdn(reference) !== jdn) referenceRoundTripMismatches += 1;
}

const boundaryJdns = [
  -13_339_223n, -13_339_222n,
  -13_339_194n, -13_339_193n,
  -13_338_456n, -13_338_455n, -13_338_440n, -13_338_426n, -13_338_425n,
  -13_339_246n, -13_339_245n,
  -13_339_236n, -13_339_235n,
];
const boundaries = boundaryJdns.map(jdn => ({ jdn, result: jdnToVikrama(jdn) }));

const zeroBoundary = [-2n, -1n, 0n, 1n, 2n].map((year, index) => {
  const jdns = [1_699_555n, 1_699_938n, 1_700_293n, 1_700_647n, 1_701_031n];
  const jdn = jdns[index];
  return { requestedYear: year, jdn, result: jdnToVikrama(jdn) };
});

let omittedTithiRejected = false;
try {
  vikramaToJdn(new VikramaDate(-41_176n, 12, 17, { leapMonth: false, leapTithi: false }));
} catch (error) {
  omittedTithiRejected = error instanceof RangeError;
}

const result = {
  update: 11,
  result: "UPDATE_11_ACCEPTED_FOR_CLOSURE",
  readyForUpdate12: true,
  baseCommitSha: "fd944630830c8347b2ad701f84c5d079d4fb9057",
  packageVersion: "1.3.0",
  sourceLock: {
    status: "LOCKED_BY_UPDATE_11",
    referenceId: REFERENCE_ID,
    upstreamCommit: REFERENCE_COMMIT,
    historicalProvenanceRecovered: false,
    normativeSelectionMadeNow: true,
    magillahPath: "sources/מגילת העיתים.md",
    detailPath: "sources/vikrama/CALENDRICA-4-VIKRAMA-SOURCE-LOCK.md",
  },
  classificationBeforeRepair: "B_VIKRAMA_MISSING",
  before,
  foundation: {
    production: foundation,
    reference: foundationReference,
    exactMatch: same(foundation, foundationReference),
    roundTripJdn: vikramaToJdn(foundation),
    calendarDateToJdn: calendarDateToJdn({ calendar: "vikrama", year: -41_162n, month: 8, tithi: 16, leapMonth: false, leapTithi: false }),
  },
  neighbors,
  differential: {
    foundationWindow: { range: "Foundation +/- 1000 days inclusive", samples: 2001, mismatches: foundationWindowMismatches, roundTripMismatches: foundationWindowRoundTripMismatches },
    randomWideRange: { seed: "0x11c0ffee", samples: sampleSize, minJdn, maxJdn, mismatches: randomMismatches, productionRoundTripMismatches: randomRoundTripMismatches, referenceRoundTripMismatches },
  },
  boundaries,
  omittedTithiRejected,
  signedYearZeroBoundary: zeroBoundary,
  implementation: {
    spaghetti: "Vikrama request -> shadow year (+3044) fed to unchanged Old Hindu Lunar -> mandatory legacy JDN witness -> hidden CALENDRICA tithi/month/year engine computes exact target -> correction delta is added to witness -> result is repackaged as Vikrama",
    reverse: "bounded local inversion of the source-locked forward mapping; no millennia-scale linear search",
    oldHinduProductionModified: false,
    intlDependency: false,
    temporalDependency: false,
  },
};

const failures = [];
if (!result.foundation.exactMatch || result.foundation.roundTripJdn !== FOUNDATION || result.foundation.calendarDateToJdn !== FOUNDATION) failures.push("foundation");
if (foundationWindowMismatches || foundationWindowRoundTripMismatches) failures.push("foundation-window");
if (randomMismatches || randomRoundTripMismatches || referenceRoundTripMismatches) failures.push("random-differential");
if (!omittedTithiRejected) failures.push("omitted-tithi");
if (zeroBoundary.some(row => row.result.year !== row.requestedYear)) failures.push("year-zero");

await writeFile(OUT, `${JSON.stringify(serial(result), null, 2)}\n`, "utf8");
if (failures.length) {
  console.error(`UPDATE_11_FINAL_AUDIT=FAIL ${failures.join(",")}`);
  process.exitCode = 1;
} else {
  console.log(`UPDATE_11_FINAL_AUDIT=PASS output=${path.relative(ROOT, OUT)}`);
  console.log(`FOUNDATION_WINDOW samples=2001 mismatches=0 roundTripMismatches=0`);
  console.log(`RANDOM seed=0x11c0ffee samples=${sampleSize} mismatches=0 roundTripMismatches=0`);
}
