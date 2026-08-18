"use strict";

import { appendFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

const CALCULATION_JDN = 2_461_259n; // 2026-08-06 Gregorian.
const BENCHMARK_TARGET_JDN = CALCULATION_JDN;
const REPRESENTATIVE_TARGET_JDN = CALCULATION_JDN + 137n;
const WARM_RANGE_START_JDN = CALCULATION_JDN + 1n;
const CONSECUTIVE_RANGE_START_JDN = BENCHMARK_TARGET_JDN;
const WARM_RANGE_DAYS = 180;
const CONSECUTIVE_RANGE_DAYS = 365;
const CACHED_LOOKUPS = 10_000;
const MEMORY_LOOKUPS = 1_200;
const MIB = 1024 * 1024;

const SCENARIOS = Object.freeze([
  {
    key: "benchmarkColdSameDay",
    label: "Benchmark-compatible cold same-day conversion",
    repetitions: 3,
    operations: 1,
    maxSlowdownRatio: 2.5,
    minRegressionDeltaMs: 20,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      return timeSync(() => {
        calendar.convertJdn(BENCHMARK_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
      });
    },
  },
  {
    key: "representativeForward",
    label: "Representative forward",
    repetitions: 3,
    operations: 1,
    maxSlowdownRatio: 2.5,
    minRegressionDeltaMs: 20,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      return timeSync(() => {
        calendar.convertJdn(REPRESENTATIVE_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
      });
    },
  },
  {
    key: "warmForward",
    label: "Warm forward range",
    repetitions: 3,
    operations: WARM_RANGE_DAYS,
    maxSlowdownRatio: 2.2,
    minRegressionDeltaMs: 25,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      // Build the calculation state and the year structure outside the timed region.
      calendar.convertJdn(BENCHMARK_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
      return timeSync(() => {
        moduleNamespace.convertJdnRange(WARM_RANGE_START_JDN, WARM_RANGE_DAYS, {
          calculationJdn: CALCULATION_JDN,
        });
      });
    },
  },
  {
    key: "cachedIdenticalLookup",
    label: "Cached identical lookup",
    repetitions: 3,
    operations: CACHED_LOOKUPS,
    maxSlowdownRatio: 2.5,
    minRegressionDeltaMs: 15,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      calendar.convertJdn(BENCHMARK_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
      const before = moduleNamespace.getFastCacheStats();
      if (before.entries !== 1 || before.hits !== 0 || before.misses !== 1) {
        throw new Error(`Unexpected cache state after warm-up: ${JSON.stringify(before)}`);
      }
      const elapsedMs = timeSync(() => {
        for (let index = 0; index < CACHED_LOOKUPS; index += 1) {
          calendar.convertJdn(BENCHMARK_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
        }
      });
      const after = moduleNamespace.getFastCacheStats();
      if (
        after.entries !== 1
        || after.hits - before.hits !== CACHED_LOOKUPS
        || after.misses !== before.misses
      ) {
        throw new Error(
          `Cached lookup invariant failed: before=${JSON.stringify(before)} after=${JSON.stringify(after)}`,
        );
      }
      return elapsedMs;
    },
  },
  {
    key: "consecutive365",
    label: "Consecutive 365-day workload",
    repetitions: 3,
    operations: CONSECUTIVE_RANGE_DAYS,
    maxSlowdownRatio: 2.2,
    minRegressionDeltaMs: 30,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      calendar.convertJdn(BENCHMARK_TARGET_JDN, { calculationJdn: CALCULATION_JDN });
      return timeSync(() => {
        for (let offset = 0; offset < CONSECUTIVE_RANGE_DAYS; offset += 1) {
          calendar.convertJdn(CONSECUTIVE_RANGE_START_JDN + BigInt(offset), {
            calculationJdn: CALCULATION_JDN,
          });
        }
      });
    },
  },
  {
    key: "cutletView",
    label: "Year-structure-backed cutlet view",
    repetitions: 3,
    operations: 1,
    maxSlowdownRatio: 2.3,
    minRegressionDeltaMs: 25,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      return timeSync(() => {
        moduleNamespace.getCutletView(REPRESENTATIVE_TARGET_JDN, {
          calculationJdn: CALCULATION_JDN,
        });
      });
    },
  },
  {
    key: "reverseKnownCalculation",
    label: "Reverse lookup with known calculation day",
    repetitions: 3,
    operations: 1,
    maxSlowdownRatio: 2.5,
    minRegressionDeltaMs: 25,
    async run(moduleNamespace) {
      moduleNamespace.clearFastCache();
      const calendar = new moduleNamespace.PastafariCalendar();
      const wanted = calendar
        .convertJdn(REPRESENTATIVE_TARGET_JDN, { calculationJdn: CALCULATION_JDN })
        .toJSON();
      moduleNamespace.clearFastCache();
      const start = performance.now();
      const found = await moduleNamespace.findPastafariDate(wanted, {
        calculationJdn: CALCULATION_JDN,
      });
      const elapsedMs = performance.now() - start;
      if (
        !Array.isArray(found)
        || found.length !== 1
        || found[0].targetJdn !== REPRESENTATIVE_TARGET_JDN
        || found[0].calculationJdn !== CALCULATION_JDN
      ) {
        throw new Error("Reverse smoke case did not resolve to the expected unique target.");
      }
      return elapsedMs;
    },
  },
]);

