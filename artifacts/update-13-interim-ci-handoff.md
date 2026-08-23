# Update 13 — Intl/ICU semantic isolation — Stage 1 CI handoff

## Baseline

- `main` commit: `d8361bf852f54597f62daeaa293443e5c5d9ef84`
- package version: `1.3.0`
- source snapshot: `pastafari-calendar-main(20260823-164608).zip`

## Confirmed contamination before the fix

`browser/pastafari-calendar-core.js::chineseToJdn` still routed through the sealed chronicle's legacy ICU-backed Chinese converter even though the package-root and docs Update-10 paths were deterministic.

Foundation input `{ relatedYear: -41221, month: 1, day: 22, leapMonth: false }`:

- normal local ICU: `TypeError: Internal error. Icu error.`
- throwing `Intl.DateTimeFormat`: reached the patched host constructor once and threw `UPDATE13_BASELINE_INTL_THROW`
- normative expected JDN: `-13334246`

Machine-readable reproduction: `artifacts/update-13-pre-fix-contamination.json`.

## Stage-1 production change

The sealed chronicle is intentionally unchanged. `browser/pastafari-calendar-core.js` now places a deliberately awkward semantic firewall in front of it:

`legacy chronicle -> hidden HOST_TAINT Symbol -> Proxy shadow desk -> deterministic Update-10 Chinese detour -> canonical JDN`

The old host-backed converter remains alive as a diagnostic witness. A deterministic Chinese failure is not allowed to fall back to the host result.

## Local evidence completed

- focused Update-13 unit suite: `6/6 PASS`
- Foundation normative matrix: PASS
- Intl modes `normal`, `throw`, `fake-parts`, `wrong-values`, `alien-names`: all PASS
- all five modes produced identical structured outputs and identical normative JDN outputs
- fault modes recorded zero calls to `Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.Locale`, and `Intl.DisplayNames` from the normative probe
- small local random-differential smoke (2 samples/representation, three Intl modes): PASS; the CI workflow intentionally reruns the full default campaign
- workflow YAML parse: PASS

## Why CI is now required

This extracted snapshot does not contain `node_modules`, so the canonical `esbuild@0.28.2` standalone rebuild and Playwright Chromium/Worker execution cannot be completed locally.

The checked-in standalone files are therefore still the baseline files and intentionally fail `scripts/check-update13-standalone-firewall.mjs` before rebuild.

The ordinary `test.yml` job is expected to:

1. install dependencies;
2. rebuild standalone canonically;
3. prove the Update-13 firewall markers are present;
4. upload the regenerated standalone files and marker evidence;
5. then fail at the existing byte-identity `git diff` until those generated files are committed.

That byte-diff failure is expected for the first Stage-1 push, not an Update-13 semantic failure.

The dedicated `Update 13 Intl-ICU isolation audit` workflow independently runs:

- focused Node firewall tests;
- Intl/locale/timezone environment matrix;
- random differential against the independent Update-9/11/12 references;
- Update-10 Chinese cross-environment regression;
- Update-11 Vikrama regression;
- Update-12 Kōki regression;
- compatibility, docs and package verification;
- canonical standalone rebuild and marker audit;
- Chromium + Worker fault injection;
- evidence and rebuilt-standalone artifact upload.

## Local extraction caveat

`npm run docs:check` cannot be treated as evidence in this extracted working copy because its extraction layer transformed the Unicode source filenames `sources/מגילת העיתים.md` and `sources/chinese/农历规范算法.zh.md` into `#U....` spellings. The original ZIP and GitHub tree retain the correct names. CI checkout must decide this check.

`npm run package:verify` was started locally but did not complete within the tool execution window, so no PASS is claimed for it here.

## Stage-1 decision

`UPDATE_13_STAGE1_READY_FOR_CI = yes`

`UPDATE_13_ACCEPTED_FOR_CLOSURE = no`

Do not update the root `SHA256SUMS.txt` yet: the canonical standalone bytes are intentionally unknown until CI rebuilds them. After the generated standalone artifact is committed, regenerate/check the root checksum manifest and run final closure evidence.
