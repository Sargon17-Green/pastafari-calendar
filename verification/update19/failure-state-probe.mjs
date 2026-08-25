#!/usr/bin/env node
"use strict";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const RAW_CORE=path.join(ROOT,"src/5efdcc3e6fb071cbaffdcb117507a169dd76.js");
let importSerial=0;
function countHoles(a){let n=0;for(let i=0;i<a.length;i++)if(!(i in a))n++;return n;}
function memory(label){if(globalThis.gc)globalThis.gc();const m=process.memoryUsage();return{label,rss:m.rss,heapTotal:m.heapTotal,heapUsed:m.heapUsed,external:m.external,arrayBuffers:m.arrayBuffers};}
function canonical(v){const s=typeof v?.toJSON==="function"?v.toJSON():v;return{year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)};}
function contains(value,needle,depth=3,seen=new Set()){if(value===needle)return true;if(depth<=0||value===null||(typeof value!=="object"&&typeof value!=="function"))return false;if(seen.has(value))return false;seen.add(value);if(Array.isArray(value))return value.some(x=>contains(x,needle,depth-1,seen));return false;}
async function bootstrap(){
  const OriginalFunction=globalThis.Function,originalCtor=OriginalFunction.prototype.constructor,OriginalWeakMap=globalThis.WeakMap;
  const weakMaps=[];const hook=`__PASTAFARI_U19_ARENA_${process.pid}_${++importSerial}`;globalThis[hook]=null;
  const FP=new Proxy(OriginalFunction,{apply(t,x,a){return Reflect.apply(t,x,a);},construct(t,args,newTarget){const patched=[...args],bi=patched.length-1;if(bi>=1&&typeof patched[bi]==="string"&&patched[bi].length>7_000_000){const body=patched[bi],needle='"use strict";',i=body.indexOf(needle);if(i<0)throw new Error("Update19 arena prologue not found");patched[bi]=body.slice(0,i+needle.length)+`globalThis.${hook}=${String(patched[0])};`+body.slice(i+needle.length);}return Reflect.construct(t,patched,newTarget===FP?t:newTarget);}});
  const WMP=new Proxy(OriginalWeakMap,{construct(t,args,newTarget){const v=Reflect.construct(t,args,newTarget===WMP?t:newTarget);weakMaps.push(v);return v;}});
  try{
    globalThis.Function=FP;OriginalFunction.prototype.constructor=FP;globalThis.WeakMap=WMP;
    const tag=`u19-${process.pid}-${importSerial}`;
    const publicPath=path.join(ROOT,"src/public-api.js"),temp=path.join(ROOT,"src",`.u19-public-${process.pid}-${importSerial}.mjs`);
    const rawSpecifier=`./${path.basename(RAW_CORE)}?u19raw=${tag}`;
    fs.writeFileSync(temp,fs.readFileSync(publicPath,"utf8").replaceAll(`./${path.basename(RAW_CORE)}`,rawSpecifier));
    let api,raw;try{api=await import(`${pathToFileURL(temp).href}?u19pub=${tag}`);raw=await import(`${pathToFileURL(RAW_CORE).href}?u19raw=${tag}`);}finally{fs.rmSync(temp,{force:true});}
    const arena=globalThis[hook];assert.ok(Array.isArray(arena),"arena capture failed");
    const probe={variant:"civil"};new raw.IslamicDate(1448n,2,9,probe);
    const candidates=weakMaps.filter(m=>m.has(probe));assert.equal(candidates.length,1,"identity WeakMap not unique");
    return{api,raw,arena,identityMap:candidates[0]};
  }finally{globalThis.Function=OriginalFunction;OriginalFunction.prototype.constructor=originalCtor;globalThis.WeakMap=OriginalWeakMap;delete globalThis[hook];}
}

const env=await bootstrap();
const baseline={arenaLength:env.arena.length,holes:countHoles(env.arena),memory:memory("baseline")};
const anchor={variant:"civil"};new env.raw.IslamicDate(1448n,2,9,anchor);const anchorId=env.identityMap.get(anchor);
const checkpoints=[];let allFailedKeysAbsent=true;let anyFailedKeyReachable=false;let exceptionSignature=null;
for(let i=1;i<=5000;i++){
  const key={variant:`u19-invalid-${i}`};let observed=null;try{new env.raw.IslamicDate(1448n,1,1,key);}catch(e){observed={name:e.name,message:e.message};}
  assert.ok(observed,`failure ${i} did not throw`);const sig=`${observed.name}\0${observed.message}`;exceptionSignature??=sig;assert.equal(sig,exceptionSignature,`exception drift at ${i}`);
  const absent=!env.identityMap.has(key);allFailedKeysAbsent&&=absent;anyFailedKeyReachable||=contains(env.arena,key);
  assert.ok(absent,`failed key mapped at ${i}`);assert.equal(env.arena.length,baseline.arenaLength,`arena length at ${i}`);assert.equal(countHoles(env.arena),baseline.holes,`arena holes at ${i}`);
  if([1,10,100,1000,5000].includes(i))checkpoints.push({n:i,arenaDelta:env.arena.length-baseline.arenaLength,holesDelta:countHoles(env.arena)-baseline.holes,lastKeyAbsent:absent,lastKeyReachable:contains(env.arena,key),memory:memory(String(i))});
}
const next={variant:"civil"};new env.raw.IslamicDate(1448n,2,9,next);const nextId=env.identityMap.get(next);const identityGap=(nextId-anchorId)>>>0;
assert.equal(identityGap,1,"failed constructions advanced committed identity allocation");
assert.ok(allFailedKeysAbsent);assert.equal(anyFailedKeyReachable,false);

const semanticCases=[
  {c:FOUNDATION_JDN,t:FOUNDATION_JDN},
  {c:FOUNDATION_JDN+37n,t:FOUNDATION_JDN-19n},
  {c:1_442_920n,t:1_442_880n},
];
const cal=new env.raw.PastafariCalendar({todayProvider:()=>new env.raw.GregorianDate(2000n,1,1)});
const semanticRows=semanticCases.map(({c,t})=>{const expected=canonical(new ReferenceCalendar(c).convertJdn(t));const actual=canonical(cal.convertJdn(t,{calculationJdn:c}));return{calculationJdn:String(c),targetJdn:String(t),expected,actual,match:JSON.stringify(expected)===JSON.stringify(actual)};});
assert.ok(semanticRows.every(r=>r.match),"post-failure semantic mismatch");
const postMemory=memory("post-success");
const structuralPass=env.arena.length===baseline.arenaLength&&countHoles(env.arena)===baseline.holes&&allFailedKeysAbsent&&!anyFailedKeyReachable&&identityGap===1&&semanticRows.every(r=>r.match);
process.stdout.write(JSON.stringify({schema:"pastafari.update19.failure-state-probe.v1",status:structuralPass?"PASS":"FAIL",gcAvailable:Boolean(globalThis.gc),baseline,checkpoints,final:{arenaDelta:env.arena.length-baseline.arenaLength,holesDelta:countHoles(env.arena)-baseline.holes,allFailedKeysAbsent,anyFailedKeyReachable,anchorId,nextId,identityGap,exceptionSignature,postMemory},semanticRows})+"\n");
if(!structuralPass)process.exitCode=1;
