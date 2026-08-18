"use strict";

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import { chromium } from "playwright";
import { calendarDateToJdn } from "../docs/calendar-converters.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const ARTIFACTS = path.join(ROOT, "artifacts", "user-e2e");
const SCREENSHOTS = path.join(ARTIFACTS, "screenshots");
const TRACES = path.join(ARTIFACTS, "traces");
const VIDEOS = path.join(ARTIFACTS, "videos");
const DEFAULT_TIMEOUT = 120_000;
const DESKTOP = Object.freeze({ width: 1440, height: 1000 });
const MOBILE = Object.freeze({ width: 390, height: 844 });
const FIXTURE = Object.freeze({
  target: Object.freeze({ year: 2026, month: 4, day: 15 }),
  targetB: Object.freeze({ year: 2026, month: 4, day: 18 }),
  action: Object.freeze({ year: 2026, month: 4, day: 10 }),
  actionB: Object.freeze({ year: 2026, month: 4, day: 11 }),
  comparison: Object.freeze({ year: 2026, month: 4, day: 12 }),
});

function parseArgs(argv) {
  const options = {
    headed: false,
    slowMo: 0,
    scenario: null,
    mobileOnly: false,
    video: false,
    chromiumExecutable: process.env.PASTAFARI_CHROMIUM_EXECUTABLE || null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--headed") options.headed = true;
    else if (arg === "--mobile") options.mobileOnly = true;
    else if (arg === "--video") options.video = true;
    else if (arg === "--scenario") options.scenario = argv[++index] || null;
    else if (arg.startsWith("--scenario=")) options.scenario = arg.slice("--scenario=".length);
    else if (arg === "--slow-mo") options.slowMo = Number(argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[++index] : 250);
    else if (arg.startsWith("--slow-mo=")) options.slowMo = Number(arg.slice("--slow-mo=".length));
    else if (arg === "--chromium-executable") options.chromiumExecutable = argv[++index] || null;
    else if (arg.startsWith("--chromium-executable=")) options.chromiumExecutable = arg.slice("--chromium-executable=".length);
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isFinite(options.slowMo) || options.slowMo < 0) throw new Error("--slow-mo must be a non-negative number.");
  return options;
}

function usage() {
  return [
    "Pastafari user E2E",
    "",
    "Usage:",
    "  node scripts/run-user-e2e.mjs",
    "  node scripts/run-user-e2e.mjs --headed",
    "  node scripts/run-user-e2e.mjs --slow-mo 250",
    "  node scripts/run-user-e2e.mjs --scenario search",
    "  node scripts/run-user-e2e.mjs --scenario comparison",
    "  node scripts/run-user-e2e.mjs --mobile",
    "  node scripts/run-user-e2e.mjs --video",
  ].join("\n");
}

function isoNow() { return new Date().toISOString(); }
function elapsedMs(start) { return Math.round(performance.now() - start); }
function slug(value) { return value.replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, ""); }
function toJdn(date) {
  return calendarDateToJdn("gregorian", {
    year: String(date.year), month: String(date.month), day: String(date.day),
  });
}
function fixtureJdn(name) { return toJdn(FIXTURE[name]); }
function urlState(page) {
  const params = new URL(page.url()).searchParams;
  return Object.fromEntries(["t", "v", "c", "c2", "compare", "today", "ctoday", "lang"].map((key) => [key, params.get(key)]));
}
function trimError(error) {
  const message = error?.stack || error?.message || String(error);
  return message.length > 6000 ? `${message.slice(0, 6000)}\n…` : message;
}

