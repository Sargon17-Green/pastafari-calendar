# Update 10H — Public structured Chinese API and types

Result: **PUBLIC_STRUCTURED_CHINESE_API_AND_TYPES_ACCEPTED**

Acceptance: **ACCEPTED**

Checksum manifests changed in this delta: **none**

Additional checksum manifests affected but intentionally not updated: **docs/SHA256SUMS.txt**

## Public API added

- `ChineseStructuredDate`
- `jdnToChinese(jdn)`
- `chineseStructuredDateToJdn(value)`

## Foundation discriminator

- Foundation JDN: `-13334246`
- actual: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"leapMonth":false,"day":22,"relatedYear":"-41221"}`
- expected: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"leapMonth":false,"day":22,"relatedYear":"-41221"}`
- match: **true**

## Checks

- PASS: public jdnToChinese export exists
- PASS: public chineseStructuredDateToJdn export exists
- PASS: public ChineseStructuredDate constructor exists
- PASS: public type declares ChineseStructuredDate
- PASS: public type declares ChineseStructuredDateResult
- PASS: public type declares jdnToChinese
- PASS: public type declares chineseStructuredDateToJdn
- PASS: src/docs deterministic detours remain identical
- PASS: Foundation JDN -> structured Chinese tuple — {"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"leapMonth":false,"day":22,"relatedYear":"-41221"}
- PASS: structured object -> JDN
- PASS: ChineseStructuredDate -> JDN
- PASS: chineseToJdn accepts ChineseStructuredDate
- PASS: calendarDateToJdn accepts ChineseStructuredDate
- PASS: structured conversion is Intl-independent
- PASS: JDN conversion is Intl-independent

## Decision

The public structured Chinese API gap found by 10G is repaired. Rerun 10G as the final closure/audit gate.
