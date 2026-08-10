"use strict";

const REVERSE_WORKER_URL = new URL("./pastafari-reverse-worker.js", import.meta.url);
const STARTUP_TIMEOUT_MS = 45_000;

function createError(name, message, code, extra = {}) {
  const error = new Error(message);
  error.name = name || "Error";
  if (code) error.code = code;
  Object.assign(error, extra);
  return error;
}

function reviveWorkerError(serialized) {
  return createError(
    serialized?.name || "Error",
    serialized?.message || "Pastafari reverse lookup failed.",
    serialized?.code || "ERR_REVERSE_WORKER",
    { workerStack: serialized?.stack || "" },
  );
}

function abortError(message = "Pastafari reverse lookup was aborted.") {
  return createError("AbortError", message, "ERR_REVERSE_ABORTED");
}

function timeoutError(timeoutMs) {
  return createError(
    "TimeoutError",
    `Pastafari reverse lookup did not finish within ${timeoutMs} ms.`,
    "ERR_REVERSE_TIMEOUT",
  );
}

function serializableOptions(options) {
  const result = { ...options };
  delete result.signal;
  delete result.onProgress;
  delete result.timeoutMs;

  if (options.todayProvider !== undefined) {
    if (typeof options.todayProvider !== "function") {
      throw new TypeError("todayProvider must be a function.");
    }
    result.todaySnapshot = options.todayProvider();
    delete result.todayProvider;
  }
  return result;
}

export class PastafariReverseClient {
  constructor(options = {}) {
    this.startupTimeoutMs = options.startupTimeoutMs ?? STARTUP_TIMEOUT_MS;
    this._worker = null;
    this._inline = null;
    this._ready = null;
    this._pending = new Map();
    this._nextId = 1;
  }

  async find(pastafariDate, options = {}) {
    if (options === null || typeof options !== "object") {
      throw new TypeError("findPastafariDate options must be an object.");
    }
    if (options.signal?.aborted) throw abortError();

    const timeoutMs = options.timeoutMs === undefined ? null : Number(options.timeoutMs);
    if (timeoutMs !== null && (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1)) {
      throw new RangeError("timeoutMs must be a positive safe integer.");
    }

    await this._ensureReady();
    if (this._inline) {
      return this._findInline(pastafariDate, options, timeoutMs);
    }

    const id = this._nextId++;

    return new Promise((resolve, reject) => {
      let timer = null;
      const cleanup = () => {
        if (timer !== null) clearTimeout(timer);
        options.signal?.removeEventListener("abort", onAbort);
        this._pending.delete(id);
      };
      const cancel = (error) => {
        if (!this._pending.has(id)) return;
        try {
          this._worker.postMessage({ id, kind: "cancel" });
        } catch {
          // The request is already rejected; worker cancellation is best effort.
        }
        cleanup();
        reject(error);
      };
      const onAbort = () => cancel(abortError());

      this._pending.set(id, {
        resolve: (result) => {
          cleanup();
          resolve(result);
        },
        reject: (error) => {
          cleanup();
          reject(error);
        },
        onProgress: options.onProgress,
      });
      options.signal?.addEventListener("abort", onAbort, { once: true });
      if (timeoutMs !== null) timer = setTimeout(() => cancel(timeoutError(timeoutMs)), timeoutMs);

      try {
        this._worker.postMessage({
          id,
          kind: "find",
          payload: { pastafariDate, options: serializableOptions(options) },
        });
      } catch (error) {
        cleanup();
        reject(error);
      }
    });
  }

  dispose() {
    const error = abortError("Pastafari reverse client was disposed.");
    for (const pending of this._pending.values()) pending.reject(error);
    this._pending.clear();
    try {
      this._worker?.terminate();
    } catch {
      // Best-effort cleanup.
    }
    this._worker = null;
    this._inline = null;
    this._ready = null;
  }

  async _ensureReady() {
    if (this._ready) return this._ready;
    this._ready = this._start().catch((error) => {
      this.dispose();
      throw error;
    });
    return this._ready;
  }

  async _findInline(pastafariDate, options, timeoutMs) {
    const moduleNamespace = await import("./pastafari-calendar-fast.js");
    if (timeoutMs === null) {
      return moduleNamespace.findPastafariDate(pastafariDate, options);
    }

    const controller = new AbortController();
    const onAbort = () => controller.abort();
    options.signal?.addEventListener("abort", onAbort, { once: true });
    let timer;
    try {
      return await Promise.race([
        moduleNamespace.findPastafariDate(pastafariDate, {
          ...options,
          signal: controller.signal,
        }),
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(timeoutError(timeoutMs));
          }, timeoutMs);
        }),
      ]);
    } finally {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
    }
  }

  async _start() {
    if (typeof globalThis.Worker !== "function") {
      this._inline = true;
      return;
    }

    await new Promise((resolve, reject) => {
      const worker = new Worker(REVERSE_WORKER_URL, {
        type: "module",
        name: "pastafari-reverse",
      });
      this._worker = worker;
      const timer = setTimeout(() => reject(createError(
        "TimeoutError",
        `Pastafari reverse worker did not start within ${this.startupTimeoutMs} ms.`,
        "ERR_REVERSE_STARTUP_TIMEOUT",
      )), this.startupTimeoutMs);

      const finish = (handler, value) => {
        clearTimeout(timer);
        handler(value);
      };
      worker.addEventListener("message", (event) => {
        const message = event.data;
        if (message?.kind === "ready") {
          finish(resolve);
          return;
        }
        if (!message || !Number.isSafeInteger(message.id)) return;
        const pending = this._pending.get(message.id);
        if (!pending) return;
        if (message.kind === "progress") {
          try {
            pending.onProgress?.(message.progress);
          } catch (error) {
            pending.reject(error);
            try {
              worker.postMessage({ id: message.id, kind: "cancel" });
            } catch {
              // Best-effort cancellation after a callback failure.
            }
          }
          return;
        }
        if (message.kind === "result") {
          if (message.ok) pending.resolve(message.result);
          else pending.reject(reviveWorkerError(message.error));
        }
      });
      worker.addEventListener("error", (event) => {
        const error = createError(
          "Error",
          event.message || "Pastafari reverse worker failed.",
          "ERR_REVERSE_WORKER_LOAD",
        );
        for (const pending of this._pending.values()) pending.reject(error);
        finish(reject, error);
      });
      worker.addEventListener("messageerror", () => {
        const error = createError(
          "DataCloneError",
          "Pastafari reverse worker returned an unreadable message.",
          "ERR_REVERSE_WORKER_MESSAGE",
        );
        for (const pending of this._pending.values()) pending.reject(error);
      });
    });
  }
}

export const sharedPastafariReverseClient = new PastafariReverseClient();

export function findPastafariDate(pastafariDate, options = {}) {
  return sharedPastafariReverseClient.find(pastafariDate, options);
}

export const SAME_AS_TARGET = "same-as-target";
