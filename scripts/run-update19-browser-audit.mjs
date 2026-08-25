#!/usr/bin/env node
"use strict";
import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const OUT=path.join(ROOT,"artifacts/update-19/browser-worker-standalone-parity.json");
const MIME=new Map([[".html","text/html; charset=utf-8"],[".js","text/javascript; charset=utf-8"],[".mjs","text/javascript; charset=utf-8"],[".json","application/json; charset=utf-8"]]);
const server=createServer(async(req,res)=>{try{const u=new URL(req.url||"/","http://127.0.0.1");const f=path.resolve(ROOT,`.${decodeURIComponent(u.pathname)}`);if(f!==ROOT&&!f.startsWith(`${ROOT}${path.sep}`))throw new Error();const i=await stat(f);if(!i.isFile())throw new Error();res.writeHead(200,{"content-type":MIME.get(path.extname(f))||"application/octet-stream","cache-control":"no-store"});createReadStream(f).pipe(res);}catch{res.writeHead(404).end("Not found");}});
await new Promise((r,j)=>{server.once("error",j);server.listen(0,"127.0.0.1",r);});
let browser;
try{browser=await chromium.launch({headless:true});const page=await browser.newPage();const pageErrors=[];page.on("pageerror",e=>pageErrors.push(e.stack||e.message));page.on("console",m=>{if(m.type()==="error")pageErrors.push(`console.error: ${m.text()}`);});const addr=server.address();await page.goto(`http://127.0.0.1:${addr.port}/test/update19-browser-final-audit.html`,{waitUntil:"load",timeout:300000});await page.waitForFunction(()=>globalThis.__PASTAFARI_UPDATE19_BROWSER_AUDIT__?.complete===true,null,{timeout:900000});const payload=await page.evaluate(()=>globalThis.__PASTAFARI_UPDATE19_BROWSER_AUDIT__);const out={...payload,browserVersion:await browser.version(),pageErrors};await mkdir(path.dirname(OUT),{recursive:true});await writeFile(OUT,`${JSON.stringify(out,null,2)}\n`);console.log(JSON.stringify({status:out.status,browserVersion:out.browserVersion,failures:out.failures,pageErrors},null,2));if(out.status!=="PASS"||pageErrors.length)process.exitCode=1;}finally{await browser?.close().catch(()=>{});await new Promise(r=>server.close(r));}
