# English QA — whole-site intermediate state

## Scope

This review covers `en-US` across the whole site, not only `/about/`: the main UI, date search, day of working, comparison, year view, reverse search, errors and states, user guide, footer, metadata, manifest, and ARIA/accessibility text.

## Verification

- 258/258 message keys.
- No missing contract keys.
- No obvious TODO/TBD or unresolved placeholder-style text.
- `/about/` has exactly 29 stable IDs in the same order as the semantic master, with no duplicates.
- The two semantic tables contain 19 and 9 rows.
- Required canonical formulas, hashes and literals are present, including `Q=2^{127}-1`, `R=\\operatorname{SAVE}(S+149r)`, `47\\times123=5781`, `5781-5778=3`, `RRULE:FREQ=YEARLY`, `F(c+T,t+T)=F(c,t)`, `14{,}777{,}149`, and `8e155fa4198ea7bcfeb16138ac5d6662706f4d93`.

## Open gates

This file does **not** prove that the whole site was reviewed in a separate LLM session whose conversation itself was conducted entirely in English. The mandatory `linguistic QA` gate therefore remains open.

Real desktop and 390 px mobile render QA, accessibility, PWA/offline, and language switching also remain to be completed.

## Status

The English text, UI contract, and article structure are ready for the next gate. The correct current status is **semantic QA**, not `linguistic QA`.
