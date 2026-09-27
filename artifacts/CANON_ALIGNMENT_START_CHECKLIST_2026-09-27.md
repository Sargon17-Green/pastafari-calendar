# Canon alignment start checklist
Date: 2026-09-27
Status: prepared trigger checklist

Use this only when the separately developed canonical corpus is declared ready enough for downstream alignment.

## Required input from the corpus workstream

Before editing downstream products, capture:

- exact corpus identifier:
  - repository/path if applicable;
  - commit SHA / content hash / version;
  - date;
- whether that snapshot is frozen for this alignment pass;
- authority hierarchy stated by the corpus itself;
- any explicit supersession notes for prior Scroll/Megillah wording or project decisions.

## P0 corpus facts to extract first

### Authority / provenance
- role of the canonical corpus;
- role of the Hebrew Scroll/Megillah;
- role of historical source texts;
- role of implementations/reference/oracles;
- role of Seer;
- role of research/theorems/empirical findings;
- role of public explanations/translations.

### Date semantics
- exact definition of (P(c,t)) / (F(c,t));
- calculation/working day;
- target day;
- physical day identity;
- whether representation may vary with c;
- five output fields and their identity semantics.

### Chronology / anchors
- Foundation;
- Tablets;
- axis definitions / day indexing;
- Year 5000;
- year 0 / negative years;
- directionality before/after the diagonal.

### Structure
- gate semantics;
- year bounds;
- cutlet count/rules;
- month count/rules;
- weaving/non-contiguity;
- month/cutlet naming identity;
- week-system presence or explicit absence.

### Calculation
- Sauce version/recipe;
- SAVE semantics;
- visible/hidden drops;
- bowl update synchrony;
- final post-stirs;
- short/wide selection;
- ordering/unranking rules;
- maximum year length or other bounded invariants.

### Day boundary / location
- exact astronomical event;
- topocentric/geocentric choice;
- center/limb choice;
- reference-location semantics;
- location fallback if canon specifies one;
- DST/civil-time relationship.

### Origin/history
- creation versus modern re-delivery;
- 2026-08-05 status;
- relation of Scroll/Megillah to re-delivery;
- any dynamic-display requirement for historical events.

### FSM / project theology where corpus speaks
- Monster ontology;
- gender scheme;
- gravity mechanism;
- autonomous versus continuing intervention;
- Anti-Past;
- carbohydrates / meal rules;
- Heaven/Hell;
- other gods;
- problem-of-evil framing;
- epistemic/philosophical material;
- status of contradictions among traditions.

## Naming package to extract

For each canonical cutlet/month concept:
- semantic ID/index;
- canonical source form;
- Hebrew preferred form;
- allowed variants;
- translations versus transliterations;
- deliberately allowed deviations;
- numeric-base/rendering rules where locale-specific.

This step is essential because current downstream products contain known naming drift and retained-English policies.

## Classification pass before any edit

For every downstream claim, classify it as one of:

- canonical rule;
- canonical naming;
- canonical absence;
- canonical history/theology;
- derived theorem;
- empirical result;
- product behavior/policy;
- historical quotation;
- external-source claim;
- localization/presentation;
- deliberate joke/fallacy;
- obsolete/superseded historical record;
- unresolved.

Do not edit based on string similarity alone.

## First downstream targets after corpus pin

1. Hebrew `docs/about/content/he.html`.
2. Staged FSM article canon-dependent claims.
3. Seer authority/conformance terminology.
4. Live cooking/Megillah explanatory text and quotation/source distinction.
5. App semantic contracts/documentation/strings.
6. Independent implementation branches.
7. Other 71 `/about/` locales via bounded delta.
8. Derived research only where premises changed.

The exact operational order may be adjusted to minimize repeated translation/test invalidation, but the Hebrew semantic reconciliation should precede the 71-locale delta.

## Mandatory preservation rules

- never rewrite historical audit reports as though later canon had always existed;
- never alter exact historical quotations merely to harmonize them with explanatory prose;
- never treat Seer agreement as canon authority;
- never treat implementation test fixtures as authority over corpus;
- never lose prior native-language QA fixes without a specific affected-string reason;
- never merge independent implementation branches into `main` as an alignment shortcut;
- never call reconstructed FSM text “recovered”;
- never infer lack of prior project approval merely because an FSM claim lacks an external Henderson source.

## Evidence output required per surface

Use:
`artifacts/canon-alignment-evidence.schema.json`

Record:
- corpus snapshot;
- repository/ref/path;
- before SHA;
- claim IDs affected;
- classification;
- exact change summary;
- after SHA;
- semantic review;
- native-language review if relevant;
- render/a11y review if relevant;
- test evidence;
- unresolved items.

## Completion criterion

Alignment is not complete when “all text looks similar”.

It is complete only when:
- every P0 claim has an explicit corpus disposition;
- downstream products no longer contradict the pinned corpus;
- derived/product/editorial material remains correctly classified;
- translations preserve meaning naturally;
- implementation tests pass where runnable;
- unavailable evidence is marked unavailable rather than invented;
- a final cross-surface consistency audit finds no untracked semantic divergence.
