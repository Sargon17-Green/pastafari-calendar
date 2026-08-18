"use strict";

const VERSION = "pastafari-static-pwa-hardening-11-unified-i18n";
const CORE_CACHE = `${VERSION}-core`;
const RUNTIME_CACHE = "pastafari-runtime-assets";
const CACHE_PREFIX = "pastafari-static-";

// Core application shell. English is the only locale resource installed eagerly,
// because it is the runtime fallback when no supported preference is selected.
const CORE_ASSETS = [
  "./index.html",
  "./styles.css?v=13-reverse-i18n",
  "./app.js?v=19-unified-i18n",
  "./reverse-ui.js?v=18-unified-i18n",
  "./reverse-search-controller.js",
  "./calendar-input-conventions.js?v=9-calendar-input-conventions",
  "./calendar-converters.js?v=8-year-structure",
  "./observer-location.js?v=10-venus-day-boundary",
  "./venus-day-boundary.js?v=10-venus-day-boundary",
  "./engine/pastafari-calendar-fast.js",
  "./engine/pastafari-fast-worker.js?v=8-year-structure",
  "./engine/pastafari-constraints-client.js",
  "./engine/pastafari-constraints.js",
  "./engine/pastafari-reverse-worker.js",
  "./i18n/calendar-identifiers.js?v=8-year-structure",
  "./i18n/registry.js?v=17-unified-i18n",
  "./i18n/runtime.js?v=17-unified-i18n",
  "./i18n/locales/en.js?v=16-unified-i18n"
];

const OPTIONAL_ASSETS = Object.freeze([
  "./manifest.webmanifest?v=8-year-structure",
  "./icons/icon.svg?v=8-year-structure",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
]);
const OPTIONAL_LOCALE_PATH = /^\/i18n\/locales\/[A-Za-z0-9-]+\.js$/;
const SCOPE_URL = new URL(self.registration.scope);
const scoped = (path) => new URL(path, SCOPE_URL).href;
const ENGLISH_LOCALE_ASSET = CORE_ASSETS.find((path) => path.startsWith("./i18n/locales/en.js?"));
if (!ENGLISH_LOCALE_ASSET) throw new Error("English fallback locale is missing from CORE_ASSETS.");
const LOCALE_REVISION_SEARCH = new URL(scoped(ENGLISH_LOCALE_ASSET)).search;

// Core cache entries intentionally use private synthetic keys rather than the
// public request URLs. This prevents an older active Service Worker that uses
// global caches.match() from seeing a partially populated cache while a new
// version is still installing.
const CORE_ENTRIES = Object.freeze(CORE_ASSETS.map((path, index) => Object.freeze({
  path,
  url: scoped(path),
  cacheKey: scoped(`./__pwa_core__/${index}`),
})));
const CORE_BY_URL = new Map(CORE_ENTRIES.map((entry) => [entry.url, entry]));
const CORE_COMPLETE_KEY = scoped("./__pwa_core__/complete");
const OPTIONAL_BY_URL = new Map(OPTIONAL_ASSETS.map((path) => [scoped(path), path]));

function scopeRelativePath(url) {
  if (url.origin !== SCOPE_URL.origin || !url.pathname.startsWith(SCOPE_URL.pathname)) return null;
  return `/${url.pathname.slice(SCOPE_URL.pathname.length)}`;
}

function expectedContentType(pathname) {
  if (pathname.endsWith(".html")) return /^(?:text\/html|application\/xhtml\+xml)$/i;
  if (pathname.endsWith(".css")) return /^text\/css$/i;
  if (pathname.endsWith(".js")) return /^(?:text|application)\/(?:java|ecma)script$/i;
  if (pathname.endsWith(".webmanifest")) return /^(?:application\/(?:manifest\+json|json)|text\/json)$/i;
  if (pathname.endsWith(".svg")) return /^image\/svg\+xml$/i;
  if (pathname.endsWith(".png")) return /^image\/png$/i;
  return null;
}

function validateAssetResponse(response, expectedUrl, label) {
  if (!response || !response.ok) {
    throw new Error(`Failed to cache ${label}: HTTP ${response?.status ?? "no response"}`);
  }
  if (response.type === "opaque") throw new Error(`Refusing opaque response for ${label}.`);
  if (response.redirected) throw new Error(`Refusing redirected response for ${label}.`);

  const finalUrl = new URL(response.url);
  if (finalUrl.origin !== SCOPE_URL.origin || finalUrl.href !== expectedUrl) {
    throw new Error(`Unexpected response URL for ${label}: ${response.url}`);
  }

  const expectedType = expectedContentType(finalUrl.pathname);
  if (expectedType) {
    const contentType = response.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
    if (!expectedType.test(contentType)) {
      throw new Error(`Unexpected Content-Type for ${label}: ${contentType || "missing"}`);
    }
  }
  return response;
}

