"use strict";

// Update 13 semantic firewall.
//
// Do not "clean this up" into the sealed chronicle.  The legacy host-backed
// converter is intentionally left alive behind this door.  Normative Chinese
// traffic gets a hidden stamp, is diverted through a Proxy-backed shadow desk,
// and can never consume the host receipt.  Non-normative/legacy traffic keeps
// taking the old route exactly as before.
import {
  chineseRelatedDateToJdn,
  chineseStructuredDateToJdn,
} from "../src/chinese-calendrica-detour.js";

const HOST_TAINT = Symbol.for("pastafari.update13.host-intl-taint");
const TABLETS_SEAL = Symbol.for("pastafari.update13.tablets-semantic-seal");

function isInstance(value, Constructor) {
  return typeof Constructor === "function" && value instanceof Constructor;
}

function isChineseShape(value, ChineseDate) {
  if (!value || typeof value !== "object") return false;
  if (isInstance(value, ChineseDate)) return true;
  if (value.calendar !== "chinese") return false;
  return value.relatedYear !== undefined
    || (value.cycle !== undefined && value.yearInCycle !== undefined);
}

function deterministicChineseJdn(value) {
  if (value?.cycle !== undefined && value?.yearInCycle !== undefined) {
    return chineseStructuredDateToJdn(value);
  }
  return chineseRelatedDateToJdn(value);
}

function contaminatedReceipt(label, thunk) {
  const receipt = Object.create(null);
  Object.defineProperty(receipt, HOST_TAINT, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: label,
  });
  try {
    receipt.value = thunk();
  } catch (error) {
    receipt.error = error;
  }
  return receipt;
}

function unwrapHostReceipt(receipt) {
  if (!receipt || !receipt[HOST_TAINT]) {
    throw new TypeError("Update 13 host receipt lost its taint marker.");
  }
  if (receipt.error) throw receipt.error;
  return receipt.value;
}

function rejectHostReceiptForNormativeUse(receipt) {
  if (receipt?.[HOST_TAINT]) {
    throw new TypeError("Host/Intl calendar result cannot cross the normative semantic firewall.");
  }
  return receipt;
}

export function createIntlCalendarSemanticFirewall(rawFunctions, classes) {
  if (!rawFunctions || typeof rawFunctions.calendarDateToJdn !== "function" || typeof rawFunctions.chineseToJdn !== "function") {
    throw new TypeError("Update 13 semantic firewall requires the legacy calendar converters.");
  }

  const shadowDesk = new Proxy(Object.freeze({
    chinese(value) {
      const sealed = {
        [TABLETS_SEAL]: true,
        value: deterministicChineseJdn(value),
      };
      rejectHostReceiptForNormativeUse(sealed);
      return sealed.value;
    },
  }), {
    get(target, property, receiver) {
      return Reflect.get(target, property, receiver);
    },
    has(target, property) {
      return Reflect.has(target, property);
    },
  });

  function route(value) {
    return isChineseShape(value, classes?.ChineseDate) ? "chinese" : null;
  }

  function calendarDateToJdn(value) {
    const routeName = route(value);
    if (routeName && routeName in shadowDesk) return shadowDesk[routeName](value);
    return rawFunctions.calendarDateToJdn(value);
  }

  function chineseToJdn(value) {
    if (isChineseShape(value, classes?.ChineseDate)) return shadowDesk.chinese(value);
    return unwrapHostReceipt(contaminatedReceipt("legacy-chineseToJdn", () => rawFunctions.chineseToJdn(value)));
  }

  // Diagnostic-only: proves the old path is still present and tainted without
  // making its value eligible for normative consumption.
  function legacyChineseWitness(value) {
    const receipt = contaminatedReceipt("legacy-chineseToJdn", () => rawFunctions.chineseToJdn(value));
    return Object.freeze({
      source: "host-intl",
      normative: false,
      tainted: Boolean(receipt[HOST_TAINT]),
      status: receipt.error ? "throw" : "ok",
      value: receipt.error ? null : receipt.value,
      errorName: receipt.error?.name ?? null,
      errorMessage: receipt.error?.message ?? null,
    });
  }

  return Object.freeze({
    calendarDateToJdn,
    chineseToJdn,
    legacyChineseWitness,
  });
}
