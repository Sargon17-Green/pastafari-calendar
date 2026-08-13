"use strict";

import {
  DEFAULT_ENGINE_REQUEST_TIMEOUT_MS,
  DEFAULT_ENGINE_STARTUP_TIMEOUT_MS,
  PastafariEngineClient,
} from "../browser/pastafari-engine-client.js";
import {
  DEFAULT_AUTHORITATIVE_IDLE_SHUTDOWN_MS,
  DEFAULT_VERIFICATION_TIMEOUT_MS,
  PastafariCalendarRouterCore,
} from "../browser/pastafari-calendar-router-core.js";

/* These two compile-time constants are supplied by build-standalone.mjs. */
const AUTHORITATIVE_WORKER_SOURCE = __PASTAFARI_AUTHORITATIVE_WORKER_SOURCE__;
const FAST_WORKER_SOURCE = __PASTAFARI_FAST_WORKER_SOURCE__;

function createBlobWorker(source, name) {
  if (
    typeof globalThis.Worker !== "function"
    || typeof globalThis.Blob !== "function"
    || typeof globalThis.URL?.createObjectURL !== "function"
  ) {
    throw new DOMException(
      "The standalone build requires classic Web Workers and Blob URLs.",
      "NotSupportedError",
    );
  }

  const objectUrl = globalThis.URL.createObjectURL(new Blob([source], {
    type: "text/javascript;charset=utf-8",
  }));
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    globalThis.URL.revokeObjectURL(objectUrl);
  };

  try {
    return {
      worker: new globalThis.Worker(objectUrl, {
        name: `pastafari-${name}-standalone`,
      }),
      release,
    };
  } catch (error) {
    release();
    throw error;
  }
}

function standaloneEngineClient(name, source, options = {}) {
  return new PastafariEngineClient(name, {
    startupTimeoutMs: options.startupTimeoutMs,
    requestTimeoutMs: options.requestTimeoutMs,
    workerFactory: () => createBlobWorker(source, name),
  });
}

export class PastafariCalendarRouter extends PastafariCalendarRouterCore {
  constructor(options = {}) {
    super({
      authoritativeClient: standaloneEngineClient(
        "authoritative",
        AUTHORITATIVE_WORKER_SOURCE,
        {
          startupTimeoutMs: options.authoritativeStartupTimeoutMs
            ?? DEFAULT_ENGINE_STARTUP_TIMEOUT_MS,
          requestTimeoutMs: options.authoritativeRequestTimeoutMs
            ?? DEFAULT_ENGINE_REQUEST_TIMEOUT_MS,
        },
      ),
      fastClient: standaloneEngineClient("fast", FAST_WORKER_SOURCE, {
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
