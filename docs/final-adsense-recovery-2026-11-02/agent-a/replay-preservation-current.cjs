// Recovery report only. Execute CURRENT handlers against retained historical inputs.
// No historical artifacts, test files, product source, or registrations are modified.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../../..'),read=p=>fs.readFileSync(path.join(root,p)),json=p=>JSON.parse(read(p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),plain=x=>JSON.parse(JSON.stringify(x));
const legacy=require(path.join(root,'scripts/lab/preservation.cjs')),collector=require(path.join(root,'scripts/lab/preservation-postrepair.cjs'));
const walk=p=>fs.readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
const knownOptions={'merge-pdf':{},'split-pdf':{mode:'all'},'reorder-pages':{order:[2,1,3]},'delete-pages':{remove:[2]},'rotate-pdf':{additionalDegrees:90},'add-page-numbers':{start:1,position:'bottom-center',fontSize:12},'watermark-pdf':{text:'CONFIDENTIAL',opacity:0.3},'compress-pdf':{useObjectStreams:true},'pdf-to-grayscale':{scale:1.5,jpegQuality:0.9},'protect-pdf':{publicTestPassword:'PublicSynthetic7E!'},'unlock-pdf':{publicTestPassword:'PublicSynthetic7E!'}};
const buttons={'merge-pdf':/Merge 2 PDFs/,'split-pdf':/Split PDF/,'reorder-pages':/Save New Order/,'rotate-pdf':/Rotate 90/,'delete-pages':/Delete.*Page/,'add-page-numbers':/Add Page Numbers/,'watermark-pdf':/Add Watermark/,'pdf-to-grayscale':/Convert to Grayscale/,'protect-pdf':/Protect PDF/,'unlock-pdf':/Unlock PDF/};
// Independent expected semantics, derived from recorded options and original inputs.
// This does not call the collector's matrix or transformation assertions.
function independent(before,after,r,ordinal){
 const op=r.operation,o=r.options,a=after.parser,b=before.parser;
 const indices=op==='merge-pdf'?[0,1,2,3]:op==='split-pdf'?[ordinal]:op==='reorder-pages'?o.order.map(x=>x-1):op==='delete-pages'?[0,1,2].filter(i=>!o.remove.includes(i+1)):[0,1,2];
 assert.equal(a.pageCount,indices.length);assert.equal(a.pages.length,indices.length);
 indices.forEach((i,j)=>{const src=b.pages[i],out=a.pages[j];
  if(op==='pdf-to-grayscale'){
   assert.equal(out.text,'');assert.deepEqual(out.annotations,[]);assert.equal(out.vectorPathOperators,0);assert.equal(out.imageOperators,1);assert.equal(out.rotation,0);assert.deepEqual(out.physical,src.physical);
   for(const box of ['media','crop'])assert.deepEqual(a.boxes[j][box],{x:0,y:0,width:src.physical[0],height:src.physical[1]});
  }else{
   assert.deepEqual(out.identities,src.identities);
   const suffix=op==='watermark-pdf'?o.text:op==='add-page-numbers'?String(o.start+j):null;
   assert.equal(out.text,suffix===null?src.text:src.text+'||'+suffix);
   assert.equal(out.imageOperators,src.imageOperators);assert.equal(out.vectorPathOperators,src.vectorPathOperators);
   const rotation=op==='rotate-pdf'?(src.rotation+o.additionalDegrees)%360:src.rotation;assert.equal(out.rotation,rotation);
   assert.deepEqual(out.physical,op==='rotate-pdf'&&o.additionalDegrees%180?[src.physical[1],src.physical[0]]:src.physical);
   if(a.boxes){for(const box of ['media','crop'])assert.deepEqual(a.boxes[j][box],b.boxes[i][box]);assert.equal(a.boxes[j].rotation,rotation);}
  }
 });
 const fields=x=>Object.entries(x||{}).map(([name,items])=>({name,values:items.map(v=>v.value)}));
 if(op==='pdf-to-grayscale'){assert.deepEqual(fields(a.fields),[]);assert.deepEqual(a.outlines,[]);}
 else assert.deepEqual(fields(a.fields),fields(b.fields));
 return indices;
}
(async()=>{
 const startedAt=new Date().toISOString(),index=json('data/lab/preservation-index.json'),entry=index.runs.find(r=>r.runId===index.activeRunId),dir='tests/evidence/preservation/runs/'+entry.runId;
 for(const [name,hash]of Object.entries(entry.artifactHashes))assert.equal(sha(read(dir+'/'+name)),hash,'Historical artifact drift: '+name);
 const manifest=json(dir+'/manifest.json');assert.equal(manifest.records.length,22);
 const sourcePaths=[...walk('lib'),...walk('components/hooks'),...walk('app/tools'),'tests/final-repair.test.cjs','scripts/lab/preservation.cjs','scripts/lab/preservation-postrepair.cjs','package-lock.json'];
 const sourceHashes=Object.fromEntries(sourcePaths.map(p=>[p,sha(read(p))])),rt=await legacy.runtime(),h=await collector.harness(rt),before={};
 for(const name of ['navigation','form','tail'])before[name]=await collector.inspect(rt,h,read(dir+'/'+name+'.pdf'),{form:name==='form'});
 const rows=[];
 for(const r of manifest.records){
  const row={fixtureId:r.fixtureId,operation:r.operation,status:'NOT TESTED',historicalStatus:r.status,options:r.options,inputs:r.inputs.map(i=>({path:dir+'/'+i.path,sha256:sha(read(dir+'/'+i.path)),bytes:read(dir+'/'+i.path).length})),outputs:[]};let t;
  try{
   assert.deepEqual(r.options,knownOptions[r.operation],'Unknown historical options');
   for(let i=0;i<r.inputs.length;i++){assert.equal(row.inputs[i].sha256,r.inputs[i].sha256);assert.equal(row.inputs[i].bytes,r.inputs[i].bytes);}
   if(r.operation==='pdf-to-grayscale'&&!rt.canvas){row.reason='Node canvas unavailable';rows.push(row);console.log(JSON.stringify({fixture:row.fixtureId,operation:row.operation,status:row.status,reason:row.reason}));continue;}
   t=h.tool(r.operation,{documentOverride:{createElement:()=>rt.canvas.createCanvas(1,1)}});await t.upload(r.inputs.map(i=>h.file(i.path,read(dir+'/'+i.path))));
   if(r.operation==='reorder-pages'){await t.find(n=>n.props['aria-label']==='Move page 2 up').props.onClick();t.render();}
   if(r.operation==='delete-pages'){await t.find(n=>n.props['aria-label']==='Page 2').props.onClick();t.render();}
   if(r.operation==='protect-pdf'){t.change('password',r.options.publicTestPassword,0);t.change('password',r.options.publicTestPassword,1);}
   if(r.operation==='unlock-pdf')t.change('password',r.options.publicTestPassword);
   if(r.operation!=='compress-pdf')await t.click(buttons[r.operation]);
   const downloads=t.nodes().filter(n=>typeof n.type==='string'&&n.type.endsWith('/DownloadButton'));
   row.handlerText=t.text();row.alerts=t.alerts;assert.equal(downloads.length,r.outputs.length,'Output count');
   if(r.status==='UNSUPPORTED'){assert.equal(downloads.length,0);assert(/AcroForm|linked annotation|unsupported/i.test(row.handlerText+' '+row.alerts.join(' ')));row.observedOutcome='UNSUPPORTED';}
   else{
    assert(downloads.length);row.observedOutcome='MEASURED';
    const reference=r.operation==='merge-pdf'?{...before[r.fixtureId],parser:{...before[r.fixtureId].parser,pages:[...before[r.fixtureId].parser.pages,...before.tail.parser.pages],boxes:[...before[r.fixtureId].parser.boxes,...before.tail.parser.boxes]}}:before[r.fixtureId];
    for(let j=0;j<downloads.length;j++){
     const bytes=Buffer.from(await t.objects.get(downloads[j].props.url).arrayBuffer()),after=await collector.inspect(rt,h,bytes,{form:r.fixtureId==='form',encrypted:r.operation==='protect-pdf'});
     const indices=independent(reference,after,r,j);assert.deepEqual(indices,r.outputs[j].indices);
     collector.assertTransformation(reference,after,indices,r.operation,r.options);
     const matrix=collector.matrix(reference,after,indices,r.operation,r.fixtureId==='form',r.options);assert(!Object.values(matrix).includes('FAILURE'));
     let passwordChecks='NOT TESTED';if(r.operation==='protect-pdf'){
      for(const password of [undefined,'wrong-test-password']){const task=rt.adapter.getDocument({data:new Uint8Array(bytes),password});try{await assert.rejects(()=>task.promise,/password/i);}finally{await task.destroy();}}passwordChecks='PASS: correct password reopens; missing and wrong reject';
     }
     row.outputs.push({sha256:sha(bytes),bytes:bytes.length,pageCount:after.parser.pageCount,indices,independentSemantics:'PASS',transformationAssertions:'PASS',navigation:after.navigation.status,passwordChecks,matrix,observations:plain(after)});
    }
   }
   row.status='PASS';
  }catch(e){row.status='FAIL';row.error=e.stack;}finally{t?.unmount();}
  rows.push(row);console.log(JSON.stringify({fixture:row.fixtureId,operation:row.operation,status:row.status,outputs:row.outputs.length,error:row.error}));
 }
 assert.deepEqual(Object.fromEntries(sourcePaths.map(p=>[p,sha(read(p))])),sourceHashes,'Sources changed during replay');
 const counts=Object.fromEntries(['PASS','FAIL','NOT TESTED'].map(s=>[s,rows.filter(r=>r.status===s).length]));
 const report={schemaVersion:1,status:counts.FAIL?'FAIL':counts['NOT TESTED']?'NOT TESTED':'PASS',scope:'CURRENT NODE SOURCE HANDLERS ON RETAINED INPUTS; NOT BROWSER/DOWNLOAD/VISUAL PROOF',startedAt,completedAt:new Date().toISOString(),historicalRunId:entry.runId,historicalManifestSha256:sha(read(dir+'/manifest.json')),sourceHashes,replayScriptSha256:sha(fs.readFileSync(__filename)),runtime:{node:process.version,pdfLib:require(path.join(root,'node_modules/pdf-lib/package.json')).version,pdfjs:rt.pdfjs.version,qpdfWasm:require(path.join(root,'node_modules/@neslinesli93/qpdf-wasm/package.json')).version,canvas:rt.canvas?require(path.join(rt.canvasPath,'package.json')).version:null},counts,limitations:['No real browser execution or download','No visual review, interactive text selection, interactive forms or signature validity','Grayscale uses installed Node canvas; browser/CDN path not tested','Randomized encryption and metadata prevent exact output byte equivalence','Original immutable measurements and fixtures unchanged'],rows};
 const destination=path.join(__dirname,'preservation-current-replay.json');fs.writeFileSync(destination,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({report:destination,status:report.status,counts}));if(report.status!=='PASS')process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
