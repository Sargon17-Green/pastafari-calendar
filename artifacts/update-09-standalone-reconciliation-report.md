# Update 9 Standalone Reconciliation

## Scope

This is a narrow follow-up to Update 9 after GitHub Actions reported a generated-standalone drift.
No production source logic was changed in this reconciliation.

## Trigger

GitHub Actions run checked out commit:

```text
90d2a0fd9ee70df36c64c18f2fa83af256d2d234
```

The `node-test` job completed `npm run build:standalone`, then failed on:

```text
git diff --exit-code -- browser/standalone/pastafari-date.js browser/standalone/pastafari-date.min.js
```

Classification:

```text
STANDALONE_GENERATED_ARTIFACT_DRIFT
```

## Reconciled files

The generated artifacts uploaded by the same CI run were used as the canonical generated outputs:

```text
artifact: update3-generated-standalone-90d2a0fd9ee70df36c64c18f2fa83af256d2d234
artifact id: 9485404055
artifact zip digest from CI log: d8976b41fbdd03b00703817908d1eb548591bde3b2c927a987a37045780ddb4c
```

Committed generated artifact hashes:

```text
ee59a5b26a8f87f9d85236c29594a39a3219bf62e550ce213a0bd38d1c3243c2  browser/standalone/pastafari-date.js
7ab742121876c268bef0bef81f46b6caa3c293b8e1e2a0cce5fa2f7231599fcf  browser/standalone/pastafari-date.min.js
```

These match the `Record generated standalone hashes` step from the failing CI run.

## Verification performed locally after reconciliation

```text
node --test test/update09-proleptic-negative-year.test.js test/standalone-build.test.js
npm run package:verify
npm run checksums:generate
npm run checksums:verify
```

Results:

```text
Update 9 + standalone selected tests: 10/10 PASS
package:verify: PASS
checksums:generate: PASS
checksums:verify: PASS
```

## Files changed in this reconciliation

```text
browser/standalone/pastafari-date.js
browser/standalone/pastafari-date.min.js
SHA256SUMS.txt
artifacts/update-09-standalone-reconciliation-report.md
```

## Conclusion

The uploaded Update 9 source change was correct, but the generated standalone bundle was stale.
This package reconciles only the generated standalone artifacts and repository checksums.

```text
READY_TO_RERUN_CI = yes
```
