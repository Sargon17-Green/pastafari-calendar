"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { KISURRA_OBSERVER } from "../docs/observer-location.js";
import { boundaryForDayJdn } from "../docs/venus-day-boundary.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const DAY = 2_461_268n;
const TIMEOUT = 120_000;

function mimeType(filename) {
  const extension = path.extname(filename).toLowerCase();
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
  })[extension] || "application/octet-stream";
}

async function startServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const relative = decodeURIComponent(url.pathname) === "/"
        ? "index.html"
        : decodeURIComponent(url.pathname).replace(/^\/+/, "");
      const filename = path.resolve(DOCS, relative);
      if (filename !== DOCS && !filename.startsWith(`${DOCS}${path.sep}`)) {
        response.writeHead(403); response.end("Forbidden"); return;
      }
      const bytes = await readFile(filename);
      response.writeHead(200, {
        "content-type": mimeType(filename),
        "cache-control": "no-store, max-age=0",
      });
      response.end(bytes);
    } catch (error) {
      response.writeHead(error?.code === "ENOENT" ? 404 : 500);
      response.end(error?.message || String(error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  return {
    url: `http://127.0.0.1:${address.port}/`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

async function waitForWorkspace(page) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: TIMEOUT });
  await page.waitForFunction(() => document.querySelectorAll("#calendar-grid .day-card").length > 0, null, { timeout: TIMEOUT });
}

function params(page) {
  const search = new URL(page.url()).searchParams;
  return Object.fromEntries(["t", "c", "today", "ctoday"].map((key) => [key, search.get(key)]));
}

async function automaticKisurraScenario(browser, baseURL) {
  const boundary = boundaryForDayJdn(DAY, KISURRA_OBSERVER).instant;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.install({ time: new Date(boundary.getTime() - 5_000) });

  let dialogCount = 0;
  let dialogText = "";
  page.on("dialog", async (dialog) => {
    dialogCount += 1;
    dialogText = dialog.message();
    await dialog.accept();
  });

  await page.goto(`${baseURL}?lang=he`, { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);
  const before = params(page);
  assert.equal(before.t, String(DAY - 1n));
  assert.equal(before.c, String(DAY - 1n));
  assert.equal(before.today, "1");
  assert.equal(before.ctoday, "1");
  const fallbackContext = page.locator("#target-context");
  assert.match(await fallbackContext.innerText(), /קיסורה/);
  assert.equal(await fallbackContext.locator("button").count(), 1, "Kisurra fallback should offer an explicit device-location action");
  assert.match(await fallbackContext.locator("button").innerText(), /מיקום/);

  // The day change itself must not need the network.
  await context.setOffline(true);
  await page.clock.fastForward(10_000);
  await page.waitForFunction((expected) => new URL(location.href).searchParams.get("c") === expected, String(DAY), { timeout: TIMEOUT });
  await waitForWorkspace(page);
  const after = params(page);
  assert.equal(after.t, String(DAY));
  assert.equal(after.c, String(DAY));
  assert.equal(dialogCount, 1);
  assert.match(dialogText, /אינם מעודכנים/);
  await context.close();
}

async function manualCalculationScenario(browser, baseURL) {
  const boundary = boundaryForDayJdn(DAY, KISURRA_OBSERVER).instant;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.clock.install({ time: new Date(boundary.getTime() - 5_000) });

  let dialogCount = 0;
  page.on("dialog", async (dialog) => {
    dialogCount += 1;
    await dialog.accept();
  });

  const currentBefore = DAY - 1n;
  const fixedCalculation = currentBefore - 10n;
  const url = new URL(baseURL);
  url.searchParams.set("lang", "he");
  url.searchParams.set("t", String(currentBefore));
  url.searchParams.set("v", String(currentBefore));
  url.searchParams.set("c", String(fixedCalculation));
  url.searchParams.set("today", "1");
  await page.goto(url.href, { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);

  await page.clock.fastForward(10_000);
  await page.waitForFunction((expected) => new URL(location.href).searchParams.get("t") === expected, String(DAY), { timeout: TIMEOUT });
  const after = params(page);
  assert.equal(after.t, String(DAY), "target that follows today must advance");
  assert.equal(after.c, String(fixedCalculation), "manual day of working must remain fixed");
  assert.equal(after.ctoday, null);
  assert.equal(dialogCount, 0, "manual day of working must not trigger the stale-date alert");
  await context.close();
}

async function grantedLocationScenario(browser, baseURL) {
  const deviceObserver = { latitude: 31.778, longitude: 35.235, elevationM: 0 };
  const boundary = boundaryForDayJdn(DAY, deviceObserver).instant;
  const origin = new URL(baseURL).origin;
  const context = await browser.newContext({
    geolocation: { latitude: deviceObserver.latitude, longitude: deviceObserver.longitude, accuracy: 25 },
    permissions: ["geolocation"],
  });
  await context.grantPermissions(["geolocation"], { origin });
  const page = await context.newPage();
  await page.clock.install({ time: new Date(boundary.getTime() - 5_000) });

  let dialogCount = 0;
  page.on("dialog", async (dialog) => {
    dialogCount += 1;
    await dialog.accept();
  });

  await page.goto(`${baseURL}?lang=he`, { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);
  assert.doesNotMatch(await page.locator("#target-context").innerText(), /קיסורה/);
  assert.equal(params(page).c, String(DAY - 1n));

  await page.clock.fastForward(10_000);
  await page.waitForFunction((expected) => new URL(location.href).searchParams.get("c") === expected, String(DAY), { timeout: TIMEOUT });
  assert.equal(dialogCount, 1, "granted device location should drive its own boundary");
  await context.close();
}

const server = await startServer();
const browser = await chromium.launch({ headless: true });
try {
  await automaticKisurraScenario(browser, server.url);
  console.log("PASS: Kisurra fallback + offline astronomical day transition");
  await manualCalculationScenario(browser, server.url);
  console.log("PASS: manual day of working stays fixed without alert");
  await grantedLocationScenario(browser, server.url);
  console.log("PASS: granted device location replaces Kisurra boundary");
  console.log("Day-boundary smoke: PASS");
} finally {
  await browser.close();
  await server.close();
}
