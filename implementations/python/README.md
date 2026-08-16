# Pastafari Calendar — Python

This directory contains the deliberately readable independent Python implementation. It uses only the Python standard library and Python's arbitrary-precision integers.

The sole normative source for this implementation is **“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**, 2026-08-16, SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.

## Run

The normative positional order is **calculation/action day first, queried/target day second**:

```bash
python -m pastafari_calendar 2026-08-06 2026-08-06
python -m pastafari_calendar --jdn 2461259 2461259
```

The output is UTF-8 JSON containing exactly the five normative result fields. Signed proleptic-Gregorian years, including year zero and negative years, are supported.

There is intentionally **no implicit civil-today fallback**. Converting a real instant/location into the calculation day requires the separate location-dependent Venus-day adapter defined by the source; the pure core always receives an explicit calculation day.

## Library API

```python
from pastafari_calendar import GregorianDate, PastafariCalendar

calendar = PastafariCalendar()
value = calendar.convert(
    GregorianDate.parse("2026-08-06"),  # calculation/action day
    GregorianDate.parse("2026-08-12"),  # queried/target day
)
print(value.to_dict())
```

For integer Julian day numbers use `convert_jdn(calculation_jdn, target_jdn)`.

## Tests

`implementations/tests/conformance-vectors.json` is a compact **specification-derived canonical** fixture. The larger `spec-derived-canonical-vectors.json` contains source-level sauce, answer-ring, gate, year, combinatoric and period-boundary evidence. The historical 16-vector file and 10,000-pair corpus are retained only as non-normative regression fixtures.

`PastafariCalendar` retains bounded LRU caches. Reuse one instance when several target dates share the same calculation day.
