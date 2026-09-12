#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { gitText, requireRun, sha256File, writeJson, ROOT } from "./lib.mjs";

// The workflow still exposes UPDATE20_BASE_COMMIT for provenance of the original
// 1.3.0 -> 1.4.0 release. After the canonical saved-sum correction, release-scope
// correctness must instead be measured from the corrected canonical baseline.
const LEGACY_RELEASE_BASE_COMMIT = process.env.UPDATE20_BASE_COMMIT || "9b5ebf1d3e383a9345df8a5d8b12333df447f7ad";
const BASE_COMMIT = "4dac16315dcecc9d45aeb264eaa1bceed038fddc";
const AUDITED_TREE = "26f7dd377dc9c123717cea247303199f3bc68e72";
const NEW_VERSION = "1.4.0";
const RELEASE_SCRIPT_SHA256 = "127b7115b2a9bffce4db45437d0530b419e2f7ee577ac298d3428041a1f6f8e5";
const EXPECTED_HASHES = Object.freeze({
  scroll: ["sources/מגילת העיתים.md", "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96"],
  reference: ["verification/reference-oracle/reference.mjs", "21c103d3540eb5481445a190cef98f2628de7eb90b7240879fede0d519cf4a95"],
  publicEntry: ["src/public-api.js", "ba1f123a85b7453cb1ad7d77f61a894880a588b60c1a2dd5863015dd29ef08ac"],
  authoritative: ["browser/pastafari-calendar-core.js", "e9ae270d05a6f0328ea9b814a48af2f0434e3e9a8f4c340f1ac6de1e1f5fced2"],
  fast: ["browser/pastafari-calendar-fast.js", "9855be62ebe9e9e24d301f849dc010e8195fa8cf7857b45c492b60a2bb0c60ef"],
});
const CANONICAL_JSON = Object.freeze([
  "coverage-report.json",
  "external-calendar-vectors.json",
  "foundation-evidence.json",
  "hand-discriminators.json",
  "month-weaving-small-domain.json",
  "normative-evidence-manifest.json",
  "normative-final-tuples.json",
  "normative-gate-vectors.json",
  "normative-sauce-vectors.json",
  "normative-structure-vectors.json",
  "normative-year-vectors.json",
]);
const CANONICAL_PREFIX = "verification/update17/generated/";

// Only the CI baseline hardening, this scope-gate correction, and the root checksum
// manifest are permitted after the pinned saved-sum correction baseline. Any later
// parallel change must be reviewed explicitly before closure evidence is accepted.
const exactAllowed = new Set([
  ".github/workflows/benchmark.yml",
  "SHA256SUMS.txt",
  "verification/update20/check-release-scope.mjs",
]);

const failures = [];
const baseTree = gitText(["rev-parse", `${BASE_COMMIT}^{tree}`]);
if (baseTree !== AUDITED_TREE) {
  failures.push(`post-correction base tree ${baseTree} != audited saved-sum tree ${AUDITED_TREE}`);
}
const ancestry = requireRun("git", ["merge-base", "--is-ancestor", BASE_COMMIT, "HEAD"], { timeoutMs: 60_000 });
if (!ancestry.pass) failures.push("saved-sum correction baseline is not an ancestor of HEAD");

const head = gitText(["rev-parse", "HEAD"]);
const headTree = gitText(["rev-parse", "HEAD^{tree}"]);
const changed = gitText(["diff", "--name-only", `${BASE_COMMIT}..HEAD`, "--"]).split(/\r?\n/u).filter(Boolean);
const unexpected = changed.filter((entry) => !exactAllowed.has(entry));
if (unexpected.length) failures.push(`unexpected post-correction scope changes: ${unexpected.join(", ")}`);

const packageJson = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
const packageLock = JSON.parse(await readFile(path.join(ROOT, "package-lock.json"), "utf8"));
if (packageJson.version !== NEW_VERSION) failures.push(`package.json version ${packageJson.version} != ${NEW_VERSION}`);
if (packageLock.version !== NEW_VERSION || packageLock.packages?.[""]?.version !== NEW_VERSION) {
  failures.push("package-lock root version does not match 1.4.0");
}

