// Read-only adversarial projection tests; real evidence is never mutated.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { prepare, prepareInternal, validateProjection } = require('../scripts/lab/prepare-compression-publication.cjs');
const root = path.resolve(__dirname, '..');
const clone = x => JSON.parse(JSON.stringify(x));
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
const model = prepare();
const internal = prepareInternal();
test('Complete envelope accepted with exact active/supplemental separation', () => {
  assert(validateProjection(model)); assert.equal(model.rows.length, 12);
  assert.equal(model.rows.filter(r => r.role === 'ACTIVE').length, 10);
  assert.equal(model.rows.filter(r => r.role === 'SUPPLEMENTAL').length, 2);
  assert.equal(internal.inventory.filter(r => r.classification === 'INTERNAL ONLY').length, 19);
  assert(!('inventory' in model));
});
test('Independently recomputed bytes and signed percentages; failures stay null', () => {
  for (const r of model.rows) {
    const references = internal.rows.find(i => i.runId === r.runId && i.fixtureId === r.fixtureId).references;
    const input = fs.statSync(path.join(root, references.input)).size;
    assert.equal(r.inputBytes, input);
    if (references.output) {
      const output = fs.statSync(path.join(root, references.output)).size;
      assert.equal(r.outputBytes, output); assert.equal(r.byteChange, output - input);
      assert.equal(r.percentChange, 100 * ((output - input) / input));
    } else { assert.equal(r.percentChange, null); assert.equal(r.status, 'FAILURE'); }
  }
  assert.equal(model.rows.filter(r => r.byteChange > 0).length, 2);
});
const mutations = {
  'unregistered evidence': m => { m.rows[0].runId = 'unregistered'; },
  'supplement promoted': m => { m.rows.at(-1).role = 'ACTIVE'; },
  'limitations omitted': m => { m.limitations.pop(); },
  'NOT TESTED promoted': m => { m.rows[0].interactiveSelection = 'PASS'; },
  'browser pass invented': m => { m.rows[0].browserExecution = 'PASS'; },
  'percentage altered': m => { m.rows[0].percentChange = -90; },
  'growth hidden': m => { m.rows = m.rows.filter(r => !(r.byteChange > 0)); },
  'endorsement invented': m => { m.introduction += ' NASA endorses PDFcraft.'; },
  'universal guarantee invented': m => { m.introduction += ' Guaranteed savings and universal visual fidelity.'; },
  'synthetic proxy relabeled': m => { m.rows[1].fixtureKind = 'REAL_WORLD'; },
  'publication enabled': m => { m.publishEnabled = true; },
};
for (const [name, mutate] of Object.entries(mutations)) test('Reject ' + name, () => {
  const m = clone(model); mutate(m); assert.throws(() => validateProjection(m));
});
for (const fixtureId of ['unsupported-input', 'encrypted-input']) {
  test('Reject removed failure ' + fixtureId, () => {
    const m = clone(model), row = m.rows.find(r => r.fixtureId === fixtureId);
    assert.equal(row.status, 'FAILURE');
    m.rows = m.rows.filter(r => r.fixtureId !== fixtureId);
    assert.equal(m.rows.length, 11);
    assert.throws(() => validateProjection(m));
  });
  test('Reject failure changed to success ' + fixtureId, () => {
    const m = clone(model), row = m.rows.find(r => r.fixtureId === fixtureId);
    assert.equal(row.status, 'FAILURE'); row.status = 'SUCCESS';
    assert.throws(() => validateProjection(m));
  });
}
test('Public allowlist excludes internal traceability and raw diagnostics', () => {
  for (const r of model.rows) {
    for (const key of ['references', 'sourceHashes', 'error', 'warnings']) assert(!(key in r));
    assert(!('reference' in r.visualReview));
    assert.deepEqual(Object.keys(r.environment).sort(), ['node','os','release','arch','pdfLib','pdfjs'].sort());
  }
  assert(internal.rows[0].references.input); assert(internal.rows[0].sourceHashes);
  assert.throws(() => validateProjection(internal));
});
for (const [name, inject] of Object.entries({
  'artifact reference': m => { m.rows[0].references = internal.rows[0].references; },
  'path-keyed hashes': m => { m.rows[0].sourceHashes = internal.rows[0].sourceHashes; },
  'visual reference': m => { m.rows.at(-1).visualReview.reference = internal.rows.at(-1).visualReview.reference; },
  'Windows path in label': m => { m.rows[0].label = 'C:\\private\\input.pdf'; },
  'Unix path in provenance': m => { m.rows[0].provenance = '/tmp/private/input.pdf'; },
  'relative path in observation': m => { m.rows[0].observation = 'tests/evidence/input.pdf'; },
  'raw diagnostic': m => { m.rows[0].environment.diagnostic = 'private diagnostic'; },
})) test('Reject public leakage: ' + name, () => {
  const m = clone(model); inject(m); assert.throws(() => validateProjection(m));
});
test('Missing active registration rejected before projection', () => {
  const index = JSON.parse(fs.readFileSync(path.join(root, 'data/lab/manifest.json')));
  const s = index.studies[0]; s.runs = s.runs.filter(r => r.runId !== s.activeRunId);
  assert.throws(() => prepare({ index }), /exactly one registered run/);
});
test('Supplement cannot become active', () => {
  const index = JSON.parse(fs.readFileSync(path.join(root, 'data/lab/manifest.json')));
  index.studies[0].activeRunId = 'compression-20261016-scan-01';
  assert.throws(() => prepare({ index }), /not eligible/);
});
for (const mode of ['missing', 'corrupt']) test(mode + ' evidence fails closed with read-only IO overlay', () => {
  const target = path.join(root, internal.rows[0].references.input);
  const io = { ...fs, readFileSync(p, ...args) {
    if (path.resolve(p) === target) { if (mode === 'missing') throw new Error('missing fixture'); return Buffer.from('corrupt'); }
    return fs.readFileSync(p, ...args);
  } };
  assert.throws(() => prepare({ io }));
});
test('Missing visual reference fails closed', () => {
  const io = { ...fs, readFileSync(p, ...args) { if (String(p).endsWith('observations.json')) throw new Error('missing review'); return fs.readFileSync(p, ...args); } };
  assert.throws(() => prepare({ io }), /missing review/);
});
test('Changed compression source requires review', () => {
  const io = { ...fs, readFileSync(p, ...args) { if (String(p).replaceAll('\\', '/').endsWith('app/tools/compress-pdf/page.js')) return Buffer.from('changed source'); return fs.readFileSync(p, ...args); } };
  assert.throws(() => prepare({ io }), /current implementation/);
});
console.log('PUBLICATION PREPARATION: ' + count + ' PASS, 0 FAIL');
