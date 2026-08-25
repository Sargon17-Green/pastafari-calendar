#!/usr/bin/env node
"use strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));const OUT=path.join(ROOT,"artifacts/update-19/external-calendar-foundation-matrix.json");await mkdir(path.dirname(OUT),{recursive:true});
const F=-13_334_246n,T=1_442_903n;function stable(v){return JSON.stringify(v);}function child(args,timeout=600000){const r=spawnSync(process.execPath,["verification/update19/external-case-child.mjs",...args],{cwd:ROOT,encoding:"utf8",timeout,maxBuffer:4*1024*1024});let p=null,e=null;try{p=JSON.parse(r.stdout.trim().split('\n').at(-1));}catch(x){e={name:x.name,message:x.message};}return{args,status:r.status,signal:r.signal,error:e,stderr:r.stderr.slice(-3000),payload:p,timeout:r.signal==='SIGTERM'};}
const rows=[];
for(const cal of ['hebrew','islamicCivil','saka','ethiopic','coptic','bahaiWestern'])for(const y of ['-2','-1','0','1','2']){const r=child(['arithmetic',cal,y],120000);const p=r.payload;const match=!!p&&p.reference===p.production&&(p.referenceError?.name??null)===(p.productionError?.name??null);rows.push({...r,group:'arithmetic-year-numbering',match});}
for(const kind of ['chinese','vikrama','koki'])for(const j of [F-1n,F,F+1n,T,2_461_259n]){const r=child([kind,String(j)],kind==='koki'?120000:900000);const p=r.payload;const match=!!p&&stable(p.reference)===stable(p.production)&&String(p.referenceRoundtrip)===String(j)&&String(p.productionRoundtrip)===String(j);rows.push({...r,group:kind,match});}
// Run the retained environment matrix as fresh current-main evidence too, but restore its historical tracked artifact byte-for-byte.
const envRel='artifacts/update-13-environment-matrix.json';const envPath=path.join(ROOT,envRel);let envOriginal=null;try{envOriginal=await readFile(envPath);}catch{}
let env,envPayload=null,envRestored=true;
try{env=spawnSync(process.execPath,["verification/update13/run-environment-matrix.mjs"],{cwd:ROOT,encoding:"utf8",timeout:900000,maxBuffer:16*1024*1024});try{envPayload=JSON.parse(await readFile(envPath,'utf8'));}catch{}}finally{if(envOriginal!==null){await writeFile(envPath,envOriginal);envRestored=(await readFile(envPath)).equals(envOriginal);}}
const failures=rows.filter(r=>!r.match);const timeouts=rows.filter(r=>r.timeout);if(env.status!==0||envPayload?.status!=="PASS")failures.push({group:'update13-environment-matrix',status:env.status,signal:env.signal});if(!envRestored)failures.push({group:'update13-environment-artifact-restoration'});
const artifact={schema:'pastafari.update19.external-calendar-foundation-matrix.v1',generatedAt:new Date().toISOString(),status:failures.length?(timeouts.length?'INCOMPLETE':'FAIL'):'PASS',rows,update13EnvironmentMatrix:{status:env.status,signal:env.signal,payload:envPayload,artifactRestored:envRestored,stdout:env.stdout.slice(-8000),stderr:env.stderr.slice(-8000)},totals:{cases:rows.length,failures:failures.length,timeouts:timeouts.length}};await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({status:artifact.status,...artifact.totals,out:path.relative(ROOT,OUT)},null,2));if(artifact.status!=='PASS')process.exitCode=1;
