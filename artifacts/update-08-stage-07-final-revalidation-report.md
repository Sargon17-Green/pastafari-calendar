# Update 8 — Stage 7 final focused revalidation

## Revision

- Repository: `Sargon17-Green/pastafari-calendar`
- Commit: `0328180ed6331e9ea935a4795c3064cc92930af6`
- Defect repaired: `ROUTER_IDLE_SHUTDOWN_INFLIGHT_AUTHORITATIVE`
- Production files changed by this final revalidation: **none**

## Final evidence

The canonical CI rebuild used `esbuild 0.28.2` and reproduced both standalone artifacts byte-for-byte:

```text
f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b  browser/standalone/pastafari-date.js
7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481  browser/standalone/pastafari-date.min.js
```

The committed bundles in the supplied repository snapshot match those hashes exactly. The current CI artifact completed the original Stage-7 standalone router-race reproduction in real Chromium 151 for both bundles:

```text
old race reproduced: false
unminified: PASS
minified: PASS
semantic parity: true
```

Focused revalidation on the supplied current snapshot:

```text
Node public shared vectors:        13/13 PASS
Focused failure/recovery families: 4/4 PASS
Repeated failed construction:      100/100 PASS
Router + standalone static:        31/31 PASS
npm tarball clean consumer:        PASS
Supply-chain policy:               PASS (73/73 pinned, 0 mutable refs)
```

The npm tarball still exports 98 public names and returns the canonical `present_same` value after a failed construction.

## Unchanged Stage-7 surfaces

GitHub comparison from pre-repair commit `547f07ca...` to current `0328180e...` shows that the repair did not modify the browser authoritative core or fast engine. Their original Stage-7 PASS evidence therefore remains applicable. A redundant local rerun of the heavy fast/history harness exceeded this environment's execution window and is not treated as a semantic failure.

## ZIP filename note

The downloaded repository ZIP represents `sources/מגילת העיתים.md` with a `#U05...` encoded filename. The file exists under its correct Unicode name in GitHub at the current commit, so this is an export/ZIP filename encoding artifact, not a repository checksum defect.

## Result

```text
STAGE_7_RESULT = CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR
READY_FOR_STAGE_8 = yes
```

This final revalidation supersedes the earlier Stage-7 failure result while preserving the original failure artifacts as historical evidence.
