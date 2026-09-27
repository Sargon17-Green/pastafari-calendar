# Specification/conformance versus law — staged Hebrew wording candidates
Date: 2026-09-27
Status: non-public editorial staging; final terminology waits for canonical corpus

## Editorial goal

Explain a narrow distinction without turning the calendar explanation into a legal guide.

The final public text should make clear that a normative rule defines what counts as the same/conforming calendar implementation. It does not, merely by being normative, create a legal prohibition on building something different.

## Candidate A — compact public box

> **מה פירוש “אסור” במפרט?**  
> כאשר המפרט קובע שמימוש חייב לעשות דבר מסוים או שאסור לו לשנות כלל מסוים, הכוונה היא להתאמה ללוח: מימוש ששינה את הכלל אינו עוד מימוש תואם של אותו מפרט. זו אינה כשלעצמה קביעה משפטית שאסור ליצור לוח אחר, גרסה אחרת או מימוש שאינו טוען להתאמה. זכויות להעתיק, לשנות ולהפיץ קוד או טקסט נקבעות בנפרד לפי הרישיון והדין החלים על החומר.

### Strengths
- says exactly what the reader needs;
- separates conformance from law;
- avoids giving legal advice;
- compatible with a specification whose exact authority terminology may later change.

## Candidate B — more technical

> לשון מחייבת במפרט — כגון “חייב”, “אין לשנות” או “אסור” — מתארת תנאי התאמה. אם מימוש סוטה מן התנאי, התוצאה היא שמבחינת המפרט הוא אינו תואם עוד לאותו לוח; אין בכך, כשלעצמו, איסור משפטי על עצם יצירת הווריאנט. כללי repository, רישוי, זכויות יוצרים ודין הם שכבות נפרדות.

### Strengths
- precise conformance vocabulary;
- explicitly names repository governance as a third layer;
- useful near a technical authority section.

## Candidate C — deadpan project voice

> המפרט אינו משטרה. הוא יכול לקבוע מה צריך לעשות כדי לקבל את לוח השנה הפסטפרי, והוא יכול לקבוע ששינוי מסוים מפיק דבר אחר. הוא אינו עוצר אדם, תוכנה, סוכן או ישות תבונית אחרת מלבנות את הדבר האחר. השאלה אם מותר להעתיק או להפיץ חומר מסוים היא שאלה נפרדת של רישיון ודין.

### Strengths
- memorable;
- preserves the project's dry tone;
- avoids claiming that every conceivable entity is legally situated in the same jurisdiction.

### Risk
- “המפרט אינו משטרה” is a joke/punchline and may be too colloquial for the technical `/about/` page.

## Recommendation for later corpus pass

Use Candidate A as the starting point unless the corpus introduces more exact conformance terminology.

Possible final combination:
- Candidate A's first two sentences;
- Candidate B's short “repository/r licensing/law are separate layers” ending.

Do not include a blanket claim that every text/image/source in the ecosystem is legally modifiable merely because the main software repositories use MIT-style licenses.

## Relationship to existing Seer language

Seer's `NOTICE.md` already demonstrates the same four-layer model:
- legal MIT permission;
- liturgical non-authorization;
- technical implementation behavior;
- semantic non-authority.

The public calendar explanation can generalize that distinction without copying Seer's special anti-authorization joke.

## Corpus placeholders

Before publication replace these conceptual terms only if the corpus chooses different official terminology:
- “המפרט”;
- “מימוש תואם”;
- “אותו לוח”;
- “כלל”.

Do not change the underlying distinction unless the corpus actually supplies a contrary legal statement — and if it does, that legal statement requires separate source/legal review rather than automatic propagation.
