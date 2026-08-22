import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(ROOT, 'artifacts', 'update-08-stage-05-fault-injection.json');
const RAW_CORE = path.join(ROOT, 'src', '5efdcc3e6fb071cbaffdcb117507a169dd76.js');
const PUBLIC_API = path.join(ROOT, 'src', 'public-api.js');
const HOOK = '__PASTAFARI_STAGE5_FAULT__';

class Stage5InjectedFault extends Error {
  constructor(checkpoint, meta = {}) {
    super(`STAGE5_INJECTED_FAULT:${checkpoint}`);
    this.name = 'Stage5InjectedFault';
    this.checkpoint = checkpoint;
    this.meta = meta;
  }
}

function sha256Text(s) { return crypto.createHash('sha256').update(s).digest('hex'); }
function summarizeValue(v, depth = 0) {
  if (depth > 1) return { type: typeof v };
  if (v === null) return { type: 'null' };
  if (Array.isArray(v)) return { type: 'Array', length: v.length, sample: v.slice(0, 3).map(x => summarizeValue(x, depth + 1)) };
  if (typeof v === 'function') return { type: 'function', name: v.name };
  if (typeof v === 'object') return { type: v.constructor?.name ?? 'object', keys: Reflect.ownKeys(v).slice(0, 8).map(String) };
  if (typeof v === 'bigint') return { type: 'bigint', value: v.toString() };
  return { type: typeof v, value: v };
}
function descriptorSummary(o, p) {
  const d = Object.getOwnPropertyDescriptor(o, p);
  if (!d) return null;
  return { hasOwn: true, value: d.value ? { type: typeof d.value, name: d.value?.name ?? null } : d.value,
    get: d.get ? d.get.name : null, set: d.set ? d.set.name : null,
    writable: d.writable ?? null, enumerable: d.enumerable, configurable: d.configurable };
}
function deepEqualJson(a,b){ return JSON.stringify(a)===JSON.stringify(b); }

const control = {
  enabled: null,
  hits: [],
  arena: null,
  captureArena(a){ if (!this.arena) this.arena = a; },
  hit(id, meta = {}) {
    this.hits.push({ id, meta });
    if (this.enabled === id) throw new Stage5InjectedFault(id, meta);
  },
  arm(id){ this.enabled = id; this.hits.length = 0; },
  disarm(){ this.enabled = null; this.hits.length = 0; }
};
globalThis[HOOK] = control;

function hookStmt(id, meta = '{}') { return `globalThis.${HOOK}?.hit(${JSON.stringify(id)},${meta});`; }
function insertAfterBalancedCall(source, searchStart, callNeedle, insertion) {
  const call = source.indexOf(callNeedle, searchStart);
  if (call < 0) throw new Error(`cannot locate ${callNeedle}`);
  const open = source.indexOf('(', call + callNeedle.length - 1);
  let depth=0, quote=null, esc=false;
  for (let i=open;i<source.length;i++) {
    const ch=source[i];
    if (quote) { if (esc) esc=false; else if (ch==='\\') esc=true; else if (ch===quote) quote=null; continue; }
    if (ch==='"'||ch==="'") { quote=ch; continue; }
    if (ch==='(') depth++; else if (ch===')') { depth--; if(depth===0){
      let j=i+1; if(source[j]===';') j++;
      return source.slice(0,j)+insertion+source.slice(j);
    }}
  }
  throw new Error(`unbalanced ${callNeedle}`);
}
function appendHookAfterLineContaining(body, needle, id) {
  const lines = body.split('\n');
  const idxs=[];
  for(let i=0;i<lines.length;i++) if(lines[i].includes(needle)) idxs.push(i);
  if (idxs.length !== 1) throw new Error(`expected one line for ${needle}, got ${idxs.length}`);
  lines.splice(idxs[0]+1,0,`${lines[idxs[0]].match(/^\s*/)[0]}${hookStmt(id)}`);
  return lines.join('\n');
}
function insertBeforeLineContaining(body, needle, id) {
  const lines=body.split('\n'); const idxs=[];
  for(let i=0;i<lines.length;i++) if(lines[i].includes(needle)) idxs.push(i);
  if(idxs.length!==1) throw new Error(`expected one line for ${needle}, got ${idxs.length}`);
  lines.splice(idxs[0],0,`${lines[idxs[0]].match(/^\s*/)[0]}${hookStmt(id)}`);
  return lines.join('\n');
}
function replaceOnce(body, needle, replacement) {
  const i=body.indexOf(needle); if(i<0) throw new Error(`missing transform needle: ${needle.slice(0,80)}`);
  if(body.indexOf(needle,i+1)>=0) throw new Error(`non-unique transform needle: ${needle.slice(0,80)}`);
  return body.slice(0,i)+replacement+body.slice(i+needle.length);
}

