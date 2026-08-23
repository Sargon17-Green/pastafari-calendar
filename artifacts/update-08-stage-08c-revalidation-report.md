# Update 8 — Stage 8C Revalidation after Stage 8B final

## 1. Result

```text
STAGE_8C_REVALIDATION_RESULT = PASS
READY_FOR_STAGE_8D_FROM_8C = yes
production files changed during Stage 8C revalidation: none
Stage 8D executed: no
```

## 2. Current revision

- repository: `Sargon17-Green/pastafari-calendar`
- branch: `main`
- HEAD SHA: `aa626097a175a167ae022e706c6b704eeb55769c`
- tree SHA: `845b875bbead29c89d60c58dfa933c9893faa762`
- package version: `1.3.0`
- Node version: `v22.16.0`
- npm version: `10.9.2`
- working tree: uploaded ZIP without `.git`; `sources/מגילת העיתים.md` was locally normalized from the archive-escaped `#U05...` filename before checksum verification.
- uploaded archive SHA-256: `eec0b20ea6cb86557e289e5fe2f3f2f3dabbe14b463ffb4fe381a329b8379b2e`

## 3. Previous Stage 8C baseline

Previous Stage 8C recorded:

```text
previous Stage 8C inferred commit = 475acbc88c55d07051a67db872cc91a9021c4047
previous Stage 8C inferred tree   = 5b8d587dc48a7916b23fdbc48f85e3cecb3a21ca
STAGE_8C_RESULT                  = PACKAGE_AND_ARTIFACT_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8C       = yes
```

This revalidation is delta-oriented. It does not repeat the full Stage 8C crawl because the relevant delta is limited to final Stage-8B artifacts and checksum-manifest updates.

## 4. Stage 8B final status

Final Stage 8B artifacts are present:

- `artifacts/update-08-stage-08b-evidence-audit.json`
- `artifacts/update-08-stage-08b-final-report.md`
- `artifacts/update-08-stage-08b-final-sha256sums.txt`

The final Stage 8B report states:

```text
STAGE_8B_RESULT = EVIDENCE_AUDIT_PASS
READY_FOR_STAGE_8D_FROM_8B = yes
```

This satisfies the Stage 8C revalidation precondition.

## 5. Diff since previous Stage 8C

| Path | Classification | Blocking? |
|---|---|---:|
| `artifacts/update-08-stage-08b-evidence-audit.json` | `STAGE_8B_FINAL_ARTIFACT` | no |
| `artifacts/update-08-stage-08b-final-report.md` | `STAGE_8B_FINAL_ARTIFACT` | no |
| `artifacts/update-08-stage-08b-final-sha256sums.txt` | `STAGE_8B_FINAL_ARTIFACT` | no |
| `SHA256SUMS.txt` | `CHECKSUM_UPDATE` | no |

No `src/`, `browser/`, `types/`, or `package.json` production/distribution change was found in this revalidation delta.

## 6. Production/distribution stability

The monitored controlling hashes still match the Stage-7/final-revalidation evidence:

| File | Current SHA-256 | Expected source | Result |
|---|---|---|---|
| `src/5efdcc3e6fb071cbaffdcb117507a169dd76.js` | `99c7a18b015b669654eec06b49740df1b884465b43702b9705e4f6d9fd87ede9` | Stage 7 cross-environment | `PASS` |
| `browser/pastafari-calendar-core-chronicle.js` | `36fed61386d9c545a191393e4bfd647ccefbc26fef11bec88faa708ed69b77ea` | Stage 7 cross-environment | `PASS` |
| `browser/standalone/pastafari-date.js` | `f1adfc1f4e64d9fc7dcb591a7c5e852210e0d2de3ff3d2a08668a8c17ffbea2b` | Stage 7 final router repair revalidation | `PASS` |
| `browser/standalone/pastafari-date.min.js` | `7a2f60e304dfe1c8dc98d54fa894e337e9864648ff5b401a51e661e9f5290481` | Stage 7 final router repair revalidation | `PASS` |

Additional monitored package/runtime inputs:

| File | Current SHA-256 |
|---|---|
| `browser/pastafari-calendar-router-core.js` | `ca2e0544c9e73076cac24d218431e535d19a155298bdbf002b5e98bea3af5b03` |
| `package.json` | `5e02e6b190d57fea928ffe11fd84cf22573c02c0b635fc07372218565205a40f` |
| `types/5fd0767aaf5331241ec60f8540edf2a6.d.ts` | `255fea9e063bb08b0f4f7b97d0dc639a3509ded8416b234c9a625e7e7911b168` |

Conclusion: `productionChanged = false`; `distributionChanged = false`.

## 7. Stage 7 alignment

