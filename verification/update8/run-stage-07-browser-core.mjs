"use strict";
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const ART=path.join(ROOT,'artifacts');
const CHROMIUM=process.env.CHROMIUM_PATH||'/usr/bin/chromium';
const corpus=JSON.parse(fs.readFileSync(path.join(ROOT,'verification/update8/stage-07-cross-environment-vectors.json'),'utf8'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const FIELDS=['year','cutletName','dayInCutlet','monthName','dayInMonth'];

class CDP{
  constructor(wsUrl){this.ws=new WebSocket(wsUrl);this.next=1;this.pending=new Map;}
  async open(){await new Promise((res,rej)=>{this.ws.addEventListener('open',res,{once:true});this.ws.addEventListener('error',rej,{once:true});});this.ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(!m.id)return;const p=this.pending.get(m.id);if(!p)return;this.pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);});}
  call(method,params={}){const id=this.next++;return new Promise((resolve,reject)=>{this.pending.set(id,{resolve,reject});this.ws.send(JSON.stringify({id,method,params}));});}
  async eval(expression,{awaitPromise=true,returnByValue=true,timeout=600000}={}){const r=await this.call('Runtime.evaluate',{expression,awaitPromise,returnByValue,timeout});if(r.exceptionDetails){const d=r.exceptionDetails;throw new Error(d.exception?.description||d.text||'Runtime.evaluate failed');}return r.result?.value;}
  close(){try{this.ws.close()}catch{}}
}
async function launch(){
  const port=10000+Math.floor(Math.random()*1000),profile=`/tmp/pastafari-stage7-cdp-${process.pid}-${port}`;fs.rmSync(profile,{recursive:true,force:true});
  const child=spawn(CHROMIUM,['--headless=new','--no-sandbox','--disable-gpu',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--disable-background-networking','--no-proxy-server','--no-first-run','about:blank'],{stdio:['ignore','ignore','pipe']});let stderr='';child.stderr.on('data',d=>stderr+=d);
  let targets;for(let i=0;i<200;i++){try{targets=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(targets?.find(x=>x.type==='page'))break;}catch{}await sleep(50);}const page=targets?.find(x=>x.type==='page');if(!page)throw new Error('No Chromium page target');
  const cdp=new CDP(page.webSocketDebuggerUrl);await cdp.open();await cdp.call('Runtime.enable');const version=await cdp.call('Browser.getVersion');
  return {cdp,child,profile,version,stderr:()=>stderr,close:async()=>{cdp.close();child.kill('SIGKILL');await sleep(100);fs.rmSync(profile,{recursive:true,force:true});}};
}
function read(rel){return fs.readFileSync(path.join(ROOT,rel),'utf8');}
function replaceSpecifier(source,spec,url){
  const q=[`"${spec}"`,`'${spec}'`];let out=source,found=0;for(const needle of q){if(out.includes(needle)){out=out.split(needle).join(JSON.stringify(url));found++;}}
  if(!found)throw new Error(`Specifier ${spec} not found for rewrite`);return out;
}
async function blob(cdp,source,label){
  const expr=`(()=>{const u=URL.createObjectURL(new Blob([${JSON.stringify(source)}],{type:'text/javascript'}));globalThis[${JSON.stringify('__stage7_blob_'+label)}]=u;return u})()`;
  return cdp.eval(expr,{timeout:900000});
}
async function buildModuleGraph(cdp){
  const urls={};
  urls.diagnostics=await blob(cdp,read('browser/pastafari-diagnostics.js'),'diagnostics');
  urls.ledger=await blob(cdp,read('browser/runtime-patch-ledger.js'),'ledger');
  urls.gateShadow=await blob(cdp,read('browser/generated/pastafari-gate-shadow.js'),'gateShadow');
  urls.core1=await blob(cdp,read('browser/pastafari-calendar-core-1.js'),'core1');
  urls.core2=await blob(cdp,read('browser/pastafari-calendar-core-2.js'),'core2');
  urls.cacheEpoch=await blob(cdp,read('browser/cache-epoch-detour.js'),'cacheEpoch');
  for(const [key,file] of [['year1','browser/year-ceiling-detour.js'],['year2','browser/year-ceiling-detour-detour.js'],['year3','browser/year-ceiling-detour-detour-detour.js']]){
    let s=read(file);s=replaceSpecifier(s,'./runtime-patch-ledger.js',urls.ledger);urls[key]=await blob(cdp,s,key);
  }
  let gate=read('browser/gate-data-detour.js');gate=replaceSpecifier(gate,'./generated/pastafari-gate-shadow.js',urls.gateShadow);urls.gate=await blob(cdp,gate,'gate');
  let chron=read('browser/pastafari-calendar-core-chronicle.js');chron=replaceSpecifier(chron,'./year-ceiling-detour.js',urls.year1);chron=replaceSpecifier(chron,'./pastafari-calendar-core-1.js',urls.core1);chron=replaceSpecifier(chron,'./pastafari-calendar-core-2.js',urls.core2);urls.chron=await blob(cdp,chron,'chron');
  let core=read('browser/pastafari-calendar-core.js');for(const [spec,key] of [['./pastafari-calendar-core-chronicle.js','chron'],['./gate-data-detour.js','gate'],['./year-ceiling-detour.js','year1'],['./year-ceiling-detour-detour.js','year2'],['./year-ceiling-detour-detour-detour.js','year3'],['./cache-epoch-detour.js','cacheEpoch']])core=replaceSpecifier(core,spec,urls[key]);urls.core=await blob(cdp,core,'core');
  let fast=read('browser/pastafari-calendar-fast.js');fast=replaceSpecifier(fast,'./pastafari-diagnostics.js',urls.diagnostics);fast=fast.replace('new URL("./pastafari-calendar-core.js", import.meta.url)',`new URL(${JSON.stringify(urls.core)})`);urls.fast=await blob(cdp,fast,'fast');
  let aw=read('browser/pastafari-authoritative-worker.js');aw=replaceSpecifier(aw,'./pastafari-diagnostics.js',urls.diagnostics);aw=aw.replace('new URL("./pastafari-calendar-core.js", import.meta.url)',`new URL(${JSON.stringify(urls.core)})`);urls.authWorker=await blob(cdp,aw,'authWorker');
  let fw=read('browser/pastafari-fast-worker.js');fw=replaceSpecifier(fw,'./pastafari-diagnostics.js',urls.diagnostics);fw=fw.replace('new URL("./pastafari-calendar-fast.js", import.meta.url)',`new URL(${JSON.stringify(urls.fast)})`);urls.fastWorker=await blob(cdp,fw,'fastWorker');
  let ec=read('browser/pastafari-engine-client.js');ec=replaceSpecifier(ec,'./pastafari-diagnostics.js',urls.diagnostics);urls.engineClient=await blob(cdp,ec,'engineClient');
  let rc=read('browser/pastafari-calendar-router-core.js');rc=replaceSpecifier(rc,'./pastafari-engine-client.js',urls.engineClient);rc=replaceSpecifier(rc,'./pastafari-diagnostics.js',urls.diagnostics);urls.routerCore=await blob(cdp,rc,'routerCore');
  let r=read('browser/pastafari-calendar-router.js');r=replaceSpecifier(r,'./pastafari-engine-client.js',urls.engineClient);r=replaceSpecifier(r,'./pastafari-calendar-router-core.js',urls.routerCore);r=r.replace('new URL("./pastafari-authoritative-worker.js", import.meta.url)',`new URL(${JSON.stringify(urls.authWorker)})`).replace('new URL("./pastafari-fast-worker.js", import.meta.url)',`new URL(${JSON.stringify(urls.fastWorker)})`);urls.router=await blob(cdp,r,'router');
  return urls;
}
const canonicalJS=`v=>{const s=typeof v?.toJSON==='function'?v.toJSON():v;return {year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)}}`;
const sameJS=`(a,b)=>['year','cutletName','dayInCutlet','monthName','dayInMonth'].every(k=>a?.[k]===b?.[k])`;

async function main(){
  const env=await launch(); const {cdp}=env; const started=Date.now();
  try {
    const urls=await buildModuleGraph(cdp);
    await cdp.eval(`(()=>{const OF=globalThis.Function,OC=OF.prototype.constructor,OM=globalThis.Map,OWM=globalThis.WeakMap,OWS=globalThis.WeakSet;const weakMaps=[];const hook='__stage7_arena';globalThis[hook]=null;const FP=new Proxy(OF,{apply(t,x,a){return Reflect.apply(t,x,a)},construct(t,args,nt){const p=[...args],bi=p.length-1;if(bi>=1&&typeof p[bi]==='string'&&p[bi].length>7000000){const b=p[bi],needle='"use strict";',i=b.indexOf(needle);if(i<0)throw new Error('arena prologue missing');p[bi]=b.slice(0,i+needle.length)+'globalThis.'+hook+'='+String(p[0])+';'+b.slice(i+needle.length)}return Reflect.construct(t,p,nt===FP?t:nt)}});const WMP=new Proxy(OWM,{construct(t,a,n){const v=Reflect.construct(t,a,n===WMP?t:n);weakMaps.push(v);return v}});globalThis.__s7inst={OF,OC,OM,OWM,OWS,FP,WMP,weakMaps};globalThis.Function=FP;OF.prototype.constructor=FP;globalThis.WeakMap=WMP;})()`);
    await cdp.eval(`import(${JSON.stringify(urls.core)}).then(m=>{globalThis.__s7core=m;return true})`,{timeout:900000});
    await cdp.eval(`(()=>{const i=__s7inst;globalThis.Function=i.OF;i.OF.prototype.constructor=i.OC;globalThis.WeakMap=i.OWM;const probe={variant:'civil'};new __s7core.IslamicDate(1448n,2,9,probe);const c=i.weakMaps.map((m,n)=>({m,n,has:m.has(probe)})).filter(x=>x.has);if(c.length!==1)throw new Error('identity candidates '+c.length);globalThis.__s7id=c[0].m;globalThis.__s7ididx=c[0].n;})()`);
    const authoritative=await cdp.eval(`(()=>{const corpus=${JSON.stringify(corpus)},canon=${canonicalJS},same=${sameJS},api=__s7core,arena=__stage7_arena,id=__s7id;const holes=a=>{let n=0;for(let i=0;i<a.length;i++)if(!(i in a))n++;return n};const cal=new api.PastafariCalendar({todayProvider:()=>new api.GregorianDate(2000n,1,1)});const vectors=corpus.vectors.map(v=>{const value=canon(cal.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)}));if(!same(value,v.expected))throw new Error('vector '+v.id);return{id:v.id,value}});const defs=[{id:'gregorian-primitive',key:null,run:()=>new api.GregorianDate(2026n,1.25,22),name:'TypeError'},{id:'islamic-object',key:{variant:'bad'},name:'RangeError'},{id:'month-array',key:[1,0,2],name:'RangeError'},{id:'pastafari-options',key:{todayProvider:123},name:'TypeError'}];defs[1].run=()=>new api.IslamicDate(1448n,1,1,defs[1].key);defs[2].run=()=>new api.MonthWeavingCounter(defs[2].key);defs[3].run=()=>new api.PastafariCalendar(defs[3].key);const failures=[];for(const d of defs){const l=arena.length,h=holes(arena);let e;try{d.run()}catch(x){e=x}if(!e||e.name!==d.name)throw new Error('failure '+d.id);if(arena.length!==l||holes(arena)!==h)throw new Error('state leak '+d.id);if(d.key&&id.has(d.key))throw new Error('identity leak '+d.id);const recovery=canon(cal.convertJdn(2461259n,{calculationJdn:2461259n}));if(!same(recovery,corpus.vectors.find(v=>v.id==='present_same').expected))throw new Error('recovery '+d.id);failures.push({id:d.id,exception:{name:e.name,message:e.message},arenaDelta:arena.length-l,holesDelta:holes(arena)-h,keyAbsent:d.key?!id.has(d.key):null,recovery:true})}const k={variant:'repeat-bad'},l=arena.length,h=holes(arena);for(let i=0;i<100;i++){try{new api.IslamicDate(1448n,1,1,k)}catch{}if(arena.length!==l||id.has(k))throw new Error('repeat leak '+i)}return{vectors,failures,repeat:{count:100,arenaDelta:arena.length-l,holesDelta:holes(arena)-h,keyAbsent:!id.has(k)},identityMapIndex:__s7ididx,arenaLength:arena.length}})()`,{timeout:900000});
    await cdp.eval(`import(${JSON.stringify(urls.fast)}).then(m=>{globalThis.__s7fast=m;return true})`,{timeout:900000});
    const fast=await cdp.eval(`(()=>{const corpus=${JSON.stringify(corpus)},canon=${canonicalJS},same=${sameJS};const c=new __s7fast.PastafariCalendar({todayProvider:()=>new __s7fast.GregorianDate(2000n,1,1)});const vectors=corpus.vectors.map(v=>{const value=canon(c.convertJdn(BigInt(v.targetJdn),{calculationJdn:BigInt(v.calculationJdn)}));return{id:v.id,value,ok:same(value,v.expected)}});return{vectors,allPass:vectors.every(x=>x.ok)}})()`,{timeout:900000});
    return {result:'PASS',chromium:env.version,loadingMode:'real Chromium about:blank; exact local module sources loaded as blob modules with test-only import/new-URL specifier rewriting because managed policy blocks local URL navigation',authoritative,fast,elapsedMs:Date.now()-started};
  } finally { await env.close(); }
}
let out; try{out=await main()}catch(e){out={result:'FAIL',error:{name:e.name,message:e.message,stack:e.stack}}}
fs.writeFileSync(path.join(ART,'update-08-stage-07-browser-core.json'),JSON.stringify(out,null,2));
fs.writeFileSync(path.join(ART,'update-08-stage-07-browser-core.tap'),`TAP version 13\n${out.result==='PASS'?'ok':'not ok'} 1 - real Chromium authoritative shared corpus + focused transactionality\n${out.result==='PASS'&&out.fast?.allPass?'ok':'not ok'} 2 - real Chromium fast shared corpus\n1..2\n`);
console.log(JSON.stringify({result:out.result,chromium:out.chromium?.product,authoritativeVectors:out.authoritative?.vectors?.length,focusedFailures:out.authoritative?.failures?.length,repeat:out.authoritative?.repeat,fastAllPass:out.fast?.allPass},null,2));
