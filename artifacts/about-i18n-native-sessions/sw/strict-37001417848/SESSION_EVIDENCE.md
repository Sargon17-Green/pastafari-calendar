# Strict sw-TZ whole-site QA — immutable evidence

- workflow run: `37001417848`
- artifact id: `11225027127`
- reviewed HEAD: `945fc7bce013cb0fbaea58faa4af442453fc65d1`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `c3b317ac4fdbfc69c0d44ac42b688efeb044bda1b8411f9c70af98c41e97c1a9`
- workflow artifact zip size: **23006 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Indonesian and Russian negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
