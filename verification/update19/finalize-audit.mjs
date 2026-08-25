#!/usr/bin/env node
"use strict";
import { createHash } from "node:crypto";
import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const COLLECTED=path.join(ROOT,"artifacts/update-19/collected");
const OUT=path.join(ROOT,"artifacts/update-19/final-evidence");
const BASE=process.env.UPDATE19_BASE_COMMIT||"01866e2b74823ca34639f226067d07ee15279249";
await mkdir(OUT,{recursive:true});
function sha(buf){return createHash("sha256").update(buf).digest("hex");}
function serialize(v){if(typeof v==="bigint")return v.toString();if(Array.isArray(v))return v.map(serialize);if(v&&typeof v==="object")return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,serialize(x)]));return v;}
async function walk(dir){const out=[];try{for(const ent of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory())out.push(...await walk(p));else if(ent.isFile())out.push(p);}}catch{}return out;}
const files=await walk(COLLECTED);
function matchesBasename(name){return files.filter(f=>path.basename(f)===name);}
async function readJsonByBasename(name){const hits=matchesBasename(name);if(hits.length!==1)return{value:null,path:null,error:hits.length===0?"missing":`ambiguous:${hits.length}`};try{return{value:JSON.parse(await readFile(hits[0],"utf8")),path:hits[0],error:null};}catch(e){return{value:null,path:hits[0],error:`parse:${e.message}`};}}
async function copyInputs(){const dest=path.join(OUT,"inputs");await mkdir(dest,{recursive:true});for(const f of files){const rel=path.relative(COLLECTED,f);const d=path.join(dest,rel);await mkdir(path.dirname(d),{recursive:true});await cp(f,d);}return files.length;}
const copiedInputCount=await copyInputs();

const required=[
  "audit-scope.json",
  "node-independent-audit.json",
  "static-corpus-ci-audit.json",
  "external-calendar-foundation-matrix.json",
  "deep-state-leak-soak.json",
  "browser-worker-standalone-parity.json",
  "build-package-reproducibility.json",
  "ci-command-parity.json",
];
const loaded={};const missing=[];const parseErrors=[];
for(const name of required){const r=await readJsonByBasename(name);if(r.error){(r.error==="missing"?missing:parseErrors).push({name,error:r.error});}else loaded[name]=r.value;}
const regionNames=["foundation","tablets","near-zero","cross-zero","modern","far-negative","far-positive","large-distance","cardinality-5778","boundaries"];
const regions=[];
for(const region of regionNames){const r=await readJsonByBasename(`${region}.json`);if(r.error){missing.push({name:`regions/${region}.json`,error:r.error});continue;}regions.push(r.value);}
const regionFailures=regions.filter(x=>x.status!=="PASS"||x.totals?.mismatches!==0);
const farGrid={schema:"pastafari.update19.far-region-grid.v1",generatedAt:new Date().toISOString(),status:(regions.length===regionNames.length&&regionFailures.length===0)?"PASS":regionFailures.some(x=>x.status==="FAIL")?"FAIL":"INCOMPLETE",regions,totals:{regions:regions.length,cases:regions.reduce((a,x)=>a+(x.totals?.cases||0),0),mismatches:regions.reduce((a,x)=>a+(x.totals?.mismatches||0),0)}};
await writeFile(path.join(OUT,"far-region-grid.json"),`${JSON.stringify(farGrid,null,2)}\n`);

const node=loaded["node-independent-audit.json"];
const nodeChecks=new Map((node?.checks||[]).map(x=>[x.id,x]));
const passCheck=id=>nodeChecks.get(id)?.status==="PASS";
const external=loaded["external-calendar-foundation-matrix.json"];
const deep=loaded["deep-state-leak-soak.json"];
const browser=loaded["browser-worker-standalone-parity.json"];
const build=loaded["build-package-reproducibility.json"];
const staticAudit=loaded["static-corpus-ci-audit.json"];
const ci=loaded["ci-command-parity.json"];
const scope=loaded["audit-scope.json"];
const reqPass=(...conditions)=>conditions.every(Boolean);

