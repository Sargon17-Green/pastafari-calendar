"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { deflateSync, inflateSync } from "node:zlib";

import { chromium, firefox } from "playwright";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const VISUAL_DIR = path.join(ROOT, "test", "visual");
const BASELINES = path.join(VISUAL_DIR, "baselines");
const METADATA_FILE = path.join(VISUAL_DIR, "baseline-metadata.json");
const ARTIFACTS = path.join(ROOT, "artifacts", "visual");
const ACTUAL = path.join(ARTIFACTS, "actual");
const EXPECTED = path.join(ARTIFACTS, "expected");
const DIFF = path.join(ARTIFACTS, "diff");
const TRACES = path.join(ARTIFACTS, "traces");
const REPORT = path.join(ARTIFACTS, "report.json");
const DEFAULT_TIMEOUT = 180_000;
const CHANNEL_THRESHOLD = 16;
const MAX_ALLOWED_DIFF_RATIO = 0.002; // Hard ceiling: 0.2% of pixels.
const STABILITY_MULTIPLIER = 3;
const DEFAULT_STABILITY_RUNS = 3;
const FIXED = Object.freeze({
  target: 2465429n,       // 2038-01-05 Gregorian; start of a 51-day cutlet
  middle: 2465454n,       // same short cutlet, away from either edge
  complexYear: 2469021n,  // year 5002; structurally different from target year 5001
  action: 2461141n,       // 2026-04-10 Gregorian
  comparison: 2461143n,   // 2026-04-12 Gregorian
});
const VIEWPORTS = Object.freeze({
  desktop: Object.freeze({ width: 1440, height: 1000 }),
  mobile: Object.freeze({ width: 390, height: 844 }),
  narrow: Object.freeze({ width: 320, height: 800 }),
  wide: Object.freeze({ width: 1680, height: 1050 }),
});
const BREAKPOINTS = Object.freeze([
  Object.freeze({ name: "comparison", above: 1001, below: 999 }),
  Object.freeze({ name: "main-layout", above: 901, below: 899 }),
  Object.freeze({ name: "masthead", above: 761, below: 759 }),
  Object.freeze({ name: "date-fields", above: 521, below: 519 }),
  Object.freeze({ name: "small-shell", above: 421, below: 419 }),
  Object.freeze({ name: "reverse", above: 621, below: 619 }),
]);

function parseArgs(argv) {
  const options = { update: false, layoutOnly: false, regressionSelfTest: false, stabilityRuns: DEFAULT_STABILITY_RUNS };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--update") options.update = true;
    else if (arg === "--layout-only") options.layoutOnly = true;
    else if (arg === "--regression-self-test") options.regressionSelfTest = true;
    else if (arg === "--stability-runs") options.stabilityRuns = Number(argv[++i]);
    else if (arg.startsWith("--stability-runs=")) options.stabilityRuns = Number(arg.split("=", 2)[1]);
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isInteger(options.stabilityRuns) || options.stabilityRuns < 2 || options.stabilityRuns > 10) {
    throw new Error("--stability-runs must be an integer from 2 to 10.");
  }
  if (options.update && process.env.CI && process.env.PASTAFARI_ALLOW_VISUAL_UPDATE !== "1") {
    throw new Error("Refusing to update visual baselines in CI. Set PASTAFARI_ALLOW_VISUAL_UPDATE=1 only for an explicit manual baseline-capture run.");
  }
  return options;
}

function usage() {
  return [
    "Pastafari visual regression suite",
    "",
    "Run committed baselines:",
    "  node scripts/run-visual-regression.mjs",
    "",
    "Explicitly rebuild baselines after review:",
    "  node scripts/run-visual-regression.mjs --update",
    "",
    "Structural/layout smoke only (no pixel comparison):",
    "  node scripts/run-visual-regression.mjs --layout-only",
    "",
    "Prove the comparator catches a temporary visual regression:",
    "  node scripts/run-visual-regression.mjs --regression-self-test",
  ].join("\n");
}

function mimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
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
    ".gz": "application/gzip",
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

function fixedUrl(baseURL, { locale = "en", target = FIXED.target, action = FIXED.action, view = target, comparison = null } = {}) {
  const url = new URL(baseURL);
  url.searchParams.set("t", String(target));
  url.searchParams.set("v", String(view));
  url.searchParams.set("c", String(action));
  url.searchParams.set("lang", locale);
  if (comparison !== null) {
    url.searchParams.set("compare", "1");
    url.searchParams.set("c2", String(comparison));
  }
  return url.href;
}

function attachMonitoring(page) {
  const events = [];
  page.on("pageerror", (error) => events.push({ type: "pageerror", detail: error.stack || error.message }));
  page.on("console", (message) => {
    if (message.type() === "error") events.push({ type: "console.error", detail: message.text() });
  });
  page.on("requestfailed", (request) => events.push({ type: "requestfailed", detail: `${request.method()} ${request.url()} — ${request.failure()?.errorText || "unknown"}` }));
  page.on("response", (response) => {
    if (response.status() >= 400) events.push({ type: "bad-response", detail: `${response.status()} ${response.url()}` });
  });
  return events;
}

async function stabilizePage(page, { preserveFocus = false } = {}) {
  await page.evaluate(async ({ keepFocus }) => {
    if (document.fonts?.ready) await document.fonts.ready;
    if (!keepFocus && document.activeElement instanceof HTMLElement) document.activeElement.blur();
    let style = document.querySelector("style[data-visual-regression]");
    if (!style) {
      style = document.createElement("style");
      style.dataset.visualRegression = "true";
      style.textContent = `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
        ${keepFocus ? "" : "input, textarea, [contenteditable] { caret-color: transparent !important; }"}
      `;
      document.head.append(style);
    }
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }, { keepFocus: preserveFocus });
}

