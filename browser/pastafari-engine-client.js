"use strict";

import {
  beginDiagnosticOperation,
  endDiagnosticOperation,
  getPastafariDiagnosticsTransportConfig,
  incrementDiagnosticCounter,
  mergePastafariDiagnosticsSnapshot,
  recordDiagnosticError,
} from "./pastafari-diagnostics.js";

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
    const reusedTransport = Boolean(this._readyPromise);
    let phase = reusedTransport ? "ready" : "initialize";
    const token = beginDiagnosticOperation("engine-client", `${this.name}:${operation}`, {
      timeoutMs,
      transportState: reusedTransport ? "reused" : "cold",
    });
    try {
      await this._ensureReady();

      if (this._mode === "inline") {
        phase = "inline-compute";
        const result = await withRouterTimeout(
          this._inlineHandler(operation, payload),
          timeoutMs,
          `${this.name}:${operation}`,
          this.name,
        );
        endDiagnosticOperation(token, "ok", {
          mode: "inline",
          phase,
          transportState: reusedTransport ? "reused" : "cold",
        });
        return result;
      }

      phase = "worker-round-trip";
      const id = this._nextId++;
      const result = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          incrementDiagnosticCounter(`engine-client.${this.name}.timeouts`);
          const error = timeoutError(`${this.name}:${operation}`, timeoutMs, this.name);
          this.terminate(error);
        }, timeoutMs);

        this._pending.set(id, { resolve, reject, timer });
        const sendToken = beginDiagnosticOperation("engine-client", `${this.name}:post-message`, { requestId: id });
        try {
          this._worker.postMessage({
            id,
            operation,
            payload,
            diagnostics: getPastafariDiagnosticsTransportConfig(),
          });
          endDiagnosticOperation(sendToken, "ok");
        } catch (error) {
          endDiagnosticOperation(sendToken, "error");
          clearTimeout(timer);
          this._pending.delete(id);
          error.engine = this.name;
          reject(error);
        }
      });
      endDiagnosticOperation(token, "ok", {
        mode: "worker",
        phase,
        requestId: id,
        transportState: reusedTransport ? "reused" : "cold",
      });
      return result;
    } catch (error) {
      const outcome = error?.name === "TimeoutError" ? "timeout" : error?.name === "AbortError" ? "cancelled" : "error";
      recordDiagnosticError("engine-client", error, token?.id, { engine: this.name, operation, phase });
      endDiagnosticOperation(token, outcome, {
        engine: this.name,
        mode: this._mode,
        phase,
        timeoutMs,
        transportState: reusedTransport ? "reused" : "cold",
      });
      throw error;
    }
  }

  async _ensureReady() {
    if (this._readyPromise) {
      incrementDiagnosticCounter(`engine-client.${this.name}.ready.reused`);
      return this._readyPromise;
    }

    incrementDiagnosticCounter(`engine-client.${this.name}.ready.cold`);
    const token = beginDiagnosticOperation("engine-client", `${this.name}:initialize`, {
      startupTimeoutMs: this.startupTimeoutMs,
    });
    this._readyPromise = withRouterTimeout(
      this._start(),
      this.startupTimeoutMs,
      `${this.name} startup`,
      this.name,
    ).then((value) => {
      endDiagnosticOperation(token, "ok", { mode: this._mode });
      return value;
    }).catch((error) => {
      const outcome = error?.name === "TimeoutError" ? "timeout" : "error";
      recordDiagnosticError("engine-client", error, token?.id, { engine: this.name, phase: "initialize" });
      endDiagnosticOperation(token, outcome, { mode: this._mode, phase: "initialize" });
      this.terminate(error);
      throw error;
    });

    return this._readyPromise;
  }

  async _start() {
    incrementDiagnosticCounter(`engine-client.${this.name}.starts`);
    let workerError = null;
    if (typeof this.workerFactory === "function") {
      try {
        await this._startWorker();
        incrementDiagnosticCounter(`engine-client.${this.name}.mode.worker`);
        return;
      } catch (error) {
        workerError = error;
        incrementDiagnosticCounter(`engine-client.${this.name}.worker-start-failed`);
        recordDiagnosticError("engine-client", error, null, { engine: this.name, phase: "worker-start" });
        this._resetWorkerOnly();
      }
    }

    if (typeof this.inlineLoader === "function") {
      if (workerError) incrementDiagnosticCounter(`engine-client.${this.name}.worker-fallback-inline`);
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
      incrementDiagnosticCounter(`engine-client.${this.name}.mode.inline`);
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

      const creationToken = beginDiagnosticOperation("engine-client", `${this.name}:worker-create`);
      let resource;
      try {
        resource = this.workerFactory();
        endDiagnosticOperation(creationToken, "ok");
      } catch (error) {
        endDiagnosticOperation(creationToken, "error");
        throw error;
      }
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
      incrementDiagnosticCounter(`engine-client.${this.name}.worker.ready`);
      if (message.degraded) incrementDiagnosticCounter(`engine-client.${this.name}.worker.ready-degraded`);
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
    if (message.diagnostics) {
      mergePastafariDiagnosticsSnapshot(`worker.${this.name}`, message.diagnostics);
    }
    incrementDiagnosticCounter(`engine-client.${this.name}.worker.responses`);
    if (message.ok) pending.resolve(message.result);
    else {
      incrementDiagnosticCounter(`engine-client.${this.name}.worker.response-errors`);
      pending.reject(reviveWorkerError(message.error, this.name));
    }
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
    if (this._worker) incrementDiagnosticCounter(`engine-client.${this.name}.worker.resets`);
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
    incrementDiagnosticCounter(`engine-client.${this.name}.terminations`);
    const terminationReason = reason?.code === "ERR_ENGINE_TIMEOUT"
      ? "timeout"
      : reason instanceof Error
        ? "error"
        : "explicit";
    incrementDiagnosticCounter(`engine-client.${this.name}.termination.${terminationReason}`);
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
