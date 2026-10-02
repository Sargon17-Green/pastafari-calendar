# Strict pa-IN whole-site QA — immutable evidence

- workflow run: `36995008057`
- artifact id: `11222268625`
- reviewed HEAD: `e5b34a496ff018e16ab19ceeeac533cde699900e`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `b86ed6f9b8e4fd7c6821db1d7c0650b04a3ca02147aaef1fc0928689bac44101`
- workflow artifact zip size: **25850 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi/Devanagari and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
