"use strict";

const AUTHORITATIVE_WORKER_URL = new URL("./pastafari-authoritative-worker.js", import.meta.url);
const FAST_WORKER_URL = new URL("./pastafari-fast-worker.js", import.meta.url);

const STARTUP_TIMEOUT_MS = 45_000;
const REQUEST_TIMEOUT_MS = 90_000;
const VERIFICATION_TIMEOUT_MS = 240_000;
const AUTHORITATIVE_IDLE_SHUTDOWN_MS = 500;

const CANONICAL_FIELDS = Object.freeze([
  "year",
  "cutletName",
  "dayInCutlet",
  "monthName",
  "dayInMonth",
]);

function assertBigInt(value, name) {
  if (typeof value !== "bigint") {
    throw new TypeError(`${name} must be a bigint.`);
  }
  return value;
}

function canonical(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  if (!source || typeof source !== "object") {
    throw new TypeError("A calendar engine returned an invalid result.");
  }

  const out = {};
  for (const field of CANONICAL_FIELDS) out[field] = source[field];
  return Object.freeze(out);
}

function sameCanonical(leftValue, rightValue) {
  const left = canonical(leftValue);
  const right = canonical(rightValue);
  return CANONICAL_FIELDS.every((field) => left[field] === right[field]);
}

function describeCanonical(value) {
  const item = canonical(value);
  return CANONICAL_FIELDS.map((field) => `${field}=${String(item[field])}`).join(", ");
}

function createError(name, message, code, extra = {}) {
  const error = new Error(message);
  error.name = name || "Error";
  if (code) error.code = code;
  Object.assign(error, extra);
  return error;
}

