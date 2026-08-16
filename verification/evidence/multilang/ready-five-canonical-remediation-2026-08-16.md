# Ready-five canonical remediation — 2026-08-16

Base repository checked immediately before packaging:
`1841c3b609623cf1ff17b56e6cc5341fafad850f`.

## Normative source

Sole normative source: **“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**  
SHA-256: `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`

Canonical ID: `PASTAFARI-SCROLL-2026-08-16-D36B0C94`.

The historical JavaScript-era 16-vector and 10,000-row datasets are retained as
non-normative regression evidence only.

## Remediation applied

For Python, C++20, C17, Java 17+ and Ruby:

- public ordered pair is calculation/action day first, queried/target day second;
- implicit local civil-date `today` fallback was removed from conversion APIs/CLIs;
- historical regression data was separated from specification-derived canonical data;
- metadata/documentation now identifies the supplied Scroll, not JavaScript, as normative;
- the 5,778-day maximum is binding;
- gate checkpoints are documented as acceleration data and independently verified.

C17 additionally documents and checks its finite public JDN/year range.

During the remediation tests, C++ exposed one adapter defect: a leading `+` in a
signed Gregorian year was validated syntactically but rejected by the underlying
BIGNUM decimal constructor. The constructor was corrected to accept a leading
plus, and a regression check was added. The Pastafari core algorithm was not
changed by that fix.

## Source-derived fixtures

- compact canonical: `implementations/tests/conformance-vectors.json`
  - SHA-256 `7a427aa5dd49404a3ebf6e0d5a326cb0c658c553e4ae8c55c44e86882022f04d`
  - 6 forward vectors;
- comprehensive audit fixture: `implementations/tests/spec-derived-canonical-vectors.json`
  - SHA-256 `35a7c86a8fbb25b265a1021af832575d6bc8b8e66fb7d0d22ef3b102422ed2b1`
  - 202 forward vectors;
  - 17/17 cutlet names and 47/47 month names covered;
  - source-level sauce, bowl-order, answer-ring, choice, gate, year,
    combinatoric, Gregorian, invalid-input and boundary evidence;
- signed-year fixture: `spec-derived-deep-year-chain.json`
  - SHA-256 `d7d340b0faf45dfef8b9f12269c3603c9c2cfdfc96896e8b47d907cdf12ded3a`;
- 5,778 discriminator: `spec-derived-binding-5778.json`
  - SHA-256 `8593f526ed93c6198b6ca467bc5e87ce7a100715dd78bd24d6b957851577aa0f`;
- gate checkpoint fixture: `spec-derived-gate-checkpoints.json`
  - SHA-256 `02f6e5b232dce85a2ab2a2963bcdae16592d0a4c10974d86b21266802fb0040d`.

The generators do not import a production calendar engine, do not query
JavaScript, and do not consume the historical differential corpus as expected
output.

## Fresh executable results

Environment:

- Python 3.13.5;
- GCC/G++ 14.2.0;
- OpenJDK/Javac 21.0.11 (Java source also compiled with `--release 17` during audit);
- Ruby 3.3.8, Linux x86-64.

Results:

- Python: 4/4 canonical/semantic unit tests passed; compact canonical vectors passed.
- C++20: bigint semantics passed; 6/6 canonical forward vectors passed.
- C17: fresh native build passed; 6/6 canonical forward vectors passed.
- Java: 17/17 semantic checks and 6/6 canonical forward vectors passed.
- Ruby: 6/6 canonical forward vectors passed.
- Gate provenance: 75/75 source-derived checkpoint positions matched every
  production table in Python, C++20, C17, Java and Ruby.
- CLI order: all five `--jdn CALCULATION TARGET` CLIs produced the canonical
  `present_forward` result for `2461259 -> 2461265`.
- Missing calculation day: all five CLIs rejected a one-date invocation; none
  silently substituted civil `today`.

The earlier full 10,000-row passes remain historical regression evidence. This
remediation run does **not** claim a fresh 10,000-row pass for every engine.

## Certification result

The five ready engines are source-audited, independently executable, use the
normative positional contract, have source-derived canonical executable tests,
and have their checkpoint acceleration provenance closed. They therefore count
as **5/84 final-spec-certified targets** in the expanded task.
