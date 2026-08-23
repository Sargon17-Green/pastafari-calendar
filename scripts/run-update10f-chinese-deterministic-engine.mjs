"use strict";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as api from "../src/public-api.js";
import {
  PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID,
  chineseRelatedDateToJdn,
  chineseStructuredDateToJdn,
  jdnToChinese,
} from "../src/chinese-calendrica-detour.js";
import { calendarDateToJdn as docsCalendarDateToJdn } from "../docs/calendar-converters.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10f-chinese-deterministic-engine-report.md");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10f-chinese-deterministic-engine.json");

const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION_EXPECTED = Object.freeze({
  cycle: -643,
  yearInCycle: 57,
  heavenlyStem: "geng",
  earthlyBranch: "shen",
  stem: 7,
  branch: 9,
  relatedYear: -41221n,
  month: 1,
  leap: false,
  leapMonth: false,
  day: 22,
});

function comparable(value) {
  return {
    cycle: value.cycle,
    yearInCycle: value.yearInCycle,
    heavenlyStem: value.heavenlyStem,
    earthlyBranch: value.earthlyBranch,
    stem: value.stem,
    branch: value.branch,
    relatedYear: value.relatedYear,
    month: value.month,
    leap: value.leap,
    leapMonth: value.leapMonth,
    day: value.day,
  };
}

function sameChinese(a, b) {
  return Object.keys(b).every((key) => a?.[key] === b[key]);
}

function stringifyJson(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item);
}

function attempt(label, fn) {
  try {
    const value = fn();
    return { label, ok: true, value: typeof value === "bigint" ? value.toString() : value };
  } catch (error) {
    return { label, ok: false, name: error?.name || "Error", message: error?.message || String(error) };
  }
}

function withIntlFault(fn) {
  const original = globalThis.Intl;
  globalThis.Intl = new Proxy(original, {
    get(target, prop, receiver) {
      if (prop === "DateTimeFormat") {
        return function FaultedDateTimeFormat() {
          throw new Error("Intl DateTimeFormat intentionally disabled by Update 10F fault injection");
        };
      }
      return Reflect.get(target, prop, receiver);
    },
  });
  try {
    return fn();
  } finally {
    globalThis.Intl = original;
  }
}

