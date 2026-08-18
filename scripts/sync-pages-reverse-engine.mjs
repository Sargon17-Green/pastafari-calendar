import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
const BROWSER_DIR = path.join(ROOT, "browser");
const DOCS_ENGINE_DIR = path.join(ROOT, "docs", "engine");

const FILES = Object.freeze([
  "pastafari-calendar-fast.js",
  "pastafari-constraints-client.js",
  "pastafari-constraints.js",
  "pastafari-reverse-worker.js",
]);

async function sameBytes(leftPath, rightPath) {
  const [left, right] = await Promise.all([readFile(leftPath), readFile(rightPath)]);
  return left.equals(right);
}

await mkdir(DOCS_ENGINE_DIR, { recursive: true });

for (const fileName of FILES) {
  const source = path.join(BROWSER_DIR, fileName);
  const target = path.join(DOCS_ENGINE_DIR, fileName);
  await copyFile(source, target);
  if (!await sameBytes(source, target)) {
    throw new Error(`Pages reverse-engine sync failed for ${fileName}.`);
  }
  process.stdout.write(`synced ${fileName}\n`);
}
