"use strict";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import * as api from "../../src/public-api.js";

const corpus = JSON.parse(await readFile(new URL("./stage-07-cross-environment-vectors.json", import.meta.url), "utf8"));
const fields = ["year","cutletName","dayInCutlet","monthName","dayInMonth"];
const canonical = (v) => {
  const s = typeof v?.toJSON === "function" ? v.toJSON() : v;
  return {year:String(s.year),cutletName:String(s.cutletName),dayInCutlet:Number(s.dayInCutlet),monthName:String(s.monthName),dayInMonth:Number(s.dayInMonth)};
};
const fixedToday = () => new api.GregorianDate(2000n,1,1);
const cal = new api.PastafariCalendar({todayProvider: fixedToday});
const events=[];
function mark(name, fn){
  const t=performance.now();
  try { const value=fn(); events.push({name,ok:true,elapsedMs:Math.round(performance.now()-t)}); return value; }
  catch(error){ events.push({name,ok:false,elapsedMs:Math.round(performance.now()-t),error:{name:error.name,message:error.message}}); throw error; }
}
for (const vector of corpus.vectors) {
  const got = mark(`vector:${vector.id}`, () => canonical(cal.convertJdn(BigInt(vector.targetJdn), {calculationJdn:BigInt(vector.calculationJdn)})));
  assert.deepStrictEqual(got, vector.expected, vector.id);
}
const failures = [
  ["GregorianDate invalid month", () => new api.GregorianDate(2026n,1.25,22), "TypeError", "החודש והיום הגריגוריאניים חייבים להיות מספרים שלמים"],
  ["IslamicDate invalid variant", () => new api.IslamicDate(1448n,1,1,{variant:"invalid-stage7"}), "RangeError", "לוח היג׳רי אינו חד־משמעי; variant חייב להיות \"civil\" או \"umalqura\""],
  ["MonthWeavingCounter invalid lengths", () => new api.MonthWeavingCounter([1,0,2]), "RangeError", "אורכי החודשים חייבים להיות חיוביים"],
  ["PastafariCalendar invalid todayProvider", () => new api.PastafariCalendar({todayProvider:123}), "TypeError", "todayProvider חייב להיות פונקציה"]
];
const failureResults=[];
for (const [name,run,expectedName,expectedMessage] of failures) {
  let error;
  try { run(); } catch(e) { error=e; }
  assert(error, `${name}: no throw`); assert.equal(error.name,expectedName); assert.equal(error.message,expectedMessage);
  const recovered=canonical(cal.convertJdn(2461259n,{calculationJdn:2461259n}));
  assert.deepStrictEqual(recovered, corpus.vectors.find(v=>v.id==="present_same").expected);
  failureResults.push({name,exception:{name:error.name,message:error.message},postFailureRecovery:true});
}
const repeatKey={variant:"invalid-stage7-repeat"}; let repeatSig=null;
for(let i=0;i<100;i++){
  let e; try{new api.IslamicDate(1448n,1,1,repeatKey);}catch(x){e=x;}
  assert(e); const sig=`${e.name}\0${e.message}`; repeatSig??=sig; assert.equal(sig,repeatSig);
}
const postRepeat=canonical(cal.convertJdn(2461259n,{calculationJdn:2461259n}));
assert.deepStrictEqual(postRepeat, corpus.vectors.find(v=>v.id==="present_same").expected);
const exportKeys=Object.keys(api).sort();
const result={result:"PASS",runtime:{node:process.version,platform:process.platform,arch:process.arch},vectorCount:corpus.vectors.length,vectors:events,focusedFailures:failureResults,repeatProbe:{failure:"IslamicDate invalid variant",count:100,postFailureRecovery:true},exportKeys};
console.log("TAP version 13");
console.log(`ok 1 - Node public API ${corpus.vectors.length} shared vectors`);
console.log("ok 2 - focused failure/recovery families");
console.log("ok 3 - 100-repeat failure recovery");
console.log("1..3");
console.error("STAGE7_JSON="+JSON.stringify(result));
