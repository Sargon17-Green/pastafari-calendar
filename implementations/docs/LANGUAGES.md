# Ready-five status inside the 84-target expanded project

The historical remediation checkpoint counted five accepted engines out of a
45-language target that excluded JavaScript. The expanded task is different: it
contains **84 required targets and includes a fresh JavaScript implementation**.
Do not confuse the old `5/45` milestone with overall completion.

After the 16 August 2026 normative remediation, these five existing engines have
all passed a source-derived canonical check and checkpoint provenance audit:

| Language | Independent runtime engine | Fresh canonical status | Historical regression |
|---|---:|---:|---:|
| C++20 | Yes | **PASS** | retained |
| Python 3 | Yes | **PASS** | retained |
| C17 | Yes | **PASS** | retained |
| Java 17+ | Yes | **PASS** | retained |
| Ruby | Yes | **PASS** | retained |

Accordingly this ready-five slice contributes **5/84 final-spec-certified
expanded targets**. The remaining targets must still be implemented/audited and
tested independently; this document makes no claim about their current status.

The canonical source is the supplied Scroll, not JavaScript or any other engine.
All five public interfaces use calculation/action day first and queried/target
day second, and none silently substitutes a civil-date “today”.
