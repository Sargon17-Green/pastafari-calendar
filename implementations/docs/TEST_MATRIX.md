# Verification matrix — ready-five after normative remediation

“Canonical PASS” below means executable tests against data derived from the sole
normative Scroll were actually run. Historical regression evidence is shown
separately and is not treated as specification authority.

| Implementation | Fresh specification-derived evidence (16 Aug 2026) | Historical regression evidence | Status |
|---|---|---|---|
| Python 3 | 4 canonical/semantic unit tests; compact canonical forward vectors | prior 16-vector + 10,000-pair pass retained | **final-spec-certified ready-five** |
| C++20 | bigint semantics; 6/6 canonical forward vectors; signed `+YYYY` parser regression test | prior 16-vector + 10,000-pair pass retained | **final-spec-certified ready-five** |
| C17 | fresh build; 6/6 canonical forward vectors using reusable native calculation state | prior 16-vector + 10,000-pair pass retained | **final-spec-certified ready-five** |
| Java 17+ | 17/17 semantic checks; 6/6 canonical forward vectors | prior 16-vector + 10,000-pair pass retained | **final-spec-certified ready-five** |
| Ruby | 6/6 canonical forward vectors | prior 16-vector + preserved 10,000-pair pass retained | **final-spec-certified ready-five** |

All five calc-first `--jdn` CLIs were also executed on the canonical
`present_forward` case (`2461259 -> 2461265`) and emitted the identical expected
five-field UTF-8 JSON result.

The shared gate provenance verifier independently recomputed **75/75** stored
gate checkpoints and confirmed all five production tables.

## Fresh environment

The remediation/canonical run used:

- CPython 3.13.5;
- GCC 14.2.0 for C17;
- G++ 14.2.0 for C++20;
- OpenJDK/Javac 21.0.11, with Java source required to remain Java 17 compatible;
- Ruby 3.3.8 on Linux x86-64.

C++ was compiled with `-std=c++20`; C with `-std=gnu17`. Java had previously
also been explicitly compiled with `javac --release 17` during the normative
audit.

## Canonical fixture identities

- canonical ID: `PASTAFARI-SCROLL-2026-08-16-D36B0C94`
- normative source SHA-256:
  `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`
- compact six-vector fixture SHA-256:
  `7a427aa5dd49404a3ebf6e0d5a326cb0c658c553e4ae8c55c44e86882022f04d`
- comprehensive source-derived fixture SHA-256:
  `35a7c86a8fbb25b265a1021af832575d6bc8b8e66fb7d0d22ef3b102422ed2b1`
- deep signed-year fixture SHA-256:
  `d7d340b0faf45dfef8b9f12269c3603c9c2cfdfc96896e8b47d907cdf12ded3a`
- 5,778 discriminator fixture SHA-256:
  `8593f526ed93c6198b6ca467bc5e87ce7a100715dd78bd24d6b957851577aa0f`
- 75-checkpoint fixture SHA-256:
  `02f6e5b232dce85a2ab2a2963bcdae16592d0a4c10974d86b21266802fb0040d`

The comprehensive fixture contains **202 forward vectors** and boundary witnesses
covering **17/17 cutlet names** and **47/47 month names**, in addition to the
source-level sauce/choice/combinatoric evidence described in `CONFORMANCE.md`.

## Historical corpus

The retained 10,000-pair regression corpus has not been regenerated or relabeled
as canonical:

- historical algorithm ID: `PASTAFARI-TABLETS-2026-08-11-V2-5778`;
- rows: 10,000;
- groups: 40;
- seed: `0x5a17c9e3d4b26f81`;
- SHA-256: `9e29a8f65fe349b2b250d9059ffc3f35bb099c41eea49a511b164b4c92771bdf`.

Its older full-pass logs remain valid **regression** evidence. This 1F run did
not claim a fresh 10,000-row pass for every engine.

## Reproduction

From `implementations/`:

```bash
PYTHONPATH=python python3 -m unittest python.tests.test_conformance -v
make -C cpp test-canonical
make -C c test-canonical
make -C java test-canonical
make -C ruby test-canonical
python3 tests/verify_gate_checkpoints.py
```

`make test` in the language directories may additionally run the historical,
computationally heavier regression corpus.
