"use strict";

import { spawn } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = {
  ...process.env,
  PASTAFARI_YEAR_CEILING_INTEGRATION: "1",
};

const child = spawn(process.execPath, ["--test", "test/year-ceiling-detour.test.js"], {
  cwd: ROOT,
  env,
  stdio: "inherit",
  windowsHide: true,
});

child.on("error", (error) => {
  process.stderr.write(`${error?.stack ?? error}\n`);
  process.exitCode = 1;
});

child.on("close", (code, signal) => {
  if (code === 0) return;
  process.stderr.write(
    `Year-ceiling regression failed with ${signal ? `signal ${signal}` : `exit code ${code}`}.\n`,
  );
  process.exitCode = code ?? 1;
});
