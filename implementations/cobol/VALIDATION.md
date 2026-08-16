# COBOL cross-engine validation

Do not treat the COBOL port as merge-ready until this validation has passed on
an actual GnuCOBOL build.

The reference side of every comparison is
`browser/pastafari-calendar-fast.js`. The heavy/core implementation is not used
as the oracle for this port.

## Windows 10/11: recommended toolchain

The simplest reproducible route is MSYS2 UCRT64. In an **MSYS2 UCRT64** shell:

```sh
pacman -Syu
```

If MSYS2 asks you to close/reopen the terminal after the core update, do so,
then run:

```sh
pacman -S --needed mingw-w64-ucrt-x86_64-gnucobol make
```

The GnuCOBOL UCRT64 package depends on a C compiler and GMP, so those are
installed with it. Verify:

```sh
cobc -V
cc --version
node --version
make --version
```

Node.js is only required for the independent JavaScript side of the comparison.
If `node` is not visible inside the UCRT64 shell, make the existing Windows
Node.js installation available on `PATH` before running the validation.

Run all commands below from the repository root.

## 1. Compile and run the small deterministic smoke suite

```sh
make -C implementations/cobol clean
make -C implementations/cobol test
```

This catches compiler/linkage/UTF-8 failures quickly and runs the original fixed
forward/reverse vector set.

## 2. Standard cross-engine validation

```sh
make -C implementations/cobol validation
```

The standard profile performs:

- fixed vectors around the foundation day, 2000-01-01 and 2026-08-06;
- five target positions around every gate checkpoint found in the existing
  fast-engine compatibility test;
- dense full-cutlet coverage around three reference calculation days;
- a 733-case sweep that holds the target day fixed while moving the calculation day by +/-366 days;
- 10,000 deterministic pseudo-random forward comparisons;
- 1,000 COBOL forward -> COBOL reverse-known round trips among the random cases;
- 1,000 JS-produced Pastafari dates fed directly into COBOL reverse-known;
- for 200 of those cases, the JavaScript reverse API itself is executed and its candidate is compared directly with the COBOL reverse result;
- 200 deliberately impossible reverse requests that must return no match;
- 50 exact `c=t` reverse searches;
- 12 bounded `c=t` searches whose complete candidate lists are compared with
  the JavaScript reverse engine.

The random calculation days are drawn mostly from practical epochs, with a
substantial fraction spread across the checkpoint-covered interval and a small
fraction just outside both checkpoint ends. Target offsets are mostly within
+/-1,000 days, with smaller samples out to +/-10,000 and +/-100,000 days.

The default deterministic seed is:

```text
0x50A7FA81
```

## 3. Heavy local soak before publishing

```sh
make -C implementations/cobol soak
```

The default soak profile raises the random forward corpus to 100,000 and the
known-reverse corpus to 10,000, with additional negative and `c=t` cases.
Nothing about the test depends on those exact counts; they can be raised further.

Example: one million forward comparisons with 50,000 known reverse checks:

```sh
PASTAFARI_COBOL_CASES=1000000 \
PASTAFARI_COBOL_REVERSE_CASES=50000 \
PASTAFARI_COBOL_INVALID_REVERSE_CASES=5000 \
PASTAFARI_COBOL_JS_REVERSE_CASES=5000 \
PASTAFARI_COBOL_SELF_CASES=1000 \
PASTAFARI_COBOL_SELF_RANGE_CASES=100 \
make -C implementations/cobol validation
```

For a second independent deterministic run, change only the seed:

```sh
PASTAFARI_COBOL_SEED=0x12345678 make -C implementations/cobol soak
```

## Configuration variables

- `PASTAFARI_COBOL_CASES`
- `PASTAFARI_COBOL_REVERSE_CASES`
- `PASTAFARI_COBOL_INVALID_REVERSE_CASES`
- `PASTAFARI_COBOL_JS_REVERSE_CASES`
- `PASTAFARI_COBOL_SELF_CASES`
- `PASTAFARI_COBOL_SELF_RANGE_CASES`
- `PASTAFARI_COBOL_SELF_RANGE_RADIUS`
- `PASTAFARI_COBOL_SEED`


## Rolling progress log

The validation script now mirrors progress continuously to:

```text
implementations/cobol/build/cobol-validation-progress.log
```

Each progress entry has an ISO timestamp and elapsed run time. Preparation phases
report the current/total case count and the JDN being processed. The calculation-day
sensitivity sweep logs the first five cases and then every 25 cases, including a
`starting` line before the expensive conversion. The COBOL batch phase emits periodic
result counters plus a heartbeat even when the child process has produced no new
output. This makes a stalled case distinguishable from a merely slow phase.

The full shell transcript can still be captured separately:

```sh
make -C implementations/cobol validation 2>&1 | tee cobol-validation-console.log
```

The `tee` log includes compiler/Make output; the rolling progress log covers the Node
validation phase and is updated during the run.

Progress frequency can be tuned without changing the test corpus:

- `PASTAFARI_COBOL_PROGRESS_EVERY` (default `250`) - forward preparation/batch interval.
- `PASTAFARI_COBOL_REVERSE_PROGRESS_EVERY` (default `25`) - reverse preparation/batch interval.
- `PASTAFARI_COBOL_HEARTBEAT_SECONDS` (default `15`) - batch heartbeat interval.

## Evidence produced

A run writes:

```text
implementations/cobol/build/cobol-validation-report.json
```

The report records at least:

- PASS/FAIL;
- exact seed and case counts;
- repository commit when available;
- algorithm/API metadata from the fast engine;
- Node, GnuCOBOL and C compiler versions;
- SHA-256 of the JavaScript reference engine, COBOL engine, C big-integer
  runtime/header, ABI copybook, batch runner source, validation script, Makefile,
  generated request corpus and compiled batch executable;
- Git working-tree status when the test is run from a clone;
- coverage counts for gate checkpoints and observed cutlet/month names;
- executed comparison counts;
- up to the first 50 mismatches with their calculation and target JDNs.

The generated request corpus is also left under `implementations/cobol/build/` so a failing run
can be reproduced. `implementations/cobol/build/` is ignored by Git.

For a release/merge verification record, copy the PASS report into
`verification/evidence/` with a name that includes the commit and date. Do not
publish a FAIL report as evidence of compatibility; keep it only for debugging.

## Recorded full validation pass

A full standard-profile run completed with `PASS` on 2026-08-15 under Windows/MSYS2 UCRT64 with GnuCOBOL 3.2.0, Node.js v24.18.1 and `cc` 16.2.0. It recorded 18,195 forward comparisons, 1,348 COBOL forward-to-reverse checks, 1,200 JS-to-COBOL known-reverse checks and 62 `c=t` reverse comparisons, with zero mismatches.

The retained evidence is:

- `../../verification/evidence/cobol-validation-2026-08-15.json`
- `../../verification/evidence/cobol-validation-2026-08-15.log`
- `../../verification/evidence/cobol-validation-2026-08-15-SHA256SUMS.txt`

The local run did not expose Git commit metadata to the validation script, so the report records `gitCommit: null`; exact hashes of the tested JavaScript engine, COBOL engine, runtime, copybook, harness and generated corpus are embedded in the report. A passing GitHub Actions run remains the cross-platform confirmation step.
