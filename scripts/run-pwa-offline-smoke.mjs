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
  const match = swSource.match(/\bconst\s+CORE_ASSETS\s*=\s*\[([\s\S]*?)\]\s*;/);
  assert(match, "Could not locate the CORE_ASSETS array in docs/sw.js");
  const literals = [...match[1].matchAll(/"((?:\\.|[^"\\])*)"/g)];
  const assets = literals.map((entry) => JSON.parse(`"${entry[1]}"`));
  assert(assets.length > 0, "docs/sw.js CORE_ASSETS array is empty");
  return assets;
}

function selectRequiredPrecacheAssets(assets) {
  const rules = [
    ["index.html", (pathname) => pathname.endsWith("/index.html")],
    ["app.js", (pathname) => pathname.endsWith("/app.js")],
    ["styles.css", (pathname) => pathname.endsWith("/styles.css")],
    ["fast engine", (pathname) => pathname.endsWith("/engine/pastafari-calendar-fast.js")],
    ["fast worker", (pathname) => pathname.endsWith("/engine/pastafari-fast-worker.js")],
    ["reverse UI", (pathname) => pathname.endsWith("/reverse-ui.js")],
    ["reverse controller", (pathname) => pathname.endsWith("/reverse-search-controller.js")],
    ["constraint client", (pathname) => pathname.endsWith("/engine/pastafari-constraints-client.js")],
    ["constraint solver", (pathname) => pathname.endsWith("/engine/pastafari-constraints.js")],
    ["reverse worker", (pathname) => pathname.endsWith("/engine/pastafari-reverse-worker.js")],
    ["i18n registry", (pathname) => pathname.endsWith("/i18n/registry.js")],
    ["i18n runtime", (pathname) => pathname.endsWith("/i18n/runtime.js")],
    ["English locale", (pathname) => pathname.endsWith("/i18n/locales/en.js")],
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
    getRequestCount: () => requestCount,
    getRequests: () => [...requests],
    isListening: () => server.listening,
    close,
  };
}

function createDiagnostics(origin) {
  return {
    phase: "startup",
    pageErrors: [],
    consoleErrors: [],
    requestFailures: [],
    badResponses: [],
    offlineResponses: [],
    successfulOfflineNavigationPhases: new Set(),
    origin,
  };
}

function attachDiagnostics(page, diagnostics) {
  page.on("pageerror", (error) => {
    diagnostics.pageErrors.push({
      phase: diagnostics.phase,
      message: error.message,
      stack: error.stack ?? null,
    });
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      diagnostics.consoleErrors.push({
        phase: diagnostics.phase,
        text: message.text(),
      });
    }
  });

  page.on("requestfailed", (request) => {
    diagnostics.requestFailures.push({
      phase: diagnostics.phase,
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      isNavigationRequest: request.isNavigationRequest(),
      errorText: request.failure()?.errorText ?? "unknown",
    });
  });

  page.on("response", (response) => {
    const entry = {
      phase: diagnostics.phase,
      url: response.url(),
      status: response.status(),
      fromServiceWorker: response.fromServiceWorker(),
      resourceType: response.request().resourceType(),
    };

    if (response.status() >= 400) diagnostics.badResponses.push(entry);
    if (
      diagnostics.phase.startsWith("offline")
      && entry.url.startsWith(diagnostics.origin)
    ) {
      diagnostics.offlineResponses.push(entry);
    }
  });
}

async function liveDomSnapshot(page) {
  return page.evaluate(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const grid = document.querySelector("#calendar-grid");
    const loadingPanel = document.querySelector("#loading-panel");
    const errorPanel = document.querySelector("#error-panel");
    const errorMessage = document.querySelector("#error-message");
    return {
      readyState: document.readyState,
      workspaceHidden: workspace?.hidden ?? null,
      gridChildren: grid?.children.length ?? 0,
      gridTextLength: grid?.textContent?.trim().length ?? 0,
      loadingPanelHidden: loadingPanel?.hidden ?? null,
      errorPanelHidden: errorPanel?.hidden ?? null,
      errorText: errorMessage?.textContent?.trim() ?? "",
      controlled: Boolean(navigator.serviceWorker?.controller),
      controllerState: navigator.serviceWorker?.controller?.state ?? null,
      controllerScriptURL: navigator.serviceWorker?.controller?.scriptURL ?? null,
      url: location.href,
    };
  });
}

