# Calendar round-trip audit — final upload set

Verified against current `main` commit:

`599a41c395193e8a2a3f3f2ddcaf86ddad81afb1`

## Add to repository

1. `scripts/run-calendar-roundtrip-audit.mjs`
2. `scripts/run-calendar-roundtrip-browser-smoke.mjs`
3. `test/calendar-roundtrip-browser-smoke.html`
4. `artifacts/calendar-roundtrip/report.md`
5. `artifacts/calendar-roundtrip/report.json`
6. `artifacts/calendar-roundtrip/failures/failure-1.json`

The report records:
- 19 calendars tested
- 134,873 round trips
- 0 JDN mismatches
- 1 validation failure in `hindu-old-lunar`
- browser smoke PASS in Chromium 151.0.7922.34
- SHA-256 provenance for the relevant current-main source files

No production converter, Pastafari engine, locale file, app behavior, or workflow is changed by this upload.
