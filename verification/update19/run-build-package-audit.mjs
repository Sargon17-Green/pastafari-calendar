#!/usr/bin/env node
"use strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const OUT=path.join(ROOT,"artifacts/update-19/build-package-reproducibility.json");
await mkdir(path.dirname(OUT),{recursive:true});
function sh(cmd,args,opts={}){const r=spawnSync(cmd,args,{cwd:opts.cwd||ROOT,encoding:"utf8",timeout:opts.timeout||600000,maxBuffer:32*1024*1024,env:{...process.env,...opts.env}});return{command:[cmd,...args].join(" "),status:r.status,signal:r.signal,stdout:r.stdout||"",stderr:r.stderr||"",pass:r.status===0};}
async function hash(rel){return createHash("sha256").update(await readFile(path.join(ROOT,rel))).digest("hex");}
const packageJson=JSON.parse(await readFile(path.join(ROOT,"package.json"),"utf8"));
const commands=[];
const deterministic=["browser/standalone/pastafari-date.js","browser/standalone/pastafari-date.min.js"];
commands.push(sh("npm",["run","build:standalone"]));
const buildA=Object.fromEntries(await Promise.all(deterministic.map(async f=>[f,await hash(f)])));
commands.push(sh("npm",["run","build:standalone"]));
const buildB=Object.fromEntries(await Promise.all(deterministic.map(async f=>[f,await hash(f)])));
const buildReproducible=JSON.stringify(buildA)===JSON.stringify(buildB);
const committedFresh=sh("git",["diff","--exit-code","--",...deterministic],{timeout:120000});commands.push(committedFresh);
commands.push(sh("npm",["run","package:verify"]));
commands.push(sh("npm",["run","docs:check"]));
commands.push(sh("npm",["run","gate-data:check"]));

const tmp=await mkdtemp(path.join(os.tmpdir(),"pastafari-u19-pack-"));
let pack=null,install=null,packageHash=null,contents=[];
try{
  const p=sh("npm",["pack","--json","--pack-destination",tmp],{timeout:300000});commands.push({...p,stdout:p.stdout.slice(-12000),stderr:p.stderr.slice(-12000)});
  if(p.pass){
    const parsed=JSON.parse(p.stdout);const filename=parsed[0].filename;const tgz=path.join(tmp,filename);packageHash=createHash("sha256").update(await readFile(tgz)).digest("hex");contents=parsed[0].files?.map(x=>x.path).sort()||[];
    const app=path.join(tmp,"install-test");await mkdir(app);await writeFile(path.join(app,"package.json"),JSON.stringify({type:"module",private:true}));
    install=sh("npm",["install",tgz,"--ignore-scripts","--no-audit","--no-fund"],{cwd:app,timeout:300000});
    if(install.pass){
      const code=`import * as p from 'pastafari-calendar'; const c=-13334209n,t=-13334265n; const cal=new p.PastafariCalendar({todayProvider:()=>new p.GregorianDate(2000n,1,1)}); const v=cal.convertJdn(t,{calculationJdn:c}); console.log(JSON.stringify({exports:Object.keys(p).sort(),tuple:v.toJSON?v.toJSON():v},(_k,x)=>typeof x==='bigint'?x.toString():x));`;
      const smoke=sh(process.execPath,["--input-type=module","-e",code],{cwd:app,timeout:300000});commands.push({...smoke,stdout:smoke.stdout.slice(-12000),stderr:smoke.stderr.slice(-12000)});pack={filename,packageHash,contents,install:install.pass,smoke:smoke.pass,smokeOutput:smoke.stdout.trim().split("\n").at(-1)||null};
    } else pack={filename,packageHash,contents,install:false,installError:install.stderr.slice(-12000)};
  }
}finally{await rm(tmp,{recursive:true,force:true});}
const missingRuntime=["src/public-api.js","browser/pastafari-calendar-core.js","browser/pastafari-calendar-core-chronicle.js"].filter(x=>!contents.includes(x));
const failures=[];if(!commands.every(x=>x.pass))failures.push("command-failure");if(!buildReproducible)failures.push("non-reproducible-standalone-build");if(!committedFresh.pass)failures.push("stale-committed-standalone-build");if(!pack?.install||!pack?.smoke)failures.push("package-install-smoke");if(missingRuntime.length)failures.push("missing-runtime-files");
const artifact={schema:"pastafari.update19.build-package-reproducibility.v1",generatedAt:new Date().toISOString(),status:failures.length?"FAIL":"PASS",failures,packageVersion:packageJson.version,buildA,buildB,buildReproducible,package:pack,missingRuntime,commands:commands.map(x=>({command:x.command,status:x.status,signal:x.signal,pass:x.pass,stderr:x.stderr?.slice(-4000)||""}))};
await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({status:artifact.status,failures,buildReproducible,packageHash,out:path.relative(ROOT,OUT)},null,2));if(failures.length)process.exitCode=1;
