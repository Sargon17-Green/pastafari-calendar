"use strict";

// A genuine predecessor-to-release browser upgrade test. The predecessor is
// the immutable, published French About main commit, not a renamed new worker.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { chromium } from "playwright";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const BASE = "/pastafari-calendar/";
const PREDECESSOR = "6b580f9fe914968c57470bec9d8cf3903c463483";
const PREDECESSOR_CACHE = "pastafari-static-pwa-about-fr-20261114-core";
const CANDIDATE_CACHE = "pastafari-static-pwa-about-fa-20261114-core";
const TIMEOUT = 180_000;
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

// The git object has already been fetched by CI. Network access is not needed
// while running the browser test, including during the offline phase.
await execFileAsync("git", ["cat-file", "-e", PREDECESSOR + "^{commit}"], { cwd: ROOT });
const predecessorBlobs = new Map();
async function predecessorBytes(rel) {
  if (!predecessorBlobs.has(rel)) {
    predecessorBlobs.set(rel, (async () => {
      const { stdout } = await execFileAsync("git", ["show", PREDECESSOR + ":docs/" + rel], {
        cwd: ROOT, encoding: "buffer", maxBuffer: 16 * 1024 * 1024,
      });
      return stdout;
    })());
  }
  return predecessorBlobs.get(rel);
}

let mode = "predecessor";
let requests = 0;
const server = createServer(async (req, res) => {
  requests += 1;
  try {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    if (!url.pathname.startsWith(BASE)) {
      res.writeHead(404); res.end(); return;
    }
    let rel = decodeURIComponent(url.pathname.slice(BASE.length));
    if (!rel || rel.endsWith("/")) rel += "index.html";
    if (rel.includes("\\") || rel.includes("\0") || rel.split("/").includes("..")) {
      res.writeHead(403); res.end(); return;
    }
    const absolute = path.resolve(DOCS, rel);
    if (!absolute.startsWith(DOCS + path.sep)) {
      res.writeHead(403); res.end(); return;
    }
    const body = mode === "predecessor" ? await predecessorBytes(rel) : await readFile(absolute);
    res.writeHead(200, {
      "Content-Type": mime.get(path.extname(rel).toLowerCase()) || "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-store",
      "Service-Worker-Allowed": BASE,
    });
    if (req.method === "HEAD") res.end();
    else res.end(body);
  } catch (error) {
    res.writeHead(404, { "Cache-Control": "no-store" });
    res.end("Fixture missing: " + String(error.message));
  }
});
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const addr = server.address();
assert(addr && typeof addr === "object");
const origin = "http://127.0.0.1:" + addr.port;
const rootUrl = origin + BASE;
let browser, context, page;
const issues = [];

async function readyAndControlled() {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, { timeout: TIMEOUT });
}
async function assertCoreVersion(expected, absent = null) {
  const names = await page.evaluate(() => caches.keys());
  assert(names.includes(expected), "Missing installed core cache " + expected + "; got " + JSON.stringify(names));
  if (absent) assert(!names.includes(absent), "Obsolete static core cache survived: " + absent);
  assert.equal(names.filter(name => name.startsWith("pastafari-static-") && name.endsWith("-core")).length, 1,
    "Expected exactly one static core cache: " + JSON.stringify(names));
}
async function nav(url, label) {
  const response = await page.goto(url, { waitUntil: "load", timeout: TIMEOUT });
  assert(response && response.ok(), label + " navigation failed: " + response?.status());
  return response;
}
async function assertCalendar(lang) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: TIMEOUT });
  assert.equal(await page.locator("html").getAttribute("lang"), lang);
  assert.equal(await page.locator("#error-panel").isHidden(), true);
}
async function assertPersianAbout() {
  await page.locator('#article-content[lang="fa"] #canonical-names summary').first()
    .waitFor({ state: "visible", timeout: TIMEOUT });
  assert.equal(await page.locator('#article-content[lang="fa"] #canonical-names summary').count(), 64);
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator('#article-content #canonical-names summary').filter({ hasText: "ماسه" }).count(), 1);
}
async function assertPersianMonster() {
  assert.equal(await page.locator("html").getAttribute("lang"), "fa");
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator("details.penguin-note").count(), 21);
}

