"use strict";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WORKFLOW_DIR = path.join(ROOT, ".github", "workflows");
const PACKAGE_JSON = path.join(ROOT, "package.json");
const PACKAGE_LOCK = path.join(ROOT, "package-lock.json");
const NPMRC = path.join(ROOT, ".npmrc");

const FULL_SHA = /^[0-9a-f]{40}$/i;
const DOCKER_DIGEST = /^docker:\/\/[^\s@]+@sha256:[0-9a-f]{64}$/i;
const REGISTRY_PREFIX = "https://registry.npmjs.org/";
const INTEGRITY = /^sha(?:256|384|512)-[A-Za-z0-9+/=]+$/;
const ALLOWED_LIFECYCLE_PACKAGES = new Set([
  "esbuild@0.28.2",
  "fsevents@2.3.2",
]);
const WRITE_PERMISSION = /^\s*(?:actions|attestations|checks|contents|deployments|discussions|id-token|issues|models|packages|pages|pull-requests|repository-projects|security-events|statuses):\s*write\s*(?:#.*)?$/;

const errors = [];
const externalActionOccurrences = [];
const externalActions = new Set();
let localActionCount = 0;
let dockerActionCount = 0;
let mutableRefCount = 0;
let pullRequestWritePermissionCount = 0;

function fail(message) {
  errors.push(message);
}

function readText(filename) {
  return readFileSync(filename, "utf8");
}

function parseJson(filename, label) {
  try {
    return JSON.parse(readText(filename));
  } catch (error) {
    fail(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function sortedObject(value = {}) {
  return Object.fromEntries(
    Object.entries(value).sort(([left], [right]) => left.localeCompare(right)),
  );
}

function sameObject(left, right) {
  return JSON.stringify(sortedObject(left)) === JSON.stringify(sortedObject(right));
}

function packageNameFromLockPath(lockPath) {
  const marker = "node_modules/";
  const index = lockPath.lastIndexOf(marker);
  return index === -1 ? lockPath : lockPath.slice(index + marker.length);
}

function isGitOrUrlSpecifier(specifier) {
  return /^(?:git(?:\+[^:]+)?:|https?:|github:|gitlab:|bitbucket:)/i.test(specifier)
    || /(?:^|[/:])github\.com[/:]/i.test(specifier);
}

function scanWorkflow(filename) {
  const relative = path.relative(ROOT, filename).split(path.sep).join("/");
  const text = readText(filename);
  const lines = text.split(/\r?\n/);
  const hasPullRequest = lines.some((line) => /^\s{2}pull_request\s*:/.test(line));
  const hasPullRequestTarget = lines.some((line) => /^\s{2}pull_request_target\s*:/.test(line));
  const hasTopLevelPermissions = lines.some((line) => /^permissions:\s*(?:\{\s*\}|#.*)?$/.test(line));

  if (!hasTopLevelPermissions) {
    fail(`${relative}: missing explicit top-level permissions declaration`);
  }

  if (hasPullRequestTarget) {
    fail(`${relative}: pull_request_target is not allowed by the current supply-chain policy`);
  }

  if (hasPullRequest) {
    for (const [index, line] of lines.entries()) {
      if (/^\s*permissions:\s*write-all\s*(?:#.*)?$/.test(line) || WRITE_PERMISSION.test(line)) {
        pullRequestWritePermissionCount += 1;
        fail(`${relative}:${index + 1}: pull_request workflow grants write permission: ${line.trim()}`);
      }
    }
  }

  for (const [index, line] of lines.entries()) {
    const usesIndex = line.indexOf("uses:");
    if (usesIndex !== -1 && !/^\s*#/.test(line)) {
      const match = line.match(/^\s*(?:-\s*)?uses:\s*["']?([^"'#\s]+)["']?\s*(?:#.*)?$/);
      if (!match) {
        fail(`${relative}:${index + 1}: unable to safely parse uses: reference`);
        continue;
      }

      const target = match[1];
      if (target.startsWith("./")) {
        localActionCount += 1;
        continue;
      }

      if (target.startsWith("docker://")) {
        dockerActionCount += 1;
        if (!DOCKER_DIGEST.test(target)) {
          fail(`${relative}:${index + 1}: Docker action is not pinned by sha256 digest: ${target}`);
        }
        continue;
      }

      const at = target.lastIndexOf("@");
      if (at <= 0 || at === target.length - 1) {
        fail(`${relative}:${index + 1}: external action/reusable workflow has no immutable ref: ${target}`);
        mutableRefCount += 1;
        continue;
      }

      const action = target.slice(0, at);
      const ref = target.slice(at + 1);
      externalActionOccurrences.push({ action, ref, relative, line: index + 1 });
      externalActions.add(action);

      if (!FULL_SHA.test(ref)) {
        mutableRefCount += 1;
        fail(`${relative}:${index + 1}: external action/reusable workflow is not pinned to a full 40-hex commit SHA: ${target}`);
      }
    }

    if (/\bnpx\s+/.test(line) && !/^\s*#/.test(line)) {
      fail(`${relative}:${index + 1}: npx is forbidden in CI because it can fall back to remote package execution; invoke the locked local binary instead`);
    }
  }
}

if (!existsSync(WORKFLOW_DIR)) {
  fail(".github/workflows is missing");
} else {
  const workflows = readdirSync(WORKFLOW_DIR)
    .filter((name) => /\.ya?ml$/i.test(name))
    .sort();
  if (workflows.length === 0) {
    fail("no GitHub Actions workflow files found");
  }
  for (const workflow of workflows) {
    scanWorkflow(path.join(WORKFLOW_DIR, workflow));
  }
}

if (!existsSync(PACKAGE_JSON)) {
  fail("package.json is missing");
}
if (!existsSync(PACKAGE_LOCK)) {
  fail("package-lock.json is missing");
}

const packageJson = existsSync(PACKAGE_JSON) ? parseJson(PACKAGE_JSON, "package.json") : null;
const lock = existsSync(PACKAGE_LOCK) ? parseJson(PACKAGE_LOCK, "package-lock.json") : null;

let directDependencyCount = 0;
let devDependencyCount = 0;
let directGitOrUrlCount = 0;
const lifecyclePackages = new Set();

if (packageJson) {
  const dependencies = packageJson.dependencies ?? {};
  const devDependencies = packageJson.devDependencies ?? {};
  directDependencyCount = Object.keys(dependencies).length;
  devDependencyCount = Object.keys(devDependencies).length;

  for (const [name, specifier] of Object.entries({ ...dependencies, ...devDependencies })) {
    if (typeof specifier !== "string") {
      fail(`package.json dependency ${name} has a non-string specifier`);
      continue;
    }
    if (isGitOrUrlSpecifier(specifier)) {
      directGitOrUrlCount += 1;
      fail(`package.json dependency ${name} uses a Git/URL specifier: ${specifier}`);
    }
  }

  for (const [scriptName, command] of Object.entries(packageJson.scripts ?? {})) {
    if (typeof command === "string" && /\bnpx\s+/.test(command)) {
      fail(`package.json script ${scriptName} uses npx; invoke a project-local binary or a locked npm script instead`);
    }
  }
}

if (lock) {
  if (lock.lockfileVersion !== 3) {
    fail(`package-lock.json lockfileVersion must be 3; found ${String(lock.lockfileVersion)}`);
  }
  if (!lock.packages || typeof lock.packages !== "object" || !lock.packages[""]) {
    fail("package-lock.json is missing packages[''] root metadata");
  } else if (packageJson) {
    const root = lock.packages[""];
    if (!sameObject(root.dependencies ?? {}, packageJson.dependencies ?? {})) {
      fail("package-lock.json root dependencies do not match package.json");
    }
    if (!sameObject(root.devDependencies ?? {}, packageJson.devDependencies ?? {})) {
      fail("package-lock.json root devDependencies do not match package.json");
    }
  }

  for (const [lockPath, metadata] of Object.entries(lock.packages ?? {})) {
    if (lockPath === "" || !metadata || typeof metadata !== "object") continue;
    const name = packageNameFromLockPath(lockPath);
    const version = metadata.version;
    const resolved = metadata.resolved;

    if (typeof resolved === "string") {
      if (/^(?:git(?:\+[^:]+)?:|https?:)/i.test(resolved) && !resolved.startsWith(REGISTRY_PREFIX)) {
        fail(`package-lock.json entry ${lockPath} resolves outside the canonical npm registry: ${resolved}`);
      }
      if (resolved.startsWith(REGISTRY_PREFIX)) {
        if (typeof metadata.integrity !== "string" || !INTEGRITY.test(metadata.integrity)) {
          fail(`package-lock.json entry ${lockPath} is registry-resolved but has no valid integrity hash`);
        }
      }
    }

    if (metadata.hasInstallScript === true) {
      if (typeof version !== "string") {
        fail(`package-lock.json lifecycle-script entry ${lockPath} has no version`);
      } else {
        lifecyclePackages.add(`${name}@${version}`);
      }
    }
  }

  for (const observed of lifecyclePackages) {
    if (!ALLOWED_LIFECYCLE_PACKAGES.has(observed)) {
      fail(`unreviewed lifecycle-script package in package-lock.json: ${observed}`);
    }
  }
  for (const expected of ALLOWED_LIFECYCLE_PACKAGES) {
    if (!lifecyclePackages.has(expected)) {
      fail(`reviewed lifecycle-script allowlist is stale; expected lockfile entry is missing: ${expected}`);
    }
  }
}

if (existsSync(NPMRC)) {
  const npmrcLines = readText(NPMRC).split(/\r?\n/);
  for (const [index, raw] of npmrcLines.entries()) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith(";")) continue;
    const registry = line.match(/^registry\s*=\s*(.+)$/i);
    if (registry && registry[1].trim().replace(/\/$/, "/") !== REGISTRY_PREFIX) {
      fail(`.npmrc:${index + 1}: non-default registry requires explicit review: ${registry[1].trim()}`);
    }
    if (/^package-lock\s*=\s*false$/i.test(line)) {
      fail(`.npmrc:${index + 1}: package-lock=false defeats the repository lockfile policy`);
    }
  }
}

const pinnedCount = externalActionOccurrences.filter(({ ref }) => FULL_SHA.test(ref)).length;

console.log("Supply-chain inventory");
console.log(`External GitHub Action/reusable-workflow occurrences: ${externalActionOccurrences.length}`);
console.log(`Unique external GitHub Actions/reusable workflows: ${externalActions.size}`);
console.log(`Pinned to full SHA: ${pinnedCount}`);
console.log(`Mutable refs: ${mutableRefCount}`);
console.log(`Local Actions: ${localActionCount}`);
console.log(`Docker Actions: ${dockerActionCount}`);
console.log("");
console.log(`npm direct dependencies: ${directDependencyCount}`);
console.log(`npm devDependencies: ${devDependencyCount}`);
console.log(`Git/URL direct dependencies: ${directGitOrUrlCount}`);
console.log(`Lifecycle-script packages observed: ${lifecyclePackages.size}`);
for (const item of [...lifecyclePackages].sort()) console.log(`  - ${item}`);
console.log("");
console.log(`Write-permission declarations found in pull_request workflows: ${pullRequestWritePermissionCount}`);

if (errors.length > 0) {
  console.error("\nSupply-chain check: FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("\nSupply-chain check: PASS");
}