function transformMain(body, params) {
  const arenaParam=params[0];
  body = replaceOnce(body, '"use strict";', `"use strict";globalThis.${HOOK}?.captureArena(${arenaParam});`);
  const wrapStart=body.indexOf('const WladyslawLokietek_WedlugPierwszegoMarginesuBylPiastemAleDrugiMarginesNazywaGoJagiellonemNaStoLatPrzedJagiellonami_mechanizm_51d0f2012a2c_mr=');
  const ritualStart=body.indexOf('const JadwigaAndegawenska_PrzynaleznoscDynastycznaZmienialaSieCoAkapitBezZmianyRodzicowAniDatyUrodzenia_mechanizm_741bd3f0399b_mu=Object.freeze');
  if(wrapStart<0||ritualStart<0||ritualStart<=wrapStart) throw new Error('common wrapper anchors missing');
  let wrapper=body.slice(wrapStart, ritualStart);
  { const i=wrapper.indexOf('=>{'); if(i<0) throw new Error('wrapper arrow missing'); wrapper=wrapper.slice(0,i)+`=>{${hookStmt('GEN_WRAP_ENTRY')}`+wrapper.slice(i+3); }
  wrapper=insertAfterBalancedCall(wrapper,0,`${arenaParam}.push`,hookStmt('GEN_WRAP_AFTER_RESERVATION'));
  const resultNeedle='const StanislawLeszczynski_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_mechanizm_c0e22df895c6_n9=';
  wrapper=replaceOnce(wrapper,resultNeedle,`${hookStmt('GEN_WRAP_AFTER_TARGET')}${resultNeedle}`);
  const cleanupNeedle=`${arenaParam}.length=MichalKorybut_PrzynaleznoscDynastycznaZmienialaSieCoAkapitBezZmianyRodzicowAniDatyUrodzenia_mechanizm_9da3b7046be5_n6;return StanislawLeszczynski_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_mechanizm_c0e22df895c6_n9;`;
  const cleanupReplacement=`${hookStmt('GEN_WRAP_BEFORE_CLEANUP')}${arenaParam}.length=MichalKorybut_PrzynaleznoscDynastycznaZmienialaSieCoAkapitBezZmianyRodzicowAniDatyUrodzenia_mechanizm_9da3b7046be5_n6;${hookStmt('GEN_WRAP_AFTER_CLEANUP')}return StanislawLeszczynski_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_mechanizm_c0e22df895c6_n9;`;
  wrapper=replaceOnce(wrapper,cleanupNeedle,cleanupReplacement);
  body=body.slice(0,wrapStart)+wrapper+body.slice(ritualStart);

  const reserveKey='"HenrykWalezy_UrodzonyPoSwojejAbdykacjiWedlugTabeliKtoraWInnymMiejscuZaprzeczaIstnieniuAbdykacji_obrzed_8c04901c3798_m9"';
  const eventKey='"StefanBatory_KronikarzPrzypisujeGoWazomChociazWTejSamejLinijceTwierdziZeWazowieJeszczeNieIstnieli_obrzed_3df2aab44567_ma"';
  let rs=body.indexOf(reserveKey), re=body.indexOf(eventKey,rs);
  if(rs<0||re<0) throw new Error('reserve anchors missing');
  let reserve=body.slice(rs,re);
  reserve=insertAfterBalancedCall(reserve,0,`${arenaParam}.push`,hookStmt('GEN_RESERVE_AFTER_BASE','{constructorId:WladyslawLokietek_GenealogiaTwierdziZeBylWlasnymPradziademAChronologiaUznajeToZaDowodPoprawnosci_mechanizm_560e01b312bf_nj}'));
  const returnNeedle='return MichalKorybut_PrzynaleznoscDynastycznaZmienialaSieCoAkapitBezZmianyRodzicowAniDatyUrodzenia_mechanizm_9da3b7046be5_n6;';
  reserve=replaceOnce(reserve,returnNeedle,`${hookStmt('GEN_RESERVE_AFTER_ARGUMENTS','{constructorId:WladyslawLokietek_GenealogiaTwierdziZeBylWlasnymPradziademAChronologiaUznajeToZaDowodPoprawnosci_mechanizm_560e01b312bf_nj}')}${returnNeedle}`);
  body=body.slice(0,rs)+reserve+body.slice(re);
  return body;
}

