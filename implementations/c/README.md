# Pastafari Calendar — C17

This directory contains a complete independent C17 implementation. Its integer layer, calendar engine, headers and CLI live under `c/`; it does not call or link another language's calendar engine. The project-owned limb arithmetic handles sauce values, ranks and combinatorial counts without GMP.

The sole normative source is **“מגילת העיתים — לוח סוד הרוטב ושמות הימים”**, 2026-08-16, SHA-256 `d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96`.

```bash
make
make test
./build/pastafari-calendar 2026-08-06 2026-08-12
./build/pastafari-calendar --jdn 2461259 2461265
```

The normative positional order is **calculation/action day first, queried/target day second**. There is no implicit civil-today fallback; resolving a real instant/location belongs to the separate Venus-day adapter.

The C17 public JDN and year representation is finite (`int64_t`). Conversion additionally rejects a JDN whose absolute distance from the Foundation Day cannot be doubled inside `uint64_t`, because the normative work-day numbering doubles that distance. All accepted inputs are processed exactly; overflow is detected rather than wrapped.

The build also creates `libpastafari_core.so`. Its UTF-8 ABI uses the same calculation-first order:

```c
bool pc_convert_iso_json(
    const char *calculation,
    const char *target,
    char *output,
    size_t output_capacity,
    const char **error_message
);
```

`implementations/tests/conformance-vectors.json` is specification-derived canonical data. The retained 16-vector and 10,000-pair fixtures are historical regression data only.
