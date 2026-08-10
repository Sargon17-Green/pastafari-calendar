"use strict";

import { findPastafariDate as findPastafariDateDirect } from "./pastafari-calendar-fast.js";

const activeRequests = new Map();

function serializeError(error) {
  return {
    name: error?.name || "Error",
    message: error?.message || String(error),
    code: error?.code || null,
    stack: error?.stack || "",
  };
}

export async function handlePastafariReverseRequest(payload = {}, hooks = {}) {
  if (payload === null || typeof payload !== "object") {
    throw new TypeError("The reverse worker payload must be an object.");
  }

  const sourceOptions = payload.options ?? {};
  if (sourceOptions === null || typeof sourceOptions !== "object") {
    throw new TypeError("The reverse worker options must be an object.");
  }

  const options = { ...sourceOptions };
  if (Object.hasOwn(options, "todaySnapshot")) {
    const todaySnapshot = options.todaySnapshot;
    delete options.todaySnapshot;
    options.todayProvider = () => todaySnapshot;
  }
  if (hooks.signal !== undefined) options.signal = hooks.signal;
  if (hooks.onProgress !== undefined) options.onProgress = hooks.onProgress;

  return findPastafariDateDirect(payload.pastafariDate, options);
}

const isDedicatedWorker = (
  typeof DedicatedWorkerGlobalScope !== "undefined"
  && globalThis instanceof DedicatedWorkerGlobalScope
);

if (isDedicatedWorker) {
  globalThis.addEventListener("message", async (event) => {
    const message = event.data;
    if (!message || !Number.isSafeInteger(message.id)) return;

    if (message.kind === "cancel") {
      activeRequests.get(message.id)?.abort();
      return;
    }
    if (message.kind !== "find") return;

    const controller = new AbortController();
    activeRequests.set(message.id, controller);
    try {
      const result = await handlePastafariReverseRequest(message.payload, {
        signal: controller.signal,
        onProgress: (progress) => {
          globalThis.postMessage({ id: message.id, kind: "progress", progress });
        },
      });
      globalThis.postMessage({ id: message.id, kind: "result", ok: true, result });
    } catch (error) {
      globalThis.postMessage({
        id: message.id,
        kind: "result",
        ok: false,
        error: serializeError(error),
      });
    } finally {
      activeRequests.delete(message.id);
    }
  });

  globalThis.postMessage({ kind: "ready" });
}
