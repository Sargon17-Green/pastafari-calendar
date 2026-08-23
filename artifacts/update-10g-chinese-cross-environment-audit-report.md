# Update 10G — Chinese cross-environment acceptance audit

Result: **UPDATE_10_ACCEPTED_FOR_CLOSURE**

Acceptance: **ACCEPTED**

Checksum manifests changed: **none**

Additional checksum manifests affected but intentionally not updated: **none**

## Summary

The deterministic Chinese engine passes the cross-environment conversion checks that are in scope for this audit: source, public related-year conversion, docs/browser input conversion, PWA asset wiring, package file inclusion, and Intl fault injection.

No public structured API closure blockers remain.

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

- public Chinese-related exports: `ChineseDate, ChineseStructuredDate, chineseStructuredDateToJdn, chineseToJdn, jdnToChinese`
- source structured exports: `jdnToChinese, chineseStructuredDateToJdn, chineseRelatedDateToJdn`
- public structured exports: `jdnToChinese, chineseStructuredDateToJdn`
- type structured declarations: `jdnToChinese, chineseStructuredDateToJdn, ChineseStructuredDate`

## Decision

Update 10 is accepted for closure. Proceed to Update 11.
