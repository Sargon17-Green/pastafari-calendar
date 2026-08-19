#!/usr/bin/env node
"use strict";

import { performance } from "node:perf_hooks";
import {
  configurePastafariDiagnostics,
  resetPastafariDiagnostics,
} from "../browser/pastafari-diagnostics.js";
import {
  PastafariCalendar,
  clearFastCache,
} from "../browser/pastafari-calendar-fast.js";

const MODES = Object.freeze(["disabled", "summary", "detailed"]);
const targetJdn = 2_461_259n;
const calculationJdn = 2_461_259n;
const warmRounds = 7;
const coldRounds = 3;
const operationsPerRound = 10_000;
const calendar = new PastafariCalendar();

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function prepare(mode) {
  configurePastafariDiagnostics({ mode, traceLimit: 64 });
  resetPastafariDiagnostics();
  clearFastCache();
  calendar.convertJdn(targetJdn, { calculationJdn });
  resetPastafariDiagnostics();
}

const warmRows = [];
for (const mode of MODES) {
  prepare(mode);
  const samplesMs = [];
  for (let round = 0; round < warmRounds; round += 1) {
    const started = performance.now();
    for (let index = 0; index < operationsPerRound; index += 1) {
      calendar.convertJdn(targetJdn, { calculationJdn });
    }
    samplesMs.push(performance.now() - started);
  }
  const medianMs = median(samplesMs);
  warmRows.push({
    mode,
    rounds: warmRounds,
    operationsPerRound,
    medianMs,
    medianNsPerOperation: medianMs * 1_000_000 / operationsPerRound,
    samplesMs,
  });
}

const warmBaseline = warmRows[0].medianNsPerOperation;
for (const row of warmRows) row.ratioToDisabled = row.medianNsPerOperation / warmBaseline;

const coldRows = [];
for (const mode of MODES) {
  const samplesMs = [];
  for (let round = 0; round < coldRounds; round += 1) {
    configurePastafariDiagnostics({ mode, traceLimit: 64 });
    clearFastCache();
    resetPastafariDiagnostics();
    const started = performance.now();
    calendar.convertJdn(targetJdn, { calculationJdn });
    samplesMs.push(performance.now() - started);
  }
  const medianMs = median(samplesMs);
  coldRows.push({ mode, rounds: coldRounds, medianMs, samplesMs });
}
const coldBaseline = coldRows[0].medianMs;
for (const row of coldRows) row.ratioToDisabled = row.medianMs / coldBaseline;

configurePastafariDiagnostics({ mode: "disabled", traceLimit: 512 });
resetPastafariDiagnostics();
clearFastCache();
resetPastafariDiagnostics();

process.stdout.write(`${JSON.stringify({
  kind: "pastafari-diagnostics-overhead-v1",
  measurement: "instrumentation overhead; no pass/fail performance threshold",
  warmResultCacheHit: warmRows,
  coldFullConversion: coldRows,
}, null, 2)}\n`);
