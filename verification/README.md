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

## COBOL cross-engine validation — 2026-08-15

A full local cross-engine validation of the GnuCOBOL reference port completed with **PASS** on Windows/MSYS2 UCRT64. The reference side was `browser/pastafari-calendar-fast.js`; the heavy/core engine was not used as the oracle.

The recorded run used:

- GnuCOBOL 3.2.0;
- Node.js v24.18.1;
- GCC/`cc` 16.2.0;
- deterministic seed `0x50a7fa81`;
- fast-engine SHA-256 `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`;
- COBOL-engine SHA-256 `1f3879a6a963a3b94f702415b38f8ba2e90c84c8653e1f3af61e6a6c1af20176`.

The completed validation covered **18,195 forward comparisons**, **1,348 COBOL forward-to-reverse checks**, **1,200 JS-to-COBOL known-reverse checks**, and **62 bounded/exact `c=t` reverse comparisons**, with **0 mismatches**. Coverage observed all 17 cutlet names and all 47 month names. Total recorded duration was about 18 hours 18 minutes.

### COBOL validation evidence

- [Machine-readable PASS report](evidence/cobol-validation-2026-08-15.json)
- [Rolling progress log](evidence/cobol-validation-2026-08-15.log)
- [Evidence SHA-256 manifest](evidence/cobol-validation-2026-08-15-SHA256SUMS.txt)

This run was performed from a working directory for which Git metadata was unavailable to the validation script (`gitCommit` is `null`). The report therefore binds the evidence to the exact tested file hashes rather than to a repository commit. It should be supplemented by a successful GitHub Actions run after these files are uploaded.

## Interpretation

This is strong empirical evidence that the tested production snapshot agrees with the independent Oracle throughout the sampled input space. It is **not** a formal proof over the full, unbounded input domain.

The raw log and cryptographic hashes are retained so that the result can be audited against the exact production snapshot and verifier artifacts used.
