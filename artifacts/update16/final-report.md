# Update 16 — Oracle authority boundary final package

## Result

`UPDATE_16_AUTHORITY_BOUNDARY_DELTA_READY`

## Baseline

- Checked `main` HEAD: `6b9d49361633b91d7c3e8fe58b514d5650791f1e`
- Package version: `1.3.0`
- Scroll SHA-256: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`
- Core reference SHA-256: `14d42517493426f61eae023987b72607bca714497534e738fb4b56709bcb0c4a`

## Authority rule installed

The repository now records and tests the hierarchy:

```text
Scroll > independent reference > implementations/generated artifacts
```

Legacy generators and vectors may keep historical names such as `spec`,
`canonical`, `oracle`, and `conformance`, but they are now machine-classified as
witnesses/regression artifacts unless separately validated downstream of the
independent reference. Agreement among authoritative, fast, and generator paths
is explicitly not a normative PASS rule.

## Important non-change

No production calendar algorithm was changed. No legacy generator was deleted.
No full canonical corpus regeneration was performed. Full vector regeneration and
revalidation remain reserved for Update 17.

## Key files

- `verification/update16/authority-registry.json`
- `verification/update16/dependency-graph.json`
- `verification/update16/coverage-matrix.json`
- `verification/update16/reference-provenance.json`
- `verification/update16/manual-discriminators.json`
- `verification/update16/vector-provenance.json`
- `scripts/run-update16-authority-audit.mjs`
- `test/update16-authority-boundary.test.js`
- `docs/authority/ORACLE-AUTHORITY.md`
- `artifacts/update16/oracle-authority-audit.json`
- `artifacts/update16/anti-cleanup-manifest.json`
- `artifacts/update16/test-results.json`

## Verification actually run in this packaging pass

- `npm run test:update16` — PASS; authority audit plus 10/10 Update 16 tests.
- `node --test test/reference-oracle.test.js test/update16-authority-boundary.test.js` — PASS; 29/29.
- `npm run gate-data:check` — PASS; no drift.
- `npm run docs:check` — PASS.
- `npm run security:supply-chain` — PASS.
- `npm run checksums:generate && npm run checksums:verify` — PASS; final manifests report docs=113 and repository=932.

## Local limits

`python implementations/tests/generate_spec_canonical.py` exceeded the local 300s
timeout during the heavy historical corpus phase. This is not treated as an
Update 16 failure because Update 16 deliberately does not regenerate the full
corpus. `npm run package:verify` also exceeded the local timeout after starting
its package-install phase; no generated debris was retained in the delta.

## Acceptance mapping

- Reference imports no production, fast, generator, vector, fixture, `Intl`, or
  random semantics.
- Production JS paths do not import reference runtime.
- Legacy canonical-format vectors are marked `normativeAuthority: false`.
- The retained `generate_spec_canonical.py` emits non-authority metadata.
- The Update 16 test suite demonstrates generator/vector/fixture corruption and
  old-like shared-bug majority agreement without changing the reference result
  or the PASS rule.
- Core incomplete stages remain explicit `ERR_REFERENCE_NOT_IMPLEMENTED` rather
  than falling back to production.
