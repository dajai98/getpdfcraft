// Deterministic controlled fixtures, generated in memory. No Lab evidence is written.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const pdf = require('pdf-lib');
const swc = require('next/dist/build/swc');
const { PDFDocument, PDFName: N, PDFString, degrees } = pdf;
const root = path.resolve(__dirname, '..');
const modules = {};
const key = s => N.of(s);
const value = (d, o, k) => d.context.lookup(o.get(key(k)));
const reopen = async d => PDFDocument.load(await d.save(), { updateMetadata: false });
let passed = 0;
async function test(name, fn) { await fn(); passed++; console.log('PASS ' + name); }

async function fixture(label = 'A', navigation = true) {
  const doc = await PDFDocument.create();
  doc.setCreationDate(new Date('2020-01-01T00:00:00Z'));
  doc.setModificationDate(new Date('2020-01-01T00:00:00Z'));
  for (let i = 0; i < 3; i++) {
    const p = doc.addPage([300 + i * 20, 500 + i * 30]);
    p.setCropBox(10, 15, 250 + i * 20, 450 + i * 30);
    p.setRotation(degrees(i * 90));
    p.drawText(label + ' page ' + i);
    p.node.set(key('TestIdentity'), PDFString.of(label + ':' + i));
  }
  if (navigation) for (const owner of doc.getPages()) {
    const annotations = [];
    for (let target = 0; target < 3; target++) for (const mode of ['Dest', 'GoTo']) {
      const dest = doc.context.obj([doc.getPage(target).ref, 'XYZ', null, 120, null]);
      const a = doc.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [0, 0, 20, 20], P: owner.ref });
      if (mode === 'Dest') a.set(key('Dest'), dest);
      else a.set(key('A'), doc.context.obj({ S: 'GoTo', D: dest }));
      annotations.push(doc.context.register(a));
    }
    annotations.push(doc.context.register(doc.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [0, 0, 10, 10], P: owner.ref,
      A: { S: 'GoToR', F: PDFString.of('remote.pdf'), D: [2, 'Fit'], NewWindow: true } })));
    owner.node.set(key('Annots'), doc.context.obj(annotations));
  }
  return reopen(doc);
}

function firstAnnotation(doc) { return doc.context.lookup(value(doc, doc.getPage(0).node, 'Annots').get(0)); }
async function rawCopy(doc, indices) {
  const out = await PDFDocument.create();
  (await out.copyPages(doc, indices)).forEach(p => out.addPage(p));
  return reopen(out);
}

async function popupFixture() {
  const doc = await PDFDocument.create(), page = doc.addPage(); doc.addPage();
  const text = doc.context.obj({ Type: 'Annot', Subtype: 'Text', Rect: [0,0,20,20], P: page.ref });
  const popup = doc.context.obj({ Type: 'Annot', Subtype: 'Popup', Rect: [20,20,100,100], P: page.ref });
  const textRef = doc.context.register(text), popupRef = doc.context.register(popup);
  text.set(key('Popup'), popupRef); popup.set(key('Parent'), textRef);
  page.node.set(key('Annots'), doc.context.obj([textRef, popupRef]));
  return reopen(doc);
}

