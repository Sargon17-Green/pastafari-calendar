# Update 13 — Stage 2 CI handoff

Base branch commit for this delta: `69f9f1252a7a92acd9cb953d6b7cdd8c6bc63c96`
Original audited `main` baseline: `d8361bf852f54597f62daeaa293443e5c5d9ef84`
Package version: `1.3.0`

## Evidence recovered from the first branch CI run

- Intl/locale/timezone matrix: PASS, 15/15 cases.
- Fault modes: normal, throwing Intl, fake parts, wrong values and alien names all PASS.
- Locale matrix: en, he, ar, zh, fa, ja all preserve structured normative values.
- Timezone matrix: UTC, Asia/Jerusalem, America/New_York and Asia/Shanghai all preserve structured normative values.
- Random independent-reference differential: PASS, 64 samples per representation, 0 mismatches in normal/throw/nonsense modes.
- Canonical standalone rebuild completed and both generated bundles contain the Update 13 semantic-firewall markers.
- Canonical standalone SHA-256:
  - `browser/standalone/pastafari-date.js`: `2a3dbef78549509987daf157261b46f8f259710bf92fa5e8c3f44de38bd2d095`
  - `browser/standalone/pastafari-date.min.js`: `e02ec199fb3a899f6095eec2d6c75ac99cfe24286782460f33ea00b51183e036`

## Why a second branch CI run is required

The Stage 1 browser runner printed Chromium/Worker evidence to stdout but did not persist
`artifacts/update-13-browser-worker-smoke.json`. Therefore the first uploaded audit artifact
cannot prove Chromium/Worker PASS even though the browser test may have run.

This delta fixes the runner so that it always writes a machine-readable PASS/FAIL artifact,
including browser version, page result, Worker result and runner errors.

The dedicated Update 13 workflow now also writes `artifacts/update-13-ci-run-status.txt`
with the exit status of every subtest, and verifies the committed checksum manifests before
creating transient CI evidence.

## Merge rule

Do not merge the branch into `main` solely on the first audit artifact.
Run CI again after applying this delta. Merge only after the second run proves the required
Node, checksum, environment, differential, Update 10/11/12 regression, standalone,
Chromium and Worker checks.