```text
controlling Stage 7 result = CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR
expected                   = CROSS_ENVIRONMENT_VERIFIED_AFTER_ROUTER_REPAIR
hash alignment             = PASS
matrix rerun               = NOT_REQUIRED_UNCHANGED_HASHES
```

The previous Stage-7 failure remains superseded by the router repair and final revalidation.

## 8. Root checksum result

After local ZIP filename normalization only:

```text
sha256sum -c SHA256SUMS.txt = PASS
```

Before creating this revalidation’s own artifacts, the root manifest had:

```text
entries = 776
duplicate entries = 0
stale entries = 0
missing current final Stage-8B entries = 0
```

This revalidation adds exactly these root-manifest entries:

- `./artifacts/update-08-stage-08c-revalidation.json`
- `./artifacts/update-08-stage-08c-revalidation-report.md`
- `./artifacts/update-08-stage-08c-revalidation-sha256sums.txt`

The final raw verification after adding them is recorded in the generated JSON as `PASS_EXPECTED_AND_VERIFIED_AFTER_ARTIFACT_CREATION` and was verified after manifest update.

## 9. Stage-specific manifests

| Manifest | Working directory | Result |
|---|---|---:|
| `artifacts/update-08-stage-08a-sha256sums.txt` | `artifacts/` | `PASS` |
| `artifacts/update-08-stage-08b-sha256sums.txt` | repository root | `PASS` |
| `artifacts/update-08-stage-08b-final-sha256sums.txt` | repository root | `PASS` |
| `artifacts/update-08-stage-08c-sha256sums.txt` | repository root | `PASS` |
| `artifacts/update-08-stage-08c-revalidation-sha256sums.txt` | repository root | `PASS` |

## 10. Broken-reference recheck

Stage 8C previously reported `brokenLiteralArtifactReferences = 4`. Recheck result:

| Source | Reference | Classification |
|---|---|---|
| `artifacts/update-08-stage-08b-report.md` | `artifacts/update-08-stage-08b-` | `FALSE_POSITIVE_PREFIX_REFERENCE / RESOLVED_BY_FINAL_8B` |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `FALSE_POSITIVE_PREFIX_REFERENCE / RESOLVED_BY_FINAL_8B` |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `FALSE_POSITIVE_PREFIX_REFERENCE / RESOLVED_BY_FINAL_8B` |
| `artifacts/update-08-stage-08b-evidence-ledger.json` | `artifacts/update-08-stage-08b-` | `FALSE_POSITIVE_PREFIX_REFERENCE / RESOLVED_BY_FINAL_8B` |

No real missing concrete artifact reference remains.

## 11. npm pack dry-run

`npm pack --dry-run --json` passed.

| Metric | Previous Stage 8C | Current | Result |
|---|---:|---:|---:|
| file count | `270` | `270` | `PASS` |
| package size | `90136568` | `90136568` | `PASS` |
| unpacked size | `120648213` | `120648213` | `PASS` |
| npm shasum | `ed545007704450e6bd202effd2807dcb9dd098f7` | `ed545007704450e6bd202effd2807dcb9dd098f7` | `PASS` |

Stage-8 artifacts are not included in the npm package candidate.

## 12. Tarball retest decision

```text
TARBALL_FULL_RETEST = NOT_REQUIRED_UNCHANGED_PACKAGE_INPUT
```

Reason: dry-run package metrics and npm integrity match previous Stage 8C, and production/distribution hashes are unchanged. The Stage 8C clean consumer smoke and Stage 7 package consumer evidence remain applicable.

## 13. Leakage scan

Package candidate scan result:

```text
update-08-stage-08b = 0
update-08-stage-08c = 0
STAGE_8B = 0
STAGE_8C = 0
artifacts/update-08 = 0
verification/update8 = 0
/mnt/data = 0
/home/oai = 0
/home/runner = 0
forbidden package paths = 0
```

Result: `PASS`.

## 14. Release checksum script warning

`npm run checksums:verify` still fails because `scripts/checksums.mjs verify` rejects committed `artifacts/*` entries by policy even while raw `sha256sum -c SHA256SUMS.txt` passes.

Classification:

```text
KNOWN_PREEXISTING_POLICY_MISMATCH
NON_BLOCKING_FOR_UPDATE_8_CLOSURE
```

This warning is unchanged from Stage 8C and is not promoted to a blocker for this delta revalidation.

## 15. Blockers

```json
[]
```

## 16. Final readiness

```text
READY_FOR_STAGE_8D_FROM_8A = yes
READY_FOR_STAGE_8D_FROM_8B = yes
READY_FOR_STAGE_8D_FROM_8C = yes
```

```text
STAGE_8D_PREREQUISITES = SATISFIED
```

Stop here. Stage 8D was not executed.
