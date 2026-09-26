# About i18n — strict native-session QA ledger

This ledger tracks the user's strict requirement separately from the rollout status ledger. A Markdown QA record written in the target language is **not** evidence by itself.

A locale may move out of `pending` here only after a distinct LLM session whose prompt/conversation is conducted in that locale's language has reviewed the whole localized site. Each completed row must point to auditable session evidence (transcript plus review result).

Allowed strict-session states: `pending` → `reviewed PASS` or `reviewed FAIL` → after fixes, re-review until `reviewed PASS`.

| code | locale | dir | rollout status | strict native-session QA | evidence |
|---|---|---|---|---|---|
| he | he-IL | rtl | semantic master / existing | pending | — |
| en | en-US | ltr | semantic QA | pending | — |
| af | af-ZA | ltr | linguistic QA | pending | — |
| ar | ar | rtl | semantic QA | pending | — |
| az | az-AZ | ltr | linguistic QA | pending | — |
| be | be-BY | ltr | linguistic QA | pending | — |
| bg | bg-BG | ltr | linguistic QA | pending | — |
| bn | bn-BD | ltr | semantic QA | pending | — |
| bs | bs-BA | ltr | semantic QA | pending | — |
| ca | ca-ES | ltr | semantic QA | pending | — |
| cs | cs-CZ | ltr | semantic QA | pending | — |
| da | da-DK | ltr | semantic QA | pending | — |
| de | de-DE | ltr | semantic QA | pending | — |
| el | el-GR | ltr | semantic QA | pending | — |
| eo | eo | ltr | semantic QA | pending | — |
| es | es-ES | ltr | semantic QA | pending | — |
| et | et-EE | ltr | linguistic QA | pending | — |
| fa | fa-IR | rtl | semantic QA | pending | — |
| fi | fi-FI | ltr | semantic QA | pending | — |
| fil | fil-PH | ltr | semantic QA | pending | — |
| fo | fo-FO | ltr | linguistic QA | pending | — |
| fr | fr-FR | ltr | semantic QA | pending | — |
| fy | fy-NL | ltr | linguistic QA | pending | — |
| gl | gl-ES | ltr | linguistic QA | pending | — |
| gu | gu-IN | ltr | semantic QA | pending | — |
| ha | ha-NG | ltr | semantic QA | pending | — |
| hi | hi-IN | ltr | semantic QA | pending | — |
| hr | hr-HR | ltr | semantic QA | pending | — |
| ht | ht-HT | ltr | linguistic QA | pending | — |
| hu | hu-HU | ltr | semantic QA | pending | — |
| hy | hy-AM | ltr | semantic QA | pending | — |
| id | id-ID | ltr | semantic QA | pending | — |
| is | is-IS | ltr | semantic QA | pending | — |
| it | it-IT | ltr | semantic QA | pending | — |
| ja | ja-JP | ltr | semantic QA | pending | — |
| jv | jv-ID | ltr | semantic QA | pending | — |
| ka | ka-GE | ltr | semantic QA | pending | — |
| kk | kk-KZ | ltr | semantic QA | pending | — |
| ko | ko-KR | ltr | semantic QA | pending | — |
| lb | lb-LU | ltr | semantic QA | pending | — |
| lt | lt-LT | ltr | semantic QA | pending | — |
| lv | lv-LV | ltr | semantic QA | pending | — |
| mk | mk-MK | ltr | semantic QA | pending | — |
| mr | mr-IN | ltr | semantic QA | pending | — |
| ms | ms-MY | ltr | semantic QA | pending | — |
| nb | nb-NO | ltr | semantic QA | pending | — |
| ne | ne-NP | ltr | semantic QA | pending | — |
| nl | nl-NL | ltr | semantic QA | pending | — |
| nn | nn-NO | ltr | semantic QA | pending | — |
| pa | pa-IN | ltr | semantic QA | pending | — |
| pl | pl-PL | ltr | semantic QA | pending | — |
| pt | pt-BR | ltr | semantic QA | pending | — |
| ro | ro-RO | ltr | semantic QA | pending | — |
| ru | ru-RU | ltr | semantic QA | pending | — |
| sk | sk-SK | ltr | semantic QA | pending | — |
| sl | sl-SI | ltr | semantic QA | pending | — |
| so | so-SO | ltr | semantic QA | pending | — |
| sq | sq-AL | ltr | semantic QA | pending | — |
| sr | sr-Latn-RS | ltr | semantic QA | pending | — |
| sv | sv-SE | ltr | semantic QA | pending | — |
| sw | sw-TZ | ltr | semantic QA | pending | — |
| ta | ta-IN | ltr | semantic QA | pending | — |
| te | te-IN | ltr | semantic QA | pending | — |
| th | th-TH | ltr | semantic QA | pending | — |
| tr | tr-TR | ltr | semantic QA | pending | — |
| uk | uk-UA | ltr | semantic QA | pending | — |
| ur | ur-PK | rtl | semantic QA | pending | — |
| uz | uz-UZ | ltr | semantic QA | pending | — |
| vi | vi-VN | ltr | semantic QA | pending | — |
| yo | yo-NG | ltr | semantic QA | pending | — |
| zh | zh-CN | ltr | semantic QA | pending | — |
| zu | zu-ZA | ltr | semantic QA | pending | — |
