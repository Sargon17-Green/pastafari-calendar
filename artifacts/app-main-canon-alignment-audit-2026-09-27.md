# Mobile App current-main canon-alignment audit
Date: 2026-09-27
Repository: `Sargon-17-Green/Pastafarian-Calendar-App`
Ref inspected: `main`
Status: read-only preparatory audit; no App changes made

## Why this audit supersedes the earlier WS04-only snapshot

The earlier inventory inspected `ws/WS04-design-system-code-foundation`.

Current App `main` has advanced substantially and now includes WS09/WS13/WS14 semantic/product surfaces. This report records the current-main alignment points without interfering with the App workstream.

The live App must still be rediscovered again when the canonical corpus is finally pinned.

## A01 — Week / Work Week UI does not imply a Pastafarian week system

Current Hebrew catalog contains:
- `ws14.view.week` → `שבוע`
- `ws14.view.work_week` → `שבוע עבודה`

At first glance this can appear to conflict with the public explanation's claim that there is **no canonical Pastafarian week system**.

Current WS14 implementation documentation resolves the semantic distinction:
- Day / Week / Work Week / Month / Year are **ordinary** windows on the canonical DayId/ChronoDay axis;
- first-day-of-week and weekend membership are explicit locale/product inputs;
- Pastafarian structural views are separate and representation-dependent.

Therefore this is **not currently a semantic contradiction**.

### Future alignment/UX check

After corpus alignment:
- preserve ordinary/civil Week and Work Week views if desired;
- ensure UI/context does not make them look like newly invented canonical Pastafarian weeks;
- do not add week semantics to the calendar canon merely because the product offers a weekly view.

This is a product-label clarity issue, not a reason to remove the views.

## A02 — App currently has explicit Pastafarian structural views

Hebrew catalog includes:
- `קציצה`;
- `חודש פסטפרי`;
- `שנה פסטפרית`;
- `מפת שנה פסטפרית`.

WS14 documentation says Pastafarian Month/Cutlet/Year boundaries depend on a fixed representation context / Calculation Day and that woven structure members must not be assumed chronologically adjacent.

This is strongly aligned with the current explanation model and is a high-priority future corpus verification surface.

## A03 — Current “Today” date string exposes numeric cutlet/month placeholders

Current Hebrew:
`תאריך פסטפרי: שנה {year}, קציצה {cutlet}, יום {cutlet_day}; חודש {month}, יום {month_day}`

The placeholders `cutlet` and `month` are declared as integers in this catalog.

This may be an intentional current vertical-slice/provider representation, but it is a future presentation/naming alignment point because the public explanation defines the five fields using **cutlet name** and **month name**, not merely numeric indices.

Do not change the App now. At corpus alignment:
1. confirm the canonical identity model;
2. distinguish semantic index from public display name;
3. align localized presentation without allowing names to alter semantics.

## A04 — Kisurra spelling/transliteration differs across current surfaces

Current App Hebrew uses:
- `כישורא`

Current public Hebrew `/about/` uses:
- `קיסורה`

Both refer to the fallback reference location currently called Kisurra in project material.

This is a real **cross-surface Hebrew presentation inconsistency**.

It is not safe to pick a winner merely from current strings. Resolve through:
- corpus naming/provenance if it defines the Hebrew form;
- otherwise one explicit localization decision during final alignment.

## A05 — Venus lower-transit boundary is already operational product semantics

WS13 current-main documentation says the first true local slice uses:
- physical Pastafarian day identity;
- the Venus lower-transit boundary model;
- Kisurra fallback when no retained/device location is resolved.

The public `/about/` currently states the more precise formulation:
topocentric lower culmination of Venus's center on the local meridian.

### Future action

Corpus alignment must decide the normative astronomical definition, then:
- verify App temporal implementation;
- verify product wording;
- verify fallback behavior independently as product policy.

Do not treat current App behavior as authority over the corpus.

## A06 — Calculation-Day Override is explicitly representation-only

WS13 current-main documentation says:
- Calculation-Day Override changes representation only;
- provider failure cannot rewrite physical DayId.

This is a valuable product invariant that matches the current explanation's identity-vs-representation distinction.

At corpus alignment:
- verify the semantic premise;
- preserve the product invariant if compatible;
- do not let a display override mutate event/day identity.

## A07 — Pastafarian all-day and civil all-day are distinct domain variants

WS09 says:
- Pastafarian all-day and civil all-day are distinct `TemporalAnchor` variants.

WS13/WS14 use `PastafarianDaySpan` and separately persist `CivilDaySpan`.

This matches the current public explanation's warning that Pastafarian all-day is not automatically civil midnight-to-midnight.

Future corpus alignment should verify the day-boundary premise, while preserving the useful domain separation.

## A08 — “canonical” in App domain docs is heavily overloaded

Current-main App documentation uses “canonical” for:
- domain IDs;
- repositories;
- DayId windows;
- state;
- workstream names such as `WS09_CANONICAL_DOMAIN_CORE`.

These usages often mean **authoritative application-domain state/identity**, not the new Pastafarian canonical corpus.

Do not run a mechanical global replacement of “canonical” during corpus alignment.

## A09 — Main App localization surface is now materially larger

The current Hebrew catalog has grown from the earlier WS04 design/bootstrap strings to include:
- local calendar shell;
- Today;
- temporal context;
- Kisurra location/fallback;
- provider/storage statuses;
- event CRUD;
- DayId display;
- structural views;
- search;
- observances;
- reminders;
- history.

Therefore the earlier conclusion “the app contains almost no canon-sensitive public strings” is now obsolete for current `main`.

Future alignment must use current-main/live-branch catalogs, not the old WS04 snapshot.

## A10 — Evidence discipline in App docs is already compatible with the future alignment process

WS13 and WS14 repeatedly distinguish:
- code complete/implemented;
- automated tests not yet executed;
- physical/TalkBack/RTL/performance acceptance pending;
- hosted no-runner results not equivalent to PASS.

Preserve that discipline during corpus alignment:
- semantic agreement is not render/a11y/device PASS;
- static inspection is not executed evidence.
