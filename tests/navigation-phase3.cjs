// Controlled, in-memory outline fixtures. No preservation/Lab run is collected.
const assert = require('node:assert/strict');
const { PDFDocument, PDFName: N, PDFString: S, PDFArray } = require('pdf-lib');
const k = N.of, get = (d, o, n) => d.context.lookup(o.get(k(n)));
const reopen = async d => PDFDocument.load(await d.save(), { updateMetadata: false });

module.exports = async ({ test, repair, validateNavigation, pageGeometry }) => {
  async function fixture(label = 'A', expanded = true, open = 'direct') {
    const d = await PDFDocument.create();
    for (let i = 0; i < 3; i++) { const p = d.addPage([300+i,500+i]); p.node.set(k('Identity'),S.of(label+i)); }
    const dest = i => [d.getPage(i).ref,'XYZ',null,123,null];
    d.catalog.set(k('Dests'),d.context.obj({ chapter:dest(1) }));
    d.catalog.set(k('Names'),d.context.obj({Dests:{Names:[S.of('chapter'),dest(2)]}}));
    const root = d.context.obj({Type:'Outlines',Count:expanded?5:2}),rr=d.context.register(root);
    const parent=d.context.obj({Title:S.of(label+' parent'),Parent:rr,Dest:dest(0),Count:expanded?3:-3,C:[0.2,0.4,0.6],F:3}),pr=d.context.register(parent);
    const tail=d.context.obj({Title:S.of(label+' tail'),Parent:rr,A:{S:'GoToR',F:S.of('remote.pdf'),D:[4,'Fit'],NewWindow:true}}),tr=d.context.register(tail);
    const children=[
      {Title:S.of('middle'),Dest:N.of('chapter')},
      {Title:S.of('last'),A:{S:'GoTo',D:S.of('chapter')}},
      {Title:S.of('first'),A:{S:'GoTo',D:dest(0),Next:{S:'GoTo',D:dest(2)}}},
    ].map(x=>{const dict=d.context.obj({...x,Parent:pr});return {dict,ref:d.context.register(dict)};});
    children.forEach((c,i)=>{if(i)c.dict.set(k('Prev'),children[i-1].ref);if(i<2)c.dict.set(k('Next'),children[i+1].ref);});
    root.set(k('First'),pr);root.set(k('Last'),tr);parent.set(k('Next'),tr);tail.set(k('Prev'),pr);
    parent.set(k('First'),children[0].ref);parent.set(k('Last'),children[2].ref);d.catalog.set(k('Outlines'),rr);
    if(open==='direct')d.catalog.set(k('OpenAction'),d.context.obj(dest(2)));
    if(open==='local')d.catalog.set(k('OpenAction'),d.context.obj({S:'GoTo',D:N.of('chapter')}));
    if(open==='remote')d.catalog.set(k('OpenAction'),d.context.obj({S:'GoToR',F:S.of('remote.pdf'),D:[4,'Fit'],NewWindow:false}));
    return reopen(d);
  }
  // Independent enumeration of reconstructed links and destination lookup.
  function inspect(d) {
    const root=get(d,d.catalog,'Outlines'), rootRef=d.catalog.get(k('Outlines')),seen=new Set();
    const walk=(parent,parentRef)=>{let r=parent.get(k('First')),previous;const nodes=[];
      while(r){assert(!seen.has(r.toString()));seen.add(r.toString());const x=d.context.lookup(r);
        assert.equal(x.get(k('Parent')).toString(),parentRef.toString());assert.equal(x.get(k('Prev'))?.toString(),previous?.toString());
        const children=x.has(k('First'))?walk(x,r):[];nodes.push({dict:x,children});previous=r;r=x.get(k('Next'));
      }assert.equal(previous?.toString(),parent.get(k('Last'))?.toString());return nodes;};
    return {root,nodes:walk(root,rootRef)};
  }
  function target(d,raw){let a=d.context.lookup(raw);
    if(a instanceof N)a=get(d,d.catalog,'Dests').lookup(a);
    else if(!(a instanceof PDFArray)){const pairs=get(d,get(d,get(d,d.catalog,'Names'),'Dests'),'Names');const b=Buffer.from(a.asBytes());let found;for(let i=0;i<pairs.size();i+=2)if(b.equals(Buffer.from(pairs.get(i).asBytes())))found=d.context.lookup(pairs.get(i+1));assert(found);a=found;}
    assert(d.getPages().some(p=>p.ref.toString()===a.get(0).toString()));
    assert.deepEqual(a.asArray().slice(1).map(x=>x.toString()),['/XYZ','null','123','null']);
    return get(d,d.context.lookup(a.get(0)),'Identity').decodeText();
  }
  async function verify(sources,expectedOpen){const out=await PDFDocument.load(await repair(sources));
    validateNavigation(out,sources.flatMap(s=>s.order.map(i=>pageGeometry(s.doc.getPage(i)))));
    const {root,nodes}=inspect(out);assert.equal(nodes.length,sources.length*2);
    sources.forEach(({doc},i)=>{const label=get(doc,doc.getPage(0).node,'Identity').decodeText().slice(0,-1),p=nodes[i*2],tail=nodes[i*2+1];
      assert.equal(get(out,p.dict,'Title').decodeText(),label+' parent');assert.equal(target(out,p.dict.get(k('Dest'))),label+'0');
      assert.equal(p.children.length,3);assert.equal(target(out,p.children[0].dict.get(k('Dest'))),label+'1');
      assert.equal(target(out,get(out,p.children[1].dict,'A').get(k('D'))),label+'2');
      const action=get(out,p.children[2].dict,'A');assert.equal(target(out,action.get(k('D'))),label+'0');assert.equal(target(out,get(out,action,'Next').get(k('D'))),label+'2');
      assert.equal(get(out,p.dict,'F').asNumber(),3);assert.equal(get(out,p.dict,'C').toString(),'[ 0.2 0.4 0.6 ]');
      const original=inspect(doc).nodes[0].dict;assert.equal(get(out,p.dict,'Count').asNumber(),get(doc,original,'Count').asNumber());
      const remote=get(out,tail.dict,'A');assert.equal(remote.toString(),get(doc,inspect(doc).nodes[1].dict,'A').toString());
    });
    assert.equal(get(out,root,'Count').asNumber(),nodes.reduce((n,x)=>n+1+Math.max(0,get(out,x.dict,'Count')?.asNumber()||0),0));
    if(!expectedOpen)assert(!out.catalog.has(k('OpenAction')));
    else {const action=get(out,out.catalog,'OpenAction');if(expectedOpen==='remote')assert.equal(action.toString(),get(sources[0].doc,sources[0].doc.catalog,'OpenAction').toString());else assert.equal(target(out,action instanceof PDFArray?action:action.get(k('D'))),'A'+(expectedOpen==='direct'?2:1));}
    return out;
  }
  for(const expanded of [true,false])for(const open of ['direct','local','remote'])await test('Phase 3 Reorder hierarchy/state '+expanded+' OpenAction '+open,async()=>verify([{doc:await fixture('A',expanded,open),order:[2,0,1]}],open));
  await test('Phase 3 Merge distinct source trees, namespaced targets and deliberate OpenAction omission',async()=>verify([{doc:await fixture('A',true,'local'),order:[0,1,2]},{doc:await fixture('B',false,'remote'),order:[2,0,1]}]));
  await test('Phase 3 same PDF twice has independent outline objects/targets',async()=>{const doc=await fixture();await verify([{doc,order:[0,1,2]},{doc,order:[2,0,1]}]);});
  await test('Phase 3 single-level outline and untargeted heading',async()=>{
    const d=await fixture('A',true,'none'),{root,nodes}=inspect(d),p=nodes[0].dict;
    for(const key of ['First','Last','Count','Dest'])p.delete(k(key));root.set(k('Count'),d.context.obj(2));
    const out=await PDFDocument.load(await repair([{doc:await reopen(d),order:[2,0,1]}]));validateNavigation(out);assert.equal(inspect(out).nodes.length,2);assert(!inspect(out).nodes[0].dict.has(k('Dest')));
  });
  await test('Phase 3 three-level mixed expansion uses visible-descendant Count semantics',async()=>{
    const d=await fixture(),{root,nodes}=inspect(d),p=nodes[0].dict,child=nodes[0].children[0].dict;
    const childRef=p.get(k('First'));
    const grand=d.context.obj({Title:S.of('grandchild'),Parent:childRef,Dest:[d.getPage(2).ref,'Fit']});const grandRef=d.context.register(grand);
    child.set(k('First'),grandRef);child.set(k('Last'),grandRef);child.set(k('Count'),d.context.obj(-1));
    // A closed child contributes itself, but not its grandchild, to its parent.
    for(const open of [false,true]){
      child.set(k('Count'),d.context.obj(open?1:-1));p.set(k('Count'),d.context.obj(open?4:3));root.set(k('Count'),d.context.obj(open?6:5));
      const out=await PDFDocument.load(await repair([{doc:await reopen(d),order:[2,0,1]}]));validateNavigation(out);
      const tree=inspect(out);assert.equal(get(out,tree.root,'Count').asNumber(),open?6:5);
      const nested=tree.nodes[0].children[0];assert.equal(get(out,nested.dict,'Count').asNumber(),open?1:-1);
      assert.equal(get(out,nested.children[0].dict,'Dest').get(0).toString(),out.getPage(0).ref.toString());
    }
  });
  const parent=d=>inspect(d).nodes[0].dict;
  for(const [name,change]of [
    ['wrong Parent',d=>parent(d).set(k('Parent'),d.getPage(0).ref)],
    ['wrong Prev',d=>parent(d).set(k('Prev'),d.catalog.get(k('Outlines')))],
    ['wrong Last',d=>get(d,d.catalog,'Outlines').set(k('Last'),get(d,d.catalog,'Outlines').get(k('First')))],
    ['sibling cycle',d=>{const p=parent(d);p.set(k('Next'),get(d,d.catalog,'Outlines').get(k('First')));}],
    ['child cycle',d=>{const p=parent(d);p.set(k('First'),get(d,d.catalog,'Outlines').get(k('First')));}],
    ['unresolved target',d=>parent(d).set(k('Dest'),N.of('absent'))],
    ['detached target',d=>parent(d).set(k('Dest'),d.context.obj([d.context.register(d.getPage(0).node.clone()),'Fit']))],
    ['wrong Count',d=>parent(d).set(k('Count'),d.context.obj(4))],
    ['missing Count',d=>parent(d).delete(k('Count'))],
    ['ambiguous Dest/A',d=>parent(d).set(k('A'),d.context.obj({S:'GoTo',D:N.of('chapter')}))],
    ['unsupported SE',d=>parent(d).set(k('SE'),d.context.obj({}))],
    ['bad color',d=>parent(d).set(k('C'),d.context.obj([2,0,0]))],
    ['bad style',d=>parent(d).set(k('F'),d.context.obj(8))],
    ['missing title',d=>parent(d).delete(k('Title'))],
    ['dangling child',d=>parent(d).set(k('First'),require('pdf-lib').PDFRef.of(99999,0))],
    ['wrong root Count',d=>get(d,d.catalog,'Outlines').set(k('Count'),d.context.obj(99))],
    ['JavaScript outline',d=>{const p=parent(d);p.delete(k('Dest'));p.set(k('A'),d.context.obj({S:'JavaScript',JS:S.of('x')}));}],
    ['malformed OpenAction',d=>d.catalog.set(k('OpenAction'),S.of('chapter'))],
    ['JavaScript OpenAction',d=>d.catalog.set(k('OpenAction'),d.context.obj({S:'JavaScript',JS:S.of('x')}))],
    ['unresolved OpenAction',d=>d.catalog.set(k('OpenAction'),d.context.obj({S:'GoTo',D:N.of('missing')}))],
    ['detached OpenAction',d=>d.catalog.set(k('OpenAction'),d.context.obj([d.context.register(d.getPage(0).node.clone()),'Fit']))],
    ['cyclic outline action',d=>{const p=parent(d),action=d.context.obj({S:'GoTo',D:N.of('chapter')});action.set(k('Next'),d.context.register(action));p.delete(k('Dest'));p.set(k('A'),action);}],
  ])await test('Phase 3 fail closed '+name+' in Reorder and Merge',async()=>{
    const d=await fixture();change(d);const source=await reopen(d),plain=await PDFDocument.create();plain.addPage();
    let calls=0;const original=PDFDocument.prototype.copyPages;PDFDocument.prototype.copyPages=function(...args){calls++;return original.apply(this,args);};
    try {for(const sources of [[{doc:source,order:[0,1,2]}],[{doc:plain,order:[0]},{doc:source,order:[0,1,2]}]])await assert.rejects(()=>repair(sources),e=>e.code==='PDF_NAVIGATION');}finally{PDFDocument.prototype.copyPages=original;}
    assert.equal(calls,0);
  });
  await test('Phase 3 validator rejects corrupted serialized output hierarchy and targets',async()=>{
    const out=await verify([{doc:await fixture(),order:[2,0,1]}],'direct');
    parent(out).set(k('Parent'),out.getPage(0).ref);assert.throws(()=>validateNavigation(out),/Parent/);
    const bad=await reopen(out);assert.throws(()=>validateNavigation(bad),/Parent/);
  });
  return fixture;
};