function transformGregorian(body){
  body=replaceOnce(body,'throw new TypeError("החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים");\n            }\n            this.month =',`throw new TypeError("החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים");\n            }\n            ${hookStmt('GREGORIAN_AFTER_VALIDATION')}\n            this.month =`);
  body=appendHookAfterLineContaining(body,', 4006,','GREGORIAN_AFTER_YEAR_WRITE');
  body=appendHookAfterLineContaining(body,', 4007,','GREGORIAN_AFTER_MONTH_WRITE');
  body=appendHookAfterLineContaining(body,', 4008,','GREGORIAN_AFTER_DAY_WRITE');
  return body;
}
function transformIslamic(body){
  body=replaceOnce(body,'throw new RangeError(\'לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"\');\n            }\n            this.year =',`throw new RangeError('לוח היג׳רי אינו חד־משמעי; variant חייב להיות "civil" או "umalqura"');\n            }\n            ${hookStmt('ISLAMIC_AFTER_VALIDATION')}\n            this.year =`);
  for (const [ev,id] of [[4039,'ISLAMIC_AFTER_YEAR_WRITE'],[4040,'ISLAMIC_AFTER_MONTH_WRITE'],[4041,'ISLAMIC_AFTER_DAY_WRITE'],[4042,'ISLAMIC_AFTER_VARIANT_WRITE']]) body=appendHookAfterLineContaining(body,`, ${ev},`,id);
  body=insertBeforeLineContaining(body,'(this, "islamic");','ISLAMIC_BEFORE_FINALIZATION');
  body=appendHookAfterLineContaining(body,'(this, "islamic");','ISLAMIC_AFTER_FINALIZATION');
  return body;
}
function transformMonth(body){
  body=replaceOnce(body,'throw new RangeError("אורכי החודשים חייבים להיות חיוביים");\n            }\n            this.lengths =',`throw new RangeError("אורכי החודשים חייבים להיות חיוביים");\n            }\n            ${hookStmt('MONTH_WEAVING_AFTER_VALIDATION')}\n            this.lengths =`);
  body=appendHookAfterLineContaining(body,', 4332,','MONTH_WEAVING_AFTER_LENGTHS_WRITE');
  body=appendHookAfterLineContaining(body,', 4333,','MONTH_WEAVING_AFTER_MONTHCOUNT_WRITE');
  // totalLength spans multiple lines; inject at the next known field assignment instead.
  body=insertBeforeLineContaining(body,'this.prefix =','MONTH_WEAVING_AFTER_TOTALLENGTH_WRITE');
  body=appendHookAfterLineContaining(body,'this.prefix =','MONTH_WEAVING_AFTER_PREFIX_WRITE');
  return body;
}
function transformPastafari(body){
  body=replaceOnce(body,'throw new TypeError("todayProvider חייב להיות פונקציה");\n            this.todayProvider =',`throw new TypeError("todayProvider חייב להיות פונקציה");\n            ${hookStmt('PASTAFARI_AFTER_VALIDATION')}\n            this.todayProvider =`);
  body=appendHookAfterLineContaining(body,', 4539,','PASTAFARI_AFTER_TODAY_PROVIDER_WRITE');
  body=insertBeforeLineContaining(body,'this.gates =','PASTAFARI_BEFORE_GATE_INDEX_CONSTRUCTION');
  body=appendHookAfterLineContaining(body,', 4540,','PASTAFARI_AFTER_GATE_INDEX_CONSTRUCTION');
  body=appendHookAfterLineContaining(body,', 4541,','PASTAFARI_AFTER_ANCHOR_CACHE_ALLOCATION');
  body=appendHookAfterLineContaining(body,', 4542,','PASTAFARI_AFTER_YEAR_CACHE_ALLOCATION');
  body=appendHookAfterLineContaining(body,', 4543,','PASTAFARI_AFTER_STRUCTURE_CACHE_ALLOCATION');
  return body;
}

