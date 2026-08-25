#!/usr/bin/env node
"use strict";

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const RAW = path.join(ROOT, "src", "5efdcc3e6fb071cbaffdcb117507a169dd76.js");

function arg(name, fallback = null) {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

const kind = arg("kind", "math-profile");
const profile = arg("profile", "half");
const throwAt = Number(arg("throw-at", "0"));
const recover = process.argv.includes("--recover");
const extraCalls = Number(arg("extra-calls", "0"));

const originalRandom = Math.random;
const originalFunction = globalThis.Function;
const originalFunctionCtor = originalFunction.prototype.constructor;
const cryptoObject = globalThis.crypto;
const originalCryptoDescriptor = cryptoObject
  ? Object.getOwnPropertyDescriptor(cryptoObject, "getRandomValues")
  : null;
const originalGetRandomValues = typeof cryptoObject?.getRandomValues === "function"
  ? cryptoObject.getRandomValues.bind(cryptoObject)
  : null;

let mathRandomCalls = 0;
let cryptoCalls = 0;
let alternating = false;
let seededState = 0x19f17a5d >>> 0;

function mathValue() {
  if (profile === "zero") return 0;
  if (profile === "tiny") return Number.MIN_VALUE;
  if (profile === "quarter") return 0.25;
  if (profile === "half") return 0.5;
  if (profile === "three-quarter") return 0.75;
  if (profile === "almost-one") return 0.9999999999999999;
  if (profile === "alternating") {
    alternating = !alternating;
    return alternating ? 0 : 0.9999999999999999;
  }
  if (profile === "seeded") {
    seededState ^= seededState << 13; seededState >>>= 0;
    seededState ^= seededState >>> 17; seededState >>>= 0;
    seededState ^= seededState << 5; seededState >>>= 0;
    return seededState / 0x100000000;
  }
  return originalRandom();
}

function fillCrypto(array) {
  if (profile === "zero") array.fill(0);
  else if (profile === "one") array.fill(1);
  else if (profile === "increment") {
    for (let i = 0; i < array.length; i += 1) array[i] = (cryptoCalls + i) & 0xff;
  } else if (originalGetRandomValues) return originalGetRandomValues(array);
  else array.fill(0x5a);
  return array;
}

Math.random = () => {
  mathRandomCalls += 1;
  if (kind === "math-fault" && throwAt > 0 && mathRandomCalls === throwAt) {
    const error = new Error(`UPDATE15_MATH_RANDOM_THROW_${throwAt}`);
    error.name = "Update15MathRandomFault";
    throw error;
  }
  return mathValue();
};

for (let i = 0; i < extraCalls; i += 1) Math.random();

if ((kind === "crypto-profile" || kind === "crypto-fault") && cryptoObject) {
  Object.defineProperty(cryptoObject, "getRandomValues", {
    configurable: true,
    writable: true,
    value(array) {
      cryptoCalls += 1;
      if (kind === "crypto-fault" && throwAt > 0 && cryptoCalls === throwAt) {
        const error = new Error(`UPDATE15_CRYPTO_THROW_${throwAt}`);
        error.name = "Update15CryptoFault";
        throw error;
      }
      return fillCrypto(array);
    },
  });
}

async function importRaw(label) {
  const raw = await import(`${pathToFileURL(RAW).href}?update15-${label}-${process.pid}-${Date.now()}-${Math.random()}`);
  return { outcome: "result", foundationDayNumber: String(raw.dayNumber(raw.FOUNDATION_JDN)) };
}

let first;
const startedAt = Date.now();
try {
  first = await importRaw("first");
} catch (error) {
  first = {
    outcome: "exception",
    exception: { name: error?.name ?? "Error", message: String(error?.message ?? error) },
  };
}

const functionRestoredAfterFirst = globalThis.Function === originalFunction
  && originalFunction.prototype.constructor === originalFunctionCtor;

Math.random = originalRandom;
if (cryptoObject) {
  if (originalCryptoDescriptor) Object.defineProperty(cryptoObject, "getRandomValues", originalCryptoDescriptor);
  else delete cryptoObject.getRandomValues;
}

let recovery = null;
if (recover) {
  try {
    recovery = await importRaw("recovery");
  } catch (error) {
    recovery = {
      outcome: "exception",
      exception: { name: error?.name ?? "Error", message: String(error?.message ?? error) },
    };
  }
}

process.stdout.write(JSON.stringify({
  kind,
  profile,
  throwAt,
  recover,
  extraCalls,
  supportedCrypto: Boolean(cryptoObject && originalGetRandomValues),
  mathRandomCalls,
  cryptoCalls,
  durationMs: Date.now() - startedAt,
  first,
  functionRestoredAfterFirst,
  recovery,
  functionRestoredAfterRecovery: globalThis.Function === originalFunction
    && originalFunction.prototype.constructor === originalFunctionCtor,
}) + "\n");
