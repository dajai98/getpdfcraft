const assert = require('node:assert/strict');
const fs = require('node:fs');
const { historicalSource, reviewedCurrentSource } = require('../scripts/lab/reviewed-source.cjs');
const read = p => fs.readFileSync(p);
const file = 'app/tools/compress-pdf/page.js';
const expected = '1bc4a7c268e12d3ce66fe8f70bb281e8b60ffd71fcc327bea6963bc770c8a8ce';
const reviewFile = 'docs/final-adsense-recovery-2026-11-02/evidence/source-transition.json';
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
test('historical source verifies original bytes separately from current source', () => {
  assert.notDeepEqual(historicalSource(read,file,expected), read(file));
  reviewedCurrentSource(read,file,expected);
});
test('unknown current source rejected', () => assert.throws(()=>reviewedCurrentSource(p=>p===file?Buffer.from('changed'):read(p),file,expected),/current implementation/));
test('corrupt archive rejected', () => assert.throws(()=>historicalSource(p=>p.endsWith('source-snapshots.json')?Buffer.from('{}'):read(p),file,expected),/archive changed/));
test('corrupt replay rejected', () => assert.throws(()=>reviewedCurrentSource(p=>p.endsWith('compression-current-replay.json')?Buffer.from('{}'):read(p),file,expected),/evidence changed/));
test('empty evidence cannot authorize a source transition', () => {
  const review=JSON.parse(read(reviewFile));review.evidence=[];
  assert.throws(()=>reviewedCurrentSource(p=>p===reviewFile?Buffer.from(JSON.stringify(review)):read(p),file,expected),/both current/);
});
test('unknown historical hash rejected', () => assert.throws(()=>reviewedCurrentSource(read,file,'0'.repeat(64)),/unreviewed historical origin/));
console.log(`SOURCE REVIEW ${count} PASS, 0 FAIL`);
