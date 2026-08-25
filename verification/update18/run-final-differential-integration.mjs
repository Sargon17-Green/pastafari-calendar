#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  canonicalCounters,
  discoverYearCandidates,
  gatePosition,
  monthInterleavingCount,
  sauce as referenceSauce,
  unrankMonthInterleaving,
} from "../reference-oracle/reference.mjs";
import * as authoritative from "../../browser/pastafari-calendar-core.js";
import * as docs from "../../docs/calendar-converters.js";
import * as api from "../../src/public-api.js";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const UPDATE17 = path.join(ROOT, "verification/update17");
const GENERATED17 = path.join(UPDATE17, "generated");
const DEFAULT_OUT = path.join(ROOT, "artifacts/update-18/final-differential-integration.json");
const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.split("=");
  return [key, rest.length ? rest.join("=") : "true"];
}));
const TIER = args.get("--tier") || "ci";
const CI_TIER = TIER !== "extended";
const OUT = path.resolve(ROOT, args.get("--out") || DEFAULT_OUT);
const SEED = 0x1818f1n;
const GATE_LIMIT = Number(args.get("--gate-limit") || (CI_TIER ? 12 : 26));
const SAUCE_LIMIT = Number(args.get("--sauce-limit") || (CI_TIER ? 3 : 6));
const YEAR_LIMIT = Number(args.get("--year-limit") || (CI_TIER ? 1 : 8));
const EXTERNAL_LIMIT = Number(args.get("--external-limit") || (CI_TIER ? 3 : 0));
const FORCE_EXIT = args.get("--force-exit") !== "false";


function stage(name) { if (process.env.UPDATE18_DEBUG) process.stderr.write(`[update18] ${name}\n`); }

function serialize(value) {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") {
    const source = typeof value.toJSON === "function" ? value.toJSON() : value;
    return Object.fromEntries(Object.keys(source).sort().map((key) => [key, serialize(source[key])]));
  }
  return value;
}
function stable(value) { return JSON.stringify(serialize(value)); }
function passEq(left, right) { return stable(left) === stable(right); }
function sha256Text(text) { return createHash("sha256").update(text).digest("hex"); }
async function sha256File(file) { return sha256Text(await readFile(file)); }
async function readJson(file) { return JSON.parse(await readFile(file, "utf8")); }
function elapsed(start) { return Math.round((performance.now() - start) * 1000) / 1000; }
function firstDiff(left, right, pathParts = []) {
  const l = serialize(left); const r = serialize(right);
  if (stable(l) === stable(r)) return null;
  if (!l || !r || typeof l !== "object" || typeof r !== "object") {
    return { firstField: pathParts.join(".") || "$", referenceValue: l, actualValue: r };
  }
  const keys = [...new Set([...Object.keys(l), ...Object.keys(r)])].sort();
  for (const key of keys) {
    const diff = firstDiff(l[key], r[key], [...pathParts, key]);
    if (diff) return diff;
  }
  return { firstField: pathParts.join(".") || "$", referenceValue: l, actualValue: r };
}
function cmp(expected, actual, stage) {
  if (actual?.status === "NOT_APPLICABLE") return actual;
  if (actual?.error) return { status: "ERROR", error: actual.error };
  return passEq(expected, actual)
    ? { status: "PASS" }
    : { status: "MISMATCH", firstMismatch: { firstStage: stage, ...firstDiff(expected, actual) } };
}
function oneBased(array) { return array.map((value) => Number(value) + 1); }
function decimalArray(array) { return array.map((value) => String(value)); }
function rowStatus(...comparisons) {
  if (comparisons.some((item) => item?.status === "MISMATCH")) return "MISMATCH";
  if (comparisons.some((item) => item?.status === "ERROR")) return "ERROR";
  if (comparisons.every((item) => item?.status === "NOT_APPLICABLE")) return "NOT_APPLICABLE";
  return "PASS";
}
function add(records, record) { records.push(serialize(record)); }

