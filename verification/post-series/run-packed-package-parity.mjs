#!/usr/bin/env node
"use strict";

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  FOUNDATION_JDN,
  finalPastafarianTuple,
  sauce as referenceSauce,
  serializeBigInts,
} from "../reference-oracle/reference.mjs";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const OUT_DIR = path.join(ROOT, "artifacts/post-series");
const JSON_OUT = path.join(OUT_DIR, "PACKED-PACKAGE-PARITY.json");
const MD_OUT = path.join(OUT_DIR, "PACKED-PACKAGE-PARITY.md");
const SHA_OUT = path.join(OUT_DIR, "SHA256SUMS");
const PACKAGE_NAME = "pastafari-calendar";
const SAUCE_CASES = 3;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function sha256File(file) {
  return sha256(await readFile(file));
}

function serializeError(error) {
  return {
    name: error?.name ?? "Error",
    message: String(error?.message ?? error),
    stack: error?.stack ? String(error.stack) : null,
  };
}

function run(command, args, options = {}) {
  const child = spawnSync(command, args, {
    cwd: options.cwd ?? ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    timeout: options.timeoutMs ?? 10 * 60_000,
    env: options.env ?? process.env,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) {
    const error = new Error(
      `${command} ${args.join(" ")} failed with exit ${child.status}\n`
      + `${child.stdout ?? ""}\n${child.stderr ?? ""}`,
    );
    error.stdout = child.stdout;
    error.stderr = child.stderr;
    error.status = child.status;
    throw error;
  }
  return child.stdout ?? "";
}

function gitValue(args, fallback = null) {
  try {
    return run("git", args, { timeoutMs: 30_000 }).trim();
  } catch {
    return fallback;
  }
}

async function walkFiles(root) {
  const files = [];
  async function visit(dir, prefix = "") {
    const entries = await readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await visit(abs, rel);
      else if (entry.isFile()) files.push(rel);
    }
  }
  await visit(root);
  return files;
}

async function pack(destination) {
  await mkdir(destination, { recursive: true });
  const stdout = run(
    "npm",
    ["pack", "--json", "--pack-destination", destination],
    { timeoutMs: 15 * 60_000 },
  );
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed) && parsed.length === 1, "npm pack must return exactly one package");
  const item = parsed[0];
  const tarball = path.join(destination, item.filename);
  await access(tarball);
  return {
    filename: item.filename,
    tarball,
    sha256: await sha256File(tarball),
    files: (item.files ?? []).map((row) => row.path).sort(),
  };
}

async function extractTarball(tarball, destination) {
  await mkdir(destination, { recursive: true });
  run("tar", ["-xzf", tarball, "-C", destination], { timeoutMs: 5 * 60_000 });
  const packageRoot = path.join(destination, "package");
  await access(packageRoot);
  return packageRoot;
}

async function digestMap(root) {
  const result = {};
  for (const rel of await walkFiles(root)) {
    result[rel] = await sha256File(path.join(root, ...rel.split("/")));
  }
  return result;
}

async function comparePackedPayloadToRepository(packageRoot) {
  const packageFiles = await walkFiles(packageRoot);
  const mismatches = [];
  const rows = [];
  for (const rel of packageFiles) {
    const source = path.join(ROOT, ...rel.split("/"));
    let sourceExists = true;
    try { await access(source); } catch { sourceExists = false; }
    const packedHash = await sha256File(path.join(packageRoot, ...rel.split("/")));
    const sourceHash = sourceExists ? await sha256File(source) : null;
    const match = sourceExists && packedHash === sourceHash;
    rows.push({ path: rel, sourceHash, packedHash, match });
    if (!match) mismatches.push({ path: rel, sourceExists, sourceHash, packedHash });
  }
  return { packageFiles, rows, mismatches };
}

function collectPairs(value, output) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) collectPairs(item, output);
    return;
  }
  const candidates = [value, value.input].filter(Boolean);
  for (const candidate of candidates) {
    if (
      candidate
      && typeof candidate === "object"
      && candidate.calculationJdn !== undefined
      && candidate.targetJdn !== undefined
    ) {
      output.add(`${String(candidate.calculationJdn)}|${String(candidate.targetJdn)}`);
    }
  }
  for (const item of Object.values(value)) collectPairs(item, output);
}

