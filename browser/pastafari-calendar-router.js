"use strict";

import {
  DEFAULT_ENGINE_REQUEST_TIMEOUT_MS,
  DEFAULT_ENGINE_STARTUP_TIMEOUT_MS,
  PastafariEngineClient,
} from "./pastafari-engine-client.js";
import {
  DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS,
  DEFAULT_VERIFICATION_TIMEOUT_MS,
  PastafariCalendarRouterCore,
} from "./pastafari-calendar-router-core.js";

const AUTHORITATIVE_WORKER_URL = new URL("./pastafari-authoritative-worker.js", import.meta.url);
const FAST_WORKER_URL = new URL("./pastafari-fast-worker.js", import.meta.url);

function standardEngineClient(name, moduleUrl, options = {}) {
  return new PastafariEngineClient(name, {
    startupTimeoutMs: options.startupTimeoutMs,
    requestTimeoutMs: options.requestTimeoutMs,
    workerFactory: typeof globalThis.Worker === "function"
      ? () => new globalThis.Worker(moduleUrl, {
        type: "module",
        name: `pastafari-${name}`,
      })
      : null,
    inlineLoader: async () => {
      const module = await import(moduleUrl.href);
      return module.handlePastafariWorkerRequest;
    },
  });
}

/**
 * Router for the normal HTTP/HTTPS ES-module distribution. The transport is
 * kept here; the authoritative-first and verification rules live in the
 * shared transport-independent core used by the standalone build as well.
 */
export class PastafariCalendarRouter extends PastafariCalendarRouterCore {
  constructor(options = {}) {
    super({
      authoritativeClient: standardEngineClient("authoritative", AUTHORITATIVE_WORKER_URL, {
        startupTimeoutMs: options.authoritativeStartupTimeoutMs
          ?? DEFAULT_ENGINE_STARTUP_TIMEOUT_MS,
        requestTimeoutMs: options.authoritativeRequestTimeoutMs
          ?? DEFAULT_ENGINE_REQUEST_TIMEOUT_MS,
      }),
      fastClient: standardEngineClient("fast", FAST_WORKER_URL, {
        startupTimeoutMs: options.fastStartupTimeoutMs
          ?? DEFAULT_ENGINE_STARTUP_TIMEOUT_MS,
        requestTimeoutMs: options.fastRequestTimeoutMs
          ?? DEFAULT_ENGINE_REQUEST_TIMEOUT_MS,
      }),
      verificationTimeoutMs: options.verificationTimeoutMs
        ?? DEFAULT_VERIFICATION_TIMEOUT_MS,
      authoritativeIdleShutdownMs: options.authoritativeIdleShutdownMs
        ?? DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS,
    });
  }
}

export const sharedPastafariRouter = new PastafariCalendarRouter();
