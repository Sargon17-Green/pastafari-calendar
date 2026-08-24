"use strict";

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const ROOT = process.cwd();
const OUT = path.join("artifacts", "update-18", "test-final-differential-integration.json");

test("Update 18 CI differential harness has zero real mismatches and catches artificial mutations", async () => {
  const result = spawnSync(process.execPath, [
    "verification/update18/run-final-differential-integration.mjs",
    `--out=${OUT}`,
    "--canonical-limit=1",
    "--holdout-random=0",
    "--dense-radius=0",
    "--include-components=true",
    "--component-gate-limit=8",
  ], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 180_000,
  });

  assert.equal(result.status, 0, `Update 18 harness failed\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`);
  const report = JSON.parse(await readFile(path.join(ROOT, OUT), "utf8"));

  assert.equal(report.schema, "pastafari-update18-final-differential-integration-v1");
  assert.equal(report.status, "INTEGRATION_PASS");
  assert.equal(report.policy.referenceAdjudicator, true);
  assert.equal(report.policy.noMajorityVote, true);
  assert.equal(report.policy.noExpectedFromActual, true);
  assert.equal(report.policy.referenceImportsProduction, false);
  assert.equal(report.policy.productionImportsReference, false);
  assert.equal(report.totals.mismatches, 0);
  assert.equal(report.totals.authoritativeMismatches, 0);
  assert.equal(report.totals.fastMismatches, 0);
  assert.equal(report.totals.errors, 0);
  assert.equal(report.totals.timeouts, 0);
  assert.equal(report.totals.mutationDetections, 2);
  assert.ok(report.coverage.freshHoldoutCases > 0, "fresh holdout cases must be present");
  assert.equal(report.coverage.componentDeepCoverage, "RUN");
  assert.ok(report.coverage.positiveGateRows > 0, "positive gate differential rows must be present");
  assert.ok(report.coverage.negativeGateRows > 0, "negative gate differential rows must be present");
  assert.ok(report.summaryMatrix.some((row) => row.feature === "B-fresh-deterministic-holdout"));
  assert.ok(report.summaryMatrix.some((row) => row.feature === "component-sauce-final12-stirs"));
  assert.ok(report.summaryMatrix.some((row) => row.feature === "mutation-self-test"));
});
