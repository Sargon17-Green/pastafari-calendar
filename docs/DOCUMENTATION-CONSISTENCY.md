# Documentation consistency checks

This repository deliberately contains several kinds of prose. The documentation checker is intentionally narrow: it validates only current technical facts that have an explicit machine-readable or code-derived source of truth. It does not try to decide whether free-form, historical, literary, humorous, or intentionally absurd text is “correct”.

Run the checks with:

```sh
npm run docs:check
```

If a generated fact changes, update the generated block with:

```sh
npm run docs:generate
npm run docs:check
```

The generator is deterministic. It does not write timestamps, hostnames, local paths, random values, or network-derived data.

## Current generated facts

The block below is generated from repository sources of truth. Edit the surrounding explanation normally, but do not hand-edit the generated block.

<!-- BEGIN GENERATED: project-facts -->
- Current package version: `1.3.0`.
- Minimum Node.js requirement: `>=18`.
- Registered locale resources: **72**. Support status: complete **2**, partial **70**, experimental **0**. These are registry policy/status facts, not a linguistic-quality certification.
- Package entry points: `.`, `./reverse`, `./constraints`, `./browser/*`, `./package.json`.
- Canonically accepted independent implementations: **5** (C++20, Python 3, C17, Java 17+, Ruby).
- Normative source path: `../sources/מגילת העיתים.md`; declared SHA-256: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.
<!-- END GENERATED: project-facts -->

## Sources of truth

| Fact | Source of truth | Validation |
|---|---|---|
| package version | [`../package.json`](../package.json) `version` | exact/generated |
| minimum Node.js version | [`../package.json`](../package.json) `engines.node` | generated and compared with the minimum-runtime CI job |
| npm scripts | [`../package.json`](../package.json) `scripts` | `npm run <script>` references in current technical documentation are checked, but never executed by the docs checker |
| package entry points and target files | [`../package.json`](../package.json) `exports` | generated; concrete targets must exist with exact casing; documented package imports must match an export |
| registered locale resources and support levels | [`./i18n/registry.js`](./i18n/registry.js) `LOCALES` / `SUPPORT_LEVELS` | computed statically; total and complete/partial/experimental counts are generated/guarded, codes/assets must be unique, and each locale asset must exist with exact casing |
| accepted independent implementations and normative source path | [`../implementations/implementations.json`](../implementations/implementations.json) | computed from `canonicalStatus: "pass"`; implementation paths, source path, and current language summary are checked |
| normative source SHA-256 provenance | [`../sources/SHA256SUMS.txt`](../sources/SHA256SUMS.txt) | the SHA declared by `implementations.json` must equal the existing source-manifest entry; the docs checker does not recompute file hashes |
| standalone bundle names | [`../scripts/build-standalone.mjs`](../scripts/build-standalone.mjs) | output names are derived from build declarations and checked against tracked artifacts/current browser documentation |
| CI Node versions | `.github/workflows/*.yml` / `.yaml` | every numeric `node-version` pin is compared with `engines.node`; the exact minimum-runtime job remains guarded in [`../.github/workflows/test.yml`](../.github/workflows/test.yml) |
| current local Markdown links | repository tree | target existence and exact case; external URLs are excluded |

The root `SHA256SUMS.txt` remains the repository checksum mechanism and is verified separately in CI with `sha256sum -c SHA256SUMS.txt`. The documentation checker does not implement a second checksum algorithm; for normative-source provenance it compares metadata against the already-maintained `sources/SHA256SUMS.txt` entry.

## Current-state versus historical documents

Strict current-state checks are deliberately opt-in. The maintained current-state set is centralized in `DOCUMENT_CLASSES.current` in `scripts/docs-consistency.mjs`. It includes the live site/i18n/browser documentation, accessibility and visual-test instructions, the current benchmark harness documentation, implementation status documentation, the implementation READMEs, the COBOL qualification instructions, and this file.

