"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

import {
  PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION,
  PASTAFARI_DIAGNOSTIC_OUTCOMES,
  beginDiagnosticOperation,
  configurePastafariDiagnostics,
  endDiagnosticOperation,
  getPastafariDiagnosticsSnapshot,
  incrementDiagnosticCounter,
  mergePastafariDiagnosticsSnapshot,
  resetPastafariDiagnostics,
  setDiagnosticGauge,
} from "../browser/pastafari-diagnostics.js";
import * as fast from "../browser/pastafari-calendar-fast.js";
import { PastafariCalendarRouterCore } from "../browser/pastafari-calendar-router-core.js";
import { PastafariEngineClient } from "../browser/pastafari-engine-client.js";
import { solvePastafariConstraintsDirect } from "../browser/pastafari-constraints.js";

const TARGET_JDN = 2_461_259n;
const CALCULATION_JDN = 2_461_259n;

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function reset(mode = "disabled", traceLimit = 512) {
  configurePastafariDiagnostics({ mode, traceLimit });
  resetPastafariDiagnostics();
  fast.clearFastCache();
  resetPastafariDiagnostics(); // clearing the engine is not part of the measurement
}

test("diagnostics are disabled by default and the schema is JSON serializable", () => {
  reset("disabled");
  const calendar = new fast.PastafariCalendar();
  calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.schemaVersion, PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION);
  assert.equal(snapshot.mode, "disabled");
  assert.deepEqual(snapshot.summary.counters, {});
  assert.deepEqual(snapshot.summary.durations, {});
  assert.deepEqual(snapshot.operations, []);
  assert.deepEqual(snapshot.trace, []);
  assert.doesNotThrow(() => JSON.stringify(snapshot));
});

test("counter serialization preserves integers beyond Number safe range", () => {
  reset("summary");
  incrementDiagnosticCounter("test.big-counter", BigInt(Number.MAX_SAFE_INTEGER) + 7n);
  incrementDiagnosticCounter("test.big-counter", 3);
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["test.big-counter"], "9007199254741001");
  assert.doesNotThrow(() => JSON.stringify(snapshot));
});

test("summary mode records cache hit/miss and detailed trace stays bounded", () => {
  const calendar = new fast.PastafariCalendar();
  reset("summary");
  calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
  calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
  let snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["fast.cache.result.miss"], 1);
  assert.equal(snapshot.summary.counters["fast.cache.result.hit"], 1);
  assert.equal(snapshot.trace.length, 0);

  reset("detailed", 5);
  for (let index = 0; index < 8; index += 1) {
    calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
  }
  snapshot = getPastafariDiagnosticsSnapshot();
  assert.ok(snapshot.trace.length <= 5);
  assert.ok(snapshot.trace.length > 0);
  for (let index = 1; index < snapshot.trace.length; index += 1) {
    assert.ok(snapshot.trace[index - 1].sequence < snapshot.trace[index].sequence);
  }
  assert.doesNotThrow(() => JSON.stringify(snapshot));
});