const hashes = {};
for (const [name, [relativePath, expected]] of Object.entries(EXPECTED_HASHES)) {
  const actual = await sha256File(relativePath);
  hashes[name] = { path: relativePath, expected, actual, match: actual === expected };
  if (actual !== expected) failures.push(`${name} changed since saved-sum correction baseline`);
}

const releaseScriptSha256 = await sha256File("scripts/release.mjs");
if (releaseScriptSha256 !== RELEASE_SCRIPT_SHA256) {
  failures.push(`release infrastructure drift: scripts/release.mjs ${releaseScriptSha256} != ${RELEASE_SCRIPT_SHA256}`);
}

const update13Evidence = JSON.parse(await readFile(path.join(ROOT, "artifacts/update-13-standalone-firewall.json"), "utf8"));
if (update13Evidence.schema !== "pastafari-update13-standalone-firewall-v1" || update13Evidence.status !== "PASS") {
  failures.push("Update13 standalone firewall evidence is not PASS");
}
for (const row of update13Evidence.files ?? []) {
  const actual = await sha256File(row.file);
  if (actual !== row.sha256 || row.pass !== true || !Object.values(row.markers ?? {}).every(Boolean)) {
    failures.push(`Update13 standalone evidence drift: ${row.file}`);
  }
}

const update16Evidence = JSON.parse(await readFile(path.join(ROOT, "artifacts/update16/oracle-authority-audit.json"), "utf8"));
if (update16Evidence.schema !== "pastafari-update16-authority-audit-result-v1" || update16Evidence.status !== "PASS") {
  failures.push("Update16 authority evidence is not PASS");
}
if (update16Evidence.packageVersion !== NEW_VERSION) failures.push("Update16 authority evidence packageVersion is stale");
if (update16Evidence.scrollSha256 !== EXPECTED_HASHES.scroll[1]) failures.push("Update16 authority evidence Scroll hash drift");
if (update16Evidence.referenceSha256 !== EXPECTED_HASHES.reference[1]) failures.push("Update16 authority evidence reference hash drift");
if ((update16Evidence.productionReferenceImportHits ?? []).length !== 0) {
  failures.push("Update16 authority evidence reports production reference imports");
}

// After the saved-sum correction, the checked-in canonical corpus itself is the
// corrected baseline. There must be no further byte-level drift before closure.
const canonicalBaselineEquality = [];
for (const name of CANONICAL_JSON) {
  const relativePath = `${CANONICAL_PREFIX}${name}`;
  const current = await readFile(path.join(ROOT, ...relativePath.split("/")), "utf8");
  const baseline = requireRun("git", ["show", `${BASE_COMMIT}:${relativePath}`], {
    timeoutMs: 60_000,
    maxBuffer: 64 * 1024 * 1024,
  }).stdout;
  const exactMatch = current === baseline;
  canonicalBaselineEquality.push({ path: relativePath, exactMatch });
  if (!exactMatch) failures.push(`${relativePath} changed since saved-sum correction baseline`);
}

const artifact = {
  schema: "pastafari.update20.release-scope.v3",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  canonicalSemantics: "saved-sum",
  postStirFormulaId: "saved-sum-R-in-u",
  snapshotSemantics: "all-six-from-one-old-snapshot",
  legacyReleaseBaseCommit: LEGACY_RELEASE_BASE_COMMIT,
  postCorrectionBaseCommit: BASE_COMMIT,
  auditedPostCorrectionTree: AUDITED_TREE,
  baseTree,
  head,
  headTree,
  oldVersion: "1.3.0",
  newVersion: NEW_VERSION,
  changedPaths: changed,
  unexpectedPaths: unexpected,
  semanticHashes: hashes,
  releaseInfrastructure: {
    path: "scripts/release.mjs",
    expectedSha256: RELEASE_SCRIPT_SHA256,
    actualSha256: releaseScriptSha256,
    match: releaseScriptSha256 === RELEASE_SCRIPT_SHA256,
  },
  canonicalCorpusPolicy: "The checked-in Update 17 canonical JSON must remain byte-identical to the pinned saved-sum correction baseline before replacement closure evidence is accepted.",
  canonicalBaselineEquality,
  failures,
};
await writeJson("release-scope.json", artifact);
console.log(JSON.stringify(artifact, null, 2));
if (failures.length) process.exitCode = 1;
