# Memory and soak testing

This document describes the retained-memory tests for the JavaScript engine, reverse/constraint paths, router state, the Pages UI, and browser Workers.

The memory suite is an extension of the repository's existing `benchmarks/` infrastructure. It writes JSON and Markdown into `artifacts/benchmarks/`, uses the same deterministic calculation-day fixtures, and does not change the Pastafari algorithms, cache policy, routing policy, public API, production timeouts, translations, Service Worker policy, or astronomical-day code.

## What the suite is trying to distinguish

The tests deliberately do **not** define a memory leak as “memory is larger after work.” They distinguish:

- **legitimate warm-up growth** — module initialization, JIT work, lookup tables, and first-use caches;
- **bounded cache growth** — retained state grows with new inputs until a documented capacity is reached;
- **retained useful state** — state remains reachable by design because the live application may reuse it;
- **suspected leak** — post-GC retained heap continues to grow through the late batches with a meaningful approximately linear slope and no workload-specific reason for that growth;
- **confirmed leak** — source/lifecycle evidence identifies a reference that keeps objects reachable after their intended lifetime. The automated shape heuristic alone calls a pattern “suspected,” not “confirmed.”

A large stable heap can be correct. A smaller heap that increases on every stable repeated workload can be wrong.

## Current ownership/lifetime map

The table below records the state that is directly relevant to the memory workloads. “No explicit bound” is an architectural fact, not automatically a defect.

| Structure | Owner | Key / dimension | Expected lifetime | Bound / cleanup |
|---|---|---|---|---|
| `resultCache` | fast-engine module | conversion request | module lifetime or `clearFastCache()` | LRU 1024 |
| `calculationStates` | fast-engine module | calculation JDN | module lifetime or `clearFastCache()` | LRU 4 |
| `CalculationState.sauceCache` | one fast calculation state | engine-internal sauce lookup | calculation-state lifetime | LRU 64 per state |
| `CalculationState.structureCache` | one fast calculation state | engine-internal structure lookup | calculation-state lifetime | LRU 8 per state |
| `CalculationState.yearsByNumber` | one fast calculation state | Pastafari year number | calculation-state lifetime | **no explicit eviction bound**; parent calculation-state LRU is bounded |
| `gateDistanceCache` | fast-engine module | gate-distance lookup | module lifetime or `clearFastCache()` | LRU 4096 |
| `dynamicGatePositions` | fast-engine module | dynamic gate lookup | module lifetime or `clearFastCache()` | LRU 4096 |
| `yearStructureCache` | Pages fast Worker module | `calculationJdn:year` | Worker lifetime | LRU-by-insertion 8 |
| `enginePromise` | Pages fast Worker module | singleton | Worker lifetime | one promise/module namespace |
| reverse client `_pending` | `PastafariReverseClient` | request id | request lifetime | deleted on result/error/timeout/abort; cleared by `dispose()` |
| constraint client `_pending` | `PastafariConstraintClient` | request id | request lifetime | deleted on result/error/timeout/abort; cleared by `dispose()` |
| constraint solver `universeCache` and queues/maps | one direct solve call | variable/domain work | solve-call lifetime | local references; expected to become unreachable after completion/cancellation |
| router `_states` | `PastafariCalendarRouterCore` | calculation JDN | router lifetime | **no automatic bound**; `retry()` can delete one/all and `dispose()` clears all |
| router `authoritativeRequests` | one router calculation state | target JDN | in-flight request lifetime | `.finally()` deletes the completed request |
| router authoritative shutdown timer | router instance | singleton timer | until shutdown/retry/dispose | previous timer is cleared before replacement; `dispose()` clears it |
| Pages UI `pending` Worker requests | `docs/app.js` document module | request id | in-flight request lifetime | deleted on result or timeout; request timer cleared on result |
| Pages UI fast Worker | `docs/app.js` document module | singleton | document lifetime | one Worker instance for the page |
| locale ES modules | browser module loader | locale module URL | document/module lifetime | bounded by the finite locale set; first load may legitimately increase memory |
| generated authoritative-engine module state | authoritative module graph | generated tables/state | module/application lifetime | no stable public cache-introspection/reset API; do not infer a leak from generated module-lifetime data alone |