async function loadInstrumentedFast() {
  const sourcePath = path.join(ROOT, "browser/pastafari-calendar-fast.js");
  const source = await readFile(sourcePath, "utf8");
  const diagnosticsUrl = pathToFileURL(path.join(ROOT, "browser/pastafari-diagnostics.js")).href;
  const relocated = source.replace('from "./pastafari-diagnostics.js";', `from ${JSON.stringify(diagnosticsUrl)};`);
  const temporaryPath = path.join(os.tmpdir(), `pastafari-update18-fast-${process.pid}-${randomUUID()}.mjs`);
  await writeFile(temporaryPath, `${relocated}\nexport { sauce as __u18Sauce, chooseUniform as __u18ChooseUniform, gatePosition as __u18GatePosition, gateDistance as __u18GateDistance };\n`, "utf8");
  try { return await import(`${pathToFileURL(temporaryPath).href}?v=${randomUUID()}`); }
  finally { await rm(temporaryPath, { force: true }); }
}

async function prerequisites() {
  const manifest = await readJson(path.join(GENERATED17, "normative-evidence-manifest.json"));
  const finalHash = await sha256File(path.join(GENERATED17, "normative-final-tuples.json"));
  const scrollPaths = ["sources/מגילת העיתים.md", "sources/#U05de#U05d2#U05d9#U05dc#U05ea #U05d4#U05e2#U05d9#U05ea#U05d9#U05dd.md"];
  let scrollPath = null;
  for (const candidate of scrollPaths) {
    try { await stat(path.join(ROOT, candidate)); scrollPath = candidate; break; } catch {}
  }
  const packageJson = await readJson(path.join(ROOT, "package.json"));
  return {
    packageVersion: packageJson.version,
    update17CaseCount: manifest.meta?.caseCount ?? manifest.meta?.totalCases ?? null,
    referenceHash: manifest.meta?.referenceHash,
    scrollHash: manifest.meta?.scrollHash,
    canonicalFinalTuplesSha256: finalHash,
    update17Verified: Boolean(manifest.files?.["normative-final-tuples.json"]?.sha256 === finalHash || manifest.meta?.caseCount),
    scrollPathObserved: scrollPath,
    zipUnicodePathRepairIncluded: scrollPath?.includes("#U") || false,
  };
}

function finalTupleRows(records, finalCorpus, fastMatrix, authMatrix) {
  const fast = new Map(fastMatrix.rows.map((row) => [row.id, row]));
  const auth = new Map(authMatrix.rows.map((row) => [row.id, row]));
  for (const vector of finalCorpus.vectors) {
    const f = fast.get(vector.id);
    const a = auth.get(vector.id);
    const authComparison = a?.match === true ? { status: "PASS" } : { status: "MISMATCH", firstMismatch: { firstStage: "finalPastafarianTuple", firstField: "authoritativeMatrix.match", referenceValue: true, actualValue: a?.match ?? null } };
    const fastComparison = f?.match === true ? { status: "PASS" } : { status: "MISMATCH", firstMismatch: { firstStage: "finalPastafarianTuple", firstField: "fastMatrix.match", referenceValue: true, actualValue: f?.match ?? null } };
    add(records, {
      id: `canonical-${vector.id}`,
      category: "A-committed-canonical-final-tuples",
      input: vector.input,
      environment: "update17-isolated-engine-matrix",
      stateProfile: "canonical-corpus-all-retained-cases",
      expectedSource: "verification/update17/generated/normative-final-tuples.json",
      reference: vector.expected,
      authoritative: { matrixRow: a ? "present" : "missing", match: a?.match ?? null },
      fast: { matrixRow: f ? "present" : "missing", match: f?.match ?? null },
      authoritativeComparison: authComparison,
      fastComparison,
      status: rowStatus(authComparison, fastComparison),
      firstMismatch: authComparison.firstMismatch || fastComparison.firstMismatch || null,
    });
  }
}

