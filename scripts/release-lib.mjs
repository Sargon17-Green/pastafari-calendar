"use strict";

import { createHash } from "node:crypto";
import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const POSIX = path.posix;
const SHA256_RE = /^[0-9a-f]{64}$/u;
const CHECKSUM_LINE_RE = /^([0-9a-f]{64})  \.\/(.+)$/u;

export function sha256Buffer(value) {
  return createHash("sha256").update(value).digest("hex");
}

export async function sha256File(filePath) {
  return sha256Buffer(await readFile(filePath));
}

export function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

export async function atomicWriteFile(filePath, contents) {
  const directory = path.dirname(filePath);
  const temporary = path.join(
    directory,
    `.${path.basename(filePath)}.${process.pid}.${Date.now()}.tmp`,
  );
  try {
    await writeFile(temporary, contents);
    await rename(temporary, filePath);
  } catch (error) {
    try {
      const { rm } = await import("node:fs/promises");
      await rm(temporary, { force: true });
    } catch {
      // Preserve the original write/rename error.
    }
    throw error;
  }
}

function defaultRepositoryExclusion(relativePath) {
  const normalized = relativePath.replace(/^\.\//u, "");
  return normalized === "SHA256SUMS.txt"
    || normalized === ".git"
    || normalized.startsWith(".git/")
    || normalized === "node_modules"
    || normalized.startsWith("node_modules/")
    || normalized === "artifacts"
    || normalized.startsWith("artifacts/")
    || normalized === "__pycache__"
    || normalized.startsWith("__pycache__/")
    || normalized.includes("/__pycache__/")
    || normalized.endsWith(".pyc")
    || normalized.endsWith(".tgz");
}

function defaultDocsExclusion(relativePath) {
  const normalized = relativePath.replace(/^\.\//u, "");
  return normalized === "SHA256SUMS.txt";
}

export async function listRegularFiles(root, { exclude = defaultRepositoryExclusion } = {}) {
  const files = [];

  async function visit(relativeDirectory) {
    const absoluteDirectory = path.join(root, relativeDirectory);
    const entries = await readdir(absoluteDirectory, { withFileTypes: true });
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));

    for (const entry of entries) {
      const relativeNative = path.join(relativeDirectory, entry.name);
      const relative = toPosixPath(relativeNative).replace(/^\.\//u, "");
      if (exclude(relative)) continue;

      if (entry.isDirectory()) {
        await visit(relativeNative);
      } else if (entry.isFile()) {
        files.push(relative);
      }
    }
  }

  await visit("");
  files.sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
  return files;
}

export function formatChecksumManifest(entries) {
  return `${entries.map(({ hash, path: relativePath }) => `${hash}  ./${relativePath}`).join("\n")}\n`;
}

export async function buildChecksumManifest(root, options = {}) {
  const files = await listRegularFiles(root, options);
  const entries = [];
  for (const relativePath of files) {
    entries.push({
      path: relativePath,
      hash: await sha256File(path.join(root, ...relativePath.split("/"))),
    });
  }
  return {
    entries,
    text: formatChecksumManifest(entries),
  };
}

export function parseChecksumManifest(text) {
  const entries = [];
  const seen = new Set();
  const lines = text.split(/\r?\n/u);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line === "" && index === lines.length - 1) continue;
    if (line.trim() === "") {
      throw new Error(`Checksum manifest contains a blank line at ${index + 1}.`);
    }
    const match = CHECKSUM_LINE_RE.exec(line);
    if (!match) {
      throw new Error(`Invalid checksum line ${index + 1}: ${line}`);
    }
    const [, hash, rawPath] = match;
    const normalized = POSIX.normalize(rawPath);
    if (
      rawPath.startsWith("/")
      || rawPath.includes("\\")
      || normalized === ".."
      || normalized.startsWith("../")
      || normalized !== rawPath
    ) {
      throw new Error(`Unsafe or non-canonical checksum path at line ${index + 1}: ${rawPath}`);
    }
    if (seen.has(rawPath)) {
      throw new Error(`Duplicate checksum entry: ${rawPath}`);
    }
    seen.add(rawPath);
    entries.push({ path: rawPath, hash });
  }
  return entries;
}

