# About-page canon transition checkpoint — 2026-09-27

## Purpose

This checkpoint records the authority transition for the public Pastafarian calendar explanation without changing public-facing normative prose.

The canonical corpus being developed separately is now the source of authority for future factual and normative claims in `/about/`.

This file does **not** declare the corpus complete, does not replace it, and does not authorize copying historical explanatory claims into the public page without reconciliation against the corpus.

## Branch basis

This work branch was created from:

- repository: `Sargon17-Green/pastafari-calendar`
- base branch: `feature/about-i18n-72-locales`
- base commit: `f52745a6628618f7c3488ff4a8e6ab677f5e591a`

No public article content is changed by this checkpoint.

## Authority rule going forward

For the public explanation:

1. The canonical corpus is the authoritative source for calendar facts, normative rules, terminology, provenance and the distinction between normative material and derived research.
2. Existing `docs/about/content/*.html` files are explanatory products. They are not sources of authority.
3. Existing semantic ledgers, historical handoffs, implementation behavior, Seer behavior, tests and empirical research remain useful evidence and migration material, but they do not override the canonical corpus.
4. When the corpus and an existing explanation disagree, the explanation must be reconciled to the corpus rather than the reverse.
5. A statement that was previously accepted for the public page remains provisional until either:
   - it is supported by the canonical corpus; or
   - it is explicitly classified as editorial/product behavior/derived research and is compatible with the corpus.
6. Do not use the current Hebrew `/about/` article as an authority source for future canonical work. It remains the semantic master only for the translation rollout until the canon-reconciliation delta is prepared.

## Work that may continue before canon freeze is lifted

The following work is independent of unsettled normative content and may proceed:

- preserve the 72-locale rollout artifacts and completed semantic alignment work;
- continue bookkeeping and evidence collection for native-language QA;
- continue rendered-layout, accessibility, BiDi, language-switching and PWA/offline checks where they do not require changing factual claims;
- preserve stable section IDs, HTML structure and deep-link contracts unless a later canon-driven content redesign explicitly requires changes;
- inventory public statements that require later canon reconciliation;
- separate provenance classes: canonical rule, derived theorem, empirical result, product behavior, editorial framing and external-source claim;
- reconstruct and inventory the separate “About the Flying Spaghetti Monster” content without declaring its disputed claims canonical;
- prepare non-public wording candidates for ambiguous terminology, provided they remain clearly staged and are not propagated across locales yet.

## Work intentionally deferred until the canonical corpus supplies a stable reference

Do not yet make or propagate new public factual/normative edits concerning:

- the exact hierarchy and wording of calendar authority;
- any calendar rule whose canonical wording or status may still move;
- source-history claims that depend on the new corpus provenance model;
- claims currently present in `/about/` that the corpus may reclassify as normative, derived, empirical, historical or editorial;
- any new translation delta caused only by such claims.

A canon reconciliation should be performed as a bounded delta after a stable corpus snapshot exists. It should not restart the 72 translations from zero.

## Known pending public-content items to reconcile later

These are retained as **pending editorial requirements**, not asserted here as canonical calendar rules.

### 1. Specification/conformance language versus legal prohibition

The public documentation needs a short explanation that normative words such as “must”, “must not” and “forbidden” inside a specification describe the conditions for claiming conformance to that specification.

This is conceptually distinct from whether an act is prohibited by law.

The final wording must avoid implying that a calendar specification itself creates a criminal, civil or other legal prohibition. It should also distinguish specification conformance from repository/project governance rules and from intellectual-property law.

This requirement is safe to retain as an editorial clarification; its exact wording should be reconciled with the canonical corpus and any legal/licensing documentation before publication.

### 2. Modern re-delivery event

Earlier explanation work required the modern re-delivery to be treated as a fixed chronological event while its displayed Pastafarian representation is computed under the relevant day-of-working context.

The existing article explains the contextual representation but does not yet contain the planned dynamic display of that event's Pastafarian date.

Implementation of the UI component may be prepared later, but the event's authoritative description and provenance must first be reconciled with the canonical corpus.

### 3. Separate “About the Flying Spaghetti Monster” page

A full Hebrew draft exists outside the published `/about/` article. It covers, among other topics:

- nature and appearance of the Flying Spaghetti Monster;
- grammatical gender / “carbohydrate” framing;
- creation narrative;
- gravity;
- apparent age of the world;
- carbohydrates and meals;
- Antipasti / hell;
- signs and answered prayers;
- pirates;
- humanity;
- work, forgetting and repairs;
- the flood;
- falsifiability and evidence;
- prayer and worship;
- “I'd Really Rather You Didn't”;
- belief and doubt;
- tradition, memory and accuracy.

Later discussion also approved additional material that is not present in the saved 229-line draft, including a penguin/solar-water-heater-factory appendix and related logic/science examples.

This content should remain a separate workstream from the technical calendar explanation. Before publication it needs:
- reconstruction of the latest approved text;
- provenance classification for every external factual claim;
- separation between imported Pastafarian source material, project-specific canon, deliberate epistemological jokes and still-open claims;
- consistency review against the new canonical corpus where the two domains intersect;
- language QA and publication planning.

## Current rollout snapshot at branch creation

At the base commit used for this branch:

- the semantic-delta status file records all 71 non-Hebrew locales as `final_verified_aligned=true`;
- this means the existing approved semantic delta has been applied/verified across the 71 translations;
- it does **not** mean the full native-language, rendered, accessibility, switching or PWA/offline QA gates have passed;
- the old cross-repository ledger is therefore not to be treated as a final publication verdict merely because the semantic delta is complete.

The new canonical corpus may require another small bounded semantic delta later. That later delta must preserve already completed native-language fixes and must not use English as a translation pivot.

## Reconciliation procedure once a stable corpus snapshot is available

1. Pin the exact corpus version/commit/hash used as authority.
2. Build a claim-by-claim diff between that snapshot and the current Hebrew public master.
3. Classify every difference:
   - canonical correction;
   - provenance/source correction;
   - derived theorem/research correction;
   - product-behavior update;
   - editorial-only wording;
   - no change required.
4. Apply the smallest Hebrew delta that restores conformance.
5. Review Hebrew as a public article, not merely as a source diff.
6. Generate a bounded semantic delta for the other 71 locales.
7. Preserve natural local wording and prior native-language fixes.
8. Re-run the required same-language QA only for affected content/surfaces, plus any global gates whose evidence is invalidated by the change.
9. Keep rendered/accessibility/PWA/switching evidence separate from linguistic/semantic evidence.
10. Only after those gates are satisfied should publication/merge be considered.

## Non-actions in this checkpoint

This checkpoint intentionally does **not**:

- edit `docs/about/content/he.html`;
- edit any translated article;
- redefine the calendar;
- declare the canonical corpus complete;
- merge anything to `main`;
- publish the site;
- modify the separate Flying Spaghetti Monster draft;
- create a new translation baseline.

