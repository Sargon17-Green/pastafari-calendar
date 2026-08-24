#!/usr/bin/env node
"use strict";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ReferenceCalendar } from "../reference-oracle/reference.mjs";
import { referenceGregorianToJdn } from "./external-calendar-reference.mjs";

const ROOT = process.cwd();
const cacheArg = process.argv.find((arg) => arg.startsWith("--gate-cache="));
if (!cacheArg) throw new Error("--gate-cache=<fresh reference-derived ephemeral cache> is required");
const gateCachePath = path.resolve(ROOT, cacheArg.slice("--gate-cache=".length));
const cache = JSON.parse(await readFile(gateCachePath, "utf8"));
const gaps = new Map(cache.gaps.map(([index, gap]) => [Number(index), BigInt(gap)]));
const FOUNDATION = -13_334_246n;
const positions = new Map([[0, FOUNDATION]]);
let running = FOUNDATION;
for (let index = -1; index >= cache.minimum; index -= 1) { running -= gaps.get(index); positions.set(index, running); }
running = FOUNDATION;
for (let index = 1; index <= cache.maximum; index += 1) { running += gaps.get(index); positions.set(index, running); }
const gateTable = {
  minimum: cache.minimum,
  maximum: cache.maximum,
  position(index) {
    const value = positions.get(index);
    if (value === undefined) throw new RangeError(`gate index ${index} outside Update17 report cache`);
    return value;
  },
  containingInterval(jdnValue) {
    const day = BigInt(jdnValue);
    let lo = this.minimum;
    let hi = this.maximum - 1;
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2);
      if (this.position(mid) < day) lo = mid; else hi = mid - 1;
    }
    return lo;
  },
};

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}
function parseGregorian(text) {
  const match = /^(-?\d+)-(\d{2})-(\d{2})$/.exec(text);
  if (!match) throw new Error(`unsupported Gregorian literal ${text}`);
  return referenceGregorianToJdn({ year: BigInt(match[1]), month: Number(match[2]), day: Number(match[3]) });
}
const calendars = new Map();
function referenceTuple(calculationJdn, targetJdn) {
  const key = String(calculationJdn);
  let calendar = calendars.get(key);
  if (!calendar) {
    calendar = new ReferenceCalendar(BigInt(calculationJdn), { gateTable });
    calendars.set(key, calendar);
  }
  return canonical(calendar.convertJdn(BigInt(targetJdn)));
}
function sameTuple(a, b) { return JSON.stringify(canonical(a)) === JSON.stringify(canonical(b)); }

