"use strict";

import os from "node:os";

export const MEMORY_SCENARIO_VERSION = 1;
export const MIB = 2 ** 20;

export function requireExposedGc() {
  if (typeof global.gc !== "function") {
    throw new Error("Memory measurements require Node --expose-gc.");
  }
}

export function activeResourceCounts() {
  if (typeof process.getActiveResourcesInfo !== "function") return null;
  const counts = {};
  for (const name of process.getActiveResourcesInfo()) counts[name] = (counts[name] || 0) + 1;
  return counts;
}

export async function settleEventLoop() {
  await new Promise((resolve) => setImmediate(resolve));
  await Promise.resolve();
}

export async function forceGc(cycles = 2) {
  requireExposedGc();
  for (let index = 0; index < cycles; index += 1) {
    await settleEventLoop();
    global.gc();
  }
  await settleEventLoop();
}

export function memoryPoint(label, batch = null, extra = {}) {
  const usage = process.memoryUsage();
  return {
    label,
    batch,
    heapUsed: usage.heapUsed,
    heapTotal: usage.heapTotal,
    rss: usage.rss,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers ?? null,
    activeResources: activeResourceCounts(),
    ...extra,
  };
}

export async function postGcPoint(label, batch = null, extra = {}, cycles = 2) {
  await forceGc(cycles);
  return memoryPoint(label, batch, extra);
}

