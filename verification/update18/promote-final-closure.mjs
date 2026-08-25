#!/usr/bin/env node
"use strict";

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const reportPath = path.join(ROOT, "artifacts/update-18/final-differential-integration.json");
const browserPath = path.join(ROOT, "artifacts/update-18/browser-final-differential.json");
function sha256Text(text) { return createHash("sha256").update(text).digest("hex"); }
async function sha256File(file) { return sha256Text(await readFile(file)); }
const report = JSON.parse(await readFile(reportPath, "utf8"));
const browser = JSON.parse(await readFile(browserPath, "utf8"));
if (browser.status !== "PASS") throw new Error(`browser final differential status is ${browser.status}`);
const checks = browser.checks || {};
const requiredBrowserChecks = ["browserRuntime", "workerRuntime", "standaloneRuntime"];
for (const check of requiredBrowserChecks) {
  if (checks[check] !== true) throw new Error(`missing browser closure check: ${check}`);
}
report.coverage.browserRuntime = "PASS";
report.coverage.workerRuntime = "PASS";
report.coverage.standaloneRuntime = "PASS";
report.coverage.browserEvidencePath = "artifacts/update-18/browser-final-differential.json";
report.coverage.browserVersion = browser.browserVersion || null;
report.coverage.finalClosureMissing = (report.coverage.finalClosureMissing || []).filter((item) => ![
  "browser runtime differential",
  "Worker runtime differential",
  "standalone classic-script differential",
].includes(item));
if (report.totals?.mismatches === 0 && report.totals?.errors === 0 && report.totals?.timeouts === 0 && report.coverage.finalClosureMissing.length === 0) {
  report.status = "INTEGRATION_PASS";
  report.finalClosureStatus = "INTEGRATION_PASS";
} else {
  report.status = "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
  report.finalClosureStatus = "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE";
}
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
const lines = [];
lines.push("# Update 18 final differential integration evidence", "", "## Status", "");
lines.push(`- status: \`${report.status}\``);
lines.push(`- final closure status: \`${report.finalClosureStatus}\``);
lines.push(`- real mismatches: \`${report.totals.mismatches}\``);
lines.push(`- authoritative mismatches: \`${report.totals.authoritativeMismatches}\``);
lines.push(`- fast mismatches: \`${report.totals.fastMismatches}\``);
lines.push(`- mutation detections: \`${report.totals.mutationDetections}\``);
lines.push(`- records: \`${report.totals.records}\``);
lines.push("", "## Browser closure evidence", "");
lines.push(`- browserRuntime: \`${report.coverage.browserRuntime}\``);
lines.push(`- workerRuntime: \`${report.coverage.workerRuntime}\``);
lines.push(`- standaloneRuntime: \`${report.coverage.standaloneRuntime}\``);
lines.push(`- browserVersion: \`${report.coverage.browserVersion}\``);
lines.push("", "## Remaining blockers", "");
if (report.coverage.finalClosureMissing.length === 0) lines.push("- none");
else for (const item of report.coverage.finalClosureMissing) lines.push(`- ${item}`);
lines.push("", "## Summary matrix", "");
lines.push("| feature | cases | pass | mismatch | auth mismatch | fast mismatch | errors |");
lines.push("|---|---:|---:|---:|---:|---:|---:|");
for (const row of report.summaryMatrix) lines.push(`| ${row.feature} | ${row.cases} | ${row.passRows} | ${row.mismatchRows} | ${row.authoritativeMismatch} | ${row.fastMismatch} | ${row.errors} |`);
await writeFile(path.join(ROOT, "artifacts/update-18/report.md"), `${lines.join("\n")}\n`, "utf8");
const sums = [];
for (const file of [reportPath, path.join(ROOT, "artifacts/update-18/summary-matrix.json"), path.join(ROOT, "artifacts/update-18/report.md"), browserPath]) {
  sums.push(`${await sha256File(file)}  ${path.relative(ROOT, file)}`);
}
await writeFile(path.join(ROOT, "artifacts/update-18/SHA256SUMS.txt"), `${sums.join("\n")}\n`, "utf8");
console.log(JSON.stringify({ status: report.finalClosureStatus, remaining: report.coverage.finalClosureMissing }, null, 2));
if (report.finalClosureStatus !== "INTEGRATION_PASS") process.exitCode = 2;
