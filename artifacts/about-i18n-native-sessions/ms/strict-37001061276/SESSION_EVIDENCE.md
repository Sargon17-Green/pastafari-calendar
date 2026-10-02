# Strict ms-MY whole-site QA — immutable evidence

- workflow run: `37001061276`
- artifact id: `11224501422`
- reviewed HEAD: `f340b39a0cb59b00d36da45248031988a8a70fd4`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `212f9b552016ae18cf633eea6209c44e4113d69dd89db8b03844e5a88276fabe`
- workflow artifact zip size: **22850 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Indonesian negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
