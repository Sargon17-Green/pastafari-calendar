# Update 16 — CI checksum catch-up after no-write authority test

## Baseline

- Repository: `Sargon17-Green/pastafari-calendar`
- Previous Update 16 catch-up base: `df556c61a0114fdc8cc761037dd2bc8f7aaf6771`
- Package version: `1.3.0`
- CI evidence inspected: `logs_88600356598.zip`

## Failure reproduced from CI

The prior catch-up fixed Ruby compatibility and legacy generator reproducibility. The remaining failure was at the final checksum verification step:

```text
./artifacts/update16/oracle-authority-audit.json: FAILED
./docs/SHA256SUMS.txt: FAILED
sha256sum: WARNING: 2 computed checksums did NOT match
```

The cause was not calendar arithmetic and not vector regeneration. `npm run test:update16` still ran the authority audit in `--write` mode inside CI. That rewrote `artifacts/update16/oracle-authority-audit.json` during the test job, after `docs/SHA256SUMS.txt` and the repository-level `SHA256SUMS.txt` had already been committed.

## Fix

- Change `npm run test:update16` to a read-only authority audit followed by the Update 16 test suite.
- Add `npm run update16:audit:write` for intentional maintainer-side regeneration of the audit artifact.
- Regenerate checksum manifests after this script change.

This preserves the Update 16 authority boundary: tests verify the audit, but CI no longer mutates the committed audit artifact while running the test.

## Verification

- `npm run test:update16` — PASS, 10/10.
- `node scripts/run-update16-authority-audit.mjs --write` followed by checksum generation remains available for intentional artifact updates.
- `npm run checksums:generate && npm run checksums:verify` — PASS.
- No generator, vector, fixture, production engine, reference implementation, browser artifact or standalone artifact was changed.

## Scope

This is a checksum/CI-mode catch-up only. It does not regenerate the canonical corpus and does not change Pastafari calendar semantics.
