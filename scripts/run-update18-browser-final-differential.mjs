#!/usr/bin/env node
"use strict";

import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "artifacts/update-18/browser-final-differential.json");
const MIME = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".css", "text/css; charset=utf-8"]]);

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    const file = path.resolve(ROOT, `.${decodeURIComponent(url.pathname)}`);
    if (file !== ROOT && !file.startsWith(`${ROOT}${path.sep}`)) throw new Error("outside root");
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
try {
  const address = server.address();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.stack || error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console.error: ${message.text()}`); });
  await page.goto(`http://127.0.0.1:${address.port}/test/update18-browser-final-differential.html`, { waitUntil: "load", timeout: 120_000 });
  await page.waitForFunction(() => globalThis.__PASTAFARI_UPDATE18_BROWSER_DIFFERENTIAL__?.complete === true, null, { timeout: 120_000 });
  const payload = await page.evaluate(() => globalThis.__PASTAFARI_UPDATE18_BROWSER_DIFFERENTIAL__);
  const result = { ...payload, browserVersion: await browser.version(), pageErrors: errors };
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "PASS" || errors.length) process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  await new Promise((resolve) => server.close(resolve));
}
