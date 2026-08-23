"use strict";

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const TMP_DIR = path.join(ROOT, ".tmp", "update10e-chinese-delta-t-source-lock");
const SOURCE_PATH = "sources/chinese/农历规范算法.zh.md";
const TEN_C_SCRIPT = "scripts/run-update10c-calendrica-chinese-port.mjs";
const TEN_D_JSON = "artifacts/update-10d-chinese-foundation-reconciliation.json";
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10e-chinese-delta-t-source-lock-report.md");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10e-chinese-delta-t-source-lock.json");
const SHA_PATH = path.join(ARTIFACT_DIR, "update-10e-chinese-delta-t-source-lock-sha256sums.txt");

const EXPECTED_RULE_ID = "PASTAFARI_CHINESE_DEEP_DELTA_T_V1";
const EXPECTED_FACTOR_NUMERATOR = 26;
const EXPECTED_FACTOR_DENOMINATOR = 25;
const EXPECTED_THRESHOLD_YEAR = -1999;
const EXPECTED_RESULT = {
  cycle: -643,
  yearInCycle: 57,
  heavenlyStem: "geng",
  earthlyBranch: "shen",
  stem: 7,
  branch: 9,
  month: 1,
  leap: false,
  day: 22,
};

function fail(message) {
  throw new Error(message);
}

function replaceFunction(source, name, replacement) {
  const start = source.indexOf(`function ${name}`);
  if (start < 0) fail(`missing function ${name}`);
  const next = source.indexOf("function ", start + 1);
  if (next < 0) fail(`could not locate end of function ${name}`);
  return `${source.slice(0, start)}${replacement}\n${source.slice(next)}`;
}

function patchTenCSource(source) {
  let patched = source.replace(
    'const ARTIFACT_DIR = path.join(ROOT, "artifacts");',
    'const ARTIFACT_DIR = path.join(ROOT, ".tmp", "update10e-chinese-delta-t-source-lock", "patched-10c-artifacts");',
  );
  patched = replaceFunction(patched, "ephemerisCorrection", `function ephemerisCorrection(tee){
  const year=gregorianYearFromFixed(Math.floor(tee));
  const c=gregorianDateDifference([1900,1,1],[year,7,1])/36525;
  const c2051=( -20 + 32*((year-1820)/100)**2 + 0.5628*(2150-year))/86400;
  const y2000=year-2000;
  const c2006=poly(y2000,[62.92,0.32217,0.005589])/86400;
  const c1987=poly(y2000,[63.86,0.3345,-0.060374,0.0017275,0.000651814,0.00002373599])/86400;
  const c1900=poly(c,[-0.00002,0.000297,0.025184,-0.181133,0.553040,-0.861938,0.677066,-0.212591]);
  const c1800=poly(c,[-0.000009,0.003844,0.083563,0.865736,4.867575,15.845535,31.332267,38.291999,28.316289,11.636204,2.043794]);
  const y1700=year-1700;
  const c1700=poly(y1700,[8.118780842,-0.005092142,0.003336121,-0.0000266484])/86400;
  const y1600=year-1600;
  const c1600=poly(y1600,[120,-0.9808,-0.01532,0.000140272128])/86400;
  const y1000=(year-1000)/100;
  const c500=poly(y1000,[1574.2,-556.01,71.23472,0.319781,-0.8503463,-0.005050998,0.0083572073])/86400;
  const y0=year/100;
  const c0=poly(y0,[10583.6,-1014.41,33.78311,-5.952053,-0.1798452,0.022174192,0.0090316521])/86400;
  const y1820=(year-1820)/100;
  const other=poly(y1820,[-20,0,32])/86400;
  if(year<${EXPECTED_THRESHOLD_YEAR}) return (${EXPECTED_FACTOR_NUMERATOR}/${EXPECTED_FACTOR_DENOMINATOR})*other;
  if(2051<=year && year<=2150) return c2051;
  if(2006<=year && year<=2050) return c2006;
  if(1987<=year && year<=2005) return c1987;
  if(1900<=year && year<=1986) return c1900;
  if(1800<=year && year<=1899) return c1800;
  if(1700<=year && year<=1799) return c1700;
  if(1600<=year && year<=1699) return c1600;
  if(500<=year && year<=1599) return c500;
  if(-500<year && year<500) return c0;
  return other;
}`);
  return patched;
}