Historical validation, audit, benchmark, conformance, and evidence documents are listed in `DOCUMENT_CLASSES.historical`. Old package versions, locale counts, Node versions, hashes, test counts, timings, and commits in those documents are snapshots, not current-state claims. The checker requires historical entries to retain explicit snapshot context, but it does not compare their recorded values with current `main`.

`verification/README.md` and `verification/evidence/multilang/README.md` are treated as indexes of historical evidence even though their filenames are generic: their claims point to dated runs, commits, versions, or artifact hashes. The dated evidence records beneath `verification/evidence/` are likewise snapshots and are not rewritten to current `main`.

`implementations/implementations.json` records the current normative repository source path. The checker resolves that path relative to `implementations/` and requires the exact Unicode filename [`../sources/מגילת העיתים.md`](../sources/%D7%9E%D7%92%D7%99%D7%9C%D7%AA%20%D7%94%D7%A2%D7%99%D7%AA%D7%99%D7%9D.md) to exist. Historical conformance records may retain an older path spelling as part of the snapshot they describe.

The intentionally free-form set includes the root `README.md` and the various `UPLOAD-*.md` texts that are not maintained as current technical contracts. The validator has no general-purpose prose heuristics for them. A future technical fact in such a document should be added as an explicit assertion rather than widening the checker to scan arbitrary text.

## What the checker validates

The assertions are centralized in `scripts/docs-consistency.mjs`. They currently protect:

- generated project facts;
- the locale-count claim in `docs/README.md` and the complete/partial support-status claims in `docs/I18N.md` and `docs/I18N-SUPPORT-LEVELS.md`;
- the package-version example in `browser/README.md`;
- the implementation target/count/language summary in `implementations/docs/LANGUAGES.md`;
- the `SUPPORT_LEVELS` inventory, per-level counts, and uniqueness/file existence for registered locale assets;
- concrete `package.json` export/type targets;
- accepted implementation directories;
- normative source path and declared SHA-256 against the source checksum manifest;
- standalone build outputs;
- the Node minimum against CI runtime pins;
- local Markdown links in current-state documents, including case sensitivity;
- conservative repository-path references found as single inline-code paths, resolved relative to the document and repository root while excluding generated `build/` outputs;
- conservative `npm run <script>` references found only in fenced or inline code;
- conservative `pastafari-calendar[/subpath]` imports found only in fenced or inline code.

Error messages name the document, the documented value/reference, the actual value where applicable, and the source of truth.

## Adding a new guarded fact

A new check should be added only when both sides are unambiguous:

1. identify one authoritative repository source;
2. identify the exact current documentation claim that mirrors it;
3. add a focused assertion or a generated field;
4. add a regression test showing that a deliberate mismatch fails;
5. keep historical snapshots outside current-state comparison.

For frequently changing scalar facts, prefer the generated project-facts block or another narrowly generated block. Do not generate surrounding prose merely to avoid maintaining documentation.

## Failure repair

For an ordinary assertion failure, fix whichever side is actually wrong. The checker is not authority over the product: if the code/API/registry is correct and the current documentation is stale, update the documentation. If a generated block is stale, run `npm run docs:generate` and review the resulting diff. If the intended source of truth changed, update the extractor/assertion explicitly rather than weakening it with a broad regex.

## Deliberate non-goals

The checker does not attempt to validate:

- truth, taste, style, humor, historical narrative, or other free-form prose;
- linguistic quality of translations; `complete`/`partial`/`experimental` are project policy/status values from the registry, not an automated proof of idiomatic or correct language;
- availability or correctness of external URLs on every push;
- Markdown anchor rendering rules;
- whether historical snapshot values would still be true on current `main`;
- runtime browser behavior, Service Worker behavior, reverse-search correctness, or accessibility; those belong to their dedicated tests;
- every path-looking token in prose;
- every code fence as an executable doctest;
- GitHub Linguist statistics or repository About metadata.

This narrow scope is intentional: deterministic checks with low false-positive rates are preferred over broad guesses about whether prose “looks outdated”.
