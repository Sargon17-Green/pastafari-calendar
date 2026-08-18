# Accessibility testing

This project includes automated accessibility checks targeting **WCAG 2.2 Level AA** for the public Web interface. Passing these checks is not a certification of WCAG 2.2 AA conformance: automated tools cannot evaluate every success criterion, and several important checks still require human judgment and assistive technology.

## Run the automated suite

```sh
npm run test:accessibility
```

The default browser is Chromium. An additional Firefox run can be requested when useful:

```sh
npm run test:accessibility -- --browser=firefox
```

The suite starts a local static server for `docs/` and exercises the real production UI. It does not use a mocked accessibility-only page and does not alter the Pastafari calculation engines.

## Target and automated coverage

The automated suite uses Playwright plus `axe-core`. Axe is run with WCAG 2.0/2.1/2.2 A and AA tags. There are **no global rule suppressions** and no project-specific axe rule disables. A new targeted A/AA violation fails the command and the failure report includes the rule ID, impact, target, description, help text, locale and scenario.

Representative automated coverage includes:

- initial English LTR page and document semantics;
- Hebrew RTL after an actual locale switch, including `html[lang]`, `html[dir]` and updated accessible names;
- a successful Gregorian date search and the rendered result;
- an invalid-date form error and its alert semantics;
- advanced calculation settings in the open state;
- calendar output and the year overview after asynchronous year rendering completes;
- desktop comparison mode, including row/column table headers and the keyboard-focusable scroll region;
- loading-state semantics, `aria-busy` and a polite live region;
- keyboard traversal using Tab and Shift+Tab, native `details` activation with Enter/Space, native select keyboard operation, locale selection and cutlet navigation;
- the skip link, including visibility on focus and focus transfer to the date-search heading;
- visible focus indicators on representative links, buttons, form controls, summaries and scroll regions;
- duplicate IDs, focusable descendants of `aria-hidden`, visible unlabelled form fields and placeholder-only labels;
- representative WCAG 2.2 target-size measurements for primary controls;
- Chromium `forced-colors: active`, including target-day and focus states;
- `prefers-reduced-motion: reduce`;
- a 390×844 mobile viewport in English and Hebrew;
- German as a long-string locale smoke test;
- reflow proxies corresponding to 200% and 400% enlargement from a 1280-CSS-pixel reference viewport;
- WCAG text-spacing override checks without shipping the override to production.

The normal desktop viewport is 1440×1000. The mobile viewport is 390×844.

### Calendar semantics

The visual calendar is intentionally **not** given `role="grid"`. Its day cards are rendered as non-interactive articles and do not implement the ARIA Grid keyboard interaction model. The calendar container is a named group; navigation is performed with ordinary buttons. The target day has a visible textual badge and strong non-colour border treatment, so target identification is not colour-only.

### Zoom and reflow

Playwright cannot reliably drive browser UI zoom in a cross-platform CI environment. The automated suite therefore uses narrow CSS viewports as deterministic reflow proxies for 200% and 400% enlargement and verifies that core functionality remains reachable without global horizontal overflow.

A real browser zoom check at 200% and 400% remains a manual requirement. Wide data tables may use an internal horizontal scroll container; the manual check must distinguish that acceptable component-level scrolling from whole-page loss of content or functionality.

### Forced colours and reduced motion

Chromium emulation is used for `forced-colors: active`. This verifies the project's forced-colour CSS and critical target/focus states, but it is not equivalent to testing every Windows High Contrast theme or every operating-system custom-colour configuration.

Reduced-motion testing enables `prefers-reduced-motion: reduce` and checks that smooth scrolling and the loading animation are effectively disabled without breaking interaction.

## CI

`.github/workflows/test.yml` contains a separate `accessibility` job. It installs Chromium and runs:

```sh
npm run test:accessibility
```

When the job fails, `artifacts/accessibility` is uploaded as a GitHub Actions artifact. The runner writes a Markdown report, JSON report, screenshots for diagnostic scenarios, and a Playwright trace on failure.

Whether this job is merge-blocking is controlled by repository branch-protection/ruleset settings. A failing job returns a non-zero status; repository policy must require that status if merges are to be blocked by it.

## Suppression policy

Current accessibility suite suppressions: **none**.

If a future axe result is proven to be a false positive or an unavoidable tool limitation, any exception must be narrow. Document the exact rule ID, DOM scope, reason, evidence that it is not hiding a real accessibility defect, and the condition for removing the exception. Do not add broad page-level or ruleset-level ignores to obtain a passing build.

## Manual screen-reader check

Automated Playwright/axe tests do not establish screen-reader usability. Perform at least one of the following on a real supported environment:

- NVDA with Firefox or Chrome on Windows; or
- VoiceOver with Safari on macOS.

For environments in which no screen reader was actually run, record the result as **NOT EXECUTED**, not PASS.

Checklist:

1. Open the site and confirm that the page title, primary heading and landmarks communicate the page structure.
2. Tab to the skip link, confirm that it becomes visible, activate it, and confirm that focus/context moves to date search.
3. Navigate the date-search form and confirm that the calendar selector and generated date fields have meaningful names and instructions.
4. Enter a valid date without a mouse.
5. Activate the calculation and confirm that the loading/status state is announced without trapping focus.
6. Confirm that calculation completion is understandable and does not trigger an excessive repeated announcement of the entire calendar.
7. Read the target result and confirm that year, cutlet and month information is understandable in context.
8. Navigate the calendar controls and verify that the target day and the currently displayed cutlet can be understood without relying on colour.
9. Open calculation/advanced settings and operate their controls with the keyboard.
10. Change language between English and Hebrew and confirm that language/direction and control names update while focus and calculation context remain understandable.
11. Produce an invalid date and confirm that the error is announced, understandable and associated with the task that failed.
12. On a wide desktop viewport, enable comparison and confirm that the table headers, row headers, target row and scrollable region are understandable.

## Other manual checks still required

The following are not fully established by automated tests and require human inspection:

- actual browser zoom at 200% and 400%;
- screen-reader announcement quality, verbosity and reading order;
- whether headings and explanatory wording make sense to a user, not merely whether their HTML structure is valid;
- operating-system high-contrast/custom-colour combinations beyond Chromium forced-colour emulation;
- visual focus visibility against every dynamically generated month palette and real display conditions;
- touch target usability on a physical mobile device, including spacing between adjacent targets;
- mixed Hebrew/Latin reading order in representative real screen readers;
- whether dynamic success/loading/error announcements are appropriately timed and neither silent nor excessively verbose;
- content comprehension and instructions, which cannot be proven by axe or DOM assertions.

## Interpretation of results

Treat the automated suite as a regression guard, not as an accessibility certificate. A clean run means that the tested scenarios did not produce targeted automated WCAG A/AA violations and that the explicit keyboard/layout/state invariants passed. It does not mean that every WCAG 2.2 AA success criterion has been audited manually.
