# /about/ full-localization rollout ledger

Baseline commit: `f7a3d1feca145f1a3d98080117859dd870afa8ef`  
Working branch: `feature/about-i18n-72-locales`  
Semantic master: `docs/about/content/he.html` from the baseline commit above.  
Rule: semantic equivalence without textual isomorphism; English is not a pivot language.

## Locale snapshot

The authoritative locale set is the `LOCALES` array in `docs/i18n/registry.js` at the baseline commit. It contains 72 locales.

| code | Intl locale | dir | site support | article status |
|---|---|---|---|---|
| he | he-IL | rtl | complete | semantic master / existing |
| en | en-US | ltr | complete | draft |
| af | af-ZA | ltr | partial | not started |
| ar | ar | rtl | partial | draft |
| az | az-AZ | ltr | partial | not started |
| be | be-BY | ltr | partial | not started |
| bg | bg-BG | ltr | partial | not started |
| bn | bn-BD | ltr | partial | not started |
| bs | bs-BA | ltr | partial | not started |
| ca | ca-ES | ltr | partial | not started |
| cs | cs-CZ | ltr | partial | not started |
| da | da-DK | ltr | partial | draft |
| de | de-DE | ltr | partial | draft |
| el | el-GR | ltr | partial | not started |
| eo | eo | ltr | partial | not started |
| es | es-ES | ltr | partial | draft |
| et | et-EE | ltr | partial | not started |
| fa | fa-IR | rtl | partial | draft |
| fi | fi-FI | ltr | partial | draft |
| fil | fil-PH | ltr | partial | not started |
| fo | fo-FO | ltr | partial | not started |
| fr | fr-FR | ltr | partial | draft |
| fy | fy-NL | ltr | partial | not started |
| gl | gl-ES | ltr | partial | not started |
| gu | gu-IN | ltr | partial | not started |
| ha | ha-NG | ltr | partial | not started |
| hi | hi-IN | ltr | partial | not started |
| hr | hr-HR | ltr | partial | not started |
| ht | ht-HT | ltr | partial | not started |
| hu | hu-HU | ltr | partial | not started |
| hy | hy-AM | ltr | partial | not started |
| id | id-ID | ltr | partial | not started |
| is | is-IS | ltr | partial | not started |
| it | it-IT | ltr | partial | draft |
| ja | ja-JP | ltr | partial | draft |
| jv | jv-ID | ltr | partial | not started |
| ka | ka-GE | ltr | partial | not started |
| kk | kk-KZ | ltr | partial | not started |
| ko | ko-KR | ltr | partial | draft |
| lb | lb-LU | ltr | partial | not started |
| lt | lt-LT | ltr | partial | not started |
| lv | lv-LV | ltr | partial | not started |
| mk | mk-MK | ltr | partial | not started |
| mr | mr-IN | ltr | partial | not started |
| ms | ms-MY | ltr | partial | not started |
| nb | nb-NO | ltr | partial | draft |
| ne | ne-NP | ltr | partial | not started |
| nl | nl-NL | ltr | partial | draft |
| nn | nn-NO | ltr | partial | not started |
| pa | pa-IN | ltr | partial | not started |
| pl | pl-PL | ltr | partial | not started |
| pt | pt-BR | ltr | partial | draft |
| ro | ro-RO | ltr | partial | not started |
| ru | ru-RU | ltr | partial | draft |
| sk | sk-SK | ltr | partial | not started |
| sl | sl-SI | ltr | partial | not started |
| so | so-SO | ltr | partial | not started |
| sq | sq-AL | ltr | partial | not started |
| sr | sr-Latn-RS | ltr | partial | not started |
| sv | sv-SE | ltr | partial | draft |
| sw | sw-TZ | ltr | partial | not started |
| ta | ta-IN | ltr | partial | not started |
| te | te-IN | ltr | partial | not started |
| th | th-TH | ltr | partial | not started |
| tr | tr-TR | ltr | partial | not started |
| uk | uk-UA | ltr | partial | draft |
| ur | ur-PK | rtl | partial | draft |
| uz | uz-UZ | ltr | partial | not started |
| vi | vi-VN | ltr | partial | not started |
| yo | yo-NG | ltr | partial | not started |
| zh | zh-CN | ltr | partial | draft |
| zu | zu-ZA | ltr | partial | not started |

