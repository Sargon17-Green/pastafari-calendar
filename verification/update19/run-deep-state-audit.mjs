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
function run(cmd,args,timeout){const r=spawnSync(cmd,args,{cwd:ROOT,encoding:"utf8",timeout,maxBuffer:32*1024*1024});let json=null;try{json=JSON.parse((r.stdout||"").trim().split("\n").at(-1));}catch{}return{command:[cmd,...args].join(" "),status:r.status,signal:r.signal,stdout:r.stdout?.slice(-12000)||"",stderr:r.stderr?.slice(-12000)||"",json,pass:r.status===0};}
function canonical(v){const s=v?.toJSON?v.toJSON():v;return{year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)};}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function profilePass(item){return item.pass&&item.json?.first?.outcome==="result"&&item.json?.first?.foundationDayNumber==="1"&&item.json?.functionRestoredAfterFirst===true&&item.json?.recovery?.outcome==="result"&&item.json?.recovery?.foundationDayNumber==="1"&&item.json?.functionRestoredAfterRecovery===true;}
function faultPass(item,name){return item.pass&&item.json?.first?.outcome==="exception"&&item.json?.first?.exception?.name===name&&item.json?.functionRestoredAfterFirst===true&&item.json?.recovery?.outcome==="result"&&item.json?.recovery?.foundationDayNumber==="1"&&item.json?.functionRestoredAfterRecovery===true;}

const trackedRunnerArtifacts=["artifacts/update-15-random-witness-isolation.json"];
const trackedSnapshots=new Map();for(const rel of trackedRunnerArtifacts){try{trackedSnapshots.set(rel,await readFile(path.join(ROOT,rel)));}catch{trackedSnapshots.set(rel,null);}}
const commands=[];
let update15Fresh=null;
try{
  commands.push(run(process.execPath,["verification/update15/run-random-witness-isolation.mjs"],900_000));
  try{update15Fresh=JSON.parse(await readFile(path.join(ROOT,"artifacts/update-15-random-witness-isolation.json"),"utf8"));}catch{}
}finally{for(const [rel,bytes] of trackedSnapshots)if(bytes!==null)await writeFile(path.join(ROOT,rel),bytes);}
commands.push(run(process.execPath,["--test","test/runtime-patching.test.js","test/cache-epoch-detour.test.js","test/update15-random-witness-isolation.test.js"],900_000));

// Fresh Update-19 structural failure campaign. It intentionally does not use the
// historical Stage-6 cross-import absolute-ID equality assertion, which is not a
// semantic invariant. The new probe checks each local baseline and committed-ID
// delta in one instrumented runtime and includes 1/10/100/1000/5000 checkpoints.
const failureProbe=run(process.execPath,["--expose-gc","verification/update19/failure-state-probe.mjs"],1_200_000);
commands.push(failureProbe);
const failureStateEvidence=failureProbe.json;

// Fresh randomness/fault profiles. Historical Update 15 may report crypto SKIP;
// Update 19 does not count that SKIP as sufficient evidence.
const probe="verification/update19/random-witness-profile-probe.mjs";
const randomProfiles=[];
for(const spec of [
  ["math-profile","zero",0],
  ["math-profile","almost-one",0],
  ["math-profile","alternating",0],
  ["math-profile","seeded",0],
  ["math-profile","seeded",257],
]){
  const [kind,profile,extra]=spec;const args=[probe,`--kind=${kind}`,`--profile=${profile}`,"--recover"];if(extra)args.push(`--extra-calls=${extra}`);const item=run(process.execPath,args,300_000);randomProfiles.push({kind,profile,extraCalls:extra,pass:profilePass(item),run:item});
}
for(const throwAt of [1,7]){const item=run(process.execPath,[probe,"--kind=math-fault","--profile=half",`--throw-at=${throwAt}`,"--recover"],300_000);randomProfiles.push({kind:"math-fault",profile:"half",throwAt,pass:faultPass(item,"Update15MathRandomFault"),run:item});}
for(const profile of ["zero","one","increment"]){const item=run(process.execPath,[probe,"--kind=crypto-profile",`--profile=${profile}`,"--recover"],360_000);randomProfiles.push({kind:"crypto-profile",profile,pass:profilePass(item)&&item.json?.supportedCrypto===true,run:item});}
for(const throwAt of [1]){const item=run(process.execPath,[probe,"--kind=crypto-fault","--profile=zero",`--throw-at=${throwAt}`,"--recover"],360_000);randomProfiles.push({kind:"crypto-fault",profile:"zero",throwAt,pass:faultPass(item,"Update15CryptoFault")&&item.json?.supportedCrypto===true,run:item});}

