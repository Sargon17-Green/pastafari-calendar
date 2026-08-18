#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

import { LOCALES } from "../docs/i18n/registry.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const TIMEOUT_MS = 60_000;
const FIXED_QUERY = "t=2461266&v=2461266&c=2461266";
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"], [".json", "application/json"],
  [".png", "image/png"], [".svg", "image/svg+xml; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

function contentType(filePath) { return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream"; }

async function startServer() {
  const server = createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname);
      if (pathname === "/") pathname = "/index.html";
      const resolved = path.resolve(DOCS, pathname.replace(/^\/+/, ""));
      const relative = path.relative(DOCS, resolved);
      if (relative.startsWith("..") || path.isAbsolute(relative)) return response.writeHead(403).end("Forbidden");
      const info = await stat(resolved).catch(() => null);
      if (!info?.isFile()) return response.writeHead(404).end("Not found");
      const body = await readFile(resolved);
      response.writeHead(200, { "Content-Type": contentType(resolved), "Content-Length": body.length, "Cache-Control": "no-store" });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(String(error?.stack ?? error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address === "object");
  return { baseUrl: `http://127.0.0.1:${address.port}/`, close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())) };
}

function localeFilename(url) {
  const match = new URL(url).pathname.match(/\/i18n\/locales\/([^/]+\.js)$/);
  return match?.[1] ?? null;
}

async function waitForLocale(page, metadata) {
  await page.waitForFunction(({ code, dir }) => (
    document.documentElement.lang === code
    && document.documentElement.dir === dir
    && document.querySelector("#language-selector")?.value === code
  ), { code: metadata.code, dir: metadata.dir }, { timeout: TIMEOUT_MS });
  await page.waitForFunction(() => document.body?.innerText?.length > 100, null, { timeout: TIMEOUT_MS });
}

async function openLocale(page, baseUrl, metadata) {
  const url = new URL(baseUrl);
  url.search = FIXED_QUERY;
  url.searchParams.set("lang", metadata.code);
  await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
  await waitForLocale(page, metadata);
}

function representative(status, dir = null) {
  return LOCALES.find((locale) => locale.support === status && (dir === null || locale.dir === dir)) ?? null;
}

const completeLtr = representative("complete", "ltr");
const completeRtl = representative("complete", "rtl");
const partial = representative("partial");
const experimental = representative("experimental");
assert(completeLtr, "At least one complete LTR locale is required for the support-level smoke test.");
assert(completeRtl, "At least one complete RTL locale is required for the support-level smoke test.");
assert(partial, "At least one partial locale is required for the current support-level smoke test.");

const server = await startServer();
const browser = await chromium.launch({ headless: true });
try {
  for (const metadata of [completeLtr, completeRtl, partial, experimental].filter(Boolean)) {
    const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
    const page = await context.newPage();
    const pageErrors = [];
    const localeRequests = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    page.on("request", (request) => {
      const filename = localeFilename(request.url());
      if (filename) localeRequests.push(filename);
    });
    await openLocale(page, server.baseUrl, metadata);

    const probe = await page.evaluate(async (code) => {
      const i18n = await import("./i18n/registry.js?v=17-unified-i18n");
      const locale = await i18n.loadLocale(code);
      return {
        support: i18n.getLocale(code).support,
        message: i18n.translate(locale, "calendar.today"),
        cutlet: i18n.calendarLabel(locale, "cutlet", 0),
        runtimeNotice: i18n.translate(locale, "location.useDevice"),
        bodyHasUndefined: document.body.innerText.includes("undefined"),
      };
    }, metadata.code);

    assert.equal(probe.support, metadata.support);
    assert.equal(typeof probe.message, "string"); assert(probe.message.trim());
    assert.equal(typeof probe.cutlet, "string"); assert(probe.cutlet.trim());
    assert.equal(typeof probe.runtimeNotice, "string"); assert(probe.runtimeNotice.trim());
    assert.equal(probe.bodyHasUndefined, false);
    assert.deepEqual(pageErrors, []);
    assert(localeRequests.includes(`${metadata.code}.js`), `${metadata.code} locale module was not requested`);
    if (metadata.support === "partial" || metadata.support === "experimental") {
      assert(localeRequests.includes("en.js"), `${metadata.code} did not load its explicit English fallback`);
    } else if (metadata.code !== "en") {
      assert.equal(localeRequests.includes("en.js"), false, `complete locale ${metadata.code} unnecessarily loaded English`);
    }
    await context.close();
    console.log(`[PASS] ${metadata.code}: ${metadata.support}, ${metadata.dir}, load/fallback/visible-text smoke`);
  }

  // One real selector transition crosses all currently present support/direction classes.
  {
    const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
    const page = await context.newPage();
    await openLocale(page, server.baseUrl, completeLtr);
    await page.selectOption("#language-selector", partial.code);
    await waitForLocale(page, partial);
    await page.selectOption("#language-selector", completeRtl.code);
    await waitForLocale(page, completeRtl);
    assert.equal(await page.evaluate(() => document.body.innerText.includes("undefined")), false);
    await context.close();
    console.log(`[PASS] selector transition: ${completeLtr.code} -> ${partial.code} -> ${completeRtl.code}`);
  }

  if (!experimental) console.log("[SKIP] no experimental locale is currently registered; experimental fallback is covered by unit tests.");
  console.log("[PASS] i18n support-level browser smoke complete");
} finally {
  await browser.close();
  await server.close();
}
