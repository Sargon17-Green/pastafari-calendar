# Future canonical-corpus alignment — surface inventory
Date: 2026-09-27
Status: preparatory inventory; the canonical corpus is still being developed separately

## Principle

When the canonical corpus is ready, alignment must not mean “fix `/about/` and stop”.

The corpus will become the authority for factual/normative calendar claims. Every public or quasi-public surface that restates those claims must be checked against the same pinned corpus snapshot.

This inventory deliberately separates:
- **normative/semantic claims** that must align;
- **derived research** that must remain derived rather than become rules;
- **product behavior** that must accurately describe the implementation but is not itself canon;
- **editorial/theological material** that may intersect canon without defining it;
- **translations/localizations**, which should receive bounded deltas rather than wholesale rewrites.

## 1. Main public site / explanation repository

Repository: `Sargon17-Green/pastafari-calendar`

### 1.1 Hebrew public explanation
Primary file:
- `docs/about/content/he.html`

Alignment scope:
- all 29 stable sections;
- all statements about calendar definition, chronology, anchors, date identity, day-of-working, names, calculation, Seer authority, reverse conversion and far-time behavior;
- all provenance language about the Scroll / origin / re-delivery;
- separation between canon, theorem, empirical sample and product behavior.

Prepared control:
- `artifacts/about-canon-reconciliation-inventory.json`.

### 1.2 Other 71 `/about/` articles
Files:
- `docs/about/content/*.html`

Rule:
- do **not** restart translation from zero;
- reconcile Hebrew to the pinned corpus first;
- create one bounded semantic delta;
- preserve native-language corrections already made;
- no English pivot;
- rerun only invalidated linguistic QA plus global gates whose evidence changed.

Existing structural test already guards:
- 29 stable IDs;
- subsection hierarchy;
- two tables with 19 + 9 body rows;
- immutable formulas/literals;
- absence of unintended Hebrew leakage in non-Hebrew articles.

Therefore a new structural validator is unnecessary unless the canon itself requires structural redesign.

### 1.3 Main UI / guide / metadata
Potential surfaces:
- `docs/index.html`
- `docs/app.js`
- locale resources under `docs/i18n/`
- guide/footer/error/loading/accessibility strings
- manifest/noscript/fallback text
- reverse-search and year-view user-facing text

Alignment focus:
- terminology and factual explanatory strings only;
- do not change the calendar engine merely because prose changes;
- UI behavior remains a product contract, not a canonical source.

### 1.4 Seer-facing public documentation
Potential surfaces:
- public API/OpenAPI descriptions;
- CLI help;
- package README/docs;
- status/metadata descriptions;
- statements about authority/equivalence.

Alignment focus:
- Seer remains implementation/product, never authority;
- wording must reflect whatever authority hierarchy the corpus establishes;
- product capability statements must be reverified live rather than copied from canon.

### 1.5 Research artifacts
Examples:
- Structural Atlas;
- anniversary/recurrence scans;
- inverse/reverse research;
- sauce-history/invertibility work;
- far-time theorems.

Alignment rule:
- preserve proved/empirical results if still valid;
- classify them as `THEOREM`, `EMPIRICAL_RESULT`, or `OPEN_QUESTION`;
- never promote a sampled regularity to a canonical rule;
- if corpus changes a premise, invalidate/recompute only research that depends on that premise.

## 2. Legacy/alternate web implementation and cooking trace

Repository: `Sargon17-Green/Pastafarian-Calendar`
Relevant branch currently identified:
- `JavaScript+Interlingue`

Important public/semantic surfaces found:
- `index.html`
- `src/index.js`
- `src/normative-cooking-trace.js`
- `src/source-language-catalog.js`
- `README.md` / `README.txt`
- development/audit documents where they make current user-facing claims.

### Cooking-trace special rule

The cooking UI contains:
- stage titles;
- explanatory prose;
- Hebrew quotations from the Scroll;
- source links to the public Hebrew Scroll.

