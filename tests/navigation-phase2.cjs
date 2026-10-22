// In-memory fixtures only; invoked by navigation-repair.test.cjs.
const assert = require('node:assert/strict');
const { PDFDocument, PDFName: N, PDFString: S, PDFHexString: H, PDFArray } = require('pdf-lib');
const k = N.of;
const get = (d, o, n) => d.context.lookup(o.get(k(n)));
const reopen = async d => PDFDocument.load(await d.save(), { updateMetadata: false });
const bytes = x => Buffer.from(x.asBytes()).toString('hex');

module.exports = async function({ test, repair, validateNavigation, pageGeometry }) {
  async function fixture() {
    const d = await PDFDocument.create();
    for (let i = 0; i < 3; i++) { const p = d.addPage([300 + i, 400 + i]); p.drawText('Identity ' + i); }
    const dest = i => [d.getPage(i).ref, 'XYZ', null, 120, null];
    // Same bytes in the two name systems deliberately identify different pages.
    d.catalog.set(k('Dests'), d.context.obj({ same: dest(0), Dest: { D: dest(1) }, last: dest(2) }));
    d.catalog.set(k('Names'), d.context.obj({ Dests: { Kids: [
      { Names: [S.of('alpha'), { D: dest(0) }], Limits: [S.of('alpha'), S.of('alpha')] },
      { Names: [H.of('73616d65'), dest(2)], Limits: [S.of('same'), S.of('same')] },
    ] } }));
    const local = target => d.context.obj({ S: 'GoTo', D: target });
    const chain = local(N.of('same'));
    const remote = d.context.obj({ S: 'GoToR', F: S.of('remote.pdf'), D: S.of('same'), NewWindow: true });
    remote.set(k('Next'), local(S.of('same')));
    chain.set(k('Next'), d.context.obj([local(N.of('Dest')), remote]));
    const annots = [
      { Dest: N.of('same') }, { Dest: S.of('same') }, { A: chain },
      { AA: { E: local(S.of('alpha')), X: local(N.of('last')) } },
    ].map(fields => d.context.register(d.context.obj({ Type: 'Annot', Subtype: 'Link', P: d.getPage(0).ref, Rect: [0, 0, 10, 10], ...fields })));
    d.getPage(0).node.set(k('Annots'), d.context.obj(annots));
    return reopen(d);
  }
  // Deliberately independent lookup, not the production name resolver/traversal.
  function resolve(d, target) {
    target = d.context.lookup(target);
    if (target instanceof PDFArray) return target;
    if (target instanceof N) return get(d, get(d, d.catalog, 'Dests'), target.decodeText());
    const tree = get(d, get(d, d.catalog, 'Names'), 'Dests'), pairs = get(d, tree, 'Names');
    for (let i = 0; i < pairs.size(); i += 2) if (bytes(pairs.get(i)) === bytes(target)) return d.context.lookup(pairs.get(i + 1));
    assert.fail('unresolved output name');
  }
  async function verify(sources) {
    const out = await PDFDocument.load(await repair(sources));
    validateNavigation(out, sources.flatMap(s => s.order.map(i => pageGeometry(s.doc.getPage(i)))));
    const legacy = get(out, out.catalog, 'Dests'), tree = get(out, get(out, out.catalog, 'Names'), 'Dests');
    assert.equal(legacy.keys().length, sources.length * 3);
    const pairs = get(out, tree, 'Names'), limits = get(out, tree, 'Limits');
    assert.equal(pairs.size(), sources.length * 4);
    const keys = Array.from({ length: pairs.size() / 2 }, (_, i) => bytes(pairs.get(i * 2)));
    assert.deepEqual(keys, [...keys].sort()); assert.equal(new Set(keys).size, keys.length);
    assert.equal(bytes(limits.get(0)), keys[0]); assert.equal(bytes(limits.get(1)), keys.at(-1));
    let offset = 0;
    for (const { order } of sources) {
      const page = out.getPage(offset + order.indexOf(0)), annotations = get(out, page.node, 'Annots');
      const a = i => out.context.lookup(annotations.get(i));
      const check = (raw, sourceIndex) => {
        const dest = resolve(out, raw);
        assert.equal(dest.get(0).toString(), out.getPage(offset + order.indexOf(sourceIndex)).ref.toString());
        assert.deepEqual(dest.asArray().slice(1).map(v => v.toString()), ['/XYZ', 'null', '120', 'null']);
      };
      assert(get(out, a(0), 'Dest') instanceof N);
      assert(!(get(out, a(1), 'Dest') instanceof N));
      check(a(0).get(k('Dest')), 0); check(a(1).get(k('Dest')), 2);
      const chain = get(out, a(2), 'A'); check(chain.get(k('D')), 0);
      const next = get(out, chain, 'Next'); assert(next instanceof PDFArray); assert.equal(next.size(), 2);
      check(out.context.lookup(next.get(0)).get(k('D')), 1);
      const remote = out.context.lookup(next.get(1));
      assert.equal(get(out, remote, 'S').toString(), '/GoToR');
      assert.equal(get(out, remote, 'F').decodeText(), 'remote.pdf');
      assert.equal(get(out, remote, 'D').decodeText(), 'same'); // Must NOT be namespaced.
      assert.equal(get(out, remote, 'NewWindow').toString(), 'true');
      check(get(out, remote, 'Next').get(k('D')), 2);
      const aa = get(out, a(3), 'AA'); check(get(out, aa, 'E').get(k('D')), 0); check(get(out, aa, 'X').get(k('D')), 2);
      for (const raw of annotations.asArray()) assert.equal(out.context.lookup(raw).get(k('P')).toString(), page.ref.toString());
      offset += 3;
    }
    return out;
  }
  await test('Phase 2 Reorder: legacy/name-tree names, D dictionaries, first/middle/last, chains and AA after reopen', async () => {
    const out = await verify([{ doc: await fixture(), order: [2, 0, 1] }]);
    assert.deepEqual(get(out, out.catalog, 'Dests').keys().map(x => x.decodeText()), ['same', 'Dest', 'last']);
    const pairs = get(out, get(out, get(out, out.catalog, 'Names'), 'Dests'), 'Names');
    assert.equal(bytes(pairs.get(0)), bytes(S.of('alpha'))); assert.equal(bytes(pairs.get(2)), bytes(S.of('same')));
  });
  await test('Phase 2 Merge namespaces colliding names per source', async () => verify([
    { doc: await fixture(), order: [0, 1, 2] }, { doc: await fixture(), order: [2, 0, 1] },
  ]));
  await test('Phase 2 repeated same PDF has distinct namespaces and target identities', async () => {
    const doc = await fixture(); await verify([{ doc, order: [0, 1, 2] }, { doc, order: [2, 0, 1] }]);
  });
  const first = d => d.context.lookup(get(d, d.getPage(0).node, 'Annots').get(0));
  const chain = d => get(d, d.context.lookup(get(d, d.getPage(0).node, 'Annots').get(2)), 'A');
  const tree = d => get(d, get(d, d.catalog, 'Names'), 'Dests');
  const leaf = d => d.context.lookup(get(d, tree(d), 'Kids').get(0));
  for (const [label, mutate] of [
    ['unresolved name', d => first(d).set(k('Dest'), N.of('missing'))],
    ['name/string distinction', d => first(d).set(k('Dest'), N.of('alpha'))],
    ['detached named target', d => get(d, d.catalog, 'Dests').set(k('same'), d.context.obj([d.context.register(d.getPage(0).node.clone()), 'Fit']))],
    ['cycle', d => { const a = chain(d); a.set(k('Next'), d.context.register(a)); }],
    ['Next scalar', d => chain(d).set(k('Next'), d.context.obj(42))],
    ['empty Next', d => chain(d).set(k('Next'), d.context.obj([]))],
    ['invalid Next array member', d => chain(d).set(k('Next'), d.context.obj([42]))],
    ['missing local destination', d => chain(d).delete(k('D'))],
    ['JavaScript chain', d => chain(d).set(k('Next'), d.context.obj({ S: 'JavaScript', JS: S.of('x') }))],
    ['unsupported GoToE', d => chain(d).set(k('Next'), d.context.obj({ S: 'GoToE', D: [0, 'Fit'] }))],
    ['unknown action field', d => chain(d).set(k('Surprise'), d.context.obj(1))],
    ['malformed remote destination', d => chain(d).set(k('Next'), d.context.obj({ S: 'GoToR', F: S.of('x.pdf'), D: [0, 'XYZ'] }))],
    ['malformed AA', d => first(d).set(k('AA'), d.context.obj([1]))],
    ['unknown AA event', d => first(d).set(k('AA'), d.context.obj({ Surprise: { S: 'GoTo', D: N.of('same') } }))],
    ['page AA', d => d.getPage(0).node.set(k('AA'), d.context.obj({ O: { S: 'GoTo', D: N.of('same') } }))],
    ['incorrect Limits', d => leaf(d).set(k('Limits'), d.context.obj([S.of('bad'), S.of('bad')]))],
    ['missing child Limits', d => leaf(d).delete(k('Limits'))],
    ['unordered tree', d => { const kids = get(d, tree(d), 'Kids'); const a = kids.get(0); kids.set(0, kids.get(1)); kids.set(1, a); }],
    ['duplicate tree key', d => leaf(d).set(k('Names'), d.context.obj([S.of('alpha'), [d.getPage(0).ref, 'Fit'], S.of('alpha'), [d.getPage(1).ref, 'Fit']]))],
    ['nonstring tree key', d => get(d, leaf(d), 'Names').set(0, N.of('alpha'))],
    ['cyclic tree', d => tree(d).set(k('Kids'), d.context.obj([d.context.register(tree(d))]))],
    ['unsupported destination dictionary', d => get(d, d.catalog, 'Dests').set(k('same'), d.context.obj({ D: [d.getPage(0).ref, 'Fit'], Other: 1 }))],
  ]) await test('Phase 2 rejects ' + label + ' before copying serialized source', async () => {
    const d = await fixture(); mutate(d); const source = await reopen(d);
    const original = PDFDocument.prototype.copyPages; let copies = 0;
    PDFDocument.prototype.copyPages = function(...args) { copies++; return original.apply(this, args); };
    try { await assert.rejects(() => repair([{ doc: source, order: [2, 0, 1] }]), e => e.code === 'PDF_NAVIGATION'); }
    finally { PDFDocument.prototype.copyPages = original; }
    assert.equal(copies, 0);
  });
  await test('Phase 2 independent validator rejects detached named destination in serialized output', async () => {
    const out = await verify([{ doc: await fixture(), order: [2, 0, 1] }]);
    get(out, out.catalog, 'Dests').set(k('same'), out.context.obj([out.context.register(out.getPage(0).node.clone()), 'Fit']));
    const reopened = await reopen(out); assert.throws(() => validateNavigation(reopened), /detached|removed/);
  });
  await test('Phase 2 empty name tree and empty annotation AA remain valid', async () => {
    const d = await PDFDocument.create(); const p = d.addPage();
    d.catalog.set(k('Names'), d.context.obj({ Dests: { Names: [] } }));
    p.node.set(k('Annots'), d.context.obj([d.context.register(d.context.obj({ Subtype: 'Link', Rect: [0,0,1,1], AA: {} }))]));
    validateNavigation(await PDFDocument.load(await repair([{ doc: await reopen(d), order: [0] }])));
  });
  await test('Phase 2 shared acyclic Next actions survive serialization', async () => {
    const d = await fixture(), shared = d.context.register(d.context.obj({ S: 'GoTo', D: N.of('last') }));
    chain(d).set(k('Next'), d.context.obj([shared, shared]));
    const out = await PDFDocument.load(await repair([{ doc: await reopen(d), order: [2,0,1] }]));
    validateNavigation(out);
    const a = out.context.lookup(get(out, out.getPage(1).node, 'Annots').get(2));
    const next = get(out, get(out,a,'A'),'Next'); assert.equal(next.size(),2);
    for (const raw of next.asArray()) assert.equal(resolve(out,get(out,out.context.lookup(raw),'D')).get(0).toString(),out.getPage(0).ref.toString());
  });
  await test('Phase 2 validator rejects injected serialized action cycle', async () => {
    const out = await verify([{doc:await fixture(),order:[0,1,2]}]);
    const a = chain(out); a.set(k('Next'),out.context.register(a));
    const bad = await reopen(out); assert.throws(()=>validateNavigation(bad),/cyclic action/);
  });
  return fixture;
};
