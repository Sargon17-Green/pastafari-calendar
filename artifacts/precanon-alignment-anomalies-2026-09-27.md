# Pre-canon alignment anomalies and traps — 2026-09-27
Status: preparatory findings only; do not treat this file as authority

## Purpose

Record concrete inconsistencies and terminology traps discovered while inventorying surfaces for the future canonical-corpus alignment.

These findings are useful now because they can be preserved without deciding the new canon.

## A01 — JavaScript+Interlingue README disagrees with its own source and test

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Branch inspected:
`JavaScript+Interlingue`

Files:
- `README.md`
- `src/source-language-catalog.js`
- `tests/source-language-normative-names.js`

### Observed state

`README.md` says the intended normative month-name correction at canonical index 8 is:

`Karshumb -> Karshumab`

But the actual source catalog contains:

`canonicalIndex: 8, text: 'Karshumav'`

and the focused regression test explicitly requires:

`textByCanonicalIndex('month', 8) === 'Karshumav'`

The same test explicitly rejects both `Karshumab` and `Karshumb`.

### Assessment

This is a real internal documentation/code contradiction in that branch.

It is **not safe to “fix” it now** by choosing one spelling, because the new canonical corpus is being built separately and will become authoritative.

### Future action

During corpus alignment:
1. ask the corpus for the canonical semantic/name identity;
2. align source catalog and regression test to it if needed;
3. align README wording;
4. do not infer authority from whichever file happened to be executable before the corpus freeze.

## A02 — Legacy names such as `FOUNDATION_DAY_OLD` are implementation archaeology, not automatically stale semantics

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Files:
- `src/index.js`
- `src/normative-cooking-trace.js`

The current code uses identifiers such as:
- `FOUNDATION_DAY_OLD`
- `M_OLD`
- “legacy” helpers and “scar” wrappers.

The observed Foundation numeric value itself is `-15055671n`, which is not by itself evidence of an error.

### Trap

A future automated alignment must not classify an identifier as obsolete merely because it contains `OLD` or `legacy`.

This branch intentionally preserves historical helpers behind repair wrappers. The semantic question is the reachable behavior/output, not the variable name.

## A03 — “canonical” in App validation documents often means “designated build/evidence identity”, not calendar canon

Repository:
`Sargon-17-Green/Pastafarian-Calendar-App`

Branch snapshot inspected:
`ws/WS04-design-system-code-foundation`

Example file:
`docs/implementation/WS06_VALIDATION.md`

Phrases such as:
- “Canonical identities”
- “canonical runs”
- “canonical private-repository Actions”

refer to the designated application/source/evidence snapshot, not to the canonical calendar corpus.

### Trap

Do not globally rewrite every occurrence of the word `canonical` when aligning the project to the new corpus.

Each occurrence must be classified by domain:
- calendar canon;
- canonical build/evidence snapshot;
- canonical localization semantic ID;
- historical terminology.

## A04 — App localization architecture already separates semantic identity from localized labels

Observed file:
`docs/implementation/WS05_LOCALIZATION.md`

It explicitly says:
- UI language and Pastafarian date language are separate;
- `LocalizedSemanticReference` keeps semantic IDs separate from localized labels.

### Consequence

This architecture is compatible with later corpus alignment and should be preserved.

A corpus-driven terminology correction should normally update the semantic mapping/source labels and regenerate localized outputs rather than collapse identity and presentation into one string.

## A05 — App catalogs contain almost no substantive calendar doctrine in the inspected WS04 snapshot

Observed:
- `localization/catalogs/he.json`
- `localization/catalogs/en.json`

Current hand-authored strings are mostly:
- language settings;
- day-count pluralization;
- offline/design-system statuses;
- mixed-direction preview examples.

The main canon-sensitive string currently visible is the label for “Pastafarian date language”.

### Consequence

There is no reason to churn these catalogs before the corpus is ready.

At actual alignment time, re-discover the live app branch because the application is actively advancing in another workstream.

## A06 — Seer binding documentation explicitly says it does not change calendar semantics

Observed file:
`computation/seer-bindings/README.md`

It describes the binding as infrastructure only and explicitly says it does not change calendar semantics or wire/product contracts.

### Consequence

Future corpus reconciliation should review Seer **claims and outputs**, but should not mechanically rewrite native-binding infrastructure merely because it mentions Seer.

## A07 — Historical reports should not be rewritten to look as if they always matched the new corpus

The legacy repository deliberately keeps superseded reports as archaeology, with explicit supersession markers.

Examples:
- `STAGE_56_CORRECTIVE_REPORT.md`
- `STAGE_57_CORRECTIVE_REPORT.md`
- `SPAGHETTI_DEVELOPMENT_HISTORY.md`

### Consequence

If a historical report records an old interpretation:
- preserve it as history;
- ensure current status documents say it is superseded;
- do not edit old PASS statements into statements that were never historically made.

The future alignment target is current normative/public truth, not retroactive history rewriting.


## A08 — Seer currently names the Scroll as supreme semantic authority

Repository:
`Sargon-17-Green/Pastafarian-Calendar-Seer`

Files:
- `README.md`
- `docs/CONFORMANCE.md`
- `docs/TERMINOLOGY.md`

Current wording says the Seer does not define the calendar and the current Scroll is the supreme semantic authority / source of truth.

### Consequence

When the new canonical corpus is ready:
- preserve “Seer is not normative” unless the corpus/project architecture explicitly changes that;
- replace/refine the **authority referent** so documentation points to the new corpus hierarchy rather than treating the Scroll alone as supreme;
- do not update one Seer file and leave contradictory authority statements elsewhere.

