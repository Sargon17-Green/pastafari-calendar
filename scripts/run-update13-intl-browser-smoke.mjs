#!/usr/bin/env node
"use strict";

import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVIDENCE_PATH = path.join(ROOT, "artifacts", "update-13-browser-worker-smoke.json");
const MIME = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".mjs", "text/javascript; charset=utf-8"]]);

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    const file = path.resolve(ROOT, `.${decodeURIComponent(url.pathname)}`);
    if (!file.startsWith(`${ROOT}${path.sep}`)) throw new Error("outside root");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("not a file");
    response.writeHead(200, { "content-type": MIME.get(path.extname(file)) || "application/octet-stream", "cache-control": "no-store" });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
});
await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });

let browser;
let evidence = {
  schema: "pastafari-update13-browser-worker-smoke-v1",
  status: "FAIL",
  browserVersion: null,
  pageResult: null,
  runnerErrors: [],
};

try {
  const address = server.address();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.stack || error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(`console.error: ${message.text()}`); });
  await page.goto(`http://127.0.0.1:${address.port}/test/update13-intl-browser.html`, { waitUntil: "load", timeout: 60_000 });
  await page.waitForFunction(() => document.querySelector("#result")?.textContent?.startsWith("UPDATE13_INTL_BROWSER="), null, { timeout: 60_000 });
  const text = await page.locator("#result").textContent();
  const result = JSON.parse(text.slice("UPDATE13_INTL_BROWSER=".length));
  const browserVersion = await browser.version();
  evidence = {
    schema: "pastafari-update13-browser-worker-smoke-v1",
    status: result.status === "PASS" && errors.length === 0 ? "PASS" : "FAIL",
    browserVersion,
    pageResult: result,
    runnerErrors: errors,
  };
  console.log(`[browser] ${browserVersion}`);
  console.log(JSON.stringify(evidence, null, 2));
  if (evidence.status !== "PASS") process.exitCode = 1;
} catch (error) {
  evidence = {
    ...evidence,
    status: "FAIL",
    browserVersion: await browser?.version().catch(() => null) ?? null,
    runnerErrors: [...evidence.runnerErrors, String(error?.stack || error)],
  };
  console.error(JSON.stringify(evidence, null, 2));
  process.exitCode = 1;
} finally {
  await mkdir(path.dirname(EVIDENCE_PATH), { recursive: true });
  await writeFile(EVIDENCE_PATH, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
  await browser?.close().catch(() => {});
  await new Promise(resolve => server.close(resolve));
}
