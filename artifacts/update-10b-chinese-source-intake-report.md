# Update 10B — Chinese normative source intake

Result: **SOURCE_SELECTED_BUT_REPAIR_BLOCKED_UNTIL_EXACT_CALENDRICA_PORT**

Acceptance: **NOT_ACCEPTED_AS_UPDATE_10_REPAIR**

## Revision

- commit SHA: `fae94d044a2449da9ee767d89d285c483c0a2be8`
- package version: `1.3.0`

## Source selection

- Official normative standard: **GB/T 33661-2017 — 农历的编算和颁行**.
- Copyable implementation source: **CALENDRICA 4.0**, Edward M. Reingold and Nachum Dershowitz, Apache-2.0.
- Repository Chinese algorithm text: `sources/chinese/农历规范算法.zh.md`.

## Copyright boundary

The repository does not include a verbatim copy of GB/T 33661-2017. The Chinese text added here is project-authored wording in Chinese. The portable code source remains CALENDRICA/Apache-2.0.

## Foundation discriminator

- fixed day: `-15055671`
- JDN: `-13334246`
- expected: `{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","month":1,"leap":false,"day":22}`

## Probes

- public Foundation: `{"ok":false,"error":{"name":"TypeError","message":"Internal error. Icu error."}}`
- direct Intl Foundation: `{"ok":true,"iso":"-041221-12-22T00:00:00.000Z","format":"10/17/-41221","record":{"month":"10","day":"17","relatedYear":"-41221"},"parts":[{"type":"month","value":"10"},{"type":"literal","value":"/"},{"type":"day","value":"17"},{"type":"literal","value":"/"},{"type":"relatedYear","value":"-41221"}]}`
- candidate non-Intl port: `{"ok":true,"candidate":{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","month":2,"leap":false,"day":23},"expected":{"cycle":-643,"yearInCycle":57,"heavenlyStem":"geng","earthlyBranch":"shen","month":1,"leap":false,"day":22},"match":false,"classification":"DETERMINISTIC_NON_INTL_CANDIDATE_BUT_NOT_NORMATIVE"}`

## Decision

Production remains untouched. The exact repair is still blocked until the CALENDRICA astronomical primitives are ported exactly enough to reproduce the Magillah Foundation discriminator.
