# Strict mr-IN whole-site QA — immutable evidence

- workflow run: `36996262492`
- artifact id: `11222544810`
- reviewed HEAD: `d1343c9466cc35c402fcb8f294cede4477da9048`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `3b4af8bfe7b6612858316aabca31f0e74681699eb943511271af1a4dc0e09c6a`
- workflow artifact zip size: **26232 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