Status progression for target locales: `not started → draft → semantic QA → linguistic QA → integrated → rendered → PASS`.

## Native-language whole-site QA policy

The final linguistic QA is intentionally a separate phase and will run on a dedicated branch forked from the completed translation branch, tentatively `qa/about-i18n-native-language-audit`.

For every one of the 72 supported locales, run a separate QA conversation/session whose working language, instructions, findings and proposed edits are written in the locale being audited. The reviewer must inspect the **whole rendered site in that locale**, not only `/about/`.

Each locale review must actively look for:
- text that is wholly or partly in another language, including English fallback leakage;
- grammatical, idiomatic or stylistic text that sounds translated, stiff, unnatural or locally non-native;
- inconsistent terminology between the article, controls, calendar labels, errors, reverse-search UI and metadata;
- wrong script, punctuation, quotation conventions, capitalization, spacing, plural behavior, numerals or date-expression conventions;
- RTL/BiDi defects around formulas, Latin identifiers, numbers and inline code where relevant;
- truncation, overflow, awkward wrapping, broken tables or controls caused by the localized text;
- untranslated accessibility text, ARIA labels, title/meta text, manifest strings, noscript text and error/fallback states.

The per-locale session must not approve a locale merely because all strings are technically translated. Approval requires natural prose and a coherent single-language experience across the site. Canonical identifiers, formulas, hashes, API names and intentionally untranslated technical literals remain exempt.

A locale can move from `semantic QA` to `linguistic QA` only after the structural/semantic invariant suite passes; it can move to `PASS` only after its native-language whole-site review and rendered smoke check are clean.

## Stable deep-link contract

These 29 IDs are public API and MUST be identical in every article resource:

`about-calendar`, `date-parts`, `working-day`, `day-identity`, `year-5000`, `years-and-gates`, `cutlets`, `months-and-weaving`, `month-interleaving`, `next-day-in-month`, `no-weeks`, `canonical-names`, `month-day-pairs`, `calculation`, `short-and-wide-choice`, `structural-atlas`, `anniversaries`, `appointments`, `travel-and-all-day`, `day-boundary`, `printed-calendar`, `seer`, `foundation-and-tablets`, `anchors`, `site-story`, `reverse-conversion`, `far-time-structure`, `sauce-history`, `summary`.

Hierarchy is also invariant: `anchors` and `site-story` are level-3 subsections inside `foundation-and-tablets`; `far-time-structure` is a level-3 subsection inside `reverse-conversion`; the remaining TOC sections are level 2. `about-calendar` is the lead and is not a TOC section.

## Semantic invariant ledger

The following facts, distinctions and epistemic qualifications must survive every translation.

### Core date semantics
- The date is a two-day function `F(c,t)`, not `F(t)`.
- `c` is the day of working / calculation day; `t` is the queried / target day.
- The same `t` may receive a different Pastafari representation under a different `c`.
- A Pastafari date has exactly five fields: year number; cutlet name; day in cutlet; month name; day in month. Adjacent metadata is not a sixth field.
- Chronological day identity is distinct from Pastafari representation. `day-id` is a stable chronological identity; changing the display/calculation context must not move the event/day itself.
- `F(c_1,t)` and `F(c_2,t)` need not be equal.

### Year 5000 and direction
- If `c=t`, the year is always `5000`.
- Year 5000 is relative to the day of working, not a fixed historical interval.
- Other days in the same selected year are also in year 5000; therefore year 5000 does NOT imply `t=c`.
- `Y>5000 ⇒ t>c`; `Y<5000 ⇒ t<c`.
- Year 0 exists; farther into the past there are negative-numbered years.

