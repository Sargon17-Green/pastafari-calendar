# Pastafari Calendar — independent implementations

This directory is an incremental, merge-ready slice of the larger 45-language
implementation project. It contains **five independently implemented and tested
language engines** in the shared conformance bundle. JavaScript is intentionally
not counted.

The five engines in that shared bundle are:

1. C++20
2. Python 3
3. C17
4. Java 17+
5. Ruby

The COBOL reference engine lives in `cobol/`. It is validated separately and is
not included in the five-engine count or in `implementations.json`.

Each engine in the shared five-engine bundle executes the calendar algorithm in
its own language. None of these five delegates the algorithm to another language
through FFI, JNI/JNA, native bindings, subprocesses, RPC, WebAssembly, or an
external executable.

## Shared conformance contract

Every conversion depends on two ordered inputs: the calculation day and the
queried/target day. The output is the full ordered five-field result:

1. year number;
2. cutlet name;
3. day in cutlet;
4. month name;
5. day in month.

The implementations preserve signed proleptic Gregorian dates, Unicode names,
exact integer arithmetic, the required floor-division/modulo behavior for
negative values, and the binding maximum year length of **5,778 days**.

Shared development data lives under `tests/`:

- `conformance-vectors.json` — 16 known/boundary vectors;
- `oracle-differential-10000.tsv` — deterministic 10,000-pair differential corpus;
- `generate_oracle_corpus.mjs` — provenance/reproduction utility for the static corpus;
- `run_cli_conformance.py` — language-neutral CLI vector runner.

See `docs/TEST_MATRIX.md` for the exact evidence status and
`docs/CONFORMANCE.md` for the binding decisions.

## Scope warning

This upload does **not** claim completion of the 45-language goal. It deliberately
omits incomplete wrappers/bindings, compiler-generated Assembly, Dart pending
execution, and partially tested ports. The machine-readable status of this
slice is in `implementations.json`.
