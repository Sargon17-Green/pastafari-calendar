# Releasing Pastafari Calendar

This repository has one authoritative release-preparation path. It prepares and verifies a release candidate; it does **not** publish to npm, create a Git tag, create a GitHub Release, or deploy GitHub Pages.

## Prerequisites

- Start from the source state intended for the release. `release:prepare` may be run with intentional source changes present; `release:verify` requires a clean committed working tree.
- Node must satisfy `package.json#engines` (`>=18`). The manual release-verification workflow uses Node 22; the repository's separate minimum-runtime CI job still tests exactly Node 18.0.0.
- Install the locked dependencies with `npm ci`. Do not use `npm install` as a release-preparation step.
- Browser gates require the Playwright browsers used by the repository. A CI-style Linux setup is `npx playwright install --with-deps chromium firefox`.

`package.json` is the source of truth for the npm package version. `package-lock.json` must carry the same root version. Engine/model/sauce/astronomical/cache identifiers are separate identifiers and are not forced to equal the package version.

## Normal release flow

1. Bump the package version only when a bump is intended. `npm version --no-git-tag-version <version>` is sufficient and does not create a tag.
2. Make the intended source changes.
3. Run `npm run release:prepare`.
4. Review every resulting source/generated diff. Preparation may leave intended generated changes; it never means an unreviewed tree is ready to publish.
5. Commit the reviewed release candidate.
6. From the clean committed tree, run `npm run release:verify`.
7. Ensure the repository's ordinary CI is green as well, including the separate visual, checkpoint, minimum-Node, performance-regression, and independent-implementation jobs that are intentionally not duplicated by the local release verifier.
8. Create/push a tag or publish only as a separate deliberate operation. The optional release CLI tag check accepts `v<package.json version>`.
9. Perform npm/GitHub Release/Pages publication separately under the existing project policy.
10. After publication, smoke-check the public npm package and deployed Pages site.

## What `release:prepare` changes

Preparation regenerates current generated documentation facts (`docs:generate`), synchronizes localized Web App Manifest metadata (`sync:manifest-i18n`), regenerates the four Pages engine copies, rebuilds both version-controlled standalone bundles, proves two complete standalone builds are byte-identical, validates PWA cache/version coupling, and regenerates both SHA-256 snapshots in deterministic order.

It then runs the release-critical correctness and browser gates, verifies the final checksum state, and validates the exact tarball produced by `npm pack`. When Git is available, the orchestrator rejects new working-tree changes created by the pipeline outside its declared generated-output set.

The PWA cache identifier in `docs/sw.js` is intentionally not bumped automatically. `verification/pwa-cache-state.json` records the digest of `CORE_ASSETS`. If those bytes change while `docs/sw.js` keeps the same `VERSION`, preparation fails and requires a deliberate cache-version bump. After such a bump, preparation updates the baseline.

Checksum ownership is preserved: `docs/SHA256SUMS.txt` covers files under `docs/` except itself, while root `SHA256SUMS.txt` is the repository-wide integrity snapshot except itself and ignored development/release work products. The docs manifest is generated first so the root snapshot covers its final bytes.

## What `release:verify` proves

Verification is read-only with respect to version-controlled files and requires a clean Git tree at both start and finish. It checks package/lock version consistency and the Node/tool environment; checks generated documentation and manifest-i18n drift; validates locale/reverse-i18n coverage; verifies Pages copies; rebuilds standalone twice without writing checked-in outputs; compares both builds byte-for-byte and against the checked-in artifacts; validates the PWA cache baseline; and verifies both SHA-256 manifests.

The required test tier also runs `npm run test:release`, which is the complete non-soak Node correctness gate (`test:fast` + `test:compatibility` + `test:deep`), plus the i18n support-level browser smoke, file-protocol standalone tests, PWA offline smoke, reverse-UI smoke, astronomical day-boundary smoke, the automated accessibility gate, and the lightweight benchmark/API smoke. `npm test` itself is intentionally the fast developer gate; see `TESTING.md` for the tier map. The full visual regression workflow, checkpoint matrices, exact Node-18 job, performance-regression comparison, independent-implementation matrix, long soaks, full benchmarks, and full user E2E remain separate CI gates and are reported as **NOT RUN** by `release:verify` rather than silently treated as passed.

Package verification parses `npm pack --json --dry-run`, checks public export/type/main targets against the packed file list, creates the real tarball outside the repository, installs it into a temporary consumer with lifecycle scripts disabled, imports the root and principal subpath exports, and performs a small fast-engine conversion. Temporary tarball/install directories are removed in `finally` cleanup.

On a clean committed tree, verification also runs the repository's existing SHA-manifest completeness checker so the root checksum list must cover the committed file set exactly.

## Reports and failure recovery

Every run writes `artifacts/release/report.json`; `artifacts/` is ignored by Git and is not a release artifact. The report records package version, Git commit/branch and working-tree state when available, Node/npm/esbuild/Playwright/axe-core plus launched Chromium/Firefox versions, step results and durations, standalone build hashes, checksum coverage, PWA state, package contents metadata, and the explicit list of suites not run by the release verifier.

On failure, fix the named invariant rather than bypassing it. Typical recovery is to run the corresponding generator (`docs:generate`, `sync:manifest-i18n`, `sync:pages-reverse`, or `build:standalone`), deliberately bump `docs/sw.js` `VERSION` if cached core assets really changed, and then rerun `npm run release:prepare`. For checksum-only drift, regenerate through the release pipeline instead of editing hash lines manually. After reviewing and committing the generated diff, rerun `npm run release:verify` from the clean tree.
