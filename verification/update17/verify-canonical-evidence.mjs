#!/usr/bin/env node
import {createHash} from 'node:crypto';import{readFile}from'node:fs/promises';import path from'node:path';
const ROOT=process.cwd(),DIR=path.join(ROOT,'verification/update17/generated'),sha=b=>createHash('sha256').update(b).digest('hex');
const m=JSON.parse(await readFile(path.join(DIR,'normative-evidence-manifest.json'),'utf8')),fail=[];
for(const [kind,p,e] of [['scroll',m.meta.scrollPath,m.meta.scrollHash],['reference',m.meta.referencePath,m.meta.referenceHash]]){const a=sha(await readFile(path.join(ROOT,p)));if(a!==e)fail.push({kind,path:p,expected:e,actual:a});}
for(const a of m.artifacts){const h=sha(await readFile(path.join(DIR,a.artifact)));if(h!==a.deterministicRebuildHash)fail.push({artifact:a.artifact,expected:a.deterministicRebuildHash,actual:h});}
const gen=await readFile(path.join(ROOT,'verification/update17/generate-canonical-evidence.mjs'),'utf8');for(const n of ['browser/pastafari-calendar-core','browser/pastafari-calendar-fast','implementations/tests/conformance-vectors','spec-derived-canonical-vectors'])if(gen.includes(n))fail.push({forbiddenGeneratorDependency:n});
if(m.artifacts.some(x=>/legacy|historical/i.test(x.role||'')))fail.push({legacyCorpusLoadedAsNormative:true});
const r={schema:'pastafari-update17-integrity-v1',status:fail.length?'FAIL':'PASS',artifactCount:m.artifacts.length,totalCases:m.meta.caseCount,scrollHash:m.meta.scrollHash,referenceHash:m.meta.referenceHash,generatorHash:m.meta.generatorHash,failures:fail};console.log(JSON.stringify(r,null,2));if(fail.length)process.exitCode=2;