const inventoryDefinitions = [
  ["implementations/tests/conformance-vectors.json", "C-regression-vectors", "implementations/tests/generate_spec_canonical.py", "legacy canonical-format generator", "non-normative regression", "revalidated in Update17 diff report", true, false],
  ["implementations/tests/spec-derived-canonical-vectors.json", "C-regression-vectors", "implementations/tests/generate_spec_canonical.py", "legacy spec-canonical generator", "non-normative regression", "revalidated in Update17 diff report", true, false],
  ["implementations/tests/spec-derived-gate-checkpoints.json", "C-regression-checkpoints", "implementations/tests/generate_spec_canonical.py", "legacy spec-canonical generator", "non-normative regression", "covered by Update17 independent gate corpus", true, false],
  ["implementations/tests/spec-derived-binding-5778.json", "C-regression-discriminator", "implementations/tests/generate_spec_binding_5778.py", "legacy spec-derived script", "non-normative regression", "superseded normatively by rediscovered 5779/5780/5781 discriminators", true, false],
  ["implementations/tests/spec-derived-deep-year-chain.json", "C-regression-vectors", "implementations/tests/generate_spec_deep_year_chain.mjs", "legacy spec-derived script", "non-normative regression", "not an oracle; retained for compatibility", true, false],
  ["implementations/tests/oracle-differential-10000.tsv", "D-historical-fossil", "implementations/tests/generate_oracle_corpus.mjs", "historical implementation differential", "historical-only", "not reference validated as a normative corpus", false, true],
  ["implementations/tests/historical-regression-vectors-16.json", "D-historical-fossil", "historical engine capture", "PASTAFARI-TABLETS-2026-08-11-V2-5778", "historical-only", "compared against current reference in Update17 diff report", false, true],
  ["artifacts/update-08-stage-05-canonical-vectors.json", "D-historical-fossil", "verification/update8/run-stage-05-canonical-vectors.mjs", "Update8 stage baseline", "historical-only", "retained as archival evidence", false, true],
  ["verification/update8/stage-07-cross-environment-vectors.json", "C-regression-vectors", "Update8 stage-07 expansion", "authoritative Stage6-equivalent snapshot", "non-normative regression", "compared against current reference in Update17 diff report", false, false],
  ["artifacts/month-weaving-domain-before.json", "D-historical-fossil", "Update14 audit", "pre-fix MonthWeaving behavior", "historical-only", "superseded by independent exhaustive Update17 evidence", false, true],
  ["artifacts/month-weaving-domain-after.json", "C-regression-evidence", "Update14 audit", "post-fix MonthWeaving behavior", "non-normative regression", "independently covered by Update17 small-domain corpus", false, false],
  ["artifacts/update-13-normative-representation-matrix.json", "C-regression-evidence", "Update13 audit", "Update13 semantic-firewall audit", "non-normative regression", "external normative representations regenerated independently in Update17", false, false],
  ["artifacts/update-15-random-witness-isolation.json", "C-regression-scenario-evidence", "Update15 audit", "Update15 scenario audit", "non-normative regression", "state/noise scenario remains exercised by Update15 tests", false, false],
];
const generatedManifest = JSON.parse(await readFile(path.join(ROOT, "verification/update17/generated/normative-evidence-manifest.json"), "utf8"));
for (const artifact of generatedManifest.artifacts) {
  inventoryDefinitions.push([
    `verification/update17/generated/${artifact.artifact}`,
    artifact.role,
    "verification/update17/generate-canonical-evidence.mjs",
    "scroll -> independent reference",
    "reference-validated canonical evidence",
    "yes; hash-bound to scroll/reference/generator",
    true,
    false,
  ]);
}
inventoryDefinitions.push([
  "verification/update17/generated/normative-evidence-manifest.json",
  "provenance-manifest",
  "verification/update17/generate-canonical-evidence.mjs",
  "scroll -> independent reference",
  "machine-readable authority/provenance registry",
  "yes",
  true,
  false,
]);

const searchableFiles = [
  ".github/workflows/test.yml", "package.json",
  "scripts/run-update16-authority-audit.mjs", "test/reference-oracle.test.js", "test/update16-authority-boundary.test.js", "test/update17-canonical-evidence.test.js",
  "verification/update17/verify-canonical-evidence.mjs", "verification/update17/check-canonical-stale.mjs", "verification/update17/run-engine-matrix.mjs",
  "verification/update8/run-stage-07-browser-core.mjs",
  "implementations/c/tests/canonical.c", "implementations/cpp/tests/conformance.cpp", "implementations/java/src/main/java/org/appointedtimes/PastafariCalendar.java",
];
const searchableContent = new Map();
for (const file of searchableFiles) {
  try { searchableContent.set(file, await readFile(path.join(ROOT, file), "utf8")); } catch {}
}
const inventory = inventoryDefinitions.map(([artifact, role, generator, originalAuthority, currentAuthorityStatus, referenceValidated, regenerate, historicalOnly]) => ({
  path: artifact,
  role,
  generator,
  originalAuthority,
  currentAuthorityStatus,
  referenceValidated,
  stale: artifact.startsWith("verification/update17/generated/") ? false : currentAuthorityStatus.includes("historical") || currentAuthorityStatus.includes("non-normative"),
  regenerate: artifact.startsWith("verification/update17/generated/") ? "canonical Update17 regeneration" : regenerate ? "legacy compatibility regeneration only; never normative" : "no",
  historicalOnly,
  readers: [...searchableContent.entries()].filter(([, text]) => text.includes(artifact)).map(([file]) => file),
}));
await writeFile(path.join(ROOT, "verification/update17/artifact-inventory.json"), `${JSON.stringify({ schema: "pastafari-update17-artifact-inventory-v1", sourceBaselineCommit: generatedManifest.meta.sourceBaselineCommit, artifacts: inventory }, null, 2)}\n`);

