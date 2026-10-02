# Strict ro-RO whole-site QA — immutable evidence

- workflow run: `36991873900`
- artifact id: `11221128506`
- reviewed HEAD: `53ed7e870fc0c7f5be77190a8ef603bf87f91f58`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `8d9952da24d3afdb026f2cc69bdea5a40d631833dbca7daf33afc1f2f5fad7a0`
- workflow artifact zip size: **24241 bytes**

Manual post-run wrong-language scanning was clean. Romanian technical vocabulary and established Romanian loanwords were not treated as foreign-language leakage merely because they use forms shared with English. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
