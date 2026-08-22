"use strict";
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as authoritative from '../../browser/pastafari-calendar-core.js';
import * as fast from '../../browser/pastafari-calendar-fast.js';
const corpus=JSON.parse(fs.readFileSync(new URL('./stage-07-cross-environment-vectors.json',import.meta.url),'utf8'));
const canon=v=>{const s=typeof v?.toJSON==='function'?v.toJSON():v;return {year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)}};
const ac=new authoritative.PastafariCalendar({todayProvider:()=>new authoritative.GregorianDate(2000n,1,1)});
const fc=new fast.PastafariCalendar({todayProvider:()=>new fast.GregorianDate(2000n,1,1)});
const clean=corpus.vectors.map(v=>({id:v.id,authoritative:canon(ac.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)})),fast:canon(fc.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)}))}));
for(const x of clean)assert.deepStrictEqual(x.fast,x.authoritative,`clean ${x.id}`);
for(let i=0;i<100;i++){let e;try{new authoritative.IslamicDate(1448n,1,1,{variant:`invalid-stage7-history-${i}`})}catch(x){e=x}assert(e);assert.equal(e.name,'RangeError');}
const post=corpus.vectors.map(v=>({id:v.id,authoritative:canon(ac.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)})),fast:canon(fc.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)}))}));
for(let i=0;i<post.length;i++){assert.deepStrictEqual(post[i].fast,post[i].authoritative,`post-failure ${post[i].id}`);assert.deepStrictEqual(post[i],clean[i],`history changed ${post[i].id}`);}
console.log('TAP version 13');console.log('ok 1 - clean authoritative == fast across 13 shared vectors');console.log('ok 2 - authoritative failures x100 do not change fast comparison');console.log('1..2');
console.error('STAGE7_JSON='+JSON.stringify({result:'PASS',vectors:post.length,failures:100,historyEquivalent:true}));
