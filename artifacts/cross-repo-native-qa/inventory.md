# Cross-repository native-language QA inventory

Generated from live repository state on 2026-09-26.

- `pastafari-calendar` branch: `feature/about-i18n-72-locales` at `6f8a5ef895c9109027eb3464fefdfa9343bcea73`
- `Pastafarian-Calendar` reference `main`: `56bc4173aae4975ded019ef5ab5a36249f1424df` (reference only; never merge language branches into it)
- Site locales: **72**
- Non-main branches in implementation repository: **65**
- Unique human languages: **85**
- QA review units after materially distinct variants/scripts are separated: **89**

## Important content-derived classifications

- `Julia+New-Ithkuil`: implementation delta explicitly declares New Ithkuil; the root README is Maltese inherited material and is recorded as wrong-language contamination to be reviewed, not as a separate supported Maltese implementation.
- `PowerShell+Tagalog`: its own documentation declares **Filipino**, so it maps to the site's `fil-PH` reviewer rather than a separate Tagalog unit.
- `Mercury+ᠮᠣᠩᠭᠣᠯ-ᠬᠡᠯᠡ`: its human-facing README is Mongolian in Cyrillic and declares `Монгол хэл`; inventory records `mn-Cyrl`.
- `Celeritas-per-Sepulcra`: content is Neo-Latin and shares the Latin reviewer with `C++&Latina`.
- The five current `feat/` and `fix/` branches derive from the JavaScript/Interlingue line and are assigned to the Interlingue reviewer; their English README text is itself subject to QA.

## Review units

