#!/usr/bin/env node
"use strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FOUNDATION_JDN, ReferenceCalendar } from "../reference-oracle/reference.mjs";
import * as authoritative from "../../browser/pastafari-calendar-core.js";
import * as fast from "../../browser/pastafari-calendar-fast.js";

const ROOT=path.resolve(fileURLToPath(new URL("../..",import.meta.url)));
const OUT_DIR=path.join(ROOT,"artifacts/update-19/regions");
await mkdir(OUT_DIR,{recursive:true});
const arg=process.argv.find(x=>x.startsWith("--region="));
const region=arg?.slice("--region=".length)||"foundation";
const SEED=0x19f17a5d;
const TABLETS=1_442_903n;
function canonical(v){const s=typeof v?.toJSON==="function"?v.toJSON():v;return{year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)};}
function stable(v){return JSON.stringify(v);}
function error(e){return{name:e?.name||"Error",message:String(e?.message??e),code:e?.code??null};}
function mkAuth(){return new authoritative.PastafariCalendar({todayProvider:()=>new authoritative.GregorianDate(2000n,1,1)});}
function mkFast(){return new fast.PastafariCalendar({todayProvider:()=>new fast.GregorianDate(2000n,1,1)});}

function fixedCases(){
  switch(region){
    case "foundation": return [{c:FOUNDATION_JDN+53n,t:FOUNDATION_JDN+53n},{c:FOUNDATION_JDN+53n,t:FOUNDATION_JDN+31n},{c:FOUNDATION_JDN+53n,t:FOUNDATION_JDN+89n}];
    case "tablets": return [{c:TABLETS+17n,t:TABLETS-23n},{c:TABLETS+17n,t:TABLETS+17n},{c:TABLETS+17n,t:TABLETS+61n}];
    case "near-zero": return [{c:37n,t:-41n},{c:37n,t:37n},{c:37n,t:113n}];
    case "cross-zero": return [{c:-97n,t:113n},{c:113n,t:-97n},{c:-1009n,t:2027n}];
    case "modern": return [{c:2_461_317n,t:2_461_279n},{c:2_461_317n,t:2_461_317n},{c:2_461_317n,t:2_461_381n}];
    case "far-negative": return [{c:-20_000_019n,t:-20_000_071n},{c:-20_000_019n,t:-20_000_019n},{c:-20_000_019n,t:-19_999_937n}];
    case "far-positive": return [{c:8_000_037n,t:7_999_981n},{c:8_000_037n,t:8_000_037n},{c:8_000_037n,t:8_000_101n}];
    case "large-distance": return [{c:FOUNDATION_JDN+37n,t:FOUNDATION_JDN+100_003n},{c:1009n,t:-100_003n},{c:-1009n,t:100_003n}];
    case "cardinality-5778": return [{c:-14_072_054n,t:-14_072_054n},{c:-14_072_054n,t:-14_072_053n},{c:-14_072_054n,t:-14_072_055n}];
    default: return null;
  }
}

let cases=fixedCases();
if(!cases && region==="boundaries"){
  const c=FOUNDATION_JDN+73n;
  const rc=new ReferenceCalendar(c);
  const y=rc.findYear(c);
  const s=rc.structure(y);
  const targets=new Set([y.startJdn,y.startJdn+1n,y.endJdn-1n,y.endJdn]);
  // fresh cutlet boundaries ±1
  for(const off of s.cutletStartOffsets.slice(1,4)){const j=y.startJdn+BigInt(off);for(const d of [-1n,0n,1n])if(j+d>=y.startJdn&&j+d<=y.endJdn)targets.add(j+d);}
  // fresh month transitions ±1
  let last=s.monthWeave[0];let found=0;
  for(let i=1;i<s.monthWeave.length&&found<3;i++){if(s.monthWeave[i]!==last){const j=y.startJdn+BigInt(i);for(const d of [-1n,0n,1n])if(j+d>=y.startJdn&&j+d<=y.endJdn)targets.add(j+d);found++;}last=s.monthWeave[i];}
  cases=[...targets].map(t=>({c,t}));
}
if(!cases){console.error(`unknown region ${region}`);process.exit(2);}

const byC=new Map();
function context(c){const k=String(c);if(!byC.has(k))byC.set(k,{ref:new ReferenceCalendar(c),auth:mkAuth(),fast:mkFast()});return byC.get(k);}
const rows=[];
for(const x of cases){
  const started=Date.now();let expected=null,a=null,f=null,err=null;
  try{const ctx=context(x.c);expected=canonical(ctx.ref.convertJdn(x.t));a=canonical(ctx.auth.convertJdn(x.t,{calculationJdn:x.c}));f=canonical(ctx.fast.convertJdn(x.t,{calculationJdn:x.c}));}catch(e){err=error(e);}
  rows.push({input:{calculationJdn:String(x.c),targetJdn:String(x.t)},reference:expected,authoritative:a,fast:f,error:err,authoritativeMatch:!err&&stable(expected)===stable(a),fastMatch:!err&&stable(expected)===stable(f),elapsedMs:Date.now()-started});
}
const failures=rows.filter(r=>!r.authoritativeMatch||!r.fastMatch);
const artifact={schema:"pastafari.update19.final-tuple-region.v1",generatedAt:new Date().toISOString(),region,seed:SEED,status:failures.length?"FAIL":"PASS",rows,totals:{cases:rows.length,mismatches:failures.length}};
const out=path.join(OUT_DIR,`${region}.json`);await writeFile(out,`${JSON.stringify(artifact,null,2)}\n`);console.log(JSON.stringify({region,status:artifact.status,cases:rows.length,mismatches:failures.length,out:path.relative(ROOT,out)},null,2));if(failures.length)process.exitCode=1;
