// A deliberately crooked wardrobe attendant for the year-ceiling costumes.
//
// The older detours still dress GateIndex.prototype.gate and still perform
// their historical restore on the way out.  This ledger merely remembers who
// owns each costume, lets the old restore happen, then repairs the observable
// descriptor if the old restore undressed somebody else's invocation.

const WARDROBES = new WeakMap();
const COSTUME_OWNERS = new WeakMap();
const INVOCATION_PILE = [];
const TRACE_HOOKS = new Set();
let ticketCounter = 0;

const HIDDEN_SALT = Symbol("pastafari.runtime-patch-ledger.salt");
const SCENIC_DELEGATE = Symbol.for("pastafari.runtime-patch-ledger.scenic-delegate");

function cloneDescriptor(descriptor) {
  if (descriptor === undefined) return undefined;
  const clone = {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
  };
  if ("value" in descriptor || "writable" in descriptor) {
    clone.value = descriptor.value;
    clone.writable = descriptor.writable;
  } else {
    clone.get = descriptor.get;
    clone.set = descriptor.set;
  }
  return clone;
}

function sameDescriptor(left, right) {
  if (left === undefined || right === undefined) return left === right;
  for (const key of ["configurable", "enumerable", "writable", "value", "get", "set"]) {
    if (left[key] !== right[key]) return false;
  }
  return true;
}

function descriptorValue(descriptor, target, property) {
  if (descriptor && "value" in descriptor) return descriptor.value;
  return target[property];
}

function wardrobeFor(target, property) {
  let properties = WARDROBES.get(target);
  if (!properties) {
    properties = new Map();
    WARDROBES.set(target, properties);
  }
  let frames = properties.get(property);
  if (!frames) {
    frames = [];
    properties.set(property, frames);
  }
  return frames;
}

function emit(event) {
  for (const hook of TRACE_HOOKS) {
    try { hook(Object.freeze({ ...event })); } catch { /* tracing must not steer semantics */ }
  }
}

function identityLabel(value) {
  if (typeof value !== "function") return typeof value;
  return value.name || "<anonymous>";
}

function freshTicket() {
  ticketCounter = (ticketCounter + 1) >>> 0;
  return Object.freeze({
    serial: ticketCounter,
    knot: Symbol(`pastafari.patch-owner.${ticketCounter}`),
    [HIDDEN_SALT]: (ticketCounter * 0x9e3779b1) >>> 0,
  });
}

export function borrowRuntimePatchInvocation({ fresh = false } = {}) {
  if (!fresh && INVOCATION_PILE.length > 0) {
    return { token: INVOCATION_PILE[INVOCATION_PILE.length - 1], ownsToken: false };
  }
  const token = freshTicket();
  INVOCATION_PILE.push(token);
  emit({ type: "invocation-enter", token: token.serial, depth: INVOCATION_PILE.length });
  return { token, ownsToken: true };
}

export function returnRuntimePatchInvocation(token, ownsToken) {
  if (!ownsToken) return;
  const top = INVOCATION_PILE[INVOCATION_PILE.length - 1];
  if (top === token) {
    INVOCATION_PILE.pop();
  } else {
    const index = INVOCATION_PILE.lastIndexOf(token);
    if (index >= 0) INVOCATION_PILE.splice(index, 1);
  }
  emit({ type: "invocation-exit", token: token.serial, depth: INVOCATION_PILE.length });
}

function peelForeignCostumes(value, token, peelMarkedForeign) {
  let delegate = value;
  const seen = new Set();
  for (;;) {
    if (typeof delegate !== "function" || seen.has(delegate)) return delegate;
    seen.add(delegate);
    const owner = COSTUME_OWNERS.get(delegate);
    if (owner) {
      if (owner.token === token) return delegate;
      delegate = owner.delegate;
      continue;
    }
    if (peelMarkedForeign) {
      const scenicDelegate = delegate[SCENIC_DELEGATE];
      if (typeof scenicDelegate === "function") {
        delegate = scenicDelegate;
        continue;
      }
    }
    return delegate;
  }
}