function compactDiagnostics(diagnostics, dom = null) {
  return {
    phase: diagnostics.phase,
    dom,
    pageErrors: diagnostics.pageErrors.slice(-20),
    consoleErrors: diagnostics.consoleErrors.slice(-20),
    requestFailures: diagnostics.requestFailures.slice(-30),
    badResponses: diagnostics.badResponses.slice(-30),
    offlineResponses: diagnostics.offlineResponses.slice(-50),
  };
}

async function calendarSnapshot(page, label, diagnostics) {
  try {
    await page.waitForFunction(() => {
      const workspace = document.querySelector("#calendar-workspace");
      const grid = document.querySelector("#calendar-grid");
      const errorPanel = document.querySelector("#error-panel");

      const ready = Boolean(
        workspace
        && grid
        && errorPanel
        && !workspace.hidden
        && grid.children.length > 0
        && errorPanel.hidden,
      );
      const failed = Boolean(errorPanel && !errorPanel.hidden);
      return ready || failed;
    }, null, { timeout: UI_TIMEOUT_MS });
  } catch (error) {
    const dom = await liveDomSnapshot(page).catch(() => null);
    throw new Error(
      `${label}: timed out waiting for the calendar UI. Diagnostics: ${JSON.stringify(
        compactDiagnostics(diagnostics, dom),
      )}`,
      { cause: error },
    );
  }

  const snapshot = await liveDomSnapshot(page);

  if (snapshot.errorPanelHidden === false) {
    throw new Error(
      `${label}: application error panel became visible. Diagnostics: ${JSON.stringify(
        compactDiagnostics(diagnostics, snapshot),
      )}`,
    );
  }

  assert.equal(snapshot.workspaceHidden, false, `${label}: #calendar-workspace is hidden`);
  assert(snapshot.gridChildren > 0, `${label}: #calendar-grid has no rendered day elements`);
  assert(snapshot.gridTextLength > 0, `${label}: #calendar-grid has no rendered content`);
  assert.equal(snapshot.errorPanelHidden, true, `${label}: #error-panel is visible`);
  console.log(`[PASS] ${label}: ${JSON.stringify(snapshot)}`);
  return snapshot;
}

async function offlineReverseSmoke(page, label) {
  const result = await page.evaluate(async () => {
    const engine = await import("./engine/pastafari-calendar-fast.js");
    const ids = await import("./i18n/calendar-identifiers.js?v=8-year-structure");
    const reverse = await import("./reverse-search-controller.js");

    const calculationJdn = engine.gregorianToJdn(new engine.GregorianDate(2026n, 8, 6));
    const targetJdn = calculationJdn + 3n;
    const raw = new engine.PastafariCalendar().convertJdn(targetJdn, { calculationJdn }).toJSON();
    const cutlet = ids.CUTLETS.find((entry) => entry.internalName === raw.cutletName);
    const month = ids.MONTHS.find((entry) => entry.internalName === raw.monthName);
    if (!cutlet || !month) throw new Error("Could not map reverse smoke date identifiers.");

    const problem = reverse.simpleReverseProblem({
      year: raw.year,
      cutletId: cutlet.id,
      dayInCutlet: raw.dayInCutlet,
      monthId: month.id,
      dayInMonth: raw.dayInMonth,
    }, calculationJdn);
    const controller = new reverse.ReverseSearchController();
    try {
      const solved = await controller.solve(problem, { timeoutMs: 30_000 });
      return {
        complete: solved.result.complete,
        targets: solved.result.solutions.map((solution) => solution.target.jdn.toString()),
        expected: targetJdn.toString(),
      };
    } finally {
      controller.dispose();
    }
  });

  assert.equal(result.complete, true, `${label}: reverse search did not complete`);
  assert(result.targets.includes(result.expected), `${label}: expected reverse target was not returned`);
  console.log(`[PASS] ${label}: ${JSON.stringify(result)}`);
  return result;
}

