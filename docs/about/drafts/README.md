# About article drafts: publication and canonical-parity ledger

These files are **unpublished working materials**. Files in this folder must **never** be registered as production About articles. The public registry is `docs/about/content/registry.js`; do not change it until a complete translation has been accepted.

## Current French candidate (`fr`)

- Tracking: issue [#33](https://github.com/Sargon17-Green/pastafari-calendar/issues/33), draft PR [#34](https://github.com/Sargon17-Green/pastafari-calendar/pull/34).
- Complete draft (16 article units): `fr.partial.html`.
- Source fragments, retained for parallel review: `fr.canonical-names.cutlets.partial.html` (17 explanations) and `fr.canonical-names.months.partial.html` (47 explanations).
- Structural baseline: current `docs/about/content/he.html` and `docs/about/content/en.html`. The historical French translation in `feature/about-i18n-72-locales` uses obsolete 28-section navigation and has no 64 disclosure explanations; it is **not** a drop-in replacement.
- Stable section IDs, in order: `about-calendar`, `date-parts`, `working-day`, `year-structure`, `woven-months`, `canonical-names`, `day-boundary`, `advantages`, `practical-consequences`, `foundation-and-tablets`, `calendar-math`, `research`, `calculation`, `about-the-monster`, `authority`, `summary`.
- French summary text is matched against `docs/i18n/locales/fr.js`, but **canonical identity and order** are defined by `docs/i18n/calendar-identifiers.js`. Translation alone does not alter the canonical identity.
- 15 `data-toc-section` anchors, 64 `<details><summary>` explanations and a source-parallel structural block sequence.
- Required exact numerical caveats in French: `|x − 4/9| ≤ e/103`; `|x − 3/5| ≤ 1/367`; solar-height `−6°`, container **capacity** 180–220 ml including endpoints, and deliberately unresolved time-window endpoint inclusion in the “spleen” extension. Do **not** round these values or present the 4/9 or 3/5 lexical allowances as computation changes.
- The local-day boundary is the lower transit of **Venus's center** across the observer's local meridian. The discrete algorithm is normative, but the numerical astronomical model is not yet canonically closed.
- Statistics in `research` are empirical sample observations, not proven universal rules. The Seer performance engine is not canonical authority.

## Acceptance gates before exposing a new article language

1. **Complete semantic translation:** all 16 current article units, all 64 explanation paragraphs, accurate special cases and qualifiers; no historical text substituted without review.
2. **Automated structure/data gate:** run `node --test test/about-fr-draft.test.js` and `npm run test:fast`. Current tests verify section ID order, name labels and paragraph completeness, source-parallel structural block sequence, critical numeric constraints and nonpublication. A green test is **not** proof of linguistic equivalence.
3. **Human-readable/canonical proofreading:** review against the current Hebrew canonical source, the matching English explanation and, when interpretation is genuinely disputed, the canonical corpus. Review especially lexical ambiguity, first live camel offspring, the vessel-capacity vs. milk-volume distinction, boundary inclusion, proleptic historical dates and empirical-vs-normative claims.
4. **Companion content and links:** `docs/about/monster/fr.html` does not exist yet. The current draft links openly to `./monster/en.html` with `hreflang="en"`; do not mislabel this as French support. Decide whether to create/review the French companion before release.
5. **Promotion (separate change):** create the approved `docs/about/content/fr.html`, add only then to the article registry, update the service-worker optional assets and their revisions, update tests that enumerate published article languages, and verify `?lang=fr` and deep links under HTTP, offline and narrow viewports. Coordinate with PR #32's multilingual name and cache revision changes to avoid reverting them.
6. **CI and final approval:** only after the release PR's relevant completed checks pass may the translation be called published. PR #34 is a draft and must not silently promote `fr.partial.html` to production.

## Known limitations and stop conditions

- The French draft's lexical/content parity remains subject to language review. Counts and structural checks cannot certify its meaning.
- The published About coverage is still 17 of 73 UI locales unless an actual release updates the production registry; 56 locales fall back to Hebrew article prose.
- A queued or in-progress CI run is neither PASS nor a failure. Inspect completed job logs before classifying a regression or merging.
- Never change the calendar's discrete algorithm, canonical Hebrew name identities or canonical source wording to accommodate a translation.