async function waitForWorkspace(page) {
  await page.locator("#calendar-workspace").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  await page.locator("#loading-panel").waitFor({ state: "hidden", timeout: DEFAULT_TIMEOUT }).catch(() => {});
  assert.equal(await page.locator("#error-panel").isHidden(), true, "global error panel must remain hidden");
  await page.waitForFunction(() => document.querySelectorAll("#calendar-grid .day-card").length > 0, null, { timeout: DEFAULT_TIMEOUT });
  await page.locator("#year-overview-content").waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
  assert.equal(await page.locator("#year-overview-error").isHidden(), true, "year overview must load without error");
  await stabilizePage(page);
}

async function openFixed(page, baseURL, options = {}) {
  await page.goto(fixedUrl(baseURL, options), { waitUntil: "domcontentloaded" });
  await waitForWorkspace(page);
  const locale = options.locale || "en";
  await page.waitForFunction((code) => document.documentElement.lang === code, locale, { timeout: DEFAULT_TIMEOUT });
  return page;
}

async function newContext(browser, viewport, extras = {}) {
  return browser.newContext({
    viewport,
    locale: "en-US",
    timezoneId: "Asia/Jerusalem",
    reducedMotion: "reduce",
    serviceWorkers: "block",
    ...extras,
  });
}

async function assertNoPageOverflow(page, label = "page") {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert.ok(dimensions.scrollWidth <= dimensions.clientWidth + 1,
    `${label} has unintended horizontal page overflow: ${dimensions.scrollWidth}px > ${dimensions.clientWidth}px`);
}

async function assertVisibleAndSized(page, selectors) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
    const box = await locator.boundingBox();
    assert.ok(box && box.width > 1 && box.height > 1, `${selector} must have a non-zero visible box`);
  }
}

async function assertWithinViewport(page, selectors) {
  const viewport = page.viewportSize();
  assert.ok(viewport, "viewport is required");
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    const box = await locator.boundingBox();
    if (!box) throw new Error(`${selector} is not visible`);
    assert.ok(box.x + box.width >= -1 && box.x <= viewport.width + 1, `${selector} is horizontally outside the viewport`);
  }
}

function rectsOverlap(a, b, tolerance = 1) {
  return a.x + a.width > b.x + tolerance
    && b.x + b.width > a.x + tolerance
    && a.y + a.height > b.y + tolerance
    && b.y + b.height > a.y + tolerance;
}

async function assertNoOverlap(page, selectorA, selectorB) {
  const a = await page.locator(selectorA).first().boundingBox();
  const b = await page.locator(selectorB).first().boundingBox();
  assert.ok(a && b, `Cannot compare overlap for ${selectorA} / ${selectorB}`);
  assert.equal(rectsOverlap(a, b), false, `${selectorA} overlaps ${selectorB}`);
}

async function assertControlNotClipped(page, selectors) {
  for (const selector of selectors) {
    const clipped = await page.locator(selector).first().evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight,
        overflowX: style.overflowX,
        overflowY: style.overflowY,
      };
    });
    const xMayClip = ["hidden", "clip"].includes(clipped.overflowX);
    const yMayClip = ["hidden", "clip"].includes(clipped.overflowY);
    if (xMayClip) assert.ok(clipped.scrollWidth <= clipped.clientWidth + 1, `${selector} clips content horizontally`);
    if (yMayClip) assert.ok(clipped.scrollHeight <= clipped.clientHeight + 1, `${selector} clips content vertically`);
  }
}

async function assertCoreLayout(page, { mobile = false } = {}) {
  await assertNoPageOverflow(page);
  await assertVisibleAndSized(page, [".masthead", "#search-panel", "#target-search-form", "#target-beacon", "#calendar-grid", "#year-overview"]);
  await assertWithinViewport(page, ["#language-selector", "#target-calendar", ".search-submit", "#target-beacon"]);
  await assertNoOverlap(page, ".masthead", "#search-panel");
  await assertNoOverlap(page, ".calendar-toolbar", "#calendar-grid");
  await assertControlNotClipped(page, ["#language-selector", "#target-calendar", ".search-submit", "#previous-cutlet", "#today-button", "#next-cutlet"]);
  const selected = page.locator('#calendar-grid .day-card[data-target="true"]');
  assert.equal(await selected.count(), 1, "exactly one target card must be marked");
  if (mobile) {
    const buttons = await Promise.all(["#previous-cutlet", "#today-button", "#next-cutlet"].map((selector) => page.locator(selector).boundingBox()));
    assert.ok(buttons.every(Boolean), "mobile toolbar buttons must be visible");
    assert.equal(rectsOverlap(buttons[0], buttons[1]), false, "mobile previous/today overlap");
    assert.equal(rectsOverlap(buttons[1], buttons[2]), false, "mobile today/next overlap");
  }
}

async function assertRtlGeometry(page) {
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  const beacon = await page.locator("#target-beacon").evaluate((element) => {
    const style = getComputedStyle(element);
    return { left: parseFloat(style.borderLeftWidth), right: parseFloat(style.borderRightWidth), textAlign: style.textAlign };
  });
  assert.ok(beacon.right > beacon.left, "RTL target beacon must put the accent border on the inline-start (right) side");
  const tableAlign = await page.locator(".comparison-table thead th").first().evaluate((element) => getComputedStyle(element).textAlign);
  assert.ok(["start", "right"].includes(tableAlign), `RTL table heading must use logical/start alignment, got ${tableAlign}`);
}

async function assertLtrGeometry(page) {
  assert.equal(await page.locator("html").getAttribute("dir"), "ltr");
  const beacon = await page.locator("#target-beacon").evaluate((element) => {
    const style = getComputedStyle(element);
    return { left: parseFloat(style.borderLeftWidth), right: parseFloat(style.borderRightWidth) };
  });
  assert.ok(beacon.left > beacon.right, "LTR target beacon must put the accent border on the inline-start (left) side");
}