| review_id | self-name | locale/tag | script | dir | site locale/path | implementation branches |
|---|---|---|---|---|---|---|
| af | Afrikaans | af-ZA | Latn | ltr | af: docs/i18n/locales/af.js; docs/about/content/af.html | — |
| am | አማርኛ | am | Ethi | ltr | — | `V+አማርኛ` @ `1c3d122d37ab` |
| ar | العربية | ar | Arab | rtl | ar: docs/i18n/locales/ar.js; docs/about/content/ar.html | `FALSE+العربية` @ `827ed7507aaa` |
| ar-classical | العربية الكلاسيكية | — | Arab | rtl | — | `C#+العربية-الفصحى` @ `8d9d7e79391a` |
| az | Azərbaycanca | az-AZ | Latn | ltr | az: docs/i18n/locales/az.js; docs/about/content/az.html | `Rust+Azərbaycan-dili` @ `ee91ccba8388` |
| be | Беларуская | be-BY | Cyrl | ltr | be: docs/i18n/locales/be.js; docs/about/content/be.html | — |
| bg | Български | bg-BG | Cyrl | ltr | bg: docs/i18n/locales/bg.js; docs/about/content/bg.html | — |
| bn | বাংলা | bn-BD | Beng | ltr | bn: docs/i18n/locales/bn.js; docs/about/content/bn.html | — |
| bs | Bosanski | bs-BA | Latn | ltr | bs: docs/i18n/locales/bs.js; docs/about/content/bs.html | — |
| ca | Català | ca-ES | Latn | ltr | ca: docs/i18n/locales/ca.js; docs/about/content/ca.html | `R+Català` @ `411215c5d1d9` |
| cop | ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ | cop | Copt | ltr | — | `x86-64-Assembly+ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ` @ `1a1ea6a89f1f` |
| cs | Čeština | cs-CZ | Latn | ltr | cs: docs/i18n/locales/cs.js; docs/about/content/cs.html | `Haskell+čeština` @ `545cafccbf50` |
| cy | Cymraeg | cy | Latn | ltr | — | `Kotlin+Cymraeg` @ `de390e81f7d4` |
| da | Dansk | da-DK | Latn | ltr | da: docs/i18n/locales/da.js; docs/about/content/da.html | `Scheme+Dansk` @ `bc3fbcfe768e` |
| de | Deutsch | de-DE | Latn | ltr | de: docs/i18n/locales/de.js; docs/about/content/de.html | `APL+Deutsch` @ `ff5eb790250f` |
| el | Ελληνικά | el-GR | Grek | ltr | el: docs/i18n/locales/el.js; docs/about/content/el.html | — |
| en | English | en-US | Latn | ltr | en: docs/i18n/locales/en.js; docs/about/content/en.html | `Fortran+English` @ `0ab093b03ab4` |
| eo | Esperanto | eo | Latn | ltr | eo: docs/i18n/locales/eo.js; docs/about/content/eo.html | `Gleam+Esperanto` @ `b58c821451c2` |
| es | Español | es-ES | Latn | ltr | es: docs/i18n/locales/es.js; docs/about/content/es.html | `WAT+Español` @ `e80de7d23b0e` |
| et | Eesti | et-EE | Latn | ltr | et: docs/i18n/locales/et.js; docs/about/content/et.html | `Raku+Eesti-keel` @ `7c08dc7ea641` |
| fa | فارسی | fa-IR | Arab | rtl | fa: docs/i18n/locales/fa.js; docs/about/content/fa.html | — |
| fi | Suomi | fi-FI | Latn | ltr | fi: docs/i18n/locales/fi.js; docs/about/content/fi.html | — |
| fil | Filipino | fil-PH | Latn | ltr | fil: docs/i18n/locales/fil.js; docs/about/content/fil.html | `PowerShell+Tagalog` @ `ec9353e9e391` |
| fo | Føroyskt | fo-FO | Latn | ltr | fo: docs/i18n/locales/fo.js; docs/about/content/fo.html | — |
| fr | Français | fr-FR | Latn | ltr | fr: docs/i18n/locales/fr.js; docs/about/content/fr.html | — |
| fy | Frysk | fy-NL | Latn | ltr | fy: docs/i18n/locales/fy.js; docs/about/content/fy.html | — |
| gl | Galego | gl-ES | Latn | ltr | gl: docs/i18n/locales/gl.js; docs/about/content/gl.html | `Prolog+Galego` @ `f0b2fc9efb37` |
| gu | ગુજરાતી | gu-IN | Gujr | ltr | gu: docs/i18n/locales/gu.js; docs/about/content/gu.html | `Crystal+ગુજરાતી` @ `275da382c8a0` |
| ha | Hausa | ha-NG | Latn | ltr | ha: docs/i18n/locales/ha.js; docs/about/content/ha.html | — |
| he | עברית | he-IL | Hebr | rtl | he: docs/i18n/locales/he.js; docs/about/content/he.html | `Dart+עברית` @ `add8a95d82bb` |
| hi | हिन्दी | hi-IN | Deva | ltr | hi: docs/i18n/locales/hi.js; docs/about/content/hi.html | — |
| hr | Hrvatski | hr-HR | Latn | ltr | hr: docs/i18n/locales/hr.js; docs/about/content/hr.html | `Oz+hrvatski` @ `f04dede28248` |
| ht | Kreyòl ayisyen | ht-HT | Latn | ltr | ht: docs/i18n/locales/ht.js; docs/about/content/ht.html | `Lua+Kreyòl-ayisyen` @ `eea3dd668e24` |
| hu | Magyar | hu-HU | Latn | ltr | hu: docs/i18n/locales/hu.js; docs/about/content/hu.html | `Nim+Magyar-nyelv` @ `0855d9a621fe` |
| hy | Հայերեն | hy-AM | Armn | ltr | hy: docs/i18n/locales/hy.js; docs/about/content/hy.html | `D+Հայերեն` @ `334818937406` |
| id | Bahasa Indonesia | id-ID | Latn | ltr | id: docs/i18n/locales/id.js; docs/about/content/id.html | — |
| ie | Interlingue / Occidental | ie | Latn | ltr | — | `JavaScript+Interlingue` @ `4e9b724c81df`<br>`feat/live-stage-explanations-megillah-2026-09-26` @ `a9a1ad7e45e5`<br>`fix/live-cooking-copy-progress-monster-2026-09-26` @ `f98592a83313`<br>`fix/live-stage-guide-sync-retained` @ `6b276f4fffe3`<br>`fix/megillah-exact-text-fragments` @ `e711e616fc6f`<br>`fix/megillah-live-source-audit` @ `ea19d9896062` |
| io | Ido | io | Latn | ltr | — | `Logo+Ido` @ `1d392e7e40f8` |
| is | Íslenska | is-IS | Latn | ltr | is: docs/i18n/locales/is.js; docs/about/content/is.html | `Elm+íslensku` @ `267a63bc08f4` |
| it | Italiano | it-IT | Latn | ltr | it: docs/i18n/locales/it.js; docs/about/content/it.html | `Scala+Italiano` @ `6971334694e9` |
| ja | 日本語 | ja-JP | Jpan | ltr | ja: docs/i18n/locales/ja.js; docs/about/content/ja.html | `Q#+日本語の初期基盤を構築` @ `350ebf6fafe7` |
| jbo | la .lojban. | jbo | Latn | ltr | — | `Java+Lojban` @ `1b44c391bf75` |
| jv | Basa Jawa | jv-ID | Latn | ltr | jv: docs/i18n/locales/jv.js; docs/about/content/jv.html | — |
| ka | ქართული | ka-GE | Geor | ltr | ka: docs/i18n/locales/ka.js; docs/about/content/ka.html | — |
| kk | Қазақша | kk-KZ | Cyrl | ltr | kk: docs/i18n/locales/kk.js; docs/about/content/kk.html | `Zig+Қазақ-тілі` @ `81c107362951` |
| kn | ಕನ್ನಡ | kn | Knda | ltr | — | `Unicon+ಕನ್ನಡ` @ `0cf07cf6cddc` |
| ko | 한국어 | ko-KR | Kore | ltr | ko: docs/i18n/locales/ko.js; docs/about/content/ko.html | — |
| la | Latina | la | Latn | ltr | — | `C++&Latina` @ `1a500640b7bd`<br>`Celeritas-per-Sepulcra` @ `4edb170403fb` |
| lb | Lëtzebuergesch | lb-LU | Latn | ltr | lb: docs/i18n/locales/lb.js; docs/about/content/lb.html | — |
| lfn | Lingua Franca Nova (Elefen) | lfn | Latn | ltr | — | `LabVIEW/G+lingua-franca-nova` @ `a3a8fbc219cb` |
| lt | Lietuvių | lt-LT | Latn | ltr | lt: docs/i18n/locales/lt.js; docs/about/content/lt.html | `Racket+Lietuvių-kalba` @ `dc2293d401b5` |
| lv | Latviešu | lv-LV | Latn | ltr | lv: docs/i18n/locales/lv.js; docs/about/content/lv.html | `Common-Lisp+Latviešu-valoda` @ `660e6a1d6a8b` |
| mk | Македонски | mk-MK | Cyrl | ltr | mk: docs/i18n/locales/mk.js; docs/about/content/mk.html | — |
| ml | മലയാളം | ml | Mlym | ltr | — | `Shakespeare-Programming-Language+മലയാളം` @ `bd225010e6b4` |
| mn | Монгол хэл | mn-Cyrl | Cyrl | ltr | — | `Mercury+ᠮᠣᠩᠭᠣᠯ-ᠬᠡᠯᠡ` @ `f957d86e6a53` |
| mr | मराठी | mr-IN | Deva | ltr | mr: docs/i18n/locales/mr.js; docs/about/content/mr.html | `TypeScript+मराठी` @ `a064ed434734` |
| ms | Bahasa Melayu | ms-MY | Latn | ltr | ms: docs/i18n/locales/ms.js; docs/about/content/ms.html | `PHP+Bahasa-Melayu` @ `51bc107b81db` |
| nb | Norsk bokmål | nb-NO | Latn | ltr | nb: docs/i18n/locales/nb.js; docs/about/content/nb.html | `Lean+Norsk` @ `1ba55c13b96e` |
| ne | नेपाली | ne-NP | Deva | ltr | ne: docs/i18n/locales/ne.js; docs/about/content/ne.html | `PureScript+नेपाली` @ `314447c3d052` |
| new-ithkuil | New Ithkuil | — | Latn | ltr | — | `Julia+New-Ithkuil` @ `bb0444c362d2` |
| nl | Nederlands | nl-NL | Latn | ltr | nl: docs/i18n/locales/nl.js; docs/about/content/nl.html | `Clojure+Nederlands` @ `84717da78064` |
| nn | Norsk nynorsk | nn-NO | Latn | ltr | nn: docs/i18n/locales/nn.js; docs/about/content/nn.html | `AWK+nynorsk` @ `2716867babc9` |
| pa | ਪੰਜਾਬੀ | pa-IN | Guru | ltr | pa: docs/i18n/locales/pa.js; docs/about/content/pa.html | `BASIC+ਪੰਜਾਬੀ` @ `ca6b58926c29` |
| pl | Polski | pl-PL | Latn | ltr | pl: docs/i18n/locales/pl.js; docs/about/content/pl.html | `MATLAB+Polski` @ `2de14db92716` |
| pt | Português | pt-BR | Latn | ltr | pt: docs/i18n/locales/pt.js; docs/about/content/pt.html | — |
| pt-pt | Português | pt-PT | Latn | ltr | — | `Object-Pascal+Português` @ `25c161064014` |
| ro | Română | ro-RO | Latn | ltr | ro: docs/i18n/locales/ro.js; docs/about/content/ro.html | `J+Română` @ `bdef8c9be3f1` |
| ru | Русский | ru-RU | Cyrl | ltr | ru: docs/i18n/locales/ru.js; docs/about/content/ru.html | — |
| sk | Slovenčina | sk-SK | Latn | ltr | sk: docs/i18n/locales/sk.js; docs/about/content/sk.html | — |
| sl | Slovenščina | sl-SI | Latn | ltr | sl: docs/i18n/locales/sl.js; docs/about/content/sl.html | — |
| so | Soomaali | so-SO | Latn | ltr | so: docs/i18n/locales/so.js; docs/about/content/so.html | — |
| sq | Shqip | sq-AL | Latn | ltr | sq: docs/i18n/locales/sq.js; docs/about/content/sq.html | — |
| sr | Srpski | sr-Latn-RS | Latn | ltr | sr: docs/i18n/locales/sr.js; docs/about/content/sr.html | — |
| sr-cyrl | српски | sr-Cyrl-RS | Cyrl | ltr | — | `Red+српски` @ `4efbea5a0695` |
| sv | Svenska | sv-SE | Latn | ltr | sv: docs/i18n/locales/sv.js; docs/about/content/sv.html | `Haxe+Svenska` @ `f231044a92a4` |
| sw | Kiswahili | sw-TZ | Latn | ltr | sw: docs/i18n/locales/sw.js; docs/about/content/sw.html | — |
| ta | தமிழ் | ta-IN | Taml | ltr | ta: docs/i18n/locales/ta.js; docs/about/content/ta.html | `SQL+தமிழ்` @ `79cb76a2b45c` |
| te | తెలుగు | te-IN | Telu | ltr | te: docs/i18n/locales/te.js; docs/about/content/te.html | `Ada+తెలుగు` @ `02dfa7d68a52` |
| th | ไทย | th-TH | Thai | ltr | th: docs/i18n/locales/th.js; docs/about/content/th.html | `Pony+ภาษาไทย` @ `1b0bc5012925` |
| tr | Türkçe | tr-TR | Latn | ltr | tr: docs/i18n/locales/tr.js; docs/about/content/tr.html | `Python+Türkçe` @ `d7e1cd405fa4` |
| uk | Українська | uk-UA | Cyrl | ltr | uk: docs/i18n/locales/uk.js; docs/about/content/uk.html | `Chapel+Українська-мова` @ `e76e4350875a` |
| ur | اردو | ur-PK | Arab | rtl | ur: docs/i18n/locales/ur.js; docs/about/content/ur.html | `Smalltalk+اردو` @ `2034f42cba57` |
| uz | O‘zbekcha | uz-UZ | Latn | ltr | uz: docs/i18n/locales/uz.js; docs/about/content/uz.html | — |
| vi | Tiếng Việt | vi-VN | Latn | ltr | vi: docs/i18n/locales/vi.js; docs/about/content/vi.html | `Elixir+tiếng-Việt` @ `5c74ef53fce0` |
| yi | ייִדיש | yi | Hebr | rtl | — | `Erlang+יידיש` @ `79cdb0df3d5f` |
| yo | Yorùbá | yo-NG | Latn | ltr | yo: docs/i18n/locales/yo.js; docs/about/content/yo.html | — |
| zh | 简体中文 | zh-CN | Hans | ltr | zh: docs/i18n/locales/zh.js; docs/about/content/zh.html | `COBOL+简体中文` @ `3e3faeea2cc2` |
| zh-hant | 繁體中文（國語） | zh-Hant | Hant | ltr | — | `Perl+國語` @ `4a5489ee6225` |
| zu | isiZulu | zu-ZA | Latn | ltr | zu: docs/i18n/locales/zu.js; docs/about/content/zu.html | — |

## Branch reconciliation

Every non-main branch returned by GitHub is mapped above. `main` is retained only as the requested reference snapshot.
