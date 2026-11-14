# Persian About article — unpublished source draft

Language: **Persian / فارسی** (`fa`; RTL; UI module `docs/i18n/locales/fa.js`).

## Completed in this branch

- `fa.partial.html`: **5 of the 16** canonical About units translated and independently edited in Persian:
  `about-calendar`, `date-parts`, `working-day`, `year-structure`, `woven-months`.
- Terminology is aligned with existing Persian interface usage: **روزِ عمل** for `c` (action/reference day) and **روزِ مورد پرسش** for `t` (queried day), with `F(c,t)` versus `F(t)` preserved.
- Exact Hebrew structural element order for these units: **142 tags** (source/translation), identical IDs and HTML nesting.
- Canonical date concepts and numerical ranges are retained: five fields, year 5000 when `c=t`, year 0 and negatives, legal year length 252–5,778 inclusive, 6–17 cutlets of minimum 42 days, 3–47 structural months with 4–123 days, no canonical weeks, interwoven months and sample dates.
- `fa.canonical-names.cutlets.partial.html`: **17 of 17** cutlet name disclosures have been drafted in natural Persian with the exact published UI label for each canonical ID. Their **144-tag** Hebrew structural sequence matches exactly, including both mathematical `<code>` spans for the fraction `4/9`.
- `test/about-fa-draft.test.js` checks registration exclusion, RTL direction, prefix structure, date operands, range qualifiers, concrete examples, 17 name labels and Hebrew tag parity; it is included in `npm run test:fast`.

## Remaining; never present this as published

1. Translate and re-edit the remaining **11** About units, preserving their order and numeric/semantic qualifiers.
2. Complete the remaining **47** month-name explanations (all **17** cutlet explanations are now drafted), for a total of 64. Source identities live in `docs/i18n/calendar-identifiers.js`; localized display labels should be checked against `docs/i18n/locales/fa.js`. Avoid reinterpreting lexical tolerances as changes to calendar calculation.
3. Translate all 25 Monster main sections and the 13-subsection penguin appendix, including **21** inline editorial rebuttal notes from Hebrew. Do not use the shorter English article as a complete master.
4. Independently proofread Persian prose for natural local expression, technical accuracy and mixed RTL/LTR notation. Verify mobile wrapping, focus, keyboard and accessibility.
5. Prepare a *separate release PR* for `docs/about/content/fa.html`, `docs/about/monster/fa.html`, the article registry, Monster routing, versioned PWA assets, tests and SHA-256 manifests. Verify actual browser offline navigation before approval.

**Release state:** `fa` is **not** registered in `docs/about/content/registry.js`; public `?lang=fa` uses the site's current Hebrew About fallback. No public language selector or production HTML is modified by this draft.
