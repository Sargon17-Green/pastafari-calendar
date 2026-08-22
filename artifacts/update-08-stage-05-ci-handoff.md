# Update 8 — Stage 5 CI handoff (intermediate delta)

## Status

This is an **intermediate Stage-5 delta**, not Stage-5 closure.

```text
STAGE_5_RESULT = BLOCKED_PENDING_CANONICAL_STANDALONE_REBUILD
READY_FOR_STAGE_6 = no
```

The two targeted production fixes are included. The checked-in standalone bundles are deliberately **not** included because they are still the pre-fix generated artifacts and must be regenerated canonically.

## Included production changes

- `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js`
- `browser/pastafari-calendar-core-chronicle.js`

No package version change is included. No Stage-3/4 historical artifact is overwritten.

## Validation already completed

- Natural failed constructions: arena delta 0.
- Repeated campaigns through 1,000 failures: no accumulation.
- Failed-new identity keys: absent after failure.
- Preexisting identity IDs: preserved.
- Failed allocations: clean-history identity sequence preserved.
- Nested depths 1, 2, 3, 5, 10: pass.
- Matched success/failure prefix check: pass; observed prefix churn is numeric-only and no larger on failure than matched success.
- Fault-injection campaign: pass.
- Reference oracle: 19/19 pass.
- Canonical Stage-1 vectors: exact pass.
- Focused core: 63 pass, 0 fail, 4 skip.
- `npm test`: 192 pass, 0 fail, 4 skip.
- Runtime patch ledger: 21/21 pass.
- Focused cache epoch: 6/6 pass.
- Router/cache lifecycle: 11/11 pass.
- Patched browser-source parity: pass.

The broad compatibility attempt timed out before producing a subtest result and is not represented as either PASS or FAIL.

## Why standalone is missing

Local canonical regeneration is blocked because the supplied snapshot has no `node_modules` and this execution environment cannot reach the npm registry. `scripts/build-standalone.mjs` requires the lockfile-pinned `esbuild@0.28.2`. The existing standalone files were verified to be unchanged pre-fix bundles, so shipping them as if regenerated would be incorrect.

## How this upload advances Stage 5

The repository already has the required CI machinery in `.github/workflows/test.yml`; no workflow modification is needed. After committing this delta, the existing `node-test` job performs:

1. `npm ci`
2. `npm run build:standalone`
3. SHA-256 calculation for both generated standalone files
4. artifact upload named `update3-generated-standalone-<commit SHA>`
5. `git diff --exit-code -- browser/standalone/pastafari-date.js browser/standalone/pastafari-date.min.js`

Because this intermediate delta intentionally does not contain the regenerated standalone bundles, **the first CI run is expected to fail at step 5**. That red result is expected and useful. The generated standalone artifact is uploaded in step 4, before the expected failure.

After that artifact is retrieved, Stage 5 can continue with standalone parity/regressions, final repository checksums, the final Stage-5 report/JSON, and the final delta ZIP.

## Root SHA256SUMS.txt

`SHA256SUMS.txt` is deliberately not included in this intermediate delta. `main` has advanced with checksum-manifest changes since the supplied archive, so replacing it from the archive would risk reverting unrelated recent entries. The root manifest must be regenerated/reconciled against fresh `main` after the canonical standalone outputs are available.
