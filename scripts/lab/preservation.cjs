// Internal Node preservation study. No app edits, browser claims or publication.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),os=require('node:os'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..'),lib=require('pdf-lib');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFileSync(path.join(root,p));
const json=x=>JSON.stringify(x,null,2)+'\n';
const base='tests/evidence/preservation/runs';
const slugs=['merge-pdf','split-pdf','reorder-pages','rotate-pdf','delete-pages','add-page-numbers','watermark-pdf','compress-pdf','pdf-to-grayscale','protect-pdf','unlock-pdf'];
const password='PublicSynthetic7E!';
async function runtime() {
 const canvasPath=path.join(os.tmpdir(),'pdfcraft-7c-render/node_modules/@napi-rs/canvas');
 let canvas=null;try{canvas=require(canvasPath);global.DOMMatrix=canvas.DOMMatrix;global.Path2D=canvas.Path2D;global.ImageData=canvas.ImageData;}catch{}
 const pdfjs=await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
 class Factory {create(w,h){const c=canvas.createCanvas(w,h);return {canvas:c,context:c.getContext('2d')};}reset(o,w,h){o.canvas.width=w;o.canvas.height=h;}destroy(o){o.canvas.width=o.canvas.height=0;}}
 const adapter={...pdfjs,GlobalWorkerOptions:{},getDocument:opts=>pdfjs.getDocument({...opts,canvasFactory:canvas?new Factory():undefined,standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/')+path.sep})};
 return {pdfjs,adapter,canvas,canvasPath};
}
async function harness(rt) {
 const source=read('tests/final-repair.test.cjs').toString();
 assert(source.includes('(async()=>{'));
 const prefix=source.slice(0,source.indexOf('(async()=>{'));
 const boot=`\nmodule.exports=async function(rt){pdfjs=rt.adapter;qfactory=()=>req('@neslinesli93/qpdf-wasm')({noInitialRun:true,wasmBinary:fs.readFileSync(root+'/node_modules/@neslinesli93/qpdf-wasm/dist/qpdf.wasm'),print:()=>{},printErr:()=>{}});for(const p of [...walk('lib').filter(p=>p.endsWith('.js')),...walk('components/hooks'),...walk('app/tools').filter(p=>p.endsWith('/page.js'))])compiled[p]=(await swc.transform(read(p),{filename:p,jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'classic'}},target:'es2022'},module:{type:'commonjs'}})).code;return {tool,file};};`;
 const m={exports:{}};vm.compileFunction(prefix+boot,['require','module','exports','__dirname'])(createRequire(path.join(root,'tests/final-repair.test.cjs')),m,m.exports,path.join(root,'tests'));return m.exports(rt);
}
async function fixtures() {
 const d=await lib.PDFDocument.create();d.setCreationDate(new Date('2020-01-01Z'));d.setModificationDate(new Date('2020-01-01Z'));d.setTitle('Synthetic preservation fixture');d.setAuthor('Synthetic fixture generator');d.setCreator('PDFcraft internal fixture');d.setProducer('pdf-lib controlled fixture');
 const font=await d.embedFont(lib.StandardFonts.Helvetica),image=await d.embedPng(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY9sAAAAASUVORK5CYII=','base64'));
 const pages=[[400,500],[500,400],[450,550]].map((size,i)=>{const p=d.addPage(size);p.drawText('PAGE_'+(i+1)+' selectable text',{x:50,y:250,size:16,font});p.drawRectangle({x:50,y:100,width:70,height:40,color:lib.rgb(.2,.4,.8)});p.drawImage(image,{x:150,y:100,width:40,height:40});return p;});
 pages[1].setCropBox(20,30,450,340);pages[1].setRotation(lib.degrees(90));
 const ann=(page,obj)=>{let a=page.node.Annots();if(!a){a=d.context.obj([]);page.node.set(lib.PDFName.of('Annots'),a);}a.push(d.context.register(d.context.obj(obj)));};
 ann(pages[0],{Type:'Annot',Subtype:'Link',Rect:[50,270,200,290],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:lib.PDFString.of('https://example.com/')}});
 ann(pages[0],{Type:'Annot',Subtype:'Link',Rect:[50,300,200,320],Border:[0,0,0],Dest:[pages[2].ref,'Fit']});
 const form=d.getForm(),field=form.createTextField('controlled_name');field.setText('Synthetic Alice');field.addToPage(pages[0],{x:50,y:350,width:200,height:30});form.updateFieldAppearances(font);
 const outline=d.context.register(d.context.obj({Type:'Outlines'})),item=d.context.register(d.context.obj({Title:lib.PDFString.of('Third page'),Parent:outline,Dest:[pages[2].ref,'Fit']}));
 d.context.lookup(outline).set(lib.PDFName.of('First'),item);d.context.lookup(outline).set(lib.PDFName.of('Last'),item);d.context.lookup(outline).set(lib.PDFName.of('Count'),lib.PDFNumber.of(1));d.catalog.set(lib.PDFName.of('Outlines'),outline);
 const tail=await lib.PDFDocument.create();tail.setCreationDate(new Date('2020-01-01Z'));tail.setModificationDate(new Date('2020-01-01Z'));tail.addPage([400,500]).drawText('PAGE_4 merge tail',{x:50,y:250});
 return {feature:Buffer.from(await d.save()),tail:Buffer.from(await tail.save())};
}
async function inspect(rt,bytes,pw) {
 const task=rt.adapter.getDocument({data:new Uint8Array(bytes),password:pw});
 try {
 const doc=await task.promise;
 const dest=async v=>{if(typeof v==='string')v=await doc.getDestination(v);if(!v)return null;try{return {page:typeof v[0]==='number'?v[0]+1:await doc.getPageIndex(v[0])+1,fit:v[1]?.name};}catch{return {page:null,unresolved:true};}};
 const outline=async list=>Promise.all((list||[]).map(async x=>({title:x.title,destination:await dest(x.dest),children:await outline(x.items)})));
 const pages=[];
 for(let n=1;n<=doc.numPages;n++){const p=await doc.getPage(n),text=(await p.getTextContent()).items.filter(x=>'str'in x).map(x=>x.str).join('|'),ops=await p.getOperatorList(),a=await p.getAnnotations();
 pages.push({page:n,text,identities:text.match(/PAGE_[1-4]/g)||[],viewBox:p.view,rotation:p.rotate,physical:[p.getViewport({scale:p.userUnit}).width,p.getViewport({scale:p.userUnit}).height],annotations:await Promise.all(a.map(async x=>({subtype:x.subtype,url:x.url||null,destination:await dest(x.dest),fieldName:x.fieldName||null,fieldValue:x.fieldValue??null}))),imageOperators:ops.fnArray.filter(x=>[rt.pdfjs.OPS.paintImageXObject,rt.pdfjs.OPS.paintInlineImageXObject].includes(x)).length,vectorPathOperators:ops.fnArray.filter(x=>x===rt.pdfjs.OPS.constructPath).length});}
 let boxes=null;if(!pw){const raw=await lib.PDFDocument.load(bytes,{updateMetadata:false});boxes=raw.getPages().map(p=>({media:p.getMediaBox(),crop:p.getCropBox(),rotation:p.getRotation().angle}));}
 return {opens:true,pageCount:doc.numPages,pages,boxes,fields:await doc.getFieldObjects(),outlines:await outline(await doc.getOutline()),metadata:(await doc.getMetadata()).info};
 }finally{await task.destroy();}
}
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function compare(before,after,indices,operation){
 const wanted=indices.map(i=>before.pages[i]),status=(a,b)=>equal(a,b)?'PASS':(!b||Array.isArray(b)&&b.length===0)?'LOST':'CHANGED';
 const annotations=p=>p.map(x=>x.annotations),links=p=>p.flatMap(x=>x.annotations.filter(a=>a.subtype==='Link'));
 return {pageOrder:equal(wanted.map(p=>p.identities),after.pages.map(p=>p.identities))?'PASS':operation==='pdf-to-grayscale'?'NOT TESTED':'CHANGED',text:status(wanted.map(p=>p.text),after.pages.every(p=>!p.text)?[]:after.pages.map(p=>p.text)),links:status(links(wanted),links(after.pages)),annotations:status(annotations(wanted),annotations(after.pages)),forms:status(before.fields,after.fields),outlines:status(before.outlines,after.outlines),metadata:status(before.metadata,after.metadata),geometry:status(wanted.map(p=>[p.viewBox,p.rotation,p.physical]),after.pages.map(p=>[p.viewBox,p.rotation,p.physical])),imageOperators:status(wanted.map(p=>p.imageOperators),after.pages.map(p=>p.imageOperators)),vectorOperators:status(wanted.map(p=>p.vectorPathOperators),after.pages.every(p=>!p.vectorPathOperators)?[]:after.pages.map(p=>p.vectorPathOperators)),visualFidelity:'NOT TESTED',interactiveTextSelection:'NOT TESTED',interactiveForms:'NOT TESTED',signatureValidity:'NOT TESTED'};
}
async function collect(id){
 assert(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id),'unsafe run ID');
 const dir=path.join(root,base,id);fs.mkdirSync(path.dirname(dir),{recursive:true});fs.mkdirSync(dir);
 const write=(n,b)=>{assert(/^[\w.-]+$/.test(n));fs.writeFileSync(path.join(dir,n),b,{flag:'wx'});};
 const startedAt=new Date().toISOString();write('started.json',json({id,startedAt,status:'STARTED'}));
 try{
 const rt=await runtime(),h=await harness(rt),f=await fixtures(),again=await fixtures();assert.equal(sha(f.feature),sha(again.feature));assert.equal(sha(f.tail),sha(again.tail));
 write('feature.pdf',f.feature);write('tail.pdf',f.tail);write('collector.cjs',fs.readFileSync(__filename));write('harness-source.cjs',read('tests/final-repair.test.cjs'));
 const files=cp.execFileSync('git',['ls-files','app/tools','lib','components/hooks','package-lock.json'],{cwd:root,encoding:'utf8'}).trim().split('\n');
 const sources=Object.fromEntries(files.map(p=>[p,read(p).toString('base64')]));write('source-snapshots.json',json(sources));
 const before=await inspect(rt,f.feature),tail=await inspect(rt,f.tail);write('feature.inspection.json',json(before));write('tail.inspection.json',json(tail));
 const results=[];let protectedBytes;
 for(const slug of slugs){
 const options={};let expected='Retain selected page content; document features may change on rewriting.',indices=[0,1,2],input=f.feature,inputNames=['feature.pdf'];
 if(slug==='merge-pdf'){indices=[0,1,2,3];inputNames.push('tail.pdf');expected='Append tail after pages 1,2,3; copyPages may lose document-level features.';}
 if(slug==='split-pdf')expected='Default all mode: three separate one-page outputs; document-level features may be lost.';
 if(slug==='reorder-pages'){indices=[1,0,2];options.order=[2,1,3];expected='Move page 2 up; copyPages may lose document-level features.';}
 if(slug==='rotate-pdf'){options.additionalDegrees=90;expected='Add 90 degrees to every page rotation.';}
 if(slug==='delete-pages'){indices=[0,2];options.deletePages=[2];expected='Remove page 2 from visible page tree; not sanitization.';}
 if(slug==='add-page-numbers'){Object.assign(options,{start:1,position:'bottom-center',fontSize:12});expected='Add page-number text 1,2,3; original text remains.';}
 if(slug==='watermark-pdf'){Object.assign(options,{text:'CONFIDENTIAL',opacity:.3});expected='Add removable visible text; not a security mechanism.';}
 if(slug==='compress-pdf'){options.useObjectStreams=true;expected='Load/save using object streams; no guaranteed reduction or feature preservation.';}
 if(slug==='pdf-to-grayscale'){expected='Rasterize visible pages to grayscale JPEG PDF; text, links, forms and outlines intentionally lost.';Object.assign(options,{scale:1.5,jpegQuality:.9});}
 if(slug==='protect-pdf'){options.password=password;expected='AES-256, same user/owner password; print/extract allowed.';}
 if(slug==='unlock-pdf'){input=protectedBytes;inputNames=['protect-pdf-1.pdf'];options.password=password;expected='Decrypt previous protected output with supplied password.';}
 const record={operation:slug,fixtureId:'synthetic-features-v1',options,expected,inputs:inputNames.map(name=>({name,sha256:sha(fs.readFileSync(path.join(dir,name)))})),outputs:[],status:'NOT TESTED',limitations:['Node source-handler with simulated React/URL; no browser/download test','Parser/operator observations are not visual or interactive preservation','No valid signed fixture; signatures NOT TESTED']};
 if(slug==='pdf-to-grayscale'&&!rt.canvas){record.blocker='Local canvas runtime unavailable';results.push(record);continue;}
 const t=h.tool(slug,{documentOverride:{createElement:()=>rt.canvas.createCanvas(1,1)}});
 await t.upload(slug==='merge-pdf'?[h.file('features.pdf',input),h.file('tail.pdf',f.tail)]:[h.file('features.pdf',input)]);
 if(slug==='reorder-pages'){await t.find(n=>n.props['aria-label']==='Move page 2 up').props.onClick();t.render();}
 if(slug==='delete-pages'){await t.find(n=>n.props['aria-label']==='Page 2').props.onClick();t.render();}
 if(slug==='protect-pdf'){t.change('password',password,0);t.change('password',password,1);}
 if(slug==='unlock-pdf')t.change('password',password);
 const buttons={'merge-pdf':/Merge 2 PDFs/,'split-pdf':/Split PDF/,'reorder-pages':/Save New Order/,'rotate-pdf':/Rotate 90/,'delete-pages':/Delete.*Page/,'add-page-numbers':/Add Page Numbers/,'watermark-pdf':/Add Watermark/,'pdf-to-grayscale':/Convert to Grayscale/,'protect-pdf':/Protect PDF/,'unlock-pdf':/Unlock PDF/};
 if(slug!=='compress-pdf')await t.click(buttons[slug]);
 const nodes=t.nodes().filter(n=>typeof n.type==='string'&&n.type.endsWith('/DownloadButton'));
 record.alerts=t.alerts;record.handlerText=t.text();
 if(!nodes.length)throw Error('No output from '+slug+': '+t.text());
 for(let j=0;j<nodes.length;j++){
 const bytes=Buffer.from(await t.objects.get(nodes[j].props.url).arrayBuffer()),name=slug+'-'+(j+1)+'.pdf';write(name,bytes);if(slug==='protect-pdf')protectedBytes=bytes;
 const after=await inspect(rt,bytes,slug==='protect-pdf'?password:undefined),inspection=slug+'-'+(j+1)+'.inspection.json';write(inspection,json(after));
 const reference=slug==='merge-pdf'?{...before,pages:[...before.pages,...tail.pages]}:before;
 const selected=slug==='split-pdf'?[j]:indices;
 record.outputs.push({name,sha256:sha(bytes),bytes:bytes.length,inspection,inspectionSha256:sha(read(base+'/'+id+'/'+inspection)),pageCount:after.pageCount,comparison:compare(reference,after,selected,slug)});
 // Stop on a core page-count regression, independently of feature loss.
 assert.equal(after.pageCount,selected.length,'Unexpected page count: '+slug);
 }
 record.status='MEASURED';results.push(record);t.unmount();write(slug+'.result.json',json(record));
 }
 const manifest={schemaVersion:1,study:'document-preservation',runId:id,status:'COMPLETE',publicationStatus:'INTERNAL â€” NOT READY FOR PUBLICATION',startedAt,completedAt:new Date().toISOString(),gitHead:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),sourceHashes:Object.fromEntries(files.map(p=>[p,sha(read(p))])),environment:{node:process.version,os:os.type(),release:os.release(),pdfLib:require('pdf-lib/package.json').version,pdfjs:rt.pdfjs.version,qpdf:'0.3.0',canvas:rt.canvas?require(path.join(rt.canvasPath,'package.json')).version:null,browser:'NOT TESTED'},provenance:'Two deterministic locally generated synthetic PDFs; no private documents. Fixed fixture metadata date is not collection date.',fixtureFeatures:['text extraction markers','embedded synthetic PNG','vector rectangle','external URI link','direct internal destination','AcroForm text field and widget appearance','outline','metadata','rotation','crop/media boxes','different page sizes'],fixtureHashes:{'feature.pdf':sha(f.feature),'tail.pdf':sha(f.tail)},results,limitations:['Single controlled synthetic fixture plus merge tail; not universal compatibility','All browser/interactive selection/forms/signatures/visual fidelity NOT TESTED','Grayscale uses Node canvas adapter and local PDF.js worker; not actual browser','QPDF uses installed local WASM instead of production CDN loading','Encryption salt and modification metadata prevent byte-identical output regeneration; exact artifacts retained'],artifactHashes:Object.fromEntries(fs.readdirSync(dir).map(n=>[n,sha(fs.readFileSync(path.join(dir,n)))]))};
 write('manifest.json',json(manifest));console.log(json({runId:id,manifest:base+'/'+id+'/manifest.json',manifestSha256:sha(fs.readFileSync(path.join(dir,'manifest.json'))),matrix:results.map(r=>({operation:r.operation,status:r.status,results:r.outputs.map(o=>o.comparison)}))}));
 }catch(e){write('failure.json',json({runId:id,status:'INCOMPLETE',error:e.stack,failedAt:new Date().toISOString()}));throw e;}
}
module.exports={inspect,runtime,fixtures,compare,collect,sha};
if(require.main===module){assert(process.argv.length===4&&process.argv[2]==='--run-id');collect(process.argv[3]).catch(e=>{console.error(e);process.exitCode=1;});}
