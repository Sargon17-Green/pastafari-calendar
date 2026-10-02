# Strict uz-UZ whole-site QA — immutable evidence

- workflow run: `36992080976`
- artifact id: `11221295096`
- reviewed HEAD: `eefd2c202422c135f3c32e58191bb681db4ecb73`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `7c6a41687f729fb0b725c90b1c62d558557d65b893c788b1b5887993a8c676c7`
- workflow artifact zip size: **23370 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Russian/Turkish negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
