#!/usr/bin/env node
"use strict";

import { readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import {
  configurePastafariDiagnostics,
  getPastafariDiagnosticsSnapshot,
  resetPastafariDiagnostics,
} from "../browser/pastafari-diagnostics.js";
import {
  PastafariCalendar,
  clearFastCache,
  getFastCacheStats,
} from "../browser/pastafari-calendar-fast.js";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURE_PATH = path.join(REPO_ROOT, "verification", "extreme-performance-cases.json");

function parseArgs(argv) {
  const options = { caseId: null, json: false, output: null, traceLimit: 0, mode: "summary" };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (arg === "--case") {
      options.caseId = argv[++index];
      if (!options.caseId) throw new Error("--case requires EXT-xxx or all");
      continue;
    }
    if (arg.startsWith("--case=")) {
      options.caseId = arg.slice("--case=".length);
      continue;
    }
    if (arg === "--output") {
      options.output = argv[++index];
      if (!options.output) throw new Error("--output requires a path");
      continue;
    }
    if (arg.startsWith("--output=")) {
      options.output = arg.slice("--output=".length);
      continue;
    }
    if (arg.startsWith("--trace-limit=")) {
      options.traceLimit = Number(arg.slice("--trace-limit=".length));
      if (!Number.isSafeInteger(options.traceLimit) || options.traceLimit < 0) {
        throw new Error("--trace-limit must be a non-negative safe integer");
      }
      continue;
    }
    if (arg.startsWith("--mode=")) {
      options.mode = arg.slice("--mode=".length);
      if (!["disabled", "summary", "detailed"].includes(options.mode)) {
        throw new Error("--mode must be disabled, summary, or detailed");
      }
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.caseId) {
    throw new Error("Usage: node scripts/diagnose-extreme-performance.mjs --case EXT-001|all [--mode=disabled|summary|detailed] [--json] [--output PATH] [--trace-limit=N]");
  }
  return options;
}

function duration(snapshot, name) {
  return Number(snapshot.summary.durations[name]?.lastMs ?? 0);
}

function counter(snapshot, name) {
  const value = snapshot.summary.counters[name] ?? 0;
  return typeof value === "string" ? Number(value) : Number(value);
}

function cacheMetrics(snapshot, prefix) {
  return {
    hits: counter(snapshot, `${prefix}.hit`),
    misses: counter(snapshot, `${prefix}.miss`),
    insertions: counter(snapshot, `${prefix}.insertion`),
    evictions: counter(snapshot, `${prefix}.eviction`),
  };
}

function cpuMs(usage) {
  return {
    user: usage.user / 1000,
    system: usage.system / 1000,
    total: (usage.user + usage.system) / 1000,
  };
}

async function diagnoseCase(item, mode, traceLimit) {
  const effectiveMode = mode === "detailed" || traceLimit > 0 ? "detailed" : mode;
  configurePastafariDiagnostics({ mode: effectiveMode, traceLimit });
  clearFastCache();
  resetPastafariDiagnostics();

  const c = BigInt(item.calculationJdn);
  const t = BigInt(item.targetJdn);
  const calendar = new PastafariCalendar();
  const memoryBefore = process.memoryUsage();
  const cpuBefore = process.cpuUsage();
  const started = performance.now();
  const result = calendar.convertJdn(t, { calculationJdn: c }).toJSON();
  const coldElapsedMs = performance.now() - started;
  const coldCpu = cpuMs(process.cpuUsage(cpuBefore));
  const memoryAfterCold = process.memoryUsage();
  const snapshot = getPastafariDiagnosticsSnapshot();
  const cacheBeforeWarm = getFastCacheStats();

  const warmStarted = performance.now();
  const warmResult = calendar.convertJdn(t, { calculationJdn: c }).toJSON();
  const warmElapsedMs = performance.now() - warmStarted;
  const cacheAfterWarm = getFastCacheStats();

  const counters = snapshot.summary.counters;
  const gauges = snapshot.summary.gauges;
  const phaseMs = {
    findYear: duration(snapshot, "fast.find-year"),
    buildYearStructure: duration(snapshot, "fast.build-year-structure"),
    constructCutlets: duration(snapshot, "fast.construct-cutlets"),
    constructMonths: duration(snapshot, "fast.construct-months"),
    resolveCutletBoundaries: duration(snapshot, "fast.resolve-cutlet-boundaries"),
    resolveDate: duration(snapshot, "fast.resolve-date"),
    convert: duration(snapshot, "fast.convert"),
  };

  return {
    id: item.id,
    input: item,
    result,
    warmResultIdentical: JSON.stringify(result) === JSON.stringify(warmResult),
    timingMs: {
      coldElapsed: coldElapsedMs,
      warmRepeat: warmElapsedMs,
      phases: phaseMs,
    },
    cpuMs: coldCpu,
    checkpoint: {
      historicalStaticGateIndex: item.historicalStaticCheckpointGateIndex,
      historicalContainingGateIndex: item.historicalContainingGateIndex,
      historicalDistance: item.historicalCheckpointDistance,
      currentLastStaticIndex: gauges["fast.checkpoint.last.static-index"] ?? null,
      currentLastSelectedIndex: gauges["fast.checkpoint.last.selected-index"] ?? null,
      currentLastTargetIndex: gauges["fast.checkpoint.last.target-index"] ?? null,
      currentLastStaticDistance: gauges["fast.checkpoint.last.static-distance"] ?? null,
      currentLastSelectedDistance: gauges["fast.checkpoint.last.distance"] ?? null,
      currentLastSource: gauges["fast.checkpoint.last.source"] ?? null,
      staticStarts: counter(snapshot, "fast.checkpoint.static-starts"),
      cursorStarts: counter(snapshot, "fast.checkpoint.cursor-starts"),
      recurrenceSteps: counter(snapshot, "fast.checkpoint.steps"),
    },
    traversal: {
      yearsTraversed: counter(snapshot, "fast.year-traversal.steps"),
      direction: gauges["fast.year-traversal.last.direction"] ?? null,
      resolvedYear: gauges["fast.year-traversal.last.resolved-year"] ?? null,
      yearStructuresGenerated: counter(snapshot, "fast.cache.structure.insertion"),
      nextYearCandidates: counter(snapshot, "fast.year.candidates.next"),
      previousYearCandidates: counter(snapshot, "fast.year.candidates.previous"),
    },
    work: {
      gateDistanceCalls: counter(snapshot, "fast.cache.gate-distance.hit") + counter(snapshot, "fast.cache.gate-distance.miss"),
      gateDistanceMisses: counter(snapshot, "fast.cache.gate-distance.miss"),
      gatePositionCalls: counter(snapshot, "fast.cache.gate-position.hit") + counter(snapshot, "fast.cache.gate-position.miss"),
      gatePositionMisses: counter(snapshot, "fast.cache.gate-position.miss"),
      sauceCache: cacheMetrics(snapshot, "fast.cache.sauce"),
      gateDistanceCache: cacheMetrics(snapshot, "fast.cache.gate-distance"),
      gatePositionCache: cacheMetrics(snapshot, "fast.cache.gate-position"),
      structureCache: cacheMetrics(snapshot, "fast.cache.structure"),
      resultCache: cacheMetrics(snapshot, "fast.cache.result"),
    },
    resultCache: { beforeWarm: cacheBeforeWarm, afterWarm: cacheAfterWarm },
    memory: {
      rssBefore: memoryBefore.rss,
      rssAfterCold: memoryAfterCold.rss,
      heapUsedBefore: memoryBefore.heapUsed,
      heapUsedAfterCold: memoryAfterCold.heapUsed,
    },
    diagnostics: {
      mode: snapshot.mode,
      counters,
      gauges,
      operations: snapshot.operations,
      trace: snapshot.trace,
    },
    runtime: {
      node: process.version,
      v8: process.versions.v8,
      platform: process.platform,
      arch: process.arch,
      release: os.release(),
      cpus: os.availableParallelism?.() ?? os.cpus().length,
    },
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const fixture = JSON.parse(await readFile(FIXTURE_PATH, "utf8"));
  const selected = options.caseId === "all"
    ? fixture.cases
    : fixture.cases.filter((item) => item.id === options.caseId);
  if (selected.length === 0) throw new Error(`Unknown case ID: ${options.caseId}`);

  const results = [];
  for (const item of selected) results.push(await diagnoseCase(item, options.mode, options.traceLimit));
  const payload = {
    schema: 2,
    generatedAt: new Date().toISOString(),
    fixtureSource: fixture.source,
    results,
  };
  const text = `${JSON.stringify(payload, null, 2)}\n`;
  if (options.output) await writeFile(path.resolve(options.output), text, "utf8");

  if (options.json || options.output || results.length !== 1) {
    if (!options.output || options.json) process.stdout.write(text);
    return;
  }
  const row = results[0];
  process.stdout.write(
    `${row.id}: ${row.timingMs.coldElapsed.toFixed(1)} ms cold, ${row.timingMs.warmRepeat.toFixed(3)} ms warm; `
    + `${row.checkpoint.historicalDistance} historical gates beyond the static edge; `
    + `${row.checkpoint.recurrenceSteps} recurrence steps; ${row.checkpoint.cursorStarts} cursor starts; `
    + `${row.traversal.yearsTraversed} years traversed.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
