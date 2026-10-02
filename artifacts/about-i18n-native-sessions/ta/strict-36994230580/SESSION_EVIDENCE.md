# Strict ta-IN whole-site QA — immutable evidence

- workflow run: `36994230580`
- artifact id: `11221288849`
- reviewed HEAD: `05f7a58999839a6846ce8c36c628913a878eb920`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `e1a4b3c615231e3c922d02881625482cf1a57e27571ac487a2cb8cd724ad1fbd`
- workflow artifact zip size: **26522 bytes**

Manual post-run wrong-language scanning was clean against ordinary English leakage and the qualification's Hindi/Devanagari and Russian/Cyrillic negative-language controls; code/API/ID literals and proper names were left unchanged. Staleness checking found no later change to this locale's article, locale strings, localized manifest data, or registry entry before promotion.
