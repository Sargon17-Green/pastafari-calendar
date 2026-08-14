#!/usr/bin/env node
"use strict";

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import {
  access,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { extname, dirname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const SCRIPT_DIR = dirname(SCRIPT_PATH);
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const DOCS_DIR = join(REPO_ROOT, "docs");
const LOCALES_DIR = join(DOCS_DIR, "i18n", "locales");
const REGISTRY_PATH = join(DOCS_DIR, "i18n", "registry.js");
const RUNTIME_PATH = join(DOCS_DIR, "i18n", "runtime.js");
const STYLES_PATH = join(DOCS_DIR, "styles.css");
const I18N_DOC_PATH = join(DOCS_DIR, "I18N.md");
const OUTPUT_DIR = join(REPO_ROOT, "artifacts", "i18n-browser-audit");
const SCREENSHOT_DIR = join(OUTPUT_DIR, "screenshots");
const REPORT_JSON_PATH = join(OUTPUT_DIR, "report.json");
const REPORT_MD_PATH = join(OUTPUT_DIR, "report.md");
const GALLERY_PATH = join(OUTPUT_DIR, "index.html");

const FIXED_TARGET_JDN = "2461266";
const FIXED_ACTION_JDN = "2461266";
const FIXED_SEARCH_DATE = Object.freeze({ year: "2026", month: "8", day: "14" });
const DEFAULT_TIMEOUT_MS = 120_000;
const YEAR_STRUCTURE_TIMEOUT_MS = 60_000;
const VIEWPORTS = Object.freeze([
  Object.freeze({ label: "desktop", width: 1440, height: 1000 }),
  Object.freeze({ label: "mobile", width: 390, height: 844 }),
]);
const INTENTIONAL_SCROLL_SELECTORS = Object.freeze([
  ".comparison-scroll",
  ".structure-list",
]);
const IMPORTANT_LAYOUT_SELECTORS = Object.freeze([
  "button",
  "label",
  "h1",
  "h2",
  "h3",
  ".language-control",
  ".date-entry-form",
  ".date-fields",
  ".calendar-toolbar",
  ".toolbar-actions",
  ".target-beacon",
  ".beacon-line",
  ".calendar-grid",
  ".day-card",
  ".day-line",
  ".year-facts > div",
  ".structure-item",
  ".guide-grid article",
  ".comparison-scroll",
  ".comparison-table",
]);
const DIRECTION_CHECK_SELECTORS = Object.freeze([
  ".calendar-toolbar",
  ".date-entry-form",
  ".calendar-grid",
  ".toolbar-actions",
  ".comparison-scroll",
]);

function parseArgs(argv) {
  const options = {
    browser: "chromium",
    locales: [],
    resume: false,
    screenshots: true,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--resume") {
      options.resume = true;
      continue;
    }
    if (arg === "--no-screenshots") {
      options.screenshots = false;
      continue;
    }
    if (arg === "--browser") {
      const value = argv[++index];
      if (!value) throw new Error("--browser requires a value.");
      options.browser = value;
      continue;
    }
    if (arg.startsWith("--browser=")) {
      options.browser = arg.slice("--browser=".length);
      continue;
    }
    if (arg === "--locale") {
      const value = argv[++index];
      if (!value) throw new Error("--locale requires a value.");
      options.locales.push(...value.split(",").map((part) => part.trim()).filter(Boolean));
      continue;
    }
    if (arg.startsWith("--locale=")) {
      options.locales.push(...arg.slice("--locale=".length).split(",").map((part) => part.trim()).filter(Boolean));
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  options.locales = [...new Set(options.locales)];
  if (!["chromium", "firefox", "webkit"].includes(options.browser)) {
    throw new Error(`Unsupported browser: ${options.browser}. Use chromium, firefox, or webkit.`);
  }
  return options;
}

function printHelp() {
  console.log(`Pastafari i18n browser audit\n\nUsage:\n  node scripts/run-i18n-browser-audit.mjs\n  node scripts/run-i18n-browser-audit.mjs --locale he\n  node scripts/run-i18n-browser-audit.mjs --locale he --locale ar\n  node scripts/run-i18n-browser-audit.mjs --resume\n  node scripts/run-i18n-browser-audit.mjs --no-screenshots\n  node scripts/run-i18n-browser-audit.mjs --browser firefox\n\nThe full audit writes report.json, report.md, screenshots, and an offline gallery under:\n  artifacts/i18n-browser-audit/`);
}

function nowIso() {
  return new Date().toISOString();
}

function sha256Text(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeFileComponent(value) {
  return String(value).normalize("NFKC").replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "") || "locale";
}

function canonicalTag(tag) {
  if (typeof tag !== "string" || tag.trim() === "") return null;
  try {
    return Intl.getCanonicalLocales(tag.trim())[0] ?? null;
  } catch {
    return null;
  }
}

function getGitHead() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "לא אומת";
  }
}

async function assertRepositoryShape() {
  for (const path of [DOCS_DIR, LOCALES_DIR, REGISTRY_PATH, RUNTIME_PATH, STYLES_PATH]) {
    await access(path, fsConstants.R_OK);
  }
}

function sameKeySet(left, right) {
  const a = Object.keys(left || {}).sort();
  const b = Object.keys(right || {}).sort();
  return a.length === b.length && a.every((key, index) => key === b[index]);
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value, count]) => ({ value, count }));
}

function localeMeta(locale) {
  if (!locale || typeof locale !== "object") return null;
  return {
    code: typeof locale.code === "string" ? locale.code : null,
    displayName: typeof locale.displayName === "string" ? locale.displayName : null,
    dir: typeof locale.dir === "string" ? locale.dir : null,
    intlLocale: typeof locale.intlLocale === "string" ? locale.intlLocale : null,
    experimental: locale.experimental === true,
    fallbackLocale: typeof locale.fallbackLocale === "string" ? locale.fallbackLocale : null,
  };
}

function validateResourceShape(resource, baseline, fileCode) {
  const errors = [];
  const warnings = [];

  if (!resource || typeof resource !== "object") {
    errors.push("default export is not an object");
    return { errors, warnings };
  }
  if (typeof resource.code !== "string" || resource.code.trim() === "") {
    errors.push("missing code");
  } else {
    if (!canonicalTag(resource.code)) errors.push(`invalid BCP 47 code: ${resource.code}`);
    if (resource.code !== fileCode) errors.push(`file name ${fileCode}.js does not match locale.code ${resource.code}`);
  }
  if (typeof resource.displayName !== "string" || resource.displayName.trim() === "") errors.push("missing displayName");
  if (!["ltr", "rtl"].includes(resource.dir)) errors.push(`invalid dir: ${String(resource.dir)}`);
  if (typeof resource.intlLocale !== "string" || !canonicalTag(resource.intlLocale)) {
    errors.push(`invalid intlLocale: ${String(resource.intlLocale)}`);
  }

  for (const key of ["messages", "terminology"]) {
    if (!resource[key] || typeof resource[key] !== "object" || Array.isArray(resource[key])) errors.push(`missing ${key} object`);
  }
  if (!resource.calendar || typeof resource.calendar !== "object") {
    errors.push("missing calendar object");
  } else {
    if (!resource.calendar.cutlets || typeof resource.calendar.cutlets !== "object") errors.push("missing calendar.cutlets object");
    if (!resource.calendar.months || typeof resource.calendar.months !== "object") errors.push("missing calendar.months object");
  }

  if (errors.length === 0 && baseline) {
    if (!sameKeySet(resource.messages, baseline.messages)) errors.push("message key coverage differs from registered baseline");
    if (!sameKeySet(resource.terminology, baseline.terminology)) errors.push("terminology key coverage differs from registered baseline");
    if (!sameKeySet(resource.calendar.cutlets, baseline.calendar.cutlets)) errors.push("cutlet key coverage differs from registered baseline");
    if (!sameKeySet(resource.calendar.months, baseline.calendar.months)) errors.push("month key coverage differs from registered baseline");

    for (const [groupName, values] of [
      ["messages", resource.messages],
      ["terminology", resource.terminology],
      ["cutlets", resource.calendar.cutlets],
      ["months", resource.calendar.months],
    ]) {
      for (const [key, value] of Object.entries(values)) {
        if (typeof value !== "string" || value.trim() === "") errors.push(`empty/non-string ${groupName}.${key}`);
      }
    }
  }

  if (resource.experimental === true) warnings.push("resource explicitly declares experimental: true");
  if (resource.fallbackLocale && typeof resource.fallbackLocale !== "string") errors.push("fallbackLocale is not a string");
  return { errors, warnings };
}

function parseBreakpoints(cssText) {
  const values = new Set();
  const pattern = /@media\s*\(\s*(?:min|max)-width\s*:\s*(\d+)px\s*\)/gi;
  let match;
  while ((match = pattern.exec(cssText)) !== null) values.add(Number(match[1]));
  return [...values].sort((a, b) => a - b);
}

function breakpointViewports(breakpoints) {
  const widths = new Set();
  for (const breakpoint of breakpoints) {
    for (const width of [breakpoint - 1, breakpoint, breakpoint + 1]) {
      if (width >= 280) widths.add(width);
    }
  }
  return [...widths].sort((a, b) => a - b).map((width) => ({
    label: `breakpoint-${width}`,
    width,
    height: 900,
  }));
}

function mimeType(path) {
  switch (extname(path).toLowerCase()) {
    case ".html": return "text/html; charset=utf-8";
    case ".js": return "text/javascript; charset=utf-8";
    case ".mjs": return "text/javascript; charset=utf-8";
    case ".css": return "text/css; charset=utf-8";
    case ".json": return "application/json; charset=utf-8";
    case ".webmanifest": return "application/manifest+json; charset=utf-8";
    case ".svg": return "image/svg+xml";
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".ico": return "image/x-icon";
    case ".txt": return "text/plain; charset=utf-8";
    default: return "application/octet-stream";
  }
}

