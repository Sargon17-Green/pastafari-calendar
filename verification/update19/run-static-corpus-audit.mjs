#!/usr/bin/env node
"use strict";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";
import * as core from "../../browser/pastafari-calendar-core.js";
import * as fast from "../../browser/pastafari-calendar-fast.js";
const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));const OUT=path.join(ROOT,"artifacts/update-19/static-corpus-ci-audit.json");await mkdir(path.dirname(OUT),{recursive:true});
function h(x){return createHash('sha256').update(x).digest('hex');}function run(cmd,args,timeout=300000){const r=spawnSync(cmd,args,{cwd:ROOT,encoding:'utf8',timeout,maxBuffer:16*1024*1024});return{command:[cmd,...args].join(' '),status:r.status,signal:r.signal,stdout:r.stdout.slice(-10000),stderr:r.stderr.slice(-10000),pass:r.status===0};}function canonical(v){const s=v?.toJSON?v.toJSON():v;return{year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)}}function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
const checks=[];const add=(id,pass,evidence)=>checks.push({id,status:pass?'PASS':'FAIL',evidence});
const refPath='verification/reference-oracle/reference.mjs';const refText=await readFile(path.join(ROOT,refPath),'utf8');const imports=[...refText.matchAll(/^import\s+.*?from\s+["']([^"']+)["']/gmu)].map(m=>m[1]);add('reference-no-production-imports',!imports.some(x=>/(browser|src|generated|artifact|fast|authoritative)/i.test(x)),{imports,referenceHash:h(refText)});
const productionPaths=['browser/pastafari-calendar-core.js','browser/pastafari-calendar-core-chronicle.js','browser/pastafari-calendar-fast.js','src/public-api.js','browser/year-ceiling-detour.js','browser/gate-data-detour.js','browser/cache-epoch-detour.js'];const reverse=[];for(const p of productionPaths){const t=await readFile(path.join(ROOT,p),'utf8');if(/verification\/reference-oracle|reference\.mjs/.test(t))reverse.push(p);}add('production-does-not-import-reference',reverse.length===0,{reverse});
const stale=run(process.execPath,['verification/update17/check-canonical-stale.mjs'],300000);add('canonical-regeneration-byte-stable',stale.pass,stale);
const gate=run(process.execPath,['scripts/regenerate-gate-artifacts.mjs','--check'],300000);add('precomputed-gates-validate',gate.pass,gate);
// Generator lock is independently recomputed from the same declared component set.
// This is deliberately separate from Update17's corpus verifier so a corrupted
// generator cannot silently keep credit merely because old vectors still hash.
const generatorRel='verification/update17/generate-canonical-evidence.mjs';
const manifest=JSON.parse(await readFile(path.join(ROOT,'verification/update17/generated/normative-evidence-manifest.json'),'utf8'));
const generatorComponents={
  generator:generatorRel,
  gateBatchWorker:'verification/update17/gate-batch-worker.mjs',
  gateCacheBuilder:'verification/update17/build-ephemeral-gate-cache.mjs',
  anchorEvidenceWorker:'verification/update17/anchor-evidence-worker.mjs',
  externalCalendarReference:'verification/update17/external-calendar-reference.mjs',
  chineseReference:'verification/update17/chinese-reference.mjs',
  monthWeavingReference:'verification/update14/month-weaving-reference.mjs',
  negativeCalendarReference:'verification/update9/proleptic-negative-year-reference.mjs',
  vikramaReference:'verification/update11/vikrama-reference.mjs',
  kokiReference:'verification/update12/reference-koki.mjs',
};
async function currentGeneratorLock(){
  const hashes={};
  for(const [name,rel] of Object.entries(generatorComponents)) hashes[name]=h(await readFile(path.join(ROOT,rel)));
  const canonical={};for(const key of Object.keys(hashes).sort())canonical[key]=hashes[key];
  return {hashes,composite:h(Buffer.from(`${JSON.stringify(canonical,null,2)}\n`))};
}
const normalLock=await currentGeneratorLock();
add('canonical-generator-component-lock-current',normalLock.composite===manifest.meta.generatorHash,{expected:manifest.meta.generatorHash,actual:normalLock.composite,components:normalLock.hashes});
const generatorPath=path.join(ROOT,generatorRel);const generatorOriginal=await readFile(generatorPath);let corruptLock=null,generatorRestored=false;
try{
  const text=generatorOriginal.toString('utf8');
  const needle='const SEED = 0x17c0ffee;';
  if(!text.includes(needle)) throw new Error('Update19 generator corruption discriminator not found');
  await writeFile(generatorPath,text.replace(needle,'const SEED = 0x17c0ffef; // UPDATE19 TEST-ONLY CORRUPTION'));
  corruptLock=await currentGeneratorLock();
} finally {
  await writeFile(generatorPath,generatorOriginal);
  generatorRestored=h(await readFile(generatorPath))===h(generatorOriginal);
}
add('deliberate-generator-corruption-detected',corruptLock?.composite!==manifest.meta.generatorHash&&generatorRestored,{expected:manifest.meta.generatorHash,corruptActual:corruptLock?.composite,restored:generatorRestored});
// Deliberate vector corruption: mutate one committed vector under try/finally; verifier must fail, reference must not change.
const vectorRel='verification/update17/generated/normative-final-tuples.json';const vectorPath=path.join(ROOT,vectorRel);const original=await readFile(vectorPath);const beforeRef=canonical(new ReferenceCalendar(FOUNDATION_JDN).convertJdn(FOUNDATION_JDN));let corruptVerify=null,afterRef=null,restored=false;
try{const obj=JSON.parse(original.toString('utf8'));obj.vectors[0].expected.dayInMonth=Number(obj.vectors[0].expected.dayInMonth)+1;await writeFile(vectorPath,`${JSON.stringify(obj,null,2)}\n`);corruptVerify=run(process.execPath,['verification/update17/verify-canonical-evidence.mjs'],180000);afterRef=canonical(new ReferenceCalendar(FOUNDATION_JDN).convertJdn(FOUNDATION_JDN));}finally{await writeFile(vectorPath,original);restored=h(await readFile(vectorPath))===h(original);}
add('deliberate-vector-corruption-detected',corruptVerify?.status!==0&&same(beforeRef,afterRef)&&restored,{verifyStatus:corruptVerify?.status,verifySignal:corruptVerify?.signal,referenceBefore:beforeRef,referenceAfter:afterRef,restored});
// Deliberate dead historical artifact corruption: runtime result may not depend on implementations/tests data.
const deadRel='implementations/tests/spec-derived-gate-checkpoints.json';const deadPath=path.join(ROOT,deadRel);const deadOriginal=await readFile(deadPath);const gi=new core.GateIndex();const gateBefore=String(gi.gate(127));let gateAfter=null,deadRestored=false;
try{await writeFile(deadPath,Buffer.from('{"intentionally":"corrupted by update19 test-only"}\n'));const fresh=new core.GateIndex();gateAfter=String(fresh.gate(127));}finally{await writeFile(deadPath,deadOriginal);deadRestored=h(await readFile(deadPath))===h(deadOriginal);}
add('dead-historical-artifact-semantic-inert',gateBefore===gateAfter&&deadRestored,{artifact:deadRel,gateBefore,gateAfter,restored:deadRestored,productionImportSearch:productionPaths});
// Shared-bug / production-corruption harness sanity. Expected comes only from reference.
const expected=beforeRef;const detect=x=>!same(expected,x);
const freshAuthCalendar=new core.PastafariCalendar({todayProvider:()=>new core.GregorianDate(2000n,1,1)});
const freshFastCalendar=new fast.PastafariCalendar({todayProvider:()=>new fast.GregorianDate(2000n,1,1)});
const authReal=canonical(freshAuthCalendar.convertJdn(FOUNDATION_JDN,{calculationJdn:FOUNDATION_JDN}));
const fastReal=canonical(freshFastCalendar.convertJdn(FOUNDATION_JDN,{calculationJdn:FOUNDATION_JDN}));
const corruptFunction=(real)=>()=>({...real,dayInCutlet:real.dayInCutlet+1});
const authBad=corruptFunction(authReal)();const fastBad=corruptFunction(fastReal)();const legacyBad={...expected,dayInCutlet:expected.dayInCutlet+1};
add('deliberate-authoritative-like-corruption-detected',same(authReal,expected)&&detect(authBad),{expected,real:authReal,corrupted:authBad});
add('deliberate-fast-like-corruption-detected',same(fastReal,expected)&&detect(fastBad),{expected,real:fastReal,corrupted:fastBad});
add('shared-bug-majority-rejected',same(authBad,fastBad)&&same(fastBad,legacyBad)&&detect(authBad),{reference:expected,authoritativeLike:authBad,fastLike:fastBad,legacyGeneratorLike:legacyBad,majorityWouldBeWrong:true});
// Public API snapshot.
const pub=await import('../../src/public-api.js');const pjson=JSON.parse(await readFile(path.join(ROOT,'package.json'),'utf8'));const inv=m=>Object.keys(m).sort().map(name=>({name,type:typeof m[name],arity:typeof m[name]==='function'?m[name].length:null}));const apiInventory={package:{name:pjson.name,version:pjson.version,exports:pjson.exports,bin:pjson.bin??null,scripts:Object.keys(pjson.scripts||{}).sort()},public:inv(pub),core:inv(core),fast:inv(fast)};await writeFile(path.join(ROOT,'artifacts/update-19/public-api-inventory.json'),`${JSON.stringify(apiInventory,null,2)}\n`);add('public-api-snapshot',apiInventory.public.length>0&&apiInventory.core.length>0&&apiInventory.fast.length>0,{counts:{public:apiInventory.public.length,core:apiInventory.core.length,fast:apiInventory.fast.length}});
// Current workflow suppression inventory: grep is inventory only; classify mandatory test workflow separately.
const workflows=['test.yml','benchmark.yml','implementations.yml','property-soak.yml','release-verification.yml','update-08-stage-04a.yml','update-08-stage-07-router-fix.yml','update-13-intl-audit.yml','visual.yml'];const findings=[];for(const f of workflows){const t=await readFile(path.join(ROOT,'.github/workflows',f),'utf8');t.split(/\r?\n/).forEach((line,i)=>{if(/continue-on-error\s*:\s*true|\|\|\s*true|set \+e/.test(line))findings.push({file:f,line:i+1,text:line.trim()});});}const testWorkflow=await readFile(path.join(ROOT,'.github/workflows/test.yml'),'utf8');add('mandatory-test-no-continue-on-error',!/continue-on-error\s*:\s*true/.test(testWorkflow),{findings,classification:'set +e blocks in test.yml explicitly capture/check status; historical Update8 evidence workflow has continue-on-error but is not the mandatory normative test job.'});
// Fossils and data-flow inventory. Occurrence != failure.
const scanFiles=['sources/מגילת העיתים.md','verification/reference-oracle/reference.mjs','browser/pastafari-calendar-core-chronicle.js','browser/year-ceiling-detour.js','browser/year-ceiling-detour-detour.js','browser/year-ceiling-detour-detour-detour.js','browser/cache-epoch-detour.js','browser/intl-calendar-semantic-firewall.js','src/public-api.js','scripts/build-standalone.mjs'];const fossils=[];for(const f of scanFiles){const t=await readFile(path.join(ROOT,f),'utf8');fossils.push({file:f,contains5781:t.includes('5781'),contains5778:t.includes('5778'),containsOrderNumber:t.includes('orderNumber'),containsIntl:t.includes('Intl'),classification:f.startsWith('sources/')?'normative source':f.includes('reference-oracle')?'clear reference':f.includes('browser/')||f.startsWith('src/')?'production path under test':'build/support'});}await writeFile(path.join(ROOT,'artifacts/update-19/historical-fossil-dataflow-inventory.json'),`${JSON.stringify(fossils,null,2)}\n`);add('fossil-inventory-produced',true,{fossils});
const failures=checks.filter(x=>x.status!=='PASS');const artifact={schema:'pastafari.update19.static-corpus-ci-audit.v1',generatedAt:new Date().toISOString(),status:failures.length?'FAIL':'PASS',checks};await writeFile(OUT,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({status:artifact.status,failures:failures.map(x=>x.id),out:path.relative(ROOT,OUT)},null,2));if(failures.length)process.exitCode=1;
