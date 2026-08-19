"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

import { ARTIFACT_DIR, FIXED, environment, fileSha256 } from "./lib.mjs";
import { analyzeSeries, formatMiB, linearRegression } from "./memory-lib.mjs";

const ROOT = resolve(".");
const WEB_TIMEOUT_MS = Number(process.env.PASTAFARI_MEMORY_WEB_TIMEOUT_MS || 180_000);
const MIME = Object.freeze({
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".gz": "application/gzip",
});

function parseArgs(argv) {
  const options = { mode: "smoke", output: null };
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    const value = argv[index + 1];
    if (["--mode", "--output"].includes(key)) {
      if (!value) throw new Error(`${key} requires a value.`);
      options[key.slice(2)] = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${key}`);
  }
  if (!["smoke", "soak"].includes(options.mode)) throw new Error(`Unsupported mode: ${options.mode}`);
  options.output ??= `memory-browser-${options.mode}`;
  return options;
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const absolute = resolve(ROOT, relative || "docs/index.html");
  if (absolute !== ROOT && !absolute.startsWith(`${ROOT}${sep}`)) return null;
  return absolute;
}

async function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      if (url.pathname === "/__memory__/blank.html") {
        const body = Buffer.from("<!doctype html><meta charset=utf-8><title>memory</title>");
        res.writeHead(200, { "content-type": "text/html; charset=utf-8", "content-length": body.length, "cache-control": "no-store" });
        res.end(body);
        return;
      }
      let path = safePath(url.pathname);
      if (!path) return res.writeHead(403).end("Forbidden");
      const info = await stat(path).catch(() => null);
      if (info?.isDirectory()) path = resolve(path, "index.html");
      const body = await readFile(path);
      res.writeHead(200, {
        "content-type": MIME[extname(path)] || "application/octet-stream",
        "content-length": body.length,
        "cache-control": "public, max-age=3600",
      });
      res.end(body);
    } catch (error) {
      res.writeHead(error?.code === "ENOENT" ? 404 : 500, { "content-type": "text/plain; charset=utf-8" });
      res.end(error?.message || String(error));
    }
  });
  await new Promise((resolvePromise) => server.listen(0, "127.0.0.1", resolvePromise));
  const address = server.address();
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolvePromise, reject) => server.close((error) => error ? reject(error) : resolvePromise())),
  };
}

function deterministicUrl(origin, lang = "en") {
  const jdn = FIXED.targetSame.toString();
  return `${origin}/docs/index.html?t=${jdn}&v=${jdn}&c=${FIXED.calculationJdn}&lang=${lang}`;
}

async function waitForResult(page, jdn = FIXED.targetSame.toString()) {
  await page.waitForFunction((wanted) => {
    const workspace = document.getElementById("calendar-workspace");
    const selected = document.querySelector('.day-card[aria-current="date"]');
    return workspace && !workspace.hidden && selected?.dataset.jdn === wanted;
  }, jdn, { timeout: WEB_TIMEOUT_MS });
}

async function waitForYear(page) {
  await page.waitForFunction(() => {
    const content = document.getElementById("year-overview-content");
    return content && !content.hidden;
  }, null, { timeout: WEB_TIMEOUT_MS });
}

function metricMap(metrics) {
  return Object.fromEntries(metrics.map((item) => [item.name, item.value]));
}

async function cdpCollectGarbage(page, cdp) {
  await page.evaluate(() => new Promise((resolvePromise) => requestAnimationFrame(() => resolvePromise())));
  await cdp.send("HeapProfiler.collectGarbage");
  await page.evaluate(() => new Promise((resolvePromise) => requestAnimationFrame(() => resolvePromise())));
  await cdp.send("HeapProfiler.collectGarbage");
}

async function browserPoint(page, cdp, label, batch = null, extra = {}) {
  await cdpCollectGarbage(page, cdp);
  const [performanceMetrics, dom] = await Promise.all([
    cdp.send("Performance.getMetrics"),
    cdp.send("Memory.getDOMCounters"),
  ]);
  const metrics = metricMap(performanceMetrics.metrics);
  return {
    label,
    batch,
    heapUsed: metrics.JSHeapUsedSize ?? null,
    heapTotal: metrics.JSHeapTotalSize ?? null,
    documents: dom.documents,
    nodes: dom.nodes,
    jsEventListeners: dom.jsEventListeners,
    layoutObjects: metrics.LayoutObjects ?? null,
    pageWorkers: page.workers().length,
    ...extra,
  };
}

async function browserNoise(page, cdp) {
  const points = [];
  for (let index = 0; index < 4; index += 1) points.push(await browserPoint(page, cdp, `noise-${index + 1}`));
  const heaps = points.map((point) => point.heapUsed);
  const nodes = points.map((point) => point.nodes);
  const listeners = points.map((point) => point.jsEventListeners);
  return {
    points,
    heapRangeBytes: Math.max(...heaps) - Math.min(...heaps),
    nodeRange: Math.max(...nodes) - Math.min(...nodes),
    listenerRange: Math.max(...listeners) - Math.min(...listeners),
  };
}

function analyzeBrowser(points, noise, gate = true) {
  const heap = analyzeSeries(points, {
    gate,
    noiseBytes: noise.heapRangeBytes,
    relativeAllowance: 0.10,
    minimumLeakR2: 0.70,
  });
  const batches = points.filter((point) => Number.isFinite(point.batch));
  const late = batches.slice(-Math.max(3, Math.min(4, Math.floor(batches.length / 2))));
  const nodeFit = linearRegression(late, "nodes");
  const listenerFit = linearRegression(late, "jsEventListeners");
  const baseline = points[0];
  const final = batches.at(-1);
  const allowedNodeGrowth = Math.max(baseline.nodes * 0.08, noise.nodeRange * 8);
  const allowedListenerGrowth = Math.max(Math.max(1, baseline.jsEventListeners) * 0.08, noise.listenerRange * 8);
  const nodeGrowth = final.nodes - baseline.nodes;
  const listenerGrowth = final.jsEventListeners - baseline.jsEventListeners;
  const domRegression = gate && (
    (nodeGrowth > allowedNodeGrowth && nodeFit.slope > 0 && nodeFit.r2 >= 0.70)
    || (listenerGrowth > allowedListenerGrowth && listenerFit.slope > 0 && listenerFit.r2 >= 0.70)
  );
  return {
    heap,
    dom: {
      baselineNodes: baseline.nodes,
      finalNodes: final.nodes,
      nodeGrowth,
      allowedNodeGrowth,
      nodeLateSlopePerBatch: nodeFit.slope,
      nodeLateR2: nodeFit.r2,
      baselineListeners: baseline.jsEventListeners,
      finalListeners: final.jsEventListeners,
      listenerGrowth,
      allowedListenerGrowth,
      listenerLateSlopePerBatch: listenerFit.slope,
      listenerLateR2: listenerFit.r2,
      regression: domRegression,
    },
    result: heap.result === "FAIL" || domRegression ? "FAIL" : "PASS",
  };
}

async function switchLanguage(page, lang) {
  await page.evaluate((wanted) => {
    const select = document.getElementById("language-selector");
    if (!select) throw new Error("language selector missing");
    if (select.value !== wanted) {
      select.value = wanted;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, lang);
  await page.waitForFunction(
    (wanted) => {
      const select = document.getElementById("language-selector");
      return Boolean(select) && document.documentElement.lang === wanted && !select.disabled;
    },
    lang,
    { timeout: WEB_TIMEOUT_MS },
  );
}

async function waitForCalendarSettled(page) {
  await page.waitForFunction(() => {
    const workspace = document.getElementById("calendar-workspace");
    const errorPanel = document.getElementById("error-panel");
    const previous = document.getElementById("previous-cutlet");
    const next = document.getElementById("next-cutlet");
    const yearLoading = document.getElementById("year-overview-loading");
    const yearContent = document.getElementById("year-overview-content");
    const yearError = document.getElementById("year-overview-error");
    const yearSettled = Boolean(
      (yearContent && !yearContent.hidden)
      || (yearError && !yearError.hidden)
      || (yearLoading && yearLoading.hidden)
    );
    return Boolean(
      workspace
      && !workspace.hidden
      && errorPanel?.hidden
      && previous
      && next
      && !previous.disabled
      && !next.disabled
      && yearSettled
    );
  }, null, { timeout: WEB_TIMEOUT_MS });
}

async function setTargetDay(page, day, expectedJdn) {
  // Keep repeated memory operations serialized with the UI's background
  // year-structure request. This benchmark measures retained state, not
  // request cancellation under deliberately overlapping navigation.
  await waitForCalendarSettled(page);
  await page.evaluate(({ day }) => {
    const form = document.getElementById("target-search-form");
    const calendar = document.getElementById("target-calendar");
    if (!form || !calendar) throw new Error("Gregorian target form is unavailable");
    if (calendar.value !== "gregorian") {
      calendar.value = "gregorian";
      calendar.dispatchEvent(new Event("change", { bubbles: true }));
    }
    const year = document.getElementById("target-year") || form.querySelector('[name="year"]');
    const month = document.getElementById("target-month") || form.querySelector('[name="month"]');
    const dayInput = document.getElementById("target-day") || form.querySelector('[name="day"]');
    if (!year || !month || !dayInput) throw new Error("Gregorian target date fields are unavailable");
    year.value = "2026";
    month.value = "8";
    dayInput.value = String(day);
    form.requestSubmit();
  }, { day });

  let waitError = null;
  try {
    await page.waitForFunction(
      (wantedJdn) => {
        const selected = document.querySelector('.day-card[aria-current="date"]');
        const formError = document.getElementById("target-form-error");
        const errorPanel = document.getElementById("error-panel");
        return selected?.dataset.jdn === wantedJdn
          || Boolean((formError && !formError.hidden) || (errorPanel && !errorPanel.hidden));
      },
      expectedJdn,
      { timeout: WEB_TIMEOUT_MS },
    );
  } catch (error) {
    waitError = error;
  }

  const diagnostics = await page.evaluate(() => ({
    href: location.href,
    selectedJdn: document.querySelector('.day-card[aria-current="date"]')?.dataset.jdn ?? null,
    targetCalendar: document.getElementById("target-calendar")?.value ?? null,
    targetYear: document.getElementById("target-year")?.value ?? null,
    targetMonth: document.getElementById("target-month")?.value ?? null,
    targetDay: document.getElementById("target-day")?.value ?? null,
    formError: document.getElementById("target-form-error")?.hidden === false
      ? document.getElementById("target-form-error")?.textContent
      : null,
    appError: document.getElementById("error-panel")?.hidden === false
      ? document.getElementById("error-message")?.textContent
      : null,
    previousDisabled: document.getElementById("previous-cutlet")?.disabled ?? null,
    nextDisabled: document.getElementById("next-cutlet")?.disabled ?? null,
    yearLoadingHidden: document.getElementById("year-overview-loading")?.hidden ?? null,
  }));
  if (diagnostics.selectedJdn !== expectedJdn) {
    throw new Error(`Target-day UI did not reach JDN ${expectedJdn}: ${JSON.stringify(diagnostics)}`, waitError ? { cause: waitError } : undefined);
  }
  await waitForCalendarSettled(page);
}

async function setActionDay(page, day, expectedCalculationJdn) {
  return page.evaluate(async ({ day, expectedCalculationJdn }) => {
    const details = document.getElementById("calculation-settings");
    const form = document.getElementById("action-date-form");
    if (details) details.open = true;
    const input = document.getElementById("action-day") || form?.querySelector('[name="day"]');
    if (!form || !input) return { supported: false, reason: "action-day field unavailable" };
    input.value = String(day);
    try {
      form.requestSubmit();
    } catch (error) {
      return { supported: false, reason: `calculation-day submit failed: ${error?.message || error}` };
    }
    const deadline = performance.now() + 30_000;
    while (new URL(location.href).searchParams.get("c") !== expectedCalculationJdn) {
      if (performance.now() > deadline) return { supported: false, reason: "calculation-day URL state did not update" };
      await new Promise((resolvePromise) => requestAnimationFrame(resolvePromise));
    }
    return { supported: true };
  }, { day, expectedCalculationJdn });
}

async function toggleComparison(page, enabled) {
  return page.evaluate(async (wanted) => {
    const details = document.getElementById("calculation-settings");
    const toggle = document.getElementById("comparison-toggle");
    if (details) details.open = true;
    if (!toggle || toggle.disabled) return { supported: false, reason: "comparison toggle unavailable" };
    if (toggle.checked !== wanted) {
      toggle.checked = wanted;
      toggle.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await new Promise((resolvePromise) => requestAnimationFrame(resolvePromise));
    return { supported: true, checked: toggle.checked };
  }, enabled);
}

async function uiScenario(page, cdp, mode) {
  const limitations = [];
  await switchLanguage(page, "he");
  await switchLanguage(page, "en");
  await setTargetDay(page, 7, "2461260");
  await setTargetDay(page, 6, "2461259");
  const calcProbe = await setActionDay(page, 7, "2461260");
  if (calcProbe.supported) await setActionDay(page, 6, "2461259");
  else limitations.push(`Calculation-day UI cycling could not be exercised: ${calcProbe.reason}.`);
  const comparisonProbe = await toggleComparison(page, true);
  if (comparisonProbe.supported) await toggleComparison(page, false);
  else limitations.push(`Comparison open/close could not be exercised: ${comparisonProbe.reason}.`);

  let localeCount = 2;
  let localeWarmupGrowth = null;
  if (mode === "soak") {
    const beforeLocales = await browserPoint(page, cdp, "before-all-locales");
    const locales = await page.evaluate(() => [...document.getElementById("language-selector").options].map((option) => option.value).filter(Boolean));
    localeCount = locales.length;
    for (const lang of locales) await switchLanguage(page, lang);
    const afterFirstPass = await browserPoint(page, cdp, "after-all-locales-first-pass");
    for (const lang of locales) await switchLanguage(page, lang);
    await switchLanguage(page, "en");
    const afterSecondPass = await browserPoint(page, cdp, "after-all-locales-second-pass");
    localeWarmupGrowth = { beforeLocales, afterFirstPass, afterSecondPass, localeCount };
  }

  const noise = await browserNoise(page, cdp);
  const points = [await browserPoint(page, cdp, "baseline")];
  const batches = mode === "soak" ? 12 : 8;
  const operationsPerBatch = mode === "soak" ? 12 : 6;
  for (let batch = 1; batch <= batches; batch += 1) {
    for (let index = 0; index < operationsPerBatch; index += 1) {
      await switchLanguage(page, (batch + index) % 2 ? "he" : "en");
      await setTargetDay(page, (batch + index) % 2 ? 7 : 6, (batch + index) % 2 ? "2461260" : "2461259");
      if (comparisonProbe.supported && index % 3 === 0) {
        await toggleComparison(page, true);
        await toggleComparison(page, false);
      }
      if (calcProbe.supported && index % 4 === 0) {
        await setActionDay(page, 7, "2461260");
        await setActionDay(page, 6, "2461259");
      }
    }
    points.push(await browserPoint(page, cdp, `batch-${batch}`, batch, {
      currentLanguage: await page.evaluate(() => document.documentElement.lang),
      domElements: await page.evaluate(() => document.querySelectorAll("*").length),
    }));
  }
  return {
    label: "Pages UI repeated operations",
    points,
    noise,
    analysis: analyzeBrowser(points, noise, true),
    workload: { batches, operationsPerBatch, localeCount, calculationDayUiSupported: calcProbe.supported, comparisonSupported: comparisonProbe.supported },
    localeWarmupGrowth,
    limitations,
  };
}

async function waitForNoWorkers(page, timeoutMs = 15_000) {
  const started = Date.now();
  while (page.workers().length !== 0) {
    if (Date.now() - started > timeoutMs) return false;
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 25));
  }
  return true;
}

async function workerCycle(page, cycle) {
  const value = await page.evaluate(async ({ cycle, targetJdn, calculationJdn }) => {
    function request(worker, id, operation, payload) {
      return new Promise((resolvePromise, reject) => {
        const timer = setTimeout(() => reject(new Error("Pages worker memory request timeout")), 180_000);
        const onMessage = (event) => {
          if (event.data?.id !== id) return;
          clearTimeout(timer);
          worker.removeEventListener("message", onMessage);
          if (event.data.ok) resolvePromise(event.data.result);
          else reject(new Error(event.data?.error?.message || "Pages worker memory request failed"));
        };
        worker.addEventListener("message", onMessage);
        worker.postMessage({ id, operation, payload });
      });
    }
    const worker = new Worker("/docs/engine/pastafari-fast-worker.js", { type: "module", name: `pastafari-memory-${cycle}` });
    try {
      const result = await request(worker, cycle, "getCutletView", { targetJdn, calculationJdn });
      return { selectedJdn: String(result.selectedJdn), dayCount: result.days.length };
    } finally {
      worker.terminate();
    }
  }, { cycle, targetJdn: FIXED.targetSame.toString(), calculationJdn: FIXED.calculationJdn.toString() });
  assert.equal(value.selectedJdn, FIXED.targetSame.toString());
  assert.ok(value.dayCount > 0);
  assert.equal(await waitForNoWorkers(page), true, "terminated Pages Worker remained attached to the page");
  return value;
}

async function workerScenario(page, cdp, mode) {
  await workerCycle(page, 0);
  const noise = await browserNoise(page, cdp);
  const points = [await browserPoint(page, cdp, "baseline", null, { pageWorkersAfterTermination: page.workers().length })];
  const batches = mode === "soak" ? 10 : 6;
  const cyclesPerBatch = mode === "soak" ? 5 : 2;
  let cycle = 1;
  for (let batch = 1; batch <= batches; batch += 1) {
    for (let index = 0; index < cyclesPerBatch; index += 1) await workerCycle(page, cycle++);
    points.push(await browserPoint(page, cdp, `batch-${batch}`, batch, { pageWorkersAfterTermination: page.workers().length }));
  }
  assert.ok(points.every((point) => point.pageWorkers === 0 && point.pageWorkersAfterTermination === 0), "Worker lifecycle left an attached Worker after terminate()");
  return {
    label: "Pages Worker creation/termination lifecycle",
    points,
    noise,
    analysis: analyzeBrowser(points, noise, true),
    workload: { batches, cyclesPerBatch, totalCycles: batches * cyclesPerBatch + 1 },
    limitations: [
      "CDP JSHeapUsedSize for the page target does not include the terminated Worker isolate's heap directly. This scenario therefore gates page-side retained state and the observable Worker lifecycle (page.workers() returns to zero), not exact Worker-isolate retained bytes.",
    ],
  };
}

function markdown(report) {
  const lines = [
    `# Pastafari Chromium memory ${report.mode} report`,
    "",
    `Generated: ${report.environment.timestamp}`,
    "",
    "## Environment and method",
    "",
    `- Commit: \`${report.environment.commitSha ?? "unknown"}\``,
    `- Browser: ${report.environment.browserVersion}`,
    `- OS: ${report.environment.os} (${report.environment.architecture})`,
    `- Node harness: ${report.environment.nodeVersion}; V8 ${report.environment.v8Version}`,
    "- Chromium-only measurement via CDP `HeapProfiler.collectGarbage`, `Performance.getMetrics`, and `Memory.getDOMCounters`.",
    "- The page is measured in one browser context with Service Workers blocked so CacheStorage is not confused with process heap.",
    "",
    "## Summary",
    "",
    "| Scenario | Baseline page heap | Final page heap | Late growth | Nodes | Event listeners | Result |",
    "|---|---:|---:|---:|---:|---:|---|",
  ];
  for (const scenario of report.scenarios) {
    const analysis = scenario.analysis;
    const last = scenario.points.filter((point) => Number.isFinite(point.batch)).at(-1);
    lines.push(`| ${scenario.label} | ${formatMiB(analysis.heap.baselineHeapBytes)} | ${formatMiB(analysis.heap.finalHeapBytes)} | ${formatMiB(analysis.heap.lateGrowthBytes)} | ${last.nodes} | ${last.jsEventListeners} | ${analysis.result} |`);
  }
  for (const scenario of report.scenarios) {
    lines.push("", `## ${scenario.label}`, "", "| Batch | JS heap used | JS heap total | Documents | Nodes | Listeners | Page Workers | DOM elements |", "|---:|---:|---:|---:|---:|---:|---:|---:|");
    for (const point of scenario.points) {
      lines.push(`| ${point.batch ?? point.label} | ${formatMiB(point.heapUsed)} | ${formatMiB(point.heapTotal)} | ${point.documents} | ${point.nodes} | ${point.jsEventListeners} | ${point.pageWorkers} | ${point.domElements ?? "—"} |`);
    }
    if (scenario.localeWarmupGrowth) {
      const warm = scenario.localeWarmupGrowth;
      lines.push("", `All-locale soak loaded ${warm.localeCount} locale options once, then repeated the same set. First-pass growth is expected module-cache warm-up; the second pass is the relevant repeated-use check.`);
    }
    for (const limitation of scenario.limitations ?? []) lines.push("", `- Limitation: ${limitation}`);
  }
  lines.push(
    "",
    "## Browser-specific limitations",
    "",
    "- These numbers are Chromium/CDP metrics, not portable cross-browser memory measurements.",
    "- Page-target JS heap does not directly include Worker-isolate heap. Worker lifecycle is additionally checked by ensuring terminated Workers disappear from Playwright's page worker list.",
    "- Browser-process RSS is intentionally not used as a merge gate; allocator/process reuse would make it a poor reachable-object signal here.",
    "- DOM node/listener counts are complementary diagnostics, not substitutes for heap measurement.",
    "",
    `Overall: **${report.result}**`,
    "",
  );
  return `${lines.join("\n")}\n`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const browserVersion = browser.version();
  const scenarios = [];
  try {
    const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.setDefaultTimeout(WEB_TIMEOUT_MS);
    await page.goto(deterministicUrl(server.origin, "en"), { waitUntil: "domcontentloaded", timeout: WEB_TIMEOUT_MS });
    await waitForResult(page);
    await waitForYear(page);
    const cdp = await context.newCDPSession(page);
    await cdp.send("Performance.enable");
    scenarios.push(await uiScenario(page, cdp, options.mode));
    await context.close();

    const workerContext = await browser.newContext({ serviceWorkers: "block" });
    const workerPage = await workerContext.newPage();
    workerPage.setDefaultTimeout(WEB_TIMEOUT_MS);
    await workerPage.goto(`${server.origin}/__memory__/blank.html`, { waitUntil: "domcontentloaded" });
    const workerCdp = await workerContext.newCDPSession(workerPage);
    await workerCdp.send("Performance.enable");
    scenarios.push(await workerScenario(workerPage, workerCdp, options.mode));
    await workerContext.close();
  } finally {
    await browser.close().catch(() => {});
    await server.close().catch(() => {});
  }

  const report = {
    kind: "browser-memory",
    mode: options.mode,
    environment: environment({
      browserVersion,
      v8Version: process.versions.v8,
      measurementApi: "Chromium CDP HeapProfiler/Performance/Memory",
      engineHashes: {
        "Pages fast worker": fileSha256("docs/engine/pastafari-fast-worker.js"),
        "Pages app": fileSha256("docs/app.js"),
      },
    }),
    scenarios,
    result: scenarios.some((scenario) => scenario.analysis.result === "FAIL") ? "FAIL" : "PASS",
  };
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const jsonPath = resolve(ARTIFACT_DIR, `${options.output}.json`);
  const mdPath = resolve(ARTIFACT_DIR, `${options.output}.md`);
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, markdown(report), "utf8");
  console.log(`Browser memory ${options.mode} report: ${mdPath}`);
  if (report.result === "FAIL") throw new Error(`Possible browser retained-memory regression. See ${mdPath}.`);
}

await main();
