// Narrow, reproducible closure of F01. Never changes historical measurements.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
process.chdir(root);
const base = 'docs/final-adsense-recovery-2026-11-02/';
const read = p => fs.readFileSync(p);
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const lf = b => b.toString('utf8').replace(/\r\n/g, '\n');
const previous = JSON.parse(read(base + 'evidence/pre-doc-sync/source-transition.json'));
const file = 'lib/toolDocumentation.json';
const before = spawnSync('git', ['show', 'caacbaf8f3816c6736a9d1a97f9ffc34c3973e26:' + file]);
assert.equal(before.status, 0);
assert.equal(sha(lf(before.stdout)), previous.currentLfHashes[file]);
const oldText = 'Set the starting number, choose top or bottom combined with left, center or right, and select 10, 12 or 16 point text. The default is 1, bottom center, 12 point. The current input parses an integer and falls back to 1 for an empty or zero value.';
const newText = "Set a positive whole starting number, choose top or bottom combined with left, center or right, and select 10, 12 or 16 point text. The default is 1, bottom center, 12 point. Empty, zero, negative or fractional starting values are rejected; the full sequence must stay within JavaScript's safe integer range.";
assert.equal(lf(before.stdout).split(oldText).length, 2);
assert.equal(lf(read(file)), lf(before.stdout).replace(oldText, newText), 'Only the reviewed documentation sentence may change');
for (const [source, hash] of Object.entries(previous.currentLfHashes)) {
  if (source !== file) assert.equal(sha(lf(read(source))), hash, 'Unreviewed source change: ' + source);
}
const review = structuredClone(previous);
review.reviewedAt = new Date().toISOString();
review.reason += ' F01 closure: exact Page Numbers documentation sentence synchronized with existing positive-integer validation; both current-source replays rerun, with no executable change.';
review.currentLfHashes[file] = sha(lf(read(file)));
for (const evidence of review.evidence) {
  const bytes = read(evidence.path), replay = JSON.parse(bytes);
  assert.equal(replay.status, 'PASS');
  assert.equal(replay.passed ?? replay.counts?.PASS, evidence.expectedPasses);
  assert.equal(replay.rows.length, evidence.expectedPasses);
  assert(replay.rows.every(row => (row.checkStatus ?? row.status) === 'PASS'));
  for (const [source, hash] of Object.entries(replay.sourceHashes)) {
    assert.equal(sha(read(source)), hash, 'Replay source is stale: ' + source);
    review.replayedSourceHashes[source] = hash;
  }
  const script = evidence.expectedPasses === 12 ? 'replay-compression-current.cjs' : 'replay-preservation-current.cjs';
  assert.equal(replay.replayScriptSha256, sha(read(base + 'agent-a/' + script)));
  assert(new Date(replay.startedAt) > new Date(previous.reviewedAt), 'Fresh replay required');
  evidence.sha256 = sha(bytes);
}
// Validate the actual final export and executable handler before recording review.
for (const suite of ['tool-documentation', 'final-recovery']) {
  const run = spawnSync(process.execPath, ['tests/' + suite + '.test.cjs'], { encoding: 'utf8' });
  fs.writeFileSync(base + 'evidence/doc-sync-' + suite + '.log', run.stdout + run.stderr);
  assert.equal(run.status, 0, suite + ' failed; no review recorded');
}
review.docSyncReview = {
  finding: 'F01', file, previousLfHash: previous.currentLfHashes[file], currentLfHash: review.currentLfHashes[file],
  sourceChange: 'Exactly one documentation paragraph; all other previously reviewed dependencies unchanged',
  validation: ['Fresh 12-case compression replay', 'Fresh 22-case preservation replay', 'Final-export tool documentation test', '41 current-handler regression checks'],
  generator: base + 'agent-a/record-doc-sync-review.cjs', generatorSha256: sha(read(__filename)),
};
fs.writeFileSync(base + 'evidence/source-transition.json', JSON.stringify(review, null, 2) + '\n');
console.log(JSON.stringify({status: 'PASS', ...review.docSyncReview}, null, 2));
