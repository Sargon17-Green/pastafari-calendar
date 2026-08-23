# Update 15 — Random / witness / host-diagnostics isolation completion package

## Scope

This package is aligned to the uploaded post-Update-14 tree `pastafari-calendar-main(20260823-190525).zip`.

Update 15 audits and hardens host-provided or random-looking runtime inputs that must not affect normative calendar semantics:

- `Math.random` and Proxy noise in the authoritative generated source.
- The matching browser chronicle copy of the authoritative generated source.
- Diagnostics-only host APIs such as `performance.now`, `process.hrtime.bigint`, `Date.now`, and diagnostic `WeakSet` allocation.
- Recovery after injected host/random faults.

The package is deliberately narrow. It does not remove `Math.random`, crypto, witness maps, or diagnostics hooks. It prevents their faults from leaking into persistent shared state or from changing calendar results/exceptions.

## Production changes

### `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`

Adds an Update-15 outer arena guard around the generated Proxy `apply` path.

The pre-existing inner `finally` remains in place, but an additional outer guard captures the shared arena length before the decorative/witness path and restores it if a host/random fault occurs before the inner cleanup is reached. The original injected exception is rethrown.

Markers:

- `__pastafariUpdate15OuterArenaBase`
- `__pastafariUpdate15OuterArenaError`
- `U15D`
- `U15E`

### `browser/pastafari-calendar-core-chronicle.js`

Carries the same generated-source guard as the authoritative source, keeping the browser chronicle in parity.

### `browser/pastafari-diagnostics.js`

Hardens diagnostics so host-provided diagnostics sources do not become semantic failures:

- `pastafariMonotonicNow()` now attempts `performance.now`, then `process.hrtime.bigint`, then `Date.now`, but ignores thrown/non-finite diagnostics-clock failures and returns the last safe fallback value if all clocks fail.
- Diagnostic object sanitization still attempts `new WeakSet()`, but if allocation throws, it uses a bounded `UPDATE15_SEEN_ASH_BUCKET` sink instead of replacing the calendar result/exception with a diagnostics failure.

## Verification added

### CI-facing smoke regression

`test/update15-random-witness-isolation.test.js` verifies:

- Update-15 outer arena guard markers exist in both generated authoritative files.
- The diagnostics ash bucket guard exists.
- `performance.now` / `process.hrtime.bigint` / `Date.now` injected failures are diagnostic-only.
- `WeakSet` allocation failure is diagnostic-only in detailed diagnostics mode.

This test is added to `package.json` under `test:fast`.

### Local evidence runner

`verification/update15/run-random-witness-isolation.mjs` runs bounded local evidence and writes:

- `artifacts/update-15-random-witness-isolation.json`
- `artifacts/update-15-random-witness-isolation-run.log`

Executed checks in this environment:

| Check | Result |
| --- | --- |
| `Math.random` profile `zero` + recovery | PASS |
| `Math.random` fault at call 1 + recovery | PASS |
| diagnostics host-fault isolation | PASS |
| static guard check: authoritative source | PASS |
| static guard check: browser chronicle | PASS |
| static guard check: diagnostics | PASS |
| crypto cold/fault matrix | SKIP in local runner; probe included |

The crypto probe remains available as `verification/update15/crypto-cold-probe.mjs` and the generic probe also supports `--kind=crypto-profile` / `--kind=crypto-fault`. The local runner skips the crypto matrix because in this uploaded ZIP environment the crypto cold probe exceeded the available execution window; this is recorded as a limitation, not as a semantic pass.

## Commands run in this environment

| Command | Result | Evidence |
| --- | --- | --- |
| `node --test test/update15-random-witness-isolation.test.js` | PASS, 4/4 | `artifacts/update-15-node-test.log` |
| `node verification/update15/run-random-witness-isolation.mjs` | PASS with crypto matrix SKIP | `artifacts/update-15-random-witness-isolation.json`, `artifacts/update-15-random-witness-isolation-run.log` |
| `npm run build:standalone` | BLOCKED | `artifacts/update-15-build-standalone.log` |
| `npm run test:fast` | INCOMPLETE / environment timeout after 102 passing subtests | `artifacts/update-15-test-fast-partial.log` |
| `node --test test/diagnostics.test.js` | INCOMPLETE / environment timeout before TAP subtests | `artifacts/update-15-diagnostics-test-timeout.log` |

## Known blockers / limitations

1. **Standalone bundle not regenerated.** `npm run build:standalone` fails in this environment because `esbuild` is not installed (`ERR_MODULE_NOT_FOUND`). Therefore the delta does not update `browser/standalone/*`.
2. **Full `test:fast` not completed locally.** The run timed out in this environment after 102 already-passing TAP subtests. No failure was observed before timeout.
3. **Full diagnostics test file not completed locally.** The targeted Update-15 diagnostics regression passes, but the broader `test/diagnostics.test.js` timed out before emitting subtests in this environment.
4. **Crypto matrix not fully executed locally.** The probes are included for CI/local rerun; the local completion runner records the matrix as SKIP.
5. **Independent 5-tuple reference remains out of scope.** Update 15 verifies foundational day-number stability through the independent raw export and keeps the full public 5-tuple dependent on existing project vectors. Full independent 5-tuple reproduction remains a later-task item.

## Acceptance summary

```text
UPDATE_15_LOCAL_RANDOM_WITNESS_ISOLATION = PASS_WITH_LIMITATIONS
PRODUCTION_CHANGED = yes
STANDALONE_REBUILT = no, blocked by missing esbuild
FULL_CI_REPLACED_BY_LOCAL_EVIDENCE = no
READY_FOR_UPLOAD_AS_DELTA = yes
```
