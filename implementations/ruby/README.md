# Pastafari Calendar — Ruby

This directory contains a complete independent Ruby implementation of the
Pastafari Calendar algorithm. It does not use FFI, Fiddle, native extensions,
shared libraries, subprocesses, RPC, WebAssembly, JavaScript, or another
language's calendar engine. Exact arithmetic uses Ruby's arbitrary-precision
`Integer`.

The binding maximum year length is **5,778** days.

## Command line

```bash
ruby cli.rb 2026-08-06 --calculation-date 2026-08-06
```

For direct JDN input:

```bash
ruby cli.rb --jdn 2461259 2461259
```

## Known-vector test

From `implementations/`:

```bash
ruby ruby/test.rb
```

## Differential test

From `implementations/`:

```bash
ruby ruby/differential.rb tests/oracle-differential-10000.tsv
```

The full 10,000-row corpus was also executed on Ruby 4.0.6 on Windows. The
preserved log is at
`../../verification/evidence/multilang/ruby-differential-20260814-125717.log`.
