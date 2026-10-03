# Staged Hebrew /about/ delta from early corpus reconciliation — 2026-10-03

Status: **STAGED ONLY — DO NOT APPLY TO PUBLIC SOURCE YET**

Source guard:
- branch: `feature/about-i18n-72-locales`
- HEAD inspected: `e9251ca35b9ef029b46e6679c5966283a160db2d`
- Hebrew blob: `926bfe4b997772b695982af77f0862fbe8e192da`

Corpus guard:
- display: `Pastafarian_Canon_Draft_for_Editing.md`
- `source_revision: 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`
- whole corpus: not frozen

This file contains only deltas already justified by **explicitly adopted canonical rules** or by an explicit incompleteness finding. It deliberately excludes the 48 early-reconciliation items whose final status is still blocked.

## Delta H01 — names authority and translation status

Claims:
- `NAMES.HEBREW_SCROLL_SUPREME` — CHANGE
- `NAMES.TRANSLATION_PRESENTATION` — CHANGE

Current:

```html
<p>זהות השם היא זהות קאנונית־סמנטית, ולא תוצאה של הצבעה בין איותים, תרגומים או מימושים.</p>
<p>המגילה העברית היא הסמכות העליונה למשמעות השמות. תרגום או תעתיק הם שכבת תצוגה.</p>
```

Staged replacement:

```html
<p>זהות השם היא זהות קאנונית־סמנטית, ולא תוצאה של הצבעה בין איותים, תרגומים או מימושים.</p>
<p>הקורפוס הקאנוני קובע אילו ישויות וצורות לשוניות הן קאנוניות או תקניות. למהדורות הקאנוניות של המגילה אין ביניהן היררכיה.</p>
<p>תרגום או תעתיק אינם משנים את זהות הישות; עם זאת, צורה לשונית יכולה להיות צורה תקנית אם היא אומצה במפורש בקורפוס או מכוסה בכלל קאנוני שאומץ בו.</p>
```

Basis:
- `rule.corpus.transition`
- `rule.megillah.editions`
- `rule.names.identity`
- `rule.locale.rendering`

## Delta H02 — Seer authority and “canonical implementation” terminology

Claims:
- `SEER.CANONICAL_IMPLEMENTATION_SINGULAR` — CHANGE
- `SEER.SCROLL_RULES_CANONICAL_CALC` — CHANGE
- `SEER.NOT_AUTHORITY` — MATCH, preserved

Current opening:

```html
<p>לצד המימוש הקאנוני קיים מנוע מהיר בשם <strong>Pastafarian Calendar Seer</strong>.</p>
<p>ה־Seer אינו מקור הסמכות.</p>
<p>המגילה קובעת את הכללים, והחישוב הקאנוני מפיק לפיהם את התאריך. אם Seer חולק על החישוב הקאנוני התקין, Seer טועה.</p>
```

Staged replacement:

```html
<p>לצד האלגוריתם הקאנוני קיים מנוע מהיר בשם <strong>Pastafarian Calendar Seer</strong>.</p>
<p>ה־Seer אינו מקור הסמכות. הקורפוס הקאנוני הוא מקור הסמכות לתוכן המחייב.</p>
<p>מימוש תקני מבצע את האלגוריתם הקאנוני על כל שלביו. Seer עצמו אינו מימוש תקני; אם הוא מחזיר תוצאה הסותרת את התוצאה שנדרשת מן הקורפוס, Seer טועה.</p>
```

Basis:
- `rule.corpus.transition`
- `rule.implementation.standardness`
- `rule.megillah.editions`

Important: the later paragraph saying Seer may use precomputation/SIMD/algebra/shortcuts is not automatically contradictory. The corpus explicitly classifies Seer as nonstandard. Do not rewrite that paragraph into a statement that shortcuts are allowed for a **standard** implementation.

## Delta H03 — unqualified completeness claim

Claim:
- `HAND_CALC.FULL_DETERMINISTIC` — CHANGE

Current:

```html
<p>אפשר גם לחשב הכול ביד.</p>
<p>המפרט דטרמיניסטי ומלא.</p>
```

Staged replacement:

```html
<p>את החישוב הבדיד של הלוח אפשר לבצע גם ביד.</p>
<p>האלגוריתם הבדיד דטרמיניסטי ומוגדר במפורש. המודל הנומרי המלא להשלכת גבול היום הפיזיקלי עדיין כפוף להשלמת מודל האסטרונומיה הקאנוני.</p>
```

Basis:
- `rule.day.physical-boundary`
- explicit `GAP-ASTRO-MODEL`
- draft header stating whole-corpus freeze is still pending

This is the only staged delta here whose final prose will likely need another editorial pass after the astronomy gap closes. The semantic correction — do not call the entire current specification complete — is already justified.

## Apply gate

Do not apply H01–H03 to `docs/about/content/he.html` until one of these is true:

1. the relevant adopted rules are returned as part of a frozen whole-corpus snapshot; or
2. the corpus workstream explicitly authorizes downstream application of already-adopted rules before whole-corpus freeze.

When applied:
- require the exact source blob guard above or re-diff against the newer live Hebrew blob;
- update the claim register and reconciliation evidence;
- generate a bounded semantic delta for the other 71 locales rather than restarting translation;
- preserve existing native-language fixes;
- run only invalidated semantic/native/render/a11y gates plus global checks.
