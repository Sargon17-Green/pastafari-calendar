#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const RAW_CORE = path.join(ROOT, 'src', '5efdcc3e6fb071cbaffdcb117507a169dd76.js');
const STAGE1 = path.join(ROOT, 'verification', 'update8', 'stage-01-baseline.json');
const OUT = path.join(ROOT, 'artifacts', 'update-08-stage-06-verification-core.json');
const stage1 = JSON.parse(fs.readFileSync(STAGE1, 'utf8'));
let importSerial = 0;

function sha256Text(text) { return crypto.createHash('sha256').update(text).digest('hex'); }
function countHoles(a) { let n = 0; for (let i = 0; i < a.length; i += 1) if (!(i in a)) n += 1; return n; }
function err(e) { return { name: e?.name ?? null, message: String(e?.message ?? e) }; }
function expectThrow(fn) { try { fn(); } catch (e) { return err(e); } assert.fail('expected throw'); }
function assertError(actual, expected, label = '') { assert.equal(actual.name, expected.name, `${label} exception class`); assert.equal(actual.message, expected.message, `${label} exception message`); }
function tuple(v) { const x = typeof v?.toJSON === 'function' ? v.toJSON() : v; return { year: String(x.year), cutletName: x.cutletName, dayInCutlet: x.dayInCutlet, monthName: x.monthName, dayInMonth: x.dayInMonth }; }
function dateFields(v) { return Object.fromEntries(Object.entries(v).filter(([k,val]) => ['year','month','day','variant','calendar'].includes(k) && typeof val !== 'function').map(([k,val]) => [k, typeof val === 'bigint' ? String(val) : val])); }
function memorySnapshot(label) { if (globalThis.gc) globalThis.gc(); const m = process.memoryUsage(); return { label, rss:m.rss, heapTotal:m.heapTotal, heapUsed:m.heapUsed, external:m.external, arrayBuffers:m.arrayBuffers }; }
function containsIdentity(value, needle, depth = 3, seen = new Set()) {
  if (value === needle) return true;
  if (depth <= 0 || value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
  if (seen.has(value)) return false; seen.add(value);
  if (Array.isArray(value)) return value.some((x) => containsIdentity(x, needle, depth - 1, seen));
  return false;
}
function arenaReachable(arena, key) { return arena.some((v) => containsIdentity(v, key, 3)); }
function arenaContainsAnyKeys(arena, keys) {
  const keySet = keys instanceof Set ? keys : new Set(keys);
  const seen = new Set();
  function walk(value, depth=3) {
    if (keySet.has(value)) return true;
    if (depth <= 0 || value === null || (typeof value !== 'object' && typeof value !== 'function')) return false;
    if (seen.has(value)) return false; seen.add(value);
    if (Array.isArray(value)) return value.some((x) => walk(x, depth-1));
    return false;
  }
  return arena.some((v) => walk(v,3));
}
function prefixChurn(before, after) {
  let count=0, referenceChanges=0, primitiveChanges=0; const sample=[];
  const n=Math.min(before.length, after.length);
  for(let i=0;i<n;i++) {
    const bh=i in before, ah=i in after;
    if (bh !== ah || (bh && before[i] !== after[i])) {
      count += 1; if(sample.length<12) sample.push(i);
      const b=before[i], a=after[i];
      if ((typeof b === 'object' && b !== null) || typeof b === 'function' || (typeof a === 'object' && a !== null) || typeof a === 'function') referenceChanges += 1;
      else primitiveChanges += 1;
    }
  }
  return {count, referenceChanges, primitiveChanges, sample};
}

async function bootstrapInstrumented(label='stage6') {
  const OriginalFunction=globalThis.Function, originalCtor=OriginalFunction.prototype.constructor;
  const OriginalMap=globalThis.Map, OriginalWeakMap=globalThis.WeakMap, OriginalWeakSet=globalThis.WeakSet;
  const maps=[], weakMaps=[], weakSets=[];
  const hook=`__PASTAFARI_STAGE6_ARENA_${process.pid}_${++importSerial}`;
  globalThis[hook]=null;
  const FunctionProxy=new Proxy(OriginalFunction,{
    apply(t,thisArg,args){return Reflect.apply(t,thisArg,args);},
    construct(t,args,newTarget){
      const patched=[...args], bi=patched.length-1;
      if (bi>=1 && typeof patched[bi]==='string' && patched[bi].length>7_000_000) {
        const body=patched[bi], firstParam=String(patched[0]);
        const needle='"use strict";'; const i=body.indexOf(needle);
        if(i<0) throw new Error('Stage6 arena hook: generated prologue not found');
        patched[bi]=body.slice(0,i+needle.length)+`globalThis.${hook}=${firstParam};`+body.slice(i+needle.length);
      }
      return Reflect.construct(t,patched,newTarget===FunctionProxy?t:newTarget);
    }
  });
  const MapProxy=new Proxy(OriginalMap,{construct(t,args,newTarget){const v=Reflect.construct(t,args,newTarget===MapProxy?t:newTarget); maps.push(v); return v;}});
  const WeakMapProxy=new Proxy(OriginalWeakMap,{construct(t,args,newTarget){const v=Reflect.construct(t,args,newTarget===WeakMapProxy?t:newTarget); weakMaps.push(v); return v;}});
  const WeakSetProxy=new Proxy(OriginalWeakSet,{construct(t,args,newTarget){const v=Reflect.construct(t,args,newTarget===WeakSetProxy?t:newTarget); weakSets.push(v); return v;}});
  try {
    globalThis.Function=FunctionProxy; OriginalFunction.prototype.constructor=FunctionProxy; globalThis.Map=MapProxy; globalThis.WeakMap=WeakMapProxy; globalThis.WeakSet=WeakSetProxy;
    const tag=`${encodeURIComponent(label)}-${process.pid}-${importSerial}`;
    const publicSourcePath=path.join(ROOT,'src','public-api.js');
    const tempPublicPath=path.join(ROOT,'src',`.stage6-public-api-${process.pid}-${importSerial}.mjs`);
    const rawSpecifier=`./${path.basename(RAW_CORE)}?stage6raw=${tag}`;
    const publicSource=fs.readFileSync(publicSourcePath,'utf8').replaceAll(`./${path.basename(RAW_CORE)}`,rawSpecifier);
    fs.writeFileSync(tempPublicPath,publicSource);
    let api,raw;
    try {
      api=await import(`${pathToFileURL(tempPublicPath).href}?stage6pub=${tag}`);
      raw=await import(`${pathToFileURL(RAW_CORE).href}?stage6raw=${tag}`);
    } finally {
      fs.rmSync(tempPublicPath,{force:true});
    }
    const arena=globalThis[hook]; assert.ok(Array.isArray(arena),'Stage6 failed to capture arena');
    const probe={variant:'civil'}; new raw.IslamicDate(1448n,2,9,probe);
    const candidates=weakMaps.map((m,i)=>({i,m,has:m.has(probe)})).filter(x=>x.has);
    assert.equal(candidates.length,1,'Stage6 could not uniquely identify identity WeakMap');
    return {api,raw,arena,maps,weakMaps,weakSets,identityMap:candidates[0].m,identityMapIndex:candidates[0].i,probe};
  } finally {
    globalThis.Function=OriginalFunction; OriginalFunction.prototype.constructor=originalCtor; globalThis.Map=OriginalMap; globalThis.WeakMap=OriginalWeakMap; globalThis.WeakSet=OriginalWeakSet; delete globalThis[hook];
  }
}

function failureDefinitions(raw) {
  return [
    {id:'F_BAHAI_INVALID_VARIANT', expected:{name:'RangeError',message:'variant של הלוח הבהאי חייב להיות "tehran-equinox" או "western-arithmetic"'}, create(){const key={variant:'invalid-stage6'};return{key,run:()=>new raw.BahaiDate(183n,1,1,key)}}},
    {id:'F_GREGORIAN_NONINTEGER_MONTH', expected:{name:'TypeError',message:'החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים'}, create(){return{key:null,run:()=>new raw.GregorianDate(2026n,1.25,22)}}},
    {id:'F_HINDU_INVALID_SCHEME', expected:{name:'RangeError',message:'אין לוח הינדי יחיד; scheme חייב להיות "old-solar" או "old-lunar"'}, create(){const key={scheme:'invalid-stage6'};return{key,run:()=>new raw.HinduDate(1948n,1,1,key)}}},
    {id:'F_ISLAMIC_INVALID_VARIANT', expected:{name:'RangeError',message:'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"'}, create(){const key={variant:'invalid-stage6'};return{key,run:()=>new raw.IslamicDate(1448n,1,1,key)}}},
    {id:'F_JAPANESE_NONSTRING_ERA', expected:{name:'TypeError',message:'שם התקופה היפנית חייב להיות מחרוזת'}, create(){return{key:null,run:()=>new raw.JapaneseImperialDate(123,8n,1,1)}}},
    {id:'F_MONTH_WEAVING_NONPOSITIVE', expected:{name:'RangeError',message:'אורכי החודשים חייבים להיות חיוביים'}, create(){const key=[1,0,2];return{key,run:()=>new raw.MonthWeavingCounter(key)}}},
    {id:'F_PASTAFARI_INVALID_TODAY_PROVIDER', expected:{name:'TypeError',message:'todayProvider חייב להיות פונקציה'}, create(){const key={todayProvider:123};return{key,run:()=>new raw.PastafariCalendar(key)}}},
    {id:'F_SOLAR_HIJRI_INVALID_VARIANT', expected:{name:'RangeError',message:'variant של הלוח ההיג׳רי השמשי חייב להיות "official" או "arithmetic-2820"'}, create(){const key={variant:'invalid-stage6'};return{key,run:()=>new raw.SolarHijriDate(1405n,1,1,key)}}},
    {id:'F_RAW_PASTAFARI_DEFAULT', expected:{name:'ReferenceError',message:'localToday is not defined'}, create(){return{key:null,run:()=>new raw.PastafariCalendar()}}},
  ];
}

function assertNeutralFailure(env, def, created, {copyPrefix=false,label='',scanArenaReference=false,checkHoles=false }={}) {
  const beforeLen=env.arena.length, beforeHoles=checkHoles?countHoles(env.arena):null, beforeCopy=copyPrefix?env.arena.slice():null;
  if(created.key) assert.equal(env.identityMap.has(created.key),false,`${label} key pre-mapped`);
  const observed=expectThrow(created.run); assertError(observed,def.expected,label||def.id);
  const afterLen=env.arena.length, afterHoles=checkHoles?countHoles(env.arena):null;
  assert.equal(afterLen,beforeLen,`${label||def.id} arena length`); if(checkHoles) assert.equal(afterHoles,beforeHoles,`${label||def.id} holes`);
  let reachable=null; if(created.key){assert.equal(env.identityMap.has(created.key),false,`${label||def.id} key retained`); if(scanArenaReference){reachable=arenaReachable(env.arena,created.key);assert.equal(reachable,false,`${label||def.id} key reachable in arena`);}}
  return {exception:observed,arenaDelta:afterLen-beforeLen,holesDelta:checkHoles?(afterHoles-beforeHoles):null,keyAbsentAfter:created.key?!env.identityMap.has(created.key):null,keyArenaReachableAfter:reachable,prefixChurn:beforeCopy?prefixChurn(beforeCopy,env.arena):null};
}

async function runNaturalRepeatedLongMemory() {
  const env=await bootstrapInstrumented('natural'); const defs=failureDefinitions(env.raw); const baseline={arenaLength:env.arena.length,holes:countHoles(env.arena)};
  const natural=[];
  for(const def of defs){const c=def.create(); const r=assertNeutralFailure(env,def,c,{copyPrefix:true,scanArenaReference:true,checkHoles:true}); natural.push({id:def.id,...r});}
  const repeated=[];
  for(const def of defs){
    const c=def.create(); const startLen=env.arena.length,startHoles=countHoles(env.arena),checkpoints=[]; let signature=null;
    for(let i=1;i<=1000;i++){
      const beforeLen=env.arena.length; const observed=expectThrow(c.run); assertError(observed,def.expected,`${def.id}@${i}`);
      const sig=`${observed.name}\0${observed.message}`; signature??=sig; assert.equal(sig,signature,`${def.id} exception drift`);
      assert.equal(env.arena.length,beforeLen,`${def.id}@${i} immediate arena`);
      if(c.key){assert.equal(env.identityMap.has(c.key),false,`${def.id}@${i} key mapped`);}
      if([1,10,100,1000].includes(i)) checkpoints.push({n:i,arenaDelta:env.arena.length-startLen,holesDelta:countHoles(env.arena)-startHoles,keyAbsent:c.key?!env.identityMap.has(c.key):null});
    }
    repeated.push({id:def.id,checkpoints,finalArenaDelta:env.arena.length-startLen,finalHolesDelta:countHoles(env.arena)-startHoles,exceptionSignature:signature});
  }
  const mem=[memorySnapshot('baseline-before-long')];
  const longStartLen=env.arena.length,longStartHoles=countHoles(env.arena),longKeys=[]; const longCheckpoints=[]; const longDef=defs.find(d=>d.id==='F_ISLAMIC_INVALID_VARIANT');
  for(let i=1;i<=5000;i++){
    const key={variant:`invalid-long-${i}`}; const run=()=>new env.raw.IslamicDate(1448n,1,1,key); const beforeLen=env.arena.length;
    const observed=expectThrow(run); assertError(observed,longDef.expected,`long@${i}`); assert.equal(env.arena.length,beforeLen); assert.equal(env.identityMap.has(key),false); longKeys.push(key);
    if([100,1000,5000].includes(i)){ mem.push(memorySnapshot(String(i))); longCheckpoints.push({n:i,arenaDelta:env.arena.length-longStartLen,holesDelta:countHoles(env.arena)-longStartHoles,lastKeyAbsent:!env.identityMap.has(key)}); }
  }
  const success=new env.raw.GregorianDate(2026n,8,22); assert.deepEqual(dateFields(success),{year:'2026',month:8,day:22}); mem.push(memorySnapshot('post-success'));
  assert.equal(env.arena.length,longStartLen); assert.equal(countHoles(env.arena),longStartHoles); assert.ok(longKeys.every(k=>!env.identityMap.has(k)));
  const retainedReferenceReachable=arenaContainsAnyKeys(env.arena,longKeys); assert.equal(retainedReferenceReachable,false,'long campaign failed-key reference retained in arena');
  assert.equal(env.arena.length,baseline.arenaLength); assert.equal(countHoles(env.arena),baseline.holes);
  return {natural,repeated,longCampaign:{path:longDef.id,count:5000,checkpoints:longCheckpoints,finalArenaDelta:env.arena.length-longStartLen,finalHolesDelta:countHoles(env.arena)-longStartHoles,allFailedKeysAbsent:longKeys.every(k=>!env.identityMap.has(k)),retainedReferenceReachable,exception:longDef.expected},retainedReferences:{callerHeldFailedKeys:longKeys.length,allIdentityMappingsAbsent:longKeys.every(k=>!env.identityMap.has(k)),anyReachableFromArena:retainedReferenceReachable},memory:{gcAvailable:Boolean(globalThis.gc),samples:mem,policy:'informational only; structural equality is decisive'}};
}

async function runHistoryCampaigns(){
  const env=await bootstrapInstrumented('history'); const defs=failureDefinitions(env.raw), byId=new Map(defs.map(d=>[d.id,d])); const baselineLen=env.arena.length,baselineHoles=countHoles(env.arena);
  const alternating=[];
  for(let i=0;i<500;i++){
    if(i%2===0){const v=new env.raw.GregorianDate(2026n,8,22); assert.deepEqual(dateFields(v),{year:'2026',month:8,day:22});}
    else {const d=defs[(i>>1)%defs.length], c=d.create(); const r=assertNeutralFailure(env,d,c,{label:`alt@${i}`}); alternating.push({i,failureId:d.id,exception:r.exception});}
  }
  assert.equal(env.arena.length,baselineLen); assert.equal(countHoles(env.arena),baselineHoles);

  const failCounts=[]; const baseDef=byId.get('F_PASTAFARI_INVALID_TODAY_PROVIDER');
  for(const n of [1,2,5,10,100,1000]){
    const startLen=env.arena.length,startHoles=countHoles(env.arena),keys=[];
    for(let i=0;i<n;i++){const c=baseDef.create(); keys.push(c.key); assertNeutralFailure(env,baseDef,c,{label:`before-success-${n}-${i}`});}
    assert.equal(env.arena.length,startLen); assert.equal(countHoles(env.arena),startHoles); assert.ok(keys.every(k=>!env.identityMap.has(k)));
    const v=new env.raw.GregorianDate(2026n,8,22); const actual=dateFields(v); assert.deepEqual(actual,{year:'2026',month:8,day:22});
    failCounts.push({failures:n,stateBeforeSuccessEntryEquivalent:env.arena.length===startLen&&countHoles(env.arena)===startHoles,allFailedKeysAbsent:keys.every(k=>!env.identityMap.has(k)),success:actual});
  }

  const letters=['F_GREGORIAN_NONINTEGER_MONTH','F_ISLAMIC_INVALID_VARIANT','F_MONTH_WEAVING_NONPOSITIVE','F_BAHAI_INVALID_VARIANT','F_HINDU_INVALID_SCHEME','F_SOLAR_HIJRI_INVALID_VARIANT'];
  const seqs=[
    ['A','B','C'],['C','B','A'],['A','A','B','B','C','C'],['A','B','C','A','B','C'],
    ['A','B','C','D','E','F'],['F','E','D','C','B','A'],['A','B','C','D','E','F'],['A','C','E','B','D','F']
  ];
  const permutations=[];
  for(const codes of seqs){const sLen=env.arena.length,sH=countHoles(env.arena),keys=[]; for(const code of codes){const d=byId.get(letters[code.charCodeAt(0)-65]),c=d.create(); if(c.key) keys.push(c.key); assertNeutralFailure(env,d,c,{label:`perm-${codes.join('')}`});} permutations.push({sequence:codes.join(''),finalArenaDelta:env.arena.length-sLen,finalHolesDelta:countHoles(env.arena)-sH,allFailedKeysAbsent:keys.every(k=>!env.identityMap.has(k))});}

  let state=0x6a09e667; const prng=()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return state>>>0;};
  const randomStartLen=env.arena.length, randomStartHoles=countHoles(env.arena), failedKeys=[]; const counts={A:0,B:0,F1:0,F2:0,F3:0,fragment:0}; const opCodes=[];
  for(let i=0;i<2000;i++){
    const x=prng()%6;
    if(x===0||x===1){const m=x===0?8:9; const v=new env.raw.GregorianDate(2026n,m,22); assert.deepEqual(dateFields(v),{year:'2026',month:m,day:22}); const code=x===0?'A':'B';counts[code]++;opCodes.push(code);}
    else if(x>=2&&x<=4){const ids=['F_ISLAMIC_INVALID_VARIANT','F_MONTH_WEAVING_NONPOSITIVE','F_PASTAFARI_INVALID_TODAY_PROVIDER']; const d=byId.get(ids[x-2]),c=d.create(); if(c.key) failedKeys.push(c.key); assertNeutralFailure(env,d,c,{label:`random@${i}`}); const code=`F${x-1}`;counts[code]++;opCodes.push(code);}
    else {const a1=dateFields(new env.raw.GregorianDate(2026n,8,22)); const d=byId.get('F_ISLAMIC_INVALID_VARIANT'),c=d.create(); failedKeys.push(c.key); assertNeutralFailure(env,d,c,{label:`fragment@${i}`}); const a2=dateFields(new env.raw.GregorianDate(2026n,8,22)); assert.deepEqual(a2,a1); counts.fragment++;opCodes.push('AFA');}
  }
  const seqText=opCodes.join(','); assert.equal(env.arena.length,randomStartLen); assert.equal(countHoles(env.arena),randomStartHoles); assert.ok(failedKeys.every(k=>!env.identityMap.has(k)));
  return {alternating:{operations:500,failures:alternating.length,finalArenaDelta:env.arena.length-baselineLen,finalHolesDelta:countHoles(env.arena)-baselineHoles},severalFailuresBeforeSuccess:failCounts,permutations,randomSequence:{seed:'0x6a09e667',generator:'xorshift32',operations:2000,counts,sequenceSha256:sha256Text(seqText),first50:opCodes.slice(0,50),last50:opCodes.slice(-50),finalArenaDelta:env.arena.length-randomStartLen,finalHolesDelta:countHoles(env.arena)-randomStartHoles,failedOnlyKeysAbsent:failedKeys.every(k=>!env.identityMap.has(k))}};
}

