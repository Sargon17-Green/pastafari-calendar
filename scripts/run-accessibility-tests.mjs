"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import axe from "axe-core";
import { chromium, firefox } from "playwright";
import { calendarDateToJdn } from "../docs/calendar-converters.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const ARTIFACTS = path.join(ROOT, "artifacts", "accessibility");
const SCREENSHOTS = path.join(ARTIFACTS, "screenshots");
const TRACES = path.join(ARTIFACTS, "traces");
const DEFAULT_TIMEOUT = 120_000;
const DESKTOP = Object.freeze({ width: 1440, height: 1000 });
const MOBILE = Object.freeze({ width: 390, height: 844 });
const REFLOW_200 = Object.freeze({ width: 640, height: 900 });
const REFLOW_400 = Object.freeze({ width: 320, height: 900 });
const FIXTURE = Object.freeze({ year: 2026, month: 4, day: 15 });
const INVALID_FIXTURE = Object.freeze({ year: 2026, month: 2, day: 30 });
const AXE_TAGS = Object.freeze([
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22a",
  "wcag22aa",
]);

function parseArgs(argv) {
  const options = {
    browser: "chromium",
    headed: false,
    chromiumExecutable: process.env.PASTAFARI_CHROMIUM_EXECUTABLE || null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--headed") options.headed = true;
    else if (arg === "--browser") options.browser = argv[++index] || "";
    else if (arg.startsWith("--browser=")) options.browser = arg.slice("--browser=".length);
    else if (arg === "--chromium-executable") options.chromiumExecutable = argv[++index] || null;
    else if (arg.startsWith("--chromium-executable=")) options.chromiumExecutable = arg.slice("--chromium-executable=".length);
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!new Set(["chromium", "firefox"]).has(options.browser)) {
    throw new Error("--browser must be chromium or firefox.");
  }
  return options;
}

function usage() {
  return [
    "Pastafari accessibility checks targeting WCAG 2.2 AA",
    "",
    "Usage:",
    "  npm run test:accessibility",
    "  npm run test:accessibility -- --browser=firefox",
    "  npm run test:accessibility -- --headed",
    "  npm run test:accessibility -- --chromium-executable /path/to/chromium",
  ].join("\n");
}

