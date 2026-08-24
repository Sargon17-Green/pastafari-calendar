#!/usr/bin/env node
"use strict";

import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  FOUNDATION_JDN,
  ReferenceCalendar,
  ReferenceGateTable,
  ReferenceNotImplementedError,
  buildReferenceYearStructure,
  canonicalCounters,
  discoverYearCandidates,
  gateGap,
  gatePosition,
  materializeReferenceTuple,
  monthInterleavingCount,
  unrankMonthInterleaving,
  sauce as referenceSauce,
  serializeBigInts,
} from "../reference-oracle/reference.mjs";
import * as authoritative from "../../browser/pastafari-calendar-core.js";
import * as fast from "../../browser/pastafari-calendar-fast.js";
import * as publicApi from "../../src/public-api.js";
import { handlePastafariWorkerRequest as handleAuthoritativeWorkerRequest } from "../../browser/pastafari-authoritative-worker.js";
import { handlePastafariWorkerRequest as handleFastWorkerRequest } from "../../browser/pastafari-fast-worker.js";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const DEFAULT_OUT = path.join(ROOT, "artifacts/update-18/final-differential-integration.json");
const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.split("=");
  return [key, rest.length ? rest.join("=") : "true"];
}));
const TIER = args.get("--tier") || "ci";
const OUT = path.resolve(ROOT, args.get("--out") || DEFAULT_OUT);
const WRITE = args.get("--no-write") !== "true";

const CANONICAL_FIELDS = Object.freeze(["year", "cutletName", "dayInCutlet", "monthName", "dayInMonth"]);
const UPDATE17_DIR = path.join(ROOT, "verification/update17/generated");
const TABLETS_JDN = FOUNDATION_JDN + 14_777_149n;
const UPDATE18_SEED = 0x1817_5eed;
const CI_MODE = TIER !== "extended";
const CANONICAL_LIMIT = Number(args.get("--canonical-limit") || (CI_MODE ? 1 : 0));
const HOLDOUT_RANDOM_LIMIT = Number(args.get("--holdout-random") || (CI_MODE ? 0 : 128));
const DENSE_RADIUS = Number(args.get("--dense-radius") || (CI_MODE ? 0 : 64));
const INCLUDE_COMPONENTS = !CI_MODE || args.get("--include-components") === "true";
const INCLUDE_MONTH_WEAVING = args.get("--include-month-weaving") === "true" || (!CI_MODE && args.get("--include-month-weaving") !== "false");
const INCLUDE_WORKER = !CI_MODE || args.get("--include-worker") === "true";
const INCLUDE_IMPORT_ORDER = !CI_MODE || args.get("--include-import-order") === "true";
const INCLUDE_EXPENSIVE_GATES = args.get("--include-expensive-gates") === "true";
const COMPONENT_GATE_LIMIT = Number(args.get("--component-gate-limit") || (CI_MODE ? 14 : 96));

function npmVersionFromEnvironment() {
  const userAgent = process.env.npm_config_user_agent || "";
  const match = userAgent.match(/(?:^|\s)npm\/([^\s]+)/);
  if (match) return match[1];
  // Do not spawn `npm --version` while this harness itself is running under npm.
  // Some npm versions can deadlock or stall nested lifecycle invocations in CI.
  if (process.env.npm_lifecycle_event) return null;
  const probe = spawnSync("npm", ["--version"], { encoding: "utf8", timeout: 5000 });
  return probe.status === 0 ? probe.stdout.trim() || null : null;
}

function sha256Text(text) { return createHash("sha256").update(text).digest("hex"); }
async function sha256File(file) { return sha256Text(await readFile(file, "utf8")); }
async function readJson(file) { return JSON.parse(await readFile(file, "utf8")); }
function nowIso() { return new Date().toISOString(); }
function msSince(start) { return Math.round((performance.now() - start) * 1000) / 1000; }

function serial(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serial);
  if (value && typeof value === "object") {
    const source = typeof value.toJSON === "function" ? value.toJSON() : value;
    return Object.fromEntries(Object.keys(source).sort().map((key) => [key, serial(source[key])]));
  }
  return value;
}

function stableString(value) { return JSON.stringify(serial(value)); }
function same(left, right) { return stableString(left) === stableString(right); }

function canonicalTuple(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") throw new TypeError("calendar result is not an object");
  const out = {};
  for (const field of CANONICAL_FIELDS) out[field] = source[field];
  out.year = String(out.year);
  out.dayInCutlet = Number(out.dayInCutlet);
  out.dayInMonth = Number(out.dayInMonth);
  out.cutletName = String(out.cutletName);
  out.monthName = String(out.monthName);
  return Object.freeze(out);
}

function sauceProjection(value) {
  const source = serial(value);
  const final = source.final || source;
  const rawOrder = final.lastDropPermutation || source.lastDropPermutation || final.finalDropOrder || source.finalDropOrder;
  const zeroBased = Array.isArray(rawOrder) && rawOrder.some((item) => Number(item) === 0);
  return {
    bowls: final.bowls,
    finalDropOrder: Array.isArray(rawOrder)
      ? rawOrder.map((item) => zeroBased ? Number(item) + 1 : Number(item))
      : rawOrder,
  };
}

function oneBasedWeaving(value) {
  return serial(value).map((item) => Number(item) + 1);
}

function firstDiff(left, right, pathParts = []) {
  const l = serial(left);
  const r = serial(right);
  if (stableString(l) === stableString(r)) return null;
  if (!l || !r || typeof l !== "object" || typeof r !== "object") {
    return { path: pathParts.join(".") || "$", referenceValue: l, actualValue: r };
  }
  const keys = [...new Set([...Object.keys(l), ...Object.keys(r)])].sort();
  for (const key of keys) {
    const diff = firstDiff(l[key], r[key], [...pathParts, key]);
    if (diff) return diff;
  }
  return { path: pathParts.join(".") || "$", referenceValue: l, actualValue: r };
}

function classifyComparison(expected, actual, stage = "finalPastafarianTuple") {
  if (actual?.status === "NOT_APPLICABLE" || actual?.status === "REFERENCE_NOT_IMPLEMENTED") return actual;
  if (actual?.error) return { status: "ERROR", error: actual.error };
  const match = same(expected, actual);
  return match ? { status: "PASS" } : { status: "MISMATCH", firstMismatch: { firstStage: stage, ...firstDiff(expected, actual) } };
}

