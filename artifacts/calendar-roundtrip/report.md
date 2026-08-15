# Calendar round-trip audit

- Script: `PASTAFARI-CALENDAR-ROUNDTRIP-AUDIT-1.0.1`
- Commit: `599a41c395193e8a2a3f3f2ddcaf86ddad81afb1`
- Seed: `12345`
- Node: `v26.7.0`; ICU: `78.3`
- OS: `Windows_NT 10.0.26200`
- Time zone: `Asia/Jerusalem`
- Chromium: `151.0.7922.34` (browser smoke PASS)

## Summary

| Metric | Count |
|---|---:|
| Calendars discovered | 19 |
| Calendars tested | 19 |
| Total round trips | 134873 |
| Edge cases | 3673 |
| Random valid cases | 131200 |
| Invalid-input cases | 134 |
| Mismatches | 0 |
| Validation failures | 1 |
| Unsupported-runtime cases | 0 |
| Absolute/project anchors checked | 27 |

## Calendars

| Calendar | Strategy | Inverse | Independence | Round trips | Random | Invalid | Anchors | Result |
|---|---|---|---|---:|---:|---:|---:|---|
| gregorian | exact-bijective arithmetic | production jdnToGregorian | partly independent path within production module | 10078 | 10000 | 7 | 1 | PASS |
| julian | exact-bijective arithmetic | test-only independent Julian inverse | independent inverse formula | 10053 | 10000 | 7 | 1 | PASS |
| hebrew | exact-bijective arithmetic | test-only year/month search through production forward | not independent; useful for boundaries and canonicalization | 10177 | 10000 | 8 | 1 | PASS |
| islamic-civil | exact-bijective arithmetic | test-only independent tabular inverse | independent implementation | 10051 | 10000 | 7 | 1 | PASS |
| islamic-umalqura | Intl-backed | Intl.DateTimeFormat islamic-umalqura | independent Intl representation | 1052 | 150 | 7 | 1 | PASS |
| solar-hijri-official | Intl-backed | Intl.DateTimeFormat persian | independent Intl representation | 1052 | 150 | 7 | 1 | PASS |
| solar-hijri-arithmetic | exact-bijective arithmetic | test-only forward-guided search | not independent | 10053 | 10000 | 7 | 1 | PASS |
| chinese | Intl-backed special-structure | Intl.DateTimeFormat chinese relatedYear/month/day | independent Intl representation | 1055 | 150 | 8 | 1 | PASS |
| hindu-old-solar | potentially non-bijective floating-point | test-only local enumeration | not independent; canonical candidate search | 303 | 300 | 6 | 1 | PASS |
| hindu-old-lunar | potentially non-bijective floating-point special-structure | test-only local enumeration | not independent; canonical candidate search | 303 | 300 | 7 | 1 | FAIL |
| saka | exact-bijective arithmetic | test-only inverse via Gregorian year boundary | independent structure; shares Gregorian inverse | 10076 | 10000 | 6 | 1 | PASS |
| thai-buddhist | exact-bijective offset | Gregorian inverse + 543 | independent of Thai forward except shared Gregorian base | 10051 | 10000 | 6 | 1 | PASS |
| ethiopic | exact-bijective arithmetic | test-only fixed-13-month inverse | independent inverse arithmetic | 10055 | 10000 | 7 | 1 | PASS |
| coptic | exact-bijective arithmetic | test-only fixed-13-month inverse | independent inverse arithmetic | 10055 | 10000 | 7 | 1 | PASS |
| japanese-imperial | canonicalized era | test-only explicit era-boundary inverse | independent era selection; shared Gregorian inverse | 10009 | 10000 | 17 | 1 | PASS |
| minguo | exact-bijective offset | Gregorian inverse - 1911 | independent of Minguo forward except shared Gregorian base | 10051 | 10000 | 6 | 1 | PASS |
| bahai-tehran | arithmetic/astronomical special-structure | test-only year-boundary search through production forward | not independent | 273 | 150 | 6 | 9 | PASS |
| bahai-western | exact-bijective arithmetic special-structure | test-only March-21 structure inverse | independent structure; shared Gregorian inverse | 10123 | 10000 | 5 | 1 | PASS |
| maya-long-count | exact special-structure with correlation parameter | test-only exact mixed-radix algebra | independent algebra | 10003 | 10000 | 3 | 1 | PASS |

## Focused checks

