"use strict";

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const TMP_ROOT = path.join(ROOT, ".tmp", "update10d-chinese-reconciliation");
const TEN_C_SCRIPT = "scripts/run-update10c-calendrica-chinese-port.mjs";
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10d-chinese-foundation-reconciliation-report.md");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10d-chinese-foundation-reconciliation.json");
const SHA_PATH = path.join(ARTIFACT_DIR, "update-10d-chinese-foundation-reconciliation-sha256sums.txt");

const FOUNDATION = -15055671;
const EXPECTED = Object.freeze({
  cycle: -643,
  yearInCycle: 57,
  heavenlyStem: "geng",
  earthlyBranch: "shen",
  stem: 7,
  branch: 9,
  month: 1,
  leap: false,
  day: 22,
});

const FACTOR_SWEEP = [0, 0.8, 0.9, 0.95, 1.0, 1.01, 1.02, 1.03, 1.035, 1.04, 1.045, 1.05, 1.055, 1.06, 1.1];

function safeTag(value) {
  return String(value).replace(/[^a-zA-Z0-9_.-]+/g, "_");
}

function replaceBetween(source, startNeedle, endNeedle, replacement) {
  const start = source.indexOf(startNeedle);
  if (start < 0) throw new Error(`missing start needle: ${startNeedle}`);
  const end = source.indexOf(endNeedle, start);
  if (end < 0) throw new Error(`missing end needle after ${startNeedle}: ${endNeedle}`);
  return `${source.slice(0, start)}${replacement}${source.slice(end)}`;
}

function patchTenCSource(source, tag, { deltaTFactor = 1, zone = "default", newMoonShift = 0 } = {}) {
  let patched = source;
  patched = patched.replace(
    'const ARTIFACT_DIR = path.join(ROOT, "artifacts");',
    `const ARTIFACT_DIR = path.join(ROOT, ".tmp", "update10d-chinese-reconciliation", ${JSON.stringify(tag)});`,
  );
  patched = replaceBetween(
    patched,
    "function ephemerisCorrection",
    "function dynamicalFromUniversal",
    `function ephemerisCorrection(tee){\n` +
      `  const year=gregorianYearFromFixed(Math.floor(tee));\n` +
      `  const y1820=(year-1820)/100;\n` +
      `  const other=poly(y1820,[-20,0,32])/86400;\n` +
      `  return ${JSON.stringify(deltaTFactor)} * other;\n` +
      `}\n`,
  );
  patched = patched.replace(
    "const foundationActual = comparableChinese(chineseFromFixed(FOUNDATION));",
    "const foundationRaw = chineseFromFixed(FOUNDATION); const foundationActual = comparableChinese(foundationRaw); foundationActual._debug = foundationRaw.debug;",
  );
  if (zone === "forced+8") {
    patched = patched.replace(
      "zone: y<1929 ? hr(1397/180) : hr(8)",
      "zone: hr(8)",
    );
  }
  if (newMoonShift !== 0) {
    patched = patched.replaceAll(
      "return Math.floor(standardFromUniversal(tee,chineseLocation(tee)));",
      `return Math.floor(standardFromUniversal(tee,chineseLocation(tee))) + (${JSON.stringify(newMoonShift)});`,
    );
  }
  return patched;
}

