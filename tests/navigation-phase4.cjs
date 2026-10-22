// Controlled in-memory page-selection fixtures; no Lab artifacts are modified.
const assert = require('node:assert/strict');
const { PDFDocument, PDFName:N, PDFString:S, PDFArray, degrees } = require('pdf-lib');
const k=N.of,get=(d,o,n)=>d.context.lookup(o.get(k(n))),reopen=async d=>PDFDocument.load(await d.save(),{updateMetadata:false});
module.exports=async({test,select,validateNavigation,pageGeometry})=>{
  async function fixture(){
    const d=await PDFDocument.create();d.setTitle('Selection source');d.setAuthor('Controlled fixture');
    for(let i=0;i<3;i++){const p=d.addPage([300+i*20,500+i*30]);p.setCropBox(5,10,280+i*20,470+i*30);p.setRotation(degrees(i*90));p.node.set(k('Identity'),S.of('page'+i));}
    const dest=i=>[d.getPage(i).ref,'XYZ',null,80,null];
    d.catalog.set(k('Dests'),d.context.obj(Object.fromEntries([0,1,2].map(i=>['n'+i,dest(i)]))));
    d.catalog.set(k('Names'),d.context.obj({Dests:{Names:[S.of('s0'),dest(0),S.of('s1'),dest(1),S.of('s2'),dest(2)]}}));
    for(const p of d.getPages()){
      const ann=[];for(let i=0;i<3;i++)for(const kind of ['direct','name','string'])ann.push(d.context.register(d.context.obj({Subtype:'Link',Rect:[0,0,10,10],P:p.ref,...(kind==='direct'?{Dest:dest(i)}:{A:{S:'GoTo',D:kind==='name'?N.of('n'+i):S.of('s'+i)}})})));
      ann.push(d.context.register(d.context.obj({Subtype:'Link',Rect:[0,0,10,10],P:p.ref,A:{S:'GoToR',F:S.of('remote.pdf'),D:[2,'Fit']},AA:{E:{S:'GoTo',D:N.of('n2')}}})));
      p.node.set(k('Annots'),d.context.obj(ann));
    }
    const root=d.context.obj({Type:'Outlines',Count:4}),rr=d.context.register(root),nodes=[0,1,2].map(i=>{const dict=d.context.obj({Title:S.of('target'+i),Parent:rr,Dest:N.of('n'+i)});return{dict,ref:d.context.register(dict)};});
    nodes.forEach((x,i)=>{if(i)x.dict.set(k('Prev'),nodes[i-1].ref);if(i<2)x.dict.set(k('Next'),nodes[i+1].ref);});root.set(k('First'),nodes[0].ref);root.set(k('Last'),nodes[2].ref);
    const child=d.context.register(d.context.obj({Title:S.of('child2'),Parent:nodes[0].ref,Dest:N.of('n2')}));nodes[0].dict.set(k('First'),child);nodes[0].dict.set(k('Last'),child);nodes[0].dict.set(k('Count'),d.context.obj(1));d.catalog.set(k('Outlines'),rr);
    d.catalog.set(k('OpenAction'),d.context.obj(dest(2)));return reopen(d);
  }
  function resolve(d,raw){const a=d.context.lookup(raw);if(a instanceof PDFArray)return a;if(a instanceof N)return get(d,d.catalog,'Dests').lookup(a);const pairs=get(d,get(d,get(d,d.catalog,'Names'),'Dests'),'Names');for(let i=0;i<pairs.size();i+=2)if(Buffer.from(pairs.get(i).asBytes()).equals(Buffer.from(a.asBytes())))return d.context.lookup(pairs.get(i+1));assert.fail('dangling name');}
  async function verify(source,order,bytes){const out=await PDFDocument.load(bytes||await select(source,order),{updateMetadata:false});validateNavigation(out,order.map(i=>pageGeometry(source.getPage(i))));assert.equal(out.getTitle(),source.getTitle());assert.equal(out.getAuthor(),source.getAuthor());
    const target=(raw,i)=>{const a=resolve(out,raw);assert.equal(a.get(0).toString(),out.getPage(order.indexOf(i)).ref.toString());assert.deepEqual(a.asArray().slice(1).map(x=>x.toString()),['/XYZ','null','80','null']);};
    order.forEach((original,pos)=>{const p=out.getPage(pos);assert.equal(get(out,p.node,'Identity').decodeText(),'page'+original);const ann=get(out,p.node,'Annots');assert.equal(ann.size(),10);
      for(let i=0;i<3;i++)for(let j=0;j<3;j++){const a=out.context.lookup(ann.get(i*3+j));assert.equal(a.get(k('P')).toString(),p.ref.toString());const raw=j?get(out,a,'A')?.get(k('D')):a.get(k('Dest'));if(order.includes(i)){assert(raw);target(raw,i);}else{assert(!a.has(k('Dest')));assert(!a.has(k('A')));}}
      const remote=out.context.lookup(ann.get(9));assert.equal(get(out,remote,'A').toString(),get(source,source.context.lookup(get(source,source.getPage(original).node,'Annots').get(9)),'A').toString());
      if(order.includes(2))target(get(out,get(out,remote,'AA'),'E').get(k('D')),2);else assert(!remote.has(k('AA')));
    });
    assert.equal(get(out,out.catalog,'Dests').keys().length,order.length);const pairs=get(out,get(out,get(out,out.catalog,'Names'),'Dests'),'Names');assert.equal(pairs.size(),order.length*2);
    for(let i=0;i<3;i++)assert.equal(get(out,out.catalog,'Dests').has(k('n'+i)),order.includes(i));
    if(order.includes(2))target(out.catalog.get(k('OpenAction')),2);else assert(!out.catalog.has(k('OpenAction')));
    const root=get(out,out.catalog,'Outlines'),titles=[];let ref=root.get(k('First')),previous,visible=0;
    while(ref){const node=out.context.lookup(ref);assert.equal(node.get(k('Parent')).toString(),out.catalog.get(k('Outlines')).toString());assert.equal(node.get(k('Prev'))?.toString(),previous?.toString());const title=get(out,node,'Title').decodeText();titles.push(title);visible++;
      const index=Number(title.slice(-1));if(order.includes(index))target(node.get(k('Dest')),index);else assert(!node.has(k('Dest')));
      if(node.has(k('First'))){assert(order.includes(2));const child=get(out,node,'First');target(child.get(k('Dest')),2);assert.equal(child.get(k('Parent')).toString(),ref.toString());assert.equal(node.get(k('First')).toString(),node.get(k('Last')).toString());assert.equal(get(out,node,'Count').asNumber(),1);visible++;}
      previous=ref;ref=node.get(k('Next'));
    }assert.equal(root.get(k('Last')).toString(),previous.toString());assert.equal(get(out,root,'Count').asNumber(),visible);
    assert.deepEqual(titles,[...(order.includes(0)||order.includes(2)?['target0']:[]),...(order.includes(1)?['target1']:[]),...(order.includes(2)?['target2']:[])]);return out;
  }
  for(const order of [[0],[1],[2],[0,1],[1,2],[0,2],[2,0]])await test('Phase 4 Split/Delete selected '+order+' retains only valid navigation after reopen',async()=>verify(await fixture(),order));
  for(const kind of ['local','remote'])await test('Phase 4 '+kind+' OpenAction retained/omitted policy',async()=>{
    const d=await fixture();d.catalog.set(k('OpenAction'),d.context.obj(kind==='local'?{S:'GoTo',D:N.of('n2')}:{S:'GoToR',F:S.of('remote.pdf'),D:[2,'Fit']}));const source=await reopen(d);
    for(const order of [[0],[2]]){const out=await PDFDocument.load(await select(source,order));validateNavigation(out);if(kind==='remote')assert.equal(get(out,out.catalog,'OpenAction').toString(),get(source,source.catalog,'OpenAction').toString());else if(order.includes(2))assert.equal(resolve(out,get(out,out.catalog,'OpenAction').get(k('D'))).get(0).toString(),out.getPage(0).ref.toString());else assert(!out.catalog.has(k('OpenAction')));}
  });
  await test('Phase 4 empty, duplicate and invalid selections rejected',async()=>{const d=await fixture();for(const order of [[],[0,0],[-1],[3]])await assert.rejects(()=>select(d,order),/unique valid indices/);});
  await test('Phase 4 omitted chain fails but fully retained chain survives',async()=>{
    const d=await fixture(),a=d.context.lookup(get(d,d.getPage(0).node,'Annots').get(1)),action=get(d,a,'A');action.set(k('Next'),d.context.obj({S:'GoTo',D:N.of('n2')}));const src=await reopen(d);
    await assert.rejects(()=>select(src,[0]),/action chain targets an omitted page/);const out=await PDFDocument.load(await select(src,[0,2]));validateNavigation(out);const root=get(out,out.context.lookup(get(out,out.getPage(0).node,'Annots').get(1)),'A');assert.equal(resolve(out,get(out,root,'Next').get(k('D'))).get(0).toString(),out.getPage(1).ref.toString());
  });
  await test('Phase 4 malformed/cyclic source rejected even if annotation page is omitted',async()=>{
    const d=await fixture(),a=d.context.lookup(get(d,d.getPage(2).node,'Annots').get(1)),action=get(d,a,'A');action.set(k('Next'),d.context.register(action));const src=await reopen(d);await assert.rejects(()=>select(src,[0]),/cyclic/);
  });
  await test('Phase 4 orphaned-target outline containers are pruned; collapsed counts recomputed',async()=>{
    const d=await fixture(),root=get(d,d.catalog,'Outlines'),parent=get(d,root,'First');parent.delete(k('Dest'));parent.set(k('Count'),d.context.obj(-1));root.set(k('Count'),d.context.obj(3));const src=await reopen(d);
    const middle=await PDFDocument.load(await select(src,[1]));validateNavigation(middle);assert.equal(get(middle,get(middle,get(middle,middle.catalog,'Outlines'),'First'),'Title').decodeText(),'target1');
    const last=await PDFDocument.load(await select(src,[2]));validateNavigation(last);assert.equal(get(last,get(last,get(last,last.catalog,'Outlines'),'First'),'Count').asNumber(),-1);
  });
  await test('Phase 4 ordinary one-page output without navigation',async()=>{const d=await PDFDocument.create();d.addPage();d.addPage();const out=await PDFDocument.load(await select(d,[1]));validateNavigation(out);assert.equal(out.getPageCount(),1);});
  await test('Phase 4 all dead name trees/outlines/OpenAction are omitted and remote outline survives',async()=>{
    const d=await PDFDocument.create();d.addPage();d.addPage();const dest=[d.getPage(0).ref,'Fit'];d.catalog.set(k('Dests'),d.context.obj({dead:dest}));d.catalog.set(k('Names'),d.context.obj({Dests:{Names:[S.of('dead'),dest]}}));d.catalog.set(k('OpenAction'),d.context.obj(dest));
    const root=d.context.obj({Type:'Outlines',Count:1}),rr=d.context.register(root),item=d.context.obj({Title:S.of('dead'),Parent:rr,Dest:N.of('dead')}),ir=d.context.register(item);root.set(k('First'),ir);root.set(k('Last'),ir);d.catalog.set(k('Outlines'),rr);
    const out=await PDFDocument.load(await select(await reopen(d),[1]));validateNavigation(out);for(const n of ['Dests','Names','Outlines','OpenAction'])assert(!out.catalog.has(k(n)));
    item.delete(k('Dest'));item.set(k('A'),d.context.obj({S:'GoToR',F:S.of('remote.pdf'),D:S.of('dead')}));
    const remoteOut=await PDFDocument.load(await select(await reopen(d),[1]));validateNavigation(remoteOut);assert.equal(get(remoteOut,get(remoteOut,get(remoteOut,remoteOut.catalog,'Outlines'),'First'),'A').toString(),get(d,item,'A').toString());
  });
  await test('Phase 4 selected output validator rejects injected detached target and ownership',async()=>{
    const source=await fixture(),bytes=await select(source,[1]);
    for(const field of ['Dest','P']){const out=await PDFDocument.load(bytes),a=out.context.lookup(get(out,out.getPage(0).node,'Annots').get(3)),detached=out.context.register(out.getPage(0).node.clone());a.set(k(field),field==='Dest'?out.context.obj([detached,'Fit']):detached);const bad=await reopen(out);assert.throws(()=>validateNavigation(bad),/detached|owning page/);}
  });
  await test('Phase 4 document information and XMP bytes survive selection',async()=>{
    const d=await PDFDocument.create();d.addPage();d.addPage();d.setTitle('Info preserved');const raw=Buffer.from('<?xpacket begin=""?><metadata>controlled</metadata><?xpacket end="w"?>');d.catalog.set(k('Metadata'),d.context.register(d.context.stream(raw,{Type:'Metadata',Subtype:'XML'})));const source=await reopen(d),out=await PDFDocument.load(await select(source,[1]),{updateMetadata:false});validateNavigation(out);assert.equal(out.getTitle(),'Info preserved');assert.deepEqual(Buffer.from(get(out,out.catalog,'Metadata').contents),raw);
  });
  return {fixture,verify};
};
