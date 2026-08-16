# Pastafari Calendar — C++20

This is the independent performance-oriented C++20 implementation. It uses OpenSSL BIGNUM for exact integer arithmetic, bounded caches and dynamic programming for month-weave unranking. It does not enumerate the astronomical weave space or call another language implementation.

The sole normative source is **“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**, 2026-08-16, SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.

## Dependencies

- C++20 compiler
- CMake 3.20+
- OpenSSL 3 development headers and crypto library

## Build and test

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
ctest --test-dir build --output-on-failure
```

## Command line

The positional order is the normative pair **calculation/action day, then queried/target day**:

```bash
./build/pastafari-calendar 2026-08-06 2026-08-12
./build/pastafari-calendar --jdn 2461259 2461265
```

There is no implicit civil-today fallback. Real-time/location resolution belongs to the separate Venus-day adapter.

## Library API

```cpp
pastafari::PastafariCalendar calendar;
const auto value = calendar.convert(
    pastafari::GregorianDate::parse("2026-08-06"),  // calculation
    pastafari::GregorianDate::parse("2026-08-12")   // target
);
```

The public year and JDN types are arbitrary-precision. The implementation contains precomputed gate checkpoints only as an acceleration aid; canonical verification data is specification-derived and is kept under `implementations/tests/`.

The retained 10,000-pair JavaScript-era corpus is historical regression evidence only, not a normative oracle.
