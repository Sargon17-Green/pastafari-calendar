# About / site localization completion contract v2

Date: 2026-10-08

This file extends the existing About-retranslation program. It does not restart it and does not invalidate completed locale QA evidence.

## Publication unit

The publication unit is the entire localized public site, not an individual About translation.

There are 73 registered locales in the Web UI: Hebrew plus 72 non-Hebrew locales. Kyrgyz (`ky`, `ky-KG`) is part of the non-Hebrew completion set even though its ordinary UI resources are already structurally complete.

No partial publication is allowed.

## Per-locale content gates

Every non-Hebrew locale must have all three content gates:

1. fresh direct translation from the current canonical Hebrew About + Monster sources;
2. independent native-language linguistic QA without the Hebrew source;
3. independent direct semantic comparison against the current Hebrew source.

Required final artifacts per locale:

- `about.html`
- `monster.html`
- native-language final QA report
- direct-Hebrew final comparison report
- `status.json` with `state=PASS`, `native_qa=PASS`, `hebrew_compare=PASS`

Kyrgyz is subject to the same About + Monster gates; existing UI completeness does not exempt it.

## Whole-site i18n gate

A selected registered locale must render the whole public interface in that locale. No unintended English or Hebrew fallback is acceptable.

The current partial-locale fallback set that must be eliminated contains these 15 message keys:

- `about.back`
- `about.hebrewOnly`
- `about.intro`
- `about.loadError`
- `about.metaDescription`
- `about.open`
- `about.openShort`
- `about.skip`
- `about.title`
- `about.toc`
- `about.tocKicker`
- `app.brand`
- `reverse.error.absoluteDateField`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`

This list is a baseline, not an allowlist: any newer required key discovered by the coverage audit must also be translated locally.

Final requirements:

- `npm run check:i18n` passes;
- `npm run i18n:coverage` reports zero fallback keys for every registered locale;
- all 73 registry entries satisfy the structural `complete` contract;
- `npm run check:reverse-i18n` passes with no reverse-search fallback;
- `npm run check:manifest-i18n` passes;
- all translatable runtime notices, errors, accessibility labels, reverse-search UI and manifest strings are local;
- no locale is promoted by copying English text merely to reach 100%.

## About and Monster routing gate

For every registered locale:

- the About article registry resolves that locale to its own translated article, never Hebrew or English fallback;
- the About page links to the same-locale Monster page;
- the Monster page links back to the same-locale About page;
- the Monster page uses the locale's exact BCP-47 `lang` and correct `dir`;
- direct/deep links preserve the requested locale;
- visible reader-facing prose contains no accidental Hebrew/English leakage.

Fallback may remain only for genuinely unsupported/unknown locale codes, never for one of the 73 registered locales.

## Accessibility gate

Before publication, rerun automated accessibility and explicitly recheck the previously sensitive areas:

- skip-link focus target;
- landmark structure;
- focus restoration after locale switching;
- keyboard focus/order through main UI, reverse search and About;
- no misuse of `aria-current`;
- non-color-only state communication;
- reverse-search accessible names;
- loading/error live/status semantics;
- mixed RTL/LTR rendering;
- 200% text-size / zoom behavior and narrow screens;
- forced-colors / high-contrast behavior;
- heading structure and focusable scrollable formula blocks;
- live-announcement timing and content understanding.

Required automated gate: `npm run test:accessibility` with zero axe violations.

Any manual/screen-reader finding that remains unresolved blocks publication and must be recorded rather than waived.

## PWA / offline gate

Before publication verify the final integrated build, not an earlier revision:

- Service Worker install/activation reaches ready;
- versioned Worker/engine assets cannot mix across cache revisions;
- fresh online load then offline reload works;
- fresh install/offline path behaves as designed;
- locale resources remain available offline after first load;
- About and same-locale Monster deep links work offline after caching;
- optional localized article resources use the current revision;
- stale-cache/new-locale and old-cache/new-build transitions do not expose mixed-language UI;
- localized manifest name/short name/description exists for every locale;
- required icons/favicons are present in the Pages artifact;
- no fallback language appears because an optional locale/article asset was omitted.

Required automated gate: `node scripts/run-pwa-offline-smoke.mjs`.

## Visual gate

Publication requires both automated visual/layout testing and human review of the resulting pages.

Run at minimum:

- `npm run test:visual:self-test`
- `npm run test:visual:layout`
- `npm run test:visual`

Visually inspect representative desktop and mobile states including:

- LTR and RTL;
- Kyrgyz/Cyrillic;
- Bengali/non-Latin script;
- a long-text locale;
- About page and Monster page;
- reverse-search errors;
- 200% text size;
- forced-colors/high-contrast;
- narrow viewport;
- offline/deep-link state where visually relevant.

No baseline is updated merely to make a failure disappear. Any intentional baseline change must be reviewed.

## Full pre-publication automated gate

Run the repository's final integrated verification on the exact candidate to be published:

- `npm run release:verify`
- `npm run check:i18n`
- `npm run check:reverse-i18n`
- `npm run check:manifest-i18n`
- `npm run test:i18n-support`
- `npm run test:i18n-lazy`
- `npm run test:reverse-ui`
- `npm run test:accessibility`
- `node scripts/run-pwa-offline-smoke.mjs`
- `npm run test:visual:self-test`
- `npm run test:visual:layout`
- `npm run test:visual`
- `node scripts/run-user-e2e.mjs`

All required checks must pass on the same integrated revision.

## Calendar-algorithm freeze

This localization program must not change the Pastafarian calendar algorithm.

Translation, routing, i18n, accessibility, PWA caching, presentation and tests may be changed as necessary, but no algorithmic behavior may be altered as part of this work.

Before publication, compare the integration diff against its algorithmic baseline. Any modification to calculation/engine/oracle semantics requires a separate explicitly authorized task and blocks this localization publication until removed or separately approved.

## Final publication rule

Publication is allowed only when:

- 72/72 non-Hebrew About + Monster locale packages have all three content gates PASS;
- all 73 registered UI locales have zero unintended fallback;
- About and Monster resolve in the selected locale;
- accessibility gate passes;
- PWA/offline gate passes;
- automated visual/layout gates pass;
- human visual review passes;
- full integrated CI/release verification passes;
- calendar algorithm remains unchanged.

Until then, `publish=false`.
