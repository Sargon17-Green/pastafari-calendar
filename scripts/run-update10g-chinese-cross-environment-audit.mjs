"use strict";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as publicApi from "../src/public-api.js";
import {
  PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID,
  chineseRelatedDateToJdn,
  chineseStructuredDateToJdn,
  jdnToChinese,
} from "../src/chinese-calendrica-detour.js";
import { calendarDateToJdn as docsCalendarDateToJdn } from "../docs/calendar-converters.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10g-chinese-cross-environment-audit.json");
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10g-chinese-cross-environment-audit-report.md");

const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION_RELATED = Object.freeze({ relatedYear: -41221n, month: 1, day: 22, leapMonth: false });
const FOUNDATION_STRUCTURED = Object.freeze({ cycle: -643, yearInCycle: 57, month: 1, day: 22, leap: false });
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
const MODERN_RELATED = Object.freeze({ relatedYear: 2026n, month: 7, day: 1, leapMonth: false });
const MODERN_JDN = 2_461_266n;

function serialize(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item, 2);
}

function compact(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item);
}

function sameChinese(a, b) {
  return Object.keys(b).every((key) => a?.[key] === b[key]);
}

function asComparableChinese(value) {
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

function withIntlFault(fn) {
  const original = globalThis.Intl;
  globalThis.Intl = new Proxy(original, {
    get(target, prop, receiver) {
      if (prop === "DateTimeFormat") {
        return function DateTimeFormatDisabledForUpdate10G() {
          throw new Error("Intl.DateTimeFormat intentionally disabled by Update 10G");
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

function check(label, actual, expected, failures) {
  const ok = actual === expected;
  if (!ok) failures.push(`${label}: expected ${String(expected)}, got ${String(actual)}`);
  return { label, ok, actual: String(actual), expected: String(expected) };
}

function parseStringArray(source, constantName) {
  const match = source.match(new RegExp(`\\bconst\\s+${constantName}\\s*=\\s*(?:Object\\.freeze\\()?\\[([\\s\\S]*?)\\]\\)?\\s*;`));
  if (!match) return null;
  return [...match[1].matchAll(/"((?:\\.|[^"\\])*)"/g)]
    .map((entry) => JSON.parse(`"${entry[1]}"`));
}

function hasNamedExport(source, name) {
  return new RegExp(`\\b(?:export\\s+function\\s+${name}|${name}\\s*(?:,|\\}))`).test(source);
}

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const srcPublic = await readFile(path.join(ROOT, "src/public-api.js"), "utf8");
  const srcDetour = await readFile(path.join(ROOT, "src/chinese-calendrica-detour.js"), "utf8");
  const docsConverters = await readFile(path.join(ROOT, "docs/calendar-converters.js"), "utf8");
  const docsDetour = await readFile(path.join(ROOT, "docs/chinese-calendrica-detour.js"), "utf8");
  const swSource = await readFile(path.join(ROOT, "docs/sw.js"), "utf8");
  const pwaSmoke = await readFile(path.join(ROOT, "scripts/run-pwa-offline-smoke.mjs"), "utf8");
  const typesPath = pkg.exports?.["."]?.types ? path.join(ROOT, pkg.exports["."].types) : null;
  const publicTypes = typesPath ? await readFile(typesPath, "utf8") : "";

  const failures = [];
  const warnings = [];

  const foundationChinese = asComparableChinese(jdnToChinese(FOUNDATION_JDN));
  if (!sameChinese(foundationChinese, FOUNDATION_EXPECTED)) {
    failures.push(`Foundation structured tuple mismatch: ${compact(foundationChinese)}`);
  }

  const jdnChecks = [
    check("src chineseRelatedDateToJdn foundation", chineseRelatedDateToJdn(FOUNDATION_RELATED), FOUNDATION_JDN, failures),
    check("src chineseStructuredDateToJdn foundation", chineseStructuredDateToJdn(FOUNDATION_STRUCTURED), FOUNDATION_JDN, failures),
    check("public chineseToJdn foundation", publicApi.chineseToJdn(new publicApi.ChineseDate(-41221n, 1, 22, { leapMonth: false })), FOUNDATION_JDN, failures),
    check("public calendarDateToJdn foundation", publicApi.calendarDateToJdn(new publicApi.ChineseDate(-41221n, 1, 22, { leapMonth: false })), FOUNDATION_JDN, failures),
    check("docs calendarDateToJdn foundation", docsCalendarDateToJdn("chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false }), FOUNDATION_JDN, failures),
    check("src chineseRelatedDateToJdn modern", chineseRelatedDateToJdn(MODERN_RELATED), MODERN_JDN, failures),
    check("public chineseToJdn modern", publicApi.chineseToJdn(new publicApi.ChineseDate(2026n, 7, 1, { leapMonth: false })), MODERN_JDN, failures),
    check("docs calendarDateToJdn modern", docsCalendarDateToJdn("chinese", { relatedYear: "2026", month: "7", day: "1", leapMonth: false }), MODERN_JDN, failures),
  ];

  const intlFaultChecks = [
    check("Intl-fault public chineseToJdn", withIntlFault(() => publicApi.chineseToJdn(new publicApi.ChineseDate(-41221n, 1, 22, { leapMonth: false }))), FOUNDATION_JDN, failures),
    check("Intl-fault public calendarDateToJdn", withIntlFault(() => publicApi.calendarDateToJdn(new publicApi.ChineseDate(-41221n, 1, 22, { leapMonth: false }))), FOUNDATION_JDN, failures),
    check("Intl-fault docs calendarDateToJdn", withIntlFault(() => docsCalendarDateToJdn("chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false })), FOUNDATION_JDN, failures),
  ];

  const coreAssets = parseStringArray(swSource, "CORE_ASSETS") ?? [];
  const optionalAssets = parseStringArray(swSource, "OPTIONAL_ASSETS") ?? [];
  const swVersion = /\bconst\s+VERSION\s*=\s*"([^"]+)"\s*;/.exec(swSource)?.[1] ?? null;
  if (!coreAssets.includes("./chinese-calendrica-detour.js")) failures.push("PWA CORE_ASSETS does not include ./chinese-calendrica-detour.js");
  if (!swVersion?.includes("chinese-detour")) warnings.push(`PWA VERSION does not include chinese-detour marker: ${swVersion}`);
  if (!pwaSmoke.includes("serviceWorkerSourceForVariant")) failures.push("PWA smoke script does not use dynamic Service Worker variant rewriting");
  if (pwaSmoke.includes("pastafari-static-pwa-hardening-15-worker-api-sync")) failures.push("PWA smoke script still contains the stale hard-coded version string");

  const packageFiles = pkg.files ?? [];
  if (!packageFiles.includes("docs/chinese-calendrica-detour.js")) failures.push("package.json files does not include docs/chinese-calendrica-detour.js");
  if (!packageFiles.includes("docs/calendar-converters.js")) failures.push("package.json files does not include docs/calendar-converters.js");

  const srcDocsParity = srcDetour === docsDetour;
  if (!srcDocsParity) failures.push("src and docs Chinese deterministic detour files diverge");
  if (!docsConverters.includes("./chinese-calendrica-detour.js")) failures.push("docs/calendar-converters.js does not import the deterministic Chinese detour");
  if (!srcPublic.includes("./chinese-calendrica-detour.js")) failures.push("src/public-api.js does not import the deterministic Chinese detour");
  if (/Intl\.DateTimeFormat\s*\([^)]*chinese|u-ca-chinese/.test(srcPublic + "\n" + docsConverters)) {
    failures.push("Active public/docs Chinese converter path still contains an Intl Chinese dependency");
  }

  const publicChineseExports = Object.keys(publicApi).filter((key) => /chinese/i.test(key)).sort();
  const sourceStructuredExports = ["jdnToChinese", "chineseStructuredDateToJdn", "chineseRelatedDateToJdn"].filter((name) => hasNamedExport(srcDetour, name));
  const publicStructuredExports = ["jdnToChinese", "chineseStructuredDateToJdn"].filter((name) => typeof publicApi[name] === "function");
  const typeStructuredDeclarations = ["jdnToChinese", "chineseStructuredDateToJdn", "ChineseStructuredDate"].filter((name) => publicTypes.includes(name));

  const closureBlockers = [];
  if (!publicStructuredExports.includes("jdnToChinese")) closureBlockers.push("public API does not export jdnToChinese(), so JDN -> structured Chinese representation is still not public");
  if (!publicStructuredExports.includes("chineseStructuredDateToJdn")) closureBlockers.push("public API does not export chineseStructuredDateToJdn(), so cycle/yearInCycle input is not public");
  if (!typeStructuredDeclarations.includes("jdnToChinese")) closureBlockers.push("public .d.ts does not declare jdnToChinese()");
  if (!typeStructuredDeclarations.includes("ChineseStructuredDate")) closureBlockers.push("public .d.ts does not declare a structured Chinese date shape");

  const technicalPass = failures.length === 0;
  const closurePass = technicalPass && closureBlockers.length === 0;
  const result = {
    stage: "Update 10G",
    result: closurePass
      ? "UPDATE_10_ACCEPTED_FOR_CLOSURE"
      : technicalPass
        ? "UPDATE_10_BLOCKED_BY_PUBLIC_STRUCTURED_CHINESE_API_GAP"
        : "UPDATE_10_BLOCKED_BY_CROSS_ENVIRONMENT_MISMATCH",
    acceptanceStatus: closurePass ? "ACCEPTED" : "NOT_ACCEPTED_FOR_UPDATE_10_CLOSURE",
    packageVersion: pkg.version,
    sourceRuleId: PASTAFARI_CHINESE_DEEP_DELTA_T_RULE_ID,
    checksumFilesChanged: false,
    additionalChecksumManifestsAffectedButNotUpdated: [],
    technicalPass,
    closurePass,
    foundation: {
      jdn: FOUNDATION_JDN.toString(),
      actualChinese: foundationChinese,
      expectedChinese: FOUNDATION_EXPECTED,
      match: sameChinese(foundationChinese, FOUNDATION_EXPECTED),
    },
    jdnChecks,
    intlFaultChecks,
    pwa: {
      version: swVersion,
      coreAssetCount: coreAssets.length,
      optionalAssetCount: optionalAssets.length,
      includesChineseDetour: coreAssets.includes("./chinese-calendrica-detour.js"),
      smokeScriptUsesDynamicVariant: pwaSmoke.includes("serviceWorkerSourceForVariant"),
      staleSmokeVersionPresent: pwaSmoke.includes("pastafari-static-pwa-hardening-15-worker-api-sync"),
    },
    package: {
      files: packageFiles,
      includesDocsChineseDetour: packageFiles.includes("docs/chinese-calendrica-detour.js"),
      includesDocsCalendarConverters: packageFiles.includes("docs/calendar-converters.js"),
    },
    publicApi: {
      chineseExports: publicChineseExports,
      sourceStructuredExports,
      publicStructuredExports,
      typeStructuredDeclarations,
    },
    warnings,
    failures,
    closureBlockers,
    nextStage: closurePass
      ? "Update 11"
      : technicalPass
        ? "Update 10H — public structured Chinese API and types"
        : "Repair the cross-environment mismatch and rerun 10G",
  };

  const report = `# Update 10G — Chinese cross-environment acceptance audit\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `Checksum manifests changed: **none**\n\n` +
    `Additional checksum manifests affected but intentionally not updated: **none**\n\n` +
    `## Summary\n\n` +
    (technicalPass
      ? `The deterministic Chinese engine passes the cross-environment conversion checks that are in scope for this audit: source, public related-year conversion, docs/browser input conversion, PWA asset wiring, package file inclusion, and Intl fault injection.\n\n`
      : `The deterministic Chinese engine still has technical cross-environment mismatches and cannot be accepted.\n\n`) +
    (closureBlockers.length
      ? `However, Update 10 is not ready for closure because the original public representation gap remains: the public package still exposes only related-year Chinese conversion, not a structured cycle/yearInCycle/stem/branch API.\n\n`
      : `No public structured API closure blockers remain.\n\n`) +
    `## Foundation discriminator\n\n` +
    `- Foundation JDN: \`${FOUNDATION_JDN}\`\n` +
    `- actual: \`${compact(foundationChinese)}\`\n` +
    `- expected: \`${compact(FOUNDATION_EXPECTED)}\`\n` +
    `- match: \`${result.foundation.match}\`\n\n` +
    `## Conversion checks\n\n` +
    jdnChecks.map((row) => `- ${row.ok ? "PASS" : "FAIL"}: ${row.label} -> \`${row.actual}\``).join("\n") +
    `\n\n## Intl fault injection\n\n` +
    intlFaultChecks.map((row) => `- ${row.ok ? "PASS" : "FAIL"}: ${row.label} -> \`${row.actual}\``).join("\n") +
    `\n\n## PWA/package wiring\n\n` +
    `- PWA version: \`${swVersion}\`\n` +
    `- CORE_ASSETS: \`${coreAssets.length}\`\n` +
    `- includes \`./chinese-calendrica-detour.js\`: \`${coreAssets.includes("./chinese-calendrica-detour.js")}\`\n` +
    `- PWA smoke dynamic SW variant rewriting: \`${pwaSmoke.includes("serviceWorkerSourceForVariant")}\`\n` +
    `- package includes \`docs/chinese-calendrica-detour.js\`: \`${packageFiles.includes("docs/chinese-calendrica-detour.js")}\`\n\n` +
    `## Public API exposure\n\n` +
    `- public Chinese-related exports: \`${publicChineseExports.join(", ") || "none"}\`\n` +
    `- source structured exports: \`${sourceStructuredExports.join(", ") || "none"}\`\n` +
    `- public structured exports: \`${publicStructuredExports.join(", ") || "none"}\`\n` +
    `- type structured declarations: \`${typeStructuredDeclarations.join(", ") || "none"}\`\n\n` +
    (closureBlockers.length
      ? `## Closure blockers\n\n${closureBlockers.map((line) => `- ${line}`).join("\n")}\n\n`
      : ``) +
    (failures.length
      ? `## Technical failures\n\n${failures.map((line) => `- ${line}`).join("\n")}\n\n`
      : ``) +
    (warnings.length
      ? `## Warnings\n\n${warnings.map((line) => `- ${line}`).join("\n")}\n\n`
      : ``) +
    `## Decision\n\n` +
    (closurePass
      ? `Update 10 is accepted for closure. Proceed to Update 11.\n`
      : technicalPass
        ? `Do not proceed to Update 11 yet. Perform Update 10H to expose the structured Chinese API and type declarations without changing the already-passing deterministic engine.\n`
        : `Do not proceed to Update 11. Repair the listed cross-environment failures and rerun this audit.\n`);

  await writeFile(JSON_PATH, `${serialize(result)}\n`);
  await writeFile(REPORT_PATH, report);

  console.log(`[update10g] ${result.result}`);
  console.log(`[update10g] technicalPass=${technicalPass}`);
  console.log(`[update10g] closurePass=${closurePass}`);
  console.log(`[update10g] report=${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((error) => {
  console.error(`[update10g] ${error?.stack || error?.message || String(error)}`);
  process.exitCode = 1;
});