const requirementSpecs=[
  ["SCROLL-FOUNDATION","Day-of-Foundation anchor and continuous index","§ יום היסוד","verification/reference-oracle/reference.mjs","browser/pastafari-calendar-core.js","reference-foundation-constant"],
  ["COUNTERS","calculation/target/distance/sum/direction counters","§ המניינים","verification/reference-oracle/reference.mjs","authoritative counters through conversion path","fresh-2d-foundation-grid"],
  ["KEEP-MOD-FLOOR","keep/modulo/floor including negative values","§ arithmetic conventions","verification/reference-oracle/reference.mjs","authoritative arithmetic helpers","fresh-bowlsum-vs-ordernumber"],
  ["SAUCE-STONES","KMAC/SHAKE/SHA3, root split, stones, eleven grinds","§ רוטב/אבנים","verification/reference-oracle/reference.mjs","browser/pastafari-calendar-core.js","fresh-bowlsum-vs-ordernumber"],
  ["SAUCE-BOWLS","six bowls, pourings, mixing constants and final keep","§ קערות/מזיגות","verification/reference-oracle/reference.mjs","browser/pastafari-calendar-core.js","fresh-bowlsum-vs-ordernumber"],
  ["FINAL-STIRS","12 final stirs; bowlSum enters u and orderNumber only orders","§ 12 בחישות","verification/reference-oracle/reference.mjs","browser/pastafari-calendar-core.js","fresh-bowlsum-vs-ordernumber"],
  ["GATES-POSITIVE","positive gate sequence/checkpoints/transitions","§ שערים","verification/reference-oracle/reference.mjs","GateIndex + gate-data detours","fresh-gate-positive-negative"],
  ["GATES-NEGATIVE","negative gate sequence/checkpoints/transitions","§ שערים","verification/reference-oracle/reference.mjs","GateIndex + gate-data detours","fresh-gate-positive-negative"],
  ["YEAR-CANDIDATES","candidate discovery and pre-selection filtering","§ שנים","verification/reference-oracle/reference.mjs","year selection detours","fresh-5778-raw-candidates"],
  ["YEAR-MAX-5778","binding inclusive maximum year length 5778","§ שנים + הערה 13","verification/reference-oracle/reference.mjs","year-ceiling detours","fresh-5778-cardinality"],
  ["YEAR-CARDINALITY","filter before candidateCount/chooseIndex","§ בחירת שנה","verification/reference-oracle/reference.mjs","year-ceiling detours","fresh-5778-cardinality"],
  ["YEAR-CONTINUITY","close(Y)+1=open(Y+1), next/previous","§ רציפות שנים","verification/reference-oracle/reference.mjs","authoritative year navigation","region-boundaries"],
  ["CUTLETS","cutlet count/order/boundaries/containment","§ קציצות","verification/reference-oracle/reference.mjs","authoritative year structure","region-boundaries"],
  ["MONTHS","month count/lengths/weaving/order/boundaries","§ חודשים","verification/reference-oracle/reference.mjs","authoritative year structure","region-boundaries"],
  ["MONTH-WEAVING","count/rank/unrank bijection on accepted domain","§ שזירת חודשים","verification/update14/month-weaving-reference.mjs","MonthWeavingCounter + detour","fresh-month-weaving-exhaustive"],
  ["FINAL-TUPLE","two-dimensional normative final tuple f(c,t)","§ תאריך סופי","verification/reference-oracle/reference.mjs","authoritative + fast engines","all-region-shards"],
  ["EXTERNAL-ARITHMETIC","arithmetic calendars incl Foundation/negative numbering","§ ייצוגים חיצוניים","verification/update17/external-calendar-reference.mjs","src/public-api.js calendar converters","external-matrix"],
  ["CHINESE","deterministic structured Chinese representation","§ סיני","verification/update17/chinese-reference.mjs","src/public-api.js Chinese API","external+browser-intl"],
  ["VIKRAMA","normative Vikrama representation","§ Vikrama","verification/update11/vikrama-reference.mjs","src/public-api.js Vikrama API","external-matrix"],
  ["KOKI","proleptic Kōki incl negative/epoch/modern","§ Kōki","verification/update12/reference-koki.mjs","src/public-api.js Kōki API","external-matrix"],
  ["HOST-ISOLATION","Intl/ICU/locale/timezone cannot alter normative semantics","normative/host distinction","reference path has no Intl dependency","Intl firewall + public API","external+browser matrices"],
  ["REFERENCE-INDEPENDENCE","Scroll > clear reference > corpus; no majority vote","source-of-truth rule","verification/reference-oracle/reference.mjs","production under test only","static+shared-bug"],
  ["ARTIFACT-INTEGRITY","canonical/precomputed data regenerated and validated; dead fossils inert","artifact authority rule","Update17 reference generator","gate/precomputed/corpus artifacts","static-corpus"],
  ["STATE-INVARIANCE","cache/history/reentrancy/failure/random/witness/noise invariance","determinism rule","pure reference","runtime patching/cache/witness machinery","node+deep-state"],
  ["ENV-PARITY","Node/browser/Worker/standalone parity","environment requirement","reference adjudicator","built browser/worker/standalone artifacts","browser parity"],
  ["PUBLIC-COMPAT","exports/package/browser/Worker/standalone/CLI contract","compatibility policy","N/A","public package surface","package+CI parity"],
  ["OVERFLOW-DOMAIN","supported range guards reject overflow deterministically","domain requirement","reference/public guard tests","public API guards","full CI suite"],
];
const requirementConditions={
  "SCROLL-FOUNDATION":()=>reqPass(passCheck("scroll-direct-facts"),passCheck("reference-foundation-constant")),
  "COUNTERS":()=>reqPass(passCheck("fresh-2d-foundation-grid"),farGrid.status==="PASS"),
  "KEEP-MOD-FLOOR":()=>passCheck("fresh-bowlsum-vs-ordernumber"),
  "SAUCE-STONES":()=>passCheck("fresh-bowlsum-vs-ordernumber"),
  "SAUCE-BOWLS":()=>passCheck("fresh-bowlsum-vs-ordernumber"),
  "FINAL-STIRS":()=>passCheck("fresh-bowlsum-vs-ordernumber"),
  "GATES-POSITIVE":()=>reqPass(passCheck("fresh-gate-positive-negative"),staticAudit?.status==="PASS"),
  "GATES-NEGATIVE":()=>reqPass(passCheck("fresh-gate-positive-negative"),staticAudit?.status==="PASS"),
  "YEAR-CANDIDATES":()=>passCheck("fresh-5778-raw-candidates"),
  "YEAR-MAX-5778":()=>reqPass(passCheck("reference-year-ceiling-constant"),passCheck("fresh-5778-cardinality")),
  "YEAR-CARDINALITY":()=>reqPass(passCheck("fresh-5778-cardinality"),regions.some(r=>r.region==="cardinality-5778"&&r.status==="PASS")),
  "YEAR-CONTINUITY":()=>reqPass(farGrid.status==="PASS",ci?.status==="PASS"),
  "CUTLETS":()=>reqPass(farGrid.status==="PASS",ci?.status==="PASS"),
  "MONTHS":()=>reqPass(farGrid.status==="PASS",ci?.status==="PASS"),
  "MONTH-WEAVING":()=>reqPass(passCheck("fresh-month-weaving-exhaustive"),ci?.status==="PASS"),
  "FINAL-TUPLE":()=>reqPass(passCheck("fresh-2d-foundation-grid"),farGrid.status==="PASS"),
  "EXTERNAL-ARITHMETIC":()=>reqPass(passCheck("fresh-external-calendar-foundation-matrix"),passCheck("fresh-external-year-numbering"),external?.status==="PASS"),
  "CHINESE":()=>reqPass(passCheck("fresh-specialized-calendar-reference"),passCheck("fresh-chinese-intl-host-independence"),external?.status==="PASS",browser?.status==="PASS"),
  "VIKRAMA":()=>reqPass(passCheck("fresh-specialized-calendar-reference"),external?.status==="PASS"),
  "KOKI":()=>reqPass(passCheck("fresh-specialized-calendar-reference"),external?.status==="PASS"),
  "HOST-ISOLATION":()=>reqPass(passCheck("fresh-chinese-intl-host-independence"),external?.status==="PASS",external?.update13EnvironmentMatrix?.payload?.status==="PASS",browser?.status==="PASS"),
  "REFERENCE-INDEPENDENCE":()=>reqPass(passCheck("reference-static-independence"),passCheck("fresh-shared-bug-simulation"),staticAudit?.status==="PASS"),
  "ARTIFACT-INTEGRITY":()=>reqPass(staticAudit?.status==="PASS",ci?.status==="PASS"),
  "STATE-INVARIANCE":()=>reqPass(passCheck("fresh-state-history-invariance"),passCheck("fresh-faulted-randomness-cleanup"),deep?.status==="PASS"),
  "ENV-PARITY":()=>browser?.status==="PASS",
  "PUBLIC-COMPAT":()=>reqPass(passCheck("public-api-inventory-captured"),build?.status==="PASS",ci?.status==="PASS"),
  "OVERFLOW-DOMAIN":()=>ci?.status==="PASS",
};
const matrixRows=requirementSpecs.map(([id,description,scrollSection,referenceLocation,productionPathOrDetour,freshAuditEvidence])=>{
  const verified=requirementConditions[id]?.()===true;
  return {id,scrollSection,description,referenceLocation,productionPathOrDetour,fastCoverage:["FINAL-TUPLE","GATES-POSITIVE","GATES-NEGATIVE","SAUCE-STONES","SAUCE-BOWLS","FINAL-STIRS"].includes(id)?"covered in supported fast domain":"indirect/N/A",canonicalVectorCoverage:"Update 17 canonical corpus where applicable",freshAuditEvidence,environments:id==="ENV-PARITY"?["Node","Chromium browser","real Worker","standalone"]:["Node"],status:verified?"PASS":"FAIL",verificationState:verified?"VERIFIED":(missing.length||parseErrors.length?"MISSING_OR_UNREADABLE_EVIDENCE":"FAILED_EVIDENCE"),notes:verified?null:"A FAIL row under FINAL_AUDIT_INCOMPLETE can mean evidence was missing/timed out rather than a semantic mismatch; see final-independent-audit.json blockers."};
});
await writeFile(path.join(OUT,"FINAL-NORMATIVE-COMPLIANCE-MATRIX.json"),`${JSON.stringify({schema:"pastafari.update19.final-normative-compliance-matrix.v1",baseCommit:BASE,generatedAt:new Date().toISOString(),rows:matrixRows},null,2)}\n`);

