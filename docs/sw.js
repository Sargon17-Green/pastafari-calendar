"use strict";

const VERSION = "pastafari-static-c5db804-fast-only-12-calendar-input-conventions-i18n-en-he";
const CACHE = VERSION;
const ASSETS = [
  "./index.html",
  "./styles.css?v=8-year-structure",
  "./app.js?v=8-year-structure",
  "./calendar-input-conventions.js?v=9-calendar-input-conventions",
  "./calendar-converters.js?v=8-year-structure",
  "./manifest.webmanifest?v=8-year-structure",
  "./icons/icon.svg?v=8-year-structure",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./engine/pastafari-calendar-fast.js",
  "./engine/pastafari-fast-worker.js?v=8-year-structure",
  "./i18n/calendar-identifiers.js?v=8-year-structure",
  "./i18n/registry.js?v=8-year-structure",
  "./i18n/runtime.js?v=8-year-structure",
  "./i18n/locales/he.js?v=8-year-structure",
  "./i18n/locales/en.js?v=8-year-structure"
];

const scoped = (path) => new URL(path, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS.map(scoped));
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
    if (response.ok) (await caches.open(CACHE)).put(event.request, response.clone());
    return response;
  })());
});
