import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const DOCS_ROOT = path.join(ROOT, "docs");
const SW_PATH = path.join(DOCS_ROOT, "sw.js");
const CACHE_PREFIX = "pastafari-static-";
const UI_TIMEOUT_MS = 180_000;

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

function parsePrecacheAssets(swSource) {
  const match = swSource.match(/\bconst\s+ASSETS\s*=\s*\[([\s\S]*?)\]\s*;/);
  assert(match, "Could not locate the ASSETS array in docs/sw.js");
  const literals = [...match[1].matchAll(/"((?:\\.|[^"\\])*)"/g)];
  const assets = literals.map((entry) => JSON.parse(`"${entry[1]}"`));
  assert(assets.length > 0, "docs/sw.js ASSETS array is empty");
  return assets;
}

function selectRequiredPrecacheAssets(assets) {
  const rules = [
    ["index.html", (pathname) => pathname.endsWith("/index.html")],
    ["app.js", (pathname) => pathname.endsWith("/app.js")],
    ["styles.css", (pathname) => pathname.endsWith("/styles.css")],
    ["fast engine", (pathname) => pathname.endsWith("/engine/pastafari-calendar-fast.js")],
    ["fast worker", (pathname) => pathname.endsWith("/engine/pastafari-fast-worker.js")],
  ];

  return rules.map(([label, predicate]) => {
    const asset = assets.find((candidate) => {
      const pathname = new URL(candidate, "http://example.invalid/").pathname;
      return predicate(pathname);
    });
    assert(asset, `docs/sw.js does not precache the required ${label} asset`);
    return { label, asset };
  });
}

function contentType(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

async function startStaticServer() {
  let requestCount = 0;
  const requests = [];

  const server = createServer(async (request, response) => {
    requestCount += 1;
    requests.push({ method: request.method, url: request.url });

    try {
      const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(requestUrl.pathname);
      if (pathname === "/") pathname = "/index.html";

      const relativePath = pathname.replace(/^\/+/, "");
      const resolved = path.resolve(DOCS_ROOT, relativePath);
      const relativeToDocs = path.relative(DOCS_ROOT, resolved);
      if (relativeToDocs.startsWith("..") || path.isAbsolute(relativeToDocs)) {
        response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Forbidden");
        return;
      }

      const info = await stat(resolved).catch(() => null);
      if (!info?.isFile()) {
        response.writeHead(404, {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end("Not found");
        return;
      }

      const body = await readFile(resolved);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": body.length,
        "Content-Type": contentType(resolved),
        "Service-Worker-Allowed": "/",
      });
      if (request.method === "HEAD") response.end();
      else response.end(body);
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
  assert(address && typeof address === "object", "Local HTTP server did not expose an address");
  const origin = `http://127.0.0.1:${address.port}`;

  let closed = false;
  const close = async () => {
    if (closed) return;
    closed = true;
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  };

  return {
    origin,
    server,
    getRequestCount: () => requestCount,
    getRequests: () => [...requests],
    isListening: () => server.listening,
    close,
  };
}

async function calendarSnapshot(page, label) {
  await page.waitForFunction(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const grid = document.querySelector("#calendar-grid");
    const errorPanel = document.querySelector("#error-panel");
    return Boolean(
      workspace
      && grid
      && errorPanel
      && !workspace.hidden
      && grid.children.length > 0
      && errorPanel.hidden,
    );
  }, null, { timeout: UI_TIMEOUT_MS });

  const snapshot = await page.evaluate(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const grid = document.querySelector("#calendar-grid");
    const errorPanel = document.querySelector("#error-panel");
    return {
      workspaceHidden: workspace?.hidden ?? null,
      gridChildren: grid?.children.length ?? 0,
      gridTextLength: grid?.textContent?.trim().length ?? 0,
      errorPanelHidden: errorPanel?.hidden ?? null,
      controlled: Boolean(navigator.serviceWorker?.controller),
      controllerState: navigator.serviceWorker?.controller?.state ?? null,
      controllerScriptURL: navigator.serviceWorker?.controller?.scriptURL ?? null,
      url: location.href,
    };
  });

  assert.equal(snapshot.workspaceHidden, false, `${label}: #calendar-workspace is hidden`);
  assert(snapshot.gridChildren > 0, `${label}: #calendar-grid has no rendered day elements`);
  assert(snapshot.gridTextLength > 0, `${label}: #calendar-grid has no rendered content`);
  assert.equal(snapshot.errorPanelHidden, true, `${label}: #error-panel is visible`);
  console.log(`[PASS] ${label}: ${JSON.stringify(snapshot)}`);
  return snapshot;
}

async function serviceWorkerSnapshot(page) {
  return page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    return {
      scope: registration.scope,
      activeState: registration.active?.state ?? null,
      activeScriptURL: registration.active?.scriptURL ?? null,
      controlled: Boolean(navigator.serviceWorker.controller),
      controllerState: navigator.serviceWorker.controller?.state ?? null,
      controllerScriptURL: navigator.serviceWorker.controller?.scriptURL ?? null,
    };
  });
}