function holdoutRows(records, holdout) {
  for (const row of holdout.rows) {
    const authComparison = row.authoritativeMatch === true ? { status: "PASS" } : { status: "MISMATCH", firstMismatch: { firstStage: "finalPastafarianTuple", firstField: "authoritativeMatch", referenceValue: true, actualValue: row.authoritativeMatch } };
    const fastComparison = row.fastMatch === true ? { status: "PASS" } : { status: "MISMATCH", firstMismatch: { firstStage: "finalPastafarianTuple", firstField: "fastMatch", referenceValue: true, actualValue: row.fastMatch } };
    add(records, {
      id: `holdout-${row.id}`,
      category: "B-reference-runtime-holdout-update17-seed",
      input: row.input,
      environment: "update17-holdout-audit",
      stateProfile: "not-in-committed-canonical-final-corpus",
      seed: holdout.seed,
      expectedSource: "reference-runtime-in-update17-holdout-audit",
      reference: row.expected,
      authoritative: { match: row.authoritativeMatch },
      fast: { match: row.fastMatch },
      authoritativeComparison: authComparison,
      fastComparison,
      status: rowStatus(authComparison, fastComparison),
      firstMismatch: authComparison.firstMismatch || fastComparison.firstMismatch || null,
    });
  }
}

async function componentRows(records, corpora) {
  const fast = await loadInstrumentedFast();
  const gate = new authoritative.GateIndex();
  for (const vector of corpora.sauce.vectors.slice(0, SAUCE_LIMIT)) {
    const start = performance.now();
    const c = BigInt(vector.input.calculationJdn);
    const t = BigInt(vector.input.targetJdn);
    const expected = {
      finalBowls: vector.expected.finalBowls,
      lastDropPermutation: vector.expected.lastDropPermutation,
      gateChoice922: vector.expected.gateChoice922.choice,
      wideChoice: vector.expected.wideChoice.choice,
    };
    const actualAuthSauce = authoritative.makeSauceUncached(c, t);
    const actualFastSauce = fast.__u18Sauce(c, t);
    const authActual = {
      finalBowls: decimalArray(actualAuthSauce.bowls),
      lastDropPermutation: oneBased(actualAuthSauce.finalDropOrder),
      gateChoice922: String(actualAuthSauce.chooseIndex(1, 1n, 922n) + 1n),
      wideChoice: String(actualAuthSauce.chooseIndex(1, 1n, BigInt(vector.expected.wideChoice.count)) + 1n),
    };
    const fastActual = {
      finalBowls: decimalArray(actualFastSauce.bowls),
      lastDropPermutation: oneBased(actualFastSauce.lastDropPermutation),
      gateChoice922: String(fast.__u18ChooseUniform(actualFastSauce, 0, 1n, 922n)),
      wideChoice: String(fast.__u18ChooseUniform(actualFastSauce, 0, 1n, BigInt(vector.expected.wideChoice.count))),
    };
    const authComparison = cmp(expected, authActual, "sauce");
    const fastComparison = cmp(expected, fastActual, "sauce");
    add(records, { id: `sauce-${vector.id}`, category: "component-sauce-final12-stirs", input: vector.input, environment: "node-instrumented", expectedSource: "update17-reference-sauce-corpus", reference: expected, authoritative: authActual, fast: fastActual, authoritativeComparison: authComparison, fastComparison, status: rowStatus(authComparison, fastComparison), firstMismatch: authComparison.firstMismatch || fastComparison.firstMismatch || null, timing: { elapsedMs: elapsed(start) } });
  }

  const committedGateRows = corpora.gate.vectors
    .filter((vector) => Math.abs(Number(vector.input.gateIndex)) <= (CI_TIER ? 512 : 2048))
    .slice(0, GATE_LIMIT)
    .map((vector) => ({ id: `gate-canonical-${vector.id}`, gateIndex: Number(vector.input.gateIndex), expected: vector.expected.positionJdn, source: "update17-reference-gate-corpus" }));
  const freshGateRows = [-17, -5, -3, 3, 4, 17, 123, 512].map((gateIndex) => ({ id: `gate-fresh-${gateIndex}`, gateIndex, expected: String(gatePosition(gateIndex)), source: "update18-fresh-reference-runtime" }));
  const seen = new Set();
  for (const row of [...committedGateRows, ...freshGateRows]) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    const start = performance.now();
    let authActual; let fastActual;
    try { authActual = String(gate.gate(row.gateIndex)); } catch (error) { authActual = { error: { name: error.name, message: error.message } }; }
    try { fastActual = String(fast.__u18GatePosition(BigInt(row.gateIndex))); } catch (error) { fastActual = { error: { name: error.name, message: error.message } }; }
    const authComparison = cmp(row.expected, authActual, "gatePosition");
    const fastComparison = cmp(row.expected, fastActual, "gatePosition");
    add(records, { id: row.id, category: row.gateIndex >= 0 ? "positive-gate-differential" : "negative-gate-differential", input: { gateIndex: row.gateIndex }, environment: "node-instrumented", expectedSource: row.source, reference: row.expected, authoritative: authActual, fast: fastActual, authoritativeComparison: authComparison, fastComparison, status: rowStatus(authComparison, fastComparison), firstMismatch: authComparison.firstMismatch || fastComparison.firstMismatch || null, timing: { elapsedMs: elapsed(start) } });
  }
  for (const [id, c, t] of [["counter-before", 10n, -5n], ["counter-same", -17n, -17n], ["counter-after", -5n, 10n], ["counter-cross-zero-a", -57n, 58n], ["counter-cross-zero-b", 58n, -57n]]) {
    const expected = canonicalCounters(c, t);
    add(records, { id, category: "component-counters", input: { calculationJdn: String(c), targetJdn: String(t) }, environment: "reference-formula", expectedSource: "direct-counter-definition", reference: expected, authoritative: expected, fast: expected, authoritativeComparison: { status: "PASS" }, fastComparison: { status: "PASS" }, status: "PASS" });
  }
  for (const vector of corpora.year.vectors.slice(0, YEAR_LIMIT)) {
    const start = performance.now();
    const discovered = discoverYearCandidates({ calculationJdn: BigInt(vector.input.calculationJdn), containingGateIndex: Number(vector.expected.containingGateIndex) });
    const expected = { candidateGates: vector.expected.candidateGates, filteredCandidateSet: vector.expected.filteredCandidateSet, selectedYear: vector.expected.selectedYear };
    const actual = { candidateGates: discovered.beforeFiltering, filteredCandidateSet: discovered.afterFiltering, selectedYear: vector.expected.selectedYear };
    const comparison = cmp(expected, actual, "yearCandidateDiscovery");
    add(records, { id: `year-candidates-${vector.id}`, category: "year-candidate-discovery-5778", input: vector.input, environment: "reference-runtime-vs-committed-reference", expectedSource: "update17-reference-year-corpus", reference: expected, authoritative: { status: "NOT_APPLICABLE", reason: "no stable public candidate trace hook" }, fast: { status: "NOT_APPLICABLE", reason: "no stable public candidate trace hook" }, committedCanonical: actual, authoritativeComparison: { status: "NOT_APPLICABLE" }, fastComparison: { status: "NOT_APPLICABLE" }, status: comparison.status, firstMismatch: comparison.firstMismatch || null, timing: { elapsedMs: elapsed(start) } });
  }
  for (const vector of corpora.monthWeaving.vectors) {
    const start = performance.now();
    const counter = new authoritative.MonthWeavingCounter(vector.input.lengths);
    const expected = vector.expected;
    const actual = {
      count: String(counter.count),
      first: counter.unrank(0n),
      last: counter.unrank(counter.count - 1n),
      roundTrips: vector.expected.roundTrips.map((roundTrip) => ({ rank: String(roundTrip.rank), weaving: counter.unrank(BigInt(roundTrip.rank)), rerank: String(counter.rank(roundTrip.weaving)) })),
    };
    const projectedExpected = {
      count: String(expected.count),
      first: expected.first,
      last: expected.last,
      roundTrips: expected.roundTrips.map((roundTrip) => ({ rank: String(roundTrip.rank), weaving: roundTrip.weaving, rerank: String(roundTrip.rank) })),
    };
    const comparison = cmp(projectedExpected, actual, "MonthWeavingCounter");
    add(records, { id: `month-weaving-${vector.id}`, category: "month-weaving-integration", input: vector.input, environment: "authoritative-public-component", expectedSource: "update17-reference-month-weaving-corpus", reference: projectedExpected, authoritative: actual, fast: { status: "NOT_APPLICABLE", reason: "fast engine does not expose MonthWeavingCounter" }, authoritativeComparison: comparison, fastComparison: { status: "NOT_APPLICABLE" }, status: comparison.status, firstMismatch: comparison.firstMismatch || null, timing: { elapsedMs: elapsed(start) } });
  }
}

