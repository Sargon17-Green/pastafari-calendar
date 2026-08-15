"use strict";

const VERSION = "pastafari-static-c5db804-fast-only-18-comparison-dom-cleanup-venus-day-boundary-i18n-all-89-layout";
const CACHE = VERSION;
const ASSETS = [
  "./index.html",
  "./styles.css?v=8-year-structure",
  "./app.js?v=11-comparison-dom-cleanup",
  "./calendar-input-conventions.js?v=9-calendar-input-conventions",
  "./calendar-converters.js?v=8-year-structure",
  "./observer-location.js?v=10-venus-day-boundary",
  "./venus-day-boundary.js?v=10-venus-day-boundary",
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
  "./i18n/locales/en.js?v=8-year-structure",
  "./i18n/locales/af.js?v=8-year-structure",
  "./i18n/locales/akk.js?v=8-year-structure",
  "./i18n/locales/ang.js?v=8-year-structure",
  "./i18n/locales/ar.js?v=8-year-structure",
  "./i18n/locales/az.js?v=8-year-structure",
  "./i18n/locales/be.js?v=8-year-structure",
  "./i18n/locales/bg.js?v=8-year-structure",
  "./i18n/locales/bn.js?v=8-year-structure",
  "./i18n/locales/bs.js?v=8-year-structure",
  "./i18n/locales/ca.js?v=8-year-structure",
  "./i18n/locales/cop.js?v=8-year-structure",
  "./i18n/locales/cs.js?v=8-year-structure",
  "./i18n/locales/cu.js?v=8-year-structure",
  "./i18n/locales/da.js?v=8-year-structure",
  "./i18n/locales/de.js?v=8-year-structure",
  "./i18n/locales/el.js?v=8-year-structure",
  "./i18n/locales/eo.js?v=8-year-structure",
  "./i18n/locales/es.js?v=8-year-structure",
  "./i18n/locales/et.js?v=8-year-structure",
  "./i18n/locales/fa.js?v=8-year-structure",
  "./i18n/locales/fi.js?v=8-year-structure",
  "./i18n/locales/fil.js?v=8-year-structure",
  "./i18n/locales/fo.js?v=8-year-structure",
  "./i18n/locales/fr.js?v=8-year-structure",
  "./i18n/locales/fy.js?v=8-year-structure",
  "./i18n/locales/gl.js?v=8-year-structure",
  "./i18n/locales/got.js?v=8-year-structure",
  "./i18n/locales/grc.js?v=8-year-structure",
  "./i18n/locales/gu.js?v=8-year-structure",
  "./i18n/locales/ha.js?v=8-year-structure",
  "./i18n/locales/hi.js?v=8-year-structure",
  "./i18n/locales/hr.js?v=8-year-structure",
  "./i18n/locales/ht.js?v=8-year-structure",
  "./i18n/locales/hu.js?v=8-year-structure",
  "./i18n/locales/hy.js?v=8-year-structure",
  "./i18n/locales/ia.js?v=8-year-structure",
  "./i18n/locales/id.js?v=8-year-structure",
  "./i18n/locales/io.js?v=8-year-structure",
  "./i18n/locales/is.js?v=8-year-structure",
  "./i18n/locales/it.js?v=8-year-structure",
  "./i18n/locales/ja.js?v=8-year-structure",
  "./i18n/locales/jbo.js?v=8-year-structure",
  "./i18n/locales/jv.js?v=8-year-structure",
  "./i18n/locales/ka.js?v=8-year-structure",
  "./i18n/locales/kk.js?v=8-year-structure",
  "./i18n/locales/ko.js?v=8-year-structure",
  "./i18n/locales/la.js?v=8-year-structure",
  "./i18n/locales/lb.js?v=8-year-structure",
  "./i18n/locales/lt.js?v=8-year-structure",
  "./i18n/locales/lv.js?v=8-year-structure",
  "./i18n/locales/lzh.js?v=8-year-structure",
  "./i18n/locales/mk.js?v=8-year-structure",
  "./i18n/locales/mr.js?v=8-year-structure",
  "./i18n/locales/ms.js?v=8-year-structure",
  "./i18n/locales/nb.js?v=8-year-structure",
  "./i18n/locales/ne.js?v=8-year-structure",
  "./i18n/locales/nl.js?v=8-year-structure",
  "./i18n/locales/nn.js?v=8-year-structure",
  "./i18n/locales/non.js?v=8-year-structure",
  "./i18n/locales/pa.js?v=8-year-structure",
  "./i18n/locales/pl.js?v=8-year-structure",
  "./i18n/locales/pt.js?v=8-year-structure",
  "./i18n/locales/ro.js?v=8-year-structure",
  "./i18n/locales/ru.js?v=8-year-structure",
  "./i18n/locales/sa.js?v=8-year-structure",
  "./i18n/locales/sk.js?v=8-year-structure",
  "./i18n/locales/sl.js?v=8-year-structure",
  "./i18n/locales/so.js?v=8-year-structure",
  "./i18n/locales/sq.js?v=8-year-structure",
  "./i18n/locales/sr.js?v=8-year-structure",
  "./i18n/locales/sux.js?v=8-year-structure",
  "./i18n/locales/sv.js?v=8-year-structure",
  "./i18n/locales/sw.js?v=8-year-structure",
  "./i18n/locales/ta.js?v=8-year-structure",
  "./i18n/locales/te.js?v=8-year-structure",
  "./i18n/locales/th.js?v=8-year-structure",
  "./i18n/locales/tlh.js?v=8-year-structure",
  "./i18n/locales/tok.js?v=8-year-structure",
  "./i18n/locales/tr.js?v=8-year-structure",
  "./i18n/locales/uk.js?v=8-year-structure",
  "./i18n/locales/ur.js?v=8-year-structure",
  "./i18n/locales/uz.js?v=8-year-structure",
  "./i18n/locales/vi.js?v=8-year-structure",
  "./i18n/locales/vo.js?v=8-year-structure",
  "./i18n/locales/yo.js?v=8-year-structure",
  "./i18n/locales/zh.js?v=8-year-structure",
  "./i18n/locales/zu.js?v=8-year-structure"
];

const scoped = (path) => new URL(path, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Reload avoids reusing an older HTTP-cache entry if a future deployment
    // keeps a backwards-compatible asset URL.
    await Promise.all(ASSETS.map(async (path) => {
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
    if (response.ok) (await caches.open(CACHE)).put(event.request, response.clone());
    return response;
  })());
});
