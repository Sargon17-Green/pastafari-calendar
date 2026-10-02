# Strict zh-CN whole-site QA — immutable evidence

- workflow run: `36995694730`
- artifact id: `11222253011`
- reviewed HEAD: `8a6a5072b5a58618dbe9d4be81ed4ff24329a750`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `5baa631b62858690c19067aaff03c5e07121584b98634571b525d715e148e4ed`
- workflow artifact zip size: **24213 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Japanese and Korean negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