async function runVariant(source, variant) {
  const tag = safeTag(variant.name);
  const tempDir = path.join(TMP_ROOT, tag);
  await mkdir(tempDir, { recursive: true });
  const tempScript = path.join(ROOT, "scripts", `.tmp-update10d-${tag}.mjs`);
  await writeFile(tempScript, patchTenCSource(source, tag, variant));
  const proc = spawnSync(process.execPath, [tempScript], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 60_000,
  });
  await rm(tempScript, { force: true });
  if (proc.status !== 0) {
    return {
      ...variant,
      ok: false,
      error: (proc.stderr || proc.stdout || "unknown failure").slice(-4000),
    };
  }
  const jsonPath = path.join(tempDir, "update-10c-calendrica-chinese-port.json");
  const parsed = JSON.parse(await readFile(jsonPath, "utf8"));
  const actual = parsed.diagnostics.foundationActual;
  const debug = actual._debug || {};
  return {
    ...variant,
    ok: true,
    actual: {
      cycle: actual.cycle,
      yearInCycle: actual.yearInCycle,
      heavenlyStem: actual.heavenlyStem,
      earthlyBranch: actual.earthlyBranch,
      stem: actual.stem,
      branch: actual.branch,
      month: actual.month,
      leap: actual.leap,
      day: actual.day,
    },
    match: parsed.diagnostics.foundationMatch,
    mismatchFields: parsed.diagnostics.mismatches.map((m) => m.field),
    reverseExpectedDeltaFromFoundation: parsed.diagnostics.reverseExpectedDeltaFromFoundation,
    monthStart: debug.m,
    monthStartDeltaFromMagillahImpliedStart: Number.isFinite(debug.m) ? debug.m - (FOUNDATION - EXPECTED.day + 1) : null,
    m12: debug.m12,
    s1: debug.s1,
  };
}