function isOptionalLocaleRequest(url) {
  const relativePath = scopeRelativePath(url);
  return relativePath !== null
    && OPTIONAL_LOCALE_PATH.test(relativePath)
    && url.search === LOCALE_REVISION_SEARCH;
}

async function coreResponse(entry, request = null) {
  const cache = await caches.open(CORE_CACHE);
  const cached = await cache.match(entry.cacheKey);
  if (cached) return cached;

  const networkRequest = request ?? new Request(entry.url, { cache: "reload" });
  const response = await fetch(networkRequest);
  return validateAssetResponse(response, entry.url, entry.path);
}

async function runtimeResponse(request, url, label) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = validateAssetResponse(await fetch(request), url.href, label);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.warn(`Optional asset was not cached: ${url.pathname}`, error);
    throw error;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    // A complete cache with the same VERSION means sw.js changed without a
    // cache-version bump. Refuse to overwrite a cache that an older active
    // worker may still be serving. An unmarked cache is only failed-install
    // residue and is safe to discard before retrying.
    if ((await caches.keys()).includes(CORE_CACHE)) {
      const existing = await caches.open(CORE_CACHE);
      if (await existing.match(CORE_COMPLETE_KEY)) {
        throw new Error(`Core cache ${CORE_CACHE} already exists; bump VERSION before changing sw.js.`);
      }
      await caches.delete(CORE_CACHE);
    }

    const responses = await Promise.all(CORE_ENTRIES.map(async (entry) => {
      const request = new Request(entry.url, { cache: "reload" });
      const response = validateAssetResponse(await fetch(request), entry.url, entry.path);
      return { entry, response };
    }));

    const cache = await caches.open(CORE_CACHE);
    try {
      await Promise.all(responses.map(({ entry, response }) => cache.put(entry.cacheKey, response)));
      const missing = [];
      for (const { cacheKey, path } of CORE_ENTRIES) {
        if (!(await cache.match(cacheKey))) missing.push(path);
      }
      if (missing.length > 0) throw new Error(`Core precache verification failed: ${missing.join(", ")}`);
      await cache.put(CORE_COMPLETE_KEY, new Response(VERSION, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }));
    } catch (error) {
      await caches.delete(CORE_CACHE);
      throw error;
    }

    await self.skipWaiting();
  })());
});

async function migrateCompatibleRuntimeEntries(cacheNames) {
  const runtime = await caches.open(RUNTIME_CACHE);
  for (const cacheName of cacheNames) {
    if (cacheName === CORE_CACHE || cacheName === RUNTIME_CACHE) continue;
    const cache = await caches.open(cacheName);
    for (const request of await cache.keys()) {
      const url = new URL(request.url);
      if (CORE_BY_URL.has(url.href)) continue;
      if (!OPTIONAL_BY_URL.has(url.href) && !isOptionalLocaleRequest(url)) continue;
      const response = await cache.match(request);
      if (!response) continue;
      try {
        validateAssetResponse(response, url.href, url.pathname);
        await runtime.put(request, response);
      } catch (error) {
        console.warn(`Skipping incompatible cached optional asset: ${url.pathname}`, error);
      }
    }
  }
}

async function pruneRuntimeCache() {
  const runtime = await caches.open(RUNTIME_CACHE);
  for (const request of await runtime.keys()) {
    const url = new URL(request.url);
    const currentOptional = OPTIONAL_BY_URL.has(url.href) || isOptionalLocaleRequest(url);
    if (!currentOptional || CORE_BY_URL.has(url.href)) await runtime.delete(request);
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    const oldStaticCaches = names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CORE_CACHE);

    // The previous implementation stored on-demand locales in its static cache.
    // Preserve only compatible, explicitly runtime-cacheable entries before cleanup.
    await migrateCompatibleRuntimeEntries(oldStaticCaches);
    await pruneRuntimeCache();
    await Promise.all(oldStaticCaches.map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== SCOPE_URL.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(async () => {
      const indexEntry = CORE_BY_URL.get(scoped("./index.html"));
      return indexEntry
        ? (await coreResponse(indexEntry) ?? new Response("", { status: 503 }))
        : new Response("", { status: 503 });
    }));
    return;
  }

  const coreEntry = CORE_BY_URL.get(url.href);
  if (coreEntry) {
    event.respondWith(coreResponse(coreEntry, event.request));
    return;
  }

  const optionalAsset = OPTIONAL_BY_URL.get(url.href);
  if (optionalAsset) {
    event.respondWith(runtimeResponse(event.request, url, optionalAsset));
    return;
  }

  if (isOptionalLocaleRequest(url)) {
    event.respondWith(runtimeResponse(event.request, url, url.pathname));
    return;
  }

  // Other requests remain network-only. In particular, arbitrary same-origin
  // GETs, navigation query variants, failed responses, and third-party assets
  // are never admitted to Cache Storage by this worker.
  event.respondWith(fetch(event.request));
});
