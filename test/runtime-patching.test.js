import assert from "node:assert/strict";
import test from "node:test";

import { installYearCeilingDetour } from "../browser/year-ceiling-detour.js";
import { installYearCeilingDetourDetour } from "../browser/year-ceiling-detour-detour.js";
import { installYearCeilingDetourDetourDetour } from "../browser/year-ceiling-detour-detour-detour.js";
import {
  addRuntimePatchTraceHookForTests,
  runtimePatchLedgerSnapshotForTests,
} from "../browser/runtime-patch-ledger.js";

function installAll(Calendar, Gate) {
  installYearCeilingDetourDetour(Calendar, Gate);
  installYearCeilingDetourDetourDetour(Calendar, Gate);
  installYearCeilingDetour(Calendar, Gate);
}

function descriptorShape(descriptor) {
  return {
    value: descriptor?.value,
    writable: descriptor?.writable,
    enumerable: descriptor?.enumerable,
    configurable: descriptor?.configurable,
    get: descriptor?.get,
    set: descriptor?.set,
  };
}

function makeSemanticHarness() {
  class Gate {
    gate(index) {
      const positions = new Map([
        [12, 10_001n],
        [11, 10_000n],
        [10, 10_001n],
        [17, 15_779n],
      ]);
      return positions.get(index) ?? BigInt(index);
    }
  }

  const baselineGate = Gate.prototype.gate;

  class Calendar {
    constructor() {
      this.gates = new Gate();
      this.yearCache = new Map();
      this.nestedTarget = this;
      this.throwAt = null;
      this.installExternalAt = null;
      this.externalValue = null;
      this.onAfterInner = null;
    }

    convertJdn(_target, options = {}) {
      const depth = options.depth ?? 1;
      const values = [];
      values.push(this.gates.gate(12));
      if (this.throwAt === "after-install") throw new Error("after-install");
      values.push(this.gates.gate(11));
      values.push(this.gates.gate(10));
      values.push(this.gates.gate(11));
      if (this.throwAt === "mid-patched") throw new Error("mid-patched");

      if (depth > 1) {
        try {
          this.nestedTarget.convertJdn(0n, { ...options, depth: depth - 1 });
        } catch (error) {
          if (!options.catchInner) throw error;
        }
        this.onAfterInner?.();
        if (this.throwAt === "after-inner") throw new Error("after-inner");
      }

      if (this.installExternalAt === "before-last") {
        Object.defineProperty(Gate.prototype, "gate", this.externalValue);
      }

      values.push(this.gates.gate(17));
      if (this.throwAt === "before-return") throw new Error("before-return");
      return values;
    }
  }

  installAll(Calendar, Gate);
  return { Gate, Calendar, baselineGate };
}

function assertLedgerClean(Gate) {
  assert.deepEqual(runtimePatchLedgerSnapshotForTests(Gate.prototype, "gate"), {
    invocationDepth: 0,
    patchDepth: 0,
    owners: [],
    tokens: [],
  });
}

