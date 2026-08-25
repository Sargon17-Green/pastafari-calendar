#!/usr/bin/env node
"use strict";
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const OUT=path.join(ROOT,"artifacts/update-19/ci-command-parity.json");
await mkdir(path.dirname(OUT),{recursive:true});
const commands=[
  ["npm",["run","security:supply-chain"]],
  ["npm",["run","gate-data:check"]],
  ["npm",["run","test:update16"]],
  ["npm",["run","test:update17"]],
  ["npm",["run","evidence:update17:stale"]],
  ["npm",["run","test:update17:matrix"]],
  ["npm",["run","test:update18"]],
  ["npm",["run","docs:check"]],
  ["npm",["run","check:reverse-i18n"]],
  ["npm",["run","check:i18n"]],
  ["npm",["run","build:standalone"]],
  ["npm",["run","test:update13:intl:standalone"]],
  ["git",["diff","--exit-code","--","browser/standalone/pastafari-date.js","browser/standalone/pastafari-date.min.js"]],
  ["npm",["test"]],
  ["npm",["run","test:compatibility"]],
  ["npm",["run","test:deep"]],
  ["npm",["run","checksums:verify"]],
  [process.execPath,["scripts/check-sha-manifest-completeness.mjs"]],
];
const rows=[];
for(const [cmd,args] of commands){
  const started=Date.now();
  const r=spawnSync(cmd,args,{cwd:ROOT,encoding:"utf8",timeout:30*60*1000,maxBuffer:64*1024*1024,env:{...process.env}});
  rows.push({command:[cmd,...args].join(" "),status:r.status,signal:r.signal,durationMs:Date.now()-started,pass:r.status===0,stdout:(r.stdout||"").slice(-12000),stderr:(r.stderr||"").slice(-12000)});
}
const failures=rows.filter(r=>!r.pass).map(r=>r.command);
const artifact={schema:"pastafari.update19.ci-command-parity.v1",generatedAt:new Date().toISOString(),status:failures.length?"FAIL":"PASS",failures,rows};
await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);
console.log(JSON.stringify({status:artifact.status,commands:rows.length,failures},null,2));
if(failures.length) process.exitCode=1;
