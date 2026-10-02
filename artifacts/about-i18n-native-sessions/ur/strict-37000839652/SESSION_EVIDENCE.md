# Strict ur-PK whole-site QA — immutable evidence

- workflow run: `37000839652`
- artifact id: `11224371557`
- reviewed HEAD: `5a2599bcafc3c0e7ed9e23f55013d4a8739f1fb7`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `ebd919135a4b13a352b249ef84a9becf9504c02bdd3db4c353fbdba0f946a0ef`
- workflow artifact zip size: **24551 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi/Devanagari and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
