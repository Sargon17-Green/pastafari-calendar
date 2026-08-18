# Pastafari Calendar — COBOL reference engine

This directory is a COBOL port of the public fast engine in
`browser/pastafari-calendar-fast.js`, including its core reverse operation.
Its historical compatibility reference uses algorithm ID:

`PASTAFARI-TABLETS-2026-08-06-V1`

## Normative status

The project's sole normative source is **“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**,
archived at [`../../sources/Megilat-HaItim.md`](../../sources/Megilat-HaItim.md),
SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`; the published source is
<https://the-scroll-of-the-appointed-times.blogspot.com/2026/08/Megilat-HaItim.html>. References in this document to comparison with the JavaScript fast
engine describe validation and compatibility provenance only; they do not make
JavaScript normative. This COBOL engine remains separately validated and is not
part of the ready-five final-spec-certified count documented in `../README.md`.

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
make -C implementations/cobol
```

The reusable module is written to `implementations/cobol/build/pastafari-engine.so`.

## Test and qualification

From the repository root, first run the small compile/linkage smoke:

```sh
make -C implementations/cobol test
```

That target retains the original fixed vector suite. It is deliberately small;
it is not sufficient evidence that the port is correct.

Before publishing or merging the port, run the cross-engine validation:

```sh
make -C implementations/cobol validation
```

The standard profile compares thousands of deterministic cases against
`browser/pastafari-calendar-fast.js`, including checkpoint neighborhoods,
wide-epoch random forward conversions, known-calculation reverse lookup,
negative reverse cases and bounded `c=t` candidate-list comparisons. It writes
a machine-readable evidence report to:

```text
implementations/cobol/build/cobol-validation-report.json
```

A heavier local qualification profile is available as:

```sh
make -C implementations/cobol soak
```

Its defaults are 100,000 random forward cases and 10,000 known-reverse cases,
and all counts and the deterministic seed are configurable. See
[`VALIDATION.md`](VALIDATION.md) for the exact test distribution, Windows/MSYS2
installation instructions, reproducibility controls and evidence workflow.

The GitHub Actions workflow keeps a smaller deterministic smoke test; the heavy
soak is intentionally a local pre-release qualification step rather than a
mandatory test on every push.

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
