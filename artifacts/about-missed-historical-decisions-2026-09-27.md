# Recovered explanation-page decisions not yet fully represented in the staged content
Date: 2026-09-27
Status: migration evidence; future canonical corpus remains authoritative

## Purpose

A second historical-recovery pass found several user-approved requirements from the original “ארגון הסבר ללוח” period that were not yet represented clearly enough in the current migration artifacts.

These are preserved here so the future corpus-alignment pass does not lose them.

## D01 — Explain how the calendar's concrete details were determined

**Recovered user decision:** 2026-09-08.

The user explicitly required the “creator/origin” material to explain **how the concrete details of the calendar were determined**, not merely to say that the calendar exists or was delivered.

This is distinct from the technical algorithm section:
- the algorithm explains how to compute the calendar;
- the origin/theology material should explain, at the project-world level, how its particular design/details came to be selected/created.

### Current status

The present `/about/` article has:
- technical calculation detail;
- a short origin/re-delivery subsection;

but it does **not** currently contain a developed account of how the calendar's particular design details were determined.

The separate FSM article also does not yet contain a fully reconciled calendar-creation account.

### Future action

When the canonical corpus is pinned:
1. see whether the corpus supplies this origin/design history;
2. place the detailed account primarily in the FSM/origin content if that remains the editorial split;
3. keep the technical `/about/` page concise and link/cross-reference rather than duplicating a long theology narrative.

Do not invent the missing origin mechanism now; the corpus will become authoritative.

## D02 — 5 August 2026 is modern re-delivery, not creation

**Recovered user decision:** 2026-09-08.

The user explicitly distinguished:
- creation of the calendar as part of creation;
- **5 August 2026** as a modern **re-delivery / re-granting** event.

The date must not be described as the creation date of the calendar.

### Current status

The current `site-story` wording correctly says the calendar is part of creation and describes a modern re-delivery event.

What remains absent is the previously planned dynamic display of the event's Pastafarian date.

## D03 — Do not present the Gregorian date as the public calendar label for re-delivery

**Recovered user decision:** 2026-09-08.

The user specifically rejected presenting the Gregorian date as though it were the calendar's own date for the event.

The approved direction was:
- treat the re-delivery as a fixed chronological event;
- compute/display its Pastafarian representation dynamically under the relevant working day.

### Clarification

The Gregorian date `2026-08-05` may remain internal provenance/chronological metadata where needed.

The public explanatory presentation should not substitute that civil date for the Pastafarian representation.

Final UI wording waits for corpus alignment.

## D04 — Seer: efficient shortcut, integration/API useful, but Monster approval is a separate issue

**Recovered user decision:** 2026-09-08.

The user explicitly wanted Seer:
- recognized as much more efficient;
- linked/exposed for future integration/API use;

while also preserving the project-world rule that **the Monster does not approve the shortcut**.

### Current cross-surface state

The current public `/about/` article explains Seer's non-authority and capabilities, but does not strongly foreground the “Monster does not approve” formulation.

The Seer repository itself **does** preserve this distinction explicitly in:
- `docs/RELATION_TO_THE_MONSTER.md`;
- `docs/TERMINOLOGY.md`.

### Future action

During corpus alignment distinguish:
1. **semantic authority:** Seer is or is not normative;
2. **technical integration:** API/link/accessibility/product use;
3. **project-world/liturgical approval:** whether the Monster approves bypassing the prescribed work.

These are different claims and should not be collapsed into one sentence.

## D05 — Factual/direct voice supersedes early meta framing

Historical drafts sometimes used or contemplated meta framing about “story”, satire or lack of expected real-world adoption.

Later user decisions superseded that style for canonical/public explanation:
- factual/direct project-world voice;
- no “במסגרת סיפור האתר”, “לפי המיתולוגיה”, “מוצג כ־” distancing;
- do not explain away concrete theology as symbolism.

This supersession is already implemented in the current Hebrew `/about/` master, but is recorded here because older conversation material contains conflicting stylistic instructions.

## D06 — Do not revive exploratory topics merely because an old draft mentioned them

Historical draft work mentioned exploratory topics such as:
- official recognition;
- contracts/flights/hospitals;
- various placeholders or “טרם אומת” items.

Those mentions alone are **not** evidence of an approved final requirement.

Migration rule:
- user-approved decisions are preserved;
- assistant-proposed exploratory headings are not promoted into requirements unless separately approved or supported by the new corpus/product needs.