const transformedBodies=[];
function transformDecodedFunctionArgs(args) {
  if (!args.length) return args;
  const out=[...args];
  if (typeof out[out.length-1] !== 'string') return out;
  let body=out[out.length-1]; const params=out.slice(0,-1).map(String);
  const originalHash=sha256Text(body); let kind=null;
  if(params.length && body.length>7_000_000 && body.includes('mechanizm_51d0f2012a2c_mr')) { body=transformMain(body,params); kind='main'; }
  else if(body.includes('החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים')) { body=transformGregorian(body); kind='GregorianDate-module'; }
  else if(body.includes('לוח היג׳רי אינו חד־משמעי')) { body=transformIslamic(body); kind='IslamicDate-module'; }
  else if(body.includes('אורכי החודשים חייבים להיות חיוביים')) { body=transformMonth(body); kind='MonthWeavingCounter-module'; }
  else if(body.includes('todayProvider חייב להיות פונקציה')) { body=transformPastafari(body); kind='PastafariCalendar-module'; }
  if(kind) transformedBodies.push({kind,originalLength:out[out.length-1].length,transformedLength:body.length,originalSha256:originalHash,transformedSha256:sha256Text(body)});
  out[out.length-1]=body; return out;
}

const OriginalFunction=globalThis.Function, originalCtor=OriginalFunction.prototype.constructor;
const OriginalMap=globalThis.Map, OriginalWeakMap=globalThis.WeakMap;
const capturedMaps=[], capturedWeakMaps=[];
const FunctionProxy=new Proxy(OriginalFunction,{apply(t,thisArg,args){return Reflect.apply(t,thisArg,args);},construct(t,args,newTarget){return Reflect.construct(t,transformDecodedFunctionArgs(args),newTarget===FunctionProxy?t:newTarget);}});
const MapProxy=new Proxy(OriginalMap,{construct(t,args,newTarget){const x=Reflect.construct(t,args,newTarget===MapProxy?t:newTarget);capturedMaps.push(x);return x;}});
const WeakMapProxy=new Proxy(OriginalWeakMap,{construct(t,args,newTarget){const x=Reflect.construct(t,args,newTarget===WeakMapProxy?t:newTarget);capturedWeakMaps.push(x);return x;}});
let core, publicApi;
try {
  globalThis.Function=FunctionProxy; OriginalFunction.prototype.constructor=FunctionProxy;
  globalThis.Map=MapProxy; globalThis.WeakMap=WeakMapProxy;
  core=await import(pathToFileURL(RAW_CORE).href);
  globalThis.Function=OriginalFunction; OriginalFunction.prototype.constructor=originalCtor;
  publicApi=await import(`${pathToFileURL(PUBLIC_API).href}?stage5_public=${Date.now()}`);
} finally {
  globalThis.Function=OriginalFunction; OriginalFunction.prototype.constructor=originalCtor;
  globalThis.Map=OriginalMap; globalThis.WeakMap=OriginalWeakMap;
}
if(!control.arena) throw new Error('arena capture failed');

