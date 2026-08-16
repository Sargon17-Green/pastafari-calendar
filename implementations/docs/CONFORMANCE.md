# Conformance decisions

Binding source: [The Scroll of the Appointed Times](https://the-scroll-of-the-appointed-times.blogspot.com/2026/08/blog-post.html), published 11 August 2026.

## Ordered inputs

Every result is a function of `(calculation day, queried day)`.  The public APIs
usually place the queried day first for conventional converter ergonomics, but
the implementation always feeds the pair to the algorithm in the binding order.

## Year maximum: 5,778

The prose contains `5,781` once.  Footnote 13 explicitly identifies that value
as an error and establishes 5,778 as binding.  The existence proof independently
forces the same number:

```text
six gate gaps × maximum 963 days per gap = 5,778 days
```

The `5778_boundary_*` conformance vectors are not cosmetic.  For calculation JDN
`-14,269,936` (Gregorian `-43782-02-21`), a 5,779-day candidate exists.  Admitting
it changes the result from:

```text
5000, מחשבה, 1, ארידו, 93
```

to the non-conforming:

```text
5000, חיטה, 508, ערפל, 72
```

## Exact integer semantics

- `keep(x) = ((x - 1) mod (2^127 - 1)) + 1`, with a non-negative remainder.
- Proleptic Gregorian division is floor division, including negative years.
- All ranks and combinatorial counts are arbitrary-precision integers.
- The five output fields retain the binding order: year, cutlet name,
  day-in-cutlet, month name, day-in-month.

## Optimizations that preserve the selected object

Gate checkpoints store exact `(gate index, JDN)` pairs generated from the gate
rule.  Traversal from a checkpoint applies every intervening gate distance; a
checkpoint therefore changes cost, not semantics.

Month lengths are unranked lexicographically by counting bounded-composition
suffixes.  Month weaves are unranked from left to right.  At each prefix the
dynamic program counts the complete, contiguous lexicographic block beneath
each legal next month.  Subtracting whole blocks is therefore exactly equivalent
to constructing and indexing the impossible explicit list described by the
Scroll.

## Practical distance cost

The specification requires walking year by year from year 5000.  The
implementations cache that walk and reuse year structures, but do not invent a
non-equivalent jump function.  A queried day thousands of calendar years from
the calculation day can consequently take much longer than a nearby day.
