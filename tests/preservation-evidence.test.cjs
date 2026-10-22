// Reopen actual artifacts; compare raw observations and derived classifications.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const collector=require('../scripts/lab/preservation-postrepair.cjs'),legacy=require('../scripts/lab/preservation.cjs'),{validate,validateRunContract}=require('../scripts/lab/validate-preservation.cjs');
const root=path.resolve(__dirname,'..');let passed=0;const test=async(name,fn)=>{await fn();passed++;console.log('PASS '+name);};
// These two files are editorial inputs, not PDF-processing dependencies.
// Their historical bytes remain covered by validate() and source-snapshots.json.
const editorialSources=new Set(['lib/blogCatalog.json','lib/toolGuides.json']);
function currentDependencies(m,read=p=>fs.readFileSync(path.join(root,p))){
 for(const [p,hash] of Object.entries(m.sourceHashes)){
  // The collector was separately corrected after this immutable run; its current
  // transformation assertions are exercised below, not equated to old bytes.
  if(editorialSources.has(p)||p==='scripts/lab/preservation-postrepair.cjs')continue;
  assert.equal(legacy.sha(read(p)),hash,'Processing dependency requires review: '+p);
 }
}
// Independent oracle: does not call collector.matrix/assertTransformation.
function independentExpected(before,after,r,o){
 const op=r.operation,source=before.parser,out=after.parser;
 const order=op==='merge-pdf'?[0,1,2,3]:op==='reorder-pages'?r.options.order.map(n=>n-1):op==='delete-pages'?[0,1,2].filter(i=>!r.options.remove.includes(i+1)):op==='split-pdf'?[Number(o.path.match(/-(\d+)\.pdf$/)[1])-1]:[0,1,2];
 assert.deepEqual(o.indices,order);assert.equal(out.pageCount,order.length);assert.equal(out.pages.length,order.length);
 for(let j=0;j<order.length;j++){const i=order[j],a=out.pages[j],b=source.pages[i];
 if(op==='pdf-to-grayscale'){
 assert.equal(a.text,'');assert.equal(a.annotations.length,0);assert.equal(a.vectorPathOperators,0);assert.equal(a.imageOperators,1);assert.deepEqual(a.physical,b.physical);assert.equal(a.rotation,0);
 for(const box of ['media','crop'])assert.deepEqual(out.boxes[j][box],{x:0,y:0,width:b.physical[0],height:b.physical[1]});
 }else{
 assert.deepEqual(a.identities,b.identities,'independent logical order');
 const addition=op==='watermark-pdf'?r.options.text:op==='add-page-numbers'?String(r.options.start+j):null;
 assert.equal(a.text,addition===null?b.text:b.text+'||'+addition,'independent text addition/content');
 const rotation=op==='rotate-pdf'?(b.rotation+r.options.additionalDegrees)%360:b.rotation;
 assert.equal(a.rotation,rotation,'independent rotation');
 if(out.boxes){assert.deepEqual(out.boxes[j].media,source.boxes[i].media);assert.deepEqual(out.boxes[j].crop,source.boxes[i].crop);assert.equal(out.boxes[j].rotation,rotation);}
 assert.deepEqual(a.physical,op==='rotate-pdf'&&r.options.additionalDegrees%180!==0?[b.physical[1],b.physical[0]]:b.physical);
 assert.equal(a.imageOperators,b.imageOperators);assert.equal(a.vectorPathOperators,b.vectorPathOperators);
 }
 }
 if(op==='pdf-to-grayscale'){assert.equal(out.outlines.length,0);assert(!out.fields||Object.keys(out.fields).length===0);}
}
async function adversarial(m,dir,before,test){
 for(const angle of [90,180,270])await test('requested rotation '+angle+' exact rule (in-memory observation test)',()=>{
 const r=structuredClone(m.records.find(r=>r.fixtureId==='navigation'&&r.operation==='rotate-pdf')),o=r.outputs[0],a=structuredClone(before.navigation);r.options.additionalDegrees=angle;
 a.parser.pages.forEach((p,i)=>{p.rotation=(p.rotation+angle)%360;if(angle%180)p.physical.reverse();a.parser.boxes[i].rotation=p.rotation;});
 independentExpected(before.navigation,a,r,o);collector.matrix(before.navigation,a,o.indices,r.operation,false,r.options);
 });
 const rotate=x=>x.records.find(r=>r.fixtureId==='navigation'&&r.operation==='rotate-pdf');
 const cases=[['Rotate NOT TESTED',x=>{rotate(x).status='NOT TESTED';rotate(x).outputs=[];}],['Rotate output removed / total19',x=>rotate(x).outputs=[]],['required operation omitted',x=>x.records=x.records.filter(r=>r!==rotate(x))],['success unsupported',x=>{rotate(x).status='UNSUPPORTED';rotate(x).outputs=[];}],['form unsupported to success',x=>x.records.find(r=>r.status==='UNSUPPORTED').status='MEASURED'],['extra output',x=>rotate(x).outputs.push(rotate(x).outputs[0])],['duplicate identity',x=>x.records[0]=structuredClone(rotate(x))]];
 for(const [name,mutate] of cases)await test('contract rejects '+name,()=>{const x=structuredClone(m);mutate(x);assert.throws(()=>validateRunContract(x));});
 await test('exact audit case with consistent virtual hashes rejects before acceptance',()=>{
 const vm=require('vm'),p=path.join(root,'scripts/lab/validate-preservation.cjs'),req=require('module').createRequire(p),overlay=new Map(),x=structuredClone(m),index=JSON.parse(fs.readFileSync(path.join(root,'data/lab/preservation-index.json'))),r=rotate(x);r.status='NOT TESTED';r.outputs=[];
 const name='navigation-rotate-pdf.result.json',bytes=Buffer.from(JSON.stringify(r));overlay.set(path.join(dir,name),bytes);x.artifactHashes[name]=legacy.sha(bytes);const mb=Buffer.from(JSON.stringify(x));overlay.set(path.join(dir,'manifest.json'),mb);const active=index.runs.find(r=>r.runId===x.runId);active.artifactHashes[name]=legacy.sha(bytes);active.artifactHashes['manifest.json']=legacy.sha(mb);
 const io={...fs,readFileSync:(p,...args)=>overlay.has(path.resolve(p))?overlay.get(path.resolve(p)):fs.readFileSync(p,...args)},mod={exports:{}};
 vm.compileFunction(fs.readFileSync(p,'utf8'),['require','module','exports','__dirname'])(n=>n==='node:fs'?io:req(n),mod,mod.exports,path.dirname(p));assert.throws(()=>mod.exports.validate(index),/required status/);
 });
 for(const [op,label,mutate] of [
 ['merge-pdf','wrong Merge order',x=>x.parser.pages.reverse()],['split-pdf','wrong Split selection',x=>x.parser.pages[0].identities=['PAGE_2']],['reorder-pages','wrong Reorder order',x=>x.parser.pages.reverse()],['delete-pages','wrong Delete retained set',x=>x.parser.pages[1].identities=['PAGE_2']],['rotate-pdf','13 degree rotation',x=>{x.parser.pages[0].rotation=13;x.parser.boxes[0].rotation=13;}],['add-page-numbers','missing numbering',x=>x.parser.pages[0].text='PAGE_1 selectable text'],['watermark-pdf','missing watermark',x=>x.parser.pages[0].text='PAGE_1 selectable text'],['compress-pdf','geometry corruption',x=>x.parser.boxes[0].media.width+=9],['pdf-to-grayscale','unrelated raster order/geometry loss',x=>x.parser.pages.reverse()],['compress-pdf','unexpected text loss',x=>x.parser.pages[0].text='']
 ])await test('independent and classifier rejection: '+label,()=>{
 const r=m.records.find(r=>r.fixtureId==='navigation'&&r.operation===op),o=r.outputs[0],after=JSON.parse(fs.readFileSync(path.join(dir,o.inspection))),b=before.navigation,reference=op==='merge-pdf'?{...b,parser:{...b.parser,pages:[...b.parser.pages,...before.tail.parser.pages],boxes:[...b.parser.boxes,...before.tail.parser.boxes]}}:b;mutate(after);
 assert.throws(()=>independentExpected(reference,after,r,o));assert.throws(()=>collector.matrix(reference,after,o.indices,op,false));
 });
}
(async()=>{
 const {index,manifest:m,dir}=validate(),rt=await legacy.runtime(),h=await collector.harness(rt),fixtures=await collector.fixtures();
 await test('historical registration/artifacts/snapshots and current processing dependencies',()=>{validate();currentDependencies(m);});
 await test('editorial-only mutations do not invalidate historical evidence',()=>{
  currentDependencies(m,p=>editorialSources.has(p)?Buffer.from('changed editorial text'):fs.readFileSync(path.join(root,p)));
  validate();
 });
 await test('processing mutations require review',()=>{
  for(const target of ['app/tools/merge-pdf/page.js','lib/copyPdfPagesSafe.js','lib/pdfNavigationValidation.js','package-lock.json'])
   assert.throws(()=>currentDependencies(m,p=>p===target?Buffer.from('mutated processing dependency'):fs.readFileSync(path.join(root,p))),/Processing dependency requires review/);
 });
 await test('historical PDF, manifest and source snapshot mutations fail independently',()=>{
  const vm=require('node:vm'),file=path.join(root,'scripts/lab/validate-preservation.cjs'),req=require('node:module').createRequire(file);
  for(const target of ['navigation.pdf','manifest.json','source-snapshots.json']){
   const io={...fs,readFileSync:(p,...args)=>path.resolve(p)===path.join(dir,target)?Buffer.from('corrupt historical bytes'):fs.readFileSync(p,...args)},mod={exports:{}};
   vm.compileFunction(fs.readFileSync(file,'utf8'),['require','module','exports','__dirname'])(n=>n==='node:fs'?io:req(n),mod,mod.exports,path.dirname(file));
   assert.throws(()=>mod.exports.validate(),undefined,target);
  }
 });
 await test('deterministic synthetic fixture regeneration',()=>{for(const [name,b] of Object.entries(fixtures))assert.equal(legacy.sha(b),legacy.sha(fs.readFileSync(path.join(dir,name+'.pdf'))));});
 await test('duplicate run ID cannot overwrite evidence',async()=>{await assert.rejects(()=>collector.collect(m.runId),/EEXIST/);validate();});
 for(const [label,mutate] of [
 ['missing active',x=>x.activeRunId='absent'],['duplicate registration',x=>x.runs.push(x.runs[0])],['unregistered directory',x=>x.runs.pop()],['historical active',x=>{x.runs.find(r=>r.role==='ACTIVE').role='HISTORICAL_DEBUG';x.activeRunId=x.runs[0].runId;x.runs[0].role='ACTIVE';}],['wrong hash',x=>x.runs.at(-1).artifactHashes['manifest.json']='0'.repeat(64)],['unsafe artifact',x=>x.runs.at(-1).artifactHashes['../escape']='0'.repeat(64)]
 ])await test('reject '+label,()=>{const x=structuredClone(index);mutate(x);assert.throws(()=>validate(x));});
 const before={};for(const name of ['navigation','form','tail']){before[name]=await collector.inspect(rt,h,fs.readFileSync(path.join(dir,name+'.pdf')),{form:name==='form'});await test('independent input reparse '+name,()=>assert.deepEqual(JSON.parse(JSON.stringify(before[name])),JSON.parse(fs.readFileSync(path.join(dir,name+'.inspection.json')))));}
 for(const r of m.records){if(r.status==='UNSUPPORTED'){await test('explicit AcroForm rejection '+r.operation,()=>{assert.equal(r.fixtureId,'form');assert.equal(r.outputs.length,0);assert(/unsupported|AcroForm|linked annotation/i.test(r.handlerText+' '+r.alerts.join(' ')));});continue;}
 for(const o of r.outputs)await test('independent reparse and feature derivation '+o.path,async()=>{const bytes=fs.readFileSync(path.join(dir,o.path)),after=await collector.inspect(rt,h,bytes,{form:r.fixtureId==='form',encrypted:r.operation==='protect-pdf'});assert.deepEqual(JSON.parse(JSON.stringify(after)),JSON.parse(fs.readFileSync(path.join(dir,o.inspection))));assert.equal(after.parser.pageCount,o.pageCount);
 const b=before[r.fixtureId],reference=r.operation==='merge-pdf'?{...b,parser:{...b.parser,pages:[...b.parser.pages,...before.tail.parser.pages],boxes:[...b.parser.boxes,...before.tail.parser.boxes]}}:b;
 independentExpected(reference,after,r,o);
 assert.deepEqual(o.matrix,collector.matrix(reference,after,o.indices,r.operation,r.fixtureId==='form'));
 if(r.fixtureId==='navigation'&&['merge-pdf','split-pdf','reorder-pages','delete-pages'].includes(r.operation))collector.verifyNavigation(after,o.indices.map(i=>'PAGE_'+(i+1)),r.operation);
 if(r.operation==='protect-pdf'){for(const password of [undefined,'wrong-test-password']){const task=rt.adapter.getDocument({data:new Uint8Array(bytes),password});try{await assert.rejects(()=>task.promise,/password/i);}finally{await task.destroy();}}}
 });}
 await adversarial(m,dir,before,test);
 console.log('PRESERVATION EVIDENCE '+passed+' PASS, 0 FAIL');
})().catch(e=>{console.error(e);process.exitCode=1;});
