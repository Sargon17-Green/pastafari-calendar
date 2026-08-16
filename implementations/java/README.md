# Pastafari Calendar — Java 17

This directory contains a complete independent Java implementation. Calendar
arithmetic, the sauce, gate traversal, year selection, cutlet/month unranking
and constrained month interleaving are executed by Java code in
`PastafariCalendar.java`.

There is no JNA, JNI, FFI, native library, subprocess or network dependency.
Unbounded inputs, sauce values, ranks, counts, gate positions and year numbers
use `java.math.BigInteger`. `int` is used only for fixed tables, array indexes
and values proved to be within a 5,778-day year.

## Run directly with Java 17+

Java's source-file launcher can compile and run the complete single source file
without producing repository build artifacts:

```bash
java src/main/java/org/appointedtimes/PastafariCalendar.java \
  2026-08-06 --calculation-date 2026-08-06
```

The CLI accepts signed proleptic-Gregorian `[+-]YYYY-MM-DD` dates. It also has a
direct arbitrary-precision JDN form:

```bash
java src/main/java/org/appointedtimes/PastafariCalendar.java \
  --jdn 2461259 2461259
```

## Test

From `implementations/java`:

```bash
make test
```

`test-known` runs all 16 shared known/boundary vectors. `test-differential`
loads the checked-in 10,000-pair authoritative corpus and processes its forty
calculation-day groups using at most eight Java workers. Expected tuples are
static development data; JavaScript is never loaded at runtime.

## Package

With a full JDK 17 and Maven installed:

```bash
mvn --batch-mode --no-transfer-progress package
java -jar target/pastafari-calendar-2.0.0.jar \
  2026-08-06 -c 2026-08-06
```

The Maven project pins its compiler and JAR plugins and declares no runtime
dependencies. The Maven path was not executed in the present environment
because only the Java source launcher is installed; that limitation is recorded
in the test report rather than represented as a pass.
