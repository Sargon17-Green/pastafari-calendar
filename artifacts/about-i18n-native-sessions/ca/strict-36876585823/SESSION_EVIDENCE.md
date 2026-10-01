# Strict Catalan whole-site QA — preserved non-promoted evidence

- workflow run: `36876585823`
- reviewed HEAD: `17e2d2deb8d2072c1556d7a37f786d5ad681fba1`
- workflow conclusion: `success`
- model verdict: `NATIVE_QA_RESULT: PASS`
- reviewer: Gemma 4 E4B IT, `ggml-org/gemma-4-E4B-it-GGUF:Q4_0`
- runtime: pinned `llama.cpp b10982`
- hidden qualification: **8/8**
- grounded whole-site corpus: **567 user-visible/accessibility-facing items**
- model-confirmed findings: **0**
- workflow artifact digest: `sha256:0fe8811104b64f663b44d6d7110fc38414f41d4aa846fe2a312abd88c7f41c80`

## Promotion decision

**NOT PROMOTED.** The model returned a false-negative CLEAN/PASS result.

Independent manual review of the exact reviewed source found clear user-visible English leakage in Catalan prose, including examples such as `recurrence`, `recurrence condition`, `exact scan`, `self-referential date`, `distribution`, `heavy tail`, `maximum waiting time`, `set`, `span`, `location/day-boundary`, `topocentric lower meridian transit`, `daylight saving time`, `query`, `Optimization`, `counter`, `absolute address`, `mechanism`, `path`, `finite`, `automata`, `state`, and `ambiguity`. Additional English leakage was also present around the sauce/choice explanation (`update`, `state`, `answer ring`, `index`, `valid choice`, `mechanism`).

These are ordinary prose, not protected canonical literals. Twenty-two source replacements were applied in commit `f05374707c21e73a03cc6802d82bd392feb28f4d`, and the strict workflow was strengthened/retriggered in commit `83e36c19a0617856fc5455c4b7e97fdc942cfe70`.

This directory is retained as immutable evidence of the rejected false-negative run; it must not be treated as a locale promotion.