function mimeType(filename) {
  const extension = path.extname(filename).toLowerCase();
  return ({
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon",
  })[extension] || "application/octet-stream";
}

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const decoded = decodeURIComponent(url.pathname);
      const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
      const filename = path.resolve(DOCS, relative);
      if (filename !== DOCS && !filename.startsWith(`${DOCS}${path.sep}`)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }
      const data = await readFile(filename);
      response.writeHead(200, {
        "content-type": mimeType(filename),
        "cache-control": "no-store, max-age=0",
        pragma: "no-cache",
        expires: "0",
      });
      response.end(data);
    } catch (error) {
      response.writeHead(error?.code === "ENOENT" ? 404 : 500, {
        "content-type": "text/plain; charset=utf-8",
      });
      response.end(error?.code === "ENOENT" ? "Not found" : String(error?.stack || error));
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

function toJdn(date) {
  return calendarDateToJdn("gregorian", {
    year: String(date.year),
    month: String(date.month),
    day: String(date.day),
  });
}

function errorText(error) {
  const text = error?.stack || error?.message || String(error);
  return text.length > 12_000 ? `${text.slice(0, 12_000)}\n…` : text;
}

function slug(value) {
  return String(value).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForWorkspace(page) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  await page.locator("#loading-panel").waitFor({ state: "hidden", timeout: DEFAULT_TIMEOUT });
  assert.equal(await page.locator("#error-panel").isHidden(), true, "global error panel must stay hidden");
  await page.waitForFunction(() => document.querySelectorAll("#calendar-grid .day-card").length > 0, null, {
    timeout: DEFAULT_TIMEOUT,
  });
}

async function waitForYearOverview(page) {
  await page.waitForFunction(() => {
    const content = document.querySelector("#year-overview-content");
    const error = document.querySelector("#year-overview-error");
    return Boolean((content && !content.hidden) || (error && !error.hidden));
  }, null, { timeout: DEFAULT_TIMEOUT });
  assert.equal(await page.locator("#year-overview-error").isHidden(), true, "year overview must load successfully");
  assert.equal(await page.locator("#year-overview-content").isVisible(), true, "year overview content must be visible");
}

async function chooseLocale(page, code) {
  const selector = page.locator("#language-selector");
  await selector.selectOption(code);
  await page.waitForFunction((expected) => {
    const html = document.documentElement;
    const select = document.querySelector("#language-selector");
    return html.lang === expected && select?.value === expected && !select.disabled;
  }, code, { timeout: DEFAULT_TIMEOUT });
}

async function setDateFieldValue(page, selector, value) {
  const locator = page.locator(selector);
  const tagName = await locator.evaluate((element) => element.tagName);
  if (tagName === "SELECT") await locator.selectOption(String(value));
  else await locator.fill(String(value));
}

async function fillGregorian(page, date) {
  await page.locator("#target-calendar").selectOption("gregorian");
  await setDateFieldValue(page, "#target-year", date.year);
  await setDateFieldValue(page, "#target-month", date.month);
  await setDateFieldValue(page, "#target-day", date.day);
}

async function searchGregorian(page, date) {
  await fillGregorian(page, date);
  const expected = toJdn(date).toString();
  await page.getByRole("button", { name: "Show date", exact: true }).click();
  await page.waitForFunction((value) => new URL(location.href).searchParams.get("t") === value, expected, {
    timeout: DEFAULT_TIMEOUT,
  });
  await waitForWorkspace(page);
  await waitForYearOverview(page);
}

async function enableComparison(page) {
  const details = page.locator("#calculation-settings");
  if ((await details.getAttribute("open")) === null) {
    await details.locator(":scope > summary").click();
  }
  const toggle = page.locator("#comparison-toggle");
  if (!await toggle.isChecked()) await toggle.check();
  await page.locator("#comparison-workspace").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  await page.waitForFunction(() => document.querySelectorAll("#comparison-body tr").length > 0, null, {
    timeout: DEFAULT_TIMEOUT,
  });
}

function flattenAxeViolations(results, metadata) {
  return results.violations.flatMap((violation) => violation.nodes.map((node) => ({
    ...metadata,
    rule: violation.id,
    impact: violation.impact || "unknown",
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    target: node.target,
    html: node.html,
    failureSummary: node.failureSummary || "",
  })));
}

function flattenAxeIncomplete(results, metadata) {
  return results.incomplete.flatMap((item) => item.nodes.map((node) => ({
    ...metadata,
    rule: item.id,
    impact: item.impact || "unknown",
    description: item.description,
    help: item.help,
    target: node.target,
    html: node.html,
  })));
}

async function axeScan(page, report, scenario, { locale = null, scope = null } = {}) {
  const effectiveLocale = locale || await page.locator("html").getAttribute("lang") || "unknown";
  const results = await page.evaluate(async ({ tags, scopeSelector }) => {
    const context = scopeSelector ? document.querySelector(scopeSelector) : document;
    if (!context) throw new Error(`axe scope not found: ${scopeSelector}`);
    return window.axe.run(context, {
      runOnly: { type: "tag", values: tags },
      resultTypes: ["violations", "incomplete"],
    });
  }, { tags: AXE_TAGS, scopeSelector: scope });
  const violations = flattenAxeViolations(results, { scenario, locale: effectiveLocale });
  const incomplete = flattenAxeIncomplete(results, { scenario, locale: effectiveLocale });
  report.axeScans.push({
    scenario,
    locale: effectiveLocale,
    scope: scope || "document",
    violations: violations.length,
    incomplete: incomplete.length,
  });
  report.axeViolations.push(...violations);
  report.axeIncomplete.push(...incomplete);
  if (violations.length) {
    const detail = violations.map((item) => [
      `${item.rule} [${item.impact}]`,
      `target=${JSON.stringify(item.target)}`,
      item.description,
      item.help,
      item.failureSummary,
    ].filter(Boolean).join(" | ")).join("\n");
    assert.fail(`axe found ${violations.length} WCAG A/AA violation node(s) in ${scenario}/${effectiveLocale}:\n${detail}`);
  }
}

async function structuralAudit(page) {
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    const ariaHiddenFocusable = [...document.querySelectorAll('[aria-hidden="true"]')]
      .filter((container) => container.querySelector('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])'))
      .map((element) => element.id || element.className || element.tagName);
    const visibleUnlabelledFields = [...document.querySelectorAll("input,select,textarea")]
      .filter((element) => {
        if (element.disabled || element.type === "hidden") return false;
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden" || element.closest("[hidden]")) return false;
        const nativeLabel = element.labels && element.labels.length > 0;
        return !nativeLabel && !element.getAttribute("aria-label") && !element.getAttribute("aria-labelledby");
      })
      .map((element) => element.id || element.name || element.outerHTML.slice(0, 120));
    const placeholderOnly = [...document.querySelectorAll("input[placeholder],textarea[placeholder]")]
      .filter((element) => !(element.labels?.length || element.getAttribute("aria-label") || element.getAttribute("aria-labelledby")))
      .map((element) => element.id || element.name || element.outerHTML.slice(0, 120));
    return {
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      title: document.title,
      mainCount: document.querySelectorAll("main").length,
      h1Count: document.querySelectorAll("h1").length,
      headerCount: document.querySelectorAll("header").length,
      footerCount: document.querySelectorAll("footer").length,
      headerInsideMain: Boolean(document.querySelector("main header")),
      footerInsideMain: Boolean(document.querySelector("main footer")),
      duplicates,
      ariaHiddenFocusable,
      visibleUnlabelledFields,
      placeholderOnly,
    };
  });
  assert.ok(result.lang, "html[lang] must be set");
  assert.ok(new Set(["ltr", "rtl"]).has(result.dir), "html[dir] must be ltr or rtl");
  assert.ok(result.title.trim(), "page title must not be empty");
  assert.equal(result.mainCount, 1, "exactly one main landmark is expected");
  assert.equal(result.h1Count, 1, "exactly one primary h1 is expected");
  assert.equal(result.headerCount, 1, "one page header is expected");
  assert.equal(result.footerCount, 1, "one footer is expected");
  assert.equal(result.headerInsideMain, false, "page header must not be nested inside main");
  assert.equal(result.footerInsideMain, false, "page footer must not be nested inside main");
  assert.deepEqual(result.duplicates, [], `duplicate ids: ${result.duplicates.join(", ")}`);
  assert.deepEqual(result.ariaHiddenFocusable, [], `focusable descendants under aria-hidden: ${result.ariaHiddenFocusable.join(", ")}`);
  assert.deepEqual(result.visibleUnlabelledFields, [], `unlabelled visible form fields: ${result.visibleUnlabelledFields.join(", ")}`);
  assert.deepEqual(result.placeholderOnly, [], `placeholder-only labels: ${result.placeholderOnly.join(", ")}`);
  return result;
}

