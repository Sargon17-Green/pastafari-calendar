"use strict";

import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate as delayImmediate } from "node:timers/promises";

import { PastafariCalendarRouterCore } from "../browser/pastafari-calendar-router-core.js";

function canonicalValue(targetJdn, calculationJdn) {
  return {
    year: `${calculationJdn}:${targetJdn}`,
    cutletName: `cutlet-${calculationJdn}`,
    dayInCutlet: 1,
    monthName: `month-${targetJdn}`,
    dayInMonth: Number(((targetJdn % 29n) + 29n) % 29n) + 1,
  };
}

function cutletView(targetJdn, calculationJdn) {
  return {
    startJdn: targetJdn,
    endJdn: targetJdn,
    previousCutletJdn: targetJdn - 1n,
    nextCutletJdn: targetJdn + 1n,
    days: [{ jdn: targetJdn, ...canonicalValue(targetJdn, calculationJdn) }],
  };
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

class FakeClient {
  constructor(name, hooks = {}) {
    this.name = name;
    this.hooks = hooks;
    this.requests = [];
    this.terminateCount = 0;
  }

  async request(operation, payload) {
    this.requests.push({ operation, payload });
    if (this.hooks.request) {
      const handled = await this.hooks.request(operation, payload);
      if (handled?.handled) return handled.value;
    }
    if (operation === "convert") {
      return canonicalValue(payload.targetJdn, payload.calculationJdn);
    }
    if (operation === "getCutletView") {
      return cutletView(payload.targetJdn, payload.calculationJdn);
    }
    if (operation === "convertJdnRange") {
      return Array.from({ length: payload.count }, (_, index) => {
        const targetJdn = payload.startJdn + BigInt(index);
        return canonicalValue(targetJdn, payload.calculationJdn);
      });
    }
    throw new Error(`Unexpected operation ${operation}`);
  }

  terminate() {
    this.terminateCount += 1;
  }
}

function createRouter({ authoritativeHooks, fastHooks, limit = 64 } = {}) {
  const authoritative = new FakeClient("authoritative", authoritativeHooks);
  const fast = new FakeClient("fast", fastHooks);
  const router = new PastafariCalendarRouterCore({
    authoritativeClient: authoritative,
    fastClient: fast,
    verificationTimeoutMs: 5_000,
    authoritativeIdleShutdownMs: 60_000,
  });
  // Deliberately private: production exposes no new cache-size API.
  router._maxCachedStates = limit;
  return { router, authoritative, fast };
}

async function convertAndVerify(router, targetJdn, calculationJdn) {
  const value = await router.convert(targetJdn, calculationJdn);
  const state = router._states.get(calculationJdn.toString());
  if (state?.verification) await state.verification;
  return value;
}

function stateKeys(router) {
  return [...router._states.keys()];
}

function publicStateKeys(router) {
  return router.getStatus().calculations.map((state) => state.calculationJdn.toString());
}

test("router cache is bounded and uses least-recently-used idle eviction", async (t) => {
  const { router } = createRouter({ limit: 2 });
  t.after(() => router.dispose());

  await convertAndVerify(router, 10n, 100n);
  await convertAndVerify(router, 20n, 200n);
  assert.deepEqual(stateKeys(router), ["100", "200"]);

  await router.convert(11n, 100n); // Refresh A without changing public state ordering.
  await convertAndVerify(router, 30n, 300n);

  assert.equal(router._states.size, 2);
  assert.ok(router._states.has("100"), "recently used state A should remain cached");
  assert.ok(!router._states.has("200"), "least-recently-used idle state B should be evicted");
  assert.ok(router._states.has("300"), "new state C should remain cached");
  assert.deepEqual(stateKeys(router), ["100", "300"]);
  assert.deepEqual(
    publicStateKeys(router),
    ["100", "300"],
    "public status ordering remains Map insertion order, not LRU order",
  );
});

test("eviction followed by recreation preserves exact conversion output", async (t) => {
  const { router } = createRouter({ limit: 2 });
  t.after(() => router.dispose());

  const before = await convertAndVerify(router, 55n, 1_001n);
  const originalState = router._states.get("1001");
  await convertAndVerify(router, 56n, 1_002n);
  await convertAndVerify(router, 57n, 1_003n);
  assert.ok(!router._states.has("1001"));

  const after = await convertAndVerify(router, 55n, 1_001n);
  assert.deepEqual(after, before);
  assert.notEqual(router._states.get("1001"), originalState);
});

test("active states are never evicted even when the temporary live set exceeds the limit", async (t) => {
  const waits = new Map();
  const { router } = createRouter({
    limit: 2,
    authoritativeHooks: {
      async request(operation, payload) {
        if (operation !== "convert") return null;
        const gate = deferred();
        waits.set(payload.calculationJdn.toString(), { gate, payload });
        return { handled: true, value: await gate.promise };
      },
    },
  });
  t.after(() => router.dispose());

  // Force the existing authoritative-only path without changing its semantics.
  router._fastDisabledError = new Error("test-only fast disable");
  const requests = [
    router.convert(1n, 101n),
    router.convert(2n, 102n),
    router.convert(3n, 103n),
  ];
  await delayImmediate();

  assert.equal(router._states.size, 3, "active states may temporarily exceed the idle cache limit");
  assert.equal(router._states.get("101").activeRequests, 1);
  assert.equal(router._states.get("102").activeRequests, 1);
  assert.equal(router._states.get("103").activeRequests, 1);

  const third = waits.get("103");
  third.gate.resolve(canonicalValue(third.payload.targetJdn, third.payload.calculationJdn));
  await requests[2];
  assert.deepEqual(stateKeys(router), ["101", "102"], "only the now-idle C state may be evicted");

  for (const key of ["101", "102"]) {
    const item = waits.get(key);
    item.gate.resolve(canonicalValue(item.payload.targetJdn, item.payload.calculationJdn));
  }
  await Promise.all(requests.slice(0, 2));
  assert.equal(router._states.size, 2);
});

test("a state with verification in flight is protected from eviction", async (t) => {
  const verificationGate = deferred();
  const { router } = createRouter({
    limit: 1,
    fastHooks: {
      async request(operation, payload) {
        if (operation === "convert" && payload.calculationJdn === 701n) {
          await verificationGate.promise;
          return { handled: false };
        }
        return null;
      },
    },
  });
  t.after(() => router.dispose());

  await router.convert(70n, 701n);
  assert.equal(router.getStatus(701n).status, "verifying");

  await router.convert(80n, 801n);
  await delayImmediate();
  await delayImmediate();

  assert.ok(router._states.has("701"), "verifying A must remain cached");
  assert.ok(!router._states.has("801"), "idle B is evicted instead when the cache must shrink");

  verificationGate.resolve();
  await router._states.get("701").verification;
  assert.equal(router.getStatus(701n).status, "verified");
  assert.equal(router._states.size, 1);
});

test("concurrent same-key requests share one authoritative bootstrap request", async (t) => {
  const gate = deferred();
  let bootstrapRequests = 0;
  const { router, authoritative } = createRouter({
    limit: 2,
    authoritativeHooks: {
      async request(operation, payload) {
        if (operation === "convert" && payload.calculationJdn === 900n) {
          bootstrapRequests += 1;
          await gate.promise;
          return { handled: false };
        }
        return null;
      },
    },
  });
  t.after(() => router.dispose());

  const pending = Array.from({ length: 12 }, () => router.convert(90n, 900n));
  await delayImmediate();
  assert.equal(bootstrapRequests, 1);
  gate.resolve();

  const results = await Promise.all(pending);
  for (const result of results) assert.deepEqual(result, canonicalValue(90n, 900n));
  const state = router._states.get("900");
  if (state?.verification) await state.verification;
  assert.equal(router._states.size, 1);
  assert.equal(
    authoritative.requests.filter((item) => item.operation === "convert" && item.payload.calculationJdn === 900n).length,
    1,
  );
});

test("concurrent different-key requests settle back to the configured cache bound", async (t) => {
  const { router } = createRouter({ limit: 4 });
  t.after(() => router.dispose());

  const pending = Array.from({ length: 40 }, (_, index) => (
    router.convert(1_000n + BigInt(index), 2_000n + BigInt(index))
  ));
  await Promise.all(pending);

  const verifications = [...router._states.values()]
    .map((state) => state.verification)
    .filter(Boolean);
  await Promise.all(verifications);
  await delayImmediate();

  assert.ok(router._states.size <= 4, `expected <= 4 cached states, got ${router._states.size}`);
  for (const state of router._states.values()) {
    assert.equal(state.activeRequests, 0);
    assert.notEqual(state.status, "verifying");
  }
});

test("failed verification remains cached and authoritative-only while its state is retained", async (t) => {
  let failedFastRequests = 0;
  const { router } = createRouter({
    limit: 2,
    fastHooks: {
      async request(operation, payload) {
        if (operation === "convert" && payload.calculationJdn === 3_000n) {
          failedFastRequests += 1;
          const error = new Error("failed intentionally");
          error.code = "ERR_TEST_FAST_FAILURE";
          throw error;
        }
        return null;
      },
    },
  });
  t.after(() => router.dispose());

  await router.convert(300n, 3_000n);
  await router._states.get("3000").verification;
  assert.equal(router.getStatus(3_000n).status, "authoritative-only");
  assert.match(router.getStatus(3_000n).error, /failed intentionally/);

  const before = failedFastRequests;
  const result = await router.convert(301n, 3_000n);
  assert.deepEqual(result, canonicalValue(301n, 3_000n));
  assert.equal(failedFastRequests, before, "failure caching remains effective while the state is retained");
});

test("failed states are retained preferentially without defeating the hard idle bound", async (t) => {
  const failing = new Set([3_100n, 3_300n, 3_400n]);
  const { router } = createRouter({
    limit: 2,
    fastHooks: {
      async request(operation, payload) {
        if (operation === "convert" && failing.has(payload.calculationJdn)) {
          const error = new Error(`failure for ${payload.calculationJdn}`);
          error.code = "ERR_TEST_FAST_FAILURE";
          throw error;
        }
        return null;
      },
    },
  });
  t.after(() => router.dispose());

  await convertAndVerify(router, 310n, 3_100n); // failed A
  await convertAndVerify(router, 320n, 3_200n); // verified B
  await convertAndVerify(router, 330n, 3_300n); // failed C; B should be the preferred victim

  assert.ok(router._states.has("3100"), "older failed A is retained ahead of an ordinary verified state");
  assert.ok(!router._states.has("3200"), "ordinary verified B is evicted before cached failure A");
  assert.ok(router._states.has("3300"));
  assert.equal(router._states.size, 2);

  await convertAndVerify(router, 340n, 3_400n); // failed D; failures alone now exceed the bound
  assert.equal(router._states.size, 2);
  assert.ok(!router._states.has("3100"), "oldest idle failure is evicted when failures alone exceed the bound");
  assert.ok(router._states.has("3300"));
  assert.ok(router._states.has("3400"));
});

test("retry removes cache bookkeeping and recreates a clean state", async (t) => {
  const { router } = createRouter({ limit: 2 });
  t.after(() => router.dispose());

  await convertAndVerify(router, 401n, 4_001n);
  await convertAndVerify(router, 402n, 4_002n);
  const oldState = router._states.get("4001");

  await router.retry(4_001n);
  assert.ok(!router._states.has("4001"));
  assert.ok(!router._stateRecency.has("4001"));

  const value = await convertAndVerify(router, 401n, 4_001n);
  assert.deepEqual(value, canonicalValue(401n, 4_001n));
  assert.notEqual(router._states.get("4001"), oldState);
  assert.equal(router._stateRecency.size, router._states.size);
});

test("dispose clears states and LRU bookkeeping and remains safe when called twice", async () => {
  const { router } = createRouter({ limit: 2 });
  await convertAndVerify(router, 501n, 5_001n);
  await convertAndVerify(router, 502n, 5_002n);

  router.dispose();
  assert.equal(router._states.size, 0);
  assert.equal(router._stateRecency.size, 0);
  assert.doesNotThrow(() => router.dispose());
  assert.equal(router._states.size, 0);
  assert.equal(router._stateRecency.size, 0);
});

test("600-case bounded-vs-unbounded differential keeps canonical results identical", async (t) => {
  const bounded = createRouter({ limit: 8 }).router;
  const unbounded = createRouter({ limit: Number.POSITIVE_INFINITY }).router;
  t.after(() => bounded.dispose());
  t.after(() => unbounded.dispose());

  const cases = [];
  const anchor = 2_460_000n;
  const offsets = [-50_000n, -5_000n, -1n, 0n, 1n, 5_000n, 50_000n];
  for (let index = 0; index < 600; index += 1) {
    const calculationJdn = anchor + BigInt((index * 37) % 97) - 48n;
    const offset = offsets[index % offsets.length] + BigInt((index % 11) - 5);
    cases.push({ calculationJdn, targetJdn: calculationJdn + offset });
  }

  for (let index = 0; index < cases.length; index += 1) {
    const { targetJdn, calculationJdn } = cases[index];
    const [boundedValue, unboundedValue] = await Promise.all([
      bounded.convert(targetJdn, calculationJdn),
      unbounded.convert(targetJdn, calculationJdn),
    ]);
    assert.deepEqual(boundedValue, unboundedValue, `conversion mismatch at case ${index}`);

    const boundedState = bounded._states.get(calculationJdn.toString());
    const unboundedState = unbounded._states.get(calculationJdn.toString());
    if (boundedState?.verification) await boundedState.verification;
    if (unboundedState?.verification) await unboundedState.verification;

    if (index % 25 === 0) {
      const [boundedView, unboundedView] = await Promise.all([
        bounded.getCutletView(targetJdn, calculationJdn),
        unbounded.getCutletView(targetJdn, calculationJdn),
      ]);
      assert.deepEqual(boundedView, unboundedView, `cutlet view mismatch at case ${index}`);
    }
  }

  assert.ok(bounded._states.size <= 8);
  assert.equal(unbounded._states.size, 97);
});
