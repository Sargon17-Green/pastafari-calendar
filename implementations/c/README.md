# Pastafari Calendar — C17

This directory contains a complete, independently buildable C17
implementation. Its integer layer, calendar engine, headers and CLI all live
below `c/`; it does not include or link another language implementation.
The project-owned arbitrary-precision limb implementation requires no GMP.

```bash
make
make test
./build/pastafari-calendar 2026-08-06 -c 2026-08-06
```

The build also creates `libpastafari_core.so`. It exposes a narrow UTF-8 ABI for
consumers that may want to embed this C engine:

```c
bool pc_convert_iso_json(
    const char *target,
    const char *calculation,
    char *output,
    size_t output_capacity,
    const char **error_message
);
```

The shared-library target is still the C17 implementation itself; the calendar
algorithm is compiled from the C sources in this directory.