function runSemanticSanity(){
  const value=new core.GregorianDate(2026n,8,22);
  const actual={year:String(value.year),month:value.month,day:value.day};
  return {id:'valid_gregorian_constructor',expected:{year:'2026',month:8,day:22},actual,authoritativeEqualsReference:JSON.stringify(actual)===JSON.stringify({year:'2026',month:8,day:22})};
}
control.disarm();
const semanticSanityBefore=runSemanticSanity();
if(!semanticSanityBefore.authoritativeEqualsReference) throw new Error('pre-injection authoritative/reference sanity mismatch');
const initialArenaLength=control.arena.length;
function mapSnapshot(){ return capturedMaps.map((m,i)=>({i,size:m.size})); }
function weakKnownSnapshot(key){ return capturedWeakMaps.map((m,i)=>({i,has:key?m.has(key):false,value:key&&m.has(key)?summarizeValue(m.get(key)):null})); }
function publicIdentitySnapshot(){
  return {
    GregorianDate: core.GregorianDate,
    IslamicDate: core.IslamicDate,
    MonthWeavingCounter: core.MonthWeavingCounter,
    PastafariCalendar: core.PastafariCalendar,
    GateIndex: core.GateIndex,
    GregorianPrototype: core.GregorianDate.prototype,
    PastafariPrototype: core.PastafariCalendar.prototype,
    convertJdnDescriptor: Object.getOwnPropertyDescriptor(core.PastafariCalendar.prototype,'convertJdn')
  };
}
function publicIdentityCompare(before,after){
  return before.GregorianDate===after.GregorianDate && before.IslamicDate===after.IslamicDate && before.MonthWeavingCounter===after.MonthWeavingCounter && before.PastafariCalendar===after.PastafariCalendar && before.GateIndex===after.GateIndex && before.GregorianPrototype===after.GregorianPrototype && before.PastafariPrototype===after.PastafariPrototype && before.convertJdnDescriptor.value===after.convertJdnDescriptor.value && before.convertJdnDescriptor.get===after.convertJdnDescriptor.get && before.convertJdnDescriptor.set===after.convertJdnDescriptor.set && before.convertJdnDescriptor.writable===after.convertJdnDescriptor.writable && before.convertJdnDescriptor.enumerable===after.convertJdnDescriptor.enumerable && before.convertJdnDescriptor.configurable===after.convertJdnDescriptor.configurable;
}
function snapshot(knownKey=null){
  return { arenaLength:control.arena.length, maps:mapSnapshot(), weakKnown:weakKnownSnapshot(knownKey), identity:publicIdentitySnapshot() };
}
function serializableSnapshot(s, beforeLen=s.arenaLength){
  return {arenaLength:s.arenaLength,maps:s.maps,weakKnown:s.weakKnown,descriptors:{convertJdn:descriptorSummary(core.PastafariCalendar.prototype,'convertJdn')}};
}
function ctorCall(symbol,args){ return ()=>Reflect.construct(core[symbol],args); }
const validArgs={
  GregorianDate:[2026n,8,22],
  IslamicDate:[1448n,2,9,{variant:'civil'}],
  MonthWeavingCounter:[[31,30,29]],
  PastafariCalendar:[{todayProvider:()=>null}],
  GateIndex:[]
};
function normalizedObject(o){
  if(!o||typeof o!=='object') return o;
  const out={}; for(const k of Object.keys(o)){ const v=o[k]; if(typeof v==='bigint') out[k]=v.toString(); else if(v instanceof Map) out[k]={MapSize:v.size}; else if(typeof v==='function') out[k]='[function]'; else if(v&&typeof v==='object') out[k]=Array.isArray(v)?`[Array:${v.length}]`:`[${v.constructor?.name??'object'}]`; else out[k]=v; } return out;
}

control.disarm();
const disabledControls=[];
for(const symbol of Object.keys(validArgs)){
  const beforeLen=control.arena.length;
  let ok=true,error=null,result=null;
  try{ result=ctorCall(symbol,validArgs[symbol])(); }catch(e){ok=false;error={name:e.name,message:e.message};}
  disabledControls.push({symbol,ok,error,arenaDelta:control.arena.length-beforeLen,result:ok?normalizedObject(result):null});
}

const cases=[];
async function runCase({constructionId,symbol,checkpoint,argsFactory=()=>validArgs[symbol],stateAlreadyMutated,category,repeat=1}){
  for(let r=1;r<=repeat;r++){
    const args=argsFactory();
    const knownKey=args.find(x=>x && (typeof x==='object'||typeof x==='function')) ?? null;
    const before=snapshot(knownKey), beforeLen=before.arenaLength;
    control.arm(checkpoint);
    let observed=null,returned=false;
    try{ ctorCall(symbol,args)(); returned=true; }catch(e){ observed={name:e.name,message:e.message,checkpoint:e.checkpoint??null,isInjected:e instanceof Stage5InjectedFault || String(e.message).includes('STAGE5_INJECTED_FAULT')}; }
    control.disarm();
    const after=snapshot(knownKey);
    const mapChanges=after.maps.filter((x,i)=>x.size!==before.maps[i]?.size).map((x,i)=>({index:x.i,before:before.maps[i]?.size,after:x.size,delta:x.size-(before.maps[i]?.size??0)}));
    const weakChanges=after.weakKnown.filter((x,i)=>x.has!==before.weakKnown[i]?.has || JSON.stringify(x.value)!==JSON.stringify(before.weakKnown[i]?.value)).map((x,i)=>({index:x.i,before:before.weakKnown[i],after:x}));
    const arenaDelta=after.arenaLength-before.arenaLength;
    const restored=arenaDelta===0 && mapChanges.length===0 && weakChanges.length===0 && publicIdentityCompare(before.identity,after.identity);
    cases.push({constructionId,symbol,checkpoint,category,repeat:r,stateAlreadyMutated,throwObserved:!returned,exception:observed,stateRestored:restored,stateBefore:serializableSnapshot(before,beforeLen),stateAfter:serializableSnapshot(after,beforeLen),diffs:{arenaDelta,retainedTail:control.arena.slice(beforeLen).map(v=>summarizeValue(v)),mapChanges,weakKnownChanges:weakChanges,publicIdentityRestored:publicIdentityCompare(before.identity,after.identity)}});
  }
}