async function runAFailA(){
  const env=await bootstrapInstrumented('afaila'); const def=failureDefinitions(env.raw).find(d=>d.id==='F_PASTAFARI_INVALID_TODAY_PROVIDER');
  const ids=['foundation_same','foundation_next','foundation_previous','present_same','present_forward']; const vectors=stage1.canonicalSuccessVectors.filter(v=>ids.includes(v.id)); const cal=new env.raw.PastafariCalendar({todayProvider:()=>new env.raw.GregorianDate(2026n,8,22)}); const out=[];
  for(const v of vectors){console.error(`[stage6] AFA vector ${v.id} start`);const expected={year:String(v.expected.year),cutletName:v.expected.cutletName,dayInCutlet:v.expected.dayInCutlet,monthName:v.expected.monthName,dayInMonth:v.expected.dayInMonth}; const a1=tuple(cal.convertJdn(BigInt(v.input.targetJdn),{calculationJdn:BigInt(v.input.calculationJdn)})); assert.deepEqual(a1,expected,`${v.id} A1`); const before=env.arena.length,bh=countHoles(env.arena); const c=def.create(); const r=assertNeutralFailure(env,def,c,{label:`${v.id}-FAIL`}); assert.equal(env.arena.length,before); assert.equal(countHoles(env.arena),bh); const a2=tuple(cal.convertJdn(BigInt(v.input.targetJdn),{calculationJdn:BigInt(v.input.calculationJdn)})); assert.deepEqual(a2,expected,`${v.id} A2`); out.push({id:v.id,A1:a1,A2:a2,reference:expected,A1EqualsA2:true,failureArenaDelta:r.arenaDelta,failureHolesDelta:r.holesDelta});console.error(`[stage6] AFA vector ${v.id} done`);}
  return out;
}