### Years, gates, cutlets and months
- Canonical year-length bounds: 252 through 5778 days. These are specification bounds, not empirical averages.
- Year and cutlet boundaries use gates.
- Each year has 6–17 cutlets.
- A cutlet is chronologically contiguous; its length is at least 42 days.
- There are 17 canonical cutlet names and no cutlet-name repetition within a year; the name does not determine length or position.
- Each year has 3–47 structural months.
- Each month has 4–123 assigned days.
- A month need not be chronologically contiguous. “Day in month” is the ordinal occurrence of that month in the year, not elapsed chronological days since its first occurrence.
- Month weaving has structural constraints on first/last appearances, but no rule that one month must end before another begins.
- Cutlets and months are two coordinate systems over the same days; neither subdivides the other.
- The next numbered day of a month is the next occurrence of that month and need not be tomorrow.
- The current canonical specification defines no week system.
- There are 17 canonical cutlet names and 47 canonical month names. Canonical semantic identity is primary; localized spellings/translations are display layers.
- There are `47×123=5781` syntactically possible (month name, day-in-month) pairs; a year of length `L` realizes exactly `L` of them; `L≤5778`; therefore at least `5781-5778=3` possible pairs are absent from every year.

### Sauce / calculation
- The internal calculation is called the sauce in the article.
- `Q=2^127-1` and it is prime.
- The process description includes five input counters, 7 hidden drops, 46 visible drops, 6 bowls, varying bowl orders, 12 final stirs, answer seals, combinatorial choices, gate generation, year selection, cutlet partitioning, name selection, month creation and month-day weaving.
- Final updates are synchronous: all six new bowl values are computed from the same old state before replacement.
- In final stir `r`, with old-bowl sum `S`, compute `R=SAVE(S+149r)`. `R`, not raw `S`, is used both for bowl-order choice and the internal stir update.
- Older examples using raw `S` inside that update are obsolete unless reverified.
- After the stirs, the answer ring continues in the order locked at visible drop 46; do not silently replace it with the order of the last stir.
- `Short Choice` uses rejection sampling to avoid simple modulo bias.
- `Wide Choice` is NOT equivalent to drawing independent uniform base-`Q` digits until an index is obtained; equal positive probability for every legal option must not be inferred, and sufficiently large spaces can contain legal but unreachable options.
- The calendar is fully deterministic; “choice” names algorithmic stages, not runtime randomness.

