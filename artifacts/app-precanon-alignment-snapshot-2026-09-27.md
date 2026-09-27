# Pastafarian Calendar App — pre-canon alignment snapshot
Captured: 2026-09-27 13:xx +03:00
Status: inventory only; do not modify the App from this workstream

## Live App state inspected

Repository:
`Sargon-17-Green/Pastafarian-Calendar-App`

Current `main` at inspection:
`f5216db9373d674a47c48930a63174ca813b9401`

Commit message:
`Merge WS14 local calendar expansion for Android track`

Important correction to the earlier inventory:
- the previously inspected `ws/WS04-design-system-code-foundation` snapshot is now **351 commits behind current main**;
- future canon alignment must start from the then-current live App ref, not from WS04.

## Canon-sensitive current contracts

### 1. Day identity versus Pastafarian representation

Current file:
`shared/application/.../PastafarianRepresentationProvider.kt`

The code explicitly models:

`P(c,t)`

as a **representation, never day identity**.

It separately stores:
- actual physical `DayId`;
- calculation-day argument;
- target-day argument;
- year / cutlet / month representation.

This matches the existing conceptual separation and is a strong architectural boundary to preserve unless the corpus explicitly changes it.

### 2. Calculation-Day Override

`RepresentationContext` says an override selects only the `c` argument for `P(c,t)`.

It does not:
- change the physical day;
- rewrite the target DayId.

`TodayServiceTest` executes this invariant.

Future alignment should compare this semantic rule to the corpus, not infer it from UI labels alone.

### 3. Physical “Today” and Venus boundary

Current file:
`shared/temporal/.../VenusLowerTransitBoundaryModel.kt`

Current implementation states:
- a physical Pastafarian day changes at the topocentric lower meridian transit of the **center of Venus** at the reference location;
- civil midnight is only a numerical seed and not the boundary;
- model ID/version: `venus-lower-transit-jpl-approx-1`;
- current approximation domain: about 3000 BC through 3000 AD;
- internal Foundation JDN: `-13_334_246`.

The code says it was ported from:
`pastafari-calendar@be6f99a9cd2a9a8fade806f1207326355bed2b0c`.

Future alignment must separate:
- **canonical boundary semantics** (what event defines the day);
- **product approximation/model version and numerical domain** (how the App estimates it).

The latter is implementation behavior, not automatically canon.

### 4. DayId encoding

Current App domain describes `DayId` as “Canonical Pastafarian day identity”.

The temporal layer implements a positive-integer zig-zag encoding around Foundation:
- Foundation chrono offset 0 → DayId `1`;
- positive/negative chrono offsets map into positive IDs;
- ordering/arithmetic live outside the opaque `DayId` type.

This is a product/domain identity encoding.

Future corpus alignment must determine whether “canonical” here means:
- canonical **App storage/domain encoding**, or
- a project-wide canonical calendar identifier.

Do not assume those are the same merely because the comment uses the word `Canonical`.

### 5. Structural Pastafarian views

Current WS14 design says:
- Pastafarian Month / Cutlet / Year boundaries depend on representation context because `P(c,t)` depends on fixed calculation day `c`;
- woven month members must not be assumed chronologically adjacent;
- structural scanners preserve one `RepresentationContext` while varying only target day `t`.

Current files:
- `CalendarStructuralViews.kt`
- `CalendarStructuralViewport.kt`
- `WS14_LOCAL_CALENDAR_EXPANSION.md`

This is highly canon-sensitive semantic behavior and must be checked against the future corpus.

### 6. All-day identity

Current App domain distinguishes:
- `PastafarianDaySpan`;
- `CivilDaySpan`;
- timed absolute/zoned/floating anchors.

This separation should be checked against the corpus's treatment of Pastafarian all-day events and physical-day boundaries.

### 7. Seer boundary

Current App `main` still treats Seer as a representation provider, not day identity.

Android currently pins:
- Seer package `0.2.5`;
- source commit `838cec0c50e7137409d0c4ed49c8dc288a8417fc`;
- ABI `1`.

The native mobile ABI uses signed 64-bit JDNs and returns signed 64-bit years.
The broader App DayId identity is arbitrary-precision; the adapter explicitly returns an unavailable/failed provider result when a valid DayId cannot be represented by the native JDN ABI.

This is an intentional provider-domain boundary, not proof that the calendar itself is bounded to signed 64-bit days.

## Current Hebrew/English public strings in the App

Current hand-authored locale files:
- `localization/catalogs/he.json` blob `6b5125a7f81ce91a5a2c2ab63c450bb099d080ee`;
- `localization/catalogs/en.json` blob `953a42599fd7a760c9096bf3f5f3726f2b1ffd6d`.

Canon-sensitive or terminology-sensitive visible strings now include:
- “יום המעשה” / “Calculation day”;
- “היום הפיזי” / “Physical day”;
- “מודל גבול היום” / “Day-boundary model”;
- “מיקום ייחוס” / “Reference location”;
- five-field Pastafarian date rendering;
- Cutlet;
- Pastafarian month/year/year map.

The App now has materially more visible calendar content than the old WS04 snapshot. Therefore current-main localization must be part of the later corpus delta.

## Terminology traps

The App uses `canonical` in several product-internal senses:
- canonical domain IDs;
- canonical repositories;
- canonical DayId text/encoding;
- canonical build/test evidence.

Do not globally replace the word `canonical` during corpus migration.

Each use needs classification:
- project/calendar canon;
- product's preferred stable encoding;
- build/evidence identity;
- persistence identity.

## Safe action now

No App code change is justified merely by the authority transition.

Safe now:
- keep this exact snapshot as a migration baseline;
- inventory the live semantic contracts;
- identify corpus-sensitive versus implementation-only decisions.

Actual edits wait for a pinned corpus and should occur in the App's own active workstream, not on this content-preparation branch.
