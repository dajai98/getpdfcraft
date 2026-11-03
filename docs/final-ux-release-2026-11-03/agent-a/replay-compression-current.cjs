// Read-only reproduction: retained corpus -> current source handler -> PDF.js.
// Does not collect, register, publish, or change historical artifacts.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {createRequire}=require('node:module'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../../..'),read=p=>fs.readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),plain=x=>JSON.parse(JSON.stringify(x)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 const helper=path.join(root,'scripts/lab/collect-compression.cjs'),mod={exports:{}};
 vm.compileFunction(fs.readFileSync(helper,'utf8')+'\nmodule.exports={sourceHarness,independentInspect,imageStreams};',['require','module','exports','__dirname','__filename'])(createRequire(helper),mod,mod.exports,path.dirname(helper),helper);
 const {sourceHarness,independentInspect,imageStreams}=mod.exports,run=await sourceHarness(),pdfjs=await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
 const sourcePaths=['app/tools/compress-pdf/page.js','components/hooks/useGeneratedResult.js','lib/pdfInput.js','package-lock.json','scripts/lab/collect-compression.cjs'];
 const sourceHashes=Object.fromEntries(sourcePaths.map(p=>[p,sha(read(p))]));
 const startedAt=new Date().toISOString();
 const study=json('data/lab/manifest.json').studies.find(s=>s.name==='compression'),rows=[];
 for(const entry of study.runs.filter(e=>e.runId===study.activeRunId||e.evidenceStatus.startsWith('SUPPLEMENTAL:'))){
  for(const r of json(entry.manifestPath).results){
   const input=read(r.inputPath);assert.equal(sha(input),r.inputSha256);
   const actual=await run(input),row={runId:entry.runId,fixtureId:r.fixtureId,status:actual.output?'SUCCESS':'FAILURE',historicalStatus:r.status,inputPath:r.inputPath,inputSha256:sha(input),inputBytes:input.length,outputSha256:actual.output?sha(actual.output):null,currentOutputBytes:actual.output?.length??null,historicalOutputBytes:r.outputBytes,error:actual.error};
   assert.equal(row.status,r.status,r.fixtureId+' status changed');
   if(actual.output){
    const observed=plain(await independentInspect(pdfjs,actual.output)),historical=json(r.rawInspectionPath).after;assert(observed.opens);
    for(const k of ['pageCount','pages','fields'])assert.deepEqual(observed[k],historical[k],r.fixtureId+' '+k);
    assert.deepEqual(await imageStreams(actual.output),await imageStreams(read(r.outputPath)),r.fixtureId+' embedded image streams');
    row.parserObservationsMatch=true;row.imageStreamsMatch=true;
   }else{assert(actual.error);assert.equal(actual.output,null);}
   row.checkStatus='PASS';rows.push(row);console.log(JSON.stringify(row));
  }
 }
 assert.deepEqual(Object.fromEntries(sourcePaths.map(p=>[p,sha(read(p))])),sourceHashes,'Sources changed during replay');
 const report={schemaVersion:1,status:'PASS',scope:'CURRENT NODE HANDLER REPLAY; NOT BROWSER OR VISUAL PROOF',startedAt,completedAt:new Date().toISOString(),passed:rows.length,sourceHashes,replayScriptSha256:sha(fs.readFileSync(__filename)),runtime:{node:process.version,pdfLib:require(path.join(root,'node_modules/pdf-lib/package.json')).version,pdfjs:pdfjs.version},limitations:['No browser execution/download or visual verification','Historical numeric measurements unchanged; current output sizes may differ','Source-handler harness simulates React/URL'],rows};
 const destination=path.join(__dirname,'compression-current-replay.json');fs.writeFileSync(destination,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({report:destination,status:report.status,passed:rows.length,sourceHashes}));
})().catch(e=>{console.error(e);process.exitCode=1;});
