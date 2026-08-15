# Calendar round-trip audit

- Script: `PASTAFARI-CALENDAR-ROUNDTRIP-AUDIT-1.0.2`
- Commit: `unknown`
- GitHub `main` HEAD observed while packaging: `8ba4743bcb5d2e6a68ab9c55179e0a5ea4f0213f`
- Provenance: `zip-source-hash` (the supplied ZIP has no `.git`; the patched working tree is uncommitted, so no commit SHA is invented)
- Seed: `12345`
- Node: `v22.16.0`; ICU: `77.1`
- OS: `Linux 6.18.35`
- Time zone: `UTC`
- Chromium: `Chromium 144.0.7559.96 built on Debian GNU/Linux 13 (trixie)`

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
| Validation failures | 0 |
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
| hindu-old-lunar | potentially non-bijective floating-point special-structure | test-only local enumeration | not independent; canonical candidate search | 303 | 300 | 7 | 1 | PASS |
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
      "acceptedInputs": 403,
      "uniqueJdns": 384,
      "duplicateJdns": 19,
      "maxMultiplicity": 2,
      "skippedJdnsBetweenMinMax": 0,
      "maxGap": 0,
      "duplicateExamples": [
        [
          "2461123",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "5",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "1",
              "day": "6",
              "leapMonth": false
            }
          ]
        ],
        [
          "2461148",
          [
            {
              "year": "5127",
              "month": "1",
              "day": "31",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "2",
              "day": "1",
              "leapMonth": true
            }
          ]
        ],
        [
          "2461178",
          [
            {
              "year": "5127",
              "month": "2",
              "day": "1",
              "leapMonth": false
            },
            {
              "year": "5127",
              "month": "2",
              "day": "31",
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

None.

## WARN

None.

## Interpretation

A PASS proves the properties exercised by this harness. For strategies marked non-independent, round-trip is evidence of internal consistency and boundary/canonicalization behavior, not an independent proof of absolute calendar correctness. Existing project JDN vectors are checked separately as anchors.

