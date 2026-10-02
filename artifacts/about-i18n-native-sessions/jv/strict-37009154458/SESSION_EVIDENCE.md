# Strict jv-ID whole-site QA — immutable evidence

- workflow run: `37009154458`
- artifact id: `11227559519`
- reviewed HEAD: `23fc7322934eb778500f3a2af7bb16e155a4bed3`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `6ac3d356a2224d761ce54def24c7dca8c4bb568c9ed74c9560082e48fba889f4`
- workflow artifact zip size: **22714 bytes**

Manual post-run scan was revisited after the initial false-positive leakage flag. Terms such as `solusi`, `variabel`, `kronologis`, and `rubah` are attested in Javanese-language educational/reference material and are not sufficient evidence of Indonesian leakage by themselves. A broader source scan found no remaining confirmed ordinary-language leakage; technical literals/proper names were left unchanged. Staleness checking found no later change to the Javanese article, locale strings, localized manifest data, or registry entry before promotion.
