// All adversarial mutations are in memory; real evidence is read-only.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { validateCompressionIndex } = require('../scripts/lab/validate-compression-index.cjs');
const root = path.resolve(__dirname, '..');
const base = 'tests/evidence/compression/runs';
const original = JSON.parse(fs.readFileSync(path.join(root,'data/lab/manifest.json')));
let passed = 0;
function test(name, fn) { fn(); passed++; console.log('PASS '+name); }
function scenario() {
  const index = structuredClone(original), study = index.studies.find(s=>s.name==='compression');
  const active = study.runs.find(r=>r.runId===study.activeRunId);
  const absent = new Set(), content = new Map(), listing = new Map(), present = new Set();
  const relative = p => path.relative(root,p).split(path.sep).join('/');
  const io = {
    existsSync(p) { const r=relative(p); return absent.has(r)?false:present.has(r)?true:fs.existsSync(p); },
    readFileSync(p) { return content.get(relative(p)) ?? fs.readFileSync(p); },
    readdirSync(p) { return listing.get(relative(p)) ?? fs.readdirSync(p); },
    lstatSync(p) { return present.has(relative(p))?{isDirectory:()=>true,isSymbolicLink:()=>false}:fs.lstatSync(p); }
  };
  function editManifest(edit) {
    const m=JSON.parse(fs.readFileSync(path.join(root,active.manifestPath)));
    edit(m);const bytes=Buffer.from(JSON.stringify(m));content.set(active.manifestPath,bytes);
    active.manifestSha256=crypto.createHash('sha256').update(bytes).digest('hex');
  }
  return {index,study,active,absent,content,listing,present,editManifest,validate:()=>validateCompressionIndex(index,{root,io})};
}
test('Actual index reconciles all run directories',()=>assert.equal(validateCompressionIndex(original).directoryRuns.length,4));
test('Missing activeRunId rejected',()=>{const s=scenario();delete s.study.activeRunId;assert.throws(s.validate,/activeRunId is required/);});
test('Active ID without registration rejected',()=>{const s=scenario();s.study.activeRunId='nonexistent';assert.throws(s.validate,/exactly one registered/);});
test('Removed active registration rejected',()=>{const s=scenario();s.study.runs=s.study.runs.filter(r=>r!==s.active);assert.throws(s.validate,/exactly one registered/);});
test('Exact audit reproduction: both new registrations removed, run 02 still active',()=>{const s=scenario();s.study.runs=s.study.runs.filter(r=>r.manifestPath==='data/lab/compression.json');assert.equal(s.study.activeRunId,'compression-20261015-hardening-02');assert.throws(s.validate,/exactly one registered/);});
test('Registered directory missing rejected',()=>{const s=scenario();s.listing.set(base,fs.readdirSync(path.join(root,base)).filter(id=>id!==s.active.runId));assert.throws(s.validate,/missing registered run directory/);});
test('Unregistered on-disk partial directory explicitly rejected',()=>{const s=scenario();s.listing.set(base,[...fs.readdirSync(path.join(root,base)),'partial-unregistered']);s.present.add(base+'/partial-unregistered');assert.throws(s.validate,/unregistered on-disk.*partial-unregistered/);});
test('Removed superseded registration leaves detectable unregistered directory',()=>{const s=scenario();s.study.runs=s.study.runs.filter(r=>!r.evidenceStatus.startsWith('SUPERSEDED'));assert.throws(s.validate,/unregistered on-disk/);});
test('Superseded active run rejected',()=>{const s=scenario();s.active.evidenceStatus='SUPERSEDED: test';assert.throws(s.validate,/not eligible/);});
test('Active run without completed manifest rejected',()=>{const s=scenario();s.absent.add(s.active.manifestPath);assert.throws(s.validate,/no completed manifest/);});
test('Manifest marked incomplete rejected even with matching manifest hash',()=>{const s=scenario();s.editManifest(m=>{m.status='INCOMPLETE';});assert.throws(s.validate,/no valid completed manifest/);});
test('Failure marker rejects apparently complete active run',()=>{const s=scenario();s.present.add(base+'/'+s.active.runId+'/failure.json');assert.throws(s.validate,/incomplete\/failed/);});
test('Duplicate registration rejected',()=>{const s=scenario();s.study.runs.push(structuredClone(s.active));assert.throws(s.validate,/duplicate run ID/);});
test('Malformed registration rejected',()=>{const s=scenario();delete s.active.manifestSha256;assert.throws(s.validate,/malformed run registration/);});
test('Misdirected manifest path rejected',()=>{const s=scenario();s.active.manifestPath='data/lab/compression.json.bak';assert.throws(s.validate,/malformed run manifest path/);});
test('Artifact corruption rejected',()=>{const s=scenario();s.content.set(base+'/'+s.active.runId+'/environment.json',Buffer.from('{}'));assert.throws(s.validate,/hash mismatch/);});
test('Result reference outside its run rejected',()=>{const s=scenario();s.editManifest(m=>{m.results[0].inputPath='tests/fixtures/compression/text-heavy.pdf';});assert.throws(s.validate,/invalid result artifact reference/);});
console.log('RUN INDEX TESTS '+passed+' PASS, 0 FAIL');
