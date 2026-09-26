# Same-language LLM QA gate — 2026-09-26

## Purpose

This gate exists because a localized QA report is not, by itself, evidence that the reviewer session was actually conducted in the locale under review.

A locale may advance from `semantic QA` to `linguistic QA` only when there is durable evidence of a **separate LLM reviewer session whose own prompt/conversation and review output are in the target language**.

## Required evidence per locale

For locale `<code>`, retain under:

`artifacts/about-i18n-native-sessions/<code>/`

at least:

- `prompt.md` — the exact target-language prompt supplied to the isolated reviewer;
- `review.md` — the reviewer report in the target language;
- `session.md` — the exported/shared reviewer session transcript proving that the session itself used the target language.

The reviewer must be a fresh isolated LLM invocation for that locale. Reusing this coordinating conversation, translating an English review afterward, backtranslation, mechanical scans, or merely writing the QA record in the locale do **not** satisfy this gate.

## Required reviewer scope

The reviewer must inspect the whole site for the locale, not only `/about/`, including at least:

- main UI and date search;
- day of working/action-day controls;
- comparison;
- year view;
- reverse search;
- errors, loading and state text;
- user guide and footer;
- metadata, title, manifest, noscript and fallback;
- ARIA/accessibility text;
- language switching and likely fallback behavior;
- terminology consistency between `/about/` and the UI;
- likely text-driven wrapping/overflow risks.

It must actively look for wrong-language text, English fallback, translationese, unnatural grammar/register, inconsistent terminology, placeholder misuse, and script/BiDi problems.

The session is a strict linguistic/whole-site review, **not** a substitute for the later rendered visual QA.

## Verdict contract

The target-language prompt must require the reviewer to emit a machine-readable first-line verdict:

`NATIVE_QA_RESULT: PASS`

or

`NATIVE_QA_RESULT: FAIL`

The rest of the report remains in the target language. Technical literals, code identifiers and the verdict token may remain untranslated.

A locale advances to `linguistic QA` only after:
1. all three evidence files exist;
2. the session evidence shows a distinct target-language reviewer invocation;
3. the review verdict is PASS;
4. any findings from earlier failed attempts have been repaired and a fresh PASS session has been recorded.

## Status correction made on 2026-09-26

The following nine locales had previously been marked `linguistic QA` because target-language QA records existed:

`af, az, be, bg, et, fo, fy, gl, ht`

Those records are useful linguistic work, but none contains durable evidence of the literal same-language **separate LLM session** requirement. On 2026-09-26 they were conservatively returned to `semantic QA` in commit `843191a833ee0c8d72a128ea3b4e41001d95b0db`.

They must be reviewed again under this gate before final PASS.

## Current rollout state

All 72 locales now have the semantic/content layer prepared. The Hebrew row remains `semantic master / existing`; all other rows are at `semantic QA`. No locale should be treated as having passed this same-language LLM gate until session evidence exists.

## Execution mechanism

The repository contains `.github/workflows/about-native-qa-smoke.yml`, initially created as an Icelandic proof-of-concept using GitHub Copilot CLI with `copilot-requests: write`.

The first smoke attempts failed only because the workflow requested an unavailable explicit model. The workflow was corrected to use Copilot CLI's available default model and its external GitHub Actions were pinned to immutable SHAs.

Once the Icelandic smoke produces valid `prompt.md`, `review.md` and `session.md`, expand the mechanism to all locales. Prefer isolated reviewer jobs/invocations and commit evidence only in a final aggregation step to avoid branch push races.