```json
{
  "hebrewNumerals": {
    "status": "PASS",
    "equivalentJdn": "2461266"
  },
  "japaneseGannen": {
    "status": "PASS",
    "eras": [
      {
        "era": "meiji",
        "jdn": "2403629"
      },
      {
        "era": "taisho",
        "jdn": "2419614"
      },
      {
        "era": "showa",
        "jdn": "2424875"
      },
      {
        "era": "heisei",
        "jdn": "2447535"
      },
      {
        "era": "reiwa",
        "jdn": "2458605"
      }
    ]
  },
  "chineseLeapMonths": {
    "status": "PASS",
    "example": {
      "relatedYear": "2001",
      "month": "4",
      "day": "1",
      "leapMonth": true
    },
    "leapJdn": "2452053",
    "normalJdn": "2452023",
    "lastLeapDay": {
      "relatedYear": "2001",
      "month": "4",
      "day": "29",
      "leapMonth": true
    },
    "afterLeap": {
      "relatedYear": "2001",
      "month": "5",
      "day": "1",
      "leapMonth": false
    }
  },
  "monthChoices": {
    "gregorian": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "julian": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "hebrew": {
      "status": "PASS",
      "count": 13,
      "semanticChecks": 13,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ]
    },
    "islamic-civil": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "islamic-umalqura": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "solar-hijri-official": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "solar-hijri-arithmetic": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "chinese": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "hindu-old-solar": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "hindu-old-lunar": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "saka": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "thai-buddhist": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "ethiopic": {
      "status": "PASS",
      "count": 13,
      "semanticChecks": 13,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ]
    },
    "coptic": {
      "status": "PASS",
      "count": 13,
      "semanticChecks": 13,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13"
      ]
    },
    "japanese-imperial": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "minguo": {
      "status": "PASS",
      "count": 12,
      "semanticChecks": 12,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ]
    },
    "bahai-tehran": {
      "status": "PASS",
      "count": 20,
      "semanticChecks": 20,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "ayyami-ha",
        "19"
      ]
    },
    "bahai-western": {
      "status": "PASS",
      "count": 20,
      "semanticChecks": 20,
      "values": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "ayyami-ha",
        "19"
      ]
    }
  },
  "hebrewYearTypes": {
    "leap-385": 5700,
    "common-354": 5701,
    "common-355": 5702,
    "leap-383": 5703,
    "common-353": 5710,
    "leap-384": 5711
  },
  "hindu": {
    "status": "checked",
    "solar": {
      "year": 5127,
      "acceptedInputs": 372,
      "uniqueJdns": 365,
      "duplicateJdns": 7,
      "maxMultiplicity": 2,
      "skippedJdnsBetweenMinMax": 0,
      "maxGap": 0,
      "duplicateExamples": [
        [
          "2461178",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "31"
            },
            {
              "year": "5127",
              "month": "2",
              "day": "1"
            }
          ]
        ],
        [
          "2461208",
          [
            {
              "year": "5127",
              "month": "2",
              "day": "31"
            },
            {
              "year": "5127",
              "month": "3",
              "day": "1"
            }
          ]
        ],
        [
          "2461269",
          [
            {
              "year": "5127",
              "month": "4",
              "day": "31"
            },
            {
              "year": "5127",
              "month": "5",
              "day": "1"
            }
          ]
        ]
      ]
    },
    "lunar": {
      "year": 5127,
      "acceptedInputs": 744,
      "uniqueJdns": 384,
      "duplicateJdns": 327,
      "maxMultiplicity": 4,
      "skippedJdnsBetweenMinMax": 0,
      "maxGap": 0,
      "duplicateExamples": [
        [
          "2461119",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "1",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "1",
              "day": "1",
              "leapMonth": true
            }
          ]
        ],
        [
          "2461120",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "2",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "1",
              "day": "2",
              "leapMonth": true
            }
          ]
        ],
        [
          "2461121",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "3",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "1",
              "day": "3",
              "leapMonth": true
            }
          ]
        ]
      ]
    },
    "note": "These models are demonstrably non-bijective; JDN preservation is the primary round-trip invariant."
  },
  "bahai": {
    "status": "checked",
    "lengths": {
      "bahai-tehran": [
        {
          "year": 181,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 182,
          "yearLength": 366,
          "ayyamiHaLength": 5
        },
        {
          "year": 183,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 184,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 185,
          "yearLength": 365,
          "ayyamiHaLength": 4
        }
      ],
      "bahai-western": [
        {
          "year": 181,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 182,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 183,
          "yearLength": 365,
          "ayyamiHaLength": 4
        },
        {
          "year": 184,
          "yearLength": 366,
          "ayyamiHaLength": 5
        },
        {
          "year": 185,
          "yearLength": 365,
          "ayyamiHaLength": 4
        }
      ]
    },
    "note": "variants tested separately; Ayyam-i-Ha length derived from consecutive year starts"
  },
  "maya": {
    "status": "PASS",
    "rollovers": [
      "kin 19->uinal+1",
      "uinal 17->tun+1",
      "tun 19->katun+1",
      "katun 19->baktun+1"
    ],
    "correlation": "584283"
  }
}
```

