# Performance benchmarks

This directory contains the reproducible performance and retained-memory baseline infrastructure for the JavaScript package and the real `docs/` Web application.

The benchmark suite is observational. It does not change the Pastafari algorithm, cache policy, production timeouts, routing policy, translations, or astronomical-day code.

## Commands

- `npm run benchmark` — run engine, reverse/constraints, and Chromium Web benchmarks; write the combined performance report.
- `npm run benchmark:engine` — direct fast/authoritative engine, cache, year-structure, and package-router measurements.
- `npm run benchmark:reverse` — reverse lookup and constraint-solver measurements.
- `npm run benchmark:web` — real `docs/` application in Chromium plus direct browser Worker probes.
- `npm run benchmark:smoke` — short correctness/API smoke for CI; this is not a performance baseline.
- `npm run test:memory` — retained-memory smoke: isolated Node scenarios plus Chromium UI/Worker memory checks.
- `npm run test:memory:node` — Node-only retained-memory smoke with explicit GC.
- `npm run test:memory:browser` — Chromium-only page/DOM/Worker memory smoke.
- `npm run test:memory:soak` — heavier Node and Chromium memory soak intended for manual CI or deliberate local runs.
- `npm run memory:snapshot` — explicit local V8 heap snapshot after a representative workload; never a normal CI artifact.

Reports are written to `artifacts/benchmarks/` as both Markdown and JSON. Raw timing sample arrays and memory batch points are kept in JSON.

## Fixed inputs

The suite deliberately does not use “today” as a performance input. The principal calculation day is Gregorian 2026-08-06 / JDN `2461259`, matching existing repository compatibility tests. Additional fixed distances cover adjacent days, roughly one year, 100 years, 1,000 years, the Foundation JDN, a point beyond the last generated fast-engine gate checkpoint used by the compatibility suite, and both the documented soak-regression case and its localized boundary around calculation JDN `3663448`.

Reverse and constraint cases are also deterministic. No unseeded random inputs are used.

## What `cold` means

There are several different cold states and they are named rather than merged:

- **`cold-process`**: a fresh Node process. Module state and JavaScript caches are fresh. Import time and first-conversion time are reported separately. Parent process-spawn time is reported only in a separately labelled envelope row.
- **`cache-miss`**: the fast module is already loaded, but `clearFastCache()` is called immediately before the measured conversion. This is not a module cold start.
- **cold browser visit**: a fresh Playwright browser context with empty HTTP/storage state. The application receives fixed `t`, `v`, and `c` URL parameters.
- **warm browser visit**: the same context is reused after the assets/application have already loaded. Service Worker controller state is written into the row notes.

A cached identical lookup is always named `cache-hit`; it must never be interpreted as the cost of a full Pastafari conversion.

For memory scenarios, a fresh child process is the canonical **cold memory state**. Scenarios are process-isolated instead of running one after another in a shared Node heap.

## What is measured

### Engine

`engine.mjs` measures:

- fast direct conversion in fresh processes;
- authoritative direct conversion in fresh processes (small samples because it is expensive);
- module import cost separately from calculation cost;
- fast cache misses and identical cache hits;
- nearby targets with fixed calculation day;
- fixed target with changing calculation day;
- a 366-day sequential range with total time, time/day, and days/second throughput;
- the Pages year-structure computation before DOM rendering;
- the Pages year-structure cache hit;
- a 1,200-unique-conversion cache-growth workload with the documented result-cache capacity checked;
- warm authoritative conversion;
- the package router's authoritative-first result and the verification transition, using the router's legitimate inline fallback transport.

The package router and the Pages website are deliberately not treated as one path. The package router is authoritative-first and verifies the fast engine. The current Pages application directly uses its own fast Worker. The Web benchmark measures that real website path.

### Reverse and constraints

`reverse-constraints.mjs` measures:

- known-calculation reverse lookups at increasing distances;
- a bounded `SAME_AS_TARGET` diagonal search with progress counters;
- an intentional reverse timeout (reported as `TIMEOUT`, not a correctness failure);
- an acyclic constraint chain;
- cyclic joint solving at two domain sizes;
- an intentional constraint timeout;
- coarse heap change across the reverse/constraint workload.

The JSON report retains the solver/checksum data used to consume and validate the results.

### Web / browser

`web.mjs` launches Chromium and serves the repository through a tiny local HTTP server. It measures the actual `docs/index.html` application with deterministic URL inputs:

- cold startup in English LTR and Hebrew RTL;
- HTML `responseEnd`, `DOMContentLoaded`, and enabled target-form controls as distinct readiness milestones;
- Navigation Timing `DOMContentLoaded`;
- latest window-visible JavaScript resource `responseEnd` (named exactly that; it is **not** called TTI or module-evaluation time);
- time to the first visible calendar result;
- time until the full year structure is visible;
- a warm online revisit;
- a subsequent user calculation to the updated DOM;
- English-to-Hebrew UI/language switching without changing calculation state;
- an offline revisit when the Service Worker is available;
- the actual Pages fast Worker first and second `getCutletView` round-trips;
- package fast/authoritative browser Worker startup, first round-trip, and second round-trip.

The Pages Worker does not publish a separate readiness message. Its first-round-trip metric therefore includes Worker creation, module loading, and the first computation. The harness does **not** invent a separate `engine-ready` or module-evaluation timestamp. Package Workers do expose a `ready` protocol, so their startup can be separated from request round-trip time.

Network counts and JavaScript bytes are collected from the local server's `Content-Length` responses. Those values are useful for regression comparison inside this harness; they are not a claim about GitHub Pages CDN compression or transfer sizes.

### Retained memory

