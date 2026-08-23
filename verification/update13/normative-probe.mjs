"use strict";

const mode = process.env.UPDATE13_INTL_MODE || "normal";
const calls = { dateTimeFormat: 0, numberFormat: 0, locale: 0, displayNames: 0 };
const originals = {
  DateTimeFormat: Intl.DateTimeFormat,
  NumberFormat: Intl.NumberFormat,
  Locale: Intl.Locale,
  DisplayNames: Intl.DisplayNames,
};

function fakeDateTimeFormat() {
  calls.dateTimeFormat += 1;
  if (mode === "throw") throw new Error("UPDATE13_INTL_THROW");
  if (mode === "fake-parts") return { formatToParts: () => [{ type: "year", value: "garbage" }], format: () => "garbage", resolvedOptions: () => ({ locale: "xx" }) };
  if (mode === "wrong-values") return { formatToParts: () => [{ type: "relatedYear", value: "999999" }, { type: "month", value: "12" }, { type: "day", value: "30" }], format: () => "999999/12/30", resolvedOptions: () => ({ locale: "xx" }) };
  return { formatToParts: () => [{ type: "era", value: "HOST_ERA" }, { type: "month", value: "HOST_MONTH" }, { type: "day", value: "22" }], format: () => "HOST_ERA HOST_MONTH 22", resolvedOptions: () => ({ locale: "xx" }) };
}

if (mode !== "normal") {
  Intl.DateTimeFormat = fakeDateTimeFormat;
  Intl.NumberFormat = function Update13NumberFormat() { calls.numberFormat += 1; return { format: value => `HOST_NUMBER_${value}` }; };
  if (typeof originals.Locale === "function") Intl.Locale = function Update13Locale() { calls.locale += 1; return { baseName: "xx" }; };
  if (typeof originals.DisplayNames === "function") Intl.DisplayNames = function Update13DisplayNames() { calls.displayNames += 1; return { of: value => `HOST_NAME_${value}` }; };
}

const published = await import("../../src/public-api.js");
const browserCore = await import("../../browser/pastafari-calendar-core.js");
const browserKoki = await import("../../browser/koki-api.js");
const browserVikrama = await import("../../browser/vikrama-api.js");
const docs = await import("../../docs/calendar-converters.js");
const update9ref = await import("../update9/proleptic-negative-year-reference.mjs");
const kokiRef = await import("../update12/reference-koki.mjs");
const vikramaRef = await import("../update11/vikrama-reference.mjs");

const F = -13_334_246n;
const outputs = {};
const put = (name, value) => { outputs[name] = typeof value === "bigint" ? value.toString() : value; };

put("gregorian", published.gregorianToJdn(new published.GregorianDate(-41_221n, 12, 22)));
put("julian", published.julianToJdn(new published.JulianDate(-41_220n, 10, 28)));
put("hebrew", published.hebrewToJdn(new published.HebrewDate(-37_460n, 3, 19)));
put("islamic-civil", published.islamicCivilToJdn(new published.IslamicCivilDate(-43_126n, 3, 27)));
put("solar-hijri-arithmetic", published.solarHijriArithmeticToJdn(new published.SolarHijriDate(-41_843n, 9, 18, { variant: "arithmetic-2820" })));
put("chinese-related-root", published.chineseToJdn(new published.ChineseDate(-41_221n, 1, 22, { leapMonth: false })));
put("chinese-generic-root", published.calendarDateToJdn(new published.ChineseDate(-41_221n, 1, 22, { leapMonth: false })));
put("chinese-browser-core", browserCore.chineseToJdn(new browserCore.ChineseDate(-41_221n, 1, 22, { leapMonth: false })));
put("chinese-browser-generic", browserCore.calendarDateToJdn(new browserCore.ChineseDate(-41_221n, 1, 22, { leapMonth: false })));
put("chinese-structured", published.chineseStructuredDateToJdn(new published.ChineseStructuredDate(-643, 57, 1, 22, { leap: false })));
put("saka", published.sakaToJdn(new published.SakaDate(-41_299n, 10, 1)));
put("thai-buddhist", published.thaiBuddhistToJdn(new published.ThaiBuddhistDate(-40_678n, 12, 22)));
put("ethiopic", published.ethiopicToJdn(new published.EthiopicDate(-41_227n, 3, 1)));
put("coptic", published.copticToJdn(new published.CopticDate(-41_503n, 3, 1)));
put("koki-root", published.kokiToJdn(new published.KokiDate(-40_561n, 12, 22)));
put("koki-browser", browserKoki.kokiToJdn(new browserKoki.KokiDate(-40_561n, 12, 22)));
put("minguo", published.minguoToJdn(new published.MinguoDate(-43_132n, 12, 22)));
put("bahai-western", published.bahaiToJdn(new published.BahaiDate(-43_064n, 15, 11, { variant: "western-arithmetic" })));
put("maya-long-count", published.mayaLongCountToJdn(new published.MayaLongCountDate(-97n, 6, 17, 7, 11)));
put("vikrama-root", published.vikramaToJdn(new published.VikramaDate(-41_162n, 8, 16, { leapMonth: false, leapTithi: false })));
put("vikrama-browser", browserVikrama.vikramaToJdn(new browserVikrama.VikramaDate(-41_162n, 8, 16, { leapMonth: false, leapTithi: false })));

const reference = {
  hebrew: update9ref.hebrewToJdn({ year: -37_460n, month: 3, day: 19 }).toString(),
  "islamic-civil": update9ref.islamicCivilToJdn({ year: -43_126n, month: 3, day: 27 }).toString(),
  saka: update9ref.sakaToJdn({ year: -41_299n, month: 10, day: 1 }).toString(),
  ethiopic: update9ref.ethiopicToJdn({ year: -41_227n, month: 3, day: 1 }).toString(),
  coptic: update9ref.copticToJdn({ year: -41_503n, month: 3, day: 1 }).toString(),
  "bahai-western": update9ref.bahaiWesternToJdn({ year: -43_064n, month: 15, day: 11 }).toString(),
  koki: kokiRef.referenceKokiToJdn({ year: -40_561n, month: 12, day: 22 }).toString(),
  vikrama: vikramaRef.referenceVikramaToJdn({ year: -41_162n, month: 8, tithi: 16, leapMonth: false, leapTithi: false }).toString(),
};

const structured = {
  chinese: published.jdnToChinese(F),
  koki: published.jdnToKoki(F),
  vikrama: published.jdnToVikrama(F),
};

const failed = Object.entries(outputs).filter(([, value]) => value !== F.toString()).map(([name, value]) => ({ name, value, expected: F.toString() }));
const refFailed = Object.entries(reference).filter(([, value]) => value !== F.toString()).map(([name, value]) => ({ name, value, expected: F.toString() }));

const result = {
  mode,
  env: { TZ: process.env.TZ ?? null, LANG: process.env.LANG ?? null, LC_ALL: process.env.LC_ALL ?? null },
  foundationJdn: F.toString(),
  outputs,
  reference,
  structured,
  intlCalls: calls,
  failed,
  referenceFailed: refFailed,
  status: failed.length || refFailed.length || (mode !== "normal" && Object.values(calls).some(Boolean)) ? "FAIL" : "PASS",
};

process.stdout.write(JSON.stringify(result, (_key, value) => typeof value === "bigint" ? value.toString() : value));