export async function verifyChecksumManifest(
  root,
  manifestText,
  { exclude = defaultRepositoryExclusion, manifestName = "SHA256SUMS.txt" } = {},
) {
  const entries = parseChecksumManifest(manifestText);
  const actualFiles = await listRegularFiles(root, { exclude });
  const actualSet = new Set(actualFiles);
  const entrySet = new Set(entries.map((entry) => entry.path));
  const problems = [];

  for (const entry of entries) {
    if (exclude(entry.path)) {
      problems.push(`${entry.path}: entry is excluded from ${manifestName}`);
      continue;
    }
    if (!actualSet.has(entry.path)) {
      problems.push(`${entry.path}: file is missing`);
      continue;
    }
    const actualHash = await sha256File(path.join(root, ...entry.path.split("/")));
    if (actualHash !== entry.hash) {
      problems.push(`${entry.path}: SHA-256 mismatch\n  expected: ${entry.hash}\n  actual:   ${actualHash}`);
    }
  }

  for (const actualPath of actualFiles) {
    if (!entrySet.has(actualPath)) {
      problems.push(`${actualPath}: file is not listed in ${manifestName}`);
    }
  }

  if (problems.length > 0) {
    const error = new Error(`${manifestName} verification failed:\n${problems.map((problem) => `- ${problem}`).join("\n")}`);
    error.problems = problems;
    throw error;
  }

  return { count: entries.length };
}

export const checksumPolicies = Object.freeze({
  repository: Object.freeze({ exclude: defaultRepositoryExclusion }),
  docs: Object.freeze({ exclude: defaultDocsExclusion }),
});

export function assertReproducibleArtifacts(first, second, label = "build") {
  const firstKeys = [...first.keys()].sort();
  const secondKeys = [...second.keys()].sort();
  if (firstKeys.join("\0") !== secondKeys.join("\0")) {
    throw new Error(`${label} produced a different artifact set between runs.`);
  }

  const result = [];
  for (const key of firstKeys) {
    const firstBytes = Buffer.from(first.get(key));
    const secondBytes = Buffer.from(second.get(key));
    const firstHash = sha256Buffer(firstBytes);
    const secondHash = sha256Buffer(secondBytes);
    if (!firstBytes.equals(secondBytes)) {
      throw new Error(
        `${key} is not reproducible byte-for-byte.\n  build 1: ${firstHash}\n  build 2: ${secondHash}`,
      );
    }
    result.push({ path: key, build1Sha256: firstHash, build2Sha256: secondHash, match: true });
  }
  return result;
}

export function assertGeneratedArtifactMatches(relativePath, generated, checkedIn) {
  const generatedBytes = Buffer.from(generated);
  const checkedInBytes = Buffer.from(checkedIn);
  if (!generatedBytes.equals(checkedInBytes)) {
    throw new Error(
      `${relativePath} has generated-file drift.\n`
      + `  checked in: ${sha256Buffer(checkedInBytes)}\n`
      + `  generated:  ${sha256Buffer(generatedBytes)}\n`
      + "Run the authoritative generator and review the resulting diff.",
    );
  }
  return sha256Buffer(generatedBytes);
}

export function collectExportTargets(exportsField) {
  const targets = [];

  function visit(exportKey, value) {
    if (typeof value === "string") {
      targets.push({ exportKey, target: value, wildcard: exportKey.includes("*") || value.includes("*") });
      return;
    }
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const nestedValue of Object.values(value)) visit(exportKey, nestedValue);
    }
  }

  if (typeof exportsField === "string") {
    visit(".", exportsField);
  } else if (exportsField && typeof exportsField === "object") {
    for (const [exportKey, value] of Object.entries(exportsField)) visit(exportKey, value);
  }
  return targets;
}

function stripDotSlash(value) {
  return value.startsWith("./") ? value.slice(2) : value;
}

