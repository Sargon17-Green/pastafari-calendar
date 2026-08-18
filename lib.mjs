"use strict";

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";

export const SUITE_VERSION = "1";
export const ARTIFACT_DIR = resolve("artifacts/benchmarks");

export const FIXED = Object.freeze({
  foundationJdn: -13_334_246n,
  calculationJdn: 2_461_259n, // 2026-08-06 Gregorian
  targetSame: 2_461_259n,
  targetNext: 2_461_260n,
  targetYear: 2_461_625n,
  target100Years: 2_497_783n,
  target1000Years: 2_826_501n,
  checkpointEdge: 3_116_357n,
  soakCalculationJdn: 3_663_448n,
  soakTargetJdn: 3_655_101n,
  soakBoundaryJdn: 3_654_335n,
});

export const FORWARD_CASES = Object.freeze([
  Object.freeze({ id: "same-day", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.targetSame, distanceDays: 0n }),
  Object.freeze({ id: "next-day", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.targetNext, distanceDays: 1n }),
  Object.freeze({ id: "about-one-year", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.targetYear, distanceDays: 366n }),
  Object.freeze({ id: "about-100-years", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.target100Years, distanceDays: 36_524n }),
  Object.freeze({ id: "about-1000-years", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.target1000Years, distanceDays: 365_242n }),
  Object.freeze({ id: "beyond-last-checkpoint", calculationJdn: FIXED.calculationJdn, targetJdn: FIXED.checkpointEdge, distanceDays: FIXED.checkpointEdge - FIXED.calculationJdn }),
  Object.freeze({ id: "foundation", calculationJdn: FIXED.foundationJdn, targetJdn: FIXED.foundationJdn, distanceDays: 0n }),
  Object.freeze({ id: "known-soak-case", calculationJdn: FIXED.soakCalculationJdn, targetJdn: FIXED.soakTargetJdn, distanceDays: FIXED.soakCalculationJdn - FIXED.soakTargetJdn }),
  Object.freeze({ id: "known-soak-boundary", calculationJdn: FIXED.soakCalculationJdn, targetJdn: FIXED.soakBoundaryJdn, distanceDays: FIXED.soakCalculationJdn - FIXED.soakBoundaryJdn }),
]);

export function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") throw new TypeError("Benchmark received an invalid calendar result.");
  return Object.freeze({
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  });
}

export function stableJson(value) {
  return JSON.stringify(value, (_, current) => typeof current === "bigint" ? `${current}n` : current);
}

export function digest(value) {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

export function percentile(sorted, p) {
  if (sorted.length === 0) return null;
  const rank = Math.max(0, Math.ceil(p * sorted.length) - 1);
  return sorted[Math.min(rank, sorted.length - 1)];
}

export function summarize(samples) {
  const sorted = samples.slice().sort((a, b) => a - b);
  if (sorted.length === 0) return { n: 0, minMs: null, medianMs: null, p95Ms: null, maxMs: null, p95LowConfidence: true };
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return Object.freeze({
    n: sorted.length,
    minMs: sorted[0],
    medianMs: median,
    p95Ms: percentile(sorted, 0.95),
    maxMs: sorted.at(-1),
    p95LowConfidence: sorted.length < 20,
  });
}

export async function timed(fn) {
  const start = performance.now();
  const value = await fn();
  return { value, elapsedMs: performance.now() - start };
}

export async function sample({ n, warmup = 0, operation, validate }) {
  for (let i = 0; i < warmup; i += 1) {
    const value = await operation(i, true);
    await validate?.(value, i, true);
  }
  const samples = [];
  let lastValue;
  for (let i = 0; i < n; i += 1) {
    const { value, elapsedMs } = await timed(() => operation(i, false));
    await validate?.(value, i, false);
    samples.push(elapsedMs);
    lastValue = value;
  }
  return { ...summarize(samples), samplesMs: samples, checksum: digest(lastValue) };
}

export function fileSha256(path) {
  return createHash("sha256").update(readFileSync(resolve(path))).digest("hex");
}

export function packageVersion() {
  try {
    return JSON.parse(readFileSync(resolve("package.json"), "utf8")).version ?? null;
  } catch {
    return null;
  }
}

export function getCommitSha() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return process.env.GITHUB_SHA || null;
  }
}

