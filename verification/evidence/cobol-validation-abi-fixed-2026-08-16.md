# COBOL ABI-fixed cross-engine validation — 2026-08-16

## Result

**PASS**

This record preserves the full local validation performed after the COBOL-to-C ABI
portability fix that made numeric `BY VALUE` arguments explicit in size. The
behavioral reference was the public fast JavaScript engine, not the heavy/core
implementation.

## Run identity

- Validation type: `pastafari-cobol-cross-engine-validation`
- Script version: `PASTAFARI-COBOL-COMPAT-1.0.0`
- Algorithm ID: `PASTAFARI-TABLETS-2026-08-06-V1`
- API version: `1`
- JavaScript implementation: `fast`
- Deterministic seed: `0x50a7fa81`
- Started: `2026-08-15T16:17:22.770Z`
- Finished: `2026-08-16T11:56:43.730Z`
- Duration: 19.66 hours (70760960 ms)
- Result: `PASS`
- Recorded mismatches: `0`

The validation was run from a downloaded repository snapshot rather than a Git
working tree, so the report records `gitCommit: null` and
`gitStatusPorcelain: null`. The evidence is therefore bound to exact SHA-256
hashes of the tested sources and generated request corpus.

## Environment

- Platform: `win32`
- Architecture: `x64`
- Node.js: `v24.18.1`
- GnuCOBOL: 3.2.0
- C compiler: `cc` 16.2.0

## Exact tested source hashes

- `browser/pastafari-calendar-fast.js`:
  `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`
- `cobol/src/pastafari-engine.cob`:
  `2431ee68bbd20328a7093458b092a37ce76319293e25554c3aa8aa35a44f1106`
- `cobol/runtime/pastafari_bigint.c`:
  `a2db834b22b35e1430e935b1fe9acde940271c27e7d229309c1b0e489adb90de`
- `cobol/runtime/pastafari_bigint.h`:
  `1c0b796f245b288c7a2b58f7591e225ae0f6d27bb601e6c9e06c5a961d126d4c`
- `cobol/copybook/pastafari-engine.cpy`:
  `b57ea5291fbb172923a5e761f641408a84a6efcd305dbb7bfb06c85e4d912954`
- `cobol/test/pastafari-batch.cob`:
  `8b94ce21780302d8bd4c0ab142fa0648bdcb76318888e900c4b3dfff17172ecd`
- `cobol/test/soak-compatibility.mjs`:
  `965ee2cc58b559b8a550cc6b40c757a5e474ccc803138159aaa90880dbb8657f`
- `cobol/Makefile`:
  `6e9f15cf0fbec446fb9613b067a2eb2fd07d52cdae54b9d6dc7a455b1c62b09d`
- Generated request corpus:
  `0b558cf7a3c0bcc47b3dd7ed5df466a37e75fdc3e8605e0d30fe82785e3567f2`
- Compiled batch executable:
  `477053a269c9c53308520f8a6e0d2a037066eda166a9f38f508c1c441d8e2f53`

The retained `*-requests.txt` file was independently re-hashed while preparing
this evidence package and matches the request-corpus hash embedded in the JSON
report exactly.

## Requested standard profile

- Random forward cases: 10000
- Known-reverse cases: 1000
- Deliberately invalid reverse cases: 200
- JavaScript reverse cases: 200
- Exact `c=t` cases: 50
- Bounded `c=t` range cases: 12
- Bounded `c=t` radius: 5

These configurable cases are combined by the validation harness with its fixed,
checkpoint-neighborhood, dense-cutlet and calculation-day-sensitivity coverage.

## Executed comparisons

- Forward comparisons: **18195 / 18195**
- COBOL forward-to-reverse checks: **1348**
- JS-to-COBOL known-reverse checks: **1200 / 1200**
- Exact/bounded `c=t` comparisons: **62 / 62**
- Mismatches: **0**

## Observed coverage

- Gate checkpoints: 63
- Distinct cutlet names: 17 (all 17)
- Distinct month names: 47 (all 47)
- Observed day-in-cutlet range: 1..3201
- Observed day-in-month range: 1..123

## Repository alignment at evidence-packaging time

When this package was prepared, public `main` was
`aa9a26ff351e557a864df7bcc7f2a3e3feb49551`. The repository's hash manifest
listed the same SHA-256 values for the tested fast JavaScript engine, ABI-fixed
COBOL engine, GMP runtime/header, copybook, batch source, validation script and
Makefile as those embedded in this PASS report.

This does not retroactively create Git metadata for the local run; it establishes
file-hash alignment between the tested artifacts and the then-current public
repository snapshot.

## Retained evidence

- `cobol-validation-abi-fixed-2026-08-16.json` — machine-readable PASS report.
- `cobol-validation-abi-fixed-2026-08-16-progress.log` — rolling validation progress log.
- `cobol-validation-abi-fixed-2026-08-16-console.log` — complete captured console transcript.
- `cobol-validation-abi-fixed-2026-08-16-requests.txt` — exact generated request corpus.
- `cobol-validation-abi-fixed-2026-08-16-SHA256SUMS.txt` — SHA-256 manifest for this evidence set.

## Interpretation

This is strong empirical evidence that the ABI-fixed COBOL implementation agrees
with `browser/pastafari-calendar-fast.js` throughout the exercised validation
corpus, including forward conversion, known-calculation reverse conversion and
bounded/exact `c=t` reverse behavior.

It is not a formal proof over the complete input domain.
