"use strict";

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

import { FIXED, digest, environment, fileSha256, summarize, writeReport } from "./lib.mjs";

const WEB_N = Number(process.env.PASTAFARI_BENCH_WEB_N || 3);
const WEB_TIMEOUT_MS = Number(process.env.PASTAFARI_BENCH_WEB_TIMEOUT_MS || 180_000);
const ROOT = resolve(".");

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
      if (url.pathname === "/__benchmark__/blank.html") {
        const body = Buffer.from("<!doctype html><meta charset=utf-8><title>benchmark</title>");
        res.writeHead(200, {
          "content-type": "text/html; charset=utf-8",
          "content-length": body.length,
          "cache-control": "no-store",
        });
        res.end(body);
        return;
      }
      let path = safePath(url.pathname);
      if (!path) {
        res.writeHead(403).end("Forbidden");
        return;
      }
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

const INIT_SCRIPT = () => {
  globalThis.__pastafariBenchmark = { marks: {}, startedAt: performance.now() };
  const marks = globalThis.__pastafariBenchmark.marks;
  const check = () => {
    const workspace = document.getElementById("calendar-workspace");
    if (workspace && !workspace.hidden && marks.firstCalendarResult === undefined) {
      marks.firstCalendarResult = performance.now();
    }
    const year = document.getElementById("year-overview-content");
    if (year && !year.hidden && marks.yearStructureVisible === undefined) {
      marks.yearStructureVisible = performance.now();
    }
    const submit = document.querySelector("#target-search-form button[type=submit]");
    if (submit && !submit.disabled && marks.controlsPresent === undefined) {
      marks.controlsPresent = performance.now();
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    marks.domContentLoadedObserved = performance.now();
    check();
  }, { once: true });
  new MutationObserver(check).observe(document, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden", "disabled"] });
};

function deterministicUrl(origin, lang = "en") {
  const jdn = FIXED.targetSame.toString();
  return `${origin}/docs/index.html?t=${jdn}&v=${jdn}&c=${FIXED.calculationJdn}&lang=${lang}`;
}

async function collectNetwork(responses) {
  const unique = new Map();
  for (const response of responses) {
    const url = response.url();
    if (!url.startsWith("http://127.0.0.1:")) continue;
    const headers = await response.allHeaders().catch(() => ({}));
    const bytes = Number(headers["content-length"] || 0);
    unique.set(url, { url, bytes, contentType: headers["content-type"] || "" });
  }
  const items = [...unique.values()];
  const js = items.filter((item) => item.url.includes(".js"));
  return {
    requests: items.length,
    bytes: items.reduce((sum, item) => sum + item.bytes, 0),
    javascriptRequests: js.length,
    javascriptBytes: js.reduce((sum, item) => sum + item.bytes, 0),
    localeAssets: items.filter((item) => item.url.includes("/i18n/locales/")).length,
    workerAssets: items.filter((item) => item.url.includes("/engine/") || item.url.includes("worker")).length,
    urls: items.map((item) => item.url),
  };
}

async function pageMetrics(page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const jsResources = resources.filter((entry) => entry.name.includes(".js"));
    const latestJsResponseEnd = jsResources.reduce((max, entry) => Math.max(max, entry.responseEnd), 0);
    return {
      marks: globalThis.__pastafariBenchmark?.marks ?? {},
      navigation: navigation ? {
        responseEnd: navigation.responseEnd,
        domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
        loadEventEnd: navigation.loadEventEnd,
      } : null,
      moduleResourceResponseEnd: latestJsResponseEnd,
      resourceCount: resources.length,
      htmlLang: document.documentElement.lang,
      htmlDir: document.documentElement.dir,
      selectedJdn: document.querySelector('.day-card[aria-current="date"]')?.dataset.jdn ?? null,
      yearVisible: !document.getElementById("year-overview-content")?.hidden,
      serviceWorkerController: Boolean(navigator.serviceWorker?.controller),
    };
  });
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
    const error = document.getElementById("year-overview-error");
    return (content && !content.hidden) || (error && !error.hidden);
  }, null, { timeout: WEB_TIMEOUT_MS });
}

