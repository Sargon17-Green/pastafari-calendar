# Seer early corpus-alignment delta — 2026-10-03

Status: **STAGED ONLY — no Seer repository changes applied**

Seer repository:
- `Sargon-17-Green/Pastafarian-Calendar-Seer`
- live ref inspected: `main`
- HEAD: `6f385e48ac0b0bd647d33705b2bb7bc54cded595`

Corpus working input:
- `Pastafarian_Canon_Draft_for_Editing.md`
- `source_revision: 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`
- whole corpus not frozen
- explicit adopted rules used here:
  - `rule.corpus.transition`
  - `rule.megillah.editions`
  - `rule.implementation.standardness`
  - `rule.vectors.adoption`
  - `rule.names.identity`
  - `rule.locale.rendering`

## Disposition summary

### CHANGE — authority referent

Affected current files:
- `README.md` blob `274a22b20f67705d13d1fe0f192a6d788d8f73f0`
- `docs/CONFORMANCE.md` blob `e7b9bcd5ea6e0286a7f8bdf0dd485d79e2ae9527`
- `docs/TERMINOLOGY.md` blob `b53578966235cb761d8e1c097c83303769ee3ef4`
- `docs/RELATION_TO_THE_MONSTER.md` blob `a7305f8b8281741256d65f7ac47ac0cd4fbed833`
- `docs/PUBLIC_API_ARCHITECTURE.md` blob `0d93a118fb01f245d647d1dfa4ab027b07674016`

Current recurring claims include:
- “The current Scroll defines the calendar”
- “The current Scroll is the supreme semantic authority”
- “Scroll — The normative specification ... defines the answer”
- “normative specification/reference” as the deciding semantic source
- “Calendar semantics remain governed by the canonical calendar authority **and the verified Seer implementation**”

These no longer fit the adopted corpus authority model.

Staged semantic replacement rule:

> The final canonical corpus is the exhaustive source for canonical content. The canonical algorithm specified/adopted by that corpus determines the required calendar result. The Seer is an implementation/product and is not a semantic authority. Canonical Scroll editions remain canonical textual editions, but no Scroll edition is the sole or supreme authority over the corpus.

For `PUBLIC_API_ARCHITECTURE.md`, remove the implication that the verified Seer implementation co-governs calendar semantics. The Seer may govern its own implementation/service contract, never calendar meaning.

## MATCH — Seer non-authority / nonstandard status

Keep the architectural distinction that Seer is not normative authority.

The corpus gives stronger wording:
- implementations are not parallel canonical sources;
- `rule.implementation.standardness` explicitly says **Seer is not standard**.

Therefore the public project distinction “Seer is not authority” remains valid.

Do not rewrite this into “Seer is a standard implementation that uses shortcuts”. The adopted rule explicitly says otherwise.

## CHANGE — test vectors and generated corpora must not be called canonical merely because they exist

Affected current files:
- `docs/CONFORMANCE.md`
- `docs/DATA_PROVENANCE.md` blob `4741f679ee654979866a110ab0c9f6aa04be8e2d`
- README references to “canonical vectors” where they mean checked-in fixtures.

Current terminology includes:
- “canonical vectors”
- “positive canonical gate gaps”
- “canonical saved-sum ... corpus”
- “canonical baseline”

Adopted `rule.vectors.adoption` says:
- a vector or vector set becomes canonical only by explicit adoption;
- existence as a test, computed output, repository file or release asset does not adopt it.

The current corpus view also states that existing vectors have no canonical status.

Staged terminology:
- `canonical vectors` → `reference vectors` / `conformance fixtures`
- `canonical gate corpus` → `algorithm-derived exact gate corpus` / `reference gate corpus`
- `canonical baseline` → `current verified reference baseline` where the object is a generated fixture rather than adopted canon.

Do **not** rename canonical algorithm constants or canonical indices: those are different concepts.

## CLARIFY — localization is computationally presentation-only, but admitted linguistic forms may themselves be canonical/standard

Affected:
- `README.md`
- `docs/LOCALIZATION.md` blob `7979c5945f5a1000e2c09e6950327026433a9f7e`

Current:
> Localization is presentation-only.

This is safe only as an implementation invariant: locale must not alter the mathematical result.

It is too broad as a canon statement because `rule.names.identity` and `rule.locale.rendering` allow explicitly admitted linguistic forms and grammatical/rendering rules to have canonical/standard status.

Staged clarification:

> Localization is presentation-only with respect to calendar computation and semantic indices. Whether a displayed linguistic form is standard is determined by the canonical corpus and its admitted language rules.

The Hebrew pack's current `properNamePolicy: "english-retained"` should remain unchanged until the corpus language catalog is extracted and mapped. Do not guess Hebrew names from the public Scroll or from another implementation branch.

## PRESERVE — `presentation: "canonical"`

No change.

In Seer this is an API-format term meaning language-free machine-oriented coordinates/indices. It does not assert semantic authority.

Likewise preserve:
- canonical BCP 47 casing;
- canonical decimal-string grammar where defined as a serialization term;
- canonical hostname/origin terminology in the hosted-service layer;
- canonical index terminology.

These are domain-qualified technical meanings, not calendar-authority claims.

## BLOCKED — Monster/liturgical theology

Affected:
- `docs/RELATION_TO_THE_MONSTER.md`
- `NOTICE.md` blob `8cea4a35348786b76ac1c24bd58cc99eb4376b72`
- portions of `README.md` such as “reenacting the Monster's liturgy”.

Claims such as:
- “The Monster does not authorize this shortcut”
- “The Monster requires those answers to be obtained [through the prescribed liturgy]”
- “The Monster performs. The Seer sees. The Monster does not approve.”

were **not** located as explicitly adopted theology in the current nonfrozen corpus view.

Disposition: **BLOCKED**, not rejected.

Do not delete or rewrite them merely from corpus silence. Reconcile when/if the frozen corpus contains explicit FSM theology. The MIT-license paragraph in `NOTICE.md` is ordinary legal/project text and does not depend on canon.

## Staged replacements

### README authority paragraph

Current:
> The Seer is **not normative**. The current Scroll defines the calendar; if the Seer disagrees with it, the Seer is wrong.

Candidate:
> The Seer is **not a canonical authority**. Canonical calendar meaning is defined by the canonical corpus and the algorithm it adopts. If the Seer returns a result that conflicts with the result required by that corpus, the Seer is wrong.

### CONFORMANCE source-of-truth opening

Candidate:
> The Seer does not define the Pastafarian Calendar. The canonical corpus is the authority for canonical calendar meaning. Reference/oracle code and checked-in fixtures are verification tools; they do not become canonical merely by matching one another or by being stored in this repository.

### TERMINOLOGY — Scroll

Candidate:
> **Scroll** — an admitted canonical textual edition when its edition entry says so. A Scroll edition is not the exhaustive authority over the final corpus, and admitted editions do not form an automatic hierarchy.

### PUBLIC_API_ARCHITECTURE authority boundary

Candidate principle:
> Calendar semantics remain governed solely by the canonical corpus/canonical algorithm. The verified Seer implementation governs implementation behavior only to the extent of its own service/API contract.

## Apply gate

Do not modify Seer `main` from this workstream.

When propagation is authorized:
1. re-fetch live Seer `main`;
2. blob-guard or re-diff every affected file;
3. update authority terminology consistently in one pass;
4. preserve API-domain uses of `canonical`;
5. rename only fixture/vector uses lacking explicit canonical adoption;
6. run documentation/API-schema checks and any tests that assert literal documentation/metadata strings;
7. do not treat this terminology patch as proof that Seer is algorithmically conformant.
