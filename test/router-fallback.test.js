"use strict";

import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, copyFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function floorMod(value, modulus) {
  const remainder = value % modulus;
  return remainder < 0n ? remainder + modulus : remainder;
}

function cutletStartFor(targetJdn) {
  return targetJdn - floorMod(targetJdn, 3n);
}

function calendarValue(targetJdn, calculationJdn) {
  const startJdn = cutletStartFor(targetJdn);
  return Object.freeze({
    year: `${calculationJdn}:${startJdn / 30n}`,
    cutletName: `cutlet-${calculationJdn}-${startJdn}`,
    dayInCutlet: Number(targetJdn - startJdn + 1n),
    monthName: `month-${calculationJdn}-${floorMod(targetJdn, 2n)}`,
    dayInMonth: Number(floorMod(targetJdn, 29n) + 1n),
  });
}

function cutletView(targetJdn, calculationJdn) {
  const startJdn = cutletStartFor(targetJdn);
  const endJdn = startJdn + 2n;
  return {
    startJdn,
    endJdn,
    previousCutletJdn: startJdn - 1n,
    nextCutletJdn: endJdn + 1n,
    days: [0n, 1n, 2n].map((offset) => ({
      jdn: startJdn + offset,
      ...calendarValue(startJdn + offset, calculationJdn),
    })),
  };
}

function newScenario() {
  return {
    requests: [],
    terminatedWorkers: [],
    authoritative: {
      failOperations: new Set(),
      hangOperations: new Set(),
    },
    fast: {
      failOperations: new Set(),
      hangOperations: new Set(),
      mismatch: false,
      invalidView: false,
    },
  };
}

let scenario = newScenario();
let nextWorkerId = 1;

function engineResult(engine, operation, payload) {
  const rules = scenario[engine];

  if (rules.failOperations.has(operation)) {
    throw Object.assign(new Error(`${engine}:${operation} failed intentionally.`), {
      code: `ERR_TEST_${engine.toUpperCase()}_${operation.toUpperCase()}`,
    });
  }

  switch (operation) {
    case "convert": {
      const result = { ...calendarValue(payload.targetJdn, payload.calculationJdn) };
      if (engine === "fast" && rules.mismatch) result.monthName += "-mismatch";
      return result;
    }

    case "convertJdnRange":
      return Array.from({ length: payload.count }, (_, index) => (
        calendarValue(payload.startJdn + BigInt(index), payload.calculationJdn)
      ));

    case "getCutletView": {
      const view = cutletView(payload.targetJdn, payload.calculationJdn);
      if (engine === "fast" && rules.invalidView) {
        view.days[1] = { ...view.days[1], jdn: view.days[1].jdn + 10n };
      }
      return view;
    }

    default:
      throw Object.assign(new Error(`Unsupported fake operation: ${operation}`), {
        code: "ERR_TEST_OPERATION",
      });
  }
}

class FakeWorker {
  constructor(url) {
    this.id = nextWorkerId++;
    this.url = String(url);
    this.engine = this.url.includes("authoritative") ? "authoritative" : "fast";
    this.listeners = new Map();
    this.terminated = false;
    this.testScenario = scenario;

    queueMicrotask(() => {
      if (!this.terminated) this.#emit("message", { data: { kind: "ready" } });
    });
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  postMessage(message) {
    if (this.terminated) {
      throw Object.assign(new Error("Worker has been terminated."), {
        name: "InvalidStateError",
      });
    }

    const { id, operation, payload } = message;
    scenario.requests.push({
      workerId: this.id,
      engine: this.engine,
      operation,
      payload,
    });

    if (scenario[this.engine].hangOperations.has(operation)) return;

    setTimeout(() => {
      if (this.terminated) return;
      try {
        const result = engineResult(this.engine, operation, payload);
        this.#emit("message", { data: { id, ok: true, result } });
      } catch (error) {
        this.#emit("message", {
          data: {
            id,
            ok: false,
            error: {
              name: error.name,
              message: error.message,
              code: error.code,
              stack: error.stack,
            },
          },
        });
      }
    }, 5);
  }

  terminate() {
    if (!this.terminated) this.testScenario.terminatedWorkers.push(this.id);
    this.terminated = true;
    this.listeners.clear();
  }

  #emit(type, event) {
    for (const listener of this.listeners.get(type) ?? []) listener(event);
  }
}

