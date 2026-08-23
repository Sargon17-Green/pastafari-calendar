#!/usr/bin/env node
"use strict";

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const RAW = path.join(ROOT, "src", "5efdcc3e6fb071cbaffdcb117507a169dd76.js");
const mode = process.argv.find((x) => x.startsWith("--mode="))?.slice(7) ?? "zero";
const throwAt = Number(process.argv.find((x) => x.startsWith("--throw-at="))?.slice(11) ?? 0);
const recover = process.argv.includes("--recover");

const cryptoObject = globalThis.crypto;
if (!cryptoObject || typeof cryptoObject.getRandomValues !== "function") {
  process.stdout.write(JSON.stringify({ mode, throwAt, supported: false }) + "\n");
  process.exit(0);
}

const originalRandom = Math.random;
const originalGetRandomValues = cryptoObject.getRandomValues.bind(cryptoObject);
const originalDescriptor = Object.getOwnPropertyDescriptor(cryptoObject, "getRandomValues");
const OriginalFunction = globalThis.Function;
const originalFunctionCtor = OriginalFunction.prototype.constructor;
let cryptoCalls = 0;
let mathRandomCalls = 0;

function fill(array) {
  if (mode === "zero") array.fill(0);
  else if (mode === "one") array.fill(1);
  else if (mode === "increment") {
    for (let i = 0; i < array.length; i += 1) array[i] = (cryptoCalls + i) >>> 0;
  } else if (mode === "native") return originalGetRandomValues(array);
  else throw new Error(`unknown crypto profile ${mode}`);
  return array;
}

Math.random = () => { mathRandomCalls += 1; return 0.5; };
Object.defineProperty(cryptoObject, "getRandomValues", {
  configurable: true,
  writable: true,
  value(array) {
    cryptoCalls += 1;
    if (throwAt > 0 && cryptoCalls === throwAt) {
      const error = new Error(`UPDATE15_CRYPTO_THROW_${throwAt}`);
      error.name = "Update15CryptoFault";
      throw error;
    }
    return fill(array);
  },
});

let first;
const started = Date.now();
try {
  const raw = await import(`${pathToFileURL(RAW).href}?update15-crypto=${mode}-${throwAt}-${Date.now()}`);
  first = { outcome: "result", foundationDayNumber: String(raw.dayNumber(raw.FOUNDATION_JDN)) };
} catch (error) {
  first = { outcome: "exception", exception: { name: error?.name ?? "Error", message: String(error?.message ?? error) } };
}
const functionRestoredAfterFirst = globalThis.Function === OriginalFunction
  && OriginalFunction.prototype.constructor === originalFunctionCtor;

if (originalDescriptor) Object.defineProperty(cryptoObject, "getRandomValues", originalDescriptor);
else delete cryptoObject.getRandomValues;
Math.random = originalRandom;

let recovery = null;
if (recover) {
  try {
    const raw = await import(`${pathToFileURL(RAW).href}?update15-crypto-recovery=${mode}-${throwAt}-${Date.now()}`);
    recovery = { outcome: "result", foundationDayNumber: String(raw.dayNumber(raw.FOUNDATION_JDN)) };
  } catch (error) {
    recovery = { outcome: "exception", exception: { name: error?.name ?? "Error", message: String(error?.message ?? error) } };
  }
}

process.stdout.write(JSON.stringify({
  mode,
  throwAt,
  supported: true,
  cryptoCalls,
  mathRandomCalls,
  durationMs: Date.now() - started,
  first,
  functionRestoredAfterFirst,
  recovery,
  functionRestoredAfterRecovery: globalThis.Function === OriginalFunction
    && OriginalFunction.prototype.constructor === originalFunctionCtor,
}) + "\n");