function parseArgs(argv) {
  const options = { baseline: null, candidate: null, json: null };
  for (let index = 0; index < argv.length; index += 1) {
    const name = argv[index];
    const value = argv[index + 1];
    if (name === "--baseline" || name === "--candidate" || name === "--json") {
      if (!value) throw new Error(`${name} requires a value.`);
      options[name.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${name}`);
  }
  if (!options.baseline || !options.candidate) {
    throw new Error("Usage: node --expose-gc scripts/run-performance-regression.mjs --baseline <file> --candidate <file> [--json <file>]");
  }
  return options;
}

async function importFresh(filePath, label) {
  const url = pathToFileURL(resolve(filePath));
  url.searchParams.set("performanceRegressionRole", label);
  url.searchParams.set("nonce", `${process.pid}-${Date.now()}-${Math.random()}`);
  const moduleNamespace = await import(url.href);
  const requiredExports = [
    "PastafariCalendar",
    "clearFastCache",
    "getFastCacheStats",
    "convertJdnRange",
    "getCutletView",
    "findPastafariDate",
  ];
  for (const exportName of requiredExports) {
    if (typeof moduleNamespace[exportName] !== "function") {
      throw new Error(`${filePath} does not export required function/class ${exportName}.`);
    }
  }
  return moduleNamespace;
}

function timeSync(callback) {
  const start = performance.now();
  callback();
  return performance.now() - start;
}

function median(values) {
  if (values.length === 0) throw new Error("Cannot take the median of an empty sample.");
  const sorted = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function round(value, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function forceGc() {
  if (typeof global.gc === "function") {
    global.gc();
    global.gc();
  }
}

async function sampleScenario(scenario, baseline, candidate) {
  const samples = { baseline: [], candidate: [] };
  for (let repetition = 0; repetition < scenario.repetitions; repetition += 1) {
    const order = repetition % 2 === 0
      ? [["baseline", baseline], ["candidate", candidate]]
      : [["candidate", candidate], ["baseline", baseline]];
    for (const [role, moduleNamespace] of order) {
      forceGc();
      samples[role].push(await scenario.run(moduleNamespace));
    }
  }
  return samples;
}

function summarizeScenario(scenario, samples) {
  const baselineMedianMs = median(samples.baseline);
  const candidateMedianMs = median(samples.candidate);
  const slowdownRatio = baselineMedianMs === 0 ? Infinity : candidateMedianMs / baselineMedianMs;
  const deltaMs = candidateMedianMs - baselineMedianMs;
  const regression = slowdownRatio > scenario.maxSlowdownRatio
    && deltaMs > scenario.minRegressionDeltaMs;
  const baselineThroughput = scenario.operations * 1000 / baselineMedianMs;
  const candidateThroughput = scenario.operations * 1000 / candidateMedianMs;
  return {
    key: scenario.key,
    label: scenario.label,
    repetitions: scenario.repetitions,
    operations: scenario.operations,
    baselineSamplesMs: samples.baseline.map((value) => round(value)),
    candidateSamplesMs: samples.candidate.map((value) => round(value)),
    baselineMedianMs: round(baselineMedianMs),
    candidateMedianMs: round(candidateMedianMs),
    baselineThroughputPerSecond: round(baselineThroughput),
    candidateThroughputPerSecond: round(candidateThroughput),
    slowdownRatio: round(slowdownRatio),
    deltaMs: round(deltaMs),
    thresholds: {
      maxSlowdownRatio: scenario.maxSlowdownRatio,
      minRegressionDeltaMs: scenario.minRegressionDeltaMs,
    },
    regression,
  };
}

async function measureRetainedHeap(moduleNamespace, otherModuleNamespace) {
  moduleNamespace.clearFastCache();
  otherModuleNamespace.clearFastCache();
  forceGc();
  const before = process.memoryUsage().heapUsed;
  const calendar = new moduleNamespace.PastafariCalendar();
  for (let index = 0; index < MEMORY_LOOKUPS; index += 1) {
    calendar.convertJdn(CONSECUTIVE_RANGE_START_JDN + BigInt(index), {
      calculationJdn: CALCULATION_JDN,
    });
  }
  forceGc();
  const after = process.memoryUsage().heapUsed;
  const stats = moduleNamespace.getFastCacheStats();
  if (stats.misses !== MEMORY_LOOKUPS || stats.hits !== 0) {
    throw new Error(`Memory workload cache accounting changed unexpectedly: ${JSON.stringify(stats)}`);
  }
  if (stats.entries <= 0 || stats.entries > 1024) {
    throw new Error(`Result-cache LRU bound changed unexpectedly: ${JSON.stringify(stats)}`);
  }
  const retainedBytes = Math.max(0, after - before);
  moduleNamespace.clearFastCache();
  forceGc();
  return retainedBytes;
}

async function sampleMemory(baseline, candidate) {
  const samples = { baseline: [], candidate: [] };
  for (let repetition = 0; repetition < 3; repetition += 1) {
    const order = repetition % 2 === 0
      ? [["baseline", baseline, candidate], ["candidate", candidate, baseline]]
      : [["candidate", candidate, baseline], ["baseline", baseline, candidate]];
    for (const [role, moduleNamespace, other] of order) {
      samples[role].push(await measureRetainedHeap(moduleNamespace, other));
    }
  }
  const baselineMedianBytes = median(samples.baseline);
  const candidateMedianBytes = median(samples.candidate);
  const ratio = baselineMedianBytes === 0
    ? (candidateMedianBytes === 0 ? 1 : Infinity)
    : candidateMedianBytes / baselineMedianBytes;
  const deltaBytes = candidateMedianBytes - baselineMedianBytes;
  const regression = ratio > 2.5 && deltaBytes > 24 * MIB;
  return {
    label: "Retained heap after 1,200 unique cached lookups",
    repetitions: 3,
    baselineSamplesMiB: samples.baseline.map((value) => round(value / MIB)),
    candidateSamplesMiB: samples.candidate.map((value) => round(value / MIB)),
    baselineMedianMiB: round(baselineMedianBytes / MIB),
    candidateMedianMiB: round(candidateMedianBytes / MIB),
    ratio: round(ratio),
    deltaMiB: round(deltaBytes / MIB),
    thresholds: {
      maxRatio: 2.5,
      minRegressionDeltaMiB: 24,
    },
    regression,
  };
}

function markdownReport(report) {
  const lines = [
    "### JavaScript performance regression sentinel",
    "",
    `Baseline: \`${report.baseline}\``,
    `Candidate: \`${report.candidate}\``,
    "",
    "| Scenario | Baseline median | Candidate median | Slowdown | Baseline throughput | Candidate throughput | Result |",
    "|---|---:|---:|---:|---:|---:|---|",
  ];
  for (const metric of report.metrics) {
    lines.push(
      `| ${metric.label} | ${metric.baselineMedianMs} ms | ${metric.candidateMedianMs} ms | ${metric.slowdownRatio}× | ${metric.baselineThroughputPerSecond}/s | ${metric.candidateThroughputPerSecond}/s | ${metric.regression ? "FAIL" : "PASS"} |`,
    );
  }
  lines.push(
    "",
    `Memory: baseline ${report.memory.baselineMedianMiB} MiB, candidate ${report.memory.candidateMedianMiB} MiB, ratio ${report.memory.ratio}× — ${report.memory.regression ? "FAIL" : "PASS"}.`,
    "",
    `Overall: **${report.regressions.length === 0 ? "PASS" : "FAIL"}**`,
  );
  if (report.regressions.length > 0) {
    lines.push("", `Flagged: ${report.regressions.join(", ")}`);
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [baseline, candidate] = await Promise.all([
    importFresh(args.baseline, "baseline"),
    importFresh(args.candidate, "candidate"),
  ]);

  // One untimed probe per implementation keeps module parsing and first-use JIT
  // effects out of the measured scenarios without pre-warming their caches.
  for (const moduleNamespace of [baseline, candidate]) {
    moduleNamespace.clearFastCache();
    const calendar = new moduleNamespace.PastafariCalendar();
    calendar.convertJdn(CALCULATION_JDN, { calculationJdn: CALCULATION_JDN });
    moduleNamespace.clearFastCache();
  }

  const metrics = [];
  for (const scenario of SCENARIOS) {
    const samples = await sampleScenario(scenario, baseline, candidate);
    metrics.push(summarizeScenario(scenario, samples));
  }
  const memory = await sampleMemory(baseline, candidate);
  const regressions = metrics.filter((metric) => metric.regression).map((metric) => metric.label);
  if (memory.regression) regressions.push(memory.label);

  const report = {
    schemaVersion: 1,
    environmentClass: "same-run-github-actions-linux-x64",
    baseline: resolve(args.baseline),
    candidate: resolve(args.candidate),
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    constants: {
      calculationJdn: CALCULATION_JDN.toString(),
      benchmarkTargetJdn: BENCHMARK_TARGET_JDN.toString(),
      representativeTargetJdn: REPRESENTATIVE_TARGET_JDN.toString(),
      warmRangeDays: WARM_RANGE_DAYS,
      consecutiveRangeDays: CONSECUTIVE_RANGE_DAYS,
      cachedLookups: CACHED_LOOKUPS,
      memoryLookups: MEMORY_LOOKUPS,
    },
    metrics,
    memory,
    regressions,
  };

  if (args.json) {
    await writeFile(args.json, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }
  const markdown = markdownReport(report);
  console.log(markdown);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown, "utf8");
  }
  if (regressions.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