async function serviceWorkerSnapshot(page) {
  return page.evaluate(async (timeoutMs) => {
    const registration = await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((_, reject) => setTimeout(
        () => reject(new Error(`navigator.serviceWorker.ready did not resolve within ${timeoutMs} ms`)),
        timeoutMs,
      )),
    ]);
    return {
      scope: registration.scope,
      activeState: registration.active?.state ?? null,
      activeScriptURL: registration.active?.scriptURL ?? null,
      controlled: Boolean(navigator.serviceWorker.controller),
      controllerState: navigator.serviceWorker.controller?.state ?? null,
      controllerScriptURL: navigator.serviceWorker.controller?.scriptURL ?? null,
    };
  }, 30_000);
}

async function inspectPrecache(page, allAssets, requiredAssets) {
  return page.evaluate(async ({ cachePrefix, allAssets, requiredAssets }) => {
    const registration = await navigator.serviceWorker.ready;
    const cacheNames = (await caches.keys()).filter((name) => name.startsWith(cachePrefix));
    const cachesInspected = [];

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requiredMatches = {};
      for (const entry of requiredAssets) {
        const exactUrl = new URL(entry.asset, registration.scope).href;
        const response = await cache.match(exactUrl);
        requiredMatches[entry.label] = response
          ? { present: true, status: response.status, url: exactUrl }
          : { present: false, status: null, url: exactUrl };
      }

      const missingAssets = [];
      for (const asset of allAssets) {
        const exactUrl = new URL(asset, registration.scope).href;
        if (!(await cache.match(exactUrl))) missingAssets.push(exactUrl);
      }

      cachesInspected.push({
        cacheName,
        requiredMatches,
        totalDeclaredAssets: allAssets.length,
        missingAssets,
      });
    }

    return { cacheNames, cachesInspected };
  }, { cachePrefix: CACHE_PREFIX, allAssets, requiredAssets });
}

