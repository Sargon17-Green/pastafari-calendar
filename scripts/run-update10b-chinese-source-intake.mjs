"use strict";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTIFACT_DIR = path.join(ROOT, "artifacts");
const REPORT_PATH = path.join(ARTIFACT_DIR, "update-10b-chinese-source-intake-report.md");
const JSON_PATH = path.join(ARTIFACT_DIR, "update-10b-chinese-source-intake.json");
const SHA_PATH = path.join(ARTIFACT_DIR, "update-10b-chinese-source-intake-sha256sums.txt");
const ZH_PATH = path.join(ROOT, "sources", "chinese", "农历规范算法.zh.md");

const FOUNDATION_FIXED = -15_055_671;
const FOUNDATION_JDN = -13_334_246n;
const FOUNDATION_EXPECTED = Object.freeze({
  cycle: -643,
  yearInCycle: 57,
  heavenlyStem: "geng",
  earthlyBranch: "shen",
  month: 1,
  leap: false,
  day: 22,
});

function serializeError(error) {
  return Object.freeze({ name: error?.name ?? "Error", message: error?.message ?? String(error) });
}

async function hashFile(relativePath) {
  const bytes = await readFile(path.join(ROOT, relativePath));
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function sameChinese(a, b) {
  return a && b
    && a.cycle === b.cycle
    && a.yearInCycle === b.yearInCycle
    && a.heavenlyStem === b.heavenlyStem
    && a.earthlyBranch === b.earthlyBranch
    && a.month === b.month
    && a.leap === b.leap
    && a.day === b.day;
}

function runPublicFoundationProbe(api) {
  try {
    const value = api.chineseToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }));
    return Object.freeze({ ok: true, value: String(value) });
  } catch (error) {
    return Object.freeze({ ok: false, error: serializeError(error) });
  }
}

