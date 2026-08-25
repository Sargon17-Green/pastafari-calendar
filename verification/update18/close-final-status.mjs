#!/usr/bin/env node
"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const reportPath = path.join(ROOT, process.argv[2] || "artifacts/update-18/final-differential-integration.json");
const report = JSON.parse(await readFile(reportPath, "utf8"));
const missing = report.coverage?.finalClosureMissing || [];
const blockers = [];
if (report.totals?.mismatches !== 0) blockers.push("semantic mismatches");
if (report.totals?.errors !== 0) blockers.push("errors");
if (report.totals?.timeouts !== 0) blockers.push("timeouts");
if (missing.length) blockers.push(...missing);
const status = blockers.length ? "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE" : "INTEGRATION_PASS";
console.log(JSON.stringify({ schema: "pastafari-update18-final-status-v1", status, blockers }, null, 2));
if (status !== "INTEGRATION_PASS") process.exitCode = 2;
