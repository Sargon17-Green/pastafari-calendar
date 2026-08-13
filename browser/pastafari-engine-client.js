"use strict";

export const DEFAULT_ENGINE_STARTUP_TIMEOUT_MS = 45_000;
export const DEFAULT_ENGINE_REQUEST_TIMEOUT_MS = 90_000;

export function createRouterError(name, message, code, extra = {}) {
  const error = new Error(message);
  error.name = name || "Error";
  if (code) error.code = code;
  Object.assign(error, extra);
  return error;
}

function reviveWorkerError(serialized, engineName) {
  if (!serialized || typeof serialized !== "object") {
    return createRouterError(
      "Error",
      `${engineName} failed without an error description.`,
      "ERR_ENGINE_UNKNOWN",
      { engine: engineName },
    );
  }

  return createRouterError(
    serialized.name || "Error",
    serialized.message || `${engineName} failed.`,
    serialized.code || "ERR_ENGINE_REQUEST",
    {
      engine: engineName,
      workerStack: serialized.stack || "",
    },
  );
}

function timeoutError(label, timeoutMs, engineName = null) {
  return createRouterError(
    "TimeoutError",
    `${label} did not finish within ${timeoutMs} ms.`,
    "ERR_ENGINE_TIMEOUT",
    engineName ? { engine: engineName } : {},
  );
}

export function withRouterTimeout(promise, timeoutMs, label, engineName = null) {
  let timer;
  return Promise.race([
    Promise.resolve(promise),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(timeoutError(label, timeoutMs, engineName)), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timer));
}

/**
 * Request client shared by the standard module router and the standalone
 * classic-script router. Transports are injected so the verification logic
 * does not need a second implementation.
 */
export class PastafariEngineClient {
  constructor(name, options = {}) {
    this.name = name;
    this.workerFactory = options.workerFactory ?? null;
    this.inlineLoader = options.inlineLoader ?? null;
    this.startupTimeoutMs = options.startupTimeoutMs ?? DEFAULT_ENGINE_STARTUP_TIMEOUT_MS;
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_ENGINE_REQUEST_TIMEOUT_MS;

    this._worker = null;
    this._workerSourceRelease = null;
    this._inlineHandler = null;
    this._readyPromise = null;
    this._readyResolve = null;
    this._readyReject = null;
    this._pending = new Map();
    this._nextId = 1;
    this._mode = null;
  }

  get mode() {
    return this._mode;
  }

  async request(operation, payload, options = {}) {
    const timeoutMs = options.timeoutMs ?? this.requestTimeoutMs;
    await this._ensureReady();

    if (this._mode === "inline") {
      return withRouterTimeout(
        this._inlineHandler(operation, payload),
        timeoutMs,
        `${this.name}:${operation}`,
        this.name,
      );
    }

    const id = this._nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const error = timeoutError(`${this.name}:${operation}`, timeoutMs, this.name);
        this.terminate(error);
      }, timeoutMs);

      this._pending.set(id, { resolve, reject, timer });
      try {
        this._worker.postMessage({ id, operation, payload });
      } catch (error) {
        clearTimeout(timer);
        this._pending.delete(id);
        error.engine = this.name;
        reject(error);
      }
    });
  }

  async _ensureReady() {
    if (this._readyPromise) return this._readyPromise;

    this._readyPromise = withRouterTimeout(
      this._start(),
      this.startupTimeoutMs,
      `${this.name} startup`,
      this.name,
    ).catch((error) => {
      this.terminate(error);
      throw error;
    });

    return this._readyPromise;
  }

  async _start() {
    let workerError = null;
    if (typeof this.workerFactory === "function") {
      try {
        await this._startWorker();
        return;
      } catch (error) {
        workerError = error;
        this._resetWorkerOnly();
      }
    }

    if (typeof this.inlineLoader === "function") {
      const handler = await this.inlineLoader();
      if (typeof handler !== "function") {
        throw createRouterError(
          "TypeError",
          `${this.name} module does not export handlePastafariWorkerRequest().`,
          "ERR_ENGINE_INTERFACE",
          { engine: this.name },
        );
      }
      this._inlineHandler = handler;
      this._mode = "inline";
      return;
    }

    if (workerError) throw workerError;
    throw createRouterError(
      "NotSupportedError",
      `${this.name} has no available Worker or inline transport.`,
      "ERR_ENGINE_UNAVAILABLE",
      { engine: this.name },
    );
  }

  _startWorker() {
    return new Promise((resolve, reject) => {
      this._readyResolve = resolve;
      this._readyReject = reject;

      const resource = this.workerFactory();
      const worker = resource?.worker ?? resource;
      if (
        !worker
        || typeof worker.addEventListener !== "function"
        || typeof worker.postMessage !== "function"
      ) {
        throw createRouterError(
          "TypeError",
          `${this.name} worker factory returned an invalid Worker.`,
          "ERR_ENGINE_INTERFACE",
          { engine: this.name },
        );
      }

      this._worker = worker;
      this._workerSourceRelease = typeof resource?.release === "function"
        ? resource.release
        : null;
      this._mode = "worker";

      worker.addEventListener("message", (event) => this._onMessage(event));
      worker.addEventListener("error", (event) => {
        const error = createRouterError(
          "Error",
          event.message || `${this.name} worker failed to load.`,
          "ERR_WORKER_LOAD",
          { engine: this.name },
        );
        this._failWorker(error);
      });
      worker.addEventListener("messageerror", () => {
        this._failWorker(createRouterError(
          "DataCloneError",
          `${this.name} worker returned an unreadable message.`,
          "ERR_WORKER_MESSAGE",
          { engine: this.name },
        ));
      });
    });
  }

  _onMessage(event) {
    const message = event.data;
    if (message?.kind === "ready") {
      const resolve = this._readyResolve;
      this._readyResolve = null;
      this._readyReject = null;
      this._releaseWorkerSource();
      resolve?.();
      return;
    }

    if (!message || !Number.isSafeInteger(message.id)) return;
    const pending = this._pending.get(message.id);
    if (!pending) return;

    this._pending.delete(message.id);
    clearTimeout(pending.timer);
    if (message.ok) pending.resolve(message.result);
    else pending.reject(reviveWorkerError(message.error, this.name));
  }

  _failWorker(error) {
    this._readyReject?.(error);
    this._readyResolve = null;
    this._readyReject = null;

    for (const pending of this._pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this._pending.clear();
    this._resetWorkerOnly();
  }

  _releaseWorkerSource() {
    try {
      this._workerSourceRelease?.();
    } catch {
      // Best-effort cleanup.
    }
    this._workerSourceRelease = null;
  }

  _resetWorkerOnly() {
    try {
      this._worker?.terminate();
    } catch {
      // Best-effort cleanup.
    }
    this._releaseWorkerSource();
    this._worker = null;
    this._mode = null;
    this._readyResolve = null;
    this._readyReject = null;
  }

  terminate(reason = null) {
    const error = reason instanceof Error
      ? reason
      : createRouterError("AbortError", `${this.name} was stopped.`, "ERR_ENGINE_TERMINATED", {
        engine: this.name,
      });

    for (const pending of this._pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this._pending.clear();
    this._resetWorkerOnly();
    this._inlineHandler = null;
    this._readyPromise = null;
  }
}
