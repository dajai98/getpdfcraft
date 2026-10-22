// Read-only fail-closed registration/artifact checks. Never promotes a run.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {sha}=require('./preservation.cjs');
const root=path.resolve(__dirname,'../..'),base='tests/evidence/preservation/runs';
// Version 1 is the fixed two-fixture study, not an extensible attempt log.
function validateRunContract(m){
 assert.equal(m.schemaVersion,1,'unsupported preservation contract');
 const ops=['merge-pdf','split-pdf','reorder-pages','rotate-pdf','delete-pages','add-page-numbers','watermark-pdf','compress-pdf','pdf-to-grayscale','protect-pdf','unlock-pdf'];
 const unsupported=new Set(['merge-pdf','split-pdf','reorder-pages','delete-pages']);
 assert.equal(m.records.length,22,'required attempt count');
 const expected=['navigation','form'].flatMap(f=>ops.map(op=>f+'/'+op)).sort();
 assert.deepEqual(m.records.map(r=>r.fixtureId+'/'+r.operation).sort(),expected,'exact operation/fixture inventory');
 for(const r of m.records){const blocked=r.fixtureId==='form'&&unsupported.has(r.operation);
 assert.equal(r.status,blocked?'UNSUPPORTED':'MEASURED','required status '+r.fixtureId+'/'+r.operation);
 const selections=blocked?[]:r.operation==='split-pdf'?[[0],[1],[2]]:[r.operation==='merge-pdf'?[0,1,2,3]:r.operation==='reorder-pages'?[1,0,2]:r.operation==='delete-pages'?[0,2]:[0,1,2]];
 assert.equal(r.outputs.length,selections.length,'required output count');
 r.outputs.forEach((o,i)=>{assert.deepEqual(o.indices,selections[i],'requested selection');assert.equal(o.pageCount,selections[i].length);assert.equal(o.path,r.fixtureId+'-'+r.operation+'-'+(i+1)+'.pdf');});
 if(r.operation==='rotate-pdf')assert.equal(r.options.additionalDegrees,90);
 if(r.operation==='reorder-pages')assert.deepEqual(r.options.order,[2,1,3]);
 if(r.operation==='delete-pages')assert.deepEqual(r.options.remove,[2]);
 if(r.operation==='split-pdf')assert.equal(r.options.mode,'all');
 if(r.operation==='add-page-numbers')assert.deepEqual(r.options,{start:1,position:'bottom-center',fontSize:12});
 if(r.operation==='watermark-pdf')assert.deepEqual(r.options,{text:'CONFIDENTIAL',opacity:0.3});
 }
 assert.equal(m.records.filter(r=>r.status==='MEASURED').length,18);
 assert.equal(m.records.flatMap(r=>r.outputs).length,20,'required total output count');
}
function validate(index=JSON.parse(fs.readFileSync(path.join(root,'data/lab/preservation-index.json')))){
 assert.equal(index.publicationStatus,'INTERNAL — NOT READY FOR PUBLICATION');assert(Array.isArray(index.runs));
 let validated;
 const ids=index.runs.map(r=>r.runId);assert.equal(new Set(ids).size,ids.length,'duplicate run');
 assert.deepEqual([...ids].sort(),fs.readdirSync(path.join(root,base)).sort(),'registered/on-disk runs disagree');
 const active=index.runs.filter(r=>r.runId===index.activeRunId);assert.equal(active.length,1,'activeRunId must resolve exactly once');
 assert.equal(index.runs.filter(r=>r.role==='ACTIVE').length,1);assert.equal(active[0].role,'ACTIVE');
 for(const r of index.runs){assert(/^preservation-[a-zA-Z0-9_-]+$/.test(r.runId));assert(['ACTIVE','HISTORICAL_DEBUG'].includes(r.role));const dir=path.join(root,base,r.runId);
 assert.deepEqual(Object.keys(r.artifactHashes).sort(),fs.readdirSync(dir).sort(),'artifact inventory mismatch');
 for(const [name,hash] of Object.entries(r.artifactHashes)){assert(/^[\w.-]+$/.test(name)&&!name.includes('..'),'unsafe artifact path');assert(/^[a-f0-9]{64}$/.test(hash));assert.equal(sha(fs.readFileSync(path.join(dir,name))),hash,'hash mismatch '+name);}
 if(r.role!=='ACTIVE')continue;
 assert.equal(r.era,'POST_DESTINATION_REPAIR_PHASE_4');assert(!fs.existsSync(path.join(dir,'failure.json')),'failed run active');
 const m=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json')));assert.equal(m.runId,r.runId);assert.equal(m.status,'COMPLETE');assert.equal(m.era,r.era);assert.equal(m.publicationStatus,index.publicationStatus);assert.equal(m.environment.browser,'NOT TESTED');assert.equal(m.records.length,22);
 validateRunContract(m);
 assert.deepEqual(Object.keys(m.artifactHashes).sort(),Object.keys(r.artifactHashes).filter(n=>n!=='manifest.json').sort());
 for(const [n,h] of Object.entries(m.artifactHashes))assert.equal(h,r.artifactHashes[n]);
 const snapshots=JSON.parse(fs.readFileSync(path.join(dir,'source-snapshots.json')));assert.deepEqual(Object.keys(snapshots).sort(),Object.keys(m.sourceHashes).sort());for(const [n,b] of Object.entries(snapshots))assert.equal(sha(Buffer.from(b,'base64')),m.sourceHashes[n]);
 const operations=['merge-pdf','split-pdf','reorder-pages','rotate-pdf','delete-pages','add-page-numbers','watermark-pdf','compress-pdf','pdf-to-grayscale','protect-pdf','unlock-pdf'];
 const seen=new Set();for(const record of m.records){const id=record.fixtureId+'/'+record.operation;assert(!seen.has(id));seen.add(id);assert(['navigation','form'].includes(record.fixtureId));assert(operations.includes(record.operation));assert.equal(record.runId,m.runId);assert(['MEASURED','UNSUPPORTED','NOT TESTED'].includes(record.status));assert(record.inputs.length);if(record.status==='MEASURED')assert.equal(record.outputs.length,record.operation==='split-pdf'?3:1);else assert.equal(record.outputs.length,0);
 for(const a of [...record.inputs,...record.outputs]){assert(/^[\w.-]+$/.test(a.path)&&!a.path.includes('..'));assert.equal(a.sha256,r.artifactHashes[a.path]);assert.equal(a.bytes,fs.statSync(path.join(dir,a.path)).size);}
 for(const o of record.outputs){assert(/^[\w.-]+$/.test(o.inspection)&&!o.inspection.includes('..'));assert(/^[a-f0-9]{64}$/.test(o.inspectionSha256));assert.equal(o.inspectionSha256,r.artifactHashes[o.inspection]);const parsed=JSON.parse(fs.readFileSync(path.join(dir,o.inspection)));assert.equal(parsed.parser.pageCount,o.pageCount);assert.equal(o.indices.length,o.pageCount);assert(Object.values(o.matrix).every(v=>['PRESERVED','EXPECTED CHANGE','LOST','UNSUPPORTED','NOT TESTED'].includes(v)));for(const field of ['browserDownload','visualFidelity','interactiveTextSelection','interactiveForms','signatureValidity'])assert.equal(o.matrix[field],'NOT TESTED');}
 assert.deepEqual(record,JSON.parse(fs.readFileSync(path.join(dir,record.fixtureId+'-'+record.operation+'.result.json'))));
 }assert.equal(m.records.filter(r=>r.status==='UNSUPPORTED').length,4);validated={index,manifest:m,dir};
 }
 assert(validated,'No active evidence');return validated;
}
module.exports={validate,validateRunContract};
if(require.main===module){validate();console.log('Preservation registration and hashes PASS');}
