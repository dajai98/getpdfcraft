// Reparse persisted real-world evidence; no network, collection or artifact writes.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { validateCompressionIndex } = require('../scripts/lab/validate-compression-index.cjs');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p));
const parse = p => JSON.parse(read(p));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const plain = x => JSON.parse(JSON.stringify(x));
(async()=>{
 const index = parse('data/lab/manifest.json');
 const entries = validateCompressionIndex(index).directoryRuns.filter(e=>e.evidenceStatus.startsWith('SUPPLEMENTAL:'));
 assert.deepEqual(entries.map(e=>e.runId),['compression-20261016-realworld-01','compression-20261016-scan-01']);
 const pdfjs = await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
 for (const entry of entries) {
  const m=parse(entry.manifestPath),dir=path.posix.dirname(entry.manifestPath);
  assert.equal(m.schemaVersion,3); assert.equal(m.results.length,1);
  assert.equal(m.publicationStatus,index.publicationStatus);
  assert.equal(m.coverageStatus,'PARTIAL; BATCH 7C INCOMPLETE');
  assert.equal(m.browserTested,false); assert.equal(m.visualReview,'NOT TESTED');
  assert.deepEqual(m.environment,parse(dir+'/environment.json'));
  for(const [p,h] of Object.entries(m.sourceHashes)) assert.equal(sha(read(m.sourceSnapshots[p]?dir+'/'+m.sourceSnapshots[p]:p)),h);
  for (const r of m.results) {
   assert.equal(r.fixtureKind,'REAL_WORLD');
   const p=parse(r.provenancePath);
   assert(['www.nasa.gov','ntrs.nasa.gov'].includes(new URL(p.sourceUrl).hostname)); assert(p.permission.includes('Internal factual testing'));
   assert.equal(sha(read(p.permissionSnapshot)),p.permissionSha256); assert(Number.isFinite(Date.parse(p.retrievedAt)));
   const a=read(r.inputPath),b=r.outputPath?read(r.outputPath):null;
   assert.equal(a.length,r.inputBytes);assert.equal(sha(a),r.inputSha256);
   const raw=parse(r.rawInspectionPath);
   if(b){assert.equal(b.length,r.outputBytes);assert.equal(sha(b),r.outputSha256);assert.equal(r.byteChange,b.length-a.length);assert.equal(r.percentChange,(b.length-a.length)/a.length*100);}
   else {assert.equal(r.status,'FAILURE');assert.equal(r.outputBytes,null);assert.equal(r.percentChange,null);assert(r.error);}
   for(const [bytes,recorded] of [[a,raw.before],...(b?[[b,raw.after]]:[])]) {
    const task=pdfjs.getDocument({data:new Uint8Array(bytes),standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/')+path.sep,useSystemFonts:false});
    try {
     const doc=await task.promise;assert.equal(recorded.opens,true);assert.equal(doc.numPages,recorded.pageCount);
     assert.deepEqual(plain((await doc.getMetadata()).info),recorded.metadata);
     assert.deepEqual(plain(await doc.getFieldObjects()),recorded.fields);
     for(let n=1;n<=doc.numPages;n++){
      const page=await doc.getPage(n),e=recorded.pages[n-1],v=page.getViewport({scale:page.userUnit});
      assert.equal(v.width,e.widthPoints);assert.equal(v.height,e.heightPoints);assert.equal(page.rotate,e.rotation);
      const t=(await page.getTextContent()).items.filter(x=>'str'in x).map(x=>x.str).join('\n');assert.equal(t,e.text);assert.equal(sha(t),e.textSha256);
      assert.deepEqual((await page.getAnnotations()).map(a=>({subtype:a.subtype,fieldName:a.fieldName||null,fieldValue:a.fieldValue??null})),e.annotations);
     }
    } finally {await task.destroy();}
   }
   assert.equal(r.independentOutputOpens,raw.after?.opens??null);
   assert.deepEqual(r.metadataBefore,raw.before.metadata??null);assert.deepEqual(r.metadataAfter,raw.after?.metadata??null);
   if(b){
    assert.equal(r.textExtractionMatches,JSON.stringify(raw.before.pages.map(p=>p.text))===JSON.stringify(raw.after.pages.map(p=>p.text)));
    assert.equal(r.geometryMatches,JSON.stringify(raw.before.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation]))===JSON.stringify(raw.after.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation])));
    assert.equal(r.formFieldsMatch,JSON.stringify(raw.before.fields)===JSON.stringify(raw.after.fields));
    assert.equal(r.formAnnotationsMatch,JSON.stringify(raw.before.pages.map(p=>p.annotations))===JSON.stringify(raw.after.pages.map(p=>p.annotations)));
   }
   for(const key of ['browserVerification','downloadSuccess','visualQuality','interactiveSelectability','formInteraction','signatureValidity'])assert.equal(r[key],'NOT TESTED');
   assert(m.missingCoverage.length>=7);assert(raw.unsupported.includes('Visual fidelity'));
  }
 }
 console.log('REAL-WORLD EVIDENCE: provenance, hashes, arithmetic, source, independent reparse and limitations PASS');
})().catch(e=>{console.error(e);process.exitCode=1;});