const sourceCorpora = [];
const compact = JSON.parse(await readFile(path.join(ROOT, "implementations/tests/conformance-vectors.json"), "utf8"));
sourceCorpora.push({ path: "implementations/tests/conformance-vectors.json", vectors: compact.vectors.map((v) => ({ id: v.id, calculationJdn: BigInt(v.calculationJdn), targetJdn: BigInt(v.targetJdn), expected: v.expected })) });
const expanded = JSON.parse(await readFile(path.join(ROOT, "implementations/tests/spec-derived-canonical-vectors.json"), "utf8"));
sourceCorpora.push({ path: "implementations/tests/spec-derived-canonical-vectors.json#forwardVectors", vectors: expanded.forwardVectors.map((v) => ({ id: v.id, calculationJdn: BigInt(v.calculationJdn), targetJdn: BigInt(v.targetJdn), expected: v.expected })) });
const stage7 = JSON.parse(await readFile(path.join(ROOT, "verification/update8/stage-07-cross-environment-vectors.json"), "utf8"));
sourceCorpora.push({ path: "verification/update8/stage-07-cross-environment-vectors.json", vectors: stage7.vectors.map((v) => ({ id: v.id, calculationJdn: BigInt(v.calculationJdn), targetJdn: BigInt(v.targetJdn), expected: v.expected })) });
const historical = JSON.parse(await readFile(path.join(ROOT, "implementations/tests/historical-regression-vectors-16.json"), "utf8"));
sourceCorpora.push({ path: "implementations/tests/historical-regression-vectors-16.json", historicalAlgorithmId: historical.historicalAlgorithmId, vectors: historical.vectors.map((v) => ({ id: v.id, calculationJdn: parseGregorian(v.calculation), targetJdn: parseGregorian(v.target), expected: v.expected })) });

const corpusResults = [];
const changedByReason = {
  "bowlSum fix": 0,
  "regenerated gates": 0,
  "5778 fix": 0,
  "calendar representation fix": 0,
  "domain fix": 0,
  "historical algorithm divergence (first cause not encoded in tuple fossil)": 0,
  other: 0,
};
for (const corpus of sourceCorpora) {
  const rows = [];
  for (const vector of corpus.vectors) {
    const now = referenceTuple(vector.calculationJdn, vector.targetJdn);
    const unchanged = sameTuple(vector.expected, now);
    let reason = "unchanged";
    if (!unchanged) {
      if (corpus.historicalAlgorithmId) reason = "historical algorithm divergence (first cause not encoded in tuple fossil)";
      else reason = "other";
      changedByReason[reason] += 1;
    }
    rows.push({ id: vector.id, input: { calculationJdn: String(vector.calculationJdn), targetJdn: String(vector.targetJdn) }, status: unchanged ? "unchanged" : "changed", oldExpected: canonical(vector.expected), newExpected: now, reason });
  }
  corpusResults.push({ path: corpus.path, total: rows.length, unchanged: rows.filter((r) => r.status === "unchanged").length, changed: rows.filter((r) => r.status === "changed").length, rows });
}
const totals = corpusResults.reduce((acc, corpus) => ({ total: acc.total + corpus.total, unchanged: acc.unchanged + corpus.unchanged, changed: acc.changed + corpus.changed }), { total: 0, unchanged: 0, changed: 0 });
await writeFile(path.join(ROOT, "verification/update17/vector-diff-summary.json"), `${JSON.stringify({
  schema: "pastafari-update17-vector-diff-v1",
  referenceHash: generatedManifest.meta.referenceHash,
  policy: "Legacy expected values are compared against current independent reference only; no legacy value is imported into the normative Update17 corpus.",
  totals,
  changedByReason,
  corpora: corpusResults,
}, null, 2)}\n`);

console.log(JSON.stringify({ status: "PASS", inventoryArtifacts: inventory.length, diffTotals: totals, changedByReason }, null, 2));
