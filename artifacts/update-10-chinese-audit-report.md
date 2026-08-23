# Update 10 — Chinese public API audit and normative-source blocker

## Result

`BLOCKED_NORMATIVE_SOURCE_INCOMPLETE_AND_PUBLIC_CHINESE_HOST_DEPENDENT`

This is an audit artifact, not a successful Update 10 repair. Production calendar code was not changed by this artifact.

## Repository state

- main commit SHA checked: `fae94d044a2449da9ee767d89d285c483c0a2be8`
- package version: `1.3.0`
- Node runtime: `v22.16.0`; ICU `77.1`; V8 `12.4.254.21-node.26`
- Update 8 artifacts report `UPDATE_8_RESULT = COMPLETE`; Update 9 final report is present; the latest main commit message says it only reconciles SHA256SUMS after Update 9 and does not change calendar conversion logic.

## Magillah evidence in this repository

- Line 19: >> במניין רצוף שבו הראשון בינואר בשנת אחת לספירה בלוח הגריגוריאני הוא היום הראשון, יום מסירת הלוחות הוא $-278,522$. לפיכך מניין יום היסוד באותו מניין רצוף הוא $-15,055,671$.
- Line 27: >> - סיני מסורתי: מחזור ‎−643, שנה 57 במחזור – גֶנְג־שֶׁן – החודש הראשון, היום ה־22; החודש אינו מעובר.[^6]
- Line 20: >> כל התאריכים שלפנינו הם הארכות חישוביות לאחור. במקום שבו ללוח אין שנה היסטורית הנושאת מניין כזה, נכתב מניין שנה הכולל גם שנת אפס; בלוח היוליאני נשמר המשפט שאין בו שנת אפס. בלוח ההיג'רי השמשי ננקט החשבון המחזורי הקבוע; בלוח הסיני ובלוח ההינדי ננקטה ההארכה האלגוריתמית[^2] המחייבת לצורך ספר זה בלבד; ובמניין הארוך של המאיה ננקט מתאם גודמן–מרטינס–תומפסון. אלה תאריכי יום היסוד:
- Line 1101: [^6]: זהו תאריך פרולפטי המחושב בהארכה לאחור של כללי הלוח הסיני האסטרונומי; הלוח לא התקיים בתקופה זו, ותוצאת החודש והיום תלויה במודל האסטרונומי ובהגדרת ההארכה.

The source therefore fixes the Foundation anchor, but it does not include a complete executable specification for astronomical Chinese month starts, leap-month determination, epoch, or the algorithm/version that produced the listed proleptic result.

## Foundation discriminator

- Foundation linear day index: `-15055671`
- Foundation JDN used by the package: `-13334246`
- Public Gregorian conversion of astronomical year `-41221-12-22`: `-13334246`
- Magillah Chinese anchor: cycle `-643`, year-in-cycle `57`, stem/branch `geng-shen`, month `1`, day `22`, leap `false`.

## Current public Chinese API

Public Chinese exports: `ChineseDate`, `chineseToJdn`. `ChineseDate` stores only `calendar`, `day`, `leapMonth`, `month`, `relatedYear`. It has no cycle/year-in-cycle/stem/branch fields.

### Actual Foundation run before any repair

| Path | Result |
| --- | --- |
| Node public `chineseToJdn(new ChineseDate(-41221,1,22,{leapMonth:false}))` | TypeError: Internal error. Icu error. |
| Node generic `calendarDateToJdn(ChineseDate)` | TypeError: Internal error. Icu error. |
| Browser-core module in Node runtime | TypeError: Internal error. Icu error. |
| Docs/browser input converter in Node runtime | TypeError: Internal error. Icu error. |
| Direct `Intl.DateTimeFormat("en-u-ca-chinese-nu-latn")` on Foundation JDN | {
  "iso": "-041221-12-22T00:00:00.000Z",
  "format": "10/17/-41221",
  "parts": [
    {
      "type": "month",
      "value": "10"
    },
    {
      "type": "literal",
      "value": "/"
    },
    {
      "type": "day",
      "value": "17"
    },
    {
      "type": "literal",
      "value": "/"
    },
    {
      "type": "relatedYear",
      "value": "-41221"
    }
  ],
  "record": {
    "month": "10",
    "day": "17",
    "relatedYear": "-41221"
  }
} |

Modern vector still succeeds through ICU: Node public and docs both return `2461266` for relatedYear=2026, month=7, day=1, non-leap.

## Intl/ICU dependence

- Throwing monkey-patch of `Intl.DateTimeFormat` makes the public Chinese conversion fail: RangeError: synthetic Intl.DateTimeFormat failure for Update 10 audit.
- Nonsense `formatToParts` makes the public Chinese conversion fail to find the date: RangeError: התאריך אינו קיים או אינו נמצא בטווח הנתמך של לוח chinese.
- Headless Chromium direct-Intl Foundation probe: ChromiumNoDomOutput: Headless Chromium exited without DOM output in this sandbox; treat browser comparison as attempted but inconclusive here..
- Direct code scan found `165` term occurrences involving `Intl.DateTimeFormat`, `u-ca-chinese`, `relatedYear`, `formatToParts`, `ChineseDate`, or `chineseToJdn`; see the JSON artifact for the file/line inventory.

## Classification

There is a real representation and host-dependence gap. The current public API cannot represent the Magillah's cycle/year-in-cycle/stem/branch result, and the current conversion path delegates Chinese conversion to host ICU and localized/part parsing.

However, a correct general deterministic replacement cannot be written from the current source alone. The Magillah fixes the Foundation anchor and states that the proleptic Chinese result depends on the astronomical extension/model, but the actual algorithm and version are not present. A Foundation-only branch would violate the explicit no-fixture-only-hack rule, and a synthetic arithmetic calendar would invent facts not present in the source.

## Required next input before a real repair

Add the missing normative Chinese algorithm/version to `sources/מגילת העיתים.md` or as a cited project source: epoch, location/time-zone convention, new-moon calculation, solar-term calculation, month numbering, leap-month rule, cycle convention, and rounding/floor/modulo semantics. After that, Update 10 can add the deliberately crooked shadow arithmetic path without using ICU as the oracle.

## Verification commands executed after audit

- `node scripts/run-update10-chinese-audit.mjs`: PASS; regenerated JSON, Markdown report, and artifact-local SHA list.
- `node scripts/checksums.mjs generate`: PASS; docs=110, repository=794.
- `node scripts/checksums.mjs verify`: PASS; docs=110, repository=794.
- `npm test`: PASS; 206 tests total, 202 passed, 4 skipped, 0 failed.
- No production Chinese repair was attempted, so post-repair Foundation/cycle/leap/random/round-trip acceptance tests are intentionally absent.
