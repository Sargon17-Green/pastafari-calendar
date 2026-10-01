# Strict Bulgarian whole-site QA — immutable evidence

- workflow run: `36859362965`
- reviewed HEAD: `2e882687aebc9dc3be829c7b327d15bfe0b568f4`
- result: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 user-visible/accessibility-facing items**
- confirmed findings: **0**

The hidden qualification accepted natural Bulgarian canonical-domain examples and rejected Russian/mixed-language controls. The strict whole-site review returned `CLEAN` with no findings.

A secondary Qwen serial `about` subreview proposed two noun-definiteness changes, while its integration subreview was mechanically invalid; neither was accepted as strict evidence. The qualified Gemma 4 whole-site gate found no confirmed issue.

After the reviewed HEAD, drift before promotion was limited to Bengali reviewer-preparation files, generated checksums, and historical Belarusian QA evidence; no Bulgarian website source surface changed.