function getCommitSha() {
  if (process.env.PASTAFARI_TEST_COMMIT) return process.env.PASTAFARI_TEST_COMMIT;
  try { return execFileSync("git", ["rev-parse", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim(); }
  catch { return "unknown"; }
}

function mimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ({
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8", ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
  })[ext] || "application/octet-stream";
}

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const decoded = decodeURIComponent(url.pathname);
      const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
      const filename = path.resolve(DOCS, relative);
      if (filename !== DOCS && !filename.startsWith(`${DOCS}${path.sep}`)) {
        response.writeHead(403); response.end("Forbidden"); return;
      }
      const data = await readFile(filename);
      response.writeHead(200, {
        "content-type": mimeType(filename),
        "cache-control": "no-store, max-age=0",
        "pragma": "no-cache",
        "expires": "0",
      });
      response.end(data);
    } catch (error) {
      response.writeHead(error?.code === "ENOENT" ? 404 : 500, { "content-type": "text/plain; charset=utf-8" });
      response.end(error?.code === "ENOENT" ? "Not found" : trimError(error));
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  return {
    baseURL: `http://127.0.0.1:${address.port}/`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

function attachMonitoring(page, phaseRef) {
  const events = [];
  const push = (type, detail) => events.push({ time: isoNow(), phase: phaseRef.value, type, detail });
  page.on("pageerror", (error) => push("pageerror", error.stack || error.message));
  page.on("console", (message) => {
    if (message.type() === "error") push("console.error", message.text());
  });
  page.on("requestfailed", (request) => push("requestfailed", `${request.method()} ${request.url()} — ${request.failure()?.errorText || "unknown"}`));
  page.on("response", (response) => {
    if (response.status() >= 400) push("bad-response", `${response.status()} ${response.url()}`);
  });
  return events;
}

async function screenshot(page, filename) {
  const target = path.join(SCREENSHOTS, filename);
  await page.screenshot({ path: target, fullPage: true });
  return path.relative(ROOT, target).replaceAll(path.sep, "/");
}

async function waitForWorkspace(page) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  await page.locator("#loading-panel").waitFor({ state: "hidden", timeout: DEFAULT_TIMEOUT }).catch(() => {});
  assert.equal(await page.locator("#error-panel").isHidden(), true, "#error-panel must stay hidden");
  await page.waitForFunction(() => document.querySelectorAll("#calendar-grid .day-card").length > 0, null, { timeout: DEFAULT_TIMEOUT });
}

async function waitForParam(page, key, expected) {
  await page.waitForFunction(([name, value]) => new URL(location.href).searchParams.get(name) === value, [key, String(expected)], { timeout: DEFAULT_TIMEOUT });
  await waitForWorkspace(page);
}

async function chooseCalendar(page, kind, calendarId) {
  await page.locator(`#${kind}-calendar`).selectOption(calendarId);
}

async function setField(page, kind, name, value) {
  const field = page.locator(`#${kind}-${name}`);
  await field.waitFor({ state: "attached", timeout: 10_000 });
  const tag = await field.evaluate((element) => element.tagName);
  const type = await field.getAttribute("type");
  if (type === "checkbox") {
    if (value) await field.check(); else await field.uncheck();
  } else if (tag === "SELECT") {
    await field.selectOption(String(value));
  } else {
    await field.fill(String(value));
  }
}

async function fillGregorian(page, kind, date) {
  await chooseCalendar(page, kind, "gregorian");
  await setField(page, kind, "year", date.year);
  await setField(page, kind, "month", date.month);
  await setField(page, kind, "day", date.day);
}

async function submitForm(page, kind) {
  const id = kind === "target" ? "target-search-form" : kind === "action" ? "action-date-form" : "comparison-date-form";
  await page.locator(`#${id} button[type="submit"]`).click();
}

async function searchGregorian(page, date) {
  await fillGregorian(page, "target", date);
  await submitForm(page, "target");
  await waitForParam(page, "t", toJdn(date));
}

async function openCalculationSettings(page) {
  const details = page.locator("#calculation-settings");
  if ((await details.getAttribute("open")) === null) await details.locator(":scope > summary").click();
}

async function setActionGregorian(page, date) {
  await openCalculationSettings(page);
  await fillGregorian(page, "action", date);
  await submitForm(page, "action");
  await waitForParam(page, "c", toJdn(date));
}

async function enableComparison(page, date = null) {
  await openCalculationSettings(page);
  const toggle = page.locator("#comparison-toggle");
  if (!await toggle.isChecked()) await toggle.check();
  await page.locator("#comparison-workspace").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  if (date) {
    await fillGregorian(page, "comparison", date);
    await submitForm(page, "comparison");
    await waitForParam(page, "c2", toJdn(date));
  }
  await page.waitForFunction(() => {
    if (!matchMedia("(min-width: 1000px)").matches) return true;
    return document.querySelectorAll("#comparison-body tr").length > 0;
  }, null, { timeout: DEFAULT_TIMEOUT });
}

async function renderedIdentity(page) {
  return page.locator("#target-date-lines").innerText();
}

async function newPage(browser, config, profile, phaseRef) {
  const contextOptions = {
    viewport: profile === "mobile" ? MOBILE : DESKTOP,
    serviceWorkers: "allow",
    locale: "en-US",
    timezoneId: "Asia/Jerusalem",
  };
  if (config.video) contextOptions.recordVideo = { dir: VIDEOS, size: profile === "mobile" ? MOBILE : { width: 1280, height: 889 } };
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  page.setDefaultTimeout(DEFAULT_TIMEOUT);
  page.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
  const monitor = attachMonitoring(page, phaseRef);
  return { context, page, monitor };
}

async function openClean(page, baseURL) {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);
}

function assertNoUnexpectedRuntimeErrors(events, { allowConsole = [] } = {}) {
  const unexpected = events.filter((event) => {
    if (event.type === "console.error" && allowConsole.some((pattern) => pattern.test(event.detail))) return false;
    return ["pageerror", "console.error", "requestfailed", "bad-response"].includes(event.type);
  });
  assert.deepEqual(unexpected, [], `Unexpected browser errors:\n${unexpected.map((event) => `${event.type}: ${event.detail}`).join("\n")}`);
}

