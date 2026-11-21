// Independent structural evidence check for a human-authored Persian review JSON.
// It does NOT authenticate reviewer identity, substantiate translations, or approve a release.
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REVIEW_SCHEMA = "fa-release-editorial-audit-result/v1";
const NOT_GRANTED = "NOT_GRANTED_BY_THIS_TOOL";
const LOCKED_CANDIDATE_SHA = "55c0f8a33114a7c6858a024cf5b75ca0cff89242";
// The reference is intentionally independent of offline-reviewer.html.
// A tampered local reviewer dataset may not redefine the source lock.
const LOCKED_BLOBS = Object.freeze({
  "docs/about/content/he.html": "e664c64765c94168631cb176652886560d23d92b",
  "docs/about/content/fa.html": "4642e1a92b7915850c90048015e9aaae69260d12",
  "docs/about/monster/index.html": "fd36d1b6b8ceb215545e6d9a7610d8f19a679e2f",
  "docs/about/monster/fa.html": "b5923f35ecb22aeed189b188fd521cdac0bf7eb9"
});
const COUNTS = { A: 16, B: 64, M: 40, D: 21 };
// Independent pin of the complete 141-unit source-locked review dataset.
// Hash is SHA-256 of JSON.stringify(JSON.parse(the embedded JSON)) as UTF-8.
const LOCKED_REVIEW_DATASET_SHA256 = "ee4fd52b8535b020a39d7ac6238b960295b64f6f7ca32380c7584d8a850faed4";
const EXPECTED_UNITS = Object.entries(COUNTS).flatMap(([kind, count]) =>
  Array.from({ length: count }, (_, index) => ({
    kind,
    id: kind + String(index + (kind === "M" ? 0 : 1)).padStart(2, "0")
  })));
const COMPETENCE = new Set(["", "he-fa-fidelity", "fa-style-only"]);
const STATUSES = new Set(["approved", "changes", "unreviewed"]);
const SNAPSHOTS = new Set(["CURRENT", "STALE_AFTER_EXTERNAL_CHANGE", "STORAGE_UNAVAILABLE"]);

const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export function assertLockedReviewDataset(dataset) {
  if (!isRecord(dataset) || dataset.schema !== "fa-release-editorial-audit-v1" ||
      dataset.candidateSha !== LOCKED_CANDIDATE_SHA ||
      !isRecord(dataset.counts) ||
      Object.keys(dataset.counts).length !== Object.keys(COUNTS).length ||
      Object.entries(COUNTS).some(([kind, count]) => dataset.counts[kind] !== count) ||
      !Array.isArray(dataset.items) || dataset.items.length !== EXPECTED_UNITS.length)
    throw new Error("Unexpected locked reviewer dataset structure or count");
  for (let i = 0; i < EXPECTED_UNITS.length; i++) {
    const actual = dataset.items[i], expected = EXPECTED_UNITS[i];
    if (!isRecord(actual) || actual.id !== expected.id || actual.kind !== expected.kind ||
        typeof actual.he !== "string" || !actual.he.trim() ||
        typeof actual.fa !== "string" || !actual.fa.trim() ||
        typeof actual.title !== "string" || !actual.title.trim())
      throw new Error("Locked reviewer unit layout/content invalid: " + expected.id);
  }
  const digest = createHash("sha256").update(JSON.stringify(dataset), "utf8").digest("hex");
  if (digest !== LOCKED_REVIEW_DATASET_SHA256)
    throw new Error("Locked reviewer unit dataset SHA-256 mismatch");
}

export async function assertLockedSourceFiles(dataset, root = new URL("../../", import.meta.url)) {
  if (!isRecord(dataset) || dataset.candidateSha !== LOCKED_CANDIDATE_SHA)
    throw new Error("The embedded reviewer source SHA differs from the immutable source lock");
  const observed = dataset.sourceBlobSha1;
  if (!isRecord(observed) || Object.keys(observed).length !== Object.keys(LOCKED_BLOBS).length ||
      Object.entries(LOCKED_BLOBS).some(([name, expected]) =>
        !own(observed, name) || observed[name] !== expected))
    throw new Error("Embedded source blob map differs from the immutable source lock");
  // Read the actual files on disk: matching an editable in-page map is not enough.
  for (const [filename, expected] of Object.entries(LOCKED_BLOBS)) {
    const bytes = await readFile(new URL(filename, root));
    const actual = createHash("sha1").update("blob " + bytes.length + "\0").update(bytes).digest("hex");
    if (actual !== expected)
      throw new Error("Source file changed after content lock: " + filename);
  }
}