## FAIL

### Failure 1: hindu-old-lunar / invalid-accepted:leap-flag-at-nonleap-position

```json
{
  "id": 1,
  "calendar": "hindu-old-lunar",
  "kind": "invalid-accepted:leap-flag-at-nonleap-position",
  "seed": 12345,
  "input": {
    "year": "5127",
    "month": "1",
    "day": "1",
    "leapMonth": true
  },
  "normalizedInput": null,
  "jdn1": null,
  "reconstructed": null,
  "jdn2": null,
  "expected": null,
  "actual": "accepted",
  "error": "Error: Invalid input was accepted\n    at expectInvalid (file:///C:/Users/eliez/Downloads/pastafari-calendar-main%20(90)/scripts/run-calendar-roundtrip-audit.mjs:545:127)\n    at runInvalidMatrix (file:///C:/Users/eliez/Downloads/pastafari-calendar-main%20(90)/scripts/run-calendar-roundtrip-audit.mjs:761:74)\n    at main (file:///C:/Users/eliez/Downloads/pastafari-calendar-main%20(90)/scripts/run-calendar-roundtrip-audit.mjs:864:5)\n    at file:///C:/Users/eliez/Downloads/pastafari-calendar-main%20(90)/scripts/run-calendar-roundtrip-audit.mjs:889:1\n    at ModuleJob.run (node:internal/modules/esm/module_job:569:25)\n    at async node:internal/modules/esm/loader:650:26\n    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)",
  "runtime": {
    "node": "v26.7.0",
    "icu": "78.3",
    "v8": "14.6.202.34-node.28",
    "platform": "win32",
    "arch": "x64",
    "os": "Windows_NT 10.0.26200",
    "timezone": "Asia/Jerusalem",
    "chromium": "151.0.7922.34",
    "intlCalendars": {
      "islamic-umalqura": true,
      "persian": true,
      "chinese": true,
      "hebrew": true,
      "indian": true,
      "ethiopic": true,
      "coptic": true,
      "japanese": true,
      "roc": true
    }
  },
  "commitSha": "599a41c395193e8a2a3f3f2ddcaf86ddad81afb1"
}
```

## WARN

None.

## Interpretation

A PASS proves the properties exercised by this harness. For strategies marked non-independent, round-trip is evidence of internal consistency and boundary/canonicalization behavior, not an independent proof of absolute calendar correctness. Existing project JDN vectors are checked separately as anchors.
## Browser smoke verification

Browser smoke was executed on Windows with Chromium `151.0.7922.34` and returned **PASS** for all 8 checks:

- inventory-19
- intl-runtime-calendars
- umm-al-qura-vector
- persian-official-vector
- chinese-vector
- hebrew-textual-equivalence
- japanese-gannen
- month-choice-integrity

No browser-smoke failures were reported.

## Source provenance

The audit was run from an extracted repository copy without `.git`, so the script originally reported `Commit: unknown`.
After the run, the relevant source files were SHA-256 checked against current `main`, commit
`599a41c395193e8a2a3f3f2ddcaf86ddad81afb1`, and matched exactly:

- `docs/calendar-converters.js` — `a4fc3da69033670fdecd4bc9889d093f5b8bdbfc5a5e618c30a4c221a33b711a`
- `docs/calendar-input-conventions.js` — `91f1344b70a734d856b34f947957a495b12fb3827d241b2a7bc0a469643388f8`
- `docs/app.js` — `38f68bb8b1e8ba518b693150618e8753c1c38c7fc04261e3d4c43241a94da05c`

Therefore the audit results are attributed to the relevant source state in that `main` commit.