const updateGoals={1:"Independent normative reference/oracle baseline",2:"bowlSum/orderNumber final-stir correction",3:"gate/precomputed regeneration and parity",4:"5778 pre-cardinality ceiling",5:"direction-complete year-ceiling detours",6:"reentrant runtime patch ownership/restoration",7:"cache/import-order/instance-age invariance",8:"constructor/failed-call rollback and leak closure",9:"negative-year arithmetic external calendars",10:"normative Chinese independent of Intl",11:"normative Vikrama",12:"proleptic Kōki",13:"Intl/ICU semantic isolation",14:"MonthWeavingCounter public bijection",15:"random/witness/noise semantic inertness",16:"source-of-truth authority order",17:"reference-only canonical regeneration",18:"final differential integration"};
const updatePass={
  1:()=>reqPass(passCheck("reference-static-independence"),ci?.status==="PASS"),
  2:()=>passCheck("fresh-bowlsum-vs-ordernumber"),
  3:()=>reqPass(passCheck("fresh-gate-positive-negative"),staticAudit?.status==="PASS"),
  4:()=>reqPass(passCheck("fresh-5778-raw-candidates"),passCheck("fresh-5778-cardinality")),
  5:()=>reqPass(passCheck("fresh-5778-cardinality"),farGrid.status==="PASS"),
  6:()=>deep?.status==="PASS",
  7:()=>reqPass(passCheck("fresh-import-order-matrix"),passCheck("fresh-state-history-invariance"),deep?.status==="PASS"),
  8:()=>deep?.status==="PASS",
  9:()=>reqPass(passCheck("fresh-external-year-numbering"),external?.status==="PASS"),
  10:()=>reqPass(passCheck("fresh-specialized-calendar-reference"),browser?.status==="PASS",external?.status==="PASS"),
  11:()=>reqPass(passCheck("fresh-specialized-calendar-reference"),external?.status==="PASS"),
  12:()=>reqPass(passCheck("fresh-specialized-calendar-reference"),external?.status==="PASS"),
  13:()=>reqPass(passCheck("fresh-chinese-intl-host-independence"),external?.update13EnvironmentMatrix?.payload?.status==="PASS",browser?.status==="PASS"),
  14:()=>reqPass(passCheck("fresh-month-weaving-exhaustive"),ci?.status==="PASS"),
  15:()=>reqPass(passCheck("fresh-state-history-invariance"),passCheck("fresh-faulted-randomness-cleanup"),deep?.status==="PASS"),
  16:()=>reqPass(passCheck("reference-static-independence"),passCheck("fresh-shared-bug-simulation"),staticAudit?.status==="PASS"),
  17:()=>reqPass(passCheck("fresh-canonical-corpus-stale-check"),staticAudit?.status==="PASS",ci?.status==="PASS"),
  18:()=>reqPass(farGrid.status==="PASS",browser?.status==="PASS",ci?.status==="PASS"),
};
const closureRows=[];for(let n=1;n<=18;n++){const pass=updatePass[n]?.()===true;closureRows.push({update:n,originalGoal:updateGoals[n],currentImplementation:"present in integrated main; production semantics unchanged by Update 19 harness",regressionTest:"retained update-specific suite via CI parity",freshAuditTest:"Update 19 independent/sharded evidence",status:pass?"PASS":"FAIL",verificationState:pass?"VERIFIED":(missing.length||parseErrors.length?"MISSING_OR_UNREADABLE_EVIDENCE":"FAILED_EVIDENCE")});}
await writeFile(path.join(OUT,"UPDATE-01-18-CLOSURE.json"),`${JSON.stringify({schema:"pastafari.update19.update-01-18-closure.v1",baseCommit:BASE,generatedAt:new Date().toISOString(),rows:closureRows},null,2)}\n`);