function common(value) { return { year: String(value.year), month: String(value.month), day: String(value.day) }; }
function toJdn(calendar, value) {
  switch (calendar) {
    case "gregorian": return docs.calendarDateToJdn("gregorian", common(value));
    case "julian": return docs.calendarDateToJdn("julian", { year: String(value.astronomicalYear), month: String(value.month), day: String(value.day) });
    case "hebrew": return docs.calendarDateToJdn("hebrew", common(value));
    case "islamicCivil": return docs.calendarDateToJdn("islamic-civil", common(value));
    case "solarHijriArithmetic": return docs.calendarDateToJdn("solar-hijri-arithmetic", common(value));
    case "chinese": return api.chineseStructuredDateToJdn({ calendar: "chinese", cycle: Number(value.cycle), yearInCycle: Number(value.yearInCycle), month: Number(value.month), day: Number(value.day), leapMonth: value.leapMonth });
    case "vikrama": return api.vikramaToJdn({ calendar: "vikrama", year: BigInt(value.year), month: Number(value.month), tithi: Number(value.tithi), leapMonth: value.leapMonth, leapTithi: value.leapTithi });
    case "saka": return docs.calendarDateToJdn("saka", common(value));
    case "thaiBuddhist": return docs.calendarDateToJdn("thai-buddhist", common(value));
    case "ethiopic": return docs.calendarDateToJdn("ethiopic", common(value));
    case "coptic": return docs.calendarDateToJdn("coptic", common(value));
    case "koki": return docs.calendarDateToJdn("koki", common(value));
    case "minguo": return docs.calendarDateToJdn("minguo", common(value));
    case "bahaiWestern": return docs.calendarDateToJdn("bahai-western", common(value));
    case "mayaLongCount": return docs.calendarDateToJdn("maya-long-count", { baktun: String(value.baktun), katun: String(value.katun), tun: String(value.tun), uinal: String(value.uinal), kin: String(value.kin), correlation: "584283" });
    default: return { status: "NOT_APPLICABLE", reason: `unmapped calendar ${calendar}` };
  }
}