try {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({ serviceWorkers: "allow", locale: "en-US" });
  page = await context.newPage();
  page.on("pageerror", error => issues.push(error.message));
  
  // Install the real predecessor, including its exact Service Worker, shell,
  // registry, versioned imports and French articles from the immutable commit.
  await nav(rootUrl + "?lang=fr", "predecessor calendar");
  await assertCalendar("fr");
  await readyAndControlled();
  await assertCoreVersion(PREDECESSOR_CACHE);
  await nav(rootUrl + "about/?lang=fr#canonical-names", "predecessor French About");
  await page.locator('#article-content[lang="fr"] #canonical-names summary').first()
    .waitFor({ state: "visible", timeout: TIMEOUT });
  assert.equal(await page.locator('#article-content[lang="fr"] #canonical-names summary').count(), 64);
  await nav(rootUrl + "about/monster/fr.html", "predecessor French Monster");
  assert.equal(await page.locator("details.penguin-note").count(), 21);
  console.log("[PASS] real predecessor installed, controlled, and French articles visited: " + PREDECESSOR);

  // Deploy the candidate on the SAME origin, without deleting cookies,
  // storage, old caches, or the registration; then ask the browser to upgrade.
  mode = "candidate";
  const update = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return Boolean(registration.active);
  });
  assert(update, "No active Service Worker after predecessor update");
  await page.waitForFunction(async ({ newer, older }) => {
    const names = await caches.keys();
    return names.includes(newer) && !names.includes(older);
  }, { newer: CANDIDATE_CACHE, older: PREDECESSOR_CACHE }, { timeout: TIMEOUT });
  await assertCoreVersion(CANDIDATE_CACHE, PREDECESSOR_CACHE);
  console.log("[PASS] predecessor cache replaced by the candidate without resetting browser storage");

  // A fresh navigation must actually use the candidate's new language graph,
  // then cache the two Persian documents and locale during first online use.
  await nav(rootUrl + "?lang=fa", "upgraded Persian calendar");
  await assertCalendar("fa");
  await nav(rootUrl + "about/?lang=fa#canonical-names", "upgraded Persian About");
  await assertPersianAbout();
  await nav(rootUrl + "about/monster/fa.html", "upgraded Persian Monster");
  await assertPersianMonster();
  const persisted = await page.evaluate(async () => {
    const names = await caches.keys();
    const runtime = await caches.open("pastafari-runtime-assets");
    const paths = (await runtime.keys()).map(request => new URL(request.url).pathname + new URL(request.url).search);
    return { names, paths };
  });
  for (const required of ["/about/content/fa.html?v=20261114-fa18", "/about/monster/fa.html", "/i18n/locales/fa.js?v=21-about-fa-20261114"]) {
    assert(persisted.paths.some(p => p.endsWith(required)), "First online use did not cache: " + required);
  }
  console.log("[PASS] upgraded Persian About/Monster and locale cached in the original browser profile");

  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.clearBrowserCache");
  await context.setOffline(true);
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  const countBeforeOffline = requests;
  const offlineRoot = await nav(rootUrl + "?lang=fa&offline-upgrade=1", "offline upgraded calendar");
  assert.equal(offlineRoot.fromServiceWorker(), true);
  await assertCalendar("fa");
  await nav(rootUrl + "about/?lang=fa#canonical-names", "offline upgraded Persian About");
  await assertPersianAbout();
  const offlineMonster = await nav(rootUrl + "about/monster/fa.html", "offline upgraded Persian Monster");
  assert.equal(offlineMonster.fromServiceWorker(), true);
  await assertPersianMonster();
  assert.equal(requests, countBeforeOffline, "Offline browser unexpectedly reached the stopped server");
  await assertCoreVersion(CANDIDATE_CACHE, PREDECESSOR_CACHE);
  assert.deepEqual(issues, [], "Unexpected browser JS errors during real-version upgrade");
  console.log("[PASS] actual old-version upgrade: calendar, 64 names, 21 notes, RTL, and offline on clean HTTP cache");
} finally {
  if (context) await context.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  if (server.listening) await new Promise(resolve => server.close(resolve));
}
