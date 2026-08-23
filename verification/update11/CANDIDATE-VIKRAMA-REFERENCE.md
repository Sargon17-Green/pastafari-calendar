# Update 11 — candidate Vikrama reference, deliberately non-normative

This note records a **candidate only**. It must not be imported by production and must not be treated as the project's source of truth.

## Candidate identified during the audit

A discriminator-compatible candidate exists in Edward M. Reingold's `calendar-code2` CALENDRICA implementation, commit:

`9afc1f3277b839db1a70c2350d6c708ac83df78f`

Relevant algorithm family in `calendar.l`:

- `hindu-lunar-era = 3044` — described there as years from Kali Yuga until Vikrama era;
- `hindu-lunar-from-fixed` — traditional Hindu lunar date, new-moon scheme;
- `fixed-from-hindu-lunar` — inverse conversion;
- `hindu-lunar-day-from-moment` — tithi from lunar phase in 12° sectors;
- `hindu-sunrise` — day assignment at Hindu sunrise;
- leap month from the zodiacal sign of consecutive new moons;
- leap/repeated tithi from equal tithi at consecutive sunrises.

For the Foundation discriminator supplied for Update 11, this family reproduces the candidate structured value:

```text
year       -41162
month      8 = Kārttika
leapMonth  false
tithi      16
leapTithi  false
```

## Why it is not being promoted to a normative reference

The checked repository **does contain** `sources/מגילת העיתים.md`. It supplies the Foundation anchor and explicitly states in footnote [^2] that the algorithm and version used are part of the date definition, while footnote [^7] says that multiple Hindu methods and rules exist. What it does **not** supply is the identity or complete formulas of the Hindu algorithm/version that produced the anchor. The anchor is sufficient to reject the existing Old Hindu converters, but not to distinguish every possible Vikrama convention that could share the same anchor.

Before production code is allowed, a project-normative source must settle at least:

- algorithm/version identity;
- epoch and year numbering;
- year start;
- amānta/pūrṇimānta convention;
- tithi-to-civil-day rule;
- leap-month and repeated/omitted-tithi semantics;
- negative-year/year-zero behavior;
- exact arithmetic/rounding constants.

This file is evidence of a plausible candidate, not authorization to implement it.
