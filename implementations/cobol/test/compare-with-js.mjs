import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import process from "node:process";
import {
  PastafariCalendar,
} from "../../../browser/pastafari-calendar-fast.js";

const here = dirname(fileURLToPath(import.meta.url));
const exe = resolve(here, `../build/pastafari-vectors${process.platform === "win32" ? ".exe" : ""}`);
const run = spawnSync(exe, [], { encoding: "utf8", env: process.env });
if (run.error) throw run.error;
if (run.status !== 0) {
  process.stderr.write(run.stdout);
  process.stderr.write(run.stderr);
  throw new Error(`COBOL vector runner exited ${run.status}`);
}

const calendar = new PastafariCalendar();
let vectors = 0;
let selfChecks = 0;
for (const raw of run.stdout.split(/\r?\n/)) {
  if (!raw) continue;
  const fields = raw.split("|");
  if (fields[0] === "VECTOR") {
    const calc = BigInt(fields[1]);
    const target = BigInt(fields[2]);
    const expected = calendar.convertJdn(target, { calculationJdn: calc }).toJSON();
    assert.equal(BigInt(fields[3]), BigInt(expected.year), `year mismatch for c=${calc}, t=${target}`);
    assert.equal(fields[4].trimEnd(), expected.cutletName, `cutlet mismatch for c=${calc}, t=${target}`);
    assert.equal(Number(fields[5]), expected.dayInCutlet, `day-in-cutlet mismatch for c=${calc}, t=${target}`);
    assert.equal(fields[6].trimEnd(), expected.monthName, `month mismatch for c=${calc}, t=${target}`);
    assert.equal(Number(fields[7]), expected.dayInMonth, `day-in-month mismatch for c=${calc}, t=${target}`);
    assert.equal(BigInt(fields[8]), target, `COBOL reverse did not recover target for c=${calc}, t=${target}`);
    vectors += 1;
  } else if (fields[0] === "SELF") {
    const jdn = BigInt(fields[1]);
    const expected = calendar.convertJdn(jdn, { calculationJdn: jdn }).toJSON();
    assert.equal(BigInt(fields[2]), BigInt(expected.year));
    assert.equal(fields[3].trimEnd(), expected.cutletName);
    assert.equal(Number(fields[4]), expected.dayInCutlet);
    assert.equal(fields[5].trimEnd(), expected.monthName);
    assert.equal(Number(fields[6]), expected.dayInMonth);
    selfChecks += 1;
  } else {
    throw new Error(`Unexpected COBOL output: ${raw}`);
  }
}
assert.equal(vectors, 27, "expected 27 forward/reverse-known vectors");
assert.equal(selfChecks, 1, "expected one same-as-target check");
console.log(`COBOL compatibility: ${vectors} forward vectors + reverse-known + ${selfChecks} bounded self-reverse passed.`);