async function startStaticServer(rootDir) {
  const canonicalRoot = resolve(rootDir);
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      let pathname;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Bad URL");
        return;
      }
      if (pathname === "/") pathname = "/index.html";
      const normalizedPath = normalize(pathname).replace(/^([/\\])+/, "");
      let filePath = resolve(canonicalRoot, normalizedPath);
      if (filePath !== canonicalRoot && !filePath.startsWith(`${canonicalRoot}${sep}`)) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
      }
      let fileStats;
      try {
        fileStats = await stat(filePath);
      } catch {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        response.end("Not found");
        return;
      }
      if (fileStats.isDirectory()) filePath = join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeType(filePath),
        "Content-Length": body.length,
        "Cache-Control": "no-store, max-age=0",
      });
      if (request.method === "HEAD") response.end();
      else response.end(body);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(`Server error: ${error?.message || error}`);
    }
  });

  await new Promise((resolvePromise, rejectPromise) => {
    server.once("error", rejectPromise);
    server.listen(0, "127.0.0.1", resolvePromise);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not determine audit server address.");
  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}/`,
    close: () => new Promise((resolvePromise, rejectPromise) => {
      server.close((error) => error ? rejectPromise(error) : resolvePromise());
    }),
  };
}

function fixedUrl(baseUrl, language = null, extras = {}) {
  const url = new URL(baseUrl);
  url.searchParams.set("t", FIXED_TARGET_JDN);
  url.searchParams.set("v", FIXED_TARGET_JDN);
  url.searchParams.set("c", FIXED_ACTION_JDN);
  if (language) url.searchParams.set("lang", language);
  for (const [key, value] of Object.entries(extras)) {
    if (value === null || value === undefined) url.searchParams.delete(key);
    else url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function installBrowserEventCollector(page) {
  const tracker = {
    phase: "initialization",
    pageErrors: [],
    consoleErrors: [],
    failedRequests: [],
    badResponses: [],
  };
  page.on("pageerror", (error) => {
    tracker.pageErrors.push({
      phase: tracker.phase,
      message: error?.message || String(error),
      stack: error?.stack || null,
    });
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    tracker.consoleErrors.push({
      phase: tracker.phase,
      message: message.text(),
      location: message.location(),
    });
  });
  page.on("requestfailed", (request) => {
    tracker.failedRequests.push({
      phase: tracker.phase,
      url: request.url(),
      method: request.method(),
      failure: request.failure()?.errorText || "request failed",
    });
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    tracker.badResponses.push({
      phase: tracker.phase,
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
    });
  });
  return tracker;
}

async function waitForCalendar(page, timeout = DEFAULT_TIMEOUT_MS) {
  await page.waitForFunction(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const errorPanel = document.querySelector("#error-panel");
    const grid = document.querySelector("#calendar-grid");
    if (errorPanel && !errorPanel.hidden) return true;
    return Boolean(workspace && !workspace.hidden && grid && grid.querySelectorAll(".day-card").length > 0);
  }, null, { timeout });
}

async function waitForYearStructure(page) {
  try {
    await page.waitForFunction(() => {
      const loading = document.querySelector("#year-overview-loading");
      const error = document.querySelector("#year-overview-error");
      const content = document.querySelector("#year-overview-content");
      return Boolean((loading && loading.hidden) || (error && !error.hidden) || (content && !content.hidden));
    }, null, { timeout: YEAR_STRUCTURE_TIMEOUT_MS });
    return { settled: true };
  } catch {
    return { settled: false, warning: `year structure did not settle within ${YEAR_STRUCTURE_TIMEOUT_MS / 1000}s` };
  }
}

async function browserEngineIdentity(page) {
  return page.evaluate(async ({ targetJdn, calculationJdn }) => {
    const module = await import("./engine/pastafari-fast-worker.js?v=i18n-audit");
    const view = await module.handlePastafariWorkerRequest("getCutletView", {
      targetJdn,
      calculationJdn,
    });
    const selected = view.days[view.selectedIndex];
    return {
      targetJdn: targetJdn,
      calculationJdn: calculationJdn,
      year: String(selected.year),
      cutletIndex: selected.cutletIndex,
      dayInCutlet: selected.dayInCutlet,
      monthIndex: selected.monthIndex,
      dayInMonth: selected.dayInMonth,
      viewStartJdn: String(view.startJdn),
      viewEndJdn: String(view.endJdn),
      viewLength: view.days.length,
    };
  }, { targetJdn: FIXED_TARGET_JDN, calculationJdn: FIXED_ACTION_JDN });
}

async function readPageState(page) {
  const state = await page.evaluate(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const errorPanel = document.querySelector("#error-panel");
    const selector = document.querySelector("#language-selector");
    const targetCard = document.querySelector('#calendar-grid .day-card[data-target="true"]');
    const cards = [...document.querySelectorAll("#calendar-grid .day-card")];
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    const bodyText = document.body?.innerText || "";
    return {
      htmlLang: document.documentElement.lang,
      htmlDir: document.documentElement.dir,
      workspaceHidden: workspace ? workspace.hidden : null,
      errorPanelHidden: errorPanel ? errorPanel.hidden : null,
      errorMessage: document.querySelector("#error-message")?.textContent?.trim() || "",
      selectorValue: selector?.value || null,
      selectorOptions: selector ? [...selector.options].map((option) => ({
        value: option.value,
        text: option.textContent?.trim() || "",
        lang: option.lang || "",
        dir: option.dir || "",
      })) : [],
      cardCount: cards.length,
      firstJdn: cards[0]?.dataset.jdn || null,
      lastJdn: cards[cards.length - 1]?.dataset.jdn || null,
      targetJdn: targetCard?.dataset.jdn || null,
      title: document.title,
      metaDescription,
      bodyText,
    };
  });
  const bodyText = state.bodyText;
  delete state.bodyText;
  state.bodyTextSha256 = sha256Text(bodyText);
  return state;
}

async function scanTranslations(page, messageKeys) {
  return page.evaluate((keys) => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      return !element.hidden && style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
    };
    const untranslated = [];
    const empty = [];

    for (const element of document.querySelectorAll("[data-i18n]")) {
      const key = element.dataset.i18n;
      const value = element.textContent?.trim() || "";
      if (visible(element) && value === key) untranslated.push({ type: "text", key, selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() });
      if (visible(element) && !value) empty.push({ type: "text", key, selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() });
    }

    for (const element of document.querySelectorAll("[data-i18n-attr]")) {
      const bindings = (element.dataset.i18nAttr || "").split(";").map((part) => part.trim()).filter(Boolean);
      for (const binding of bindings) {
        const separator = binding.indexOf(":");
        if (separator <= 0) continue;
        const attribute = binding.slice(0, separator).trim();
        const key = binding.slice(separator + 1).trim();
        const value = element.getAttribute(attribute) || "";
        if (value === key) untranslated.push({ type: "attribute", key, attribute, selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() });
        if (!value.trim()) empty.push({ type: "attribute", key, attribute, selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() });
      }
    }

    const exactKeySet = new Set(keys);
    for (const element of document.querySelectorAll("body *")) {
      if (!visible(element) || element.children.length !== 0) continue;
      const value = element.textContent?.trim() || "";
      if (exactKeySet.has(value) && !untranslated.some((item) => item.key === value)) {
        untranslated.push({ type: "visible-exact-key", key: value, selector: element.id ? `#${element.id}` : element.tagName.toLowerCase() });
      }
    }

    for (const selector of [
      "button",
      "label",
      "h1",
      "h2",
      "h3",
      "#target-marker",
      "#target-date-lines",
      "#target-context",
      "#cutlet-meta",
      "#cutlet-heading",
      "#cutlet-description",
      "#year-overview-heading",
      "#year-overview-context",
    ]) {
      for (const element of document.querySelectorAll(selector)) {
        if (!visible(element)) continue;
        if (!(element.textContent || "").trim()) empty.push({ type: "visible-empty", selector: element.id ? `#${element.id}` : selector });
      }
    }

    const bodyText = document.body?.innerText || "";
    const replacementCharacter = bodyText.includes("\uFFFD");
    const literalEscapes = bodyText.match(/\\(?:u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2})/g) || [];
    return {
      untranslated,
      empty,
      replacementCharacter,
      literalEscapes: [...new Set(literalEscapes)].slice(0, 20),
      titleEmpty: !document.title.trim(),
      metaDescriptionEmpty: !(document.querySelector('meta[name="description"]')?.getAttribute("content") || "").trim(),
    };
  }, messageKeys);
}

async function scanDirections(page, expectedDir) {
  return page.evaluate(({ selectors, expected }) => {
    const findings = [];
    for (const selector of selectors) {
      for (const element of document.querySelectorAll(selector)) {
        const style = getComputedStyle(element);
        if (element.hidden || style.display === "none" || style.visibility === "hidden" || element.getClientRects().length === 0) continue;
        const explicit = element.getAttribute("dir");
        const computed = style.direction;
        if (explicit === "auto") continue;
        if (computed !== expected) {
          findings.push({
            selector: element.id ? `#${element.id}` : selector,
            expected,
            computed,
            explicitDir: explicit,
          });
        }
      }
    }
    return findings;
  }, { selectors: DIRECTION_CHECK_SELECTORS, expected: expectedDir });
}