function instanceSnapshot(x){const out={}; for(const k of Reflect.ownKeys(x)){const v=x[k]; if(v instanceof Map) out[String(k)]={kind:'Map',size:v.size,identity:v}; else if(typeof v==='function') out[String(k)]={kind:'function',identity:v}; else if(v&&typeof v==='object') out[String(k)]={kind:v.constructor?.name??'object',identity:v}; else out[String(k)]={kind:typeof v,value:typeof v==='bigint'?String(v):v};} return out;}
function sameInstanceSnapshot(a,b){const ka=Object.keys(a),kb=Object.keys(b); if(JSON.stringify(ka)!==JSON.stringify(kb)) return false; return ka.every(k=>a[k].kind===b[k].kind && (a[k].identity!==undefined?a[k].identity===b[k].identity:a[k].value===b[k].value) && (a[k].size===undefined||a[k].size===b[k].size));}

async function runNestedIdentityMulti(){
  const env=await bootstrapInstrumented('nested'); const baseLen=env.arena.length, baseH=countHoles(env.arena); const expectedIslamic={name:'RangeError',message:'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"'};
  function nestedOptions(depth,trace,outerKeys,innerKeys){const target={todayProvider:()=>null}; let fired=false,proxy; proxy=new Proxy(target,{ownKeys(t){if(!fired){fired=true; const outerMappedBeforeInner=env.identityMap.has(proxy),before=env.arena.length,bh=countHoles(env.arena); if(depth>1){const child=nestedOptions(depth-1,trace,outerKeys,innerKeys); new env.raw.PastafariCalendar(child);}else{const k={variant:'invalid-nested-stage6'};innerKeys.push(k);const e=expectThrow(()=>new env.raw.IslamicDate(1448n,1,1,k));assertError(e,expectedIslamic);assert.equal(env.identityMap.has(k),false);} const after=env.arena.length,ah=countHoles(env.arena);assert.equal(after,before);assert.equal(ah,bh);trace.push({depth,outerMappedBeforeInner,before,after,delta:0});} return Reflect.ownKeys(t);}});outerKeys.push(proxy);return proxy;}
  const nested=[];
  for(const depth of [1,2,3,5,10,25]){const trace=[],outer=[],inner=[];const opt=nestedOptions(depth,trace,outer,inner);new env.raw.PastafariCalendar(opt);assert.equal(env.arena.length,baseLen);assert.equal(countHoles(env.arena),baseH);assert.ok(outer.every(k=>env.identityMap.has(k)));assert.ok(inner.every(k=>!env.identityMap.has(k)));nested.push({depth,trace,outerCommitted:outer.every(k=>env.identityMap.has(k)),innerAbsent:inner.every(k=>!env.identityMap.has(k)),finalArenaDelta:env.arena.length-baseLen});}

  const outerTarget={todayProvider:()=>null}, innerFailKey={variant:'invalid-outer-fail-stage6'}, outerFault=Object.assign(new Error('STAGE6_OUTER_FAULT_AFTER_INNER_FAILURE'),{name:'Stage6OuterFault'}); let once=false,outerProxy;
  outerProxy=new Proxy(outerTarget,{ownKeys(t){if(!once){once=true;const before=env.arena.length,bh=countHoles(env.arena);const e=expectThrow(()=>new env.raw.IslamicDate(1448n,1,1,innerFailKey));assertError(e,expectedIslamic);assert.equal(env.arena.length,before);assert.equal(countHoles(env.arena),bh);throw outerFault;}return Reflect.ownKeys(t);}});
  const beforeOuter=env.arena.length,beforeOuterH=countHoles(env.arena);const observedOuter=expectThrow(()=>new env.raw.PastafariCalendar(outerProxy));assertError(observedOuter,{name:'Stage6OuterFault',message:'STAGE6_OUTER_FAULT_AFTER_INNER_FAILURE'});assert.equal(env.arena.length,beforeOuter);assert.equal(countHoles(env.arena),beforeOuterH);assert.equal(env.identityMap.has(outerProxy),false);assert.equal(env.identityMap.has(innerFailKey),false);

  // Nested successful identity is transferred to parent and rolled back if parent fails.
  const innerSuccessKey={variant:'civil'}, parentFault=Object.assign(new Error('STAGE6_PARENT_FAIL_AFTER_CHILD_SUCCESS'),{name:'Stage6ParentFault'}); let once2=false,parentProxy;
  parentProxy=new Proxy({todayProvider:()=>null},{ownKeys(t){if(!once2){once2=true;new env.raw.IslamicDate(1448n,2,9,innerSuccessKey);assert.equal(env.identityMap.has(innerSuccessKey),true);throw parentFault;}return Reflect.ownKeys(t);}});
  const pBefore=env.arena.length,pH=countHoles(env.arena);const pe=expectThrow(()=>new env.raw.PastafariCalendar(parentProxy));assertError(pe,{name:'Stage6ParentFault',message:'STAGE6_PARENT_FAIL_AFTER_CHILD_SUCCESS'});assert.equal(env.arena.length,pBefore);assert.equal(countHoles(env.arena),pH);assert.equal(env.identityMap.has(parentProxy),false);assert.equal(env.identityMap.has(innerSuccessKey),false);

  // Nested success + parent success commits both.
  const childCommitKey={variant:'civil'}; let once3=false,parentCommitProxy;
  parentCommitProxy=new Proxy({todayProvider:()=>null},{ownKeys(t){if(!once3){once3=true;new env.raw.IslamicDate(1448n,2,9,childCommitKey);assert.equal(env.identityMap.has(childCommitKey),true);}return Reflect.ownKeys(t);}}); new env.raw.PastafariCalendar(parentCommitProxy); assert.equal(env.identityMap.has(parentCommitProxy),true);assert.equal(env.identityMap.has(childCommitKey),true);

  // Identity families: failed-new keys absent.
  const familyDefs=failureDefinitions(env.raw).filter(d=>['F_BAHAI_INVALID_VARIANT','F_HINDU_INVALID_SCHEME','F_ISLAMIC_INVALID_VARIANT','F_MONTH_WEAVING_NONPOSITIVE','F_PASTAFARI_INVALID_TODAY_PROVIDER','F_SOLAR_HIJRI_INVALID_VARIANT'].includes(d.id)); const failedFamilies=[];
  for(const d of familyDefs){const c=d.create(); const r=assertNeutralFailure(env,d,c,{label:`identity-family-${d.id}`});failedFamilies.push({id:d.id,keyAbsent:r.keyAbsentAfter,keyReachable:r.keyArenaReachableAfter});}

  const preKey={variant:'civil'};new env.raw.IslamicDate(1448n,2,9,preKey);const preId=env.identityMap.get(preKey);preKey.variant='bad';const preErr=expectThrow(()=>new env.raw.IslamicDate(1448n,2,9,preKey));assertError(preErr,expectedIslamic);assert.equal(env.identityMap.get(preKey),preId);
  const sameKey={variant:'bad'};const sameStates=[];for(let i=1;i<=100;i++){const e=expectThrow(()=>new env.raw.IslamicDate(1448n,2,9,sameKey));assertError(e,expectedIslamic);assert.equal(env.identityMap.has(sameKey),false);if([1,10,100].includes(i))sameStates.push({n:i,absent:!env.identityMap.has(sameKey)});}

  const dirty=await bootstrapInstrumented('identity-dirty'); const dirtyAnchor={variant:'civil'};new dirty.raw.IslamicDate(1448n,2,9,dirtyAnchor);const dirtyAnchorId=dirty.identityMap.get(dirtyAnchor); const dirtyFailed=[]; for(let i=0;i<100;i++){const k={variant:`invalid-${i}`}; dirtyFailed.push(k);const e=expectThrow(()=>new dirty.raw.IslamicDate(1448n,1,1,k));assertError(e,expectedIslamic);assert.equal(dirty.identityMap.has(k),false);} const dirtyS={variant:'civil'};new dirty.raw.IslamicDate(1448n,2,9,dirtyS);const dirtyId=dirty.identityMap.get(dirtyS);
  const clean=await bootstrapInstrumented('identity-clean');const cleanAnchor={variant:'civil'};new clean.raw.IslamicDate(1448n,2,9,cleanAnchor);const cleanAnchorId=clean.identityMap.get(cleanAnchor);const cleanS={variant:'civil'};new clean.raw.IslamicDate(1448n,2,9,cleanS);const cleanId=clean.identityMap.get(cleanS);assert.equal(dirtyAnchorId,cleanAnchorId,'matched anchor IDs differ');assert.equal(dirtyId,cleanId,'dirty-history next ID differs from matched clean history');assert.equal((dirtyId-dirtyAnchorId)>>>0,1);assert.equal((cleanId-cleanAnchorId)>>>0,1);

  // Counter collision sequence.
  const col=await bootstrapInstrumented('collision'); const committed=[]; const alloc=(key)=>{new col.raw.IslamicDate(1448n,2,9,key);const id=col.identityMap.get(key);committed.push({key,id});return id;};
  alloc({variant:'civil'}); for(let i=0;i<20;i++){const k={variant:`bad-${i}`};expectThrow(()=>new col.raw.IslamicDate(1448n,2,9,k));assert.equal(col.identityMap.has(k),false);} alloc({variant:'civil'});
  const nestedChild={variant:'civil'};let fired=false,nestedParent; nestedParent=new Proxy({todayProvider:()=>null},{ownKeys(t){if(!fired){fired=true;new col.raw.IslamicDate(1448n,2,9,nestedChild);}return Reflect.ownKeys(t);}});new col.raw.PastafariCalendar(nestedParent);committed.push({key:nestedChild,id:col.identityMap.get(nestedChild)},{key:nestedParent,id:col.identityMap.get(nestedParent)});alloc({variant:'civil'}); const ids=committed.map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'duplicate identity IDs');

  // Multi-instance: established instances survive unrelated failed constructions.
  const optA={todayProvider:()=>new env.raw.GregorianDate(2026n,8,22)},optB={todayProvider:()=>new env.raw.GregorianDate(2026n,8,22)};const A=new env.raw.PastafariCalendar(optA),B=new env.raw.PastafariCalendar(optB);A.convertJdn(2461259n,{calculationJdn:2461259n});B.convertJdn(-13334246n,{calculationJdn:-13334246n});const a0=instanceSnapshot(A),b0=instanceSnapshot(B);const d=failureDefinitions(env.raw).find(x=>x.id==='F_PASTAFARI_INVALID_TODAY_PROVIDER');assertNeutralFailure(env,d,d.create(),{label:'multi-A'});const a1=instanceSnapshot(A),b1=instanceSnapshot(B);assert.ok(sameInstanceSnapshot(a0,a1));assert.ok(sameInstanceSnapshot(b0,b1));assertNeutralFailure(env,d,d.create(),{label:'multi-B'});const a2=instanceSnapshot(A),b2=instanceSnapshot(B);assert.ok(sameInstanceSnapshot(a1,a2));assert.ok(sameInstanceSnapshot(b1,b2));

  return {nested,outerAndInnerFail:{finalArenaDelta:env.arena.length-beforeOuter,outerKeyAbsent:!env.identityMap.has(outerProxy),innerKeyAbsent:!env.identityMap.has(innerFailKey),exception:observedOuter},nestedChildSuccessParentFail:{finalArenaDelta:env.arena.length-pBefore,parentAbsent:!env.identityMap.has(parentProxy),childAbsent:!env.identityMap.has(innerSuccessKey),exception:pe},nestedSuccessCommit:{parentCommitted:env.identityMap.has(parentCommitProxy),childCommitted:env.identityMap.has(childCommitKey)},identity:{failedNewFamilies:failedFamilies,preexisting:{idBefore:preId,idAfter:env.identityMap.get(preKey),preserved:env.identityMap.get(preKey)===preId},sameFailedKey:sameStates,distinct100ThenSuccess:{allFailedAbsent:dirtyFailed.every(k=>!dirty.identityMap.has(k)),dirtyAnchorId,cleanAnchorId,dirtyNextId:dirtyId,cleanNextId:cleanId,dirtyGap:(dirtyId-dirtyAnchorId)>>>0,cleanGap:(cleanId-cleanAnchorId)>>>0,equal:dirtyId===cleanId},collision:{ids,unique:new Set(ids).size===ids.length,committedCount:ids.length}},multiInstance:{AStableAfterFailure:sameInstanceSnapshot(a0,a1)&&sameInstanceSnapshot(a1,a2),BStableAfterFailure:sameInstanceSnapshot(b0,b1)&&sameInstanceSnapshot(b1,b2),moduleGlobalArenaDelta:env.arena.length-baseLen}};
}

