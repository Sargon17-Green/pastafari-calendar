#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, firefox } from "playwright";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const DOCS = path.join(ROOT, "docs");
const FIXED_QUERY = "t=2461266&v=2461266&c=2461266";
const TIMEOUT_MS = 60_000;
const EXPECTED_LOCALE_COUNT = 72;
const requestedBrowsers = process.argv.slice(2).flatMap((arg) => arg.startsWith("--browser=") ? [arg.slice("--browser=".length)] : []);
const browserNames = requestedBrowsers.length ? requestedBrowsers : ["chromium", "firefox"];
for (const name of browserNames) {
  if (!["chromium", "firefox"].includes(name)) throw new RangeError(`Unsupported browser: ${name}`);
}

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

function contentType(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

async function startServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      if (url.pathname === "/__registry_probe.html") {
        const body = `<!doctype html><meta charset="utf-8"><script type="module">
          import { LOCALES } from "./i18n/registry.js?v=16-support-levels";
          window.__registryProbe = { count: LOCALES.length, ready: true };
        </script>`;
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
        response.end(body);
        return;
      }
      if (url.pathname === "/__seed.html") {
        const code = JSON.stringify(url.searchParams.get("lang") ?? "");
        const body = `<!doctype html><meta charset="utf-8"><script>localStorage.setItem("pastafari.language", ${code}); window.__seeded = true;</script>`;
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
        response.end(body);
        return;
      }

      let pathname = decodeURIComponent(url.pathname);
      if (pathname === "/") pathname = "/index.html";
      const relative = pathname.replace(/^\/+/, "");
      const resolved = path.resolve(DOCS, relative);
      const relativeToDocs = path.relative(DOCS, resolved);
      if (relativeToDocs.startsWith("..") || path.isAbsolute(relativeToDocs)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const info = await stat(resolved).catch(() => null);
      if (!info?.isFile()) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        response.end("Not found");
        return;
      }
      const body = await readFile(resolved);
      response.writeHead(200, {
        "Content-Type": contentType(resolved),
        "Content-Length": body.length,
        "Cache-Control": "no-store",
      });
      if (request.method === "HEAD") response.end();
      else response.end(body);
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
  return {
    baseUrl: `http://127.0.0.1:${address.port}/`,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

function localeFilename(url) {
  const parsed = new URL(url);
  const match = parsed.pathname.match(/\/i18n\/locales\/([^/]+\.js)$/);
  return match?.[1] ?? null;
}

function collectLocaleRequests(page) {
  const requests = [];
  page.on("request", (request) => {
    const filename = localeFilename(request.url());
    if (filename) requests.push({ filename, url: request.url() });
  });
  return requests;
}

async function waitForLocale(page, code, dir) {
  await page.waitForFunction(({ expectedCode, expectedDir }) => (
    document.documentElement.lang === expectedCode
    && document.documentElement.dir === expectedDir
    && document.querySelector("#language-selector")?.value === expectedCode
  ), { expectedCode: code, expectedDir: dir }, { timeout: TIMEOUT_MS });
}

async function openApp(page, baseUrl, { lang = null } = {}) {
  const url = new URL(baseUrl);
  url.search = FIXED_QUERY;
  if (lang) url.searchParams.set("lang", lang);
  await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
}

async function seedSavedLocale(page, baseUrl, code) {
  await page.goto(`${baseUrl}__seed.html?lang=${encodeURIComponent(code)}`, { waitUntil: "load", timeout: TIMEOUT_MS });
  await page.waitForFunction(() => window.__seeded === true, null, { timeout: TIMEOUT_MS });
}

function assertExactLocaleRequests(requests, expected, label) {
  const actual = requests.map(({ filename }) => filename);
  assert.deepEqual(actual, expected, `${label}: locale module requests ${JSON.stringify(actual)}; expected ${JSON.stringify(expected)}`);
}

async function runBrowser(browserName, browserType, baseUrl) {
  const browser = await browserType.launch({ headless: true });
  try {
    // 1. Importing registry alone must not request a locale module.
    {
      const context = await browser.newContext({ serviceWorkers: "block" });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await page.goto(`${baseUrl}__registry_probe.html`, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
      await page.waitForFunction(() => window.__registryProbe?.ready === true, null, { timeout: TIMEOUT_MS });
      const count = await page.evaluate(() => window.__registryProbe.count);
      assert.equal(count, EXPECTED_LOCALE_COUNT);
      assertExactLocaleRequests(requests, [], `${browserName} registry-only import`);
      await context.close();
    }

    // 2. English startup requests only English.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl, { lang: "en" });
      await waitForLocale(page, "en", "ltr");
      assertExactLocaleRequests(requests, ["en.js"], `${browserName} English startup`);
      await context.close();
    }

    // 3. Hebrew startup requests only Hebrew and applies RTL.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl, { lang: "he" });
      await waitForLocale(page, "he", "rtl");
      assertExactLocaleRequests(requests, ["he.js"], `${browserName} Hebrew startup`);
      await context.close();
    }

    // 4/5. Language switching loads on demand once and reuses both loaded resources.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl, { lang: "en" });
      await waitForLocale(page, "en", "ltr");
      await page.selectOption("#language-selector", "he");
      await waitForLocale(page, "he", "rtl");
      await page.selectOption("#language-selector", "en");
      await waitForLocale(page, "en", "ltr");
      await page.selectOption("#language-selector", "he");
      await waitForLocale(page, "he", "rtl");
      assertExactLocaleRequests(requests, ["en.js", "he.js"], `${browserName} repeated language switching`);
      await context.close();
    }

    // 6. URL wins over a saved locale.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      const page = await context.newPage();
      await seedSavedLocale(page, baseUrl, "he");
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl, { lang: "en" });
      await waitForLocale(page, "en", "ltr");
      assertExactLocaleRequests(requests, ["en.js"], `${browserName} URL locale priority`);
      const saved = await page.evaluate(() => localStorage.getItem("pastafari.language"));
      assert.equal(saved, "he", `${browserName} URL override changed saved preference`);
      await context.close();
    }

    // 7. Saved locale still wins when URL has no language.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      const page = await context.newPage();
      await seedSavedLocale(page, baseUrl, "he");
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl);
      await waitForLocale(page, "he", "rtl");
      assertExactLocaleRequests(requests, ["he.js"], `${browserName} saved locale`);
      await context.close();
    }

    // 8. Browser locale matching still works.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "he-IL" });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl);
      await waitForLocale(page, "he", "rtl");
      assertExactLocaleRequests(requests, ["he.js"], `${browserName} browser locale matching`);
      await context.close();
    }

    // 9. Unsupported browser languages still fall back to English.
    {
      const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
      await context.addInitScript(() => {
        try { Object.defineProperty(Navigator.prototype, "languages", { configurable: true, get: () => ["qaa", "qab"] }); } catch {}
        try { Object.defineProperty(Navigator.prototype, "language", { configurable: true, get: () => "qaa" }); } catch {}
      });
      const page = await context.newPage();
      const requests = collectLocaleRequests(page);
      await openApp(page, baseUrl);
      await waitForLocale(page, "en", "ltr");
      assertExactLocaleRequests(requests, ["en.js"], `${browserName} English fallback`);
      await context.close();
    }

    console.log(`[PASS] ${browserName}: lazy i18n startup/switch/selection regression`);
  } finally {
    await browser.close();
  }
}