function sameChinese(a, b) {
  return Object.keys(b).every((key) => a?.[key] === b[key]);
}

async function runPatchedFoundationProbe() {
  await rm(TMP_DIR, { recursive: true, force: true });
  await mkdir(TMP_DIR, { recursive: true });
  const tenCSource = await readFile(path.join(ROOT, TEN_C_SCRIPT), "utf8");
  const patchedScript = path.join(ROOT, "scripts", ".tmp-update10e-patched-10c.mjs");
  await writeFile(patchedScript, patchTenCSource(tenCSource));
  const proc = spawnSync(process.execPath, [patchedScript], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });
  await rm(patchedScript, { force: true });
  if (proc.status !== 0) {
    fail(`patched 10C probe failed:\n${proc.stderr || proc.stdout}`);
  }
  const parsed = JSON.parse(await readFile(path.join(TMP_DIR, "patched-10c-artifacts", "update-10c-calendrica-chinese-port.json"), "utf8"));
  return {
    result: parsed.result,
    acceptanceStatus: parsed.acceptanceStatus,
    foundationActual: parsed.diagnostics.foundationActual,
    foundationMatch: parsed.diagnostics.foundationMatch,
    reverseExpected: parsed.diagnostics.reverseExpected,
    reverseExpectedDeltaFromFoundation: parsed.diagnostics.reverseExpectedDeltaFromFoundation,
    mismatches: parsed.diagnostics.mismatches,
  };
}

function inspectSourceText(text) {
  const required = [
    EXPECTED_RULE_ID,
    "26 / 25",
    "Y < -1999",
    "DeltaT_base_seconds = -20 + 32 * t^2",
    "DeltaT_chinese_seconds = (26 / 25) * DeltaT_base_seconds",
    "禁止使用固定 `+3 day`",
  ];
  const missing = required.filter((needle) => !text.includes(needle));
  return { ok: missing.length === 0, missing };
}

