# Canon publication / reconciliation checkpoint — 2026-10-03

## Pinned corpus state

Working corpus: `Pastafarian_Canon_Draft_for_Editing.md`

`source_revision = 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`

Rechecked during this pass: unchanged. The whole corpus remains explicitly nonfrozen. Explicitly adopted rules and language forms may be propagated; unfinished algorithm wording, canonical-absence claims, origin/theology questions and the numerical astronomy profile remain blocked from final closure.

## Completed publication/alignment work

### Hebrew /about/

Published on `pastafari-calendar/main`:
- corpus authority replaces Hebrew-Scroll supremacy;
- translation/transliteration wording now permits corpus-admitted standard linguistic forms;
- Seer is not presented as a singular canonical implementation;
- Seer authority is subordinate to the canonical corpus/algorithm;
- the unqualified “specification is complete” claim was replaced with the bounded statement that the discrete algorithm is deterministic/explicit while the numerical astronomy profile is not yet canonical.

The same semantic master is present on `feature/about-i18n-72-locales`.

### 71 non-Hebrew /about/ locales

A bounded delta was created for exactly:
- `canonical-names`
- `printed-calendar`
- `seer`

The rollout preserves stable IDs, existing native-language fixes and unrelated sections. The original run aligned 9 locales and stopped at Danish because its target sections are minified to one physical line including the stable-ID wrapper.

The applier was then hardened to permit a whole minified section line only when the identical stable ID is preserved in the replacement; the global 29-ID contract is still asserted after every application. Synthetic Danish minified-section verification PASS; full `about-page` tests PASS.

At checkpoint creation: **14/71 non-Hebrew locales are recorded `final_verified_aligned:true`**. The resumed run starts at `da` and excludes the first nine already completed locales.

### Independent implementation language forms

Canonical registry:
- 60 normative languages
- 3,840 adopted labels
- cutlet canonical index 8 was the only owner-change family in this propagation batch.

Propagation result:
- 59 target witnesses checked/applied;
- post-apply replay: **59/59 PASS**;
- each authoritative source contains the adopted form;
- every `CANONICAL_NAMES_LOCK.sha256` entry was recomputed and verified.

`JavaScript+Interlingue` additionally received:
- adopted `cyperus` key and admitted locale values;
- Megillah source-URL/provenance terminology;
- `Karshumav` README correction;
- targeted `browser-i18n-locales.js` and `browser-reverse-vendor.js` local tests PASS.

The separate `fix/megillah-live-source-audit` branch was aligned too, so it cannot later reintroduce the stale source key.

### Maltese default-branch witness

PR #16 in `Sargon17-Green/Pastafarian-Calendar`:
- candidate commit `2034c192f472ea00c85eeeec88d908b1691dd134`;
- Canonical Names Lock PASS;
- approval present;
- candidate included in the 59/59 replay.

It **cannot merge** while repository ruleset 24045727 (`Freeze main ? no updates or merges`) is active. The ruleset targets `refs/heads/main`, forbids updates/deletion, has no bypass actors, and reports `current_user_can_bypass: never`.

### Seer

Authority PR #43 merged.

English/Hebrew language-form PR #44 merged as:
`7f1b3098332d891a9ea6cf8e31383d4fd39141cf`

Verification before merge:
- exact canonical-array hash comparison: en cutlet PASS, en month PASS, he cutlet PASS, he month PASS;
- local full query suite: 102 total / 95 PASS / 7 SKIP / 0 FAIL;
- all GitHub CI workflows PASS;
- post-merge `main` contains `flatsedge` and `גומא`, with no stale `Papyrus Sedge` / `english-retained` in the checked live surfaces.

### App

Authority PR #46 remains open.

Its diff changes only:
- `shared/temporal/.../ReferenceLocation.kt`
- `shared/temporal/.../VenusLowerTransitBoundaryModel.kt`

Required CI fails in unrelated baseline files/surfaces:
- SQLDelight `Bootstrap.sq`;
- `CalendarStructuralViewport.kt`;
- `MeetingInvitationWorkflow.kt`;
- `RecurrenceIterator.kt`;
- dependency-fitness findings in other files.

Do not expand this canon-alignment workstream into unrelated App repair merely to force PR #46 green.

### Independent authority terminology review

Manual-review count is now zero.

- `Fortran+English`: live README now says adopted English display names, explicitly marks its test reference oracle as non-authoritative, and states that the numerical astronomy profile is not yet canonical.
- `x86-64-Assembly+ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ`: authoritative/normative/oracle wording belongs to the preserved chronological Stage repair log, not to a live parallel-authority claim; no retroactive rewrite is warranted.

## Remaining blockers, not unfinished ordinary work

1. Whole-corpus freeze / new canonical decisions:
   still required before closing the 48 early-reconciliation BLOCKED /about/ claims involving unfinished algorithm wording, canonical absence, origin/history/theology and the astronomy numerical profile.

2. Gospel primary-text gap:
   exact page-level source remains behind an access-restricted holding; do not bypass access controls. Reopen only if a lawful accessible primary source appears or exact wording becomes necessary.

3. 71-locale bounded delta:
   external GitHub Actions/Copilot rollout is still executing. If another locale fails a guard, inspect and fix that concrete failure; do not restart completed locales.

4. App PR #46:
   blocked by unrelated baseline CI failures.

5. Pastafarian-Calendar PR #16:
   blocked by the explicit no-main-updates repository freeze ruleset.

No further source hunting, broad prose pass, translation restart, or mass implementation rewrite is justified without one of those blockers changing.
