# Strict English whole-site QA — immutable evidence

- workflow run: `36580966998`
- reviewed HEAD: `43cb38e9b21a2281a58208124d1bb59979cb70d4`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: base Gemma 4 E4B, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **9/9**
- whole-site corpus: **525 grounded user-visible/accessibility-facing items**
- confirmed findings: **0**
- structured raw result: `CLEAN`

The hidden qualification explicitly accepted the project's canonical English domain terms `day of working`, `woven months`, and `t=c` when used in grammatical sentences, while rejecting agreement errors and a Spanish-language fragment. The whole-site pass therefore supersedes the earlier Qwen run `36559167329`, whose four surface outputs were mechanically INVALID and contained false positives, invented/unsupported locations, code-as-user-text findings, and no-op or semantically incorrect corrections.

After the reviewed HEAD, the live branch changed only in QA/evidence/checksum files; the English source files were unchanged when this evidence was promoted.
