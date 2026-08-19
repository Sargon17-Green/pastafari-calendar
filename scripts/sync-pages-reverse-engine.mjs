import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const BROWSER_DIR = path.join(ROOT, "browser");
const DOCS_ENGINE_DIR = path.join(ROOT, "docs", "engine");

const FILES = Object.freeze([
  "pastafari-calendar-fast.js",
  "pastafari-fast-worker.js",
  "pastafari-constraints-client.js",
  "pastafari-constraints.js",
  "pastafari-reverse-worker.js",
  "pastafari-diagnostics.js",
]);

const VERIFY_ONLY = process.argv.includes("--verify");
const unknown = process.argv.slice(2).filter((argument) => argument !== "--verify");
if (unknown.length > 0) {
  throw new Error(`Unknown argument(s): ${unknown.join(", ")}`);
}

async function sameBytes(leftPath, rightPath) {
  const [left, right] = await Promise.all([readFile(leftPath), readFile(rightPath)]);
  return left.equals(right);
}

await mkdir(DOCS_ENGINE_DIR, { recursive: true });

for (const fileName of FILES) {
  const source = path.join(BROWSER_DIR, fileName);
  const target = path.join(DOCS_ENGINE_DIR, fileName);

  if (!VERIFY_ONLY) await copyFile(source, target);

  let matches = false;
  try {
    matches = await sameBytes(source, target);
  } catch (error) {
    if (VERIFY_ONLY && error?.code === "ENOENT") {
      throw new Error(
        `Pages reverse-engine artifact is missing: docs/engine/${fileName}. Run npm run sync:pages-reverse.`,
      );
    }
    throw error;
  }

  if (!matches) {
    throw new Error(
      `Pages reverse-engine drift for ${fileName}. Run npm run sync:pages-reverse and review the diff.`,
    );
  }
  process.stdout.write(`${VERIFY_ONLY ? "verified" : "synced"} ${fileName}\n`);
}