`memory.mjs` is the parent retained-memory runner. It launches `memory-scenario.mjs` in fresh Node processes with `--expose-gc`, calibrates GC-only noise, stores every post-GC batch point, checks output checksums/cache bounds, and computes early/late growth slopes. It measures `heapUsed`, `heapTotal`, RSS, `external`, and `arrayBuffers` separately.

The Node smoke covers repeated identical conversion, enough unique targets to fill the result-cache LRU, many calculation days, repeated calculation-day cycling, and reverse timeout/cancellation cleanup. The full soak additionally covers repeated successful reverse work, successful/cancelled constraints, Pages year structures, router state cleanup, and far-date retained state.

`memory-browser.mjs` is deliberately Chromium-specific. It uses CDP explicit page-target GC, JS heap metrics, and DOM counters while repeatedly exercising target calculations, locale rerenders, calculation-day changes where the UI exposes them, desktop comparison, and real Pages Worker creation/termination. The full browser soak loads every available locale once and then repeats the same locale set so one-time ES-module loading is not confused with repeated leakage.

The complete method, current cache/state ownership map, thresholds, and limitations are documented in `docs/MEMORY-TESTING.md`.

## Correctness guards

A benchmark is not allowed to “win” by returning or consuming nothing.

- Direct fast benchmark cases are compared to the authoritative implementation, following the same oracle relationship used by the repository's compatibility tests.
- Repeated operations are compared against canonical results or stable SHA-256 checksums.
- Reverse results must contain the intended target/calculation pair.
- Constraint results must contain the intended verified solution and completion state where completion is expected.
- Web runs verify the selected JDN, language direction, visible result, and identical first/second Worker output.
- Memory runs consume results and require stable checksums between fresh-process repetitions; candidate/base-commit checksums are compared for portable fast-engine scenarios.
- Static cache-capacity checks are preferred over heap heuristics where the architecture provides a real bound.

The benchmark suite complements correctness tests; it does not replace them.

## Statistics

Short operations use repeated samples; heavy authoritative/reverse/constraint cases use smaller samples by design. Every timing row reports `n`, minimum, median, p95, and maximum. When `n < 20`, `p95LowConfidence` is `true` in JSON and the Markdown report warns that the p95 is descriptive rather than a stable tail estimate.

For a 366-day range the report also states days/second. Avoid comparing more significant digits than the timer noise and sample count justify.

Memory scenarios use a different statistic because their question is different: regression slope on post-GC retained memory across batches, plus late-vs-early growth and measured GC noise. They do not turn RSS or a single before/after heap number into a leak assertion.

## Environment and comparison

Every report records commit SHA, timestamp, OS, architecture, CPU model, logical CPU count, RAM, Node version, package version, benchmark-suite version, debug state, Chromium version where applicable, and SHA-256 identities for the relevant engine/worker entry files. Memory reports additionally record V8 version, GC exposure/protocol, process isolation, and raw batch measurements.

Do not compare absolute timings or RSS from different machines as if they were equivalent. Prefer before/after runs on the same machine, same Node/browser versions, and comparable thermal/background-load conditions. GitHub-hosted runners are useful for coarse longitudinal evidence but are not stable laboratory benchmark machines.

For push/PR memory checks, the workflow materializes the base commit's fast engine and compares it with the candidate on the same runner. This is preferred to a fabricated or stale version-controlled MB baseline.

## Memory interpretation

The coarse before/after heap values retained in the older performance reports remain descriptive only. The dedicated memory suite is the leak/regression detector.

Its primary metric is post-GC `heapUsed`. `heapTotal` and RSS may remain high after objects are unreachable because V8 and the system allocator can retain pages. Native-backed data are tracked separately through `external` and `arrayBuffers`.

A late-growth failure is reported as a **possible retained-memory regression**, not automatically a confirmed leak. Some paths intentionally retain bounded or useful state; for example, a calculation-day workload can legitimately fill the bounded result cache, while the router currently retains one status entry per calculation day until `retry()`/`dispose()`. See `docs/MEMORY-TESTING.md` before changing cache policy.

## CI

`benchmark:smoke` remains suitable for ordinary CI and checks that the benchmark-facing APIs still exist and return coherent results. `.github/workflows/benchmark.yml` also runs `memory-smoke` on ordinary `push`/`pull_request` events. The memory job uses Node 22, a base-commit fast-engine file from repository history, three fresh processes per Node scenario, and Chromium for the UI/Worker memory smoke. JSON/Markdown reports are added to the job summary; failure reports are uploaded as artifacts.

On `workflow_dispatch`, the existing full performance benchmark still runs, and a separate `memory-soak` job executes the heavier Node/browser memory suite and uploads its Markdown/JSON reports. Heap snapshots are never generated or uploaded automatically.

The repository also has the separate `performance-regression` job in `.github/workflows/test.yml`, backed by `scripts/run-performance-regression.mjs`. That timing/throughput guard is preserved; the dedicated memory suite reuses its same-run base-commit comparison principle rather than replacing it.

No hard absolute latency or absolute-MB threshold is enforced by `benchmark.yml`. Memory shape thresholds are relative to the live post-warm-up heap and measured GC noise, with deterministic cache bounds used where possible.

## Known-source limitation for soak timeout inputs

`docs/FAST-ENGINE-SOAK-VALIDATION-2026-08-15.md` records 11 performance timeouts at very large positive JDN values, but the committed document does not enumerate those exact inputs. This benchmark therefore does not invent replacements. It includes the documented batch-37 soak case/boundary and a deterministic out-of-checkpoint-range case; any future commit that adds the exact timeout inputs should add them as a separately named pathological-case group.
