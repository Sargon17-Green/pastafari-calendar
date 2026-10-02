# Strict ne-NP whole-site QA — immutable evidence

- workflow run: `37000231445`
- artifact id: `11224575162`
- reviewed HEAD: `73263efb6688547fc53d7e057a46e0a0fcd63b94`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `17bc081972a0c5b77ec4728943eaed83f7414376415d8b2a7ccb2fb1b4e3d796`
- workflow artifact zip size: **25611 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi/Devanagari and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
