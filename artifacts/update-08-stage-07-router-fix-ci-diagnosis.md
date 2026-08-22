# Update 8 — Stage 7 router-fix CI diagnosis

## Conclusion

The red general CI jobs supplied from runs `88361473587` and `88361473549` do **not** show a regression in the router fix.

They fail before their benchmark/visual payloads start, at the repository-wide supply-chain gate:

```text
npm run security:supply-chain
```

The cause is the newly added Stage-7 verification workflow, not production runtime behavior.

## Exact policy violations

The supply-chain checker reported four violations in:

```text
.github/workflows/update-08-stage-07-router-fix.yml
```

1. `actions/checkout@v4` was not pinned to a full 40-hex commit SHA.
2. `actions/setup-node@v4` was not pinned to a full 40-hex commit SHA.
3. `npx playwright ...` is forbidden because `npx` may fall back to remote execution.
4. `actions/upload-artifact@v4` was not pinned to a full 40-hex commit SHA.

Because workflow changes cause conservative/full CI classification, these policy violations propagated into benchmark, memory-smoke, and visual jobs.

## Correction

The workflow now uses the same pinned actions and local Playwright invocation already used elsewhere in the repository:

```text
actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
actions/setup-node@820762786026740c76f36085b0efc47a31fe5020
actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a
./node_modules/.bin/playwright install --with-deps chromium
```

The generated-standalone scope check was also made idempotent: after the canonical bundles are committed, a canonical rebuild may legitimately produce no diff; before they are committed, exactly the two expected standalone files remain the only allowed diff.

## Dedicated Stage-7 workflow evidence

The generated artifact supplied from the dedicated router-fix workflow is positive evidence:

- canonical standalone build: PASS;
- `esbuild`: `0.28.2`;
- both artifacts reproduced byte-for-byte across two builds;
- standalone static tests: `3/3 PASS`;
- real Chromium race reproduction: PASS;
- old `ERR_ENGINE_TERMINATED` race was not reproduced;
- unminified/minified semantic parity: PASS.

Generated hashes:

```text
f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b  browser/standalone/pastafari-date.js
7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481  browser/standalone/pastafari-date.min.js
```

## Status

```text
CI_FAILURE_CLASS = WORKFLOW_SUPPLY_CHAIN_POLICY
ROUTER_FIX_RUNTIME_EVIDENCE = PASS
CANONICAL_STANDALONE_REBUILD = PASS
READY_FOR_STAGE_8 = no
```

Stage 8 remains blocked until the corrected workflow and generated standalone bundles are committed and the focused Stage-7 rerun is green.
