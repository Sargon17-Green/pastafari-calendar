"use strict";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export async function readJson(root, relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

export function stripQueryAndFragment(value) {
  return value.split("#", 1)[0].split("?", 1)[0];
}

export async function exactPathStatus(root, relativePath) {
  const normalized = relativePath.replaceAll("\\", "/").replace(/^\.\//u, "");
  if (!normalized || normalized === ".") return { exists: true, exact: true };
  const parts = normalized.split("/").filter(Boolean);
  let current = root;
  for (const part of parts) {
    let names;
    try {
      names = await readdir(current);
    } catch {
      return { exists: false, exact: false };
    }
    if (names.includes(part)) {
      current = path.join(current, part);
      continue;
    }
    const caseInsensitive = names.find((name) => name.toLocaleLowerCase("en-US") === part.toLocaleLowerCase("en-US"));
    if (caseInsensitive) {
      return { exists: true, exact: false, actualSegment: caseInsensitive, requestedSegment: part };
    }
    return { exists: false, exact: false };
  }
  return { exists: true, exact: true };
}

function parseStringArrayLiteral(source, exportName) {
  const match = source.match(new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*Object\\.freeze\\(\\[([^\\]]*)\\]\\)`, "u"));
  if (!match) return null;
  return [...match[1].matchAll(/["']([^"']+)["']/gu)].map((entry) => entry[1]);
}

function parseLocales(source) {
  const defaultMatch = source.match(/export\s+const\s+DEFAULT_LOCALE\s*=\s*["']([^"']+)["']/u);
  if (!defaultMatch) throw new Error("docs/i18n/registry.js: DEFAULT_LOCALE was not found.");

  const supportLevels = parseStringArrayLiteral(source, "SUPPORT_LEVELS") ?? [];
  const entries = [];

  // Current registry form: defineLocale(code, displayName, dir, intlLocale, support, () => import(...)).
  const definePattern = /defineLocale\(\s*["']([^"']+)["']\s*,\s*["'][^"']*["']\s*,\s*["'](?:ltr|rtl)["']\s*,\s*["'][^"']+["']\s*,\s*["']([^"']+)["']\s*,\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)/gu;
  for (const match of source.matchAll(definePattern)) {
    entries.push({ code: match[1], support: match[2], asset: match[3], importTarget: match[3] });
  }

  // Compatibility with the older explicit Object.freeze form, useful for fixtures and old snapshots.
  if (entries.length === 0) {
    const objectPattern = /Object\.freeze\(\{\s*code:\s*["']([^"']+)["'][\s\S]*?(?:support:\s*["']([^"']+)["'][\s\S]*?)?asset:\s*["']([^"']+)["'][\s\S]*?loader:\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)\s*\}\)/gu;
    for (const match of source.matchAll(objectPattern)) {
      entries.push({ code: match[1], support: match[2] ?? null, asset: match[3], importTarget: match[4] });
    }
  }

  if (entries.length === 0) throw new Error("docs/i18n/registry.js: no LOCALES entries were parsed.");
  if (supportLevels.length === 0) {
    const observed = [...new Set(entries.map((entry) => entry.support).filter(Boolean))];
    supportLevels.push(...observed);
  }

  const supportCounts = Object.fromEntries(supportLevels.map((level) => [level, 0]));
  for (const entry of entries) {
    if (entry.support && !Object.hasOwn(supportCounts, entry.support)) supportCounts[entry.support] = 0;
    if (entry.support) supportCounts[entry.support] += 1;
  }

  return {
    defaultLocale: defaultMatch[1],
    supportLevels,
    supportCounts,
    entries,
  };
}

function minimumNodeVersion(requirement) {
  const match = requirement.match(/^\s*>=\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?\s*$/u);
  if (!match) {
    throw new Error(`package.json: unsupported engines.node form ${JSON.stringify(requirement)}; docs checker expects a simple >= minimum.`);
  }
  const major = Number(match[1]);
  const minor = Number(match[2] ?? 0);
  const patch = Number(match[3] ?? 0);
  return Object.freeze({ major, minor, patch, normalized: `${major}.${minor}.${patch}` });
}

function parseWorkflowNodeVersions(source, file) {
  return [...source.matchAll(/node-version:\s*["']?([^\s"']+)["']?/gu)]
    .map((match) => Object.freeze({ file, version: match[1] }));
}

function parseStandaloneOutputs(source) {
  const outputs = [];
  for (const match of source.matchAll(/bundleStandalone\(\{[\s\S]*?filename:\s*["']([^"']+)["'][\s\S]*?\}\);/gu)) {
    outputs.push(`browser/standalone/${match[1]}`);
  }
  return [...new Set(outputs)];
}

function exportTargetPaths(exportsObject) {
  const targets = [];
  const visit = (value) => {
    if (typeof value === "string") {
      if (!value.includes("*")) targets.push(value.replace(/^\.\//u, ""));
      return;
    }
    if (value && typeof value === "object") {
      for (const child of Object.values(value)) visit(child);
    }
  };
  visit(exportsObject);
  return [...new Set(targets)].sort();
}

export async function collectProjectFacts(root) {
  const packageJson = await readJson(root, "package.json");
  const registrySource = await readFile(path.join(root, "docs/i18n/registry.js"), "utf8");
  const implementationRegistry = await readJson(root, "implementations/implementations.json");
  const workflowDirectory = path.join(root, ".github/workflows");
  const workflowFiles = (await readdir(workflowDirectory))
    .filter((name) => /\.ya?ml$/iu.test(name))
    .sort();
  const workflowNodeVersions = [];
  for (const name of workflowFiles) {
    const relative = `.github/workflows/${name}`;
    const source = await readFile(path.join(workflowDirectory, name), "utf8");
    workflowNodeVersions.push(...parseWorkflowNodeVersions(source, relative));
  }
  const standaloneBuildSource = await readFile(path.join(root, "scripts/build-standalone.mjs"), "utf8");
  const sourceManifest = await readFile(path.join(root, "sources/SHA256SUMS.txt"), "utf8");

  const localeRegistry = parseLocales(registrySource);
  const nodeMinimum = minimumNodeVersion(packageJson.engines?.node ?? "");
  const implementationEntries = implementationRegistry.implementations ?? [];
  const acceptedImplementations = implementationEntries.filter((entry) => entry.canonicalStatus === "pass");

  return Object.freeze({
    packageVersion: packageJson.version,
    nodeRequirement: packageJson.engines?.node,
    nodeMinimum,
    npmScripts: Object.freeze({ ...(packageJson.scripts ?? {}) }),
    packageExports: Object.freeze(Object.keys(packageJson.exports ?? {})),
    packageExportTargets: Object.freeze(exportTargetPaths(packageJson.exports ?? {})),
    localeCount: localeRegistry.entries.length,
    defaultLocale: localeRegistry.defaultLocale,
    supportLevels: Object.freeze([...localeRegistry.supportLevels]),
    localeSupportCounts: Object.freeze({ ...localeRegistry.supportCounts }),
    completeLocaleCodes: Object.freeze(localeRegistry.entries.filter((entry) => entry.support === "complete").map((entry) => entry.code)),
    partialLocaleCodes: Object.freeze(localeRegistry.entries.filter((entry) => entry.support === "partial").map((entry) => entry.code)),
    experimentalLocaleCodes: Object.freeze(localeRegistry.entries.filter((entry) => entry.support === "experimental").map((entry) => entry.code)),
    locales: Object.freeze(localeRegistry.entries.map((entry) => Object.freeze(entry))),
    acceptedImplementationCount: acceptedImplementations.length,
    acceptedImplementationLanguages: Object.freeze(acceptedImplementations.map((entry) => entry.language)),
    acceptedImplementationPaths: Object.freeze(acceptedImplementations.map((entry) => `implementations/${entry.path}`)),
    expandedTargetCount: implementationRegistry.expandedTargetCount,
    readyFiveCount: implementationRegistry.readyFiveCount,
    readyFiveFinalSpecCertifiedCount: implementationRegistry.readyFiveFinalSpecCertifiedCount,
    normativeSourcePath: implementationRegistry.normativeSourcePath,
    normativeSourceSha256: implementationRegistry.normativeSourceSha256,
    sourceManifest,
    workflowFiles: Object.freeze(workflowFiles.map((name) => `.github/workflows/${name}`)),
    workflowNodeVersions: Object.freeze(workflowNodeVersions),
    standaloneOutputs: Object.freeze(parseStandaloneOutputs(standaloneBuildSource)),
  });
}