async function scanLayout(page, viewport) {
  return page.evaluate(({ selectors, allowlist, viewportInfo }) => {
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      return !element.hidden && style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
    };
    const describe = (element, fallback) => {
      if (element.id) return `#${element.id}`;
      const dataI18n = element.getAttribute("data-i18n");
      if (dataI18n) return `${element.tagName.toLowerCase()}[data-i18n="${dataI18n}"]`;
      const classes = [...element.classList].slice(0, 3).join(".");
      return classes ? `${element.tagName.toLowerCase()}.${classes}` : fallback || element.tagName.toLowerCase();
    };
    const isAllowedScrollable = (element) => allowlist.some((selector) => element.matches(selector));
    const findings = [];
    const seen = new Set();

    const rootOverflow = document.documentElement.scrollWidth - window.innerWidth;
    if (rootOverflow > 2) {
      findings.push({
        severity: rootOverflow > 8 ? "FAIL" : "WARN",
        type: "document-horizontal-overflow",
        selector: "html",
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        overflowX: rootOverflow,
        overflowY: 0,
        text: "",
      });
    }

    for (const selector of selectors) {
      for (const element of document.querySelectorAll(selector)) {
        if (!isVisible(element) || isAllowedScrollable(element)) continue;
        const key = describe(element, selector);
        const identity = `${key}|${element.getBoundingClientRect().top}|${element.textContent?.slice(0, 20) || ""}`;
        if (seen.has(identity)) continue;
        seen.add(identity);
        const clientWidth = element.clientWidth;
        const clientHeight = element.clientHeight;
        if (clientWidth <= 0 || clientHeight <= 0) continue;
        const overflowX = element.scrollWidth - clientWidth;
        const overflowY = element.scrollHeight - clientHeight;
        const style = getComputedStyle(element);
        const hiddenX = style.overflowX === "hidden" || style.overflowX === "clip";
        const hiddenY = style.overflowY === "hidden" || style.overflowY === "clip";
        const visibleY = style.overflowY === "visible";
        const rect = element.getBoundingClientRect();
        const interactive = ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"].includes(element.tagName);
        const boundaryClip = interactive && (rect.left < -2 || rect.right > window.innerWidth + 2);
        // Small scrollHeight/clientHeight differences with overflow-y:visible are commonly
        // font/glyph line-box metrics rather than clipping. Keep horizontal overflow visible,
        // because children extending sideways can still break the layout.
        const reportX = overflowX > 2;
        const reportY = overflowY > 2 && !visibleY;
        if (reportX || reportY || boundaryClip) {
          findings.push({
            severity: ((hiddenX && reportX) || (hiddenY && reportY) || boundaryClip) ? "FAIL" : "WARN",
            type: boundaryClip ? "viewport-clipping" : "element-overflow",
            selector: key,
            clientWidth,
            clientHeight,
            scrollWidth: element.scrollWidth,
            scrollHeight: element.scrollHeight,
            overflowX,
            overflowY,
            cssOverflowX: style.overflowX,
            cssOverflowY: style.overflowY,
            rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom },
            text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 180),
          });
        }
      }
    }
    return { viewport: viewportInfo, findings };
  }, { selectors: IMPORTANT_LAYOUT_SELECTORS, allowlist: INTENTIONAL_SCROLL_SELECTORS, viewportInfo: viewport });
}

async function takeScreenshot(page, code, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  const fileName = `${safeFileComponent(code)}-${safeFileComponent(viewport.label)}.png`;
  const absolutePath = join(SCREENSHOT_DIR, fileName);
  const buffer = await page.screenshot({ path: absolutePath, fullPage: false, animations: "disabled" });
  const fileStats = await stat(absolutePath);
  if (buffer.length < 1000 || fileStats.size < 1000) throw new Error(`Screenshot appears empty: ${fileName}`);
  return {
    path: `screenshots/${fileName}`,
    bytes: fileStats.size,
    width: viewport.width,
    height: viewport.height,
  };
}

function finding(severity, category, message, details = {}) {
  return { severity, category, message, ...details };
}

function summarizeFindings(findings) {
  if (findings.some((item) => item.severity === "FAIL")) return "FAIL";
  if (findings.some((item) => item.severity === "WARN")) return "WARN";
  return "PASS";
}

function addEventFindings(result, tracker, localeCode) {
  for (const item of tracker.pageErrors) result.findings.push(finding("FAIL", "pageerror", item.message, { locale: localeCode, ...item }));
  for (const item of tracker.consoleErrors) result.findings.push(finding("FAIL", "console.error", item.message, { locale: localeCode, ...item }));
  for (const item of tracker.failedRequests) result.findings.push(finding("FAIL", "requestfailed", item.failure, { locale: localeCode, ...item }));
  for (const item of tracker.badResponses) result.findings.push(finding("FAIL", "http-error", `${item.status} ${item.statusText}`, { locale: localeCode, ...item }));
}

async function discoverSelector(browser, baseUrl, defaultLocale) {
  const context = await browser.newContext({ viewport: { width: 1000, height: 800 }, locale: defaultLocale?.intlLocale || "en-US" });
  const page = await context.newPage();
  const tracker = installBrowserEventCollector(page);
  try {
    tracker.phase = "selector-discovery";
    await page.goto(fixedUrl(baseUrl, defaultLocale?.code || null), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const state = await readPageState(page);
    return { options: state.selectorOptions, state, tracker, error: null };
  } catch (error) {
    return { options: [], state: null, tracker, error: error?.stack || String(error) };
  } finally {
    await context.close();
  }
}

async function auditDirectLocale({ browser, baseUrl, locale, resource, breakpoints, screenshots, comparisonRepresentative }) {
  const result = {
    code: locale.code,
    classification: "active",
    registered: true,
    selectorPresent: null,
    dir: locale.dir,
    intlLocale: locale.intlLocale,
    displayName: locale.displayName,
    status: "FAIL",
    completed: false,
    basic: null,
    engineIdentity: null,
    translationScan: null,
    directionFindings: [],
    layout: [],
    screenshots: [],
    switchLanguage: null,
    persistence: null,
    smoke: null,
    findings: [],
    notes: ["Glyph shape/translation quality is not machine-validated; screenshots are for human review."],
  };

  const context = await browser.newContext({
    viewport: { width: VIEWPORTS[0].width, height: VIEWPORTS[0].height },
    locale: locale.intlLocale || locale.code,
  });
  const page = await context.newPage();
  const tracker = installBrowserEventCollector(page);

  try {
    tracker.phase = "direct-load";
    await page.goto(fixedUrl(baseUrl, locale.code), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const yearWait = await waitForYearStructure(page);
    if (!yearWait.settled) result.findings.push(finding("WARN", "year-structure", yearWait.warning));

    result.basic = await readPageState(page);
    result.selectorPresent = result.basic.selectorOptions.some((option) => option.value === locale.code);
    if (result.basic.workspaceHidden !== false) result.findings.push(finding("FAIL", "load", "#calendar-workspace is hidden after load"));
    if (result.basic.cardCount < 1) result.findings.push(finding("FAIL", "load", "#calendar-grid contains no day cards"));
    if (result.basic.errorPanelHidden !== true) result.findings.push(finding("FAIL", "load", "#error-panel is visible", { errorMessage: result.basic.errorMessage }));
    if (result.basic.selectorValue !== locale.code) result.findings.push(finding("FAIL", "selector", `selector value is ${result.basic.selectorValue}, expected ${locale.code}`));
    if (result.basic.htmlLang !== locale.code) result.findings.push(finding("FAIL", "lang", `<html lang> is ${result.basic.htmlLang}, expected ${locale.code}`));
    if (result.basic.htmlDir !== locale.dir) result.findings.push(finding("FAIL", "direction", `<html dir> is ${result.basic.htmlDir}, expected ${locale.dir}`));

    tracker.phase = "engine-identity";
    result.engineIdentity = await browserEngineIdentity(page);

    tracker.phase = "translation-scan";
    result.translationScan = await scanTranslations(page, Object.keys(resource.messages));
    for (const item of result.translationScan.untranslated) result.findings.push(finding("FAIL", "untranslated-key", `Visible translation key: ${item.key}`, item));
    for (const item of result.translationScan.empty) result.findings.push(finding("FAIL", "missing-text", "Visible translated UI element/attribute is empty", item));
    if (result.translationScan.replacementCharacter) result.findings.push(finding("FAIL", "replacement-character", "Visible text contains U+FFFD replacement character"));
    if (result.translationScan.literalEscapes.length) result.findings.push(finding("WARN", "literal-escape", "Visible text contains literal escape sequence(s)", { escapes: result.translationScan.literalEscapes }));
    if (result.translationScan.titleEmpty) result.findings.push(finding("FAIL", "missing-text", "Document title is empty"));
    if (result.translationScan.metaDescriptionEmpty) result.findings.push(finding("WARN", "missing-text", "Meta description is empty"));

    tracker.phase = "direction-scan";
    result.directionFindings = await scanDirections(page, locale.dir);
    for (const item of result.directionFindings) result.findings.push(finding("WARN", "direction-container", `Computed direction ${item.computed} differs from document direction ${item.expected}`, item));

    for (const viewport of VIEWPORTS) {
      tracker.phase = `layout-${viewport.label}`;
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.evaluate(() => window.scrollTo(0, 0));
      const layout = await scanLayout(page, viewport);
      result.layout.push(layout);
      if (screenshots) {
        const shot = await takeScreenshot(page, locale.code, viewport);
        result.screenshots.push(shot);
        for (const item of layout.findings) item.screenshot = shot.path;
      }
      for (const item of layout.findings) result.findings.push(finding(item.severity, "layout", `${item.type} at ${item.selector}`, item));
    }

    for (const viewport of breakpointViewports(breakpoints)) {
      tracker.phase = `layout-${viewport.label}`;
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const layout = await scanLayout(page, viewport);
      if (layout.findings.length) {
        if (screenshots) {
          const shot = await takeScreenshot(page, locale.code, viewport);
          result.screenshots.push(shot);
          for (const item of layout.findings) item.screenshot = shot.path;
        }
        result.layout.push(layout);
        for (const item of layout.findings) result.findings.push(finding(item.severity, "breakpoint-layout", `${item.type} at ${item.selector} around CSS breakpoint`, item));
      }
    }

    tracker.phase = "switch-language";
    result.switchLanguage = await testLanguageSwitch(browser, baseUrl, locale);
    for (const item of result.switchLanguage.findings) result.findings.push(item);

    tracker.phase = "persistence";
    result.persistence = await testPersistence(browser, baseUrl, locale);
    for (const item of result.persistence.findings) result.findings.push(item);

    tracker.phase = "post-switch-smoke";
    result.smoke = await testPostSwitchSmoke(browser, baseUrl, locale, comparisonRepresentative);
    for (const item of result.smoke.findings) result.findings.push(item);
  } catch (error) {
    result.findings.push(finding("FAIL", "audit-exception", error?.message || String(error), { stack: error?.stack || null, phase: tracker.phase }));
  } finally {
    addEventFindings(result, tracker, locale.code);
    await context.close();
  }

  result.status = summarizeFindings(result.findings);
  result.completed = true;
  return result;
}

async function testLanguageSwitch(browser, baseUrl, targetLocale) {
  const findings = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: "en-US" });
  const page = await context.newPage();
  const tracker = installBrowserEventCollector(page);
  try {
    tracker.phase = "switch-baseline";
    await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const beforeState = await readPageState(page);
    const beforeEngine = await browserEngineIdentity(page);
    const defaultCode = beforeState.selectorValue;

    tracker.phase = "switch-select";
    const option = page.locator(`#language-selector option[value="${targetLocale.code.replace(/"/g, '\\"')}"]`);
    if (await option.count() === 0) {
      findings.push(finding("FAIL", "switch-language", `Locale ${targetLocale.code} is not present in #language-selector`));
      return { ok: false, defaultCode, beforeState, afterState: null, beforeEngine, afterEngine: null, findings };
    }
    await page.selectOption("#language-selector", targetLocale.code);
    await page.waitForFunction((code) => document.documentElement.lang === code, targetLocale.code, { timeout: 20_000 });
    await page.waitForTimeout(100);
    const afterState = await readPageState(page);
    const afterEngine = await browserEngineIdentity(page);

    const representationChanged = defaultCode === targetLocale.code || beforeState.bodyTextSha256 !== afterState.bodyTextSha256;
    const identicalFallbackAllowed = (
      !representationChanged
      && targetLocale.experimental === true
      && targetLocale.fallbackLocale === defaultCode
    );
    if (!representationChanged && !identicalFallbackAllowed) {
      findings.push(finding("FAIL", "switch-language", "Visible page text did not change after changing to a different locale"));
    }
    if (afterState.htmlLang !== targetLocale.code) findings.push(finding("FAIL", "switch-language", `html lang became ${afterState.htmlLang}, expected ${targetLocale.code}`));
    if (afterState.htmlDir !== targetLocale.dir) findings.push(finding("FAIL", "switch-language", `html dir became ${afterState.htmlDir}, expected ${targetLocale.dir}`));
    if (afterState.workspaceHidden !== false || afterState.cardCount < 1) findings.push(finding("FAIL", "switch-language", "Calendar stopped being visible after locale switch"));
    if (JSON.stringify(beforeEngine) !== JSON.stringify(afterEngine)) {
      findings.push(finding("FAIL", "locale-invariance", "Fast-engine date identity changed after locale switch", { beforeEngine, afterEngine }));
    }
    if (beforeState.targetJdn !== afterState.targetJdn || beforeState.firstJdn !== afterState.firstJdn || beforeState.lastJdn !== afterState.lastJdn || beforeState.cardCount !== afterState.cardCount) {
      findings.push(finding("FAIL", "locale-invariance", "Rendered JDN/cutlet identity changed after locale switch", {
        before: { targetJdn: beforeState.targetJdn, firstJdn: beforeState.firstJdn, lastJdn: beforeState.lastJdn, cardCount: beforeState.cardCount },
        after: { targetJdn: afterState.targetJdn, firstJdn: afterState.firstJdn, lastJdn: afterState.lastJdn, cardCount: afterState.cardCount },
      }));
    }
    addTrackerEventsAsFindings(findings, tracker, targetLocale.code, "switch-language");
    return {
      ok: !findings.some((item) => item.severity === "FAIL"),
      defaultCode,
      before: { state: beforeState, engine: beforeEngine },
      after: { state: afterState, engine: afterEngine },
      representationChanged,
      identicalFallbackAllowed,
      findings,
    };
  } catch (error) {
    findings.push(finding("FAIL", "switch-language", error?.message || String(error), { stack: error?.stack || null, phase: tracker.phase }));
    addTrackerEventsAsFindings(findings, tracker, targetLocale.code, "switch-language");
    return { ok: false, findings };
  } finally {
    await context.close();
  }
}

