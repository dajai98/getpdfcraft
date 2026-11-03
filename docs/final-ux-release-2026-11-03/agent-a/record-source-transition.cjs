// Record a new current-source review without modifying historical measurements.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '../../..');
const read = file => fs.readFileSync(path.join(root, file));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const normalizedSha = bytes => sha(Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n')));
const git = (...args) => execFileSync('git', ['-c', 'core.safecrlf=false', ...args], { cwd: root, encoding: 'utf8' });
const oldPath = 'docs/final-adsense-recovery-2026-11-02/evidence/source-transition.json';
const newPath = 'docs/final-ux-release-2026-11-03/evidence/source-transition.json';
const oldBytes = read(oldPath);
const old = JSON.parse(oldBytes);
assert.equal(old.status, 'PASS');
const existing = fs.existsSync(path.join(root, newPath)) ? JSON.parse(read(newPath)) : null;
if (existing) assert.equal(existing.previousReview?.sha256, sha(oldBytes), 'Existing review refers to another historical baseline');
for (const immutable of [oldPath, 'tests/evidence', 'data/lab', 'package-lock.json', 'public/_redirects']) {
  assert.equal(git('diff', '--name-only', 'HEAD', '--', immutable).trim(), '', `Historical source changed: ${immutable}`);
}

const changed = git('diff', '--name-only', 'HEAD', '--', 'app', 'components', 'lib', 'public', 'scripts/lab', 'tests')
  .trim().split(/\r?\n/).filter(Boolean).map(file => file.replaceAll('\\', '/'));
for (const file of changed.filter(file => file.startsWith('app/tools/'))) {
  const before = git('show', `HEAD:${file}`).replace(/\r\n/g, '\n');
  const after = read(file).toString('utf8').replace(/\r\n/g, '\n');
  const previousWithBrand = before.replace(/PDFcraft|PDFCraft/g, 'GetPDFCraft');
  assert.equal(after.replaceAll('#C92F0A', '#E8380D').trimEnd(), previousWithBrand.trimEnd(), `Tool handler changed beyond public branding and visual color tokens: ${file}`);
}
const assets = ['public/icon.png'];
const files = new Set([...Object.keys(old.currentLfHashes), ...Object.keys(existing?.currentLfHashes || {}), ...changed, 'components/ui/CategoryIcon.js']);
for (const asset of assets) files.delete(asset);
const currentLfHashes = Object.fromEntries([...files].sort().map(file => [file, normalizedSha(read(file))]));
const assetHashes = Object.fromEntries(assets.map(file => [file, sha(read(file))]));
const specs = [
  ['docs/final-ux-release-2026-11-03/agent-a/compression-current-replay.json', 12, 'docs/final-ux-release-2026-11-03/agent-a/replay-compression-current.cjs'],
  ['docs/final-ux-release-2026-11-03/agent-a/preservation-current-replay.json', 22, 'docs/final-ux-release-2026-11-03/agent-a/replay-preservation-current.cjs'],
];
const evidence = [], replayedSourceHashes = {};
for (const [file, expectedPasses, script] of specs) {
  const bytes = read(file), report = JSON.parse(bytes);
  assert.equal(report.status, 'PASS');
  assert.equal(report.passed ?? report.counts?.PASS, expectedPasses);
  assert.equal(report.rows.length, expectedPasses);
  assert(report.rows.every(row => row.checkStatus === 'PASS' || row.status === 'PASS'), `Replay row failed: ${file}`);
  assert.equal(report.replayScriptSha256, sha(read(script)), `Replay script mismatch: ${file}`);
  assert(Date.parse(report.startedAt) > Date.parse(old.reviewedAt), `Replay is stale: ${file}`);
  for (const [source, hash] of Object.entries(report.sourceHashes)) {
    assert.equal(hash, sha(read(source)), `Replay source changed: ${source}`);
    if (replayedSourceHashes[source]) assert.equal(replayedSourceHashes[source], hash, `Replay source conflicts: ${source}`);
    replayedSourceHashes[source] = hash;
  }
  evidence.push({ path: file, sha256: sha(bytes), expectedPasses });
}

const review = {
  status: 'PASS', reviewedAt: new Date().toISOString(),
  reason: 'Current-source UX, accessible action/link contrast, and public GetPDFCraft branding review. Tool handlers differ only in public brand copy and visual orange color tokens. Fresh retained-input replays check 12 compression and 22 preservation cases. The historical review, source archive, manifests and numeric measurements remain unchanged. Current UI, metadata, documentation, tests, and icon bytes are bound by hashes.',
  previousReview: { path: oldPath, sha256: sha(oldBytes) },
  oldHashes: old.oldHashes,
  currentLfHashes, assetHashes, replayedSourceHashes, evidence,
};
fs.mkdirSync(path.dirname(path.join(root, newPath)), { recursive: true });
fs.writeFileSync(path.join(root, newPath), JSON.stringify(review, null, 2) + '\n');
console.log(JSON.stringify({ path: newPath, currentSources: files.size, assets: assets.length, replayPasses: evidence.map(item => item.expectedPasses), status: 'PASS' }));
