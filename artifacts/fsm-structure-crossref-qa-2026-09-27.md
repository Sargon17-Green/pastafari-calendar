# FSM consolidated candidate — structure and cross-reference QA
Date: 2026-09-27
Target: `artifacts/fsm-about-consolidated-candidate-2026-09-27.md`
Status: non-canon structural QA

## Result

`PASS_FOR_STAGING`

No broken explicit internal cross-reference was found.

One real outline defect was found and fixed in the staging candidate:
- the penguin appendix was an H2;
- all 13 appendix subsections were also H2;
- they are now H3 under the appendix H2.

The recovered historical composite is unchanged.

## Current outline

Top level:
- one H1 article title.

Main article:
- 25 H2 thematic sections before the appendix.

Appendix:
- one H2 appendix heading;
- 13 H3 subsections:
  - מבנה הגוף
  - תקשורת
  - קריאה, כתיבה וחישוב
  - בקרת איכות
  - בטיחות
  - אקלים
  - חומרי גלם
  - לוגיסטיקה
  - משאבי אנוש
  - אחריות משפטית
  - שאלת הניסיון
  - יתרונות אפשריים
  - מסקנה

This is now a valid and legible Markdown heading hierarchy.

## Cross-reference review

### “לאור כל האמור לעיל”
Occurs at the appendix opening.

**Status: valid.**

The appendix is intentionally a practical consequence/joke after the complete main article, so the broad backward reference is clear.

### “העבודות שתוארו לעיל”
Occurs in the appendix's HR section.

**Status: valid.**

It points to the preceding industrial tasks in the same appendix: tool use, technical documentation, quality control, safety, procurement/logistics and related work.

### Temporal words such as “בהמשך”, “לאחר מכן”, “בשלב מאוחר יותר”
**Status: no broken reference found.**

They occur inside continuous creation/history sequences and do not depend on a missing numbered section.

## Section-order review

### Opening → gender → appearance
**Coherent.**

The article starts with entity identity, then language/gender, then physical form.

### Appearance → creation → world mechanics → gravity → apparent age
**Coherent.**

The gravity discussion is introduced at the end of `העולם שנוצר` and expanded immediately in `כיצד פועלת הכבידה בפועל`.

There is no orphaned gravity section.

### Carbohydrates → Anti-Past/Hell → meal test
**Coherent.**

The meal-test section follows naturally from the carbohydrate/Anti-Past cluster.

### Signs → answered prayers → pirates
**Coherent as epistemology-through-examples.**

These sections progressively demonstrate one-sided evidence and correlation/causation.

### Humans → work/forgetting/repairs → flood
**Coherent.**

The flood operates as a concrete example of the “repair rather than redesign” motif.

### Experimental results → coincidences → intervention → prayer
**Coherent but intentionally conceptually dense.**

The sections have distinct functions:
- results: unfalsifiability/ad hoc rescue;
- coincidences: selection bias;
- intervention: ontology of direct action;
- prayer: theological/practical application.

No merge is required now.

### Worship → “I'd Really Rather You Didn't” → belief/doubt → evidence against → tradition
**Coherent.**

The article moves from practice/moral material into belief and provenance.

### “כך הדבר עובד”
**Correctly positioned as final main-article synthesis.**

Do not rewrite it until canon-dependent sections are reconciled.

## Known structural incompleteness that is intentional

The consolidated candidate still omits several later approved 2026-09-17 additions:
- concrete Odin/Thor/Loki ontology;
- limited-god / problem-of-evil framing;
- mechanism-versus-agent distinction;
- epistemic activism / wishful-thinking material;
- contradiction-as-credibility move;
- preferred-conclusion-as-evidence move.

These are not “forgotten” anymore. They are preserved separately and have a proposed insertion map in:
`fsm-postdraft-insertion-plan-2026-09-27.md`.

Therefore the current article should **not** be relabeled “complete latest draft” before corpus reconciliation.

## Duplicate-text check

No exact prose paragraph longer than 30 characters is duplicated in the current staging candidate after the earlier penguin duplicate cleanup.

## Heading stability rule

The FSM article has no published/deep-link contract yet comparable to the 29 stable IDs of technical `/about/`.

Therefore heading-level cleanup is safe in staging.

Once a public route is created:
- assign stable section IDs before translation;
- preserve IDs across wording changes;
- do not derive IDs mechanically from translated headings.

## Disposition

The current structure is suitable as a staging baseline.

No further structural reordering is justified before the corpus pass because the largest remaining ordering question is exactly where the later approved ontology/epistemology material belongs, and that depends on which of it survives canon reconciliation.