// Convenience matrices requested by the audit prompt.
const nodeState=nodeChecks.get("fresh-state-history-invariance")?.evidence??null;
const importOrder=nodeChecks.get("fresh-import-order-matrix")?.evidence??null;
const randomness=nodeChecks.get("fresh-faulted-randomness-cleanup")?.evidence??null;
await writeFile(path.join(OUT,"state-history-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.state-history-matrix.v1",status:reqPass(passCheck("fresh-state-history-invariance"),deep?.status==="PASS")?"PASS":"FAIL",node:nodeState,deep},null,2)}\n`);
await writeFile(path.join(OUT,"import-order-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.import-order-matrix.v1",status:passCheck("fresh-import-order-matrix")?"PASS":"FAIL",evidence:importOrder},null,2)}\n`);
await writeFile(path.join(OUT,"reentrancy-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.reentrancy-matrix.v1",status:deep?.status==="PASS"?"PASS":"FAIL",nestedRows:deep?.nestedRows??null,exceptionRows:deep?.exceptionRows??null},null,2)}\n`);
await writeFile(path.join(OUT,"failure-leak-soak.json"),`${JSON.stringify({schema:"pastafari.update19.failure-leak-soak.v1",status:deep?.status==="PASS"?"PASS":"FAIL",stage6StructuralEvidence:deep?.stage6StructuralEvidence??null,historicalArtifactsRestored:deep?.historicalArtifactsRestored??null},null,2)}\n`);
await writeFile(path.join(OUT,"random-witness-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.random-witness-matrix.v1",status:reqPass(passCheck("fresh-faulted-randomness-cleanup"),deep?.status==="PASS")?"PASS":"FAIL",node:randomness,update15FreshEvidence:deep?.update15FreshEvidence??null},null,2)}\n`);
await writeFile(path.join(OUT,"intl-fault-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.intl-fault-matrix.v1",status:reqPass(external?.update13EnvironmentMatrix?.payload?.status==="PASS",browser?.status==="PASS")?"PASS":"FAIL",nodeExternal:external?.update13EnvironmentMatrix??null,browser:browser?.intl??null},null,2)}\n`);
await writeFile(path.join(OUT,"environment-parity-matrix.json"),`${JSON.stringify({schema:"pastafari.update19.environment-parity-matrix.v1",status:browser?.status==="PASS"?"PASS":"FAIL",browser},null,2)}\n`);
await writeFile(path.join(OUT,"bundle-package-audit.json"),`${JSON.stringify({schema:"pastafari.update19.bundle-package-audit.v1",status:build?.status==="PASS"?"PASS":"FAIL",build},null,2)}\n`);
await writeFile(path.join(OUT,"api-compatibility-audit.json"),`${JSON.stringify({schema:"pastafari.update19.api-compatibility-audit.v1",status:reqPass(passCheck("public-api-inventory-captured"),build?.status==="PASS",ci?.status==="PASS")?"PASS":"FAIL",inventory:nodeChecks.get("public-api-inventory-captured")?.evidence??null,package:build?.package??null},null,2)}\n`);
await writeFile(path.join(OUT,"ci-audit.json"),`${JSON.stringify({schema:"pastafari.update19.ci-audit.v1",status:reqPass(passCheck("ci-no-mandatory-continue-on-error"),ci?.status==="PASS")?"PASS":"FAIL",suppressionInventory:nodeChecks.get("ci-no-mandatory-continue-on-error")?.evidence??null,commandParity:ci},null,2)}\n`);
await writeFile(path.join(OUT,"memory-performance-sanity.json"),`${JSON.stringify({schema:"pastafari.update19.memory-performance-sanity.v1",status:deep?.status==="PASS"?"PASS":"FAIL",evidence:deep?.stage6StructuralEvidence??null},null,2)}\n`);

const evidenceStatuses=Object.entries(loaded).map(([name,v])=>({name,status:v?.status??null}));
const explicitFail=evidenceStatuses.some(x=>x.status==="FAIL"||x.status==="ERROR"||x.status==="NODE_AUDIT_FAILED")||regionFailures.some(x=>x.status==="FAIL")||node?.checks?.some(x=>x.status==="FAIL");
const explicitIncomplete=evidenceStatuses.some(x=>x.status==="INCOMPLETE"||x.status==="NODE_AUDIT_INCOMPLETE")||farGrid.status==="INCOMPLETE"||node?.checks?.some(x=>x.status==="INCOMPLETE");
const allReqPass=matrixRows.every(x=>x.status==="PASS");
const allUpdatesPass=closureRows.every(x=>x.status==="PASS");
let finalStatus;
if(explicitFail) finalStatus="FINAL_AUDIT_FAILED";
else if(missing.length||parseErrors.length||explicitIncomplete||!allReqPass||!allUpdatesPass) finalStatus="FINAL_AUDIT_INCOMPLETE";
else finalStatus="FINAL_AUDIT_PASS";
const packageJson=JSON.parse(await readFile(path.join(ROOT,"package.json"),"utf8"));
const gitHead=spawnSync("git",["rev-parse","HEAD"],{cwd:ROOT,encoding:"utf8"}).stdout.trim()||null;
const blockers=[...missing.map(x=>({kind:"MISSING_EVIDENCE",...x})),...parseErrors.map(x=>({kind:"UNREADABLE_EVIDENCE",...x}))];
if(!allReqPass)blockers.push({kind:"REQUIREMENT_MATRIX_NOT_ALL_PASS",ids:matrixRows.filter(x=>x.status!=="PASS").map(x=>x.id)});
if(!allUpdatesPass)blockers.push({kind:"UPDATE_CLOSURE_NOT_ALL_PASS",updates:closureRows.filter(x=>x.status!=="PASS").map(x=>x.update)});
const meta=node?.checks?.find(x=>x.id==="metadata-hash-binding")?.evidence??null;
const final={schema:"pastafari.update19.final-independent-audit.v1",generatedAt:new Date().toISOString(),status:finalStatus,baseCommit:BASE,harnessCommit:scope?.harnessCommit??gitHead,packageVersion:packageJson.version,hashes:meta?.hashes??null,seeds:node?.seeds??null,inputs:{copiedInputCount,evidenceStatuses,regions:regions.map(x=>({region:x.region,status:x.status,cases:x.totals?.cases,mismatches:x.totals?.mismatches}))},requirements:{allPass:allReqPass,count:matrixRows.length},updates01to18:{allPass:allUpdatesPass},mismatchPolicy:{threshold:0,noMajorityVote:true,currentProductionNeverExpected:true},blockers,releaseGate:finalStatus==="FINAL_AUDIT_PASS"?"UPDATE_20_ALLOWED":"UPDATE_20_BLOCKED",declaration:finalStatus==="FINAL_AUDIT_PASS"?"THE UPDATE SERIES IS SEMANTICALLY READY FOR RELEASE CLOSURE":null};
await writeFile(path.join(OUT,"final-independent-audit.json"),`${JSON.stringify(final,null,2)}\n`);
const report=`# Update 19 — Final Independent Normative Audit\n\nStatus: **${finalStatus}**\n\n- Audited production base: \`${BASE}\`\n- Audit harness commit: \`${final.harnessCommit}\`\n- Package version: \`${packageJson.version}\`\n- Required evidence files missing: ${missing.length}\n- Unreadable evidence files: ${parseErrors.length}\n- Requirement rows PASS: ${matrixRows.filter(x=>x.status==="PASS").length}/${matrixRows.length}\n- Updates 1–18 PASS: ${closureRows.filter(x=>x.status==="PASS").length}/18\n- Region mismatches: ${farGrid.totals.mismatches}\n\n${finalStatus==="FINAL_AUDIT_PASS"?"FINAL_AUDIT_PASS\\n\\nTHE UPDATE SERIES IS SEMANTICALLY READY FOR RELEASE CLOSURE":"Update 20 remains blocked."}\n`;
await writeFile(path.join(OUT,"report.md"),report);

// SHA256 manifest covers every final evidence file except itself; no self-reference.
const finalFiles=(await walk(OUT)).filter(f=>path.basename(f)!=="SHA256SUMS.txt").sort((a,b)=>path.relative(OUT,a).localeCompare(path.relative(OUT,b)));
const lines=[];for(const f of finalFiles){lines.push(`${sha(await readFile(f))}  ./${path.relative(OUT,f).split(path.sep).join("/")}`);}await writeFile(path.join(OUT,"SHA256SUMS.txt"),`${lines.join("\n")}\n`);
console.log(JSON.stringify({status:finalStatus,baseCommit:BASE,harnessCommit:final.harnessCommit,requirementsPass:matrixRows.filter(x=>x.status==="PASS").length,requirementsTotal:matrixRows.length,updatesPass:closureRows.filter(x=>x.status==="PASS").length,missing:missing.length,parseErrors:parseErrors.length,regionMismatches:farGrid.totals.mismatches,out:path.relative(ROOT,OUT)},null,2));
if(finalStatus!=="FINAL_AUDIT_PASS")process.exitCode=1;