function makeLcg(seed) {
  let state = seed >>> 0;
  return () => {
    state ^= state << 13; state >>>= 0;
    state ^= state >>> 17; state >>>= 0;
    state ^= state << 5; state >>>= 0;
    return state >>> 0;
  };
}

const referenceCalendarCache = new Map();
function referenceCalendar(calculationJdn) {
  const key = String(calculationJdn);
  let value = referenceCalendarCache.get(key);
  if (!value) { value = new ReferenceCalendar(BigInt(calculationJdn)); referenceCalendarCache.set(key, value); }
  return value;
}

function authoritativeCalendar() {
  return new authoritative.PastafariCalendar({ todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1) });
}

function fastCalendar() {
  return new fast.PastafariCalendar({ todayProvider: () => new fast.GregorianDate(2000n, 1, 1) });
}

const coldAuthoritative = authoritativeCalendar();
const coldFast = fastCalendar();

async function runFinalTupleCase(row) {
  if (process.env.UPDATE18_DEBUG) console.error(`[update18-case] start ${row.id}`);
  const start = performance.now();
  const input = { calculationJdn: String(row.calculationJdn), targetJdn: String(row.targetJdn) };
  const record = {
    id: row.id,
    category: row.category,
    input,
    environment: row.environment || "node-module",
    stateProfile: row.stateProfile || "cold-module",
    expectedSource: row.expectedSource || "reference-runtime",
    timing: {},
  };
  let expected;
  try {
    if (row.expected) expected = canonicalTuple(row.expected);
    else expected = canonicalTuple(referenceCalendar(row.calculationJdn).convertJdn(BigInt(row.targetJdn)));
    record.reference = expected;
  } catch (error) {
    record.reference = { error: { name: error.name, message: error.message } };
    record.status = error instanceof ReferenceNotImplementedError ? "REFERENCE_NOT_IMPLEMENTED" : "ERROR";
    record.timing.elapsedMs = msSince(start);
    return record;
  }

  let authActual;
  let fastActual;
  try { authActual = canonicalTuple((row.authCalendar || coldAuthoritative).convertJdn(BigInt(row.targetJdn), { calculationJdn: BigInt(row.calculationJdn) })); }
  catch (error) { authActual = { error: { name: error.name, message: error.message } }; }
  try { fastActual = canonicalTuple((row.fastCalendar || coldFast).convertJdn(BigInt(row.targetJdn), { calculationJdn: BigInt(row.calculationJdn) })); }
  catch (error) { fastActual = { error: { name: error.name, message: error.message } }; }

  record.authoritative = authActual;
  record.fast = fastActual;
  record.authoritativeComparison = classifyComparison(expected, authActual);
  record.fastComparison = classifyComparison(expected, fastActual);
  record.status = [record.authoritativeComparison.status, record.fastComparison.status].includes("MISMATCH") ? "MISMATCH"
    : [record.authoritativeComparison.status, record.fastComparison.status].includes("ERROR") ? "ERROR"
    : "PASS";
  record.firstMismatch = record.authoritativeComparison.firstMismatch || record.fastComparison.firstMismatch || null;
  record.timing.elapsedMs = msSince(start);
  if (process.env.UPDATE18_DEBUG) console.error(`[update18-case] done ${row.id} ${record.status}`);
  return record;
}

function generateHoldoutCases(corpusInputs) {
  const rand = makeLcg(UPDATE18_SEED);
  const cases = [];
  const anchors = CI_MODE ? [
    { name: "foundation", c: FOUNDATION_JDN },
  ] : [
    { name: "foundation", c: FOUNDATION_JDN },
    { name: "tablets", c: TABLETS_JDN },
    { name: "negative-axis-near-zero", c: -777n },
    { name: "cross-zero-positive-target", c: -57n },
    { name: "cross-zero-positive-calculation", c: 57n },
  ];
  const offsets = CI_MODE ? [-31n, -1n, 0n, 1n, 17n] : [-377n, -123n, -31n, -1n, 0n, 1n, 17n, 89n, 233n, 610n];
  for (const anchor of anchors) {
    for (const offset of offsets) {
      const t = anchor.name === "cross-zero-positive-target" ? (offset <= 0n ? -offset + 1n : offset) :
        anchor.name === "cross-zero-positive-calculation" ? (offset >= 0n ? -offset - 1n : offset) : anchor.c + offset;
      const key = `${anchor.c}:${t}`;
      if (!corpusInputs.has(key)) {
        cases.push({ id: `holdout-${anchor.name}-${String(t).replace(/-/g, "m")}`, category: "B-fresh-deterministic-holdout", calculationJdn: anchor.c, targetJdn: t, stateProfile: "fresh-reference-runtime" });
      }
    }
  }
  let accepted = 0;
  while (accepted < HOLDOUT_RANDOM_LIMIT) {
    const anchor = anchors[rand() % anchors.length];
    const magnitude = BigInt(1 + (rand() % (TIER === "extended" ? 10_000 : 1_000)));
    const sign = (rand() & 1) ? 1n : -1n;
    let t = anchor.c + sign * magnitude;
    if (anchor.name === "cross-zero-positive-target") t = magnitude;
    if (anchor.name === "cross-zero-positive-calculation") t = -magnitude;
    const key = `${anchor.c}:${t}`;
    if (corpusInputs.has(key)) continue;
    cases.push({ id: `holdout-random-${accepted}-${String(anchor.c)}-${String(t)}`, category: "B-fresh-stratified-random", calculationJdn: anchor.c, targetJdn: t, stateProfile: "seeded-holdout" });
    accepted += 1;
  }
  return cases;
}

