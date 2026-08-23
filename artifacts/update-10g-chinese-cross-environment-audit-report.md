# Update 10G — Chinese cross-environment acceptance audit

Result: **UPDATE_10_BLOCKED_BY_PUBLIC_STRUCTURED_CHINESE_API_GAP**

Acceptance: **NOT_ACCEPTED_FOR_UPDATE_10_CLOSURE**

Checksum manifests changed: **none**

Additional checksum manifests affected but intentionally not updated: **none**

## Summary

The deterministic Chinese engine passes the cross-environment conversion checks that are in scope for this audit: source, public related-year conversion, docs/browser input conversion, PWA asset wiring, package file inclusion, and Intl fault injection.

However, Update 10 is not ready for closure because the original public representation gap remains: the public package still exposes only related-year Chinese conversion, not a structured cycle/yearInCycle/stem/branch API.

## Foundation discriminator

- Foundation JDN: `-13334246`
- actual: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"relatedYear":"-41221","month":1,"leap":false,"leapMonth":false,"day":22}`
- expected: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"relatedYear":"-41221","month":1,"leap":false,"leapMonth":false,"day":22}`
- match: `true`

## Conversion checks

- PASS: src chineseRelatedDateToJdn foundation -> `-13334246`
- PASS: src chineseStructuredDateToJdn foundation -> `-13334246`
- PASS: public chineseToJdn foundation -> `-13334246`
- PASS: public calendarDateToJdn foundation -> `-13334246`
- PASS: docs calendarDateToJdn foundation -> `-13334246`
- PASS: src chineseRelatedDateToJdn modern -> `2461266`
- PASS: public chineseToJdn modern -> `2461266`
- PASS: docs calendarDateToJdn modern -> `2461266`

## Intl fault injection

- PASS: Intl-fault public chineseToJdn -> `-13334246`
- PASS: Intl-fault public calendarDateToJdn -> `-13334246`
- PASS: Intl-fault docs calendarDateToJdn -> `-13334246`

## PWA/package wiring

- PWA version: `pastafari-static-pwa-hardening-16-chinese-detour`
- CORE_ASSETS: `20`
- includes `./chinese-calendrica-detour.js`: `true`
- PWA smoke dynamic SW variant rewriting: `true`
- package includes `docs/chinese-calendrica-detour.js`: `true`

## Public API exposure

- public Chinese-related exports: `ChineseDate, chineseToJdn`
- source structured exports: `jdnToChinese, chineseStructuredDateToJdn, chineseRelatedDateToJdn`
- public structured exports: `none`
- type structured declarations: `none`

## Closure blockers

- public API does not export jdnToChinese(), so JDN -> structured Chinese representation is still not public
- public API does not export chineseStructuredDateToJdn(), so cycle/yearInCycle input is not public
- public .d.ts does not declare jdnToChinese()
- public .d.ts does not declare a structured Chinese date shape

## Decision

Do not proceed to Update 11 yet. Perform Update 10H to expose the structured Chinese API and type declarations without changing the already-passing deterministic engine.
