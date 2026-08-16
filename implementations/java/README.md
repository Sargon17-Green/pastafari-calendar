# Pastafari Calendar — Java 17

This directory contains an independent Java 17 implementation of the forward
Pastafari calendar mapping. The sole normative source for this certification is
**“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**, SHA-256
`d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.

The public input order follows the Scroll exactly:

1. calculation/action day;
2. queried/target day.

There is no implicit civil “today”. A real-instant “today” requires the separate
location-dependent Venus day-boundary adapter and is intentionally outside this
pure calendar core.

Calendar arithmetic, sauce, gate traversal, year selection, cutlet/month
unranking and constrained month interleaving execute in Java. There is no JNA,
JNI, FFI, native library, subprocess, network dependency, or another language's
calendar engine. Unbounded values use `java.math.BigInteger`.

## Run

```bash
java src/main/java/org/appointedtimes/PastafariCalendar.java \
  2026-08-06 2026-08-12

java src/main/java/org/appointedtimes/PastafariCalendar.java \
  --jdn 2461259 2461265
```

Both forms are **CALCULATION first, TARGET second**.

## Tests

```bash
make test-canonical
```

The built-in canonical vectors are specification-derived. The shared compact
fixture is `../tests/conformance-vectors.json`; the larger source-derived audit
fixture is `../tests/spec-derived-canonical-vectors.json`.

`../tests/historical-regression-vectors-16.json` and
`../tests/oracle-differential-10000.tsv` are retained only as historical,
non-normative regression evidence. Their expected values do not define the
calendar and JavaScript is not an oracle for this implementation.

The binding maximum year length is **5,778** days. Gate-position checkpoints are
performance accelerators only and are checked separately against values derived
from the normative gate-distance rule.