function rgb(value) {
  const match = String(value).match(/rgba?\((\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i);
  return match ? match.slice(1, 4).map(Number) : null;
}

function luminance(channels) {
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(left, right) {
  const a = luminance(left);
  const b = luminance(right);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

async function focusStyle(page, selector) {
  const locator = page.locator(selector).first();
  await locator.scrollIntoViewIfNeeded();
  await page.keyboard.press("Tab");
  await locator.focus();
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const outlineOffset = Number.parseFloat(style.outlineOffset) || 0;
    let backgroundElement = outlineOffset > 0 ? element.parentElement : element;
    let background = backgroundElement ? getComputedStyle(backgroundElement).backgroundColor : style.backgroundColor;
    while (backgroundElement?.parentElement && /rgba?\([^)]*,\s*0(?:\.0+)?\)/.test(background)) {
      backgroundElement = backgroundElement.parentElement;
      background = getComputedStyle(backgroundElement).backgroundColor;
    }
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
      outlineOffset,
      outlineColor: style.outlineColor,
      backgroundColor: background,
    };
  });
}

async function assertFocusIndicators(page) {
  const selectors = [
    "#language-selector",
    "#target-calendar",
    "#target-year",
    "#target-search-form button[type=submit]",
    "#calculation-settings > summary",
    "#previous-cutlet",
    ".comparison-scroll",
  ];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (!await locator.isVisible()) continue;
    const style = await focusStyle(page, selector);
    assert.notEqual(style.outlineStyle, "none", `${selector} must expose a focus outline`);
    assert.ok(style.outlineWidth >= 2, `${selector} focus outline must be at least 2 CSS px`);
    const outline = rgb(style.outlineColor);
    const background = rgb(style.backgroundColor);
    if (outline && background) {
      assert.ok(contrast(outline, background) >= 3, `${selector} focus outline contrast must be at least 3:1`);
    }
  }
}

async function assertNoGlobalHorizontalOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert.ok(
    metrics.scrollWidth <= metrics.clientWidth + 2,
    `${label}: global horizontal overflow ${metrics.scrollWidth}px > ${metrics.clientWidth}px`,
  );
}

async function assertKeyTargetSizes(page) {
  const selectors = [
    "#language-selector",
    "#target-calendar",
    "#target-year",
    "#target-search-form button[type=submit]",
    "#calculation-settings > summary",
    "#previous-cutlet",
    "#today-button",
    "#next-cutlet",
    "#comparison-toggle",
  ];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (!await locator.isVisible()) continue;
    const box = selector === "#comparison-toggle"
      ? await locator.locator("xpath=ancestor::label[1]").boundingBox()
      : await locator.boundingBox();
    assert.ok(box, `${selector} must have a measurable hit area`);
    assert.ok(box.width >= 24 && box.height >= 24, `${selector} hit area must be at least 24×24 CSS px; got ${box.width}×${box.height}`);
  }
}

