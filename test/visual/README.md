# Visual and responsive regression testing

This suite protects the public Web UI against meaningful visual and layout regressions without treating every changed pixel as a defect. It uses the repository's existing Playwright dependency directly; it does not introduce a second browser-test framework.

## Scope

Pixel baselines are Chromium-only. Firefox is used for layout/functional smoke checks rather than a duplicate snapshot matrix.

The core visual matrix covers:

| Scenario | Locale | Direction | Viewport | State | Snapshot |
|---|---|---|---|---|---|
| Home/search | English | LTR | 1440×1000 | fixed result loaded | `home-en-desktop` |
| Result/calendar | English | LTR | 1440×1000 | fixed result | `result-en-desktop` |
| Year structure A | English | LTR | 1440×1000 | fixed result | `year-structure-a` |
| Advanced settings | English | LTR | 1440×1000 | details open | `advanced-en-desktop` |
| Comparison | English | LTR | 1440×1000 | comparison enabled | `comparison-en-desktop` |
| Calendar edge | English | LTR | 1440×1000 | target at cutlet edge | `calendar-edge-en-desktop` |
| Calendar middle | English | LTR | 1440×1000 | target in cutlet middle | `calendar-mid-en-desktop` |
| Adjacent cutlet | English | LTR | 1440×1000 | target outside viewed cutlet | `calendar-next-cutlet-en-desktop` |
| Year structure B | English | LTR | 1440×1000 | structurally different year found deterministically | `year-structure-complex` |
| Print result | English | LTR | 1440×1000 | print media | `print-result-en` |
| Home/search | Hebrew | RTL | 1440×1000 | fixed result loaded | `home-he-desktop` |
| Result/calendar/year | Hebrew | RTL | 1440×1000 | fixed result | `result-he-desktop` |
| Home/search | English | LTR | 390×844 | fixed result loaded | `home-en-mobile` |
| Result/calendar/year | English | LTR | 390×844 | fixed result | `result-en-mobile` |
| Home/search | Hebrew | RTL | 390×844 | fixed result loaded | `home-he-mobile` |
| Result/calendar/year | Hebrew | RTL | 390×844 | fixed result | `result-he-mobile` |
| Mobile comparison | English | LTR | 390×844 | comparison enabled | `comparison-en-mobile` |
| Long-text locale | German | LTR | 1440×1000 | advanced settings open | `long-de-desktop` |
| Long-text locale | German | LTR | 390×844 | advanced settings open | `long-de-mobile` |
| Recoverable input error | English | LTR | 1440×1000 | invalid Gregorian date | `error-invalid-en-desktop` |
| Loading | English | LTR | 1440×1000 | worker request deliberately gated | `loading-en-desktop` |
| Engine error | English | LTR | 1440×1000 | worker request deliberately failed | `engine-error-en-desktop` |
| Script diversity | Bengali | LTR | 390×844 | fixed result loaded | `script-bn-mobile` |

All application data used by the suite is deterministic. The primary target/calculation/comparison JDN values are fixed (`2465429`, `2461141`, `2461143`), language is explicit, the browser timezone is `Asia/Jerusalem`, and service workers are blocked for the visual HTTP suite. The astronomical current-day mechanism is not modified or mocked; fixed URL state simply prevents it from influencing the baselines.

The calendar fixtures are fixed rather than rediscovered at runtime. JDN `2465429` is the first day of a 51-day cutlet in year 5,001 for calculation JDN `2461141`; JDN `2465454` is a middle day of that same cutlet. JDN `2469021` exercises year 5,002, whose year structure differs from year 5,001 (3,928 vs. 3,851 days, 6 vs. 7 cutlets, and 41 vs. 40 months). No synthetic calendar data is used, and the runner asserts the edge/middle and distinct-year invariants before accepting the corresponding snapshots.

## Responsive/layout checks

In addition to screenshots, the runner verifies geometry and semantics. It checks page-level horizontal overflow, visibility and non-zero sizes, selected controls for clipping, selected high-risk overlap pairs, comparison's intentional internal scrolling, RTL/LTR inline-start geometry, mobile toolbar separation, and target-marker presence.

Boundary checks run immediately above and below the CSS transitions used by the current UI:

- `1001/999`: desktop comparison table/settings versus the compact message;
- `901/899`: main form, year-structure, and reverse-search constraint-column changes around the shared `900px` rule;
- `761/759`: masthead and calendar-toolbar transition around `760px`;
- `521/519`: date fields and year facts around `520px`;
- `421/419`: the small-screen application-shell gutter around `420px`;
- `621/619`: reverse-search tab layout around its `620px` rule.

