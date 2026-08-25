#!/usr/bin/env node
"use strict";

import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { OUT_DIR, ROOT, requireRun, sha256File, writeJson } from "./lib.mjs";

requireRun(process.execPath, ["scripts/run-update19-browser-audit.mjs"], { timeoutMs: 30 * 60_000 });
const sourcePath = path.join(ROOT, "artifacts/update-19/browser-worker-standalone-parity.json");
const source = JSON.parse(await readFile(sourcePath, "utf8"));
const failures = [];
if (source.status !== "PASS") failures.push(`browser audit status ${source.status}`);
if ((source.failures ?? []).length) failures.push("browser audit contains failures");
if ((source.pageErrors ?? []).length) failures.push("browser audit contains page errors");
const artifact = {
  schema: "pastafari.update20.browser-worker-standalone-seal.v1",
  generatedAt: new Date().toISOString(),
  status: failures.length ? "FAIL" : "PASS",
  packageVersion: "1.4.0",
  sourceAudit: source,
  hashes: {
    browserFast: await sha256File("browser/pastafari-calendar-fast.js"),
    authoritativeWorker: await sha256File("browser/pastafari-authoritative-worker.js"),
    fastWorker: await sha256File("browser/pastafari-fast-worker.js"),
    standalone: await sha256File("browser/standalone/pastafari-date.js"),
    standaloneMin: await sha256File("browser/standalone/pastafari-date.min.js"),
  },
  failures,
};
await writeJson("browser-worker-standalone-seal.json", artifact);
console.log(JSON.stringify({ status: artifact.status, hashes: artifact.hashes }, null, 2));
if (failures.length) process.exitCode = 1;