## A09 — Seer's `canonical` presentation mode is an API-format term

In Seer:
`presentation: "canonical"`

means language-free machine-oriented output with canonical indices/coordinates and no localized names.

It does **not** mean the Seer is the canonical authority.

### Trap

A corpus-alignment search for the word `canonical` must not mechanically rename this API mode.

## A10 — Seer Hebrew proper-name policy is explicitly waiting for naming authority

`docs/LOCALIZATION.md` says the Hebrew pack currently retains English Pastafarian proper names and declares `properNamePolicy: "english-retained"` until an authoritative naming source is documented.

### Consequence

This is a ready-made alignment hook for the new corpus:
- corpus decides semantic/naming authority;
- indices stay semantic identity;
- display names may change;
- semantic-invariance tests must prove names do not affect calculation.

Do not preemptively change the locale pack before the corpus is pinned.

## A11 — Seer theology/architecture document is canon-sensitive despite being technical documentation

`docs/RELATION_TO_THE_MONSTER.md` contains claims about:
- the Monster's performative/liturgical implementation;
- Seer shortcuts being unapproved/illicit;
- what counts as the prescribed work.

These statements are not mere implementation mechanics. They may overlap the new theological/calendar canon.

Future alignment must classify each statement rather than assuming a technical-doc file is canon-independent.


## A12 — Kisurra Hebrew spelling differs between current App main and public /about/

Observed current strings:
- App `main`: `כישורא`
- public Hebrew `/about/`: `קיסורה`

Both refer to the fallback reference location called Kisurra in English/project materials.

This is a real cross-surface localization inconsistency, not yet a semantic contradiction.

Future action:
- use corpus naming authority if it defines the Hebrew form;
- otherwise make one explicit localization choice and align all public products.

Do not pick a winner merely from frequency in current implementations.

## A13 — App has Week/Work Week views while /about/ says no canonical weeks

Current App `main` includes localized `שבוע` and `שבוע עבודה` views.

WS14 documentation clarifies that these are ordinary product windows on DayId/ChronoDay with locale-derived week settings, while Pastafarian Month/Cutlet/Year views are separate representation-dependent structural views.

Therefore:
- this is not currently a calendar-rule contradiction;
- it is a potential UI ambiguity.

Future alignment must preserve the distinction:
**weekly product view ≠ canonical Pastafarian week system**.

## A14 — App Today display currently uses numeric cutlet/month placeholders

Current App Hebrew `ws13.today.date` formats:
`שנה {year}, קציצה {cutlet}, יום {cutlet_day}; חודש {month}, יום {month_day}`

with `cutlet` and `month` declared as integers.

The public explanation defines the five fields using **names** for cutlet and month.

This may simply reflect the current vertical-slice/provider state, but it is a future presentation alignment point:
- semantic canonical index may remain machine identity;
- public date display may need localized/canonical names;
- names must not be allowed to alter calculation identity.


## A12 — Old live-stage branches contain non-source/adapted Megillah quotations

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Relevant branches inspected:
- `feat/live-stage-explanations-megillah-2026-09-26`
- `fix/live-stage-guide-sync-retained`
- `fix/megillah-exact-text-fragments`
- `fix/megillah-live-source-audit`

### Concrete example

The older live-stage quotation table contains:

> וכן עשה שער אחר שער.

That sentence was previously identified as **not actually present in the published Hebrew source**.

The later `fix/megillah-live-source-audit` branch replaces it with the audited source passage beginning:

> כדי למצוא את המרחק מן השער הראשון אל השני...

and similarly replaces other shortened/adapted stage quotations with exact published-source fragments.

### Consequence

Do not use the older stage-guide branches as quotation authority.

A machine-readable snapshot of the audited table is now preserved in:

`artifacts/megillah-live-stage-source-inventory-2026-09-27.json`

It records **16** stage keys from source blob:
`5f21f5af28597850b4dda26bf512a8543daec90b`.

The future corpus alignment must distinguish:
- exact quotation from the historical/published Scroll;
- explanatory paraphrase;
- semantic authority of the new corpus.

A quote may remain verbatim as a quotation even if the corpus becomes the superior semantic authority.

## A13 — Live-stage fix branches are not a simple linear chain

Observed Git relationships:

- `fix/live-stage-guide-sync-retained` is ahead of the initial live-stage feature branch;
- `fix/megillah-exact-text-fragments` diverges from `fix/live-stage-guide-sync-retained`;
- `fix/megillah-live-source-audit` diverges from `fix/megillah-exact-text-fragments`.

The latest audited source branch contains retained-stage-guide functionality in the inspected files, but commit ancestry alone does not prove that every fix from every sibling branch is present.

### Consequence

At later integration:
- compare **content and tests**, not merely branch names or apparent chronology;
- do not merge these branches mechanically into `main`;
- preserve the repository rule that branches stay separate;
- pick/reconcile the desired state on the target work branch explicitly.

## A14 — “canonical Megillah URL/quote” is now a provenance term, not the future top-level authority claim

The live-stage code names the current published Blogger URL `MEGILLAH_CANONICAL_URL` and describes quotations as canonical.

After the authority transition:
- the URL can remain the canonical **quotation/source location** for the historical Scroll text if that remains the project convention;
- it should not imply that the published Scroll alone outranks the new canonical corpus;
- naming/documentation may need clarification even if the URL and exact quoted text do not change.
