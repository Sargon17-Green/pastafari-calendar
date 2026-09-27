# Specification/conformance language versus legal prohibition — wording audit
Date: 2026-09-27
Status: editorial staging; no public text changed by this file

## Purpose

Preserve the already-approved distinction between:

1. **calendar/specification normativity** — what an implementation/date/construction must do to count as conforming to the calendar;
2. **project/repository governance** — what contributors/branches/files are allowed to do inside this project;
3. **law** — criminal/civil/regulatory/legal prohibition or permission;
4. **historical/source quotation** — exact wording in the Megillah/Scroll or another source, which may itself use words such as “אסור”.

These are not interchangeable.

A specification can say “must not” without thereby making conduct unlawful.
A repository can prohibit a merge without making that merge illegal.
A source quotation should not be silently rewritten merely because modern prose could use a less ambiguous word.

## Finding L01 — Hebrew `/about/` uses “חוקית” for admissible options

Current Hebrew staging master contains:

> לכן אין להסיק שכל אפשרות **חוקית** מקבלת בהכרח אותה הסתברות חיובית.

and:

> במרחבים גדולים דיים ייתכנו גם אפשרויות **חוקיות** שאינן נגישות כלל...

The intended meaning is plainly:
- structurally admissible / satisfies the option-space constraints;
- **not** “lawful under Israeli or any other law”.

### Recommended later wording

Prefer one of:
- `אפשרות קבילה`;
- `אפשרות מותרת לפי כללי הבחירה`;
- `אפשרות שעומדת באילוצים`.

For this technical paragraph, `אפשרות קבילה` is the cleanest.

No change is applied now because Hebrew `/about/` is awaiting the bounded corpus-alignment pass.

## Finding L02 — English `/about/` has the same ambiguity

Current English article says:

> every **legal option**

and:

> **legal options** can even exist...

Recommended later wording:
- `admissible option`;
- or `valid option under the constraints`.

Prefer `admissible` here. It is standard mathematical/technical language and does not sound like a legal opinion.

## Finding L03 — live cooking Hebrew says “מספר ימים חוקי”

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Branch inspected:
`fix/megillah-live-source-audit`

Current Hebrew live-stage explanation:

> נקבעים מספר החודשים ואורכי החודשים כך שסכומם הוא בדיוק אורך השנה ובכל חודש **מספר ימים חוקי**.

Again, the meaning is constraint satisfaction, not law.

Recommended later wording:

> ...ובכל חודש **מספר ימים בתחום המותר**.

or:

> ...וכל חודש נשאר **בתחום האורך המותר**.

The second is technically clearer because the constraint is on month length.

## Finding L04 — English and Interlingue live-stage explanations also use “legal”

Current English:

> every month has a **legal size**.

Recommended:
> every month has an **allowed length**.

Current Interlingue:

> chascun mensu resta **legal**.

This should receive a natural Interlingue equivalent for “within the permitted/valid range”, rather than a word likely to suggest civil/criminal legality.

Other currently inspected live-stage locales already use terms closer to “permitted/valid/admissible”:
- Arabic: `ضمن الحدود المسموح بها`;
- Russian: `допустимую длину`;
- French: `taille valide`;
- German: `zulässige Länge`;
- Spanish/Italian: “valid” length;
- Czech: “permitted” length.

Thus this is not a conceptual problem across all locales; it is a wording problem in specific locales.

## Finding L05 — the Megillah quotation “החלפת שני הימים אסורה” must NOT be rewritten

The current audited live-stage quote for `inputs` is:

> כל צמד ימים הניתן ללוח, הראשון הוא יום המעשה והשני הוא היום הנשאל. **החלפת שני הימים אסורה.**

This is an exact source quotation in the current live-stage audit branch.

### Rule

Do not replace `אסורה` inside the quotation with “אינה תקינה”, “אינה קבילה” or similar merely to avoid legal ambiguity.

Instead:
- preserve the quotation exactly;
- if clarification is needed, put it in surrounding explanatory prose or documentation;
- explain that source/specification normativity concerns conformance, not statutory prohibition.

The quote itself is evidence/source text, not a legal notice.

## Finding L06 — “אסור לשנות” needs a domain label whenever prose could be read legally

Future public explanatory prose should distinguish phrases such as:

- `אסור לפי המפרט`;
- `מימוש תואם אינו רשאי...`;
- `שינוי כזה יוצר וריאנט שאינו תואם לקאנון`;

from actual legal phrases such as:

- `הדין אוסר...`;
- `הדבר אסור על פי חוק...`;
- `קיימת מגבלה ברישיון...`.

Do not use “אסור” naked in a technical explanation when a reasonable reader could understand it as a legal claim, unless:
- it is an exact quotation;
- or the domain has just been made unmistakable.

## Finding L07 — project governance is a third category

Examples:
- a branch must not be merged to `main`;
- `HANDOFF_*` files must not be committed;
- a historical source file is treated as immutable in project workflow.

These are project-management rules.

They are neither:
- calendar canon;
- nor statutory/legal prohibitions.

The future canon-alignment tooling should therefore classify them separately rather than treating every “must not” as a semantic conflict.

## Proposed terminology taxonomy

| Class | Meaning | Example |
|---|---|---|
| `CANON_CONFORMANCE` | condition for being the same/conforming Pastafarian Calendar | a conforming implementation must preserve the specified field order |
| `PROJECT_GOVERNANCE` | workflow/repository/project rule | do not merge this branch into main |
| `LEGAL_RULE` | actual law/licence/legal obligation | a licence imposes a redistribution condition |
| `HISTORICAL_QUOTE` | exact source wording; may use normative verbs | “החלפת שני הימים אסורה” |
| `EDITORIAL_GUIDANCE` | writing/style rule | prefer “admissible” over “legal” in mathematical prose |

## Later bounded delta

When the corpus is pinned, include this wording cleanup in the same bounded public-content pass:

- Hebrew `/about/`: `חוקית/חוקיות` → technical admissibility wording where appropriate;
- English `/about/`: `legal option` → `admissible option`;
- live cooking Hebrew: `מספר ימים חוקי` → permitted-range wording;
- live cooking English: `legal size` → `allowed length`;
- live cooking Interlingue: replace legal-sounding wording naturally;
- preserve exact Megillah quotations unchanged.

These edits are semantic-preserving clarifications, not changes to the calendar.
