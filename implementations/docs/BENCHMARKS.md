# Python and C++ benchmark snapshot

These measurements are a reproducible engineering snapshot, not a portable
performance guarantee.  They were collected on 12 August 2026 in a Linux
6.18.35 x86-64 virtual machine with nine visible AMD EPYC 9V74 vCPUs.

| Implementation | Toolchain | Cold median | Cached identical conversion | 365 consecutive days |
|---|---|---:|---:|---:|
| Python | CPython 3.12.13 | 1.975577 s | 0.228 us/op | 0.002727 s |
| C++ | GCC 13.3.0, OpenSSL 3, `-O3 -DNDEBUG` | 2.797031 s | 0.408209 us/op | 0.000709 s |

Each cold figure is the median of three conversions of `2026-08-06`, using the
same day as the calculation day and a new calendar instance for every sample.
The cached figure repeats that exact conversion 10,000 times after one warm-up.
The sequence figure converts the next 365 JDNs with one already-warmed instance.

The cached number measures the public cache-hit path, not the full calendar
algorithm.  The 365-day measurement is more representative of a calendar view,
while the cold measurement captures checkpoint traversal, sauce generation and
the first year-structure construction.  Far-away queried dates can require a
year-by-year walk and therefore have a different cost profile.

## Reproduce

From the repository root:

```bash
PYTHONPATH=python python3 python/benchmark.py
```

For CMake builds, enable the benchmark target explicitly:

```bash
cmake -S cpp -B cpp/build -DCMAKE_BUILD_TYPE=Release \
  -DPASTAFARI_BUILD_BENCHMARK=ON
cmake --build cpp/build --config Release --target pastafari-benchmark
./cpp/build/pastafari-benchmark
```

Alternatively, from `cpp/`, run `make benchmark` when the OpenSSL 3 development
headers and `libcrypto` are installed.
