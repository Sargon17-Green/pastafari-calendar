# Persian About article — unpublished source draft

Language: **Persian / فارسی** (`fa`; RTL; UI module `docs/i18n/locales/fa.js`).

## Completed in this branch

- `fa.partial.html`: **5 of the 16** canonical About units translated and independently edited in Persian:
  `about-calendar`, `date-parts`, `working-day`, `year-structure`, `woven-months`.
- Terminology is aligned with existing Persian interface usage: **روزِ عمل** for `c` (action/reference day) and **روزِ مورد پرسش** for `t` (queried day), with `F(c,t)` versus `F(t)` preserved.
- Exact Hebrew structural element order for these units: **142 tags** (source/translation), identical IDs and HTML nesting.
- Canonical date concepts and numerical ranges are retained: five fields, year 5000 when `c=t`, year 0 and negatives, legal year length 252–5,778 inclusive, 6–17 cutlets of minimum 42 days, 3–47 structural months with 4–123 days, no canonical weeks, interwoven months and sample dates.
- `fa.canonical-names.cutlets.partial.html`: **17 of 17** cutlet name disclosures have been drafted in natural Persian with the exact published UI label for each canonical ID. Their **144-tag** Hebrew structural sequence matches exactly, including both mathematical `<code>` spans for the fraction `4/9`.
- `fa.canonical-names.months.partial.html`: **47 of 47** month name disclosures drafted in Persian, with the exact existing Persian UI display labels and Hebrew-source disclosure structure (384 HTML tags). The source fractional threshold `|x − 3/5| ≤ 1/367` and the complete non-ordinary `spleen` semantic extension are preserved in the draft.
- `fa.canonical-names.partial.html`: the **sixth canonical article unit** assembled from the complete 17 + 47 name disclosures, including the full Persian introduction and closing lexical/canonical caveat, with exact Hebrew structural-tag parity; unpublished.
- `test/about-fa-draft.test.js` checks registration exclusion, RTL direction, prefix structure, date operands, range qualifiers, concrete examples, 17 name labels and Hebrew tag parity; it is included in `npm run test:fast`.

- `fa.remaining.partial.html`: all **10** final units (7–16) translated in draft Persian, including the published H1000 birthday definition, astronomical uncertainty and mathematical empirical qualifiers.
- `fa.complete.partial.html`: **16/16** canonical About units and **64/64** name explanations assembled as a complete **unpublished and unapproved** Persian article; its **906/906** selected HTML structural tags match the current Hebrew master.
- This branch incorporates the current Hebrew and English About birthday-research text and aligns the French draft and French published content with the updated three research links and birthday definition. This is branch-only; the public site is unchanged until an approved merge.

- `fa.monster.core.partial.html`: first **16 of 25** Monster main sections translated, preserving the Hebrew canonical section IDs and exact 194-tag section structure. The remaining Monster text is not translated yet, including the 13-part penguin appendix and all 21 editorial notes.

## Remaining; never present this as published

1. Independently proofread all **16** Persian units for natural expression and canonical accuracy. Draft completion is not linguistic, scientific or canonical approval.
2. Independently review **all 64** name definitions, exact boundary qualifiers and the `شن` versus `ماسه` lexical question before release.
3. Translate and verify the remaining **9 of 25** Monster main sections, all **13** penguin appendix subsections, and **21** inline editorial rebuttal notes from Hebrew. Do not use the shorter English article as master.
4. Independently proofread Persian prose for natural local expression, technical accuracy and mixed RTL/LTR notation. In particular, review whether the current UI label `شن` faithfully conveys canonical `sand` (`חול`) or should be `ماسه`; do not silently change a published locale label. Verify mobile wrapping, focus, keyboard and accessibility.
5. Reconcile the branch against current `main`, validate complete GitHub CI and real offline/mobile RTL/accessibility behavior, and only then create a separate release PR covering complete Persian About/Monster, registries, routing and integrity manifests. Never publish a partial translation.

**Release state:** `fa` is **not** registered in `docs/about/content/registry.js`; public `?lang=fa` uses the site's current Hebrew About fallback. No public language selector or production HTML is modified by this draft.
