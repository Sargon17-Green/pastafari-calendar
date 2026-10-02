# Strict sl-SI whole-site QA — immutable evidence

- workflow run: `37002466755`
- artifact id: `11225211969`
- reviewed HEAD: `21253f469c03b6c36776c3ab262a4735a9369e8b`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `bdb1f12ce68e3f9b3a9a5085be538479c57cdd2ae1497366eeb96dc886fa08ef`
- workflow artifact zip size: **23802 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Croatian/Serbian negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
