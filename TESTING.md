# Testing Pastafari Calendar

The test suite is intentionally tiered. The default developer command is fast and deterministic; expensive compatibility, deep, exhaustive, soak, browser, memory, visual, and performance checks remain separate.

## Developer and release commands

| Command | Purpose |
|---|---|
| `npm test` | Default developer gate. Alias of `npm run test:fast`. |
| `npm run test:fast` | Deterministic Node smoke/unit/invariant suite for ordinary development. |
| `npm run test:compatibility` | Full fast-vs-authoritative compatibility vectors and cutlet comparisons. |
| `npm run test:deep` | Expensive Node correctness, reverse/constraint, diagnostics, i18n, year-structure, and extreme-performance regressions. |
| `npm run test:full` | `fast` + `compatibility` + `deep`; no soak/exhaustive/browser suites. |
| `npm run test:release` | Release-critical Node correctness alias of `test:full`. `release:prepare` and `release:verify` use this tier. |
| `npm run test:checkpoint:sides` | Representative checkpoint-neighbour compatibility checks. |
| `npm run test:exhaustive` | Exhaustive checkpoint-side checks plus full checkpoint reconstruction. |
| `npm run test:soak` | Deterministic calendar-property soak. |
| `npm run test:soak:engine` | Long-running fast-engine soak harness. |
| `npm run test:regression:year-ceiling` | Expensive soak-derived real year-ceiling regression that is skipped in ordinary runs. |
| `npm run test:memory` | Node + browser memory smoke. |
| `npm run test:memory:soak` | Long memory soak. |

For a normal edit, run `npm test`. Before a release or a sensitive engine/reverse change, run `npm run test:release` and the relevant specialized CI/local suites. Soak and exhaustive suites are intentionally not part of `npm test`.

## Node test-file classification

| File | Tier | Reason |
|---|---|---|
| `test/calendar-converters.test.js` | fast | Calendar API/vectors and ordinary round-trip checks. |
| `test/calendar-input-conventions.test.js` | fast | Input parsing and naming conventions. |
| `test/calendar-properties.test.js` | fast | Deterministic property smoke. |
| `test/checkpoint-compatibility.test.js` | exhaustive/specialized compatibility | Environment-gated checkpoint side/rebuild tests; all subtests are skipped unless explicitly enabled. |
| `test/constraints.test.js` | deep | Real reverse/constraint solving and exhaustive finite-domain checks. |
| `test/day-boundary.test.js` | fast | Deterministic astronomical boundary invariants without launching a browser. |
| `test/diagnostics.test.js` | deep | Real engine/reverse/constraint diagnostics and overhead exercise. |
| `test/docs-consistency.test.js` | fast | Documentation/checker invariants. |
| `test/extreme-performance.test.js` | deep | Former-timeout and bounded-work regression cases. |
| `test/fast-compatibility.test.js` | compatibility | Authoritative-vs-fast vectors, whole-cutlet comparisons, uniform-choice equivalence, and checkpoint table checks. |
| `test/i18n-support-levels.test.js` | fast | Locale support-level metadata invariants. |
| `test/i18n.test.js` | deep | Full locale coverage plus real cutlet/comparison behavior. |
| `test/memory-analysis.test.js` | fast | Pure analysis logic for memory-regression detection; it does not run a memory soak. |
| `test/pages-reverse-engine.test.js` | fast | Pages reverse-engine adapter/export contract. |
| `test/public-api.test.js` | fast | Public API behavior and backward-compatible `todayProvider` bypass. |
| `test/pwa-i18n.test.js` | fast | Static PWA/i18n wiring and canonical-engine byte checks. |
| `test/release-infrastructure.test.js` | fast | Release/checksum/package validation helper invariants. |
| `test/reverse-pages-integration.test.js` | fast | Bounded real reverse-search integration smoke. |
| `test/reverse-pages-wiring.test.js` | fast | Static Pages reverse-search wiring. |
| `test/reverse-search-controller.test.js` | fast | Reverse UI/controller unit behavior. |
| `test/reverse.test.js` | deep | Real reverse API searches, recursive calculation-day resolution, diagonal search, worker path. |
| `test/router-concurrency.test.js` | fast | Router isolation/concurrency regression smoke. |
| `test/router-fallback.test.js` | fast | Router failure/fallback behavior. |
| `test/standalone-build.test.js` | fast | Checked-in standalone artifact structure. |
| `test/year-ceiling-detour.test.js` | fast by default; optional expensive regression | Two unit regressions run normally; the real soak-derived regression is exposed by `npm run test:regression:year-ceiling`. |
| `test/year-structure.test.js` | deep | Materializes and validates a complete real Pastafari year. |

