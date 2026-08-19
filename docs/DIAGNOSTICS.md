# Local diagnostics

The calendar has an opt-in diagnostics layer for explaining slow or surprising local calculations without adding telemetry, analytics, network logging, persistence, or a remote collector. Diagnostics are **disabled by default** and are intended for development, support, benchmarking, and reproducible bug reports.

Diagnostics do not change the calendar algorithm, engine selection rules, timeout values, cache policy, checkpoint contents, cancellation semantics, or returned calendar values. The authoritative sealed chronicle remains untouched; its production Worker boundary is timed and its wrapper-level work is counted.

## Modes

| Mode | Behaviour |
| --- | --- |
| `disabled` | Default. No report state is accumulated. Instrumented call sites reduce to short disabled checks. |
| `summary` | Bounded counters, duration aggregates, gauges, up to 50 completed-operation summaries, and bounded child-Worker reports. No event trace. |
| `detailed` | Everything in `summary`, plus a bounded chronological trace ring. |

Configure the process/page explicitly:

```js
import {
  configurePastafariDiagnostics,
  getPastafariDiagnosticsSnapshot,
  resetPastafariDiagnostics,
} from "./browser/pastafari-diagnostics.js";

configurePastafariDiagnostics({ mode: "summary" });
resetPastafariDiagnostics();
// Run the operation(s) under investigation.
const report = getPastafariDiagnosticsSnapshot();
console.log(JSON.stringify(report, null, 2));
```

For a detailed trace:

```js
configurePastafariDiagnostics({ mode: "detailed", traceLimit: 512 });
```

`traceLimit` is restricted to `0..10000` events. The default is 512.

## Schema

The machine-readable schema version is `1` (`PASTAFARI_DIAGNOSTICS_SCHEMA_VERSION`). A report has this shape:

```json
{
  "schemaVersion": 1,
  "mode": "summary",
  "traceLimit": 512,
  "epoch": 3,
  "generatedAtMonotonicMs": 1234.5,
  "limits": {
    "maxMetricKeysPerKind": 512,
    "maxChildSnapshots": 16,
    "maxOperationRecords": 50,
    "maxTraceEvents": 512
  },
  "summary": {
    "counters": {},
    "durations": {},
    "gauges": {},
    "droppedMetricKeys": 0,
    "droppedChildSnapshots": 0
  },
  "operations": [
    {
      "id": "op-17",
      "subsystem": "router",
      "operation": "convert",
      "durationMs": 12.3,
      "outcome": "ok",
      "start": {},
      "end": { "route": "fast-verified", "fallbackOccurred": false }
    }
  ],
  "children": {},
  "trace": []
}
```

Reports are JSON-serializable. `BigInt` values are represented as decimal strings; exact counters also switch to decimal strings once they exceed JavaScript’s safe-integer range, so JSON output does not lose integer precision. Errors are reduced to compact `{name,message,code}` data in trace payloads. Diagnostics intentionally do not retain returned Pastafarian date objects.

All elapsed-time measurements use a monotonic clock (`performance.now()` when available, Node `hrtime.bigint()` as a fallback). The `generatedAtMonotonicMs` value is useful only inside its local runtime; it is not wall-clock time.

Operation IDs (`op-1`, `op-2`, ...) are local to one diagnostics epoch and are not stable identifiers. Calling `resetPastafariDiagnostics()` clears accumulated state and advances the epoch. The epoch is propagated with Worker requests so a reset in the parent causes a corresponding Worker reset before the next request.

## Bounded memory

Diagnostics storage is bounded independently of the workload:

- at most 512 counter keys, 512 duration keys, and 512 gauge keys;
- at most 16 child-Worker snapshots;
- at most 50 completed-operation summaries (oldest entries are discarded first);
- at most the configured trace ring size, never more than 10,000 events;
- strings, object depth, and collection payloads are truncated by the sanitizer.

When a summary-key or child-snapshot limit is reached, new keys/sources are dropped and `summary.droppedMetricKeys` / `summary.droppedChildSnapshots` is incremented. Existing metric keys continue to update.

## Coverage