The suite also runs 320px narrow-screen and 1680px wide-screen layout smoke tests, a 200% root-text-size smoke test, a forced-colors layout smoke, a Bengali non-Latin script/font-fallback smoke, a standalone `file://` layout smoke, and Firefox desktop/mobile layout smoke checks. Reduced motion is enabled for browser contexts.

## Running the suite

The repository's browser-test convention is a direct Node runner:

```sh
npm run test:visual
```

For geometry-only checks without pixel comparison:

```sh
npm run test:visual:layout
```

Artifacts are written under `artifacts/visual/`. On a pixel failure the runner writes the actual image, a copy of the expected image, a generated diff image, a JSON report, and a Playwright trace for the failing scenario.

## Updating baselines intentionally

Baselines are never updated by the normal test command or by the CI comparison job. After an intentional visual change, use the canonical environment and run:

```sh
npm run test:visual:update
```

The update command captures every snapshot at least three times before accepting it. Per snapshot it measures the largest identical-run changed-pixel ratio after a small per-channel threshold of 16/255, then records an allowed `maxDiffPixelRatio` equal to three times the observed noise. A hard `0.002` (0.2%) ceiling prevents an unstable screenshot from being “fixed” by a broad tolerance; if measurement would exceed that ceiling, baseline generation fails and the source of nondeterminism must be addressed first.

The generated PNGs and `baseline-metadata.json` are normal reviewed repository changes. Review every changed baseline image before committing it. The update path uses no automatic masks.

For a deliberately requested CI baseline-capture run only, `PASTAFARI_ALLOW_VISUAL_UPDATE=1` may be supplied together with `--update`; the standard comparison workflow never sets that variable and never updates baselines. The dedicated `capture-baselines` job also sets `PASTAFARI_VISUAL_CANONICAL=1`, allowing the regenerated metadata to record canonical provenance explicitly. Do not set that provenance flag for local captures.

## Canonical rendering environment

The pixel baselines are intended for the dedicated GitHub Actions visual job: Ubuntu 24.04, Node 22, and the Chromium revision installed by the repository-pinned Playwright `1.62.1`. The runner records the actual browser version in `artifacts/visual/report.json` and in baseline metadata when baselines are rebuilt.

The site uses system font stacks (`Arial`/`Segoe UI`/`Noto Sans Hebrew` and `Georgia`/`Times New Roman`/`Noto Serif Hebrew`). Cross-OS pixel rendering can therefore differ. A local Windows or macOS run is useful for `--layout-only`; baseline replacement should be produced on the canonical Ubuntu environment unless the canonical environment is intentionally changed.

When Playwright or its browser revision is upgraded intentionally, rebuild the snapshots in the canonical environment, inspect all diffs, and commit the changed PNGs and metadata together with the version upgrade.

### Baseline provenance

The current committed snapshots were captured on 2026-08-18 by the dedicated `capture-baselines` GitHub Actions job on the canonical Ubuntu 24.04 environment, using Node 22, Playwright 1.62.1 and Chromium 151.0.7922.34. All 23 snapshots were captured three times and produced zero changed pixels above the comparator's 16/255 channel threshold before review. The resulting candidate set was reviewed before being committed.

These canonical snapshots replace the initial Debian 13 / Chromium 144 validation baselines. The environment transition preserved the dimensions of 22 snapshots; the Bengali mobile script-diversity snapshot changed height from 1068px to 1001px because of canonical font/rendering metrics, with its content and controls remaining visible and unclipped. Future browser or runner upgrades must be handled the same way: generate candidates with the explicit workflow-dispatch path, review the images, and commit the accepted PNGs, metadata and checksums together.

## Mask policy

There are currently **no masked regions**. The suite instead removes non-semantic animation/transition timing and hides a blinking caret for ordinary snapshots. Focus-specific screenshots are not part of this suite. Dynamic current time, geolocation and random data are excluded from baseline state rather than masked.

## Regression sensitivity check

The runner contains an isolated self-test that temporarily hides the main search submit control inside the browser page, verifies that the image comparator detects a ratio above the hard failure ceiling, removes the injected style, and verifies that the image returns to the pre-injection state. Run it with:

```sh
npm run test:visual:self-test
```

The CI job runs this self-test before the committed-baseline comparison. The artificial regression exists only in the browser page for that test and is never written to production CSS or repository files.

## Known limitations

Visual regression does not verify the mathematical correctness of the Pastafarian calculation engine or the astronomical day algorithm. It is not a screen-reader test, does not cover every supported locale, does not keep a separate pixel-baseline set for every browser engine, and cannot replace human judgement about aesthetic quality. Structural checks are intentionally targeted rather than a generic all-DOM overlap detector, because generic overlap detection produces many false positives for intentionally layered UI.
