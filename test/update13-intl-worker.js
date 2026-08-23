"use strict";

const original = Intl.DateTimeFormat;
let intlCalls = 0;
Intl.DateTimeFormat = function Update13WorkerIntlFault() {
  intlCalls += 1;
  throw new Error("UPDATE13_WORKER_INTL_FAULT");
};

try {
  const core = await import("../browser/pastafari-calendar-core.js");
  const koki = await import("../browser/koki-api.js");
  const vikrama = await import("../browser/vikrama-api.js");
  const F = -13_334_246n;
  const chinese = core.chineseToJdn(new core.ChineseDate(-41_221n, 1, 22, { leapMonth: false }));
  const generic = core.calendarDateToJdn(new core.ChineseDate(-41_221n, 1, 22, { leapMonth: false }));
  const k = koki.kokiToJdn(new koki.KokiDate(-40_561n, 12, 22));
  const v = vikrama.vikramaToJdn(new vikrama.VikramaDate(-41_162n, 8, 16, { leapMonth: false, leapTithi: false }));
  postMessage({ status: chinese === F && generic === F && k === F && v === F && intlCalls === 0 ? "PASS" : "FAIL", intlCalls, values: [chinese, generic, k, v].map(String) });
} catch (error) {
  postMessage({ status: "FAIL", intlCalls, error: String(error?.stack || error) });
} finally {
  Intl.DateTimeFormat = original;
}
