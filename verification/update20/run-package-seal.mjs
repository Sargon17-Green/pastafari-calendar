"use strict";

import { mkdtemp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { ROOT, sha256File, unzipList, unzipText, writeJson, requireRun } from "./lib.mjs";

const update19Zip = path.join(ROOT, "artifacts/final-release/update19-final-evidence.zip");
const apiEntry = unzipList(update19Zip).find((name) => name.endsWith("api-compatibility-audit.json"));
if (!apiEntry) throw new Error("Update 19 package inventory missing.");
const oldAudit = JSON.parse(unzipText(update19Zip, apiEntry));
const expectedContents = [...oldAudit.package.contents].sort();

async function pack(destination) {
  await mkdir(destination, { recursive: true });
  const raw = requireRun("npm", ["pack", "--json", "--pack-destination", destination], { timeoutMs: 10 * 60_000 }).stdout;
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length !== 1) throw new Error("Unexpected npm pack JSON.");
  const filename = parsed[0].filename;
  const tarball = path.join(destination, filename);
  const contents = (parsed[0].files ?? []).map((f) => f.path).sort();
  return { filename, tarball, contents, sha256: await sha256File(path.relative(ROOT, tarball).replaceAll("\\", "/")).catch(async () => {
    const { createHash } = await import("node:crypto");
    return createHash("sha256").update(await readFile(tarball)).digest("hex");
  }) };
}

async function extractDigestMap(tarball, destination) {
  await mkdir(destination, { recursive: true });
  requireRun("tar", ["-xzf", tarball, "-C", destination], { timeoutMs: 5 * 60_000 });
  const root = path.join(destination, "package");
  const rows = {};
  async function walk(dir, prefix = "") {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(abs, rel);
      else if (entry.isFile()) {
        const { createHash } = await import("node:crypto");
        rows[rel] = createHash("sha256").update(await readFile(abs)).digest("hex");
      }
    }
  }
  await walk(root);
  return rows;
}

const temp = await mkdtemp(path.join(tmpdir(), "pastafari-u20-pack-"));
try {
  const a = await pack(path.join(temp, "a"));
  const b = await pack(path.join(temp, "b"));
  const expectedFilename = "pastafari-calendar-1.4.0.tgz";
  const inventoryMatches = JSON.stringify(a.contents) === JSON.stringify(expectedContents) && JSON.stringify(b.contents) === JSON.stringify(expectedContents);
  let payloadEqual = true;
  let payloadDifferenceCount = 0;
  if (a.sha256 !== b.sha256) {
    const am = await extractDigestMap(a.tarball, path.join(temp, "xa"));
    const bm = await extractDigestMap(b.tarball, path.join(temp, "xb"));
    const keys = [...new Set([...Object.keys(am), ...Object.keys(bm)])];
    payloadDifferenceCount = keys.filter((key) => am[key] !== bm[key]).length;
    payloadEqual = payloadDifferenceCount === 0;
  }
  const status = a.filename === expectedFilename && b.filename === expectedFilename && inventoryMatches && payloadEqual ? "PASS" : "FAIL";
  const report = {
    schema: "pastafari.update20.package-seal.v1",
    status,
    oldVersion: "1.3.0",
    newVersion: "1.4.0",
    oldPackageArtifactHash: oldAudit.package.packageHash,
    oldPackageFileCount: expectedContents.length,
    packageArtifactHash: a.sha256,
    secondPackageArtifactHash: b.sha256,
    deterministicTarball: a.sha256 === b.sha256,
    semanticPayloadEqualAcrossBuilds: payloadEqual,
    payloadDifferenceCount,
    packageFilename: a.filename,
    packageFileCount: a.contents.length,
    inventoryMatchesUpdate19: inventoryMatches,
  };
  await writeJson("package-seal.json", report);
  if (status !== "PASS") process.exitCode = 1;
} finally {
  await rm(temp, { recursive: true, force: true });
}
