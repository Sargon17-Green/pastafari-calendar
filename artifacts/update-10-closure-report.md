# Update 10 — Chinese calendar closure

Result: **UPDATE_10_CLOSED**

Readiness: **READY_FOR_UPDATE_11 = yes**

## Scope

This closure note records the end state of Update 10 after the Chinese calendar repair sequence. It is documentation-only: no production code, browser docs code, source text, package metadata, PWA manifest, standalone bundle, or checksum manifest is modified by this closure artifact.

## Revision context

- Repository: `Sargon17-Green/pastafari-calendar`
- Branch: `main`
- Latest observed commit after the final standalone rebuild upload: `ee208f2b63485b43971ee3525ecc7bf4cf543127`
- Commit message language: Russian CI-fix note for the standalone rebuild after the public structured Chinese API update.

## Completed stages

### 10A — Chinese audit and blocker identification

- Confirmed the public Chinese conversion path was host `Intl`/ICU dependent.
- Confirmed the public `ChineseDate` shape did not expose the Magillah-required structured Chinese fields: cycle, year-in-cycle, heavenly stem, earthly branch, month, leap flag, and day.
- Result: `BLOCKED_NORMATIVE_SOURCE_INCOMPLETE_AND_PUBLIC_CHINESE_HOST_DEPENDENT`.

### 10B — Source intake

- Added a Chinese-language project source under `sources/chinese/农历规范算法.zh.md`.
- Selected a CALENDRICA-derived algorithmic path as the implementation basis, while preserving the copyright boundary around external standards text.
- Result: `SOURCE_SELECTED_BUT_REPAIR_BLOCKED_UNTIL_EXACT_CALENDRICA_PORT`.

### 10C — CALENDRICA-derived diagnostic port

- Built an independent diagnostic port for the Chinese astronomical calendar structure.
- Found that the baseline CALENDRICA-derived port reproduced cycle/year/stem/branch/month/leap, but returned Foundation day `19` instead of Magillah day `22`.
- Result: `CALENDRICA_PORT_DIVERGES_FROM_MAGILLAH_FOUNDATION`.

### 10D — Foundation reconciliation

- Diagnosed the three-day Foundation gap as deep-antiquity Delta-T extrapolation sensitivity rather than RD/JDN offset, timezone convention, public formatting, or a simple one-day rounding issue.
- Found that a deep-antiquity Delta-T scale around `1.04` to `1.05` reproduced the Magillah Foundation discriminator.
- Result: `FOUNDATION_OFFSET_RECONCILED_AS_DELTA_T_EXTRAPOLATION_SENSITIVITY`.

### 10E — Source lock

- Added the explicit source rule `PASTAFARI_CHINESE_DEEP_DELTA_T_V1`.
- The rule uses the CALENDRICA/Meeus/NASA-style Delta-T expression normally, and for Gregorian astronomical years before `-1999` applies the project-specific factor `26/25` to the deep-antiquity extrapolation.
- Result: `CHINESE_DEEP_DELTA_T_SOURCE_RULE_LOCKED`.

### 10F — Deterministic engine implementation

- Added a deterministic Chinese engine path independent of host `Intl`/ICU.
- Connected it to the public API and browser/docs converter path.
- Added PWA/cache/package integration for the new browser dependency.
- Verified Foundation, modern-vector, browser/docs, package, PWA, and `Intl` fault-injection behavior.
- Result: `CHINESE_DETERMINISTIC_ENGINE_IMPLEMENTED`.

### 10G — Cross-environment audit

- Verified that the deterministic engine worked across Node/public API, docs/browser converter, PWA/offline cache, package verification, and `Intl` fault injection.
- Identified the remaining public structured API gap.
- Initial result: `UPDATE_10_BLOCKED_BY_PUBLIC_STRUCTURED_CHINESE_API_GAP`.

### 10H — Public structured API and types

- Added public structured Chinese API support:
  - `ChineseStructuredDate`
  - `jdnToChinese(jdn)`
  - `chineseStructuredDateToJdn(value)`
- Kept legacy `ChineseDate` / related-year input compatibility.
- Updated type declarations and tests.
- Re-ran 10G successfully after the API gap was closed.
- Result: `PUBLIC_STRUCTURED_CHINESE_API_AND_TYPES_ACCEPTED` and `UPDATE_10_ACCEPTED_FOR_CLOSURE`.

### CI follow-up fixes

- Rebuilt standalone artifacts after deterministic-engine changes.
- Fixed the PWA smoke test's service-worker variant substitution so it tracks the current `docs/sw.js` version rather than a stale hard-coded version.
- Rebuilt standalone artifacts again after the public structured API changes.
- Final user-reported state: uploaded and ready for closure.

## Final accepted behavior

The Chinese calendar path now satisfies the Update 10 acceptance criteria:

- Foundation Chinese anchor is represented structurally as cycle `-643`, year-in-cycle `57`, `geng-shen`, month `1`, non-leap, day `22`.
- Foundation round-trip maps to JDN `-13334246`.
- The existing modern vector `ChineseDate(2026, 7, 1, non-leap) -> JDN 2461266` is preserved.
- The public API exposes structured Chinese output and accepts structured Chinese input.
- The legacy `ChineseDate` path remains compatible.
- The docs/browser converter no longer depends on host `Intl` for Chinese conversion.
- PWA/offline caching includes the deterministic Chinese browser dependency.
- Standalone artifacts are synchronized with `build:standalone`.
- Package verification includes the new files.

## Non-goals and constraints preserved

- No silent `+3 day` fixture hack was introduced.
- No reliance on host `Intl`/ICU remains for the repaired Chinese path.
- The deep-antiquity Delta-T behavior is source-locked rather than hidden in production code.
- Update 10 did not change non-Chinese calendar semantics intentionally.

## Closure decision

`UPDATE_10_CLOSED`

`READY_FOR_UPDATE_11 = yes`
