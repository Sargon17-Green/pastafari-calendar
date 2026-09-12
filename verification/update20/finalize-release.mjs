"use strict";

import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ROOT, OUT_DIR, gitText, sha256File, writeJson } from "./lib.mjs";

const collected = path.join(OUT_DIR, "collected");
async function findJson(name) {
  const found = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(abs);
      else if (entry.isFile() && entry.name === name) found.push(abs);
    }
  }
  await walk(collected);
  if (found.length !== 1) throw new Error(`Expected exactly one ${name}, found ${found.length}.`);
  return JSON.parse(await readFile(found[0], "utf8"));
}

const names = [
  "update19-gate.json",
  "release-scope.json",
  "version-propagation.json",
  "api-compatibility.json",
  "seal-holdout.json",
  "post-bump-regression.json",
  "ci-release-parity.json",
  "browser-worker-standalone-seal.json",
  "package-seal.json",
  "report.json",
];
const data = {};
const blockers = [];
for (const name of names) {
  try { data[name] = await findJson(name); }
  catch (error) { blockers.push(`${name}: ${error.message}`); }
}

for (const [name, value] of Object.entries(data)) {
  const status = value.status ?? value.releaseStatus;
  if (status !== "PASS" && status !== "FINAL_AUDIT_PASS") blockers.push(`${name}: status=${status ?? "missing"}`);
}

const packageReport = data["package-seal.json"] ?? {};
const browserReport = data["browser-worker-standalone-seal.json"] ?? {};
const sealReport = data["seal-holdout.json"] ?? {};
const scope = data["release-scope.json"] ?? {};
const update19Gate = data["update19-gate.json"] ?? {};
const releaseStatus = blockers.length === 0 ? "RELEASE_READY" : "RELEASE_BLOCKED";
const head = gitText(["rev-parse", "HEAD"]);
const tree = gitText(["rev-parse", "HEAD^{tree}"]);
const legacyReleaseBaseCommit = scope.legacyReleaseBaseCommit ?? "9b5ebf1d3e383a9345df8a5d8b12333df447f7ad";
const postCorrectionBaseCommit = scope.postCorrectionBaseCommit ?? "4dac16315dcecc9d45aeb264eaa1bceed038fddc";

const closure = {
  schema: "pastafari.update20.final-release-closure.v1",
  canonicalSemantics: scope.canonicalSemantics ?? "saved-sum",
  postStirFormulaId: scope.postStirFormulaId ?? "saved-sum-R-in-u",
  snapshotSemantics: scope.snapshotSemantics ?? "all-six-from-one-old-snapshot",
  baseCommit: legacyReleaseBaseCommit,
  legacyReleaseBaseCommit,
  postCorrectionBaseCommit,
  finalCommitOrTreeHash: { commit: head, tree },
  oldVersion: "1.3.0",
  newVersion: "1.4.0",
  update19EvidenceHash: "4fa7d3e59b261db19291b33c1bc9af54ab3a32fa3fc5921deaf3d6f4da217c365",
  update19EvidenceSemanticAuthority: update19Gate.semanticAuthority ?? "SUPERSEDED_HISTORICAL_PROVENANCE_ONLY",
  scrollHash: await sha256File("sources/מגילת העיתים.md"),
  referenceHash: await sha256File("verification/reference-oracle/reference.mjs"),
  authoritativeHash: await sha256File("browser/pastafari-calendar-core.js"),
  fastHash: await sha256File("browser/pastafari-calendar-fast.js"),
  canonicalCorpusHash: await sha256File("verification/update17/generated/normative-evidence-manifest.json"),
  packageArtifactHash: packageReport.packageArtifactHash ?? null,
  browserArtifactHash: browserReport.hashes?.browserFast ?? null,
  standaloneArtifactHash: browserReport.hashes?.standalone ?? null,
  allTestsPass: releaseStatus === "RELEASE_READY",
  sealHoldoutMismatches: (sealReport.totals?.authoritativeMismatches ?? 0) + (sealReport.totals?.fastMismatches ?? 0),
  apiCompatibilityStatus: data["api-compatibility.json"]?.status ?? null,
  auditedTreeUnchangedBeforeRelease: scope.status === "PASS" && Object.values(scope.semanticHashes ?? {}).every((row) => row.match === true),
  blockers,
  releaseStatus,
};
await writeJson("FINAL-RELEASE-CLOSURE.json", closure);

const updates = [];
const updates01to18AllPass = update19Gate.updates01to18?.count === 18 && update19Gate.updates01to18?.pass === 18;
for (let update = 1; update <= 18; update += 1) {
  updates.push({
    update,
    status: updates01to18AllPass ? "PASS" : "FAIL",
    evidence: "Historical Update 19 closure matrix; semantic authority superseded by saved-sum correction and current semantics revalidated by replacement Update 20 closure",
    semanticAuthority: "HISTORICAL_PASS_SUPERSEDED",
  });
}
updates.push({
  update: 19,
  status: update19Gate.status === "PASS" ? "PASS" : "FAIL",
  evidence: `sha256:${closure.update19EvidenceHash}`,
  semanticAuthority: "HISTORICAL_PASS_SUPERSEDED",
});
updates.push({
  update: 20,
  status: releaseStatus === "RELEASE_READY" ? "PASS" : "FAIL",
  evidence: "FINAL-RELEASE-CLOSURE.json",
  semanticAuthority: "CURRENT_SAVED_SUM",
});
await writeJson("UPDATE-SERIES-CLOSED.json", { schema: "pastafari.update20.series-closed.v1", status: releaseStatus === "RELEASE_READY" ? "PASS" : "FAIL", canonicalSemantics: "saved-sum", updates });

const report = `# Update 20 — Final Release Closure\n\nStatus: **${releaseStatus}**\n\n- legacy release base commit: \`${legacyReleaseBaseCommit}\`\n- saved-sum correction baseline: \`${postCorrectionBaseCommit}\`\n- canonical semantics: \`${closure.canonicalSemantics}\`\n- old version: \`1.3.0\`\n- new version: \`1.4.0\`\n- Update 19 evidence: \`sha256:${closure.update19EvidenceHash}\` (${closure.update19EvidenceSemanticAuthority})\n- seal holdout mismatches: \`${closure.sealHoldoutMismatches}\`\n- API compatibility: \`${closure.apiCompatibilityStatus}\`\n- blockers: ${blockers.length}\n\n${blockers.length ? blockers.map((b) => `- ${b}`).join("\n") : "All required post-correction saved-sum release-closure gates passed."}\n`;
await writeFile(path.join(OUT_DIR, "report.md"), report, "utf8");

const evidenceNames = ["FINAL-RELEASE-CLOSURE.json", "UPDATE-SERIES-CLOSED.json", "report.md"];
const sumLines = [];
for (const name of evidenceNames) {
  const bytes = await readFile(path.join(OUT_DIR, name));
  sumLines.push(`${createHash("sha256").update(bytes).digest("hex")}  ${name}`);
}
await writeFile(path.join(OUT_DIR, "SHA256SUMS"), `${sumLines.join("\n")}\n`, "utf8");

process.stdout.write(`${releaseStatus}\n`);
if (releaseStatus !== "RELEASE_READY") process.exitCode = 1;
