"use strict";

import test from "node:test";
import assert from "node:assert/strict";

import { analyzeSeries, compareToBaseline } from "../benchmarks/memory-lib.mjs";

function series(values, baseline = 10_000_000) {
  return [
    { label: "baseline", batch: null, heapUsed: baseline },
    ...values.map((heapUsed, index) => ({ label: `batch-${index + 1}`, batch: index + 1, heapUsed })),
  ];
}

test("memory shape guard accepts a warm-up curve that reaches a plateau", () => {
  const analysis = analyzeSeries(series([
    10_600_000,
    11_000_000,
    11_150_000,
    11_210_000,
    11_220_000,
    11_225_000,
    11_221_000,
    11_226_000,
  ]), { noiseBytes: 20_000 });
  assert.equal(analysis.result, "PASS");
  assert.equal(analysis.suspectedLeak, false);
});

test("memory shape guard catches sustained approximately linear retained growth", () => {
  const analysis = analyzeSeries(series([
    11_000_000,
    12_000_000,
    13_000_000,
    14_000_000,
    15_000_000,
    16_000_000,
    17_000_000,
    18_000_000,
  ]), { noiseBytes: 20_000 });
  assert.equal(analysis.result, "FAIL");
  assert.equal(analysis.suspectedLeak, true);
  assert.ok(analysis.lateR2 > 0.99);
});

test("GC-sized jitter does not become a leak assertion", () => {
  const analysis = analyzeSeries(series([
    10_080_000,
    10_010_000,
    10_090_000,
    10_030_000,
    10_110_000,
    10_040_000,
    10_100_000,
    10_050_000,
  ]), { noiseBytes: 120_000 });
  assert.equal(analysis.result, "PASS");
});

test("base-commit comparison catches a meaningful new late-growth pattern", () => {
  const baseline = analyzeSeries(series([
    10_500_000, 10_800_000, 10_900_000, 10_930_000,
    10_940_000, 10_945_000, 10_942_000, 10_946_000,
  ]), { noiseBytes: 20_000 });
  const candidate = analyzeSeries(series([
    10_500_000, 11_000_000, 11_600_000, 12_200_000,
    12_800_000, 13_400_000, 14_000_000, 14_600_000,
  ]), { noiseBytes: 20_000 });
  const comparison = compareToBaseline(candidate, baseline);
  assert.equal(comparison.result, "FAIL");
  assert.equal(comparison.regression, true);
});