function runIntlDirectProbe() {
  try {
    const iso = "-041221-12-22T00:00:00.000Z";
    const date = new Date(iso);
    const fmt = new Intl.DateTimeFormat("en-u-ca-chinese-nu-latn", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const parts = fmt.formatToParts(date);
    const record = Object.fromEntries(parts.filter((p) => p.type !== "literal").map((p) => [p.type, p.value]));
    return Object.freeze({ ok: true, iso, format: fmt.format(date), record, parts });
  } catch (error) {
    return Object.freeze({ ok: false, error: serializeError(error) });
  }
}

function runCandidatePortProbe() {
  // This is deliberately not production code. It is the bounded result of the
  // first source-intake experiment: a deterministic, non-Intl, Meeus/Calendrica-
  // shaped probe. Because it does not reproduce the Magillah Foundation anchor,
  // the script reports BLOCKED rather than silently accepting it.
  const candidate = Object.freeze({
    cycle: -643,
    yearInCycle: 57,
    heavenlyStem: "geng",
    earthlyBranch: "shen",
    month: 2,
    leap: false,
    day: 23,
  });
  return Object.freeze({
    ok: true,
    candidate,
    expected: FOUNDATION_EXPECTED,
    match: sameChinese(candidate, FOUNDATION_EXPECTED),
    classification: "DETERMINISTIC_NON_INTL_CANDIDATE_BUT_NOT_NORMATIVE",
  });
}

async function main() {
  await mkdir(ARTIFACT_DIR, { recursive: true });
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const api = await import(path.join(ROOT, "src", "public-api.js"));
  const zhText = await readFile(ZH_PATH, "utf8");

  const result = {
    result: "SOURCE_SELECTED_BUT_REPAIR_BLOCKED_UNTIL_EXACT_CALENDRICA_PORT",
    acceptanceStatus: "NOT_ACCEPTED_AS_UPDATE_10_REPAIR",
    commitSha: "fae94d044a2449da9ee767d89d285c483c0a2be8",
    packageVersion: pkg.version,
    sourceSelection: {
      normativeOfficialStandard: {
        id: "GB/T 33661-2017",
        chineseTitle: "农历的编算和颁行",
        englishTitle: "Calculation and promulgation of the Chinese calendar",
        status: "现行",
        publicationDate: "2017-05-12",
        implementationDate: "2017-09-01",
        authority: "中国科学院",
        copyrightHandling: "Do not copy the standard text verbatim into the repository without an explicit license clearance.",
      },
      copyableAlgorithmSource: {
        id: "CALENDRICA 4.0",
        authors: ["Edward M. Reingold", "Nachum Dershowitz"],
        repository: "EdReingold/calendar-code2",
        file: "calendar.l",
        license: "Apache-2.0",
        requiredPortFamilies: [
          "chinese-date",
          "chinese-location",
          "current-major-solar-term",
          "chinese-new-moon-before",
          "chinese-new-moon-on-or-after",
          "chinese-new-year-in-sui",
          "chinese-from-fixed",
          "fixed-from-chinese",
          "chinese-prior-leap-month?",
          "chinese-sexagesimal-name",
        ],
      },
    },
    chineseAlgorithmText: {
      path: "sources/chinese/农历规范算法.zh.md",
      language: "zh-Hans",
      sha256: await hashFile("sources/chinese/农历规范算法.zh.md"),
      byteLength: Buffer.byteLength(zhText, "utf8"),
      copyrightStatus: "project-authored Chinese algorithm text; not a verbatim GB/T copy",
    },
    foundation: {
      fixedDay: FOUNDATION_FIXED,
      jdn: String(FOUNDATION_JDN),
      expected: FOUNDATION_EXPECTED,
    },
    probes: {
      publicFoundation: runPublicFoundationProbe(api),
      directIntlFoundation: runIntlDirectProbe(),
      candidatePortFoundation: runCandidatePortProbe(),
    },
    decision: {
      canPatchProductionNow: false,
      reason: [
        "The source is now selected, but the first deterministic non-Intl candidate does not reproduce the Foundation discriminator.",
        "Copying the official GB/T algorithm text verbatim is blocked by the official copyright notice unless a license clearance is supplied.",
        "A production shadow engine must be an exact CALENDRICA/GB/T port, independently verified against the Magillah Foundation anchor, before it can replace the structured truth under the legacy Intl wrapper.",
      ],
      nextStep: "Perform an exact Apache-2.0 CALENDRICA port of the Chinese astronomical primitives, then run Foundation/neighbors/cycle/leap/random/Intl-fault tests before touching production Chinese exports.",
    },
  };

  const report = `# Update 10B — Chinese normative source intake\n\n` +
    `Result: **${result.result}**\n\n` +
    `Acceptance: **${result.acceptanceStatus}**\n\n` +
    `## Revision\n\n` +
    `- commit SHA: \`${result.commitSha}\`\n` +
    `- package version: \`${result.packageVersion}\`\n\n` +
    `## Source selection\n\n` +
    `- Official normative standard: **GB/T 33661-2017 — 农历的编算和颁行**.\n` +
    `- Copyable implementation source: **CALENDRICA 4.0**, Edward M. Reingold and Nachum Dershowitz, Apache-2.0.\n` +
    `- Repository Chinese algorithm text: \`sources/chinese/农历规范算法.zh.md\`.\n\n` +
    `## Copyright boundary\n\n` +
    `The repository does not include a verbatim copy of GB/T 33661-2017. The Chinese text added here is project-authored wording in Chinese. The portable code source remains CALENDRICA/Apache-2.0.\n\n` +
    `## Foundation discriminator\n\n` +
    `- fixed day: \`${FOUNDATION_FIXED}\`\n` +
    `- JDN: \`${FOUNDATION_JDN}\`\n` +
    `- expected: \`${JSON.stringify(FOUNDATION_EXPECTED)}\`\n\n` +
    `## Probes\n\n` +
    `- public Foundation: \`${JSON.stringify(result.probes.publicFoundation)}\`\n` +
    `- direct Intl Foundation: \`${JSON.stringify(result.probes.directIntlFoundation)}\`\n` +
    `- candidate non-Intl port: \`${JSON.stringify(result.probes.candidatePortFoundation)}\`\n\n` +
    `## Decision\n\n` +
    `Production remains untouched. The exact repair is still blocked until the CALENDRICA astronomical primitives are ported exactly enough to reproduce the Magillah Foundation discriminator.\n`;

  await writeFile(JSON_PATH, `${JSON.stringify(result, null, 2)}\n`);
  await writeFile(REPORT_PATH, report);

  const shaLines = [];
  for (const relative of [
    "sources/chinese/农历规范算法.zh.md",
    "scripts/run-update10b-chinese-source-intake.mjs",
    "artifacts/update-10b-chinese-source-intake.json",
    "artifacts/update-10b-chinese-source-intake-report.md",
  ]) {
    shaLines.push(`${await hashFile(relative)}  ./${relative}`);
  }
  await writeFile(SHA_PATH, `${shaLines.join("\n")}\n`);
  console.log(`[update10b] ${result.result}`);
  console.log(`[update10b] report=${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((error) => {
  console.error(`[update10b] FAIL\n${error?.stack ?? error}`);
  process.exitCode = 1;
});
