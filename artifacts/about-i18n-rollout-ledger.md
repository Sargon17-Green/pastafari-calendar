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
| af | af-ZA | ltr | partial | linguistic QA |
| ar | ar | rtl | partial | draft |
| az | az-AZ | ltr | partial | linguistic QA |
| be | be-BY | ltr | partial | linguistic QA |
| bg | bg-BG | ltr | partial | linguistic QA |
| bn | bn-BD | ltr | partial | draft |
| bs | bs-BA | ltr | partial | draft |
| ca | ca-ES | ltr | partial | draft |
| cs | cs-CZ | ltr | partial | draft |
| da | da-DK | ltr | partial | draft |
| de | de-DE | ltr | partial | draft |
| el | el-GR | ltr | partial | draft |
| eo | eo | ltr | partial | draft |
| es | es-ES | ltr | partial | draft |
| et | et-EE | ltr | partial | linguistic QA |
| fa | fa-IR | rtl | partial | draft |
| fi | fi-FI | ltr | partial | draft |
| fil | fil-PH | ltr | partial | draft |
| fo | fo-FO | ltr | partial | linguistic QA |
| fr | fr-FR | ltr | partial | draft |
| fy | fy-NL | ltr | partial | linguistic QA |
| gl | gl-ES | ltr | partial | linguistic QA |
| gu | gu-IN | ltr | partial | draft |
| ha | ha-NG | ltr | partial | draft |
| hi | hi-IN | ltr | partial | draft |
| hr | hr-HR | ltr | partial | draft |
| ht | ht-HT | ltr | partial | linguistic QA |
| hu | hu-HU | ltr | partial | draft |
| hy | hy-AM | ltr | partial | draft |
| id | id-ID | ltr | partial | draft |
| is | is-IS | ltr | partial | semantic QA |
| it | it-IT | ltr | partial | semantic QA |
| ja | ja-JP | ltr | partial | semantic QA |
| jv | jv-ID | ltr | partial | semantic QA |
| ka | ka-GE | ltr | partial | semantic QA |
| kk | kk-KZ | ltr | partial | semantic QA |
| ko | ko-KR | ltr | partial | semantic QA |
| lb | lb-LU | ltr | partial | semantic QA |
| lt | lt-LT | ltr | partial | semantic QA |
| lv | lv-LV | ltr | partial | semantic QA |
| mk | mk-MK | ltr | partial | semantic QA |
| mr | mr-IN | ltr | partial | semantic QA |
| ms | ms-MY | ltr | partial | semantic QA |
| nb | nb-NO | ltr | partial | semantic QA |
| ne | ne-NP | ltr | partial | semantic QA |
| nl | nl-NL | ltr | partial | semantic QA |
| nn | nn-NO | ltr | partial | semantic QA |
| pa | pa-IN | ltr | partial | semantic QA |
| pl | pl-PL | ltr | partial | semantic QA |
| pt | pt-BR | ltr | partial | semantic QA |
| ro | ro-RO | ltr | partial | semantic QA |
| ru | ru-RU | ltr | partial | semantic QA |
| sk | sk-SK | ltr | partial | semantic QA |
| sl | sl-SI | ltr | partial | semantic QA |
| so | so-SO | ltr | partial | semantic QA |
| sq | sq-AL | ltr | partial | semantic QA |
| sr | sr-Latn-RS | ltr | partial | semantic QA |
| sv | sv-SE | ltr | partial | semantic QA |
| sw | sw-TZ | ltr | partial | semantic QA |
| ta | ta-IN | ltr | partial | semantic QA |
| te | te-IN | ltr | partial | semantic QA |
| th | th-TH | ltr | partial | semantic QA |
| tr | tr-TR | ltr | partial | semantic QA |
| uk | uk-UA | ltr | partial | semantic QA |
| ur | ur-PK | rtl | partial | semantic QA |
| uz | uz-UZ | ltr | partial | semantic QA |
| vi | vi-VN | ltr | partial | semantic QA |
| yo | yo-NG | ltr | partial | draft |
| zh | zh-CN | ltr | partial | draft |
| zu | zu-ZA | ltr | partial | draft |

Status progression for target locales: `not started → draft → semantic QA → linguistic QA → integrated → rendered → PASS`.

## Findings requiring locale-wide review

- `af-ZA`: locale-wide language finding discovered during terminology audit: prominent existing UI strings are Dutch rather than Afrikaans (for example `Werkdag wijzigen`, `Deze site gebruiken`). Treat as a whole-site locale defect for the native-language QA phase; do not silently normalize canonical terminology from those strings while drafting the article.

- `ca-ES`: locale-wide language finding: prominent existing UI strings contain Spanish/mixed Catalan rather than idiomatic Catalan (for example `Cambiar el dia de trabajo`, `Cómo usar este lloc`). Do not use those strings as a terminology oracle for the article; native Catalan review must repair the whole locale.

- `gl-ES`: locale-wide language finding: prominent existing UI strings contain Portuguese forms rather than idiomatic Galician (for example `día de trabalho`). Do not use those strings as a terminology oracle for the article; native Galician review must repair the whole locale.

- `et-EE`: locale-wide language finding: prominent existing UI strings are Finnish rather than Estonian (for example `Vaihda työpäevä`, `Sivuston käyttö`). Do not use those strings as a terminology oracle for the article; native Estonian review must repair the whole locale.

