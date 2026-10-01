# Strict Czech whole-site QA — immutable evidence

- workflow run: `36886900641`
- reviewed HEAD: `0db375a676092fabf8a00b9448b75f1e619b3119`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 user-visible/accessibility-facing items**
- confirmed findings: **0**
- workflow artifact digest: `sha256:c571b339f6b9ea80805788c2c28ba36c63f28921dea09223ee5e22a1baf02ce4`

Before the strict run, six obvious ordinary-English leakage fragments in `docs/about/content/cs.html` were repaired in commit `5f3e547ac9c3bae394849fcbbd1788f5dc71840d`.

The first Czech strict workflow instance was superseded because its registry extractor still matched `bs` rather than `cs`; this was corrected in commit `0db375a676092fabf8a00b9448b75f1e619b3119`. Run `36886900641` is the authoritative corrected run.

The corrected strict run passed qualification 8/8, reviewed 568 grounded items, and returned CLEAN with zero findings. A manual post-run scan also found no remaining ordinary English, Slovak, Polish, or Cyrillic-language leakage.

Post-review drift before promotion was limited to generated checksum refresh; no Czech website source changed.
