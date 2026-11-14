# About-article language coverage and translation drafts

This folder stores **historical source drafts, partial translations and QA material**. Its files are not production pages. Public About locales are explicitly registered in `docs/about/content/registry.js`; the live Monster pages reside under `docs/about/monster/`. Never treat a draft's completeness or a green structure test as proof of linguistic equivalence.

## Published baseline — 2026-11-14

- The public About article now supports **18 of 73** interface locales, including Hebrew. The remaining **55** use the documented Hebrew article fallback. This count is derived from the current article registry and UI locale modules; update it whenever publishing another language.
- The current canonical Hebrew article is `docs/about/content/he.html`. Hebrew Monster semantic source: `docs/about/monster/index.html`. Translation must not change canonical identifiers, the discrete calendar algorithm or the original Hebrew legal/technical qualifiers.
- French `fr` is **published**, not pending: full article `docs/about/content/fr.html` and complete Monster `docs/about/monster/fr.html`. Publication was merged through [PR #35](https://github.com/Sargon17-Green/pastafari-calendar/pull/35) at `7b5cfbaebc3b5627a1e242640315b68c8690b60f`, after draft [PR #34](https://github.com/Sargon17-Green/pastafari-calendar/pull/34) merged at `4bb48d3055d8c7fe1673b0e1181eff14f9dabbbd`.
- GitHub Pages deployment for the French publication completed with a success conclusion on 2026-11-14. The local CI verified actual offline navigation in Chromium, responsive visual regression, accessibility and checksum completeness. This does **not** substitute for independent human linguistic review or a verified external HTTP response.

## French source files retained for reference

- `fr.partial.html`: original 16-unit article source. Its English Monster hyperlink is a **historical draft fallback**, **not** the live French link. The published article now links to `./monster/fr.html`.
- `fr.canonical-names.cutlets.partial.html` (17) and `fr.canonical-names.months.partial.html` (47): French source paragraphs for all 64 canonical-name disclosures.
- `fr.monster.partial.html`: 25 core Monster sections.
- `fr.monster.penguin.partial.html`: the complete 13-section penguin appendix with all 21 Hebrew editorial counterarguments retained at their source positions.
- `fr.monster.complete.html`: prepublication standalone preview, intentionally marked `noindex`; do not substitute it for the public Monster page without explicit review.
- `test/about-fr-draft.test.js` covers structural, numeric, locale, navigation and source-parity properties. It includes checks of the Newton/Einstein qualification and the French terms `jour de référence` (`c`) and `jour recherché` (`t`).
- The canonical hexadecimal or decimal appearance of a number in a translated explanation must never silently change its meaning. Canonical examples include `|x − 4/9| ≤ e/103`, `|x − 3/5| ≤ 1/367`, solar elevation `−6°`, and the **180–220 ml vessel-capacity** constraint with both endpoints included. The spleen-interval endpoint semantics remain intentionally unresolved where the Hebrew canonical text says so.

## Required workflow for each additional language

1. Start a separate **unregistered draft** in this directory. Use the Hebrew About source as semantic authority and the existing approved UI locale's identifiers and direction as the presentation basis. Preserve the current 16 article unit IDs (15 TOC sections), the 17 cutlet + 47 month disclosure meanings and all critical numerical constraints.
2. Translate and independently edit the prose for natural native-language usage. Maintain the separation between the reference/action day `c`, queried day `t`, the observer's location and the five actual date fields. Do not confuse source evidence from empirical samples with normative statements.
3. Translate the Monster companion **from the Hebrew page**: all 25 regular sections, 13 penguin appendix subsections, and all 21 nested editorial rebuttals. The English Monster article is not an adequate semantic master for the appendix because it omits Hebrew-source notes. Preserve source section IDs and the relative position of nested notes.
4. Add automated draft QA: IDs/order, counts and structural parity, exact special-case qualifiers, scope of values, no new registration or public linking. A passing parser/structure test is **not** a proof of translation quality.
5. Promote content through a **separate, reviewable release PR**, only after translation review. Update the article registry, About loader revision, Monster locale selector, service-worker optional assets, tests and both `SHA256SUMS.txt` manifests. Check real offline browser navigation of both About and Monster pages, visual layout, keyboard/accessibility and the proper language direction.
6. Merge only when GitHub checks for the *actual release head* have completed successfully. Verify both the GitHub Pages deployment result and, when possible, the public HTTP pages. Never infer a PASS from queued, in-progress or skipped jobs.

## Next language

The next not-yet-published language selected for the serial translation workflow is **Persian (`fa`)**, the first absent UI locale by ascending code. Its existing interface module is `docs/i18n/locales/fa.js`, with RTL direction. No Persian About article or Monster article is yet registered. Keep Persian drafts unpublished until the same acceptance gates are satisfied.
