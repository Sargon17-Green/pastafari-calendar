# Verification matrix — five ready independent engines

This matrix records evidence that exists for the five engines in this incremental
upload. “PASS” means an executable correctness test was actually run; source
review alone is not promoted to a test pass.

| Implementation | Verification evidence | Result |
|---|---|---|
| C++20 | bigint unit tests; 16 known/boundary vectors; deterministic 10,000-pair differential corpus | **PASS** |
| Python 3 | unit tests; 16 known/boundary vectors; deterministic 10,000-pair differential corpus | **PASS** |
| C17 | 16 known/boundary vectors; deterministic 10,000-pair differential corpus | **PASS** |
| Java 17+ | 17 semantic checks; 16 known/boundary vectors; deterministic 10,000-pair differential corpus | **PASS** |
| Ruby | 16 known/boundary vectors; deterministic 10,000-pair differential corpus | **PASS** |

## Recorded environments

The C++20, Python 3, C17 and Java evidence comes from the remediation audit run
on 12 August 2026 in Linux x86-64: GCC 13.3.0 for C/C++, CPython 3.12.13, and
OpenJDK 17.0.19. The Java source-launcher path was tested; Maven packaging was
not claimed as executed in that environment.

Ruby was independently re-run by the user on Windows with Ruby 4.0.6
(`x64-mingw-ucrt`). The preserved log records `known vectors: 16/16 passed`, all
40 groups of 250 differential rows, and final
`PASS: known 16/16; differential 10000/10000`.

The Ruby log is stored at:

`verification/evidence/multilang/ruby-differential-20260814-125717.log`

## Shared corpus

- algorithm ID: `PASTAFARI-TABLETS-2026-08-11-V2-5778`
- rows: 10,000
- groups: 40
- seed: `0x5a17c9e3d4b26f81`
- corpus SHA-256: `9e29a8f65fe349b2b250d9059ffc3f35bb099c41eea49a511b164b4c92771bdf`
- includes negative/ancient dates, astronomical year zero, Unicode outputs and
  5,778-boundary discriminators.

## Reproduction

Run from `implementations/` unless noted otherwise:

```bash
# Python
PYTHONPATH=python python3 -m unittest discover -s python/tests -v

# C++
make -C cpp test

# C
make -C c test

# Java
make -C java test

# Ruby
make -C ruby test
```

The full differential suite can be computationally expensive for distant cases;
the checked-in corpus must not be reduced to obtain a pass.

## Bundle validation on 16 August 2026

The exact source tree prepared for this incremental upload was smoke-tested
through all five CLIs on the same representative conversion. C17, C++20,
Python 3, Java 17+ and Ruby all emitted the identical complete UTF-8 five-field
result.

Python's conformance unit suite was also re-run successfully. Java's 17 semantic
checks and 16 known vectors were re-run successfully after an output-only
UTF-8 stdout initialization was added so the CLI does not depend on the host's
default charset. The calendar algorithm was not changed by that adjustment.

C and C++ were rebuilt successfully. A fresh full known-vector pass for those
two, when run together in the constrained packaging environment, exceeded the
available command window; therefore this packaging run is **not** presented as
a new full-suite pass for C or C++. Their accepted status continues to rely on
the previously recorded 16-vector and 10,000-pair executable evidence.

See `../../verification/evidence/multilang/bundle-validation-2026-08-16.md`.
