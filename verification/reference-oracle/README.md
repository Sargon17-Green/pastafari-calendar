# Normative reference oracle and differential runner

This directory is a verification boundary, not a production calendar engine.
It exists so the current authoritative implementation can be measured against a
small implementation derived directly from the normative Scroll.

## Normative source

The sole normative source used by `reference.mjs` is the repository copy titled
**“לוח סוד הרוטב ושמות הימים”**, whose SHA-256 is:

`d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`

`PROVENANCE.md` maps every implemented reference stage to exact Scroll lines and
states the integer/indexing conventions. Existing production engines,
generators, blobs, checkpoints, fixtures and canonical vectors are deliberately
not oracle inputs.

## Isolation boundary

`reference.mjs` has **zero imports**. In particular it does not import:

- the authoritative engine;
- the fast engine;
- generated blobs or gate-gap/checkpoint data;
- canonical vectors or historical fixtures;
- an existing spec generator.

Runner-side code is kept separate:

- `authoritative-adapter.mjs` imports the existing authoritative engine and only
  records values it can actually observe;
- `compare.mjs` compares ordered fields and reports the first comparable
  mismatch;
- `differential.mjs` orchestrates the two independent calculations;
- `diagnose-post-stir-substitution.mjs` is an explicitly **non-normative**
  behavioral diagnostic used to characterize a discovered mismatch. It is not
  called by `reference.mjs`.

There is no fallback from an unimplemented reference stage to any project
engine. Unimplemented stages throw `ERR_REFERENCE_NOT_IMPLEMENTED`.

## Implemented in Update 1

The reference currently implements, from the Scroll itself:

- Foundation coordinate and canonical day counters;
- the great number and kept remainder;
- all five stone sequences;
- seven hidden drops;
- 46 visible drops and all 11 grinds;
- six initial bowls, drop permutations, direct pours and simultaneous stirs;
- all 12 post-pour stirs;
- answer-ring construction and short uniform selection;
- gate-gap generation and direct uncached gate traversal for diagnostic-sized
  gate indices.

Year-candidate discovery and year selection are implemented in the reference and
validated by small direct discriminators, including the 5,778-day ceiling case.
Stable interfaces also exist for cutlet structure, month structure and final
5-tuple generation, but those stages remain intentionally `not implemented`
rather than delegated.

## Trace levels

`--detail summary` records counters and final sauce values.

`--detail sauce` additionally records hidden drops, each visible drop, each drop
permutation/direct pour/stir, and all 12 post-pour rounds including `bowlSum`,
`orderNumber`, permutation, each `u`, and each stir output.

`--detail full` additionally records every hidden and visible grind.

The JSON form serializes every BigInt as a base-10 string. See
`trace-schema.json` for the machine-readable envelope and status vocabulary.

## CLI

Human-readable:

```sh
node verification/reference-oracle/differential.mjs \
  --calculation 2461273 --target 2461273 --detail sauce
```

Machine-readable:

```sh
node verification/reference-oracle/differential.mjs \
  --calculation 2461273 --target 2461273 --detail full --json
```

Optional controls:

- `--gate-index N` compares a small gate index without any reference checkpoint;
- `--random-seed N` stubs `Math.random` while the authoritative observation is
  executed (default `12648430`, i.e. `0x00c0ffee`);
- `--foundation` is shorthand for Foundation as both inputs;
- `--convert-final` asks the authoritative side for its current final tuple, but
  the reference final tuple remains explicitly unimplemented in Update 1.

Exit status is `0` when all currently comparable fields match, `2` when at least
one comparable field mismatches, `3` for an explicitly requested unimplemented
reference stage, and `1` for runner/input errors.

## Meaning of “first mismatch”

The runner never invents authoritative intermediate states. The current public
authoritative surface exposes day numbers and final sauce/answer/gate values but
not every drop/stir internal. Therefore `comparison.firstMismatch` means the
first mismatch in the ordered set of **actually comparable** fields. Reference
internals for which no authoritative observation exists are marked
`missing-on-authoritative` rather than being silently reconstructed from another
implementation.

That distinction is deliberate: a future read-only trace hook can add precise
per-round authoritative values without changing the reference or its schema.


## Update 16 authority clarification

The authority registry, dependency graph, coverage matrix and vector provenance
under `verification/update16/` define the test authority boundary. Legacy files
whose names include `canonical`, `spec`, `oracle`, `conformance`, `golden` or
`expected` are not automatically normative. The retained
`implementations/tests/generate_spec_canonical.py` path is a compatibility
generator/witness, not the judge.