(async () => {
  for (const name of ['pdfNavigationModel', 'pdfNavigationValidation', 'copyPdfPagesSafe']) {
    const filename = 'lib/' + name + '.js';
    const result = await swc.transform(fs.readFileSync(path.join(root, filename), 'utf8'), { filename,
      jsc: { parser: { syntax: 'ecmascript' }, target: 'es2022' }, module: { type: 'commonjs' } });
    const mod = { exports: {} };
    vm.compileFunction(result.code, ['module', 'exports', 'require'])(mod, mod.exports,
      n => n.startsWith('@/lib/') ? modules[n.slice(6)] : require(n));
    modules[name] = mod.exports;
  }
  const { validateNavigation, pageGeometry } = modules.pdfNavigationValidation;
  const { copyPagesWithNavigation: repair } = modules.copyPdfPagesSafe;
  const phase2Fixture = await require('./navigation-phase2.cjs')({ test, repair, validateNavigation, pageGeometry });
  const phase3Fixture = await require('./navigation-phase3.cjs')({ test, repair, validateNavigation, pageGeometry });
  const phase4 = await require('./navigation-phase4.cjs')({ test, select: modules.copyPdfPagesSafe.copySelectedPagesWithNavigation, validateNavigation, pageGeometry });
  await test('Serialized valid Text/Popup pair rejected before copyPages', async () => {
    const doc = await popupFixture(), page = doc.getPage(0), annots = value(doc, page.node, 'Annots');
    const text = doc.context.lookup(annots.get(0)), popup = doc.context.lookup(annots.get(1));
    assert.equal(text.get(key('Popup')).toString(), annots.get(1).toString());
    assert.equal(popup.get(key('Parent')).toString(), annots.get(0).toString());
    for (const a of [text,popup]) assert.equal(a.get(key('P')).toString(), page.ref.toString());
    const originalCopy = PDFDocument.prototype.copyPages; let copies = 0;
    PDFDocument.prototype.copyPages = function(...args) { copies++; return originalCopy.apply(this,args); };
    try { await assert.rejects(() => repair([{doc,order:[1,0]}]), e => e.code === 'PDF_NAVIGATION' && /linked annotation/.test(e.message)); }
    finally { PDFDocument.prototype.copyPages = originalCopy; }
    assert.equal(copies,0);
  });
  await test('Prior cloning algorithm reproduced: serialized linked annotations retain detached P and are rejected', async () => {
    const doc = await popupFixture(), out = await PDFDocument.create();
    const copied = await out.copyPages(doc,[1,0]); copied.forEach(p=>out.addPage(p));
    // Reproduce the old algorithm exactly for this annotation-only fixture.
    for(const page of copied) {
      const array=value(out,page.node,'Annots'); if(!array)continue;
      page.node.set(key('Annots'),out.context.obj(array.asArray().map(raw=>{
        const clone=out.context.lookup(raw).clone(out.context);clone.set(key('P'),page.ref);return out.context.register(clone);
      })));
    }
    const reopened=await reopen(out), page=reopened.getPage(1), annots=value(reopened,page.node,'Annots');
    const text=reopened.context.lookup(annots.get(0)), popup=reopened.context.lookup(annots.get(1));
    const linkedOriginal=value(reopened,popup,'Parent');
    const pageRefs=new Set(reopened.getPages().map(p=>p.ref.toString()));
    assert(pageRefs.has(text.get(key('P')).toString()));assert(pageRefs.has(popup.get(key('P')).toString()));
    assert(!pageRefs.has(linkedOriginal.get(key('P')).toString()));
    assert.throws(()=>validateNavigation(reopened),/reachable annotation P targets a detached/);
  });
  for(const relation of ['Popup','Parent','IRT','CustomNested']) await test('Reject annotation relationship '+relation+' with optional Type omitted',async()=>{
    const doc=await PDFDocument.create(),p=doc.addPage();
    const a=doc.context.obj({Subtype:'Text',Rect:[0,0,10,10],P:p.ref}),b=doc.context.obj({Subtype:'Text',Rect:[20,20,30,30],P:p.ref});
    const ar=doc.context.register(a),br=doc.context.register(b);
    a.set(key(relation),relation==='CustomNested'?doc.context.obj({Nested:[br]}):br);
    p.node.set(key('Annots'),doc.context.obj([ar,br]));const source=await reopen(doc);
    await assert.rejects(()=>repair([{doc:source,order:[0]}]),/linked annotation/);
  });
  await test('Self-linked annotation cycle rejected after reopen',async()=>{
    const doc=await PDFDocument.create(),p=doc.addPage();const a=doc.context.obj({Subtype:'Text',Rect:[0,0,10,10],P:p.ref});const ref=doc.context.register(a);
    a.set(key('Custom'),doc.context.obj([ref]));p.node.set(key('Annots'),doc.context.obj([ref]));
    const source=await reopen(doc);assert.throws(()=>validateNavigation(source),/cycle/);
  });
  await test('Ordinary unlinked Text annotation retains actual owner',async()=>{
    const doc=await PDFDocument.create(),p=doc.addPage();doc.addPage();
    p.node.set(key('Annots'),doc.context.obj([doc.context.register(doc.context.obj({Subtype:'Text',Rect:[0,0,10,10],P:p.ref}))]));
    const out=await PDFDocument.load(await repair([{doc:await reopen(doc),order:[1,0]}]));validateNavigation(out);
    assert.equal(firstAnnotation({context:out.context,getPage:()=>out.getPage(1)}).get(key('P')).toString(),out.getPage(1).ref.toString());
  });
  for (const [tool, indices] of [['Merge', [0,1,2]], ['Reorder', [2,0,1]], ['Split', [0]]]) {
    const broken = await rawCopy(await fixture(), indices);
    await test(tool + ' legacy raw-copy detached target reproduction', () => assert.throws(() => validateNavigation(broken), /detached|removed/));
  }
  await test('Delete Pages legacy raw-removal target reproduction', async () => {
    const doc = await fixture(); doc.removePage(2);
    const out = await reopen(doc);
    assert.throws(() => validateNavigation(out), /detached|removed/);
  });

  async function verify(sources) {
    const output = await PDFDocument.load(await repair(sources), { updateMetadata: false });
    const expected = sources.flatMap(s => s.order.map(i => pageGeometry(s.doc.getPage(i))));
    validateNavigation(output, expected);
    let offset = 0;
    for (const { doc, order } of sources) {
      for (let pos = 0; pos < order.length; pos++) {
        const p = output.getPage(offset + pos), original = doc.getPage(order[pos]);
        assert.equal(value(output, p.node, 'TestIdentity').decodeText(), value(doc, original.node, 'TestIdentity').decodeText());
        const annotations = value(output, p.node, 'Annots');
        if (!annotations || !annotations.size()) continue;
        for (let target = 0; target < 3; target++) for (let mode = 0; mode < 2; mode++) {
          const a = output.context.lookup(annotations.get(target * 2 + mode));
          const dest = mode ? value(output, value(output, a, 'A'), 'D') : value(output, a, 'Dest');
          assert.equal(dest.get(0).toString(), output.getPage(offset + order.indexOf(target)).ref.toString());
          assert.deepEqual(dest.asArray().slice(1).map(v => v.toString()), ['/XYZ', 'null', '120', 'null']);
          assert.equal(a.get(key('P')).toString(), p.ref.toString());
        }
        const remote = value(output, output.context.lookup(annotations.get(6)), 'A');
        assert.equal(remote.toString(), value(doc, doc.context.lookup(value(doc, original.node, 'Annots').get(6)), 'A').toString());
      }
      offset += order.length;
    }
    return output;
  }
  await test('Reorder last/first/middle, all targets, views, ownership, remote unchanged', async () => verify([{ doc: await fixture(), order: [2,0,1] }]));
  await test('Merge independent documents with colliding source object numbers', async () => verify([{ doc: await fixture('A'), order: [0,1,2] }, { doc: await fixture('B'), order: [0,1,2] }]));
  await test('Same PDF instance twice has separate output target maps', async () => {
    const doc = await fixture(); await verify([{ doc, order: [0,1,2] }, { doc, order: [2,0,1] }]);
  });
  await test('Ordinary PDFs without navigation', async () => verify([{ doc: await fixture('plain', false), order: [2,0,1] }]));
  await test('One-page ordinary output', async () => {
    const doc = await PDFDocument.create(); doc.addPage();
    assert.equal((await PDFDocument.load(await repair([{ doc, order: [0] }]))).getPageCount(), 1);
  });
  await test('Detached page object is not a page-tree member', async () => {
    const doc = await fixture(), detached = doc.context.register(doc.getPage(1).node.clone());
    value(doc, firstAnnotation(doc), 'Dest').set(0, detached);
    const out = await reopen(doc);
    assert.throws(() => validateNavigation(out), /detached|removed/);
  });
  for (const [name, mutate] of [
    ['named link', d => firstAnnotation(d).set(key('Dest'), PDFString.of('chapter'))],
    ['outlines', d => d.catalog.set(key('Outlines'), d.context.obj({ Count: 0 }))],
    ['unsupported OpenAction', d => d.catalog.set(key('OpenAction'), d.context.obj({ S: 'JavaScript', JS: PDFString.of('x') }))],
    ['ambiguous Dest and A', d => firstAnnotation(d).set(key('A'), d.context.obj({ S: 'GoTo', D: [d.getPage(0).ref, 'Fit'] }))],
    ['wrong annotation P', d => firstAnnotation(d).set(key('P'), d.getPage(1).ref)],
    ['AcroForm', d => d.catalog.set(key('AcroForm'), d.context.obj({ Fields: [] }))],
    ['JavaScript', d => { const a = firstAnnotation(d); a.delete(key('Dest')); a.set(key('A'), d.context.obj({ S: 'JavaScript', JS: PDFString.of('x') })); }],
  ]) await test(name + ' fails explicitly before output', async () => {
    const d = await fixture(); mutate(d);
    await assert.rejects(() => repair([{ doc: d, order: [0,1,2] }]), e => e.code === 'PDF_NAVIGATION');
  });
  await test('Omitted and duplicate orders blocked in production slice', async () => {
    const doc = await fixture();
    for (const order of [[0], [0,0,2]]) await assert.rejects(() => repair([{ doc, order }]), /complete page permutations/);
  });
  await test('Geometry and count validator rejects wrong expectations', async () => {
    const doc = await fixture(); assert.throws(() => validateNavigation(doc, []), /geometry/);
    assert.throws(() => validateNavigation(doc, undefined, doc.getPages().map(p => p.ref.toString()).reverse()), /identity\/order/);
    doc.context.lookup(doc.catalog.get(key('Pages'))).set(key('Count'), doc.context.obj(999));
    assert.throws(() => validateNavigation(doc), /count/);
  });
  await test('Supported fit modes preserve all parameters', async () => {
    const doc = await fixture();
    const views = [['Fit'], ['FitB'], ['FitH', null], ['FitV', 12], ['FitBH', 8], ['FitBV', null], ['FitR', 1, 2, 30, 40], ['XYZ', null, 8, 1]];
    for (const view of views) {
      firstAnnotation(doc).set(key('Dest'), doc.context.obj([doc.getPage(2).ref, ...view]));
      const out = await PDFDocument.load(await repair([{ doc, order: [0,1,2] }]));
      const dest = value(out, firstAnnotation(out), 'Dest');
      assert.deepEqual(dest.asArray().slice(1).map(x => x.toString()), doc.context.obj(view).asArray().map(x => x.toString()));
    }
  });
  await test('Shared standalone GoTo actions remain valid without cross-owner mutation', async () => {
    const doc = await fixture();
    const shared = doc.context.register(doc.context.obj({ S: 'GoTo', D: [doc.getPage(2).ref, 'Fit'] }));
    for (const p of doc.getPages()) {
      const a = doc.context.lookup(value(doc, p.node, 'Annots').get(1)); a.set(key('A'), shared);
    }
    const out = await PDFDocument.load(await repair([{ doc, order: [2,0,1] }]));
    validateNavigation(out);
    for (const p of out.getPages()) {
      const a = out.context.lookup(value(out, p.node, 'Annots').get(1));
      assert.equal(value(out, value(out, a, 'A'), 'D').get(0).toString(), out.getPage(0).ref.toString());
    }
  });

  // Run the actual React source handlers with simulated state/URL only.
  // This is Node handler coverage, not browser or download-interaction evidence.
  const compiled = {};
  for (const file of ['app/tools/merge-pdf/page.js', 'app/tools/reorder-pages/page.js', 'app/tools/split-pdf/page.js', 'app/tools/delete-pages/page.js',
    'components/hooks/useGeneratedResult.js', 'components/hooks/useObjectUrls.js', 'components/hooks/usePdfInput.js', 'lib/pdfInput.js', 'lib/splitRanges.js']) {
    compiled[file] = (await swc.transform(fs.readFileSync(path.join(root, file), 'utf8'), {
      filename: file, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } }, target: 'es2022' }, module: { type: 'commonjs' }
    })).code;
  }
  function handler(slug) {
    let cursor = 0, tree; const state = [], cache = {}, objects = [], alerts = [], revoked = [];
    const react = {
      useState: init => { const i = cursor++; if (!(i in state)) state[i] = typeof init === 'function' ? init() : init; return [state[i], v => { state[i] = typeof v === 'function' ? v(state[i]) : v; }]; },
      useRef: init => { const i = cursor++; return state[i] || (state[i] = { current: init }); },
      useCallback: fn => fn, useEffect: () => {},
      createElement: (type, props, ...children) => ({ type, props: { ...props, children } })
    };
    function load(file) {
      if (cache[file]) return cache[file].exports;
      const mod = { exports: {} }; cache[file] = mod;
      vm.compileFunction(compiled[file], ['module', 'exports', 'require', 'React', 'URL', 'alert'])(mod, mod.exports, n => {
        if (n === 'react') return react;
        if (n.startsWith('@/')) {
          const f = n.slice(2) + '.js';
          if (compiled[f]) return load(f);
          if (n.startsWith('@/lib/') && modules[n.slice(6)]) return modules[n.slice(6)];
          return n;
        }
        return require(n);
      }, react, { createObjectURL: b => { objects.push(b); return 'blob:test-' + objects.length; }, revokeObjectURL: url => revoked.push(url) }, s => alerts.push(s));
      return mod.exports;
    }
    const component = load('app/tools/' + slug + '/page.js').default;
    const render = () => { cursor = 0; tree = component(); };
    const nodes = n => Array.isArray(n) ? n.flatMap(nodes) : n && typeof n === 'object' ? [n, ...nodes(n.props.children)] : [];
    const text = n => Array.isArray(n) ? n.map(text).join('') : n && typeof n === 'object' ? text(n.props.children) : String(n ?? '');
    render();
    return { objects, alerts, revoked, hasDownload: () => nodes(tree).some(n => String(n.type).endsWith('/DownloadButton')), upload: async files => { await nodes(tree).find(n => String(n.type).endsWith('/UploadZone')).props.onFiles(files); render(); },
      click: async pattern => { const n = nodes(tree).find(n => n.type === 'button' && pattern.test(text(n))); assert(n); await n.props.onClick(); render(); },
      selectPage: async i => { const n=nodes(tree).find(n=>n.type==='button'&&n.props['aria-label']==='Page '+i);assert(n);await n.props.onClick();render(); },
      ranges: value => { const radios=nodes(tree).filter(n=>n.type==='input'&&n.props.type==='radio');radios[1].props.onChange();render();nodes(tree).find(n=>n.props['aria-label']==='Pages and ranges').props.onChange({target:{value}});render(); },
      text: () => text(tree) };
  }
  await test('Phase 4 Split handler validates single-page and range outputs before publishing',async()=>{
    const source=await phase4.fixture(),bytes=await source.save(),h=handler('split-pdf'),file={arrayBuffer:async()=>bytes,name:'selection.pdf',size:bytes.length};await h.upload([file]);await h.click(/Split PDF/);assert.equal(h.objects.length,3);assert(h.hasDownload());
    for(let i=0;i<3;i++)await phase4.verify(source,[i],new Uint8Array(await h.objects[i].arrayBuffer()));
    h.ranges('1-2, 3');await h.click(/Split PDF/);assert.equal(h.objects.length,5);assert.equal(h.revoked.length,3);
    await phase4.verify(source,[0,1],new Uint8Array(await h.objects[3].arrayBuffer()));await phase4.verify(source,[2],new Uint8Array(await h.objects[4].arrayBuffer()));
  });
  for(const removed of [[1],[2],[3],[1,2]])await test('Phase 4 Delete handler removes '+removed+' and repairs retained targets',async()=>{
    const source=await phase4.fixture(),bytes=await source.save(),h=handler('delete-pages'),file={arrayBuffer:async()=>bytes,name:'selection.pdf',size:bytes.length};await h.upload([file]);for(const i of removed)await h.selectPage(i);await h.click(/Delete .*Page/);assert.equal(h.objects.length,1);assert(h.hasDownload());await phase4.verify(source,[0,1,2].filter(i=>!removed.includes(i+1)),new Uint8Array(await h.objects[0].arrayBuffer()));
  });
  await test('Phase 4 Delete cannot remove all pages',async()=>{const source=await phase4.fixture(),bytes=await source.save(),h=handler('delete-pages');await h.upload([{arrayBuffer:async()=>bytes,name:'all.pdf',size:bytes.length}]);for(const i of [1,2,3])await h.selectPage(i);await h.click(/Delete .*Page/);assert.equal(h.objects.length,0);assert.match(h.alerts.join(' '),/At least one page/);});
  for(const slug of ['split-pdf','delete-pages'])await test('Phase 4 '+slug+' revokes success and exposes no partial downloads on later failure',async()=>{
    const source=await phase4.fixture();let bytes=await source.save();const h=handler(slug),file={arrayBuffer:async()=>bytes,name:'change.pdf',size:bytes.length};await h.upload([file]);if(slug==='delete-pages')await h.selectPage(2);await h.click(slug==='split-pdf'?/Split PDF/:/Delete .*Page/);assert(h.hasDownload());const successes=h.objects.length;
    // This chain is on page 2: Split's page-1 output succeeds before page 2 fails.
    const a=source.context.lookup(value(source,source.getPage(1).node,'Annots').get(4)),action=value(source,a,'A');action.set(key('Next'),source.context.obj({S:'GoTo',D:pdf.PDFName.of('n2')}));bytes=await source.save();
    if(slug==='delete-pages'){await h.selectPage(2);await h.selectPage(3);}await h.click(slug==='split-pdf'?/Split PDF/:/Delete .*Page/);
    assert.equal(h.objects.length,successes);assert.equal(h.revoked.length,successes);assert(!h.hasDownload());assert.match(h.text(),/action chain targets an omitted page/);
  });
  for (const slug of ['merge-pdf', 'reorder-pages']) {
    await test(slug + ' production handler rebuilds outlines with correct OpenAction policy', async () => {
      const bytes=await (await phase3Fixture()).save(),h=handler(slug),file={arrayBuffer:async()=>bytes,name:'outline.pdf',size:bytes.length};
      await h.upload(slug==='merge-pdf'?[file,file]:[file]);await h.click(slug==='merge-pdf'?/Merge .*PDFs/:/Save New Order/);
      assert.equal(h.objects.length,1);assert.equal(h.alerts.length,0);
      const out=await PDFDocument.load(await h.objects[0].arrayBuffer());validateNavigation(out);
      assert(out.catalog.has(key('Outlines')));assert.equal(out.catalog.has(key('OpenAction')),slug==='reorder-pages');
    });
    await test(slug + ' production handler accepts named destinations and action chains', async () => {
      const doc = await phase2Fixture(), bytes = await doc.save();
      const h = handler(slug), file = { arrayBuffer: async () => bytes, name: 'named.pdf', size: bytes.length };
      await h.upload(slug === 'merge-pdf' ? [file, file] : [file]);
      await h.click(slug === 'merge-pdf' ? /Merge .*PDFs/ : /Save New Order/);
      assert.equal(h.objects.length, 1); assert.equal(h.alerts.length, 0);
      const out = await PDFDocument.load(await h.objects[0].arrayBuffer());
      validateNavigation(out); assert.equal(out.getPageCount(), slug === 'merge-pdf' ? 6 : 3);
      assert(out.catalog.has(key('Dests'))); assert(out.catalog.has(key('Names')));
    });
    await test(slug + ' Text/Popup failure revokes earlier success and leaves no stale download', async () => {
      const good=await PDFDocument.create();good.addPage();good.addPage();
      let bytes=await good.save();const bad=await (await popupFixture()).save();
      const file={arrayBuffer:async()=>bytes,name:'fixture.pdf',size:bytes.length},h=handler(slug);
      await h.upload(slug==='merge-pdf'?[file,file]:[file]);await h.click(slug==='merge-pdf'?/Merge .*PDFs/:/Save New Order/);
      assert(h.hasDownload());assert.equal(h.objects.length,1);
      bytes=bad;if(slug==='merge-pdf')await h.upload([file]);
      await h.click(slug==='merge-pdf'?/Merge .*PDFs/:/Save New Order/);
      assert.equal(h.objects.length,1);assert(!h.hasDownload());assert.deepEqual(h.revoked,['blob:test-1']);
      assert.match(h.alerts.join(' ')+h.text(),/linked annotation/);
    });
    await test(slug + ' production handler emits independently valid serialized output', async () => {
      const doc = await fixture(), bytes = await doc.save();
      const h = handler(slug), file = { arrayBuffer: async () => bytes, name: 'fixture.pdf', size: bytes.length };
      await h.upload(slug === 'merge-pdf' ? [file, file] : [file]);
      await h.click(slug === 'merge-pdf' ? /Merge .*PDFs/ : /Save New Order/);
      assert.equal(h.objects.length, 1); assert.equal(h.alerts.length, 0);
      const out = await PDFDocument.load(await h.objects[0].arrayBuffer());
      validateNavigation(out); assert.equal(out.getPageCount(), slug === 'merge-pdf' ? 6 : 3);
    });
    await test(slug + ' production handler blocks complex navigation with explicit message and no Blob URL', async () => {
      const doc = await fixture(); doc.catalog.set(key('Outlines'), doc.context.obj({ Count: 0 }));
      const bytes = await doc.save(), file = { arrayBuffer: async () => bytes, name: 'complex.pdf', size: bytes.length };
      const h = handler(slug); await h.upload(slug === 'merge-pdf' ? [file, file] : [file]);
      await h.click(slug === 'merge-pdf' ? /Merge .*PDFs/ : /Save New Order/);
      assert.equal(h.objects.length, 0);
      assert.match(h.alerts.join(' ') + h.text(), /Unsupported or invalid PDF navigation/);
    });
  }
  console.log(`NAVIGATION REPAIR ${passed} PASS, 0 FAIL`);
})().catch(e => { console.error(e); process.exitCode = 1; });
