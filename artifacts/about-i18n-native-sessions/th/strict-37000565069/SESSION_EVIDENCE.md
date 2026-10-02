# Strict th-TH whole-site QA — immutable evidence

- workflow run: `37000565069`
- artifact id: `11224221343`
- reviewed HEAD: `94c9526f7c4a6493ae96bdbedbf730e70a07ffa7`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `46f7c29ac73262b74cb70d47b975831194fac913e9f288dd1ba4f4e8bc7c670b`
- workflow artifact zip size: **26407 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Chinese and Indonesian negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