function reviveWorkerError(serialized, engineName) {
  if (!serialized || typeof serialized !== "object") {
    return createError("Error", `${engineName} failed without an error description.`, "ERR_ENGINE_UNKNOWN", {
      engine: engineName,
    });
  }

  return createError(
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
  return createError(
    "TimeoutError",
    `${label} did not finish within ${timeoutMs} ms.`,
    "ERR_ENGINE_TIMEOUT",
    engineName ? { engine: engineName } : {},
  );
}

function withTimeout(promise, timeoutMs, label, engineName = null) {
  let timer;
  return Promise.race([
    Promise.resolve(promise),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(timeoutError(label, timeoutMs, engineName)), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timer));
}

class EngineClient {
  constructor(name, moduleUrl, options = {}) {
    this.name = name;
    this.moduleUrl = moduleUrl;
    this.startupTimeoutMs = options.startupTimeoutMs ?? STARTUP_TIMEOUT_MS;
    this.requestTimeoutMs = options.requestTimeoutMs ?? REQUEST_TIMEOUT_MS;

    this._worker = null;
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
      return withTimeout(
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

    this._readyPromise = withTimeout(
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
    if (typeof globalThis.Worker === "function") {
      try {
        await this._startWorker();
        return;
      } catch (workerError) {
        this._resetWorkerOnly(workerError);
      }
    }

    const module = await import(this.moduleUrl.href);
    if (typeof module.handlePastafariWorkerRequest !== "function") {
      throw createError(
        "TypeError",
        `${this.name} module does not export handlePastafariWorkerRequest().`,
        "ERR_ENGINE_INTERFACE",
        { engine: this.name },
      );
    }
    this._inlineHandler = module.handlePastafariWorkerRequest;
    this._mode = "inline";
  }

  _startWorker() {
    return new Promise((resolve, reject) => {
      this._readyResolve = resolve;
      this._readyReject = reject;

      const worker = new Worker(this.moduleUrl, {
        type: "module",
        name: `pastafari-${this.name}`,
      });
      this._worker = worker;
      this._mode = "worker";

      worker.addEventListener("message", (event) => this._onMessage(event));
      worker.addEventListener("error", (event) => {
        const error = createError(
          "Error",
          event.message || `${this.name} worker failed to load.`,
          "ERR_WORKER_LOAD",
          { engine: this.name },
        );
        this._failWorker(error);
      });
      worker.addEventListener("messageerror", () => {
        this._failWorker(createError(
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
    this._resetWorkerOnly(error);
  }

  _resetWorkerOnly() {
    try {
      this._worker?.terminate();
    } catch {
      // Best-effort cleanup.
    }
    this._worker = null;
    this._mode = null;
    this._readyResolve = null;
    this._readyReject = null;
  }

  terminate(reason = null) {
    const error = reason instanceof Error
      ? reason
      : createError("AbortError", `${this.name} was stopped.`, "ERR_ENGINE_TERMINATED", {
        engine: this.name,
      });

    for (const pending of this._pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this._pending.clear();
    this._resetWorkerOnly(error);
    this._inlineHandler = null;
    this._readyPromise = null;
  }
}

function newCalculationState(calculationJdn) {
  return {
    calculationJdn,
    status: "unverified",
    verification: null,
    error: null,
    verifiedAt: null,
    authoritativeRequests: new Map(),
  };
}

function validateCutletView(view, requestedTargetJdn) {
  if (!view || typeof view !== "object" || !Array.isArray(view.days)) {
    throw createError("TypeError", "The fast engine returned an invalid cutlet view.", "ERR_FAST_VIEW");
  }

  const startJdn = assertBigInt(view.startJdn, "view.startJdn");
  const endJdn = assertBigInt(view.endJdn, "view.endJdn");
  if (endJdn < startJdn) {
    throw createError("RangeError", "The fast engine returned reversed cutlet bounds.", "ERR_FAST_VIEW");
  }

  const expectedLength = Number(endJdn - startJdn + 1n);
  if (!Number.isSafeInteger(expectedLength) || expectedLength !== view.days.length) {
    throw createError("RangeError", "The fast engine returned an incomplete cutlet view.", "ERR_FAST_VIEW");
  }

  if (requestedTargetJdn < startJdn || requestedTargetJdn > endJdn) {
    throw createError("RangeError", "The requested day is not inside the returned cutlet.", "ERR_FAST_VIEW");
  }

  for (let index = 0; index < view.days.length; index += 1) {
    const day = view.days[index];
    const expectedJdn = startJdn + BigInt(index);
    if (day.jdn !== expectedJdn) {
      throw createError("RangeError", "The fast engine returned non-contiguous cutlet days.", "ERR_FAST_VIEW");
    }
    if (day.dayInCutlet !== index + 1) {
      throw createError("RangeError", "The fast engine returned an invalid day-in-cutlet sequence.", "ERR_FAST_VIEW");
    }
  }

  return view;
}

export class PastafariCalendarRouter {
  constructor(options = {}) {
    this._authoritative = new EngineClient("authoritative", AUTHORITATIVE_WORKER_URL, {
      startupTimeoutMs: options.authoritativeStartupTimeoutMs ?? STARTUP_TIMEOUT_MS,
      requestTimeoutMs: options.authoritativeRequestTimeoutMs ?? REQUEST_TIMEOUT_MS,
    });
    this._fast = new EngineClient("fast", FAST_WORKER_URL, {
      startupTimeoutMs: options.fastStartupTimeoutMs ?? STARTUP_TIMEOUT_MS,
      requestTimeoutMs: options.fastRequestTimeoutMs ?? REQUEST_TIMEOUT_MS,
    });

    this._states = new Map();
    this._fastDisabledError = null;
    this._authoritativeShutdownTimer = null;
  }

  async convert(targetJdn, calculationJdn) {
    assertBigInt(targetJdn, "targetJdn");
    assertBigInt(calculationJdn, "calculationJdn");

    const state = this._stateFor(calculationJdn);
    if (state.status === "verified" && !this._fastDisabledError) {
      return this._fastRequestWithFallback(state, "convert", { targetJdn, calculationJdn });
    }

    if (state.status === "authoritative-only" || this._fastDisabledError) {
      return canonical(await this._authoritative.request("convert", { targetJdn, calculationJdn }));
    }

    if (state.status === "verifying") {
      await state.verification;
      return this.convert(targetJdn, calculationJdn);
    }

    const trusted = await this._authoritativeConvert(state, targetJdn, calculationJdn);
    this._startVerification(state, targetJdn, trusted);
    return trusted;
  }

  async getCutletView(targetJdn, calculationJdn) {
    assertBigInt(targetJdn, "targetJdn");
    assertBigInt(calculationJdn, "calculationJdn");

    const state = this._stateFor(calculationJdn);
    if (state.status === "verified" && !this._fastDisabledError) {
      return this._fastViewWithFallback(state, targetJdn, calculationJdn);
    }

    if (state.status === "authoritative-only" || this._fastDisabledError) {
      return this._authoritative.request("getCutletView", { targetJdn, calculationJdn }, {
        timeoutMs: VERIFICATION_TIMEOUT_MS,
      });
    }

    if (state.status === "unverified") {
      const trusted = await this._authoritativeConvert(state, targetJdn, calculationJdn);
      this._startVerification(state, targetJdn, trusted);
    }

    await state.verification;
    if (state.status === "verified" && !this._fastDisabledError) {
      return this._fastViewWithFallback(state, targetJdn, calculationJdn);
    }

    return this._authoritative.request("getCutletView", { targetJdn, calculationJdn }, {
      timeoutMs: VERIFICATION_TIMEOUT_MS,
    });
  }

  getStatus(calculationJdn) {
    if (calculationJdn === undefined) {
      return Object.freeze({
        fastDisabled: Boolean(this._fastDisabledError),
        fastDisabledReason: this._fastDisabledError?.message ?? null,
        calculations: Object.freeze([...this._states.values()].map((state) => Object.freeze({
          calculationJdn: state.calculationJdn,
          status: state.status,
          verifiedAt: state.verifiedAt,
          error: state.error?.message ?? null,
        }))),
      });
    }

    assertBigInt(calculationJdn, "calculationJdn");
    const state = this._states.get(calculationJdn.toString());
    return Object.freeze({
      calculationJdn,
      status: state?.status ?? "unverified",
      verifiedAt: state?.verifiedAt ?? null,
      error: state?.error?.message ?? null,
      fastDisabled: Boolean(this._fastDisabledError),
    });
  }

  async retry(calculationJdn = undefined) {
    if (calculationJdn !== undefined && calculationJdn !== null) {
      assertBigInt(calculationJdn, "calculationJdn");
      this._states.delete(calculationJdn.toString());
    } else {
      this._states.clear();
    }

    this._fastDisabledError = null;
    clearTimeout(this._authoritativeShutdownTimer);
    this._authoritativeShutdownTimer = null;
    this._authoritative.terminate();
    this._fast.terminate();
  }

  dispose() {
    clearTimeout(this._authoritativeShutdownTimer);
    this._authoritativeShutdownTimer = null;
    this._authoritative.terminate();
    this._fast.terminate();
    this._states.clear();
  }

  _stateFor(calculationJdn) {
    const key = calculationJdn.toString();
    let state = this._states.get(key);
    if (!state) {
      state = newCalculationState(calculationJdn);
      this._states.set(key, state);
    }
    return state;
  }

  _authoritativeConvert(state, targetJdn, calculationJdn) {
    const key = targetJdn.toString();
    const existing = state.authoritativeRequests.get(key);
    if (existing) return existing;

    const request = this._authoritative.request("convert", { targetJdn, calculationJdn })
      .then(canonical)
      .finally(() => state.authoritativeRequests.delete(key));
    state.authoritativeRequests.set(key, request);
    return request;
  }

  _startVerification(state, anchorJdn, trustedAnchor) {
    if (state.status === "verifying" || state.status === "verified") return state.verification;

    clearTimeout(this._authoritativeShutdownTimer);
    this._authoritativeShutdownTimer = null;
    state.status = "verifying";
    state.error = null;

    const verification = withTimeout(
      this._verifyCalculationDay(state.calculationJdn, anchorJdn, trustedAnchor),
      VERIFICATION_TIMEOUT_MS,
      `verification for calculation day ${state.calculationJdn}`,
    ).then(() => {
      if (this._states.get(state.calculationJdn.toString()) !== state) return "superseded";
      state.status = "verified";
      state.verifiedAt = new Date().toISOString();
      state.error = null;
      this._scheduleAuthoritativeShutdown();
      return "verified";
    }).catch((error) => {
      if (this._states.get(state.calculationJdn.toString()) !== state) return "superseded";
      state.status = "authoritative-only";
      state.error = error;

      if (error?.code === "ERR_FAST_MISMATCH" || error?.code === "ERR_FAST_VIEW") {
        this._fastDisabledError = error;
        this._fast.terminate(error);
      }
      return "authoritative-only";
    });

    state.verification = verification;
    return verification;
  }

  async _verifyCalculationDay(calculationJdn, anchorJdn, trustedAnchor) {
    if (this._fastDisabledError) throw this._fastDisabledError;

    const fastAnchor = canonical(await this._fast.request("convert", { anchorJdn, targetJdn: anchorJdn, calculationJdn }));
    if (!sameCanonical(trustedAnchor, fastAnchor)) {
      throw createError(
        "VerificationError",
        `Fast implementation mismatch at JDN ${anchorJdn}. Authoritative: ${describeCanonical(trustedAnchor)}. Fast: ${describeCanonical(fastAnchor)}.`,
        "ERR_FAST_MISMATCH",
      );
    }

    const current = validateCutletView(
      await this._fast.request("getCutletView", { targetJdn: anchorJdn, calculationJdn }),
      anchorJdn,
    );
    const [previous, next] = await Promise.all([
      this._fast.request("getCutletView", {
        targetJdn: assertBigInt(current.previousCutletJdn, "previousCutletJdn"),
        calculationJdn,
      }),
      this._fast.request("getCutletView", {
        targetJdn: assertBigInt(current.nextCutletJdn, "nextCutletJdn"),
        calculationJdn,
      }),
    ]);

    const views = [
      validateCutletView(previous, current.previousCutletJdn),
      current,
      validateCutletView(next, current.nextCutletJdn),
    ];

    for (const view of views) {
      await this._verifyCutletView(view, calculationJdn);
    }
  }

  async _verifyCutletView(view, calculationJdn) {
    const count = view.days.length;
    const authoritativeDays = await this._authoritative.request("convertJdnRange", {
      startJdn: view.startJdn,
      count,
      calculationJdn,
    }, { timeoutMs: VERIFICATION_TIMEOUT_MS });

    if (!Array.isArray(authoritativeDays) || authoritativeDays.length !== count) {
      throw createError(
        "VerificationError",
        `Authoritative range length mismatch for cutlet starting at ${view.startJdn}.`,
        "ERR_AUTHORITATIVE_RANGE",
      );
    }

    for (let index = 0; index < count; index += 1) {
      const authoritative = authoritativeDays[index];
      const fast = view.days[index];
      if (!sameCanonical(authoritative, fast)) {
        const jdn = view.startJdn + BigInt(index);
        throw createError(
          "VerificationError",
          `Fast implementation mismatch at JDN ${jdn}. Authoritative: ${describeCanonical(authoritative)}. Fast: ${describeCanonical(fast)}.`,
          "ERR_FAST_MISMATCH",
        );
      }
    }
  }

  async _fastRequestWithFallback(state, operation, payload) {
    try {
      return canonical(await this._fast.request(operation, payload));
    } catch (error) {
      state.status = "authoritative-only";
      state.error = error;
      this._fast.terminate(error);
      return canonical(await this._authoritative.request(operation, payload));
    }
  }

  async _fastViewWithFallback(state, targetJdn, calculationJdn) {
    try {
      return await this._fast.request("getCutletView", { targetJdn, calculationJdn });
    } catch (error) {
      state.status = "authoritative-only";
      state.error = error;
      this._fast.terminate(error);
      return this._authoritative.request("getCutletView", { targetJdn, calculationJdn }, {
        timeoutMs: VERIFICATION_TIMEOUT_MS,
      });
    }
  }

  _scheduleAuthoritativeShutdown() {
    clearTimeout(this._authoritativeShutdownTimer);
    this._authoritativeShutdownTimer = setTimeout(() => {
      const requiresAuthoritative = [...this._states.values()].some((state) => (
        state.status === "verifying" || state.status === "authoritative-only"
      ));
      if (!requiresAuthoritative) this._authoritative.terminate();
      this._authoritativeShutdownTimer = null;
    }, AUTHORITATIVE_IDLE_SHUTDOWN_MS);
  }
}

export const sharedPastafariRouter = new PastafariCalendarRouter();