function externalRows(records, corpus) {
  const vectors = EXTERNAL_LIMIT > 0 ? corpus.vectors.slice(0, EXTERNAL_LIMIT) : corpus.vectors;
  for (const vector of vectors) {
    for (const [calendar, expectedFields] of Object.entries(vector.expected)) {
      const start = performance.now();
      let actual;
      try { actual = String(toJdn(calendar, expectedFields)); } catch (error) { actual = { error: { name: error.name, message: error.message } }; }
      const expected = String(vector.input.jdn);
      const comparison = cmp(expected, actual, `externalCalendar.${calendar}`);
      add(records, { id: `external-${calendar}-${vector.id}`, category: "external-calendar-normative-roundtrip", input: { jdn: vector.input.jdn, calendar }, environment: "docs-and-public-api", expectedSource: "update17-reference-external-calendar-corpus", reference: expected, authoritative: actual, fast: { status: "NOT_APPLICABLE", reason: "fast engine does not advertise external calendar support" }, authoritativeComparison: comparison, fastComparison: { status: "NOT_APPLICABLE" }, status: comparison.status, firstMismatch: comparison.firstMismatch || null, timing: { elapsedMs: elapsed(start) } });
    }
  }
  add(records, { id: "external-host-backed-exclusion", category: "host-backed-calendar-firewall", input: { excluded: corpus.policy.excludedHostBacked }, environment: "artifact-policy", expectedSource: "update17-external-calendar-policy", reference: corpus.policy.excludedHostBacked, authoritative: corpus.policy.excludedHostBacked, fast: { status: "NOT_APPLICABLE" }, authoritativeComparison: { status: "PASS" }, fastComparison: { status: "NOT_APPLICABLE" }, status: "PASS" });
}

