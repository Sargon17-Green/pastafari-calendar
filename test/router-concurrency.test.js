"use strict";

import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";

const requestLog = [];
let nextWorkerId = 1;

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

function engineDelay(engine, operation) {
  if (engine === "authoritative" && operation === "convert") return 25;
  if (engine === "authoritative" && operation === "convertJdnRange") return 35;
  if (engine === "fast" && operation === "getCutletView") return 15;
  return 8;
}

async function executeEngineRequest(engine, operation, payload) {
  await sleep(engineDelay(engine, operation));

  switch (operation) {
    case "convert":
      return calendarValue(payload.targetJdn, payload.calculationJdn);

    case "convertJdnRange":
      return Array.from({ length: payload.count }, (_, index) => (
        calendarValue(payload.startJdn + BigInt(index), payload.calculationJdn)
      ));

    case "getCutletView":
      return cutletView(payload.targetJdn, payload.calculationJdn);

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
    requestLog.push({
      workerId: this.id,
      engine: this.engine,
      operation,
      payload,
    });

    executeEngineRequest(this.engine, operation, payload).then(
      (result) => {
        if (!this.terminated) this.#emit("message", {
          data: { id, ok: true, result },
        });
      },
      (error) => {
        if (!this.terminated) this.#emit("message", {
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
      },
    );
  }

  terminate() {
    this.terminated = true;
    this.listeners.clear();
  }

  #emit(type, event) {
    for (const listener of this.listeners.get(type) ?? []) listener(event);
  }
}

globalThis.Worker = FakeWorker;

const routerModule = await import(
  `../browser/pastafari-calendar-router.js?router-concurrency-test=${Date.now()}`
);
const { PastafariCalendarRouter, sharedPastafariRouter } = routerModule;

beforeEach(() => {
  requestLog.length = 0;
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

test("requests arriving during verification keep their own target day", async (t) => {
  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const calculationJdn = 700n;
  const anchorJdn = 100n;
  const anchor = await router.convert(anchorJdn, calculationJdn);

  assert.deepEqual(anchor, calendarValue(anchorJdn, calculationJdn));
  assert.equal(router.getStatus(calculationJdn).status, "verifying");

  const [second, third] = await Promise.all([
    router.convert(101n, calculationJdn),
    router.convert(107n, calculationJdn),
  ]);

  assert.deepEqual(second, calendarValue(101n, calculationJdn));
  assert.deepEqual(third, calendarValue(107n, calculationJdn));
  assert.notDeepEqual(second, anchor);
  assert.notDeepEqual(third, anchor);

  await waitForStatus(router, calculationJdn, "verified");

  const fastTargets = requestLog
    .filter((item) => item.engine === "fast" && item.operation === "convert")
    .map((item) => item.payload.targetJdn);

  assert.ok(fastTargets.includes(101n), "The second target was not converted after verification.");
  assert.ok(fastTargets.includes(107n), "The third target was not converted after verification.");
});

test("verification state is isolated for every calculation day", async (t) => {
  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const firstCalculation = 800n;
  const secondCalculation = 801n;
  const targetJdn = 120n;

  const [first, second] = await Promise.all([
    router.convert(targetJdn, firstCalculation),
    router.convert(targetJdn, secondCalculation),
  ]);

  assert.deepEqual(first, calendarValue(targetJdn, firstCalculation));
  assert.deepEqual(second, calendarValue(targetJdn, secondCalculation));
  assert.notDeepEqual(first, second);

  await Promise.all([
    waitForStatus(router, firstCalculation, "verified"),
    waitForStatus(router, secondCalculation, "verified"),
  ]);

  const status = router.getStatus();
  const calculations = new Map(
    status.calculations.map((item) => [item.calculationJdn, item.status]),
  );

  assert.equal(calculations.get(firstCalculation), "verified");
  assert.equal(calculations.get(secondCalculation), "verified");

  const verifiedAnchors = requestLog
    .filter((item) => item.engine === "fast" && item.operation === "convert")
    .map((item) => `${item.payload.calculationJdn}:${item.payload.targetJdn}`);

  assert.ok(verifiedAnchors.includes(`${firstCalculation}:${targetJdn}`));
  assert.ok(verifiedAnchors.includes(`${secondCalculation}:${targetJdn}`));
});

test("identical concurrent authoritative conversions share one request", async (t) => {
  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const calculationJdn = 900n;
  const targetJdn = 200n;

  const [first, second, third] = await Promise.all([
    router.convert(targetJdn, calculationJdn),
    router.convert(targetJdn, calculationJdn),
    router.convert(targetJdn, calculationJdn),
  ]);

  const expected = calendarValue(targetJdn, calculationJdn);
  assert.deepEqual(first, expected);
  assert.deepEqual(second, expected);
  assert.deepEqual(third, expected);

  const initialRequests = requestLog.filter((item) => (
    item.engine === "authoritative"
    && item.operation === "convert"
    && item.payload.targetJdn === targetJdn
    && item.payload.calculationJdn === calculationJdn
  ));

  assert.equal(initialRequests.length, 1);
});

test("a cutlet request made during verification returns the requested cutlet", async (t) => {
  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const calculationJdn = 1_000n;
  const anchorJdn = 300n;
  const requestedJdn = 349n;

  await router.convert(anchorJdn, calculationJdn);
  assert.equal(router.getStatus(calculationJdn).status, "verifying");

  const [view, converted] = await Promise.all([
    router.getCutletView(requestedJdn, calculationJdn),
    router.convert(requestedJdn + 1n, calculationJdn),
  ]);

  const expectedView = cutletView(requestedJdn, calculationJdn);
  assert.equal(view.startJdn, expectedView.startJdn);
  assert.equal(view.endJdn, expectedView.endJdn);
  assert.deepEqual(view.days, expectedView.days);
  assert.ok(requestedJdn >= view.startJdn && requestedJdn <= view.endJdn);
  assert.deepEqual(converted, calendarValue(requestedJdn + 1n, calculationJdn));
});

test("many consumers sharing one router do not leak results between calls", async (t) => {
  const router = new PastafariCalendarRouter();
  t.after(() => router.dispose());

  const requests = [
    [410n, 1_100n],
    [411n, 1_100n],
    [412n, 1_101n],
    [499n, 1_101n],
    [-40n, 1_102n],
    [-39n, 1_102n],
  ];

  const results = await Promise.all(
    requests.map(([targetJdn, calculationJdn]) => router.convert(targetJdn, calculationJdn)),
  );

  for (let index = 0; index < requests.length; index += 1) {
    const [targetJdn, calculationJdn] = requests[index];
    assert.deepEqual(results[index], calendarValue(targetJdn, calculationJdn));
  }
});
