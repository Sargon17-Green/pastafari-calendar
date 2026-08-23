"use strict";

import { KokiDate, jdnToKoki, kokiToJdn } from "../browser/koki-api.js";

try {
  const foundationJdn = -13334246n;
  const foundation = jdnToKoki(foundationJdn);
  const back = kokiToJdn(new KokiDate(-40561n, 12, 22));
  const original = Intl.DateTimeFormat;
  let intlIndependent = false;
  try {
    Intl.DateTimeFormat = function () { throw new Error("UPDATE12_WORKER_INTL_FAULT"); };
    intlIndependent = jdnToKoki(foundationJdn).year === -40561n
      && kokiToJdn(new KokiDate(-40561n, 12, 22)) === foundationJdn;
  } finally {
    Intl.DateTimeFormat = original;
  }
  globalThis.postMessage({
    status: foundation.year === -40561n
      && foundation.month === 12
      && foundation.day === 22
      && back === foundationJdn
      && intlIndependent ? "PASS" : "FAIL",
    foundation: { ...foundation, year: foundation.year.toString() },
    back: back.toString(),
    intlIndependent,
  });
} catch (error) {
  globalThis.postMessage({ status: "FAIL", error: String(error?.stack || error) });
}
