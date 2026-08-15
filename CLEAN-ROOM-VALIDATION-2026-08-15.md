# Clean-room validation — 2026-08-15

## Status

**PASS**

This document records the clean-room validation of the Pastafari Calendar repository performed on 2026-08-15.

Validated repository commit:

`40b6a73fcac82f387e5552204a039f480cb234c1`

The validation used a fresh Git clone, a dedicated empty npm cache, and a dedicated Playwright browser cache. The tracked working tree was checked before and after the test process.

## Environment

- OS: Microsoft Windows NT 10.0.26200.0
- Architecture: x64
- Git: 2.55.0.windows.3
- Node.js: v22.23.2
- npm: 10.9.8

## Automated clean-room result

The automated clean-room run completed successfully with overall status **PASS**.

The following checks passed:

- fresh `git clone`
- clean tracked Git status immediately after clone
- binary SHA-256 verification of `SHA256SUMS.txt` before dependency installation
- `npm ci` using a dedicated fresh npm cache
- clean tracked Git status after `npm ci`
- `npm run build:standalone`
- byte-for-byte standalone reproducibility check:
  - `browser/standalone/pastafari-date.js`
  - `browser/standalone/pastafari-date.min.js`
- `npm test`
- representative checkpoint-side validation
- exhaustive checkpoint-side validation
- checkpoint reconstruction validation
- fresh Playwright installation for Chromium and Firefox
- `npm run test:file-protocol`
- `node scripts/run-pwa-offline-smoke.mjs`
- `npm run test:day-boundary`
- binary SHA-256 verification after all tests
- clean final tracked Git status
- empty final Git diff
- absolute-local-path scan

The full automated run took approximately 41 minutes.

## Main test suite

`npm test` completed with:

- tests: 86
- passed: 82
- failed: 0
- skipped: 4
- cancelled: 0
- todo: 0

The skipped tests were optional checkpoint/soak-related cases and were not failures. The checkpoint modes required for validation were run separately and passed.

## File-protocol validation

`npm run test:file-protocol` passed in both:

- Chromium
- Firefox

Both the readable and minified standalone bundles were tested.

For every tested file-protocol case:

- offline mode was enabled;
- 15 smoke tests passed;
- 25 equivalent vectors were checked;
- remote requests: 0.

This confirms that the standalone component works from `file://` without network dependency.

## PWA offline validation

The PWA offline smoke test passed.

The test verified that:

- the application first loaded successfully online;
- the Service Worker became active and controlled the page;
- the complete declared precache was available;
- the ordinary Chromium HTTP cache was cleared;
- the local HTTP server was stopped before the offline phase;
- the browser context was switched to offline mode;
- the page reloaded successfully from the Service Worker;
- same-origin offline subresources were served by the Service Worker;
- the navigation fallback worked while offline;
- no page errors, unexpected console errors, bad responses, or unexpected request failures occurred.

## Astronomical day-boundary validation

`npm run test:day-boundary` passed.

The smoke test verified:

- Kisurra fallback and offline astronomical-day transition;
- a manually selected day of working remains fixed without an unwanted alert;
- granted device location replaces the Kisurra boundary as intended.

## Additional disconnected-network execution

After the automated clean-room run had completed its bootstrap steps, the already-created clean clone was tested again while the computer was disconnected from the network.

The following commands all completed successfully without reconnecting:

```text
npm test
npm run build:standalone
git diff --exit-code -- browser/standalone/pastafari-date.js browser/standalone/pastafari-date.min.js
npm run test:file-protocol
node scripts/run-pwa-offline-smoke.mjs
npm run test:day-boundary
git status --short --untracked-files=no
```

The final Git status was empty.

This additional run demonstrates that, once dependencies and browser binaries are present, the repository's tested build and execution paths do not require external network access.

## Provenance and integrity

The clean-room run identified and tested commit:

`40b6a73fcac82f387e5552204a039f480cb234c1`

SHA-256 verification succeeded both before dependency installation and after the complete automated test run.

The standalone rebuild produced no tracked diff, and the final tracked working tree remained clean.

## Items not covered by this validation

The following items were not part of this local validation:

- an exact Node.js 18.0.0 runtime smoke test was not rerun locally;
- a clean-room run starting from a downloaded repository ZIP/archive instead of a fresh Git clone was not performed.

These are recorded as scope limitations, not failures of the validated clean-clone workflow.

## Conclusion

The repository successfully passed a fresh-clone clean-room validation on Node.js 22, including build reproducibility, the main test suite, checkpoint validation, standalone `file://` operation, PWA offline behavior, astronomical day-boundary behavior, checksum verification, and a clean final working tree.

A subsequent disconnected-network run also completed successfully.

**Final result: PASS.**