- `bg-BG`: locale-wide language finding: prominent existing UI strings are Russian or mixed Russian/Bulgarian rather than idiomatic Bulgarian (for example `Изменить ден на действието`, `Как пользоваться сайтом`). Do not use those strings as a terminology oracle for the article; native Bulgarian review must repair the whole locale.

- `ms-MY`: locale-wide language finding: the existing locale mixes Malay and Indonesian rather than being consistently idiomatic Malay (for example Malay `tarikh`/`mesej` alongside Indonesian `situs`, `perhitungan`, `Terapkan`, `coba lagi`). Do not use it as a terminology oracle for the Malay article; native Malay review must repair the whole locale.

- `az-AZ`: locale-wide language finding: prominent existing UI copy is Turkish rather than idiomatic Azerbaijani (`İşlem gününü değiştir`, `Bu site nasıl kullanılır`, `köftesinde`). Do not use it as an Azerbaijani terminology oracle.

- `fo-FO`: locale-wide language finding: the existing locale is a Faroese/Danish hybrid (`Skift arbejdsdaguren`, `beregningens udgangspunkt`, `Sådan ...`), not idiomatic Faroese.

- `fy-NL`: locale-wide language finding: prominent UI copy is Dutch rather than Frisian (`Werkdei wijzigen`, `uitgangspunt van de berekening`, `Deze site gebruiken`).

- `is-IS`: locale-wide language finding: the existing locale is largely Danish with Icelandic-looking substitutions (`Skift arbejdsdaguren`, `beregningens udgangspunkt`, `Sådan ...`).

- `sl-SI`: locale-wide language finding: prominent UI copy is Croatian/Bosnian/Serbian rather than idiomatic Slovenian (`Promijeni dan delovanja`, `polazišna je točka`, `u kotletu`).

- `sr-Latn-RS`: locale-wide variant finding: the existing UI uses predominantly Ijekavian Bosnian/Croatian forms (`Promijeni`, `djelovanja`, `mjesecu`, `zdjela`) despite the registered Serbia Latin variant; review the whole locale against sr-Latn-RS.

- `lb-LU`: locale-wide language finding: the existing locale is predominantly German rather than Luxembourgish (e.g. `Dag der Ausführung ändern`, `Ausgangspunkt der Berechnung`, `Schale`, `Tropfen`). Do not use it as a Luxembourgish terminology oracle.

- `be-BY`: locale-wide language finding: the existing locale mixes Belarusian with Ukrainian forms (e.g. `Змінити дзень дії`, `котлеті`, `місяці`). It requires native Belarusian repair before serving as a terminology oracle.

- `ht-HT`: locale-wide language finding: the existing locale is French rather than Haitian Creole (e.g. `Changer le jou de travail`, `Comment utiliser ce site`, `Goutte`, `Porte`). Do not use it as a Haitian Creole terminology oracle.

- `jv-ID`: locale-wide language finding: the existing locale is predominantly Indonesian rather than Javanese (e.g. `Ubah dina kerja`, `Cara menggunakan situs ini`, `Hari/Dina Pendirian`, `Tetes`, `Gerbang`). Do not use it as a Javanese terminology oracle.

- `mk-MK`: locale-wide language finding: the existing locale mixes Macedonian with Russian (e.g. `Изменить`, `Как пользоваться сайтом`, `День Основания`, `Капля`). It requires native Macedonian repair.

- `nn-NO`: locale-wide variant finding: the existing locale substantially mixes Bokmål with Nynorsk (e.g. `Endre arbeidsdagen`, `Grunnleggelsesdagen`, alongside `brukar`). It requires native Nynorsk repair before serving as a terminology oracle.

- `sr-RS`: locale-wide language finding: the existing locale is Croatian-leaning rather than standard Serbian (e.g. `Promijeni`, `djelovanja`, `Zdjela`). It requires native Serbian repair before serving as a terminology oracle.

## Draft-completion mechanical checkpoint — 2026-09-25

- `LOCALES` at this branch contains **72 locales**: Hebrew plus 71 target locales.
- `docs/about/content/` now contains **72 locale articles**, exactly one for every registered locale.
- All 71 target locales have complete article drafts. Native-language whole-site text QA is now complete through `ht-HT`: `af-ZA`, `az-AZ`, `be-BY`, `bg-BG`, `et-EE`, `fo-FO`, `fy-NL`, `gl-ES`, and `ht-HT` are at `linguistic QA`; the remaining 62 target locales remain at `draft` pending the same native-language pass.
- Full mechanical audit was run in batches across every target locale. Each article has exactly the canonical 29 stable IDs, no duplicate IDs, both semantic tables with 19 and 9 body rows respectively, all required hard literals/formulas/hashes, no unintended Hebrew leakage, and its locale module has exactly 11 `about.*` shell keys.
- During closure, the first audit helper exposed a real test bug: it matched only two-letter locale codes and therefore missed `fil`. The audit was corrected to accept 2–3 letter registry codes, `fil` was added and verified, and the final audit covered all 72 locales.
- Native-language whole-site LLM QA remains pending by design. The required next phase is one locale at a time, with the reviewing conversation itself conducted in that locale and explicitly searching the whole site for unnatural language, foreign-language leakage, terminology drift, BiDi/layout issues where relevant, and semantic discrepancies.

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
