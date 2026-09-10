# Pastafarian Calendar — canonical saved-sum correction delta

Repository: `Sargon17-Green/pastafari-calendar`  
Branch: `main`  
Base / observed HEAD: `d5cfe77ef7950a9a67ff0e6814833a3eedacae8a`

## Correction

This delta corrects the 12 final post-stirs so that each round uses one old six-bowl snapshot, computes `S = sum(oldBowls)`, then `R = SAVE(S + 149*r)`, and uses **R** both to select the lexicographic permutation and as the preserved sum added inside `u`. The rejected `rawSumMutant` uses unpreserved `S` inside `u`. All six new bowls are computed from the same old snapshot and committed simultaneously.

The independent reference, fast browser engine, public/production chronicle path, language implementations, generators, canonical vectors, gate-derived data, provenance, discriminators and relevant generated evidence were aligned to this rule. Historical non-normative corpora were not rewritten merely to make old evidence look current.

## Payload

The archive contains exactly **64 modified repository paths**, no repository additions and no repository deletions, plus `DELTA_README.md` and `DELTA_MANIFEST.json` as package metadata. Copy/upload the repository paths listed in `DELTA_MANIFEST.json` over the exact base checkout.

`SHA256SUMS.txt` at archive root is the **actual modified repository checksum manifest**. Because that repository path collides with the natural name for a delta-local checksum file, per-file base/new SHA-256 values for every delta payload path are stored in `DELTA_MANIFEST.json` instead of replacing the repository checksum manifest.

## Verification summary

Core closure passed: reference oracle 19/19; Update16 boundary 10/10; Update17 canonical evidence 4/4; gate-data check with 72,768 gaps and `drift=[]`; fast matrix 51/51; authoritative matrix 51/51; holdout 12/12 on each engine; focused public/cache/runtime/standalone tests 39/39; standalone structural tests 3/3; package verification PASS; C 6/6; C++ bigint + 6/6; Java 17/17 semantics + 6/6 canonical; Ruby 6/6; Python 4 tests + 13 subtests; final repository checksums verify PASS (`docs=113`, `repository=1031`).

Update18 was regenerated but is deliberately **not** marked fully closed: 149/150 records passed with zero semantic/fast/authoritative mismatches; the sole non-PASS record is a memory-soak threshold error (`581,213,648` byte heap delta vs `134,217,728` threshold). Playwright browser/Worker closure could not run in this environment.

## Known blocked items

`npm run build:standalone` could not be executed because the checkout/environment lacks `esbuild@0.28.2` and npm network installation was unavailable. The readable/minified standalone artifacts were corrected deterministically and passed the repository standalone tests plus behavioral checks performed during this session. COBOL was corrected at source level but not compiled because `cobc` is unavailable. Long aggregate compatibility/full suites were not used as closure evidence where they exceeded the execution window; focused semantic and differential tests above were used instead.

See `DELTA_MANIFEST.json` for the exact file list, old/new SHA-256 values, regenerated artifacts, executed tests, blocked tests and residual uncertainty.