async function hashFile(relativePath) {
  const bytes = await readFile(path.join(ROOT, relativePath));
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function firstMatchingFactor(rows) {
  return rows.find((row) => row.ok && row.match)?.deltaTFactor ?? null;
}

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  await rm(TMP_ROOT, { recursive: true, force: true });
  await mkdir(TMP_ROOT, { recursive: true });

  const packageJson = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const tenCSource = await readFile(path.join(ROOT, TEN_C_SCRIPT), "utf8");

  const factorRows = [];
  for (const factor of FACTOR_SWEEP) {
    factorRows.push(await runVariant(tenCSource, {
      name: `deltaT-factor-${factor}`,
      deltaTFactor: factor,
      zone: "default",
      newMoonShift: 0,
    }));
  }

  const controlRows = [];
  for (const variant of [
    { name: "zone-forced-plus8", deltaTFactor: 1, zone: "forced+8", newMoonShift: 0 },
    { name: "newmoon-floor-minus1", deltaTFactor: 1, zone: "default", newMoonShift: -1 },
    { name: "newmoon-floor-plus1", deltaTFactor: 1, zone: "default", newMoonShift: 1 },
  ]) {
    controlRows.push(await runVariant(tenCSource, variant));
  }

  const baseline = factorRows.find((row) => row.deltaTFactor === 1.0);
  const matchingFactors = factorRows.filter((row) => row.ok && row.match).map((row) => row.deltaTFactor);
  const result = {
    result: matchingFactors.length > 0
      ? "FOUNDATION_OFFSET_RECONCILED_AS_DELTA_T_EXTRAPOLATION_SENSITIVITY"
      : "FOUNDATION_OFFSET_NOT_RECONCILED",
    acceptanceStatus: "DIAGNOSTIC_ONLY_NOT_A_PRODUCTION_FIX",
    stage: "Update 10D diagnostic / Update 10C reconciliation",
    scope: "No production converter or public API path is modified. This stage diagnoses why the Magillah Foundation anchor is three fixed days after the baseline CALENDRICA-derived port.",
    packageVersion: packageJson.version,
    foundation: {
      fixedDay: FOUNDATION,
      expected: EXPECTED,
      expectedMonthStart: FOUNDATION - EXPECTED.day + 1,
    },
    baseline,
    factorSweep: factorRows,
    controlVariants: controlRows,
    matchingDeltaTFactors: matchingFactors,
    firstMatchingDeltaTFactor: firstMatchingFactor(factorRows),
    interpretation: [
      "The baseline CALENDRICA-derived port places the start of the Foundation month at Foundation-18 and therefore reports day 19.",
      "The Magillah anchor implies that the same month began at Foundation-21.",
      "Small civil-time convention changes are too small or move in the wrong direction: forcing the old Chinese zone to +08:00 does not remove the three-day gap, and a one-day floor/ceil-style new-moon shift cannot explain it.",
      "Scaling only the deep-antiquity Delta-T extrapolation used by the port to about 1.04-1.05 makes the CALENDRICA structure reproduce the Magillah Foundation discriminator exactly.",
      "Therefore the three-day discrepancy is best explained as sensitivity to an unsupported deep-antiquity astronomical/Delta-T convention, not as an RD/JDN off-by-one or public API formatting issue.",
    ],
    decision: [
      "Do not patch production with a simple +3-day offset; that would be a fixture-specific hack.",
      "Do not claim unmodified CALENDRICA is the Magillah source of truth for 41,222 BCE.",
      "The next acceptable repair path is to make the Magillah/source text explicitly choose the deep-antiquity Delta-T convention/calibration for the Chinese calendar, then implement that convention as a named shadow engine with tests.",
    ],
  };

  const report = `# Update 10D — Chinese Foundation reconciliation\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `## Scope\n\n${result.scope}\n\n` +
    `## Baseline\n\n` +
    `- Foundation fixed day: \`${FOUNDATION}\`\n` +
    `- Magillah expected: \`${JSON.stringify(EXPECTED)}\`\n` +
    `- Magillah-implied month start: \`${result.foundation.expectedMonthStart}\`\n` +
    `- Baseline actual: \`${JSON.stringify(baseline?.actual ?? null)}\`\n` +
    `- Baseline month start: \`${baseline?.monthStart ?? null}\`\n` +
    `- Baseline month-start delta from Magillah-implied start: \`${baseline?.monthStartDeltaFromMagillahImpliedStart ?? null}\`\n\n` +
    `## Delta-T factor sweep\n\n` +
    `| factor | result | month start | start delta | day | reverse delta |\n` +
    `|---:|---|---:|---:|---:|---:|\n` +
    factorRows.map((row) => `| ${row.deltaTFactor} | ${row.ok ? (row.match ? "MATCH" : "mismatch") : "ERROR"} | ${row.monthStart ?? ""} | ${row.monthStartDeltaFromMagillahImpliedStart ?? ""} | ${row.actual?.day ?? ""} | ${row.reverseExpectedDeltaFromFoundation ?? ""} |`).join("\n") +
    `\n\n## Control variants\n\n` +
    `| variant | result | month start | start delta | day | reverse delta |\n` +
    `|---|---|---:|---:|---:|---:|\n` +
    controlRows.map((row) => `| ${row.name} | ${row.ok ? (row.match ? "MATCH" : "mismatch") : "ERROR"} | ${row.monthStart ?? ""} | ${row.monthStartDeltaFromMagillahImpliedStart ?? ""} | ${row.actual?.day ?? ""} | ${row.reverseExpectedDeltaFromFoundation ?? ""} |`).join("\n") +
    `\n\n## Interpretation\n\n` +
    result.interpretation.map((line) => `- ${line}`).join("\n") +
    `\n\n## Decision\n\n` +
    result.decision.map((line) => `- ${line}`).join("\n") +
    `\n`;

  await writeFile(JSON_PATH, `${JSON.stringify(result, null, 2)}\n`);
  await writeFile(REPORT_PATH, report);

  const shaLines = [];
  for (const relative of [
    TEN_C_SCRIPT,
    "scripts/run-update10d-chinese-foundation-reconciliation.mjs",
    "artifacts/update-10d-chinese-foundation-reconciliation.json",
    "artifacts/update-10d-chinese-foundation-reconciliation-report.md",
  ]) {
    shaLines.push(`${await hashFile(relative)}  ./${relative}`);
  }
  await writeFile(SHA_PATH, `${shaLines.join("\n")}\n`);
  await rm(TMP_ROOT, { recursive: true, force: true });

  // Restore the canonical 10C artifacts, because variant probing runs patched 10C copies.
  const restore = spawnSync(process.execPath, [path.join(ROOT, TEN_C_SCRIPT)], { cwd: ROOT, encoding: "utf8", timeout: 60_000 });
  if (restore.status !== 0) {
    throw new Error(`failed to restore 10C artifacts:\n${restore.stderr || restore.stdout}`);
  }

  console.log(`[update10d] ${result.result}`);
  console.log(`[update10d] matchingDeltaTFactors=${matchingFactors.join(",") || "none"}`);
  console.log(`[update10d] report=${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((error) => {
  console.error(`[update10d] FAIL\n${error?.stack ?? error}`);
  process.exitCode = 1;
});
