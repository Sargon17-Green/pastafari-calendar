"use strict";

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const ROOT = process.cwd();
const OUT = path.join(os.tmpdir(), `pastafari-update18-test-${process.pid}.json`);

test("Update 18 differential integration tier reports zero real mismatches and explicit missing final closure coverage", async () => {
  const result = spawnSync(process.execPath, [
    "verification/update18/run-final-differential-integration.mjs",
    `--out=${OUT}`,
    "--gate-limit=12",
    "--sauce-limit=3",
    "--year-limit=1",
    "--external-limit=3",
  ], { cwd: ROOT, encoding: "utf8", timeout: 240_000 });

  assert.equal(result.status, 0, `Update18 harness failed\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`);
  const report = JSON.parse(await readFile(OUT, "utf8"));
  assert.equal(report.schema, "pastafari-update18-final-differential-integration-v2");
  assert.equal(report.status, "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE");
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
  assert.ok(report.coverage.positiveGateRows > 0);
  assert.ok(report.coverage.negativeGateRows > 0);
  assert.ok(report.coverage.monthWeavingRows > 0);
  assert.ok(report.coverage.externalCalendarRows > 0);
  assert.ok(report.coverage.finalClosureMissing.length > 0);
});