function addTrackerEventsAsFindings(findings, tracker, localeCode, categoryPrefix) {
  for (const item of tracker.pageErrors) findings.push(finding("FAIL", `${categoryPrefix}/pageerror`, item.message, { locale: localeCode, ...item }));
  for (const item of tracker.consoleErrors) findings.push(finding("FAIL", `${categoryPrefix}/console.error`, item.message, { locale: localeCode, ...item }));
  for (const item of tracker.failedRequests) findings.push(finding("FAIL", `${categoryPrefix}/requestfailed`, item.failure, { locale: localeCode, ...item }));
  for (const item of tracker.badResponses) findings.push(finding("FAIL", `${categoryPrefix}/http-error`, `${item.status} ${item.statusText}`, { locale: localeCode, ...item }));
}

async function testPersistence(browser, baseUrl, targetLocale) {
  const findings = [];
  const context = await browser.newContext({ viewport: { width: 1000, height: 800 }, locale: "en-US" });
  let page = await context.newPage();
  const tracker = installBrowserEventCollector(page);
  try {
    tracker.phase = "persistence-select";
    await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    if (await page.locator(`#language-selector option[value="${targetLocale.code.replace(/"/g, '\\"')}"]`).count() === 0) {
      findings.push(finding("FAIL", "persistence", `Locale ${targetLocale.code} cannot be selected because it is absent from selector`));
      return { ok: false, findings };
    }
    await page.selectOption("#language-selector", targetLocale.code);
    await page.waitForFunction((code) => document.documentElement.lang === code, targetLocale.code, { timeout: 20_000 });
    const saved = await page.evaluate(() => localStorage.getItem("pastafari.language"));
    if (saved !== targetLocale.code) findings.push(finding("FAIL", "persistence", `localStorage saved ${saved}, expected ${targetLocale.code}`));

    tracker.phase = "persistence-reload";
    await page.reload({ waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const reloadState = await readPageState(page);
    if (reloadState.htmlLang !== targetLocale.code) findings.push(finding("FAIL", "persistence", `Reload active locale ${reloadState.htmlLang}, expected ${targetLocale.code}`));

    tracker.phase = "persistence-no-url";
    await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const savedState = await readPageState(page);
    if (savedState.htmlLang !== targetLocale.code) findings.push(finding("FAIL", "persistence", `Saved locale did not win when URL had no lang; got ${savedState.htmlLang}`));

    tracker.phase = "persistence-new-page";
    page = await context.newPage();
    const newPageTracker = installBrowserEventCollector(page);
    newPageTracker.phase = "persistence-new-page";
    await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    const newPageState = await readPageState(page);
    if (newPageState.htmlLang !== targetLocale.code) findings.push(finding("FAIL", "persistence", `New page in same context did not preserve saved locale; got ${newPageState.htmlLang}`));

    const selectorOptions = newPageState.selectorOptions.map((option) => option.value);
    const other = selectorOptions.find((code) => code !== targetLocale.code) || null;
    let urlOverride = null;
    if (other) {
      newPageTracker.phase = "persistence-url-priority";
      await page.goto(fixedUrl(baseUrl, other), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
      await waitForCalendar(page);
      const overrideState = await readPageState(page);
      const savedAfterOverride = await page.evaluate(() => localStorage.getItem("pastafari.language"));
      urlOverride = { requested: other, active: overrideState.htmlLang, savedAfterOverride };
      if (overrideState.htmlLang !== other) findings.push(finding("FAIL", "persistence-priority", `URL locale ${other} did not override saved locale ${targetLocale.code}`));
      if (savedAfterOverride !== targetLocale.code) findings.push(finding("FAIL", "persistence-priority", "URL override overwrote saved explicit preference", { savedAfterOverride, expected: targetLocale.code }));
    }

    addTrackerEventsAsFindings(findings, tracker, targetLocale.code, "persistence");
    addTrackerEventsAsFindings(findings, newPageTracker, targetLocale.code, "persistence");
    return {
      ok: !findings.some((item) => item.severity === "FAIL"),
      saved,
      reloadActive: reloadState.htmlLang,
      noUrlActive: savedState.htmlLang,
      newPageActive: newPageState.htmlLang,
      urlOverride,
      findings,
    };
  } catch (error) {
    findings.push(finding("FAIL", "persistence", error?.message || String(error), { stack: error?.stack || null, phase: tracker.phase }));
    addTrackerEventsAsFindings(findings, tracker, targetLocale.code, "persistence");
    return { ok: false, findings };
  } finally {
    await context.close();
  }
}

async function waitForGridChange(page, oldFirstJdn) {
  await page.waitForFunction((previous) => {
    const first = document.querySelector("#calendar-grid .day-card")?.dataset.jdn;
    return first && first !== previous;
  }, oldFirstJdn, { timeout: DEFAULT_TIMEOUT_MS });
}

async function setFormControlValue(page, selector, value) {
  const control = page.locator(selector);
  const kind = await control.evaluate((element) => ({
    tagName: element.tagName.toLowerCase(),
    contentEditable: element.isContentEditable,
  }));
  if (kind.tagName === "select") {
    await control.selectOption(String(value));
    return;
  }
  if (kind.tagName === "input" || kind.tagName === "textarea" || kind.contentEditable) {
    await control.fill(String(value));
    return;
  }
  throw new TypeError(`Unsupported form control for ${selector}: ${kind.tagName}`);
}

async function testPostSwitchSmoke(browser, baseUrl, locale, comparisonRepresentative) {
  const findings = [];
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: locale.intlLocale || locale.code });
  const page = await context.newPage();
  const tracker = installBrowserEventCollector(page);
  try {
    tracker.phase = "smoke-load";
    await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
    await waitForCalendar(page);
    await page.selectOption("#language-selector", locale.code);
    await page.waitForFunction((code) => document.documentElement.lang === code, locale.code, { timeout: 20_000 });
    const before = await readPageState(page);

    tracker.phase = "smoke-previous";
    await page.click("#previous-cutlet");
    await waitForGridChange(page, before.firstJdn);
    const previous = await readPageState(page);

    tracker.phase = "smoke-next";
    await page.click("#next-cutlet");
    await waitForGridChange(page, previous.firstJdn);

    tracker.phase = "smoke-search";
    await page.selectOption("#target-calendar", "gregorian");
    const expectedSearchJdn = await page.evaluate(async ({ year, month, day }) => {
      const converters = await import("./calendar-converters.js");
      return converters.gregorianToJdn({ year: BigInt(year), month: Number(month), day: Number(day) }).toString();
    }, FIXED_SEARCH_DATE);
    await setFormControlValue(page, "#target-year", FIXED_SEARCH_DATE.year);
    await setFormControlValue(page, "#target-month", FIXED_SEARCH_DATE.month);
    await setFormControlValue(page, "#target-day", FIXED_SEARCH_DATE.day);
    await page.click('#target-search-form button[type="submit"]');
    await page.waitForFunction((expectedJdn) => {
      const target = document.querySelector('#calendar-grid .day-card[data-target="true"]');
      return target?.dataset.jdn === expectedJdn;
    }, expectedSearchJdn, { timeout: DEFAULT_TIMEOUT_MS });
    const afterSearch = await readPageState(page);
    if (afterSearch.targetJdn !== expectedSearchJdn) {
      findings.push(finding("FAIL", "smoke-search", `Fixed Gregorian search rendered JDN ${afterSearch.targetJdn}, expected ${expectedSearchJdn}`));
    }

    tracker.phase = "smoke-settings";
    const settings = page.locator("#calculation-settings");
    if (!(await settings.evaluate((element) => element.open))) await page.click("#calculation-settings > summary");
    if (!(await settings.evaluate((element) => element.open))) findings.push(finding("FAIL", "smoke-settings", "Calculation settings did not open"));

    let comparison = null;
    if (comparisonRepresentative) {
      tracker.phase = "smoke-comparison";
      const checkbox = page.locator("#comparison-toggle");
      if (!(await checkbox.isChecked())) await checkbox.check();
      await page.waitForFunction(() => {
        const workspace = document.querySelector("#comparison-workspace");
        const body = document.querySelector("#comparison-body");
        return Boolean(workspace && !workspace.hidden && body && body.children.length > 0);
      }, null, { timeout: DEFAULT_TIMEOUT_MS });
      const comparisonDirection = await page.evaluate(() => getComputedStyle(document.querySelector(".comparison-scroll")).direction);
      if (comparisonDirection !== locale.dir) findings.push(finding("WARN", "direction-container", `Comparison table computed direction ${comparisonDirection}, expected ${locale.dir}`));
      comparison = { renderedRows: await page.locator("#comparison-body > tr").count(), direction: comparisonDirection };
    }

    const finalState = await readPageState(page);
    if (finalState.workspaceHidden !== false || finalState.errorPanelHidden !== true) findings.push(finding("FAIL", "smoke", "Calendar is not healthy after user-action smoke sequence"));
    addTrackerEventsAsFindings(findings, tracker, locale.code, "smoke");
    return {
      ok: !findings.some((item) => item.severity === "FAIL"),
      searchedTargetJdn: afterSearch.targetJdn,
      comparison,
      findings,
    };
  } catch (error) {
    findings.push(finding("FAIL", "smoke", error?.message || String(error), { stack: error?.stack || null, phase: tracker.phase }));
    addTrackerEventsAsFindings(findings, tracker, locale.code, "smoke");
    return { ok: false, searchedTargetJdn: null, findings };
  } finally {
    await context.close();
  }
}

async function testBrowserLanguageResolution(browser, baseUrl, registry) {
  const cases = [];
  const registered = registry.LOCALES;
  const defaultCode = registry.DEFAULT_LOCALE;
  const unsupportedCandidates = ["qaa", "qab", "und-x-audit"];
  const unsupported = unsupportedCandidates.find((tag) => {
    try {
      return canonicalTag(tag) && !registry.matchSupportedLocale(tag);
    } catch {
      return false;
    }
  }) || "qaa";

  for (const locale of registered) {
    cases.push({ name: `exact-${locale.code}`, languages: [locale.code], expected: registry.resolveLocale({ browserLanguages: [locale.code] }).locale.code });
    const regional = `${locale.code}-ZZ`;
    if (canonicalTag(regional)) cases.push({ name: `regional-${locale.code}`, languages: [regional], expected: registry.resolveLocale({ browserLanguages: [regional] }).locale.code });
  }
  cases.push({ name: "unsupported", languages: [unsupported], expected: defaultCode });
  if (registered.length) cases.push({ name: "unsupported-then-supported", languages: [unsupported, registered[0].code], expected: registered[0].code });
  cases.push({ name: "invalid", languages: ["%%%"], expected: defaultCode });

  const results = [];
  for (const testCase of cases) {
    const context = await browser.newContext({ viewport: { width: 900, height: 700 }, locale: "en-US" });
    await context.addInitScript((languages) => {
      try { Object.defineProperty(Navigator.prototype, "languages", { configurable: true, get: () => [...languages] }); } catch {}
      try { Object.defineProperty(Navigator.prototype, "language", { configurable: true, get: () => languages[0] || "en-US" }); } catch {}
    }, testCase.languages);
    const page = await context.newPage();
    const tracker = installBrowserEventCollector(page);
    const findings = [];
    try {
      tracker.phase = `browser-language-${testCase.name}`;
      await page.goto(fixedUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: DEFAULT_TIMEOUT_MS });
      await waitForCalendar(page);
      const state = await readPageState(page);
      if (state.htmlLang !== testCase.expected) findings.push(finding("FAIL", "browser-language", `Case ${testCase.name}: got ${state.htmlLang}, expected ${testCase.expected}`, { languages: testCase.languages }));
      addTrackerEventsAsFindings(findings, tracker, state.htmlLang || "unknown", "browser-language");
      results.push({ ...testCase, active: state.htmlLang, ok: !findings.some((item) => item.severity === "FAIL"), findings });
    } catch (error) {
      findings.push(finding("FAIL", "browser-language", error?.message || String(error), { case: testCase.name, stack: error?.stack || null }));
      addTrackerEventsAsFindings(findings, tracker, "unknown", "browser-language");
      results.push({ ...testCase, active: null, ok: false, findings });
    } finally {
      await context.close();
    }
  }
  return results;
}

