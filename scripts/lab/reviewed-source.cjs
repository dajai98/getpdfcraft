// Historical byte integrity and current implementation review are separate gates.
// Never rewrite a historical measurement or accept an unknown source transition.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const normalizedSha = b => sha(Buffer.from(b.toString('utf8').replace(/\r\n/g, '\n')));
const archivePath = 'tests/evidence/preservation/runs/preservation-20261018-postrepair-02/source-snapshots.json';
const archiveHash = '8659dca8e329b97e1abd1eda40a16914d265860c1e6961435f02b4f0079fefce';
const reviewPath = 'docs/final-ux-release-2026-11-03/evidence/source-transition.json';
function historicalSource(read, file, expected) {
  const current = read(file);
  if (sha(current) === expected) return current;
  const bytes = read(archivePath);
  assert.equal(sha(bytes), archiveHash, 'historical source archive changed');
  const encoded = JSON.parse(bytes)[file];
  assert(encoded, 'missing historical source: ' + file);
  const archived = Buffer.from(encoded, 'base64');
  assert.equal(sha(archived), expected, 'historical source differs: ' + file);
  return archived;
}
function reviewedCurrentSource(read, file, expected) {
  const current = read(file);
  if (sha(current) === expected) return;
  const review = JSON.parse(read(reviewPath));
  assert.equal(review.status, 'PASS', 'current implementation review incomplete');
  assert.equal(review.evidence.length, 2, 'both current replay reports required');
  assert(review.oldHashes[file]?.includes(expected), 'current implementation has unreviewed historical origin: ' + file);
  assert.equal(normalizedSha(current), review.currentLfHashes[file], 'current implementation/dependencies differ from reviewed source: ' + file);
  for (const [dependency, hash] of Object.entries(review.currentLfHashes)) {
    assert.equal(normalizedSha(read(dependency)), hash, 'current implementation review dependency changed: ' + dependency);
  }
  for (const [asset, hash] of Object.entries(review.assetHashes || {})) {
    assert.equal(sha(read(asset)), hash, 'current implementation review asset changed: ' + asset);
  }
  for (const evidence of review.evidence) {
    assert.equal(sha(read(evidence.path)), evidence.sha256, 'current implementation replay evidence changed');
    const replay = JSON.parse(read(evidence.path));
    assert.equal(replay.status, 'PASS', 'current implementation replay did not pass');
    assert.equal(replay.passed ?? replay.counts?.PASS, evidence.expectedPasses, 'incomplete current replay');
    for (const [source, hash] of Object.entries(replay.sourceHashes)) {
      if (review.replayedSourceHashes[source]) assert.equal(hash, review.replayedSourceHashes[source], 'replay is for another source version');
    }
  }
}
module.exports = { historicalSource, reviewedCurrentSource, normalizedSha };
