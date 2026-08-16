# C++ ↔ JavaScript Pastafari differential soak

**Status: PASS**

- Exact comparisons: **160,096**
- Mismatches: **0**
- Completed shards: **20**
- Bulk layer: **160,000** cases, target offsets up to ±10,000 days
- Far/edge layer: **96** cases, random target offsets up to ±365,243 days plus fixed edge probes

## Engine identities

- C++ `calendar.cpp` SHA-256: `b9758bb35ef180e14b525f672c91f04dab6611f2d67ed1bbf8d43d109c66a8d6`
- JavaScript `pastafari-calendar-fast.js` SHA-256: `61318bc0813579f8d703737716704c467b87f2492213c2a1bd0970d9bc9f421b`
- JavaScript Git blob: `f9470f5e26bb363c81f1c100da78b79be94487c8`

## Calculation-day strata

- present: random ±1,000 years around the present anchor
- present-far: random ±10,000 years around the present anchor
- foundation: random ±1,000 years around the Foundation JDN
- yearzero: random ±1,000 years around the year-zero reference JDN

## Edge probes included for every calculation day

`0, ±1, ±41, ±42, ±43, ±962, ±963, ±964, ±5777, ±5778, ±5779` days.

## Known historical regression case

- c = `2461259`
- t = `2086468`
- Result: `{"year":"4918","cutletName":"אכד","dayInCutlet":321,"monthName":"חמור","dayInMonth":6}`
- C++ and JavaScript: exact match.

## Shards

- `bulk/0` seed `6003088620285809729`, `present`, c=`2365022`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk/1` seed `11400714819323198485`, `foundation`, c=`-13396318`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk/2` seed `15111065706836454659`, `yearzero`, c=`1936260`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk/3` seed `10723151780598845931`, `present-far`, c=`2955192`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk2/0` seed `1234567890123456789`, `present`, c=`2130515`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk2/1` seed `9876543210987654321`, `foundation`, c=`-13142765`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk2/2` seed `5555555555555555555`, `yearzero`, c=`1631962`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk2/3` seed `3333333333333333333`, `present-far`, c=`-849460`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk3/0` seed `7777777777777777777`, `present`, c=`2695303`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk3/1` seed `2222222222222222222`, `foundation`, c=`-13629769`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk3/2` seed `9999999999999999999`, `yearzero`, c=`1517362`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk3/3` seed `4444444444444444444`, `present-far`, c=`3216760`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk4/0` seed `2718281828459045235`, `present`, c=`2576313`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk4/1` seed `3141592653589793238`, `foundation`, c=`-13156926`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk4/2` seed `1618033988749894848`, `yearzero`, c=`1570101`, cases=10,000, radius=±10,000 days: **PASS**
- `bulk4/3` seed `1414213562373095048`, `present-far`, c=`3747056`, cases=10,000, radius=±10,000 days: **PASS**
- `far1000y/0` seed `1084818905618843912`, `present`, c=`2250395`, cases=24, radius=±365,243 days: **PASS**
- `far1000y/1` seed `1089357896855742840`, `foundation`, c=`-12975686`, cases=24, radius=±365,243 days: **PASS**
- `far1000y/2` seed `1311768467294899695`, `yearzero`, c=`1859445`, cases=24, radius=±365,243 days: **PASS**
- `far1000y/3` seed `18369614221190020847`, `present-far`, c=`3228117`, cases=24, radius=±365,243 days: **PASS**

All comparisons parsed both outputs and compared all five Pastafari date fields exactly. The harness stops on the first mismatch.
