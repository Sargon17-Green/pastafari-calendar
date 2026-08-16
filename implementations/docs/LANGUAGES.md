# Ready independent languages — incremental upload

This document describes only the implementations included in this upload. It is
not a claim that the overall 45-language remediation is complete.

| Language | Independent engine | Full acceptance corpus | Status |
|---|---:|---:|---|
| C++20 | Yes | 16 known + 10,000 differential; bigint unit | **implemented and tested** |
| Python 3 | Yes | 16 known + 10,000 differential; unit tests | **implemented and tested** |
| C17 | Yes | 16 known + 10,000 differential | **implemented and tested** |
| Java 17+ | Yes | 17 semantic + 16 known + 10,000 differential | **implemented and tested** |
| Ruby | Yes | 16 known + 10,000 differential | **implemented and tested** |

JavaScript is not counted as one of the target languages.

The wider project still contains additional work outside this upload. In
particular, this bundle intentionally does not include non-independent FFI/C ABI
wrappers, compiler-generated Assembly, or ports that have not yet passed their
required verification.
