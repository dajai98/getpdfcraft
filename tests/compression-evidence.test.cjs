const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const report = JSON.parse(read('data/lab/compression.json'));
const manifest = JSON.parse(read('tests/fixtures/compression/manifest.json'));
let passed = 0;
function check(name, fn) { fn(); passed++; console.log('PASS ' + name); }
check('Nine unique records, independent inspections and explicit Node-only scope', () => {
  assert.equal(report.results.length, 9);
  assert.equal(new Set(report.results.map(r => r.fixtureId)).size, 9);
  assert(report.execution.includes('NOT REAL BROWSER'));
  assert.equal(manifest.generationVerifiedTwice, true);
  assert.equal(manifest.fixtures.length, 9);
});
check('Collected source and lockfile hashes match this evidence version', () => {
  for (const [file, hash] of Object.entries(report.sourceHashes)) {
    const archived = file === 'scripts/lab/collect-compression.cjs' ? 'tests/evidence/compression/legacy-collector.cjs' : file;
    assert.equal(sha(read(archived)), hash, file);
  }
});
for (const r of report.results) check('Traceable measurements: ' + r.fixtureId, () => {
  const input = read(r.inputPath), raw = JSON.parse(read(r.rawInspectionPath));
  assert.equal(input.length, r.inputBytes); assert.equal(sha(input), r.inputSha256);
  assert.equal(manifest.fixtures.find(f => f.fixtureId === r.fixtureId).inputSha256, r.inputSha256);
  assert.equal(r.status, r.expectedStatus);
  assert.equal(r.browserVerification, 'NOT TESTED');
  assert(r.visualQuality.startsWith('NOT TESTED'));
  assert(r.interactiveSelectability.startsWith('NOT TESTED'));
  if (r.status === 'SUCCESS') {
    const output = read(r.outputPath);
    assert.equal(output.length, r.outputBytes); assert.equal(sha(output), r.outputSha256);
    assert.equal(r.byteChange, output.length - input.length);
    assert.equal(r.percentChange, r.byteChange / input.length * 100);
    assert.equal(r.independentOutputOpens, true); assert.equal(raw.after.opens, true);
    assert.equal(raw.before.pageCount, raw.after.pageCount);
    assert.equal(r.textExtractionMatches, true); assert.equal(r.geometryMatches, true);
    assert.equal(r.imageStreamsMatch, true);
    assert.equal(r.downloadName, 'processed.pdf');
    assert(r.displayedSummary[0].includes(input.length.toLocaleString()));
    assert(r.displayedSummary[0].includes(output.length.toLocaleString()));
    if (r.byteChange > 0) assert(r.displayedSummary[0].includes('Output is larger'));
  } else {
    assert.equal(r.outputPath, null); assert.equal(r.outputSha256, null);
    assert.equal(r.outputBytes, null); assert.equal(r.percentChange, null);
    assert.equal(raw.before.opens, false);
    assert(r.error.includes('could not be read')); assert.equal(raw.after, null);
  }
});
check('Larger outputs and parser failure are retained', () => {
  assert.equal(report.results.filter(r => r.byteChange > 0).length, 2);
  assert.equal(report.results.filter(r => r.status === 'FAILURE').length, 1);
});
check('Form field values independently parsed before/after match; interaction not implied', () => {
  const r = report.results.find(r => r.fixtureId === 'form'), raw = JSON.parse(read(r.rawInspectionPath));
  assert.deepEqual(raw.after.fields, raw.before.fields);
  assert(raw.after.fields.sampleName.some(f => f.value === 'Benchmark Example'));
  assert(raw.after.fields.sampleConsent.some(f => f.value === 'Yes'));
});
check('Empty extracted text for raster-only fixtures is not claimed selectable', () => {
  for (const id of ['image-heavy-synthetic', 'scan-style-synthetic']) {
    const r = report.results.find(r => r.fixtureId === id), raw = JSON.parse(read(r.rawInspectionPath));
    assert(raw.before.pages.every(p => p.textCharacters === 0));
    assert(raw.after.pages.every(p => p.textCharacters === 0));
  }
});
console.log('TOTAL ' + passed + ' PASS ' + passed + ' FAIL 0');

require('./compression-runs.test.cjs');
require('./compression-index.test.cjs');
require('./compression-realworld.test.cjs');
require('./compression-review.test.cjs');
