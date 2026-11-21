// Independent structural evidence check for a human-authored Persian review JSON.
// It does NOT authenticate reviewer identity, substantiate translations, or approve a release.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REVIEW_SCHEMA = "fa-release-editorial-audit-result/v1";
const NOT_GRANTED = "NOT_GRANTED_BY_THIS_TOOL";
const COUNTS = { A: 16, B: 64, M: 40, D: 21 };
const COMPETENCE = new Set(["", "he-fa-fidelity", "fa-style-only"]);
const STATUSES = new Set(["approved", "changes", "unreviewed"]);
const SNAPSHOTS = new Set(["CURRENT", "STALE_AFTER_EXTERNAL_CHANGE", "STORAGE_UNAVAILABLE"]);

const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export async function readLockedDataset() {
  const html = await readFile(new URL("./offline-reviewer.html", import.meta.url), "utf8");
  const match = html.match(/<script id="fa-review-dataset" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error("The local source-locked reviewer dataset is missing");
  const dataset = JSON.parse(match[1]);
  if (dataset.schema !== "fa-release-editorial-audit-v1" || dataset.items?.length !== 141)
    throw new Error("Unexpected local reviewer dataset/schema");
  return dataset;
}

export function inspectReviewReport(report, dataset) {
  const errors = [];
  const sourceItems = new Map((dataset.items || []).map(item => [item.id, item.kind]));
  const groups = Object.fromEntries(Object.entries(COUNTS).map(([k, total]) =>
    [k, { reviewed: 0, changes: 0, drafts: 0, total }]));
  let savedCount = 0, reviewedCount = 0, changesCount = 0, draftCount = 0;
  const reviewedIds = new Set(), changeRequiredUnitIds = [], savedDraftUnitIds = [];

  if (!isRecord(report)) errors.push("Report must be a JSON object");
  else {
    if (report.schema !== REVIEW_SCHEMA) errors.push("Unsupported report schema");
    if (report.candidateSha !== dataset.candidateSha) errors.push("Wrong locked source SHA");
    const expected = dataset.sourceBlobSha1;
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
  const missingReviewedUnitIds = (dataset.items || []).filter(item => !reviewedIds.has(item.id)).map(item => item.id);
  for (const entry of Object.values(groups)) entry.missing = entry.total - entry.reviewed;
  const structurallyValid = errors.length === 0;
  const covered = sourceItems.size === 141 && reviewedCount === sourceItems.size;
  return {
    structurallyValid,
    errors,
    sourceSha: dataset.candidateSha,
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