export async function readLockedDataset() {
  const html = await readFile(new URL("./offline-reviewer.html", import.meta.url), "utf8");
  const match = html.match(/<script id="fa-review-dataset" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error("The local source-locked reviewer dataset is missing");
  const dataset = JSON.parse(match[1]);
  assertLockedReviewDataset(dataset);
  await assertLockedSourceFiles(dataset);
  return dataset;
}

export function inspectReviewReport(report, dataset) {
  const errors = [];
  try { assertLockedReviewDataset(dataset); }
  catch (error) { errors.push("Untrusted reviewer dataset: " + error.message); }
  // Always derive group mappings from the immutable expected layout, never
  // from mutable embedded records that could falsely show 65/64 reviewed.
  const sourceItems = new Map(EXPECTED_UNITS.map(item => [item.id, item.kind]));
  const groups = Object.fromEntries(Object.entries(COUNTS).map(([k, total]) =>
    [k, { reviewed: 0, changes: 0, drafts: 0, total }]));
  let savedCount = 0, reviewedCount = 0, changesCount = 0, draftCount = 0;
  const reviewedIds = new Set(), changeRequiredUnitIds = [], savedDraftUnitIds = [];

  if (!isRecord(report)) errors.push("Report must be a JSON object");
  else {
    if (report.schema !== REVIEW_SCHEMA) errors.push("Unsupported report schema");
    if (report.candidateSha !== LOCKED_CANDIDATE_SHA) errors.push("Wrong locked source SHA");
    const expected = LOCKED_BLOBS;
    const actual = report.sourceBlobSha1;
    if (!isRecord(actual) || Object.keys(actual).length !== Object.keys(expected).length ||
        Object.entries(expected).some(([k, sha]) => !own(actual, k) || actual[k] !== sha))
      errors.push("Source blob hash mapping mismatch");

    if (report.reviewer !== undefined && typeof report.reviewer !== "string")
      errors.push("Invalid reviewer field");
    if (report.competence !== undefined && !COMPETENCE.has(report.competence))
      errors.push("Invalid reviewer competence");
    if (report.releaseApproval !== undefined && report.releaseApproval !== NOT_GRANTED)
      errors.push("An imported report cannot authorize publication");
    if (report.storageSnapshotStatus !== undefined && !SNAPSHOTS.has(report.storageSnapshotStatus))
      errors.push("Invalid storage snapshot status");
    for (const field of ["unsavedLocalEdits", "reconciliationRequired"])
      if (report[field] !== undefined && typeof report[field] !== "boolean")
        errors.push("Invalid " + field);

    const resolution = report.reconciliationResolution;
    if (resolution !== undefined && resolution !== null &&
        (!isRecord(resolution) || typeof resolution.note !== "string" ||
         resolution.note.trim().length < 10 || typeof resolution.at !== "string" ||
         !/^\d{4}-\d{2}-\d{2}T/.test(resolution.at) ||
         Number.isNaN(Date.parse(resolution.at))))
      errors.push("Invalid claimed reconciliation record");

    const results = report.results;
    if (!isRecord(results) || Object.keys(results).length === 0) errors.push("Empty or invalid results");
    else {
      for (const [id, value] of Object.entries(results)) {
        if (!sourceItems.has(id) || !isRecord(value) || !STATUSES.has(value.status) ||
            typeof (value.note ?? "") !== "string" ||
            typeof (value.proposedReplacement ?? "") !== "string") {
          errors.push("Invalid review unit: " + id);
          continue;
        }
        savedCount++;
        if (value.status !== "unreviewed") {
          reviewedCount++;
          reviewedIds.add(id);
          groups[sourceItems.get(id)].reviewed++;
        } else {
          groups[sourceItems.get(id)].drafts++;
          savedDraftUnitIds.push(id);
        }
        if (value.status === "changes") {
          changesCount++;
          groups[sourceItems.get(id)].changes++;
          changeRequiredUnitIds.push(id);
        }
      }
      draftCount = savedCount - reviewedCount;
      const counts = { reviewedCount, savedCount, draftCount, totalUnits: sourceItems.size };
      for (const [name, expectedCount] of Object.entries(counts))
        if (own(report, name) && report[name] !== expectedCount)
          errors.push("Contradictory declared " + name);
    }
  }

  const snapshot = report && isRecord(report) ? report.storageSnapshotStatus : undefined;
  const needsReconciliation = !!(report && isRecord(report) &&
    (report.reconciliationRequired === true || report.unsavedLocalEdits === true ||
     (snapshot !== undefined && snapshot !== "CURRENT")));
  // Older review exports can omit storage metadata. That is valid for import
  // compatibility, but never proof that their local snapshot was conflict-free.
  const provenanceFields = ["storageSnapshotStatus", "unsavedLocalEdits", "reconciliationRequired"];
  const missingProvenanceFields = provenanceFields.filter(field => !isRecord(report) || !own(report, field));
  const provenanceCheckRequired = needsReconciliation || missingProvenanceFields.length > 0;
  const provenanceClaim = needsReconciliation ? "SELF_REPORTED_CONFLICT_OR_UNSAVED" :
    missingProvenanceFields.length ? "INCOMPLETE_LEGACY_METADATA" : "SELF_REPORTED_CURRENT";
  const missingReviewedUnitIds = EXPECTED_UNITS.filter(item => !reviewedIds.has(item.id)).map(item => item.id);
  for (const entry of Object.values(groups)) entry.missing = entry.total - entry.reviewed;
  const structurallyValid = errors.length === 0;
  const covered = sourceItems.size === 141 && reviewedCount === sourceItems.size;
  return {
    structurallyValid,
    errors,
    sourceSha: LOCKED_CANDIDATE_SHA,
    reviewerClaim: isRecord(report) && typeof report.reviewer === "string" ? report.reviewer : "",
    competenceClaim: isRecord(report) && COMPETENCE.has(report.competence) ? report.competence : "",
    reviewedCount,
    savedCount,
    draftCount,
    changesCount,
    totalUnits: sourceItems.size,
    groups,
    coverageComplete: structurallyValid && covered, // claimed unit-status coverage, not independent approval
    missingReviewedUnitIds,
    changeRequiredUnitIds,
    savedDraftUnitIds,
    needsReconciliation,
    missingProvenanceFields,
    provenanceClaim,
    provenanceCheckRequired,
    claimedReviewScope: isRecord(report) && report.competence === "he-fa-fidelity" ? "BILINGUAL_SELF_REPORTED" :
      isRecord(report) && report.competence === "fa-style-only" ? "PERSIAN_STYLE_SELF_REPORTED" : "NOT_RECORDED",
    unresolvedChanges: changesCount > 0,
    selfReportedReconciliation: !!(isRecord(report) && isRecord(report.reconciliationResolution)),
    humanLanguageSignoff: "NOT_VERIFIED",
    physicalAccessibilitySignoff: "NOT_VERIFIED",
    releaseApproval: NOT_GRANTED,
    note: "Coverage represents recorded per-unit statuses only. Provenance, competence and reviewer identity are self-reported, not authenticated; structural validity never certifies language review, accessibility or release."
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 3)
      throw new Error("Usage: node verification/fa-release/verify-report.mjs <human-report.json>");
    const dataset = await readLockedDataset();
    const report = JSON.parse(await readFile(process.argv[2], "utf8"));
    const result = inspectReviewReport(report, dataset);
    console.log(JSON.stringify(result, null, 2));
    if (!result.structurallyValid) process.exitCode = 2;
  } catch (error) {
    console.error("Report verification failed:", error.message);
    process.exitCode = 2;
  }
}