globalThis.Worker = FakeWorker;

const routerModule = await import(
  `../browser/pastafari-calendar-router.js?router-fallback-test=${Date.now()}`
);
const { PastafariCalendarRouter, sharedPastafariRouter } = routerModule;

beforeEach(() => {
  scenario = newScenario();
});

after(() => {
  sharedPastafariRouter.dispose();
  delete globalThis.Worker;
});

async function waitForStatus(router, calculationJdn, wantedStatus, timeoutMs = 2_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const status = router.getStatus(calculationJdn).status;
    if (status === wantedStatus) return;
    await sleep(5);
  }

  assert.fail(
    `Router did not reach status ${wantedStatus}; current status is ${router.getStatus(calculationJdn).status}.`,
  );
}

function requestsFor(engine, operation, calculationJdn = undefined) {
  return scenario.requests.filter((item) => (
    item.engine === engine
    && item.operation === operation
    && (calculationJdn === undefined || item.payload.calculationJdn === calculationJdn)
  ));
}

test("a fast-engine request failure leaves the calculation day on the authoritative engine", {
  concurrency: false,
}, async (t) => {
  scenario.fast.failOperations.add("convert");

  const router = new PastafariCalendarRouter({ fastRequestTimeoutMs: 40 });
  t.after(() => router.dispose());

  const calculationJdn = 2_000n;
  const first = await router.convert(500n, calculationJdn);
  assert.deepEqual(first, calendarValue(500n, calculationJdn));

  await waitForStatus(router, calculationJdn, "authoritative-only");
  assert.match(router.getStatus(calculationJdn).error, /failed intentionally/);

  const second = await router.convert(501n, calculationJdn);
  assert.deepEqual(second, calendarValue(501n, calculationJdn));
  assert.equal(requestsFor("authoritative", "convert", calculationJdn).length, 2);
  assert.equal(requestsFor("fast", "convert", calculationJdn).length, 1);
});

test("a verified fast-engine timeout falls back to the authoritative result", {
  concurrency: false,
}, async (t) => {
  const router = new PastafariCalendarRouter({ fastRequestTimeoutMs: 30 });
  t.after(() => router.dispose());

  const calculationJdn = 2_100n;
  await router.convert(600n, calculationJdn);
  await waitForStatus(router, calculationJdn, "verified");

  scenario.fast.hangOperations.add("convert");
  const result = await router.convert(604n, calculationJdn);

  assert.deepEqual(result, calendarValue(604n, calculationJdn));
  assert.equal(router.getStatus(calculationJdn).status, "authoritative-only");
  assert.match(router.getStatus(calculationJdn).error, /did not finish within 30 ms/);
  assert.equal(requestsFor("fast", "convert", calculationJdn).length, 2);
  assert.equal(requestsFor("authoritative", "convert", calculationJdn).length, 2);

  const timedOutFastRequest = requestsFor("fast", "convert", calculationJdn).at(-1);
  assert.ok(scenario.terminatedWorkers.includes(timedOutFastRequest.workerId));

  scenario.fast.hangOperations.delete("convert");
  await router.retry(calculationJdn);
  await router.convert(605n, calculationJdn);
  await waitForStatus(router, calculationJdn, "verified");

  const restartedFastRequest = requestsFor("fast", "convert", calculationJdn).at(-1);
  assert.notEqual(restartedFastRequest.workerId, timedOutFastRequest.workerId);
});