test("summary metric keys and child snapshots are bounded", () => {
  reset("summary");
  for (let index = 0; index < 700; index += 1) {
    incrementDiagnosticCounter(`external.counter.${index}`);
    setDiagnosticGauge(`external.gauge.${index}`, index);
  }
  const child = {
    schemaVersion: PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION,
    mode: "summary",
    traceLimit: 0,
    summary: { counters: {}, durations: {}, gauges: {} },
    trace: [],
  };
  for (let index = 0; index < 40; index += 1) {
    mergePastafariDiagnosticsSnapshot(`worker-${index}`, child);
  }
  for (let index = 0; index < 80; index += 1) {
    const token = beginDiagnosticOperation("test", `bounded-${index}`);
    endDiagnosticOperation(token, "ok");
  }
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.ok(Object.keys(snapshot.summary.counters).length <= snapshot.limits.maxMetricKeysPerKind);
  assert.ok(Object.keys(snapshot.summary.gauges).length <= snapshot.limits.maxMetricKeysPerKind);
  assert.ok(Object.keys(snapshot.children).length <= snapshot.limits.maxChildSnapshots);
  assert.equal(snapshot.operations.length, snapshot.limits.maxOperationRecords);
  assert.equal(snapshot.operations.at(-1).operation, "bounded-79");
  assert.ok(!snapshot.operations.some((operation) => operation.operation === "bounded-0"));
  assert.ok(snapshot.summary.droppedMetricKeys > 0);
  assert.ok(snapshot.summary.droppedChildSnapshots > 0);
  for (const operation of snapshot.operations) {
    assert.ok(PASTAFARI_DIAGNOSTIC_OUTCOMES.includes(operation.outcome));
    assert.ok(Number.isFinite(operation.durationMs) && operation.durationMs >= 0);
  }
  assert.doesNotThrow(() => JSON.stringify(snapshot));
});

test("calculation-day changes are visible as distinct cache scopes", () => {
  const calendar = new fast.PastafariCalendar();
  reset("summary");
  calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
  calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN + 1n });
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["fast.cache.calculation-state.miss"], 2);
  assert.equal(snapshot.summary.counters["fast.cache.calculation-state.insertion"], 2);
  assert.equal(snapshot.summary.gauges["fast.cache.calculation-state.size"], 2);
  assert.equal(snapshot.summary.counters["fast.cache.result.miss"], 2);
});

test("diagnostics do not change deterministic fast-engine results", () => {
  const calendar = new fast.PastafariCalendar();
  const results = [];
  for (const mode of ["disabled", "summary", "detailed"]) {
    reset(mode, 32);
    results.push(canonical(calendar.convertJdn(TARGET_JDN + 137n, {
      calculationJdn: CALCULATION_JDN,
    })));
  }
  assert.deepEqual(results[1], results[0]);
  assert.deepEqual(results[2], results[0]);
});

function value(targetJdn, calculationJdn) {
  return {
    year: "5000",
    cutletName: "x",
    dayInCutlet: Number(targetJdn % 3n + 1n),
    monthName: "m",
    dayInMonth: Number(calculationJdn % 29n + 1n),
  };
}

function view(targetJdn, calculationJdn) {
  const startJdn = targetJdn - (targetJdn % 3n);
  const days = [0n, 1n, 2n].map((offset) => ({
    jdn: startJdn + offset,
    ...value(startJdn + offset, calculationJdn),
    dayInCutlet: Number(offset + 1n),
  }));
  return {
    startJdn,
    endJdn: startJdn + 2n,
    previousCutletJdn: startJdn - 1n,
    nextCutletJdn: startJdn + 3n,
    days,
  };
}

class StubClient {
  constructor(name) {
    this.name = name;
    this.failConvert = false;
  }
  async request(operation, payload) {
    if (this.name === "fast" && operation === "convert" && this.failConvert) {
      const error = new Error("intentional fast timeout");
      error.name = "TimeoutError";
      error.code = "ERR_ENGINE_TIMEOUT";
      throw error;
    }
    if (operation === "convert") return value(payload.targetJdn, payload.calculationJdn);
    if (operation === "getCutletView") return view(payload.targetJdn, payload.calculationJdn);
    if (operation === "convertJdnRange") {
      return Array.from({ length: payload.count }, (_, index) => (
        value(payload.startJdn + BigInt(index), payload.calculationJdn)
      ));
    }
    throw new Error(`unsupported ${operation}`);
  }
  terminate() {}
}