function measureStrings(resource) {
  const entries = [];
  for (const [key, value] of Object.entries(resource.messages || {})) {
    if (typeof value === "string") entries.push({ group: "messages", key, value, length: [...value].length });
  }
  for (const [key, value] of Object.entries(resource.calendar?.cutlets || {})) {
    if (typeof value === "string") entries.push({ group: "cutlets", key, value, length: [...value].length });
  }
  for (const [key, value] of Object.entries(resource.calendar?.months || {})) {
    if (typeof value === "string") entries.push({ group: "months", key, value, length: [...value].length });
  }
  entries.sort((a, b) => b.length - a.length);
  return {
    maxLength: entries[0]?.length || 0,
    longest: entries.slice(0, 10),
  };
}

function selectComparisonRepresentatives(registeredResources) {
  const values = [...registeredResources.values()];
  const codes = new Set();
  const rtl = values.find(({ locale }) => locale.dir === "rtl");
  const ltr = values.find(({ locale }) => locale.dir === "ltr");
  if (rtl) codes.add(rtl.locale.code);
  if (ltr) codes.add(ltr.locale.code);
  let longest = null;
  for (const entry of values) {
    const metric = measureStrings(entry.resource).maxLength;
    if (!longest || metric > longest.metric) longest = { code: entry.locale.code, metric };
  }
  if (longest) codes.add(longest.code);
  return codes;
}

