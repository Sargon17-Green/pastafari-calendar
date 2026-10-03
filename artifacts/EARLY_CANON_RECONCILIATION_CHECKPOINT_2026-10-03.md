# Early canon reconciliation checkpoint — 2026-10-03

## State

Work branch:
`work/about-canon-transition-2026-09-27`

This checkpoint supersedes the previous **quiescent pre-canon** continuation state for operational purposes. It does not supersede historical artifacts.

## Working corpus input

A usable but nonfinal corpus view is now available:

- display: `Pastafarian_Canon_Draft_for_Editing.md`
- `source_revision: 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`
- state: **Derived editing view; whole corpus explicitly not frozen**
- sections 1–20: prior algorithm retained, formal wording still under review and marked noncanonical as wording
- explicitly adopted canonical rules already usable for early reconciliation include:
  - `rule.names.identity`
  - `rule.locale.rendering`
  - `rule.corpus.transition`
  - `rule.megillah.editions`
  - `rule.implementation.standardness`
  - `rule.vectors.adoption`
  - canonical values in `rule.algorithm.constants`

Rule for this checkpoint:

> Explicitly adopted canonical material may already close a MATCH or CHANGE.  
> Unfrozen algorithm/astronomy/origin wording and canonical-absence claims remain BLOCKED until the relevant content freezes.

## Live Hebrew /about/ source refreshed

Branch:
`feature/about-i18n-72-locales`

HEAD inspected:
`e9251ca35b9ef029b46e6679c5966283a160db2d`

Hebrew article:
`docs/about/content/he.html`

Live blob:
`926bfe4b997772b695982af77f0862fbe8e192da`

Previous checkpoint blob:
`954f82559e618a091bb338c65a61be9e50d48331`

Direct blob comparison found exactly one change:
- `production קבוע`
- → `שירות קבוע בסביבת ייצור`

This is non-semantic for the claim model. The claim register remains usable and was refreshed to the live HEAD/blob.

One register error was corrected:
- stale `BOUNDARY.CAESAREA_FALLBACK`
- → `BOUNDARY.KISURRA_FALLBACK`

The live article said Kisurra in both old and new blobs.

## Full early disposition of /about/

Tracked:
- 84 original claims;
- 1 newly discovered Seer authority/terminology claim;
- **85 total**.

Aggregate early disposition:

| Status | Count |
|---|---:|
| MATCH | 6 |
| CHANGE | 5 |
| BLOCKED | 48 |
| NOT-CANON | 26 |
| **Total** | **85** |

Artifacts:

- P0 machine ledger: `about-early-reconciliation-2026-10-03.json`
- P0 narrative: `about-p0-early-reconciliation-2026-10-03.md`
- P1 ledger: `about-p1-early-reconciliation-2026-10-03.json`
- P2 dependency ledger: `about-p2-dependency-reconciliation-2026-10-03.json`
- P3/P4 ledger: `about-p3-p4-research-summary-reconciliation-2026-10-03.json`
- staged Hebrew delta: `about-hebrew-staged-delta-from-corpus-2026-10-03.md`

## Five currently actionable CHANGE findings

### 1. `NAMES.HEBREW_SCROLL_SUPREME`

Current public claim makes the Hebrew Scroll the supreme authority for name meaning.

Canonical conflict:
- final corpus is exhaustive;
- multiple admitted Scroll editions may be canonical without hierarchy.

Action:
- staged replacement points authority to the canonical corpus.

### 2. `NAMES.TRANSLATION_PRESENTATION`

Current public claim says translation/transliteration is merely presentation.

Canonical correction:
- entity identity is semantic;
- a linguistic form can itself be canonically standard if explicitly admitted or covered by an admitted rule.

Action:
- staged wording preserves identity/presentation separation without denying canonical status to admitted linguistic forms.

### 3. `SEER.SCROLL_RULES_CANONICAL_CALC`

Current public authority referent points to the Scroll and a “canonical calculation”.

Canonical correction:
- final corpus is authority;
- standard implementations are defined by performing the canonical algorithm.

### 4. `SEER.CANONICAL_IMPLEMENTATION_SINGULAR`

Newly registered finding.

Current public opening says:
`לצד המימוש הקאנוני...`

This implies one privileged implementation has canonical status.

Canonical correction:
- canon specifies the algorithm and standardness criteria, not one uniquely canonical implementation.

### 5. `HAND_CALC.FULL_DETERMINISTIC`

Current public sentence:
`המפרט דטרמיניסטי ומלא.`

Problem:
- discrete algorithm determinism can be retained;
- current corpus explicitly contains `GAP-ASTRO-MODEL` and says the complete numerical physical-time projection is not yet defined.

Action:
- staged wording narrows the completeness/determinism statement to the discrete algorithm and acknowledges the astronomy gap.

## Important BLOCKED families

### Algorithm
P(c,t), five fields, Year 5000, years/gates, cutlets/months, weaving, saved-sum, selection and related derived claims mostly match the inherited formalization but remain blocked from **final** MATCH while sections 1–20 are under formal review.

### Astronomy
The draft still uses lower meridian passage of Venus's center at observer location, but leaves observer model, ephemeris, time scales, coordinate/event association, range and numerical equality/error unresolved in `GAP-ASTRO-MODEL`.

Do not close the public word **topocentric** as final canon yet.

### Canonical absence
The current corpus view contains no canonical week system, but because the whole corpus is not frozen, absence cannot yet close `WEEK.NO_CANONICAL_WEEK_SYSTEM`.

### Origin / creation / re-delivery
The working view does not yet close the site's creation/history/re-delivery narrative. Silence in a nonfrozen corpus is not rejection.

Keep origin claims BLOCKED until frozen origin/theology content exists.

## Derived and empirical results

P2 arithmetic checks completed:

- `47 × 123 = 5781` — PASS
- `5781 − 5778 = 3` — PASS

These remain derived, not canon.

Structural Atlas statistics remain dated empirical evidence.

Reverse-conversion theorems remain blocked for reproof against frozen structure semantics.

P3 sauce-history/asymptotic material remains research:
- do not promote it to canon;
- reprove only if final algorithm premises change;
- open questions remain open unless research independently closes them.

## Public edit state

**No public semantic edit has been applied.**

The bounded candidate Hebrew patch is staged only in:
`artifacts/about-hebrew-staged-delta-from-corpus-2026-10-03.md`

Apply gate:
- frozen relevant rules, or
- explicit authorization from the corpus workstream to propagate already-adopted canonical rules before whole-corpus freeze.

When applying:
- source-blob guard or fresh re-diff;
- Hebrew first;
- bounded delta to 71 other locales;
- preserve native-language fixes;
- do not restart translation;
- run only invalidated QA plus global gates.

## Next useful work

The /about/ **classification pass is now complete at early-reconciliation level**.

Before whole-corpus freeze, useful next targets are:

1. FSM staged article — compare only against explicitly adopted canonical theology/content; absence remains BLOCKED.
2. Cross-surface authority terminology:
   - Seer docs;
   - App docs/strings;
   - live cooking/Megillah explanatory prose;
   - independent implementations where they make authority claims.
3. Prepare dependency lists showing which downstream tests/translations will be invalidated by each of the five staged Hebrew changes.
4. Recheck the working corpus revision before every new batch; if `source_revision` changes, diff corpus assertions before carrying dispositions forward.

Do not merge/publish this preparation branch solely because the early classification is complete.
