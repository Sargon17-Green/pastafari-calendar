# Update 10C — CALENDRICA Chinese port Foundation discriminator

Result: **CALENDRICA_PORT_DIVERGES_FROM_MAGILLAH_FOUNDATION**

Acceptance: **NOT_ACCEPTED_AS_UPDATE_10_REPAIR**

## Scope

diagnostic/reference port only; production converter and public API unchanged. No production file or public API path is modified by this stage.

## Sources

- Copyable implementation source: CALENDRICA 4.0 / calendar-code2 / Apache-2.0.
- Official normative reference: GB/T 33661-2017 — 农历的编算和颁行.
- Repository Chinese source text: `sources/chinese/农历规范算法.zh.md`.

## Foundation discriminator

- Foundation fixed day: `-15055671`
- Foundation JDN: `-13334246`
- Magillah expected: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":22}`
- Port actual: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":19}`
- match: `false`
- mismatches: `[{"field":"day","actual":19,"expected":22}]`
- fixed-from-expected result: `-15055668`
- fixed-from-expected delta from Foundation: `3`

## Neighboring days

- offset -2: fixed -15055673 -> `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":17}`
- offset -1: fixed -15055672 -> `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":18}`
- offset 0: fixed -15055671 -> `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":19}`
- offset 1: fixed -15055670 -> `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":20}`
- offset 2: fixed -15055669 -> `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","stem":7,"branch":9,"month":1,"leap":false,"day":21}`

## Decision

- The port is deterministic and independent of Intl, but it does not reproduce the Magillah Foundation discriminator.
- The disagreement is not a cosmetic API issue: the CALENDRICA-derived month start places Foundation on day 19 of month 1, while the Magillah anchor requires day 22 of month 1.
- The expected structured Chinese date round-trips to Foundation+3 under this port, so production must not be patched with it.
- A further reconciliation source or an explicit Magillah convention amendment is required before Update 10 can be accepted as fixed.
