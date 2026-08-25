#!/usr/bin/env node
"use strict";
import * as api from "../../src/public-api.js";
import * as docs from "../../docs/calendar-converters.js";
import * as neg from "../update9/proleptic-negative-year-reference.mjs";
import { referenceJdnToChinese, referenceChineseToJdn } from "../update17/chinese-reference.mjs";
import { referenceJdnToVikrama, referenceVikramaToJdn } from "../update11/vikrama-reference.mjs";
import { referenceJdnToKoki, referenceKokiToJdn } from "../update12/reference-koki.mjs";
function ser(v){return JSON.parse(JSON.stringify(v,(_k,x)=>typeof x==='bigint'?x.toString():x));}
const kind=process.argv[2];
if(kind==='chinese'){
  const j=BigInt(process.argv[3]);const r=referenceJdnToChinese(j);const p=api.jdnToChinese(j);console.log(JSON.stringify(ser({kind,jdn:j,reference:r,production:p,referenceRoundtrip:referenceChineseToJdn(r),productionRoundtrip:api.chineseStructuredDateToJdn(p)})));
}else if(kind==='vikrama'){
  const j=BigInt(process.argv[3]);const r=referenceJdnToVikrama(j);const p=api.jdnToVikrama(j);console.log(JSON.stringify(ser({kind,jdn:j,reference:r,production:p,referenceRoundtrip:referenceVikramaToJdn(r),productionRoundtrip:api.vikramaToJdn(p)})));
}else if(kind==='koki'){
  const j=BigInt(process.argv[3]);const r=referenceJdnToKoki(j);const p=api.jdnToKoki(j);console.log(JSON.stringify(ser({kind,jdn:j,reference:r,production:p,referenceRoundtrip:referenceKokiToJdn(r),productionRoundtrip:api.kokiToJdn(p)})));
}else if(kind==='arithmetic'){
  const cal=process.argv[3],year=BigInt(process.argv[4]);const value={year,month:1,day:1};const map={hebrew:[neg.hebrewToJdn,api.hebrewToJdn],islamicCivil:[neg.islamicCivilToJdn,api.islamicCivilToJdn],saka:[neg.sakaToJdn,api.sakaToJdn],ethiopic:[neg.ethiopicToJdn,api.ethiopicToJdn],coptic:[neg.copticToJdn,api.copticToJdn],bahaiWestern:[neg.bahaiWesternToJdn,api.bahaiToJdn]};const [rf,pf]=map[cal];let r,p,re,pe;try{r=rf(value);}catch(e){re={name:e.name,message:e.message};}try{p=pf(value);}catch(e){pe={name:e.name,message:e.message};}console.log(JSON.stringify(ser({kind,calendar:cal,year,reference:r,production:p,referenceError:re,productionError:pe})));
}else{throw new Error(`unknown kind ${kind}`);}
