# Pastafari Calendar — Python

This directory contains the deliberately readable implementation.  It uses only
the Python standard library and Python's native arbitrary-precision integers.

## Run

```bash
python -m pastafari_calendar 2026-08-06 --calculation-date 2026-08-06
```

The output is UTF-8 JSON:

```json
{"year":"5000","cutletName":"כליה","dayInCutlet":306,"monthName":"לשון","dayInMonth":23}
```

Signed proleptic Gregorian years are supported.  For example:

```bash
python -m pastafari_calendar -41221-12-22 -c -41221-12-22
```

If `--calculation-date` is omitted, the local civil day is sampled once for the
conversion.

## Library API

```python
from pastafari_calendar import GregorianDate, PastafariCalendar

calendar = PastafariCalendar()
value = calendar.convert(
    GregorianDate.parse("2026-08-06"),
    GregorianDate.parse("2026-08-06"),
)
print(value.to_dict())
```

For integrations that already use integer Julian day numbers, call
`convert_jdn(target_jdn, calculation_jdn)` directly.

`PastafariCalendar` retains bounded LRU caches.  Reuse one instance when several
dates share a calculation day; that is substantially faster than creating a new
instance per call.

## Test

From the repository root:

```bash
PYTHONPATH=python python -m unittest discover -s python/tests -v
```

The suite includes the shared conformance vectors, the foundation anchor,
astronomical year zero, negative years and a vector that changes if the erroneous
5,781-day value is used instead of the binding 5,778-day limit.

## Benchmark

From the repository root:

```bash
PYTHONPATH=python python3 python/benchmark.py
```

The benchmark separates a cold conversion, an identical cache hit and a
365-consecutive-day workload.  See `docs/BENCHMARKS.md` for one recorded run and
the exact interpretation of those figures.