async function screenshotSelectorSet(page, selectors) {
  const images = [];
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    await locator.waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
    images.push(decodePng(await locator.screenshot({ animations: "disabled", caret: "hide" })));
  }
  const gap = 8;
  const width = Math.max(...images.map((image) => image.width));
  const height = images.reduce((sum, image) => sum + image.height, 0) + gap * Math.max(0, images.length - 1);
  const data = Buffer.alloc(width * height * 4, 255);
  let offsetY = 0;
  for (const image of images) {
    for (let y = 0; y < image.height; y += 1) {
      const sourceStart = y * image.width * 4;
      const targetStart = (offsetY + y) * width * 4;
      image.data.copy(data, targetStart, sourceStart, sourceStart + image.width * 4);
    }
    offsetY += image.height + gap;
  }
  return encodePng({ width, height, data });
}

async function screenshotBytes(page, target) {
  await stabilizePage(page, { preserveFocus: target.preserveFocus || false });
  if (target.selector) return page.locator(target.selector).first().screenshot({ animations: "disabled", caret: "hide" });
  if (target.selectors) return screenshotSelectorSet(page, target.selectors);
  return page.screenshot({ fullPage: Boolean(target.fullPage), animations: "disabled", caret: "hide" });
}

// Minimal PNG reader/writer for Playwright screenshots (8-bit, non-interlaced PNG).
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

function decodePng(buffer) {
  assert.equal(buffer.subarray(0, 8).equals(PNG_SIGNATURE), true, "Invalid PNG signature");
  let offset = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset); offset += 4;
    const type = buffer.toString("ascii", offset, offset + 4); offset += 4;
    const data = buffer.subarray(offset, offset + length); offset += length + 4;
    if (type === "IHDR") {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
  }
  assert.equal(bitDepth, 8, `Unsupported PNG bit depth ${bitDepth}`);
  assert.equal(interlace, 0, "Interlaced PNG is not supported");
  const channels = ({ 0: 1, 2: 3, 4: 2, 6: 4 })[colorType];
  assert.ok(channels, `Unsupported PNG color type ${colorType}`);
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const decoded = Buffer.alloc(height * stride);
  let source = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[source++];
    const rowStart = y * stride;
    const prevStart = (y - 1) * stride;
    for (let x = 0; x < stride; x += 1) {
      const value = raw[source++];
      const left = x >= channels ? decoded[rowStart + x - channels] : 0;
      const up = y > 0 ? decoded[prevStart + x] : 0;
      const upLeft = y > 0 && x >= channels ? decoded[prevStart + x - channels] : 0;
      let result;
      if (filter === 0) result = value;
      else if (filter === 1) result = (value + left) & 0xff;
      else if (filter === 2) result = (value + up) & 0xff;
      else if (filter === 3) result = (value + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) result = (value + paeth(left, up, upLeft)) & 0xff;
      else throw new Error(`Unsupported PNG filter ${filter}`);
      decoded[rowStart + x] = result;
    }
  }
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0, o = 0; i < decoded.length; i += channels, o += 4) {
    if (colorType === 6) { rgba[o] = decoded[i]; rgba[o + 1] = decoded[i + 1]; rgba[o + 2] = decoded[i + 2]; rgba[o + 3] = decoded[i + 3]; }
    else if (colorType === 2) { rgba[o] = decoded[i]; rgba[o + 1] = decoded[i + 1]; rgba[o + 2] = decoded[i + 2]; rgba[o + 3] = 255; }
    else if (colorType === 4) { rgba[o] = rgba[o + 1] = rgba[o + 2] = decoded[i]; rgba[o + 3] = decoded[i + 1]; }
    else { rgba[o] = rgba[o + 1] = rgba[o + 2] = decoded[i]; rgba[o + 3] = 255; }
  }
  return { width, height, data: rgba };
}

function encodePng({ width, height, data }) {
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y += 1) {
    const row = y * (1 + width * 4); raw[row] = 0;
    data.copy(raw, row + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([PNG_SIGNATURE, pngChunk("IHDR", ihdr), pngChunk("IDAT", deflateSync(raw, { level: 9 })), pngChunk("IEND", Buffer.alloc(0))]);
}

function comparePng(expectedBuffer, actualBuffer) {
  const expected = decodePng(expectedBuffer);
  const actual = decodePng(actualBuffer);
  const width = Math.max(expected.width, actual.width);
  const height = Math.max(expected.height, actual.height);
  const diff = Buffer.alloc(width * height * 4, 255);
  let changed = 0;
  const total = width * height;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const out = (y * width + x) * 4;
      if (x >= expected.width || y >= expected.height || x >= actual.width || y >= actual.height) {
        changed += 1; diff[out] = 255; diff[out + 1] = 0; diff[out + 2] = 255; diff[out + 3] = 255; continue;
      }
      const ei = (y * expected.width + x) * 4;
      const ai = (y * actual.width + x) * 4;
      const delta = Math.max(
        Math.abs(expected.data[ei] - actual.data[ai]),
        Math.abs(expected.data[ei + 1] - actual.data[ai + 1]),
        Math.abs(expected.data[ei + 2] - actual.data[ai + 2]),
        Math.abs(expected.data[ei + 3] - actual.data[ai + 3]),
      );
      if (delta > CHANNEL_THRESHOLD) {
        changed += 1;
        diff[out] = 220; diff[out + 1] = 0; diff[out + 2] = 80; diff[out + 3] = 255;
      } else {
        const gray = Math.round((expected.data[ei] + expected.data[ei + 1] + expected.data[ei + 2]) / 3);
        diff[out] = diff[out + 1] = diff[out + 2] = Math.round(230 + gray * 0.1); diff[out + 3] = 255;
      }
    }
  }
  return {
    changedPixels: changed,
    totalPixels: total,
    ratio: total ? changed / total : 1,
    sameDimensions: expected.width === actual.width && expected.height === actual.height,
    dimensions: { expected: { width: expected.width, height: expected.height }, actual: { width: actual.width, height: actual.height } },
    diffPng: encodePng({ width, height, data: diff }),
  };
}