async function oneColdVisit(browser, origin, lang) {
  const context = await browser.newContext();
  await context.addInitScript(INIT_SCRIPT);
  const page = await context.newPage();
  page.setDefaultTimeout(WEB_TIMEOUT_MS);
  const responses = [];
  page.on("response", (response) => responses.push(response));
  const start = performance.now();
  await page.goto(deterministicUrl(origin, lang), { waitUntil: "domcontentloaded", timeout: WEB_TIMEOUT_MS });
  await waitForResult(page);
  const externalElapsedMs = performance.now() - start;
  await waitForYear(page);
  const metrics = await pageMetrics(page);
  const network = await collectNetwork(responses);
  assert.equal(metrics.selectedJdn, FIXED.targetSame.toString());
  assert.equal(metrics.htmlLang, lang);
  assert.equal(metrics.htmlDir, lang === "he" ? "rtl" : "ltr");
  assert.equal(metrics.yearVisible, true, "year structure must be visible; benchmark must not accept the error state as success");
  await context.close();
  return { externalElapsedMs, metrics, network };
}

async function pagesWorkerProbe(page) {
  return page.evaluate(async ({ targetJdn, calculationJdn }) => {
    function request(worker, id, operation, payload) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("Pages worker request timeout")), 180000);
        const onMessage = (event) => {
          if (event.data?.id !== id) return;
          clearTimeout(timer);
          worker.removeEventListener("message", onMessage);
          if (event.data.ok) resolve(event.data.result);
          else reject(new Error(event.data?.error?.message || "Pages worker request failed"));
        };
        worker.addEventListener("message", onMessage);
        worker.postMessage({ id, operation, payload });
      });
    }
    const worker = new Worker("/docs/engine/pastafari-fast-worker.js", { type: "module", name: "pastafari-pages-benchmark" });
    const firstStart = performance.now();
    const first = await request(worker, 1, "getCutletView", { targetJdn, calculationJdn });
    const firstEnd = performance.now();
    const secondStart = performance.now();
    const second = await request(worker, 2, "getCutletView", { targetJdn, calculationJdn });
    const secondEnd = performance.now();
    worker.terminate();
    return {
      firstRoundTripMs: firstEnd - firstStart,
      secondRoundTripMs: secondEnd - secondStart,
      first,
      second,
    };
  }, {
    targetJdn: FIXED.targetSame.toString(),
    calculationJdn: FIXED.calculationJdn.toString(),
  });
}

async function workerProbe(page, workerPath) {
  return page.evaluate(async ({ workerPath, targetJdn, calculationJdn }) => {
    function request(worker, id, operation, payload) {
      return new Promise((resolve, reject) => {
        const onMessage = (event) => {
          if (event.data?.id !== id) return;
          worker.removeEventListener("message", onMessage);
          if (event.data.ok) resolve(event.data.result);
          else reject(new Error(event.data?.error?.message || "worker request failed"));
        };
        worker.addEventListener("message", onMessage);
        worker.postMessage({ id, operation, payload });
      });
    }
    const start = performance.now();
    const worker = new Worker(workerPath, { type: "module" });
    const readyAt = await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("worker ready timeout")), 180000);
      worker.addEventListener("message", (event) => {
        if (event.data?.kind === "ready") {
          clearTimeout(timer);
          resolve(performance.now());
        }
      });
      worker.addEventListener("error", (event) => reject(new Error(event.message || "worker load error")), { once: true });
    });
    const firstStart = performance.now();
    const first = await request(worker, 1, "convert", { targetJdn, calculationJdn });
    const firstEnd = performance.now();
    const secondStart = performance.now();
    const second = await request(worker, 2, "convert", { targetJdn, calculationJdn });
    const secondEnd = performance.now();
    worker.terminate();
    return {
      startupMs: readyAt - start,
      firstRoundTripMs: firstEnd - firstStart,
      secondRoundTripMs: secondEnd - secondStart,
      first,
      second,
    };
  }, {
    workerPath,
    targetJdn: FIXED.targetSame.toString(),
    calculationJdn: FIXED.calculationJdn.toString(),
  });
}

