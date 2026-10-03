# /about/ P0 early reconciliation — 2026-10-03

Status: **early reconciliation only; corpus not frozen; no public semantic edit applied**

## Working inputs

- Working corpus display: `Pastafarian_Canon_Draft_for_Editing.md`
- Corpus `source_revision`: `4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`
- Corpus state: derived editing view; explicitly says the whole corpus is not yet frozen.
- Hebrew /about/ live branch: `feature/about-i18n-72-locales`
- Live branch HEAD inspected: `e9251ca35b9ef029b46e6679c5966283a160db2d`
- Live Hebrew blob: `926bfe4b997772b695982af77f0862fbe8e192da`
- Previous checkpoint Hebrew blob: `954f82559e618a091bb338c65a61be9e50d48331`

The Hebrew blob drift was checked directly. The only change is a non-semantic wording cleanup in the Seer beta sentence:
`production קבוע` → `שירות קבוע בסביבת ייצור`.
Therefore the existing claim decomposition remains semantically usable.

Machine-readable disposition:
`artifacts/about-early-reconciliation-2026-10-03.json`.

## Result

P0 scope now contains 57 tracked items:
- 56 claims from the existing register;
- 1 newly discovered authority/terminology claim in the Seer section.

Disposition:
- **MATCH: 4**
- **CHANGE: 4**
- **BLOCKED: 42**
- **NOT-CANON: 7**

The large BLOCKED count is intentional, not a failure. Sections 1–20 of the corpus editing view preserve the prior algorithm but are explicitly marked **noncanonical as wording** while formal review remains open. Those claims may be highly compatible with the current /about/ text, but they must not be promoted to final MATCH before that formalization freezes.

## Explicit canonical findings already actionable

### A01 — final corpus replaces “Hebrew Scroll supreme authority”

Current public sentence:

> המגילה העברית היא הסמכות העליונה למשמעות השמות. תרגום או תעתיק הם שכבת תצוגה.

This conflicts with already adopted canonical rules:

- `rule.corpus.transition`: the final corpus is exhaustive as to canonical content; external documents/implementations/prior decisions are not parallel canonical sources.
- `rule.megillah.editions`: multiple Scroll editions may be canonical without hierarchy; no edition automatically overrides another.
- `rule.names.identity`: standard linguistic forms are those explicitly admitted by canon or by an admitted covering rule.

Disposition:
- `NAMES.HEBREW_SCROLL_SUPREME` → **CHANGE**
- `NAMES.TRANSLATION_PRESENTATION` → **CHANGE**

### Staged future wording

Do not apply publicly yet. Candidate bounded replacement:

> זהות השם היא זהות קאנונית־סמנטית, ולא תוצאה של הצבעה בין איותים, תרגומים או מימושים.
>
> הקורפוס הקאנוני קובע אילו ישויות וצורות לשוניות הן קאנוניות או תקניות. למהדורות הקאנוניות של המגילה אין ביניהן היררכיה.
>
> תרגום או תעתיק אינם משנים את זהות הישות; עם זאת, צורה לשונית יכולה להיות צורה תקנית אם היא אומצה במפורש בקורפוס או מכוסה בכלל קאנוני שאומץ בו.

This is a semantic correction, not a stylistic preference.

## A02 — Seer authority referent must move from Scroll/canonical implementation to corpus/canonical algorithm

Current public wording contains:

> לצד המימוש הקאנוני קיים מנוע מהיר בשם Pastafarian Calendar Seer.

and:

> המגילה קובעת את הכללים, והחישוב הקאנוני מפיק לפיהם את התאריך.

The adopted corpus rules say instead:

- `rule.corpus.transition`: the final corpus is the exhaustive canonical source.
- `rule.implementation.standardness`: standardness belongs to an implementation that performs the canonical algorithm with all canonical stages; output agreement alone is insufficient.
- the same rule explicitly says **Seer is not standard**.

Dispositions:
- `SEER.SCROLL_RULES_CANONICAL_CALC` → **CHANGE**
- new claim `SEER.CANONICAL_IMPLEMENTATION_SINGULAR` → **CHANGE**
- `SEER.NOT_AUTHORITY` → **MATCH**

### Staged future wording

Do not apply publicly yet. Candidate bounded replacement for the authority opening:

