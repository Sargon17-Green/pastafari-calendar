"use strict";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = process.cwd();

test("Update 18 committed differential evidence has zero real mismatches and explicit remaining browser closure blockers", async () => {
  const report = JSON.parse(await readFile(path.join(ROOT, "artifacts/update-18/final-differential-integration.json"), "utf8"));
  assert.equal(report.schema, "pastafari-update18-final-differential-integration-v2");
  assert.equal(report.policy.referenceAdjudicator, true);
  assert.equal(report.policy.noMajorityVote, true);
  assert.equal(report.policy.noExpectedFromActual, true);
  assert.equal(report.totals.mismatches, 0);
  assert.equal(report.totals.authoritativeMismatches, 0);
  assert.equal(report.totals.fastMismatches, 0);
  assert.equal(report.totals.errors, 0);
  assert.equal(report.totals.timeouts, 0);
  assert.equal(report.totals.mutationDetections, 2);
  assert.equal(report.coverage.canonicalCorpusCases, 51);
  assert.equal(report.coverage.holdoutCases, 12);
  assert.ok(report.coverage.freshUpdate18FinalTupleHoldout > 0);
  assert.ok(report.coverage.importOrderMatrix > 0);
  assert.ok(report.coverage.soakMemoryTrend > 0);
  assert.deepEqual(report.coverage.finalClosureMissing, [
    "browser runtime differential",
    "Worker runtime differential",
    "standalone classic-script differential",
  ]);
});