## Browser fixtures and support files under `test/`

| File/path | Category |
|---|---|
| `test/browser-smoke.html` | Browser smoke fixture used by browser runners. |
| `test/calendar-roundtrip-browser-smoke.html` | Browser round-trip fixture; launched by `scripts/run-calendar-roundtrip-browser-smoke.mjs`. |
| `test/file-protocol-smoke.html` | `file://` standalone/browser fixture. |
| `test/standard-equivalence.html` | Browser equivalence fixture. |
| `test/property/calendar-property-harness.js` | Deterministic property/soak harness used by `scripts/run-calendar-property-soak.mjs`. |
| `test/visual/README.md` | Visual-regression baseline documentation. |
| `test/visual/SHA256SUMS.txt` | Visual baseline integrity manifest. |
| `test/visual/baseline-metadata.json` | Visual baseline metadata. |

## Specialized suites kept outside the default path

- Browser/file protocol/i18n: `test:file-protocol`, `test:i18n-support`, `test:i18n-lazy`, `test:reverse-ui`, `test:day-boundary`, `test:accessibility`, PWA offline runner, and visual-regression scripts.
- Compatibility/exhaustive: `test:compatibility`, checkpoint side/exhaustive/rebuild modes, and the independent implementation workflow.
- Soak/property: `scripts/run-calendar-property-soak.mjs` and `scripts/soak-fast-engine.mjs`.
- Memory/performance: `test:memory`, `test:memory:soak`, benchmark scripts, and the baseline-aware performance-regression CI job.
- E2E: `scripts/run-user-e2e.mjs`.
- Calendar-converter audit: `scripts/run-calendar-roundtrip-audit.mjs` remains a separate audit harness rather than part of the default developer gate.

The CI workflows preserve these specialized gates separately. A suite is not converted into a warning, shortened by reducing its cases, or silently skipped merely to make `npm test` faster.

## Change-aware GitHub Actions

Push and pull-request workflows use `scripts/ci-change-classifier.mjs` to classify the complete changed-file set before specialized jobs are selected. The policy is deliberately conservative: unknown paths, workflow changes, package metadata, and CI/security/release infrastructure force the full specialized CI set. `SHA256SUMS.txt` does not force full CI by itself because it normally changes alongside the real edited files and is verified by the always-on `node-test` job.

The `node-test` job remains unconditional and keeps the fast test tier, documentation checks, i18n validation, standalone rebuild comparison, supply-chain check, and repository checksum verification. Specialized compatibility, deep, browser, accessibility, PWA, day-boundary, performance, benchmark, visual, and independent-implementation jobs are selected only when their mapped inputs can be affected. The checkpoint matrix retains all three historical check names; when irrelevant its matrix jobs execute only a cheap no-op rather than removing those checks.

Manual benchmark and visual workflows retain their previous behavior. Manual benchmark runs still execute the full benchmark and memory-soak jobs, and visual `workflow_dispatch` still runs either the normal visual suite or baseline capture according to the existing `capture_baselines` input. Scheduled property soak and manual release verification are unchanged.

Run `npm run test:ci-change-classifier` to validate representative engine, UI, locale, documentation, workflow, package, mixed, manual, benchmark, implementation, checksum-manifest, and unknown-path scenarios. The same classifier policy is used for both push and pull-request changed-file sets; new branches, unsupported events, missing SHAs, or failed `git diff` resolution fall back to full CI.

### Update 16 oracle authority boundary

Normative conformance is judged by the hierarchy `Scroll > independent reference > implementations/generated artifacts`. Legacy canonical-format generators and vectors remain useful regression witnesses, but they are explicitly non-authoritative unless validated downstream of the independent reference. See `docs/authority/ORACLE-AUTHORITY.md` and `verification/update16/`.