| Subsystem | Diagnostic information |
| --- | --- |
| Fast engine | conversion duration/outcome; result/state/sauce/structure/gate caches; insertion/eviction/size; year-5000 and year-by-number caches; chosen gate checkpoint/distance/direction/steps; year traversal direction/steps; candidate counts; cutlet/month/boundary year-construction phases; final date resolution; range and cutlet-view work. |
| Authoritative engine | parent Worker startup/request duration; Worker-side per-operation duration/outcome (`convert`, range, cutlet view); wrapper engine-load duration/attempts when observable after configuration; cutlet-scan days and range days. The sealed chronicle is not modified. |
| Router | completed convert/view operations with actual route; authoritative-first/background-verification strategy; result-available trace; calculation-day scope count; authoritative request start/dedup; verification duration/start/success/failure/supersede; retries; fallback reason and actual authoritative fallback engine; idle shutdown. |
| Engine Workers | cold/reused transport; Worker creation; initialization-to-ready; postMessage send phase; Worker/inline mode; parent round-trip phase; per-request duration/outcome; timeout phase/configured timeout; reset/termination; Worker-side computation snapshot returned to and boundedly retained by the parent. |
| Reverse | top-level find duration/outcome; known-calculation calls; diagonal candidates scanned; matches; same-target/nested/absolute-side-door paths; client timeout/cancellation/progress; reverse Worker duration/outcome. |
| Constraints | direct solve duration/outcome; variables/constraints/cyclic components; propagation passes; candidates scanned; reverse calls; forward verifications; pruning; termination reason; solution count; client timeout/cancellation/latest progress; Worker duration/outcome. |
| Cancellation/error | Compact error trace in detailed mode, stable error/cancellation counters, and unchanged thrown error objects at the public boundary. |

### Fast cache metric prefixes

The fast engine uses `.hit`, `.miss`, and (for LRU caches) `.eviction` suffixes on these prefixes:

- `fast.cache.result`
- `fast.cache.calculation-state`
- `fast.cache.sauce`
- `fast.cache.structure`
- `fast.cache.gate-distance`
- `fast.cache.gate-position`
- `fast.cache.year-5000`
- `fast.cache.year-by-number`

`fast.cache.clear` counts explicit cache clears. The existing public `getFastCacheStats()` result is unchanged.

### Checkpoints and year traversal

Useful summary counters are:

- `fast.checkpoint.lookups`
- `fast.checkpoint.steps`
- `fast.checkpoint.static-starts`
- `fast.checkpoint.cursor-starts`
- `fast.year-traversal.steps`
- `fast.year-traversal.direction.next`
- `fast.year-traversal.direction.previous`
- `fast.year.candidates.next`
- `fast.year.candidates.previous`

Summary gauges also retain the last static checkpoint, the actual selected traversal start, both distances, the selected source (`static-precomputed` or `traversal-cursor`), direction, resolved year and year-traversal step count. Detailed mode emits `fast/checkpoint-traversal` events with the same information and the actual traversal step count. The cursor is one bounded exact `(gate index, gate position)` pair: it is used only when closer than the static checkpoint, so diagnostics expose path selection without changing the gate recurrence or calendar result.

## Router fallback reason codes

Fallback counters use `router.fallback.<reason>` and detailed events include the same stable `reason` string:

| Reason | Source condition |
| --- | --- |
| `fast-mismatch` | `ERR_FAST_MISMATCH` during verification. |
| `fast-view-invalid` | `ERR_FAST_VIEW`. |
| `engine-timeout` | `ERR_ENGINE_TIMEOUT`. |
| `authoritative-range-invalid` | `ERR_AUTHORITATIVE_RANGE`. |
| `worker-load` | `ERR_WORKER_LOAD`. |
| `worker-message` | `ERR_WORKER_MESSAGE`. |
| `engine-interface` | `ERR_ENGINE_INTERFACE`. |
| `engine-unavailable` | `ERR_ENGINE_UNAVAILABLE`. |
| `fast-request-error` | Any other fast-request failure. |

The reason code is diagnostic metadata only. The router follows the same pre-existing fallback path. A completed router operation that actually took a fast-to-authoritative fallback records `fallbackOccurred: true`, the same `fallbackReason`, and `actualEngine: "authoritative"`.

The current router is **not a fast-vs-authoritative first-result race**. For an unverified calculation day it first obtains the authoritative anchor, makes that trusted result available, then verifies the fast implementation in the background. Diagnostics therefore label the strategy `authoritative-first-background-verification` instead of fabricating a "winner" metric. Once a calculation day is verified, normal requests use fast and fall back only at the existing decision points.

