"use strict";

import {
  createRouterError,
  withRouterTimeout,
} from "./pastafari-engine-client.js";

export const DEFAULT_VERIFICATION_TIMEOUT_MS = 240_000;
export const DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS = 500;

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
    throw createRouterError(
      "TypeError",
      "The fast engine returned an invalid cutlet view.",
      "ERR_FAST_VIEW",
    );
  }

  const startJdn = assertBigInt(view.startJdn, "view.startJdn");
  const endJdn = assertBigInt(view.endJdn, "view.endJdn");
  if (endJdn < startJdn) {
    throw createRouterError(
      "RangeError",
      "The fast engine returned reversed cutlet bounds.",
      "ERR_FAST_VIEW",
    );
  }

  const expectedLength = Number(endJdn - startJdn + 1n);
  if (!Number.isSafeInteger(expectedLength) || expectedLength !== view.days.length) {
    throw createRouterError(
      "RangeError",
      "The fast engine returned an incomplete cutlet view.",
      "ERR_FAST_VIEW",
    );
  }

  if (requestedTargetJdn < startJdn || requestedTargetJdn > endJdn) {
    throw createRouterError(
      "RangeError",
      "The requested day is not inside the returned cutlet.",
      "ERR_FAST_VIEW",
    );
  }

  for (let index = 0; index < view.days.length; index += 1) {
    const day = view.days[index];
    const expectedJdn = startJdn + BigInt(index);
    if (day.jdn !== expectedJdn) {
      throw createRouterError(
        "RangeError",
        "The fast engine returned non-contiguous cutlet days.",
        "ERR_FAST_VIEW",
      );
    }
    if (day.dayInCutlet !== index + 1) {
      throw createRouterError(
        "RangeError",
        "The fast engine returned an invalid day-in-cutlet sequence.",
        "ERR_FAST_VIEW",
      );
    }
  }

  return view;
}

/**
 * Engine-transport-independent router. Both published browser targets use this
 * class, so authoritative-first conversion and fast-engine verification have
 * one source of truth.
 */
export class PastafariCalendarRouterCore {
  constructor(options = {}) {
    if (!options.authoritativeClient || !options.fastClient) {
      throw new TypeError("Both authoritativeClient and fastClient are required.");
    }

    this._authoritative = options.authoritativeClient;
    this._fast = options.fastClient;
    this._verificationTimeoutMs = options.verificationTimeoutMs
      ?? DEFAULT_VERIFICATION_TIMEOUT_MS;
    this._authoritativeIdleShutdownMs = options.authoritativeIdleShutdownMs
      ?? DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS;

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
        timeoutMs: this._verificationTimeoutMs,
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
      timeoutMs: this._verificationTimeoutMs,
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

    const verification = withRouterTimeout(
      this._verifyCalculationDay(state.calculationJdn, anchorJdn, trustedAnchor),
      this._verificationTimeoutMs,
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

    const fastAnchor = canonical(await this._fast.request("convert", {
      anchorJdn,
      targetJdn: anchorJdn,
      calculationJdn,
    }));
    if (!sameCanonical(trustedAnchor, fastAnchor)) {
      throw createRouterError(
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
    }, { timeoutMs: this._verificationTimeoutMs });

    if (!Array.isArray(authoritativeDays) || authoritativeDays.length !== count) {
      throw createRouterError(
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
        throw createRouterError(
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
        timeoutMs: this._verificationTimeoutMs,
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
    }, this._authoritativeIdleShutdownMs);
  }
}