async function runFreshChild(mode){
  const env=await bootstrapInstrumented(`fresh-child-${mode}`); const startLen=env.arena.length,startH=countHoles(env.arena), failed=[]; const expected={name:'RangeError',message:'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"'};
  if(mode==='dirty'){for(let i=0;i<100;i++){const k={variant:`bad-child-${i}`};failed.push(k);const e=expectThrow(()=>new env.raw.IslamicDate(1448n,2,9,k));assertError(e,expected);assert.equal(env.identityMap.has(k),false);}}
  const key={variant:'civil'};const v=new env.raw.IslamicDate(1448n,2,9,key);const result={mode,id:env.identityMap.get(key),fields:dateFields(v),arenaDelta:env.arena.length-startLen,holesDelta:countHoles(env.arena)-startH,failedKeysAbsent:failed.every(k=>!env.identityMap.has(k))};process.stdout.write(JSON.stringify(result));
}
function freshProcessComparison(){const run=(mode)=>{const p=spawnSync(process.execPath,['--expose-gc',fileURLToPath(import.meta.url),'--fresh-child',mode],{cwd:ROOT,encoding:'utf8',maxBuffer:8*1024*1024});assert.equal(p.status,0,p.stderr||p.stdout);return JSON.parse(p.stdout);};const clean=run('clean'),dirty=run('dirty');assert.deepEqual(dirty.fields,clean.fields);assert.equal(dirty.id,clean.id);return{clean,dirty,sameSuccess:JSON.stringify(clean.fields)===JSON.stringify(dirty.fields),sameNextIdentity:clean.id===dirty.id};}

