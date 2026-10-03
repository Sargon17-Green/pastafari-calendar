# Pre-canon content work — artifact index
Date: 2026-09-27
Branch: `work/about-canon-transition-2026-09-27`
Status: early reconciliation staging; canonical corpus is now available as a nonfrozen working view, while final whole-corpus freeze remains pending

## 1. Authority transition and /about/ reconciliation

### `about-canon-transition-2026-09-27.md`
Defines the authority transition:
- future canonical corpus is authoritative;
- current public explanation/implementations/tests/Seer/research are migration evidence or downstream products;
- no public normative rewrite is made here.

### `about-canon-reconciliation-inventory.json`
Mechanical inventory of the current 29 Hebrew `/about/` section IDs and the kind of future reconciliation each needs.

### `about-claim-register-2026-09-27.json`
Claim-level register for the current Hebrew explanation. Records what the article presently says without promoting it into canon.

### `about-canon-reconciliation-priority-2026-09-27.md`
P0–P4 ordering for the later corpus pass:
- rules/authority first;
- mixed product semantics next;
- derived/empirical material later;
- summary last.

### `about-rollout-live-drift-2026-09-27.md`
Records that the live 72-locale rollout branch continued moving in QA infrastructure while the Hebrew semantic article blob remained unchanged.

## 2. Cross-surface canon migration

### `canon-alignment-surface-inventory-2026-09-27.md`
Human-readable map of downstream surfaces:
- main site and 72 locales;
- Seer;
- independent implementations;
- mobile App;
- live cooking/Megillah UI;
- research;
- FSM article;
- Scroll/Marak-related material.

### `canon-claim-propagation-map-2026-09-27.json`
Concept-to-surface dependency map:
- authority hierarchy;
- F(c,t);
- five-field date;
- names;
- Year 5000;
- structural year/cutlet/month rules;
- weeks;
- Venus boundary;
- all-day semantics;
- Foundation/Tablets;
- Sauce;
- short/wide choice;
- Seer non-authority/liturgy;
- re-delivery;
- FSM theology;
- derived-research boundary.

### `canon-alignment-evidence.schema.json`
Future evidence schema for recording:
- pinned corpus snapshot;
- surface/ref/SHAs;
- change classification;
- semantic/language/render/a11y verification;
- unresolved items.

### `precanon-alignment-anomalies-2026-09-27.md`
Concrete traps already found, including:
- `Karshumab` README versus `Karshumav` code/test mismatch;
- legacy `OLD` identifiers that are not automatically stale semantics;
- multiple meanings of “canonical” in App/Seer;
- Seer currently naming the Scroll as supreme authority;
- old live-stage branches containing adapted/non-source Megillah quotations;
- branch-divergence risk among cooking/Megillah fix branches.

## 3. Repository / branch snapshots

### `global-canon-alignment-branch-inventory-2026-09-27.json`
Snapshot of all four currently connected Pastafarian repositories and their branch sets.

### `multi-implementation-branch-inventory-2026-09-27.json`
The 60 independent implementation/language branches in `Sargon17-Green/Pastafarian-Calendar`, with the no-merge-to-main rule and future native-toolchain alignment checklist.

### `independent-implementation-branches-2026-09-27.json`
Compact second inventory of the same repository's 66 total branches, useful for quick machine filtering.

### `app-precanon-alignment-snapshot-2026-09-27.md`
Fresh App snapshot from live `main` at:
`f5216db9373d674a47c48930a63174ca813b9401`.

Records current semantic contracts:
- P(c,t) representation versus DayId identity;
- calculation-day override;
- Venus boundary;
- structural woven views;
- all-day anchor types;
- Seer provider boundary;
- current localization surfaces.

### `megillah-live-stage-source-inventory-2026-09-27.json`
Exact inventory of 16 source-audited live cooking-stage quotations from:
`fix/megillah-live-source-audit`
source blob:
`5f21f5af28597850b4dda26bf512a8543daec90b`.

## 4. FSM historical baseline and recovery

### `fsm-about-recovered-draft-2026-09-16.md`
Exact preserved readable 2026-09-16 article baseline.