// Update19-only nested conversion trigger: an external late GateIndex patch fires
// an inner public conversion while the project's own detour owns another patch frame.
const c=FOUNDATION_JDN+37n,t=FOUNDATION_JDN-19n;
const expected=canonical(new ReferenceCalendar(c).convertJdn(t));
const nestedRows=[];
for(const requestedDepth of [1,2,3,5,10]){
  const calA=new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)});
  const calB=requestedDepth%2===0?new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)}):calA;
  const proto=core.GateIndex.prototype;const before=Object.getOwnPropertyDescriptor(proto,"gate");const original=before.value;let current=0,maxSeen=0,calls=0;
  function lateGate(index){calls++;maxSeen=Math.max(maxSeen,current);if(current<requestedDepth-1){current++;try{calB.convertJdn(t+BigInt(current),{calculationJdn:c});}finally{current--;}}return original.call(this,index);}
  Object.defineProperty(proto,"gate",{...before,value:lateGate});let actual=null,err=null,after=null;
  try{actual=canonical(calA.convertJdn(t,{calculationJdn:c}));after=Object.getOwnPropertyDescriptor(proto,"gate");}catch(e){err={name:e.name,message:e.message,stack:e.stack||""};after=Object.getOwnPropertyDescriptor(proto,"gate");}finally{Object.defineProperty(proto,"gate",before);}
  nestedRows.push({requestedDepth,calls,maxSeen,actual,error:err,referenceMatch:!err&&same(actual,expected),latePatchPreserved:after?.value===lateGate,descriptorPreserved:after?.enumerable===before.enumerable&&after?.configurable===before.configurable&&after?.writable===before.writable,twoInstance:calA!==calB});
}

const exceptionRows=[];
for(const throwDepth of [1,2,3,5,10]){
  const cal=new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)});const proto=core.GateIndex.prototype;const before=Object.getOwnPropertyDescriptor(proto,"gate");const original=before.value;let calls=0;const marker=new Error(`u19-depth-${throwDepth}`);
  function throwingGate(index){calls++;if(calls===throwDepth)throw marker;return original.call(this,index);}
  Object.defineProperty(proto,"gate",{...before,value:throwingGate});let observed=null,after=null;
  try{cal.convertJdn(t,{calculationJdn:c});}catch(e){observed={sameIdentity:e===marker,name:e.name,message:e.message};}finally{after=Object.getOwnPropertyDescriptor(proto,"gate");Object.defineProperty(proto,"gate",before);}
  let post=null,postErr=null;try{post=canonical(cal.convertJdn(t,{calculationJdn:c}));}catch(e){postErr={name:e.name,message:e.message};}
  exceptionRows.push({throwDepth,calls,observed,patchPreservedDuringUnwind:after?.value===throwingGate,descriptorPreserved:after?.enumerable===before.enumerable&&after?.configurable===before.configurable&&after?.writable===before.writable,post,postError:postErr,postReferenceMatch:!postErr&&same(post,expected)});
}

const historicalArtifactsRestored=[];for(const [rel,bytes] of trackedSnapshots)if(bytes!==null)historicalArtifactsRestored.push({path:rel,restored:(await readFile(path.join(ROOT,rel))).equals(bytes)});
const blockingCommands=commands.filter(x=>x.command.includes("failure-state-probe")||x.command.includes("run-random-witness-isolation.mjs")||x.command.includes("--test test/runtime-patching"));
const failures=[
  ...blockingCommands.filter(x=>!x.pass).map(x=>`command:${x.command}`),
  ...(failureStateEvidence?.status==="PASS"?[]:["fresh-failure-state-probe"]),
  ...randomProfiles.filter(x=>!x.pass).map(x=>`random-profile:${x.kind}:${x.profile}:${x.throwAt??x.extraCalls??0}`),
  ...nestedRows.filter(x=>!x.referenceMatch||!x.latePatchPreserved||!x.descriptorPreserved).map(x=>`nested:${x.requestedDepth}`),
  ...exceptionRows.filter(x=>!x.postReferenceMatch||!x.patchPreservedDuringUnwind||!x.descriptorPreserved).map(x=>`exception:${x.throwDepth}`),
];
for(const row of historicalArtifactsRestored)if(!row.restored)failures.push(`historical-artifact-not-restored:${row.path}`);
const artifact={
  schema:"pastafari.update19.deep-state-leak-soak.v2",generatedAt:new Date().toISOString(),status:failures.length?"FAIL":"PASS",failures,commands,nestedRows,exceptionRows,
  failureStateEvidence,randomProfiles,update15FreshEvidence:update15Fresh,historicalArtifactsRestored,
  historicalStage6Classification:{blocking:false,reason:"The retained Stage-6 runner compares absolute identity IDs across separately instrumented module imports. Update19 observed those import baselines can differ while each local committed-ID gap remains 1; fresh Update19 failure-state-probe replaces that non-normative assertion."},
};
await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({status:artifact.status,failures,nestedDepths:nestedRows.map(x=>x.requestedDepth),exceptionDepths:exceptionRows.map(x=>x.throwDepth),randomProfiles:randomProfiles.map(x=>({kind:x.kind,profile:x.profile,throwAt:x.throwAt,extraCalls:x.extraCalls,pass:x.pass})),out:path.relative(ROOT,OUT)},null,2));if(failures.length)process.exitCode=1;
