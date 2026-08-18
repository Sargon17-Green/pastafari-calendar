"use strict";

const VERSION = "pastafari-static-reverse-search-lazy-i18n-10-unified-i18n";
const CACHE = VERSION;

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
  "./manifest.webmanifest?v=8-year-structure",
  "./icons/icon.svg?v=13-reverse-i18n",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
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

const OPTIONAL_LOCALE_PATH = /\/i18n\/locales\/[A-Za-z0-9-]+\.js$/;
const scoped = (path) => new URL(path, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Reload avoids reusing an older HTTP-cache entry if a future deployment
    // keeps a backwards-compatible asset URL.
    await Promise.all(CORE_ASSETS.map(async (path) => {
      const request = new Request(scoped(path), { cache: "reload" });
      const response = await fetch(request);
      if (!response.ok) throw new Error(`Failed to precache ${path}: HTTP ${response.status}`);
      await cache.put(request, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("pastafari-static-") && name !== CACHE).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(async () => (
      (await caches.match(scoped("./index.html")))
      ?? new Response("", { status: 503 })
    )));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok) {
      // Optional locale modules arrive here only when requested by the runtime.
      // Cache them on first successful use so subsequent controlled/offline loads
      // can reuse the exact revisioned module URL.
      const cache = await caches.open(CACHE);
      await cache.put(event.request, response.clone());
    }
    return response;
  })());
});
