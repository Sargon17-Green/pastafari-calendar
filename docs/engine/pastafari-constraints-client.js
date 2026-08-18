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
    serialized?.message || "Pastafari constraint solving failed.",
    serialized?.code || "ERR_CONSTRAINT_WORKER",
    { workerStack: serialized?.stack || "", ...(serialized?.extra || {}) },
  );
}

function abortError(message = "Pastafari constraint solving was aborted.") {
  return createError("AbortError", message, "ERR_REVERSE_ABORTED");
}

function timeoutError(timeoutMs) {
  return createError(
    "TimeoutError",
    `Pastafari constraint solving did not finish within ${timeoutMs} ms.`,
    "ERR_REVERSE_TIMEOUT",
  );
}

function serializableOptions(options) {
  const result = { ...options };
  delete result.signal;
  delete result.onProgress;
  delete result.timeoutMs;
  return result;
}

export class PastafariConstraintClient {
  constructor(options = {}) {
    this.startupTimeoutMs = options.startupTimeoutMs ?? STARTUP_TIMEOUT_MS;
    this._worker = null;
    this._inline = false;
    this._ready = null;
    this._pending = new Map();
    this._nextId = 1;
  }

  async solve(problem, options = {}) {
    if (options === null || typeof options !== "object") {
      throw new TypeError("solvePastafariConstraints options must be an object.");
    }
    if (options.signal?.aborted) throw abortError();
    if (options.onProgress !== undefined && typeof options.onProgress !== "function") {
      throw new TypeError("onProgress must be a function.");
    }
    const timeoutMs = options.timeoutMs === undefined ? null : Number(options.timeoutMs);
    if (timeoutMs !== null && (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1)) {
      throw new RangeError("timeoutMs must be a positive safe integer.");
    }

    await this._ensureReady();
    if (this._inline) return this._solveInline(problem, options, timeoutMs);

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
          // Best effort: the caller is already receiving the cancellation.
        }
        cleanup();
        reject(error);
      };
      const onAbort = () => cancel(abortError());

      this._pending.set(id, {
        resolve: (result) => { cleanup(); resolve(result); },
        reject: (error) => { cleanup(); reject(error); },
        onProgress: options.onProgress,
      });
      options.signal?.addEventListener("abort", onAbort, { once: true });
      if (timeoutMs !== null) timer = setTimeout(() => cancel(timeoutError(timeoutMs)), timeoutMs);

      try {
        this._worker.postMessage({
          id,
          kind: "solve",
          payload: { problem, options: serializableOptions(options) },
        });
      } catch (error) {
        cleanup();
        reject(error);
      }
    });
  }

  dispose() {
    const error = abortError("Pastafari constraint client was disposed.");
    for (const pending of this._pending.values()) pending.reject(error);
    this._pending.clear();
    try { this._worker?.terminate(); } catch { /* best effort */ }
    this._worker = null;
    this._inline = false;
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

  async _solveInline(problem, options, timeoutMs) {
    const moduleNamespace = await import("./pastafari-constraints.js");
    if (timeoutMs === null) {
      return moduleNamespace.solvePastafariConstraintsDirect(problem, options);
    }
    const controller = new AbortController();
    const onAbort = () => controller.abort();
    options.signal?.addEventListener("abort", onAbort, { once: true });
    let timer;
    try {
      return await Promise.race([
        moduleNamespace.solvePastafariConstraintsDirect(problem, { ...options, signal: controller.signal }),
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
      const worker = new Worker(REVERSE_WORKER_URL, { type: "module", name: "pastafari-constraints" });
      this._worker = worker;
      const timer = setTimeout(() => reject(createError(
        "TimeoutError",
        `Pastafari constraint worker did not start within ${this.startupTimeoutMs} ms.`,
        "ERR_REVERSE_STARTUP_TIMEOUT",
      )), this.startupTimeoutMs);
      const finish = (handler, value) => { clearTimeout(timer); handler(value); };
      worker.addEventListener("message", (event) => {
        const message = event.data;
        if (message?.kind === "ready") { finish(resolve); return; }
        if (!message || !Number.isSafeInteger(message.id)) return;
        const pending = this._pending.get(message.id);
        if (!pending) return;
        if (message.kind === "progress") {
          try { pending.onProgress?.(message.progress); }
          catch (error) {
            pending.reject(error);
            try { worker.postMessage({ id: message.id, kind: "cancel" }); } catch { /* best effort */ }
          }
          return;
        }
        if (message.kind === "result") {
          if (message.ok) pending.resolve(message.result);
          else pending.reject(reviveWorkerError(message.error));
        }
      });
      worker.addEventListener("error", (event) => {
        const error = createError("Error", event.message || "Pastafari constraint worker failed.", "ERR_REVERSE_WORKER_LOAD");
        for (const pending of this._pending.values()) pending.reject(error);
        finish(reject, error);
      });
      worker.addEventListener("messageerror", () => {
        const error = createError("DataCloneError", "Pastafari constraint worker returned an unreadable message.", "ERR_REVERSE_WORKER_MESSAGE");
        for (const pending of this._pending.values()) pending.reject(error);
      });
    });
  }
}

export const sharedPastafariConstraintClient = new PastafariConstraintClient();

export function solvePastafariConstraints(problem, options = {}) {
  return sharedPastafariConstraintClient.solve(problem, options);
}

export { SAME_AS_TARGET } from "./pastafari-calendar-fast.js";
