"use strict";

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as docs from "../docs/calendar-converters.js";
import * as api from "../src/public-api.js";

const corpus = JSON.parse(await readFile(new URL("../verification/update17/generated/external-calendar-vectors.json", import.meta.url), "utf8"));

function common(value) {
  return { year: String(value.year), month: String(value.month), day: String(value.day) };
}
function toJdn(calendar, value) {
  switch (calendar) {
    case "gregorian": return docs.calendarDateToJdn("gregorian", common(value));
    case "julian": return docs.calendarDateToJdn("julian", { year: String(value.astronomicalYear), month: String(value.month), day: String(value.day) });
    case "hebrew": return docs.calendarDateToJdn("hebrew", common(value));
    case "islamicCivil": return docs.calendarDateToJdn("islamic-civil", common(value));
    case "solarHijriArithmetic": return docs.calendarDateToJdn("solar-hijri-arithmetic", common(value));
    case "chinese": return api.chineseStructuredDateToJdn({ calendar: "chinese", cycle: Number(value.cycle), yearInCycle: Number(value.yearInCycle), month: Number(value.month), day: Number(value.day), leapMonth: value.leapMonth });
    case "vikrama": return api.vikramaToJdn({ calendar: "vikrama", year: BigInt(value.year), month: Number(value.month), tithi: Number(value.tithi), leapMonth: value.leapMonth, leapTithi: value.leapTithi });
    case "saka": return docs.calendarDateToJdn("saka", common(value));
    case "thaiBuddhist": return docs.calendarDateToJdn("thai-buddhist", common(value));
    case "ethiopic": return docs.calendarDateToJdn("ethiopic", common(value));
    case "coptic": return docs.calendarDateToJdn("coptic", common(value));
    case "koki": return docs.calendarDateToJdn("koki", common(value));
    case "minguo": return docs.calendarDateToJdn("minguo", common(value));
    case "bahaiWestern": return docs.calendarDateToJdn("bahai-western", common(value));
    case "mayaLongCount": return docs.calendarDateToJdn("maya-long-count", { baktun: String(value.baktun), katun: String(value.katun), tun: String(value.tun), uinal: String(value.uinal), kin: String(value.kin), correlation: "584283" });
    default: throw new Error(`unmapped Update17 external calendar ${calendar}`);
  }
}

test("Update17 external canonical representations all map back to the same absolute JDN", () => {
  for (const vector of corpus.vectors) {
    const expectedJdn = BigInt(vector.input.jdn);
    for (const [calendar, value] of Object.entries(vector.expected)) {
      assert.equal(toJdn(calendar, value), expectedJdn, `${vector.id} ${calendar}`);
    }
  }
});

test("Update17 host-backed calendar APIs are not present in the normative external corpus", () => {
  assert.deepEqual(corpus.policy.excludedHostBacked, [
    "Umm al-Qura",
    "Solar Hijri official/Intl Persian",
    "locale-dependent Japanese era display",
  ]);
  for (const vector of corpus.vectors) {
    assert.equal(Object.hasOwn(vector.expected, "islamicUmmAlQura"), false);
    assert.equal(Object.hasOwn(vector.expected, "solarHijriOfficial"), false);
    assert.equal(Object.hasOwn(vector.expected, "japaneseImperialLocale"), false);
  }
});
