# Update 16 — CI catch-up after authority-boundary merge

## Baseline

- Repository: `Sargon17-Green/pastafari-calendar`
- Update 16 commit under test: `d662a95c50af32375d7fdcadd203ba102a58fda4`
- Package version: `1.3.0`
- CI evidence inspected: `logs_88588020281.zip`, `logs_88588020257.zip`

## Failures reproduced from CI

Two jobs failed; the remaining jobs in the supplied logs had no non-zero process exit:

1. Ruby canonical compatibility job exited 2 because `implementations/ruby/test.rb` still required `fixtureType == specification-derived-canonical` after Update 16 deliberately reclassified the committed compact corpus as `legacy-canonical-format-regression`.
2. Node test job exited 1 in the legacy-artifact reproducibility step. `generate_spec_canonical.py` emitted the new authority metadata at a different JSON insertion point, and emitted the generic historical-generator role for the compact fixture, so regeneration was semantically equivalent but not byte-identical to the committed artifacts.

Neither failure concerns Pastafari calendar arithmetic.

## Fix

- Preserve the legacy generator path and behavior.
- Make `authority_metadata()` accept an explicit role while defaulting to `historical-fixture-generator`.
- Emit the full-corpus authority block at the same trailing position used by the committed fixture.
- Emit the compact fixture authority block after `vectors`, with role `legacy-compact-regression-vectors`, matching the committed fixture byte-for-byte.
- Update the Ruby compatibility consumer to require the legacy regression fixture type and explicitly require `normativeAuthority == false` and the compact regression role.
- Rename only Ruby test output text from `canonical vectors` to `legacy regression vectors`; the compatibility target/path is retained.

## Verification

- `make -C implementations/ruby test-canonical` — PASS, 6/6 legacy regression vectors.
- Exact CI regeneration sequence for binding-5778, deep-year-chain, canonical generator and gate checkpoints — PASS.
- Five generated fixtures after regeneration are byte-identical to their pre-run committed bytes.
- `verify_gate_checkpoints.py` — PASS, 75/75.
- `npm run test:update16` — PASS, audit PASS and 10/10 authority-boundary tests.

## Authority result

The fix does not restore oracle status to a historical generator or generated fixture. The compact and full historical artifacts remain explicitly `normativeAuthority: false`; the generator remains a tool/witness downstream of the Update 16 authority boundary.

No corpus regeneration for Update 17 was performed.