// Common wrapper lifecycle on a simple successful constructor target.
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_WRAP_ENTRY',stateAlreadyMutated:false,category:'ENTRY'});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_WRAP_AFTER_RESERVATION',stateAlreadyMutated:true,category:'AFTER_RESERVATION',repeat:3});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_RESERVE_AFTER_BASE',stateAlreadyMutated:true,category:'AFTER_INNER_BASE_RESERVATION'});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_RESERVE_AFTER_ARGUMENTS',stateAlreadyMutated:true,category:'AFTER_ARGUMENT_MEASUREMENT'});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_WRAP_AFTER_TARGET',stateAlreadyMutated:true,category:'AFTER_TARGET_CONSTRUCTION'});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_WRAP_BEFORE_CLEANUP',stateAlreadyMutated:true,category:'BEFORE_RETURN_CLEANUP'});
await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint:'GEN_WRAP_AFTER_CLEANUP',stateAlreadyMutated:false,category:'AFTER_OUTER_CLEANUP'});

for(const [checkpoint,mutated] of [['GREGORIAN_AFTER_VALIDATION',true],['GREGORIAN_AFTER_YEAR_WRITE',true],['GREGORIAN_AFTER_MONTH_WRITE',true],['GREGORIAN_AFTER_DAY_WRITE',true]]) await runCase({constructionId:'CTOR:authoritative:GregorianDate',symbol:'GregorianDate',checkpoint,stateAlreadyMutated:mutated,category:'CONSTRUCTOR_BODY'});
for(const checkpoint of ['ISLAMIC_AFTER_VALIDATION','ISLAMIC_AFTER_YEAR_WRITE','ISLAMIC_AFTER_MONTH_WRITE','ISLAMIC_AFTER_DAY_WRITE','ISLAMIC_AFTER_VARIANT_WRITE','ISLAMIC_BEFORE_FINALIZATION','ISLAMIC_AFTER_FINALIZATION']) await runCase({constructionId:'CTOR:authoritative:IslamicDate',symbol:'IslamicDate',checkpoint,stateAlreadyMutated:true,category:'CONSTRUCTOR_BODY'});
for(const checkpoint of ['MONTH_WEAVING_AFTER_VALIDATION','MONTH_WEAVING_AFTER_LENGTHS_WRITE','MONTH_WEAVING_AFTER_MONTHCOUNT_WRITE','MONTH_WEAVING_AFTER_TOTALLENGTH_WRITE','MONTH_WEAVING_AFTER_PREFIX_WRITE']) await runCase({constructionId:'CTOR:authoritative:MonthWeavingCounter',symbol:'MonthWeavingCounter',checkpoint,stateAlreadyMutated:true,category:'CONSTRUCTOR_BODY_OR_NESTED_HELPER'});
for(const checkpoint of ['PASTAFARI_AFTER_VALIDATION','PASTAFARI_AFTER_TODAY_PROVIDER_WRITE','PASTAFARI_BEFORE_GATE_INDEX_CONSTRUCTION','PASTAFARI_AFTER_GATE_INDEX_CONSTRUCTION','PASTAFARI_AFTER_ANCHOR_CACHE_ALLOCATION','PASTAFARI_AFTER_YEAR_CACHE_ALLOCATION','PASTAFARI_AFTER_STRUCTURE_CACHE_ALLOCATION']) await runCase({constructionId:'CTOR:authoritative:PastafariCalendar',symbol:'PastafariCalendar',checkpoint,stateAlreadyMutated:true,category:'NESTED_CONSTRUCTION_OR_ALLOCATION',argsFactory:()=>[{todayProvider:()=>null}]});
// Identity-metadata probe with stable object input, repeated at post-argument-measurement checkpoint.
const identityOptions={todayProvider:()=>null};
await runCase({constructionId:'CTOR:authoritative:PastafariCalendar',symbol:'PastafariCalendar',checkpoint:'GEN_RESERVE_AFTER_ARGUMENTS',stateAlreadyMutated:true,category:'IDENTITY_METADATA',argsFactory:()=>[identityOptions],repeat:3});

