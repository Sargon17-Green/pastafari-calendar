# Update 16 — CI write-mode checksum catch-up

## Result

`UPDATE_16_CI_WRITE_MODE_CHECKSUM_CATCHUP_PASS`

## Context

The earlier checksum catch-up tried to make `test:update16` read-only. That was the wrong fix for this repository's current Update 16 CI contract: the Update 16 authority test intentionally refreshes the machine-readable audit evidence during `npm test`.

The correct fix is to keep the write-mode evidence test and commit the post-write audit artifact and checksum manifests.

## Change

- Keep `npm run test:update16` in write-mode.
- Restore `test/update16-authority-boundary.test.js` to the write-mode evidence test.
- Commit the post-write `artifacts/update16/oracle-authority-audit.json`.
- Regenerate `docs/SHA256SUMS.txt` and root `SHA256SUMS.txt` from that post-write state.

No vectors, generators, reference logic, production logic, or calendar semantics were changed.

## Verification

```text
npm run test:update16
PASS — 10/10

npm run checksums:generate
PASS — docs=113, repository=934

npm run checksums:verify
PASS — docs=113, repository=934

sha256sum -c SHA256SUMS.txt
PASS
```

## Scope

This is a checksum/evidence catch-up only. It supersedes the erroneous read-only-test catch-up direction. Update 17 remains the place for full canonical corpus regeneration.
