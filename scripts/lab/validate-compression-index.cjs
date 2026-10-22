// Read-only validation. Registration and collection never happen here.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const defaultRoot = path.resolve(__dirname, '../..');
const runBase = 'tests/evidence/compression/runs';
const historicalPath = 'data/lab/compression.json';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function validateCompressionIndex(index, { root = defaultRoot, io = fs } = {}) {
  const fail = message => { throw new Error('Compression index: ' + message); };
  const resolve = relative => {
    if (typeof relative !== 'string' || !relative || relative.includes('\\') || relative.split('/').some(p => !p || p === '.' || p === '..') || path.isAbsolute(relative)) fail('unsafe artifact path');
    const absolute = path.resolve(root, relative);
    if (!absolute.startsWith(path.resolve(root) + path.sep)) fail('artifact outside repository');
    return absolute;
  };
  const exists = p => io.existsSync(resolve(p));
  const read = p => io.readFileSync(resolve(p));
  const hashCheck = (p, expected) => {
    if (!/^[a-f0-9]{64}$/.test(expected || '')) fail('malformed hash: ' + p);
    if (!exists(p)) fail('missing artifact: ' + p);
    if (sha(read(p)) !== expected) fail('hash mismatch: ' + p);
  };
  const studies = index?.studies?.filter(s => s.name === 'compression');
  if (!studies || studies.length !== 1) fail('exactly one compression study required');
  const study = studies[0];
  if (typeof study.activeRunId !== 'string' || !study.activeRunId) fail('activeRunId is required');
  if (!Array.isArray(study.runs)) fail('runs must be an array');
  const ids = new Set();
  for (const entry of study.runs) {
    if (!entry || typeof entry.runId !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(entry.runId) || typeof entry.evidenceStatus !== 'string' || !entry.evidenceStatus || typeof entry.manifestPath !== 'string' || !/^[a-f0-9]{64}$/.test(entry.manifestSha256 || '')) fail('malformed run registration');
    if (ids.has(entry.runId)) fail('duplicate run ID: ' + entry.runId);
    ids.add(entry.runId);
  }
  const active = study.runs.filter(r => r.runId === study.activeRunId);
  if (active.length !== 1) fail('activeRunId must resolve to exactly one registered run: ' + study.activeRunId);
  if (!active[0].evidenceStatus.startsWith('COLLECTED:')) fail('active run is not eligible (superseded, historical or incomplete): ' + study.activeRunId);
  const historical = study.runs.filter(r => r.manifestPath === historicalPath);
  if (historical.length !== 1 || historical[0].evidenceStatus !== 'PRESERVED HISTORICAL RUN') fail('historical registration must remain present exactly once');
  const directoryRuns = study.runs.filter(r => r.manifestPath !== historicalPath);
  const registeredIds = new Set(directoryRuns.map(r => r.runId));
  if (!exists(runBase)) fail('run directory root is missing');
  const diskIds = io.readdirSync(resolve(runBase));
  for (const id of diskIds) {
    const stat = io.lstatSync(resolve(runBase + '/' + id));
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail('unexpected entry in runs directory: ' + id);
    if (!registeredIds.has(id)) fail('unregistered on-disk run directory (possibly partial/incomplete): ' + id);
  }
  for (const entry of directoryRuns) {
    const directory = runBase + '/' + entry.runId;
    if (!diskIds.includes(entry.runId) || !exists(directory)) fail('missing registered run directory: ' + entry.runId);
    if (entry.manifestPath !== directory + '/manifest.json') fail('malformed run manifest path: ' + entry.runId);
    if (exists(directory + '/failure.json')) fail('incomplete/failed registered run: ' + entry.runId);
    if (!exists(entry.manifestPath)) fail('no completed manifest (partial run): ' + entry.runId);
    hashCheck(entry.manifestPath, entry.manifestSha256);
    const manifest = JSON.parse(read(entry.manifestPath));
    if (manifest.runId !== entry.runId || manifest.study !== 'compression' || manifest.status !== 'COMPLETE' || !manifest.completedAt || !Number.isFinite(Date.parse(manifest.completedAt))) fail('run has no valid completed manifest: ' + entry.runId);
    if (!manifest.artifactHashes || typeof manifest.artifactHashes !== 'object' || Array.isArray(manifest.artifactHashes)) fail('missing artifact hashes: ' + entry.runId);
    const names = Object.keys(manifest.artifactHashes);
    if (!names.length || names.some(n => !/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(n) || n === 'manifest.json' || n === 'failure.json')) fail('invalid artifact inventory: ' + entry.runId);
    const actual = io.readdirSync(resolve(directory)).sort();
    if (JSON.stringify(actual) !== JSON.stringify([...names, 'manifest.json'].sort())) fail('artifact inventory differs from directory: ' + entry.runId);
    for (const name of names) hashCheck(directory + '/' + name, manifest.artifactHashes[name]);
    if (!Array.isArray(manifest.results) || !manifest.results.length) fail('missing measurements: ' + entry.runId);
    for (const result of manifest.results) {
      for (const [key, hashKey] of [['inputPath','inputSha256'], ['rawInspectionPath','inspectionSha256'], ['outputPath','outputSha256']]) {
        const p = result[key];
        if (key === 'outputPath' && p === null && result.status === 'FAILURE' && result.outputSha256 === null) continue;
        if (typeof p !== 'string' || path.posix.dirname(p) !== directory || !names.includes(path.posix.basename(p))) fail('invalid result artifact reference: ' + entry.runId);
        hashCheck(p, result[hashKey]);
      }
    }
    if (entry.runId === study.activeRunId && manifest.publicationStatus !== index.publicationStatus) fail('active publication status mismatch');
  }
  hashCheck(historical[0].manifestPath, historical[0].manifestSha256);
  if (!historical[0].artifactHashes || !Object.keys(historical[0].artifactHashes).length) fail('historical inventory missing');
  for (const [p, h] of Object.entries(historical[0].artifactHashes)) hashCheck(p, h);
  return { activeRunId: study.activeRunId, directoryRuns };
}
module.exports = { validateCompressionIndex };
