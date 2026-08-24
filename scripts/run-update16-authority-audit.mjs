#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SCROLL_SHA256 = "d36b0c944b4685d1aa1d89bb20a8dd530ee3167c897dcdf85161a7ec0dde9c96";
const AUTHORITY_WORD = /(spec|canonical|oracle|reference|golden|expected|conformance)/i;
const GENERATOR_WORD = /(generate|generator|fixture|vector)/i;
const SOURCE_EXT = /\.(?:mjs|js|py|rb|c|cc|cpp|h|hpp|java|json|md|yml|yaml|tsv|txt)$/i;
const SKIP_DIRS = new Set([".git", "node_modules", ".DS_Store"]);

async function walk(dir = ".") {
  const out = [];
  for (const entry of await readdir(path.join(ROOT, dir), { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const rel = dir === "." ? entry.name : `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...await walk(rel));
    else if (SOURCE_EXT.test(entry.name)) out.push(rel);
  }
  return out.sort();
}

async function readJson(rel) {
  return JSON.parse(await readFile(path.join(ROOT, rel), "utf8"));
}

async function sha256(rel) {
  return createHash("sha256").update(await readFile(path.join(ROOT, rel))).digest("hex");
}

function fail(message, evidence = {}) {
  const error = new Error(message);
  error.evidence = evidence;
  throw error;
}

function requireNoForbiddenReferenceText(referenceText) {
  const forbidden = [
    `from "../../browser/`, "from '../../browser/", `from "../../src/`, "from '../../src/",
    "implementations/tests/generate_", "conformance-vectors.json", "spec-derived-canonical-vectors.json",
    "oracle-differential-10000.tsv", "Math.random", "Intl.", "Intl("
  ];
  const hits = forbidden.filter((needle) => referenceText.includes(needle));
  if (hits.length) fail("reference contains forbidden dependency/fallback text", { hits });
  if (/^\s*import\s/m.test(referenceText)) fail("reference.mjs must remain zero-import", {});
}

function authorityNamedSymbols(rel, text) {
  const results = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    const matches = line.match(new RegExp(AUTHORITY_WORD, "ig"));
    if (matches) results.push({ path: rel, line: index + 1, terms: [...new Set(matches.map((m) => m.toLowerCase()))] });
  });
  return results;
}

