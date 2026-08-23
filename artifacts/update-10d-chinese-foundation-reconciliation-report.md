# Update 10D — Chinese Foundation reconciliation

Result: **FOUNDATION_OFFSET_RECONCILED_AS_DELTA_T_EXTRAPOLATION_SENSITIVITY**

Acceptance: **DIAGNOSTIC_ONLY_NOT_A_PRODUCTION_FIX**

## Scope

No production converter or public API path is modified. This stage diagnoses why the Magillah Foundation anchor is three fixed days after the baseline CALENDRICA-derived port.

## Baseline

- Foundation fixed day: `-15055671`
- Magillah expected: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":22}`
- Magillah-implied month start: `-15055692`
- Baseline actual: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":19}`
- Baseline month start: `-15055689`
- Baseline month-start delta from Magillah-implied start: `3`

## Delta-T factor sweep

| factor | result | month start | start delta | day | reverse delta |
|---:|---|---:|---:|---:|---:|
| 0 | mismatch | -15055680 | 12 | 10 | 278 |
| 0.8 | mismatch | -15055675 | 17 | 5 | 17 |
| 0.9 | mismatch | -15055682 | 10 | 12 | 10 |
| 0.95 | mismatch | -15055686 | 6 | 16 | 6 |
| 1 | mismatch | -15055689 | 3 | 19 | 3 |
| 1.01 | mismatch | -15055690 | 2 | 20 | 2 |
| 1.02 | mismatch | -15055690 | 2 | 20 | 2 |
| 1.03 | mismatch | -15055691 | 1 | 21 | 1 |
| 1.035 | mismatch | -15055691 | 1 | 21 | 1 |
| 1.04 | MATCH | -15055692 | 0 | 22 | 0 |
| 1.045 | MATCH | -15055692 | 0 | 22 | 0 |
| 1.05 | MATCH | -15055692 | 0 | 22 | 0 |
| 1.055 | mismatch | -15055693 | -1 | 23 | -1 |
| 1.06 | mismatch | -15055693 | -1 | 23 | -1 |
| 1.1 | mismatch | -15055696 | -4 | 26 | -4 |

## Control variants

| variant | result | month start | start delta | day | reverse delta |
|---|---|---:|---:|---:|---:|
| zone-forced-plus8 | mismatch | -15055689 | 3 | 19 | 3 |
| newmoon-floor-minus1 | mismatch | -15055690 | 2 | 20 | -28 |
| newmoon-floor-plus1 | ERROR |  |  |  |  |

## Interpretation

- The baseline CALENDRICA-derived port places the start of the Foundation month at Foundation-18 and therefore reports day 19.
- The Magillah anchor implies that the same month began at Foundation-21.
- Small civil-time convention changes are too small or move in the wrong direction: forcing the old Chinese zone to +08:00 does not remove the three-day gap, and a one-day floor/ceil-style new-moon shift cannot explain it.
- Scaling only the deep-antiquity Delta-T extrapolation used by the port to about 1.04-1.05 makes the CALENDRICA structure reproduce the Magillah Foundation discriminator exactly.
- Therefore the three-day discrepancy is best explained as sensitivity to an unsupported deep-antiquity astronomical/Delta-T convention, not as an RD/JDN off-by-one or public API formatting issue.

## Decision

- Do not patch production with a simple +3-day offset; that would be a fixture-specific hack.
- Do not claim unmodified CALENDRICA is the Magillah source of truth for 41,222 BCE.
- The next acceptable repair path is to make the Magillah/source text explicitly choose the deep-antiquity Delta-T convention/calibration for the Chinese calendar, then implement that convention as a named shadow engine with tests.
