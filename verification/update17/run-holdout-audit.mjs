#!/usr/bin/env node
"use strict";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";
import * as fast from "../../browser/pastafari-calendar-fast.js";
import * as authoritative from "../../browser/pastafari-calendar-core.js";

const ROOT = process.cwd();
const cacheArg = process.argv.find((arg) => arg.startsWith("--gate-cache="));
const outArg = process.argv.find((arg) => arg.startsWith("--out="));
if (!cacheArg) throw new Error("--gate-cache=<fresh reference-derived ephemeral cache> is required");
const out = path.resolve(ROOT, outArg?.slice("--out=".length) || "verification/update17/holdout-audit.json");
const cache = JSON.parse(await readFile(path.resolve(ROOT, cacheArg.slice("--gate-cache=".length)), "utf8"));
const gaps = new Map(cache.gaps.map(([index, gap]) => [Number(index), BigInt(gap)]));
const positions = new Map([[0, FOUNDATION_JDN]]);
let running = FOUNDATION_JDN;
for (let index = -1; index >= cache.minimum; index -= 1) { running -= gaps.get(index); positions.set(index, running); }
running = FOUNDATION_JDN;
for (let index = 1; index <= cache.maximum; index += 1) { running += gaps.get(index); positions.set(index, running); }
const gateTable = {
  minimum: cache.minimum,
  maximum: cache.maximum,
  position(index) { const value = positions.get(index); if (value === undefined) throw new RangeError(`missing gate ${index}`); return value; },
  containingInterval(jdnValue) {
    const day = BigInt(jdnValue); let lo = this.minimum, hi = this.maximum - 1;
    while (lo < hi) { const mid = Math.floor((lo + hi + 1) / 2); if (this.position(mid) < day) lo = mid; else hi = mid - 1; }
    return lo;
  },
};
const manifest = JSON.parse(await readFile(path.join(ROOT, "verification/update17/generated/normative-evidence-manifest.json"), "utf8"));
const corpus = JSON.parse(await readFile(path.join(ROOT, "verification/update17/generated/normative-final-tuples.json"), "utf8"));
const corpusInputs = new Set(corpus.vectors.map((v) => `${v.input.calculationJdn}:${v.input.targetJdn}`));
const seed = 0x17a11d17;
let state = seed >>> 0;
function next() { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; state >>>= 0; return state; }
function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return { year: String(source.year), cutletName: String(source.cutletName), dayInCutlet: Number(source.dayInCutlet), monthName: String(source.monthName), dayInMonth: Number(source.dayInMonth) };
}
const TABLETS_JDN = FOUNDATION_JDN + 14_777_149n;
const calculations = [FOUNDATION_JDN, TABLETS_JDN, 2_461_259n];
const rows = [];
for (const calculationJdn of calculations) {
  const reference = new ReferenceCalendar(calculationJdn, { gateTable });
  const fastCalendar = new fast.PastafariCalendar({ todayProvider: () => new fast.GregorianDate(2000n, 1, 1) });
  const authoritativeCalendar = new authoritative.PastafariCalendar({ todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1) });
  let accepted = 0;
  while (accepted < 4) {
    const magnitude = 501 + (next() % 50_000);
    const sign = (next() & 1) ? 1 : -1;
    const targetJdn = calculationJdn + BigInt(sign * magnitude);
    const inputKey = `${calculationJdn}:${targetJdn}`;
    if (corpusInputs.has(inputKey)) continue;
    const expected = canonical(reference.convertJdn(targetJdn));
    const fastActual = canonical(fastCalendar.convertJdn(targetJdn, { calculationJdn }));
    const authoritativeActual = canonical(authoritativeCalendar.convertJdn(targetJdn, { calculationJdn }));
    const fastMatch = JSON.stringify(fastActual) === JSON.stringify(expected);
    const authoritativeMatch = JSON.stringify(authoritativeActual) === JSON.stringify(expected);
    rows.push({ id: `holdout-${calculationJdn}-${targetJdn}`, input: { calculationJdn: String(calculationJdn), targetJdn: String(targetJdn) }, expected, fastMatch, authoritativeMatch, ...(!fastMatch ? { fastActual } : {}), ...(!authoritativeMatch ? { authoritativeActual } : {}) });
    accepted += 1;
  }
}
const fastMismatches = rows.filter((row) => !row.fastMatch).length;
const authoritativeMismatches = rows.filter((row) => !row.authoritativeMatch).length;
const report = {
  schema: "pastafari-update17-holdout-audit-v1",
  role: "C-regression-evidence",
  normativeAuthority: false,
  seed,
  samplePolicy: "fixed-seed targets not present in committed canonical final-tuple corpus; expected values computed directly by independent reference",
  scrollHash: manifest.meta.scrollHash,
  referenceHash: manifest.meta.referenceHash,
  cases: rows.length,
  fast: { matches: rows.length - fastMismatches, mismatches: fastMismatches },
  authoritative: { matches: rows.length - authoritativeMismatches, mismatches: authoritativeMismatches },
  status: fastMismatches || authoritativeMismatches ? "FAIL" : "PASS",
  rows,
};
await writeFile(out, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ status: report.status, cases: report.cases, fast: report.fast, authoritative: report.authoritative }, null, 2));
if (report.status !== "PASS") process.exitCode = 2;