test("an authoritative timeout terminates its worker and the next request starts a fresh one", {
  concurrency: false,
}, async (t) => {
  const router = new PastafariCalendarRouter({ authoritativeRequestTimeoutMs: 30 });
  t.after(() => router.dispose());

  const calculationJdn = 2_150n;
  scenario.authoritative.hangOperations.add("convert");
  await assert.rejects(
    router.convert(620n, calculationJdn),
    (error) => error.code === "ERR_ENGINE_TIMEOUT",
  );

  const timedOutRequest = requestsFor("authoritative", "convert", calculationJdn).at(-1);
  assert.ok(scenario.terminatedWorkers.includes(timedOutRequest.workerId));

  scenario.authoritative.hangOperations.delete("convert");
  const result = await router.convert(621n, calculationJdn);
  assert.deepEqual(result, calendarValue(621n, calculationJdn));
  const restartedRequest = requestsFor("authoritative", "convert", calculationJdn).at(-1);
  assert.notEqual(restartedRequest.workerId, timedOutRequest.workerId);
});

test("a mismatch disables the fast engine globally and later calculation days stay authoritative", {
  concurrency: false,
}, async (t) => {
  scenario.fast.mismatch = true;

  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const firstCalculation = 2_200n;
  const secondCalculation = 2_201n;

  const first = await router.convert(700n, firstCalculation);
  assert.deepEqual(first, calendarValue(700n, firstCalculation));
  await waitForStatus(router, firstCalculation, "authoritative-only");

  const status = router.getStatus(firstCalculation);
  assert.equal(status.fastDisabled, true);
  assert.match(status.error, /mismatch/i);

  const fastRequestsBeforeSecondCalculation = scenario.requests.filter(
    (item) => item.engine === "fast",
  ).length;

  const second = await router.convert(701n, secondCalculation);
  assert.deepEqual(second, calendarValue(701n, secondCalculation));
  assert.equal(router.getStatus(secondCalculation).status, "unverified");
  assert.equal(
    scenario.requests.filter((item) => item.engine === "fast").length,
    fastRequestsBeforeSecondCalculation,
  );
});

test("an invalid fast cutlet view disables the fast engine", {
  concurrency: false,
}, async (t) => {
  scenario.fast.invalidView = true;

  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const calculationJdn = 2_300n;
  const result = await router.convert(800n, calculationJdn);
  assert.deepEqual(result, calendarValue(800n, calculationJdn));

  await waitForStatus(router, calculationJdn, "authoritative-only");
  const status = router.getStatus(calculationJdn);
  assert.equal(status.fastDisabled, true);
  assert.match(status.error, /non-contiguous cutlet days/);
});

test("an authoritative conversion failure is propagated and does not start fast verification", {
  concurrency: false,
}, async (t) => {
  scenario.authoritative.failOperations.add("convert");

  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const calculationJdn = 2_400n;
  await assert.rejects(
    router.convert(900n, calculationJdn),
    (error) => error.code === "ERR_TEST_AUTHORITATIVE_CONVERT",
  );

  assert.equal(router.getStatus(calculationJdn).status, "unverified");
  assert.equal(requestsFor("fast", "convert", calculationJdn).length, 0);
});

const INLINE_ENGINE_MODULE = String.raw`
function floorMod(value, modulus) {
  const remainder = value % modulus;
  return remainder < 0n ? remainder + modulus : remainder;
}
function cutletStartFor(targetJdn) {
  return targetJdn - floorMod(targetJdn, 3n);
}
function value(targetJdn, calculationJdn) {
  const startJdn = cutletStartFor(targetJdn);
  return {
    year: String(calculationJdn) + ":" + String(startJdn / 30n),
    cutletName: "cutlet-" + String(calculationJdn) + "-" + String(startJdn),
    dayInCutlet: Number(targetJdn - startJdn + 1n),
    monthName: "month-" + String(calculationJdn) + "-" + String(floorMod(targetJdn, 2n)),
    dayInMonth: Number(floorMod(targetJdn, 29n) + 1n),
  };
}
function view(targetJdn, calculationJdn) {
  const startJdn = cutletStartFor(targetJdn);
  const endJdn = startJdn + 2n;
  return {
    startJdn,
    endJdn,
    previousCutletJdn: startJdn - 1n,
    nextCutletJdn: endJdn + 1n,
    days: [0n, 1n, 2n].map((offset) => ({
      jdn: startJdn + offset,
      ...value(startJdn + offset, calculationJdn),
    })),
  };
}
export async function handlePastafariWorkerRequest(operation, payload) {
  switch (operation) {
    case "convert": return value(payload.targetJdn, payload.calculationJdn);
    case "convertJdnRange": return Array.from({ length: payload.count }, (_, index) => (
      value(payload.startJdn + BigInt(index), payload.calculationJdn)
    ));
    case "getCutletView": return view(payload.targetJdn, payload.calculationJdn);
    default: throw new Error("Unsupported inline operation: " + operation);
  }
}
`;

