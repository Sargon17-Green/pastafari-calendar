#!/usr/bin/env node
"use strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const OUT=path.join(ROOT,"artifacts/update-19/audit-scope.json");
const base=process.env.UPDATE19_BASE_COMMIT||"01866e2b74823ca34639f226067d07ee15279249";
await mkdir(path.dirname(OUT),{recursive:true});
function git(args){return spawnSync("git",args,{cwd:ROOT,encoding:"utf8",timeout:120000,maxBuffer:8*1024*1024});}
const head=git(["rev-parse","HEAD"]);
const diff=git(["diff","--name-only",`${base}..HEAD`]);
const packageJson=JSON.parse(await readFile(path.join(ROOT,"package.json"),"utf8"));
const changed=(diff.stdout||"").split(/\r?\n/).filter(Boolean).sort();
const allowedExact=new Set([
  ".github/workflows/update-19-final-audit.yml",
  "UPDATE19-DELTA-MANIFEST.json",
  "SHA256SUMS.txt",
  "scripts/run-update19-browser-audit.mjs",
  "test/update19-browser-final-audit.html",
]);
const allowedPrefixes=["verification/update19/"];
const forbidden=changed.filter(p=>!allowedExact.has(p)&&!allowedPrefixes.some(prefix=>p.startsWith(prefix)));
const failures=[];
if(head.status!==0||diff.status!==0) failures.push("git-alignment");
if(packageJson.version!=="1.3.0") failures.push("version-changed");
if(forbidden.length) failures.push("non-audit-change-since-base");
const artifact={schema:"pastafari.update19.audit-scope.v1",generatedAt:new Date().toISOString(),baseCommit:base,harnessCommit:(head.stdout||"").trim()||null,packageVersion:packageJson.version,changedFiles:changed,allowedExact:[...allowedExact].sort(),allowedPrefixes,forbidden,status:failures.length?"FAIL":"PASS",failures};
await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);
console.log(JSON.stringify({status:artifact.status,baseCommit:base,harnessCommit:artifact.harnessCommit,changedFiles:changed.length,forbidden},null,2));
if(failures.length) process.exitCode=1;
