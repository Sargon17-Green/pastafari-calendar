"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("Update17 gate corpus matches authoritative/fast without hanging on the sealed deep-negative path", () => {
  const output = execFileSync(process.execPath, [
    fileURLToPath(new URL("../verification/update17/verify-gate-components.mjs", import.meta.url)),
  ], { encoding: "utf8", timeout: 120_000 });
  const report = JSON.parse(output.trim().split(/\r?\n/).at(-1));
  assert.equal(report.status, "UPDATE17_GATE_COMPONENT_PASS");
  assert.equal(report.fastChecked, report.corpusCases);
  assert.ok(report.authoritativeDirect > 0);
});
