# Pastafari Calendar — Ruby

This directory contains an independent Ruby implementation of the forward
Pastafari calendar mapping. The sole normative source for this certification is
**“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**, SHA-256
`d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.

The public input order follows the Scroll: **calculation/action day first,
queried/target day second**. There is no implicit civil “today”; real-instant
resolution belongs to the separate location-dependent Venus adapter.

The implementation does not use FFI, Fiddle, native extensions, shared
libraries, subprocesses, RPC, WebAssembly, JavaScript, or another language's
calendar engine. Exact arithmetic uses Ruby's arbitrary-precision `Integer`.
The binding maximum year length is **5,778** days.

## Command line

```bash
ruby cli.rb 2026-08-06 2026-08-12
ruby cli.rb --jdn 2461259 2461265
```

## Canonical test

From `implementations/`:

```bash
ruby ruby/test.rb
```

The test reads `tests/conformance-vectors.json`, which is generated directly
from the normative source model. The larger
`tests/spec-derived-canonical-vectors.json` provides deeper audit evidence.

`tests/historical-regression-vectors-16.json` and
`tests/oracle-differential-10000.tsv` are historical, **non-normative**
regression datasets only. The preserved 10,000-row Ruby log remains useful as
regression evidence but does not define correct results. Gate checkpoints are
performance accelerators and are verified separately against the normative
gate-distance rule.
