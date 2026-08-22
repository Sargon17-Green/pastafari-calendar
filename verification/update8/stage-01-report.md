# Update 8 — Stage 1 baseline checkpoint

Status: **CLOSED**

- `main`: `1dd41cbf7c2ff6172c2b5793fb1637a446a1d272`
- package version: `1.3.0`
- snapshot: 592/592 entries in the repository checksum manifest verified after extraction-only normalization of the Hebrew Scroll filename.
- canonical full-tuple success vectors: 5 completed, 5 passed, 0 mismatches.
- the sixth extreme 5,778 canonical vector exceeded the execution timeout; it did not produce a mismatch or exception.
- replacement 5,778 success discriminator: PASS — reference cardinality 41, selection 27, gates 139..149, year length 4785; authoritative anchor used the same gates and returned the expected tuple.
- selected success-only reference/oracle tests: 12/12 PASS.
- no fault injection, failure-path instrumentation, constructor-failure probing, cache repair, rollback work, or production-code changes were performed.
- Stage 2 was not entered.

See `stage-01-baseline.json` for machine-readable details and the adjacent logs for the executed checks.