const desktopScenarios = [
  {
    id: "initial", name: "Initial load", screenshot: "01-initial-load.png",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      assertions.push("calendar workspace visible", "calendar grid populated", "error panel hidden");
      assert.ok((await page.locator("#target-date-lines").innerText()).trim(), "Pastafari date must be visible");
      assert.ok((await page.locator("#cutlet-heading").innerText()).trim(), "Cutlet heading must be visible");
      const selected = page.locator('#calendar-grid .day-card[data-target="true"]');
      assert.equal(await selected.count(), 1, "Exactly one target day should be marked in the visible cutlet");
      assertions.push("current Pastafari date rendered", "cutlet rendered", "one target day marked");
    },
  },
  {
    id: "search", name: "Search a fixed Gregorian date", screenshot: "02-search-date.png",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      const before = urlState(page).t;
      const beforeText = await renderedIdentity(page);
      await searchGregorian(page, FIXTURE.target);
      const after = urlState(page);
      assert.equal(after.t, fixtureJdn("target").toString());
      assert.notEqual(after.t, before, "Fixture target should differ from initial current Pastafari day");
      assert.notEqual(await renderedIdentity(page), beforeText, "Rendered target should update");
      assert.equal(await page.locator(`#calendar-grid .day-card[data-jdn="${after.t}"][data-target="true"]`).count(), 1);
      assertions.push("target URL state changed to fixture JDN", "rendered Pastafari date changed", "target marker moved to requested JDN");
    },
  },
  {
    id: "calculation", name: "Change day of working without changing target", screenshot: "03-change-calculation-day.png",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      const before = urlState(page);
      const beforeText = await renderedIdentity(page);
      await setActionGregorian(page, FIXTURE.action);
      const after = urlState(page);
      assert.equal(after.t, before.t, "Changing calculation day must not change target JDN");
      assert.equal(after.c, fixtureJdn("action").toString());
      assert.notEqual(await renderedIdentity(page), beforeText, "Selected fixture should demonstrate calculation-day dependence");
      assertions.push("target JDN preserved", "calculation JDN updated", "Pastafari rendering changed for fixture");
    },
  },
  {
    id: "reset", name: "Reset calculation day to current Pastafari day",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      const initial = urlState(page);
      await searchGregorian(page, FIXTURE.target);
      const target = urlState(page).t;
      await setActionGregorian(page, FIXTURE.action);
      await page.locator("#reset-action-day").click();
      await waitForParam(page, "c", initial.c);
      assert.equal(urlState(page).t, target);
      assertions.push("calculation JDN returned to session current-day baseline", "target JDN preserved");
    },
  },
  {
    id: "comparison", name: "Compare the same target days under two calculation days", screenshot: "04-comparison.png",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      await setActionGregorian(page, FIXTURE.action);
      await enableComparison(page, FIXTURE.comparison);
      const rows = page.locator("#comparison-body tr");
      const count = await rows.count();
      assert.ok(count > 2, "Comparison must render multiple rows on desktop");
      for (const index of [...new Set([0, Math.floor(count / 2), count - 1])]) {
        const row = rows.nth(index);
        const jdn = await row.getAttribute("data-jdn");
        const shared = await row.locator("th small").innerText();
        assert.equal(shared, `JDN ${jdn}`);
        assert.ok((await row.locator("td").nth(0).getAttribute("aria-label"))?.length > 0);
        assert.ok((await row.locator("td").nth(1).getAttribute("aria-label"))?.length > 0);
      }
      assert.equal(urlState(page).c, fixtureJdn("action").toString());
      assert.equal(urlState(page).c2, fixtureJdn("comparison").toString());
      assertions.push(`${count} comparison rows rendered`, "sample rows expose one shared JDN for both calculation columns", "each side uses its requested calculation JDN");
    },
  },
  {
    id: "comparison-update", name: "Primary calculation changes while manual comparison day stays fixed",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      await setActionGregorian(page, FIXTURE.action);
      await enableComparison(page, FIXTURE.comparison);
      const second = urlState(page).c2;
      await setActionGregorian(page, FIXTURE.actionB);
      const after = urlState(page);
      assert.equal(after.t, fixtureJdn("target").toString());
      assert.equal(after.c, fixtureJdn("actionB").toString());
      assert.equal(after.c2, second, "Manually chosen second calculation day must remain fixed");
      assertions.push("target preserved", "primary calculation updated", "manual secondary calculation preserved");
    },
  },
  {
    id: "cutlets", name: "Browse next/previous cutlets without changing target", screenshot: "05-next-cutlet.png",
    async run({ page, baseURL, assertions, capture }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      const target = urlState(page).t;
      const firstHeading = await page.locator("#cutlet-heading").innerText();
      const firstGrid = await page.locator("#calendar-grid").innerText();
      await page.locator("#next-cutlet").click();
      await page.waitForFunction((heading) => document.querySelector("#cutlet-heading")?.textContent !== heading, firstHeading, { timeout: DEFAULT_TIMEOUT });
      assert.equal(urlState(page).t, target);
      assert.notEqual(await page.locator("#calendar-grid").innerText(), firstGrid);
      assert.equal(await page.locator("#browse-note").isVisible(), true);
      await capture("05-next-cutlet.png");
      await page.locator("#previous-cutlet").click();
      await page.waitForFunction((heading) => document.querySelector("#cutlet-heading")?.textContent === heading, firstHeading, { timeout: DEFAULT_TIMEOUT });
      assert.equal(urlState(page).t, target);
      for (const button of ["#previous-cutlet", "#previous-cutlet", "#next-cutlet", "#next-cutlet"]) {
        const current = await page.locator("#cutlet-heading").innerText();
        await page.locator(button).click();
        await page.waitForFunction((heading) => document.querySelector("#cutlet-heading")?.textContent !== heading, current, { timeout: DEFAULT_TIMEOUT });
        assert.equal(urlState(page).t, target);
      }
      assert.equal(await page.locator("#cutlet-heading").innerText(), firstHeading, "previous previous next next should return to starting cutlet");
      assertions.push("next cutlet changes heading/grid", "target JDN never changed", "previous returns to original cutlet", "two-step round trip has no state drift");
    },
  },
  {
    id: "today", name: "Back to today",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      const initial = urlState(page);
      await setActionGregorian(page, FIXTURE.action);
      const action = urlState(page).c;
      await searchGregorian(page, FIXTURE.target);
      await page.locator("#today-button").click();
      await waitForParam(page, "t", initial.t);
      const after = urlState(page);
      assert.equal(after.t, initial.t);
      assert.equal(after.c, action, "Back to today should change the target, not silently replace an explicitly chosen calculation day");
      assertions.push("target returned to local today", "explicit calculation day remained unchanged");
    },
  },
  {
    id: "language", name: "Switch LTR/RTL language without changing calculation state", screenshot: "06-language-switch.png",
    async run({ page, baseURL, assertions, profile }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      await setActionGregorian(page, FIXTURE.action);
      if (profile === "desktop") await enableComparison(page, FIXTURE.comparison);
      await page.locator("#language-selector").selectOption("en");
      const logicalBefore = urlState(page);
      if (profile === "mobile") {
        assert.equal(logicalBefore.compare, null, "Mobile language scenario must not enable desktop-only comparison");
        assert.equal(logicalBefore.c2, null, "Mobile language scenario must not create a secondary calculation JDN");
      }
      const invariantKeys = profile === "desktop"
        ? ["t", "v", "c", "c2", "compare", "today", "ctoday"]
        : ["t", "v", "c", "today", "ctoday"];
      const beforeText = await renderedIdentity(page);
      await page.locator("#language-selector").selectOption("he");
      await page.waitForFunction(() => document.documentElement.lang === "he" && document.documentElement.dir === "rtl");
      const logicalHebrew = urlState(page);
      assert.equal(logicalHebrew.lang, "he", "Hebrew selection must set lang=he in URL state");
      for (const key of invariantKeys) assert.equal(logicalHebrew[key], logicalBefore[key], `locale must not change ${key}`);
      assert.notEqual(await renderedIdentity(page), beforeText, "Labels/rendering should switch language");
      await page.locator("#language-selector").selectOption("en");
      await page.waitForFunction(() => document.documentElement.lang === "en" && document.documentElement.dir === "ltr");
      const logicalEnglish = urlState(page);
      assert.equal(logicalEnglish.lang, "en", "English selection must set lang=en in URL state");
      for (const key of invariantKeys) assert.equal(logicalEnglish[key], logicalBefore[key], `locale round trip must not change ${key}`);
      if (profile === "mobile") {
        assert.equal(logicalEnglish.compare, null, "Mobile locale switch must leave comparison disabled");
        assert.equal(logicalEnglish.c2, null, "Mobile locale switch must leave secondary calculation absent");
      }
      assertions.push(
        "he -> lang=he dir=rtl",
        "en -> lang=en dir=ltr",
        profile === "desktop"
          ? "target/view/calculation/comparison state unchanged across locale switch"
          : "target/view/calculation state unchanged without enabling desktop-only comparison",
      );
    },
  },
  {
    id: "refresh", name: "Refresh preserves URL-backed state and language",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      await setActionGregorian(page, FIXTURE.action);
      await enableComparison(page, FIXTURE.comparison);
      await page.locator("#language-selector").selectOption("he");
      await page.waitForFunction(() => document.documentElement.lang === "he");
      const before = urlState(page);
      await page.reload({ waitUntil: "domcontentloaded" });
      await waitForWorkspace(page);
      await page.waitForFunction(() => document.documentElement.lang === "he");
      const after = urlState(page);
      for (const key of ["t", "v", "c", "c2", "compare", "lang"]) assert.equal(after[key], before[key], `refresh must preserve ${key}`);
      assertions.push("URL-backed target/view/calculation/comparison state preserved", "language preserved through URL/storage", "workspace restored after reload");
    },
  },
  {
    id: "history", name: "Browser Back/Forward follows History API state",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      const a = urlState(page).t;
      await searchGregorian(page, FIXTURE.targetB);
      const b = urlState(page).t;
      assert.notEqual(a, b);
      await page.goBack({ waitUntil: "domcontentloaded" });
      await waitForParam(page, "t", a);
      assert.equal(urlState(page).t, a);
      await page.goForward({ waitUntil: "domcontentloaded" });
      await waitForParam(page, "t", b);
      assert.equal(urlState(page).t, b);
      assertions.push("Back restored search A URL/UI", "Forward restored search B URL/UI");
    },
  },
  {
    id: "offline", name: "Offline reload plus local user action", screenshot: "07-offline-user-action.png",
    async run({ page, context, baseURL, assertions, phaseRef }) {
      phaseRef.value = "online-warmup";
      await openClean(page, baseURL);
      await page.waitForFunction(async () => Boolean(await navigator.serviceWorker.ready), null, { timeout: DEFAULT_TIMEOUT });
      if (!await page.evaluate(() => Boolean(navigator.serviceWorker.controller))) {
        await page.reload({ waitUntil: "domcontentloaded" });
        await waitForWorkspace(page);
      }
      assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), true, "Service Worker must control page before offline transition");
      phaseRef.value = "offline";
      await context.setOffline(true);
      const response = await page.reload({ waitUntil: "domcontentloaded" });
      await waitForWorkspace(page);
      assert.equal(response?.fromServiceWorker(), true, "Offline navigation should be fulfilled by Service Worker");
      const heading = await page.locator("#cutlet-heading").innerText();
      await page.locator("#next-cutlet").click();
      await page.waitForFunction((oldHeading) => document.querySelector("#cutlet-heading")?.textContent !== oldHeading, heading, { timeout: DEFAULT_TIMEOUT });
      await page.locator("#previous-cutlet").click();
      await page.waitForFunction((oldHeading) => document.querySelector("#cutlet-heading")?.textContent === oldHeading, heading, { timeout: DEFAULT_TIMEOUT });
      assertions.push("Service Worker controller active", "offline reload served by Service Worker", "cutlet navigation works while network is disabled");
      await context.setOffline(false);
    },
  },
  {
    id: "invalid", name: "Invalid input is recoverable",
    allowConsole: [/Missing or invalid input fields/, /outside the valid range/i, /RangeError/i],
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await searchGregorian(page, FIXTURE.target);
      const stable = urlState(page).t;
      await chooseCalendar(page, "target", "gregorian");
      await setField(page, "target", "year", 2026);
      await setField(page, "target", "month", 2);
      await setField(page, "target", "day", 31);
      await submitForm(page, "target");
      await page.locator("#target-form-error").waitFor({ state: "visible" });
      assert.equal(urlState(page).t, stable, "Invalid date must not replace previous result");
      assert.equal(await page.locator("#error-panel").isHidden(), true);
      await setField(page, "target", "day", 28);
      await submitForm(page, "target");
      await waitForParam(page, "t", toJdn({ year: 2026, month: 2, day: 28 }));
      await setField(page, "target", "year", "");
      await submitForm(page, "target");
      await page.locator("#target-form-error").waitFor({ state: "visible" });
      assert.equal(await page.locator("#error-panel").isHidden(), true);
      assertions.push("invalid civil date shows form error and preserves prior result", "corrected input resumes normal operation", "missing required year shows recoverable form error", "invalid month is not user-enterable because the current UI renders month as a select");
    },
  },
  {
    id: "special-inputs", name: "Calendar-specific input conventions",
    allowConsole: [/RangeError/i],
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      // Hebrew: month is a human-readable select, and year/day accept Hebrew numerals.
      await chooseCalendar(page, "target", "hebrew");
      assert.equal(await page.locator("#target-month").evaluate((element) => element.tagName), "SELECT");
      assert.equal(await page.locator("#target-year").getAttribute("type"), "text");
      assert.equal(await page.locator("#target-day").getAttribute("type"), "text");
      await setField(page, "target", "year", "תשפ״ו");
      await setField(page, "target", "month", "1");
      await setField(page, "target", "day", "י״ד");
      const expectedHebrew = calendarDateToJdn("hebrew", { year: "5786", month: "1", day: "14" });
      await submitForm(page, "target");
      await waitForParam(page, "t", expectedHebrew);
      assert.equal(await page.locator("#target-form-error").isHidden(), true, "Hebrew-letter date should be accepted");
      // Japanese: 元 is accepted as year 1.
      await chooseCalendar(page, "target", "japanese-imperial");
      await setField(page, "target", "era", "reiwa");
      await setField(page, "target", "year", "元");
      await setField(page, "target", "month", "5");
      await setField(page, "target", "day", "1");
      const expectedJapanese = calendarDateToJdn("japanese-imperial", { era: "reiwa", year: "1", month: "5", day: "1" });
      await submitForm(page, "target");
      await waitForParam(page, "t", expectedJapanese);
      assert.equal(await page.locator("#target-form-error").isHidden(), true, "Japanese 元 should be accepted");
      // Old Hindu calendars expose month names through selects and submit real dates.
      for (const [calendar, values] of [
        ["hindu-old-solar", { year: "5127", month: "1", day: "1" }],
        ["hindu-old-lunar", { year: "5127", month: "1", day: "1" }],
      ]) {
        await chooseCalendar(page, "target", calendar);
        assert.equal(await page.locator("#target-month").evaluate((element) => element.tagName), "SELECT");
        assert.ok((await page.locator("#target-month option").allTextContents()).some((text) => text.trim().length > 0));
        for (const [name, value] of Object.entries(values)) await setField(page, "target", name, value);
        const expected = calendarDateToJdn(calendar, values);
        await submitForm(page, "target");
        await waitForParam(page, "t", expected);
        assert.equal(await page.locator("#target-form-error").isHidden(), true, `${calendar} named-month input should be accepted`);
      }
      // Bahá’í named-month choices are submitted in both variants.
      for (const calendar of ["bahai-tehran", "bahai-western"]) {
        await chooseCalendar(page, "target", calendar);
        assert.equal(await page.locator("#target-month").evaluate((element) => element.tagName), "SELECT");
        assert.ok((await page.locator("#target-month option").allTextContents()).every((text) => text.trim().length > 0));
        await setField(page, "target", "year", "183");
        await setField(page, "target", "month", "1");
        await setField(page, "target", "day", "1");
        const expected = calendarDateToJdn(calendar, { year: "183", month: "1", day: "1" });
        await submitForm(page, "target");
        await waitForParam(page, "t", expected);
        assert.equal(await page.locator("#target-form-error").isHidden(), true, `${calendar} named-month input should be accepted`);
      }
      assertions.push("Hebrew named-month select present", "Hebrew year/day letters accepted", "Japanese 元 accepted for era year 1", "Old Hindu named-month dates submitted successfully", "Bahá’í named-month dates submitted successfully");
    },
  },
  {
    id: "race", name: "Two rapid searches leave the latest result visible",
    async run({ page, baseURL, assertions }) {
      await openClean(page, baseURL);
      await fillGregorian(page, "target", FIXTURE.target);
      await submitForm(page, "target");
      await fillGregorian(page, "target", FIXTURE.targetB);
      await submitForm(page, "target");
      await waitForParam(page, "t", fixtureJdn("targetB"));
      await page.waitForTimeout(1000);
      assert.equal(urlState(page).t, fixtureJdn("targetB").toString(), "Earlier request must not overwrite later search");
      assert.equal(await page.locator(`#calendar-grid .day-card[data-jdn="${fixtureJdn("targetB")}"][data-target="true"]`).count(), 1);
      assertions.push("search B remains final URL state", "search B remains selected after allowing A time to finish");
    },
  },
];

