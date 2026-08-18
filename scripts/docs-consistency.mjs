"use strict";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectProjectFacts, exactPathStatus, stripQueryAndFragment } from "./docs-project-facts.mjs";

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED_FILE = "docs/DOCUMENTATION-CONSISTENCY.md";
const GENERATED_BEGIN = "<!-- BEGIN GENERATED: project-facts -->";
const GENERATED_END = "<!-- END GENERATED: project-facts -->";

export const DOCUMENT_CLASSES = Object.freeze({
  current: Object.freeze([
    "benchmarks/README.md",
    "docs/README.md",
    "docs/ACCESSIBILITY-TESTING.md",
    "docs/I18N.md",
    "docs/I18N-SUPPORT-LEVELS.md",
    "docs/ASTRONOMICAL-DAY.md",
    "docs/REVERSE-CONSTRAINTS.md",
    GENERATED_FILE,
    "browser/README.md",
    "implementations/README.md",
    "implementations/c/README.md",
    "implementations/cpp/README.md",
    "implementations/cobol/README.md",
    "implementations/cobol/VALIDATION.md",
    "implementations/java/README.md",
    "implementations/python/README.md",
    "implementations/ruby/README.md",
    "implementations/docs/LANGUAGES.md",
    "test/visual/README.md",
  ]),
  historical: Object.freeze([
    "CLEAN-ROOM-VALIDATION-2026-08-15.md",
    "I18N-BROWSER-AUDIT-2026-08-14.md",
    "I18N-BROWSER-AUDIT-VALIDATION-2026-08-15.md",
    "docs/FAST-ENGINE-SOAK-VALIDATION-2026-08-15.md",
    "implementations/docs/BENCHMARKS.md",
    "implementations/docs/CONFORMANCE.md",
    "implementations/docs/TEST_MATRIX.md",
    "verification/README.md",
    "verification/evidence/cobol-validation-abi-fixed-2026-08-16.md",
    "verification/evidence/cpp-js-soak-2026-08-16.md",
    "verification/evidence/multilang/README.md",
    "verification/evidence/multilang/bundle-validation-2026-08-16.md",
    "verification/evidence/multilang/ready-five-canonical-remediation-2026-08-16.md",
    "verification/evidence/soak-c5db804-2026-08-13.md",
  ]),
  intentionalFreeform: Object.freeze([
    "README.md",
    "UPLOAD-INSTRUCTIONS.md",
    "UPLOAD-TO-GITHUB.md",
    "browser/UPLOAD-TO-GITHUB.md",
    "docs/UPLOAD-TO-GITHUB.md",
  ]),
});

function issue(file, message, source = null) {
  return { file, message, source };
}