function requireOk(result) {
  if (!result.ok) throw new Error(`${result.label} failed: ${result.name}: ${result.message}`);
  return result;
}

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));

  const foundationChinese = comparable(jdnToChinese(FOUNDATION_JDN));
  const structuredFoundationJdn = chineseStructuredDateToJdn({ cycle: -643, yearInCycle: 57, month: 1, leap: false, day: 22 });
  const relatedFoundationJdn = chineseRelatedDateToJdn({ relatedYear: -41221n, month: 1, day: 22, leapMonth: false });
  const publicFoundationJdn = api.chineseToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }));
  const publicGenericFoundationJdn = api.calendarDateToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }));
  const docsFoundationJdn = docsCalendarDateToJdn("chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false });
  const publicModernJdn = api.chineseToJdn(new api.ChineseDate(2026n, 7, 1, { leapMonth: false }));
  const docsModernJdn = docsCalendarDateToJdn("chinese", { relatedYear: "2026", month: "7", day: "1", leapMonth: false });

  const faultInjection = [
    requireOk(attempt(
      "public chineseToJdn under Intl fault",
      () => withIntlFault(() => api.chineseToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }))),
    )),
    requireOk(attempt(
      "public calendarDateToJdn under Intl fault",
      () => withIntlFault(() => api.calendarDateToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }))),
    )),
    requireOk(attempt(
      "docs calendarDateToJdn under Intl fault",
      () => withIntlFault(() => docsCalendarDateToJdn("chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false })),
    )),
  ];

  const failures = [];
  if (!sameChinese(foundationChinese, FOUNDATION_EXPECTED)) failures.push("Foundation structured Chinese tuple mismatch");
  for (const [label, actual, expected] of [
    ["structuredFoundationJdn", structuredFoundationJdn, FOUNDATION_JDN],
    ["relatedFoundationJdn", relatedFoundationJdn, FOUNDATION_JDN],
    ["publicFoundationJdn", publicFoundationJdn, FOUNDATION_JDN],
    ["publicGenericFoundationJdn", publicGenericFoundationJdn, FOUNDATION_JDN],
    ["docsFoundationJdn", docsFoundationJdn, FOUNDATION_JDN],
    ["publicModernJdn", publicModernJdn, 2_461_266n],
    ["docsModernJdn", docsModernJdn, 2_461_266n],
  ]) {
    if (actual !== expected) failures.push(`${label} expected ${expected} got ${actual}`);
  }
  for (const result of faultInjection) {
    if (BigInt(result.value) !== FOUNDATION_JDN) failures.push(`${result.label} returned ${result.value}`);
  }

  const filesChanged = [
    "src/chinese-calendrica-detour.js",
    "src/public-api.js",
    "docs/chinese-calendrica-detour.js",
    "docs/calendar-converters.js",
    "docs/sw.js",
    "package.json",
    "test/calendar-converters.test.js",
    "test/public-api.test.js",
    "test/pwa-i18n.test.js",
    "scripts/run-update10f-chinese-deterministic-engine.mjs",
    "artifacts/update-10f-chinese-deterministic-engine.json",
    "artifacts/update-10f-chinese-deterministic-engine-report.md",
  ];

  const result = {
    result: failures.length === 0 ? "CHINESE_DETERMINISTIC_ENGINE_IMPLEMENTED" : "CHINESE_DETERMINISTIC_ENGINE_FAILED",
    acceptanceStatus: failures.length === 0 ? "READY_FOR_STAGE_10G_CROSS_ENV_PACKAGING_AUDIT" : "NOT_ACCEPTED_AS_UPDATE_10_REPAIR",
    stage: "Update 10F",
    packageVersion: pkg.version,
    productionFilesChanged: true,
    checksumFilesChanged: false,
    sourceRuleId: PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID,
    foundation: {
      jdn: FOUNDATION_JDN.toString(),
      actualChinese: foundationChinese,
      expectedChinese: FOUNDATION_EXPECTED,
      match: sameChinese(foundationChinese, FOUNDATION_EXPECTED),
    },
    jdnChecks: {
      structuredFoundationJdn: structuredFoundationJdn.toString(),
      relatedFoundationJdn: relatedFoundationJdn.toString(),
      publicFoundationJdn: publicFoundationJdn.toString(),
      publicGenericFoundationJdn: publicGenericFoundationJdn.toString(),
      docsFoundationJdn: docsFoundationJdn.toString(),
      publicModernJdn: publicModernJdn.toString(),
      docsModernJdn: docsModernJdn.toString(),
    },
    faultInjection,
    filesChanged,
    additionalChecksumManifestsAffectedButNotUpdated: ["docs/SHA256SUMS.txt"],
    failures,
  };

  const report = `# Update 10F — Chinese deterministic shadow engine\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `Checksum manifests changed: **none**\n\n` +
    `Additional checksum manifests affected but intentionally not updated: **docs/SHA256SUMS.txt**\n\n` +
    `## Scope\n\n` +
    `This stage implements the source-locked \`${PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID}\` as a deterministic, non-Intl Chinese shadow engine. It wires the public package entry point and docs/browser input converter to this engine for Chinese conversion only.\n\n` +
    `## Foundation\n\n` +
    `- Foundation JDN: \`${FOUNDATION_JDN}\`\n` +
    `- actual Chinese tuple: \`${stringifyJson(foundationChinese)}\`\n` +
    `- expected Chinese tuple: \`${stringifyJson(FOUNDATION_EXPECTED)}\`\n` +
    `- match: \`${result.foundation.match}\`\n\n` +
    `## JDN checks\n\n` +
    Object.entries(result.jdnChecks).map(([key, value]) => `- ${key}: \`${value}\``).join("\n") +
    `\n\n## Intl fault injection\n\n` +
    faultInjection.map((row) => `- ${row.label}: ${row.ok ? `PASS -> \`${row.value}\`` : `FAIL -> ${row.name}: ${row.message}`}`).join("\n") +
    `\n\n## Files changed\n\n` +
    filesChanged.map((file) => `- \`${file}\``).join("\n") +
    `\n\n## Decision\n\n` +
    (failures.length === 0
      ? `The deterministic Chinese engine is implemented and passes Foundation, modern-vector, public API, docs converter and Intl fault-injection checks. Proceed to Stage 10G cross-environment/packaging audit before declaring Update 10 complete.\n`
      : `The stage is not accepted. Failures:\n${failures.map((line) => `- ${line}`).join("\n")}\n`);

  await writeFile(JSON_PATH, `${JSON.stringify(result, (_key, item) => typeof item === "bigint" ? item.toString() : item, 2)}\n`);
  await writeFile(REPORT_PATH, report);

  if (failures.length) throw new Error(failures.join("; "));
  console.log(`[update10f] ${result.result}`);
  console.log(`[update10f] report=${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((error) => {
  console.error(`[update10f] ${error?.stack || error?.message || String(error)}`);
  process.exitCode = 1;
});
