#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { gitText, requireRun, sha256File, writeJson, ROOT } from "./lib.mjs";

const BASE_COMMIT = process.env.UPDATE20_BASE_COMMIT || "9b5ebf1d3e383a9345df8a5d8b12333df447f7ad";
const AUDITED_TREE = "ea72ef27b786a41ad9683b4c30bbde8c3ea6078e";
const NEW_VERSION = "1.4.0";
const EXPECTED_HASHES = Object.freeze({
  scroll: ["sources/מגילת העיתים.md", "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96"],
  reference: ["verification/reference-oracle/reference.mjs", "40f08fab56b3f0e90b6ce43a24948856972ecdd26d2bbbeb84bda26905fdc379"],
  publicEntry: ["src/public-api.js", "ba1f123a85b7453cb1ad7d77f61a894880a588b60c1a2dd5863015dd29ef08ac"],
  authoritative: ["browser/pastafari-calendar-core.js", "e9ae270d05a6f0328ea9b814a48af2f0434e3e9a8f4c340f1ac6de1e1f5fced2"],
  fast: ["browser/pastafari-calendar-fast.js", "03de7a8125c1c4c63a9946b531b754c4828adc9f998ddd8b7a5ef4b5adcc4473"],
  canonicalCorpus: ["verification/update17/generated/normative-evidence-manifest.json", "a7974864add317e85c7d0911a717bac820af35e3619c6ed5b61d713c74ad8ad4"],
  canonicalFinalTuples: ["verification/update17/generated/normative-final-tuples.json", "4ccde5d6332ffe9105a2a970946d051c55fb7566a004b5dadb51f42ab191a69a"],
});

const exactAllowed = new Set([
  ".github/workflows/update-20-release-closure.yml",
  ".github/workflows/update-20-regenerate-release-evidence.yml",
  ".gitignore",
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
]);
function allowed(relativePath) {
  return exactAllowed.has(relativePath)
    || relativePath.startsWith("verification/update20/")
    || relativePath.startsWith("verification/update17/generated/")
    || relativePath.startsWith("artifacts/update-18/")
    || relativePath === "artifacts/update16/oracle-authority-audit.json"
    || relativePath.startsWith("artifacts/final-release/");
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

const artifact = {
  schema: "pastafari.update20.release-scope.v1",
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
  failures,
};
await writeJson("release-scope.json", artifact);
console.log(JSON.stringify(artifact, null, 2));
if (failures.length) process.exitCode = 1;
