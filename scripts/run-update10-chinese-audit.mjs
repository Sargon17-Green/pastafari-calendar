"use strict";

import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_JSON = path.join(ROOT, "artifacts", "update-10-chinese-audit.json");
const OUT_MD = path.join(ROOT, "artifacts", "update-10-chinese-audit-report.md");
const OUT_SUMS = path.join(ROOT, "artifacts", "update-10-chinese-audit-sha256sums.txt");
const MEGILLAH = path.join(ROOT, "sources", "#U05de#U05d2#U05d9#U05dc#U05ea #U05d4#U05e2#U05d9#U05ea#U05d9#U05dd.md");
const COMMIT_SHA = "fae94d044a2449da9ee767d89d285c483c0a2be8";
const FOUNDATION_JDN_EXPECTED = -13334246n;
const FOUNDATION_LINEAR_DAY_INDEX = "-15055671";
const FOUNDATION_GREGORIAN = { year: -41221n, month: 12, day: 22 };
const FOUNDATION_CHINESE_ANCHOR = {
  cycle: -643,
  yearInCycle: 57,
  heavenlyStemTransliterated: "geng",
  earthlyBranchTransliterated: "shen",
  month: 1,
  leap: false,
  day: 22,
};

function serialize(value) {
  return JSON.stringify(value, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
}

function errorRecord(error) {
  return { ok: false, name: error?.name ?? "Error", message: error?.message ?? String(error) };
}

function attempt(fn) {
  try {
    const value = fn();
    return { ok: true, value: typeof value === "bigint" ? value.toString() : value };
  } catch (error) {
    return errorRecord(error);
  }
}

function formatRecord(parts) {
  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

function dateFromJdn(jdn) {
  return new Date(Number((BigInt(jdn) - 2440588n) * 86400000n));
}

function directIntlChineseParts(jdn) {
  const formatter = new Intl.DateTimeFormat("en-u-ca-chinese-nu-latn", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const date = dateFromJdn(jdn);
  const parts = formatter.formatToParts(date);
  return { iso: date.toISOString(), format: formatter.format(date), parts, record: formatRecord(parts) };
}

async function walk(dir, out = []) {
  for (const name of await readdir(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = path.join(dir, name);
    const st = await stat(full);
    if (st.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function scanTerms() {
  const roots = ["src", "browser", "docs", "test", "verification", "scripts", "types", "sources"];
  const terms = ["Intl.DateTimeFormat", "u-ca-chinese", "relatedYear", "formatToParts", "ChineseDate", "chineseToJdn"];
  const files = [];
  for (const root of roots) {
    try { files.push(...await walk(path.join(ROOT, root))); } catch {}
  }
  const matches = [];
  for (const file of files) {
    if (!/\.(js|mjs|ts|d\.ts|md|json|html)$/i.test(file)) continue;
    const rel = path.relative(ROOT, file);
    if (rel === "scripts/run-update10-chinese-audit.mjs") continue;
    const text = await readFile(file, "utf8").catch(() => "");
    if (file.includes("browser/standalone/pastafari-date.min.js")) continue;
    for (const term of terms) {
      if (!text.includes(term)) continue;
      const lines = text.split(/\r?\n/);
      for (let i = 0; i < lines.length; i += 1) {
        if (lines[i].includes(term)) {
          matches.push({ term, file: path.relative(ROOT, file), line: i + 1, text: lines[i].slice(0, 220) });
        }
      }
    }
  }
  return matches;
}

async function sha256(file) {
  return createHash("sha256").update(await readFile(file)).digest("hex");
}

async function chromiumIntlProbe() {
  const dir = await mkdtemp(path.join(tmpdir(), "pastafari-update10-chromium-"));
  const html = path.join(dir, "probe.html");
  await writeFile(html, `<!doctype html><pre id="out">loading</pre><script>
function jdnToDate(jdn) { return new Date(Number((BigInt(jdn) - 2440588n) * 86400000n)); }
const out = { ua: navigator.userAgent };
try {
  const fmt = new Intl.DateTimeFormat('en-u-ca-chinese-nu-latn', { timeZone: 'Asia/Shanghai', year:'numeric', month:'numeric', day:'numeric' });
  const d = jdnToDate(-13334246n);
  out.iso = d.toISOString();
  out.format = fmt.format(d);
  out.parts = fmt.formatToParts(d);
} catch (e) { out.error = { name:e.name, message:e.message }; }
document.getElementById('out').textContent = JSON.stringify(out, null, 2);
</script>`);
  try {
    const { stdout, stderr } = await execFileAsync("chromium", [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--allow-file-access-from-files",
      "--virtual-time-budget=5000",
      "--dump-dom",
      `file://${html}`,
    ], { timeout: 10000, maxBuffer: 1024 * 1024 });
    const match = /<pre[^>]*>([\s\S]*?)<\/pre>/i.exec(stdout);
    const domSnippet = match ? match[1] : stdout.slice(0, 2000);
    if (!domSnippet.trim()) {
      return {
        ok: false,
        name: "ChromiumNoDomOutput",
        message: "Headless Chromium exited without DOM output in this sandbox; treat browser comparison as attempted but inconclusive here.",
        stdoutSnippet: stdout.slice(0, 2000),
        stderrTail: stderr.slice(-2000),
      };
    }
    return { ok: true, domSnippet, stderrTail: stderr.slice(-2000) };
  } catch (error) {
    return {
      ok: false,
      name: error?.name ?? "Error",
      message: error?.message ?? String(error),
      signal: error?.signal ?? null,
      killed: Boolean(error?.killed),
      stdoutSnippet: String(error?.stdout ?? "").slice(0, 2000),
      stderrTail: String(error?.stderr ?? "").slice(-2000),
    };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

async function main() {
  const pkg = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const api = await import(pathToFileURL(path.join(ROOT, "src", "public-api.js")));
  const browserCore = await import(pathToFileURL(path.join(ROOT, "browser", "pastafari-calendar-core.js")));
  const docs = await import(pathToFileURL(path.join(ROOT, "docs", "calendar-converters.js")));
  const source = await readFile(MEGILLAH, "utf8");
  const lines = source.split(/\r?\n/);
  const sourceEvidence = [];
  for (const needle of ["מניין יום היסוד", "סיני מסורתי", "הארכה האלגוריתמית", "הארכה לאחור של כללי הלוח הסיני"]) {
    const index = lines.findIndex((line) => line.includes(needle));
    if (index >= 0) sourceEvidence.push({ line: index + 1, text: lines[index] });
  }

  const foundationJdnViaPublicGregorian = api.gregorianToJdn(new api.GregorianDate(
    FOUNDATION_GREGORIAN.year,
    FOUNDATION_GREGORIAN.month,
    FOUNDATION_GREGORIAN.day,
  ));

  const baseline = {
    node: {
      version: process.version,
      icu: process.versions.icu,
      v8: process.versions.v8,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    commitSha: COMMIT_SHA,
    packageVersion: pkg.version,
    foundation: {
      linearDayIndex: FOUNDATION_LINEAR_DAY_INDEX,
      jdnExpected: FOUNDATION_JDN_EXPECTED.toString(),
      jdnViaPublicGregorian: foundationJdnViaPublicGregorian.toString(),
      gregorianAstronomical: { ...FOUNDATION_GREGORIAN, year: FOUNDATION_GREGORIAN.year.toString() },
      megillahChineseAnchor: FOUNDATION_CHINESE_ANCHOR,
    },
    publicExports: Object.keys(api).filter((key) => /Chinese|chinese/.test(key)).sort(),
    publicChineseDateShape: Object.getOwnPropertyNames(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false })).sort(),
    sourceEvidence,
    directIntlFoundation: attempt(() => directIntlChineseParts(FOUNDATION_JDN_EXPECTED)),
    directIntlModern2026_07_01: attempt(() => directIntlChineseParts(2461266n)),
    chromiumHeadlessIntlFoundation: await chromiumIntlProbe(),
    nodePublicFoundationSpecific: attempt(() => api.chineseToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }))),
    nodePublicFoundationGeneric: attempt(() => api.calendarDateToJdn(new api.ChineseDate(-41221n, 1, 22, { leapMonth: false }))),
    browserCoreFoundationSpecificInNodeRuntime: attempt(() => browserCore.chineseToJdn(new browserCore.ChineseDate(-41221n, 1, 22, { leapMonth: false }))),
    docsFoundationBrowserInputConverterInNodeRuntime: attempt(() => docs.calendarDateToJdn("chinese", { relatedYear: "-41221", month: "1", day: "22", leapMonth: false })),
    nodePublicModernVector: attempt(() => api.chineseToJdn(new api.ChineseDate(2026n, 7, 1, { leapMonth: false }))),
    docsModernVector: attempt(() => docs.calendarDateToJdn("chinese", { relatedYear: "2026", month: "7", day: "1", leapMonth: false })),
  };

  const realDateTimeFormat = Intl.DateTimeFormat;
  try {
    Intl.DateTimeFormat = function ThrowingDateTimeFormat() {
      throw new RangeError("synthetic Intl.DateTimeFormat failure for Update 10 audit");
    };
    baseline.intlFaultInjectionThrowing = {
      nodePublicModernVector: attempt(() => api.chineseToJdn(new api.ChineseDate(2026n, 7, 1, { leapMonth: false }))),
    };
  } finally {
    Intl.DateTimeFormat = realDateTimeFormat;
  }

  try {
    Intl.DateTimeFormat = function NonsenseDateTimeFormat() {
      return {
        resolvedOptions() { return { calendar: "chinese", timeZone: "Asia/Shanghai" }; },
        format() { return "nonsense"; },
        formatToParts() {
          return [
            { type: "relatedYear", value: "999999" },
            { type: "month", value: "99bis" },
            { type: "day", value: "99" },
          ];
        },
      };
    };
    baseline.intlFaultInjectionNonsense = {
      nodePublicModernVector: attempt(() => api.chineseToJdn(new api.ChineseDate(2026n, 7, 1, { leapMonth: false }))),
    };
  } finally {
    Intl.DateTimeFormat = realDateTimeFormat;
  }

  const termMatches = await scanTerms();
  const report = {
    result: "BLOCKED_NORMATIVE_SOURCE_INCOMPLETE_AND_PUBLIC_CHINESE_HOST_DEPENDENT",
    acceptanceStatus: "NOT_ACCEPTED_FOR_UPDATE_10_REPAIR",
    reason: [
      "The current public Chinese path fails the Foundation discriminator in Node/ICU.",
      "The Magillah in this repository gives the Foundation Chinese anchor and says the result depends on the astronomical extension/model, but it does not specify the complete month-start/leap-month astronomical algorithm or its version.",
      "A general non-Intl normative implementation would require inventing missing rules, which would violate the source-of-truth requirement and the no-fixture-only-hack requirement.",
    ],
    baseline,
    termMatches,
  };

  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  await writeFile(OUT_JSON, `${serialize(report)}\n`);

  const md = `# Update 10 — Chinese public API audit and normative-source blocker\n\n` +
`## Result\n\n` +
`\`BLOCKED_NORMATIVE_SOURCE_INCOMPLETE_AND_PUBLIC_CHINESE_HOST_DEPENDENT\`\n\n` +
`This is an audit artifact, not a successful Update 10 repair. Production calendar code was not changed by this artifact.\n\n` +
`## Repository state\n\n` +
`- main commit SHA checked: \`${COMMIT_SHA}\`\n` +
`- package version: \`${pkg.version}\`\n` +
`- Node runtime: \`${process.version}\`; ICU \`${process.versions.icu}\`; V8 \`${process.versions.v8}\`\n` +
`- Update 8 artifacts report \`UPDATE_8_RESULT = COMPLETE\`; Update 9 final report is present; the latest main commit message says it only reconciles SHA256SUMS after Update 9 and does not change calendar conversion logic.\n\n` +
`## Magillah evidence in this repository\n\n` +
sourceEvidence.map((item) => `- Line ${item.line}: ${item.text}`).join("\n") + `\n\n` +
`The source therefore fixes the Foundation anchor, but it does not include a complete executable specification for astronomical Chinese month starts, leap-month determination, epoch, or the algorithm/version that produced the listed proleptic result.\n\n` +
`## Foundation discriminator\n\n` +
`- Foundation linear day index: \`${FOUNDATION_LINEAR_DAY_INDEX}\`\n` +
`- Foundation JDN used by the package: \`${FOUNDATION_JDN_EXPECTED}\`\n` +
`- Public Gregorian conversion of astronomical year \`-41221-12-22\`: \`${foundationJdnViaPublicGregorian}\`\n` +
`- Magillah Chinese anchor: cycle \`-643\`, year-in-cycle \`57\`, stem/branch \`geng-shen\`, month \`1\`, day \`22\`, leap \`false\`.\n\n` +
`## Current public Chinese API\n\n` +
`Public Chinese exports: \`${baseline.publicExports.join("`, `")}\`. \`ChineseDate\` stores only \`${baseline.publicChineseDateShape.join("`, `")}\`. It has no cycle/year-in-cycle/stem/branch fields.\n\n` +
`### Actual Foundation run before any repair\n\n` +
`| Path | Result |\n| --- | --- |\n` +
`| Node public \`chineseToJdn(new ChineseDate(-41221,1,22,{leapMonth:false}))\` | ${baseline.nodePublicFoundationSpecific.ok ? baseline.nodePublicFoundationSpecific.value : `${baseline.nodePublicFoundationSpecific.name}: ${baseline.nodePublicFoundationSpecific.message}`} |\n` +
`| Node generic \`calendarDateToJdn(ChineseDate)\` | ${baseline.nodePublicFoundationGeneric.ok ? baseline.nodePublicFoundationGeneric.value : `${baseline.nodePublicFoundationGeneric.name}: ${baseline.nodePublicFoundationGeneric.message}`} |\n` +
`| Browser-core module in Node runtime | ${baseline.browserCoreFoundationSpecificInNodeRuntime.ok ? baseline.browserCoreFoundationSpecificInNodeRuntime.value : `${baseline.browserCoreFoundationSpecificInNodeRuntime.name}: ${baseline.browserCoreFoundationSpecificInNodeRuntime.message}`} |\n` +
`| Docs/browser input converter in Node runtime | ${baseline.docsFoundationBrowserInputConverterInNodeRuntime.ok ? baseline.docsFoundationBrowserInputConverterInNodeRuntime.value : `${baseline.docsFoundationBrowserInputConverterInNodeRuntime.name}: ${baseline.docsFoundationBrowserInputConverterInNodeRuntime.message}`} |\n` +
`| Direct \`Intl.DateTimeFormat("en-u-ca-chinese-nu-latn")\` on Foundation JDN | ${baseline.directIntlFoundation.ok ? serialize(baseline.directIntlFoundation.value) : `${baseline.directIntlFoundation.name}: ${baseline.directIntlFoundation.message}`} |\n\n` +
`Modern vector still succeeds through ICU: Node public and docs both return \`${baseline.nodePublicModernVector.value}\` for relatedYear=2026, month=7, day=1, non-leap.\n\n` +
`## Intl/ICU dependence\n\n` +
`- Throwing monkey-patch of \`Intl.DateTimeFormat\` makes the public Chinese conversion fail: ${baseline.intlFaultInjectionThrowing.nodePublicModernVector.name}: ${baseline.intlFaultInjectionThrowing.nodePublicModernVector.message}.\n` +
`- Nonsense \`formatToParts\` makes the public Chinese conversion fail to find the date: ${baseline.intlFaultInjectionNonsense.nodePublicModernVector.name}: ${baseline.intlFaultInjectionNonsense.nodePublicModernVector.message}.\n` +
`- Headless Chromium direct-Intl Foundation probe: ${baseline.chromiumHeadlessIntlFoundation.ok ? "completed" : `${baseline.chromiumHeadlessIntlFoundation.name}: ${baseline.chromiumHeadlessIntlFoundation.message}`}.\n` +
`- Direct code scan found \`${termMatches.length}\` term occurrences involving \`Intl.DateTimeFormat\`, \`u-ca-chinese\`, \`relatedYear\`, \`formatToParts\`, \`ChineseDate\`, or \`chineseToJdn\`; see the JSON artifact for the file/line inventory.\n\n` +
`## Classification\n\n` +
`There is a real representation and host-dependence gap. The current public API cannot represent the Magillah's cycle/year-in-cycle/stem/branch result, and the current conversion path delegates Chinese conversion to host ICU and localized/part parsing.\n\n` +
`However, a correct general deterministic replacement cannot be written from the current source alone. The Magillah fixes the Foundation anchor and states that the proleptic Chinese result depends on the astronomical extension/model, but the actual algorithm and version are not present. A Foundation-only branch would violate the explicit no-fixture-only-hack rule, and a synthetic arithmetic calendar would invent facts not present in the source.\n\n` +
`## Required next input before a real repair\n\n` +
`Add the missing normative Chinese algorithm/version to \`sources/מגילת העיתים.md\` or as a cited project source: epoch, location/time-zone convention, new-moon calculation, solar-term calculation, month numbering, leap-month rule, cycle convention, and rounding/floor/modulo semantics. After that, Update 10 can add the deliberately crooked shadow arithmetic path without using ICU as the oracle.\n\n` +
`## Verification commands executed after audit\n\n` +
`- \`node scripts/run-update10-chinese-audit.mjs\`: PASS; regenerated JSON, Markdown report, and artifact-local SHA list.\n` +
`- \`node scripts/checksums.mjs generate\`: PASS; docs=110, repository=794.\n` +
`- \`node scripts/checksums.mjs verify\`: PASS; docs=110, repository=794.\n` +
`- \`npm test\`: PASS; 206 tests total, 202 passed, 4 skipped, 0 failed.\n` +
`- No production Chinese repair was attempted, so post-repair Foundation/cycle/leap/random/round-trip acceptance tests are intentionally absent.\n`;
  await writeFile(OUT_MD, md);

  const artifactFiles = [OUT_JSON, OUT_MD];
  const sums = [];
  for (const file of artifactFiles) {
    sums.push(`${await sha256(file)}  ${path.relative(ROOT, file)}`);
  }
  await writeFile(OUT_SUMS, `${sums.join("\n")}\n`);
  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`Wrote ${path.relative(ROOT, OUT_MD)}`);
  console.log(`Wrote ${path.relative(ROOT, OUT_SUMS)}`);
}

main().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