The fast-engine capacities are checked from the implementation by test-only source inspection rather than by adding public exports. The Pages Worker cache bound is checked the same way. The existing public `getFastCacheStats()` is used for the result-cache invariant. No new production debug API is introduced.

## Node measurement protocol

Important Node scenarios run in **fresh child processes** so retained state from one scenario cannot contaminate another.

Each child is started with `--expose-gc`. A normal retained-memory sequence is:

1. import/initialize the path under test;
2. warm the scenario;
3. take four GC-only calibration samples;
4. perform two explicit GC cycles with event-loop turns;
5. record the post-GC baseline;
6. run one workload batch;
7. allow an event-loop turn, perform two GC cycles, and record memory;
8. repeat for all batches.

Every point records `heapUsed`, `heapTotal`, `rss`, `external`, and `arrayBuffers` from `process.memoryUsage()`. When available, `process.getActiveResourcesInfo()` is also recorded for timer/resource diagnostics.

`heapUsed` after GC is the primary signal for retained JavaScript objects. `heapTotal` and RSS are descriptive: V8 and the system allocator may keep committed pages after the objects that used them have become unreachable. `external` and `arrayBuffers` are separate because TypedArrays, crypto buffers, and other native-backed allocations can be poorly represented by `heapUsed` alone.

Initialization footprint is reported separately as process-before-import → after-engine-import → after-first-calculation. It is informational rather than a merge gate.

## Node workloads

The suite implements the following isolated scenarios:

- `repeated-identical` — repeated identical forward conversion after warm-up; output is consumed and the result cache must remain at one entry;
- `unique-targets` — enough unique target days to exceed the 1024-entry result-cache capacity; the late batches therefore exercise the bounded plateau rather than only initial filling;
- `calculation-days` — many calculation days with a fixed target; this records the combined effect of the 4-state calculation LRU and the separately bounded result cache;
- `calculation-cycle` — repeated `A → B → C → A → B → C`; after the three keys are warm, duplicate retained calculation-state copies should not accumulate;
- `year-structure` — more than eight distinct year structures are loaded to exercise the Pages Worker cache bound, followed by repeated reuse of already loaded structures;
- `reverse-success` — repeated successful reverse lookup with correctness verification;
- `reverse-cancel` — repeated client timeout/cancellation, disposal, cache reset, event-loop settling, and post-GC measurement;
- `constraints-success` — repeated successful acyclic constraint solving with solution verification;
- `constraints-cancel` — repeated timeout/cancellation through the public constraint client;
- `router-state` — deliberately grows the router's per-calculation-day status map and then measures cleanup after `dispose()`; this is reported as retained useful state because the current architecture has no automatic bound;
- `far-date` — increasing far-date traversals for observing retained year/checkpoint behavior; it is informational because `CalculationState.yearsByNumber` has no explicit per-state eviction bound.

The regular memory smoke uses the smaller forward/calculation/cancellation set. The manual soak adds the heavier year, reverse/constraint, router, and far-date paths.

Every workload consumes and validates results. Stable SHA-256 checksums are compared across fresh-process repetitions; CI also compares portable fast-engine scenario checksums with the base-commit engine. A memory test cannot pass because the engine silently stopped doing the requested work.

## Shape heuristic and thresholds

The Node gate is intentionally based on shape and measured noise, not `heapUsed < N MB`.

For the late batches, the runner computes a least-squares line for `batch number → post-GC heapUsed` and its `R²`. The default allowed late retained growth is:

```text
max(8 × measured GC-noise range, 8% × post-warm-up baseline heap)
```

A gated scenario is marked as a suspected leak only when all of these are true:

- late growth exceeds that allowance;
- late slope is positive;
- late `R² >= 0.72`;
- if early growth was positive, the late slope is still at least 25% of the early slope.

That last condition is useful for distinguishing cache filling that decelerates into a plateau from growth that continues at roughly the same rate. A broad relative runaway guard also catches a final post-GC heap greater than eight times the post-warm-up baseline. It is a last-resort relative guard, not an absolute MB budget.