### `fsm-about-recovery-2026-09-27.md`
Recovery ledger showing that the 2026-09-16 baseline is not the latest approved state.

### `fsm-postdraft-approved-additions-2026-09-27.md`
Records later approved content:
- concrete Odin/Thor/Loki ontology;
- limited-god model;
- mechanism versus agent;
- wishful thinking / epistemic activism;
- contradiction-as-credibility material;
- problem-of-evil framing;
- preferred-conclusion-as-evidence.

### `fsm-prior-project-decisions-2026-09-27.json`
Machine-readable historical decision manifest distinguishing:
- approved editorial rules;
- approved project theology;
- approved deliberate bad epistemology;
- partial exact recovery.

### `fsm-editorial-principles-recovered-2026-09-27.md`
Recovered production rules:
- source-check first, then project theology may be invented;
- invented theology should be concrete, not rescued as metaphor;
- dry factual/deadpan voice;
- reduce calendar duplication;
- do not “fix” intentional fallacies.

## 5. FSM source/provenance control

### `fsm-source-audit-2026-09-27.md`
Narrative audit of Henderson/Church/Loose Canon/Gospel-related source support and provenance corrections.

### `fsm-source-manifest-2026-09-27.json`
Machine-readable source list and supported claim families.

### `fsm-source-access-ledger-2026-09-27.md`
Tracks which sources were actually read directly versus publisher metadata or secondary locators.

### `fsm-provenance-matrix-2026-09-27.md`
Section-by-section provenance classification:
- external Pastafarian;
- Loose Canon;
- previously approved project theology;
- deliberate epistemology;
- real-world factual claim;
- canon-dependent;
- unresolved.

## 6. FSM current staging drafts

### `fsm-about-working-draft-2026-09-27.md`
Main recovered baseline plus safe non-canon corrections.

### `fsm-about-consolidated-candidate-2026-09-27.md`
Current best single staging article:
- main recovered article;
- safe editorial/scientific corrections;
- recovered historical penguin appendix composite with staging-only cleanup;
- later 2026-09-17 ontology/epistemology additions still kept separate pending corpus alignment.

This is **not** a publication candidate and is **not** the complete latest historical approved state.

### `fsm-postdraft-reconstruction-draft-2026-09-27.md`
Explicit reconstruction of later approved ontology/epistemology material. Not historical verbatim text.

### `fsm-postdraft-insertion-plan-2026-09-27.md`
Proposed insertion points if the corpus later retains those additions.

## 7. Penguin appendix evidence

### `fsm-penguin-appendix-recovered-fragment-2026-09-27.md`
Initial exact opening fragment plus recovered structure constraints.

### `fsm-penguin-appendix-recovered-composite-2026-09-27.md`
Recovered historical composite assembled from exact prior assistant-output fragments. More complete and preferable as historical evidence over the reconstruction.

### `fsm-penguin-appendix-reconstruction-draft-2026-09-27.md`
New reconstruction created before the fuller historical composite was recovered. Keep only as reconstruction archaeology / alternate wording, not as the historical source.

### `fsm-penguin-appendix-qa-2026-09-27.md`
QA of the earlier reconstruction.

### `fsm-penguin-composite-qa-2026-09-27.md`
QA of the recovered historical composite and staging-only fixes applied to the consolidated candidate.

## 8. FSM QA and future canon decisions

### `fsm-hebrew-editorial-qa-2026-09-27.md`
Hebrew prose/structure/provenance QA.

### `fsm-noncanon-qa-findings-2026-09-27.md`
Safe findings that do not require the new corpus.

### `fsm-postdraft-reconstruction-qa-2026-09-27.md`
Logic/factual QA for reconstructed later material.

### `fsm-prior-decisions-gap-report-2026-09-27.md`
Compares prior approved decisions with what is actually present in the consolidated candidate.

### `fsm-canon-decision-queue-2026-09-27.json`
Items whose final substantive status must be reconciled when the new corpus is pinned.

## 9. Control/checkpoint files

### `precanon-content-work-queue-2026-09-27.md`
Operational queue of safe work versus blocked work. As of 2026-10-03 the queue is **early reconciliation active** against the nonfrozen corpus view `source_revision 4247068c…`.

