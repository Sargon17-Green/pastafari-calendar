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

## COBOL cross-engine validation — 2026-08-15 (pre-ABI-fix historical run)

A full local cross-engine validation of the earlier GnuCOBOL reference port completed with **PASS** on Windows/MSYS2 UCRT64. The reference side was `browser/pastafari-calendar-fast.js`; the heavy/core engine was not used as the oracle.

The recorded run used:

- GnuCOBOL 3.2.0;
- Node.js v24.18.1;
- GCC/`cc` 16.2.0;
- deterministic seed `0x50a7fa81`;
- fast-engine SHA-256 `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`;
- COBOL-engine SHA-256 `1f3879a6a963a3b94f702415b38f8ba2e90c84c8653e1f3af61e6a6c1af20176`.

The completed validation covered **18,195 forward comparisons**, **1,348 COBOL forward-to-reverse checks**, **1,200 JS-to-COBOL known-reverse checks**, and **62 bounded/exact `c=t` reverse comparisons**, with **0 mismatches**. Coverage observed all 17 cutlet names and all 47 month names. Total recorded duration was about 18 hours 18 minutes.

### Historical COBOL validation evidence

- [Machine-readable PASS report](evidence/cobol-validation-2026-08-15.json)
- [Rolling progress log](evidence/cobol-validation-2026-08-15.log)
- [Evidence SHA-256 manifest](evidence/cobol-validation-2026-08-15-SHA256SUMS.txt)

This historical run predates the explicit C-ABI argument-size portability fix. It remains useful evidence for the earlier engine snapshot, but the current ABI-fixed engine is qualified by the newer run below.

## COBOL ABI-fixed cross-engine validation — 2026-08-16

After the cross-platform ABI portability fix, the full standard cross-engine validation was rerun locally against the ABI-fixed COBOL engine and completed with **PASS**.

The retained run used:

- Windows x64 / MSYS2 UCRT64;
- GnuCOBOL 3.2.0;
- Node.js v24.18.1;
- GCC/`cc` 16.2.0;
- deterministic seed `0x50a7fa81`;
- fast-engine SHA-256 `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`;
- ABI-fixed COBOL-engine SHA-256 `2431ee68bbd20328a7093458b092a37ce76319293e25554c3aa8aa35a44f1106`.

The run completed **18,195/18,195 forward comparisons**, **1,348 COBOL forward-to-reverse checks**, **1,200/1,200 JS-to-COBOL known-reverse checks**, and **62/62 exact/bounded `c=t` comparisons**, with **0 mismatches**. It observed all 63 gate checkpoints, all 17 cutlet names and all 47 month names. Total recorded duration was about 19 hours 39 minutes.

### ABI-fixed COBOL validation evidence

- [Human-readable validation record](evidence/cobol-validation-abi-fixed-2026-08-16.md)
- [Machine-readable PASS report](evidence/cobol-validation-abi-fixed-2026-08-16.json)
- [Rolling progress log](evidence/cobol-validation-abi-fixed-2026-08-16-progress.log)
- [Full console transcript](evidence/cobol-validation-abi-fixed-2026-08-16-console.log)
- [Exact generated request corpus](evidence/cobol-validation-abi-fixed-2026-08-16-requests.txt)
- [Evidence SHA-256 manifest](evidence/cobol-validation-abi-fixed-2026-08-16-SHA256SUMS.txt)

The downloaded source snapshot did not contain Git metadata, so the validation report records `gitCommit: null`. The evidence is instead bound to exact SHA-256 values for the tested sources and request corpus. At evidence-packaging time, public `main` at `aa9a26ff351e557a864df7bcc7f2a3e3feb49551` listed the same hashes for the tested fast engine and ABI-fixed COBOL source stack.

## Interpretation

This is strong empirical evidence that the tested production and COBOL snapshots agree with their stated comparison references throughout the sampled input spaces. It is **not** a formal proof over the full, unbounded input domain.

The raw logs, request corpus and cryptographic hashes are retained so that the results can be audited against the exact snapshots and verifier artifacts used.
