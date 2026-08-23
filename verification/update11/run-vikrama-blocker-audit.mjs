"use strict";

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as publicApi from "../../src/public-api.js";
import * as browserCore from "../../browser/pastafari-calendar-core.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUTPUT = path.join(ROOT, "artifacts", "update-11-vikrama-blocker-evidence.json");

function stringify(value) {
  return JSON.stringify(value, (_, item) => (typeof item === "bigint" ? item.toString() : item), 2) + "\n";
}

async function listFiles(root) {
  const out = [];
  async function visit(relative) {
    const absolute = path.join(root, relative);
    for (const entry of await readdir(absolute, { withFileTypes: true })) {
      const next = path.join(relative, entry.name);
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      if (entry.isDirectory()) await visit(next);
      else if (entry.isFile()) out.push(next.split(path.sep).join("/"));
    }
  }
  await visit("");
  return out;
}

async function grepRepository(pattern) {
  const matches = [];
  for (const relative of await listFiles(ROOT)) {
    if (relative === "SHA256SUMS.txt" || relative.endsWith("/SHA256SUMS.txt")) continue;
    if (relative.startsWith("verification/update11/") || relative.startsWith("artifacts/update-11-")) continue;
    if (/\.(?:png|jpe?g|gif|webp|zip|tgz|woff2?|ttf|ico|pdf)$/iu.test(relative)) continue;
    const absolute = path.join(ROOT, ...relative.split("/"));
    const size = (await stat(absolute)).size;
    if (size > 8_000_000) continue;
    let text;
    try {
      text = await readFile(absolute, "utf8");
    } catch {
      continue;
    }
    if (pattern.test(text)) matches.push(relative);
  }
  return matches.sort();
}

function jdn(value) {
  return publicApi.hinduToJdn(value);
}

const foundation = publicApi.FOUNDATION_JDN;
const normativeDiscriminator = Object.freeze({
  provenance: "user-supplied Update 11 task / Magillah discriminator; not promoted to an algorithmic source",
  year: -41162,
  month: 8,
  monthName: "Kārttika",
  leapMonth: false,
  tithi: 16,
  leapTithi: false,
});

const oldLunarLiteral = new publicApi.OldHinduLunarDate(-41162n, 8, 16, false);
const oldSolarLiteral = new publicApi.OldHinduSolarDate(-41162n, 8, 16);
const shadowYear = -41162n + 3044n;
const oldLunarShadowTithi16 = new publicApi.OldHinduLunarDate(shadowYear, 8, 16, false);
const oldLunarShadowTithi13 = new publicApi.OldHinduLunarDate(shadowYear, 8, 13, false);

const publicNames = Object.keys(publicApi).sort();
const browserNames = Object.keys(browserCore).sort();
const vikramaNamePattern = /vikram(?:a|\s+samvat)?|ויקראמה/iu;

const repoVikramaMatches = await grepRepository(/Vikrama|Vikram\s+Samvat|Vikram(?!a)|ויקראמה/iu);
const repoHinduMatches = await grepRepository(/OldHindu|hindu-old-solar|hindu-old-lunar/iu);

