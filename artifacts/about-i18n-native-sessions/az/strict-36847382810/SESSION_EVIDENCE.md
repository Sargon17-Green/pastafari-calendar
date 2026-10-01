# Strict Azerbaijani whole-site QA — immutable evidence

- workflow run: `36847382810`
- reviewed HEAD: `19853c531ccf4d48a97eb5da4488956740d8a344`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 3 12B IT, `ggml-org/gemma-3-12b-it-GGUF:Q4_K_M`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **10/10**
- grounded whole-site corpus: **567 user-visible/accessibility-facing items**
- confirmed findings: **0**

The hidden qualification accepted natural Azerbaijani canonical-domain examples and rejected Turkish leakage, mixed Turkish/Azerbaijani wording, agreement errors, and Turkish lexical residue. The whole-site review therefore supersedes serial Qwen run `36841133295`, whose UI/about surfaces remained mechanically INVALID and whose integration output included code/internal identifiers rather than user-visible language.

After the reviewed HEAD, drift was limited to checksum and historical Qwen evidence files; no Azerbaijani website source changed before promotion.