for (const depth of [1, 2, 3, 5, 10]) {
  test(`runtime patch stack is semantically stable at nesting depth ${depth}`, () => {
    const { Gate, Calendar, baselineGate } = makeSemanticHarness();
    const calendar = new Calendar();
    const before = descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate"));
    const result = calendar.convertJdn(0n, { calculationJdn: 1n, depth });
    assert.deepEqual(result, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
    const after = descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate"));
    assert.deepEqual(after, before);
    assert.equal(after.value, baselineGate);
    assertLedgerClean(Gate);
  });
}

test("nested calls on two instances do not leak the outer wrapper state into the inner call", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  const outer = new Calendar();
  const inner = new Calendar();
  outer.nestedTarget = inner;
  const result = outer.convertJdn(0n, { calculationJdn: 1n, depth: 5 });
  assert.deepEqual(result, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
  assert.equal(Gate.prototype.gate, baselineGate);
  assertLedgerClean(Gate);
});

test("late external patch is invoked and survives normal restoration with its descriptor", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  let calls = 0;
  function userPatch(...args) {
    calls += 1;
    return Reflect.apply(baselineGate, this, args);
  }
  const externalDescriptor = {
    configurable: true,
    enumerable: true,
    writable: false,
    value: userPatch,
  };
  Object.defineProperty(Gate.prototype, "gate", externalDescriptor);
  const calendar = new Calendar();
  const result = calendar.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  assert.deepEqual(result, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
  assert.ok(calls >= 5, "late patch must be in the value-producing chain");
  assert.deepEqual(descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate")), descriptorShape(externalDescriptor));
  assertLedgerClean(Gate);
});

test("a non-LIFO external replacement installed during a project call is not erased", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  let calls = 0;
  function externalX(...args) {
    calls += 1;
    return Reflect.apply(baselineGate, this, args);
  }
  const externalDescriptor = {
    configurable: true,
    enumerable: true,
    writable: true,
    value: externalX,
  };
  const calendar = new Calendar();
  calendar.installExternalAt = "before-last";
  calendar.externalValue = externalDescriptor;
  calendar.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  assert.equal(Gate.prototype.gate, externalX);
  assert.deepEqual(descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate")), descriptorShape(externalDescriptor));
  assert.equal(calls, 1, "the last lookup should run through the external writer");
  assertLedgerClean(Gate);
});

for (const throwAt of ["after-install", "mid-patched", "after-inner", "before-return"]) {
  test(`descriptor and ownership state restore after ${throwAt} exception`, () => {
    const { Gate, Calendar, baselineGate } = makeSemanticHarness();
    const calendar = new Calendar();
    calendar.throwAt = throwAt;
    const before = descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate"));
    assert.throws(
      () => calendar.convertJdn(0n, { calculationJdn: 1n, depth: throwAt === "after-inner" ? 2 : 1 }),
      new RegExp(throwAt),
    );
    assert.deepEqual(descriptorShape(Object.getOwnPropertyDescriptor(Gate.prototype, "gate")), before);
    assert.equal(Gate.prototype.gate, baselineGate);
    assertLedgerClean(Gate);
  });
}

test("inner exception can be caught by outer call and outer continues with its own patch state", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  const outer = new Calendar();
  const inner = new Calendar();
  inner.throwAt = "mid-patched";
  outer.nestedTarget = inner;
  const result = outer.convertJdn(0n, { calculationJdn: 1n, depth: 2, catchInner: true });
  assert.deepEqual(result, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
  assert.equal(Gate.prototype.gate, baselineGate);
  assertLedgerClean(Gate);
});

test("inner exception followed by outer exception still restores the entry descriptor", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  const outer = new Calendar();
  const inner = new Calendar();
  inner.throwAt = "mid-patched";
  outer.nestedTarget = inner;
  outer.throwAt = "after-inner";
  assert.throws(() => outer.convertJdn(0n, { calculationJdn: 1n, depth: 2, catchInner: true }), /after-inner/);
  assert.equal(Gate.prototype.gate, baselineGate);
  assertLedgerClean(Gate);
});

test("throwing user patch survives the project finally", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  function throwingUserPatch() { throw new Error("user-patch-fault"); }
  Object.defineProperty(Gate.prototype, "gate", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: throwingUserPatch,
  });
  const calendar = new Calendar();
  assert.throws(() => calendar.convertJdn(0n, { calculationJdn: 1n, depth: 1 }), /user-patch-fault/);
  assert.equal(Gate.prototype.gate, throwingUserPatch);
  assertLedgerClean(Gate);
  Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: false, writable: true, value: baselineGate });
});

test("patch trace proves LIFO repair resurrects the outer costume after inner historical restore", () => {
  const { Gate, Calendar } = makeSemanticHarness();
  const trace = [];
  const remove = addRuntimePatchTraceHookForTests((event) => trace.push(event));
  try {
    new Calendar().convertJdn(0n, { calculationJdn: 1n, depth: 2 });
  } finally {
    remove();
  }
  const innerEntry = trace.find((event) => event.type === "invocation-enter" && event.depth === 2);
  assert.ok(innerEntry);
  const innerOuterRestore = trace.find((event) =>
    event.type === "restore"
    && event.token === innerEntry.token
    && event.owner === "year-ceiling-detour");
  assert.ok(innerOuterRestore);
  assert.equal(innerOuterRestore.afterHistoricalRestore, "gate");
  assert.equal(innerOuterRestore.afterRepair, "gateSeenThroughTheSecondDetour");
  assert.equal(innerOuterRestore.externalInterference, false);
  assertLedgerClean(Gate);
});

