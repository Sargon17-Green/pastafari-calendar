# App early corpus-alignment delta — 2026-10-03

Status: **STAGED ONLY — no App repository changes applied**

App repository:
- `Sargon-17-Green/Pastafarian-Calendar-App`
- live ref inspected: `main`
- HEAD: `4e94b3e15f21294e0c573ee6c3552c52880de214`

Corpus working input:
- `source_revision: 4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`
- whole corpus not frozen
- `rule.day.physical-boundary` remains unfinished and explicitly contains `GAP-ASTRO-MODEL`
- adopted authority rule: implementations do not acquire canonical authority merely by existing or being verified.

## CHANGE — the current numerical Venus implementation must not be described as canonical

Affected:
- `shared/temporal/.../VenusLowerTransitBoundaryModel.kt`
  - blob `9ec28e26df1e2790431ba0c79f308a8e30d32791`

Current source comment says:

> Frozen S0 current-day boundary model ported from the canonical 1.4.1 web implementation

and then presents the numerical topocentric Venus model.

This authority wording is no longer valid.

The working corpus says:
- the conceptual boundary is lower meridian passage of Venus's center at observer location;
- complete numerical projection is not yet defined;
- ephemeris, time scales, observer model, range, equality/error handling remain `GAP-ASTRO-MODEL`;
- **no implementation-specific approximation acquires canonical authority through this rule**.

Staged comment replacement:

> Frozen S0 product boundary model ported from the 1.4.1 web implementation. This is the App's current numerical approximation/profile for resolving the physical Pastafarian day. It is not a canonical numerical astronomy profile; final corpus alignment is pending GAP-ASTRO-MODEL adjudication.

No behavior change is authorized by this finding. This is authority/provenance correction only.

## CHANGE — Kisurra fallback coordinate is frozen product policy, not presently established canon

Affected:
- `shared/temporal/.../ReferenceLocation.kt`
  - blob `e8c3cb857fbbd5d45ef37ecc8a96069404fc8846`

Current invariant message/comment includes:

> Kisurra fallback must use the frozen canonical coordinate

The current corpus view contains no explicit canonical Kisurra/reference-location entry. Under `rule.corpus.transition`, there is no canonicality by silence.

Staged terminology:
- `frozen canonical coordinate` → `frozen App fallback coordinate` or `frozen S5 fallback coordinate`.

The actual coordinate `31.8383, 45.481, 0.0` is not changed by this staging pass.

## BLOCKED — physical boundary behavior itself

The App currently implements a concrete topocentric algorithm with:
- latitude;
- longitude;
- optional elevation;
- finite approximate year range;
- explicit numerical bracketing/refinement.

The corpus's conceptual rule is compatible in broad shape, but the numeric profile is intentionally unresolved.

Disposition:
- implementation may remain as product behavior;
- do not certify it as canonical;
- do not change the algorithm from this branch;
- when GAP-ASTRO-MODEL closes, perform a numerical/differential alignment pass.

## BLOCKED — Kisurra Hebrew form

Live Hebrew catalog:
- `localization/catalogs/he.json`
- blob `b3e53c00cc9519fd087f4717fb1982214098e23b`
- current form: `כישורא`

Main public Hebrew /about/ currently uses:
- `קיסורה`

The current corpus editing view does not contain an explicit Kisurra entry or Hebrew location form.

Therefore:
- the mismatch is real;
- neither form is selected as canonical here;
- keep this item BLOCKED until a canonical location form is adopted or an explicit product-localization decision is made outside canon.

## BLOCKED — numeric cutlet/month placeholders in Today

Live Hebrew:
`ws13.today.date` uses integer placeholders for `cutlet` and `month`.

This remains a presentation-alignment point because the calendar tuple uses period entities while canonical index is semantic identity and public display may use admitted names.

Do not change it yet because `rule.date` remains in the unfrozen algorithm formalization.

When closing:
- preserve indices internally;
- do not let localized names drive computation;
- decide whether the UI should display admitted names, indices, or both under the final rendering rules.

## MATCH / PRESERVE — overloaded App-domain uses of “canonical”

Do **not** globally rewrite:
- `WS09_CANONICAL_DOMAIN_CORE`;
- “canonical domain IDs”;
- “canonical repositories”;
- “canonical DayId/ChronoDay axis”;
- canonical reminder/job state;
- canonical localization catalog in the sense of designated App source.

These are application-domain/storage/source-of-record terms, not claims that the App defines calendar canon.

The existing audit trap remains valid.

## MATCH / PRESERVE — ordinary Week and Work Week

Live WS14 still separates:
- ordinary Day/Week/Work Week/Month/Year windows on DayId/ChronoDay;
- Pastafarian structural Month/Cutlet/Year views.

No calendar contradiction is created merely by offering a civil/product Week view.

The canonical-absence question for Pastafarian weeks itself remains BLOCKED until whole-corpus freeze.

## MATCH / PRESERVE — representation-only Calculation-Day override

WS13 still says Calculation-Day Override changes representation only and cannot rewrite physical DayId.

This is product architecture consistent with the current identity-vs-representation model. Final semantic closure still depends on the frozen algorithm, but no authority wording change is required now.

## PRESERVE — Seer binding boundary

`computation/seer-bindings/README.md` blob `3e33434ac18db94bf4a84c96133c0c79f7d7912d` correctly says the binding is infrastructure only and does not change calendar semantics.

No change.

## Apply gate

Do not modify App `main` from this workstream.

When downstream propagation is authorized:
1. re-fetch live App `main`;
2. re-diff the two source comments above;
3. apply terminology-only corrections first;
4. leave numerical astronomy behavior unchanged until GAP-ASTRO-MODEL is adjudicated;
5. separately resolve Kisurra spelling and Today name/index presentation;
6. rerun affected source/documentation tests plus temporal tests if any code comment/constant refactor becomes executable;
7. do not reinterpret App-domain “canonical” terminology as calendar-canon terminology.
