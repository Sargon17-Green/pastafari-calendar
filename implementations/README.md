# Pastafari Calendar — independently implemented engines

This directory contains the five previously accepted independent engines that
have now been re-audited against the expanded task's **sole normative source**:

**“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**  
SHA-256: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`

Repository copy: [`../sources/מגילת העיתים.md`](../sources/מגילת העיתים.md)  
Published source: <https://the-scroll-of-the-appointed-times.blogspot.com/2026/08/Megilat-HaItim.html>  
The repository copy is preserved byte-for-byte under the SHA-256 above; its digest is also recorded in `../sources/SHA256SUMS.txt`.

The five engines in this ready-five slice are C++20, Python 3, C17, Java 17+
and Ruby. Each executes the calendar algorithm in its own language; none
delegates calendar semantics to another implementation through FFI, JNI/JNA,
subprocesses, RPC, WebAssembly, or an external calendar executable.

The repository also contains the separately validated COBOL engine at
`implementations/cobol/`. Its relocation into `implementations/` is preserved
here; COBOL is not part of the ready-five count and this remediation does not
replace or roll back its files.

This slice is part of the **84-target expanded project**. It is not a claim that
all 84 targets are complete.

## Normative conversion contract

Every forward conversion receives the ordered pair:

1. calculation/action day;
2. queried/target day.

Public APIs and CLIs in these five engines now use that same positional order.
There is no implicit civil-midnight “today” fallback. Resolving a real instant
to the current Pastafari calculation day is a separate location-dependent Venus
boundary adapter and is intentionally outside these pure integer-day cores.

The output is exactly the ordered five-field result: year number, cutlet name,
day in cutlet, month name, and day in month. The binding maximum year length is
**5,778 days**, including the source's explicit correction of the isolated
5,781 typo.

## Specification-derived canonical suite

Shared test material is under `tests/`:

- `conformance-vectors.json` — compact six-vector canonical forward fixture used
  for routine native conformance runs;
- `spec-derived-canonical-vectors.json` — comprehensive source-derived audit
  fixture with 202 forward vectors plus sauce, answer-ring, gate, year,
  combinatoric, Gregorian, invalid-input and period-boundary evidence;
- `spec-derived-deep-year-chain.json` — explicit year `2 -> 1 -> 0 -> -1`
  source-derived chain;
- `spec-derived-binding-5778.json` — discriminator proving the binding 5,778
  maximum rather than 5,781;
- `spec-derived-gate-checkpoints.json` — all 75 acceleration checkpoints derived
  from the gate rule;
- `generate_spec_canonical.py`, `generate_spec_deep_year_chain.py`,
  `generate_spec_binding_5778.py` — test-only reference generators derived from
  the Scroll, not from a production engine;
- `verify_gate_checkpoints.py` — recomputes all checkpoint positions and verifies
  the Python/C++/C/Java/Ruby production tables;
- `run_cli_conformance.py` — language-neutral compact CLI runner.

The canonical ID is `PASTAFARI-SCROLL-2026-08-16-D36B0C94`.

## Historical regression evidence

`historical-regression-vectors-16.json` and
`oracle-differential-10000.tsv` are retained because they are useful regression
artifacts from the earlier remediation work. They are **non-normative**. Their
legacy filenames/header wording do not give JavaScript or any implementation
specification authority.

See `docs/CONFORMANCE.md` for the binding decisions and `docs/TEST_MATRIX.md`
for the exact fresh and historical evidence status.