Each regular scenario is repeated in three fresh processes. One noisy shape failure does not fail the run; a majority does. Deterministic cache-capacity invariants are stronger than heap heuristics and fail directly when violated.

### Candidate versus base commit

On push/PR CI, the workflow materializes `browser/pastafari-calendar-fast.js` from the PR base/push-before commit and runs portable engine-memory scenarios against both implementations on the **same GitHub runner**. Candidate/base ordering is isolated by fresh processes rather than by sharing one V8 heap.

The comparison allowance is again derived from measured noise and relative live heap, not a committed MB number. This avoids pretending that a Node/V8 major upgrade has the same absolute baseline as the old runtime.

There is intentionally no `memory-baseline.json` and no automatic baseline-update command at present. The base commit is the machine-comparable baseline. If the project later needs a long-term version-controlled baseline, it should be introduced only after enough GitHub-runner samples exist to justify stable fields and thresholds.

## Calculation-day interpretation

Changing calculation day legitimately creates new result-cache keys until the result-cache LRU fills. Therefore the `calculation-days` heap curve is not required to be flat before that architectural bound is reached.

The stronger invariants are:

- fast calculation states are statically bounded to four live states;
- the public result cache is bounded to 1024 entries;
- repeated cycling among three already-seen calculation days is a plateau-gated workload;
- the router is different: its status map is not automatically bounded and is reported separately rather than being confused with the fast-engine calculation-state LRU.

If a future implementation changes one of those ownership rules, the source-bound diagnostics and this document must be updated together.

## Reverse, constraints, cancellation, and timers

Cancellation is tested through the public clients rather than by directly throwing inside the solver. The clients remove abort listeners, clear timeout timers, delete pending-map entries, and `dispose()` the client. Measurements occur after event-loop settling and explicit GC.

`process.getActiveResourcesInfo()` is recorded where the running Node version exposes it. It is a diagnostic signal only: unrelated harness resources can exist, so the suite does not require an impossible globally empty handle list.

The direct constraint solver's per-call maps/queues are expected to become unreachable after the returned promise settles or aborts. The test intentionally repeats both success and cancellation paths because cleanup bugs often appear only on exceptional exits.

## Browser and DOM memory

`memory-browser.mjs` uses Chromium only. It does **not** present Chromium-specific numbers as universal browser metrics.

The harness uses CDP:

- `HeapProfiler.collectGarbage` for controlled page-target GC;
- `Performance.getMetrics` for `JSHeapUsedSize` and `JSHeapTotalSize`;
- `Memory.getDOMCounters` for documents, DOM nodes, and JavaScript event listeners.

The browser page is served through the same style of local deterministic HTTP server used by the existing Web benchmark. Service Workers are blocked for these measurements so disk-backed `CacheStorage` is not confused with page-process memory.

The UI soak repeatedly exercises:

- target-date calculations;
- English/Hebrew LTR↔RTL switching;
- calculation-day changes when the current UI form exposes the expected date field/state transition;
- comparison open/close on desktop;
- repeated rendering of the year/calendar UI;
- in full soak, every locale option once and then the same locale set a second time.

The all-locale first pass is explicitly warm-up: ES modules may legitimately enter the document's module cache. The second pass is the repeated-use check; it should not reproduce the first-pass retained growth simply because the same locale is selected again.

DOM node and event-listener counts are complementary diagnostics. Their late-growth allowance is also relative/noise-derived; they are never used as a substitute for JS heap.

## Worker lifecycle

Chromium smoke/soak repeatedly:

1. creates the real Pages fast Worker;
2. performs `getCutletView` and validates the result;
3. calls `terminate()`;
4. drops the page-side reference;
5. waits until Playwright's `page.workers()` list returns to zero;
6. performs page-target GC and records metrics;
7. repeats in batches.

A limitation is important: page-target `JSHeapUsedSize` does not directly include the separate Worker isolate's heap. The reliable gate here is therefore lifecycle plus page-side retained state; exact Worker-isolate retained bytes are not claimed. RSS is not substituted as a fake precision metric.

## Leak-detector validation

