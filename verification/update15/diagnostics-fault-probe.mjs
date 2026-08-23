#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import {
  beginDiagnosticOperation,
  configurePastafariDiagnostics,
  endDiagnosticOperation,
  getPastafariDiagnosticsSnapshot,
  pastafariMonotonicNow,
  resetPastafariDiagnostics,
} from "../../browser/pastafari-diagnostics.js";

const results = [];

function record(name, fn) {
  try {
    const value = fn();
    results.push({ name, status: "PASS", value });
  } catch (error) {
    results.push({ name, status: "FAIL", error: { name: error?.name ?? "Error", message: String(error?.message ?? error) } });
  }
}

record("performance.now fault is diagnostic-only", () => {
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
    const value = pastafariMonotonicNow();
    assert.equal(Number.isFinite(value), true);
    return { monotonicMs: value };
  } finally {
    Date.now = originalDateNow;
    if (originalPerformanceDescriptor) Object.defineProperty(globalThis, "performance", originalPerformanceDescriptor);
    else delete globalThis.performance;
    if (originalProcessDescriptor) Object.defineProperty(globalThis, "process", originalProcessDescriptor);
    else delete globalThis.process;
  }
});

record("WeakSet allocation fault is diagnostic-only", () => {
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
    return { traceEvents: snapshot.trace.length, operations: snapshot.operations.length };
  } finally {
    globalThis.WeakSet = originalWeakSet;
    resetPastafariDiagnostics();
    configurePastafariDiagnostics({ mode: "disabled", traceLimit: 512 });
  }
});

const status = results.every((item) => item.status === "PASS") ? "PASS" : "FAIL";
process.stdout.write(JSON.stringify({ status, results }, null, 2) + "\n");
if (status !== "PASS") process.exitCode = 1;
