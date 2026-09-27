# Current authority wording register for future corpus migration
Date: 2026-09-27
Status: exact-current-wording inventory; not a change request by itself

## Purpose

Pin the most important authority sentences that will become stale or ambiguous when the new canonical corpus becomes the top authority.

This lets the later migration change the **authority referent** without accidentally changing unrelated API/product semantics.

## A. Main public `/about/`

Repository/ref:
`Sargon17-Green/pastafari-calendar` / `feature/about-i18n-72-locales`

File/blob:
`docs/about/content/he.html` / `954f82559e618a091bb338c65a61be9e50d48331`

### A1 — naming authority
Current line 164:

> המגילה העברית היא הסמכות העליונה למשמעות השמות. תרגום או תעתיק הם שכבת תצוגה.

Future action:
- direct P0 authority migration;
- corpus must define semantic/name authority and allowed display variants;
- keep the useful identity-versus-display distinction if the corpus preserves it.

### A2 — Seer authority
Current lines 381–383:

> לצד המימוש הקאנוני קיים מנוע מהיר בשם Pastafarian Calendar Seer.
> ה־Seer אינו מקור הסמכות.
> המגילה קובעת את הכללים, והחישוב הקאנוני מפיק לפיהם את התאריך. אם Seer חולק על החישוב הקאנוני התקין, Seer טועה.

Future action:
- preserve Seer non-authority unless corpus changes architecture;
- replace/refine “המגילה קובעת את הכללים” according to corpus hierarchy;
- decide whether “המימוש הקאנוני” remains the correct official term.

### A3 — source provenance
Current line 450:

> המגילה אינה מפרטת כל פרט בהיסטוריה זו; פרטים שאינם נאמרים בה במפורש אינם חלק מנוסח המגילה.

Future action:
- likely retain as a provenance statement about the Megillah itself;
- do not confuse “not in Megillah text” with “not in project canon” once corpus may contain additional canon.

## B. Seer README

Repository/ref:
`Sargon-17-Green/Pastafarian-Calendar-Seer` / `main`

Blob:
`274a22b20f67705d13d1fe0f192a6d788d8f73f0`

### B1
Current line 9:

> The Seer is **not normative**. The current Scroll defines the calendar; if the Seer disagrees with it, the Seer is wrong.

### B2
Current authority summary around lines 1049–1057 includes:

> The Seer is **not normative**.
> The current Scroll defines what is true.
> Test-only exact/reference oracles are verification tools, not authorities over the Scroll.
> If the Seer disagrees with the normative calendar, **the Seer is wrong**.

Future action:
- retain Seer non-authority and oracle non-authority distinctions;
- migrate Scroll-as-supreme wording to the corpus hierarchy;
- avoid changing API mode names such as `presentation: "canonical"`.

## C. Seer conformance

File/blob:
`docs/CONFORMANCE.md` / `e7b9bcd5ea6e0286a7f8bdf0dd485d79e2ae9527`

Current line 5:

> The Seer does not define the Pastafarian Calendar. The current Scroll is the supreme semantic authority.

Current line 6 then requires reference/oracle code itself to be audited against the Scroll.

Future action:
- this is the clearest exact sentence requiring P0 migration;
- preserve the anti-common-mode-error principle while replacing the top authority referent.

## D. Seer terminology

File/blob:
`docs/TERMINOLOGY.md` / `b53578966235cb761d8e1c097c83303769ee3ef4`

Current Scroll definition:

> The normative specification of the Pastafarian Calendar. The Scroll defines the answer.

Current Seer definition includes:

> It is not a normative authority.

Future action:
- redefine Scroll's relationship to the corpus, not merely rename the heading;
- keep Seer/oracle concepts separate from semantic authority.

## E. Seer relation to the Monster

File/blob:
`docs/RELATION_TO_THE_MONSTER.md` / `a7305f8b8281741256d65f7ac47ac0cd4fbed833`

Important current claims:

> The Seer has no authority to revise the calendar.

and, in effect:
- Monster/normative reference wins over Seer;
- Seer shortcuts are liturgically unapproved;
- independent implementations must not use Seer as their normative computation oracle.

Future action:
- authority part needs corpus reconciliation;
- liturgical/theological assertions need FSM/corpus reconciliation;
- independent-verification architecture may remain product policy even if exact theology changes.

## F. Independent JavaScript+Interlingue implementation

Repository/ref:
`Sargon17-Green/Pastafarian-Calendar` / `JavaScript+Interlingue`

File/blob:
`DEVELOPMENT_STAGE.md` / `91b427726fe0d36c575d6a00b9a5da101ae18afa`

Current statements include:
- `CANONICAL_POST_STIR_SEMANTICS=SAVED_SUM_R`;
- current semantic authority for final post-stirs uses preserved saved-sum `R`;
- old raw-sum reports are historical/superseded;
- development history is archaeology and not normative authority.

Future action:
- compare the saved-sum rule to corpus;
- preserve historical supersession records rather than rewriting them;
- if corpus keeps saved-sum, most of this becomes evidence rather than an authority problem.

## G. Live cooking / Megillah UI

Repository/ref:
`Sargon17-Green/Pastafarian-Calendar` / `fix/megillah-live-source-audit`

File/blob:
`browser/i18n/locales.js` / `5f21f5af28597850b4dda26bf512a8543daec90b`

Current names/comments include:
- `MEGILLAH_CANONICAL_URL`;
- “Canonical live-stage quotations copied verbatim from the Hebrew Scroll…”;
- exact source-labelled quotation table.

Future action:
- keep exact historical/source quotations exact;
- decide whether “canonical URL/quotation” now means canonical **source text location** rather than supreme semantic authority;
- rename/comment only if needed to prevent hierarchy confusion.

## Migration rule

Do not perform a blind global replacement:

`Scroll` → `Corpus`

That would be wrong.

Some sentences are about:
- historical source provenance;
- exact quotations;
- liturgy;
- API canonical coordinates;
- test vectors;
- current semantic authority.

Only the last category necessarily changes merely because the new corpus becomes the superior authority.
