# Canonical language forms — live implementation drift audit
Date: 2026-10-03

Status: **STAGED EVIDENCE ONLY — no implementation branch modified**

## Canonical input

Working corpus revision:
`4247068cd43314da12e09b0ad05b76df7c592c345960b3b71720cc7ca6f7abc0`

Canonical package:
`Pastafarian_Canon_Draft_2026-09-27.zip`

Package SHA-256:
`e103b540f9f9c8cbe0ef158781aa74a66f60cec4913c2a50c38589cfee716692`

Full adopted form registry:
`Pastafarian-Canon/canon/languages.json`

Registry SHA-256:
`e0d69e7f7723607b91f50af01798066c06e4a66831b926e8666f7c0df08add62`

The registry contains:
- 60 normative language entries;
- 17 cutlet labels per language;
- 47 month labels per language;
- 3,840 adopted labels total.

This does **not** imply 60 complete locale profiles. Productive short/long/accessibility grammar, locale metadata and numeral profiles remain separate `GAP-LOCALE-PROFILES` work.

## What the owner adjudication changed

The 2026-09-27 owner incorporation changed exactly one period-name slot:
**cutlet canonical index 8**.

- 58 of the 60 language forms changed.
- Hebrew retained `גומא`.
- Sahidic Coptic retained `ϫⲟⲟⲩϥ`.
- the other 3,780 period-name labels were preserved.

Therefore a live catalog audit does not need to reopen semantic research for the other 63 labels unless a concrete new drift appears.

Machine registry manifest:
`CANONICAL_LANGUAGE_FORM_REGISTRY_2026-10-03.json`

## Live witness scope

Repository:
`Sargon17-Green/Pastafarian-Calendar`

Live catalog witnesses checked:
**61**

Why 61 witnesses for 60 languages:
- Latin has two independent implementation witnesses:
  - `C++&Latina`
  - `Celeritas-per-Sepulcra`

The repository `main` branch is the Maltese catalog witness.

Every live check read the branch's actual catalog-bearing source file at the current ref and recorded the Git blob SHA.

## Result

- **59 CHANGE**
- **2 MATCH**
- **0 unreadable/unresolved catalog witnesses**

The two live MATCH cases are exactly the two forms that the owner adjudication did not change:

| Branch | Language | Cutlet 8 |
|---|---|---|
| `Dart+עברית` | Hebrew | `גומא` |
| `x86-64-Assembly+ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ` | Sahidic Coptic | `ϫⲟⲟⲩϥ` |

Every other live witness still carries the pre-adjudication cutlet-8 form.

Examples:
- German: `Papyrusstaude` → `Zypergras`
- English: `Papyrus Sedge` → `flatsedge`
- Latin: `papyrus` → `cyperus` in **both** Latin witnesses
- Icelandic: `papýrusstör` → `sveipsef`
- Interlingue: `papirus` → `cyperus`
- Lingua Franca Nova: `papiro` → `sipero`
- Maltese `main`: `Papiru` → `bordi`

Complete branch/path/blob/value ledger:
`INDEPENDENT_LANGUAGE_FORM_LIVE_DRIFT_2026-10-03.json`

## Evidence discipline

Some adopted forms are substrings of old forms, for example:
- Chinese `莎草` inside `纸莎草`;
- Vietnamese `cói` inside `cói giấy`;
- Czech `šáchor` inside `šáchor papírodárný`;
- Lithuanian `viksvuolė` inside `papirusinė viksvuolė`.

Those cases were classified by the exact active catalog field at canonical index 8, not by naive string-presence tests.

## Other 63 labels

For the locked source witnesses, the owner incorporation report explicitly preserved all 3,780 non-Guma labels.

Most live branches still point at the exact source snapshot used by the corpus. Two special checks were needed:

- `JavaScript+Interlingue`: current catalog blob is identical to the baseline catalog blob; only the later canonical cutlet-8 adjudication creates drift.
- `LabVIEW/G+lingua-franca-nova`: current CSV blob is identical to the baseline catalog blob; same conclusion.
- `Elm+íslensku`: live catalog advanced beyond its baseline blob. All 64 live values were rechecked against the canonical registry; the only mismatch is cutlet 8.

Thus this pass finds no evidence requiring reopening any of the other 3,780 adopted labels.

## Separate existing JavaScript finding

This audit is independent of the earlier JavaScript+Interlingue README finding:

- source catalog month 8 already uses `Karshumav`;
- focused test already requires `Karshumav`;
- README still says `Karshumb -> Karshumab` and needs `Karshumb -> Karshumav`.

That README prose correction remains staged separately in:
`megillah-live-cooking-early-corpus-alignment-2026-10-03.md`.

## Propagation rule

No live branch was edited.

Future propagation should:
1. re-fetch each target ref;
2. blob-guard the catalog source against the ledger;
3. replace only cutlet canonical index 8 with the adopted form;
4. update branch-local duplicate docs/tests/generated artifacts that assert the old form;
5. preserve all `canonicalIndex` values;
6. run the branch's native focused catalog tests;
7. keep each implementation branch independent — never merge them into `main` as a shortcut.

If a blob guard fails, re-audit that branch rather than applying the staged value blindly.
