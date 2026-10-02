# Strict yo-NG whole-site QA — immutable evidence

- workflow run: `37070410766`
- artifact id: `11255775517`
- reviewed HEAD: `dd48d6ba9a2306bc304450b6f0111cc671b3e612`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `4e4440acc2393c3b974153f92d583d184bb63f56fc6a954f504392121a569b95`
- workflow artifact zip size: **24245 bytes**

Manual post-run wrong-language scan was clean on the reviewed source. Remaining matches for terms such as `absolute` or `exact` occur only in JavaScript key names; user-visible Yoruba values use localized wording such as `gangan`. Staleness checking found no later change to the Yoruba article, locale strings, localized manifest data, or registry entry before promotion.