const fileScenario = {
  id: "file", name: "Standalone integration through file://", screenshot: "08-file-protocol.png", profile: "file",
  async run({ page, assertions }) {
    const example = pathToFileURL(path.join(ROOT, "browser", "standalone", "example-file.html")).href;
    await page.context().route(/^(?:https?|wss?):/i, (route) => route.abort("internetdisconnected"));
    await page.goto(example, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => {
      const element = document.querySelector("#fixed-calendar");
      return Boolean(element?.shadowRoot?.querySelector('button.day[aria-current="date"]'));
    }, null, { timeout: 360_000 });
    assert.equal(new URL(page.url()).protocol, "file:");
    assert.ok((await page.locator("#change-output").innerText()).includes("שנה"));
    const fixed = page.locator("#fixed-calendar");
    const beforeDate = await fixed.getAttribute("date");
    const navigation = await fixed.evaluate((host) => {
      const active = host._activeStartJdn;
      const current = active == null ? null : host._cutlets.get(active);
      return {
        beforeStart: active == null ? null : String(active),
        expectedStart: current == null ? null : String(current.nextCutletJdn),
      };
    });
    assert.ok(navigation.beforeStart, "Standalone must expose an active cutlet before navigation");
    assert.ok(navigation.expectedStart, "Standalone active cutlet must identify its next cutlet");
    await fixed.locator(".nav-button.next").click();
    await page.waitForFunction((expectedStart) => {
      const host = document.querySelector("#fixed-calendar");
      if (!host?.shadowRoot || String(host._activeStartJdn) !== expectedStart) return false;
      const section = host.shadowRoot.querySelector(`[data-start-jdn="${CSS.escape(expectedStart)}"]`);
      if (!section) return false;
      const viewport = host.shadowRoot.querySelector(".viewport");
      if (!viewport) return false;
      const sectionRect = section.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      return sectionRect.bottom > viewportRect.top && sectionRect.top < viewportRect.bottom;
    }, navigation.expectedStart, { timeout: 360_000 });
    assert.notEqual(navigation.expectedStart, navigation.beforeStart, "Next navigation must select a different cutlet");
    const afterDate = await fixed.getAttribute("date");
    assert.equal(afterDate, beforeDate, "Browsing standalone cutlets must not change target date attribute");
    assert.equal(await page.evaluate(() => "serviceWorker" in navigator && navigator.serviceWorker.controller !== null), false, "file:// must not depend on Service Worker control");
    assertions.push("real HTML opened from file://", "standalone component calculated/rendered with all HTTP(S) routes blocked", "shadow-DOM next navigation reaches the adjacent cutlet", "target date attribute preserved", "no Service Worker dependency");
  },
};