if(process.argv[2]==='--fresh-child'){await runFreshChild(process.argv[3]||'clean');process.exit(0);}

const startedAt=new Date().toISOString();
console.error('[stage6] natural/repeated/long');
const naturalPack=await runNaturalRepeatedLongMemory();
console.error('[stage6] history campaigns');
const histories=await runHistoryCampaigns();
console.error('[stage6] A->FAIL->A');
const aFailA=await runAFailA();
console.error('[stage6] nested/identity/multi');
const nestedPack=await runNestedIdentityMulti();
console.error('[stage6] fresh processes');
const freshProcess=freshProcessComparison();
const artifact={
  schema:'pastafari.update8.stage06.core-verification.v1',generatedAt:new Date().toISOString(),startedAt,
  node:process.version,npm:null,rawCoreSha256:crypto.createHash('sha256').update(fs.readFileSync(RAW_CORE)).digest('hex'),
  naturalFailures:naturalPack.natural,repeatedFailures:naturalPack.repeated,longCampaign:naturalPack.longCampaign,retainedReferences:naturalPack.retainedReferences,memory:naturalPack.memory,
  alternating:histories.alternating,severalFailuresBeforeSuccess:histories.severalFailuresBeforeSuccess,permutations:histories.permutations,randomSequence:histories.randomSequence,
  aFailA,nested:nestedPack.nested,nestedOuterFailure:nestedPack.outerAndInnerFail,nestedIdentityTransfer:nestedPack.nestedChildSuccessParentFail,nestedSuccessCommit:nestedPack.nestedSuccessCommit,
  identity:nestedPack.identity,multiInstance:nestedPack.multiInstance,freshProcess,
  instrumentationAudit:{productionFilesModified:false,rollbackAddedByHarness:false,globalsRestoredAfterImport:true,publicApiAdded:false,arenaObservation:'in-memory Function-construction hook only',identityObservation:'captured WeakMaps; identity map selected by a committed probe key'},
  result:'PASS'
};
fs.mkdirSync(path.dirname(OUT),{recursive:true});fs.writeFileSync(OUT,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({result:'PASS',output:OUT,naturalFailures:artifact.naturalFailures.length,repeatedPaths:artifact.repeatedFailures.length,longCount:artifact.longCampaign.count,randomOperations:artifact.randomSequence.operations,nestedDepths:artifact.nested.map(x=>x.depth),freshProcessSameIdentity:artifact.freshProcess.sameNextIdentity},null,2));
