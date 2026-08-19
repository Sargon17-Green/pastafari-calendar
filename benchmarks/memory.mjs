"use strict";

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ARTIFACT_DIR, environment, fileSha256 } from "./lib.mjs";
import { compareToBaseline, formatMiB, median } from "./memory-lib.mjs";

const SELF_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const CHILD = resolve(SELF_DIR, "memory-scenario.mjs");
const DEFAULT_CANDIDATE = "browser/pastafari-calendar-fast.js";
const CHILD_TIMEOUT_MS = Number(process.env.PASTAFARI_MEMORY_CHILD_TIMEOUT_MS || 360_000);
const MARKER = "@@MEMORY_RESULT@@";

const SMOKE_SCENARIOS = Object.freeze([
  "init-footprint",
  "repeated-identical",
  "unique-targets",
  "calculation-days",
  "calculation-cycle",
  "reverse-cancel",
]);

const SOAK_SCENARIOS = Object.freeze([
  ...SMOKE_SCENARIOS,
  "year-structure",
  "reverse-success",
  "constraints-success",
  "constraints-cancel",
  "router-state",
  "far-date",
]);

const BASELINE_PORTABLE = new Set([
  "init-footprint",
  "repeated-identical",
  "unique-targets",
  "calculation-days",
  "calculation-cycle",
  "far-date",
]);

