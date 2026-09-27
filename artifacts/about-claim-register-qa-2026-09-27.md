# /about/ claim-register QA
Date: 2026-09-27
Target: `artifacts/about-claim-register-2026-09-27.json`
Status: preparatory QA; not a canon verdict

## Structural result

`PASS`

Validated:
- 29 sections;
- 84 claims total;
- no duplicate claim IDs;
- no section without claims;
- every claim has a classification;
- every claim has a future action.

## Claims by reconciliation priority

- P0: 56 claims
- P1: 13 claims
- P2: 7 claims
- P3: 7 claims
- P4: 1 claim

This is appropriate for a first alignment pass: the majority of claims are direct rules/authority/history that must be compared with the corpus before derived/product material is touched.

## Important classification observation

The register intentionally contains many distinct classes rather than a binary canonical/noncanonical flag.

Examples include:
- canonical rule candidate;
- canonical naming;
- authority statement;
- project history/theology;
- product behavior/guidance;
- derived theorem;
- empirical result;
- open research question;
- historical supersession;
- editorial joke/synthesis.

This diversity is a feature. It prevents a future corpus diff from flattening the article into a pseudo-specification.

## Future mechanical gate

When the corpus is pinned, every one of the 84 claim IDs should receive an explicit disposition in alignment evidence:
- unchanged / supported;
- changed to match corpus;
- reclassified as derived/product/editorial;
- superseded;
- deferred/unresolved.

No P0 claim should disappear from the reconciliation simply because a paragraph is rewritten or merged.

## Source freshness

The registered Hebrew article blob remains:
`954f82559e618a091bb338c65a61be9e50d48331`.

The live rollout branch has advanced in QA infrastructure, but that Hebrew article blob was rechecked unchanged during this workstream.
