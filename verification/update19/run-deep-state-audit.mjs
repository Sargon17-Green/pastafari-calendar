#!/usr/bin/env node
"use strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";
import * as core from "../../browser/pastafari-calendar-core.js";

const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const OUT=path.join(ROOT,"artifacts/update-19/deep-state-leak-soak.json");
await mkdir(path.dirname(OUT),{recursive:true});
function run(cmd,args,timeout){const r=spawnSync(cmd,args,{cwd:ROOT,encoding:"utf8",timeout,maxBuffer:32*1024*1024});return{command:[cmd,...args].join(" "),status:r.status,signal:r.signal,stdout:r.stdout?.slice(-12000)||"",stderr:r.stderr?.slice(-12000)||"",pass:r.status===0};}
function canonical(v){const s=v?.toJSON?v.toJSON():v;return{year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)};}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}

const trackedRunnerArtifacts=[
  "artifacts/update-08-stage-06-verification-core.json",
  "artifacts/update-15-random-witness-isolation.json",
];
const trackedSnapshots=new Map();
for(const rel of trackedRunnerArtifacts){try{trackedSnapshots.set(rel,await readFile(path.join(ROOT,rel)));}catch{trackedSnapshots.set(rel,null);}}
const commands=[];
let stage6=null;
let update15Fresh=null;
try {
  commands.push(run(process.execPath,["--expose-gc","verification/update8/run-stage-06-verification.mjs"],1_200_000));
  try{stage6=JSON.parse(await readFile(path.join(ROOT,"artifacts/update-08-stage-06-verification-core.json"),"utf8"));}catch{}
  commands.push(run(process.execPath,["verification/update15/run-random-witness-isolation.mjs"],900_000));
  try{update15Fresh=JSON.parse(await readFile(path.join(ROOT,"artifacts/update-15-random-witness-isolation.json"),"utf8"));}catch{}
} finally {
  for(const [rel,bytes] of trackedSnapshots){
    if(bytes!==null) await writeFile(path.join(ROOT,rel),bytes);
  }
}
commands.push(run(process.execPath,["--test","test/runtime-patching.test.js","test/cache-epoch-detour.test.js","test/update15-random-witness-isolation.test.js"],900_000));

// Update19-only nested conversion trigger: an external late GateIndex patch fires
// an inner public conversion while the project's own detour owns another patch frame.
const c=FOUNDATION_JDN+37n,t=FOUNDATION_JDN-19n;
const expected=canonical(new ReferenceCalendar(c).convertJdn(t));
const nestedRows=[];
for(const requestedDepth of [1,2,3,5,10]){
  const calA=new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)});
  const calB=requestedDepth%2===0?new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)}):calA;
  const proto=core.GateIndex.prototype;
  const before=Object.getOwnPropertyDescriptor(proto,"gate");
  const original=before.value;
  let current=0,maxSeen=0,calls=0;
  function lateGate(index){
    calls++; maxSeen=Math.max(maxSeen,current);
    if(current<requestedDepth-1){
      current++;
      try{calB.convertJdn(t+BigInt(current),{calculationJdn:c});}
      finally{current--;}
    }
    return original.call(this,index);
  }
  Object.defineProperty(proto,"gate",{...before,value:lateGate});
  let actual=null,err=null,after=null;
  try{actual=canonical(calA.convertJdn(t,{calculationJdn:c}));after=Object.getOwnPropertyDescriptor(proto,"gate");}
  catch(e){err={name:e.name,message:e.message,stack:e.stack||""};after=Object.getOwnPropertyDescriptor(proto,"gate");}
  finally{Object.defineProperty(proto,"gate",before);}
  nestedRows.push({requestedDepth,calls,maxSeen,actual,error:err,referenceMatch:!err&&same(actual,expected),latePatchPreserved:after?.value===lateGate,descriptorPreserved:after?.enumerable===before.enumerable&&after?.configurable===before.configurable&&after?.writable===before.writable});
}

// Exception restoration with the same Update19 trigger.
const exceptionRows=[];
for(const throwDepth of [1,2,3,5]){
  const cal=new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)});
  const proto=core.GateIndex.prototype;const before=Object.getOwnPropertyDescriptor(proto,"gate");const original=before.value;let calls=0;const marker=new Error(`u19-depth-${throwDepth}`);
  function throwingGate(index){calls++;if(calls===throwDepth)throw marker;return original.call(this,index);}
  Object.defineProperty(proto,"gate",{...before,value:throwingGate});
  let observed=null,after=null;
  try{cal.convertJdn(t,{calculationJdn:c});}catch(e){observed={sameIdentity:e===marker,name:e.name,message:e.message};}finally{after=Object.getOwnPropertyDescriptor(proto,"gate");Object.defineProperty(proto,"gate",before);}
  let post=null,postErr=null;try{post=canonical(cal.convertJdn(t,{calculationJdn:c}));}catch(e){postErr={name:e.name,message:e.message};}
  exceptionRows.push({throwDepth,calls,observed,patchPreservedDuringUnwind:after?.value===throwingGate,post,postError:postErr,postReferenceMatch:!postErr&&same(post,expected)});
}

const memory=stage6?.longCampaign?{longCampaign:stage6.longCampaign,memory:stage6.memory,retainedReferences:stage6.retainedReferences,nested:stage6.nested,freshProcess:stage6.freshProcess}:null;
const historicalArtifactsRestored=[];for(const [rel,bytes] of trackedSnapshots){if(bytes!==null){historicalArtifactsRestored.push({path:rel,restored:(await readFile(path.join(ROOT,rel))).equals(bytes)});}}
const failures=[...commands.filter(x=>!x.pass).map(x=>`command:${x.command}`),...nestedRows.filter(x=>!x.referenceMatch||!x.latePatchPreserved).map(x=>`nested:${x.requestedDepth}`),...exceptionRows.filter(x=>!x.postReferenceMatch||!x.patchPreservedDuringUnwind).map(x=>`exception:${x.throwDepth}`)];
for(const row of historicalArtifactsRestored) if(!row.restored) failures.push(`historical-artifact-not-restored:${row.path}`);
const artifact={schema:"pastafari.update19.deep-state-leak-soak.v1",generatedAt:new Date().toISOString(),status:failures.length?"FAIL":"PASS",failures,commands,nestedRows,exceptionRows,stage6StructuralEvidence:memory,update15FreshEvidence:update15Fresh,historicalArtifactsRestored};
await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({status:artifact.status,failures,nestedDepths:nestedRows.map(x=>x.requestedDepth),out:path.relative(ROOT,OUT)},null,2));if(failures.length)process.exitCode=1;