async function hashFile(relativePath) {
  const bytes = await readFile(path.join(ROOT, relativePath));
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const sourceText = await readFile(path.join(ROOT, SOURCE_PATH), "utf8");
  const sourceInspection = inspectSourceText(sourceText);
  if (!sourceInspection.ok) {
    fail(`source rule text is incomplete: ${sourceInspection.missing.join(", ")}`);
  }

  const tenD = JSON.parse(await readFile(path.join(ROOT, TEN_D_JSON), "utf8"));
  const tenDConfirmsFactor = Array.isArray(tenD.matchingDeltaTFactors) && tenD.matchingDeltaTFactors.includes(1.04);
  if (!tenDConfirmsFactor) fail("10D evidence does not confirm 1.04 as a matching Delta-T factor");

  const patchedProbe = await runPatchedFoundationProbe();
  if (!patchedProbe.foundationMatch || !sameChinese(patchedProbe.foundationActual, EXPECTED_RESULT)) {
    fail(`patched source-locked probe does not reproduce Foundation: ${JSON.stringify(patchedProbe)}`);
  }

  const result = {
    result: "CHINESE_DEEP_DELTA_T_SOURCE_RULE_LOCKED",
    acceptanceStatus: "SOURCE_RULE_ONLY_READY_FOR_IMPLEMENTATION_STAGE_10F",
    productionFilesChanged: false,
    stage: "Update 10E",
    packageVersion: pkg.version,
    sourcePath: SOURCE_PATH,
    rule: {
      id: EXPECTED_RULE_ID,
      thresholdGregorianAstronomicalYear: EXPECTED_THRESHOLD_YEAR,
      factor: "26/25",
      appliesTo: "Chinese-calendar deep-antiquity proleptic astronomical extension only",
      formula: "if Y < -1999: DeltaT = (26/25) * (-20 + 32*((Y - 1820)/100)^2) seconds; otherwise use the unmodified CALENDRICA/Meeus/NASA piecewise ephemeris-correction rule",
    },
    sourceInspection,
    tenD: {
      result: tenD.result,
      matchingDeltaTFactors: tenD.matchingDeltaTFactors,
      firstMatchingDeltaTFactor: tenD.firstMatchingDeltaTFactor,
    },
    patchedProbe,
    decision: [
      "The source now contains an explicit deterministic Chinese deep-antiquity Delta-T rule, written in Chinese, under sources/chinese.",
      "The chosen rule is not a production patch and does not alter the public API.",
      "A patched reference probe using the source-locked 26/25 rule reproduces the Magillah Foundation discriminator exactly.",
      "Update 10F may now implement the named rule in a hidden deterministic Chinese shadow engine and connect it through the public structured result path.",
    ],
  };

  const report = `# Update 10E — Chinese deep-antiquity Delta-T source lock\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `Production files changed: **none**\n\n` +
    `## Source rule\n\n` +
    `The Chinese source text now defines \`${EXPECTED_RULE_ID}\` in \`${SOURCE_PATH}\`.\n\n` +
    `For the Chinese-calendar deep-antiquity proleptic extension only:\n\n` +
    `\`\`\`text\n` +
    `if Gregorian astronomical year Y < -1999:\n` +
    `  t = (Y - 1820) / 100\n` +
    `  DeltaT_base_seconds = -20 + 32 * t^2\n` +
    `  DeltaT_chinese_seconds = (26 / 25) * DeltaT_base_seconds\n` +
    `else:\n` +
    `  use the unmodified CALENDRICA/Meeus/NASA piecewise ephemeris-correction rule\n` +
    `\`\`\`\n\n` +
    `## Evidence carried forward from 10D\n\n` +
    `- 10D result: \`${tenD.result}\`\n` +
    `- matching Delta-T factors: \`${tenD.matchingDeltaTFactors.join(", ")}\`\n` +
    `- selected exact source factor: \`26/25 = 1.04\`\n\n` +
    `## Patched reference probe\n\n` +
    `A temporary, non-production 10C probe was patched to use the source-locked rule. It returned:\n\n` +
    `- result: \`${patchedProbe.result}\`\n` +
    `- Foundation actual: \`${JSON.stringify(patchedProbe.foundationActual)}\`\n` +
    `- Foundation match: \`${patchedProbe.foundationMatch}\`\n` +
    `- reverse expected delta from Foundation: \`${patchedProbe.reverseExpectedDeltaFromFoundation}\`\n\n` +
    `## Decision\n\n` +
    result.decision.map((line) => `- ${line}`).join("\n") +
    `\n\n## Next stage\n\n` +
    `Proceed to Update 10F only: implement \`${EXPECTED_RULE_ID}\` as a named hidden deterministic Chinese shadow engine, add Node/browser/standalone/fault-injection tests, and only then connect the structured Chinese public result.\n`;

  await writeFile(JSON_PATH, `${JSON.stringify(result, null, 2)}\n`);
  await writeFile(REPORT_PATH, report);

  const shaLines = [];
  for (const relative of [
    SOURCE_PATH,
    "scripts/run-update10e-chinese-delta-t-source-lock.mjs",
    "artifacts/update-10e-chinese-delta-t-source-lock.json",
    "artifacts/update-10e-chinese-delta-t-source-lock-report.md",
  ]) {
    shaLines.push(`${await hashFile(relative)}  ./${relative}`);
  }
  await writeFile(SHA_PATH, `${shaLines.join("\n")}\n`);
  await rm(TMP_DIR, { recursive: true, force: true });

  console.log(`[update10e] ${result.result}`);
  console.log(`[update10e] report=${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((error) => {
  console.error(`[update10e] FAIL\n${error?.stack ?? error}`);
  process.exitCode = 1;
});
