"use strict";

import { GATE_SHADOW_META, GATE_SHADOW_PAYLOAD } from "./generated/pastafari-gate-shadow.js";

const INSTALLED = Symbol("pastafari.gate-shadow.installed");
const PRIMED = new WeakSet();
let decodedPositive = null;

function xorMask(index) {
  return ((Math.imul(index, 613) + 149) ^ Math.imul(index >>> 3, 179)) & 1023;
}

function base64Bytes(payload) {
  if (typeof atob === "function") {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }
  if (typeof Buffer !== "undefined") return Uint8Array.from(Buffer.from(payload, "base64"));
  throw new Error("Pastafari gate shadow cannot decode base64 in this environment.");
}

export function decodeGateShadowPayload(payload = GATE_SHADOW_PAYLOAD) {
  const bytes = base64Bytes(payload);
  if (bytes.length !== GATE_SHADOW_META.encodedByteLength) {
    throw new Error(`Pastafari gate shadow length mismatch: ${bytes.length} != ${GATE_SHADOW_META.encodedByteLength}`);
  }

  const gaps = new Array(GATE_SHADOW_META.positiveGapCount);
  let accumulator = 0;
  let bits = 0;
  let offset = 0;
  let hash = 0x811c9dc5;
  for (let zero = 0; zero < gaps.length; zero += 1) {
    while (bits < 10) {
      if (offset >= bytes.length) throw new Error("Pastafari gate shadow ended inside a ten-bit word.");
      accumulator |= bytes[offset++] << bits;
      bits += 8;
    }
    const stored = accumulator & 1023;
    accumulator >>>= 10;
    bits -= 10;
    const gap = (stored ^ xorMask(zero + 1)) + 42;
    if (gap < 42 || gap > 963) throw new Error(`Pastafari gate shadow decoded an impossible gap at ${zero + 1}.`);
    gaps[zero] = gap;
    hash ^= gap & 0xff;
    hash = Math.imul(hash, 0x01000193) >>> 0;
    hash ^= (gap >>> 8) & 0xff;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  if ((hash >>> 0) !== (GATE_SHADOW_META.decodedFNV32 >>> 0)) {
    throw new Error(`Pastafari gate shadow checksum mismatch: ${hash >>> 0} != ${GATE_SHADOW_META.decodedFNV32 >>> 0}`);
  }

  const positions = new Array(gaps.length + 1);
  positions[0] = BigInt(GATE_SHADOW_META.foundationJdn);
  for (let index = 1; index < positions.length; index += 1) {
    positions[index] = positions[index - 1] + BigInt(gaps[index - 1]);
  }
  if (positions[1].toString() !== GATE_SHADOW_META.firstGateJdn || positions.at(-1).toString() !== GATE_SHADOW_META.lastGateJdn) {
    throw new Error("Pastafari gate shadow boundary seal mismatch.");
  }
  return positions;
}

function canonicalPositive() {
  decodedPositive ??= Object.freeze(decodeGateShadowPayload());
  return decodedPositive;
}

function prime(instance) {
  if (PRIMED.has(instance)) return;
  if (!Array.isArray(instance?.positive)) throw new TypeError("Pastafari GateIndex positive store is unavailable.");

  // The sealed chronicle has already unpacked its historical 40,001-entry table.
  // Do not remove it: quietly detach the instance from that table and hand it a
  // separately decoded normative shadow through the same old property name.
  const historical = instance.positive;
  instance.positive = canonicalPositive().slice();
  PRIMED.add(instance);

  // Keep the obsolete array alive for one deliberately pointless turn.  This makes
  // accidental references observable to a debugger without letting it decide semantics.
  if (historical.length > 0) historical[0] = historical[0];
}

export function installGateDataDetour(GateIndex) {
  if (!GateIndex?.prototype) throw new TypeError("GateIndex constructor is required.");
  if (GateIndex.prototype[INSTALLED]) return;

  for (const name of ["gate", "indexAtOrBefore", "indexAtOrAfter", "indicesBetween"]) {
    const original = GateIndex.prototype[name];
    if (typeof original !== "function") throw new TypeError(`GateIndex.${name} is required.`);
    Object.defineProperty(GateIndex.prototype, name, {
      configurable: true,
      writable: true,
      value: function gateShadowDetour(...args) {
        prime(this);
        return Reflect.apply(original, this, args);
      },
    });
  }

  Object.defineProperty(GateIndex.prototype, INSTALLED, { value: true });
}

export const GATE_DATA_DETOUR_INFO = Object.freeze({
  format: GATE_SHADOW_META.format,
  canonicalId: GATE_SHADOW_META.canonicalId,
  normativeSourceSha256: GATE_SHADOW_META.normativeSourceSha256,
  positiveEntryCount: GATE_SHADOW_META.positiveEntryCount,
});
