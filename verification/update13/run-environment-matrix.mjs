#!/usr/bin/env node
"use strict";

import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PROBE = path.join(ROOT, "verification/update13/normative-probe.mjs");
const OUT = path.join(ROOT, "artifacts/update-13-environment-matrix.json");
const BASE = { ...process.env };
const cases = [];

for (const mode of ["normal", "throw", "fake-parts", "wrong-values", "alien-names"]) {
  cases.push({ kind: "intl", label: mode, env: { UPDATE13_INTL_MODE: mode, TZ: "UTC", LANG: "en", LC_ALL: "en" } });
}
for (const locale of ["en", "he", "ar", "zh", "fa", "ja"]) {
  cases.push({ kind: "locale", label: locale, env: { UPDATE13_INTL_MODE: "normal", TZ: "UTC", LANG: locale, LC_ALL: locale } });
}
for (const timezone of ["UTC", "Asia/Jerusalem", "America/New_York", "Asia/Shanghai"]) {
  cases.push({ kind: "timezone", label: timezone, env: { UPDATE13_INTL_MODE: "normal", TZ: timezone, LANG: "en", LC_ALL: "en" } });
}

const rows = [];
for (const item of cases) {
  const started = Date.now();
  const child = spawnSync(process.execPath, [PROBE], {
    cwd: ROOT,
    env: { ...BASE, ...item.env },
    encoding: "utf8",
    timeout: 120_000,
    maxBuffer: 4 * 1024 * 1024,
  });
  let payload = null;
  let parseError = null;
  try { payload = JSON.parse(child.stdout || "null"); } catch (error) { parseError = error.message; }
  rows.push({
    kind: item.kind,
    label: item.label,
    env: item.env,
    durationMs: Date.now() - started,
    exitStatus: child.status,
    signal: child.signal,
    stderr: child.stderr?.trim() || null,
    parseError,
    probeStatus: payload?.status ?? null,
    intlCalls: payload?.intlCalls ?? null,
    outputs: payload?.outputs ?? null,
    structured: payload?.structured ?? null,
    reference: payload?.reference ?? null,
    failed: payload?.failed ?? null,
    referenceFailed: payload?.referenceFailed ?? null,
  });
}

const normal = rows.find((row) => row.kind === "intl" && row.label === "normal");
const canonicalOutputs = JSON.stringify(normal?.outputs ?? null);
const canonicalStructured = JSON.stringify(normal?.structured ?? null);
for (const row of rows) {
  row.outputsEqualNormal = JSON.stringify(row.outputs) === canonicalOutputs;
  row.structuredEqualNormal = JSON.stringify(row.structured) === canonicalStructured;
}

const failures = rows.filter((row) =>
  row.exitStatus !== 0 || row.probeStatus !== "PASS" || !row.outputsEqualNormal || !row.structuredEqualNormal,
);
const report = {
  schema: "pastafari-update13-environment-matrix-v1",
  baselineCommit: "d8361bf852f54597f62daeaa293443e5c5d9ef84",
  caseCount: rows.length,
  rows,
  counts: {
    intl: rows.filter((row) => row.kind === "intl").length,
    locale: rows.filter((row) => row.kind === "locale").length,
    timezone: rows.filter((row) => row.kind === "timezone").length,
    failures: failures.length,
  },
  status: failures.length === 0 ? "PASS" : "FAIL",
};
await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ status: report.status, counts: report.counts }, null, 2));
if (failures.length) process.exitCode = 1;