At alignment time:
- quotations must be checked against the corpus/source hierarchy;
- a quotation must not be silently rewritten to match explanatory prose;
- explanatory prose may need alignment even when the quotation stays unchanged;
- computed trace values must still come from the actual implementation, not from manually copied canon text.

Repository-management constraint:
- do not merge branches into this repository's `main`; its branches remain separate.

## 3. Mobile application

Repository: `Sargon-17-Green/Pastafarian-Calendar-App` (private)

Known active/workstream branch family includes:
- `ws/WS00...` through later WS branches;
- the current installation/design work has used `ws/WS04-design-system-code-foundation`;
- localization, domain-core and later Android vertical-slice branches also exist.

Top-level content-bearing areas observed:
- `apps/`
- `computation/`
- `design/`
- `docs/`
- `localization/`
- `shared/`
- `schemas/`
- `test-corpora/`

Alignment scope when corpus is ready:
- date terminology;
- help/onboarding/about text;
- day-of-working explanations;
- accessibility labels that encode semantic claims;
- error/help text;
- localization source strings;
- any bundled examples/fixtures described as canonical;
- app-side claims about Seer versus local/canonical calculation.

Do **not** interrupt the independent installation/testing work merely to prepare the later corpus alignment.

## 4. Separate Flying Spaghetti Monster article

Current staging is in this repository under `artifacts/fsm-*`.

Prepared controls:
- exact recovered 2026-09-16 baseline;
- recovery ledger;
- provenance matrix;
- source audit;
- source manifest;
- non-canon QA findings;
- canon-decision queue;
- post-draft approved-additions ledger;
- reconstructed post-draft material;
- reconstructed penguin appendix;
- consolidated staged candidate.

Corpus alignment scope:
- only claims that the corpus actually governs or intersects;
- external Pastafarian-source provenance remains a separate question;
- project theology/editorial jokes do not become calendar rules merely because they share the same fictional world.

## 5. Scroll / Marak material

The Scroll/Megillah and Marak work have their own source/provenance rules.

Future alignment must distinguish:
- the canonical corpus as the project's authority layer;
- historical/original Megillah text;
- Marak candidates or executable adaptations;
- explanatory quotations.

Do not edit historical immutable originals merely to make downstream prose match.

## 6. Repository documentation and generated evidence

Across repositories, inspect:
- READMEs;
- architecture/design docs that describe “canonical” behavior;
- fixtures labelled canonical;
- generated evidence;
- examples/tutorials;
- API docs;
- release notes only where they are presented as current truth.

Historical audit reports should normally remain historical records. If obsolete, annotate status rather than rewriting history.

## 7. Translation alignment order

Once a corpus snapshot is pinned:

1. canonical corpus itself — immutable input to this pass;
2. Hebrew semantic master for the main explanation;
3. other Hebrew/public explanatory surfaces;
4. implementation-independent English/technical docs as needed;
5. 71 localized `/about/` articles via bounded delta;
6. whole-site locale strings affected by the same claim changes;
7. alternate web implementation/cooking explanations;
8. mobile application strings/docs;
9. FSM article overlap;
10. derived research labels/documentation;
11. final cross-surface consistency audit.

This order does **not** make Hebrew an authority over the corpus. Hebrew is merely the first public explanatory surface reconciled after the corpus.

## 8. Required evidence per aligned surface

For each surface record:
- repository;
- exact branch/ref;
- pre-alignment SHA;
- pinned corpus version/hash;
- claims/sections touched;
- change classification;
- post-alignment SHA;
- semantic review result;
- language QA result where relevant;
- rendered/accessibility result where relevant;
- tests run;
- unresolved differences.

## 9. What should not be aligned mechanically

Do not automatically replace text just because wording differs from the corpus.

A difference may be:
- harmless explanatory paraphrase;
- natural localization;
- product-specific instruction;
- derived theorem;
- empirical result;
- historical quotation;
- deliberate joke;
- genuine contradiction.

The alignment unit is **meaning/provenance**, not string equality.

## 10. Trigger condition

Do not begin the actual reconciliation until the corpus workstream supplies a stable, pin-able snapshot.

Until then this inventory may grow, but downstream public normative text should not be churned repeatedly.