export function validatePackageFileSet(packageJson, packageFiles) {
  const files = new Set(packageFiles.map(stripDotSlash));
  const failures = [];
  const checkedTargets = [];

  const requiredDirect = [
    ["main", packageJson.main],
    ["types", packageJson.types],
  ].filter(([, value]) => typeof value === "string");

  for (const [label, target] of requiredDirect) {
    const normalized = stripDotSlash(target);
    checkedTargets.push({ label, target: normalized });
    if (!files.has(normalized)) failures.push(`${label} target is missing from package: ${normalized}`);
  }

  for (const { exportKey, target, wildcard } of collectExportTargets(packageJson.exports)) {
    const normalized = stripDotSlash(target);
    if (wildcard) {
      const prefix = normalized.slice(0, normalized.indexOf("*"));
      checkedTargets.push({ label: `export ${exportKey}`, target: normalized, wildcard: true });
      if (![...files].some((file) => file.startsWith(prefix))) {
        failures.push(`Wildcard export ${exportKey} has no packed files under ${prefix}`);
      }
    } else {
      checkedTargets.push({ label: `export ${exportKey}`, target: normalized, wildcard: false });
      if (!files.has(normalized)) failures.push(`Export ${exportKey} target is missing from package: ${normalized}`);
    }
  }

  for (const file of files) {
    if (
      file === "node_modules"
      || file.startsWith("node_modules/")
      || file === "artifacts"
      || file.startsWith("artifacts/")
      || file.endsWith(".tgz")
    ) {
      failures.push(`Temporary/development artifact leaked into package: ${file}`);
    }
  }

  if (failures.length > 0) {
    const error = new Error(`Packed package validation failed:\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
    error.failures = failures;
    throw error;
  }

  return { checkedTargets, fileCount: files.size };
}

export function validatePackageLockVersion(packageJson, packageLock) {
  const rootPackage = packageLock?.packages?.[""];
  const versions = [packageLock?.version, rootPackage?.version].filter((value) => value !== undefined);
  for (const lockVersion of versions) {
    if (lockVersion !== packageJson.version) {
      throw new Error(
        `Version mismatch: package.json=${packageJson.version}, package-lock.json=${lockVersion}.`,
      );
    }
  }
  if (!rootPackage) throw new Error("package-lock.json has no root package entry.");
  return true;
}

export function assertNodeEngineSupported(engine, nodeVersion = process.versions.node) {
  if (typeof engine !== "string" || engine.trim() === "") return true;
  const match = /^>=\s*(\d+)(?:\.\d+\.\d+)?$/u.exec(engine.trim());
  if (!match) {
    throw new Error(`release tooling does not know how to validate Node engine expression: ${engine}`);
  }
  const minimumMajor = Number(match[1]);
  const currentMajor = Number(nodeVersion.split(".")[0]);
  if (!Number.isInteger(currentMajor) || currentMajor < minimumMajor) {
    throw new Error(`Node ${nodeVersion} does not satisfy engines.node ${engine}.`);
  }
  return true;
}

export function validateTagVersion(tag, version) {
  if (tag === undefined || tag === null || tag === "") return { checked: false };
  const expected = `v${version}`;
  if (tag !== expected) {
    throw new Error(`Tag/package version mismatch: tag=${tag}, expected=${expected}.`);
  }
  return { checked: true, tag, version };
}

export function parseServiceWorkerState(source) {
  const versionMatch = source.match(/\bconst\s+VERSION\s*=\s*"([^"]+)"\s*;/u);
  if (!versionMatch) throw new Error("Could not parse const VERSION from docs/sw.js.");

  const assetsMatch = source.match(/\bconst\s+CORE_ASSETS\s*=\s*\[([\s\S]*?)\]\s*;/u);
  if (!assetsMatch) throw new Error("Could not parse CORE_ASSETS from docs/sw.js.");
  const assets = [...assetsMatch[1].matchAll(/"((?:\\.|[^"\\])*)"/gu)]
    .map((match) => JSON.parse(`"${match[1]}"`));
  if (assets.length === 0) throw new Error("docs/sw.js CORE_ASSETS is empty.");
  return { version: versionMatch[1], assets };
}

export async function computeServiceWorkerCoreDigest(docsRoot, source) {
  const state = parseServiceWorkerState(source);
  const pieces = [];
  for (const asset of state.assets) {
    const url = new URL(asset, "https://example.invalid/");
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (relative === "" || relative.includes("..")) {
      throw new Error(`Unsafe CORE_ASSETS path: ${asset}`);
    }
    const absolute = path.resolve(docsRoot, ...relative.split("/"));
    const relation = path.relative(docsRoot, absolute);
    if (relation.startsWith("..") || path.isAbsolute(relation)) {
      throw new Error(`CORE_ASSETS path escapes docs/: ${asset}`);
    }
    const info = await stat(absolute).catch(() => null);
    if (!info?.isFile()) throw new Error(`CORE_ASSETS file is missing: ${asset}`);
    pieces.push(`${asset}\0${await sha256File(absolute)}\n`);
  }
  return {
    version: state.version,
    assets: state.assets,
    coreAssetsSha256: sha256Buffer(Buffer.from(pieces.join(""), "utf8")),
  };
}

export function validateServiceWorkerBaseline(current, baseline, { mode = "verify" } = {}) {
  if (!baseline || typeof baseline.version !== "string" || !SHA256_RE.test(baseline.coreAssetsSha256 ?? "")) {
    throw new Error("verification/pwa-cache-state.json is invalid.");
  }

  const versionChanged = current.version !== baseline.version;
  const assetsChanged = current.coreAssetsSha256 !== baseline.coreAssetsSha256;

  if (!versionChanged && assetsChanged) {
    throw new Error(
      `PWA core assets changed but docs/sw.js VERSION did not (${current.version}). `
      + "Bump the cache VERSION deliberately, then run release preparation again.",
    );
  }

  if (mode === "verify" && (versionChanged || assetsChanged)) {
    throw new Error(
      "PWA cache baseline drift detected. Run release preparation after reviewing the docs/sw.js VERSION change.",
    );
  }

  return {
    changed: versionChanged || assetsChanged,
    nextBaseline: {
      version: current.version,
      coreAssetsSha256: current.coreAssetsSha256,
    },
  };
}
