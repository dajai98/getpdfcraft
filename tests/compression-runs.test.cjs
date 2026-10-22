const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { reserveRun, writeOnce } = require('../scripts/lab/collect-compression.cjs');
const { validateCompressionIndex } = require('../scripts/lab/validate-compression-index.cjs');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root,p));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const parse = p => JSON.parse(read(p));
const normalize = value => JSON.parse(JSON.stringify(value));
let passed = 0;
async function check(name, fn) { await fn(); passed++; console.log('PASS '+name); }
(async()=>{
 const index=parse('data/lab/manifest.json'),study=index.studies.find(s=>s.name==='compression');
 const { directoryRuns } = validateCompressionIndex(index);
 await check('Complete run-index reconciliation and active-run eligibility',()=>assert(directoryRuns.some(r=>r.runId===study.activeRunId)));
 await check('Internal-only publication, explicit missing coverage, other studies not started',()=>{
  assert.equal(index.publicationStatus,'INTERNAL \u2014 NOT READY FOR PUBLICATION');
  assert.equal(study.browserTested,false);assert.equal(study.visualReview,'LIMITED REPRESENTATIVE PAGES; SEE REVIEW RECORD');assert(study.knownMissingCoverage.length>=6);
  for(const s of index.studies.filter(s=>s.name!=='compression')){assert.equal(s.evidenceStatus,'NOT STARTED');assert.deepEqual(s.runs,[]);}
  assert(!fs.existsSync(path.join(root,'app/lab')));assert(!fs.existsSync(path.join(root,'public/lab')));
  assert.equal(new Set(study.runs.map(r=>r.runId)).size,study.runs.length);
 });
 await check('Historical files and collector snapshot remain byte-identical',()=>{
  const legacy=study.runs[0];for(const [p,h]of Object.entries(legacy.artifactHashes))assert.equal(sha(read(p)),h,p);
  const report=parse(legacy.manifestPath);for(const[p,h]of Object.entries(report.sourceHashes))assert.equal(sha(read(legacy.sourceSnapshots[p]||p)),h,p);
 });
 await check('Duplicate IDs, path traversal and file overwrite are rejected',()=>{
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'pdfcraft-immutable-test-'));
  try{const d=reserveRun('unique',base);writeOnce(d,'sample.json','original');assert.throws(()=>reserveRun('unique',base),/EEXIST/);assert.throws(()=>reserveRun('../escape',base),/Invalid/);assert.throws(()=>writeOnce(d,'../escape','bad'),/Invalid/);assert.throws(()=>writeOnce(d,'sample.json','changed'),/EEXIST/);assert.equal(fs.readFileSync(path.join(d,'sample.json'),'utf8'),'original');}
  finally{assert(path.resolve(base).startsWith(path.resolve(os.tmpdir())+path.sep+'pdfcraft-immutable-test-'));fs.rmSync(base,{recursive:true});}
 });
 const pdfjs=await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
 // Supplemental real-world records receive independent checks in compression-realworld.test.cjs.
 // Keep the original ten-fixture assertions intact for both synthetic runs.
 assert.deepEqual(directoryRuns.filter(e=>e.evidenceStatus.startsWith('SUPPLEMENTAL:')).map(e=>e.runId),['compression-20261016-realworld-01','compression-20261016-scan-01']);
 for(const entry of directoryRuns.filter(e=>!e.evidenceStatus.startsWith('SUPPLEMENTAL:'))){
  const r=parse(entry.manifestPath),dir=path.posix.dirname(entry.manifestPath);
  await check('Immutable manifest/artifact hashes '+entry.runId,()=>{
   assert.equal(sha(read(entry.manifestPath)),entry.manifestSha256);assert.equal(r.runId,entry.runId);assert.equal(r.status,'COMPLETE');assert.equal(r.results.length,10);
   assert.equal(r.browserTested,false);assert.equal(r.visualReview,'NOT TESTED');assert(r.execution.includes('NOT REAL BROWSER'));
   assert.deepEqual(r.environment,parse(dir+'/environment.json'));assert(r.environment.qpdfWasm);assert(r.gitHead);
   for(const[p,h]of Object.entries(r.artifactHashes))assert.equal(sha(read(dir+'/'+p)),h,p);
   assert.deepEqual(fs.readdirSync(path.join(root,dir)).sort(),[...Object.keys(r.artifactHashes),'manifest.json'].sort());
   for(const[p,h]of Object.entries(r.sourceHashes))assert.equal(sha(read(p==='scripts/lab/collect-compression.cjs'?dir+'/collector.cjs':p)),h,p);
   if(entry.runId===study.activeRunId){assert.equal(r.publicationStatus,index.publicationStatus);assert.equal(sha(read('scripts/lab/collect-compression.cjs')),r.sourceHashes['scripts/lab/collect-compression.cjs']);}
   else assert(entry.evidenceStatus.startsWith('SUPERSEDED'));
   assert(r.results.filter(x=>x.byteChange>0).length>=2);assert.equal(r.results.filter(x=>x.status==='FAILURE').length,2);
  });
  for(const item of r.results)await check(entry.runId+' '+item.fixtureId+' measurements and independent reparse',async()=>{
   assert.equal(item.fixtureKind,'SYNTHETIC');assert(item.provenance.length>30);
   for(const key of ['browserVerification','visualQuality','interactiveSelectability','formInteraction','signatureValidity'])assert.equal(item[key],'NOT TESTED');
   const input=read(item.inputPath);assert.equal(input.length,item.inputBytes);assert.equal(sha(input),item.inputSha256);
   assert(item.inputPath.startsWith(dir+'/'));assert(item.rawInspectionPath.startsWith(dir+'/'));
   assert.equal(sha(read(item.rawInspectionPath)),item.inspectionSha256);
   const raw=parse(item.rawInspectionPath);assert(raw.unsupported.includes('Visual fidelity'));assert(raw.unsupported.includes('Signature validity'));
   assert.equal(item.status,item.expectedStatus);
   if(item.status==='FAILURE'){assert.equal(item.outputPath,null);assert.equal(item.outputBytes,null);assert.equal(item.outputSha256,null);assert.equal(item.percentChange,null);assert.equal(raw.after,null);assert.equal(raw.before.opens,false);assert(item.error);if(item.fixtureId==='encrypted-input'){assert(/password protected/i.test(item.error));const task=pdfjs.getDocument({data:new Uint8Array(input),password:'SyntheticFixture7A!',standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/')+path.sep});try{const doc=await task.promise;assert.equal(doc.numPages,24);const page=await doc.getPage(1);assert((await page.getTextContent()).items.some(x=>x.str?.includes('TEXT PAGE 1 LINE 1')));}finally{await task.destroy();}}else assert(/could not be read/i.test(item.error));return;}
   assert(item.outputPath.startsWith(dir+'/'));const output=read(item.outputPath);assert.equal(output.length,item.outputBytes);assert.equal(sha(output),item.outputSha256);assert.equal(item.byteChange,output.length-input.length);assert.equal(item.percentChange,item.byteChange/input.length*100);assert.equal(item.independentOutputOpens,true);
   for(const [bytes,expected]of [[input,raw.before],[output,raw.after]]){
    const task=pdfjs.getDocument({data:new Uint8Array(bytes),standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/')+path.sep,useSystemFonts:false});
    try{const doc=await task.promise;assert.equal(doc.numPages,expected.pageCount);assert.deepEqual(normalize(await doc.getFieldObjects()),expected.fields);assert.deepEqual(normalize((await doc.getMetadata()).info),expected.metadata);
     for(let i=1;i<=doc.numPages;i++){const page=await doc.getPage(i),e=expected.pages[i-1],vp=page.getViewport({scale:page.userUnit});assert.equal(vp.width,e.widthPoints);assert.equal(vp.height,e.heightPoints);assert.equal(page.rotate,e.rotation);const text=(await page.getTextContent()).items.filter(x=>'str'in x).map(x=>x.str).join('\n');assert.equal(text,e.text);assert.equal(sha(text),e.textSha256);const annotations=(await page.getAnnotations()).map(a=>({subtype:a.subtype,fieldName:a.fieldName||null,fieldValue:a.fieldValue??null}));assert.deepEqual(annotations,e.annotations);}
    }finally{await task.destroy();}
   }
   assert.deepEqual(item.metadataBefore,raw.before.metadata);assert.deepEqual(item.metadataAfter,raw.after.metadata);
   assert.equal(item.formFieldsMatch,JSON.stringify(raw.before.fields)===JSON.stringify(raw.after.fields));
   assert.equal(item.formAnnotationsMatch,JSON.stringify(raw.before.pages.map(p=>p.annotations))===JSON.stringify(raw.after.pages.map(p=>p.annotations)));
   assert.equal(item.textExtractionMatches,JSON.stringify(raw.before.pages.map(p=>p.text))===JSON.stringify(raw.after.pages.map(p=>p.text)));
   assert.equal(item.geometryMatches,JSON.stringify(raw.before.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation]))===JSON.stringify(raw.after.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation])));
  });
 }
 console.log('IMMUTABLE RUN TESTS '+passed+' PASS, 0 FAIL');
})().catch(e=>{console.error(e);process.exitCode=1});
