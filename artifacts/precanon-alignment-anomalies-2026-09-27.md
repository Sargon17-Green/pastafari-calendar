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