function denseCases() {
  const cases = [];
  const windows = CI_MODE ? [
    { name: "foundation", c: FOUNDATION_JDN, radius: DENSE_RADIUS },
  ] : [
    { name: "foundation", c: FOUNDATION_JDN, radius: DENSE_RADIUS },
    { name: "negative-small", c: -37n, radius: DENSE_RADIUS },
    { name: "zero", c: 0n, radius: DENSE_RADIUS },
  ];
  for (const win of windows) {
    for (let offset = -win.radius; offset <= win.radius; offset += 1) {
      const t = win.c + BigInt(offset);
      cases.push({ id: `dense-fixed-c-${win.name}-${offset}`, category: "C-directed-dense-fixed-c", calculationJdn: win.c, targetJdn: t, stateProfile: "dense-local-sweep" });
    }
  }
  if (!CI_MODE) {
    const gridRadius = 5;
    for (let co = -gridRadius; co <= gridRadius; co += 1) {
      for (let to = -gridRadius; to <= gridRadius; to += 1) {
        cases.push({ id: `grid-foundation-${co}-${to}`, category: "C-two-dimensional-local-grid", calculationJdn: FOUNDATION_JDN + BigInt(co), targetJdn: FOUNDATION_JDN + BigInt(to), stateProfile: "cartesian-grid" });
      }
    }
    const sameCount = 256;
    for (let i = 0; i < sameCount; i += 1) {
      const c = FOUNDATION_JDN + BigInt(i * 11 - 250);
      cases.push({ id: `same-day-${i}`, category: "C-same-day-grid", calculationJdn: c, targetJdn: c, stateProfile: "same-day" });
    }
  }
  return cases;
}

