# i18n browser audit — 2026-08-14

## Result

**PASS**

The multilingual browser audit completed with:

- 90 locale files found
- 90 locales registered
- 90 locales present in the language selector
- 90 active locales passed
- 0 warnings
- 0 failures
- 0 runtime/network errors
- 0 layout findings

## Environment

- Browser: Chromium
- Node.js: v26.7.0
- Platform: Windows x64
- Audit script: `scripts/run-i18n-browser-audit.mjs`
- Final command: `node scripts\run-i18n-browser-audit.mjs --resume`

The final run used `--resume`: the already-passing locales from the immediately preceding full run were retained, while the previous failing Akkadian result was rerun after correcting a false-positive condition in the audit harness.

## Coverage

The audit covered all 90 registered locale resources and verified that all 90 were also exposed by the runtime language selector.

Browser checks included, as applicable:

- locale rendering
- language switching
- persistence across reload/new page
- RTL/LTR document direction
- browser-language resolution
- fixed-date fast-engine locale invariance
- representative interaction smoke tests
- desktop and mobile screenshots
- layout checks around CSS width breakpoints

Tested CSS width breakpoints:

- 420 px
- 520 px
- 760 px
- 900 px
- 999 px
- 1000 px

Primary screenshot viewports included 1440×1000 desktop and 390×844 mobile.

## Akkadian audit-harness correction

A prior run reported Akkadian (`akk`) as a switch-language failure because the visible page text did not change from English.

This was a false positive. The Akkadian resource is explicitly experimental, declares `fallbackLocale: "en"`, and currently inherits its displayed messages, calendar labels, and terminology from English. The locale itself was applied correctly (`lang="akk"`), persisted correctly, and passed the smoke checks.

The audit harness was corrected so an explicitly experimental locale that intentionally uses the default locale as its fallback is not failed solely because its visible text is identical to the fallback text.

After rerunning that failed locale, the final result was **90/0/0 (PASS/WARN/FAIL)**.

## Provenance limitation

The audit was run from a downloaded working copy that did not contain Git metadata. Therefore the report records the commit as **unverified** (`לא אומת`).

This log must not be interpreted as proof that the audit was executed against a specific Git commit SHA. It records the tested local file state and the observed browser-audit result.

## Generated audit artifacts

The local audit generated:

- `artifacts/i18n-browser-audit/report.json`
- `artifacts/i18n-browser-audit/report.md`
- `artifacts/i18n-browser-audit/index.html`
- `artifacts/i18n-browser-audit/screenshots/`

These generated artifacts are useful for local inspection, but the full JSON report and screenshot set are intentionally not required to be committed to the repository.