async function importModuleFresh(path) {
  return import(`${pathToFileURL(path).href}?i18nAudit=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function discoverResources(registry) {
  const files = (await readdir(LOCALES_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"));
  const baseline = registry.LOCALES[0] || null;
  const registeredCodes = new Set(registry.LOCALES.map((locale) => locale.code));
  const resources = {};
  const resourcesByCode = new Map();

  for (const fileName of files) {
    const fileCode = fileName.slice(0, -3);
    const path = join(LOCALES_DIR, fileName);
    const source = await readFile(path, "utf8");
    const record = {
      file: `docs/i18n/locales/${fileName}`,
      fileCode,
      importOk: false,
      code: null,
      meta: null,
      classification: "invalid-resource",
      registered: false,
      status: "FAIL",
      errors: [],
      warnings: [],
      sourceSha256: sha256Text(source),
      explicitExperimentalEvidence: /\bexperimental\s*:\s*true\b/.test(source) || /\bexperimental\b/i.test(source.split(/\r?\n/).slice(0, 20).join("\n")),
      stringMetrics: null,
    };
    try {
      const namespace = await importModuleFresh(path);
      const resource = namespace.default;
      record.importOk = true;
      record.code = resource?.code || null;
      record.meta = localeMeta(resource);
      record.registered = registeredCodes.has(resource?.code);
      const validation = validateResourceShape(resource, baseline, fileCode);
      record.errors.push(...validation.errors);
      record.warnings.push(...validation.warnings);
      record.stringMetrics = resource && typeof resource === "object" ? measureStrings(resource) : null;
      if (record.errors.length) {
        record.classification = "invalid-resource";
        record.status = "FAIL";
      } else if (record.registered) {
        record.classification = "active";
        record.status = "PASS";
      } else if (resource.experimental === true || record.explicitExperimentalEvidence) {
        record.classification = "intentionally-partial/experimental";
        record.status = "WARN";
      } else {
        record.classification = "valid-but-unregistered";
        record.status = "WARN";
      }
      if (resource?.code) {
        if (!resourcesByCode.has(resource.code)) resourcesByCode.set(resource.code, []);
        resourcesByCode.get(resource.code).push({ fileName, resource, record });
      }
    } catch (error) {
      record.errors.push(error?.stack || String(error));
    }
    resources[fileCode] = record;
  }

  return { files, resources, resourcesByCode };
}

function buildDiscoveryFindings({ fileRecords, registry, selectorOptions }) {
  const findings = [];
  const fileCodes = Object.values(fileRecords).map((record) => record.code || record.fileCode);
  const registeredCodes = registry.LOCALES.map((locale) => locale.code);
  const selectorCodes = selectorOptions.map((option) => option.value);
  const fileSet = new Set(fileCodes);
  const registeredSet = new Set(registeredCodes);
  const selectorSet = new Set(selectorCodes);

  for (const code of fileCodes) {
    if (!registeredSet.has(code)) {
      const record = Object.values(fileRecords).find((item) => (item.code || item.fileCode) === code);
      findings.push(finding(record?.status === "FAIL" ? "FAIL" : "WARN", "discovery", "locale file exists but is not registered", {
        code,
        classification: record?.classification || null,
      }));
    }
  }
  for (const code of registeredCodes) {
    if (!fileSet.has(code)) findings.push(finding("FAIL", "discovery", "registered locale has no locale file", { code }));
    if (!selectorSet.has(code)) findings.push(finding("FAIL", "discovery", "registered locale is absent from language selector", { code }));
  }
  for (const code of selectorCodes) {
    const resource = Object.values(fileRecords).find((record) => (record.code || record.fileCode) === code);
    if (!resource || resource.status === "FAIL") findings.push(finding("FAIL", "discovery", "selector option has no valid locale resource", { code }));
    if (!registeredSet.has(code)) findings.push(finding("FAIL", "discovery", "selector contains locale that is not registered", { code }));
  }

  for (const duplicate of duplicateValues(fileCodes)) findings.push(finding("FAIL", "discovery", "duplicate locale code across locale files", duplicate));
  for (const duplicate of duplicateValues(registeredCodes)) findings.push(finding("FAIL", "discovery", "duplicate locale code in registry", duplicate));
  for (const duplicate of duplicateValues(selectorCodes)) findings.push(finding("FAIL", "selector", "duplicate option value in language selector", duplicate));
  for (const option of selectorOptions) {
    if (!option.text) findings.push(finding("FAIL", "selector", "language selector option has an empty displayed name", { code: option.value }));
  }

  return {
    files: fileCodes,
    registered: registeredCodes,
    selector: selectorCodes,
    fileNotRegistered: fileCodes.filter((code) => !registeredSet.has(code)),
    registeredNotSelector: registeredCodes.filter((code) => !selectorSet.has(code)),
    selectorWithoutFile: selectorCodes.filter((code) => !fileSet.has(code)),
    findings,
  };
}

function mergeGlobalInvarianceFindings(report) {
  const activeResults = Object.values(report.locales).filter((result) => result.classification === "active" && result.completed);
  const directIdentities = activeResults.filter((result) => result.engineIdentity).map((result) => ({ code: result.code, identity: result.engineIdentity }));
  if (directIdentities.length > 1) {
    const baseline = JSON.stringify(directIdentities[0].identity);
    for (const entry of directIdentities.slice(1)) {
      if (JSON.stringify(entry.identity) !== baseline) {
        report.globalFindings.push(finding("FAIL", "locale-invariance", "Fixed fast-engine identity differs between active locales", {
          baselineLocale: directIdentities[0].code,
          baselineIdentity: directIdentities[0].identity,
          locale: entry.code,
          identity: entry.identity,
        }));
      }
    }
  }

  const searchResults = activeResults
    .filter((result) => result.smoke?.searchedTargetJdn)
    .map((result) => ({ code: result.code, jdn: result.smoke.searchedTargetJdn }));
  if (searchResults.length > 1) {
    const expected = searchResults[0].jdn;
    for (const entry of searchResults.slice(1)) {
      if (entry.jdn !== expected) report.globalFindings.push(finding("FAIL", "locale-invariance", "Same fixed Gregorian search resolved to different JDN across locales", { expectedLocale: searchResults[0].code, expectedJdn: expected, locale: entry.code, actualJdn: entry.jdn }));
    }
  }
}

function calculateSummary(report) {
  const localeResults = Object.values(report.locales);
  const counts = { PASS: 0, WARN: 0, FAIL: 0 };
  for (const result of localeResults) {
    if (counts[result.status] !== undefined) counts[result.status] += 1;
  }
  for (const resource of Object.values(report.resources)) {
    if (report.locales[resource.code || resource.fileCode]) continue;
    if (counts[resource.status] !== undefined) counts[resource.status] += 1;
  }
  const allFindings = [
    ...report.globalFindings,
    ...localeResults.flatMap((result) => result.findings || []),
  ];
  return {
    localeFilesFound: report.discovery.files.length,
    registeredLocales: report.discovery.registered.length,
    selectorLocales: report.discovery.selector.length,
    fullyPassedLocales: localeResults.filter((result) => result.classification === "active" && result.status === "PASS").length,
    failedActiveLocales: localeResults.filter((result) => result.classification === "active" && result.status === "FAIL").length,
    unregisteredResources: report.discovery.fileNotRegistered.length,
    runtimeErrors: allFindings.filter((item) => ["pageerror", "console.error", "requestfailed", "http-error"].some((name) => item.category?.includes(name))).length,
    layoutFindings: allFindings.filter((item) => item.category?.includes("layout")).length,
    statusCounts: counts,
    globalStatus: allFindings.some((item) => item.severity === "FAIL") || counts.FAIL > 0 ? "FAIL" : allFindings.some((item) => item.severity === "WARN") || counts.WARN > 0 ? "WARN" : "PASS",
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mdEscape(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function reportMarkdown(report) {
  const lines = [];
  lines.push("# Pastafari i18n browser audit");
  lines.push("");
  lines.push(`- Generated: ${report.completedAt || report.generatedAt}`);
  lines.push(`- Commit: \`${report.commit}\``);
  lines.push(`- Browser: \`${report.options.browser}\``);
  lines.push(`- Scope: ${report.options.requestedLocales.length ? report.options.requestedLocales.map((code) => `\`${code}\``).join(", ") : "all locale files / all active locales"}`);
  lines.push(`- Global status: **${report.summary.globalStatus}**`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Locale files found: **${report.summary.localeFilesFound}**`);
  lines.push(`- Registered locales: **${report.summary.registeredLocales}**`);
  lines.push(`- Selector locales: **${report.summary.selectorLocales}**`);
  lines.push(`- Fully passed active locales: **${report.summary.fullyPassedLocales}**`);
  lines.push(`- Failed active locales: **${report.summary.failedActiveLocales}**`);
  lines.push(`- Unregistered resources: **${report.summary.unregisteredResources}**`);
  lines.push(`- Runtime/network errors: **${report.summary.runtimeErrors}**`);
  lines.push(`- Layout findings: **${report.summary.layoutFindings}**`);
  lines.push(`- PASS/WARN/FAIL: **${report.summary.statusCounts.PASS}/${report.summary.statusCounts.WARN}/${report.summary.statusCounts.FAIL}**`);
  lines.push("");
  lines.push("## Discovery");
  lines.push("");
  lines.push(`- Files: ${report.discovery.files.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- Registered: ${report.discovery.registered.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- Selector: ${report.discovery.selector.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- File exists but not registered: ${report.discovery.fileNotRegistered.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- Registered but absent from selector: ${report.discovery.registeredNotSelector.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- Selector without locale file: ${report.discovery.selectorWithoutFile.map((code) => `\`${code}\``).join(", ") || "none"}`);
  lines.push(`- CSS width breakpoints tested: ${report.discovery.breakpoints.map((value) => `\`${value}px\``).join(", ") || "none"}`);
  lines.push("");
  lines.push("## Locale results");
  lines.push("");
  lines.push("| Locale | Status | Classification | Registered | Selector | dir | Browser render | Switch | Persistence | Screenshots |");
  lines.push("|---|---:|---|---:|---:|---|---|---|---|---|");
  for (const result of Object.values(report.locales).sort((a, b) => a.code.localeCompare(b.code, "en"))) {
    lines.push(`| \`${mdEscape(result.code)}\` | **${result.status}** | ${mdEscape(result.classification)} | ${result.registered ? "yes" : "no"} | ${result.selectorPresent === true ? "yes" : result.selectorPresent === false ? "no" : "n/a"} | ${mdEscape(result.dir || "")} | ${result.basic ? (result.basic.workspaceHidden === false ? "ok" : "failed") : "n/a"} | ${result.switchLanguage ? (result.switchLanguage.ok ? "ok" : "failed") : "n/a"} | ${result.persistence ? (result.persistence.ok ? "ok" : "failed") : "n/a"} | ${(result.screenshots || []).map((shot) => `[${shot.width}×${shot.height}](${shot.path})`).join(" ") || "none"} |`);
  }
  lines.push("");
  lines.push("## Unregistered / inactive resource validation");
  lines.push("");
  lines.push("| File code | Resource code | Status | Classification | import | Notes |");
  lines.push("|---|---|---:|---|---:|---|");
  for (const record of Object.values(report.resources).sort((a, b) => a.fileCode.localeCompare(b.fileCode, "en"))) {
    if (record.registered) continue;
    lines.push(`| \`${mdEscape(record.fileCode)}\` | \`${mdEscape(record.code || "") }\` | **${record.status}** | ${mdEscape(record.classification)} | ${record.importOk ? "ok" : "failed"} | ${mdEscape([...record.errors, ...record.warnings].join("; ") || "-")} |`);
  }
  lines.push("");
  lines.push("## FAIL findings");
  lines.push("");
  const failFindings = collectAllFindings(report).filter((item) => item.severity === "FAIL");
  if (!failFindings.length) lines.push("None.");
  else for (const item of failFindings) lines.push(`- **${mdEscape(item.category)}**: ${mdEscape(item.message)}${item.locale ? ` (locale \`${mdEscape(item.locale)}\`)` : ""}`);
  lines.push("");
  lines.push("## Significant WARN findings");
  lines.push("");
  const warnFindings = collectAllFindings(report).filter((item) => item.severity === "WARN");
  if (!warnFindings.length) lines.push("None.");
  else for (const item of warnFindings) lines.push(`- **${mdEscape(item.category)}**: ${mdEscape(item.message)}${item.locale ? ` (locale \`${mdEscape(item.locale)}\`)` : ""}`);
  lines.push("");
  lines.push("## Locale-invariance proof");
  lines.push("");
  for (const result of Object.values(report.locales).filter((item) => item.classification === "active")) {
    if (!result.switchLanguage) continue;
    const before = result.switchLanguage.before?.engine;
    const after = result.switchLanguage.after?.engine;
    lines.push(`- \`${result.code}\`: ${before && after && JSON.stringify(before) === JSON.stringify(after) ? "PASS — fast-engine identity is byte-for-byte equal before/after the UI locale switch." : "FAIL/לא אומת — see findings."}`);
  }
  lines.push("");
  lines.push("## Browser-language resolution");
  lines.push("");
  for (const item of report.browserLanguageResolution || []) {
    lines.push(`- \`${item.name}\`: ${item.ok ? "PASS" : "FAIL"}; navigator.languages=${JSON.stringify(item.languages)} → \`${item.active}\` (expected \`${item.expected}\`).`);
  }
  lines.push("");
  lines.push("## Human-review limitation");
  lines.push("");
  lines.push("The audit can detect empty text, U+FFFD, literal escapes, runtime failures and layout symptoms. It does **not** use OCR and does not claim to prove translation quality or glyph aesthetics. Review the screenshot gallery for those aspects.");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function collectAllFindings(report) {
  const resourceFindings = Object.values(report.resources).flatMap((record) => {
    const items = [];
    for (const message of record.errors || []) items.push(finding("FAIL", "resource", message, { locale: record.code || record.fileCode }));
    for (const message of record.warnings || []) items.push(finding("WARN", "resource", message, { locale: record.code || record.fileCode }));
    if (!record.registered && record.status === "WARN") items.push(finding("WARN", "unregistered-resource", `${record.classification}: locale file is not connected to runtime`, { locale: record.code || record.fileCode }));
    return items;
  });
  return [
    ...(report.globalFindings || []),
    ...Object.values(report.locales).flatMap((result) => result.findings || []),
    ...resourceFindings,
  ];
}

