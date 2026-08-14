# Pastafari Calendar — COBOL reference engine

This directory is a COBOL port of the public fast engine in
`browser/pastafari-calendar-fast.js`, including its core reverse operation.
The behavioral reference is algorithm ID:

`PASTAFARI-TABLETS-2026-08-06-V1`

It does **not** call Node.js, JavaScript, the authoritative/core engine, a
network service, or an oracle at run time.

## Why there is a small C runtime

The calendar uses `2^127 - 1` and, more importantly, combinatorial ranks that
can be thousands of decimal digits long. Ordinary COBOL numeric data items are
not a safe representation for those values. The calendar rules and control
flow therefore live in `src/pastafari-engine.cob`, while
`runtime/pastafari_bigint.c` supplies only generic arbitrary-precision and
lexicographic-unranking primitives on top of GMP.

This split is deliberate. A mainframe or regulated installation can replace
that runtime with an approved multiprecision implementation without changing
the calendar semantics or the copybook ABI.

## Public ABI

Include `copybook/pastafari-engine.cpy` in the caller and invoke:

```cobol
CALL "PASTAFARI-ENGINE" USING PF-REQUEST PF-RESPONSE
```

`PF-OP` supports:

- `F` — forward conversion. Supply `PF-CALCULATION-JDN` and `PF-TARGET-JDN`.
- `K` — reverse with a known calculation JDN. Supply
  `PF-CALCULATION-JDN` and all five `PF-WANTED-*` fields. On a match,
  `PF-FOUND = "Y"` and `PF-FOUND-TARGET-JDN` contains the absolute day.
- `S` — bounded `calculation day = target day` reverse search. Supply all five
  `PF-WANTED-*` fields plus `PF-SEARCH-START-JDN` and
  `PF-SEARCH-END-JDN`. Results are paged through `PF-RESULT-JDN`; continue at
  `PF-NEXT-START-JDN` while `PF-HAS-MORE = "Y"`.

All JDN fields are signed 64-bit `COMP-5`. The reference port intentionally
limits accepted JDNs to ±200,000,000,000,000,000 so every native intermediate
used outside the arbitrary-precision layer is provably inside signed 64-bit
range. This is vastly beyond any practical civil-calendar deployment.

The response also returns `PF-API-VERSION`, `PF-IMPLEMENTATION`, and
`PF-ALGORITHM-ID`, so callers can reject an unexpected implementation or
algorithm revision.

### Reverse scope

The JavaScript package additionally accepts convenience descriptors such as
“today”, Gregorian objects, other calendar objects, and recursively specified
Pastafari calculation dates. Those are adapter/orchestration features around
the inverse kernel. The COBOL ABI is intentionally deterministic and flat:
it accepts explicit JDNs, implements the known-calculation inverse directly,
and implements the bounded `c=t` case directly. A caller that needs a nested
Pastafari calculation-date chain can resolve each calculation date with the
same `K`/`S` operations and feed the resulting JDNs into the next call.

Every `K` candidate is re-run through the complete forward calculation and all
five fields are compared before it is returned. `S` likewise checks the full
forward result for each day in its finite range. The COBOL implementation does
not use the JavaScript diagonal cutlet sieve; that changes performance, not
results.

## Build

Reference build requirements:

- GnuCOBOL 3.x (`cobc`)
- a C11 compiler
- GMP development headers/library
- Node.js only for the cross-language compatibility test

On Debian/Ubuntu:

```sh
sudo apt-get install gnucobol libgmp-dev
make -C cobol
```

The reusable module is written to `cobol/build/pastafari-engine.so`.

## Test

From the repository root:

```sh
make -C cobol test
```

The test target does three things:

1. tests the generic big-integer/combinatorial runtime;
2. compiles a COBOL vector runner that checks forward → reverse round trips;
3. compares 27 COBOL forward results (three calculation days × nine offsets)
   against the current public fast JavaScript engine, plus a bounded `c=t`
   reverse case.

The GitHub Actions workflow in `.github/workflows/cobol.yml` runs the same test
on every push and pull request.

## Porting notes

`COMP-5` was chosen for the fixed-width ABI so the C boundary has native binary
integers rather than implementation-dependent display/packed decimals. The
calendar names are UTF-8 bytes in `PIC X(64)` fields.

For a production banking integration, treat this directory as a reference
implementation until it has passed the target compiler's qualification,
performance, encoding, and calling-convention tests. In particular, do not
assume that a module built by GnuCOBOL is binary-compatible with an IBM or
Micro Focus caller; retain the copybook semantics and adapt the linkage layer
for the target platform.