async function knownCorpusPairs() {
  const files = [
    "verification/update17/generated/normative-sauce-vectors.json",
    "verification/update17/generated/normative-final-tuples.json",
    "verification/update17/holdout-audit.json",
    "verification/update17/generated/hand-discriminators.json",
  ];
  const pairs = new Set();
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    try {
      collectPairs(JSON.parse(await readFile(abs, "utf8")), pairs);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  return pairs;
}

function derivePair(headSha, index, salt = 0) {
  const digest = createHash("sha256")
    .update(`post-series-packed-package-parity:${headSha}:${index}:${salt}`)
    .digest();
  const span = 400_001;
  const cOffset = digest.readUInt32BE(0) % span - 200_000;
  let tOffset = digest.readUInt32BE(4) % span - 200_000;
  if (tOffset === cOffset) tOffset = tOffset === 200_000 ? tOffset - 1 : tOffset + 1;
  return {
    calculationJdn: FOUNDATION_JDN + BigInt(cOffset),
    targetJdn: FOUNDATION_JDN + BigInt(tOffset),
    offsetsFromFoundation: { calculation: cOffset, target: tOffset },
  };
}

async function freshPairs(headSha) {
  const corpus = await knownCorpusPairs();
  const selected = [];
  const selectedKeys = new Set();
  for (let index = 0; index < SAUCE_CASES; index += 1) {
    let salt = 0;
    while (true) {
      const pair = derivePair(headSha, index, salt);
      const key = `${pair.calculationJdn}|${pair.targetJdn}`;
      if (!corpus.has(key) && !selectedKeys.has(key)) {
        selected.push({ ...pair, derivationIndex: index, derivationSalt: salt });
        selectedKeys.add(key);
        break;
      }
      salt += 1;
    }
  }
  return { selected, corpusPairCount: corpus.size, collisionCount: 0 };
}

function normalizeReferenceSauce(calculationJdn, targetJdn) {
  const result = referenceSauce(calculationJdn, targetJdn, { detail: "summary" });
  return {
    bowls: result.final.bowls.map(String),
    finalDropOrder: result.final.lastDropPermutation.map(Number),
  };
}

function canonicalTuple(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}

async function createHelper(temp) {
  const helper = path.join(temp, "package-parity-child.mjs");
  await writeFile(helper, `
import { pathToFileURL } from "node:url";

function makeRandom(seed) {
  let state = Number(seed) >>> 0;
  if (state === 0) state = 0x6d2b79f5;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x1_0000_0000;
  };
}
function canonicalTuple(value) {
  const source = typeof value?.toJSON === "function" ? value.toJSON() : value;
  return {
    year: String(source.year),
    cutletName: String(source.cutletName),
    dayInCutlet: Number(source.dayInCutlet),
    monthName: String(source.monthName),
    dayInMonth: Number(source.dayInMonth),
  };
}
const [mode, entry, seedText] = process.argv.slice(2);
Math.random = makeRandom(Number(seedText));
const mod = await import(pathToFileURL(entry).href + "?postSeriesParity=" + encodeURIComponent(seedText));
if (mode === "exports") {
  process.stdout.write(JSON.stringify(Object.keys(mod).sort()));
} else if (mode === "sauce") {
  const pairs = JSON.parse(process.env.PASTAFARI_PACKAGE_PARITY_PAIRS || "[]");
  const rows = pairs.map((pair) => {
    const raw = mod.makeSauceUncached(BigInt(pair.calculationJdn), BigInt(pair.targetJdn));
    return {
      calculationJdn: String(pair.calculationJdn),
      targetJdn: String(pair.targetJdn),
      bowls: raw.bowls.map((value) => String(value)),
      finalDropOrder: raw.finalDropOrder.map((value) => Number(value) + 1),
    };
  });
  process.stdout.write(JSON.stringify(rows));
} else if (mode === "tuple") {
  const payload = JSON.parse(process.env.PASTAFARI_PACKAGE_PARITY_TUPLE || "{}");
  const calendar = new mod.PastafariCalendar({
    todayProvider: () => new mod.GregorianDate(2000n, 1, 1),
  });
  const result = calendar.convertJdn(BigInt(payload.targetJdn), {
    calculationJdn: BigInt(payload.calculationJdn),
  });
  process.stdout.write(JSON.stringify(canonicalTuple(result)));
} else {
  throw new Error("unknown child mode: " + mode);
}
`, "utf8");
  return helper;
}

function runHelper(helper, mode, entry, seed, env = {}, timeoutMs = 20 * 60_000) {
  const stdout = run(process.execPath, [helper, mode, entry, String(seed)], {
    timeoutMs,
    env: { ...process.env, ...env },
  });
  return JSON.parse(stdout);
}

async function writeEvidence(report) {
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(JSON_OUT, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  const markdown = [
    "# Post-series packed-package parity closure",
    "",
    `- Status: **${report.status}**`,
    `- Commit: \`${report.repository?.headSha ?? "unknown"}\``,
    `- Tree: \`${report.repository?.treeSha ?? "unknown"}\``,
    `- Package: \`${report.package?.filename ?? "unknown"}\``,
    `- Package SHA-256: \`${report.package?.sha256 ?? "unknown"}\``,
    `- Repeated pack SHA-256: \`${report.package?.secondSha256 ?? "unknown"}\``,
    `- Byte-identical repeated pack: **${report.package?.byteIdenticalAcrossPacks === true ? "YES" : "NO"}**`,
    `- Packed payload byte-identical to repository sources: **${report.package?.payloadMatchesRepository === true ? "YES" : "NO"}**`,
    `- Installed payload identical to packed payload: **${report.package?.installedPayloadMatchesPacked === true ? "YES" : "NO"}**`,
    `- Public export inventory parity: **${report.package?.publicExportParity === true ? "YES" : "NO"}**`,
    `- Fresh sauce cases: **${report.normative?.saucePassed ?? 0}/${report.normative?.sauceTotal ?? 0}**`,
    `- Full installed-package tuple: **${report.normative?.fullTupleMatch === true ? "PASS" : "FAIL"}**`,
    `- Known-corpus collisions: **${report.normative?.corpusCollisionCount ?? "unknown"}**`,
    "",
    report.status === "PASS"
      ? "The packed and clean-installed package is independently equivalent to the current audited source for the tested normative behavior."
      : `Failure: ${report.error?.message ?? "unknown"}`,
    "",
  ].join("\n");
  await writeFile(MD_OUT, markdown, "utf8");
  const rows = [
    `${await sha256File(JSON_OUT)}  ./PACKED-PACKAGE-PARITY.json`,
    `${await sha256File(MD_OUT)}  ./PACKED-PACKAGE-PARITY.md`,
  ];
  await writeFile(SHA_OUT, `${rows.join("\n")}\n`, "utf8");
}

async function main() {
  const startedAt = new Date().toISOString();
  const packageJson = JSON.parse(await readFile(path.join(ROOT, "package.json"), "utf8"));
  const fallbackSha = sha256(await readFile(path.join(ROOT, "package.json"))).slice(0, 40);
  const headSha = gitValue(["rev-parse", "HEAD"], fallbackSha);
  const treeSha = gitValue(["rev-parse", "HEAD^{tree}"], null);
  const report = {
    schema: "pastafari.post-series.packed-package-parity.v1",
    status: "FAIL",
    startedAt,
    completedAt: null,
    environment: {
      node: process.version,
      npm: run("npm", ["--version"], { timeoutMs: 30_000 }).trim(),
      platform: `${process.platform}-${process.arch}`,
    },
    repository: {
      headSha,
      treeSha,
      packageVersion: packageJson.version,
      dirtyBefore: gitValue(["status", "--porcelain"], "") !== "",
    },
    package: {},
    normative: {},
    error: null,
  };

  const temp = await mkdtemp(path.join(os.tmpdir(), "pastafari-post-series-pack-"));
  try {
    const first = await pack(path.join(temp, "pack-a"));
    const second = await pack(path.join(temp, "pack-b"));
    assert.equal(first.filename, second.filename, "repeated npm pack changed filename");
    assert.equal(first.sha256, second.sha256, "repeated npm pack is not byte-identical");
    assert.deepEqual(first.files, second.files, "repeated npm pack changed file inventory");

    const extractedRoot = await extractTarball(first.tarball, path.join(temp, "extract"));
    const payloadComparison = await comparePackedPayloadToRepository(extractedRoot);
    assert.equal(payloadComparison.mismatches.length, 0, `packed payload differs from repository in ${payloadComparison.mismatches.length} file(s)`);

    const forbidden = payloadComparison.packageFiles.filter((rel) =>
      rel === "test" || rel.startsWith("test/")
      || rel === "verification" || rel.startsWith("verification/")
      || rel === "artifacts" || rel.startsWith("artifacts/")
      || rel === ".github" || rel.startsWith(".github/")
      || rel === "node_modules" || rel.startsWith("node_modules/"),
    );
    assert.deepEqual(forbidden, [], `development/audit files leaked into package: ${forbidden.join(", ")}`);

    const consumer = path.join(temp, "consumer");
    await mkdir(consumer, { recursive: true });
    await writeFile(path.join(consumer, "package.json"), JSON.stringify({ private: true, type: "module" }, null, 2), "utf8");
    run(
      "npm",
      ["install", "--ignore-scripts", "--no-audit", "--no-fund", "--package-lock=false", first.tarball],
      { cwd: consumer, timeoutMs: 15 * 60_000 },
    );
    const installedRoot = path.join(consumer, "node_modules", PACKAGE_NAME);
    await access(installedRoot);
    const installedPackageJson = JSON.parse(await readFile(path.join(installedRoot, "package.json"), "utf8"));
    assert.equal(installedPackageJson.version, packageJson.version, "installed package version mismatch");

    const packedDigest = await digestMap(extractedRoot);
    const installedDigest = await digestMap(installedRoot);
    assert.deepEqual(installedDigest, packedDigest, "clean-installed package payload differs from packed payload");

    const helper = await createHelper(temp);
    const sourcePublic = path.join(ROOT, "src/public-api.js");
    const installedPublic = path.join(installedRoot, "src/public-api.js");
    const sourceExports = runHelper(helper, "exports", sourcePublic, 0x51a7e001);
    const installedExports = runHelper(helper, "exports", installedPublic, 0x51a7e002);
    assert.deepEqual(installedExports, sourceExports, "public export inventory differs after clean install");

    const fresh = await freshPairs(headSha);
    const pairPayload = fresh.selected.map((row) => ({
      calculationJdn: String(row.calculationJdn),
      targetJdn: String(row.targetJdn),
    }));
    const pairEnv = { PASTAFARI_PACKAGE_PARITY_PAIRS: JSON.stringify(pairPayload) };
    const sourceCore = path.join(ROOT, "browser/pastafari-calendar-core.js");
    const packedCore = path.join(extractedRoot, "browser/pastafari-calendar-core.js");
    const installedCore = path.join(installedRoot, "browser/pastafari-calendar-core.js");
    const sourceSauce = runHelper(helper, "sauce", sourceCore, 0x51a7e101, pairEnv);
    const packedSauce = runHelper(helper, "sauce", packedCore, 0x51a7e202, pairEnv);
    const installedSauce = runHelper(helper, "sauce", installedCore, 0x51a7e303, pairEnv);

    const sauceRows = [];
    for (let index = 0; index < fresh.selected.length; index += 1) {
      const pair = fresh.selected[index];
      const expected = normalizeReferenceSauce(pair.calculationJdn, pair.targetJdn);
      const sourceActual = {
        bowls: sourceSauce[index].bowls,
        finalDropOrder: sourceSauce[index].finalDropOrder,
      };
      const packedActual = {
        bowls: packedSauce[index].bowls,
        finalDropOrder: packedSauce[index].finalDropOrder,
      };
      const installedActual = {
        bowls: installedSauce[index].bowls,
        finalDropOrder: installedSauce[index].finalDropOrder,
      };
      const sourceMatch = JSON.stringify(sourceActual) === JSON.stringify(expected);
      const packedMatch = JSON.stringify(packedActual) === JSON.stringify(expected);
      const installedMatch = JSON.stringify(installedActual) === JSON.stringify(expected);
      sauceRows.push({
        id: `fresh-package-sauce-${index + 1}`,
        calculationJdn: String(pair.calculationJdn),
        targetJdn: String(pair.targetJdn),
        offsetsFromFoundation: pair.offsetsFromFoundation,
        derivationIndex: pair.derivationIndex,
        derivationSalt: pair.derivationSalt,
        expected,
        source: sourceActual,
        packed: packedActual,
        installed: installedActual,
        sourceMatch,
        packedMatch,
        installedMatch,
        status: sourceMatch && packedMatch && installedMatch ? "PASS" : "MISMATCH",
      });
    }
    assert.equal(sauceRows.filter((row) => row.status === "PASS").length, sauceRows.length, "fresh packed-package sauce parity mismatch");

    const tupleInput = {
      calculationJdn: String(FOUNDATION_JDN),
      targetJdn: String(FOUNDATION_JDN),
    };
    const expectedTuple = canonicalTuple(serializeBigInts(finalPastafarianTuple(FOUNDATION_JDN, FOUNDATION_JDN)));
    const installedTuple = runHelper(
      helper,
      "tuple",
      installedPublic,
      0x51a7e404,
      { PASTAFARI_PACKAGE_PARITY_TUPLE: JSON.stringify(tupleInput) },
      30 * 60_000,
    );
    assert.deepEqual(installedTuple, expectedTuple, "installed package full Pastafarian tuple differs from independent reference");

    report.package = {
      filename: first.filename,
      sha256: first.sha256,
      secondSha256: second.sha256,
      byteIdenticalAcrossPacks: first.sha256 === second.sha256,
      fileCount: first.files.length,
      payloadMatchesRepository: payloadComparison.mismatches.length === 0,
      payloadMismatchCount: payloadComparison.mismatches.length,
      installedPayloadMatchesPacked: JSON.stringify(installedDigest) === JSON.stringify(packedDigest),
      installedVersion: installedPackageJson.version,
      publicExportCount: installedExports.length,
      publicExportParity: JSON.stringify(installedExports) === JSON.stringify(sourceExports),
      forbiddenPackedPaths: forbidden,
    };
    report.normative = {
      freshSeedSource: "SHA-256(post-series-packed-package-parity:<current HEAD>:case:salt)",
      corpusPairCount: fresh.corpusPairCount,
      corpusCollisionCount: fresh.collisionCount,
      sauceTotal: sauceRows.length,
      saucePassed: sauceRows.filter((row) => row.status === "PASS").length,
      sauceRows,
      fullTupleInput: tupleInput,
      fullTupleExpected: expectedTuple,
      fullTupleInstalled: installedTuple,
      fullTupleMatch: JSON.stringify(installedTuple) === JSON.stringify(expectedTuple),
    };
    report.repository.dirtyAfter = gitValue(["status", "--porcelain"], "") !== "";
    report.status = "PASS";
  } catch (error) {
    report.error = serializeError(error);
    report.repository.dirtyAfter = gitValue(["status", "--porcelain"], "") !== "";
    process.exitCode = 1;
  } finally {
    report.completedAt = new Date().toISOString();
    await writeEvidence(report);
    await rm(temp, { recursive: true, force: true });
  }

  if (report.status === "PASS") {
    process.stdout.write("POST_SERIES_PACKED_PACKAGE_PARITY=PASS\n");
  } else {
    process.stderr.write(`POST_SERIES_PACKED_PACKAGE_PARITY=FAIL: ${report.error?.message ?? "unknown"}\n`);
  }
}

main().catch(async (error) => {
  try {
    await writeEvidence({
      schema: "pastafari.post-series.packed-package-parity.v1",
      status: "FAIL",
      completedAt: new Date().toISOString(),
      error: serializeError(error),
    });
  } catch {}
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
