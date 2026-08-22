# Update 8 — Stage 7 focused router repair

## Status

```text
SOURCE_FIX_STATUS = VERIFIED
CANONICAL_STANDALONE_REBUILD = VERIFIED_IN_CI
GENERATED_STANDALONE_RUNTIME = VERIFIED_IN_CHROMIUM
CI_WORKFLOW_POLICY_CORRECTION = PREPARED
STAGE_7_RESULT = CROSS_ENVIRONMENT_VERIFICATION_FAILED_UNTIL_GENERATED_BUNDLES_COMMITTED_AND_FOCUSED_RERUN
READY_FOR_STAGE_8 = no
```

## Revision

The repair was prepared against `main` commit:

```text
547f07cae63ff5c20073f5b2ede2b33fbee97ea6
```

The commits between the Stage-7 working baseline and that revision contained Stage-7 evidence/checksum material only, so the router production source was equivalent before this repair.

## Reproduction

A deterministic regression was added to `test/router-concurrency.test.js` with an authoritative idle timeout shorter than the fake authoritative bootstrap conversion.

Before the fix:

```text
5 pass / 1 fail
AbortError
ERR_ENGINE_TERMINATED
authoritative was stopped.
```

The failing stack ended in `PastafariCalendarRouterCore._scheduleAuthoritativeShutdown()`.

## Root cause

`_scheduleAuthoritativeShutdown()` correctly prevented termination while a calculation state was `verifying` or `authoritative-only`, but it did not inspect `state.authoritativeRequests`.

A newly requested calculation day is initially `unverified`. Its authoritative bootstrap request is tracked in `state.authoritativeRequests`, but an idle timer scheduled by a previously verified calculation day could fire during that bootstrap request and terminate the shared authoritative worker.

This is the same race reproduced in Stage 7 in both standalone bundles.

## Production fix

Only the shared router source of truth is changed at source level:

```text
browser/pastafari-calendar-router-core.js
```

The shutdown callback now:

1. clears its timer handle when it fires;
2. preserves the existing `verifying` / `authoritative-only` guard;
3. checks every calculation state's `authoritativeRequests` map;
4. if any authoritative request is in flight, reschedules the idle check instead of terminating the worker;
5. otherwise performs the existing authoritative idle termination.

No public API or routing policy is changed.

## Regression coverage

Three focused tests were added to the existing router concurrency suite:

- an in-flight bootstrap request for a new calculation day survives the old idle deadline;
- two concurrent bootstrap requests survive the old idle deadline;
- the authoritative worker is still actually terminated after requests become idle.

Results after the fix:

```text
router-concurrency.test.js: 8/8 pass
focused router matrix:       28/28 pass
npm test:                    199 total / 195 pass / 0 fail / 4 expected skip
```

The focused router matrix includes cache lifecycle, fallback/retry, timeout recovery, a 600-case bounded/unbounded differential, and the 5,000-calculation-day bounded-state regression.

## Standalone build status

The dedicated CI workflow completed the canonical standalone rebuild with the locked toolchain:

```text
esbuild 0.28.2
BUILD PASS — 2 artifacts reproduced byte-for-byte
```

Generated hashes:

```text
f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b  browser/standalone/pastafari-date.js
7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481  browser/standalone/pastafari-date.min.js
```

The generated bundles passed:

```text
standalone static tests: 3/3 PASS
real Chromium router-race reproduction: PASS
old race reproduced: false
unminified == minified semantics: true
```

The generated files in this correction delta are copied byte-for-byte from the CI artifact; they were not manually edited.

## CI workflow diagnosis and correction

The general benchmark/memory/visual workflows failed at the common supply-chain gate before their payloads ran. The production fix itself did not fail.

The new Stage-7 workflow violated repository CI policy in four ways:

```text
actions/checkout@v4                 # mutable ref
actions/setup-node@v4               # mutable ref
npx playwright ...                  # npx forbidden in CI
actions/upload-artifact@v4          # mutable ref
```

These have been corrected to the repository's already-established pinned action SHAs and local Playwright binary.

The canonical standalone scope check is also now idempotent: after the generated bundles are committed, a rebuild may produce no diff; when source and committed generated bundles differ, exactly the two standalone files remain the only permitted diff.


## Post-CI local sanity

After importing the generated CI bundles and correcting the workflow policy violations:

```text
supply-chain policy: 73/73 external actions pinned / 0 mutable refs / PASS
focused router + standalone static matrix: 31/31 PASS
```

A redundant local real-Chromium rerun of both large standalone bundles exceeded this execution environment's 120-second command window. It is not used as semantic evidence; the dedicated CI artifact already completed the same real-Chromium reproduction for both generated bundles with `PASS`.

## Required next step

Commit this CI-correction/generated-bundle delta and let CI rerun.

Then verify:

1. `npm run security:supply-chain` passes;
2. the dedicated Stage-7 router-fix workflow remains green;
3. the committed standalone hashes equal the canonical CI hashes above;
4. the focused Stage-7 cross-environment matrix remains green.

Do **not** start Stage 8 until that focused rerun is complete.
