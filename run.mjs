"use strict";

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mergeReports } from "./lib.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const jobs = [
  ["engine", resolve(here, "engine.mjs")],
  ["reverse-constraints", resolve(here, "reverse-constraints.mjs")],
  ["web", resolve(here, "web.mjs")],
];

function run(script) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [script], { stdio: "inherit", env: process.env });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`Benchmark child failed: ${script} (code=${code}, signal=${signal ?? "none"})`));
    });
  });
}

for (const [, script] of jobs) await run(script);
const paths = await mergeReports(jobs.map(([name]) => name), "report");
console.log(`Combined benchmark report: ${paths.mdPath}`);
