#!/usr/bin/env node
"use strict";

import path from "node:path";
import { readFile } from "node:fs/promises";
import { OUT_DIR, ROOT, sha256, unzipText, writeJson } from "./lib.mjs";

const ZIP = path.join(OUT_DIR, "update19-final-evidence.zip");
const EXPECTED_ZIP_SHA256 = "4fa7d3e59b261dbfeda1f163a4f45995cda350dbb0157ac37490b6c0c43e44ed";
const AUDITED_HEAD = "0bfc42b9cd7be28528d821c72a021d3f1e7056fb";
const AUDITED_TREE = "ea72ef27b786a41ad9683b4c30bbde8c3ea6078e";

const bytes = await readFile(ZIP);
const actualHash = sha256(bytes);
const finalAudit = JSON.parse(unzipText(ZIP, "final-independent-audit.json"));
const compliance = JSON.parse(unzipText(ZIP, "FINAL-NORMATIVE-COMPLIANCE-MATRIX.json"));
const closure = JSON.parse(unzipText(ZIP, "UPDATE-01-18-CLOSURE.json"));
const report = unzipText(ZIP, "report.md");

const failures = [];
if (actualHash !== EXPECTED_ZIP_SHA256) failures.push("Update 19 evidence ZIP hash mismatch");
if (finalAudit.status !== "FINAL_AUDIT_PASS") failures.push(`Update 19 status is ${finalAudit.status}`);
if (finalAudit.releaseGate !== "UPDATE_20_ALLOWED") failures.push(`Update 19 release gate is ${finalAudit.releaseGate}`);
if ((finalAudit.blockers ?? []).length !== 0) failures.push("Update 19 blockers are non-empty");
if (compliance.rows?.length !== 27 || compliance.rows.some((row) => row.status !== "PASS")) failures.push("Update 19 compliance matrix is not 27/27 PASS");
if (closure.rows?.length !== 18 || closure.rows.some((row) => row.status !== "PASS")) failures.push("Update 19 closure matrix is not 18/18 PASS");
if (!report.includes("FINAL_AUDIT_PASS") || !report.includes("THE UPDATE SERIES IS SEMANTICALLY READY FOR RELEASE CLOSURE")) failures.push("Update 19 report lacks final PASS seal");

const artifact = {
  schema: "pastafari.update20.update19-gate.v1",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  auditedHead: AUDITED_HEAD,
  auditedTree: AUDITED_TREE,
  evidenceZip: path.relative(ROOT, ZIP).replaceAll("\\", "/"),
  expectedEvidenceSha256: EXPECTED_ZIP_SHA256,
  actualEvidenceSha256: actualHash,
  finalAuditStatus: finalAudit.status,
  releaseGate: finalAudit.releaseGate,
  normativeRequirements: { count: compliance.rows?.length ?? 0, pass: compliance.rows?.filter((row) => row.status === "PASS").length ?? 0 },
  updates01to18: { count: closure.rows?.length ?? 0, pass: closure.rows?.filter((row) => row.status === "PASS").length ?? 0 },
  failures,
};
await writeJson("update19-gate.json", artifact);
console.log(JSON.stringify(artifact, null, 2));
if (failures.length) process.exitCode = 1;