test("router records a stable fallback reason code", async () => {
  reset("summary");
  const authoritative = new StubClient("authoritative");
  const fastClient = new StubClient("fast");
  const router = new PastafariCalendarRouterCore({
    authoritativeClient: authoritative,
    fastClient,
    authoritativeIdleShutdownMs: 1_000_000,
  });
  const c = 900n;
  await router.convert(102n, c);
  for (let i = 0; i < 100 && router.getStatus(c).status !== "verified"; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  assert.equal(router.getStatus(c).status, "verified");
  fastClient.failConvert = true;
  assert.deepEqual(await router.convert(105n, c), value(105n, c));
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["router.fallback.engine-timeout"], 1);
  const fallbackOperation = snapshot.operations.find((operation) => (
    operation.subsystem === "router"
    && operation.operation === "convert"
    && operation.end?.fallbackOccurred === true
  ));
  assert.ok(fallbackOperation);
  assert.equal(fallbackOperation.end.fallbackReason, "engine-timeout");
  assert.equal(fallbackOperation.end.actualEngine, "authoritative");
  router.dispose();
});

test("engine-client Worker timeout is diagnosed without changing the thrown error", async () => {
  reset("summary");
  class HangingWorker {
    constructor() {
      this.listeners = new Map();
      queueMicrotask(() => this.emit("message", { data: { kind: "ready" } }));
    }
    addEventListener(type, listener) {
      const set = this.listeners.get(type) ?? new Set();
      set.add(listener);
      this.listeners.set(type, set);
    }
    postMessage() {}
    terminate() {}
    emit(type, event) { for (const listener of this.listeners.get(type) ?? []) listener(event); }
  }
  const client = new PastafariEngineClient("diagnostic-test", {
    workerFactory: () => new HangingWorker(),
    requestTimeoutMs: 10,
    startupTimeoutMs: 100,
  });
  await assert.rejects(
    client.request("convert", { targetJdn: 1n, calculationJdn: 1n }),
    (error) => error?.name === "TimeoutError" && error?.code === "ERR_ENGINE_TIMEOUT",
  );
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["engine-client.diagnostic-test.timeouts"], 1);
  assert.ok(snapshot.summary.counters["engine-client.diagnostic-test.terminations"] >= 1);
  const timedOut = snapshot.operations.find((operation) => (
    operation.subsystem === "engine-client"
    && operation.operation === "diagnostic-test:convert"
    && operation.outcome === "timeout"
  ));
  assert.ok(timedOut);
  assert.equal(timedOut.end.phase, "worker-round-trip");
  assert.equal(timedOut.end.timeoutMs, 10);
  client.terminate();
});


test("engine-client merges a bounded Worker diagnostics child report", async () => {
  reset("summary");
  class ReportingWorker {
    constructor() {
      this.listeners = new Map();
      queueMicrotask(() => this.emit("message", { data: { kind: "ready" } }));
    }
    addEventListener(type, listener) {
      const set = this.listeners.get(type) ?? new Set();
      set.add(listener);
      this.listeners.set(type, set);
    }
    postMessage(message) {
      queueMicrotask(() => this.emit("message", { data: {
        id: message.id,
        ok: true,
        result: { value: 1 },
        diagnostics: {
          schemaVersion: PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION,
          mode: "summary",
          traceLimit: 0,
          limits: { maxMetricKeysPerKind: 512, maxChildSnapshots: 16, maxTraceEvents: 0 },
          summary: {
            counters: { "worker.fast.operations.finished": 1 },
            durations: {},
            gauges: {},
            droppedMetricKeys: 0,
            droppedChildSnapshots: 0,
          },
          children: {},
          trace: [],
        },
      } }));
    }
    terminate() {}
    emit(type, event) { for (const listener of this.listeners.get(type) ?? []) listener(event); }
  }
  const client = new PastafariEngineClient("child-report", {
    workerFactory: () => new ReportingWorker(),
    requestTimeoutMs: 100,
    startupTimeoutMs: 100,
  });
  assert.deepEqual(await client.request("convert", {}), { value: 1 });
  const child = getPastafariDiagnosticsSnapshot().children["worker.child-report"];
  assert.ok(child);
  assert.equal(child.schemaVersion, PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION);
  assert.equal(child.summary.counters["worker.fast.operations.finished"], 1);
  client.terminate();
});

