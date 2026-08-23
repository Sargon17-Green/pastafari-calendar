"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  beginDiagnosticOperation,
  configurePastafariDiagnostics,
  endDiagnosticOperation,
  getPastafariDiagnosticsSnapshot,
  pastafariMonotonicNow,
  resetPastafariDiagnostics,
} from "../browser/pastafari-diagnostics.js";

const SOURCE = "src/5efdcc3e6fb071cbaffdcb117507a169dd76.js";
const CHRONICLE = "browser/pastafari-calendar-core-chronicle.js";
const DIAGNOSTICS = "browser/pastafari-diagnostics.js";

test("Update 15 outer arena guard is present in authoritative generated sources", () => {
  for (const file of [SOURCE, CHRONICLE]) {
    const text = readFileSync(file, "utf8");
    assert.match(text, /__pastafariUpdate15OuterArenaBase/);
    assert.match(text, /U15D/);
    assert.match(text, /U15E/);
    assert.match(text, /__pastafariUpdate15OuterArenaError/);
  }
});

test("Update 15 diagnostics ash bucket guard is present", () => {
  const text = readFileSync(DIAGNOSTICS, "utf8");
  assert.match(text, /UPDATE15_SEEN_ASH_BUCKET/);
  assert.match(text, /performance\.now/);
  assert.match(text, /Date\.now/);
});

test("diagnostics clock faults remain diagnostic-only", () => {
  const originalPerformanceDescriptor = Object.getOwnPropertyDescriptor(globalThis, "performance");
  const originalProcessDescriptor = Object.getOwnPropertyDescriptor(globalThis, "process");
  const originalDateNow = Date.now;
  try {
    Object.defineProperty(globalThis, "performance", {
      configurable: true,
      value: { now() { throw new Error("UPDATE15_PERFORMANCE_NOW_FAULT"); } },
    });
    Object.defineProperty(globalThis, "process", {
      configurable: true,
      value: { hrtime: { bigint() { throw new Error("UPDATE15_HRTIME_FAULT"); } } },
    });
    Date.now = () => { throw new Error("UPDATE15_DATE_NOW_FAULT"); };
    assert.doesNotThrow(() => pastafariMonotonicNow());
  } finally {
    Date.now = originalDateNow;
    if (originalPerformanceDescriptor) Object.defineProperty(globalThis, "performance", originalPerformanceDescriptor);
    else delete globalThis.performance;
    if (originalProcessDescriptor) Object.defineProperty(globalThis, "process", originalProcessDescriptor);
    else delete globalThis.process;
  }
});

test("diagnostics WeakSet allocation faults remain diagnostic-only", () => {
  const originalWeakSet = globalThis.WeakSet;
  try {
    globalThis.WeakSet = class Update15ThrowingWeakSet {
      constructor() { throw new Error("UPDATE15_WEAKSET_ALLOCATION_FAULT"); }
    };
    configurePastafariDiagnostics({ mode: "detailed", traceLimit: 8 });
    resetPastafariDiagnostics();
    const circular = { label: "root" };
    circular.self = circular;
    const operation = beginDiagnosticOperation("update15", "weakset-fault", { circular });
    endDiagnosticOperation(operation, "ok", { circular });
    const snapshot = getPastafariDiagnosticsSnapshot();
    assert.equal(snapshot.mode, "detailed");
    assert.equal(snapshot.trace.length > 0, true);
  } finally {
    globalThis.WeakSet = originalWeakSet;
    resetPastafariDiagnostics();
    configurePastafariDiagnostics({ mode: "disabled", traceLimit: 512 });
  }
});