async function readMetadata() {
  try { return JSON.parse(await readFile(METADATA_FILE, "utf8")); }
  catch (error) {
    if (error?.code === "ENOENT") return { formatVersion: 1, snapshots: {} };
    throw error;
  }
}

async function snapshotSize() {
  let total = 0, count = 0;
  try {
    const metadata = await readMetadata();
    for (const name of Object.keys(metadata.snapshots || {})) {
      try { total += (await stat(path.join(BASELINES, `${name}.png`))).size; count += 1; } catch {}
    }
  } catch {}
  return { totalBytes: total, count };
}

async function captureAndCompare(page, target, state) {
  if (state.options.layoutOnly) return;
  const name = target.name;
  const baselinePath = path.join(BASELINES, `${name}.png`);
  if (state.options.update) {
    const samples = [];
    for (let i = 0; i < state.options.stabilityRuns; i += 1) {
      samples.push(await screenshotBytes(page, target));
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    }
    const baseline = samples[0];
    let observedMaxRatio = 0;
    for (let i = 1; i < samples.length; i += 1) observedMaxRatio = Math.max(observedMaxRatio, comparePng(baseline, samples[i]).ratio);
    const allowedRatio = observedMaxRatio * STABILITY_MULTIPLIER;
    if (allowedRatio > MAX_ALLOWED_DIFF_RATIO) {
      throw new Error(`${name}: measured screenshot noise ${(observedMaxRatio * 100).toFixed(4)}% would require ${(allowedRatio * 100).toFixed(4)}%, above the 0.2% safety ceiling. Fix nondeterminism instead of widening tolerance.`);
    }
    await writeFile(baselinePath, baseline);
    const decoded = decodePng(baseline);
    state.metadata.snapshots[name] = {
      viewport: page.viewportSize(),
      width: decoded.width,
      height: decoded.height,
      channelThreshold: CHANNEL_THRESHOLD,
      stabilityRuns: state.options.stabilityRuns,
      observedMaxDiffPixelRatio: observedMaxRatio,
      maxDiffPixelRatio: allowedRatio,
      masks: [],
    };
    // Persist snapshot measurements incrementally so an explicit update can be
    // inspected even if a later scenario fails; a failed command is never treated as approval.
    await writeFile(METADATA_FILE, `${JSON.stringify(state.metadata, null, 2)}\n`);
    state.results.push({ name, result: "BASELINE_UPDATED", observedMaxRatio, allowedRatio });
    return;
  }

  const metadata = state.metadata.snapshots?.[name];
  if (!metadata) throw new Error(`${name}: no committed baseline metadata. Run the explicit --update command on the canonical environment and review the resulting PNG diff.`);
  let expected;
  try { expected = await readFile(baselinePath); }
  catch (error) {
    if (error?.code === "ENOENT") throw new Error(`${name}: committed baseline PNG is missing: ${path.relative(ROOT, baselinePath)}`);
    throw error;
  }
  const actual = await screenshotBytes(page, target);
  const comparison = comparePng(expected, actual);
  const allowed = Number(metadata.maxDiffPixelRatio);
  if (!comparison.sameDimensions || comparison.ratio > allowed) {
    const actualPath = path.join(ACTUAL, `${name}.png`);
    const expectedPath = path.join(EXPECTED, `${name}.png`);
    const diffPath = path.join(DIFF, `${name}.png`);
    await Promise.all([writeFile(actualPath, actual), copyFile(baselinePath, expectedPath), writeFile(diffPath, comparison.diffPng)]);
    state.results.push({ name, result: "FAIL", ...comparison, allowedRatio: allowed });
    throw new Error(`${name}: visual diff ${(comparison.ratio * 100).toFixed(4)}% exceeds allowed ${(allowed * 100).toFixed(4)}%${comparison.sameDimensions ? "" : " and image dimensions changed"}`);
  }
  state.results.push({ name, result: "PASS", ratio: comparison.ratio, allowedRatio: allowed });
}

function assertNoUnexpectedRuntimeErrors(events, allow = []) {
  const unexpected = events.filter((event) => !allow.some((pattern) => pattern.test(`${event.type}: ${event.detail}`)));
  assert.deepEqual(unexpected, [], `Unexpected browser/runtime errors:\n${unexpected.map((event) => `${event.type}: ${event.detail}`).join("\n")}`);
}

async function withTracedContext(browser, viewport, label, fn, state, extras = {}, allowMonitor = []) {
  const context = await newContext(browser, viewport, extras);
  const page = await context.newPage();
  page.setDefaultTimeout(DEFAULT_TIMEOUT);
  page.setDefaultNavigationTimeout(DEFAULT_TIMEOUT);
  const monitor = attachMonitoring(page);
  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  try {
    await fn(page, context, monitor);
    assertNoUnexpectedRuntimeErrors(monitor, allowMonitor);
    await context.tracing.stop();
  } catch (error) {
    const tracePath = path.join(TRACES, `${label}.zip`);
    await context.tracing.stop({ path: tracePath }).catch(() => {});
    state.errors.push({ scenario: label, error: error?.stack || String(error), monitor });
    throw error;
  } finally {
    await context.close().catch(() => {});
  }
}

