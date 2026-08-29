# Cross-engine 50M differential evidence

This directory is a compact evidence package for a completed three-engine
Pastafari Calendar differential run.

## Scope

- Repository: `Sargon17-Green/pastafari-calendar`
- Requested repository URL: `https://github.com/bwtbdyqtmsprytgydym-cpu/pastafari-calendar`
- Ref resolved at run start: `main`
- Exact repository commit: `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`
- Input cases: `50,000,000`
- Input bytes: `1,387,575,225`
- Input SHA-256: `e0c5c1e2b2b1f3cb1aba55e4826ef0cf6f760ceb2c61eea5122603212c6d38c2`
- Comparator mismatches: `0`
- Comparator exit code: `0`

## Result

All three engines completed all `50,000,000` cases.

The comparator processed `50,000,000` rows and reported:

```text
COMPARE_OK
rows=50000000 expected=50000000 mismatches=0
```

The result files were byte-identical. Their SHA-256 value was:

```text
C++:        2efc07722cae13fb5b349373eb358190c7110ed701fce84baf2c8b60e84509e7
JavaScript: 2efc07722cae13fb5b349373eb358190c7110ed701fce84baf2c8b60e84509e7
Python:     2efc07722cae13fb5b349373eb358190c7110ed701fce84baf2c8b60e84509e7
```

## Engine discovery recorded by the run

- C++ header: `implementations\cpp\include\pastafari\calendar.hpp`
- C++ source: `implementations\cpp\src\calendar.cpp`
- JavaScript engine: `browser\pastafari-calendar-fast.js`
- Python package: `implementations\python\pastafari_calendar`

Algorithm IDs reported by discovery:

- C++: `PASTAFARI-SCROLL-2026-08-16-D36B0C94`
- JavaScript: `PASTAFARI-TABLETS-2026-08-06-V1`
- Python: `PASTAFARI-SCROLL-2026-08-16-D36B0C94`

The JavaScript algorithm-ID string differs from the C++/Python strings in the
discovered source, but the 50,000,000-row output comparison itself had zero
mismatches.

## Files in this package

- `full-run-console.log` — original launcher/comparator log, preserved byte-for-byte.
- `comparison.json` — compact comparison summary **derived from the log**.
- `manifest.json` — compact run/evidence manifest **derived from the log**.
- `SHA256SUMS.txt` — SHA-256 hashes for the four files above plus this README is
  intentionally not self-hashed.

The original workload and the three 50-million-row result TSV files are not
included. Their identifying hashes/counts are preserved here and in the log.

## Provenance note

`comparison.json` and `manifest.json` are convenience summaries created from
`full-run-console.log`; they are not claimed to be the original files emitted
by the comparator. The raw log is the primary evidence retained in this package.
