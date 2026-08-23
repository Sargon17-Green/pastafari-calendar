# Update 10E — Chinese deep-antiquity Delta-T source lock

Result: **CHINESE_DEEP_DELTA_T_SOURCE_RULE_LOCKED**

Acceptance: **SOURCE_RULE_ONLY_READY_FOR_IMPLEMENTATION_STAGE_10F**

Production files changed: **none**

## Source rule

The Chinese source text now defines `PASTAFARI_CHINESE_DEEP_DELTA_T_V1` in `sources/chinese/农历规范算法.zh.md`.

For the Chinese-calendar deep-antiquity proleptic extension only:

```text
if Gregorian astronomical year Y < -1999:
  t = (Y - 1820) / 100
  DeltaT_base_seconds = -20 + 32 * t^2
  DeltaT_chinese_seconds = (26 / 25) * DeltaT_base_seconds
else:
  use the unmodified CALENDRICA/Meeus/NASA piecewise ephemeris-correction rule
```

## Evidence carried forward from 10D

- 10D result: `FOUNDATION_OFFSET_RECONCILED_AS_DELTA_T_EXTRAPOLATION_SENSITIVITY`
- matching Delta-T factors: `1.04, 1.045, 1.05`
- selected exact source factor: `26/25 = 1.04`

## Patched reference probe

A temporary, non-production 10C probe was patched to use the source-locked rule. It returned:

- result: `CALENDRICA_PORT_REPRODUCES_FOUNDATION_READY_FOR_10D`
- Foundation actual: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":22}`
- Foundation match: `true`
- reverse expected delta from Foundation: `0`

## Decision

- The source now contains an explicit deterministic Chinese deep-antiquity Delta-T rule, written in Chinese, under sources/chinese.
- The chosen rule is not a production patch and does not alter the public API.
- A patched reference probe using the source-locked 26/25 rule reproduces the Magillah Foundation discriminator exactly.
- Update 10F may now implement the named rule in a hidden deterministic Chinese shadow engine and connect it through the public structured result path.

## Next stage

Proceed to Update 10F only: implement `PASTAFARI_CHINESE_DEEP_DELTA_T_V1` as a named hidden deterministic Chinese shadow engine, add Node/browser/standalone/fault-injection tests, and only then connect the structured Chinese public result.