function parseArgs(argv) {
  const options = {
    mode: "smoke",
    candidate: DEFAULT_CANDIDATE,
    baseline: null,
    repetitions: null,
    output: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (["--mode", "--candidate", "--baseline", "--repetitions", "--output"].includes(key)) {
      if (!value) throw new Error(`${key} requires a value.`);
      options[key.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${key}`);
  }
  if (!["smoke", "soak"].includes(options.mode)) throw new Error(`Unsupported mode: ${options.mode}`);
  options.repetitions = options.repetitions === null ? 3 : Number(options.repetitions);
  if (!Number.isSafeInteger(options.repetitions) || options.repetitions < 1 || options.repetitions > 9) {
    throw new Error("--repetitions must be an integer in 1..9.");
  }
  options.output ??= `memory-${options.mode}`;
  return options;
}

function runChild({ scenario, mode, engine, role }) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, [
      "--expose-gc",
      CHILD,
      "--scenario", scenario,
      "--mode", mode,
      "--engine", resolve(engine),
      "--role", role,
    ], {
      cwd: resolve("."),
      env: { ...process.env, NODE_OPTIONS: "" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      rejectPromise(new Error(`Memory scenario ${scenario}/${role} exceeded ${CHILD_TIMEOUT_MS} ms.`));
    }, CHILD_TIMEOUT_MS);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => {
      clearTimeout(timer);
      rejectPromise(error);
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (code !== 0) {
        rejectPromise(new Error(`Memory scenario ${scenario}/${role} failed (code=${code}, signal=${signal ?? "none"}).\n${stderr}\n${stdout}`));
        return;
      }
      const markerIndex = stdout.lastIndexOf(MARKER);
      if (markerIndex < 0) {
        rejectPromise(new Error(`Memory scenario ${scenario}/${role} produced no result marker.\n${stderr}\n${stdout}`));
        return;
      }
      const jsonLine = stdout.slice(markerIndex + MARKER.length).trim().split(/\r?\n/, 1)[0];
      try {
        resolvePromise(JSON.parse(jsonLine));
      } catch (error) {
        rejectPromise(new Error(`Cannot parse memory scenario ${scenario}/${role}: ${error.message}`));
      }
    });
  });
}

function stableChecksum(repetitions, scenario, role) {
  const values = [...new Set(repetitions.map((item) => item.checksum).filter(Boolean))];
  assert.ok(values.length <= 1, `${scenario}/${role} output checksum changed between identical fresh-process repetitions: ${values.join(", ")}`);
  return values[0] ?? null;
}

function aggregateAnalysis(repetitions) {
  const analyses = repetitions.map((item) => item.analysis).filter(Boolean);
  if (!analyses.length) return null;
  const fields = [
    "baselineHeapBytes",
    "finalHeapBytes",
    "totalGrowthBytes",
    "earlySlopeBytesPerBatch",
    "lateSlopeBytesPerBatch",
    "lateGrowthBytes",
    "noiseBytes",
    "allowedLateGrowthBytes",
    "lateR2",
  ];
  const out = {};
  for (const field of fields) out[field] = median(analyses.map((item) => item[field]));
  out.shapeFailureCount = analyses.filter((item) => item.result === "FAIL").length;
  out.repetitions = analyses.length;
  out.suspectedLeak = out.shapeFailureCount > Math.floor(analyses.length / 2);
  out.result = out.suspectedLeak ? "FAIL" : "PASS";
  return out;
}

function representativeRun(repetitions) {
  if (!repetitions.length) return null;
  const sorted = repetitions.slice().sort((a, b) => {
    const aFinal = a.analysis?.finalHeapBytes ?? a.points?.at(-1)?.heapUsed ?? 0;
    const bFinal = b.analysis?.finalHeapBytes ?? b.points?.at(-1)?.heapUsed ?? 0;
    return aFinal - bFinal;
  });
  return sorted[Math.floor(sorted.length / 2)];
}

function classifyScenario(candidate, baseline, comparison) {
  if (!candidate.analysis) return "INFO";
  if (comparison?.regression) return "FAIL";
  if (candidate.analysis.suspectedLeak) {
    if (baseline?.analysis?.suspectedLeak) return "BASELINE-PATTERN";
    return "FAIL";
  }
  return "PASS";
}

async function shaOrNull(path) {
  if (!path) return null;
  try {
    return fileSha256(path);
  } catch {
    return null;
  }
}

function pointRows(run) {
  if (!run?.points) return [];
  return run.points.map((point) => ({
    label: point.label,
    batch: point.batch,
    heapUsed: point.heapUsed,
    heapTotal: point.heapTotal,
    external: point.external,
    arrayBuffers: point.arrayBuffers,
    rss: point.rss,
    cache: point.cache ?? null,
    routerStates: point.routerStates ?? null,
    activeResources: point.activeResources ?? null,
  }));
}

function reportMarkdown(report) {
  const lines = [
    `# Pastafari memory ${report.mode} report`,
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
    `- V8: ${report.environment.v8Version}`,
    `- Process isolation: one fresh child process per scenario/repetition`,
    `- GC protocol: Node \`--expose-gc\`, two explicit GC cycles with event-loop turns per measurement`,
    `- Repetitions: ${report.repetitions}`,
    `- Candidate SHA-256: \`${report.candidate.sha256 ?? "unknown"}\``,
    `- Baseline SHA-256: ${report.baseline?.sha256 ? `\`${report.baseline.sha256}\`` : "not supplied"}`,
    "",
    "## Summary",
    "",
    "| Scenario | Post-init/baseline heap | Final heap | Late growth | Late slope | Noise | Baseline comparison | Result |",
    "|---|---:|---:|---:|---:|---:|---|---|",
  ];
  for (const scenario of report.scenarios) {
    const analysis = scenario.candidate.analysis;
    lines.push(`| ${scenario.scenario} | ${analysis ? formatMiB(analysis.baselineHeapBytes) : "—"} | ${analysis ? formatMiB(analysis.finalHeapBytes) : "—"} | ${analysis ? formatMiB(analysis.lateGrowthBytes) : "—"} | ${analysis ? `${(analysis.lateSlopeBytesPerBatch / 1024).toFixed(1)} KiB/batch` : "—"} | ${analysis ? formatMiB(analysis.noiseBytes) : "—"} | ${scenario.comparison ? `${formatMiB(scenario.comparison.lateGrowthDeltaBytes)} delta` : "—"} | ${scenario.result} |`);
  }
  lines.push(
    "",
    "## Cache/state architecture observed by tests",
    "",
    `- Fast result cache bound: ${report.architecture.fast?.resultCacheEntries ?? "unknown"} entries.`,
    `- Fast calculation-state LRU bound: ${report.architecture.fast?.calculationStates ?? "unknown"} calculation days.`,
    `- Per-calculation sauce cache bound: ${report.architecture.fast?.sauceEntriesPerCalculationState ?? "unknown"}; structure cache bound: ${report.architecture.fast?.structureEntriesPerCalculationState ?? "unknown"}.`,
    `- Gate caches: ${report.architecture.fast?.gateDistanceEntries ?? "unknown"} + ${report.architecture.fast?.dynamicGateEntries ?? "unknown"} entries.`,
    `- \`CalculationState.yearsByNumber\` explicit bound present: ${report.architecture.fast?.yearsByNumberBounded === false ? "no" : report.architecture.fast?.yearsByNumberBounded === true ? "yes" : "unknown"}.`,
    `- Pages Worker year-structure cache bound: ${report.architecture.pagesWorker?.yearStructureCacheEntries ?? "not exercised in this mode"} entries.`,
    "",
    "## Representative batch measurements",
    "",
  );
  for (const scenario of report.scenarios) {
    lines.push(`### ${scenario.scenario}`, "", "| Batch | heapUsed | heapTotal | external | arrayBuffers | RSS | Cache/router state |", "|---:|---:|---:|---:|---:|---:|---|");
    for (const point of scenario.candidate.representativePoints) {
      const state = point.cache ? `cache entries=${point.cache.entries}, hits=${point.cache.hits}, misses=${point.cache.misses}` : point.routerStates !== null ? `router states=${point.routerStates}` : "";
      lines.push(`| ${point.batch ?? point.label} | ${formatMiB(point.heapUsed)} | ${formatMiB(point.heapTotal)} | ${formatMiB(point.external)} | ${formatMiB(point.arrayBuffers)} | ${formatMiB(point.rss)} | ${state} |`);
    }
    lines.push("");
  }
  lines.push(
    "## Interpretation",
    "",
    "- `heapUsed` after explicit GC is the primary retained-JS-object metric. `heapTotal` and RSS are reported but are not required to return to baseline because V8 and the allocator may retain pages.",
    "- `external` and `arrayBuffers` are reported separately so TypedArray/crypto-buffer growth is not hidden outside `heapUsed`.",
    "- A shape failure requires late retained growth above a noise-calibrated/relative allowance, a positive late slope, and sufficiently linear late batches. One noisy repetition does not fail a three-process run; a majority does.",
    "- Baseline comparison, when supplied by CI, uses the base commit and candidate on the same runner. There is no version-controlled arbitrary MB baseline.",
    "- `calculation-days`, router-state, and far-date growth are informational where the workload intentionally adds bounded or architecturally retained state; stronger cache bounds are preferred over pretending that all growth is a leak.",
    "",
    "## Limitations",
    "",
    "- V8 may retain heap pages after objects become unreachable; RSS is therefore not a direct reachable-object metric.",
    "- Explicit GC reduces noise but GC timing and allocator behavior are not completely deterministic.",
    "- Passing these workloads is evidence against the tested leak patterns, not a mathematical proof that no leak exists on any path.",
    "- Browser/Worker memory is measured by the separate Chromium-specific memory report and must not be numerically compared with Node heap values.",
    "",
    `Overall: **${report.result}**`,
    "",
  );
  return `${lines.join("\n")}\n`;
}

async function main() {
  if (typeof global.gc !== "function") throw new Error("Run memory.mjs with Node --expose-gc.");
  const options = parseArgs(process.argv.slice(2));
  const scenarios = options.mode === "soak" ? SOAK_SCENARIOS : SMOKE_SCENARIOS;
  const scenarioReports = [];
  let architectureFast = null;
  let architecturePagesWorker = null;
  let overallFail = false;

  for (const scenario of scenarios) {
    const candidateRuns = [];
    const baselineRuns = [];
    process.stdout.write(`memory ${options.mode}: ${scenario}`);
    for (let repetition = 0; repetition < options.repetitions; repetition += 1) {
      candidateRuns.push(await runChild({ scenario, mode: options.mode, engine: options.candidate, role: "candidate" }));
      process.stdout.write(".");
      if (options.baseline && BASELINE_PORTABLE.has(scenario)) {
        baselineRuns.push(await runChild({ scenario, mode: options.mode, engine: options.baseline, role: "baseline" }));
        process.stdout.write("b");
      }
    }
    process.stdout.write("\n");

    const candidateChecksum = stableChecksum(candidateRuns, scenario, "candidate");
    const baselineChecksum = stableChecksum(baselineRuns, scenario, "baseline");
    if (candidateChecksum && baselineChecksum) {
      assert.equal(candidateChecksum, baselineChecksum, `${scenario}: candidate output checksum differs from base-commit engine`);
    }
    architectureFast ??= candidateRuns.find((item) => item.audit)?.audit ?? null;
    architecturePagesWorker ??= candidateRuns.find((item) => item.cacheArchitecture)?.cacheArchitecture ?? null;

    const candidateAnalysis = aggregateAnalysis(candidateRuns);
    const baselineAnalysis = aggregateAnalysis(baselineRuns);
    const comparison = candidateAnalysis && baselineAnalysis ? compareToBaseline(candidateAnalysis, baselineAnalysis) : null;
    const result = classifyScenario(
      { analysis: candidateAnalysis },
      baselineAnalysis ? { analysis: baselineAnalysis } : null,
      comparison,
    );
    if (result === "FAIL") overallFail = true;
    const candidateRepresentative = representativeRun(candidateRuns);
    const baselineRepresentative = representativeRun(baselineRuns);
    scenarioReports.push({
      scenario,
      result,
      comparison,
      candidate: {
        analysis: candidateAnalysis,
        checksum: candidateChecksum,
        elapsedMedianMs: median(candidateRuns.map((item) => item.elapsedMs)),
        workload: candidateRepresentative?.workload ?? null,
        cacheFinal: candidateRepresentative?.cacheFinal ?? null,
        classification: candidateRepresentative?.classification ?? null,
        note: candidateRepresentative?.note ?? null,
        postDispose: candidateRepresentative?.postDispose ?? null,
        estimatedRetainedBytesPerState: candidateRepresentative?.estimatedRetainedBytesPerState ?? null,
        representativePoints: pointRows(candidateRepresentative),
        runs: candidateRuns,
      },
      baseline: baselineRuns.length ? {
        analysis: baselineAnalysis,
        checksum: baselineChecksum,
        elapsedMedianMs: median(baselineRuns.map((item) => item.elapsedMs)),
        representativePoints: pointRows(baselineRepresentative),
        runs: baselineRuns,
      } : null,
    });
  }

  const firstEnvironment = scenarioReports[0]?.candidate.runs[0]?.environment ?? {};
  const report = {
    kind: "memory",
    mode: options.mode,
    repetitions: options.repetitions,
    environment: environment({
      v8Version: firstEnvironment.v8Version ?? process.versions.v8,
      gcExposed: true,
      processIsolation: "fresh child process per scenario/repetition",
      gcCyclesPerMeasurement: firstEnvironment.gcCyclesPerMeasurement ?? 2,
    }),
    candidate: {
      path: resolve(options.candidate),
      sha256: await shaOrNull(options.candidate),
    },
    baseline: options.baseline ? {
      path: resolve(options.baseline),
      sha256: await shaOrNull(options.baseline),
    } : null,
    architecture: { fast: architectureFast, pagesWorker: architecturePagesWorker },
    scenarios: scenarioReports,
    result: overallFail ? "FAIL" : "PASS",
  };

  await mkdir(ARTIFACT_DIR, { recursive: true });
  const jsonPath = resolve(ARTIFACT_DIR, `${options.output}.json`);
  const mdPath = resolve(ARTIFACT_DIR, `${options.output}.md`);
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, reportMarkdown(report), "utf8");
  console.log(`Memory ${options.mode} report: ${mdPath}`);
  if (overallFail) {
    const failed = scenarioReports.filter((item) => item.result === "FAIL").map((item) => item.scenario);
    throw new Error(`Possible retained-memory regression: ${failed.join(", ")}. See ${mdPath}.`);
  }
}

await main();
