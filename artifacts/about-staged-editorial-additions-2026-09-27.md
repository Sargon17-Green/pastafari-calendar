# Staged editorial additions for /about/
Date: 2026-09-27
Status: non-public candidates; canonical corpus will be authoritative

These additions address previously approved editorial/product requirements that are not fully represented in the current Hebrew public explanation.

They are staged here rather than inserted into `docs/about/content/he.html`.

## A. Specification/conformance language versus legal prohibition

### Public-wording candidate

> כאשר המפרט אומר שמימוש **חייב** לעשות דבר מסוים, או ש**אסור** לו לעשות דבר אחר, אלה תנאים להתאמה למפרט. אפשר ליצור לוח אחר, גרסה שונה, ניסוי, fork או מימוש שאינו תואם; השינוי פשוט אינו יכול להיחשב באותו מקום למימוש תואם של הכלל ששונה.
>
> זה אינו, כשלעצמו, איסור משפטי. שאלות של חוק, רישיון, זכויות יוצרים, סימני מסחר או התחייבות חוזית הן שאלות נפרדות ונקבעות לפי הדין והמסמכים המשפטיים החלים, לא לפי עצם השימוש במילה "אסור" בתוך מפרט הלוח.

### Why this wording is staged rather than published now

It preserves the previously approved distinction among:
1. **calendar/specification conformance** — what a conforming implementation must do;
2. **project/repository governance** — what contributors/branches are allowed to change in a particular project workflow;
3. **law/licensing/IP/contracts** — externally enforceable legal questions.

It deliberately does **not** claim that every modification is legally unrestricted; that would depend on the applicable license/law.

### Extended internal interpretation

The conformance distinction is actor-neutral.

A human, program, AI system, autonomous agent, organization or hypothetical nonhuman intelligence can define a different calendar or nonconforming implementation. The semantic consequence is the same: once a normative rule is changed, the changed behavior is not conforming to that rule merely because the implementation still uses the same project name or vocabulary.

This extended version is probably too long for the public page; it is retained to prevent later narrowing of the intended principle.

## B. Dynamic representation of the modern re-delivery event

### Previously approved event semantics

- chronological event: modern re-delivery on **2026-08-05**;
- this is **not** the creation date of the calendar;
- the event is fixed on the chronological axis;
- its Pastafarian representation depends on the relevant working day;
- the public calendar display should not substitute the Gregorian date for a Pastafarian date.

### Proposed component contract

Conceptual inputs:

```text
workingDay = c
redeliveryTargetDay = fixed chronological identity of 2026-08-05
observer/location = only if required by the product's rule for resolving the active local working day
```

Computation:

```text
redeliveryPastafarianDate = F(c, redeliveryTargetDay)
```

Public output:
- the normal five-field Pastafarian date;
- optional explanatory text such as “תאריך המסירה־מחדש לפי יום המעשה הנוכחי”;
- no hard-coded five-field value;
- no implication that changing the displayed date changes the historical event.

### Failure/fallback rule

If the application cannot resolve the required working day or compute the representation:
- do not display a guessed/stale Pastafarian date as current;
- preserve the prose statement that the event is fixed while its Pastafarian representation is contextual;
- show an ordinary unavailable/error state consistent with the rest of the product.

### Corpus gate

Before implementation/publication:
1. confirm the event identity/date in the corpus;
2. confirm the F(c,t) representation rule;
3. confirm whether the active working day needs the location-dependent Venus boundary at display time;
4. then implement using the real calendar engine, not a copied example.

## C. Origin/design explanation — reserved insertion point

A previously approved requirement says the origin/creator material should explain **how the concrete details of the calendar were determined**.

No prose is drafted here because this is precisely the kind of project-world history that the new canonical corpus should settle.

Preferred editorial split if the corpus supports it:
- detailed origin/design account in the separate FSM/origin article;
- short factual cross-reference in technical `/about/`;
- no duplication of the full algorithm or theology in both pages.

## Publication gate

None of A/B/C is automatically publishable merely because it appears in this staging file.

Publication requires:
- corpus reconciliation;
- Hebrew editorial review;
- propagation to affected locales/products only after Hebrew semantics are fixed;
- legal/licensing review only for the narrow legal statements if repository licensing context changes.
