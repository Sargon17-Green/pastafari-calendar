"use strict";

import { spawn } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEST_FILE = "test/checkpoint-compatibility.test.js";

const MODES = Object.freeze({
  sides: "PASTAFARI_CHECKPOINT_SIDES",
  exhaustive: "PASTAFARI_EXHAUSTIVE_CHECKPOINTS",
  rebuild: "PASTAFARI_REBUILD_CHECKPOINTS",
});

function usage() {
  return "Usage: node scripts/run-checkpoint-tests.mjs <sides|exhaustive|rebuild> [...]";
}

function runOne(mode) {
  const envVar = MODES[mode];
  if (!envVar) throw new RangeError(`Unknown checkpoint mode: ${mode}\n${usage()}`);

  const env = { ...process.env };
  for (const variable of Object.values(MODES)) delete env[variable];
  env[envVar] = "1";

  return new Promise((resolve, reject) => {
    process.stdout.write(`\n[checkpoint] ${mode}: ${envVar}=1\n`);
    const child = spawn(process.execPath, ["--test", TEST_FILE], {
      cwd: ROOT,
      env,
      stdio: "inherit",
      windowsHide: true,
    });
    child.on("error", reject);
    child.on("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(
        `Checkpoint mode ${mode} failed with ${signal ? `signal ${signal}` : `exit code ${code}`}.`,
      ));
    });
  });
}

const modes = process.argv.slice(2);
if (modes.length === 0) {
  process.stderr.write(`${usage()}\n`);
  process.exitCode = 2;
} else {
  try {
    for (const mode of modes) await runOne(mode);
  } catch (error) {
    process.stderr.write(`${error?.stack ?? error}\n`);
    process.exitCode = 1;
  }
}
