"use strict";

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  analyzeSeries,
  calibrateGcNoise,
  forceGc,
  linearRegression,
  memoryEnvironment,
  memoryPoint,
  postGcPoint,
  requireExposedGc,
} from "./memory-lib.mjs";

const FIXED = Object.freeze({
  calculationJdn: 2_461_259n,
  targetJdn: 2_461_259n,
});

function parseArgs(argv) {
  const options = { scenario: null, mode: "smoke", engine: "browser/pastafari-calendar-fast.js", role: "candidate" };
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (["--scenario", "--mode", "--engine", "--role"].includes(key)) {
      if (!value) throw new Error(`${key} requires a value.`);
      options[key.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${key}`);
  }
  if (!options.scenario) throw new Error("--scenario is required.");
  if (!["smoke", "soak"].includes(options.mode)) throw new Error(`Unsupported mode: ${options.mode}`);
  return options;
}

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") throw new TypeError("Invalid calendar result.");
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

function checksumValue(hash, value) {
  hash.update(JSON.stringify(value, (_, current) => typeof current === "bigint" ? current.toString() : current));
  hash.update("\n");
}

function metricTrends(points) {
  const batches = points.filter((point) => Number.isFinite(point.batch));
  const late = batches.slice(-Math.max(3, Math.min(4, Math.floor(batches.length / 2))));
  return {
    heapUsed: linearRegression(late, "heapUsed"),
    heapTotal: linearRegression(late, "heapTotal"),
    rss: linearRegression(late, "rss"),
    external: linearRegression(late, "external"),
    arrayBuffers: linearRegression(late, "arrayBuffers"),
  };
}

async function importEngine(enginePath, role) {
  const absolute = resolve(enginePath);
  const url = pathToFileURL(absolute);
  // Candidate scenarios should share the normal module identity with reverse/constraint
  // modules imported later in this same fresh process. Alternate baseline files get a
  // query key only to make their role explicit without touching source contents.
  if (!(role === "candidate" && absolute === resolve("browser/pastafari-calendar-fast.js"))) {
    url.searchParams.set("memoryRole", role);
  }
  const moduleNamespace = await import(url.href);
  for (const exportName of ["PastafariCalendar", "clearFastCache", "getFastCacheStats"]) {
    if (typeof moduleNamespace[exportName] !== "function") {
      throw new Error(`${enginePath} does not export ${exportName}.`);
    }
  }
  return moduleNamespace;
}

async function staticFastAudit(enginePath) {
  const source = await readFile(resolve(enginePath), "utf8");
  function capacity(pattern, label) {
    const match = source.match(pattern);
    if (!match) throw new Error(`Cannot locate ${label} capacity in ${enginePath}.`);
    return Number(match[1]);
  }
  return {
    resultCacheEntries: capacity(/resultCache\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "resultCache"),
    calculationStates: capacity(/calculationStates\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "calculationStates"),
    gateDistanceEntries: capacity(/gateDistanceCache\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "gateDistanceCache"),
    dynamicGateEntries: capacity(/dynamicGatePositions\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "dynamicGatePositions"),
    sauceEntriesPerCalculationState: capacity(/this\.sauceCache\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "CalculationState.sauceCache"),
    structureEntriesPerCalculationState: capacity(/this\.structureCache\s*=\s*new\s+LruMap\(\s*(\d+)(?:\s*,\s*[^)]*)?\)/, "CalculationState.structureCache"),
    yearsByNumberBounded: !/this\.yearsByNumber\s*=\s*new\s+Map\(\)/.test(source),
  };
}

async function staticWorkerAudit() {
  const source = await readFile(resolve("docs/engine/pastafari-fast-worker.js"), "utf8");
  const match = source.match(/yearStructureCache\.size\s*>\s*(\d+)/);
  if (!match) throw new Error("Cannot locate Pages Worker yearStructureCache bound.");
  return { yearStructureCacheEntries: Number(match[1]) };
}

async function batched({
  label,
  batches,
  warmup,
  operation,
  afterBatch,
  gate = true,
  gcCycles = 2,
  relativeAllowance = 0.08,
}) {
  const checksum = createHash("sha256");
  await warmup?.(checksum);
  const noise = await calibrateGcNoise(4, gcCycles);
  const points = [await postGcPoint("baseline", null, {}, gcCycles)];
  for (let batch = 1; batch <= batches; batch += 1) {
    await operation(batch, checksum);
    const extra = await afterBatch?.(batch) ?? {};
    points.push(await postGcPoint(`batch-${batch}`, batch, extra, gcCycles));
  }
  const analysis = analyzeSeries(points, {
    gate,
    noiseBytes: Math.max(noise.heapRangeBytes, noise.heapMadBytes * 3),
    relativeAllowance,
  });
  return {
    label,
    checksum: checksum.digest("hex"),
    points,
    noise,
    analysis,
    trends: metricTrends(points),
  };
}

async function repeatedIdentical(engine, mode) {
  const calendar = new engine.PastafariCalendar();
  const batchSize = mode === "soak" ? 5_000 : 250;
  const batches = mode === "soak" ? 12 : 8;
  engine.clearFastCache();
  const expected = canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn }));
  engine.clearFastCache();
  const result = await batched({
    label: "repeated identical forward conversion",
    batches,
    warmup: async (hash) => {
      const value = canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn }));
      assert.deepStrictEqual(value, expected);
      checksumValue(hash, value);
    },
    operation: async (_batch, hash) => {
      let last;
      for (let index = 0; index < batchSize; index += 1) {
        last = canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn }));
      }
      assert.deepStrictEqual(last, expected);
      checksumValue(hash, last);
    },
    afterBatch: () => ({ cache: engine.getFastCacheStats() }),
  });
  const stats = engine.getFastCacheStats();
  assert.equal(stats.entries, 1, `identical lookup should retain one result-cache entry, got ${stats.entries}`);
  result.workload = { batches, batchSize, totalConversions: batches * batchSize };
  result.cacheFinal = stats;
  return result;
}

async function uniqueTargets(engine, mode, audit) {
  const calendar = new engine.PastafariCalendar();
  const batchSize = mode === "soak" ? 500 : 128;
  const batches = mode === "soak" ? 12 : 8;
  let offset = 0n;
  engine.clearFastCache();
  const result = await batched({
    label: "many unique target days",
    batches,
    warmup: async () => {
      calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn });
      offset = 1n;
    },
    operation: async (_batch, hash) => {
      let last;
      for (let index = 0; index < batchSize; index += 1) {
        last = canonical(calendar.convertJdn(FIXED.targetJdn + offset, { calculationJdn: FIXED.calculationJdn }));
        offset += 1n;
      }
      assert.ok(last.year.length > 0);
      checksumValue(hash, last);
    },
    afterBatch: () => ({ cache: engine.getFastCacheStats() }),
  });
  const stats = engine.getFastCacheStats();
  assert.ok(stats.entries <= audit.resultCacheEntries, `resultCache exceeded static bound ${audit.resultCacheEntries}: ${stats.entries}`);
  assert.equal(stats.entries, audit.resultCacheEntries, "unique-target workload did not reach the result-cache bound; plateau test is under-sized");
  result.workload = { batches, batchSize, totalUniqueTargets: batches * batchSize };
  result.cacheFinal = stats;
  return result;
}

async function calculationDays(engine, mode, audit) {
  const calendar = new engine.PastafariCalendar();
  const perBatch = mode === "soak" ? 5 : 1;
  const batches = mode === "soak" ? 10 : 6;
  let offset = 0n;
  engine.clearFastCache();
  const result = await batched({
    label: "many calculation days",
    batches,
    gate: false,
    warmup: async () => {
      calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn });
      offset = 1n;
    },
    operation: async (_batch, hash) => {
      let last;
      for (let index = 0; index < perBatch; index += 1) {
        const calculationJdn = FIXED.calculationJdn + offset;
        last = canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn }));
        offset += 1n;
      }
      checksumValue(hash, last);
    },
    afterBatch: () => ({ cache: engine.getFastCacheStats(), calculationDaysSeen: Number(offset) }),
  });
  const stats = engine.getFastCacheStats();
  assert.ok(stats.entries <= audit.resultCacheEntries);
  result.workload = { batches, calculationDaysPerBatch: perBatch, totalCalculationDays: batches * perBatch };
  result.cacheFinal = stats;
  result.classification = "bounded-cache-growth/informational";
  result.note = `The public result cache is bounded at ${audit.resultCacheEntries}; calculation-state LRU is statically bounded at ${audit.calculationStates}. Heap plateau is not required before the result-cache bound is reached.`;
  return result;
}

async function calculationCycle(engine, mode) {
  const calendar = new engine.PastafariCalendar();
  const iterationsPerBatch = mode === "soak" ? 3_000 : 150;
  const batches = mode === "soak" ? 12 : 8;
  const cycle = [FIXED.calculationJdn, FIXED.calculationJdn + 1n, FIXED.calculationJdn + 2n];
  engine.clearFastCache();
  return batched({
    label: "calculation-day cycle A-B-C-A-B-C",
    batches,
    warmup: async (hash) => {
      for (const calculationJdn of cycle) checksumValue(hash, canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn })));
    },
    operation: async (batch, hash) => {
      let last;
      for (let index = 0; index < iterationsPerBatch; index += 1) {
        const calculationJdn = cycle[(batch * iterationsPerBatch + index) % cycle.length];
        last = canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn }));
      }
      checksumValue(hash, last);
    },
    afterBatch: () => ({ cache: engine.getFastCacheStats() }),
  }).then((result) => ({ ...result, workload: { batches, iterationsPerBatch, cycle: cycle.map(String) } }));
}

async function reverseSuccess(engine, mode) {
  if (typeof engine.findPastafariDate !== "function") throw new Error("Engine does not export findPastafariDate().");
  const calendar = new engine.PastafariCalendar();
  const target = FIXED.targetJdn + 137n;
  const wanted = calendar.convertJdn(target, { calculationJdn: FIXED.calculationJdn }).toJSON();
  engine.clearFastCache();
  const batches = mode === "soak" ? 10 : 8;
  const perBatch = mode === "soak" ? 20 : 5;
  const result = await batched({
    label: "reverse lookup successful cleanup",
    batches,
    warmup: async () => {
      const found = await engine.findPastafariDate(wanted, { calculationJdn: FIXED.calculationJdn });
      assert.ok(found.some((candidate) => candidate.targetJdn === target && candidate.calculationJdn === FIXED.calculationJdn));
    },
    operation: async (_batch, hash) => {
      let last;
      for (let index = 0; index < perBatch; index += 1) {
        last = await engine.findPastafariDate(wanted, { calculationJdn: FIXED.calculationJdn });
      }
      assert.ok(last.some((candidate) => candidate.targetJdn === target));
      checksumValue(hash, last.map((candidate) => [candidate.targetJdn, candidate.calculationJdn]));
    },
  });
  result.workload = { batches, operationsPerBatch: perBatch };
  return result;
}

async function reverseCancel(engine, mode) {
  const { PastafariReverseClient } = await import("../browser/pastafari-reverse.js");
  const calendar = new engine.PastafariCalendar();
  const target = FIXED.targetJdn + 23n;
  const wanted = calendar.convertJdn(target, { calculationJdn: target }).toJSON();
  const batches = mode === "soak" ? 12 : 6;
  const perBatch = mode === "soak" ? 4 : 1;
  engine.clearFastCache();
  const result = await batched({
    label: "reverse timeout/cancellation cleanup",
    batches,
    warmup: async () => { await forceGc(); },
    operation: async (_batch, hash) => {
      const outcomes = [];
      for (let index = 0; index < perBatch; index += 1) {
        const client = new PastafariReverseClient();
        try {
          await client.find(wanted, {
            calculationDate: engine.SAME_AS_TARGET,
            searchRange: [target - 5_000n, target + 5_000n],
            yieldEvery: 1,
            timeoutMs: 5,
          });
          throw new Error("Reverse cancellation workload unexpectedly completed before timeout.");
        } catch (error) {
          assert.ok(error?.name === "TimeoutError" || error?.name === "AbortError", `unexpected reverse cancellation error: ${error?.name}`);
          outcomes.push(error.name);
        } finally {
          client.dispose();
        }
      }
      engine.clearFastCache();
      checksumValue(hash, outcomes);
    },
  });
  result.workload = { batches, cancellationsPerBatch: perBatch };
  return result;
}

function constraintFixtures(engine) {
  const calendar = new engine.PastafariCalendar();
  const pastafari = (targetJdn, calculationJdn) => calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
  const base = FIXED.calculationJdn;
  const chainB = base + 4n;
  const chainA = base + 9n;
  const acyclic = {
    variables: { A: {}, B: {} },
    constraints: [
      { type: "pastafari", target: "B", calculationJdn: base, date: pastafari(chainB, base) },
      { type: "pastafari", target: "A", calculation: "B", date: pastafari(chainA, chainB) },
    ],
  };
  const radius = 50n;
  const A = base + 7n;
  const B = base + 19n;
  const hard = {
    variables: { A: { range: [A - radius, A + radius] }, B: { range: [B - radius, B + radius] } },
    constraints: [
      { type: "pastafari", target: "A", calculation: "B", date: pastafari(A, B) },
      { type: "pastafari", target: "B", calculation: "A", date: pastafari(B, A) },
    ],
  };
  return { acyclic, hard, expected: { chainA, chainB } };
}

async function constraintsSuccess(engine, mode) {
  const constraints = await import("../browser/pastafari-constraints.js");
  const fixture = constraintFixtures(engine);
  const batches = mode === "soak" ? 10 : 6;
  const perBatch = mode === "soak" ? 4 : 1;
  engine.clearFastCache();
  const result = await batched({
    label: "constraint solver successful cleanup",
    batches,
    warmup: async () => {
      const value = await constraints.solvePastafariConstraintsDirect(fixture.acyclic);
      assert.equal(value.complete, true);
    },
    operation: async (_batch, hash) => {
      let value;
      for (let index = 0; index < perBatch; index += 1) {
        value = await constraints.solvePastafariConstraintsDirect(fixture.acyclic);
      }
      assert.equal(value.complete, true);
      assert.ok(value.solutions.some((solution) => solution.A.jdn === fixture.expected.chainA && solution.B.jdn === fixture.expected.chainB));
      checksumValue(hash, value.solutions.map((solution) => [solution.A.jdn, solution.B.jdn]));
    },
  });
  result.workload = { batches, operationsPerBatch: perBatch };
  return result;
}

async function constraintsCancel(engine, mode) {
  const { PastafariConstraintClient } = await import("../browser/pastafari-constraints-client.js");
  const fixture = constraintFixtures(engine);
  const batches = mode === "soak" ? 10 : 6;
  const perBatch = mode === "soak" ? 3 : 1;
  engine.clearFastCache();
  const result = await batched({
    label: "constraint timeout/cancellation cleanup",
    batches,
    warmup: async () => { await forceGc(); },
    operation: async (_batch, hash) => {
      const outcomes = [];
      for (let index = 0; index < perBatch; index += 1) {
        const client = new PastafariConstraintClient();
        try {
          await client.solve(fixture.hard, { timeoutMs: 5, yieldEvery: 1 });
          throw new Error("Constraint cancellation workload unexpectedly completed before timeout.");
        } catch (error) {
          assert.ok(error?.name === "TimeoutError" || error?.name === "AbortError", `unexpected constraint cancellation error: ${error?.name}`);
          outcomes.push(error.name);
        } finally {
          client.dispose();
        }
      }
      engine.clearFastCache();
      checksumValue(hash, outcomes);
    },
  });
  result.workload = { batches, cancellationsPerBatch: perBatch };
  return result;
}

async function yearStructure(engine, mode) {
  const pagesWorker = await import("../docs/engine/pastafari-fast-worker.js");
  const workerAudit = await staticWorkerAudit();
  const uniqueWarmups = mode === "soak" ? 12 : 9;
  const anchors = [];
  engine.clearFastCache();
  for (let index = 0; index < uniqueWarmups; index += 1) {
    const targetJdn = FIXED.targetJdn + BigInt(index * 6_000);
    const value = await pagesWorker.handlePastafariWorkerRequest("getYearStructure", { targetJdn, calculationJdn: FIXED.calculationJdn });
    assert.ok(value.length >= 252 && value.length <= 5_778);
    anchors.push(targetJdn);
  }
  const batches = mode === "soak" ? 12 : 8;
  const result = await batched({
    label: "year structure cache reuse after bounded unique warm-up",
    batches,
    warmup: async () => { await forceGc(); },
    operation: async (batch, hash) => {
      const targetJdn = anchors[batch % Math.min(3, anchors.length)];
      const value = await pagesWorker.handlePastafariWorkerRequest("getYearStructure", { targetJdn, calculationJdn: FIXED.calculationJdn });
      assert.ok(value.length >= 252 && value.length <= 5_778);
      checksumValue(hash, { year: value.year, length: value.length, cutletCount: value.cutletCount, monthCount: value.monthCount });
    },
  });
  result.workload = { uniqueWarmups, repeatedBatches: batches };
  result.cacheArchitecture = workerAudit;
  return result;
}

function fakeCanonical(jdn) {
  return { year: "1", cutletName: "wheat", dayInCutlet: 1, monthName: "sauce", dayInMonth: 1, jdn };
}

function fakeView(targetJdn) {
  return {
    selectedJdn: targetJdn,
    selectedIndex: 0,
    startJdn: targetJdn,
    endJdn: targetJdn,
    previousCutletJdn: targetJdn - 1n,
    nextCutletJdn: targetJdn + 1n,
    year: "1",
    cutletName: "wheat",
    days: [fakeCanonical(targetJdn)],
  };
}

async function routerState(mode) {
  const { PastafariCalendarRouterCore } = await import("../browser/pastafari-calendar-router-core.js");
  const client = {
    async request(operation, payload) {
      if (operation === "convert") return fakeCanonical(payload.targetJdn ?? payload.anchorJdn);
      if (operation === "getCutletView") return fakeView(payload.targetJdn);
      if (operation === "convertJdnRange") return Array.from({ length: payload.count }, (_, index) => fakeCanonical(payload.startJdn + BigInt(index)));
      throw new Error(`unexpected fake router operation ${operation}`);
    },
    terminate() {},
  };
  const router = new PastafariCalendarRouterCore({
    fastClient: client,
    authoritativeClient: client,
    verificationTimeoutMs: 5_000,
    authoritativeIdleShutdownMs: 60_000,
  });
  const batches = mode === "soak" ? 12 : 8;
  const perBatch = mode === "soak" ? 25 : 8;
  let count = 0;
  const result = await batched({
    label: "router calculation-day retained status",
    batches,
    gate: false,
    warmup: async () => { await forceGc(); },
    operation: async (_batch, hash) => {
      for (let index = 0; index < perBatch; index += 1) {
        const calculationJdn = FIXED.calculationJdn + BigInt(count++);
        await router.convert(FIXED.targetJdn, calculationJdn);
        await router.convert(FIXED.targetJdn, calculationJdn);
      }
      checksumValue(hash, router.getStatus().calculations.length);
    },
    afterBatch: () => ({ routerStates: router.getStatus().calculations.length }),
  });
  const peakStates = router.getStatus().calculations.length;
  assert.equal(peakStates, batches * perBatch);
  const peakHeap = result.points.at(-1).heapUsed;
  const baselineHeap = result.points[0].heapUsed;
  router.dispose();
  const postDispose = await postGcPoint("post-dispose");
  result.workload = { batches, calculationDaysPerBatch: perBatch, totalStates: peakStates };
  result.postDispose = postDispose;
  result.estimatedRetainedBytesPerState = Math.max(0, peakHeap - baselineHeap) / Math.max(1, peakStates);
  result.classification = "retained-useful-state/unbounded-until-retry-or-dispose";
  return result;
}

async function farDate(engine, mode) {
  const calendar = new engine.PastafariCalendar();
  const batches = mode === "soak" ? 12 : 6;
  const step = mode === "soak" ? 75_000n : 25_000n;
  engine.clearFastCache();
  const result = await batched({
    label: "far-date traversal retained state",
    batches,
    gate: false,
    warmup: async () => {
      calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn });
    },
    operation: async (batch, hash) => {
      const targetJdn = FIXED.targetJdn + step * BigInt(batch);
      const value = canonical(calendar.convertJdn(targetJdn, { calculationJdn: FIXED.calculationJdn }));
      checksumValue(hash, value);
    },
    afterBatch: () => ({ cache: engine.getFastCacheStats() }),
  });
  result.workload = { batches, stepDays: step.toString() };
  result.classification = "retained-useful-state/informational";
  result.note = "This path can populate CalculationState.yearsByNumber, which has no explicit eviction bound in the current fast engine; growth is reported but not called a leak without a lifecycle violation.";
  return result;
}

async function initFootprint(args) {
  requireExposedGc();
  await forceGc();
  const beforeImport = memoryPoint("process-before-import");
  const engine = await importEngine(args.engine, args.role);
  await forceGc();
  const afterImport = memoryPoint("after-engine-import");
  const calendar = new engine.PastafariCalendar();
  calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn });
  await forceGc();
  const afterInitialize = memoryPoint("after-first-calculation");
  return {
    label: "initialization footprint",
    checksum: createHash("sha256")
      .update(JSON.stringify(canonical(calendar.convertJdn(FIXED.targetJdn, { calculationJdn: FIXED.calculationJdn }))))
      .digest("hex"),
    points: [beforeImport, afterImport, afterInitialize],
    analysis: null,
    deltas: {
      importHeapBytes: afterImport.heapUsed - beforeImport.heapUsed,
      initializationHeapBytes: afterInitialize.heapUsed - afterImport.heapUsed,
    },
    cacheFinal: engine.getFastCacheStats(),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  requireExposedGc();
  const started = performance.now();
  let result;
  let audit = null;
  if (args.scenario === "init-footprint") {
    result = await initFootprint(args);
  } else if (args.scenario === "router-state") {
    result = await routerState(args.mode);
  } else {
    const engine = await importEngine(args.engine, args.role);
    audit = await staticFastAudit(args.engine);
    switch (args.scenario) {
      case "repeated-identical": result = await repeatedIdentical(engine, args.mode); break;
      case "unique-targets": result = await uniqueTargets(engine, args.mode, audit); break;
      case "calculation-days": result = await calculationDays(engine, args.mode, audit); break;
      case "calculation-cycle": result = await calculationCycle(engine, args.mode); break;
      case "year-structure": result = await yearStructure(engine, args.mode); break;
      case "reverse-success": result = await reverseSuccess(engine, args.mode); break;
      case "reverse-cancel": result = await reverseCancel(engine, args.mode); break;
      case "constraints-success": result = await constraintsSuccess(engine, args.mode); break;
      case "constraints-cancel": result = await constraintsCancel(engine, args.mode); break;
      case "far-date": result = await farDate(engine, args.mode); break;
      default: throw new Error(`Unknown memory scenario: ${args.scenario}`);
    }
  }
  const payload = {
    scenario: args.scenario,
    mode: args.mode,
    role: args.role,
    enginePath: resolve(args.engine),
    environment: memoryEnvironment({ gcCyclesPerMeasurement: 2 }),
    audit,
    elapsedMs: performance.now() - started,
    ...result,
  };
  process.stdout.write(`@@MEMORY_RESULT@@${JSON.stringify(payload, (_, value) => typeof value === "bigint" ? value.toString() : value)}\n`);
}

await main();