const localeDir = path.join(DOCS, "i18n", "locales");
const localeFiles = (await readdir(localeDir)).filter((name) => name.endsWith(".js"));
assert.equal(localeFiles.length, EXPECTED_LOCALE_COUNT, `Expected ${EXPECTED_LOCALE_COUNT} locale files`);
const beforeBytes = (await Promise.all(localeFiles.map(async (name) => (await stat(path.join(localeDir, name))).size))).reduce((sum, size) => sum + size, 0);
const englishBytes = (await stat(path.join(localeDir, "en.js"))).size;
const hebrewBytes = (await stat(path.join(localeDir, "he.js"))).size;
console.log(`[MEASURE] eager baseline: ${EXPECTED_LOCALE_COUNT} locale files, ${beforeBytes} bytes`);
console.log(`[MEASURE] lazy English startup: 1 locale file, ${englishBytes} bytes`);
console.log(`[MEASURE] lazy Hebrew startup: 1 locale file, ${hebrewBytes} bytes`);

const server = await startServer();
try {
  if (browserNames.includes("chromium")) await runBrowser("Chromium", chromium, server.baseUrl);
  if (browserNames.includes("firefox")) await runBrowser("Firefox", firefox, server.baseUrl);
  console.log(`[PASS] i18n lazy-loading browser smoke complete (${browserNames.join(", ")})`);
} finally {
  await server.close();
}