function galleryHtml(report) {
  const cards = Object.values(report.locales)
    .sort((a, b) => a.code.localeCompare(b.code, "en"))
    .map((result) => {
      const findingList = (result.findings || []).slice(0, 20).map((item) => `<li class="${escapeHtml(item.severity.toLowerCase())}"><strong>${escapeHtml(item.severity)}</strong> ${escapeHtml(item.category)} — ${escapeHtml(item.message)}</li>`).join("") || "<li>No browser findings.</li>";
      const images = (result.screenshots || []).map((shot) => `<figure><a href="${escapeHtml(shot.path)}"><img src="${escapeHtml(shot.path)}" alt="${escapeHtml(result.code)} ${escapeHtml(shot.width)}×${escapeHtml(shot.height)} screenshot"></a><figcaption>${escapeHtml(shot.width)}×${escapeHtml(shot.height)}</figcaption></figure>`).join("") || "<p>No screenshots for this run.</p>";
      return `<article class="card" data-gallery-card data-status="${escapeHtml(result.status)}"><header><div><h2>${escapeHtml(result.displayName || result.code)}</h2><p><code>${escapeHtml(result.code)}</code> · ${escapeHtml(result.dir || "")} · ${escapeHtml(result.classification)}</p></div><span class="status">${escapeHtml(result.status)}</span></header><div class="images">${images}</div><details><summary>Findings (${(result.findings || []).length})</summary><ul>${findingList}</ul></details></article>`;
    }).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pastafari i18n browser audit gallery</title>
<style>
:root{font-family:system-ui,sans-serif;color:#18130e;background:#f1ede4}body{margin:0}.shell{width:min(96rem,calc(100% - 2rem));margin:auto;padding:2rem 0}h1{margin-bottom:.25rem}.summary{margin:0 0 2rem;color:#5b544c}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,32rem),1fr));gap:1rem}.card{min-width:0;padding:1rem;border:1px solid #c9bead;border-radius:.8rem;background:white}.card header{display:flex;gap:1rem;justify-content:space-between}.card h2{margin:0}.card header p{margin:.25rem 0 0}.status{height:fit-content;padding:.3rem .55rem;border:1px solid currentColor;border-radius:999px;font-weight:800}.card[data-status="FAIL"] .status,.fail{color:#9b1c12}.card[data-status="WARN"] .status,.warn{color:#8a5a00}.card[data-status="PASS"] .status{color:#166534}.images{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem;margin-top:1rem}.images figure{margin:0;min-width:0}.images img{display:block;width:100%;height:auto;border:1px solid #bbb;background:#eee}.images figcaption{font-size:.8rem;color:#665f56}details{margin-top:1rem}li{margin:.3rem 0;overflow-wrap:anywhere}@media(max-width:700px){.images{grid-template-columns:1fr}}
</style>
</head>
<body><main class="shell"><h1>Pastafari i18n browser audit</h1><p class="summary">Commit <code>${escapeHtml(report.commit)}</code> · ${escapeHtml(report.summary.globalStatus)} · ${report.summary.localeFilesFound} locale files · ${report.summary.registeredLocales} registered</p><div class="grid">${cards}</div></main></body></html>`;
}

async function writeReports(report) {
  report.summary = calculateSummary(report);
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(REPORT_JSON_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(REPORT_MD_PATH, reportMarkdown(report), "utf8");
  await writeFile(GALLERY_PATH, galleryHtml(report), "utf8");
}

async function validateGallery(browser, report) {
  const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await context.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(error?.message || String(error)));
  try {
    await page.goto(pathToFileURL(GALLERY_PATH).href, { waitUntil: "load", timeout: 30_000 });
    const expected = Object.keys(report.locales).length;
    const actual = await page.locator("[data-gallery-card]").count();
    if (actual !== expected) failures.push(`gallery card count ${actual}, expected ${expected}`);
    for (const shot of Object.values(report.locales).flatMap((result) => result.screenshots || [])) {
      const image = page.locator(`img[src="${shot.path.replace(/"/g, '\\"')}"]`);
      if (await image.count()) {
        const naturalWidth = await image.evaluate((element) => element.naturalWidth);
        if (naturalWidth < 1) failures.push(`gallery image failed to load: ${shot.path}`);
      }
    }
  } catch (error) {
    failures.push(error?.message || String(error));
  } finally {
    await context.close();
  }
  return { ok: failures.length === 0, failures };
}

async function reporterSelfTest() {
  const tempDir = join(OUTPUT_DIR, ".reporter-selftest");
  await mkdir(tempDir, { recursive: true });
  const synthetic = {
    discovery: { files: ["xx"], registered: ["xx"], selector: ["xx"], fileNotRegistered: [], registeredNotSelector: [], selectorWithoutFile: [] },
    locales: { xx: { code: "xx", classification: "active", status: "FAIL", findings: [finding("FAIL", "self-test", "controlled synthetic failure")] } },
    resources: {},
    globalFindings: [],
  };
  const summary = calculateSummary(synthetic);
  const serialized = JSON.stringify({ synthetic, summary });
  await writeFile(join(tempDir, "synthetic.json"), serialized, "utf8");
  const reread = JSON.parse(await readFile(join(tempDir, "synthetic.json"), "utf8"));
  if (reread.summary.statusCounts.FAIL !== 1 || !serialized.includes("controlled synthetic failure")) {
    throw new Error("Reporter self-test failed to preserve a controlled FAIL finding.");
  }
  await rm(tempDir, { recursive: true, force: true });
}

