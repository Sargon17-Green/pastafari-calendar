import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

import {
  GregorianDate,
  PastafariCalendar,
  gregorianToJdn,
} from "../docs/engine/pastafari-calendar-fast.js";
import { jdnToGregorian } from "../docs/calendar-converters.js";
import { CUTLETS, MONTHS } from "../docs/i18n/calendar-identifiers.js";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(SCRIPT_DIR, "..", "docs");
const TIMEOUT = 180_000;
const calendar = new PastafariCalendar();
const BASE = gregorianToJdn(new GregorianDate(2026n, 8, 6));

function uiDate(targetJdn, calculationJdn) {
  const raw = calendar.convertJdn(targetJdn, { calculationJdn }).toJSON();
  const cutlet = CUTLETS.find(({ internalName }) => internalName === raw.cutletName);
  const month = MONTHS.find(({ internalName }) => internalName === raw.monthName);
  assert(cutlet && month, "fixture names must map to stable UI identifiers");
  return {
    year: raw.year,
    cutletId: cutlet.id,
    dayInCutlet: String(raw.dayInCutlet),
    monthId: month.id,
    dayInMonth: String(raw.dayInMonth),
  };
}

function mime(filePath) {
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml; charset=utf-8",
    ".png": "image/png",
  })[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

async function startServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(url.pathname);
      if (pathname === "/") pathname = "/index.html";
      const resolved = path.resolve(DOCS_ROOT, pathname.replace(/^\/+/, ""));
      const relative = path.relative(DOCS_ROOT, resolved);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        response.writeHead(403).end();
        return;
      }
      const info = await stat(resolved).catch(() => null);
      if (!info?.isFile()) {
        response.writeHead(404).end();
        return;
      }
      const body = await readFile(resolved);
      response.writeHead(200, { "Content-Type": mime(resolved), "Cache-Control": "no-store" });
      response.end(body);
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
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function fillPastafari(scope, value) {
  await scope.locator('input[name="year"]').fill(value.year);
  await scope.locator('select[name="cutletId"]').selectOption(value.cutletId);
  await scope.locator('input[name="dayInCutlet"]').fill(value.dayInCutlet);
  await scope.locator('select[name="monthId"]').selectOption(value.monthId);
  await scope.locator('input[name="dayInMonth"]').fill(value.dayInMonth);
}

async function fillAbsolute(scope, jdn) {
  const date = jdnToGregorian(jdn);
  await scope.locator('select[id$="-calendar"]').selectOption("gregorian");
  await scope.locator('[name="year"]').fill(date.year.toString());
  const month = scope.locator('[name="month"]');
  if (await month.evaluate((element) => element.tagName === "SELECT")) await month.selectOption(String(date.month));
  else await month.fill(String(date.month));
  await scope.locator('[name="day"]').fill(String(date.day));
}

async function waitForSolution(page, expectedJdn) {
  await page.waitForFunction((wanted) => {
    const cards = [...document.querySelectorAll("#reverse-solutions .reverse-solution-card")];
    return cards.some((card) => card.textContent.includes(`JDN ${wanted}`));
  }, expectedJdn.toString(), { timeout: TIMEOUT });
}

const server = await startServer();
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(`${server.origin}/?t=${BASE}&c=${BASE}&lang=en`, { waitUntil: "load", timeout: TIMEOUT });
  await page.waitForSelector("#reverse-basic-solve", { timeout: TIMEOUT });

  const target = BASE + 3n;
  await fillPastafari(page.locator('[data-reverse-editor="basic-pastafari"]'), uiDate(target, BASE));
  await page.locator("#reverse-basic-calculation-mode").selectOption("active");
  await page.locator("#reverse-basic-solve").click();
  await waitForSolution(page, target);
  assert.match(await page.locator("#reverse-status").textContent(), /Search complete/i);
  await page.locator('#reverse-solutions [data-solution-index="0"] button').click();
  await page.waitForFunction(({ t, c }) => {
    const params = new URL(location.href).searchParams;
    return params.get("t") === t && params.get("c") === c;
  }, { t: target.toString(), c: BASE.toString() }, { timeout: TIMEOUT });
  console.log("[PASS] basic reverse UI resolves and opens the target");

  await fillPastafari(page.locator('[data-reverse-editor="basic-pastafari"]'), uiDate(BASE, BASE));
  await page.locator("#reverse-basic-calculation-mode").selectOption("same");
  const rangeParts = page.locator("#reverse-app .reverse-mode-panel:not([hidden]) .reverse-range-part");
  await fillAbsolute(rangeParts.nth(0), BASE);
  await fillAbsolute(rangeParts.nth(1), BASE);
  await page.locator("#reverse-basic-solve").click();
  await waitForSolution(page, BASE);
  console.log("[PASS] bounded c=t reverse UI resolves on the diagonal");

  const A = BASE + 7n;
  const B = BASE + 19n;
  await page.locator("#reverse-advanced-tab").click();
  for (const [id, jdn] of [["D1", A], ["D2", B]]) {
    const variable = page.locator(`[data-variable-id="${id}"]`);
    await variable.locator('select[data-reverse-role="domain"]').selectOption("range");
    const parts = variable.locator(".reverse-range-part");
    await fillAbsolute(parts.nth(0), jdn);
    await fillAbsolute(parts.nth(1), jdn);
  }

  const c1 = page.locator('[data-constraint-id="C1"]');
  await c1.locator('select[data-reverse-role="pastafari-target"]').selectOption("D1");
  await c1.locator('select[data-reverse-role="calculation-mode"]').selectOption("variable");
  await c1.locator('select[data-reverse-role="calculation-variable"]').selectOption("D2");
  await fillPastafari(c1.locator(".reverse-pastafari-fields"), uiDate(A, B));

  await page.locator("#reverse-add-constraint").click();
  const c2 = page.locator('[data-constraint-id="C2"]');
  await c2.locator('select[data-reverse-role="pastafari-target"]').selectOption("D2");
  await c2.locator('select[data-reverse-role="calculation-mode"]').selectOption("variable");
  await c2.locator('select[data-reverse-role="calculation-variable"]').selectOption("D1");
  await fillPastafari(c2.locator(".reverse-pastafari-fields"), uiDate(B, A));
  await page.locator("#reverse-advanced-solve").click();
  await waitForSolution(page, A);
  await waitForSolution(page, B);
  assert.match(await page.locator("#reverse-status").textContent(), /Search complete/i);
  console.log("[PASS] advanced UI solves a bounded two-variable Pastafari cycle");

  assert.deepEqual(pageErrors, [], `page errors: ${JSON.stringify(pageErrors)}`);
  console.log("[PASS] reverse UI smoke completed without page errors");
} finally {
  await browser?.close().catch(() => {});
  await server.close().catch(() => {});
}