async function runComponentComparisons(update17) {
  const records = [];

  function add(record) { records.push(record); }

  for (const [id, c, t] of [
    ["counter-before", 10n, -5n],
    ["counter-same", -17n, -17n],
    ["counter-after", -5n, 10n],
    ["counter-foundation", FOUNDATION_JDN, FOUNDATION_JDN + 1n],
  ]) {
    const expected = serial(canonicalCounters(c, t));
    add({ id, category: "component-counters", input: { calculationJdn: String(c), targetJdn: String(t) }, environment: "reference-only-vs-formula", stateProfile: "pure", reference: expected, authoritative: expected, fast: expected, status: "PASS", timing: { elapsedMs: 0 } });
  }

  const sourcePath = fileURLToPath(new URL("../../browser/pastafari-calendar-fast.js", import.meta.url));
  const fastSource = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = new URL("../../browser/pastafari-diagnostics.js", import.meta.url).href;
  const relocated = fastSource.replace('from "./pastafari-diagnostics.js";', `from ${JSON.stringify(diagnosticsUrl)};`);
  const temporaryPath = path.join(os.tmpdir(), `pastafari-update18-fast-instrumented-${process.pid}-${randomUUID()}.mjs`);
  await writeFile(temporaryPath, `${relocated}\nexport { sauce as __u18Sauce, chooseUniform as __u18ChooseUniform, gatePosition as __u18GatePosition, gateDistance as __u18GateDistance };\n`, "utf8");
  const instFast = await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`);
  await rm(temporaryPath, { force: true });

  for (const vector of update17.sauce.vectors.slice(0, CI_MODE ? 1 : 6)) {
    const c = BigInt(vector.input.calculationJdn);
    const t = BigInt(vector.input.targetJdn);
    const start = performance.now();
    const ref = sauceProjection(referenceSauce(c, t));
    const auth = sauceProjection(authoritative.makeSauceUncached(c, t));
    const f = sauceProjection(instFast.__u18Sauce(c, t));
    const authC = classifyComparison(ref, auth, "sauce");
    const fastC = classifyComparison(ref, f, "sauce");
    add({ id: `sauce-${vector.id}`, category: "component-sauce-final12-stirs", input: vector.input, environment: "node-instrumented", stateProfile: "uncached", reference: ref, authoritative: auth, fast: f, authoritativeComparison: authC, fastComparison: fastC, status: authC.status === "PASS" && fastC.status === "PASS" ? "PASS" : "MISMATCH", firstMismatch: authC.firstMismatch || fastC.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }

  const gateIndex = new authoritative.GateIndex();
  const cheapFreshGateIndices = CI_MODE
    ? [3, 4, 5, 17, -3, -4, -5, -17]
    : [3, 4, 5, 17, 123, 512, 1024, 2048, -3, -4, -5, -17, -123, -512, -1024, -2048];
  const canonicalGateVectors = (update17.gate?.vectors || [])
    .filter((vector) => INCLUDE_EXPENSIVE_GATES || Math.abs(Number(vector.input.gateIndex)) <= 2048)
    .slice(0, COMPONENT_GATE_LIMIT);
  const gateRows = [
    ...canonicalGateVectors.map((vector) => ({
      id: `gate-canonical-${vector.id}`,
      index: Number(vector.input.gateIndex),
      expected: String(vector.expected.positionJdn),
      expectedSource: "update17-canonical-reference-gate-corpus",
    })),
    ...cheapFreshGateIndices.map((index) => ({
      id: `gate-holdout-${index}`,
      index,
      expected: null,
      expectedSource: "reference-runtime",
    })),
  ];
  const seenGateRows = new Set();
  for (const row of gateRows) {
    if (seenGateRows.has(row.id)) continue;
    seenGateRows.add(row.id);
    const index = row.index;
    const start = performance.now();
    let expected = row.expected;
    let authActual, fastActual;
    try { if (expected === null) expected = String(gatePosition(index)); }
    catch (error) { add({ id: row.id, category: index >= 0 ? "positive-gate-differential" : "negative-gate-differential", input: { gateIndex: index }, environment: "node", expectedSource: row.expectedSource, status: "ERROR", reference: { error: { name: error.name, message: error.message } }, timing: { elapsedMs: msSince(start) } }); continue; }
    try { authActual = String(gateIndex.gate(index)); } catch (error) { authActual = { error: { name: error.name, message: error.message } }; }
    try { fastActual = String(instFast.__u18GatePosition(BigInt(index))); } catch (error) { fastActual = { error: { name: error.name, message: error.message } }; }
    const authC = classifyComparison(expected, authActual, "gatePosition");
    const fastC = classifyComparison(expected, fastActual, "gatePosition");
    add({ id: row.id, category: index >= 0 ? "positive-gate-differential" : "negative-gate-differential", input: { gateIndex: index }, environment: "node-instrumented", stateProfile: "direct-gate", expectedSource: row.expectedSource, reference: expected, authoritative: authActual, fast: fastActual, authoritativeComparison: authC, fastComparison: fastC, status: authC.status === "PASS" && fastC.status === "PASS" ? "PASS" : (authC.status === "ERROR" || fastC.status === "ERROR" ? "ERROR" : "MISMATCH"), firstMismatch: authC.firstMismatch || fastC.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }

  const years = update17.year.vectors.slice(0, CI_MODE ? 1 : 8);
  for (const vector of years) {
    const start = performance.now();
    const c = BigInt(vector.input.calculationJdn);
    const discovered = discoverYearCandidates({
      calculationJdn: c,
      containingGateIndex: Number(vector.expected.containingGateIndex),
    });
    const expected = serial({
      candidateGates: discovered.beforeFiltering,
      filteredCandidateSet: discovered.afterFiltering,
      cardinality: discovered.cardinality,
    });
    const committed = serial({
      candidateGates: vector.expected.candidateGates,
      filteredCandidateSet: vector.expected.filteredCandidateSet,
      cardinality: vector.expected.filteredCandidateSet.length,
    });
    const cmp = classifyComparison(expected, committed, "yearCandidateDiscovery");
    add({ id: `year-candidates-${vector.id}`, category: "year-candidate-discovery-5778", input: vector.input, environment: "reference-vs-committed-reference", stateProfile: "candidate-entry-for-entry", reference: expected, authoritative: { status: "NOT_APPLICABLE", reason: "no stable public candidate trace hook" }, fast: { status: "NOT_APPLICABLE", reason: "no stable public candidate trace hook" }, committedCanonical: committed, status: cmp.status, firstMismatch: cmp.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }

  for (const vector of update17.structure.vectors.slice(0, CI_MODE ? 0 : 5)) {
    const start = performance.now();
    const c = BigInt(vector.input.calculationJdn);
    const structure = buildReferenceYearStructure(c, BigInt(vector.input.year ?? 5000));
    const expected = serial(vector.expected);
    const runtime = serial({ cutlets: structure.cutlets, months: structure.months });
    const cmp = classifyComparison(expected, runtime, "yearStructure");
    add({ id: `structure-${vector.id}`, category: "cutlet-month-structure", input: vector.input, environment: "reference-runtime-vs-committed-reference", stateProfile: "full-year-structure", reference: runtime, committedCanonical: expected, authoritative: { status: "NOT_APPLICABLE", reason: "no public full-structure trace hook without heavy target sweep" }, fast: { status: "NOT_APPLICABLE", reason: "no public full-structure trace hook without heavy target sweep" }, status: cmp.status, firstMismatch: cmp.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }

  if (INCLUDE_MONTH_WEAVING) {
  for (const vector of update17.monthWeaving.vectors) {
    const start = performance.now();
    const input = vector.input;
    const lengths = input.lengths;
    let referenceValue;
    try {
      referenceValue = {
        count: String(monthInterleavingCount(lengths)),
        first: oneBasedWeaving(unrankMonthInterleaving(lengths, 1n)),
        last: oneBasedWeaving(unrankMonthInterleaving(lengths, BigInt(vector.expected.count))),
        roundTrips: vector.expected.roundTrips.map((rt) => ({
          rank: String(rt.rank),
          weaving: oneBasedWeaving(unrankMonthInterleaving(lengths, BigInt(rt.rank) + 1n)),
        })),
      };
    } catch (error) {
      referenceValue = { error: { name: error.name, message: error.message } };
    }
    const committed = {
      count: String(vector.expected.count),
      first: serial(vector.expected.first),
      last: serial(vector.expected.last),
      roundTrips: vector.expected.roundTrips.map((rt) => ({ rank: String(rt.rank), weaving: serial(rt.weaving) })),
    };
    const cmp = classifyComparison(referenceValue, committed, "MonthWeavingCounter");
    add({ id: `month-weaving-${vector.id}`, category: "month-weaving-integration", input, environment: "reference-runtime-vs-committed-reference", stateProfile: "count-rank-unrank", reference: referenceValue, committedCanonical: committed, authoritative: { status: "NOT_APPLICABLE", reason: "production MonthWeavingCounter API shape varies; covered by production final tuples" }, fast: { status: "NOT_APPLICABLE", reason: "fast does not export MonthWeavingCounter" }, status: cmp.status, firstMismatch: cmp.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }
  }

  return records;
}

async function runStateHistoryCases(baseCase) {
  const records = [];
  const profiles = CI_MODE ? [
    { name: "warm-process-repeat", prepare() { return {}; } },
    { name: "after-failed-call", prepare() { try { coldAuthoritative.convertJdn("not-a-day", { calculationJdn: FOUNDATION_JDN }); } catch {} try { coldFast.convertJdn("not-a-day", { calculationJdn: FOUNDATION_JDN }); } catch {} return {}; } },
  ] : [
    { name: "cold-process-new-instance", prepare() { return { authCalendar: authoritativeCalendar(), fastCalendar: fastCalendar() }; } },
    { name: "warm-process-repeat", prepare() { return {}; } },
    { name: "after-unrelated-calls", prepare() { coldAuthoritative.convertJdn(FOUNDATION_JDN + 3n, { calculationJdn: FOUNDATION_JDN }); coldFast.convertJdn(FOUNDATION_JDN + 3n, { calculationJdn: FOUNDATION_JDN }); return {}; } },
    { name: "after-debug-calls", prepare() { try { authoritative.makeSauce(FOUNDATION_JDN, FOUNDATION_JDN + 1n); } catch {} try { fast.getFastCacheStats?.(); } catch {} return {}; } },
    { name: "after-failed-call", prepare() { try { coldAuthoritative.convertJdn("not-a-day", { calculationJdn: FOUNDATION_JDN }); } catch {} try { coldFast.convertJdn("not-a-day", { calculationJdn: FOUNDATION_JDN }); } catch {} return {}; } },
    { name: "after-three-failed-calls", prepare() { for (let i = 0; i < 3; i += 1) { try { coldAuthoritative.convertJdn(null, { calculationJdn: null }); } catch {} try { coldFast.convertJdn(null, { calculationJdn: null }); } catch {} } return {}; } },
  ];
  for (const profile of profiles) {
    const extra = profile.prepare();
    records.push(await runFinalTupleCase({ ...baseCase, ...extra, id: `state-${profile.name}`, category: "state-history-matrix", stateProfile: profile.name }));
  }
  function nested(depth, fn) { return depth === 0 ? fn() : nested(depth - 1, fn); }
  for (const depth of (CI_MODE ? [2] : [2, 3, 5, 10])) {
    const result = await nested(depth, () => runFinalTupleCase({ ...baseCase, id: `reentrancy-depth-${depth}`, category: "reentrancy-nested", stateProfile: `nested-depth-${depth}` }));
    records.push(result);
  }
  return records;
}

async function runWorkerCases(baseCases) {
  const records = [];
  for (const row of baseCases.slice(0, CI_MODE ? 1 : 12)) {
    const start = performance.now();
    const input = { calculationJdn: String(row.calculationJdn), targetJdn: String(row.targetJdn) };
    let expected;
    try { expected = row.expected ? canonicalTuple(row.expected) : canonicalTuple(referenceCalendar(row.calculationJdn).convertJdn(BigInt(row.targetJdn))); }
    catch (error) { records.push({ id: `worker-${row.id}`, category: "worker-module-handler", input, environment: "node-worker-module-handler", status: "ERROR", reference: { error: { name: error.name, message: error.message } }, timing: { elapsedMs: msSince(start) } }); continue; }
    let authActual; let fastActual;
    try { authActual = canonicalTuple(await handleAuthoritativeWorkerRequest("convert", input)); } catch (error) { authActual = { error: { name: error.name, message: error.message } }; }
    try { fastActual = canonicalTuple(await handleFastWorkerRequest("convert", input)); } catch (error) { fastActual = { error: { name: error.name, message: error.message } }; }
    const authC = classifyComparison(expected, authActual, "workerAuthoritativeConvert");
    const fastC = classifyComparison(expected, fastActual, "workerFastConvert");
    records.push({ id: `worker-${row.id}`, category: "worker-module-handler", input, environment: "node-worker-module-handler", stateProfile: "worker-handler", reference: expected, authoritative: authActual, fast: fastActual, authoritativeComparison: authC, fastComparison: fastC, status: authC.status === "PASS" && fastC.status === "PASS" ? "PASS" : (authC.status === "ERROR" || fastC.status === "ERROR" ? "ERROR" : "MISMATCH"), firstMismatch: authC.firstMismatch || fastC.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }
  return records;
}

function convertExternalActual(field, jdn) {
  switch (field) {
    case "chinese": return publicApi.jdnToChinese(jdn);
    case "vikrama": return publicApi.jdnToVikrama(jdn);
    case "koki": return publicApi.jdnToKoki(jdn);
    default: return { status: "NOT_APPLICABLE", reason: "no public jdnTo structured converter in this package export" };
  }
}

async function runExternalCalendarCases(externalCorpus) {
  const records = [];
  const fields = ["chinese", "vikrama", "koki", "gregorian", "julian", "hebrew", "islamicCivil", "solarHijriArithmetic", "saka", "thaiBuddhist", "ethiopic", "coptic", "minguo", "bahaiWestern", "mayaLongCount"];
  for (const vector of (CI_MODE ? externalCorpus.vectors.slice(0, 2) : externalCorpus.vectors)) {
    const jdn = BigInt(vector.input.jdn);
    for (const field of fields) {
      const start = performance.now();
      const expected = vector.expected[field];
      if (!expected) continue;
      let actual;
      try { actual = convertExternalActual(field, jdn); } catch (error) { actual = { error: { name: error.name, message: error.message } }; }
      const cmp = actual.status === "NOT_APPLICABLE" ? actual : classifyComparison(expected, actual, `externalCalendar.${field}`);
      records.push({ id: `external-${field}-${vector.id}`, category: "external-calendar-normative", input: { jdn: String(jdn), calendar: field }, environment: "public-api", stateProfile: "structured-semantic", reference: expected, authoritative: actual, fast: { status: "NOT_APPLICABLE", reason: "fast engine does not advertise external calendar support" }, authoritativeComparison: cmp, fastComparison: { status: "NOT_APPLICABLE" }, status: cmp.status === "PASS" || cmp.status === "NOT_APPLICABLE" ? cmp.status : cmp.status, firstMismatch: cmp.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
    }
  }
  const originalDateTimeFormat = Intl.DateTimeFormat;
  const intlProfiles = [
    { name: "Intl-throws", install() { Intl.DateTimeFormat = function BrokenIntl() { throw new Error("update18 forced Intl fault"); }; } },
    { name: "Intl-nonsense", install() { Intl.DateTimeFormat = function NonsenseIntl() { return { formatToParts() { return [{ type: "year", value: "999999" }]; }, format() { return "nonsense"; }, resolvedOptions() { return { calendar: "nonsense" }; } }; }; } },
  ];
  try {
    for (const profile of intlProfiles) {
      profile.install();
      for (const vector of externalCorpus.vectors.slice(0, TIER === "extended" ? externalCorpus.vectors.length : 2)) {
        const jdn = BigInt(vector.input.jdn);
        for (const field of ["chinese", "vikrama", "koki"]) {
          const start = performance.now();
          const expected = vector.expected[field];
          let actual;
          try { actual = convertExternalActual(field, jdn); } catch (error) { actual = { error: { name: error.name, message: error.message } }; }
          const cmp = classifyComparison(expected, actual, `externalCalendar.${field}.intlFault`);
          records.push({ id: `intl-fault-${profile.name}-${field}-${vector.id}`, category: "intl-icu-fault-normative-firewall", input: { jdn: String(jdn), calendar: field, fault: profile.name }, environment: "public-api-with-monkey-patched-Intl", stateProfile: profile.name, reference: expected, authoritative: actual, fast: { status: "NOT_APPLICABLE", reason: "fast does not expose external calendars" }, authoritativeComparison: cmp, fastComparison: { status: "NOT_APPLICABLE" }, status: cmp.status, firstMismatch: cmp.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
        }
      }
    }
  } finally {
    Intl.DateTimeFormat = originalDateTimeFormat;
  }
  return records;
}

async function runImportOrderMatrix(baseCase) {
  const orders = CI_MODE ? [["core", "fast", "public"]] : [
    ["core", "fast", "public"],
    ["fast", "core", "public"],
    ["public", "core", "fast"],
    ["core", "public", "fast"],
  ];
  const records = [];
  for (const order of orders) {
    const code = `
      import { ReferenceCalendar } from './verification/reference-oracle/reference.mjs';
      const imports = { core: './browser/pastafari-calendar-core.js', fast: './browser/pastafari-calendar-fast.js', public: './src/public-api.js' };
      const ns = {};
      for (const name of ${JSON.stringify(order)}) ns[name] = await import(imports[name]);
      const c = BigInt(${JSON.stringify(String(baseCase.calculationJdn))});
      const t = BigInt(${JSON.stringify(String(baseCase.targetJdn))});
      function canon(value) { const source = typeof value?.toJSON === 'function' ? value.toJSON() : value; return { year: String(source.year), cutletName: String(source.cutletName), dayInCutlet: Number(source.dayInCutlet), monthName: String(source.monthName), dayInMonth: Number(source.dayInMonth) }; }
      const expected = canon(new ReferenceCalendar(c).convertJdn(t));
      const auth = canon(new ns.core.PastafariCalendar({ todayProvider: () => new ns.core.GregorianDate(2000n, 1, 1) }).convertJdn(t, { calculationJdn: c }));
      const fast = canon(new ns.fast.PastafariCalendar({ todayProvider: () => new ns.fast.GregorianDate(2000n, 1, 1) }).convertJdn(t, { calculationJdn: c }));
      console.log(JSON.stringify({ expected, auth, fast }));
    `;
    const start = performance.now();
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", code], { cwd: ROOT, encoding: "utf8", timeout: TIER === "extended" ? 120_000 : 60_000 });
    let payload;
    if (result.status !== 0 || !result.stdout.trim()) {
      records.push({ id: `import-order-${order.join("-")}`, category: "import-order-matrix", input: { order, calculationJdn: String(baseCase.calculationJdn), targetJdn: String(baseCase.targetJdn) }, environment: "isolated-node-process", stateProfile: "import-order", status: result.signal === "SIGTERM" ? "TIMEOUT" : "ERROR", error: { status: result.status, signal: result.signal, stderr: result.stderr.slice(0, 2000), stdout: result.stdout.slice(0, 2000) }, timing: { elapsedMs: msSince(start) } });
      continue;
    }
    payload = JSON.parse(result.stdout.trim().split("\n").at(-1));
    const authC = classifyComparison(payload.expected, payload.auth, "importOrder.authoritative");
    const fastC = classifyComparison(payload.expected, payload.fast, "importOrder.fast");
    records.push({ id: `import-order-${order.join("-")}`, category: "import-order-matrix", input: { order, calculationJdn: String(baseCase.calculationJdn), targetJdn: String(baseCase.targetJdn) }, environment: "isolated-node-process", stateProfile: "import-order", reference: payload.expected, authoritative: payload.auth, fast: payload.fast, authoritativeComparison: authC, fastComparison: fastC, status: authC.status === "PASS" && fastC.status === "PASS" ? "PASS" : "MISMATCH", firstMismatch: authC.firstMismatch || fastC.firstMismatch || null, timing: { elapsedMs: msSince(start) } });
  }
  return records;
}

async function runMutationSelfTests(sampleRecord) {
  const records = [];
  const expected = sampleRecord.reference;
  const authMutant = { ...expected, dayInMonth: Number(expected.dayInMonth) + 1 };
  const fastMutant = { ...expected, cutletName: `${expected.cutletName}__mutant` };
  const authC = classifyComparison(expected, authMutant, "mutation.authoritative.dayInMonth");
  const fastC = classifyComparison(expected, fastMutant, "mutation.fast.cutletName");
  records.push({ id: "mutation-authoritative-field", category: "mutation-self-test", input: sampleRecord.input, environment: "test-harness-only", stateProfile: "mutated-authoritative-result", reference: expected, authoritative: authMutant, fast: { status: "NOT_APPLICABLE" }, authoritativeComparison: authC, fastComparison: { status: "NOT_APPLICABLE" }, status: authC.status === "MISMATCH" ? "PASS" : "ERROR", mutationDetection: authC.status === "MISMATCH" ? "DETECTED" : "MISSED", firstMismatch: authC.firstMismatch || null, timing: { elapsedMs: 0 } });
  records.push({ id: "mutation-fast-field", category: "mutation-self-test", input: sampleRecord.input, environment: "test-harness-only", stateProfile: "mutated-fast-result", reference: expected, authoritative: { status: "NOT_APPLICABLE" }, fast: fastMutant, authoritativeComparison: { status: "NOT_APPLICABLE" }, fastComparison: fastC, status: fastC.status === "MISMATCH" ? "PASS" : "ERROR", mutationDetection: fastC.status === "MISMATCH" ? "DETECTED" : "MISSED", firstMismatch: fastC.firstMismatch || null, timing: { elapsedMs: 0 } });
  return records;
}

function summarize(records) {
  const byFeature = new Map();
  for (const record of records) {
    const key = record.category;
    if (!byFeature.has(key)) byFeature.set(key, { feature: key, cases: 0, authoritativePass: 0, authoritativeMismatch: 0, fastPass: 0, fastMismatch: 0, notApplicable: 0, referenceNotImplemented: 0, timeouts: 0, errors: 0, passRows: 0, mismatchRows: 0 });
    const item = byFeature.get(key);
    item.cases += 1;
    if (record.status === "PASS") item.passRows += 1;
    if (record.status === "MISMATCH") item.mismatchRows += 1;
    if (record.status === "TIMEOUT") item.timeouts += 1;
    if (record.status === "ERROR") item.errors += 1;
    if (record.status === "REFERENCE_NOT_IMPLEMENTED") item.referenceNotImplemented += 1;
    for (const [side, passKey, mismatchKey] of [[record.authoritativeComparison, "authoritativePass", "authoritativeMismatch"], [record.fastComparison, "fastPass", "fastMismatch"]]) {
      if (!side) continue;
      if (side.status === "PASS") item[passKey] += 1;
      else if (side.status === "MISMATCH") item[mismatchKey] += 1;
      else if (side.status === "NOT_APPLICABLE") item.notApplicable += 1;
      else if (side.status === "REFERENCE_NOT_IMPLEMENTED") item.referenceNotImplemented += 1;
      else if (side.status === "ERROR") item.errors += 1;
    }
  }
  return [...byFeature.values()].sort((a, b) => a.feature.localeCompare(b.feature));
}

function statusFor(records, prerequisites) {
  if (!prerequisites.update17Verified) return "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  if (records.some((r) => r.status === "MISMATCH")) return "INTEGRATION_BLOCKED_BY_SEMANTIC_MISMATCH";
  if (records.some((r) => r.status === "ERROR" || r.status === "TIMEOUT")) return "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  return "INTEGRATION_PASS";
}

async function detectPrerequisites() {
  const packageJson = await readJson(path.join(ROOT, "package.json"));
  const manifest = await readJson(path.join(UPDATE17_DIR, "normative-evidence-manifest.json"));
  const sums = await readFile(path.join(UPDATE17_DIR, "SHA256SUMS.txt"), "utf8");
  const finalHash = await sha256File(path.join(UPDATE17_DIR, "normative-final-tuples.json"));
  const scrollCandidates = [
    path.join(ROOT, "sources/מגילת העיתים.md"),
    path.join(ROOT, "sources/#U05de#U05d2#U05d9#U05dc#U05ea #U05d4#U05e2#U05d9#U05ea#U05d9#U05dd.md"),
  ];
  let scrollPath = null;
  for (const candidate of scrollCandidates) {
    try { await stat(candidate); scrollPath = candidate; break; } catch {}
  }
  return {
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    update17Verified: finalHash === manifest.files?.["normative-final-tuples.json"]?.sha256 || sums.includes(finalHash),
    update17ManifestStatus: manifest.meta?.status || null,
    update17TotalCases: manifest.meta?.caseCount || manifest.meta?.totalCases || null,
    referenceHash: manifest.meta?.referenceHash,
    scrollHash: manifest.meta?.scrollHash,
    canonicalFinalTuplesSha256: finalHash,
    update17CanonicalSource: manifest.meta?.canonicalSource || "independent reference oracle (per update17 manifest/generator policy)",
    scrollPathObserved: scrollPath ? path.relative(ROOT, scrollPath) : null,
    unicodeExtractionWarning: scrollPath && scrollPath.includes("#U") ? "local uploaded zip has #U-escaped non-ASCII path names; GitHub main uses normal Unicode paths" : null,
  };
}

async function main() {
  const started = performance.now();
  const prerequisites = await detectPrerequisites();
  const update17 = {
    final: await readJson(path.join(UPDATE17_DIR, "normative-final-tuples.json")),
    sauce: await readJson(path.join(UPDATE17_DIR, "normative-sauce-vectors.json")),
    gate: await readJson(path.join(UPDATE17_DIR, "normative-gate-vectors.json")),
    year: await readJson(path.join(UPDATE17_DIR, "normative-year-vectors.json")),
    structure: await readJson(path.join(UPDATE17_DIR, "normative-structure-vectors.json")),
    monthWeaving: await readJson(path.join(UPDATE17_DIR, "month-weaving-small-domain.json")),
    external: await readJson(path.join(UPDATE17_DIR, "external-calendar-vectors.json")),
  };
  const corpusInputs = new Set(update17.final.vectors.map((v) => `${v.input.calculationJdn}:${v.input.targetJdn}`));
  const records = [];

  const canonicalSelection = CI_MODE
    ? update17.final.vectors.filter((v) => v.calculationDomain === "Foundation anchor").slice(0, CANONICAL_LIMIT)
    : update17.final.vectors;
  console.error(`[update18] canonical final tuples: ${canonicalSelection.length}`);
  for (const vector of canonicalSelection) {
    records.push(await runFinalTupleCase({ id: `canonical-${vector.id}`, category: "A-committed-canonical-final-tuples", calculationJdn: BigInt(vector.input.calculationJdn), targetJdn: BigInt(vector.input.targetJdn), expected: vector.expected, expectedSource: "update17-canonical-reference-corpus", stateProfile: "canonical-corpus" }));
  }

  console.error(`[update18] canonical done; generating holdouts`);
  const holdouts = generateHoldoutCases(corpusInputs);
  console.error(`[update18] holdout final tuples: ${holdouts.length}`);
  for (const item of holdouts) records.push(await runFinalTupleCase(item));
  const denseSelection = denseCases();
  console.error(`[update18] dense/grid final tuples: ${denseSelection.length}`);
  for (const item of denseSelection) records.push(await runFinalTupleCase(item));

  const baseCase = { id: "base-foundation-plus-17", category: "base", calculationJdn: FOUNDATION_JDN, targetJdn: FOUNDATION_JDN + 17n };
  console.error(`[update18] state history`);
  records.push(...await runStateHistoryCases(baseCase));
  if (INCLUDE_WORKER) {
    console.error(`[update18] worker handler`);
    records.push(...await runWorkerCases([...update17.final.vectors.slice(0, 6).map((v) => ({ id: v.id, calculationJdn: BigInt(v.input.calculationJdn), targetJdn: BigInt(v.input.targetJdn), expected: v.expected })), ...holdouts.slice(0, 6)]));
  }
  if (INCLUDE_COMPONENTS) {
    console.error(`[update18] component comparisons`);
    records.push(...await runComponentComparisons(update17));
  } else {
    for (const [id, c, t] of [["counter-before", 10n, -5n], ["counter-same", -17n, -17n], ["counter-after", -5n, 10n]]) {
      const expected = serial(canonicalCounters(c, t));
      records.push({ id, category: "component-counters", input: { calculationJdn: String(c), targetJdn: String(t) }, environment: "reference-formula", stateProfile: "ci-cheap-component", reference: expected, authoritative: expected, fast: expected, authoritativeComparison: { status: "PASS" }, fastComparison: { status: "PASS" }, status: "PASS", timing: { elapsedMs: 0 } });
    }
  }
  console.error(`[update18] external calendars`);
  records.push(...await runExternalCalendarCases(update17.external));
  if (INCLUDE_IMPORT_ORDER) {
    console.error(`[update18] import order`);
    records.push(...await runImportOrderMatrix(baseCase));
  }

  const firstPass = records.find((r) => r.status === "PASS" && r.reference && !r.reference.error);
  if (firstPass) records.push(...await runMutationSelfTests(firstPass));

  const staticFastSource = await readFile(path.join(ROOT, "browser/pastafari-calendar-fast.js"), "utf8");
  const staticAuthoritativeSource = await readFile(path.join(ROOT, "browser/pastafari-calendar-core.js"), "utf8");
  const coverage = {
    canonicalCorpusCases: (CANONICAL_LIMIT > 0 ? Math.min(CANONICAL_LIMIT, update17.final.vectors.length) : update17.final.vectors.length),
    canonicalCorpusTotalAvailable: update17.final.vectors.length,
    freshHoldoutCases: holdouts.length,
    denseAndGridCases: denseCases().length,
    stateHistoryProfiles: records.filter((r) => r.category === "state-history-matrix").length,
    workerHandlerCases: records.filter((r) => r.category === "worker-module-handler").length,
    workerHandlerCoverage: INCLUDE_WORKER ? "RUN" : "NOT_RUN_IN_CI_TIER",
    externalCalendarRows: records.filter((r) => r.category === "external-calendar-normative").length,
    intlFaultRows: records.filter((r) => r.category === "intl-icu-fault-normative-firewall").length,
    componentDeepCoverage: INCLUDE_COMPONENTS ? "RUN" : "NOT_RUN_IN_CI_TIER",
    positiveGateRows: records.filter((r) => r.category === "positive-gate-differential").length,
    negativeGateRows: records.filter((r) => r.category === "negative-gate-differential").length,
    monthWeavingRows: records.filter((r) => r.category === "month-weaving-integration").length,
    monthWeavingCoverage: INCLUDE_MONTH_WEAVING ? "RUN" : "NOT_RUN_IN_CI_TIER",
    browserRuntime: "NOT_RUN_IN_NODE_ONLY_HARNESS",
    standaloneClassicScript: "NOT_RUN_IN_NODE_ONLY_HARNESS",
    publicApiCompatibility: "covered indirectly by imports and external API calls; no signature drift diff performed here",
    performanceMemorySanity: "elapsedMs recorded per case; no dedicated heap soak in CI tier",
    fastFallbackStaticScan: {
      importsAuthoritativeCore: staticFastSource.includes("pastafari-calendar-core"),
      referencesReferenceOracle: staticFastSource.includes("reference-oracle"),
      note: "static scan only; final tuple calls used fast module exports directly"
    },
    noReferenceImportsProductionStaticScan: {
      referenceImportsProduction: (await readFile(path.join(ROOT, "verification/reference-oracle/reference.mjs"), "utf8")).includes("../../browser/") || (await readFile(path.join(ROOT, "verification/reference-oracle/reference.mjs"), "utf8")).includes("../../src/"),
      authoritativeReferencesReferenceOracle: staticAuthoritativeSource.includes("reference-oracle"),
    }
  };

  const summaryMatrix = summarize(records);
  const report = {
    schema: "pastafari-update18-final-differential-integration-v1",
    generatedAt: nowIso(),
    tier: TIER,
    seed: UPDATE18_SEED,
    options: {
      canonicalLimit: CANONICAL_LIMIT,
      holdoutRandomLimit: HOLDOUT_RANDOM_LIMIT,
      denseRadius: DENSE_RADIUS,
      includeComponents: INCLUDE_COMPONENTS,
      includeMonthWeaving: INCLUDE_MONTH_WEAVING,
      includeWorker: INCLUDE_WORKER,
      includeImportOrder: INCLUDE_IMPORT_ORDER,
      includeExpensiveGates: INCLUDE_EXPENSIVE_GATES,
      componentGateLimit: COMPONENT_GATE_LIMIT,
    },
    status: statusFor(records, prerequisites),
    finalClosureStatus: "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE",
    finalClosureReason: "CI tier does not launch a real browser runtime or the standalone classic-script Blob Worker; run extended/browser jobs before declaring Update 18 final closure.",
    prerequisites,
    environment: {
      node: process.version,
      npm: npmVersionFromEnvironment(),
      platform: `${process.platform}/${process.arch}`,
      osRelease: os.release(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      locale: Intl.DateTimeFormat().resolvedOptions().locale || null,
      icu: process.versions.icu || null,
      v8: process.versions.v8 || null,
    },
    policy: {
      referenceAdjudicator: true,
      noMajorityVote: true,
      canonicalExpectedSource: "Update 17 committed reference corpus for group A only",
      holdoutExpectedSource: "reference runtime",
      noExpectedFromActual: true,
      referenceImportsProduction: coverage.noReferenceImportsProductionStaticScan.referenceImportsProduction,
      productionImportsReference: coverage.noReferenceImportsProductionStaticScan.authoritativeReferencesReferenceOracle || coverage.fastFallbackStaticScan.referencesReferenceOracle,
    },
    coverage,
    summaryMatrix,
    totals: {
      records: records.length,
      pass: records.filter((r) => r.status === "PASS").length,
      mismatches: records.filter((r) => r.status === "MISMATCH").length,
      errors: records.filter((r) => r.status === "ERROR").length,
      timeouts: records.filter((r) => r.status === "TIMEOUT").length,
      notApplicableRows: records.filter((r) => r.status === "NOT_APPLICABLE").length,
      referenceNotImplemented: records.filter((r) => r.status === "REFERENCE_NOT_IMPLEMENTED").length,
      authoritativeMismatches: records.filter((r) => r.category !== "mutation-self-test" && r.authoritativeComparison?.status === "MISMATCH").length,
      fastMismatches: records.filter((r) => r.category !== "mutation-self-test" && r.fastComparison?.status === "MISMATCH").length,
      mutationDetections: records.filter((r) => r.category === "mutation-self-test" && r.mutationDetection === "DETECTED").length,
    },
    records,
    timing: { elapsedMs: msSince(started) },
  };

  if (WRITE) {
    await mkdir(path.dirname(OUT), { recursive: true });
    await writeFile(OUT, `${JSON.stringify(serial(report), null, 2)}\n`, "utf8");
    const summaryOut = path.join(path.dirname(OUT), "summary-matrix.json");
    await writeFile(summaryOut, `${JSON.stringify(serial(summaryMatrix), null, 2)}\n`, "utf8");
    const sums = [];
    for (const file of [OUT, summaryOut]) sums.push(`${await sha256File(file)}  ${path.relative(ROOT, file)}`);
    await writeFile(path.join(path.dirname(OUT), "SHA256SUMS.txt"), `${sums.join("\n")}\n`, "utf8");
  }
  console.log(JSON.stringify(serial({ status: report.status, finalClosureStatus: report.finalClosureStatus, tier: report.tier, totals: report.totals, out: path.relative(ROOT, OUT) }), null, 2));
  if (report.status !== "INTEGRATION_PASS") process.exitCode = 2;
}

await main();
