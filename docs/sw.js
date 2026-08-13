"use strict";

const VERSION = "pastafari-static-c5db804-fast-only-8-solid-text-plates";
const CACHE = VERSION;
const ASSETS = [
  "./index.html",
  "./styles.css?v=6-i18n-en-he",
  "./app.js?v=6-i18n-en-he",
  "./manifest.webmanifest?v=6-i18n-en-he",
  "./icons/icon.svg?v=6-i18n-en-he",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./engine/pastafari-calendar-fast.js",
  "./engine/pastafari-fast-worker.js?v=6-i18n-en-he",
  "./i18n/calendar-identifiers.js",
  "./i18n/registry.js",
  "./i18n/runtime.js",
  "./i18n/locales/he.js",
  "./i18n/locales/en.js"
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
