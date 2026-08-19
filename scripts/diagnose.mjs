#!/usr/bin/env node
"use strict";

import {
  configurePastafariDiagnostics,
  getPastafariDiagnosticsSnapshot,
  resetPastafariDiagnostics,
} from "../browser/pastafari-diagnostics.js";
import {
  PastafariCalendar,
  clearFastCache,
} from "../browser/pastafari-calendar-fast.js";

function usage(message = null) {
  if (message) process.stderr.write(`${message}\n\n`);
  process.stderr.write(`Usage: node scripts/diagnose.mjs [options]\n\n`);
  process.stderr.write(`Options:\n`);
  process.stderr.write(`  --mode=summary|detailed    Diagnostics mode (default: summary)\n`);
  process.stderr.write(`  --trace-limit=N            Detailed trace ring size (default: 512)\n`);
  process.stderr.write(`  --target-jdn=N             Target JDN (required)\n`);
  process.stderr.write(`  --calculation-jdn=N        Calculation-day JDN (default: target)\n`);
  process.stderr.write(`  --repeat=N                 Repeat the same conversion (default: 1)\n`);
  process.stderr.write(`  --help                     Show this help\n`);
  process.exitCode = message ? 2 : 0;
}

function parseInteger(text, name) {
  if (!/^[+-]?\d+$/.test(text ?? "")) throw new TypeError(`${name} must be a decimal integer.`);
  return BigInt(text);
}

function parseArgs(argv) {
  const options = { mode: "summary", traceLimit: 512, repeat: 1 };
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") return { help: true };
    const [key, value] = arg.split("=", 2);
    switch (key) {
      case "--mode": options.mode = value; break;
      case "--trace-limit": options.traceLimit = Number(value); break;
      case "--target-jdn": options.targetJdn = parseInteger(value, key); break;
      case "--calculation-jdn": options.calculationJdn = parseInteger(value, key); break;
      case "--repeat": options.repeat = Number(value); break;
      default: throw new TypeError(`Unknown option: ${arg}`);
    }
  }
  if (!options.targetJdn) throw new TypeError("--target-jdn is required.");
  if (!options.calculationJdn) options.calculationJdn = options.targetJdn;
  if (!Number.isSafeInteger(options.repeat) || options.repeat < 1) {
    throw new RangeError("--repeat must be a positive safe integer.");
  }
  return options;
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
  } else {
    configurePastafariDiagnostics({ mode: options.mode, traceLimit: options.traceLimit });
    resetPastafariDiagnostics();
    clearFastCache();
    resetPastafariDiagnostics();

    const calendar = new PastafariCalendar();
    for (let index = 0; index < options.repeat; index += 1) {
      calendar.convertJdn(options.targetJdn, { calculationJdn: options.calculationJdn });
    }

    process.stdout.write(`${JSON.stringify(getPastafariDiagnosticsSnapshot(), null, 2)}\n`);
  }
} catch (error) {
  usage(error?.message ?? String(error));
}