const result = {
  update: 11,
  status: "BLOCKED_NORMATIVE_SOURCE_INCOMPLETE",
  readyForUpdate12: false,
  productionChanged: false,
  baseline: {
    repository: "Sargon17-Green/pastafari-calendar",
    branch: "main",
    commitSha: "ef7c5a3c1e5027c1bdc3703f4a4345de0be94e5c",
    packageVersion: JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8")).version,
    foundationJdn: foundation,
  },
  inventory: {
    packageRootHinduExports: publicNames.filter((name) => /Hindu/u.test(name)),
    packageRootVikramaExports: publicNames.filter((name) => vikramaNamePattern.test(name)),
    browserCoreHinduExports: browserNames.filter((name) => /Hindu/u.test(name)),
    browserCoreVikramaExports: browserNames.filter((name) => vikramaNamePattern.test(name)),
    repositoryFilesContainingVikramaName: repoVikramaMatches,
    repositoryFilesContainingOldHinduIdentifiers: repoHinduMatches,
    docsCalendarIds: ["hindu-old-solar", "hindu-old-lunar"],
  },
  discriminator: normativeDiscriminator,
  existingConverters: {
    oldHinduLunarLiteral: {
      input: { year: -41162, month: 8, tithiLikeDay: 16, leapMonth: false },
      jdn: jdn(oldLunarLiteral),
      differenceFromFoundation: jdn(oldLunarLiteral) - foundation,
    },
    oldHinduSolarLiteral: {
      input: { year: -41162, month: 8, day: 16 },
      jdn: jdn(oldSolarLiteral),
      differenceFromFoundation: jdn(oldSolarLiteral) - foundation,
    },
  },
  epochShiftDiagnostic: {
    note: "3044 is the CALENDRICA traditional Hindu lunar era displacement candidate. This diagnostic does not make it normative for this project.",
    shadowYear,
    tithi16: {
      jdn: jdn(oldLunarShadowTithi16),
      differenceFromFoundation: jdn(oldLunarShadowTithi16) - foundation,
    },
    tithi13: {
      jdn: jdn(oldLunarShadowTithi13),
      differenceFromFoundation: jdn(oldLunarShadowTithi13) - foundation,
    },
    conclusion: "A year/epoch relabel alone is insufficient: the shadow-year tithi-16 lands three days after Foundation, while tithi-13 lands on Foundation.",
  },
  candidateReference: {
    id: "CALENDRICA_4_TRADITIONAL_HINDU_LUNAR_VIKRAMA_CANDIDATE",
    normative: false,
    source: "Ed Reingold calendar-code2, calendar.l, modern/traditional Hindu lunar functions; hindu-lunar-era = 3044",
    sourceCommit: "9afc1f3277b839db1a70c2350d6c708ac83df78f",
    foundationMatchStatus: "RECORDED_FROM_PRIOR_DIAGNOSTIC; NOT RECOMPUTED BY THIS BLOCKER RUNNER",
    recordedFoundationResult: normativeDiscriminator,
    warning: "The Magillah is present and supplies the Foundation discriminator, but footnotes [^2] and [^7] explicitly say the algorithm/version used is part of the date definition and that multiple Hindu methods exist; it does not identify the exact algorithm/version needed to reproduce all dates.",
  },
  magillah: {
    canonicalPath: "sources/מגילת העיתים.md",
    foundationRule: "Hindu: Vikrama year -41,162; Kārttika; lunar day 16; month and day non-leap.",
    footnote2: "Algorithmic extension is not a unique standard method; the algorithm and version used are part of the date definition.",
    footnote7: "The Hindu date is proleptic according to the Hindu computation method used here; multiple Hindu methods/rules exist and the result is not a unique agreed conversion.",
    footnote11: "Signed integer year numbering includes year zero between 1 and -1.",
    conclusion: "The Magillah gives an exact Foundation anchor and year-zero convention, but does not name or specify the Hindu algorithm/version in enough detail to compute arbitrary Vikrama dates independently.",
  },
  blocker: {
    missingNormativeFields: [
      "algorithm/version identity",
      "epoch definition",
      "year boundary (Caitra/Kārttika or other)",
      "amānta/pūrṇimānta convention",
      "civil-day/tithi assignment rule (including sunrise rule if any)",
      "tithi formula and rounding semantics",
      "leap-month rule",
      "repeated/omitted tithi rule",
      "negative-year floor/mod semantics inside the Hindu algorithm",
    ],
    decision: "Do not add a public Vikrama converter until a project-normative source selects these semantics. Old Hindu converters are demonstrably not aliases for the supplied Foundation discriminator.",
  },
};

await writeFile(OUTPUT, stringify(result));
process.stdout.write(stringify(result));
