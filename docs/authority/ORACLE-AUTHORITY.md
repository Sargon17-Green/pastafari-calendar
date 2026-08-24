# Oracle authority boundary

The normative hierarchy is:

```text
Scroll > independent reference > production implementations and generated artifacts
```

Generated files whose names contain words such as `spec`, `canonical`,
`oracle`, `golden`, `expected`, or `conformance` are not automatically sources
of truth.  In this repository, legacy generators and vectors are useful witnesses
for regression, packaging, native bindings, and reproducibility, but they do not
prove conformance merely by agreeing with the authoritative and fast engines.

The old compatibility path `implementations/tests/generate_spec_canonical.py`
remains deliberately in place.  Its name is historical.  Its outputs are marked
as `normativeAuthority: false` until a later full regeneration/revalidation
stage explicitly derives the corpus downstream of the independent reference.

Update 16 does not regenerate the full vector corpus.  It installs authority
metadata, dependency rules, provenance, corruption/perturbation tests, and CI
checks that prevent a return to `authoritative == fast == generator` as a
normative PASS rule.

Machine-readable authority data lives under `verification/update16/`.
