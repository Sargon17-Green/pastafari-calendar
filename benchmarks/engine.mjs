"use strict";

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

import {
  FIXED,
  FORWARD_CASES,
  canonical,
  digest,
  environment,
  fileSha256,
  sample,
  summarize,
  timed,
  writeReport,
} from "./lib.mjs";

const execFileAsync = promisify(execFile);
const SELF = fileURLToPath(import.meta.url);
const FAST_N = Number(process.env.PASTAFARI_BENCH_FAST_N || 7);
const AUTH_N = Number(process.env.PASTAFARI_BENCH_AUTH_N || 2);
const COLD_FAST_N = Number(process.env.PASTAFARI_BENCH_COLD_FAST_N || 3);
const CHILD_TIMEOUT_MS = Number(process.env.PASTAFARI_BENCH_CHILD_TIMEOUT_MS || 360_000);

async function childMain(kind, targetText, calculationText) {
  const targetJdn = BigInt(targetText);
  const calculationJdn = BigInt(calculationText);
  const moduleUrl = kind === "fast"
    ? new URL("../browser/pastafari-calendar-fast.js", import.meta.url)
    : new URL("../browser/pastafari-calendar-core.js", import.meta.url);
  const importStart = performance.now();
  const mod = await import(moduleUrl.href);
  const importMs = performance.now() - importStart;
  const calendar = new mod.PastafariCalendar({
    todayProvider: () => new mod.GregorianDate(2000n, 1, 1),
  });
  const { value, elapsedMs } = await timed(() => calendar.convertJdn(targetJdn, { calculationJdn }));
  process.stdout.write(JSON.stringify({
    kind,
    importMs,
    conversionMs: elapsedMs,
    result: canonical(value),
    heapUsed: process.memoryUsage().heapUsed,
  }));
}

if (process.argv[2] === "--child") {
  await childMain(process.argv[3], process.argv[4], process.argv[5]);
  process.exit(0);
}

async function runColdChild(kind, targetJdn, calculationJdn) {
  const parentStart = performance.now();
  const { stdout } = await execFileAsync(
    process.execPath,
    [SELF, "--child", kind, targetJdn.toString(), calculationJdn.toString()],
    { timeout: CHILD_TIMEOUT_MS, maxBuffer: 2 ** 20 },
  );
  const parentElapsedMs = performance.now() - parentStart;
  return { ...JSON.parse(stdout), parentElapsedMs };
}

function assertCanonicalEqual(actual, expected, label) {
  assert.deepStrictEqual(canonical(actual), canonical(expected), label);
}