test("200 deterministic mixed calls leave no patch drift", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  let state = 0x6a09e667;
  const next = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return state >>> 0;
  };
  const stats = { calls: 0, nestedCalls: 0, throws: 0, restorationMismatches: 0, finalValueMismatches: 0 };
  const expected = [10_001n, 10_000n, 10_001n, 10_000n, 15_782n];

  for (let index = 0; index < 200; index += 1) {
    const calendar = new Calendar();
    const depth = 1 + (next() % 5);
    stats.calls += 1;
    stats.nestedCalls += depth - 1;
    const shouldThrow = (next() % 9) === 0;
    if (shouldThrow) calendar.throwAt = depth > 1 ? "after-inner" : "before-return";
    try {
      const result = calendar.convertJdn(0n, { calculationJdn: 1n, depth });
      if (shouldThrow) stats.finalValueMismatches += 1;
      else if (!result.every((value, i) => value === expected[i])) stats.finalValueMismatches += 1;
    } catch {
      stats.throws += 1;
      if (!shouldThrow) stats.finalValueMismatches += 1;
    }
    const snapshot = runtimePatchLedgerSnapshotForTests(Gate.prototype, "gate");
    if (Gate.prototype.gate !== baselineGate || snapshot.patchDepth !== 0 || snapshot.invocationDepth !== 0) {
      stats.restorationMismatches += 1;
    }
  }

  assert.deepEqual(stats, {
    calls: 200,
    nestedCalls: stats.nestedCalls,
    throws: stats.throws,
    restorationMismatches: 0,
    finalValueMismatches: 0,
  });
  assert.ok(stats.nestedCalls > 200);
  assert.ok(stats.throws > 0);
});

test("A-B-A history and two-instance interleaving do not change semantic output", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  const a = new Calendar();
  const b = new Calendar();
  const expected = [10_001n, 10_000n, 10_001n, 10_000n, 15_782n];
  const a1 = a.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  const b1 = b.convertJdn(0n, { calculationJdn: 2n, depth: 3 });
  const a2 = a.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  assert.deepEqual(a1, expected);
  assert.deepEqual(b1, expected);
  assert.deepEqual(a2, a1);

  const firstOrder = [
    a.convertJdn(0n, { calculationJdn: 1n, depth: 2 }),
    b.convertJdn(0n, { calculationJdn: 2n, depth: 2 }),
    a.convertJdn(0n, { calculationJdn: 1n, depth: 2 }),
    b.convertJdn(0n, { calculationJdn: 2n, depth: 2 }),
  ];
  const secondOrder = [
    a.convertJdn(0n, { calculationJdn: 1n, depth: 2 }),
    a.convertJdn(0n, { calculationJdn: 1n, depth: 2 }),
    b.convertJdn(0n, { calculationJdn: 2n, depth: 2 }),
    b.convertJdn(0n, { calculationJdn: 2n, depth: 2 }),
  ];
  for (const result of [...firstOrder, ...secondOrder]) assert.deepEqual(result, expected);
  assert.equal(Gate.prototype.gate, baselineGate);
  assertLedgerClean(Gate);
});

test("external X followed by external Y is never resurrected back to X", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  function externalX(...args) { return Reflect.apply(baselineGate, this, args); }
  function externalY(...args) { return Reflect.apply(baselineGate, this, args); }
  Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: false, writable: true, value: externalX });
  new Calendar().convertJdn(0n, { calculationJdn: 1n, depth: 2 });
  assert.equal(Gate.prototype.gate, externalX);
  Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: true, writable: true, value: externalY });
  new Calendar().convertJdn(0n, { calculationJdn: 1n, depth: 2 });
  assert.equal(Gate.prototype.gate, externalY);
  const descriptor = Object.getOwnPropertyDescriptor(Gate.prototype, "gate");
  assert.equal(descriptor.enumerable, true);
  assertLedgerClean(Gate);
});

test("late user patch may recurse into the public API without losing itself", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  const calendar = new Calendar();
  let recursed = false;
  let calls = 0;
  function recursivePatch(...args) {
    calls += 1;
    if (!recursed) {
      recursed = true;
      const inner = calendar.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
      assert.deepEqual(inner, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
    }
    return Reflect.apply(baselineGate, this, args);
  }
  Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: false, writable: true, value: recursivePatch });
  const outer = calendar.convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  assert.deepEqual(outer, [10_001n, 10_000n, 10_001n, 10_000n, 15_782n]);
  assert.ok(calls >= 10);
  assert.equal(Gate.prototype.gate, recursivePatch);
  assertLedgerClean(Gate);
});

test("a user patch may install another late patch and the newer patch survives", () => {
  const { Gate, Calendar, baselineGate } = makeSemanticHarness();
  function newerPatch(...args) { return Reflect.apply(baselineGate, this, args); }
  let installed = false;
  function installingPatch(...args) {
    if (!installed) {
      installed = true;
      Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: true, writable: true, value: newerPatch });
    }
    return Reflect.apply(baselineGate, this, args);
  }
  Object.defineProperty(Gate.prototype, "gate", { configurable: true, enumerable: false, writable: true, value: installingPatch });
  new Calendar().convertJdn(0n, { calculationJdn: 1n, depth: 1 });
  assert.equal(Gate.prototype.gate, newerPatch);
  assert.equal(Object.getOwnPropertyDescriptor(Gate.prototype, "gate").enumerable, true);
  assertLedgerClean(Gate);
});