async function inspectOptionalLocaleCache(page, relativeAsset) {
  return page.evaluate(async (asset) => {
    const registration = await navigator.serviceWorker.ready;
    const exactUrl = new URL(asset, registration.scope).href;
    const response = await caches.match(exactUrl);
    return { exactUrl, present: Boolean(response), status: response?.status ?? null };
  }, relativeAsset);
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

function assertOfflineResponsesCameFromServiceWorker(diagnostics, phase, label) {
  const responses = diagnostics.offlineResponses.filter((entry) => entry.phase === phase);
  assert(responses.length > 0, `${label}: no same-origin responses were observed`);

  const bypasses = responses.filter((entry) => !entry.fromServiceWorker);
  assert.deepEqual(
    bypasses,
    [],
    `${label}: same-origin responses bypassed the Service Worker: ${JSON.stringify(bypasses)}`,
  );

  console.log(
    `[PASS] ${label}: ${responses.length} same-origin responses, all from Service Worker`,
  );
}

function expectedOfflineNavigationFailure(entry, diagnostics) {
  if (!entry.isNavigationRequest) return false;
  if (!diagnostics.successfulOfflineNavigationPhases.has(entry.phase)) return false;
  if (!entry.url.startsWith(diagnostics.origin)) return false;
  return /ERR_(?:INTERNET_DISCONNECTED|NETWORK_CHANGED|FAILED|CONNECTION_REFUSED|CONNECTION_RESET|CONNECTION_CLOSED|ADDRESS_UNREACHABLE)/.test(entry.errorText);
}

function assertDiagnosticsClean(diagnostics) {
  const unexpectedRequestFailures = diagnostics.requestFailures.filter(
    (entry) => !expectedOfflineNavigationFailure(entry, diagnostics),
  );

  assert.deepEqual(
    diagnostics.pageErrors,
    [],
    `pageerror events: ${JSON.stringify(diagnostics.pageErrors)}`,
  );
  assert.deepEqual(
    diagnostics.consoleErrors,
    [],
    `console.error messages: ${JSON.stringify(diagnostics.consoleErrors)}`,
  );
  assert.deepEqual(
    unexpectedRequestFailures,
    [],
    `Unexpected request failures: ${JSON.stringify(unexpectedRequestFailures)}`,
  );
  assert.deepEqual(
    diagnostics.badResponses,
    [],
    `HTTP responses with status >=400: ${JSON.stringify(diagnostics.badResponses)}`,
  );
}

const startedAt = Date.now();
const swSource = await readFile(SW_PATH, "utf8");
const precacheAssets = parsePrecacheAssets(swSource);
const requiredPrecacheAssets = selectRequiredPrecacheAssets(precacheAssets);

const serverState = await startStaticServer();
const { origin } = serverState;
let browser;
let context;
let page;
const diagnostics = createDiagnostics(origin);

try {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({ serviceWorkers: "allow" });
  page = await context.newPage();
  attachDiagnostics(page, diagnostics);

  diagnostics.phase = "online-load";
  const onlineResponse = await page.goto(`${origin}/`, {
    waitUntil: "load",
    timeout: UI_TIMEOUT_MS,
  });
  console.log(
    `[PASS] online navigation: ${JSON.stringify(
      assertSuccessfulNavigation(onlineResponse, "online load"),
    )}`,
  );
  await calendarSnapshot(page, "online calendar render", diagnostics);

  diagnostics.phase = "service-worker-ready";
  let sw = await serviceWorkerSnapshot(page);
  assert.equal(sw.activeState, "activated", `Service Worker active state is ${sw.activeState}`);
  console.log(`[PASS] navigator.serviceWorker.ready: ${JSON.stringify(sw)}`);

  if (!sw.controlled) {
    diagnostics.phase = "online-controller-reload";
    const controllerReload = await page.reload({
      waitUntil: "load",
      timeout: UI_TIMEOUT_MS,
    });
    console.log(
      `[PASS] online controller reload: ${JSON.stringify(
        assertSuccessfulNavigation(controllerReload, "online controller reload"),
      )}`,
    );
    await calendarSnapshot(
      page,
      "online calendar render after controller reload",
      diagnostics,
    );
    sw = await serviceWorkerSnapshot(page);
  }

  assert(sw.controlled, "Page is not controlled by a Service Worker after ready/reload");
  assert.equal(
    sw.controllerState,
    "activated",
    `Service Worker controller state is ${sw.controllerState}`,
  );
  console.log(`[PASS] Service Worker controller active: ${JSON.stringify(sw)}`);

  diagnostics.phase = "precache-check";
  const precache = await inspectPrecache(
    page,
    precacheAssets,
    requiredPrecacheAssets,
  );
  assert(precache.cacheNames.length > 0, `No Cache Storage entry starts with ${CACHE_PREFIX}`);

  const completeCache = precache.cachesInspected.find((entry) => (
    entry.missingAssets.length === 0
    && requiredPrecacheAssets.every(({ label }) => (
      entry.requiredMatches[label]?.present
      && entry.requiredMatches[label]?.status === 200
    ))
  ));
  assert(
    completeCache,
    `No ${CACHE_PREFIX} cache contains every declared precache asset`,
  );
  console.log(
    `[PASS] exact precache complete: ${completeCache.totalDeclaredAssets} declared assets in ${completeCache.cacheName}`,
  );

  diagnostics.phase = "optional-locale-cache";
  const localeRequestsBefore = serverState.getRequests().filter((entry) => entry.url?.includes("/i18n/locales/he.js")).length;
  await page.selectOption("#language-selector", "he");
  await page.waitForFunction(() => document.documentElement.lang === "he", null, { timeout: 30_000 });
  await calendarSnapshot(page, "online Hebrew render after lazy language switch", diagnostics);
  const localeRequestsAfter = serverState.getRequests().filter((entry) => entry.url?.includes("/i18n/locales/he.js")).length;
  assert.equal(localeRequestsAfter - localeRequestsBefore, 1, "Hebrew locale should be fetched exactly once when first requested");
  const cachedHebrew = await inspectOptionalLocaleCache(page, "./i18n/locales/he.js?v=15-runtime-notices");
  assert.equal(cachedHebrew.present, true, `Hebrew locale was not cached after first use: ${JSON.stringify(cachedHebrew)}`);
  assert.equal(cachedHebrew.status, 200, "Cached Hebrew locale response is not successful");
  console.log(`[PASS] optional Hebrew locale cached on first use: ${JSON.stringify(cachedHebrew)}`);

  /*
   * Clear Chromium's ordinary HTTP cache, but do not leave the CDP
   * Network.setCacheDisabled switch enabled. With a large ES-module graph,
   * a permanently disabled HTTP cache can affect Chromium's loader in ways
   * that are unrelated to whether the Service Worker / Cache Storage can
   * satisfy the page. We prove non-use of the HTTP cache below by requiring
   * every observed same-origin offline response to come from the SW.
   */
  diagnostics.phase = "clear-http-cache";
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.clearBrowserCache");
  console.log("[PASS] Chromium ordinary HTTP cache cleared via CDP Network.clearBrowserCache");

  await page.waitForTimeout(250);
  const onlineServerRequestCount = serverState.getRequestCount();

  diagnostics.phase = "stop-local-server";
  await serverState.close();
  assert.equal(
    serverState.isListening(),
    false,
    "Local HTTP server is still listening before offline navigation",
  );
  console.log(
    `[PASS] local HTTP server stopped before offline navigation; it can no longer satisfy requests (online request count=${onlineServerRequestCount})`,
  );

  diagnostics.phase = "set-offline";
  await context.setOffline(true);
  console.log("[PASS] Playwright browser context set offline after local HTTP server was stopped");

  diagnostics.phase = "offline-reload";
  const offlineReloadResponse = await page.reload({
    waitUntil: "load",
    timeout: UI_TIMEOUT_MS,
  });
  const offlineReloadNavigation = assertSuccessfulNavigation(
    offlineReloadResponse,
    "offline reload",
  );
  diagnostics.successfulOfflineNavigationPhases.add("offline-reload");
  assert.equal(
    offlineReloadNavigation.fromServiceWorker,
    true,
    "Offline reload response was not served by the Service Worker",
  );
  console.log(
    `[PASS] offline reload navigation: ${JSON.stringify(offlineReloadNavigation)}`,
  );

  const offlineReloadSnapshot = await calendarSnapshot(
    page,
    "offline reload calendar render",
    diagnostics,
  );
  await offlineReverseSmoke(page, "offline reverse search");
  assert(offlineReloadSnapshot.controlled, "Service Worker lost control after offline reload");
  assertOfflineResponsesCameFromServiceWorker(
    diagnostics,
    "offline-reload",
    "offline reload subresources",
  );

  diagnostics.phase = "offline-probe";
  const offlineProbeResponse = await page.goto(`${origin}/offline-probe`, {
    waitUntil: "load",
    timeout: UI_TIMEOUT_MS,
  });
  const offlineProbeNavigation = assertSuccessfulNavigation(
    offlineProbeResponse,
    "offline /offline-probe navigation",
  );
  diagnostics.successfulOfflineNavigationPhases.add("offline-probe");
  assert.equal(
    offlineProbeNavigation.fromServiceWorker,
    true,
    "/offline-probe response was not served by the Service Worker",
  );
  console.log(
    `[PASS] offline /offline-probe navigation fallback: ${JSON.stringify(offlineProbeNavigation)}`,
  );

  const offlineProbeSnapshot = await calendarSnapshot(
    page,
    "offline /offline-probe calendar render",
    diagnostics,
  );
  assert(
    offlineProbeSnapshot.controlled,
    "Service Worker does not control /offline-probe",
  );
  assertOfflineResponsesCameFromServiceWorker(
    diagnostics,
    "offline-probe",
    "offline /offline-probe subresources",
  );

  assertDiagnosticsClean(diagnostics);

  console.log(
    "[PASS] error monitoring clean: pageerror=0 console.error=0 unexpected request failures=0 bad responses=0",
  );
  console.log(`[PASS] PWA offline smoke complete in ${Date.now() - startedAt} ms`);
} catch (error) {
  const dom = page ? await liveDomSnapshot(page).catch(() => null) : null;
  console.error(
    `[DIAGNOSTICS] ${JSON.stringify(compactDiagnostics(diagnostics, dom), null, 2)}`,
  );
  throw error;
} finally {
  if (context) await context.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  await serverState.close().catch(() => {});
}
