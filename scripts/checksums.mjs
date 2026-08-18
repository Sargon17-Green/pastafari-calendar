"use strict";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  atomicWriteFile,
  buildChecksumManifest,
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
  await atomicWriteFile(ROOT_MANIFEST, repository.text);

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