### `precanon-content-checkpoint-2026-09-27.md`
Narrative state checkpoint.

### `CANON_ALIGNMENT_START_CHECKLIST_2026-09-27.md`
Ready-to-use intake checklist for the moment the corpus is declared stable: what to pin, which P0 facts to extract, naming package requirements, classification rules, downstream order and evidence requirements.

## Current hierarchy of use

When resuming this work before corpus completion:

1. read this index;
2. read `precanon-content-checkpoint-2026-09-27.md` and the live `precanon-content-work-queue-2026-09-27.md`;
3. if the queue is still quiescent and no listed continuation trigger has occurred, do not repeat closed recovery/QA merely to create activity;
4. for `/about/`, use the claim register + priority plan;
5. for FSM article, use prior-decision manifest + provenance matrix + consolidated candidate;
6. for cross-repo planning, use propagation map + surface inventory + anomalies;
7. do not treat any staging artifact as the new corpus.

When the corpus is ready:

1. pin corpus;
2. rediscover all live refs;
3. start reconciliation from live product branches;
4. use these artifacts as migration evidence;
5. do not merge this preparation branch merely because it contains the artifacts.

## 10. Additional closed QA / migration controls

### `fsm-real-world-science-qa-2026-09-27.md`
Systematic check of the real-world scientific premises used by the FSM article, while protecting deliberate fallacies from accidental “correction”.

### `fsm-structure-crossref-qa-2026-09-27.md`
Heading/order/cross-reference QA; records the staging-only H3 nesting fix for penguin appendix subsections.

### `fsm-postdraft-exact-recovery-frontier-2026-09-27.md`
Records the current exact-text recovery limit for later 2026-09-17 material so paraphrase/reconstruction is not mislabeled as verbatim history.

### `about-precanon-evidence-snapshot-2026-09-27.json`
Pins live 72-locale semantic-alignment evidence: source HEAD, article/status/ledger blobs, 71/71 semantic alignment, 71 per-locale evidence files, and current native-QA control.

### `about-claim-register-qa-2026-09-27.md`
Mechanical QA of the 29-section / 84-claim register: unique IDs, complete classifications/actions, P0–P4 counts.

### `spec-conformance-vs-law-audit-2026-09-27.md`
Preserves the required distinction among specification conformance, project governance, liturgical authorization and legal permission; notes the existing Seer NOTICE precedent and current MIT-style repository licensing.

## 11. Ready-made future deltas

### `authority-wording-register-2026-09-27.md`
Exact-current wording inventory for authority claims in `/about/`, Seer conformance/terminology/relation docs, JavaScript+Interlingue development status and audited live Megillah UI.

### `spec-vs-law-hebrew-wording-candidates-2026-09-27.md`
Three staged Hebrew formulations of the specification/conformance versus legal-permission distinction; none is public/canonical yet.

### `redelivery-dynamic-display-plan-2026-09-27.md`
Implementation-ready design for a live Pastafarian representation of the fixed modern re-delivery event using the existing browser worker `convert` operation, while deliberately leaving event identity/current-day context to the corpus gate.


## 12. Early corpus reconciliation — opened 2026-10-03

### `about-early-reconciliation-2026-10-03.json`
Machine-readable P0 disposition against `source_revision 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`.

Scope: 57 tracked P0 items (56 registered claims + one newly discovered Seer terminology claim).

Current counts:
- MATCH: 4
- CHANGE: 4
- BLOCKED: 42
- NOT-CANON: 7

### `about-p0-early-reconciliation-2026-10-03.md`
Human-readable findings and staged future wording for the four already-closed CHANGE items.

Important current rule:
- explicitly adopted canonical material in the working corpus may already justify MATCH/CHANGE;
- sections 1–20 of the algorithm remain under formal review and therefore stay BLOCKED from final closure;
- canonical absence claims remain BLOCKED until whole-corpus freeze;
- no public semantic delta is applied merely because this early reconciliation exists.


## 13. Full /about/ early reconciliation continuation

