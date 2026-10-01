# About i18n — strict native-session QA ledger

This ledger tracks the user's strict requirement separately from the rollout status ledger. A Markdown QA record written in the target language is **not** evidence by itself.

A locale may move out of `pending` here only after a distinct LLM session whose prompt/conversation is conducted in that locale's language has reviewed the whole localized site. Each completed row must point to auditable session evidence (transcript plus review result).

Allowed strict-session states: `pending` → `reviewed PASS` or `reviewed FAIL` → after fixes, re-review until `reviewed PASS`.

| code | locale | dir | rollout status | strict native-session QA | evidence |
|---|---|---|---|---|---|
| he | he-IL | rtl | semantic master / existing | pending | — |
| en | en-US | ltr | semantic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/en/strict-36580966998/` — strict Gemma 4 whole-site run `36580966998`; hidden qualification 9/9, 525 grounded text items, 0 findings |
| af | af-ZA | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/af/strict-36707310645/` — strict Gemma 4 whole-site run `36707310645`; hidden qualification 8/8, 564 grounded text items, 0 findings after Dutch-leakage repairs |
| ar | ar | rtl | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/ar/strict-36836953854/` — strict Gemma 4 whole-site run `36836953854`; hidden qualification 8/8, 583 grounded text items, 0 findings |
| az | az-AZ | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/az/strict-36847382810/` — strict Gemma 3 12B whole-site run `36847382810`; hidden qualification 10/10, 567 grounded text items, 0 findings |
| be | be-BY | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/be/strict-36852565213/` — strict Gemma 3 12B whole-site run `36852565213`; hidden qualification 8/8, 567 grounded text items, 0 findings |
| bg | bg-BG | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/bg/strict-36859362965/` — strict Gemma 4 whole-site run `36859362965`; hidden qualification 8/8, 567 grounded text items, 0 findings |
| bn | bn-BD | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/bn/strict-36863774024/` — strict Gemma 4 whole-site run `36863774024`; hidden qualification 8/8, 567 grounded text items, 0 findings |
| bs | bs-BA | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/bs/strict-36868788827/` — strict Gemma 4 whole-site run `36868788827`; hidden qualification 8/8, 570 grounded text items, 0 findings |
| ca | ca-ES | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/ca/strict-36881822658/` — repaired strict Gemma 4 whole-site rerun `36881822658`; hidden qualification 8/8, 567 grounded text items, 0 findings; prior run 36876585823 rejected as false-negative PASS after manual leakage audit |
| cs | cs-CZ | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/cs/strict-36886900641/` — corrected strict Gemma 4 whole-site run `36886900641`; hidden qualification 8/8, 568 grounded text items, 0 findings |
| da | da-DK | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/da/strict-36891008084/` — strict Gemma 4 whole-site run `36891008084`; hidden qualification 8/8, 562 grounded text items, 0 findings |
| de | de-DE | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/de/strict-36896960363/` — strict Gemma 4 whole-site run `36896960363`; hidden qualification 8/8, 569 grounded text items, 0 findings |
| el | el-GR | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/el/strict-36900599800/` — strict Gemma 4 whole-site run `36900599800`; hidden qualification 8/8, 569 grounded text items, 0 findings |
| eo | eo | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/eo/strict-36910105174/` — repaired strict Gemma 4 rerun `36910105174`; hidden qualification 8/8, 493 grounded text items, 0 findings; prior PASS rejected after manual English-leakage audit |
| es | es-ES | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/es/strict-36910105206/` — repaired strict Gemma 4 rerun `36910105206`; hidden qualification 8/8, 562 grounded text items, 0 findings; prior PASS rejected after manual English-leakage audit |
| et | et-EE | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/et/strict-36910105248/` — repaired strict Gemma 4 rerun `36910105248`; hidden qualification 8/8, 568 grounded text items, 0 findings; prior PASS rejected after manual Finnish-leakage audit |
| fa | fa-IR | rtl | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/fa/strict-36901794288/` — strict Gemma 4 whole-site run `36901794288`; hidden qualification 8/8, 569 grounded text items, 0 findings |
| fi | fi-FI | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/fi/strict-36901793882/` — strict Gemma 4 whole-site run `36901793882`; hidden qualification 8/8, 568 grounded text items, 0 findings |
| fil | fil-PH | ltr | semantic QA | pending | — |
| fo | fo-FO | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/fo/strict-36916698702/` — authoritative repaired strict run `36916698702`; qualification 8/8, 567 items, 0 findings; manual scan clean |
| fr | fr-FR | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/fr/strict-36916698902/` — strict run `36916698902`; qualification 8/8, 581 items, 0 findings; manual scan clean |
| fy | fy-NL | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/fy/strict-36928557891/` — repaired strict Gemma 4 rerun `36928557891`; hidden qualification 8/8, 567 grounded text items, 0 findings; manual post-run scan clean |
| gl | gl-ES | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/gl/strict-36923026456/` — repaired strict Gemma 4 rerun `36923026456`; hidden qualification 8/8, 567 grounded text items, 0 findings; manual post-run scan clean |
| gu | gu-IN | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/gu/strict-36916698771/` — strict run `36916698771`; qualification 8/8, 567 items, 0 findings; manual scan clean |
| ha | ha-NG | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/ha/strict-36916698764/` — strict run `36916698764`; qualification 8/8, 568 items, 0 findings; manual scan clean |
| hi | hi-IN | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/hi/strict-36916698925/` — strict run `36916698925`; qualification 8/8, 567 items, 0 findings; manual scan clean |
| hr | hr-HR | ltr | semantic QA | pending | — |
| ht | ht-HT | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/ht/strict-36923264928/` — strict Gemma 4 run `36923264928`; hidden qualification 8/8, 567 grounded text items, 0 findings; manual post-run scan clean |
| hu | hu-HU | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/hu/strict-36929093742/` — strict Gemma 4 run `36929093742`; hidden qualification 8/8, 568 grounded text items, 0 findings; manual post-run scan clean |
| hy | hy-AM | ltr | semantic QA | pending | — |
| id | id-ID | ltr | semantic QA | pending | — |
| is | is-IS | ltr | semantic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/is/strict-36555762016/` — evidence-hygiene strict SAGA + Greynir run `36555762016`; hidden qualification 6/6, 3/3 chunks CLEAN, 0 site warnings, 0 findings |
| it | it-IT | ltr | semantic QA | pending | — |
| ja | ja-JP | ltr | linguistic QA | reviewed PASS | `artifacts/about-i18n-native-sessions/ja/strict-36929093624/` — corrected strict Gemma 4 run `36929093624`; hidden qualification 8/8, 569 grounded text items, 0 findings; manual post-run scan clean |
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