async function inspectPrecache(page, requiredAssets) {
  return page.evaluate(async ({ cachePrefix, requiredAssets }) => {
    const registration = await navigator.serviceWorker.ready;
    const cacheNames = (await caches.keys()).filter((name) => name.startsWith(cachePrefix));
    const cachesInspected = [];

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const matches = {};
      for (const entry of requiredAssets) {
        const exactUrl = new URL(entry.asset, registration.scope).href;
        const response = await cache.match(exactUrl);
        matches[entry.label] = response
          ? { present: true, status: response.status, url: exactUrl }
          : { present: false, status: null, url: exactUrl };
      }
      cachesInspected.push({ cacheName, matches });
    }

    return { cacheNames, cachesInspected };
  }, { cachePrefix: CACHE_PREFIX, requiredAssets });
}

function assertSuccessfulNavigation(response, label) {
  assert(response, `${label}: navigation returned no response`);
  assert(response.ok(), `${label}: navigation status ${response.status()}`);
  return {
    status: response.status(),
    url: response.url(),
    fromServiceWorker: response.fromServiceWorker(),
  };
}

const startedAt = Date.now();
const swSource = await readFile(SW_PATH, "utf8");
const precacheAssets = parsePrecacheAssets(swSource);
const requiredPrecacheAssets = selectRequiredPrecacheAssets(precacheAssets);

const serverState = await startStaticServer();
const { origin } = serverState;
let browser;
let phase = "startup";
const pageErrors = [];
const consoleErrors = [];
const requestFailures = [];
const badResponses = [];
const successfulOfflineNavigations = new Set();

