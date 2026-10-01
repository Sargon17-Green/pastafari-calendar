# Strict Estonian whole-site QA — immutable evidence

- workflow run: `36910105248`
- reviewed HEAD: `de65b6399e59184e6652f0ac9af24700e2b294f5`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **568 user-visible/accessibility-facing items**
- confirmed findings: **0**
- workflow artifact digest: `sha256:8dedfdeb9b15204ecff15312bc79e159d3fb794d512436a6ddf7f20b74772aba`

The prior strict PASS was manually rejected after visible wrong-language leakage was found. The repaired rerun above is authoritative. Post-rerun manual scanning was clean, and later drift did not touch this locale's website source.
