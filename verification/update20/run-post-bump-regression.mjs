"use strict";

import { writeJson, run } from "./lib.mjs";

const commands = [
  ["npm", ["run", "test:reference-oracle"]],
  ["npm", ["run", "test:regression:year-ceiling"]],
  ["npm", ["run", "test:runtime-patching"]],
  ["node", ["--test", "test/month-weaving-domain.test.js"]],
  ["node", ["--test", "test/update15-random-witness-isolation.test.js"]],
  ["node", ["--test", "test/update09-proleptic-negative-year.test.js"]],
  ["npm", ["run", "test:update11:vikrama"]],
  ["npm", ["run", "test:update12:koki"]],
  ["npm", ["run", "test:update13:intl"]],
  ["npm", ["run", "evidence:update17:verify"]],
  ["npm", ["run", "test:update17"]],
  ["npm", ["run", "test:update17:matrix"]],
  // Verify the committed Update 18 closure before the fresh differential runner
  // writes its own transient artifacts/update-18 report in this isolated CI job.
  ["npm", ["run", "test:update18"]],
  ["npm", ["run", "test:differential:final:node"]],
];

const results = [];
for (const [command, args] of commands) {
  const started = Date.now();
  const result = run(command, args, { timeoutMs: 60 * 60_000, maxBuffer: 128 * 1024 * 1024 });
  results.push({
    command: result.command,
    pass: result.pass,
    status: result.status,
    signal: result.signal,
    error: result.error,
    durationMs: Date.now() - started,
    stdoutTail: result.stdout.slice(-4000),
    stderrTail: result.stderr.slice(-4000),
  });
  process.stdout.write(`${result.pass ? "PASS" : "FAIL"} ${result.command}\n`);
  if (!result.pass) break;
}

const failed = results.filter((row) => !row.pass);
const report = {
  schema: "pastafari.update20.post-bump-regression.v1",
  status: failed.length === 0 && results.length === commands.length ? "PASS" : "FAIL",
  requiredCount: commands.length,
  completedCount: results.length,
  failedCount: failed.length,
  results,
};
await writeJson("post-bump-regression.json", report);
if (report.status !== "PASS") process.exitCode = 1;
