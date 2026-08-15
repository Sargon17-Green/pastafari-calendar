#!/usr/bin/env node
"use strict";

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const targetPath = "/test/calendar-roundtrip-browser-smoke.html";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
]);

function safeFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const candidate = path.resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) return null;
  return candidate;
}

const server = http.createServer((req, res) => {
  const file = safeFile(req.url || "/");
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "content-type": mime.get(path.extname(file)) || "application/octet-stream", "cache-control": "no-store" });
  fs.createReadStream(file).pipe(res);
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

let browser;
try {
  const address = server.address();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `http://127.0.0.1:${address.port}${targetPath}`;
  await page.goto(url, { waitUntil: "load", timeout: 30_000 });
  await page.waitForFunction(() => document.documentElement.dataset.status, null, { timeout: 30_000 });
  const result = JSON.parse(await page.locator("#result").textContent());
  console.log(`[browser] ${await browser.version()}`);
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.status === "PASS" ? 0 : 1;
} catch (error) {
  console.error(error?.stack || error);
  process.exitCode = 2;
} finally {
  await browser?.close().catch(() => {});
  await new Promise(resolve => server.close(resolve));
}
