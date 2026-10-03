# /about/ canonical-authority bounded semantic delta — 2026-10-03

Status: approved for publication.

Semantic master:
`docs/about/content/he.html`

This is a **bounded delta**, not a retranslation. Preserve every good local formulation and every prior native-QA fix outside the exact meanings below.

Only these stable sections may change:
- `canonical-names`
- `printed-calendar`
- `seer`

## 1. canonical-names

The target locale must convey both propositions:

1. The **canonical corpus** determines which period-name entities and linguistic forms are canonical/standard. Canonical Scroll editions do **not** automatically form a hierarchy.
2. Translation/transliteration does not change entity identity. A linguistic form may itself be standard when it is explicitly admitted by the corpus or covered by an adopted canonical language rule.

Do not preserve wording that makes the Hebrew Scroll the supreme semantic authority.
Do not say that every translation/transliteration is merely noncanonical presentation.

Current Hebrew master:

> הקורפוס הקאנוני קובע אילו ישויות וצורות לשוניות הן קאנוניות או תקניות. למהדורות הקאנוניות של המגילה אין ביניהן היררכיה.
>
> תרגום או תעתיק אינם משנים את זהות הישות; עם זאת, צורה לשונית יכולה להיות צורה תקנית אם היא אומצה במפורש בקורפוס או מכוסה בכלל קאנוני שאומץ בו.

## 2. printed-calendar

The old unqualified claim “the specification is deterministic and complete” is no longer acceptable.

The target locale must convey:

- the calendar's **discrete algorithm** is deterministic and explicitly defined;
- conversion from a physical instant to a Pastafarian day currently uses an implementation astronomy model;
- the numerical astronomy profile itself is **not yet canonical**.

Do not imply that the discrete calendar algorithm is nondeterministic.
Do not invent a future document, version, deadline, or numerical astronomy rule.

Current Hebrew master:

> האלגוריתם הבדיד של הלוח דטרמיניסטי ומוגדר במפורש. ההמרה מרגע פיזיקלי ליום פסטפרי משתמשת כיום במודל אסטרונומי של המימוש; הפרופיל הנומרי האסטרונומי עצמו עדיין אינו קאנוני.

## 3. seer

The target locale must convey the following authority chain:

1. There is a canonical algorithm.
2. Seer is a fast engine, but **Seer is not a canonical authority**.
3. The **canonical corpus** is the authority for binding/canonical content.
4. A standard implementation performs the canonical algorithm through all canonical stages.
5. **Seer itself is not a standard implementation.**
6. If Seer returns a result that conflicts with the result required by the canonical corpus, Seer is wrong.

Do not say:
- “the current Scroll defines the calendar” as the top-level authority;
- “the Scroll and the canonical calculation” are parallel authorities;
- there is one privileged “canonical implementation”.

Current Hebrew master:

> לצד האלגוריתם הקאנוני קיים מנוע מהיר בשם Pastafarian Calendar Seer.
>
> ה־Seer אינו מקור הסמכות. הקורפוס הקאנוני הוא מקור הסמכות לתוכן המחייב.
>
> מימוש תקני מבצע את האלגוריתם הקאנוני על כל שלביו. Seer עצמו אינו מימוש תקני; אם הוא מחזיר תוצאה הסותרת את התוצאה שנדרשת מן הקורפוס, Seer טועה.

## Invariants

- Compare Hebrew directly to the target language; do not use English as a semantic pivot.
- Do not alter stable IDs, formulas, numbers, hashes, code literals or unrelated sections.
- Do not undo native-QA edits.
- Keep the target language natural rather than translating Hebrew syntax mechanically.
- If the target already conveys all required meanings, make no change.