async function loadPreviousReport(commit, options) {
  if (!options.resume) return null;
  try {
    const previous = JSON.parse(await readFile(REPORT_JSON_PATH, "utf8"));
    if (previous.commit !== commit) {
      console.warn(`[resume] Existing report is for commit ${previous.commit}; current commit is ${commit}. Previous locale results will not be reused.`);
      return null;
    }
    if (previous.options?.browser !== options.browser) {
      console.warn(`[resume] Existing report used browser ${previous.options?.browser}; current browser is ${options.browser}. Previous locale results will not be reused.`);
      return null;
    }
    return previous;
  } catch {
    return null;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  await assertRepositoryShape();
  await mkdir(SCREENSHOT_DIR, { recursive: true });
  const commit = getGitHead();
  console.log(`[audit] repo: ${REPO_ROOT}`);
  console.log(`[audit] HEAD: ${commit}`);
  console.log(`[audit] browser: ${options.browser}`);

  const [cssText, i18nDocText] = await Promise.all([
    readFile(STYLES_PATH, "utf8"),
    readFile(I18N_DOC_PATH, "utf8").catch(() => ""),
  ]);
  const breakpoints = parseBreakpoints(cssText);

  const registryNamespace = await importModuleFresh(REGISTRY_PATH);
  const registry = {
    LOCALES: registryNamespace.LOCALES,
    DEFAULT_LOCALE: registryNamespace.DEFAULT_LOCALE,
    matchSupportedLocale: registryNamespace.matchSupportedLocale,
    resolveLocale: registryNamespace.resolveLocale,
    validateLocaleResources: registryNamespace.validateLocaleResources,
  };
  if (!Array.isArray(registry.LOCALES) || registry.LOCALES.length === 0) throw new Error("Registry exports no LOCALES.");

  let registeredResourceValidation = { ok: false, error: null };
  try {
    if (typeof registry.validateLocaleResources !== "function") throw new TypeError("registry.js does not export validateLocaleResources().");
    registry.validateLocaleResources();
    registeredResourceValidation = { ok: true, error: null };
  } catch (error) {
    registeredResourceValidation = { ok: false, error: error?.message || String(error) };
  }

  const discoveryResources = await discoverResources(registry);
  const registeredResources = new Map();
  for (const locale of registry.LOCALES) {
    const matches = discoveryResources.resourcesByCode.get(locale.code) || [];
    if (matches[0]) registeredResources.set(locale.code, { locale, resource: matches[0].resource });
  }
  const comparisonRepresentatives = selectComparisonRepresentatives(registeredResources);

  let playwright;
  try {
    playwright = await import("playwright");
  } catch (error) {
    throw new Error(`Playwright is not installed. Run npm ci (or npm install) first. Original error: ${error?.message || error}`);
  }
  const browserType = playwright[options.browser];
  if (!browserType) throw new Error(`Playwright does not expose browser type ${options.browser}.`);
  let browser;
  try {
    browser = await browserType.launch({ headless: true });
  } catch (error) {
    throw new Error(`Could not launch Playwright ${options.browser}. Install its browser binary (for example: npx playwright install ${options.browser}). Original error: ${error?.message || error}`);
  }

  const server = await startStaticServer(DOCS_DIR);
  console.log(`[audit] local server: ${server.baseUrl}`);

  try {
    await reporterSelfTest();
    const defaultLocale = registry.LOCALES.find((locale) => locale.code === registry.DEFAULT_LOCALE) || registry.LOCALES[0];
    const selectorDiscovery = await discoverSelector(browser, server.baseUrl, defaultLocale);
    const discovery = buildDiscoveryFindings({
      fileRecords: discoveryResources.resources,
      registry,
      selectorOptions: selectorDiscovery.options,
    });
    discovery.breakpoints = breakpoints;
    discovery.selectorOptions = selectorDiscovery.options;

    const previous = await loadPreviousReport(commit, options);
    const report = {
      schemaVersion: 1,
      generatedAt: nowIso(),
      completedAt: null,
      commit,
      repoRoot: REPO_ROOT,
      options: {
        browser: options.browser,
        screenshots: options.screenshots,
        resume: options.resume,
        requestedLocales: options.locales,
        fixedState: { targetJdn: FIXED_TARGET_JDN, calculationJdn: FIXED_ACTION_JDN, searchDate: FIXED_SEARCH_DATE },
      },
      environment: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        i18nDocumentationRead: Boolean(i18nDocText),
      },
      discovery,
      registeredResourceValidation,
      resources: discoveryResources.resources,
      locales: previous?.locales && options.resume ? { ...previous.locales } : {},
      browserLanguageResolution: [],
      globalFindings: [...discovery.findings],
      selectorDiscovery: {
        error: selectorDiscovery.error,
        eventCounts: {
          pageErrors: selectorDiscovery.tracker.pageErrors.length,
          consoleErrors: selectorDiscovery.tracker.consoleErrors.length,
          failedRequests: selectorDiscovery.tracker.failedRequests.length,
          badResponses: selectorDiscovery.tracker.badResponses.length,
        },
      },
      galleryValidation: null,
      summary: null,
    };

    if (!registeredResourceValidation.ok) {
      report.globalFindings.push(finding("FAIL", "registered-resource-validation", registeredResourceValidation.error || "validateLocaleResources() failed"));
    }
    if (selectorDiscovery.error) report.globalFindings.push(finding("FAIL", "selector-discovery", selectorDiscovery.error));
    for (const item of selectorDiscovery.tracker.pageErrors) report.globalFindings.push(finding("FAIL", "selector-discovery/pageerror", item.message, item));
    for (const item of selectorDiscovery.tracker.consoleErrors) report.globalFindings.push(finding("FAIL", "selector-discovery/console.error", item.message, item));
    for (const item of selectorDiscovery.tracker.failedRequests) report.globalFindings.push(finding("FAIL", "selector-discovery/requestfailed", item.failure, item));
    for (const item of selectorDiscovery.tracker.badResponses) report.globalFindings.push(finding("FAIL", "selector-discovery/http-error", `${item.status} ${item.statusText}`, item));

    const knownCodes = new Set(discovery.files);
    for (const requested of options.locales) {
      if (!knownCodes.has(requested)) report.globalFindings.push(finding("FAIL", "scope", `Requested --locale ${requested} has no locale file`));
    }

    const scopeCodes = options.locales.length ? new Set(options.locales) : null;
    const activeCodes = new Set([...discovery.registered, ...discovery.selector]);
    for (const code of [...activeCodes].sort((a, b) => a.localeCompare(b, "en"))) {
      if (scopeCodes && !scopeCodes.has(code)) continue;
      const registeredEntry = registeredResources.get(code);
      const locale = registeredEntry?.locale || registry.LOCALES.find((item) => item.code === code);
      const resource = registeredEntry?.resource || discoveryResources.resourcesByCode.get(code)?.[0]?.resource;
      if (!locale || !resource) {
        report.locales[code] = {
          code,
          classification: "active",
          registered: Boolean(locale),
          selectorPresent: discovery.selector.includes(code),
          status: "FAIL",
          completed: true,
          findings: [finding("FAIL", "resource", "Cannot browser-audit active locale because its resource or registry entry is missing")],
          screenshots: [],
        };
        await writeReports(report);
        continue;
      }

      if (
        options.resume
        && report.locales[code]?.completed
        && report.locales[code]?.status
        && report.locales[code].status !== "FAIL"
        && previous?.commit === commit
        && previous?.options?.browser === options.browser
      ) {
        console.log(`[audit] ${code}: resume — already completed (${report.locales[code].status})`);
        continue;
      }

      console.log(`[audit] ${code}: browser audit`);
      const result = await auditDirectLocale({
        browser,
        baseUrl: server.baseUrl,
        locale,
        resource,
        breakpoints,
        screenshots: options.screenshots,
        comparisonRepresentative: comparisonRepresentatives.has(code),
      });
      report.locales[code] = result;
      console.log(`[audit] ${code}: ${result.status}`);
      await writeReports(report);
    }

    // --locale for an unregistered file still validates/imports it, but intentionally does not wire it into the product.
    if (scopeCodes) {
      for (const code of scopeCodes) {
        if (activeCodes.has(code)) continue;
        const record = Object.values(report.resources).find((item) => (item.code || item.fileCode) === code);
        if (!record) continue;
        report.locales[code] = {
          code,
          displayName: record.meta?.displayName || code,
          classification: record.classification,
          registered: false,
          selectorPresent: discovery.selector.includes(code),
          dir: record.meta?.dir || null,
          intlLocale: record.meta?.intlLocale || null,
          status: record.status,
          completed: true,
          findings: [
            ...(record.errors || []).map((message) => finding("FAIL", "resource", message, { locale: code })),
            ...(record.warnings || []).map((message) => finding("WARN", "resource", message, { locale: code })),
            ...(record.status === "WARN" ? [finding("WARN", "unregistered-resource", `${record.classification}: not connected to runtime`, { locale: code })] : []),
          ],
          screenshots: [],
          notes: ["No browser screenshot: locale is not active in the runtime/selector."],
        };
      }
    }

    console.log("[audit] browser-language resolution");
    report.browserLanguageResolution = await testBrowserLanguageResolution(browser, server.baseUrl, registry);
    for (const item of report.browserLanguageResolution) {
      for (const itemFinding of item.findings || []) report.globalFindings.push(itemFinding);
    }

    mergeGlobalInvarianceFindings(report);
    report.completedAt = nowIso();
    await writeReports(report);
    report.galleryValidation = await validateGallery(browser, report);
    if (!report.galleryValidation.ok) {
      for (const message of report.galleryValidation.failures) report.globalFindings.push(finding("FAIL", "gallery", message));
    }
    await writeReports(report);

    console.log(`[audit] report: ${relative(REPO_ROOT, REPORT_JSON_PATH)}`);
    console.log(`[audit] markdown: ${relative(REPO_ROOT, REPORT_MD_PATH)}`);
    console.log(`[audit] gallery: ${relative(REPO_ROOT, GALLERY_PATH)}`);
    console.log(`[audit] PASS/WARN/FAIL: ${report.summary.statusCounts.PASS}/${report.summary.statusCounts.WARN}/${report.summary.statusCounts.FAIL}`);
    console.log(`[audit] global status: ${report.summary.globalStatus}`);
    if (report.summary.globalStatus === "FAIL") process.exitCode = 1;
  } finally {
    await server.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