### Structural Atlas: empirical, not canonical law
- Engine commit: `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.
- Corpus: 4,096 days of working; years 4990–5010 for each; 86,016 year structures; 625,437 cutlets; 3,535,422 structural months; >356 million contiguous month runs; >364 million transitions from month day `n` to `n+1`.
- Measured table values must be preserved exactly in mathematical value:
  - mean year length 4,275.182 days; median 4,343; observed min/max 716 / 5,778;
  - mean cutlets/year 7.271; exactly 6 cutlets 42.00%; 6–8 cutlets 81.29%; mean cutlet length 587.963 days; median 560;
  - mean months/year 41.102; median 43; exactly 47 months 15.63%; at least 45 months 36.81%; mean structural-month length 104.014 days; median 115;
  - mean contiguous runs/month 100.897; one-day month runs 97.482%; adjacent days in same month 2.9976%; mean foreign days between `n` and `n+1` 40.408; mean first-to-last month span 4,266.653 days.
- Additional sampled means: ordinary year ≈4,262 days; day-weighted mean ≈4,466; self year 5000 ≈4,499.
- The name/length association was very weak in the sample; this is not a proof of independence.
- The 86,016 year structures contain only 24,786 distinct start/end gate intervals; samples are not fully independent. Do not turn the atlas into a global probabilistic theorem.

### Anniversaries
- “Same day every year” needs an explicit recurrence definition.
- Natural recurrences include same (month name, day in month), same (cutlet name, day in cutlet), or combined constraints.
- This is not simply `RRULE:FREQ=YEARLY`; the next qualifying Pastafari year must be searched.
- The original event is not automatically counted as its next occurrence.
- Changing day of working for display must not change identity, birth instant or age.
- Empirical scan: 4,096 self-dates; every successive Pastafari year forward and backward up to 250,000 years in each direction.
- Month-coordinate recurrence: median 1 Pastafari year; 77.56% in adjacent year; 93.77% within 2; 99.44% within 5; observed max 21 years.
- Cutlet-coordinate recurrence: median 3 years; 88.89% within 10; heavy tail; observed max 51,954 Pastafari years.
- These are corpus results, not a proof that every possible anniversary must recur and not a maximum-wait guarantee.

### Events, travel and day boundary
- A meeting scheduled only by Pastafari date requires at least the five-field tuple and the day of working; storing the latter as a stable day identity is preferable to the word “today”.
- “tomorrow”, “next day in month”, “end of month”, “whole month”, and “next year” have distinct semantics described in the article.
- Important events may additionally store an absolute chronological day/instant.
- Event identity is distinct from the local label shown for it.
- Travel does not move a scheduled event in time, but the local Pastafari date shown at that instant may change with location.
- Civil all-day is usually civil-midnight to civil-midnight; Pastafari all-day is local Pastafari day-boundary to next local Pastafari day-boundary. These are generally not the same instants.
- Local Pastafari day does not change at midnight. Boundary = topocentric lower meridian transit of the center of Venus at the local meridian.
- The boundary is location-dependent, not set by civil time zone, is not changed merely by DST toggling, and does not require Venus to be visible.
- Same physical instant can lie on opposite sides of the local boundary at two locations.
- Product fallback observer location when no usable user location is available: Kisurra.

### Printed calendars and Seer
- A printed calendar is valid relative to a stated day of working and may need replacement when `c` changes.
- Hand calculation is possible because the specification is complete and deterministic.
- `Pastafarian Calendar Seer` is a fast engine beside the canonical implementation; it is not an authority source.
- If Seer and the Scroll/canonical calculation disagree, Seer is wrong.
- At the live verification reflected by the article, Seer supports date, now, batch, ranges, reverse conversion, year structure, active-working-day resolution, Node API, browser/HTTP client, CLI, HTTP v1, OpenAPI 3.1, native/distribution packages and verified container deployment.
- The old claim that Seer has no public API is false. Explicit stable HTTP v1 endpoints include date, range, batch, year, reverse, working day, metadata, locales and status.
- A public HTTPS deployment on Render was actually tested on 21 September 2026 for exact queries, large range, restart, cold wake and load behavior.
- Project docs still distinguish public beta/evaluation deployment from a permanent hosted production service with SLA. Do not freeze a server URL, host provider or version number as calendar doctrine.
- Seer may use precomputation, special representations, SIMD, algebra and shortcuts, provided semantic operation and answer match the canonical calculation.

### Fixed anchors vs site story
- Foundation Day is a fixed computational reference, not “the beginning of time”.
- In the proleptic Gregorian calendar: 22 December 41,222 BCE.
- Foundation-day positive odd/even encoding: Foundation Day=1; following days 3,5,…; preceding days 2,4,6,…, avoiding negative day numbers in that counter.
- Tablets Day: 15 June 763 BCE proleptic Julian = 7 June 763 BCE proleptic Gregorian.
- Exact Foundation→Tablets distance: `14{,}777{,}149` days.
- These anchors are fixed chronological identities; their displayed Pastafari date still depends on the day of working.
- The site story presents the calendar as part of creation and later modern re-delivery; narrative details must not be promoted to technical claims of the Scroll.
- The re-delivery event is chronologically fixed; its displayed Pastafari date should be computed dynamically under the current day of working.

### Reverse conversion and far-time structure
- With known `c` and a known Pastafari year, (cutlet name, day in cutlet) identifies at most one day; likewise (month name, day in month) identifies at most one day. A full Pastafari date with known `c` therefore identifies the target day uniquely.
- Coarse maximum candidate counts inside a known year:
  - no non-year field: 5,778;
  - cutlet name only: 5,568;
  - day in cutlet only: 17;
  - month name only: 123;
  - day in month only: 47;
  - cutlet name + day in cutlet: 1;
  - month name + day in month: 1;
  - any three non-year fields: 1;
  - all four non-year fields: 1.
- Without `c`, the same full five-field date can occur under different working days and at different distances; in year 5000 the sign of distance is not always determined by the tuple.
- Derived mathematics: for fixed `c`, sufficiently far in the past tail there is exact affine periodicity. If `F(c,t)=(Y,K,d_K,M,d_M)`, then for that `c` there exist `H_c`, `p_c`, and a sufficiently remote threshold such that `F(c,t-H_c)=(Y-p_c, K, d_K, M, d_M)`.
- This is a fixed-`c` theorem and does NOT establish a global `F(c+T,t+T)=F(c,t)`.
- Whether the final asymptotic slope actually varies between different days of working remains open.

### Sauce-history research: derived results, not added calendar rules
- On visible stages 3–46, generic injectivity on the relevant asymptotic branch is established.
- For the first five final stirs after visible drop 46, generic invertibility on the relevant canonical union is established without extra side information.
- For remaining stirs, strong constructive upper bounds are known for sufficient side information.
- Whether the final six bowls alone are always generically sufficient remains open.
- Some results are symbolic proofs; some are closed by exact finite arithmetic checks. Symbolic strengthening reduced but did not eliminate the finite computational kernel.
- Relevant reductions include automata of 180 and 9 states and symmetries of the six bowls.

## Translation and terminology rules

- Start each locale from the semantic ledger and Hebrew master, never from English as a pivot.
- Preserve technical identifiers/literals verbatim: `F(c,t)`, `c`, `t`, `Q=2^127-1`, `SAVE`, `Short Choice`, `Wide Choice`, `day-id`, `RRULE:FREQ=YEARLY`, `OpenAPI`, `Pastafarian Calendar Seer`, hashes and formulas.
- Reuse the locale's existing UI/canonical terminology where it is suitable for prose. Do not invent new canonical names for cutlets/months.
- The prose may restructure clauses/sentences/headings to sound native; semantic and epistemic content may not drift.
- Local punctuation, quotation marks and ordinary number formatting are allowed; code/formula representations remain normative.
- RTL resources require deliberate BiDi handling around Latin identifiers and formulas.
- Technical terminology that is uncertain in a target language must be researched before approval.

## Initial architectural findings

1. `docs/about/content/registry.js` currently registers only Hebrew and therefore every non-Hebrew locale falls back to the Hebrew article.
2. The 70 partial locale modules intentionally omit all about-page wrapper strings today; `test/i18n-support-levels.test.js` codifies that English fallback set. Completing /about/ requires changing this test and adding localized wrapper strings, without changing the locale support level.
3. `docs/sw.js` eagerly precaches the Hebrew article. The desired rollout should avoid precaching 71 additional long articles. Preferred direction: keep a small core fallback article and add article assets to the existing runtime cache-on-demand mechanism, with a separate revision and request classifier.
4. The current notice key/name `about.hebrewOnly` encodes an obsolete assumption. Replace it with a generic fallback notice key/meaning rather than keeping user-visible Hebrew-only semantics.
5. Article `lang` should use the locale's actual selected language variant (e.g. `pt-BR`, `sr-Latn-RS`, `zh-CN`, `nb-NO`, `nn-NO`) rather than pretending all resources are generic two-letter variants. Registry metadata should carry the exact tag.
6. Stable IDs are independent of translated headings and must remain so.

## Findings requiring later adjudication

None blocking at initialization. Any contradiction between an existing locale's terminology and canonical identifiers will be recorded here before broad terminology changes are made.