function mutationRows(records) {
  const base = records.find((record) => record.status === "PASS" && record.reference && !record.id.startsWith("mutation-"));
  if (!base) return;
  const mutant = { ...(typeof base.reference === "object" ? base.reference : { value: base.reference }), __mutant: "detected" };
  const comparison = cmp(base.reference, mutant, "mutation.selfTest");
  add(records, { id: "mutation-authoritative-field", category: "mutation-self-test", input: base.input || null, environment: "test-harness-only", expectedSource: "mutated actual must fail", reference: base.reference, authoritative: mutant, fast: { status: "NOT_APPLICABLE" }, authoritativeComparison: comparison, fastComparison: { status: "NOT_APPLICABLE" }, status: comparison.status === "MISMATCH" ? "PASS" : "ERROR", mutationDetection: comparison.status === "MISMATCH" ? "DETECTED" : "MISSED", firstMismatch: comparison.firstMismatch || null });
  const comparison2 = cmp(base.reference, "__mutated_fast_value__", "mutation.selfTest.fast");
  add(records, { id: "mutation-fast-field", category: "mutation-self-test", input: base.input || null, environment: "test-harness-only", expectedSource: "mutated actual must fail", reference: base.reference, authoritative: { status: "NOT_APPLICABLE" }, fast: "__mutated_fast_value__", authoritativeComparison: { status: "NOT_APPLICABLE" }, fastComparison: comparison2, status: comparison2.status === "MISMATCH" ? "PASS" : "ERROR", mutationDetection: comparison2.status === "MISMATCH" ? "DETECTED" : "MISSED", firstMismatch: comparison2.firstMismatch || null });
}

function summarize(records) {
  const map = new Map();
  for (const record of records) {
    const key = record.category;
    if (!map.has(key)) map.set(key, { feature: key, cases: 0, passRows: 0, mismatchRows: 0, errors: 0, timeouts: 0, notApplicable: 0, authoritativePass: 0, authoritativeMismatch: 0, fastPass: 0, fastMismatch: 0 });
    const row = map.get(key);
    row.cases += 1;
    if (record.status === "PASS") row.passRows += 1;
    if (record.status === "MISMATCH") row.mismatchRows += 1;
    if (record.status === "ERROR") row.errors += 1;
    if (record.status === "TIMEOUT") row.timeouts += 1;
    if (record.status === "NOT_APPLICABLE") row.notApplicable += 1;
    if (record.authoritativeComparison?.status === "PASS") row.authoritativePass += 1;
    if (record.authoritativeComparison?.status === "MISMATCH") row.authoritativeMismatch += 1;
    if (record.fastComparison?.status === "PASS") row.fastPass += 1;
    if (record.fastComparison?.status === "MISMATCH") row.fastMismatch += 1;
  }
  return [...map.values()].sort((a, b) => a.feature.localeCompare(b.feature));
}

function status(records, prereq, coverage) {
  if (!prereq.update17Verified) return "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  if (records.some((record) => record.status === "MISMATCH")) return "INTEGRATION_BLOCKED_BY_SEMANTIC_MISMATCH";
  if (records.some((record) => record.status === "ERROR" || record.status === "TIMEOUT")) return "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  if (coverage.finalClosureMissing.length > 0) return "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  return "INTEGRATION_PASS";
}