async function main() {
  const write = process.argv.includes("--write");
  const files = await walk();
  const authorityPaths = files.filter((rel) => AUTHORITY_WORD.test(rel));
  const generatorLikePaths = files.filter((rel) => GENERATOR_WORD.test(rel) || /vectors?|fixtures?|corpus/i.test(rel));

  const registry = await readJson("verification/update16/authority-registry.json");
  const graph = await readJson("verification/update16/dependency-graph.json");
  const coverage = await readJson("verification/update16/coverage-matrix.json");
  const vectorProvenance = await readJson("verification/update16/vector-provenance.json");

  const components = new Map(registry.components.map((entry) => [entry.component, entry]));
  for (const required of [
    "sources/מגילת העיתים.md",
    "verification/reference-oracle/reference.mjs",
    "implementations/tests/generate_spec_canonical.py",
    "implementations/tests/conformance-vectors.json",
    "implementations/tests/spec-derived-canonical-vectors.json",
  ]) {
    if (!components.has(required)) fail("authority registry missing required component", { required });
  }

  const scrollHash = await sha256("sources/מגילת העיתים.md");
  if (scrollHash !== SCROLL_SHA256) fail("scroll SHA-256 mismatch", { expected: SCROLL_SHA256, actual: scrollHash });

  const referenceText = await readFile(path.join(ROOT, "verification/reference-oracle/reference.mjs"), "utf8");
  requireNoForbiddenReferenceText(referenceText);

  const productionImportHits = [];
  for (const rel of files.filter((file) => /^(?:src|browser|docs\/engine)\//.test(file) && /\.(?:mjs|js)$/i.test(file))) {
    const text = await readFile(path.join(ROOT, rel), "utf8");
    if (/verification\/reference-oracle|verification\\reference-oracle|reference-oracle\/reference\.mjs/.test(text)) {
      productionImportHits.push(rel);
    }
  }
  if (productionImportHits.length) fail("production path imports reference runtime", { productionImportHits });

  const generator = await readFile(path.join(ROOT, "implementations/tests/generate_spec_canonical.py"), "utf8");
  if (!generator.includes("normativeAuthority") || !generator.includes("historical-fixture-generator")) {
    fail("legacy generator lacks explicit non-authority metadata", {});
  }
  if (!/bowl_sum \+ round_number/.test(generator)) fail("generator no longer visibly uses bowl_sum in final-stir u", {});
  if (!/order_number = saved\(bowl_sum \+ 149 \* round_number\)/.test(generator)) {
    fail("generator no longer visibly keeps order_number limited to order selection", {});
  }

  for (const vectorPath of ["implementations/tests/conformance-vectors.json", "implementations/tests/spec-derived-canonical-vectors.json"]) {
    const vector = await readJson(vectorPath);
    if (vector.authority?.normativeAuthority !== false) {
      fail("legacy vector file is not explicitly marked non-normative", { vectorPath });
    }
  }

  const forbiddenEdges = graph.edges.filter((edge) => edge.allowed === false);
  if (forbiddenEdges.length < 4) fail("dependency graph lacks forbidden dependency directions", {});
  const uncovered = coverage.components.filter((entry) => entry.reference === "notImplemented").map((entry) => entry.component);
  for (const component of ["cutlets", "months", "final tuple"]) {
    if (!uncovered.includes(component)) fail("coverage matrix must explicitly mark core incomplete stage", { component });
  }
  if (!vectorProvenance.vectors.every((entry) => entry.normativeAuthority === false)) {
    fail("vector provenance contains an authority-bearing generated vector", {});
  }

  const symbolHits = [];
  for (const rel of authorityPaths) {
    if (/\.json$/i.test(rel)) continue;
    const text = await readFile(path.join(ROOT, rel), "utf8");
    symbolHits.push(...authorityNamedSymbols(rel, text));
  }

  const updatesEvidence = {
    update09: files.includes("test/update09-proleptic-negative-year.test.js"),
    update11: files.includes("test/update11-vikrama.test.js"),
    update12: files.includes("test/update12-koki-proleptic.test.js"),
    update13: files.includes("test/update13-intl-semantic-firewall.test.js"),
    update14: files.includes("test/month-weaving-domain.test.js"),
    update15: files.includes("test/update15-random-witness-isolation.test.js"),
  };
  if (Object.values(updatesEvidence).some((value) => value !== true)) fail("missing update evidence", updatesEvidence);

  const report = {
    schema: "pastafari-update16-authority-audit-result-v1",
    status: "PASS",
    headCommitChecked: "6b9d49361633b91d7c3e8fe58b514d5650791f1e",
    packageVersion: (await readJson("package.json")).version,
    scrollSha256: scrollHash,
    referenceSha256: await sha256("verification/reference-oracle/reference.mjs"),
    authorityNamedPathCount: authorityPaths.length,
    authorityNamedPaths: authorityPaths,
    authorityNamedSymbolCount: symbolHits.length,
    generatorFixtureVectorPathCount: generatorLikePaths.length,
    generatorFixtureVectorPaths: generatorLikePaths,
    updatesEvidence,
    notImplementedReferenceStages: uncovered,
    forbiddenDependencyEdges: forbiddenEdges,
    productionReferenceImportHits: productionImportHits,
    normativePassRule: registry.normativePassRule,
  };

  if (write) {
    await mkdir(path.join(ROOT, "artifacts/update16"), { recursive: true });
    await writeFile(path.join(ROOT, "artifacts/update16/oracle-authority-audit.json"), JSON.stringify(report, null, 2) + "\n", "utf8");
  }
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  if (error.evidence) console.error(JSON.stringify(error.evidence, null, 2));
  process.exit(1);
});
