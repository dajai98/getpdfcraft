// Internal, append-only evidence. Executes source handlers with simulated React/URL.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),os=require('node:os'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const legacy=require('./preservation.cjs'),pdf=require('pdf-lib');
const root=path.resolve(__dirname,'../..'),base='tests/evidence/preservation/runs',sha=legacy.sha,k=pdf.PDFName.of;
const read=p=>fs.readFileSync(path.join(root,p)),json=x=>JSON.stringify(x,null,2)+'\n';
const walk=p=>fs.readdirSync(path.join(root,p),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(p+'/'+e.name):[p+'/'+e.name]);
const slugs=['merge-pdf','split-pdf','reorder-pages','rotate-pdf','delete-pages','add-page-numbers','watermark-pdf','compress-pdf','pdf-to-grayscale','protect-pdf','unlock-pdf'];
const copying=new Set(['merge-pdf','split-pdf','reorder-pages','delete-pages']);
const password='PublicSynthetic7E!';
async function harness(rt){
 const s=read('tests/final-repair.test.cjs').toString(),prefix=s.slice(0,s.indexOf('(async()=>{'));assert(prefix.length>100);
 const boot=`\nmodule.exports=async function(rt){pdfjs=rt.adapter;qfactory=()=>req('@neslinesli93/qpdf-wasm')({noInitialRun:true,wasmBinary:fs.readFileSync(root+'/node_modules/@neslinesli93/qpdf-wasm/dist/qpdf.wasm'),print:()=>{},printErr:()=>{}});for(const p of [...walk('lib').filter(p=>p.endsWith('.js')),...walk('components/hooks'),...walk('app/tools').filter(p=>p.endsWith('/page.js'))])compiled[p]=(await swc.transform(read(p),{filename:p,jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'classic'}},target:'es2022'},module:{type:'commonjs'}})).code;return {tool,file,validator:loadModule('lib/pdfNavigationValidation.js'),model:loadModule('lib/pdfNavigationModel.js')};};`;
 const m={exports:{}};vm.compileFunction(prefix+boot,['require','module','exports','__dirname'])(createRequire(path.join(root,'tests/final-repair.test.cjs')),m,m.exports,path.join(root,'tests'));return m.exports(rt);
}
async function fixtures(){
 const old=await legacy.fixtures(),d=await pdf.PDFDocument.load(old.feature,{updateMetadata:false});
 for(const f of d.getForm().getFields())d.getForm().removeField(f);d.catalog.delete(k('AcroForm'));
 const dest=i=>[d.getPage(i).ref,'XYZ',null,250,null];
 d.catalog.set(k('Dests'),d.context.obj(Object.fromEntries([0,1,2].map(i=>['page'+i,dest(i)]))));
 d.catalog.set(k('Names'),d.context.obj({Dests:{Names:[pdf.PDFString.of('last'),dest(2)]}}));
 d.getPages().forEach(p=>{const items=[];for(let i=0;i<3;i++)for(const mode of ['direct','local'])items.push(d.context.register(d.context.obj({Type:'Annot',Subtype:'Link',Rect:[50,270,200,290],P:p.ref,...(mode==='direct'?{Dest:dest(i)}:{A:{S:'GoTo',D:pdf.PDFName.of('page'+i)}})})));
 items.push(d.context.register(d.context.obj({Subtype:'Link',Rect:[50,300,200,320],P:p.ref,Dest:pdf.PDFString.of('last')})));
 items.push(d.context.register(d.context.obj({Subtype:'Link',Rect:[50,320,200,340],P:p.ref,A:{S:'URI',URI:pdf.PDFString.of('https://example.com/')}})));
 items.push(d.context.register(d.context.obj({Subtype:'Link',Rect:[50,340,200,360],P:p.ref,A:{S:'GoToR',F:pdf.PDFString.of('external.pdf'),D:[2,'Fit']}})));
 p.node.set(k('Annots'),d.context.obj(items));});
 const outline=d.context.obj({Type:'Outlines',Count:3}),rr=d.context.register(outline),nodes=[0,1,2].map(i=>d.context.register(d.context.obj({Title:pdf.PDFString.of('PAGE_'+(i+1)),Parent:rr,Dest:pdf.PDFName.of('page'+i)})));
 nodes.forEach((r,i)=>{const n=d.context.lookup(r);if(i)n.set(k('Prev'),nodes[i-1]);if(i<2)n.set(k('Next'),nodes[i+1]);});outline.set(k('First'),nodes[0]);outline.set(k('Last'),nodes[2]);d.catalog.set(k('Outlines'),rr);d.catalog.set(k('OpenAction'),d.context.obj(dest(2)));
 return {navigation:Buffer.from(await d.save()),form:old.feature,tail:old.tail};
}
async function inspect(rt,h,bytes,{encrypted=false,form=false}={}){
 const parsed=await legacy.inspect(rt,bytes,encrypted?password:undefined);
 const result={parser:parsed,navigation:{status:'NOT TESTED',reason:encrypted?'Encrypted bytes; PDF.js password reopen only':form?'AcroForm fixture outside supported navigation-validator slice':''}};
 if(!encrypted){const d=await pdf.PDFDocument.load(bytes,{updateMetadata:false});result.fieldValues=d.catalog.has(k('AcroForm'))?d.getForm().getFields().map(f=>({name:f.getName(),type:f.constructor.name,value:f.getText?.()??null})):[];
 if(!form){const low=h.validator.validateNavigation(d),names=h.model.readNamedDestinations(d),docnav=h.model.readDocumentNavigation(d);
 const identity=ref=>{const i=d.getPages().findIndex(p=>p.ref.toString()===ref.toString());assert(i>=0,'detached target');return parsed.pages[i].identities[0]||'RASTER_PAGE_'+(i+1);};
 const target=raw=>identity(h.model.resolveLocalDestination(d,raw,names).get(0));
 result.navigation={status:'VERIFIED',lowLevel:low,named:[...names].map(([id,x])=>({id,target:target(x.destination)})),outlines:[...docnav.items].map(n=>({title:d.context.lookup(n.get(k('Title'))).decodeText(),target:n.has(k('Dest'))?target(n.get(k('Dest'))):null})),annotations:d.getPages().map(p=>(p.node.Annots()?.asArray()||[]).map(r=>{const a=d.context.lookup(r),action=d.context.lookup(a.get(k('A')));return {owner:identity(p.ref),ownerMatches:a.get(k('P'))?.toString()===p.ref.toString(),direct:a.has(k('Dest'))?target(a.get(k('Dest'))):null,local:action?.get(k('S'))?.toString()==='/GoTo'?target(action.get(k('D'))):null,remote:action?.get(k('S'))?.toString()==='/GoToR'?h.model.remoteActionPayload(d,action):null,uri:action?.get(k('S'))?.toString()==='/URI'?d.context.lookup(action.get(k('URI'))).decodeText():null};})),openAction:docnav.openAction instanceof pdf.PDFArray?target(docnav.openAction):docnav.openAction?'ACTION':null};
 }}return result;
}
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const fieldValues=fields=>Object.entries(fields||{}).map(([name,items])=>({name,values:items.map(x=>x.value)}));
function matrix(before,after,indices,slug,form,options={}){
 assertTransformation(before,after,indices,slug,options);
 const p=after.parser,expected=indices.map(i=>before.parser.pages[i]),raster=slug==='pdf-to-grayscale',addition=['watermark-pdf','add-page-numbers'].includes(slug),selection=['split-pdf','delete-pages'].includes(slug);
 const compare=(a,b,expectedChange=false)=>eq(a,b)?'PRESERVED':expectedChange?'EXPECTED CHANGE':(b===null||Array.isArray(b)&&!b.length)?'LOST':'FAILURE';
 const n=after.navigation.status==='VERIFIED',src=before.navigation;
 return {pageOrder:raster?'NOT TESTED':compare(expected.map(p=>p.identities),p.pages.map(p=>p.identities),true),text:compare(expected.map(p=>p.text),p.pages.every(p=>!p.text)?[]:p.pages.map(p=>p.text),raster||addition),imageContent:'NOT TESTED',vectorSemantics:raster?'EXPECTED CHANGE':'NOT TESTED',imageOperatorCounts:compare(expected.map(p=>p.imageOperators),p.pages.map(p=>p.imageOperators),raster),vectorOperatorCounts:compare(expected.map(p=>p.vectorPathOperators),p.pages.every(p=>!p.vectorPathOperators)?[]:p.pages.map(p=>p.vectorPathOperators),raster||addition),localNavigation:n?compare(indices.map(i=>(src.annotations[i]||[]).map(a=>[a.direct,a.local])),after.navigation.annotations.map(list=>list.map(a=>[a.direct,a.local])),selection||raster):'NOT TESTED',namedDestinations:n?compare(src.named,after.navigation.named,selection||slug==='merge-pdf'||raster):'NOT TESTED',outlines:n?compare(src.outlines,after.navigation.outlines,selection||raster):'NOT TESTED',externalRemoteLinks:n?compare(indices.map(i=>(src.annotations[i]||[]).filter(a=>a.uri||a.remote).map(a=>[a.uri,a.remote])),after.navigation.annotations.map(list=>list.filter(a=>a.uri||a.remote).map(a=>[a.uri,a.remote])),raster):'NOT TESTED',forms:form?compare(fieldValues(before.parser.fields),fieldValues(p.fields),raster):'NOT TESTED',metadata:compare(before.parser.metadata,p.metadata,true),geometry:p.boxes?compare(indices.map(i=>before.parser.boxes?.[i]),p.boxes,raster||slug==='rotate-pdf'):'NOT TESTED',visualFidelity:'NOT TESTED',interactiveTextSelection:'NOT TESTED',interactiveForms:'NOT TESTED',signatureValidity:'NOT TESTED',browserDownload:'NOT TESTED'};
}
// Fixed fixture contract: expected changes must satisfy an exact transformation.
// No new evidence is needed to validate these observations in historical outputs.
function assertTransformation(before,after,indices,slug,options={}){
 const rotationDelta=options.additionalDegrees??90;if(slug==='rotate-pdf')assert([90,180,270].includes(rotationDelta),'unsupported rotation request');
 const b=before.parser,a=after.parser,raster=slug==='pdf-to-grayscale';
 const wanted=slug==='merge-pdf'?[0,1,2,3]:slug==='reorder-pages'?[1,0,2]:slug==='delete-pages'?[0,2]:slug==='split-pdf'?indices:[0,1,2];
 if(slug==='split-pdf')assert(indices.length===1&&[0,1,2].includes(indices[0]),'invalid split selection');
 assert.deepEqual(indices,wanted,'wrong requested order');assert.equal(a.pageCount,wanted.length);assert.equal(a.pages.length,wanted.length);
 wanted.forEach((i,j)=>{const src=b.pages[i],out=a.pages[j];
 if(!raster)assert.deepEqual(out.identities,src.identities,'wrong logical page order');
 if(raster){assert.equal(out.text,'');assert.equal(out.annotations.length,0);assert.equal(out.vectorPathOperators,0);assert.equal(out.imageOperators,1);assert.equal(out.rotation,0);assert.deepEqual(out.physical,src.physical,'raster page size/order');
 assert.deepEqual(a.boxes[j],{media:{x:0,y:0,width:src.physical[0],height:src.physical[1]},crop:{x:0,y:0,width:src.physical[0],height:src.physical[1]},rotation:0});
 }else{
 const suffix=slug==='add-page-numbers'?String(j+1):slug==='watermark-pdf'?'CONFIDENTIAL':null;
 assert.equal(out.text,suffix?src.text+'||'+suffix:src.text,'required text/addition');
 assert.equal(out.imageOperators,src.imageOperators,'image operator loss');assert.equal(out.vectorPathOperators,src.vectorPathOperators,'vector operator change');
 const angle=slug==='rotate-pdf'?(src.rotation+rotationDelta)%360:src.rotation;assert.equal(out.rotation,angle,'incorrect rotation');
 const expected=structuredClone(b.boxes[i]);if(slug==='rotate-pdf')expected.rotation=(expected.rotation+rotationDelta)%360;
 if(a.boxes)assert.deepEqual(a.boxes[j],expected,'unexpected geometry');
 const physical=slug==='rotate-pdf'&&rotationDelta%180!==0?[src.physical[1],src.physical[0]]:src.physical;assert.deepEqual(out.physical,physical,'unexpected displayed dimensions');
 }
 });
 if(raster){assert(!a.fields||!Object.keys(a.fields).length);assert.equal(a.outlines.length,0);}
 if(after.navigation.status==='VERIFIED'&&!raster){verifyNavigation(after,wanted.map(i=>'PAGE_'+(i+1)),slug);}
}
function verifyNavigation(after,identities,slug){
 assert.equal(after.navigation.status,'VERIFIED');const n=after.navigation,retained=identities.filter(x=>x!=='PAGE_4');
 const expectedNames=retained.length+(retained.includes('PAGE_3')?1:0);assert.equal(n.named.length,expectedNames);
 assert.deepEqual(n.outlines.map(x=>x.target),['PAGE_1','PAGE_2','PAGE_3'].filter(x=>retained.includes(x)));
 assert.equal(n.openAction,slug==='merge-pdf'?null:retained.includes('PAGE_3')?'PAGE_3':null);
 for(let i=0;i<identities.length;i++){const annotations=n.annotations[i];if(identities[i]==='PAGE_4'){assert.equal(annotations.length,0);continue;}assert.equal(annotations.length,9);
 for(let target=0;target<3;target++){const id='PAGE_'+(target+1),wanted=retained.includes(id)?id:null;assert.equal(annotations[target*2].direct,wanted);assert.equal(annotations[target*2+1].local,wanted);}
 assert.equal(annotations[6].direct,retained.includes('PAGE_3')?'PAGE_3':null);assert.equal(annotations[7].uri,'https://example.com/');assert(annotations[8].remote);assert(annotations.every(a=>a.ownerMatches));}
}
async function collect(id){
 assert(/^preservation-[a-zA-Z0-9_-]+$/.test(id));const dir=path.join(root,base,id);fs.mkdirSync(dir);const write=(n,b)=>{assert(/^[\w.-]+$/.test(n));fs.writeFileSync(path.join(dir,n),b,{flag:'wx'});};
 const startedAt=new Date().toISOString();write('started.json',json({runId:id,startedAt,status:'STARTED',era:'POST_DESTINATION_REPAIR_PHASE_4'}));
 try {const rt=await legacy.runtime(),h=await harness(rt),fixtures1=await fixtures(),fixtures2=await fixtures();for(const name of Object.keys(fixtures1)){assert.equal(sha(fixtures1[name]),sha(fixtures2[name]));write(name+'.pdf',fixtures1[name]);}
 const sourceFiles=[...walk('lib'),...walk('components/hooks'),...walk('app/tools'),'tests/final-repair.test.cjs','scripts/lab/preservation.cjs','scripts/lab/preservation-postrepair.cjs','package-lock.json'];
 write('source-snapshots.json',json(Object.fromEntries(sourceFiles.map(p=>[p,read(p).toString('base64')]))));
 const before={};for(const name of Object.keys(fixtures1)){before[name]=await inspect(rt,h,fixtures1[name],{form:name==='form'});write(name+'.inspection.json',json(before[name]));}
 const records=[],expectations={ 'merge-pdf':'Append tail, namespace names and omit source OpenAction','split-pdf':'One output per page; remove omitted targets/names/bookmarks/OpenAction','reorder-pages':'Move page 2 before page 1; retain logical navigation identity','delete-pages':'Remove page 2 and its navigation targets; not secure sanitization','rotate-pdf':'Add 90 degrees to each page','add-page-numbers':'Add 1,2,3 at bottom center; 12pt','watermark-pdf':'Add CONFIDENTIAL at opacity 0.3; removable label, not security','compress-pdf':'Load/save with useObjectStreams:true; no guaranteed reduction','pdf-to-grayscale':'Render 1.5x, grayscale JPEG quality 0.9; rasterize semantics','protect-pdf':'AES-256 with public test password; local installed qpdf WASM','unlock-pdf':'Decrypt immediately preceding protected artifact with correct password'};
 for(const kind of ['navigation','form']){let protectedBytes,protectedName;
 for(const slug of slugs){const unsupported=kind==='form'&&copying.has(slug),input=slug==='unlock-pdf'?protectedBytes:fixtures1[kind];assert(input,'missing protect input');
 const record={runId:id,fixtureId:kind,operation:slug,expected:unsupported?'AcroForm explicitly unsupported by page-copy slice; no output expected':expectations[slug],options:{...({'reorder-pages':{order:[2,1,3]},'delete-pages':{remove:[2]},'split-pdf':{mode:'all'},'rotate-pdf':{additionalDegrees:90},'add-page-numbers':{start:1,position:'bottom-center',fontSize:12},'watermark-pdf':{text:'CONFIDENTIAL',opacity:0.3},'compress-pdf':{useObjectStreams:true},'pdf-to-grayscale':{scale:1.5,jpegQuality:0.9},'protect-pdf':{publicTestPassword:password},'unlock-pdf':{publicTestPassword:password}}[slug]||{})},inputs:[{path:slug==='unlock-pdf'?protectedName:kind+'.pdf',sha256:sha(input),bytes:input.length}],outputs:[],status:'NOT TESTED'};
 if(slug==='merge-pdf')record.inputs.push({path:'tail.pdf',sha256:sha(fixtures1.tail),bytes:fixtures1.tail.length});
 if(slug==='pdf-to-grayscale'&&!rt.canvas){record.blocker='Node canvas unavailable';records.push(record);continue;}
 const t=h.tool(slug,{documentOverride:{createElement:()=>rt.canvas.createCanvas(1,1)}});await t.upload(slug==='merge-pdf'?[h.file(kind+'.pdf',input),h.file('tail.pdf',fixtures1.tail)]:[h.file(kind+'.pdf',input)]);
 if(slug==='reorder-pages'){await t.find(n=>n.props['aria-label']==='Move page 2 up').props.onClick();t.render();}if(slug==='delete-pages'){await t.find(n=>n.props['aria-label']==='Page 2').props.onClick();t.render();}
 if(slug==='protect-pdf'){t.change('password',password,0);t.change('password',password,1);}if(slug==='unlock-pdf')t.change('password',password);
 const buttons={'merge-pdf':/Merge 2 PDFs/,'split-pdf':/Split PDF/,'reorder-pages':/Save New Order/,'rotate-pdf':/Rotate 90/,'delete-pages':/Delete.*Page/,'add-page-numbers':/Add Page Numbers/,'watermark-pdf':/Add Watermark/,'pdf-to-grayscale':/Convert to Grayscale/,'protect-pdf':/Protect PDF/,'unlock-pdf':/Unlock PDF/};if(slug!=='compress-pdf')await t.click(buttons[slug]);
 const outputs=t.nodes().filter(n=>typeof n.type==='string'&&n.type.endsWith('/DownloadButton'));record.handlerText=t.text();record.alerts=t.alerts;
 if(unsupported){assert(!outputs.length,'unsupported AcroForm produced output');assert(/AcroForm|linked annotation|unsupported/i.test(t.text()+' '+t.alerts.join(' ')));record.status='UNSUPPORTED';records.push(record);write(kind+'-'+slug+'.result.json',json(record));t.unmount();continue;}
 assert(outputs.length,'No output from '+slug+': '+t.text());
 for(let j=0;j<outputs.length;j++){const bytes=Buffer.from(await t.objects.get(outputs[j].props.url).arrayBuffer()),name=kind+'-'+slug+'-'+(j+1)+'.pdf';write(name,bytes);if(slug==='protect-pdf'){protectedBytes=bytes;protectedName=name;}
 const after=await inspect(rt,h,bytes,{encrypted:slug==='protect-pdf',form:kind==='form'}),inspection=name.replace('.pdf','.inspection.json');write(inspection,json(after));
 const indices=slug==='split-pdf'?[j]:slug==='reorder-pages'?[1,0,2]:slug==='delete-pages'?[0,2]:slug==='merge-pdf'?[0,1,2,3]:[0,1,2],reference=slug==='merge-pdf'?{...before[kind],parser:{...before[kind].parser,pages:[...before[kind].parser.pages,...before.tail.parser.pages],boxes:[...before[kind].parser.boxes,...before.tail.parser.boxes]}}:before[kind];
 assert.equal(after.parser.pageCount,indices.length);const identities=indices.map(i=>'PAGE_'+(i+1));
 if(slug!=='pdf-to-grayscale')assert.deepEqual(after.parser.pages.map(p=>p.identities[0]),identities,'Unexpected logical page order');
 if(copying.has(slug)){assert.deepEqual(after.parser.boxes,indices.map(i=>reference.parser.boxes[i]));verifyNavigation(after,identities,slug);}
 if(slug==='rotate-pdf')assert.deepEqual(after.parser.pages.map(p=>p.rotation),before[kind].parser.pages.map(p=>(p.rotation+90)%360));
 if(slug==='pdf-to-grayscale'){assert(after.parser.pages.every(p=>!p.text&&!p.annotations.length));assert.deepEqual(after.parser.pages.map(p=>p.physical),before[kind].parser.pages.map(p=>p.physical));}
 const featureMatrix=matrix(reference,after,indices,slug,kind==='form');assert(!Object.values(featureMatrix).includes('FAILURE'),'Unexpected feature change: '+JSON.stringify(featureMatrix));
record.outputs.push({path:name,sha256:sha(bytes),bytes:bytes.length,inspection,inspectionSha256:sha(read(base+'/'+id+'/'+inspection)),pageCount:after.parser.pageCount,indices,matrix:featureMatrix});
 }record.status='MEASURED';records.push(record);write(kind+'-'+slug+'.result.json',json(record));t.unmount();}
 }
 const manifest={schemaVersion:1,runId:id,status:'COMPLETE',era:'POST_DESTINATION_REPAIR_PHASE_4',publicationStatus:'INTERNAL — NOT READY FOR PUBLICATION',startedAt,completedAt:new Date().toISOString(),gitHead:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),sourceHashes:Object.fromEntries(sourceFiles.map(p=>[p,sha(read(p))])),environment:{node:process.version,os:os.type(),release:os.release(),pdfLib:require('pdf-lib/package.json').version,pdfjs:rt.pdfjs.version,qpdfWasm:require('@neslinesli93/qpdf-wasm/package.json').version,canvas:rt.canvas?require(path.join(rt.canvasPath,'package.json')).version:null,browser:'NOT TESTED'},provenance:'Deterministic locally generated synthetic fixtures; no private documents. navigation removes the form from the legacy generator and adds supported direct/local/named/remote navigation. form retains controlled AcroForm. Neither fixture is real-world evidence.',limitations:['Actual production handler code executed in a Node simulated React/URL harness; no browser/download claim','PDF.js inspection is independent parsing, not interactive selection or visual fidelity','Grayscale uses Node canvas and local worker/fonts; no actual browser/CDN test','qpdf uses installed local WASM; CDN loading NOT TESTED','Signatures, interactive forms, visual review and browser behavior NOT TESTED','Image operator counts do not prove pixel preservation; vector operator counts do not prove vector equivalence','Encryption salts and tool metadata timestamps can vary across repetitions; retained artifacts immutable','AcroForm page-copy rejection is expected UNSUPPORTED, not a preservation defect'],records,artifactHashes:Object.fromEntries(fs.readdirSync(dir).map(n=>[n,sha(fs.readFileSync(path.join(dir,n)))]))};write('manifest.json',json(manifest));console.log(json({runId:id,records:records.map(r=>({fixture:r.fixtureId,operation:r.operation,status:r.status,outputs:r.outputs.length})),manifestHash:sha(read(base+'/'+id+'/manifest.json'))}));return manifest;
 }catch(e){write('failure.json',json({runId:id,status:'INCOMPLETE',failedAt:new Date().toISOString(),error:e.stack}));throw e;}
}
module.exports={collect,harness,fixtures,inspect,verifyNavigation,matrix,base,assertTransformation};
if(require.main===module){assert(process.argv.length===4&&process.argv[2]==='--run-id');collect(process.argv[3]).catch(e=>{console.error(e);process.exitCode=1;});}
