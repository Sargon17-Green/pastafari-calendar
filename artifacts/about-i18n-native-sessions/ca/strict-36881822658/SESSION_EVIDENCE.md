# Strict Catalan whole-site QA — immutable evidence

- workflow run: `36881822658`
- reviewed HEAD: `83e36c19a0617856fc5455c4b7e97fdc942cfe70`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 user-visible/accessibility-facing items**
- confirmed findings: **0**
- workflow artifact digest: `sha256:0e4126a7e583cbee7e83da5ff412c583c50f760e94ddad1506c57daf32ffd7ac`

This is the authoritative Catalan promotion run.

The immediately preceding strict run `36876585823` returned a false-negative CLEAN/PASS and was explicitly **not promoted** after manual review found ordinary English leakage in Catalan prose. Twenty-two source replacements were applied in commit `f05374707c21e73a03cc6802d82bd392feb28f4d`; the strict workflow was then hardened/retriggered in commit `83e36c19a0617856fc5455c4b7e97fdc942cfe70`.

The rerun reviewed the repaired source, passed hidden qualification 8/8, reviewed all 567 grounded items, and returned CLEAN with zero findings. A follow-up manual scan of the repaired Catalan source found no remaining ordinary English leakage; remaining `Short Choice`/`Wide Choice` terms are canonical literals and stable IDs such as `day-boundary` are not user-facing prose.

Post-review drift before promotion consisted only of checksum refreshes and immutable evidence for the rejected prior Catalan run; no Catalan website source changed.