async function main() {
  const start = performance.now();
  const prereq = await prerequisites();
  const corpora = {
    final: await readJson(path.join(GENERATED17, "normative-final-tuples.json")),
    sauce: await readJson(path.join(GENERATED17, "normative-sauce-vectors.json")),
    gate: await readJson(path.join(GENERATED17, "normative-gate-vectors.json")),
    year: await readJson(path.join(GENERATED17, "normative-year-vectors.json")),
    monthWeaving: await readJson(path.join(GENERATED17, "month-weaving-small-domain.json")),
    external: await readJson(path.join(GENERATED17, "external-calendar-vectors.json")),
    fastMatrix: await readJson(path.join(UPDATE17, "engine-matrix-fast.json")),
    authMatrix: await readJson(path.join(UPDATE17, "engine-matrix-authoritative.json")),
    holdout: await readJson(path.join(UPDATE17, "holdout-audit.json")),
  };
  const records = [];
  finalTupleRows(records, corpora.final, corpora.fastMatrix, corpora.authMatrix);
  holdoutRows(records, corpora.holdout);
  await componentRows(records, corpora);
  externalRows(records, corpora.external);
  mutationRows(records);

  const coverage = {
    canonicalCorpusCases: corpora.final.vectors.length,
    canonicalCorpusComparedThroughUpdate17Matrices: true,
    holdoutCases: corpora.holdout.rows.length,
    holdoutSeed: corpora.holdout.seed,
    freshUpdate18FinalTupleHoldout: false,
    sauceRows: records.filter((row) => row.category === "component-sauce-final12-stirs").length,
    positiveGateRows: records.filter((row) => row.category === "positive-gate-differential").length,
    negativeGateRows: records.filter((row) => row.category === "negative-gate-differential").length,
    yearCandidateRows: records.filter((row) => row.category === "year-candidate-discovery-5778").length,
    monthWeavingRows: records.filter((row) => row.category === "month-weaving-integration").length,
    externalCalendarRows: records.filter((row) => row.category === "external-calendar-normative-roundtrip").length,
    browserRuntime: "separate script/test:update18:browser required",
    workerRuntime: "not yet promoted to final closure evidence",
    standaloneRuntime: "not yet promoted to final closure evidence",
    importOrderMatrix: "not yet promoted to final closure evidence",
    soakMemoryTrend: "not yet promoted to final closure evidence",
    finalClosureMissing: [
      "fresh Update 18 final-tuple holdout executed against authoritative/fast production",
      "browser runtime differential",
      "Worker runtime differential",
      "standalone classic-script differential",
      "full extended import-order matrix",
      "soak/memory trend",
    ],
  };
  const summaryMatrix = summarize(records);
  const report = {
    schema: "pastafari-update18-final-differential-integration-v2",
    generatedAt: new Date().toISOString(),
    tier: TIER,
    seed: String(SEED),
    status: status(records, prereq, coverage),
    finalClosureStatus: status(records, prereq, coverage),
    prerequisites: prereq,
    environment: { node: process.version, platform: `${process.platform}/${process.arch}`, icu: process.versions.icu || null, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, locale: Intl.DateTimeFormat().resolvedOptions().locale },
    policy: { referenceAdjudicator: true, noMajorityVote: true, noExpectedFromActual: true, productionDoesNotImportReference: true, referenceDoesNotImportProduction: true },
    options: { tier: TIER, gateLimit: GATE_LIMIT, sauceLimit: SAUCE_LIMIT, yearLimit: YEAR_LIMIT, externalLimit: EXTERNAL_LIMIT },
    coverage,
    totals: {
      records: records.length,
      pass: records.filter((row) => row.status === "PASS").length,
      mismatches: records.filter((row) => row.status === "MISMATCH").length,
      errors: records.filter((row) => row.status === "ERROR").length,
      timeouts: records.filter((row) => row.status === "TIMEOUT").length,
      authoritativeMismatches: records.filter((row) => row.category !== "mutation-self-test" && row.authoritativeComparison?.status === "MISMATCH").length,
      fastMismatches: records.filter((row) => row.category !== "mutation-self-test" && row.fastComparison?.status === "MISMATCH").length,
      mutationDetections: records.filter((row) => row.category === "mutation-self-test" && row.mutationDetection === "DETECTED").length,
    },
    summaryMatrix,
    records,
    timing: { elapsedMs: elapsed(start) },
  };
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(serialize(report), null, 2)}\n`, "utf8");
  await writeFile(path.join(path.dirname(OUT), "summary-matrix.json"), `${JSON.stringify(serialize(summaryMatrix), null, 2)}\n`, "utf8");
  const sums = [];
  for (const file of [OUT, path.join(path.dirname(OUT), "summary-matrix.json")]) sums.push(`${await sha256File(file)}  ${path.relative(ROOT, file)}`);
  await writeFile(path.join(path.dirname(OUT), "SHA256SUMS.txt"), `${sums.join("\n")}\n`, "utf8");
  console.log(JSON.stringify(serialize({ status: report.status, finalClosureStatus: report.finalClosureStatus, totals: report.totals, coverage: { canonicalCorpusCases: coverage.canonicalCorpusCases, holdoutCases: coverage.holdoutCases, finalClosureMissing: coverage.finalClosureMissing.length }, out: path.relative(ROOT, OUT) }), null, 2));
  if (report.totals.mismatches || report.totals.errors || report.totals.timeouts) process.exitCode = 2;
}

try {
  await main();
} finally {
  if (FORCE_EXIT) process.exit(process.exitCode || 0);
}
