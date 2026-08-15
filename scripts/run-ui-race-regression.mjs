#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { calendarDateToJdn } from "../docs/calendar-converters.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const ARTIFACTS = path.join(ROOT, "artifacts", "ui-race-regression");
const TIMEOUT = 120_000;
const FIXTURE = Object.freeze({ year: 2026, month: 8, day: 13 });

function mimeType(filename) {
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
  })[path.extname(filename).toLowerCase()] || "application/octet-stream";
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
      const data = await readFile(filename);
      response.writeHead(200, {
        "content-type": mimeType(filename),
        "cache-control": "no-store, max-age=0",
      });
      response.end(data);
    } catch (error) {
      response.writeHead(error?.code === "ENOENT" ? 404 : 500);
      response.end(error?.message || String(error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}/`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

function fixtureJdn() {
  return calendarDateToJdn("gregorian", {
    year: String(FIXTURE.year),
    month: String(FIXTURE.month),
    day: String(FIXTURE.day),
  });
}

async function installWorkerDelayHook(page) {
  await page.addInitScript(() => {
    const NativeWorker = globalThis.Worker;
    const delaysById = new Map();
    const nextDelayByOperation = new Map();

    globalThis.__pastafariRaceTest = Object.freeze({
      delayNext(operation, milliseconds) {
        nextDelayByOperation.set(String(operation), Number(milliseconds));
      },
    });

    globalThis.Worker = class DelayedWorker extends NativeWorker {
      postMessage(message, ...rest) {
        const operation = message?.operation;
        const delay = nextDelayByOperation.get(operation) || 0;
        if (delay > 0 && Number.isSafeInteger(message?.id)) {
          delaysById.set(message.id, delay);
          nextDelayByOperation.delete(operation);
        }
        return super.postMessage(message, ...rest);
      }

      addEventListener(type, listener, options) {
        if (type !== "message" || typeof listener !== "function") {
          return super.addEventListener(type, listener, options);
        }
        const wrapped = (event) => {
          const id = event?.data?.id;
          const delay = delaysById.get(id) || 0;
          if (delay <= 0) {
            listener.call(this, event);
            return;
          }
          delaysById.delete(id);
          setTimeout(() => listener.call(this, event), delay);
        };
        return super.addEventListener(type, wrapped, options);
      }
    };
  });
}

async function waitForWorkspace(page) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: TIMEOUT });
  await page.waitForFunction(
    () => document.querySelectorAll("#calendar-grid .day-card").length > 0,
    null,
    { timeout: TIMEOUT },
  );
  assert.equal(await page.locator("#error-panel").isHidden(), true);
}

async function openCalculationSettings(page) {
  const details = page.locator("#calculation-settings");
  if ((await details.getAttribute("open")) === null) {
    await details.locator(":scope > summary").click();
  }
}

async function fillTarget(page) {
  await page.locator("#target-calendar").selectOption("gregorian");
  await page.locator("#target-year").fill(String(FIXTURE.year));
  await page.locator("#target-month").fill(String(FIXTURE.month));
  await page.locator("#target-day").fill(String(FIXTURE.day));
}

async function runRaceRegression(page, baseURL) {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);

  const target = fixtureJdn().toString();
  const oldGridTarget = await page.locator('#calendar-grid .day-card[data-target="true"]').getAttribute("data-jdn");
  assert.notEqual(oldGridTarget, null, "Initial grid must contain one target day");

  await page.evaluate(() => globalThis.__pastafariRaceTest.delayNext("getCutletView", 1200));
  await fillTarget(page);
  await page.locator('#target-search-form button[type="submit"]').click();

  // This is the exact interleaving that used to invalidate the primary cutlet load.
  await page.waitForTimeout(25);
  await openCalculationSettings(page);
  await page.locator("#comparison-toggle").check({ force: true });

  await page.waitForFunction(
    (jdn) => document.querySelector(`#calendar-grid .day-card[data-jdn="${jdn}"][data-target="true"]`),
    target,
    { timeout: TIMEOUT },
  );
  await page.waitForFunction(
    () => !document.querySelector("#previous-cutlet")?.disabled
      && !document.querySelector("#next-cutlet")?.disabled,
    null,
    { timeout: TIMEOUT },
  );
  await page.waitForFunction(
    (jdn) => {
      const params = new URL(location.href).searchParams;
      return params.get("t") === jdn && params.get("compare") === "1";
    },
    target,
    { timeout: TIMEOUT },
  );

  const params = new URL(page.url()).searchParams;
  assert.equal(params.get("t"), target, "URL target must match the newly rendered target");
  assert.equal(params.get("compare"), "1", "Comparison must remain enabled");
  assert.equal(
    await page.locator(`#calendar-grid .day-card[data-jdn="${target}"][data-target="true"]`).count(),
    1,
    "The grid must render the requested target after the delayed response arrives",
  );
  assert.equal(await page.locator("#previous-cutlet").isDisabled(), false, "Previous cutlet must be re-enabled");
  assert.equal(await page.locator("#next-cutlet").isDisabled(), false, "Next cutlet must be re-enabled");
  assert.equal(await page.locator("#error-panel").isHidden(), true, "No global error should be shown");

  return { target, oldGridTarget };
}

await mkdir(ARTIFACTS, { recursive: true });
const server = await startServer();
let browser;
let context;
let page;
try {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "en-US",
    timezoneId: "Asia/Jerusalem",
    serviceWorkers: "block",
  });
  page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);
  page.setDefaultNavigationTimeout(TIMEOUT);
  await installWorkerDelayHook(page);

  const result = await runRaceRegression(page, server.url);
  console.log(`PASS ui-race-regression target=${result.target} previous=${result.oldGridTarget}`);
} catch (error) {
  if (page) {
    const screenshot = path.join(ARTIFACTS, "failure.png");
    await page.screenshot({ path: screenshot, fullPage: true }).catch(() => {});
    console.error(`Failure screenshot: ${screenshot}`);
  }
  console.error(error?.stack || error);
  process.exitCode = 1;
} finally {
  await context?.close().catch(() => {});
  await browser?.close().catch(() => {});
  await server.close();
}
