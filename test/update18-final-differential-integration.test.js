"use strict";

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = process.cwd();
const EXPECTED_BROWSER_PREREQUISITES = [
  "Worker runtime differential",
  "browser runtime differential",
  "standalone classic-script differential",
].sort();

test("Update 18 committed Node evidence has zero real mismatches and only browser closure may remain", async () => {
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

  if (report.finalClosureStatus === "INTEGRATION_PASS") {
    const browser = JSON.parse(await readFile(path.join(ROOT, "artifacts/update-18/browser-final-differential.json"), "utf8"));
    assert.equal(report.status, "INTEGRATION_PASS");
    assert.deepEqual(report.coverage.finalClosureMissing, []);
    assert.equal(report.coverage.browserRuntime, "PASS");
    assert.equal(report.coverage.workerRuntime, "PASS");
    assert.equal(report.coverage.standaloneRuntime, "PASS");
    assert.equal(report.coverage.browserEvidencePath, "artifacts/update-18/browser-final-differential.json");
    assert.equal(browser.schema, "pastafari-update18-browser-differential-final-v1");
    assert.equal(browser.status, "PASS");
    assert.deepEqual(browser.failures, []);
    assert.equal(browser.complete, true);
    assert.equal(browser.checks.browserRuntime, true);
    assert.equal(browser.checks.workerRuntime, true);
    assert.equal(browser.checks.standaloneRuntime, true);
    assert.equal(browser.checks.nodeEvidenceHasZeroMismatches, true);
    assert.equal(browser.checks.nodeEvidenceHasZeroErrors, true);
    return;
  }

  assert.equal(report.status, "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE");
  assert.equal(report.finalClosureStatus, "INTEGRATION_INCOMPLETE_MISSING_PREREQUISITE");
  assert.deepEqual([...report.coverage.finalClosureMissing].sort(), EXPECTED_BROWSER_PREREQUISITES);
  assert.match(String(report.coverage.browserRuntime), /awaiting browser evidence/i);
  assert.match(String(report.coverage.workerRuntime), /awaiting browser Worker evidence/i);
  assert.match(String(report.coverage.standaloneRuntime), /awaiting browser standalone evidence/i);
});