async function coreDesktopEnglish(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.desktop, "core-desktop-en", async (page) => {
    await openFixed(page, baseURL, { locale: "en" });
    await assertCoreLayout(page); await assertLtrGeometry(page);
    await captureAndCompare(page, { name: "home-en-desktop", selectors: [".masthead", "#search-panel"] }, state);
    await captureAndCompare(page, { name: "result-en-desktop", selectors: ["#target-beacon", ".calendar-toolbar", "#calendar-grid"] }, state);
    await captureAndCompare(page, { name: "year-structure-a", selector: "#year-overview" }, state);
    const baseYearSignature = await yearSignature(page);

    const initialCards = page.locator("#calendar-grid .day-card");
    assert.equal(await initialCards.first().getAttribute("data-jdn"), String(FIXED.target), "edge fixture must remain the first day of its cutlet");
    assert.equal(await page.locator('#calendar-grid .day-card[data-target="true"]').first().getAttribute("data-jdn"), String(FIXED.target));
    await captureAndCompare(page, { name: "calendar-edge-en-desktop", selectors: [".calendar-toolbar", "#calendar-grid"] }, state);

    const details = page.locator("#calculation-settings");
    await details.evaluate((element) => { element.open = true; });
    await stabilizePage(page);
    await assertNoPageOverflow(page, "advanced settings desktop");
    await captureAndCompare(page, { name: "advanced-en-desktop", selector: "#search-panel" }, state);

    await openFixed(page, baseURL, { locale: "en", comparison: FIXED.comparison });
    await page.locator("#comparison-workspace").waitFor({ state: "visible" });
    await page.waitForFunction(() => document.querySelectorAll("#comparison-body tr").length > 2, null, { timeout: DEFAULT_TIMEOUT });
    assert.equal(await page.locator(".comparison-scroll").isVisible(), true, "comparison table must be visible on desktop");
    const scroll = await page.locator(".comparison-scroll").evaluate((element) => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth }));
    assert.ok(scroll.scrollWidth >= scroll.clientWidth, "comparison must use its intended internal scroll container when needed");
    await assertNoPageOverflow(page, "desktop comparison");
    await captureAndCompare(page, { name: "comparison-en-desktop", selector: "#comparison-workspace" }, state);

    await openFixed(page, baseURL, { locale: "en", target: FIXED.middle, view: FIXED.middle });
    const middleCards = page.locator("#calendar-grid .day-card");
    const middleCount = await middleCards.count();
    const targetIndex = await middleCards.evaluateAll((nodes) => nodes.findIndex((node) => node.dataset.target === "true"));
    assert.ok(targetIndex > 0 && targetIndex < middleCount - 1, "middle fixture must stay away from both cutlet edges");
    await captureAndCompare(page, { name: "calendar-mid-en-desktop", selectors: [".calendar-toolbar", "#calendar-grid"] }, state);
    const heading = await page.locator("#cutlet-heading").innerText();
    await page.locator("#next-cutlet").click();
    await page.waitForFunction((oldHeading) => document.querySelector("#cutlet-heading")?.textContent !== oldHeading, heading, { timeout: DEFAULT_TIMEOUT });
    assert.equal(await page.locator("#browse-note").isVisible(), true, "target-outside note must appear after browsing away");
    await assertNoPageOverflow(page, "next cutlet");
    await captureAndCompare(page, { name: "calendar-next-cutlet-en-desktop", selectors: [".calendar-toolbar", "#browse-note", "#calendar-grid"] }, state);

    await openFixed(page, baseURL, { locale: "en", target: FIXED.complexYear, view: FIXED.complexYear });
    const distinctSignature = await yearSignature(page);
    assert.notEqual(distinctSignature, baseYearSignature, "complex-year fixture must remain structurally different from the primary year");
    await captureAndCompare(page, { name: "year-structure-complex", selector: "#year-overview" }, state);

    await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
    await stabilizePage(page);
    assert.equal(await page.locator("#search-panel").isVisible(), false, "print CSS must hide interactive search panel");
    assert.equal(await page.locator("#calendar-workspace").isVisible(), true, "print CSS must keep result content");
    await captureAndCompare(page, { name: "print-result-en", selector: "#calendar-workspace" }, state);
  }, state);
}

async function yearSignature(page) {
  return page.evaluate(() => JSON.stringify({
    length: document.querySelector("#year-length")?.textContent,
    cutlets: document.querySelector("#year-cutlet-count")?.textContent,
    months: document.querySelector("#year-month-count")?.textContent,
    cutletItems: document.querySelectorAll("#year-cutlet-list .structure-item").length,
    monthItems: document.querySelectorAll("#year-month-list .structure-item").length,
  }));
}

async function coreLocale(browser, baseURL, state, { locale, direction, viewport, suffix, mobile }) {
  await withTracedContext(browser, viewport, `core-${suffix}`, async (page) => {
    await openFixed(page, baseURL, { locale });
    await assertCoreLayout(page, { mobile });
    if (direction === "rtl") await assertRtlGeometry(page); else await assertLtrGeometry(page);
    await captureAndCompare(page, { name: `home-${suffix}`, selectors: [".masthead", "#search-panel"] }, state);
    await captureAndCompare(page, { name: `result-${suffix}`, selectors: ["#target-beacon", ".calendar-toolbar", "#calendar-grid", "#year-overview"] }, state);
  }, state);
}

async function mobileComparison(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.mobile, "comparison-mobile-en", async (page) => {
    await openFixed(page, baseURL, { locale: "en", comparison: FIXED.comparison });
    await page.locator("#comparison-workspace").waitFor({ state: "visible" });
    assert.equal(await page.locator(".comparison-scroll").isVisible(), false, "full comparison table must be hidden below 1000px");
    assert.equal(await page.locator(".mobile-comparison-note").isVisible(), true, "mobile comparison guidance must be visible");
    await assertNoPageOverflow(page, "mobile comparison");
    await captureAndCompare(page, { name: "comparison-en-mobile", selector: "#comparison-workspace" }, state);
  }, state);
}

