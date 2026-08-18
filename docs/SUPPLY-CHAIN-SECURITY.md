# Software supply-chain security

This document describes the repository's build trust boundaries and the checks that keep them explicit. It is intentionally narrower than vulnerability management: pinning a dependency does not prove that dependency is safe, and a clean vulnerability scan does not make a mutable build reference reproducible.

## GitHub Actions policy

External GitHub Actions and reusable workflows must be pinned to a full 40-hex commit SHA. Human-readable version comments are recommended, but the SHA is the security boundary.

Current reviewed pins:

| Action | Reviewed reference |
| --- | --- |
| `actions/checkout` | `3d3c42e5aac5ba805825da76410c181273ba90b1` (`v7.0.1`) |
| `actions/setup-node` | `820762786026740c76f36085b0efc47a31fe5020` (`v7.0.0`) |
| `actions/setup-python` | `ece7cb06caefa5fff74198d8649806c4678c61a1` (`v6.3.0`) |
| `actions/setup-java` | `03ad4de0992f5dab5e18fcb136590ce7c4a0ac95` (`v5.6.0`) |
| `actions/upload-artifact` | `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a` (`v7.0.1`) |
| `ruby/setup-ruby` | `95ef2b042f9d7a56d8268cba8559e2842e2ad01b` (reviewed `v1` branch head, 2026-07-22) |

Local Actions (`./...`) do not need a commit pin because their source is already part of the checked-out repository. Docker Actions, if introduced, must use an image digest rather than a mutable tag.

### Updating an Action

1. Start from a Dependabot pull request or an explicitly selected upstream version.
2. Identify the upstream release/tag or, where the upstream intentionally exposes a moving major branch, the exact upstream commit to be reviewed.
3. Verify the full commit SHA from the upstream repository/release metadata. Never infer or guess a SHA.
4. Update `uses: ...@FULL_SHA` and the adjacent version/comment when applicable.
5. Run `npm run security:supply-chain` and the affected CI jobs.
6. Review the upstream change and merge only after CI and human review. Do not replace the SHA with a mutable tag for convenience.

Dependabot is configured weekly for both `npm` and `github-actions`. No auto-merge policy is configured.

## GitHub token permissions and untrusted pull requests

The current benchmark, implementations, test, and visual workflows that run on `pull_request` declare only:

```yaml
permissions:
  contents: read
```

They do not receive repository write permissions through workflow configuration and they do not reference repository secrets. The supply-chain validator rejects write permission declarations in workflows that run on `pull_request` and rejects `pull_request_target` by default because combining a privileged base-repository context with untrusted pull-request code is a materially different trust boundary.

If a future deployment or release workflow genuinely needs write access, scope that permission to the smallest possible job and do not make the privileged job execute untrusted pull-request code.

## npm dependency policy

`package-lock.json` is the installation resolution. CI installs with `npm ci`; the semver intent in `package.json` does not replace the lockfile.

The validator requires:

- `package-lock.json` to exist and use lockfile version 3;
- root dependency metadata in the lockfile to match `package.json`;
- npm-registry tarballs to carry integrity metadata;
- no Git/URL direct dependencies;
- no unexpected non-registry resolved package URLs;
- an exact review list for packages marked by npm as having lifecycle install scripts.

The currently reviewed lifecycle-script entries are:

- `esbuild@0.28.2`;
- `fsevents@2.3.2` (optional, macOS-only in the current lockfile).

This is not a claim that those packages are harmless. It means their install-time code is an explicit trust boundary instead of an unnoticed one. `esbuild` normally uses its platform package; its installer also contains a fallback network path for obtaining the exact-version platform binary and verifies that fallback against an embedded SHA-256 value. The repository therefore does **not** use a blanket `--ignore-scripts` policy, which would break legitimate installation behavior without eliminating the need to trust the dependency.

No separate hand-maintained checksum list is used for npm tarballs: npm's lockfile integrity metadata is the appropriate mechanism for that layer.

## Playwright and local command execution

Playwright is a locked devDependency. CI invokes its local executable as:

```sh
./node_modules/.bin/playwright install ...
```

rather than through `npx`. This removes the `npx` fallback path that can download and execute a package not already installed locally.

Playwright browser binaries are still downloaded during CI. Their browser revisions are selected by the locked Playwright version, but the download service remains an external trust/availability boundary. `--with-deps` can also install operating-system packages on the GitHub-hosted Ubuntu runner.

## Build network boundary

The standalone build script uses repository files plus the locally installed `esbuild` package. It does not perform a network fetch itself, and it rejects generated standalone output that contains a runtime `fetch()` call. After npm/bootstrap dependencies are present, the standalone build is intended to be network-independent.

Network activity remains expected during bootstrap/setup, including:

- npm package retrieval from the npm registry when packages are not already cached;
- Node/Python/Java/Ruby tool setup performed by pinned setup Actions;
- Ruby release-asset retrieval performed by `ruby/setup-ruby` when the requested interpreter is not already available;
- Playwright browser downloads and operating-system dependencies;
- `apt-get` packages used for C/C++/COBOL toolchains.

GitHub-hosted runner images and their preinstalled/system package repositories remain trust boundaries. Tool versions such as `ubuntu-latest`, Node `22`, Python `3.13`, Java `17`, and Ruby `3.3` intentionally describe supported toolchain lines rather than a byte-for-byte runner image. The repository's reproducibility checks are intended to detect relevant output drift caused by those boundaries.

## Build and artifact integrity

The existing reproducibility and checksum mechanisms remain authoritative. CI rebuilds the standalone files and requires `git diff --exit-code` for the generated outputs; the release-verification workflow also performs cross-platform standalone byte-identity checks. The repository's existing `scripts/checksums.mjs` owns both `SHA256SUMS.txt` and `docs/SHA256SUMS.txt`; this hardening reuses those manifests and does not introduce a parallel checksum system.

The repository now has a manual `release-verification.yml` workflow, but it is explicitly an **unpublished** release-candidate verification path. It runs with `contents: read`, verifies the release candidate, and uploads only its machine-readable report. The current workflows upload failure/benchmark/baseline/release-verification artifacts but do not download artifacts into a later privileged deployment or publication job. Artifact names are derived from GitHub-provided run/commit identifiers rather than untrusted pull-request text. There is still no npm publication step, so npm publish provenance, SLSA, SBOM generation, and artifact attestations are not added here.

## Static validator

Run:

```sh
npm run security:supply-chain
```

The validator is dependency-free and runs before `npm ci` in every current npm-installing CI job, including release verification. It scans every workflow file. It checks:

- every external `uses:` reference is a full 40-hex commit SHA;
- Docker Actions, if any, use a SHA-256 image digest;
- `npx` is absent from CI and package scripts;
- `pull_request` workflows do not declare write permissions;
- `pull_request_target` is rejected unless the policy is deliberately changed and reviewed;
- the lockfile exists, matches direct dependency metadata, and retains registry integrity fields;
- Git/URL dependency sources are not introduced silently;
- lifecycle-script packages match the explicit reviewed package/version set;
- `.npmrc`, if introduced, does not silently disable the lockfile or redirect the registry without review.

The check intentionally does not require a version comment next to a SHA. The immutable SHA is the enforced property; the comment is maintenance metadata.

## What this policy does not prove

These controls reduce mutable external code and make remaining trust boundaries reviewable. They do not prove that a pinned Action or npm package contains no vulnerability, rule out zero-days, secure GitHub or npm infrastructure, or make a GitHub-hosted runner image cryptographically reproducible.