## Timeout and cancellation examples

A Worker timeout remains a `TimeoutError` with `code === "ERR_ENGINE_TIMEOUT"`. Aggregate counters still show timeout/termination counts, while the bounded operation record also identifies the phase and configured timeout, for example:

```json
{
  "subsystem": "engine-client",
  "operation": "fast:convert",
  "outcome": "timeout",
  "end": {
    "mode": "worker",
    "phase": "worker-round-trip",
    "timeoutMs": 90000,
    "transportState": "reused"
  }
}
```

A reverse/constraint abort remains an `AbortError` with the pre-existing abort code. Depending on the API used, the report records `reverse-client.cancellations`, `constraints-client.cancellations`, `reverse.outcome.cancelled`, or `constraints.cancellations`. Diagnostics never substitute a different exception.

## Worker reports

When diagnostics are enabled, a Worker receives only the local diagnostics configuration (`mode`, `traceLimit`, `epoch`) as an extra request field. Its normal result/error protocol is unchanged; the Worker adds a diagnostics snapshot to the protocol message, and the parent stores it under a bounded source key such as:

- `children["worker.fast"]`
- `children["worker.authoritative"]`
- `children["worker.reverse"]`
- `children["worker.constraints"]`

The parent measures Worker round-trip time independently. Initialization is measured from the parent through the Worker `ready` message, and Worker creation/send are separate operation records. Child monotonic timestamps must not be subtracted from parent timestamps because each runtime can have a different monotonic origin. The Worker reports its own computation duration in its child snapshot instead.

For reverse/constraint Workers, a cancel request is counted separately from whether it found an active request to abort. This distinguishes a real in-flight abort from a late/superseded cancel.

## Command-line report

A local fast-engine report can be generated without changing application code:

```sh
node scripts/diagnose.mjs \
  --mode=summary \
  --target-jdn=2461259 \
  --calculation-jdn=2461259 \
  --repeat=2
```

Use `--mode=detailed --trace-limit=512` for the trace ring. The command prints only the diagnostics report, not the calendar result.

## Overhead measurement

For a repeatable microbenchmark of the instrumentation path:

```sh
node scripts/diagnostics-overhead.mjs
```

It reports seven warm result-cache-hit rounds for each mode and also a small set of cold full-conversion samples. The warm microbenchmark exposes the structural instrumentation cost when the underlying operation is only microseconds; the cold measurement shows the same instrumentation against real calendar work. This is **measurement only**: neither the script nor CI treats an overhead ratio as a pass/fail threshold. The diagnostic regression test likewise records a small mode comparison while asserting only that the measurements are finite.

Absolute timings depend strongly on CPU, runtime, power state, and cache warmth. Compare modes within the same run rather than comparing raw milliseconds from different machines.

## Regression guarantees

`test/diagnostics.test.js` checks, among other things:

- disabled is the default and accumulates no summary/trace data;
- schema version and JSON serialization;
- fast result determinism across disabled/summary/detailed modes;
- result-cache miss/hit coverage;
- detailed trace ring bound and 50-operation summary ring bound;
- summary-key and child-snapshot bounds;
- calculation-day cache-scope separation;
- stable router fallback reason recording plus actual fallback engine metadata;
- Worker timeout semantics;
- Worker child-report aggregation;
- successful short reverse work counters and cancellation semantics;
- successful short constraint work counters/direct duration and cancellation semantics;
- overhead measurement without a performance gate.

The existing router fallback/concurrency and Pages engine-copy tests remain part of the regression set.

## Limitations

- The intentionally sealed/large authoritative chronicle is not instrumented internally. Diagnostics measure its production Worker request from both sides and wrapper-level range/cutlet work, but cannot attribute a single authoritative `convertJdn()` to individual cryptographic/combinatorial phases without modifying the sealed implementation.
- Diagnostics state is process/page-local and memory-only. Reloading the page discards it.
- Monotonic timestamps are not civil timestamps and cannot be correlated across independent processes by arithmetic alone.
- Detailed mode is intentionally more expensive than summary mode because it allocates sanitized trace events. Use summary mode first and enable detailed mode only when event order is needed.
- The report is designed to explain computation, not to reproduce secret/internal intermediate data or retain full calendar outputs.
