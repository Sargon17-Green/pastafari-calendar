#!/usr/bin/env node
"use strict";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as publicApi from "../src/public-api.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10h-public-structured-chinese-api.json");
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10h-public-structured-chinese-api-report.md");

const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION_STRUCTURED_INPUT = Object.freeze({ calendar: "chinese", cycle: -643, yearInCycle: 57, month: 1, day: 22, leap: false });
const FOUNDATION_EXPECTED = Object.freeze({
  cycle: -643,
  yearInCycle: 57,
  heavenlyStem: "geng",
  earthlyBranch: "shen",
  stem: 7,
  branch: 9,
  month: 1,
  leap: false,
  leapMonth: false,
  day: 22,
  relatedYear: -41221n,
});

function serialize(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item, 2);
}

function compact(value) {
  return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item);
}

function comparableChinese(value) {
  return {
    cycle: value.cycle,
    yearInCycle: value.yearInCycle,
    heavenlyStem: value.heavenlyStem,
    earthlyBranch: value.earthlyBranch,
    stem: value.stem,
    branch: value.branch,
    month: value.month,
    leap: value.leap,
    leapMonth: value.leapMonth,
    day: value.day,
    relatedYear: value.relatedYear,
  };
}

function sameChinese(a, b) {
  return Object.keys(b).every((key) => a?.[key] === b[key]);
}

function check(label, condition, failures, details = undefined) {
  if (!condition) failures.push(details === undefined ? label : `${label}: ${details}`);
  return { label, ok: Boolean(condition), details };
}

function withIntlFault(fn) {
  const original = globalThis.Intl;
  globalThis.Intl = new Proxy(original, {
    get(target, prop, receiver) {
      if (prop === "DateTimeFormat") {
        return function DateTimeFormatDisabledForUpdate10H() {
          throw new Error("Intl.DateTimeFormat intentionally disabled by Update 10H");
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

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const typesPath = path.join(ROOT, pkg.exports["."].types);
  const types = await readFile(typesPath, "utf8");
  const srcDetour = await readFile(path.join(ROOT, "src/chinese-calendrica-detour.js"), "utf8");
  const docsDetour = await readFile(path.join(ROOT, "docs/chinese-calendrica-detour.js"), "utf8");

  const failures = [];
  const checks = [];

  checks.push(check("public jdnToChinese export exists", typeof publicApi.jdnToChinese === "function", failures));
  checks.push(check("public chineseStructuredDateToJdn export exists", typeof publicApi.chineseStructuredDateToJdn === "function", failures));
  checks.push(check("public ChineseStructuredDate constructor exists", typeof publicApi.ChineseStructuredDate === "function", failures));
  checks.push(check("public type declares ChineseStructuredDate", /\b(?:class|interface)\s+ChineseStructuredDate\b/.test(types), failures));
  checks.push(check("public type declares ChineseStructuredDateResult", /\binterface\s+ChineseStructuredDateResult\b/.test(types), failures));
  checks.push(check("public type declares jdnToChinese", /\bfunction\s+jdnToChinese\b/.test(types), failures));
  checks.push(check("public type declares chineseStructuredDateToJdn", /\bfunction\s+chineseStructuredDateToJdn\b/.test(types), failures));
  checks.push(check("src/docs deterministic detours remain identical", srcDetour === docsDetour, failures));

  const structured = new publicApi.ChineseStructuredDate(-643, 57, 1, 22, { leap: false });
  const actualStructured = comparableChinese(publicApi.jdnToChinese(FOUNDATION_JDN));
  checks.push(check("Foundation JDN -> structured Chinese tuple", sameChinese(actualStructured, FOUNDATION_EXPECTED), failures, compact(actualStructured)));
  checks.push(check("structured object -> JDN", publicApi.chineseStructuredDateToJdn(FOUNDATION_STRUCTURED_INPUT) === FOUNDATION_JDN, failures));
  checks.push(check("ChineseStructuredDate -> JDN", publicApi.chineseStructuredDateToJdn(structured) === FOUNDATION_JDN, failures));
  checks.push(check("chineseToJdn accepts ChineseStructuredDate", publicApi.chineseToJdn(structured) === FOUNDATION_JDN, failures));
  checks.push(check("calendarDateToJdn accepts ChineseStructuredDate", publicApi.calendarDateToJdn(structured) === FOUNDATION_JDN, failures));
  checks.push(check("structured conversion is Intl-independent", withIntlFault(() => publicApi.chineseStructuredDateToJdn(structured)) === FOUNDATION_JDN, failures));
  checks.push(check("JDN conversion is Intl-independent", withIntlFault(() => publicApi.jdnToChinese(FOUNDATION_JDN)).day === 22, failures));

  const result = {
    stage: "Update 10H",
    result: failures.length === 0
      ? "PUBLIC_STRUCTURED_CHINESE_API_AND_TYPES_ACCEPTED"
      : "PUBLIC_STRUCTURED_CHINESE_API_AND_TYPES_BLOCKED",
    acceptanceStatus: failures.length === 0 ? "ACCEPTED" : "NOT_ACCEPTED",
    checksumFilesChanged: false,
    additionalChecksumManifestsAffectedButNotUpdated: ["docs/SHA256SUMS.txt"],
    publicChineseExports: Object.keys(publicApi).filter((key) => /chinese/i.test(key)).sort(),
    foundation: {
      jdn: FOUNDATION_JDN.toString(),
      actualStructured,
      expectedStructured: FOUNDATION_EXPECTED,
      match: sameChinese(actualStructured, FOUNDATION_EXPECTED),
    },
    checks,
    failures,
    nextStage: failures.length === 0
      ? "Update 10G revalidation / Update 10 closure"
      : "Repair public structured Chinese API exposure before closure",
  };

  const report = `# Update 10H — Public structured Chinese API and types\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `Checksum manifests changed in this delta: **none**\n\n` +
    `Additional checksum manifests affected but intentionally not updated: **docs/SHA256SUMS.txt**\n\n` +
    `## Public API added\n\n` +
    `- \`ChineseStructuredDate\`\n` +
    `- \`jdnToChinese(jdn)\`\n` +
    `- \`chineseStructuredDateToJdn(value)\`\n\n` +
    `## Foundation discriminator\n\n` +
    `- Foundation JDN: \`${FOUNDATION_JDN}\`\n` +
    `- actual: \`${compact(actualStructured)}\`\n` +
    `- expected: \`${compact(FOUNDATION_EXPECTED)}\`\n` +
    `- match: **${sameChinese(actualStructured, FOUNDATION_EXPECTED)}**\n\n` +
    `## Checks\n\n` +
    checks.map((entry) => `- ${entry.ok ? "PASS" : "FAIL"}: ${entry.label}${entry.details ? ` — ${entry.details}` : ""}`).join("\n") +
    `\n\n` +
    `## Decision\n\n` +
    (failures.length === 0
      ? `The public structured Chinese API gap found by 10G is repaired. Rerun 10G as the final closure/audit gate.\n`
      : `The public structured Chinese API gap is still blocked:\n\n${failures.map((item) => `- ${item}`).join("\n")}\n`);

  await writeFile(JSON_PATH, `${serialize(result)}\n`);
  await writeFile(REPORT_PATH, report);
  console.log(`[update10h] ${result.result}`);
  console.log(`[update10h] report=${path.relative(ROOT, REPORT_PATH)}`);
  if (failures.length) process.exitCode = 1;
}

await main();
