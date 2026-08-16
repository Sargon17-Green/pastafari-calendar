# Pastafari Calendar — C++20

This is the performance-oriented implementation.  It uses OpenSSL BIGNUM for exact integer
arithmetic, precomputed gate checkpoints, bounded LRU caches and dynamic
programming for month-weave unranking.  It does not enumerate the astronomically
large weave space.

## Dependencies

- a C++20 compiler;
- CMake 3.20 or newer;
- OpenSSL 3 development headers and crypto library.

On common systems the development package is named `libssl-dev`,
`openssl-devel` or `openssl`. Windows builds can supply OpenSSL through
vcpkg or MSYS2; CMake resolves the standard `OpenSSL::Crypto` target.

## Build and test

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --config Release
ctest --test-dir build --output-on-failure
```

## Command line

```bash
./build/pastafari-calendar 2026-08-06 --calculation-date 2026-08-06
```

Both inputs use signed proleptic Gregorian `[+-]YYYY-MM-DD` notation.  Omitting
the calculation day selects the local civil day.

## Library API

```cpp
#include <pastafari/calendar.hpp>

pastafari::PastafariCalendar calendar;
const auto value = calendar.convert(
    pastafari::GregorianDate::parse("2026-08-06"),
    pastafari::GregorianDate::parse("2026-08-06")
);
std::cout << value.json() << '\n';
```

The converter serializes calls on one instance so its caches are safe to reuse
from several threads.  Independent instances can run concurrently without
shared mutable calendar state.

The public year and JDN types are arbitrary-precision.  Internal day offsets are
machine integers only after the algorithm has proved they are within one year's
binding maximum of 5,778.

## Benchmark

Set `-DPASTAFARI_BUILD_BENCHMARK=ON` in a CMake build, or run `make benchmark`.
The benchmark reports a cold conversion, an identical cache hit and a
365-consecutive-day workload.  See `docs/BENCHMARKS.md` for a recorded run and
the exact interpretation of those figures.