const mobileIds = new Set(["initial", "search", "calculation", "cutlets", "language"]);

async function runOneScenario({ browser, config, baseURL, scenario, profile }) {
  const phaseRef = { value: "setup" };
  const startedAt = performance.now();
  const result = {
    id: `${profile}-${scenario.id}`,
    scenario: scenario.id,
    profile,
    name: scenario.name,
    start: isoNow(),
    durationMs: 0,
    result: "PASS",
    assertions: [],
    screenshot: null,
    trace: null,
    errors: [],
  };
  let context;
  let page;
  let monitor = [];
  try {
    ({ context, page, monitor } = await newPage(browser, config, profile === "file" ? "desktop" : profile, phaseRef));
    await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
    phaseRef.value = scenario.id;
    const capture = async (filename) => {
      result.screenshot = await screenshot(page, profile === "mobile" ? `mobile-${filename}` : filename);
      return result.screenshot;
    };
    await scenario.run({ page, context, baseURL, assertions: result.assertions, phaseRef, capture, profile });
    if (scenario.screenshot && !result.screenshot) await capture(scenario.screenshot);
    assertNoUnexpectedRuntimeErrors(monitor, { allowConsole: scenario.allowConsole || [] });
    await context.tracing.stop();
  } catch (error) {
    result.result = "FAIL";
    result.errors.push(trimError(error));
    if (page) {
      const failName = `FAIL-${profile}-${slug(scenario.id)}.png`;
      try { result.screenshot = await screenshot(page, failName); } catch (screenshotError) { result.errors.push(`Screenshot failure: ${trimError(screenshotError)}`); }
    }
    if (context) {
      const trace = path.join(TRACES, `FAIL-${profile}-${slug(scenario.id)}.zip`);
      try {
        await context.tracing.stop({ path: trace });
        result.trace = path.relative(ROOT, trace).replaceAll(path.sep, "/");
      } catch (traceError) { result.errors.push(`Trace failure: ${trimError(traceError)}`); }
    }
  } finally {
    if (monitor.length) result.monitor = monitor;
    if (context) await context.close().catch(() => {});
    result.durationMs = elapsedMs(startedAt);
  }
  return result;
}

