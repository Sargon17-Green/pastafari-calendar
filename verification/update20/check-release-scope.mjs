#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { gitText, requireRun, sha256File, writeJson, ROOT } from "./lib.mjs";

const BASE_COMMIT = process.env.UPDATE20_BASE_COMMIT || "9b5ebf1d3e383a9345df8a5d8b12333df447f7ad";
const AUDITED_TREE = "ea72ef27b786a41ad9683b4c30bbde8c3ea6078e";
const NEW_VERSION = "1.4.0";
const RELEASE_SCRIPT_SHA256 = "127b7115b2a9bffce4db45437d0530b419e2f7ee577ac298d3428041a1f6f8e5";
const EXPECTED_HASHES = Object.freeze({
  scroll: ["sources/מגילת העיתים.md", "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96"],
  reference: ["verification/reference-oracle/reference.mjs", "40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379"],
  publicEntry: ["src/public-api.js", "ba1f123a85b7453cb1ad7d77f61a894880a588b60c1a2dd5863015dd29ef08ac"],
  authoritative: ["browser/pastafari-calendar-core.js", "e9ae270d05a6f0328ea9b814a48af2f0434e3e9a8f4c340f1ac6de1e1f5fced2"],
  fast: ["browser/pastafari-calendar-fast.js", "03de7a8125c1c4c63a9946b531b754c4828adc9f998ddd8b7a5ef4b5adcc4473"],
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

const exactAllowed = new Set([
  ".github/workflows/update-20-release-closure.yml",
  "RELEASE-NOTES-1.4.0.md",
  "UPDATE20-DELTA-MANIFEST.json",
  "SHA256SUMS.txt",
  "docs/SHA256SUMS.txt",
  "package.json",
  "package-lock.json",
  "browser/README.md",
  "browser/standalone/pastafari-date.js",
  "browser/standalone/pastafari-date.min.js",
  "docs/DOCUMENTATION-CONSISTENCY.md",
  "verification/pwa-cache-state.json",
  "scripts/release.mjs",
  "artifacts/update-13-standalone-firewall.json",
  "artifacts/update16/oracle-authority-audit.json",
]);
function allowed(relativePath) {
  return exactAllowed.has(relativePath)
    || relativePath.startsWith("verification/update20/")
    || relativePath.startsWith("artifacts/final-release/")
    || relativePath.startsWith(CANONICAL_PREFIX);
}
function normalizeCanonical(value) {
  if (Array.isArray(value)) return value.map(normalizeCanonical);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      if (key === "packageVersion") out[key] = "<PACKAGE_VERSION>";
      else if (key === "deterministicRebuildHash") out[key] = "<DERIVED_HASH>";
      else out[key] = normalizeCanonical(value[key]);
    }
    return out;
  }
  return value;
}
function collectPackageVersions(value, output = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectPackageVersions(item, output);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "packageVersion") output.push(String(item));
      collectPackageVersions(item, output);
    }
  }
  return output;
}

const failures = [];
const baseTree = gitText(["rev-parse", `${BASE_COMMIT}^{tree}`]);
if (baseTree !== AUDITED_TREE) failures.push(`release base tree ${baseTree} != audited Update 19 tree ${AUDITED_TREE}`);
const ancestry = requireRun("git", ["merge-base", "--is-ancestor", BASE_COMMIT, "HEAD"], { timeoutMs: 60_000 });
if (!ancestry.pass) failures.push("release base is not an ancestor of HEAD");
const head = gitText(["rev-parse", "HEAD"]);
const headTree = gitText(["rev-parse", "HEAD^{tree}"]);
const changed = gitText(["diff", "--name-only", `${BASE_COMMIT}..HEAD`, "--"]).split(/\r?\n/u).filter(Boolean);
const unexpected = changed.filter((entry) => !allowed(entry));
if (unexpected.length) failures.push(`unexpected release-scope changes: ${unexpected.join(", ")}`);