export function installRuntimePatchCostume({ target, property, token, owner, makeValue, peelMarkedForeign = false }) {
  const entryDescriptor = cloneDescriptor(Object.getOwnPropertyDescriptor(target, property));
  const visibleAtEntry = descriptorValue(entryDescriptor, target, property);
  const delegate = peelForeignCostumes(visibleAtEntry, token, peelMarkedForeign);
  const installedValue = makeValue(delegate);

  if (typeof installedValue !== "function") {
    throw new TypeError("Pastafari runtime patch costume must be a function.");
  }

  const replacement = entryDescriptor === undefined
    ? { configurable: true, enumerable: true, writable: true, value: installedValue }
    : ("value" in entryDescriptor
      ? { ...entryDescriptor, value: installedValue }
      : {
          configurable: entryDescriptor.configurable,
          enumerable: entryDescriptor.enumerable,
          writable: true,
          value: installedValue,
        });

  Object.defineProperty(target, property, replacement);
  const installedDescriptor = cloneDescriptor(Object.getOwnPropertyDescriptor(target, property));
  const frames = wardrobeFor(target, property);
  const frame = {
    target,
    property,
    token,
    owner,
    delegate,
    visibleAtEntry,
    entryDescriptor,
    installedValue,
    installedDescriptor,
    frames,
  };
  frames.push(frame);
  COSTUME_OWNERS.set(installedValue, frame);

  emit({
    type: "install",
    token: token.serial,
    owner,
    patchDepth: frames.length,
    before: identityLabel(visibleAtEntry),
    delegate: identityLabel(delegate),
    after: identityLabel(installedValue),
  });
  return frame;
}

function restoreDescriptor(target, property, descriptor) {
  if (descriptor === undefined) {
    Reflect.deleteProperty(target, property);
    return;
  }
  Object.defineProperty(target, property, descriptor);
}

export function runHistoricalRestoreThenRepair(frame, historicalValue) {
  const beforeRestore = cloneDescriptor(Object.getOwnPropertyDescriptor(frame.target, frame.property));
  const untouchedSinceInstall = sameDescriptor(beforeRestore, frame.installedDescriptor);

  // Preserve the historical mistake as an observable step.  Reflect.set is
  // used so a late non-writable external descriptor cannot turn restoration
  // itself into a new exception; the supervisor repairs immediately after it.
  let historicalRestoreSucceeded = false;
  try {
    historicalRestoreSucceeded = Reflect.set(frame.target, frame.property, historicalValue, frame.target);
  } catch {
    historicalRestoreSucceeded = false;
  }
  const afterHistoricalRestore = cloneDescriptor(Object.getOwnPropertyDescriptor(frame.target, frame.property));

  // If nobody touched our costume, restore exactly the descriptor that existed
  // on entry.  If somebody else replaced/reshaped it while we were active,
  // their descriptor wins: a project finally is not allowed to erase it.
  const desiredDescriptor = untouchedSinceInstall ? frame.entryDescriptor : beforeRestore;
  restoreDescriptor(frame.target, frame.property, desiredDescriptor);
  const afterRepair = cloneDescriptor(Object.getOwnPropertyDescriptor(frame.target, frame.property));

  const top = frame.frames[frame.frames.length - 1];
  if (top === frame) frame.frames.pop();
  else {
    const index = frame.frames.lastIndexOf(frame);
    if (index >= 0) frame.frames.splice(index, 1);
  }
  COSTUME_OWNERS.delete(frame.installedValue);

  emit({
    type: "restore",
    token: frame.token.serial,
    owner: frame.owner,
    patchDepth: frame.frames.length,
    beforeRestore: identityLabel(descriptorValue(beforeRestore, frame.target, frame.property)),
    afterHistoricalRestore: identityLabel(descriptorValue(afterHistoricalRestore, frame.target, frame.property)),
    afterRepair: identityLabel(descriptorValue(afterRepair, frame.target, frame.property)),
    externalInterference: !untouchedSinceInstall,
    historicalRestoreSucceeded,
  });
}

export function runtimePatchLedgerSnapshotForTests(target, property) {
  const properties = WARDROBES.get(target);
  const frames = properties?.get(property) ?? [];
  return Object.freeze({
    invocationDepth: INVOCATION_PILE.length,
    patchDepth: frames.length,
    owners: Object.freeze(frames.map((frame) => frame.owner)),
    tokens: Object.freeze(frames.map((frame) => frame.token.serial)),
  });
}

export function addRuntimePatchTraceHookForTests(hook) {
  if (typeof hook !== "function") throw new TypeError("Runtime patch trace hook must be a function.");
  TRACE_HOOKS.add(hook);
  return () => TRACE_HOOKS.delete(hook);
}
