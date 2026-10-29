"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  atomicWriteFile,
  buildChecksumManifest,
  formatChecksumManifest,
  checksumPolicies,
  verifyChecksumManifest,
} from "./release-lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const ROOT_MANIFEST = path.join(ROOT, "SHA256SUMS.txt");
const DOCS_MANIFEST = path.join(DOCS, "SHA256SUMS.txt");

export async function generateChecksums() {
  const docs = await buildChecksumManifest(DOCS, checksumPolicies.docs);
  await atomicWriteFile(DOCS_MANIFEST, docs.text);

  const repository = await buildChecksumManifest(ROOT, checksumPolicies.repository);
  // The one deleted Kyrgyz workflow remains a frozen checksum record by explicit policy.
  const historical = {
    path: ".github/workflows/one-shot-kyrgyz-complete-policy-fix-final.yml",
    hash: "0d5475295bd76170b365f42220f6cdb1be0c00fc1600500f15821f0513492067",
  };
  const previous = await readFile(ROOT_MANIFEST, "utf8");
  if (!previous.split(/\r?\n/u).includes(`${historical.hash}  ./${historical.path}`)) {
    throw new Error("Historical Kyrgyz SHA record must remain unchanged in the root manifest.");
  }
  if (repository.entries.some((entry) => entry.path === historical.path)) {
    throw new Error("Historical Kyrgyz workflow unexpectedly exists again.");
  }
  const preserved = [...repository.entries, historical].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  await atomicWriteFile(ROOT_MANIFEST, formatChecksumManifest(preserved));

  return { docs: docs.entries.length, repository: repository.entries.length };
}

export async function verifyChecksums() {
  const docsText = await readFile(DOCS_MANIFEST, "utf8");
  const docs = await verifyChecksumManifest(DOCS, docsText, {
    ...checksumPolicies.docs,
    manifestName: "docs/SHA256SUMS.txt",
  });

  const rootText = await readFile(ROOT_MANIFEST, "utf8");
  const repository = await verifyChecksumManifest(ROOT, rootText, {
    ...checksumPolicies.repository,
    manifestName: "SHA256SUMS.txt",
    allowHistoricalRootOrphan: true,
  });

  return { docs: docs.count, repository: repository.count };
}

async function main() {
  const mode = process.argv[2];
  if (mode !== "generate" && mode !== "verify") {
    throw new Error("Usage: node scripts/checksums.mjs <generate|verify>");
  }
  const result = mode === "generate" ? await generateChecksums() : await verifyChecksums();
  process.stdout.write(
    `[checksums] ${mode.toUpperCase()} PASS — docs=${result.docs}, repository=${result.repository}\n`,
  );
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`[checksums] FAIL\n${error?.stack ?? error}`);
    process.exitCode = 1;
  });
}
