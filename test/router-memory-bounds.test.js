"use strict";

import assert from "node:assert/strict";
import test from "node:test";

import { PastafariCalendarRouterCore } from "../browser/pastafari-calendar-router-core.js";

function value(targetJdn, calculationJdn) {
  return {
    year: String(calculationJdn),
    cutletName: "bounded",
    dayInCutlet: 1,
    monthName: String(targetJdn),
    dayInMonth: 1,
  };
}

function view(targetJdn, calculationJdn) {
  return {
    startJdn: targetJdn,
    endJdn: targetJdn,
    previousCutletJdn: targetJdn - 1n,
    nextCutletJdn: targetJdn + 1n,
    days: [{ jdn: targetJdn, ...value(targetJdn, calculationJdn) }],
  };
}

function fakeClient() {
  return {
    async request(operation, payload) {
      if (operation === "convert") return value(payload.targetJdn, payload.calculationJdn);
      if (operation === "getCutletView") return view(payload.targetJdn, payload.calculationJdn);
      if (operation === "convertJdnRange") {
        return Array.from({ length: payload.count }, (_, index) => {
          const jdn = payload.startJdn + BigInt(index);
          return value(jdn, payload.calculationJdn);
        });
      }
      throw new Error(`Unexpected operation ${operation}`);
    },
    terminate() {},
  };
}

test("5,000 distinct calculation days do not create an unbounded idle router cache", async (t) => {
  const router = new PastafariCalendarRouterCore({
    authoritativeClient: fakeClient(),
    fastClient: fakeClient(),
    verificationTimeoutMs: 5_000,
    authoritativeIdleShutdownMs: 60_000,
  });
  t.after(() => router.dispose());

  for (let index = 0; index < 5_000; index += 1) {
    const calculationJdn = 2_400_000n + BigInt(index);
    await router.convert(2_450_000n + BigInt(index % 11), calculationJdn);
    const state = router._states.get(calculationJdn.toString());
    if (state?.verification) await state.verification;
  }

  assert.equal(router._states.size, 64);
  assert.equal(router._stateRecency.size, 64);
  assert.ok([...router._states.values()].every((state) => state.activeRequests === 0));
  assert.ok([...router._states.values()].every((state) => state.status !== "verifying"));
});
