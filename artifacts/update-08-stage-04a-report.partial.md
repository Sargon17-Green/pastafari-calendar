# Update 8 — Stage 4A — partial execution report

## Revision

- repository: `Sargon17-Green/pastafari-calendar`
- branch: `main`
- commit: `4ddceddba65502a3064a2876b6b85745b8974c4b`
- package version: `1.3.0`
- local working tree: unavailable; the runtime could not resolve `github.com`
- production alignment: `81cc54b1…4ddcedd` adds only Stage 4B–4D verification scripts/artifacts; no production files changed.

## Prerequisite alignment

Stages 1, 2A and 2B are present. Stage 3 is absent from the current repository, so the Stage-3 harness/SHA alignment required by Stage 4A cannot be certified.

## Existing executed evidence that remains applicable to the production-identical tree

Four natural failure paths have measured `STATE:generated:shared-invocation-arena` delta `+12`:

1. `PastafariCalendar` invalid `todayProvider`
2. `IslamicDate` invalid variant
3. `MonthWeavingCounter` non-positive month length
4. `GregorianDate` non-integer month

Ten consecutive invalid `PastafariCalendar` constructions measured `+120` total. This supports “+12 per call” only over that measured 10-call sequence.

A successful `GregorianDate(2026, 8, 22)` immediately after those failures had zero additional arena delta and returned the expected fields, while the prior residue remained.

Committed success/reference evidence on the same production tree also records Foundation same/next/previous PASS and reference-oracle 19/19 PASS.

## Required Stage-4A work not executed

The current environment could neither clone/download the repository for local execution nor create a temporary GitHub branch (branch creation returned HTTP 403). Therefore the following acceptance requirements remain unexecuted: 100/1000 repeated failures, all natural failure paths, alternating success/failure, multi-A `A→FAIL→A`, failure-count thresholds before A, same-multiset/different-order permutations, fresh-process comparisons, 100/1000 memory measurements, exception stability over long runs, and post-failure success soak.

## Classification

- confirmed accumulation: **yes**, for the measured shared-arena paths above.
- history dependence: **count dependence confirmed over 10 measured failures**; order dependence unresolved.
- semantic corruption: **unresolved for Stage 4A**. Existing controls show no corruption in the limited sequences already executed, but the required 4A matrices were not run.
- zero-delta paths: **none confirmed among the four measured natural failures**; untested paths must not be classified stable.
- unresolved: Stage 3 alignment and all missing long/history/permutation probes.

## Scope

Production files changed: **none**.

`STAGE_4A_RESULT = INCOMPLETE_ENVIRONMENT_BLOCKED_EXISTING_ACCUMULATION_EVIDENCE_CONFIRMED`

`READY_FOR_STAGE_5_FROM_4A = no`
