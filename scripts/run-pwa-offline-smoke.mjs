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
const BASE_PATH = "/pastafari-calendar/";
const CACHE_PREFIX = "pastafari-static-";
const RUNTIME_CACHE = "pastafari-runtime-assets";
const UI_TIMEOUT_MS = 180_000;
const SW_TIMEOUT_MS = 45_000;

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

function parseStringArray(source, constantName) {
  const match = source.match(new RegExp(`\\bconst\\s+${constantName}\\s*=\\s*(?:Object\\.freeze\\()?\\[([\\s\\S]*?)\\]\\)?\\s*;`));
  assert(match, `Could not locate ${constantName} in docs/sw.js`);
  return [...match[1].matchAll(/"((?:\\.|[^"\\])*)"/g)]
    .map((entry) => JSON.parse(`"${entry[1]}"`));
}

function contentType(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

function createServerState(swSource) {
  return {
    swSource,
    swVariant: "A",
    failures: new Map(),
    requests: [],
  };
}

async function startStaticServer(state) {
  const server = createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
    state.requests.push({ method: request.method, url: requestUrl.pathname + requestUrl.search });

    const forcedStatus = state.failures.get(requestUrl.pathname);
    if (forcedStatus) {
      response.writeHead(forcedStatus, {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end(`Injected HTTP ${forcedStatus}`);
      return;
    }

    if (requestUrl.pathname === `${BASE_PATH}__network_only__.txt`) {
      const body = Buffer.from("network only fixture\n");
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Length": body.length,
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end(body);
      return;
    }

    if (!requestUrl.pathname.startsWith(BASE_PATH)) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    let relativePath = decodeURIComponent(requestUrl.pathname.slice(BASE_PATH.length));
    if (relativePath === "") relativePath = "index.html";
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

    let body = await readFile(resolved);
    if (relativePath === "sw.js") {
      const text = body.toString("utf8").replace(
        /pastafari-static-pwa-hardening-14-diagnostics-streamed-precache/g,
        `pastafari-static-pwa-hardening-14-diagnostics-streamed-precache-test-${state.swVariant}`,
      );
      body = Buffer.from(text, "utf8");
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": body.length,
      "Content-Type": contentType(resolved),
      "Service-Worker-Allowed": BASE_PATH,
    });
    if (request.method === "HEAD") response.end();
    else response.end(body);
  });

  const listen = (port) => new Promise((resolve, reject) => {
    const onError = (error) => {
      server.off("listening", onListening);
      reject(error);
    };
    const onListening = () => {
      server.off("error", onError);
      resolve();
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, "127.0.0.1");
  });

  await listen(0);
  const address = server.address();
  assert(address && typeof address === "object", "Local HTTP server did not expose an address");
  const port = address.port;
  const origin = `http://127.0.0.1:${port}`;
  const stop = async () => {
    if (!server.listening) return;
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  };
  const restart = async () => {
    if (server.listening) return;
    await listen(port);
  };
  return {
    origin,
    stop,
    restart,
    isListening: () => server.listening,
    close: stop,
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
    serviceWorkerEvents: [],
    serviceWorkerConsole: [],
    serviceWorkerRequests: [],
    serviceWorkerResponses: [],
    serviceWorkerRequestFailures: [],
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

function attachServiceWorkerDiagnostics(context, diagnostics) {
  const observeWorker = (worker) => {
    diagnostics.serviceWorkerEvents.push({
      phase: diagnostics.phase,
      event: "created",
      url: worker.url(),
    });
    worker.on("console", (message) => {
      diagnostics.serviceWorkerConsole.push({
        phase: diagnostics.phase,
        type: message.type(),
        text: message.text(),
        workerUrl: worker.url(),
      });
    });
    worker.on("close", () => {
      diagnostics.serviceWorkerEvents.push({
        phase: diagnostics.phase,
        event: "closed",
        url: worker.url(),
      });
    });
  };

  for (const worker of context.serviceWorkers()) observeWorker(worker);
  context.on("serviceworker", observeWorker);

  context.on("request", (request) => {
    const worker = request.serviceWorker();
    if (!worker) return;
    diagnostics.serviceWorkerRequests.push({
      phase: diagnostics.phase,
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      workerUrl: worker.url(),
    });
  });

  context.on("requestfailed", (request) => {
    const worker = request.serviceWorker();
    if (!worker) return;
    diagnostics.serviceWorkerRequestFailures.push({
      phase: diagnostics.phase,
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      errorText: request.failure()?.errorText ?? "unknown",
      workerUrl: worker.url(),
    });
  });

  context.on("response", (response) => {
    const worker = response.request().serviceWorker();
    if (!worker) return;
    diagnostics.serviceWorkerResponses.push({
      phase: diagnostics.phase,
      url: response.url(),
      status: response.status(),
      resourceType: response.request().resourceType(),
      workerUrl: worker.url(),
    });
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
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
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
    serviceWorkerEvents: diagnostics.serviceWorkerEvents.slice(-30),
    serviceWorkerConsole: diagnostics.serviceWorkerConsole.slice(-50),
    serviceWorkerRequests: diagnostics.serviceWorkerRequests.slice(-80),
    serviceWorkerResponses: diagnostics.serviceWorkerResponses.slice(-80),
    serviceWorkerRequestFailures: diagnostics.serviceWorkerRequestFailures.slice(-50),
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


async function waitForCalendar(page, label) {
  await page.waitForFunction(() => {
    const workspace = document.querySelector("#calendar-workspace");
    const grid = document.querySelector("#calendar-grid");
    const loading = document.querySelector("#loading-panel");
    const error = document.querySelector("#error-panel");
    return Boolean(workspace && grid && loading && error
      && !workspace.hidden
      && grid.children.length > 0
      && loading.hidden
      && error.hidden);
  }, null, { timeout: UI_TIMEOUT_MS });
  const snapshot = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    controlled: Boolean(navigator.serviceWorker.controller),
    selectorDisabled: document.querySelector("#language-selector")?.disabled ?? null,
    workspaceHidden: document.querySelector("#calendar-workspace")?.hidden ?? null,
    gridChildren: document.querySelector("#calendar-grid")?.children.length ?? 0,
    loadingHidden: document.querySelector("#loading-panel")?.hidden ?? null,
    errorHidden: document.querySelector("#error-panel")?.hidden ?? null,
    href: location.href,
  }));
  assert.equal(snapshot.workspaceHidden, false, `${label}: workspace is hidden`);
  assert(snapshot.gridChildren > 0, `${label}: calendar grid is empty`);
  assert.equal(snapshot.loadingHidden, true, `${label}: loading state did not finish`);
  assert.equal(snapshot.errorHidden, true, `${label}: application error panel is visible`);
  console.log(`[PASS] ${label}: ${JSON.stringify(snapshot)}`);
  return snapshot;
}

async function waitForServiceWorkerReady(page) {
  const outcome = await page.evaluate(async (timeoutMs) => {
    const registrationSnapshot = (registration) => ({
      scope: registration.scope,
      active: registration.active ? {
        state: registration.active.state,
        scriptURL: registration.active.scriptURL,
      } : null,
      installing: registration.installing ? {
        state: registration.installing.state,
        scriptURL: registration.installing.scriptURL,
      } : null,
      waiting: registration.waiting ? {
        state: registration.waiting.state,
        scriptURL: registration.waiting.scriptURL,
      } : null,
    });
    const withTimeout = (promise, label) => Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs} ms`)), timeoutMs)),
    ]);

    try {
      const registration = await withTimeout(navigator.serviceWorker.ready, "navigator.serviceWorker.ready");
      if (!navigator.serviceWorker.controller) {
        await withTimeout(new Promise((resolve) => {
          navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true });
        }), "controllerchange");
      }
      return {
        ok: true,
        scope: registration.scope,
        activeState: registration.active?.state ?? null,
        activeScriptURL: registration.active?.scriptURL ?? null,
        controlled: Boolean(navigator.serviceWorker.controller),
        controllerState: navigator.serviceWorker.controller?.state ?? null,
        controllerScriptURL: navigator.serviceWorker.controller?.scriptURL ?? null,
      };
    } catch (error) {
      const registrations = await navigator.serviceWorker.getRegistrations().catch(() => []);
      const cacheNames = await caches.keys().catch(() => []);
      return {
        ok: false,
        error: {
          name: error?.name ?? "Error",
          message: error?.message ?? String(error),
          stack: error?.stack ?? null,
        },
        registrations: registrations.map(registrationSnapshot),
        cacheNames,
        controlled: Boolean(navigator.serviceWorker.controller),
        controllerState: navigator.serviceWorker.controller?.state ?? null,
        controllerScriptURL: navigator.serviceWorker.controller?.scriptURL ?? null,
      };
    }
  }, SW_TIMEOUT_MS);

  if (!outcome.ok) {
    throw new Error(`Service Worker did not become ready: ${JSON.stringify(outcome)}`);
  }

  assert.equal(outcome.activeState, "activated", "Service Worker did not activate");
  assert(outcome.controlled, "Page is not controlled after clients.claim()");
  assert.equal(outcome.controllerState, "activated", `Service Worker controller state is ${outcome.controllerState}`);
  console.log(`[PASS] Service Worker ready: ${JSON.stringify(outcome)}`);
  return outcome;
}

async function updateServiceWorker(page) {
  return page.evaluate(async (timeoutMs) => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) throw new Error("No Service Worker registration exists");

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Timed out waiting for Service Worker update")), timeoutMs);
      const finish = (worker) => {
        const state = worker.state;
        if (state !== "activated" && state !== "redundant") return;
        clearTimeout(timer);
        resolve({ state, hasActive: Boolean(registration.active), hasWaiting: Boolean(registration.waiting) });
      };
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) {
          clearTimeout(timer);
          reject(new Error("updatefound fired without an installing worker"));
          return;
        }
        worker.addEventListener("statechange", () => finish(worker));
        finish(worker);
      }, { once: true });
      registration.update().catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
    });
  }, SW_TIMEOUT_MS);
}

async function cacheSnapshot(page) {
  return page.evaluate(async ({ cachePrefix, runtimeCache }) => {
    const names = await caches.keys();
    const entries = {};
    for (const name of names) {
      if (!name.startsWith(cachePrefix) && name !== runtimeCache) continue;
      const cache = await caches.open(name);
      entries[name] = (await cache.keys()).map((request) => request.url).sort();
    }
    return { names: Object.keys(entries).sort(), entries };
  }, { cachePrefix: CACHE_PREFIX, runtimeCache: RUNTIME_CACHE });
}

function currentCoreCaches(snapshot) {
  return snapshot.names.filter((name) => name.startsWith(CACHE_PREFIX) && name.endsWith("-core"));
}

async function assertRuntimePresence(page, relativeUrl, expected) {
  const result = await page.evaluate(async ({ relativeUrl, runtimeCache }) => {
    const registration = await navigator.serviceWorker.ready;
    const url = new URL(relativeUrl, registration.scope).href;
    const cache = await caches.open(runtimeCache);
    const response = await cache.match(url);
    return { url, present: Boolean(response), status: response?.status ?? null };
  }, { relativeUrl, runtimeCache: RUNTIME_CACHE });
  assert.equal(result.present, expected, `${relativeUrl}: runtime presence mismatch`);
  if (expected) assert.equal(result.status, 200, `${relativeUrl}: cached status is not 200`);
  return result;
}

async function assertNotCachedAnywhere(page, absoluteUrl, label) {
  const present = await page.evaluate(async (url) => Boolean(await caches.match(url)), absoluteUrl);
  assert.equal(present, false, `${label} unexpectedly entered Cache Storage`);
}

async function selectLocale(page, code, expectedCode) {
  await page.selectOption("#language-selector", code);
  await page.waitForFunction((expected) => {
    const select = document.querySelector("#language-selector");
    return select && !select.disabled && select.value === expected && document.documentElement.lang === expected;
  }, expectedCode, { timeout: 30_000 });
  return page.evaluate(() => ({
    lang: document.documentElement.lang,
    value: document.querySelector("#language-selector")?.value ?? null,
    disabled: document.querySelector("#language-selector")?.disabled ?? null,
    workspaceHidden: document.querySelector("#calendar-workspace")?.hidden ?? null,
    loadingHidden: document.querySelector("#loading-panel")?.hidden ?? null,
    errorHidden: document.querySelector("#error-panel")?.hidden ?? null,
  }));
}

async function offlineReverseSmoke(page) {
  const result = await page.evaluate(async () => {
    const engine = await import("./engine/pastafari-calendar-fast.js");
    const ids = await import("./i18n/calendar-identifiers.js?v=8-year-structure");
    const reverse = await import("./reverse-search-controller.js");
    const calculationJdn = engine.gregorianToJdn(new engine.GregorianDate(2026n, 8, 6));
    const targetJdn = calculationJdn + 3n;
    const raw = new engine.PastafariCalendar().convertJdn(targetJdn, { calculationJdn }).toJSON();
    const cutlet = ids.CUTLETS.find((entry) => entry.internalName === raw.cutletName);
    const month = ids.MONTHS.find((entry) => entry.internalName === raw.monthName);
    if (!cutlet || !month) throw new Error("Could not map reverse smoke identifiers");
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
        expected: targetJdn.toString(),
        targets: solved.result.solutions.map((solution) => solution.target.jdn.toString()),
      };
    } finally {
      controller.dispose();
    }
  });
  assert.equal(result.complete, true, "Offline reverse search did not complete");
  assert(result.targets.includes(result.expected), "Offline reverse search missed the expected target");
  console.log(`[PASS] offline reverse search: ${JSON.stringify(result)}`);
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
const coreAssets = parseStringArray(swSource, "CORE_ASSETS");
const optionalAssets = parseStringArray(swSource, "OPTIONAL_ASSETS");
assert.equal(coreAssets.length, 18, `Expected 18 core assets, got ${coreAssets.length}`);
assert.equal(optionalAssets.length, 4, `Expected 4 optional static assets, got ${optionalAssets.length}`);
console.log(`[INFO] install composition: core=${coreAssets.length}, optional-precache=0, optional-static=${optionalAssets.length}`);

const serverState = createServerState(swSource);
const optionalFailurePath = `${BASE_PATH}i18n/locales/fr.js`;
serverState.failures.set(optionalFailurePath, 503);
const server = await startStaticServer(serverState);
const { origin } = server;
const diagnostics = createDiagnostics(origin);
let browser;
let context;
let page;

try {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({ serviceWorkers: "allow", locale: "en-US" });
  attachServiceWorkerDiagnostics(context, diagnostics);
  page = await context.newPage();
  attachDiagnostics(page, diagnostics);

  diagnostics.phase = "online-load";
  const online = await page.goto(`${origin}${BASE_PATH}`, { waitUntil: "load", timeout: UI_TIMEOUT_MS });
  console.log(`[PASS] online navigation: ${JSON.stringify(assertSuccessfulNavigation(online, "initial online load"))}`);
  await calendarSnapshot(page, "initial online render", diagnostics);

  diagnostics.phase = "service-worker-ready";
  await waitForServiceWorkerReady(page);

  const frInstallRequests = serverState.requests.filter((entry) => entry.url.includes("/i18n/locales/fr.js")).length;
  assert.equal(frInstallRequests, 0, "Optional French locale was requested during Service Worker installation");

  diagnostics.phase = "precache-check";
  const cachesA = await cacheSnapshot(page);
  const aCore = currentCoreCaches(cachesA);
  assert.equal(aCore.length, 1, `Expected exactly one core cache after installation: ${JSON.stringify(cachesA.names)}`);
  assert.equal(cachesA.entries[aCore[0]].length, coreAssets.length + 1, "Core cache should contain CORE_ASSETS plus one completion marker");
  assert(cachesA.entries[aCore[0]].every((url) => url.includes("/__pwa_core__/")), "Core cache exposes public request URLs instead of private install keys");
  console.log(`[PASS] atomic core cache populated: ${aCore[0]} (${coreAssets.length} assets + completion marker)`);

  diagnostics.phase = "optional-locale-failure";
  const expectedFr = {
    consoleErrors: diagnostics.consoleErrors.length,
    requestFailures: diagnostics.requestFailures.length,
    badResponses: diagnostics.badResponses.length,
  };
  const failedLocale = await selectLocale(page, "fr", "en");
  assert.equal(failedLocale.workspaceHidden, false, "Failed optional locale hid the application");
  assert.equal(failedLocale.loadingHidden, true, "Failed optional locale left the application loading");
  assert.equal(failedLocale.errorHidden, true, "Failed optional locale displayed the engine error panel");
  assert.equal((await assertRuntimePresence(page, "./i18n/locales/fr.js?v=16-unified-i18n", false)).present, false);
  const newFrBad = diagnostics.badResponses.slice(expectedFr.badResponses);
  assert(newFrBad.every((entry) => entry.status === 503 && entry.url.includes("/i18n/locales/fr.js")), `Unexpected HTTP diagnostics during failed optional locale: ${JSON.stringify(newFrBad)}`);
  const newFrFailures = diagnostics.requestFailures.slice(expectedFr.requestFailures);
  assert(newFrFailures.every((entry) => entry.url.includes("/i18n/locales/fr.js")), `Unexpected request failure during failed optional locale: ${JSON.stringify(newFrFailures)}`);
  const newFrConsole = diagnostics.consoleErrors.slice(expectedFr.consoleErrors);
  assert(newFrConsole.every((entry) => /fetch|import|module|locale|503/i.test(entry.text)), `Unexpected console error during failed optional locale: ${JSON.stringify(newFrConsole)}`);
  diagnostics.badResponses.length = expectedFr.badResponses;
  diagnostics.requestFailures.length = expectedFr.requestFailures;
  diagnostics.consoleErrors.length = expectedFr.consoleErrors;
  console.log(`[PASS] failed optional locale leaves current UI intact: ${JSON.stringify(failedLocale)}`);

  serverState.failures.delete(optionalFailurePath);
  diagnostics.phase = "optional-locale-cache";
  const heBefore = serverState.requests.filter((entry) => entry.url.includes("/i18n/locales/he.js")).length;
  const hebrew = await selectLocale(page, "he", "he");
  const heAfter = serverState.requests.filter((entry) => entry.url.includes("/i18n/locales/he.js")).length;
  assert.equal(heAfter - heBefore, 1, "Hebrew locale should be fetched once on first successful use");
  const cachedHebrew = await assertRuntimePresence(page, "./i18n/locales/he.js?v=16-unified-i18n", true);
  assert.equal(hebrew.lang, "he");
  console.log(`[PASS] successful on-demand locale cached: ${JSON.stringify(cachedHebrew)}`);

  diagnostics.phase = "generic-network-only";
  const networkOnlyUrl = `${origin}${BASE_PATH}__network_only__.txt?state=12345`;
  const networkOnlyText = await page.evaluate(async (url) => (await fetch(url)).text(), networkOnlyUrl);
  assert.equal(networkOnlyText.trim(), "network only fixture");
  await assertNotCachedAnywhere(page, networkOnlyUrl, "arbitrary same-origin GET");
  console.log("[PASS] arbitrary same-origin GET remains network-only");

  diagnostics.phase = "clear-http-cache";
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.clearBrowserCache");
  console.log("[PASS] Chromium ordinary HTTP cache cleared via CDP Network.clearBrowserCache");

  const onlineRequestCount = serverState.requests.length;
  diagnostics.phase = "stop-local-server";
  await server.stop();
  assert.equal(server.isListening(), false, "Local HTTP server is still listening before offline navigation");
  console.log(`[PASS] local HTTP server stopped before offline navigation (online request count=${onlineRequestCount})`);

  await context.setOffline(true);

  diagnostics.phase = "offline-root";
  const offlineRoot = await page.goto(`${origin}${BASE_PATH}`, { waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const offlineRootNav = assertSuccessfulNavigation(offlineRoot, "offline root navigation");
  diagnostics.successfulOfflineNavigationPhases.add("offline-root");
  assert.equal(offlineRootNav.fromServiceWorker, true, "Offline root navigation did not come from the Service Worker");
  const rootSnapshot = await calendarSnapshot(page, "offline root calendar render", diagnostics);
  assert.equal(rootSnapshot.lang, "he", "Saved Hebrew locale did not survive offline root navigation");
  await offlineReverseSmoke(page);
  assertOfflineResponsesCameFromServiceWorker(diagnostics, "offline-root", "offline root subresources");

  diagnostics.phase = "offline-query";
  const queryUrl = `${origin}${BASE_PATH}?lang=he&offline-state=1`;
  const offlineQuery = await page.goto(queryUrl, { waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const offlineQueryNav = assertSuccessfulNavigation(offlineQuery, "offline navigation with query state");
  diagnostics.successfulOfflineNavigationPhases.add("offline-query");
  assert.equal(offlineQueryNav.fromServiceWorker, true, "Offline query navigation did not come from the Service Worker");
  const querySnapshot = await calendarSnapshot(page, "offline query calendar render", diagnostics);
  assert.equal(querySnapshot.lang, "he");
  await assertNotCachedAnywhere(page, queryUrl, "navigation query variant");
  assertOfflineResponsesCameFromServiceWorker(diagnostics, "offline-query", "offline query subresources");

  diagnostics.phase = "offline-reload";
  const offlineReload = await page.reload({ waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const offlineReloadNav = assertSuccessfulNavigation(offlineReload, "full offline reload");
  diagnostics.successfulOfflineNavigationPhases.add("offline-reload");
  assert.equal(offlineReloadNav.fromServiceWorker, true, "Offline reload did not come from the Service Worker");
  await calendarSnapshot(page, "full offline reload calendar render", diagnostics);
  assertOfflineResponsesCameFromServiceWorker(diagnostics, "offline-reload", "offline reload subresources");

  diagnostics.phase = "offline-never-loaded-locale";
  const expectedDe = {
    consoleErrors: diagnostics.consoleErrors.length,
    requestFailures: diagnostics.requestFailures.length,
    badResponses: diagnostics.badResponses.length,
  };
  const neverLoaded = await selectLocale(page, "de", "he");
  assert.equal(neverLoaded.workspaceHidden, false, "Never-loaded offline locale broke the application");
  assert.equal(neverLoaded.loadingHidden, true, "Never-loaded offline locale left loading state active");
  assert.equal(neverLoaded.errorHidden, true, "Never-loaded offline locale displayed the engine error panel");
  assert.equal((await assertRuntimePresence(page, "./i18n/locales/de.js?v=16-unified-i18n", false)).present, false);
  const newDeFailures = diagnostics.requestFailures.slice(expectedDe.requestFailures);
  assert(newDeFailures.every((entry) => entry.url.includes("/i18n/locales/de.js")), `Unexpected request failure during never-loaded offline locale: ${JSON.stringify(newDeFailures)}`);
  const newDeBad = diagnostics.badResponses.slice(expectedDe.badResponses);
  assert(newDeBad.every((entry) => entry.url.includes("/i18n/locales/de.js")), `Unexpected HTTP diagnostic during never-loaded offline locale: ${JSON.stringify(newDeBad)}`);
  const newDeConsole = diagnostics.consoleErrors.slice(expectedDe.consoleErrors);
  assert(newDeConsole.every((entry) => /fetch|import|module|locale|network/i.test(entry.text)), `Unexpected console error during never-loaded offline locale: ${JSON.stringify(newDeConsole)}`);
  diagnostics.requestFailures.length = expectedDe.requestFailures;
  diagnostics.badResponses.length = expectedDe.badResponses;
  diagnostics.consoleErrors.length = expectedDe.consoleErrors;
  console.log(`[PASS] never-loaded locale offline falls back to current locale: ${JSON.stringify(neverLoaded)}`);
  assert.equal(serverState.requests.length, onlineRequestCount, "Offline phase unexpectedly reached the stopped local server");

  await context.setOffline(false);
  await server.restart();
  assert.equal(server.isListening(), true, "Local server did not restart for upgrade checks");

  diagnostics.phase = "failed-core-upgrade";
  const expectedB = {
    consoleErrors: diagnostics.consoleErrors.length,
    requestFailures: diagnostics.requestFailures.length,
    badResponses: diagnostics.badResponses.length,
  };
  serverState.swVariant = "B";
  serverState.failures.set(`${BASE_PATH}styles.css`, 503);
  const failedUpgrade = await updateServiceWorker(page);
  assert.equal(failedUpgrade.state, "redundant", `Core-failing update should become redundant: ${JSON.stringify(failedUpgrade)}`);
  const cachesAfterFailedUpgrade = await cacheSnapshot(page);
  assert.deepEqual(currentCoreCaches(cachesAfterFailedUpgrade), aCore, "Failed upgrade replaced or removed the previous core cache");
  assert(!cachesAfterFailedUpgrade.names.some((name) => name.includes("test-B")), "Failed B core cache residue remains");
  await assertRuntimePresence(page, "./i18n/locales/he.js?v=16-unified-i18n", true);
  const newBBad = diagnostics.badResponses.slice(expectedB.badResponses);
  assert(newBBad.every((entry) => entry.status === 503 && entry.url.includes("/styles.css")), `Unexpected HTTP diagnostic during failed core upgrade: ${JSON.stringify(newBBad)}`);
  const newBFailures = diagnostics.requestFailures.slice(expectedB.requestFailures);
  assert(newBFailures.every((entry) => entry.url.includes("/styles.css") || entry.url.endsWith("/sw.js")), `Unexpected request failure during failed core upgrade: ${JSON.stringify(newBFailures)}`);
  diagnostics.badResponses.length = expectedB.badResponses;
  diagnostics.requestFailures.length = expectedB.requestFailures;
  diagnostics.consoleErrors.length = expectedB.consoleErrors;
  console.log("[PASS] missing core asset rejects update and preserves version A caches");

  await server.stop();
  await context.setOffline(true);
  diagnostics.phase = "offline-after-failed-upgrade";
  const afterFailedUpgrade = await page.reload({ waitUntil: "load", timeout: UI_TIMEOUT_MS });
  const afterFailedNav = assertSuccessfulNavigation(afterFailedUpgrade, "offline after failed version B installation");
  diagnostics.successfulOfflineNavigationPhases.add("offline-after-failed-upgrade");
  assert.equal(afterFailedNav.fromServiceWorker, true, "Version A did not serve after failed B installation");
  await calendarSnapshot(page, "offline calendar after failed version B installation", diagnostics);
  assertOfflineResponsesCameFromServiceWorker(diagnostics, "offline-after-failed-upgrade", "offline after failed upgrade subresources");
  await context.setOffline(false);
  await server.restart();

  diagnostics.phase = "legacy-runtime-migration";
  const legacyMigration = await page.evaluate(async ({ runtimeCache }) => {
    const registration = await navigator.serviceWorker.ready;
    const localeUrl = new URL("./i18n/locales/fr.js?v=16-unified-i18n", registration.scope).href;
    const response = await fetch(localeUrl);
    if (!response.ok) throw new Error(`Could not seed legacy locale fixture: HTTP ${response.status}`);
    const legacyName = "pastafari-static-reverse-search-lazy-i18n-10-unified-i18n";
    const legacy = await caches.open(legacyName);
    await legacy.put(localeUrl, response.clone());
    const runtime = await caches.open(runtimeCache);
    await runtime.delete(localeUrl);
    return { legacyName, localeUrl };
  }, { runtimeCache: RUNTIME_CACHE });
  assert.equal((await assertRuntimePresence(page, "./i18n/locales/fr.js?v=16-unified-i18n", false)).present, false);
  console.log(`[PASS] seeded legacy static-cache locale for migration test: ${JSON.stringify(legacyMigration)}`);

  diagnostics.phase = "successful-core-upgrade";
  serverState.failures.delete(`${BASE_PATH}styles.css`);
  serverState.swVariant = "C";
  const successfulUpgrade = await updateServiceWorker(page);
  assert.equal(successfulUpgrade.state, "activated", `Successful C update did not activate: ${JSON.stringify(successfulUpgrade)}`);

  const cachesC = await cacheSnapshot(page);
  const cCore = currentCoreCaches(cachesC);
  assert.equal(cCore.length, 1, `Successful activation should leave one core cache: ${JSON.stringify(cachesC.names)}`);
  assert(cCore[0].includes("test-C"), `Current core cache is not version C: ${cCore[0]}`);
  assert(!cachesC.names.includes(aCore[0]), "Old version A core cache was not cleaned up");
  assert(cachesC.names.includes(RUNTIME_CACHE), "Runtime cache was removed during successful upgrade");
  await assertRuntimePresence(page, "./i18n/locales/he.js?v=16-unified-i18n", true);
  await assertRuntimePresence(page, "./i18n/locales/fr.js?v=16-unified-i18n", true);
  assert(!cachesC.names.includes(legacyMigration.legacyName), "Legacy static cache was not removed after compatible locale migration");
  console.log("[PASS] successful activation cleans old static caches and preserves/migrates compatible runtime locale entries");

  await server.stop();
  await context.setOffline(true);
  diagnostics.phase = "offline-after-successful-upgrade";
  const afterSuccessfulUpgrade = await page.goto(`${origin}${BASE_PATH}?lang=he&after-upgrade=1`, {
    waitUntil: "load",
    timeout: UI_TIMEOUT_MS,
  });
  const afterSuccessfulNav = assertSuccessfulNavigation(afterSuccessfulUpgrade, "offline after successful version C activation");
  diagnostics.successfulOfflineNavigationPhases.add("offline-after-successful-upgrade");
  assert.equal(afterSuccessfulNav.fromServiceWorker, true, "Version C failed offline after activation");
  const afterUpgradeSnapshot = await calendarSnapshot(page, "offline calendar after successful version C activation", diagnostics);
  assert.equal(afterUpgradeSnapshot.lang, "he");
  assertOfflineResponsesCameFromServiceWorker(diagnostics, "offline-after-successful-upgrade", "offline after successful upgrade subresources");

  assertDiagnosticsClean(diagnostics);
  console.log("[PASS] error monitoring clean after excluding only the two intentional locale-load failures and injected upgrade failure");
  console.log(`[PASS] PWA hardening + merged offline diagnostics smoke complete in ${Date.now() - startedAt} ms`);
} catch (error) {
  const dom = page ? await liveDomSnapshot(page).catch(() => null) : null;
  console.error(`[DIAGNOSTICS] ${JSON.stringify(compactDiagnostics(diagnostics, dom), null, 2)}`);
  throw error;
} finally {
  if (context) await context.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  await server.close().catch(() => {});
}