async function longLocale(browser, baseURL, state, viewport, suffix) {
  await withTracedContext(browser, viewport, `long-de-${suffix}`, async (page) => {
    await openFixed(page, baseURL, { locale: "de" });
    await assertCoreLayout(page, { mobile: suffix === "mobile" });
    const details = page.locator("#calculation-settings");
    await details.evaluate((element) => { element.open = true; });
    await stabilizePage(page);
    await assertNoPageOverflow(page, `German ${suffix}`);
    await assertControlNotClipped(page, ["#language-selector", "#target-calendar", ".search-submit"]);
    await captureAndCompare(page, { name: `long-de-${suffix}`, selectors: [".masthead", "#search-panel"] }, state);
  }, state);
}

async function invalidState(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.desktop, "invalid-state", async (page) => {
    await openFixed(page, baseURL, { locale: "en" });
    await page.locator("#target-calendar").selectOption("gregorian");
    await page.locator("#target-year").fill("2026");
    await page.locator("#target-month").selectOption("2");
    await page.locator("#target-day").fill("31");
    await page.locator('#target-search-form button[type="submit"]').click();
    await page.locator("#target-form-error").waitFor({ state: "visible" });
    assert.equal(await page.locator("#calendar-workspace").isVisible(), true, "recoverable input error must leave prior result usable");
    assert.equal(await page.locator("#error-panel").isHidden(), true, "recoverable input error must not become a global engine error");
    await assertNoPageOverflow(page, "invalid form state");
    await captureAndCompare(page, { name: "error-invalid-en-desktop", selector: "#search-panel" }, state);
  }, state, {}, [/Missing or invalid input fields/i, /outside the valid range/i, /RangeError/i]);
}

async function loadingState(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.desktop, "loading-state", async (page, context) => {
    let release;
    const gate = new Promise((resolve) => { release = resolve; });
    await context.route(/\/engine\/pastafari-fast-worker\.js(?:\?|$)/, async (route) => { await gate; await route.continue(); });
    try {
      await page.goto(fixedUrl(baseURL, { locale: "en" }), { waitUntil: "domcontentloaded" });
      await page.locator("#loading-panel").waitFor({ state: "visible", timeout: 10_000 });
      await stabilizePage(page);
      await assertNoPageOverflow(page, "loading state");
      await captureAndCompare(page, { name: "loading-en-desktop", selector: "#loading-panel" }, state);
    } finally { release(); }
  }, state);
}

async function engineErrorState(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.desktop, "engine-error-state", async (page, context) => {
    await context.route(/\/engine\/pastafari-fast-worker\.js(?:\?|$)/, (route) => route.abort("failed"));
    await page.goto(fixedUrl(baseURL, { locale: "en" }), { waitUntil: "domcontentloaded" });
    await page.locator("#error-panel").waitFor({ state: "visible", timeout: 20_000 });
    await stabilizePage(page);
    await assertNoPageOverflow(page, "engine error state");
    await captureAndCompare(page, { name: "engine-error-en-desktop", selector: "#error-panel" }, state);
  }, state, {}, [/pastafari-fast-worker/i, /worker/i, /failed/i]);
}

async function breakpointChecks(browser, baseURL, state) {
  await withTracedContext(browser, { width: 1001, height: 900 }, "breakpoints", async (page) => {
    await openFixed(page, baseURL, { locale: "en", comparison: FIXED.comparison });
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.above, height: 900 });
      await stabilizePage(page);
      await assertNoPageOverflow(page, `${bp.name} above ${bp.above}px`);
      const above = await breakpointSnapshot(page, bp.name);
      await page.setViewportSize({ width: bp.below, height: 900 });
      await stabilizePage(page);
      await assertNoPageOverflow(page, `${bp.name} below ${bp.below}px`);
      const below = await breakpointSnapshot(page, bp.name);
      assertBreakpointTransition(bp.name, above, below);
      state.layoutChecks.push({ breakpoint: bp.name, above: bp.above, below: bp.below, result: "PASS" });
    }
  }, state);
}

async function breakpointSnapshot(page, name) {
  if (name === "comparison") return {
    settingsDisplay: await page.locator("#comparison-settings").evaluate((el) => getComputedStyle(el).display),
    tableDisplay: await page.locator(".comparison-scroll").evaluate((el) => getComputedStyle(el).display),
    noteDisplay: await page.locator(".mobile-comparison-note").evaluate((el) => getComputedStyle(el).display),
  };
  if (name === "main-layout") return {
    formColumns: await page.locator("#target-search-form").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    yearColumns: await page.locator(".year-structure-columns").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    reverseConstraintColumns: await page.locator(".reverse-constraint-body").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns),
  };
  if (name === "masthead") return {
    mastheadColumns: await page.locator(".masthead").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    toolbarDirection: await page.locator(".calendar-toolbar").evaluate((el) => getComputedStyle(el).flexDirection),
  };
  if (name === "date-fields") return {
    columns: await page.locator("#target-date-fields").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
    facts: await page.locator(".year-facts").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
  };
  if (name === "small-shell") return {
    shellWidth: (await page.locator(".app-shell").boundingBox())?.width,
    viewport: page.viewportSize()?.width,
  };
  if (name === "reverse") return {
    tabsDisplay: await page.locator(".reverse-mode-tabs").evaluate((el) => getComputedStyle(el).display),
    tabsColumns: await page.locator(".reverse-mode-tabs").evaluate((el) => getComputedStyle(el).gridTemplateColumns),
  };
  throw new Error(`Unknown breakpoint ${name}`);
}

