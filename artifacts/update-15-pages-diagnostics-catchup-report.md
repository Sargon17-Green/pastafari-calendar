# Update 15 — Pages diagnostics catch-up

## Result

`NODE_TEST_PAGES_DIAGNOSTICS_COPY_MISMATCH_FIXED`

## Trigger

CI `node-test` failed during `npm test` in `test/pages-reverse-engine.test.js`:

```text
not ok 85 - Pages reverse artifact is byte-identical to browser/pastafari-diagnostics.js
pastafari-diagnostics.js must be copied from browser/ without modification
```

The prior Update 15 delta updated `browser/pastafari-diagnostics.js`, and the standalone catch-up updated generated standalone files, but the GitHub Pages engine copy was still stale.

## Change

Copied:

```text
browser/pastafari-diagnostics.js
```

to:

```text
docs/engine/pastafari-diagnostics.js
```

No semantic logic was changed beyond propagating the already-reviewed diagnostics fix to the Pages engine artifact.

## Verification

```text
node --test test/pages-reverse-engine.test.js
PASS — 9/9

node scripts/checksums.mjs generate
PASS

node scripts/checksums.mjs verify
PASS
```

## Status

This is a generated/copied artifact catch-up only. Re-run GitHub Actions after upload.