async function writeReports(meta, scenarios, uxFindings = []) {
  const pass = scenarios.filter((item) => item.result === "PASS").length;
  const fail = scenarios.filter((item) => item.result === "FAIL").length;
  const warnings = uxFindings.filter((item) => item.severity === "WARN").length;
  const administratorBlocked = scenarios.length > 0 && scenarios.every((item) =>
    item.result === "FAIL" && item.errors.some((error) => error.includes("ERR_BLOCKED_BY_ADMINISTRATOR")),
  );
  const verificationStatus = administratorBlocked
    ? "NOT VERIFIED — browser administrator policy blocked all navigation"
    : fail > 0 ? "FAIL" : "PASS";
  const report = {
    ...meta,
    verificationStatus,
    environmentBlocker: administratorBlocked ? {
      type: "browser-policy",
      error: "ERR_BLOCKED_BY_ADMINISTRATOR",
      impact: "The application code was not reached, so these scenario failures are infrastructure failures rather than product verdicts.",
    } : null,
    scenariosTotal: scenarios.length,
    pass,
    fail,
    warnings,
    totalDurationMs: scenarios.reduce((sum, item) => sum + item.durationMs, 0),
    scenarios,
    uxFindings,
  };
  await writeFile(path.join(ARTIFACTS, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  const lines = [
    "# Pastafari Calendar user E2E report", "",
    `- Commit SHA: \`${meta.commitSha}\``,
    `- Verification status: **${verificationStatus}**`,
    ...(administratorBlocked ? [
      "- Environment blocker: Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR` before application code could load.",
      "- Interpretation: scenario FAIL rows below are infrastructure failures; product behavior is **not verified** by this run.",
    ] : []),
    `- Browser: ${meta.browser}`, `- Browser version: ${meta.browserVersion}`,
    `- Node version: ${meta.nodeVersion}`, `- Desktop viewport: ${DESKTOP.width}×${DESKTOP.height}`,
    `- Mobile viewport: ${MOBILE.width}×${MOBILE.height}`, `- Scenarios total: ${scenarios.length}`,
    `- PASS: ${pass}`, `- FAIL: ${fail}`, `- WARN: ${warnings}`,
    `- Total scenario duration: ${(report.totalDurationMs / 1000).toFixed(1)} s`, "",
    "## Scenarios", "",
    "| Result | Profile | ID | Name | Duration | Screenshot | Trace |",
    "|---|---|---|---|---:|---|---|",
  ];
  for (const item of scenarios) {
    lines.push(`| ${item.result} | ${item.profile} | \`${item.scenario}\` | ${item.name.replaceAll("|", "\\|")} | ${(item.durationMs / 1000).toFixed(1)} s | ${item.screenshot ? `\`${item.screenshot}\`` : "—"} | ${item.trace ? `\`${item.trace}\`` : "—"} |`);
  }
  lines.push("", "## Details", "");
  for (const item of scenarios) {
    lines.push(`### ${item.result} — ${item.profile}/${item.scenario}`, "");
    for (const assertion of item.assertions) lines.push(`- ${assertion}`);
    for (const error of item.errors) lines.push(`- ERROR: ${error.replaceAll("\n", " ")}`);
    if (!item.assertions.length && !item.errors.length) lines.push("- No additional detail.");
    lines.push("");
  }
  lines.push("## UX review", "");
  if (!uxFindings.length) lines.push("No automated screenshot-review findings were recorded. A physical human 5–10 minute interaction pass is not performed by this script and must be marked as not verified unless a person performs it.", "");
  else for (const finding of uxFindings) lines.push(`- **${finding.severity}** — ${finding.screen}: ${finding.observation} Recommendation: ${finding.recommendation}`);
  await writeFile(path.join(ARTIFACTS, "report.md"), `${lines.join("\n")}\n`);
  return report;
}

async function main() {
  const config = parseArgs(process.argv.slice(2));
  if (config.help) { console.log(usage()); return; }
  await rm(ARTIFACTS, { recursive: true, force: true });
  await Promise.all([mkdir(SCREENSHOTS, { recursive: true }), mkdir(TRACES, { recursive: true }), mkdir(VIDEOS, { recursive: true })]);

  const launchOptions = { headless: !config.headed, slowMo: config.slowMo };
  if (config.chromiumExecutable) launchOptions.executablePath = config.chromiumExecutable;
  const browser = await chromium.launch(launchOptions);
  const server = await startStaticServer();
  const scenarios = [];
  try {
    const wanted = config.scenario;
    const known = new Set([...desktopScenarios.map((item) => item.id), fileScenario.id]);
    if (wanted && !known.has(wanted)) throw new Error(`Unknown scenario '${wanted}'. Available: ${[...known].join(", ")}`);

    if (!config.mobileOnly) {
      for (const scenario of desktopScenarios) {
        if (wanted && wanted !== scenario.id) continue;
        console.log(`[desktop/${scenario.id}] ${scenario.name}`);
        const result = await runOneScenario({ browser, config, baseURL: server.baseURL, scenario, profile: "desktop" });
        scenarios.push(result);
        console.log(`  -> ${result.result} (${result.durationMs} ms)`);
      }
      if (!wanted || wanted === "file") {
        console.log(`[file/${fileScenario.id}] ${fileScenario.name}`);
        const result = await runOneScenario({ browser, config, baseURL: server.baseURL, scenario: fileScenario, profile: "file" });
        scenarios.push(result);
        console.log(`  -> ${result.result} (${result.durationMs} ms)`);
      }
    }

    if (config.mobileOnly || (!wanted && !config.mobileOnly)) {
      for (const scenario of desktopScenarios.filter((item) => mobileIds.has(item.id))) {
        if (wanted && wanted !== scenario.id) continue;
        console.log(`[mobile/${scenario.id}] ${scenario.name}`);
        const result = await runOneScenario({ browser, config, baseURL: server.baseURL, scenario, profile: "mobile" });
        scenarios.push(result);
        console.log(`  -> ${result.result} (${result.durationMs} ms)`);
      }
    }

    const meta = {
      generatedAt: isoNow(), commitSha: getCommitSha(), browser: "Chromium", browserVersion: browser.version(),
      nodeVersion: process.version, viewport: { desktop: DESKTOP, mobile: MOBILE }, headed: config.headed,
    };
    const report = await writeReports(meta, scenarios);
    console.log(`\nReport: ${path.relative(ROOT, path.join(ARTIFACTS, "report.md"))}`);
    console.log(`PASS=${report.pass} FAIL=${report.fail} WARN=${report.warnings}`);
    if (report.fail) process.exitCode = 1;
  } finally {
    await server.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