function assertBreakpointTransition(name, above, below) {
  if (name === "comparison") {
    assert.notEqual(above.settingsDisplay, "none"); assert.notEqual(above.tableDisplay, "none"); assert.equal(above.noteDisplay, "none");
    assert.equal(below.settingsDisplay, "none"); assert.equal(below.tableDisplay, "none"); assert.notEqual(below.noteDisplay, "none");
  } else if (name === "main-layout") {
    assert.notEqual(above.formColumns, below.formColumns, "900px breakpoint must change target form layout");
    assert.notEqual(above.yearColumns, below.yearColumns, "900px breakpoint must change year structure columns");
    assert.notEqual(above.reverseConstraintColumns, below.reverseConstraintColumns, "900px breakpoint must change reverse-search constraint layout");
  } else if (name === "masthead") {
    assert.notEqual(above.mastheadColumns, below.mastheadColumns, "760px breakpoint must change masthead grid");
    assert.notEqual(above.toolbarDirection, below.toolbarDirection, "760px breakpoint must change toolbar direction");
  } else if (name === "date-fields") {
    assert.notEqual(above.columns, below.columns, "520px breakpoint must collapse date fields");
    assert.notEqual(above.facts, below.facts, "520px breakpoint must collapse year facts");
  } else if (name === "small-shell") {
    assert.ok(above.shellWidth < above.viewport && below.shellWidth < below.viewport, "shell must retain viewport gutter around 420px breakpoint");
    const aboveGutter = above.viewport - above.shellWidth;
    const belowGutter = below.viewport - below.shellWidth;
    assert.ok(aboveGutter > belowGutter + 8, `420px breakpoint must reduce the shell gutter (above=${aboveGutter}, below=${belowGutter})`);
  } else if (name === "reverse") {
    assert.equal(above.tabsDisplay, "inline-flex"); assert.equal(below.tabsDisplay, "grid");
    assert.notEqual(above.tabsColumns, below.tabsColumns);
  }
}

async function extremeWidths(browser, baseURL, state) {
  for (const [name, viewport] of [["narrow", VIEWPORTS.narrow], ["wide", VIEWPORTS.wide]]) {
    await withTracedContext(browser, viewport, `width-${name}`, async (page) => {
      await openFixed(page, baseURL, { locale: "en" });
      await assertCoreLayout(page, { mobile: name === "narrow" });
      await assertNoPageOverflow(page, `${name} viewport`);
      state.layoutChecks.push({ viewport: `${viewport.width}x${viewport.height}`, result: "PASS" });
    }, state);
  }
}

async function textZoomSmoke(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.mobile, "text-zoom", async (page) => {
    await openFixed(page, baseURL, { locale: "en" });
    await page.addStyleTag({ content: ":root { font-size: 200% !important; }" });
    await stabilizePage(page);
    await assertNoPageOverflow(page, "200% root text size");
    await assertVisibleAndSized(page, ["#language-selector", "#target-search-form", "#calendar-grid", "#year-overview"]);
    state.layoutChecks.push({ mode: "200%-text-size", result: "PASS" });
  }, state);
}

async function forcedColorsSmoke(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.mobile, "forced-colors", async (page) => {
    await openFixed(page, baseURL, { locale: "en" });
    await assertNoPageOverflow(page, "forced colors");
    await assertVisibleAndSized(page, ["#target-beacon", "#calendar-grid", "#year-overview"]);
    state.layoutChecks.push({ mode: "forced-colors", result: "PASS" });
  }, state, { forcedColors: "active" });
}

async function scriptDiversitySmoke(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.mobile, "script-bengali", async (page) => {
    await openFixed(page, baseURL, { locale: "bn" });
    assert.equal(await page.locator("html").getAttribute("lang"), "bn");
    await assertCoreLayout(page, { mobile: true });
    await assertControlNotClipped(page, ["#language-selector", "#target-calendar", ".search-submit"]);
    if (!state.options.layoutOnly) await captureAndCompare(page, { name: "script-bn-mobile", selectors: [".masthead", "#search-panel"] }, state);
    state.layoutChecks.push({ locale: "bn", purpose: "non-Latin script/font-fallback smoke", result: "PASS" });
  }, state);
}

