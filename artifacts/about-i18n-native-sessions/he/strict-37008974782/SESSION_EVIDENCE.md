# Strict he-IL whole-site QA — immutable evidence

- workflow run: `37008974782`
- artifact id: `11228902335`
- reviewed HEAD: `9781c87701084f6d63f6a7f110025630195dff49`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **683 items**
- confirmed findings: **0**
- workflow artifact zip SHA-256: `d857276aea6b6a74510c50bfb84eb5eed8aabfa8b5a3880b5d89e469ae56e738`
- workflow artifact zip size: **24987 bytes**

Manual post-run scan was clean after localizing the previously missed English manifest description. Remaining Latin-script terms were limited to explicit technical literals/terms such as container, modulo, cold wake, API/HTTP/CLI/OpenAPI/SIMD/SLA and product/proper names. Staleness checking found no later change to the Hebrew article, locale strings, localized manifest data, or registry entry before promotion.