export function median(values) {
  if (!values.length) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function mad(values) {
  if (!values.length) return null;
  const center = median(values);
  return median(values.map((value) => Math.abs(value - center)));
}

export function linearRegression(points, key = "heapUsed") {
  const samples = points
    .filter((point) => Number.isFinite(point.batch) && Number.isFinite(point[key]))
    .map((point) => ({ x: Number(point.batch), y: Number(point[key]) }));
  if (samples.length < 2) return { slope: 0, intercept: samples[0]?.y ?? 0, r2: 0 };
  const meanX = samples.reduce((sum, item) => sum + item.x, 0) / samples.length;
  const meanY = samples.reduce((sum, item) => sum + item.y, 0) / samples.length;
  let covariance = 0;
  let varianceX = 0;
  for (const item of samples) {
    covariance += (item.x - meanX) * (item.y - meanY);
    varianceX += (item.x - meanX) ** 2;
  }
  const slope = varianceX === 0 ? 0 : covariance / varianceX;
  const intercept = meanY - slope * meanX;
  let residual = 0;
  let total = 0;
  for (const item of samples) {
    const predicted = intercept + slope * item.x;
    residual += (item.y - predicted) ** 2;
    total += (item.y - meanY) ** 2;
  }
  return { slope, intercept, r2: total === 0 ? 1 : Math.max(0, 1 - residual / total) };
}

export function analyzeSeries(points, options = {}) {
  const baseline = points.find((point) => point.label === "baseline") ?? points[0];
  const batches = points.filter((point) => Number.isFinite(point.batch));
  if (!baseline || batches.length < 4) {
    throw new Error("A memory series needs a baseline and at least four batch measurements.");
  }
  const lateCount = Math.max(3, Math.min(options.lateBatches ?? 4, Math.floor(batches.length / 2)));
  const early = batches.slice(0, lateCount);
  const late = batches.slice(-lateCount);
  const earlyFit = linearRegression(early, "heapUsed");
  const lateFit = linearRegression(late, "heapUsed");
  const lateGrowthBytes = late.at(-1).heapUsed - late[0].heapUsed;
  const totalGrowthBytes = batches.at(-1).heapUsed - baseline.heapUsed;
  const noiseBytes = Math.max(0, Number(options.noiseBytes ?? 0));
  const relativeAllowance = baseline.heapUsed * Number(options.relativeAllowance ?? 0.08);
  const allowedLateGrowthBytes = Math.max(relativeAllowance, noiseBytes * Number(options.noiseMultiplier ?? 8));
  const linearEnough = lateFit.r2 >= Number(options.minimumLeakR2 ?? 0.72);
  const continuesAtMeaningfulRate = lateFit.slope > 0 && (
    earlyFit.slope <= 0 || lateFit.slope >= earlyFit.slope * Number(options.minimumLateToEarlyRatio ?? 0.25)
  );
  const suspectedLeak = options.gate === false ? false : (
    lateGrowthBytes > allowedLateGrowthBytes && linearEnough && continuesAtMeaningfulRate
  );
  const runaway = options.gate === false ? false : batches.at(-1).heapUsed > baseline.heapUsed * Number(options.runawayFactor ?? 8);
  return {
    baselineHeapBytes: baseline.heapUsed,
    finalHeapBytes: batches.at(-1).heapUsed,
    totalGrowthBytes,
    earlySlopeBytesPerBatch: earlyFit.slope,
    earlyR2: earlyFit.r2,
    lateSlopeBytesPerBatch: lateFit.slope,
    lateR2: lateFit.r2,
    lateGrowthBytes,
    noiseBytes,
    allowedLateGrowthBytes,
    suspectedLeak,
    runaway,
    result: suspectedLeak || runaway ? "FAIL" : "PASS",
  };
}

export async function calibrateGcNoise(samples = 4, cycles = 2) {
  const points = [];
  for (let index = 0; index < samples; index += 1) {
    points.push(await postGcPoint(`noise-${index + 1}`, null, {}, cycles));
  }
  const heap = points.map((point) => point.heapUsed);
  const external = points.map((point) => point.external);
  const arrayBuffers = points.map((point) => point.arrayBuffers ?? 0);
  return {
    points,
    heapRangeBytes: Math.max(...heap) - Math.min(...heap),
    heapMadBytes: mad(heap) ?? 0,
    externalRangeBytes: Math.max(...external) - Math.min(...external),
    arrayBufferRangeBytes: Math.max(...arrayBuffers) - Math.min(...arrayBuffers),
  };
}

export function compareToBaseline(candidate, baseline, options = {}) {
  if (!baseline) return null;
  const baselineLate = Math.max(0, baseline.lateGrowthBytes);
  const candidateLate = Math.max(0, candidate.lateGrowthBytes);
  const noiseFloor = Math.max(candidate.noiseBytes, baseline.noiseBytes, 1);
  const allowedDelta = Math.max(
    noiseFloor * Number(options.noiseMultiplier ?? 8),
    Math.max(baseline.baselineHeapBytes, candidate.baselineHeapBytes) * Number(options.relativeAllowance ?? 0.08),
  );
  const lateGrowthDeltaBytes = candidateLate - baselineLate;
  const lateSlopeRatio = baseline.lateSlopeBytesPerBatch > noiseFloor
    ? candidate.lateSlopeBytesPerBatch / baseline.lateSlopeBytesPerBatch
    : null;
  const regression = lateGrowthDeltaBytes > allowedDelta
    && candidate.lateR2 >= Number(options.minimumLeakR2 ?? 0.72)
    && candidate.lateSlopeBytesPerBatch > 0;
  return {
    baselineLateGrowthBytes: baselineLate,
    candidateLateGrowthBytes: candidateLate,
    lateGrowthDeltaBytes,
    allowedDeltaBytes: allowedDelta,
    lateSlopeRatio,
    regression,
    result: regression ? "FAIL" : "PASS",
  };
}

export function formatMiB(bytes) {
  if (bytes === null || bytes === undefined) return "—";
  return `${(bytes / MIB).toFixed(2)} MiB`;
}

export function memoryEnvironment(extra = {}) {
  const cpus = os.cpus();
  return {
    timestamp: new Date().toISOString(),
    os: `${os.platform()} ${os.release()}`,
    architecture: os.arch(),
    cpuModel: cpus[0]?.model ?? null,
    logicalCpus: cpus.length,
    ramBytes: os.totalmem(),
    nodeVersion: process.version,
    v8Version: process.versions.v8,
    execArgv: process.execArgv.slice(),
    gcExposed: typeof global.gc === "function",
    scenarioVersion: MEMORY_SCENARIO_VERSION,
    ...extra,
  };
}
