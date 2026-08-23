# Vikrama source lock — CALENDRICA 4.0 traditional Hindu lunar calendar

This file is the normative Update 11 addendum that locks the algorithm/version required to interpret the Vikrama representation in Magillah footnote [^7]. The Magillah remains the source of the Foundation expected value and is deliberately left byte-for-byte unchanged so the unrelated authoritative-engine oracle provenance is not rewritten by an external-calendar clarification.

It does **not** claim that the original Foundation conversion can be historically traced to this source. The earlier Magillah supplied an exact Foundation discriminator but did not identify the algorithm/version that produced it. Update 11 resolves that underspecification by selecting and pinning the model below as the project convention from this point onward. This is an explicit normative selection made now, not a recovered claim about the historical provenance of the original anchor.

## Pinned source

- Model: CALENDRICA 4.0, traditional Hindu lunisolar calendar, new-moon scheme.
- Authors: Edward M. Reingold and Nachum Dershowitz.
- Reference implementation: `EdReingold/calendar-code2`, `calendar.l`.
- Pinned commit: `9afc1f3277b839db1a70c2350d6c708ac83df78f`.
- Pinned blob for `calendar.l`: `2e4ad0f58ac52cb5fd497aa97b2b9ffe57ec623d`.
- Upstream code identifies itself as `CALENDRICA 4.0 -- Common Lisp`, last modified 20 December 2016, and is licensed Apache-2.0.

The normative function family is `hindu-lunar-from-fixed` / `fixed-from-hindu-lunar`, together with the helper functions and constants they call in that pinned file. The project MUST NOT silently substitute `old-hindu-lunar-from-fixed`, `hindu-fullmoon-from-fixed`, `astro-hindu-lunar-from-fixed`, a Lahiri/astronomical variant, or a host calendar service.

## Calendar convention

- Era displacement: `hindu-lunar-era = 3044` years from Kali Yuga to the Vikrama era.
- Scheme: traditional/true Hindu **lunisolar**, **new-moon (amānta) scheme**.
- Month numbers are `1..12`: Caitra, Vaiśākha, Jyaiṣṭha, Āṣāḍha, Śrāvaṇa, Bhādrapada, Āśvina, Kārttika, Mārgaśīrṣa, Pauṣa, Māgha, Phālguna. Thus Kārttika is month `8`.
- The civil-day tithi is the 12-degree lunar-phase sector at the source-locked Hindu sunrise for that fixed day at Ujjain.
- A leap/repeated tithi is present when the tithi at that day's sunrise equals the tithi at the previous day's sunrise.
- Lunar month identity is determined from the solar zodiac at the preceding new moon; a leap month occurs when the preceding and following new moons fall in the same zodiacal sign.
- The year rule is exactly the pinned `hindu-lunar-from-fixed` rule, including its `month <= 2 ? date + 180 : date` year probe and subtraction of `3044`.
- Signed integer years in this project include year `0`, as already specified by Magillah footnote [^11].

## Arithmetic semantics

The implementation must preserve the pinned CALENDRICA arithmetic semantics:

- mathematical modulo is non-negative for a positive modulus;
- `quotient` is floor division, not truncation toward zero;
- `mod3(x,a,b)` maps to `[a,b)`;
- `amod(x,n)` maps multiples of `n` to `n`, not to zero;
- Common Lisp `round` semantics are nearest integer with ties to even;
- the Hindu sine table, interpolation, mean/true-position constants, anomalistic periods, equation-of-time approximation, Ujjain coordinates, sunrise rule, new-moon search, zodiac rule and tithi rule are taken from the pinned source exactly in semantic meaning;
- JavaScript `%` must not be used as mathematical modulo for negative operands without normalization.

The public absolute-day coordinate is integer JDN. CALENDRICA fixed day / Rata Die is related by:

```text
JDN = fixed + 1,721,425
fixed = JDN - 1,721,425
```

## Foundation discriminator

The selected source lock reproduces the existing Magillah anchor:

```text
Foundation fixed = -15,055,671
Foundation JDN   = -13,334,246
Vikrama year     = -41,162
month            = 8 / Kārttika
leapMonth        = false
tithi            = 16
leapTithi        = false
```

Foundation is a discriminator and regression anchor, not a fixture-only algorithm.

## Reverse conversion

A conforming implementation may implement `Vikrama -> absolute day` either by the pinned `fixed-from-hindu-lunar` procedure or by an exact bounded inversion of the pinned forward mapping, provided all five structured fields (`year`, `month`, `leapMonth`, `tithi`, `leapTithi`) are matched and non-existent/ambiguous representations are not guessed.

The production Update 11 implementation deliberately uses a bounded local inversion around a CALENDRICA-derived estimate, because this also makes repeated and omitted tithi explicit and testable. It must never scan linearly across millennia.

## Change control

Changing the pinned commit, choosing another Hindu calendar family, changing the sunrise/tithi/month/year rules, or changing the arithmetic constants is a normative calendar change and requires an explicit future specification update. A newer or more astronomically accurate algorithm is **not** automatically a valid replacement.
