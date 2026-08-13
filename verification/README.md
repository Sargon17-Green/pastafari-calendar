# Verification

This directory contains reproducible verification evidence for the Pastafari calendar implementation.

## Verified production baseline

The production fast engine at commit
[`c5db80439b7753569d712c42b7a26c7f547ed252`](https://github.com/bwtbdyqtmsprytgydym-cpu/pastafari-calendar/commit/c5db80439b7753569d712c42b7a26c7f547ed252)
was tested by a standalone verifier containing an independent Python Oracle.

The completed soak run covered:

- **1,000 batches**
- **4,467,783 Oracle-versus-production comparisons**
- calculation-day sampling primarily within ±1,000 years of the anchor, with additional sampling out to ±10,000 years
- periodic neighboring-year probes
- **0 mismatches**

The production file tested was `browser/pastafari-calendar-fast.js`, with SHA-256:

`61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`

### Evidence

- [Human-readable soak report](evidence/soak-c5db804-2026-08-13.md)
- [Raw JSONL soak log](evidence/soak-c5db804-2026-08-13.jsonl)
- [SHA-256 manifest](evidence/soak-c5db804-2026-08-13-SHA256SUMS.txt)
- [Final standalone soak verifier used for batches 398-999](evidence/pastafari_soak_standalone_1_2_1.py)

The raw JSONL log SHA-256 is:

`7daa0ad643f8dcf1b9ce035876ec49cfe804de34400ac8b5a580ab0c8c5bd80d`

The logical soak run continued across three infrastructure revisions of the standalone verifier. The detailed report records the exact batch ranges and verifier hashes. Those revisions changed runtime persistence/recovery and evidence reporting; the Oracle, sampling algorithm, and comparison semantics were kept unchanged.

## Interpretation

This is strong empirical evidence that the tested production snapshot agrees with the independent Oracle throughout the sampled input space. It is **not** a formal proof over the full, unbounded input domain.

The raw log and cryptographic hashes are retained so that the result can be audited against the exact production snapshot and verifier artifacts used.