async function main() {
  const rows = [];
  const findings = [];
  const limitations = [];
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const browserVersion = browser.version();

  try {
    for (const lang of ["en", "he"]) {
      const samples = [];
      const htmlResponses = [];
      const dom = [];
      const controls = [];
      const modules = [];
      const years = [];
      const networks = [];
      for (let i = 0; i < WEB_N; i += 1) {
        const visit = await oneColdVisit(browser, server.origin, lang);
        samples.push(visit.metrics.marks.firstCalendarResult ?? visit.externalElapsedMs);
        htmlResponses.push(visit.metrics.navigation?.responseEnd ?? 0);
        dom.push(visit.metrics.navigation?.domContentLoadedEventEnd ?? 0);
        controls.push(visit.metrics.marks.controlsPresent ?? 0);
        modules.push(visit.metrics.moduleResourceResponseEnd);
        years.push(visit.metrics.marks.yearStructureVisible ?? 0);
        networks.push(visit.network);
      }
      const medianNetwork = networks[Math.floor(networks.length / 2)];
      rows.push({
        scenario: `cold first calendar result (${lang})`,
        path: "Pages UI/fast Worker",
        stats: summarize(samples),
        notes: `new browser context; empty storage/cache; lang=${lang}; SW has no controller on first navigation`,
      });
      rows.push({ scenario: `cold HTML responseEnd (${lang})`, path: "Pages UI/navigation", stats: summarize(htmlResponses), notes: "Navigation Timing responseEnd relative to navigationStart=0" });
      rows.push({ scenario: `cold DOMContentLoaded (${lang})`, path: "Pages UI/navigation", stats: summarize(dom), notes: "Navigation Timing domContentLoadedEventEnd" });
      rows.push({ scenario: `cold controls present (${lang})`, path: "Pages UI/DOM readiness", stats: summarize(controls), notes: "target form submit control exists and is enabled; a precise UI-readiness proxy, not TTI" });
      rows.push({ scenario: `cold JS resource response end (${lang})`, path: "Pages UI/module-resources", stats: summarize(modules), notes: "latest window-visible JS resource responseEnd; not module evaluation/TTI" });
      rows.push({ scenario: `cold year structure visible (${lang})`, path: "Pages UI/year-structure+DOM", stats: summarize(years), notes: "full year structure rendered; measured separately from first calendar result" });
      findings.push(`${lang} cold representative network: ${medianNetwork.requests} requests, ${medianNetwork.javascriptRequests} JavaScript responses, ${medianNetwork.javascriptBytes} JS bytes by Content-Length, ${medianNetwork.localeAssets} locale assets, ${medianNetwork.workerAssets} worker/engine assets.`);
    }

    // Warm online and optional offline revisit in one real service-worker context.
    const context = await browser.newContext();
    await context.addInitScript(INIT_SCRIPT);
    const page = await context.newPage();
    page.setDefaultTimeout(WEB_TIMEOUT_MS);
    await page.goto(deterministicUrl(server.origin, "en"), { waitUntil: "domcontentloaded" });
    await waitForResult(page);
    await waitForYear(page);
    await page.evaluate(async () => { if (navigator.serviceWorker) await navigator.serviceWorker.ready; return Boolean(navigator.serviceWorker?.controller); }).catch(() => false);

    await page.evaluate(() => { globalThis.__pastafariBenchmark.marks = {}; });
    const warmStart = performance.now();
    await page.reload({ waitUntil: "domcontentloaded", timeout: WEB_TIMEOUT_MS });
    await waitForResult(page);
    const warmExternal = performance.now() - warmStart;
    const warmMetrics = await pageMetrics(page);
    rows.push({
      scenario: "subsequent online visit",
      path: "Pages UI/warm-navigation",
      stats: summarize([warmMetrics.marks.firstCalendarResult ?? warmExternal]),
      notes: `same context; assets previously loaded; SW controller=${warmMetrics.serviceWorkerController}`,
    });

    // Subsequent explicit calculation after initialization.
    const uiCalc = await page.evaluate(async () => {
      const day = document.getElementById("target-day");
      const form = document.getElementById("target-search-form");
      if (!day || !form) throw new Error("Gregorian target form is not ready");
      day.value = "7";
      const start = performance.now();
      form.requestSubmit();
      while (document.querySelector('.day-card[aria-current="date"]')?.dataset.jdn !== "2461260") {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return performance.now() - start;
    });
    rows.push({ scenario: "subsequent target calculation to DOM", path: "Pages UI/warm Worker+render", stats: summarize([uiCalc]), notes: "2026-08-06 -> 2026-08-07; same initialized page/worker" });

    const languageSwitch = await page.evaluate(async () => {
      const select = document.getElementById("language-selector");
      const start = performance.now();
      select.value = "he";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      while (document.documentElement.lang !== "he" || document.documentElement.dir !== "rtl" || select.disabled) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      return performance.now() - start;
    });
    rows.push({ scenario: "English LTR -> Hebrew RTL switch", path: "Pages UI/i18n rerender", stats: summarize([languageSwitch]), notes: "same calculation state; lazy locale load + UI rerender" });

    // Offline revisit is informative; failure is reported as a limitation rather than falsified data.
    try {
      await context.setOffline(true);
      await page.evaluate(() => { globalThis.__pastafariBenchmark.marks = {}; });
      const offlineStart = performance.now();
      await page.reload({ waitUntil: "domcontentloaded", timeout: 60_000 });
      await waitForResult(page, "2461260");
      const offlineExternal = performance.now() - offlineStart;
      const offlineMetrics = await pageMetrics(page);
      rows.push({
        scenario: "subsequent offline visit",
        path: "Pages UI/PWA",
        stats: summarize([offlineMetrics.marks.firstCalendarResult ?? offlineExternal]),
        notes: `same context after online visit; SW controller=${offlineMetrics.serviceWorkerController}`,
      });
    } catch (error) {
      limitations.push(`Offline revisit was not measured successfully in this environment: ${error.message}`);
    } finally {
      await context.setOffline(false).catch(() => {});
      await context.close();
    }

    // Actual Pages Worker path. It has no readiness message, so first request includes worker creation, module import, and computation.
    {
      const pagesContext = await browser.newContext({ serviceWorkers: "block" });
      const pagesPage = await pagesContext.newPage();
      pagesPage.setDefaultTimeout(WEB_TIMEOUT_MS);
      await pagesPage.goto(`${server.origin}/__benchmark__/blank.html`);
      const probe = await pagesWorkerProbe(pagesPage);
      assert.equal(probe.first.selectedJdn, FIXED.targetSame.toString());
      assert.equal(probe.second.selectedJdn, FIXED.targetSame.toString());
      assert.equal(digest(probe.first), digest(probe.second));
      rows.push({
        scenario: "Pages Worker first getCutletView round-trip",
        path: "Pages UI/actual-fast-worker-first",
        stats: { ...summarize([probe.firstRoundTripMs]), checksum: digest(probe.first) },
        notes: "includes Worker creation + module import + first computation; production Pages worker exposes no separate ready mark",
      });
      rows.push({
        scenario: "Pages Worker second identical getCutletView round-trip",
        path: "Pages UI/actual-fast-worker-second",
        stats: { ...summarize([probe.secondRoundTripMs]), checksum: digest(probe.second) },
        notes: "same initialized Pages worker; worker/module startup excluded; caches may apply",
      });
      await pagesContext.close();
    }

    // Browser Worker overhead using actual published Worker modules.
    for (const [name, path] of [
      ["fast", "/browser/pastafari-fast-worker.js"],
      ["authoritative", "/browser/pastafari-authoritative-worker.js"],
    ]) {
      const workerContext = await browser.newContext({ serviceWorkers: "block" });
      const workerPage = await workerContext.newPage();
      workerPage.setDefaultTimeout(WEB_TIMEOUT_MS);
      await workerPage.goto(`${server.origin}/__benchmark__/blank.html`);
      const probe = await workerProbe(workerPage, path);
      assert.deepStrictEqual(probe.first, probe.second);
      rows.push({ scenario: `${name} Worker creation + module initialization`, path: `${name}/browser-worker-startup`, stats: summarize([probe.startupMs]), notes: "fresh context; ready protocol" });
      rows.push({ scenario: `${name} Worker first message round-trip`, path: `${name}/browser-worker-first`, stats: { ...summarize([probe.firstRoundTripMs]), checksum: digest(probe.first) }, notes: "startup excluded; includes serialization + computation + response" });
      rows.push({ scenario: `${name} Worker second identical round-trip`, path: `${name}/browser-worker-second`, stats: { ...summarize([probe.secondRoundTripMs]), checksum: digest(probe.second) }, notes: name === "fast" ? "includes documented fast cache hit" : "same warm authoritative worker" });
      await workerContext.close();
    }

    findings.push("The real Pages product path uses its direct fast Worker; package-router timing is intentionally kept in the engine report instead of being mislabeled as website latency.");
    limitations.push("`moduleResourceResponseEnd` is a network/resource milestone, not a claim of JavaScript module evaluation completion or TTI. The Pages application exposes no separate module-ready or engine-ready mark; adding one would require production instrumentation. The actual Pages Worker first-round-trip row therefore reports startup+import+computation without pretending those phases are separable.");
    limitations.push("The local static server sets a deterministic one-hour HTTP cache policy. GitHub Pages/CDN transfer behavior can differ, so compare Web baselines under the same harness rather than against arbitrary live-site timings.");

    const report = {
      kind: "web",
      environment: environment({
        browserVersion,
        engineHashes: {
          "Pages fast entry": fileSha256("docs/engine/pastafari-calendar-fast.js"),
          "Pages worker": fileSha256("docs/engine/pastafari-fast-worker.js"),
          "package fast worker": fileSha256("browser/pastafari-fast-worker.js"),
          "package authoritative worker": fileSha256("browser/pastafari-authoritative-worker.js"),
        },
      }),
      rows,
      findings,
      limitations,
    };
    const paths = await writeReport("web", report);
    console.log(`Web benchmark complete: ${paths.mdPath}`);
  } finally {
    await browser.close();
    await server.close();
  }
}

await main();