async function assertKeyControlsInsideViewport(page) {
  const viewport = page.viewportSize();
  assert.ok(viewport, "viewport must be available");
  const selectors = [
    "#language-selector",
    "#target-calendar",
    "#target-year",
    "#target-search-form button[type=submit]",
    "#previous-cutlet",
    "#today-button",
    "#next-cutlet",
  ];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (!await locator.isVisible()) continue;
    const box = await locator.boundingBox();
    assert.ok(box, `${selector} must have a bounding box`);
    assert.ok(box.x >= -1 && box.x + box.width <= viewport.width + 1, `${selector} is clipped horizontally`);
  }
}

async function assertTabCycle(page) {
  await page.locator(".skip-link").focus();
  const seen = [];
  let returned = false;
  for (let index = 0; index < 250; index += 1) {
    await page.keyboard.press("Tab");
    const current = await page.evaluate(() => {
      const element = document.activeElement;
      return {
        tag: element?.tagName || "",
        id: element?.id || "",
        className: typeof element?.className === "string" ? element.className : "",
        text: (element?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
      };
    });
    seen.push(current);
    if (current.tag === "A" && current.className.split(/\s+/).includes("skip-link")) {
      returned = true;
      break;
    }
    if (current.tag === "BODY") {
      // Chromium may expose the document boundary as BODY for one Tab step before
      // wrapping back to the first tabbable element. That is normal browser
      // traversal, not a focus trap.
      await page.keyboard.press("Tab");
      const wrapped = await page.evaluate(() => {
        const element = document.activeElement;
        return {
          tag: element?.tagName || "",
          id: element?.id || "",
          className: typeof element?.className === "string" ? element.className : "",
          text: (element?.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
        };
      });
      seen.push(wrapped);
      returned = wrapped.tag === "A" && wrapped.className.split(/\s+/).includes("skip-link");
      assert.equal(returned, true, `Tab traversal reached BODY at step ${index + 1} but did not wrap to the skip link`);
      break;
    }
  }
  assert.equal(returned, true, "Tab traversal must leave every region and eventually cycle back to the skip link");
  for (const id of ["language-selector", "target-calendar", "comparison-toggle", "previous-cutlet", "today-button", "next-cutlet"]) {
    assert.ok(seen.some((item) => item.id === id), `keyboard traversal must reach #${id}`);
  }
  assert.ok(seen.some((item) => item.text.includes("Show date")), "keyboard traversal must reach the search submit button");
  return seen.length;
}

async function assertKeyboardOperations(page) {
  const skip = page.locator(".skip-link");
  const calendarSelect = page.locator("#target-calendar");
  await calendarSelect.focus();
  await page.keyboard.press("Shift+Tab");
  assert.notEqual(await page.evaluate(() => document.activeElement?.tagName || ""), "BODY", "Shift+Tab from an interior control must keep focus in the document");
  assert.notEqual(await page.evaluate(() => document.activeElement?.id || ""), "target-calendar", "Shift+Tab must move focus to the previous tabbable control");

  await skip.focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.activeElement?.id === "search-heading");
  assert.equal(await page.locator("#search-heading").isVisible(), true, "skip-link target heading must be visible and focused");

  const details = page.locator("#calculation-settings");
  const summary = details.locator(":scope > summary");
  await summary.focus();
  await page.keyboard.press("Space");
  assert.equal((await details.getAttribute("open")) !== null, false, "Space must close the details control");
  await page.keyboard.press("Enter");
  assert.equal((await details.getAttribute("open")) !== null, true, "Enter must open the details control");

  const select = page.locator("#target-calendar");
  await select.selectOption("gregorian");
  await select.focus();
  await page.keyboard.press("ArrowDown");
  const changed = await select.inputValue();
  assert.notEqual(changed, "gregorian", "native select must respond to keyboard navigation");
  await page.keyboard.press("ArrowUp");
  assert.equal(await select.inputValue(), "gregorian", "native select must support reverse keyboard navigation");

  const initialHeading = await page.locator("#cutlet-heading").innerText();
  const next = page.locator("#next-cutlet");
  await next.focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction((heading) => document.querySelector("#cutlet-heading")?.textContent !== heading, initialHeading, {
    timeout: DEFAULT_TIMEOUT,
  });
  assert.equal(await page.evaluate(() => document.activeElement?.id), "next-cutlet", "focus must stay on the cutlet navigation control after dynamic rendering");
  const previous = page.locator("#previous-cutlet");
  await previous.focus();
  await page.keyboard.press("Space");
  await page.waitForFunction((heading) => document.querySelector("#cutlet-heading")?.textContent === heading, initialHeading, {
    timeout: DEFAULT_TIMEOUT,
  });
  assert.equal(await page.evaluate(() => document.activeElement?.id), "previous-cutlet", "Space activation must work and focus must remain on navigation");
}

async function saveScreenshot(page, name) {
  const filename = path.join(SCREENSHOTS, name);
  await page.screenshot({ path: filename, fullPage: true });
  return path.relative(ROOT, filename).replaceAll(path.sep, "/");
}

async function writeReports(report) {
  await writeFile(path.join(ARTIFACTS, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  const lines = [
    "# Accessibility test report",
    "",
    `- Target: automated accessibility checks targeting WCAG 2.2 AA`,
    `- Browser: ${report.browser} ${report.browserVersion}`,
    `- Node: ${report.nodeVersion}`,
    `- Result: **${report.failures ? "FAIL" : "PASS"}**`,
    `- Duration: ${(report.durationMs / 1000).toFixed(1)} s`,
    `- Checks: ${report.checks.length} (${report.passes} PASS / ${report.failures} FAIL)`,
    `- Axe scans: ${report.axeScans.length}`,
    `- Axe violation nodes: ${report.axeViolations.length}`,
    `- Axe incomplete/manual-review nodes: ${report.axeIncomplete.length}`,
    `- Screen reader: **NOT EXECUTED** by this automated suite`,
    `- Suppressions: none`,
    "",
    "## Checks",
    "",
    "| Result | Check | Duration |",
    "|---|---|---:|",
  ];
  for (const check of report.checks) {
    lines.push(`| ${check.result} | \`${check.id}\` | ${(check.durationMs / 1000).toFixed(2)} s |`);
  }
  lines.push("", "## Axe scans", "", "| Scenario | Locale | Scope | Violations | Incomplete |", "|---|---|---|---:|---:|");
  for (const scan of report.axeScans) {
    lines.push(`| ${scan.scenario} | ${scan.locale} | \`${scan.scope}\` | ${scan.violations} | ${scan.incomplete} |`);
  }
  if (report.axeViolations.length) {
    lines.push("", "## Axe violations", "");
    for (const item of report.axeViolations) {
      lines.push(`- **${item.rule}** [${item.impact}] — ${item.scenario}/${item.locale}; target \`${JSON.stringify(item.target)}\`; ${item.help}. ${item.description}`);
    }
  }
  if (report.axeIncomplete.length) {
    lines.push("", "## Axe items requiring manual review", "");
    for (const item of report.axeIncomplete) {
      lines.push(`- **${item.rule}** [${item.impact}] — ${item.scenario}/${item.locale}; target \`${JSON.stringify(item.target)}\`; ${item.help}.`);
    }
  }
  const failed = report.checks.filter((check) => check.result === "FAIL");
  if (failed.length) {
    lines.push("", "## Failures", "");
    for (const check of failed) {
      lines.push(`### ${check.id}`, "", "```text", check.error || "Unknown error", "```", "");
    }
  }
  lines.push(
    "",
    "## Manual coverage still required",
    "",
    "- Screen-reader navigation and announcement quality (NVDA + Firefox/Chrome on Windows, or VoiceOver + Safari on macOS).",
    "- Real browser zoom at 200% and 400%; automated checks use equivalent reflow-width proxies because Playwright does not expose browser UI zoom reliably.",
    "- Human judgement of focus order, wording clarity, reading order, and whether color-independent cues are understandable rather than merely present.",
    "- High-contrast/custom-color combinations beyond Chromium forced-colors emulation.",
  );
  await writeFile(path.join(ARTIFACTS, "report.md"), `${lines.join("\n")}\n`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }
  await rm(ARTIFACTS, { recursive: true, force: true });
  await Promise.all([mkdir(SCREENSHOTS, { recursive: true }), mkdir(TRACES, { recursive: true })]);

  const browserType = options.browser === "firefox" ? firefox : chromium;
  const launchOptions = { headless: !options.headed };
  if (options.browser === "chromium" && options.chromiumExecutable) launchOptions.executablePath = options.chromiumExecutable;
  const browser = await browserType.launch(launchOptions);
  const server = await startStaticServer();
  const context = await browser.newContext({
    viewport: DESKTOP,
    locale: "en-US",
    timezoneId: "Asia/Jerusalem",
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(DEFAULT_TIMEOUT);
  page.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
  await page.addInitScript({ content: axe.source });

  const started = performance.now();
  const report = {
    generatedAt: new Date().toISOString(),
    browser: options.browser,
    browserVersion: browser.version(),
    nodeVersion: process.version,
    target: "Automated accessibility checks targeting WCAG 2.2 AA",
    axeVersion: axe.version,
    axeTags: [...AXE_TAGS],
    suppressions: [],
    screenReader: "NOT EXECUTED",
    checks: [],
    axeScans: [],
    axeViolations: [],
    axeIncomplete: [],
    screenshots: [],
    passes: 0,
    failures: 0,
    durationMs: 0,
  };
  let delayedWorker = true;
  await context.route("**/engine/pastafari-fast-worker.js*", async (route) => {
    const response = await route.fetch();
    if (delayedWorker) {
      delayedWorker = false;
      await delay(600);
    }
    await route.fulfill({ response });
  });
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });

  async function check(id, task) {
    const checkStarted = performance.now();
    const entry = { id, result: "PASS", durationMs: 0, error: null, screenshot: null };
    try {
      await task();
      report.passes += 1;
    } catch (error) {
      entry.result = "FAIL";
      entry.error = errorText(error);
      report.failures += 1;
      try {
        entry.screenshot = await saveScreenshot(page, `FAIL-${slug(id)}.png`);
        report.screenshots.push(entry.screenshot);
      } catch (screenshotError) {
        entry.error += `\nScreenshot error: ${errorText(screenshotError)}`;
      }
    } finally {
      entry.durationMs = Math.round(performance.now() - checkStarted);
      report.checks.push(entry);
      console.log(`[${entry.result}] ${id} (${entry.durationMs} ms)`);
    }
  }

  let fatalSuiteError = null;
  try {
    await page.goto(server.baseURL, { waitUntil: "domcontentloaded" });

    await check("loading-state", async () => {
      const loading = page.locator("#loading-panel");
      assert.equal(await loading.isVisible(), true, "loading panel must be visible while the engine is deliberately delayed");
      assert.equal(await loading.getAttribute("aria-live"), "polite");
      assert.equal(await loading.getAttribute("aria-busy"), "true");
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(":focus").evaluate((element) => element.classList.contains("skip-link")), true, "loading must not trap focus before the skip link");
    });

    await waitForWorkspace(page);
    await waitForYearOverview(page);

    await check("initial-english-ltr", async () => {
      const structure = await structuralAudit(page);
      assert.equal(structure.lang, "en");
      assert.equal(structure.dir, "ltr");
      assert.equal(await page.getByRole("main").count(), 1);
      assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
      assert.equal(await page.getByRole("combobox", { name: "Language", exact: true }).count(), 1);
      assert.equal(await page.getByRole("button", { name: "Show date", exact: true }).count(), 1);
      await axeScan(page, report, "initial-english", { locale: "en" });
    });

    const englishNames = {
      language: await page.locator('label[for="language-selector"]').innerText(),
      targetCalendar: await page.locator("#target-calendar").evaluate((element) => element.labels?.[0]?.innerText || ""),
      previous: await page.locator("#previous-cutlet").innerText(),
      reverse: await page.locator("#reverse-heading").innerText(),
    };

    await check("hebrew-rtl-and-locale-names", async () => {
      await page.locator("#language-selector").focus();
      await chooseLocale(page, "he");
      assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
      assert.equal(await page.evaluate(() => document.activeElement?.id), "language-selector", "locale switch must preserve focus on the selector");
      const hebrewNames = {
        language: await page.locator('label[for="language-selector"]').innerText(),
        targetCalendar: await page.locator("#target-calendar").evaluate((element) => element.labels?.[0]?.innerText || ""),
        previous: await page.locator("#previous-cutlet").innerText(),
        reverse: await page.locator("#reverse-heading").innerText(),
      };
      for (const [key, value] of Object.entries(hebrewNames)) {
        assert.ok(value?.trim(), `${key} accessible/visible name must stay non-empty after locale switch`);
        assert.notEqual(value, englishNames[key], `${key} name must update after switching to Hebrew`);
      }
      await structuralAudit(page);
      await axeScan(page, report, "initial-hebrew", { locale: "he" });
      const shot = await saveScreenshot(page, "rtl-hebrew.png");
      report.screenshots.push(shot);
    });

    await chooseLocale(page, "en");

    await check("search-result-calendar-year", async () => {
      await searchGregorian(page, FIXTURE);
      const target = page.locator('#calendar-grid .day-card[data-target="true"]');
      assert.equal(await target.count(), 1, "one target day must be marked");
      assert.ok((await target.locator(".target-badge").innerText()).trim(), "target day must have a non-color text badge");
      assert.ok((await page.locator("#year-cutlet-position").innerText()).trim(), "year overview must describe the displayed cutlet position in text");
      await axeScan(page, report, "successful-result", { locale: "en" });
    });

    await check("form-error-state", async () => {
      await fillGregorian(page, INVALID_FIXTURE);
      const submit = page.getByRole("button", { name: "Show date", exact: true });
      await submit.focus();
      await page.keyboard.press("Enter");
      const error = page.locator("#target-form-error");
      await error.waitFor({ state: "visible" });
      assert.equal(await error.getAttribute("role"), "alert");
      assert.ok((await error.innerText()).trim(), "form error must contain text");
      assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), "BODY", "error rendering must not drop focus to body");
      await axeScan(page, report, "form-error", { locale: "en", scope: "#search-panel" });
    });

    await searchGregorian(page, FIXTURE);

    await check("advanced-settings-keyboard", async () => {
      const details = page.locator("#calculation-settings");
      const summary = details.locator(":scope > summary");
      if ((await details.getAttribute("open")) === null) await summary.click();
      await summary.focus();
      await page.keyboard.press("Space");
      assert.equal((await details.getAttribute("open")) !== null, false, "Space must close details");
      await page.keyboard.press("Enter");
      assert.equal((await details.getAttribute("open")) !== null, true, "Enter must open details");
      await axeScan(page, report, "advanced-settings", { locale: "en", scope: "#search-panel" });
    });

    if (options.browser === "chromium") {
      await check("comparison-table", async () => {
        await enableComparison(page);
        const rows = page.locator("#comparison-body tr");
        assert.ok(await rows.count() > 0, "comparison must render rows on desktop");
        assert.equal(await page.locator('.comparison-table thead th:not([scope="col"])').count(), 0, "all comparison column headers need scope=col");
        assert.equal(await page.locator('#comparison-body th:not([scope="row"])').count(), 0, "all comparison row headers need scope=row");
        assert.equal(await page.locator(".comparison-scroll").getAttribute("role"), "region");
        assert.ok((await page.locator(".comparison-scroll").getAttribute("aria-label"))?.trim(), "scrollable comparison region needs an accessible name");
        await axeScan(page, report, "comparison", { locale: "en", scope: "#comparison-workspace" });
      });
    }

    await check("keyboard-navigation-and-focus-management", async () => {
      if (options.browser === "chromium" && !await page.locator("#comparison-toggle").isChecked()) await enableComparison(page);
      const tabStops = await assertTabCycle(page);
      assert.ok(tabStops >= 10, "keyboard traversal must include a meaningful set of controls");
      await assertKeyboardOperations(page);
    });

    await check("focus-visibility", async () => {
      if (options.browser === "chromium" && !await page.locator("#comparison-workspace").isVisible()) await enableComparison(page);
      await assertFocusIndicators(page);
    });

    await check("target-size", async () => {
      await assertKeyTargetSizes(page);
    });

    if (options.browser === "chromium") {
      await check("forced-colors", async () => {
        await page.emulateMedia({ forcedColors: "active" });
        assert.equal(await page.evaluate(() => matchMedia("(forced-colors: active)").matches), true);
        const targetStyle = await page.locator('#calendar-grid .day-card[data-target="true"]').evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            borderWidth: Number.parseFloat(style.borderTopWidth),
            borderStyle: style.borderTopStyle,
            outlineStyle: style.outlineStyle,
            outlineWidth: Number.parseFloat(style.outlineWidth),
          };
        });
        assert.equal(targetStyle.borderStyle, "solid");
        assert.ok(targetStyle.borderWidth >= 2, "target-day border must survive forced colors");
        assert.notEqual(targetStyle.outlineStyle, "none", "target-day outline must survive forced colors");
        assert.ok(targetStyle.outlineWidth >= 2, "target-day outline must remain visible in forced colors");
        await page.locator("#previous-cutlet").focus();
        const focus = await page.locator("#previous-cutlet").evaluate((element) => getComputedStyle(element).outlineStyle);
        assert.notEqual(focus, "none", "button focus indication must survive forced colors");
        const shot = await saveScreenshot(page, "forced-colors.png");
        report.screenshots.push(shot);
        await page.emulateMedia({ forcedColors: "none" });
      });
    }

    await check("reduced-motion", async () => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), true);
      const styles = await page.evaluate(() => ({
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        loaderDuration: Number.parseFloat(getComputedStyle(document.querySelector(".loader")).animationDuration) || 0,
        loaderIterations: getComputedStyle(document.querySelector(".loader")).animationIterationCount,
      }));
      assert.equal(styles.scrollBehavior, "auto", "reduced motion must disable smooth scrolling");
      assert.ok(styles.loaderDuration <= 0.001, `loader animation duration must collapse under reduced motion; got ${styles.loaderDuration}s`);
      assert.equal(styles.loaderIterations, "1", "reduced motion must prevent repeated loader animation");
      await page.emulateMedia({ reducedMotion: "no-preference" });
    });

    await check("mobile-390", async () => {
      await page.setViewportSize(MOBILE);
      await assertNoGlobalHorizontalOverflow(page, "390px mobile");
      await assertKeyControlsInsideViewport(page);
      await assertKeyTargetSizes(page);
      if (options.browser === "chromium" && await page.locator("#comparison-workspace").isVisible()) {
        assert.equal(await page.locator(".comparison-scroll").isVisible(), false, "wide comparison table must not remain exposed on mobile");
        assert.equal(await page.locator(".mobile-comparison-note").isVisible(), true, "mobile comparison limitation must have visible text");
      }
      await axeScan(page, report, "mobile-390", { locale: "en" });
    });

    await check("long-locale-mobile", async () => {
      await chooseLocale(page, "de");
      assert.equal(await page.locator("html").getAttribute("dir"), "ltr");
      await assertNoGlobalHorizontalOverflow(page, "German locale at 390px");
      await assertKeyControlsInsideViewport(page);
      await axeScan(page, report, "long-locale-mobile", { locale: "de" });
    });

    await check("rtl-mobile-focus-order", async () => {
      await chooseLocale(page, "he");
      assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
      await assertNoGlobalHorizontalOverflow(page, "Hebrew RTL at 390px");
      await page.locator("#language-selector").focus();
      await page.keyboard.press("Tab");
      assert.notEqual(await page.evaluate(() => document.activeElement?.tagName), "BODY", "RTL must not break DOM focus order");
    });

    await chooseLocale(page, "en");

    await check("reflow-200-percent-proxy", async () => {
      await page.setViewportSize(REFLOW_200);
      await assertNoGlobalHorizontalOverflow(page, "200% reflow proxy (640 CSS px from 1280px reference)");
      await assertKeyControlsInsideViewport(page);
    });

    await check("reflow-400-percent-proxy", async () => {
      await page.setViewportSize(REFLOW_400);
      await assertNoGlobalHorizontalOverflow(page, "400% reflow proxy (320 CSS px from 1280px reference)");
      await assertKeyControlsInsideViewport(page);
      const shot = await saveScreenshot(page, "reflow-400-percent-proxy.png");
      report.screenshots.push(shot);
    });

    await check("text-spacing", async () => {
      await page.setViewportSize(MOBILE);
      await page.addStyleTag({ content: `
        html.a11y-text-spacing * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
        html.a11y-text-spacing p { margin-bottom: 2em !important; }
      ` });
      await page.locator("html").evaluate((element) => element.classList.add("a11y-text-spacing"));
      await assertNoGlobalHorizontalOverflow(page, "WCAG text spacing override");
      await assertKeyControlsInsideViewport(page);
      await page.locator("html").evaluate((element) => element.classList.remove("a11y-text-spacing"));
    });

    await page.setViewportSize(DESKTOP);
    await chooseLocale(page, "en");
  } catch (error) {
    fatalSuiteError = error;
    report.failures += 1;
    report.checks.push({
      id: "fatal-suite-error",
      result: "FAIL",
      durationMs: Math.round(performance.now() - started),
      error: errorText(error),
      screenshot: null,
    });
  } finally {
    report.durationMs = Math.round(performance.now() - started);
    if (report.failures) {
      const trace = path.join(TRACES, "accessibility-failures.zip");
      try {
        await context.tracing.stop({ path: trace });
        report.trace = path.relative(ROOT, trace).replaceAll(path.sep, "/");
      } catch (error) {
        report.traceError = errorText(error);
      }
    } else {
      await context.tracing.stop().catch(() => {});
    }
    await writeReports(report);
    await context.close().catch(() => {});
    await server.close();
    await browser.close();
  }

  console.log(`\nAccessibility report: ${path.relative(ROOT, path.join(ARTIFACTS, "report.md"))}`);
  console.log(`PASS=${report.passes} FAIL=${report.failures} AXE_VIOLATIONS=${report.axeViolations.length} INCOMPLETE=${report.axeIncomplete.length}`);
  if (fatalSuiteError) throw fatalSuiteError;
  if (report.failures) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