async function createInlineProject({ includeFast = true } = {}) {
  const root = await mkdtemp(join(tmpdir(), "pastafari-router-fallback-"));
  const browser = join(root, "browser");
  await mkdir(browser, { recursive: true });
  await writeFile(join(root, "package.json"), '{"type":"module"}\n', "utf8");

  const sourceRouter = fileURLToPath(new URL(
    "../browser/pastafari-calendar-router.js",
    import.meta.url,
  ));
  await copyFile(sourceRouter, join(browser, "pastafari-calendar-router.js"));
  await writeFile(
    join(browser, "pastafari-authoritative-worker.js"),
    INLINE_ENGINE_MODULE,
    "utf8",
  );
  if (includeFast) {
    await writeFile(
      join(browser, "pastafari-fast-worker.js"),
      INLINE_ENGINE_MODULE,
      "utf8",
    );
  }

  return { root, browser };
}

test("the router works through inline modules when Worker is unavailable", {
  concurrency: false,
}, async (t) => {
  const project = await createInlineProject();
  t.after(() => rm(project.root, { recursive: true, force: true }));

  const savedWorker = globalThis.Worker;
  delete globalThis.Worker;
  t.after(() => {
    globalThis.Worker = savedWorker;
  });

  const moduleUrl = pathToFileURL(join(project.browser, "pastafari-calendar-router.js"));
  moduleUrl.searchParams.set("inline-fallback-test", String(Date.now()));
  const module = await import(moduleUrl.href);
  const router = new module.PastafariCalendarRouter();
  t.after(() => {
    router.dispose();
    module.sharedPastafariRouter.dispose();
  });

  const calculationJdn = 2_500n;
  const result = await router.convert(1_000n, calculationJdn);
  assert.deepEqual(result, calendarValue(1_000n, calculationJdn));
  await waitForStatus(router, calculationJdn, "verified");

  const view = await router.getCutletView(1_001n, calculationJdn);
  assert.deepEqual(view, cutletView(1_001n, calculationJdn));
});

test("a missing fast module leaves the inline router usable in authoritative-only mode", {
  concurrency: false,
}, async (t) => {
  const project = await createInlineProject({ includeFast: false });
  t.after(() => rm(project.root, { recursive: true, force: true }));

  const savedWorker = globalThis.Worker;
  delete globalThis.Worker;
  t.after(() => {
    globalThis.Worker = savedWorker;
  });

  const moduleUrl = pathToFileURL(join(project.browser, "pastafari-calendar-router.js"));
  moduleUrl.searchParams.set("missing-fast-test", String(Date.now()));
  const module = await import(moduleUrl.href);
  const router = new module.PastafariCalendarRouter({ fastStartupTimeoutMs: 100 });
  t.after(() => {
    router.dispose();
    module.sharedPastafariRouter.dispose();
  });

  const calculationJdn = 2_600n;
  const first = await router.convert(1_100n, calculationJdn);
  assert.deepEqual(first, calendarValue(1_100n, calculationJdn));
  await waitForStatus(router, calculationJdn, "authoritative-only");

  const second = await router.convert(1_101n, calculationJdn);
  assert.deepEqual(second, calendarValue(1_101n, calculationJdn));
  assert.match(router.getStatus(calculationJdn).error, /Cannot find module|module/i);
});
