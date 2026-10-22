// Internal, read-only projection. No route, publication, collection or registration.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { validateCompressionIndex } = require('./validate-compression-index.cjs');
const rootDefault = path.resolve(__dirname, '../..');
const approved = {
  'compression-20261015-hardening-02': ['db79af3b4dbd0129f5bfe5fe609983ddbe199b40ce5422a9ed438643d6b724de', 'ACTIVE'],
  'compression-20261016-realworld-01': ['3e568167348ee696e41f5c5a7133910b465a9a769115dd50af66f7ebeb76e4c0', 'SUPPLEMENTAL'],
  'compression-20261016-scan-01': ['9bc22aabc985ed1720bea06378ccd1e321d2fa1e07e7d256b4628ce9834636cd', 'SUPPLEMENTAL'],
};
const limitations = [
  'No universal savings: output may shrink very little, remain unchanged or grow. Keep the original.',
  'Metadata, PDF version and linearization can change; both real-document outputs lost linearization.',
  'Visual review covered only NASA policy pages 1, 14, 27 and Apollo pages 1, 127, 254 at 750-pixel page height. It does not prove pixel-perfect or whole-document fidelity.',
  'Interactive text selection, form interaction and signature preservation are NOT TESTED. Parser checks do not establish these behaviors.',
  'Browser execution/download is BLOCKED / NOT TESTED. Cross-browser/device compatibility is NOT TESTED.',
  'The real-world sample contains only two NASA documents. Synthetic proxies are not photographs, physical scans or Office exports, and this sample does not represent all PDFs.',
  'NASA document use does not imply NASA endorsement. No permission to redistribute source PDFs or review images is granted by this table.',
];
function prepareInternal({ root = rootDefault, io = fs, index } = {}) {
  const read = p => {
    assert(typeof p === 'string' && !p.includes('\\') && !path.isAbsolute(p) && !p.split('/').some(x => !x || x === '.' || x === '..'), 'unsafe reference');
    return io.readFileSync(path.join(root, p));
  };
  const json = p => JSON.parse(read(p));
  const sha = b => crypto.createHash('sha256').update(b).digest('hex');
  index ||= json('data/lab/manifest.json');
  const state = validateCompressionIndex(index, { root, io });
  assert.equal(state.activeRunId, 'compression-20261015-hardening-02', 'active evidence requires new editorial review');
  assert.equal(index.publicationStatus, 'INTERNAL — NOT READY FOR PUBLICATION');
  const study = index.studies.find(s => s.name === 'compression');
  const reviewPath = 'tests/evidence/compression/reviews/review-20261016-limited-02/observations.json';
  assert.equal(sha(read(reviewPath)), '644c8ccd23f5fed6b7dbb21cc635445a7a5bf6b6b498386314206d3c06df5b87');
  const review = json(reviewPath);
  assert.equal(sha(read(review.renderManifest)), review.renderManifestSha256);
  for (const p of review.pages) assert.equal(sha(read(p.image)), p.imageSha256);
  const rows = [], inventory = [];
  for (const entry of study.runs) {
    const m = json(entry.manifestPath), approval = approved[entry.runId];
    if (approval) {
      assert.equal(entry.manifestSha256, approval[0], 'evidence changed since audit');
      assert.equal(sha(read(entry.manifestPath)), approval[0]);
      assert(approval[1] === 'ACTIVE' ? entry.runId === state.activeRunId : entry.evidenceStatus.startsWith('SUPPLEMENTAL:'), 'supplemental role changed');
      assert.equal(m.browserTested, false);
      for (const p of ['app/tools/compress-pdf/page.js', 'components/hooks/useGeneratedResult.js', 'lib/pdfInput.js', 'package-lock.json']) {
        assert.equal(sha(read(p)), m.sourceHashes[p], 'current implementation/dependencies differ from measured source');
      }
    }
    for (const r of m.results) {
      inventory.push({ runId: entry.runId, fixtureId: r.fixtureId, classification: approval ? 'SAFE TO PUBLISH' : 'INTERNAL ONLY', scope: approval ? 'Recorded Node measurement only; future publication requires review' : 'Historical, superseded or not approved; excluded from table' });
      if (!approval) continue;
      assert(['SUCCESS', 'FAILURE'].includes(r.status));
      assert(['SYNTHETIC', 'REAL_WORLD'].includes(r.fixtureKind));
      assert(r.provenance && m.gitHead && m.sourceHashes && m.environment.node && m.environment.pdfLib);
      const a = read(r.inputPath), b = r.outputPath ? read(r.outputPath) : null;
      assert.equal(a.length, r.inputBytes);
      assert.equal(r.outputBytes, b ? b.length : null);
      assert.equal(r.byteChange, b ? b.length - a.length : null);
      assert.equal(r.percentChange, b ? (b.length - a.length) / a.length * 100 : null);
      assert.equal(r.status, b ? 'SUCCESS' : 'FAILURE');
      if (b) assert.equal(r.independentOutputOpens, true);
      else assert(r.error);
      for (const k of ['browserVerification', 'interactiveSelectability', 'formInteraction', 'signatureValidity']) assert.equal(r[k], 'NOT TESTED');
      const real = r.fixtureKind === 'REAL_WORLD';
      rows.push({
        runId: entry.runId, role: approval[1], fixtureId: r.fixtureId,
        label: r.fixtureId === 'apollo11-press-kit' ? 'Apollo 11 press kit (archival scan)' : r.fixtureId === 'nasa-access-plan' ? 'NASA Public Access Plan' : r.fixtureId,
        documentType: r.type || (r.fixtureId === 'apollo11-press-kit' ? 'Real archival scan' : 'Real published document'),
        fixtureKind: r.fixtureKind, provenance: r.provenance,
        inputBytes: r.inputBytes, outputBytes: r.outputBytes, byteChange: r.byteChange, percentChange: r.percentChange,
        status: r.status, error: r.error, warnings: r.warnings,
        observation: b ? (r.byteChange > 0 ? 'Output grew; retain original if size is the goal.' : r.byteChange === 0 ? 'No size reduction.' : 'Measured reduction for this input only.') : 'Rejected input; no output or savings measurement.',
        scope: 'Node source-handler harness with simulated React/URL plumbing; not browser execution or download verification.',
        environment: m.environment, sourceRevision: m.gitHead, sourceHashes: m.sourceHashes, collectedAt: m.completedAt,
        inputSha256: r.inputSha256, outputSha256: r.outputSha256,
        references: { manifest: entry.manifestPath, input: r.inputPath, output: r.outputPath, inspection: r.rawInspectionPath, provenance: r.provenancePath || null },
        independentReopen: b ? 'PDF.js REPARSE PASSED' : 'NO OUTPUT',
        textExtractionMatches: r.textExtractionMatches, geometryMatches: r.geometryMatches,
        browserExecution: 'BLOCKED / NOT TESTED', download: 'NOT TESTED', interactiveSelection: 'NOT TESTED', formInteraction: 'NOT TESTED', signaturePreservation: 'NOT TESTED',
        visualReview: real ? { status: 'LIMITED', pages: review.pages.filter(p => p.runId === entry.runId).map(p => p.page), reference: reviewPath, observation: 'No obvious new clipping, missing content or visible corruption at the recorded review scale; Codex image review, not human/browser testing.' } : { status: 'NOT TESTED' },
      });
    }
  }
  assert.deepEqual([...new Set(rows.map(r => r.runId))].sort(), Object.keys(approved).sort());
  assert.equal(rows.length, 12); assert.equal(rows.filter(r => r.byteChange > 0).length, 2); assert.equal(rows.filter(r => r.status === 'FAILURE').length, 2);
  return {
    schemaVersion: 1, publicationStatus: index.publicationStatus, publishEnabled: false,
    title: 'Compression observations from a small, selected PDF sample',
    introduction: 'PDFcraft currently performs structural/object-stream optimization: PDFDocument.load(...) followed by save({ useObjectStreams: true }). It does not target a specific output size or explicitly downsample images. In this selected sample, some PDFs shrank significantly, some shrank very little and some grew. Results depend on document structure and content; these are individual observations, not representative performance estimates.',
    methodology: [
      'Ten generated synthetic inputs cover specific structures and two rejection cases. Two public NASA documents supplement them; they were selected for availability and documented provenance, not random sampling.',
      'The production compression handler was exercised in Node with simulated React/URL plumbing. This tests persisted byte output, not browser file selection or downloads.',
      'Input/output byte lengths are read from retained artifacts. Percentage change is (outputBytes - inputBytes) / inputBytes * 100; positive means growth. Failures retain null output measurements, never zero-percent savings.',
      'Registered manifest and artifact SHA-256 hashes are validated before projection. Exact audited manifests are pinned; a new run needs explicit review before inclusion.',
      'PDF.js independently reopened successful outputs. Recorded text extraction and geometry comparisons are parser observations, not interactive selection or visual proof.',
      'Codex reviewed six paired representative-page renderings. The failed first renderer attempt remains archived. No whole-document fidelity or human/browser review is claimed.',
    ],
    limitations: [...limitations], percentConvention: 'positive=increase; negative=reduction; null=no output', rows, inventory,
    unavailable: [
      { classification: 'BLOCKED', area: 'Browser execution/download', testStatus: 'NOT TESTED', reason: 'Browser inventory unavailable; in-app browser unavailable during collection' },
      ...['Interactive selection', 'Form interaction', 'Signature preservation', 'Exhaustive visual review', 'Cross-browser/device compatibility', 'Real photographic-heavy PDF', 'Independently observed Office export'].map(area => ({ classification: 'NOT TESTED', area })),
    ],
  };
}
// Only this explicit allowlist crosses the internal/public boundary. Never spread
// an evidence row, environment, visual record or diagnostics into public output.
function prepare(options) {
  const internal = prepareInternal(options);
  const result = {
    schemaVersion: internal.schemaVersion, publicationStatus: internal.publicationStatus,
    publishEnabled: internal.publishEnabled, title: internal.title,
    introduction: internal.introduction, methodology: internal.methodology,
    limitations: internal.limitations, percentConvention: internal.percentConvention,
    unavailable: internal.unavailable,
    rows: internal.rows.map(r => ({
      runId: r.runId, role: r.role, fixtureId: r.fixtureId, label: r.label,
      documentType: r.documentType, fixtureKind: r.fixtureKind, provenance: r.provenance,
      inputBytes: r.inputBytes, outputBytes: r.outputBytes, byteChange: r.byteChange,
      percentChange: r.percentChange, status: r.status, observation: r.observation,
      scope: r.scope, sourceRevision: r.sourceRevision, collectedAt: r.collectedAt,
      inputSha256: r.inputSha256, outputSha256: r.outputSha256,
      environment: { node: r.environment.node, os: r.environment.os,
        release: r.environment.release, arch: r.environment.arch,
        pdfLib: r.environment.pdfLib, pdfjs: r.environment.pdfjs },
      independentReopen: r.independentReopen,
      textExtractionMatches: r.textExtractionMatches, geometryMatches: r.geometryMatches,
      browserExecution: r.browserExecution, download: r.download,
      interactiveSelection: r.interactiveSelection, formInteraction: r.formInteraction,
      signaturePreservation: r.signaturePreservation,
      visualReview: r.visualReview.status === 'LIMITED'
        ? { status: 'LIMITED', pages: r.visualReview.pages, observation: r.visualReview.observation }
        : { status: 'NOT TESTED' },
    })),
  };
  assertNoInternalPaths(result);
  return result;
}
function assertNoInternalPaths(value) {
  // Also inspect keys: path-keyed source hashes must not leak. Exact-envelope
  // validation below rejects unknown fields and other unapproved strings.
  if (typeof value === 'string') assert(!/(?:[a-z]:[\\/]|\\\\|file:\/\/|(?:^|\s)\/(?:[^\s/]+\/)|(?:^|[^a-z])(?:app|components|lib|scripts|tests|data|public|node_modules)\/|\.\.\/|[^\s]+\/(?:[^\s]+\.(?:pdf|json|cjs|js|png)))/i.test(value), 'internal path in public model');
  else if (Array.isArray(value)) value.forEach(assertNoInternalPaths);
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) { assertNoInternalPaths(k); assertNoInternalPaths(v); }
}
// A future consumer must validate the public envelope, not the internal model.
function validateProjection(candidate, options) {
  assertNoInternalPaths(candidate);
  assert.deepEqual(candidate, prepare(options), 'publication projection differs from validated evidence/copy/limitations');
  return true;
}
module.exports = { prepare, prepareInternal, validateProjection };
if (require.main === module) process.stdout.write(JSON.stringify(prepare(), null, 2) + '\n');
