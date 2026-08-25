#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";
import * as authoritative from "../../browser/pastafari-calendar-core.js";
import * as fast from "../../browser/pastafari-calendar-fast.js";
import { ROOT, stable, writeJson } from "./lib.mjs";

const SEED = 0x20c10a5en;
const TABLETS_JDN = 1_442_903n;
const MODERN = 2_461_317n;
let state = SEED;
function next64() {
  state = BigInt.asUintN(64, state + 0x9e3779b97f4a7c15n);
  let z = state;
  z = BigInt.asUintN(64, (z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n);
  z = BigInt.asUintN(64, (z ^ (z >> 27n)) * 0x94d049bb133111ebn);
  return BigInt.asUintN(64, z ^ (z >> 31n));
}
function signed(limit) {
  const span = BigInt(limit * 2 + 1);
  return (next64() % span) - BigInt(limit);
}
function tuple(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}
function authCalendar() { return new authoritative.PastafariCalendar({ todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1) }); }
function fastCalendar() { return new fast.PastafariCalendar({ todayProvider: () => new fast.GregorianDate(2000n, 1, 1) }); }

const cases = [];
const strata = [
  ["foundation", FOUNDATION_JDN],
  ["tablets", TABLETS_JDN],
  ["near-zero", 0n],
  ["modern", MODERN],
  ["far-negative", -25_000_000n],
  ["far-positive", 12_000_000n],
];
for (const [stratum, anchor] of strata) {
  for (let i = 0; i < 1; i += 1) {
    const c = anchor + signed(997);
    const t = anchor + signed(1499);
    cases.push({ stratum, c, t });
  }
}
for (let i = 0; i < 3; i += 1) {
  const left = 1000n + (next64() % 50_000n);
  const right = 1000n + (next64() % 50_000n);
  cases.push({ stratum: i % 2 === 0 ? "cross-zero-c-negative" : "cross-zero-t-negative", c: i % 2 === 0 ? -left : right, t: i % 2 === 0 ? right : -left });
}
for (let i = 0; i < 3; i += 1) {
  const c = FOUNDATION_JDN + signed(211);
  const distance = 250_000n + (next64() % 2_000_000n);
  cases.push({ stratum: "large-distance", c, t: i % 2 === 0 ? c + distance : c - distance });
}
cases.push({ stratum: "cardinality-5778", c: -14_072_054n, t: -14_072_054n });

const canonicalCorpus = await readFile(path.join(ROOT, "verification/update17/generated/normative-final-tuples.json"), "utf8");
const rows = [];
let collisionsWithCanonical = 0;
for (const item of cases) {
  const cText = String(item.c);
  const tText = String(item.t);
  const corpusCollision = canonicalCorpus.includes(`\"calculationJdn\": \"${cText}\"`) && canonicalCorpus.includes(`\"targetJdn\": \"${tText}\"`);
  if (corpusCollision) collisionsWithCanonical += 1;
  const ref = tuple(new ReferenceCalendar(item.c).convertJdn(item.t));
  const auth = tuple(authCalendar().convertJdn(item.t, { calculationJdn: item.c }));
  const quick = tuple(fastCalendar().convertJdn(item.t, { calculationJdn: item.c }));
  rows.push({
    stratum: item.stratum,
    calculationJdn: cText,
    targetJdn: tText,
    reference: ref,
    authoritative: auth,
    fast: quick,
    authoritativeMatch: stable(ref) === stable(auth),
    fastMatch: stable(ref) === stable(quick),
    corpusCollision,
  });
}
const mismatches = rows.filter((row) => !row.authoritativeMatch || !row.fastMatch);
const failures = [];
if (mismatches.length) failures.push(`${mismatches.length} semantic mismatch(es)`);
if (collisionsWithCanonical) failures.push(`${collisionsWithCanonical} seal holdout case(s) collide with canonical corpus`);
const artifact = {
  schema: "pastafari.update20.seal-holdout.v1",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  seed: `0x${SEED.toString(16)}`,
  samplingLogic: "splitmix64 stratified anchors + explicit cross-zero + large-distance; distinct from Update 19 harness",
  totals: { cases: rows.length, authoritativeMismatches: rows.filter((row) => !row.authoritativeMatch).length, fastMismatches: rows.filter((row) => !row.fastMatch).length, canonicalCorpusCollisions: collisionsWithCanonical },
  rows,
  failures,
};
await writeJson("seal-holdout.json", artifact);
console.log(JSON.stringify({ status: artifact.status, seed: artifact.seed, totals: artifact.totals }, null, 2));
if (failures.length) process.exitCode = 1;