try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: "allow" });
  const page = await context.newPage();

  page.on("pageerror", (error) => {
    pageErrors.push({ phase, message: error.message, stack: error.stack ?? null });
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push({ phase, text: message.text() });
    }
  });
  page.on("requestfailed", (request) => {
    requestFailures.push({
      phase,
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      isNavigationRequest: request.isNavigationRequest(),
      errorText: request.failure()?.errorText ?? "unknown",
    });
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      badResponses.push({ phase, url: response.url(), status: response.status() });
    }
  });

  phase = "online-load";
  const onlineResponse = await page.goto(`${origin}/`, { waitUntil: "load", timeout: UI_TIMEOUT_MS });
  console.log(`[PASS] online navigation: ${JSON.stringify(assertSuccessfulNavigation(onlineResponse, "online load"))}`);
  await calendarSnapshot(page, "online calendar render");

  phase = "service-worker-ready";
  let sw = await serviceWorkerSnapshot(page);
  assert.equal(sw.activeState, "activated", `Service Worker active state is ${sw.activeState}`);
  console.log(`[PASS] navigator.serviceWorker.ready: ${JSON.stringify(sw)}`);

  if (!sw.controlled) {
    phase = "online-controller-reload";
    const controllerReload = await page.reload({ waitUntil: "load", timeout: UI_TIMEOUT_MS });
    console.log(`[PASS] online controller reload: ${JSON.stringify(assertSuccessfulNavigation(controllerReload, "online controller reload"))}`);
    await calendarSnapshot(page, "online calendar render after controller reload");
    sw = await serviceWorkerSnapshot(page);
  }

  assert(sw.controlled, "Page is not controlled by a Service Worker after ready/reload");
  assert.equal(sw.controllerState, "activated", `Service Worker controller state is ${sw.controllerState}`);
  console.log(`[PASS] Service Worker controller active: ${JSON.stringify(sw)}`);

  phase = "precache-check";
  const precache = await inspectPrecache(page, requiredPrecacheAssets);
  assert(precache.cacheNames.length > 0, `No Cache Storage entry starts with ${CACHE_PREFIX}`);
  const completeCache = precache.cachesInspected.find((entry) => (
    requiredPrecacheAssets.every(({ label }) => entry.matches[label]?.present)
  ));
  assert(completeCache, `No ${CACHE_PREFIX} cache contains all required precache assets`);
  for (const { label } of requiredPrecacheAssets) {
    assert.equal(completeCache.matches[label].status, 200, `Precached ${label} response is not HTTP 200`);
  }
  console.log(`[PASS] precache verified from docs/sw.js exact asset URLs: ${JSON.stringify(completeCache)}`);

  phase = "disable-http-cache";
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  console.log("[PASS] Chromium HTTP cache disabled via CDP Network.setCacheDisabled({ cacheDisabled: true })");

  await page.waitForTimeout(250);
  const onlineServerRequestCount = serverState.getRequestCount();
  phase = "stop-local-server";
  await serverState.close();
  assert.equal(serverState.isListening(), false, "Local HTTP server is still listening before offline navigation");
  console.log(`[PASS] local HTTP server stopped before offline navigation; it can no longer satisfy requests (online request count=${onlineServerRequestCount})`);

  phase = "set-offline";
  await context.setOffline(true);
  console.log("[PASS] Playwright browser context set offline after the local HTTP server was stopped");

  phase = "offline-reload";
  const offlineReloadResponse = await page.reload({ waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const offlineReloadNavigation = assertSuccessfulNavigation(offlineReloadResponse, "offline reload");
  successfulOfflineNavigations.add("offline-reload");
  assert.equal(offlineReloadNavigation.fromServiceWorker, true, "Offline reload response was not served by the Service Worker");
  console.log(`[PASS] offline reload navigation: ${JSON.stringify(offlineReloadNavigation)}`);
  const offlineReloadSnapshot = await calendarSnapshot(page, "offline reload calendar render");
  assert(offlineReloadSnapshot.controlled, "Service Worker lost control after offline reload");

  phase = "offline-probe";
  const offlineProbeResponse = await page.goto(`${origin}/offline-probe`, { waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const offlineProbeNavigation = assertSuccessfulNavigation(offlineProbeResponse, "offline /offline-probe navigation");
  successfulOfflineNavigations.add("offline-probe");
  assert.equal(offlineProbeNavigation.fromServiceWorker, true, "/offline-probe response was not served by the Service Worker");
  console.log(`[PASS] offline /offline-probe navigation fallback: ${JSON.stringify(offlineProbeNavigation)}`);
  const offlineProbeSnapshot = await calendarSnapshot(page, "offline /offline-probe calendar render");
  assert(offlineProbeSnapshot.controlled, "Service Worker does not control /offline-probe");

  const expectedOfflineNavigationFailure = (entry) => {
    if (!entry.isNavigationRequest) return false;
    if (!successfulOfflineNavigations.has(entry.phase)) return false;
    if (!entry.url.startsWith(origin)) return false;
    return /ERR_(?:INTERNET_DISCONNECTED|NETWORK_CHANGED|FAILED|CONNECTION_REFUSED|CONNECTION_RESET|CONNECTION_CLOSED|ADDRESS_UNREACHABLE)/.test(entry.errorText);
  };
  const unexpectedRequestFailures = requestFailures.filter((entry) => !expectedOfflineNavigationFailure(entry));

  assert.deepEqual(pageErrors, [], `pageerror events: ${JSON.stringify(pageErrors)}`);
  assert.deepEqual(consoleErrors, [], `console.error messages: ${JSON.stringify(consoleErrors)}`);
  assert.deepEqual(unexpectedRequestFailures, [], `Unexpected request failures: ${JSON.stringify(unexpectedRequestFailures)}`);
  assert.deepEqual(badResponses, [], `HTTP responses with status >=400: ${JSON.stringify(badResponses)}`);

  console.log(`[PASS] error monitoring clean: pageerror=0 console.error=0 unexpected request failures=0 bad responses=0`);
  console.log(`[PASS] PWA offline smoke complete in ${Date.now() - startedAt} ms`);
} finally {
  if (browser) await browser.close().catch(() => {});
  await serverState.close().catch(() => {});
}
