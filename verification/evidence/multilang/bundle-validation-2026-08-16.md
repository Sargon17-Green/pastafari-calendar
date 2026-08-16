# Ready-five bundle validation — 2026-08-16

This record applies to the incremental upload bundle containing the independent
C++20, Python 3, C17, Java 17+ and Ruby engines.

## Base repository state

The bundle was prepared against public `main` commit:

`e02526ee4c05fd0478c264764030487f4ad04c3f`

The reference JavaScript engine was not modified by this bundle.

## Bundle-level smoke validation

A representative same-day conversion was executed from the exact source tree
that is packaged for upload, independently through each of the five CLIs:

Input:

- target: `2026-08-06`
- calculation day: `2026-08-06`

Expected and observed full output for every engine:

```json
{"year":"5000","cutletName":"כליה","dayInCutlet":306,"monthName":"לשון","dayInMonth":23}
```

Results:

- C17: PASS
- C++20: PASS
- Python 3: PASS
- Java 17+: PASS
- Ruby: PASS

This smoke check compares the complete five-field JSON result, including UTF-8
cutlet and month names; it is not a replacement for the acceptance corpus.

## Acceptance evidence retained in this upload

- C++20: bigint semantics, 16 known/boundary vectors, 10,000 differential pairs.
- Python 3: unit/conformance tests, 16 known/boundary vectors, 10,000 differential pairs.
- C17: 16 known/boundary vectors, 10,000 differential pairs.
- Java 17+: 17 semantic checks, 16 known/boundary vectors, 10,000 differential pairs.
- Ruby: 16 known/boundary vectors and 10,000 differential pairs. The complete
  user-run Ruby log is preserved beside this file as
  `ruby-differential-20260814-125717.log`.

The Ruby log ends with:

`PASS: known 16/16; differential 10000/10000`

## Additional re-validation in the packaging environment

During preparation of this bundle:

- Python's conformance unit suite completed successfully, including the shared
  vectors, foundation anchor, astronomical year zero and the 5,778-day boundary
  assertion.
- Java's built-in semantic self-test completed 17/17 and its known-vector test
  completed 16/16.
- C and C++ built successfully; a full combined re-run of all known vectors in
  the constrained packaging environment exceeded the command time window, so
  no new full-suite PASS is claimed from that particular attempt. Their prior
  16-vector + 10,000-pair executable acceptance evidence remains the basis for
  their accepted status.

No corpus was reduced and no failed or timed-out run was relabeled as a pass.