### `about-p1-early-reconciliation-2026-10-03.json`
P1 semantic/product classification:
- CHANGE: 1
- BLOCKED: 3
- NOT-CANON: 9

The CHANGE finding is the unqualified public completeness claim `HAND_CALC.FULL_DETERMINISTIC`, because the working corpus explicitly retains `GAP-ASTRO-MODEL`.

### `about-p2-dependency-reconciliation-2026-10-03.json`
P2 theorem/empirical dependency classification.

Exact arithmetic checks:
- 47 × 123 = 5781 — PASS
- 5781 − 5778 = 3 — PASS

### `about-p3-p4-research-summary-reconciliation-2026-10-03.json`
Research/open-question classification plus summary deferral.

### `about-hebrew-staged-delta-from-corpus-2026-10-03.md`
Blob-guarded, staged-only Hebrew patch for the five current CHANGE findings. Not applied publicly.

### `EARLY_CANON_RECONCILIATION_CHECKPOINT_2026-10-03.md`
Current safe continuation checkpoint.

Aggregate early /about/ state:
- original claims: 84
- newly discovered claims: 1
- total: 85
- MATCH: 6
- CHANGE: 5
- BLOCKED: 48
- NOT-CANON: 26

The /about/ classification pass is therefore complete at the early-reconciliation level. Final closure of BLOCKED claims still requires the relevant corpus freeze.


## 14. Cross-surface early canon alignment — 2026-10-03

### `CROSS_SURFACE_EARLY_CANON_ALIGNMENT_CHECKPOINT_2026-10-03.md`
Current safe continuation checkpoint after the authority/terminology pass across /about/, Seer, App, Megillah/live cooking, FSM and all 60 independent implementation branches.

### `CROSS_SURFACE_EARLY_CANON_ALIGNMENT_2026-10-03.json`
Machine-readable surface matrix with live refs/HEADs, staged changes, preserved qualified uses of “canonical”, blocked items and apply gates.

### `CROSS_SURFACE_CANON_INVALIDATION_MAP_2026-10-03.json`
Records exactly which QA/testing surfaces an eventual delta invalidates and which it does not.

### `seer-early-corpus-alignment-delta-2026-10-03.md`
Staged-only Seer authority/terminology corrections. Live Seer `main` was inspected at `6f385e48ac0b0bd647d33705b2bb7bc54cded595`; no Seer repository edit was made.

### `app-live-early-corpus-alignment-delta-2026-10-03.md`
Staged-only App findings from live `main` `4e94b3e15f21294e0c573ee6c3552c52880de214`. In particular, the existing Venus numerical implementation and Kisurra fallback coordinate must not acquire canonical authority merely from implementation history while `GAP-ASTRO-MODEL` remains open.

### `megillah-live-cooking-early-corpus-alignment-2026-10-03.md`
Separates canonical textual-edition content from website/source-location provenance, preserves exact audited quotations, and closes the JavaScript+Interlingue month-8 prose anomaly as `Karshumav`.

### `fsm-early-corpus-reconciliation-2026-10-03.json`
All 15 existing FSM canon-decision items remain blocked from current canonical status in the nonfrozen corpus view. Prior explicit project approvals are preserved as historical decision evidence rather than silently discarded or promoted.

### `independent-implementations-early-corpus-alignment-2026-10-03.json`
Consolidated 60/60 README authority scan:
- unavailable: 0
- confirmed direct authority conflicts: 0
- normative oracle/reference terminology: 32
- `canonicalIndex` terminology: 45
- manual terminology review: 2
- concrete README change: 1 (`JavaScript+Interlingue` month 8)
- no direct authority conflict found: 57

Raw scan batches:
- `independent-readme-authority-scan-2026-10-03-b01.json`
- `independent-readme-authority-scan-2026-10-03-b02.json`
- `independent-readme-authority-scan-2026-10-03-b03.json`
- `independent-readme-authority-scan-2026-10-03-b04.json`

Global rule from this pass: **do not globally replace the word “canonical”**. Preserve domain-qualified uses such as `canonicalIndex`, API canonical presentation, App canonical domain state and canonical textual edition; change only uses that incorrectly assert calendar-semantic authority.
