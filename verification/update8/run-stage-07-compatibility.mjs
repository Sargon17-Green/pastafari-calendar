"use strict";
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const sourcePath=path.join(ROOT,'test','fast-compatibility.test.js');
const tempPath=path.join(ROOT,'test',`.stage7-fast-compatibility-${process.pid}.test.js`);
const logPath=path.join(ROOT,'artifacts','update-08-stage-07-fast-compatibility.tap');
const progressPath=path.join(ROOT,'artifacts','update-08-stage-07-fast-compatibility-progress.log');
const metaPath=path.join(ROOT,'artifacts','update-08-stage-07-fast-compatibility-meta.json');
const source=fs.readFileSync(sourcePath,'utf8');
const sourceSha256=crypto.createHash('sha256').update(source).digest('hex');
let transformed=source;
transformed=transformed.replace(
  'const FAST_COMPATIBILITY_TIMEOUT_MS = process.platform === "win32" ? 1_200_000 : 360_000;',
  'const FAST_COMPATIBILITY_TIMEOUT_MS = Number(process.env.STAGE7_COMPAT_TIMEOUT_MS || 1_800_000);\n\nasync function stage7Subtest(suite, name, operation) {\n  const started = performance.now();\n  console.error(`[stage7-compat] START ${name}`);\n  try {\n    const result = await Reflect.apply(suite.test, suite, [name, operation]);\n    console.error(`[stage7-compat] DONE ${name} elapsedMs=${Math.round(performance.now()-started)}`);\n    return result;\n  } catch (error) {\n    console.error(`[stage7-compat] FAIL ${name} elapsedMs=${Math.round(performance.now()-started)} ${error?.stack || error}`);\n    throw error;\n  }\n}'
);
transformed=transformed.replaceAll('await suite.test(', 'await stage7Subtest(suite, ');
if(transformed===source || !transformed.includes('[stage7-compat] START')) throw new Error('compatibility instrumentation transform failed');
fs.writeFileSync(tempPath,transformed);
const out=fs.openSync(logPath,'w'), err=fs.openSync(progressPath,'w');
const started=new Date().toISOString();
const child=spawn(process.execPath,['--test',path.relative(ROOT,tempPath)],{cwd:ROOT,env:{...process.env,STAGE7_COMPAT_TIMEOUT_MS:'1800000'},stdio:['ignore',out,err]});
const exitCode=await new Promise(resolve=>child.on('exit',(code,signal)=>resolve(code ?? (signal?128:1))));
fs.closeSync(out);fs.closeSync(err);fs.rmSync(tempPath,{force:true});
const tap=fs.readFileSync(logPath,'utf8'),progress=fs.readFileSync(progressPath,'utf8');
const markers=tap.split(/\r?\n/).filter((line)=>line.includes('[stage7-compat]'));
const meta={source:'test/fast-compatibility.test.js',sourceSha256,instrumentationOnly:true,coverageChanged:false,semanticSourceTransform:['parent timeout raised to 1800000ms','progress markers around every existing nested subtest'],started,finished:new Date().toISOString(),exitCode,result:exitCode===0?'PASS':'FAIL_WITH_REPRODUCTION',tapSummary:tap.slice(-4000),progressLines:markers,stderrLines:progress.trim().split(/\r?\n/).filter(Boolean)};
fs.writeFileSync(metaPath,JSON.stringify(meta,null,2));
console.log(JSON.stringify({result:meta.result,exitCode,progressLines:meta.progressLines.length,sourceSha256},null,2));
process.exitCode=exitCode;