async function main() {
  const rows = [];
  const findings = [];
  const limitations = [];
  const memory = { beforeBytes: process.memoryUsage().heapUsed };

  const fast = await import("../browser/pastafari-calendar-fast.js");
  const authoritative = await import("../browser/pastafari-calendar-core.js");
  const fastCalendar = new fast.PastafariCalendar({
    todayProvider: () => new fast.GregorianDate(2000n, 1, 1),
  });
  const authoritativeCalendar = new authoritative.PastafariCalendar({
    todayProvider: () => new authoritative.GregorianDate(2000n, 1, 1),
  });

  // Correctness guard: use the repository's authoritative path as the oracle,
  // exactly as the existing fast-compatibility suite does.
  const referenceCases = FORWARD_CASES.filter((item) => !["beyond-last-checkpoint"].includes(item.id));
  const references = new Map();
  for (const item of referenceCases) {
    const expected = authoritativeCalendar.convertJdn(item.targetJdn, { calculationJdn: item.calculationJdn });
    const actual = fastCalendar.convertJdn(item.targetJdn, { calculationJdn: item.calculationJdn });
    assertCanonicalEqual(actual, expected, `fast/auth mismatch for benchmark case ${item.id}`);
    references.set(item.id, canonical(expected));
  }

  // Fresh-process cold samples separate module load from first calculation.
  for (const item of FORWARD_CASES) {
    const importSamples = [];
    const conversionSamples = [];
    const processSamples = [];
    let firstResult = null;
    const sampleCount = item.id === "beyond-last-checkpoint" ? 1 : COLD_FAST_N;
    let timedOut = false;
    let timeoutElapsedMs = null;
    for (let i = 0; i < sampleCount; i += 1) {
      const started = performance.now();
      try {
        const result = await runColdChild("fast", item.targetJdn, item.calculationJdn);
        if (references.has(item.id)) assert.deepStrictEqual(result.result, references.get(item.id));
        importSamples.push(result.importMs);
        conversionSamples.push(result.conversionMs);
        processSamples.push(result.parentElapsedMs);
        firstResult ??= result.result;
      } catch (error) {
        if (error?.killed || error?.code === "ETIMEDOUT" || error?.signal) {
          timedOut = true;
          timeoutElapsedMs = performance.now() - started;
          break;
        }
        throw error;
      }
    }
    rows.push({
      scenario: `forward cold process: ${item.id}`,
      path: "fast/cold-process conversion",
      stats: timedOut ? summarize([timeoutElapsedMs]) : { ...summarize(conversionSamples), checksum: digest(firstResult) },
      notes: timedOut
        ? `TIMEOUT after ${Math.round(timeoutElapsedMs)}ms; input target=${item.targetJdn}, calculation=${item.calculationJdn}; distance=${item.distanceDays}d; fallback=none; engine=fast`
        : `input target=${item.targetJdn}, calculation=${item.calculationJdn}; distance=${item.distanceDays}d; timeout=false; fallback=none; engine=fast; module import reported separately`,
    });
    if (!timedOut) {
      rows.push({
        scenario: `module import cold: ${item.id}`,
        path: "fast/module-load",
        stats: summarize(importSamples),
        notes: "fresh Node process; excludes parent spawn latency",
      });
      rows.push({
        scenario: `process envelope: ${item.id}`,
        path: "fast/process+import+conversion",
        stats: summarize(processSamples),
        notes: "includes Node process spawn; not engine latency",
      });
    }
  }

  // Authoritative cold samples are intentionally small because the core is very large/heavy.
  for (const item of FORWARD_CASES.filter((entry) => ["same-day", "known-soak-boundary"].includes(entry.id))) {
    const samples = [];
    const imports = [];
    for (let i = 0; i < Math.max(1, Math.min(AUTH_N, 2)); i += 1) {
      const result = await runColdChild("authoritative", item.targetJdn, item.calculationJdn);
      if (references.has(item.id)) assert.deepStrictEqual(result.result, references.get(item.id));
      samples.push(result.conversionMs);
      imports.push(result.importMs);
    }
    rows.push({
      scenario: `forward cold process: ${item.id}`,
      path: "authoritative/cold-process conversion",
      stats: summarize(samples),
      notes: "small heavy sample; p95 is low-confidence",
    });
    rows.push({
      scenario: `module import cold: ${item.id}`,
      path: "authoritative/module-load",
      stats: summarize(imports),
      notes: "large authoritative module graph; fresh Node process",
    });
  }

  // Fast cache miss: reset all documented fast caches before each timed call.
  const baseReference = references.get("same-day");
  const fastMiss = await sample({
    n: FAST_N,
    operation: () => {
      fast.clearFastCache();
      return fastCalendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn });
    },
    validate: (value) => assert.deepStrictEqual(canonical(value), baseReference),
  });
  rows.push({
    scenario: "forward fixed date after explicit cache reset",
    path: "fast/cache-miss",
    stats: fastMiss,
    notes: "module remains loaded; all fast caches cleared before every sample",
  });

  fast.clearFastCache();
  assert.deepStrictEqual(canonical(fastCalendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn })), baseReference);
  const cached = await sample({
    n: Math.max(25, FAST_N),
    warmup: 3,
    operation: () => fastCalendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn }),
    validate: (value) => assert.deepStrictEqual(canonical(value), baseReference),
  });
  const cacheStats = fast.getFastCacheStats();
  rows.push({
    scenario: "cached identical lookup",
    path: "fast/cache-hit",
    stats: cached,
    notes: `explicit cache hit; stats entries=${cacheStats.entries}, hits=${cacheStats.hits}, misses=${cacheStats.misses}`,
  });

  // Nearby and sequential targets with one fixed calculation day.
  fast.clearFastCache();
  fastCalendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn });
  let nearOffset = 1n;
  const nearby = await sample({
    n: FAST_N,
    warmup: 2,
    operation: () => {
      const value = fastCalendar.convertJdn(FIXED.targetSame + nearOffset, { calculationJdn: FIXED.calculationJdn });
      nearOffset += 1n;
      return value;
    },
    validate: (value) => assert.equal(Number.isSafeInteger(canonical(value).dayInMonth), true),
  });
  rows.push({ scenario: "nearby targets after warm state", path: "fast/warm-nearby", stats: nearby, notes: "fixed calculation day; changing target" });

  fast.clearFastCache();
  const rangeReference = fast.convertJdnRange(FIXED.targetSame, 366, { calculationJdn: FIXED.calculationJdn });
  const rangeChecksum = digest(rangeReference.map(canonical));
  const yearRange = await sample({
    n: Math.max(3, Math.min(FAST_N, 7)),
    warmup: 1,
    operation: () => fast.convertJdnRange(FIXED.targetSame, 366, { calculationJdn: FIXED.calculationJdn }),
    validate: (value) => assert.equal(digest(value.map(canonical)), rangeChecksum),
  });
  rows.push({
    scenario: "366 sequential days",
    path: "fast/convertJdnRange",
    stats: yearRange,
    notes: `total median=${yearRange.medianMs.toFixed(2)}ms; ${(yearRange.medianMs / 366).toFixed(4)} ms/day; throughput=${(366 / (yearRange.medianMs / 1000)).toFixed(1)} days/s; checksum=${rangeChecksum.slice(0, 12)}`,
  });

  // Changing calculation day exercises calculation-state cache invalidation/replacement.
  fast.clearFastCache();
  let calcOffset = 0n;
  const changingCalculation = await sample({
    n: FAST_N,
    operation: () => {
      const c = FIXED.calculationJdn + calcOffset;
      calcOffset += 1n;
      return fastCalendar.convertJdn(FIXED.targetSame, { calculationJdn: c });
    },
    validate: (value) => assert.equal(canonical(value).year.length > 0, true),
  });
  rows.push({ scenario: "fixed target, changing calculation day", path: "fast/calculation-state-change", stats: changingCalculation, notes: "exercises the LRU of calculation states" });

  // Actual Pages year-structure computation (same worker handler, called inline to isolate computation from messaging).
  const pagesWorker = await import("../docs/engine/pastafari-fast-worker.js");
  const yearPayload = { targetJdn: FIXED.targetSame, calculationJdn: FIXED.calculationJdn };
  const firstYear = await timed(() => pagesWorker.handlePastafariWorkerRequest("getYearStructure", yearPayload));
  assert.ok(firstYear.value.length >= 252 && firstYear.value.length <= 5_778);
  rows.push({
    scenario: "year structure first build",
    path: "web-fast-worker/inline-computation",
    stats: { ...summarize([firstYear.elapsedMs]), checksum: digest(firstYear.value) },
    notes: `cutlets=${firstYear.value.cutletCount}, months=${firstYear.value.monthCount}; worker messaging excluded`,
  });
  const yearHit = await sample({
    n: Math.max(10, FAST_N),
    operation: () => pagesWorker.handlePastafariWorkerRequest("getYearStructure", yearPayload),
    validate: (value) => assert.equal(digest(value), digest(firstYear.value)),
  });
  rows.push({ scenario: "year structure cached identical lookup", path: "web-fast-worker/year-structure-cache-hit", stats: yearHit, notes: "explicit worker-side yearStructureCache hit" });

  // Bounded-cache growth workload: enough unique conversions to exceed the documented result-cache capacity.
  fast.clearFastCache();
  const growthHeapBefore = process.memoryUsage().heapUsed;
  const growthStart = performance.now();
  let growthChecksum = null;
  for (let i = 0; i < 1_200; i += 1) {
    const value = fastCalendar.convertJdn(FIXED.targetSame + BigInt(i), { calculationJdn: FIXED.calculationJdn });
    if (i === 1_199) growthChecksum = digest(canonical(value));
  }
  const growthElapsedMs = performance.now() - growthStart;
  const growthHeapAfter = process.memoryUsage().heapUsed;
  const growthStats = fast.getFastCacheStats();
  assert.ok(growthStats.entries <= 1_024, `fast result cache exceeded its documented capacity: ${growthStats.entries}`);
  rows.push({
    scenario: "1,200 unique conversions cache-growth workload",
    path: "fast/cache-growth",
    stats: { ...summarize([growthElapsedMs]), checksum: growthChecksum },
    notes: `entries=${growthStats.entries} (capacity 1024); heap delta=${((growthHeapAfter - growthHeapBefore) / 2 ** 20).toFixed(1)} MiB; fixed calculation day`,
  });

  // Warm authoritative operation. No cache-clearing API exists, so label it as warm state.
  authoritativeCalendar.convertJdn(FIXED.targetSame, { calculationJdn: FIXED.calculationJdn });
  const authWarm = await sample({
    n: Math.max(1, AUTH_N),
    operation: () => authoritativeCalendar.convertJdn(FIXED.targetNext, { calculationJdn: FIXED.calculationJdn }),
    validate: (value) => assert.deepStrictEqual(canonical(value), references.get("next-day")),
  });
  rows.push({ scenario: "forward next day after initialization", path: "authoritative/warm", stats: authWarm, notes: "same authoritative calendar instance; no cache reset API" });

  // Package router path with legitimate inline fallbacks. Browser Worker overhead is measured in web.mjs.
  const [{ PastafariEngineClient }, { PastafariCalendarRouterCore }, fastWorker, authWorker] = await Promise.all([
    import("../browser/pastafari-engine-client.js"),
    import("../browser/pastafari-calendar-router-core.js"),
    import("../browser/pastafari-fast-worker.js"),
    import("../browser/pastafari-authoritative-worker.js"),
  ]);
  const router = new PastafariCalendarRouterCore({
    fastClient: new PastafariEngineClient("fast", { inlineLoader: async () => fastWorker.handlePastafariWorkerRequest }),
    authoritativeClient: new PastafariEngineClient("authoritative", { inlineLoader: async () => authWorker.handlePastafariWorkerRequest }),
    verificationTimeoutMs: 240_000,
    authoritativeIdleShutdownMs: 60_000,
  });
  const firstRouter = await timed(() => router.convert(FIXED.targetSame, FIXED.calculationJdn));
  assert.deepStrictEqual(canonical(firstRouter.value), baseReference);
  rows.push({
    scenario: "first production-router result",
    path: "package-router/authoritative-first-inline",
    stats: summarize([firstRouter.elapsedMs]),
    notes: "user-visible result is authoritative; verification continues asynchronously",
  });
  const verificationPlusNext = await timed(() => router.convert(FIXED.targetNext, FIXED.calculationJdn));
  assert.deepStrictEqual(canonical(verificationPlusNext.value), references.get("next-day"));
  const routerStatus = router.getStatus(FIXED.calculationJdn);
  rows.push({
    scenario: "verification completion plus next result",
    path: `package-router/${routerStatus.status}`,
    stats: summarize([verificationPlusNext.elapsedMs]),
    notes: `final router status=${routerStatus.status}; includes waiting for verification if still running`,
  });
  router.dispose();

  memory.afterBytes = process.memoryUsage().heapUsed;
  memory.deltaBytes = memory.afterBytes - memory.beforeBytes;
  findings.push(`Fast identical lookups are explicitly separated from cache-miss work; final fast cache counters were ${JSON.stringify(fast.getFastCacheStats())}.`);
  findings.push(`The Pages year-structure path is measured independently from DOM rendering and from Worker message latency.`);
  findings.push(`Heap used changed by ${(memory.deltaBytes / 2 ** 20).toFixed(1)} MiB across this mixed engine workload; this is a coarse baseline, not a leak proof.`);
  limitations.push("Authoritative cold samples are intentionally small because each fresh process imports the large authoritative module graph; p95 on those rows is descriptive only.");
  limitations.push("The router row uses its real inline fallback transport to isolate routing/verification logic. Actual Worker startup and round-trip costs are measured by the browser benchmark.");
  limitations.push("The committed soak-validation document records 11 extreme-positive-JDN performance timeouts but does not enumerate their exact inputs. This suite does not invent replacements; it includes the committed soak regression case/boundary and an out-of-checkpoint-range case instead.");

  const report = {
    kind: "engine",
    environment: environment({
    browserVersion: null,
    engineHashes: {
      "fast entry": fileSha256("browser/pastafari-calendar-fast.js"),
      "authoritative entry": fileSha256("browser/pastafari-calendar-core.js"),
      "router core": fileSha256("browser/pastafari-calendar-router-core.js"),
    },
  }),
    rows,
    findings,
    limitations,
    memory,
    cases: FORWARD_CASES.map((item) => ({ ...item, calculationJdn: item.calculationJdn.toString(), targetJdn: item.targetJdn.toString(), distanceDays: item.distanceDays.toString() })),
  };
  const paths = await writeReport("engine", report);
  console.log(`Engine benchmark complete: ${paths.mdPath}`);
}

await main();