async function readOptional(root, relativePath) {
  try {
    return await readFile(path.join(root, relativePath), "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

function generatedFactsBlock(facts) {
  const exportsList = facts.packageExports.map((entry) => `\`${entry}\``).join(", ");
  const languages = facts.acceptedImplementationLanguages.join(", ");
  const supportSummary = facts.supportLevels
    .map((level) => `${level} **${facts.localeSupportCounts[level] ?? 0}**`)
    .join(", ");
  return `${GENERATED_BEGIN}\n` +
    `- Current package version: \`${facts.packageVersion}\`.\n` +
    `- Minimum Node.js requirement: \`${facts.nodeRequirement}\`.\n` +
    `- Registered locale resources: **${facts.localeCount}**. Support status: ${supportSummary}. These are registry policy/status facts, not a linguistic-quality certification.\n` +
    `- Package entry points: ${exportsList}.\n` +
    `- Canonically accepted independent implementations: **${facts.acceptedImplementationCount}** (${languages}).\n` +
    `- Normative source path: \`${facts.normativeSourcePath}\`; declared SHA-256: \`${facts.normativeSourceSha256}\`.\n` +
    `${GENERATED_END}`;
}

function replaceGeneratedBlock(source, replacement) {
  const start = source.indexOf(GENERATED_BEGIN);
  const end = source.indexOf(GENERATED_END);
  if (start < 0 || end < 0 || end < start) return null;
  return source.slice(0, start) + replacement + source.slice(end + GENERATED_END.length);
}

function extractCodeContexts(markdown) {
  const contexts = [];
  for (const match of markdown.matchAll(/```[^\n]*\n([\s\S]*?)```/gu)) contexts.push(match[1]);
  const withoutFences = markdown.replace(/```[^\n]*\n[\s\S]*?```/gu, "");
  for (const match of withoutFences.matchAll(/`([^`\n]+)`/gu)) contexts.push(match[1]);
  return contexts;
}

function extractMarkdownDestinations(markdown) {
  const destinations = [];
  const pattern = /!?\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\s*\)/gu;
  for (const match of markdown.matchAll(pattern)) {
    let value = match[1].trim();
    if (value.startsWith("<") && value.endsWith(">")) value = value.slice(1, -1);
    destinations.push(value);
  }
  return destinations;
}

function isIgnoredLink(target) {
  return target.startsWith("#") || /^(?:https?:|mailto:|tel:|data:|javascript:)/iu.test(target);
}

async function resolveLocalLink(root, documentPath, rawTarget) {
  const target = stripQueryAndFragment(rawTarget);
  if (!target) return { ok: true };
  let decoded;
  try {
    decoded = decodeURI(target);
  } catch {
    return { ok: false, reason: `contains invalid URI escaping: ${rawTarget}` };
  }
  const base = path.posix.dirname(documentPath.replaceAll("\\", "/"));
  const relative = path.posix.normalize(path.posix.join(base, decoded));
  if (relative === ".." || relative.startsWith("../")) {
    return { ok: false, reason: `escapes the repository root: ${rawTarget}` };
  }
  const status = await exactPathStatus(root, relative);
  if (!status.exists) return { ok: false, reason: `references missing local target ${JSON.stringify(relative)}` };
  if (!status.exact) {
    return { ok: false, reason: `uses wrong case for local target ${JSON.stringify(relative)}; segment ${JSON.stringify(status.requestedSegment)} is actually ${JSON.stringify(status.actualSegment)}` };
  }
  return { ok: true };
}

function supportsExport(packageExports, requested) {
  if (packageExports.includes(requested)) return true;
  for (const entry of packageExports) {
    if (!entry.includes("*")) continue;
    const [prefix, suffix] = entry.split("*");
    if (requested.startsWith(prefix) && requested.endsWith(suffix)) return true;
  }
  return false;
}

function packageSpecifierToExport(specifier) {
  if (specifier === "pastafari-calendar") return ".";
  if (!specifier.startsWith("pastafari-calendar/")) return null;
  return `./${specifier.slice("pastafari-calendar/".length)}`;
}

function checkNumericClaim({ file, source, pattern, expected, label, sourceOfTruth, issues }) {
  const match = source.match(pattern);
  if (!match) {
    issues.push(issue(file, `cannot locate the guarded current-state claim for ${label}; update the assertion intentionally if the documentation wording changed.`, sourceOfTruth));
    return;
  }
  const actual = Number(match[1]);
  if (actual !== expected) {
    issues.push(issue(file, `${label}: documented value ${actual}; actual value ${expected}.`, sourceOfTruth));
  }
}

async function checkGeneratedSection(root, facts, write, issues) {
  const source = await readOptional(root, GENERATED_FILE);
  if (source === null) {
    issues.push(issue(GENERATED_FILE, "generated project-facts document is missing.", "package.json; docs/i18n/registry.js; implementations/implementations.json"));
    return;
  }
  const expectedBlock = generatedFactsBlock(facts);
  const expectedDocument = replaceGeneratedBlock(source, expectedBlock);
  if (expectedDocument === null) {
    issues.push(issue(GENERATED_FILE, `missing ${GENERATED_BEGIN} / ${GENERATED_END} markers.`, "scripts/docs-consistency.mjs"));
    return;
  }
  if (write) {
    if (expectedDocument !== source) await writeFile(path.join(root, GENERATED_FILE), expectedDocument, "utf8");
    return;
  }
  if (expectedDocument !== source) {
    issues.push(issue(GENERATED_FILE, "generated project-facts section is stale; run `npm run docs:generate` and commit the result.", "package.json; docs/i18n/registry.js; implementations/implementations.json"));
  }
}

async function checkFactClaims(root, facts, issues) {
  const docsReadme = await readOptional(root, "docs/README.md");
  if (docsReadme !== null) {
    checkNumericClaim({ file: "docs/README.md", source: docsReadme, pattern: /רשומים בו\s+(\d+)\s+משאבי\s*\n?locale/u, expected: facts.localeCount, label: "registered locale resource count", sourceOfTruth: "docs/i18n/registry.js (LOCALES)", issues });
  }

  const i18n = await readOptional(root, "docs/I18N.md");
  if (i18n !== null) {
    checkNumericClaim({ file: "docs/I18N.md", source: i18n, pattern: /other\s+(\d+)\s+registered locales remain `partial`/u, expected: facts.localeSupportCounts.partial ?? 0, label: "partial locale count", sourceOfTruth: "docs/i18n/registry.js (LOCALES[].support)", issues });
    const completePhrasePresent = /marks Hebrew and English as `complete`/u.test(i18n);
    const expectedComplete = [...facts.completeLocaleCodes].sort().join(",");
    if (!completePhrasePresent || expectedComplete !== "en,he") {
      issues.push(issue("docs/I18N.md", `documented complete-locale claim is Hebrew+English; registry complete locale codes are ${JSON.stringify([...facts.completeLocaleCodes].sort())}.`, "docs/i18n/registry.js (LOCALES[].support)"));
    }
  }

  const supportLevelsDoc = await readOptional(root, "docs/I18N-SUPPORT-LEVELS.md");
  if (supportLevelsDoc !== null) {
    checkNumericClaim({ file: "docs/I18N-SUPPORT-LEVELS.md", source: supportLevelsDoc, pattern: /current\s+(\d+)-locale set/u, expected: facts.localeCount, label: "support-policy locale count", sourceOfTruth: "docs/i18n/registry.js (LOCALES)", issues });
    checkNumericClaim({ file: "docs/I18N-SUPPORT-LEVELS.md", source: supportLevelsDoc, pattern: /(?:The|the)\s+(\d+)\s+non-English\/non-Hebrew locales remain `partial`/u, expected: facts.localeSupportCounts.partial ?? 0, label: "support-policy partial locale count", sourceOfTruth: "docs/i18n/registry.js (LOCALES[].support)", issues });
  }

  const browserReadme = await readOptional(root, "browser/README.md");
  if (browserReadme !== null) {
    const versionMatch = browserReadme.match(/לדוגמה\s+`v([0-9]+\.[0-9]+\.[0-9]+)`/u);
    if (versionMatch && versionMatch[1] !== facts.packageVersion) {
      issues.push(issue("browser/README.md", `release example documents v${versionMatch[1]}; package.json version is ${facts.packageVersion}.`, "package.json (version)"));
    }
    for (const output of facts.standaloneOutputs) {
      const basename = path.posix.basename(output);
      if (!browserReadme.includes(basename)) {
        issues.push(issue("browser/README.md", `standalone build output ${JSON.stringify(basename)} is produced by the build but is absent from the documented standalone file list.`, "scripts/build-standalone.mjs"));
      }
    }
  }

  const languagesDoc = await readOptional(root, "implementations/docs/LANGUAGES.md");
  if (languagesDoc !== null) {
    checkNumericClaim({ file: "implementations/docs/LANGUAGES.md", source: languagesDoc, pattern: /contains\s+\*\*(\d+)\s+required targets/u, expected: facts.expandedTargetCount, label: "expanded target count", sourceOfTruth: "implementations/implementations.json (expandedTargetCount)", issues });
    const ratio = languagesDoc.match(/contributes\s+\*\*(\d+)\/(\d+)\s+final-spec-certified/u);
    if (!ratio) {
      issues.push(issue("implementations/docs/LANGUAGES.md", "cannot locate guarded final-spec-certified ratio.", "implementations/implementations.json"));
    } else {
      if (Number(ratio[1]) !== facts.readyFiveFinalSpecCertifiedCount || Number(ratio[2]) !== facts.expandedTargetCount) {
        issues.push(issue("implementations/docs/LANGUAGES.md", `documented certified ratio ${ratio[1]}/${ratio[2]}; registry says ${facts.readyFiveFinalSpecCertifiedCount}/${facts.expandedTargetCount}.`, "implementations/implementations.json"));
      }
    }
    for (const language of facts.acceptedImplementationLanguages) {
      if (!languagesDoc.includes(`| ${language} |`)) {
        issues.push(issue("implementations/docs/LANGUAGES.md", `accepted implementation language ${JSON.stringify(language)} is missing from the status table.`, "implementations/implementations.json (implementations[].language)"));
      }
    }
  }
}

async function checkLocaleRegistry(root, facts, issues) {
  const codes = new Set();
  const assets = new Set();
  for (const locale of facts.locales) {
    if (codes.has(locale.code)) issues.push(issue("docs/i18n/registry.js", `duplicate locale code ${JSON.stringify(locale.code)}.`, "LOCALES"));
    codes.add(locale.code);
    if (assets.has(locale.asset)) issues.push(issue("docs/i18n/registry.js", `duplicate locale asset ${JSON.stringify(locale.asset)}.`, "LOCALES"));
    assets.add(locale.asset);
    if (locale.asset !== locale.importTarget) {
      issues.push(issue("docs/i18n/registry.js", `locale ${locale.code} asset ${JSON.stringify(locale.asset)} differs from loader import ${JSON.stringify(locale.importTarget)}.`, "LOCALES entry"));
    }
    const cleanAsset = stripQueryAndFragment(locale.asset).replace(/^\.\//u, "docs/i18n/");
    const status = await exactPathStatus(root, cleanAsset);
    if (!status.exists || !status.exact) issues.push(issue("docs/i18n/registry.js", `locale ${locale.code} references missing or wrong-case asset ${JSON.stringify(cleanAsset)}.`, "LOCALES entry"));
  }
  const supportTotal = Object.values(facts.localeSupportCounts).reduce((sum, value) => sum + value, 0);
  if (supportTotal !== facts.localeCount) {
    issues.push(issue("docs/i18n/registry.js", `support-level counts total ${supportTotal}; registry contains ${facts.localeCount} locales.`, "LOCALES[].support"));
  }
  for (const locale of facts.locales) {
    if (!facts.supportLevels.includes(locale.support)) {
      issues.push(issue("docs/i18n/registry.js", `locale ${locale.code} has unsupported support level ${JSON.stringify(locale.support)}.`, "SUPPORT_LEVELS"));
    }
  }
  if (!codes.has(facts.defaultLocale)) issues.push(issue("docs/i18n/registry.js", `DEFAULT_LOCALE ${JSON.stringify(facts.defaultLocale)} is not registered.`, "LOCALES"));
}

async function checkPackageSurface(root, facts, issues) {
  for (const target of facts.packageExportTargets) {
    const status = await exactPathStatus(root, target);
    if (!status.exists || !status.exact) issues.push(issue("package.json", `export/type target ${JSON.stringify(target)} does not exist with exact repository casing.`, "package.json (exports/types)"));
  }

  for (const implementationPath of facts.acceptedImplementationPaths) {
    const status = await exactPathStatus(root, implementationPath);
    if (!status.exists || !status.exact) issues.push(issue("implementations/implementations.json", `accepted implementation path ${JSON.stringify(implementationPath)} does not exist with exact repository casing.`, "implementations[].path"));
  }

  if (typeof facts.normativeSourcePath !== "string" || facts.normativeSourcePath.length === 0) {
    issues.push(issue("implementations/implementations.json", "normativeSourcePath is missing.", "implementations.json (normativeSourcePath)"));
  } else {
    const resolvedSource = path.posix.normalize(path.posix.join("implementations", facts.normativeSourcePath.replaceAll("\\", "/")));
    const status = await exactPathStatus(root, resolvedSource);
    if (!status.exists || !status.exact) {
      issues.push(issue("implementations/implementations.json", `normativeSourcePath ${JSON.stringify(facts.normativeSourcePath)} resolves to missing or wrong-case path ${JSON.stringify(resolvedSource)}.`, "repository tree"));
    } else {
      const manifestRelative = path.posix.relative("sources", resolvedSource);
      const escaped = manifestRelative.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
      const manifestMatch = facts.sourceManifest.match(new RegExp(`^([0-9a-f]{64})\\s+\\./${escaped}$`, "mu"));
      if (!manifestMatch) {
        issues.push(issue("sources/SHA256SUMS.txt", `contains no checksum entry for normative source ${JSON.stringify(`./${manifestRelative}`)}.`, "implementations/implementations.json (normativeSourcePath)"));
      } else if (typeof facts.normativeSourceSha256 !== "string" || facts.normativeSourceSha256.toLowerCase() !== manifestMatch[1].toLowerCase()) {
        issues.push(issue("implementations/implementations.json", `normativeSourceSha256 is ${JSON.stringify(facts.normativeSourceSha256)}; source manifest records ${manifestMatch[1]}.`, "sources/SHA256SUMS.txt"));
      }
    }
  }

  for (const output of facts.standaloneOutputs) {
    const status = await exactPathStatus(root, output);
    if (!status.exists || !status.exact) issues.push(issue("scripts/build-standalone.mjs", `documented build output ${JSON.stringify(output)} is not present in the tracked snapshot.`, "scripts/build-standalone.mjs"));
  }
}

function numericNodeVersion(value) {
  const match = value.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/u);
  if (!match) return null;
  return [Number(match[1]), Number(match[2] ?? 0), Number(match[3] ?? 0)];
}

function compareVersionTuple(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

async function checkWorkflowNode(root, facts, issues) {
  const workflow = await readOptional(root, ".github/workflows/test.yml");
  if (workflow === null) return;
  const minimumTuple = [facts.nodeMinimum.major, facts.nodeMinimum.minor, facts.nodeMinimum.patch];
  const minimumJob = workflow.match(/(?:^|\n)  node-minimum:\s*\n([\s\S]*?)(?=\n  [A-Za-z0-9_-]+:\s*\n|$)/u);
  if (!minimumJob) {
    issues.push(issue(".github/workflows/test.yml", `package.json requires ${facts.nodeRequirement}, but no node-minimum job is present.`, "package.json (engines.node)"));
  } else {
    const pin = minimumJob[1].match(/node-version:\s*["']?([^\s"']+)["']?/u)?.[1] ?? null;
    const pinTuple = pin ? numericNodeVersion(pin) : null;
    if (!pinTuple || compareVersionTuple(pinTuple, minimumTuple) !== 0) {
      issues.push(issue(".github/workflows/test.yml", `minimum-runtime job pins ${pin ?? "<missing>"}; package.json minimum is ${facts.nodeRequirement} (expected exact floor ${facts.nodeMinimum.normalized}).`, "package.json (engines.node)"));
    }
  }
  for (const runtime of facts.workflowNodeVersions) {
    const tuple = numericNodeVersion(runtime.version);
    if (tuple && compareVersionTuple(tuple, minimumTuple) < 0) {
      issues.push(issue(runtime.file, `CI uses Node ${runtime.version}, below package minimum ${facts.nodeRequirement}.`, "package.json (engines.node)"));
    }
  }
}

function repositoryPathFromInlineCode(code) {
  const value = code.trim();
  if (!value || value.includes("\n") || value.includes("*") || /\s/u.test(value)) return null;
  if (/(?:^|\/)build(?:\/|$)/u.test(value)) return null;
  if (/^(?:package\.json|SHA256SUMS\.txt)$/u.test(value)) return value;
  if (/^(?:\.github|benchmarks|browser|docs|implementations|scripts|sources|src|test|types)\/[\p{L}\p{N}_.\-()/]+$/u.test(value)) {
    return stripQueryAndFragment(value);
  }
  return null;
}

async function checkCurrentMarkdownReferences(root, facts, issues, currentDocs) {
  for (const file of currentDocs) {
    const source = await readOptional(root, file);
    if (source === null) continue;

    for (const target of extractMarkdownDestinations(source)) {
      if (isIgnoredLink(target)) continue;
      const result = await resolveLocalLink(root, file, target);
      if (!result.ok) issues.push(issue(file, result.reason, "repository tree"));
    }

    for (const code of extractCodeContexts(source)) {
      const repositoryPath = repositoryPathFromInlineCode(code);
      if (repositoryPath) {
        const docRelativePath = path.posix.normalize(path.posix.join(path.posix.dirname(file), repositoryPath));
        const candidates = [...new Set([docRelativePath, repositoryPath])];
        const statuses = [];
        for (const candidate of candidates) statuses.push({ candidate, status: await exactPathStatus(root, candidate) });
        if (!statuses.some(({ status }) => status.exists && status.exact)) {
          const wrongCase = statuses.find(({ status }) => status.exists && !status.exact);
          if (wrongCase) {
            issues.push(issue(file, `references repository path ${JSON.stringify(repositoryPath)} with wrong case.`, "repository tree"));
          } else {
            issues.push(issue(file, `references missing repository path ${JSON.stringify(repositoryPath)}.`, "repository tree"));
          }
        }
      }
      for (const match of code.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/gu)) {
        const script = match[1];
        if (!Object.hasOwn(facts.npmScripts, script)) {
          issues.push(issue(file, `references npm script ${JSON.stringify(script)}, but package.json contains no such script.`, "package.json (scripts)"));
        }
      }
      const importPatterns = [
        /\bfrom\s+["'](pastafari-calendar(?:\/[^"']*)?)["']/gu,
        /\bimport\(\s*["'](pastafari-calendar(?:\/[^"']*)?)["']\s*\)/gu,
        /\brequire\(\s*["'](pastafari-calendar(?:\/[^"']*)?)["']\s*\)/gu,
      ];
      for (const pattern of importPatterns) {
        for (const match of code.matchAll(pattern)) {
          const exportKey = packageSpecifierToExport(match[1]);
          if (exportKey && !supportsExport(facts.packageExports, exportKey)) {
            issues.push(issue(file, `imports ${JSON.stringify(match[1])}, but package.json exports no matching entry point.`, "package.json (exports)"));
          }
        }
      }
    }
  }
}

async function checkHistoricalClassification(root, issues, historicalDocs) {
  for (const file of historicalDocs) {
    const source = await readOptional(root, file);
    if (source === null) continue;
    const hasDate = /20\d{2}-\d{2}-\d{2}|\b\d{1,2}\s+(?:August|July|June|May|April|March|February|January|September|October|November|December)\s+20\d{2}\b/iu.test(source);
    const hasCommit = /\b[0-9a-f]{7,40}\b/iu.test(source);
    const hasSnapshotWord = /\bsnapshot\b|validation|audit|evidence|benchmark|historical/iu.test(source);
    if (!(hasSnapshotWord && (hasDate || hasCommit))) {
      issues.push(issue(file, "classified as historical, but lacks sufficiently explicit snapshot context (date/commit plus validation/audit/evidence wording).", "documentation classification"));
    }
  }
}

export async function runDocumentationChecks({
  root = DEFAULT_ROOT,
  write = false,
  currentDocs = DOCUMENT_CLASSES.current,
  historicalDocs = DOCUMENT_CLASSES.historical,
} = {}) {
  const facts = await collectProjectFacts(root);
  const issues = [];

  await checkGeneratedSection(root, facts, write, issues);
  await checkFactClaims(root, facts, issues);
  await checkLocaleRegistry(root, facts, issues);
  await checkPackageSurface(root, facts, issues);
  await checkWorkflowNode(root, facts, issues);
  await checkCurrentMarkdownReferences(root, facts, issues, currentDocs);
  await checkHistoricalClassification(root, issues, historicalDocs);

  return { facts, issues };
}

function formatIssues(issues) {
  return issues.map((entry) => {
    const source = entry.source ? `\n  source of truth: ${entry.source}` : "";
    return `${entry.file}:\n  ${entry.message}${source}`;
  }).join("\n\n");
}

async function main() {
  const write = process.argv.includes("--write");
  const unknown = process.argv.slice(2).filter((arg) => arg !== "--write");
  if (unknown.length > 0) {
    console.error(`Unknown argument(s): ${unknown.join(", ")}`);
    process.exitCode = 2;
    return;
  }
  const started = process.hrtime.bigint();
  const { facts, issues } = await runDocumentationChecks({ write });
  const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;
  if (issues.length > 0) {
    console.error(formatIssues(issues));
    console.error(`\nDocumentation consistency: FAIL (${issues.length} issue${issues.length === 1 ? "" : "s"}, ${elapsedMs.toFixed(1)} ms)`);
    process.exitCode = 1;
    return;
  }
  console.log(`${write ? "Documentation generation" : "Documentation consistency"}: PASS (${facts.localeCount} locales, ${facts.acceptedImplementationCount} accepted implementations, ${elapsedMs.toFixed(1)} ms)`);
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await main();
}
