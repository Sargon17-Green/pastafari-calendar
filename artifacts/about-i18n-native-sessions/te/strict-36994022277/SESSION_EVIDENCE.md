# Strict te-IN whole-site QA — immutable evidence

- workflow run: `36994022277`
- artifact id: `11222245781`
- reviewed HEAD: `1466e890a4699feb91bcfd4800006443b13486f4`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `aea13ea28a7d28f61c4a1cf8773ee73efc4696be371c3b9f669d85ce261d6486`
- workflow artifact zip size: **26397 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi/Devanagari and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
