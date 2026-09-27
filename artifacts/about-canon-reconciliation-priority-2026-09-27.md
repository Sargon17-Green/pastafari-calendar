# /about/ canonical-corpus reconciliation priority plan
Date: 2026-09-27
Source Hebrew article blob: `954f82559e618a091bb338c65a61be9e50d48331`
Status: preparation only

The claim-level register is:
`artifacts/about-claim-register-2026-09-27.json`.

## Important live-branch observation

The source branch `feature/about-i18n-72-locales` has advanced **44 commits** since this work branch forked from `f52745a...`.

The observed 44-commit delta touches only native-QA infrastructure:
- `.github/workflows/about-native-qa-serial.yml`;
- checksum data;
- two native prompt files;
- native-QA control;
- a promotion script.

The Hebrew semantic master itself still has the **same blob SHA** as this work branch:
`954f82559e618a091bb338c65a61be9e50d48331`.

Therefore there is no semantic need to rebase this artifact-only work branch now. At corpus alignment time, live branches must still be rediscovered.

## P0 — reconcile first

These sections contain direct calendar rules, authority statements, anchors or project origin claims:

`about-calendar`,
`date-parts`,
`working-day`,
`year-5000`,
`years-and-gates`,
`cutlets`,
`months-and-weaving`,
`month-interleaving`,
`no-weeks`,
`canonical-names`,
`calculation`,
`short-and-wide-choice`,
`day-boundary`,
`seer`,
`foundation-and-tablets`,
`anchors`,
`site-story`.

Within P0, the most likely authority-transition edits are:
- `canonical-names`: current claim that the Hebrew Scroll is supreme naming authority;
- `seer`: current claim that the Scroll sets the rules / canonical calculation is the reference;
- `site-story`: origin and re-delivery provenance;
- `anchors`: fixed historical/computational anchor facts;
- `calculation`: normative Sauce details.

## P1 — reconcile semantic/product boundaries second

`day-identity`,
`next-day-in-month`,
`anniversaries`,
`appointments`,
`travel-and-all-day`,
`printed-calendar`.

These mix canonical consequences with product/editorial behavior. The corpus should decide the semantic premise; product guidance is then reviewed separately.

## P2 — revalidate derived/empirical results

`month-day-pairs`,
`structural-atlas`,
`reverse-conversion`.

Do not copy them into the corpus as rules. Recompute/reprove only if corpus changes their premises.

## P3 — preserve research classification and reprove only if invalidated

`far-time-structure`,
`sauce-history`.

These contain theorems and open questions. Canon alignment affects their premises, not their epistemic category.

## P4 — rewrite last

`summary`.

Never align the summary independently. Rebuild it from the already reconciled sections.

## Two staged omissions not yet inserted

The current public explanation still needs later consideration of:
1. specification/conformance wording versus legal prohibition;
2. dynamic Pastafarian display for the fixed modern re-delivery event.

Their final wording waits for the corpus and legal/licensing context. They should be treated as additions to the reconciled article, not as authority for the corpus.

## Alignment rule

A text difference is not automatically a semantic difference.

For every claim:
- identify corpus support;
- classify canon / theorem / empirical / product / editorial / quotation / joke;
- change only if meaning or provenance actually requires it;
- keep natural explanatory paraphrase and localization;
- record evidence using `canon-alignment-evidence.schema.json`.
