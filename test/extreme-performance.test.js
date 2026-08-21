"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  configurePastafariDiagnostics,
  getPastafariDiagnosticsSnapshot,
  resetPastafariDiagnostics,
} from "../browser/pastafari-diagnostics.js";
import {
  PastafariCalendar,
  clearFastCache,
} from "../browser/pastafari-calendar-fast.js";

const FIXTURE_PATH = new URL("../verification/extreme-performance-cases.json", import.meta.url);

function counter(snapshot, name) {
  return Number(snapshot.summary.counters[name] ?? 0);
}

async function measuredConversion(targetJdn, calculationJdn) {
  configurePastafariDiagnostics({ mode: "summary", traceLimit: 0 });
  clearFastCache();
  resetPastafariDiagnostics();
  const calendar = new PastafariCalendar();
  const result = calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
  const snapshot = getPastafariDiagnosticsSnapshot();
  configurePastafariDiagnostics({ mode: "disabled" });
  return { result, snapshot };
}

test("extreme-performance fixtures preserve stable IDs and the historical timeout inputs", async () => {
  const fixture = JSON.parse(await readFile(FIXTURE_PATH, "utf8"));
  assert.equal(fixture.schema, 2);
  assert.equal(fixture.cases.length, 11);
  assert.equal(new Set(fixture.cases.map((item) => item.id)).size, fixture.cases.length);
  assert.deepEqual(
    fixture.cases.map((item) => item.id),
    Array.from({ length: 11 }, (_, index) => `EXT-${String(index + 1).padStart(3, "0")}`),
  );
  for (const item of fixture.cases) {
    assert.match(item.calculationJdn, /^-?\d+$/);
    assert.match(item.targetJdn, /^-?\d+$/);
    assert.equal(item.previousResult, "TIMEOUT");
    assert.ok(item.historicalCheckpointDistance > 4096);
    assert.deepEqual(item.classification, ["C", "D", "E"]);
  }
});

test("representative formerly-timeout case uses bounded cursor work and preserves its canonical result", async () => {
  const { result, snapshot } = await measuredConversion(5290529n, 5285776n);
  assert.deepEqual(result, {
    year: "5002",
    cutletName: "עקרב",
    dayInCutlet: 19,
    monthName: "באר",
    dayInMonth: 14,
  });
  assert.ok(counter(snapshot, "fast.checkpoint.cursor-starts") > 0, "cursor path was never selected");
  assert.ok(counter(snapshot, "fast.checkpoint.static-starts") < 64, "too many static restarts");
  assert.ok(counter(snapshot, "fast.checkpoint.steps") < 20_000, "recurrence work is no longer bounded near the target distance");
  assert.ok(counter(snapshot, "fast.cache.gate-distance.miss") < 10_000, "gate distances were recomputed excessively");
  assert.ok(counter(snapshot, "fast.year-traversal.steps") <= 2, "historical timeout is not a long year traversal");
});

test("cursor selection remains symmetric beyond the negative static checkpoint", async () => {
  const { snapshot } = await measuredConversion(-31_950_000n, -31_950_000n);
  assert.ok(counter(snapshot, "fast.checkpoint.cursor-starts") > 0, "negative traversal never selected the cursor");
  assert.ok(counter(snapshot, "fast.checkpoint.static-starts") < 64, "negative traversal restarted from static checkpoints excessively");
  assert.ok(counter(snapshot, "fast.checkpoint.steps") < 25_000, "negative recurrence work is unexpectedly large");
});

test("same-case second lookup is still a result-cache hit", async () => {
  configurePastafariDiagnostics({ mode: "summary", traceLimit: 0 });
  clearFastCache();
  resetPastafariDiagnostics();
  const calendar = new PastafariCalendar();
  const first = calendar.convertJdn(5290529n, { calculationJdn: 5285776n }).toJSON();
  const second = calendar.convertJdn(5290529n, { calculationJdn: 5285776n }).toJSON();
  const snapshot = getPastafariDiagnosticsSnapshot();
  configurePastafariDiagnostics({ mode: "disabled" });
  assert.deepEqual(second, first);
  assert.equal(counter(snapshot, "fast.cache.result.miss"), 1);
  assert.equal(counter(snapshot, "fast.cache.result.hit"), 1);
});

test("the soak harness terminates the final timed-out worker before continuing", async () => {
  const soakSource = await readFile(new URL("../scripts/soak-fast-engine.mjs", import.meta.url), "utf8");
  const finalTimeoutBranch = soakSource.match(
    /if \(attempt >= config\.infraRetries\) \{([\s\S]*?)return \{\s*status: "performance-timeout",/,
  );
  assert.ok(finalTimeoutBranch, "could not locate the final performance-timeout branch");
  assert.match(
    finalTimeoutBranch[1],
    /await worker\.restart\(\);/,
    "the final timed-out worker must be restarted/terminated before the harness advances",
  );
});