control.disarm();
const postControls=[];
for(const symbol of ['GregorianDate','IslamicDate','MonthWeavingCounter','PastafariCalendar','GateIndex']){
  const before=control.arena.length; let ok=true,error=null;
  try{ ctorCall(symbol,validArgs[symbol])(); }catch(e){ok=false;error={name:e.name,message:e.message};}
  postControls.push({symbol,ok,error,arenaDelta:control.arena.length-before});
}

const semanticSanityAfter=runSemanticSanity();
const coverage=cases.map(c=>({constructionId:c.constructionId,checkpoint:c.checkpoint,stateAlreadyMutated:c.stateAlreadyMutated,throwObserved:c.throwObserved,stateRestored:c.stateRestored,arenaDelta:c.diffs.arenaDelta,weakKnownChanges:c.diffs.weakKnownChanges.length,mapChanges:c.diffs.mapChanges.length}));
const leaking=coverage.filter(x=>!x.stateRestored);
const zero=coverage.filter(x=>x.stateRestored);
const artifact={
  schema:'pastafari.update8.stage05.fault-injection.v1',stage:'5',generatedAt:new Date().toISOString(),
  revision:{repository:'Sargon17-Green/pastafari-calendar',branch:'main',campaignBaseCommit:'2bc2d97bd5638b498014ed8c1c925fb735819a6b',packageVersion:'1.3.0',workingTree:'uploaded archive has no .git; analysis-only test script/artifacts added; production files unchanged'},
  alignment:{stage1Present:true,stage2aPresent:true,stage2bPresent:true,stage3Present:true,stage3Status:'loaded from supplied/current-main artifacts',productionCoreSha256:sha256Text(await fs.readFile(RAW_CORE,'utf8'))},
  injectionMechanism:{kind:'test-only in-memory decoded-Function source instrumentation',optIn:true,normalProductionFilesModified:false,publicApiAdded:false,uniqueException:'Stage5InjectedFault / STAGE5_INJECTED_FAULT:<checkpoint>',disabledMode:'hook records checkpoints but never throws; decoded production logic otherwise executes unchanged',transformedBodies},
  capturedRuntime:{initialArenaLength,capturedMapCount:capturedMaps.length,capturedWeakMapCount:capturedWeakMaps.length},
  semanticChecks:{beforeFaultInjection:semanticSanityBefore,afterFaultCampaign:semanticSanityAfter},
  disabledModeControls:disabledControls,
  cases,coverageMatrix:coverage,
  repeatedFailureSummary:coverage.filter(x=>x.checkpoint==='GEN_WRAP_AFTER_RESERVATION'||(x.constructionId.includes('PastafariCalendar')&&x.checkpoint==='GEN_RESERVE_AFTER_ARGUMENTS')),
  postFailureControls:postControls,
  checkpointSummary:{leakingCheckpoints:[...new Set(leaking.map(x=>x.checkpoint))],zeroDeltaCheckpoints:[...new Set(zero.map(x=>x.checkpoint))]},
  limitations:[
    'Fault injection is test-only and in-memory; no production debug API is exposed.',
    'Generated random/witness prefix churn is intentionally not treated as the Stage-5 rollback target; Stage 2B classified it separately from the retained-frame defect.'
  ],
  productionChangesByHarness:'none',
  stageConclusion:{
    result: leaking.length===0 ? 'POST_FIX_FAULT_INJECTION_PASS' : 'POST_FIX_FAULT_INJECTION_FAIL',
    allInjectedFailuresRestored: leaking.length===0
  }
};
await fs.mkdir(path.dirname(OUT),{recursive:true});
await fs.writeFile(OUT,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({out:OUT,cases:cases.length,leaking:leaking.length,zero:zero.length,initialArenaLength,finalArenaLength:control.arena.length,transformedBodies,capturedMaps:capturedMaps.length,capturedWeakMaps:capturedWeakMaps.length},null,2));
delete globalThis[HOOK];
