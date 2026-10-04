# About retranslation — canonical continuation status

Date: 2026-10-04

## Scope

Rebuild all 71 non-Hebrew public About translations directly from the current Hebrew master, including:

- `docs/about/content/he.html`
- `docs/about/monster/index.html`
- all 64 expandable calendar-name explanations
- the complete Flying Spaghetti Monster page and penguin appendix
- separate native-language QA in the target language
- separate direct semantic comparison against Hebrew
- no English pivot
- no publication unless every requested locale passes both LLM gates and the structural gate

## Current branch

`feature/about-retranslation-71-locales`

Current guarded worker:

`scripts/about-retranslation-worker-v2.py`

Gated installer:

`scripts/about-retranslation-install.py`

Explicit trigger:

`artifacts/about-retranslation-2026-10-04/control.json`

The workflow now triggers only when `control.json` changes. Editing the worker or workflow no longer spends LLM requests automatically.

## Pipeline state

The worker has been hardened as follows:

1. Each locale run starts from a clean staging directory. It cannot inherit stale candidate or QA evidence.
2. Initial translation is from Hebrew only.
3. Native-language reviewer instructions are generated in the target language.
4. Machine verdict tokens are appended mechanically and cannot be translated away.
5. QA repair cycles are surgical: they repair the existing candidate rather than retranslating unrelated prose.
6. The deliberately over-explained “Empty Jar” and “Closed Door” entries are explicitly protected.
7. Hebrew-only homonym disambiguations may be adapted where the target language has no corresponding ambiguity.
8. An LLM repair is rejected before installation if it changes the expected HTML tag/order/id/class structure.
9. The aggregate step copies only current numbered QA reports and cannot mistake a stale `*-final` file for current evidence.
10. The installer refuses publication unless all 71 non-Hebrew locales have:
   - `state=PASS`
   - `native_qa=PASS`
   - `hebrew_compare=PASS`
   - both final QA reports present.
11. Copilot monthly-quota exhaustion is now classified as an external blocker:
   - `state=BLOCKED`
   - `stage=COPILOT_QUOTA`
   rather than as a linguistic FAIL.

## English pilot findings before the quota blocker

The first complete English pilot proved that structural translation can succeed: its structural gate was empty/green.

Native English QA then found genuine translationese and target-language issues. The subsequent repair architecture was changed so those findings are corrected surgically and so a linguistic repair cannot corrupt markup.

A later pilot demonstrated that the old repair loop could let a Monster-page repair alter structure. That defect has now been fixed: repaired output is structurally validated before it can replace the previous candidate.

No English candidate has yet received the required final dual PASS.

## External blocker

GitHub Copilot CLI currently rejects further inference calls with:

`You have exceeded your monthly quota`

This was independently reproduced in two workflow runs:

- run `37229728952`: quota hit at native-language QA after translation
- run `37230119005`: triggered by the second connected GitHub actor `Sargon-17-Green`; quota hit already at reviewer-prompt translation

Therefore changing the GitHub actor does not provide usable additional Copilot capacity for this workflow.

GitHub Models is not a fallback: GitHub retired GitHub Models completely on 2026-07-30, including the inference API.

Repository search found no existing references to configured provider secrets such as:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GEMINI_API_KEY`
- `GOOGLE_API_KEY`
- Azure OpenAI
- Mistral

Plugin discovery also found no already-connected general text-inference provider suitable for this workload.

## Publication state

No non-Hebrew retranslation has been published.

The current public/main article registry still registers Hebrew only.

`publish` remains `false`.

Do not install or publish partial results.

## Resume rule

Do not restart translation design, QA design, or localization infrastructure.

When usable LLM inference becomes available again, the next action is:

1. trigger a clean English pilot by changing `control.json`;
2. require structural PASS + native-language PASS + direct-Hebrew semantic PASS;
3. if English passes, set `locales` to all 71 entries from `locales.json` with `publish=false`;
4. run the full matrix and repair only failing locales;
5. install only after 71/71 dual PASS;
6. run repository CI, accessibility, visual and PWA/offline checks;
7. publish only after all gates are green.

Do not reuse the obsolete 72-locale article prose as a semantic source. The Hebrew master remains the translation source.
