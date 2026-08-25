"use strict";

import { run, writeJson } from "./lib.mjs";

// Commands that complement release:verify and represent blocking non-browser CI semantics.
// Deliberately do not invoke `test:update16`, because that command is a historical
// evidence writer; the current blocking test path exercises Update 16 through npm test.
const commands = [
  ["npm", ["run", "security:supply-chain"]],
  ["npm", ["run", "gate-data:check"]],
  ["npm", ["run", "evidence:update17:stale"]],
  ["npm", ["run", "test:update17:matrix"]],
  ["npm", ["run", "test:update18"]],
  ["npm", ["run", "docs:check"]],
  ["npm", ["run", "check:reverse-i18n"]],
  ["npm", ["run", "check:i18n"]],
  ["npm", ["run", "test:update13:intl:standalone"]],
  ["npm", ["run", "checksums:verify"]],
  [process.execPath, ["scripts/check-sha-manifest-completeness.mjs"]],
];

const rows = [];
for (const [command, args] of commands) {
  const started = Date.now();
  const result = run(command, args, { timeoutMs: 45 * 60_000, maxBuffer: 128 * 1024 * 1024 });
  rows.push({ command: result.command, pass: result.pass, status: result.status, signal: result.signal, error: result.error, durationMs: Date.now() - started, stdoutTail: result.stdout.slice(-4000), stderrTail: result.stderr.slice(-4000) });
  process.stdout.write(`${result.pass ? "PASS" : "FAIL"} ${result.command}\n`);
  if (!result.pass) break;
}
const failures = rows.filter((r) => !r.pass).map((r) => r.command);
const artifact = { schema: "pastafari.update20.ci-release-parity.v1", status: failures.length === 0 && rows.length === commands.length ? "PASS" : "FAIL", requiredCount: commands.length, completedCount: rows.length, failures, rows };
await writeJson("ci-release-parity.json", artifact);
if (artifact.status !== "PASS") process.exitCode = 1;