export function environment(extra = {}) {
  const cpus = os.cpus();
  return Object.freeze({
    commitSha: getCommitSha(),
    timestamp: new Date().toISOString(),
    os: `${os.platform()} ${os.release()}`,
    architecture: os.arch(),
    cpuModel: cpus[0]?.model ?? null,
    logicalCpus: cpus.length,
    ramBytes: os.totalmem(),
    nodeVersion: process.version,
    suiteVersion: SUITE_VERSION,
    packageVersion: packageVersion(),
    debugMode: Boolean(process.execArgv.some((item) => item.includes("inspect"))),
    ...extra,
  });
}

export function fmtMs(value) {
  if (value === null || value === undefined) return "—";
  if (value < 0.001) return `${(value * 1000).toPrecision(2)} µs`;
  if (value < 1) return `${value.toPrecision(3)} ms`;
  if (value < 1000) return `${value.toFixed(value < 10 ? 2 : 1)} ms`;
  return `${(value / 1000).toFixed(2)} s`;
}

export function rowForMarkdown(row) {
  const s = row.stats ?? row;
  return `| ${row.scenario} | ${row.path} | ${s.n ?? "—"} | ${fmtMs(s.medianMs)} | ${fmtMs(s.p95Ms)} | ${fmtMs(s.maxMs)} | ${row.notes ?? ""} |`;
}

export function markdownReport(report) {
  const lines = [
    `# Pastafari benchmark report`,
    "",
    `Generated: ${report.environment.timestamp}`,
    "",
    "## Environment",
    "",
    `- Commit: \`${report.environment.commitSha ?? "unknown"}\``,
    `- OS: ${report.environment.os} (${report.environment.architecture})`,
    `- CPU: ${report.environment.cpuModel ?? "unknown"} (${report.environment.logicalCpus} logical CPUs)`,
    `- RAM: ${(report.environment.ramBytes / 2 ** 30).toFixed(1)} GiB`,
    `- Node: ${report.environment.nodeVersion}`,
    `- Browser: ${report.environment.browserVersion ?? "not used"}`,
    `- Suite version: ${report.environment.suiteVersion}`,
    `- Package version: ${report.environment.packageVersion ?? "unknown"}`,
    ...(report.environment.engineHashes ? Object.entries(report.environment.engineHashes).map(([name, hash]) => `- ${name} SHA-256: \`${hash}\``) : []),
    "",
    "## Summary",
    "",
    "| Scenario | Engine/path | n | Median | p95 | Max | Notes |",
    "|---|---|---:|---:|---:|---:|---|",
    ...report.rows.map(rowForMarkdown),
    "",
    "## Interpretation notes",
    "",
    "- `cold-process` means a fresh Node process and therefore a fresh module/cache state; the reported operation time excludes parent-process spawn latency unless a row says otherwise.",
    "- `cache-hit` rows intentionally measure cached identical lookups and must not be read as full algorithm cost.",
    "- p95 is reported for consistency, but rows with fewer than 20 samples carry low statistical confidence and must not be treated as a precise tail-latency estimate.",
    "- Browser cold/warm state and Service Worker state are stated in each Web row.",
    "",
  ];
  if (report.findings?.length) {
    lines.push("## Findings", "", ...report.findings.map((item) => `- ${item}`), "");
  }
  if (report.limitations?.length) {
    lines.push("## Limitations", "", ...report.limitations.map((item) => `- ${item}`), "");
  }
  return `${lines.join("\n")}\n`;
}

export async function writeReport(name, report) {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const jsonPath = resolve(ARTIFACT_DIR, `${name}.json`);
  const mdPath = resolve(ARTIFACT_DIR, `${name}.md`);
  await writeFile(jsonPath, `${JSON.stringify(report, (_, value) => typeof value === "bigint" ? value.toString() : value, 2)}\n`, "utf8");
  await writeFile(mdPath, markdownReport(report), "utf8");
  return { jsonPath, mdPath };
}

export async function mergeReports(names, outputName = "report") {
  const reports = [];
  for (const name of names) {
    reports.push(JSON.parse(await readFile(resolve(ARTIFACT_DIR, `${name}.json`), "utf8")));
  }
  const browserVersion = reports.map((r) => r.environment.browserVersion).find(Boolean) ?? null;
  const report = {
    kind: "combined",
    environment: environment({ browserVersion }),
    rows: reports.flatMap((r) => r.rows),
    findings: reports.flatMap((r) => r.findings ?? []),
    limitations: reports.flatMap((r) => r.limitations ?? []),
    subreports: names,
  };
  return writeReport(outputName, report);
}
