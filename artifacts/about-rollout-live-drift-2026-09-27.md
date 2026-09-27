# /about/ rollout live-drift checkpoint — 2026-09-27
Status: observation only; no changes made to the rollout branch

## Source rollout branch

Repository:
`Sargon17-Green/pastafari-calendar`

Branch:
`feature/about-i18n-72-locales`

This canon-transition work branch was originally forked from:
`f52745a6628618f7c3488ff4a8e6ab677f5e591a`

Since then the live rollout branch has advanced by **44 commits**.

The compare from that base to the current rollout branch shows only six changed files:

- `.github/workflows/about-native-qa-serial.yml`
- `SHA256SUMS.txt`
- `artifacts/about-i18n-native-prompts/en.md`
- `artifacts/about-i18n-native-prompts/is.md`
- `artifacts/about-i18n-native-qa-control.json`
- `scripts/promote-about-native-qa.mjs`

No `docs/about/content/*.html` article and no ordinary locale content file changed in that 44-commit drift.

## Meaning

The semantic/article snapshot on which the canon-transition inventories were built has **not** been invalidated by this drift.

The live changes are QA infrastructure / prompt / promotion-control work.

Therefore:
- no rebase/merge into the canon-transition branch is useful now;
- doing so would only mix two active workstreams;
- future corpus reconciliation should begin from the then-live rollout branch, not from this staging branch.

## Native QA live control at inspection

Current:
- locale: `is`
- locale tag: `is-IS`
- serial sequence: `13`
- prompt: `artifacts/about-i18n-native-prompts/is.md`

The promotion script now rejects stale PASS evidence if any guarded source surface changed after the reviewed commit.

Guarded source surfaces include:
- locale JS;
- locale `/about/` HTML;
- common site/app/about runtime files.

This is useful for the future corpus-delta pass: a canon-driven content change will correctly invalidate affected linguistic review evidence rather than silently reusing stale PASS status.

## Branch relationship warning

Current compare:
- `feature/about-i18n-72-locales` vs `work/about-canon-transition-2026-09-27`
- status: diverged;
- transition branch: many preparation commits ahead;
- transition branch: 44 rollout-QA commits behind.

This is expected.

Do **not** merge these branches merely to remove the word “diverged”.

At corpus time:
1. take a fresh branch from the live rollout state;
2. pin corpus snapshot;
3. apply the bounded canon delta;
4. carry forward only the relevant transition artifacts/process rules;
5. rerun invalidated QA.
