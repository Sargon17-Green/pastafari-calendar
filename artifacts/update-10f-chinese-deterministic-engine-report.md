# Update 10F — Chinese deterministic shadow engine

Result: **CHINESE_DETERMINISTIC_ENGINE_IMPLEMENTED**

Acceptance: **READY_FOR_STAGE_10G_CROSS_ENV_PACKAGING_AUDIT**

Checksum manifests changed: **none**

Additional checksum manifests affected but intentionally not updated: **docs/SHA256SUMS.txt**

## Scope

This stage implements the source-locked `PASTAFARI_CHINESE_DEEP_DELTA_T_V1` as a deterministic, non-Intl Chinese shadow engine. It wires the public package entry point and docs/browser input converter to this engine for Chinese conversion only.

## Foundation

- Foundation JDN: `-13334246`
- actual Chinese tuple: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"relatedYear":"-41221","month":1,"leap":false,"leapMonth":false,"day":22}`
- expected Chinese tuple: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"relatedYear":"-41221","month":1,"leap":false,"leapMonth":false,"day":22}`
- match: `true`

## JDN checks

- structuredFoundationJdn: `-13334246`
- relatedFoundationJdn: `-13334246`
- publicFoundationJdn: `-13334246`
- publicGenericFoundationJdn: `-13334246`
- docsFoundationJdn: `-13334246`
- publicModernJdn: `2461266`
- docsModernJdn: `2461266`

## Intl fault injection

- public chineseToJdn under Intl fault: PASS -> `-13334246`
- public calendarDateToJdn under Intl fault: PASS -> `-13334246`
- docs calendarDateToJdn under Intl fault: PASS -> `-13334246`

## Files changed

- `src/chinese-calendrica-detour.js`
- `src/public-api.js`
- `docs/chinese-calendrica-detour.js`
- `docs/calendar-converters.js`
- `docs/sw.js`
- `package.json`
- `test/calendar-converters.test.js`
- `test/public-api.test.js`
- `test/pwa-i18n.test.js`
- `scripts/run-update10f-chinese-deterministic-engine.mjs`
- `artifacts/update-10f-chinese-deterministic-engine.json`
- `artifacts/update-10f-chinese-deterministic-engine-report.md`

## Decision

The deterministic Chinese engine is implemented and passes Foundation, modern-vector, public API, docs converter and Intl fault-injection checks. Proceed to Stage 10G cross-environment/packaging audit before declaring Update 10 complete.
