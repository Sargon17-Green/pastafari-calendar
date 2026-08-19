#!/usr/bin/env node

import {
  DEFAULT_PROPERTY_SEED,
  DEFAULT_SMOKE_CASES,
  DEFAULT_SOAK_CASES,
  formatPropertyReport,
  runPropertySuite,
} from "../test/property/calendar-property-harness.js";

function parseArgs(argv) {
  const options = { mode: "soak" };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") return { help: true };
    if (!token.startsWith("--")) throw new RangeError(`Unexpected argument: ${token}`);
    const equal = token.indexOf("=");
    const key = token.slice(2, equal === -1 ? undefined : equal);
    const value = equal === -1 ? argv[++index] : token.slice(equal + 1);
    if (value === undefined) throw new RangeError(`Missing value for --${key}`);
    if (key === "mode") options.mode = value;
    else if (key === "seed") options.seed = value;
    else if (key === "cases") options.cases = Number(value);
    else if (key === "calendar") options.calendar = value;
    else if (key === "property") options.property = value;
    else if (key === "case") options.caseFilter = value;
    else if (key === "counterexample") options.counterexamplePath = value === "none" ? null : value;
    else throw new RangeError(`Unknown option: --${key}`);
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/run-calendar-property-soak.mjs [options]",
    "  --mode smoke|soak",
    `  --seed <u64>             default ${DEFAULT_PROPERTY_SEED}`,
    `  --cases <n>              defaults: smoke=${DEFAULT_SMOKE_CASES}, soak=${DEFAULT_SOAK_CASES}`,
    "  --calendar <id>          run one calendar/input group",
    "  --property <name>        run one property",
    "  --case b:N|r:N           reproduce one boundary/random case",
    "  --counterexample <path>  failure JSON path; use 'none' to disable",
  ].join("\n");
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    process.exit(0);
  }
  const report = await runPropertySuite(options);
  console.log(formatPropertyReport(report));
} catch (error) {
  console.error(error?.stack || String(error));
  if (error?.counterexample) console.error(JSON.stringify(error.counterexample, (_key, value) => typeof value === "bigint" ? `${value}n` : value, 2));
  process.exitCode = 1;
}