async function standaloneSmoke(browser, state) {
  const context = await newContext(browser, VIEWPORTS.desktop);
  const page = await context.newPage();
  try {
    await context.route(/^(?:https?|wss?):/i, (route) => route.abort("internetdisconnected"));
    const example = pathToFileURL(path.join(ROOT, "browser", "standalone", "example-file.html")).href;
    await page.goto(example, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => Boolean(document.querySelector("#fixed-calendar")?.shadowRoot?.querySelector('button.day[aria-current="date"]')), null, { timeout: 360_000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 1, `standalone file:// page has ${overflow}px unexpected horizontal overflow`);
    state.layoutChecks.push({ mode: "file:// standalone", result: "PASS" });
  } finally { await context.close(); }
}

async function firefoxSmoke(baseURL, state) {
  const firefoxLaunchOptions = { headless: true };
  if (process.env.PASTAFARI_VISUAL_FIREFOX_EXECUTABLE) firefoxLaunchOptions.executablePath = process.env.PASTAFARI_VISUAL_FIREFOX_EXECUTABLE;
  const browser = await firefox.launch(firefoxLaunchOptions);
  try {
    const context = await newContext(browser, VIEWPORTS.desktop);
    const page = await context.newPage();
    try {
      await openFixed(page, baseURL, { locale: "en" });
      await assertCoreLayout(page);
      await page.setViewportSize(VIEWPORTS.mobile);
      await stabilizePage(page);
      await assertNoPageOverflow(page, "Firefox mobile");
      await assertVisibleAndSized(page, ["#search-panel", "#calendar-grid", "#year-overview"]);
      state.layoutChecks.push({ browser: "Firefox", mode: "desktop+mobile layout smoke", result: "PASS" });
    } finally { await context.close(); }
  } finally { await browser.close(); }
}

async function regressionSelfTest(browser, baseURL, state) {
  await withTracedContext(browser, VIEWPORTS.desktop, "regression-self-test", async (page) => {
    await openFixed(page, baseURL, { locale: "en" });
    const target = { name: "self-test-search-panel", selector: "#search-panel" };
    const before = await screenshotBytes(page, target);
    const regressionStyle = await page.addStyleTag({ content: "#target-search-form .search-submit { visibility: hidden !important; }" });
    await stabilizePage(page);
    const after = await screenshotBytes(page, target);
    const changed = comparePng(before, after);
    assert.ok(changed.ratio > MAX_ALLOWED_DIFF_RATIO, `Artificial hidden search control changed only ${(changed.ratio * 100).toFixed(4)}%; comparator sensitivity is insufficient`);
    await regressionStyle.evaluate((node) => node.remove());
    await stabilizePage(page);
    const restored = await screenshotBytes(page, target);
    const restoredDiff = comparePng(before, restored);
    assert.ok(restoredDiff.ratio <= MAX_ALLOWED_DIFF_RATIO, `Artificial regression did not cleanly revert: ${(restoredDiff.ratio * 100).toFixed(4)}% remains`);
    state.layoutChecks.push({ mode: "artificial-visual-regression", injected: ".search-submit visibility:hidden", detectedRatio: changed.ratio, revertedRatio: restoredDiff.ratio, result: "PASS" });
  }, state);
}

async function writeFinalReport(state, browserVersion) {
  const size = await snapshotSize();
  const report = {
    generatedAt: new Date().toISOString(),
    mode: state.options.update ? "update" : state.options.layoutOnly ? "layout-only" : "compare",
    browser: { name: "Chromium", version: browserVersion, playwrightPackage: "1.62.1" },
    canonicalEnvironment: "Ubuntu 24.04 GitHub-hosted runner, Node 22, Playwright 1.62.1 browsers",
    fixedData: Object.fromEntries(Object.entries(FIXED).map(([key, value]) => [key, String(value)])),
    viewports: VIEWPORTS,
    breakpoints: BREAKPOINTS,
    pixelComparator: { channelThreshold: CHANNEL_THRESHOLD, hardMaxDiffPixelRatio: MAX_ALLOWED_DIFF_RATIO, stabilityMultiplier: STABILITY_MULTIPLIER },
    masks: [],
    snapshotCount: size.count,
    snapshotBytes: size.totalBytes,
    results: state.results,
    layoutChecks: state.layoutChecks,
    errors: state.errors,
  };
  await writeFile(REPORT, `${JSON.stringify(report, null, 2)}\n`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) { console.log(usage()); return; }
  await rm(ARTIFACTS, { recursive: true, force: true });
  await Promise.all([ACTUAL, EXPECTED, DIFF, TRACES, BASELINES].map((dir) => mkdir(dir, { recursive: true })));
  const metadata = await readMetadata();
  const state = { options, metadata, results: [], layoutChecks: [], errors: [] };
  const server = await startStaticServer();
  const chromiumLaunchOptions = { headless: true };
  if (process.env.PASTAFARI_VISUAL_CHROMIUM_EXECUTABLE) chromiumLaunchOptions.executablePath = process.env.PASTAFARI_VISUAL_CHROMIUM_EXECUTABLE;
  const browser = await chromium.launch(chromiumLaunchOptions);
  let failed = null;
  try {
    if (options.regressionSelfTest) {
      await regressionSelfTest(browser, server.baseURL, state);
    } else if (!options.layoutOnly) {
      await coreDesktopEnglish(browser, server.baseURL, state);
      await coreLocale(browser, server.baseURL, state, { locale: "he", direction: "rtl", viewport: VIEWPORTS.desktop, suffix: "he-desktop", mobile: false });
      await coreLocale(browser, server.baseURL, state, { locale: "en", direction: "ltr", viewport: VIEWPORTS.mobile, suffix: "en-mobile", mobile: true });
      await coreLocale(browser, server.baseURL, state, { locale: "he", direction: "rtl", viewport: VIEWPORTS.mobile, suffix: "he-mobile", mobile: true });
      await mobileComparison(browser, server.baseURL, state);
      await longLocale(browser, server.baseURL, state, VIEWPORTS.desktop, "desktop");
      await longLocale(browser, server.baseURL, state, VIEWPORTS.mobile, "mobile");
      await invalidState(browser, server.baseURL, state);
      await loadingState(browser, server.baseURL, state);
      await engineErrorState(browser, server.baseURL, state);
    }
    if (!options.regressionSelfTest) {
      await breakpointChecks(browser, server.baseURL, state);
      await extremeWidths(browser, server.baseURL, state);
      await textZoomSmoke(browser, server.baseURL, state);
      await forcedColorsSmoke(browser, server.baseURL, state);
      await scriptDiversitySmoke(browser, server.baseURL, state);
      await standaloneSmoke(browser, state);
      if (!options.update) await firefoxSmoke(server.baseURL, state);
    }
    if (options.update && !options.layoutOnly && !options.regressionSelfTest) {
      state.metadata = {
        ...state.metadata,
        formatVersion: 1,
        generatedAt: new Date().toISOString(),
        generatedWith: {
          node: process.version,
          platform: `${process.platform}-${process.arch}`,
          browser: "Chromium",
          browserVersion: browser.version(),
          playwright: "1.62.1",
        },
        policy: {
          stabilityRuns: options.stabilityRuns,
          channelThreshold: CHANNEL_THRESHOLD,
          maxAllowedDiffPixelRatio: MAX_ALLOWED_DIFF_RATIO,
          toleranceRule: `min(0.002, ${STABILITY_MULTIPLIER} × measured identical-run pixel ratio)`,
          masks: [],
        },
      };
      await writeFile(METADATA_FILE, `${JSON.stringify(state.metadata, null, 2)}\n`);
    }
  } catch (error) {
    failed = error;
  } finally {
    await writeFinalReport(state, browser.version()).catch(() => {});
    await browser.close();
    await server.close();
  }
  if (failed) throw failed;
  console.log(`Visual regression: PASS (${state.results.length} pixel checks, ${state.layoutChecks.length} layout checks)`);
  console.log(`Report: ${path.relative(ROOT, REPORT)}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