> לצד האלגוריתם הקאנוני קיים מנוע מהיר בשם **Pastafarian Calendar Seer**.
>
> ה־Seer אינו מקור הסמכות. הקורפוס הקאנוני הוא מקור הסמכות לתוכן המחייב. מימוש תקני מבצע את האלגוריתם הקאנוני על כל שלביו. Seer עצמו אינו מימוש תקני; אם הוא מחזיר תוצאה הסותרת את התוצאה שנדרשת מן הקורפוס, Seer טועה.

The later paragraph allowing Seer to use precomputation/SIMD/algebra/shortcuts can remain conceptually compatible precisely because the corpus explicitly classifies Seer as nonstandard. It must not be used to redefine what counts as a standard implementation.

## A03 — naming count and identity already match

- `NAMES.COUNTS` → **MATCH**
- `NAMES.SEMANTIC_IDENTITY` → **MATCH**

The corpus has 17 canonical cutlet entities and 47 canonical month entities/index space, and `rule.names.identity` explicitly separates semantic entity identity from technical identifiers and unadmitted spelling variants.

## A04 — modulus value matches

`SAUCE.Q` → **MATCH**

The canonical constant table gives:

`170141183460469231731687303715884105727 = 2^127 - 1`.

The broader sauce procedure remains BLOCKED from final closure because its formal wording is still under review.

## A05 — Seer is not canonical authority

`SEER.NOT_AUTHORITY` → **MATCH**

This now has stronger support than before:
- final corpus authority is explicit;
- implementations are not parallel canonical sources;
- Seer is explicitly nonstandard.

## Items intentionally not closed yet

### Algorithm semantics

Claims involving:
- P(c,t);
- exact five-field tuple;
- Year 5000 construction;
- year/gate semantics;
- cutlet/month construction;
- weaving;
- saved-sum final stirs;
- short/wide selection;

are mostly **BLOCKED**, even where the current formalization matches the public article, because sections 1–20 remain under formal review.

### Physical day boundary

The current draft retains lower meridian passage of Venus's center at the observer location, but it explicitly leaves:
- ephemeris;
- time scales;
- coordinate-to-event association;
- observer model;
- range;
- numerical error/equality handling

inside `GAP-ASTRO-MODEL`.

Therefore the public phrase “topocentric lower culmination” is **not yet safe to close as final canon**. Boundary claims remain BLOCKED.

### Weeks

No week system was located in the current corpus view. That is not yet enough to close a canonical **absence** claim because the whole corpus explicitly remains unfrozen. `WEEK.NO_CANONICAL_WEEK_SYSTEM` stays BLOCKED until freeze.

### Origin / creation / re-delivery

The current derived corpus view does not yet close the public site's creation and re-delivery narrative. Because corpus exhaustiveness applies to the final corpus, not an unfinished view, absence now is not evidence of canonical rejection.

The following remain BLOCKED:
- `ABOUT.TIME_CREATED_IN_CALENDAR`;
- `FOUNDATION.NOT_BEGINNING_OF_TIME`;
- `ORIGIN.CALENDAR_PART_OF_CREATION`;
- `ORIGIN.HUMANITY_UNAWARE_USE`;
- `ORIGIN.SCROLL_NOT_EXHAUSTIVE`;
- `REDELIVERY.FIXED_EVENT_DYNAMIC_PASTAFARIAN_DATE`.

## Register correction discovered during refresh

The old claim register said “Caesarea fallback”, but both the previous and current Hebrew article say **Kisurra / קיסורה**.

The register was corrected:
- old ID: `BOUNDARY.CAESAREA_FALLBACK`
- new ID: `BOUNDARY.KISURRA_FALLBACK`

This remains **NOT-CANON** product behavior and must be reverified against the live product independently.

## Next early-reconciliation pass

Without waiting for whole-corpus freeze, useful work can continue in this order:

1. P1 semantic/product boundary classification against the now-known corpus authority model;
2. P2 derived-result dependency check to determine exactly which theorems/empirical results would be invalidated by any algorithm delta;
3. FSM staged article: compare only explicitly adopted canonical theology/content, leaving absences BLOCKED;
4. prepare a bounded Hebrew patch containing only the four current P0 CHANGE findings, but do not apply it to the public source until the relevant corpus rules are frozen or the final corpus is returned.