test("short reverse search exposes deterministic work counters and a completed operation", async () => {
  reset("summary");
  const calendar = new fast.PastafariCalendar();
  const wanted = calendar.convertJdn(TARGET_JDN, { calculationJdn: TARGET_JDN });
  resetPastafariDiagnostics();
  const result = await fast.findPastafariDate(wanted, {
    calculationDate: fast.SAME_AS_TARGET,
    searchRange: [TARGET_JDN, TARGET_JDN],
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].targetJdn, TARGET_JDN);
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.ok((snapshot.summary.counters["reverse.diagonal.scanned"] ?? 0) >= 1);
  assert.equal(snapshot.summary.counters["reverse.matches"], 1);
  assert.ok(snapshot.operations.some((operation) => (
    operation.subsystem === "reverse"
    && operation.operation === "find"
    && operation.outcome === "ok"
  )));
});

test("short constraint solve reports visited work and completion", async () => {
  reset("summary");
  const result = await solvePastafariConstraintsDirect({
    variables: { x: { range: [1n, 2n] } },
    constraints: [],
  });
  assert.equal(result.complete, true);
  assert.equal(result.termination, "complete");
  assert.equal(result.scanned, 2n);
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["constraints.scanned"], 2);
  assert.equal(snapshot.summary.counters["constraints.termination.complete"], 1);
  const operation = snapshot.operations.find((item) => (
    item.subsystem === "constraints" && item.operation === "solve"
  ));
  assert.ok(operation);
  assert.equal(operation.outcome, "ok");
  assert.ok(Number.isFinite(operation.durationMs) && operation.durationMs >= 0);
});

test("reverse cancellation is diagnosed and preserves AbortError", async () => {
  reset("summary");
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    fast.findPastafariDate({
      year: 5000,
      cutletName: "ארד",
      dayInCutlet: 1,
      monthName: "טין",
      dayInMonth: 1,
    }, {
      calculationDate: fast.SAME_AS_TARGET,
      searchRange: [CALCULATION_JDN, CALCULATION_JDN + 1n],
      signal: controller.signal,
    }),
    (error) => error?.name === "AbortError" && error?.code === "ERR_REVERSE_ABORTED",
  );
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["reverse.outcome.cancelled"], 1);
});

test("constraint cancellation is diagnosed and preserves AbortError", async () => {
  reset("summary");
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    solvePastafariConstraintsDirect({
      variables: { x: { range: [1n, 10n] } },
      constraints: [],
    }, { signal: controller.signal }),
    (error) => error?.name === "AbortError" && error?.code === "ERR_REVERSE_ABORTED",
  );
  const snapshot = getPastafariDiagnosticsSnapshot();
  assert.equal(snapshot.summary.counters["constraints.cancellations"], 1);
  assert.ok(snapshot.operations.some((operation) => (
    operation.subsystem === "constraints"
    && operation.operation === "solve"
    && operation.outcome === "cancelled"
  )));
});

test("diagnostics overhead is measured in CI but has no performance threshold", () => {
  const calendar = new fast.PastafariCalendar();
  const rows = [];
  for (const mode of ["disabled", "summary", "detailed"]) {
    reset(mode, 64);
    calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
    const started = performance.now();
    for (let index = 0; index < 2_000; index += 1) {
      calendar.convertJdn(TARGET_JDN, { calculationJdn: CALCULATION_JDN });
    }
    const elapsedMs = performance.now() - started;
    rows.push({ mode, elapsedMs, operations: 2_000 });
    assert.ok(Number.isFinite(elapsedMs) && elapsedMs >= 0);
  }
  console.log(`# pastafari-diagnostics-overhead ${JSON.stringify(rows)}`);
});

test.after(() => {
  configurePastafariDiagnostics({ mode: "disabled", traceLimit: 512 });
  resetPastafariDiagnostics();
  fast.clearFastCache();
  resetPastafariDiagnostics();
});