const packageJson = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
const packageLock = JSON.parse(await readFile(path.join(ROOT, "package-lock.json"), "utf8"));
if (packageJson.version !== NEW_VERSION) failures.push(`package.json version ${packageJson.version} != ${NEW_VERSION}`);
if (packageLock.version !== NEW_VERSION || packageLock.packages?.[""]?.version !== NEW_VERSION) failures.push("package-lock root version does not match 1.4.0");

const hashes = {};
for (const [name, [relativePath, expected]] of Object.entries(EXPECTED_HASHES)) {
  const actual = await sha256File(relativePath);
  hashes[name] = { path: relativePath, expected, actual, match: actual === expected };
  if (actual !== expected) failures.push(`${name} changed since Update 19 audit`);
}

const releaseScriptSha256 = await sha256File("scripts/release.mjs");
if (releaseScriptSha256 !== RELEASE_SCRIPT_SHA256) {
  failures.push(`release infrastructure drift: scripts/release.mjs ${releaseScriptSha256} != ${RELEASE_SCRIPT_SHA256}`);
}

// Update 20 refreshes two deterministic evidence files because the release bytes and
// packageVersion changed. They are permitted only when they still describe the
// current release candidate and retain PASS semantics.
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
if ((update16Evidence.productionReferenceImportHits ?? []).length !== 0) failures.push("Update16 authority evidence reports production reference imports");

// Update 17 canonical evidence embeds packageVersion in every document. A release
// version bump must therefore regenerate the byte-level corpus. That regeneration
// is permitted only when the JSON is identical to the audited Update 19 corpus
// after normalizing packageVersion and the deterministic hashes derived from those
// version-bearing bytes. The ordinary Update 17 stale check still independently
// requires the checked-in corpus to equal a fresh deterministic rebuild exactly.
const canonicalMetadataOnly = [];
for (const name of CANONICAL_JSON) {
  const relativePath = `${CANONICAL_PREFIX}${name}`;
  const current = JSON.parse(await readFile(path.join(ROOT, ...relativePath.split("/")), "utf8"));
  const baseline = JSON.parse(requireRun("git", ["show", `${BASE_COMMIT}:${relativePath}`], { timeoutMs: 60_000, maxBuffer: 64 * 1024 * 1024 }).stdout);
  const normalizedMatch = JSON.stringify(normalizeCanonical(current)) === JSON.stringify(normalizeCanonical(baseline));
  const currentVersions = [...new Set(collectPackageVersions(current))].sort();
  const baselineVersions = [...new Set(collectPackageVersions(baseline))].sort();
  const versionsOk = currentVersions.length > 0
    && currentVersions.every((version) => version === NEW_VERSION)
    && baselineVersions.length > 0
    && baselineVersions.every((version) => version === "1.3.0");
  canonicalMetadataOnly.push({ path: relativePath, normalizedMatch, versionsOk, baselineVersions, currentVersions });
  if (!normalizedMatch) failures.push(`${relativePath} changed beyond packageVersion/derived rebuild hashes`);
  if (!versionsOk) failures.push(`${relativePath} packageVersion metadata did not propagate cleanly 1.3.0 -> ${NEW_VERSION}`);
}

const artifact = {
  schema: "pastafari.update20.release-scope.v2",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  releaseCandidateBaseCommit: BASE_COMMIT,
  auditedUpdate19Tree: AUDITED_TREE,
  baseTree,
  head,
  headTree,
  oldVersion: "1.3.0",
  newVersion: NEW_VERSION,
  changedPaths: changed,
  unexpectedPaths: unexpected,
  semanticHashes: hashes,
  releaseInfrastructure: { path: "scripts/release.mjs", expectedSha256: RELEASE_SCRIPT_SHA256, actualSha256: releaseScriptSha256, match: releaseScriptSha256 === RELEASE_SCRIPT_SHA256 },
  canonicalCorpusPolicy: "Update17 corpus may change only by packageVersion metadata and deterministic hashes derived from version-bearing bytes; exact fresh-regeneration equality remains mandatory in the Update17 stale check.",
  canonicalMetadataOnly,
  failures,
};
await writeJson("release-scope.json", artifact);
console.log(JSON.stringify(artifact, null, 2));
if (failures.length) process.exitCode = 1;