The deterministic test `test/memory-analysis.test.js` verifies that the analyzer accepts plateau/noise shapes and rejects sustained linear retained growth.

During development of this infrastructure, the same analyzer must also be exercised against a temporary process that intentionally retains allocations (for example by pushing newly allocated objects into a module-level array) and against a stable non-retaining control. That temporary leak fixture is **not** part of production or the committed test suite. A development report should record that the leaking fixture failed and the stable control passed repeatedly, then confirm the fixture was removed.

This validation tests the detector itself; it does not prove that a particular production object graph is leaking.

## Heap snapshots

`npm run memory:snapshot` is an explicit diagnostic tool. It warms a representative fast-engine cache workload, performs controlled GC, and writes a V8 `.heapsnapshot` locally.

Heap snapshots are intentionally not produced by CI and are not uploaded by the workflows. A snapshot can contain filesystem paths, environment strings, and runtime data even when the application itself handles no personal data. Treat it as debugging material, not a normal public artifact.

## Commands

```bash
# Node + Chromium memory smoke (Chromium must be installed for Playwright)
npm run test:memory

# Node smoke only
npm run test:memory:node

# Chromium UI + Worker smoke only
npm run test:memory:browser

# Heavier Node + browser soak
npm run test:memory:soak

# Optional local heap snapshot; never automatic CI output
npm run memory:snapshot
```

For a fresh checkout before browser tests:

```bash
npm ci
npx playwright install --with-deps chromium
```

To reproduce the base-commit comparison manually, materialize the old fast-engine file and pass it to the Node runner:

```bash
git show <BASE_SHA>:browser/pastafari-calendar-fast.js > /tmp/pastafari-fast-baseline.mjs
node --expose-gc benchmarks/memory.mjs \
  --mode smoke \
  --baseline /tmp/pastafari-fast-baseline.mjs \
  --output memory-smoke
```

## CI behavior

`.github/workflows/benchmark.yml` remains the benchmark/performance workflow; memory testing is added to it rather than creating a parallel performance system.

On ordinary push/PR:

- the existing benchmark API smoke still runs;
- `memory-smoke` resolves the base commit using the same repository-history principle as the existing performance-regression CI;
- Node 22 is fixed for candidate/base retained-memory comparison;
- Chromium is installed for the page/Worker memory smoke;
- reports are appended to the GitHub job summary;
- compact JSON/Markdown reports are uploaded only on failure.

On `workflow_dispatch`:

- the existing full performance benchmark still runs;
- a separate `memory-soak` job runs the heavier Node and Chromium workloads;
- JSON/Markdown memory reports are uploaded for later inspection.

No heap snapshots are uploaded.

## What a failure means

A failure message/report contains the scenario, post-warm-up baseline, final heap, late growth, late slope, measured noise allowance, cache/router counts where available, and base-commit comparison where available.

A shape failure means **possible retained-memory regression**, not automatically “confirmed memory leak.” Before changing cache policy, inspect the ownership map, the batch points, cache-entry counts, and — when needed — a locally generated heap snapshot. Do not add eviction merely to make a graph flatter.

If a real leak is confirmed, the acceptable fix is narrow: identify the retaining reference/lifecycle error, add a regression workload that fails before the fix, preserve outputs/API semantics, and rerun the existing performance/correctness suites so a memory fix does not silently destroy useful caching.

## Limitations

- V8 may retain committed heap pages after objects become unreachable.
- RSS includes more than reachable JavaScript objects and need not fall after GC.
- Explicit GC reduces noise but does not make GC/allocator behavior mathematically deterministic.
- GitHub-hosted runners are useful for same-run candidate/base evidence but are not laboratory instruments.
- Chromium/CDP page memory is browser-specific and is not directly comparable with Node heap.
- Page-target heap does not directly measure a separate Worker isolate.
- ES module caches have document/module lifetime; first-time locale loading is legitimate bounded warm-up.
- Service Worker CacheStorage is disk/storage state, not a page-heap leak metric, and is deliberately excluded here.
- A PASS means the tested workloads did not show the guarded retained-growth patterns; it is not a proof that no leak can exist on any untested path.
