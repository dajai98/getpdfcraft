// Internal 7C collection: real public document, actual source handler, Node only.
// Does not register itself or overwrite evidence. Browser/visual work is NOT TESTED.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const cp = require('node:child_process');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
const { reserveRun, writeOnce } = require('./collect-compression.cjs');
const root = path.resolve(__dirname, '../..');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const json = x => JSON.stringify(x, null, 2) + '\n';
const scan = process.argv.includes('--scan');
const sourceUrl = scan ? 'https://ntrs.nasa.gov/api/citations/19690022248/downloads/19690022248.pdf' : 'https://www.nasa.gov/wp-content/uploads/2021/12/nasa-ocs-public-access-plan-may-2023.pdf';
const policyUrl = scan ? 'https://ntrs.nasa.gov/citations/19690022248' : 'https://www.nasa.gov/nasa-brand-center/images-and-media/';

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw Error('HTTP ' + response.status + ': ' + url);
  return { bytes: Buffer.from(await response.arrayBuffer()), url: response.url, status: response.status, contentType: response.headers.get('content-type'), retrievedAt: new Date().toISOString() };
}
async function collect(runId) {
  // Fetch before reserving a run, so network failure does not create a misleading run.
  const input = await download(sourceUrl), policy = await download(policyUrl);
  if (input.bytes.subarray(0, 5).toString() !== '%PDF-') throw Error('Not a PDF');
  const directory = reserveRun(runId), relative = path.relative(root, directory).split(path.sep).join('/');
  const startedAt = new Date().toISOString();
  const write = (n, b) => writeOnce(directory, n, b);
  write('started.json', json({ runId, startedAt, status: 'STARTED' }));
  try {
    // Reuse the unchanged, hash-snapshotted 7A harness/inspector without invoking its collector.
    // The injected module is not require.main; no fixtures are generated here.
    const helperPath = path.join(__dirname, 'collect-compression.cjs');
    const helperBytes = fs.readFileSync(helperPath), mod = { exports: {} };
    vm.compileFunction(helperBytes.toString() + '\nmodule.exports = { sourceHarness, independentInspect };', ['require','module','exports','__dirname','__filename'])(createRequire(helperPath), mod, mod.exports, __dirname, helperPath);
    const run = await mod.exports.sourceHarness();
    const pdfjs = await import(pathToFileURL(path.join(root, 'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
    write('collector.cjs', fs.readFileSync(__filename));
    write('harness.cjs', helperBytes);
    write('nasa-access-plan.input.pdf', input.bytes);
    write('permission-source.html', policy.bytes);
    const provenance = {
      sourceUrl, resolvedUrl: input.url, retrievedAt: input.retrievedAt, httpStatus: input.status, contentType: input.contentType,
      document: scan ? 'Apollo 11 lunar landing mission press kit, NASA-NEWS-RELEASE-69-83K, July 6 1969; downloaded unmodified from NASA NTRS. Historical document, not generated as a fixture. Scan classification requires rendered-page review.' : 'NASA Public Access Plan, official published document; downloaded unmodified, not generated as a fixture.',
      permission: 'Internal factual testing under NASA general educational/informational media-use guidance. Not a blanket public-domain declaration or permission to imply endorsement. Redistribution/publication not approved by this study.',
      permissionUrl: policyUrl, permissionRetrievedAt: policy.retrievedAt, permissionSnapshot: relative + '/permission-source.html', permissionSha256: sha(policy.bytes),
      category: scan ? 'REAL_WORLD historical document; NTRS copyright: Work of the US Gov. Public Use Permitted. Exact capture hardware/date NOT VERIFIED. Legacy artifact basename nasa-access-plan retained; use provenance for identity.' : 'REAL_WORLD published policy document. Office-export origin, physical scanning and photographic category NOT VERIFIED.',
      privateUserDocuments: false,
    };
    write('provenance.json', json(provenance));
    const environment = { node: process.version, os: os.type(), release: os.release(), arch: os.arch(), pdfLib: require('pdf-lib/package.json').version, pdfjs: require('pdfjs-dist/package.json').version, next: require('next/package.json').version, browser: 'NOT TESTED', tester: 'Automated source-handler harness; no human tester asserted' };
    write('environment.json', json(environment));
    const warnings = [], log = console.log, warn = console.warn;
    let before, after = null, result;
    try {
      console.log = console.warn = (...args) => warnings.push(args.map(String).join(' '));
      before = await mod.exports.independentInspect(pdfjs, input.bytes);
      result = await run(input.bytes);
      if (result.output) after = await mod.exports.independentInspect(pdfjs, result.output);
    } finally { console.log = log; console.warn = warn; }
    const unsupported = ['Visual fidelity','Interactive selection','Form interaction','Signature validity','Browser execution/download','Links/bookmarks/attachments behavior'];
    write('nasa-access-plan.inspection.json', json({ before, after, warnings, unsupported }));
    if (result.output) write('nasa-access-plan.output.pdf', result.output);
    const delta = result.output ? result.output.length - input.bytes.length : null;
    const comparable = before.opens && after?.opens;
    const item = {
      fixtureId: scan ? 'apollo11-press-kit' : 'nasa-access-plan', fixtureKind: 'REAL_WORLD', provenance: provenance.document, provenancePath: relative + '/provenance.json',
      inputPath: relative + '/nasa-access-plan.input.pdf', inputSha256: sha(input.bytes), inputBytes: input.bytes.length,
      outputPath: result.output ? relative + '/nasa-access-plan.output.pdf' : null, outputSha256: result.output ? sha(result.output) : null, outputBytes: result.output?.length ?? null,
      byteChange: delta, percentChange: delta === null ? null : delta / input.bytes.length * 100, percentConvention: 'positive=increase; negative=reduction',
      status: result.output ? 'SUCCESS' : 'FAILURE', independentOutputOpens: after?.opens ?? null,
      error: result.error, inspectionError: after && !after.opens ? after.error : null, warnings,
      rawInspectionPath: relative + '/nasa-access-plan.inspection.json', inspectionSha256: sha(fs.readFileSync(path.join(directory, 'nasa-access-plan.inspection.json'))),
      textExtractionMatches: comparable ? JSON.stringify(before.pages.map(p=>p.text)) === JSON.stringify(after.pages.map(p=>p.text)) : null,
      geometryMatches: comparable ? JSON.stringify(before.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation])) === JSON.stringify(after.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation])) : null,
      formFieldsMatch: comparable ? JSON.stringify(before.fields) === JSON.stringify(after.fields) : null,
      formAnnotationsMatch: comparable ? JSON.stringify(before.pages.map(p=>p.annotations)) === JSON.stringify(after.pages.map(p=>p.annotations)) : null,
      metadataBefore: before.metadata ?? null, metadataAfter: after?.metadata ?? null,
      browserVerification: 'NOT TESTED', downloadSuccess: 'NOT TESTED', visualQuality: 'NOT TESTED', interactiveSelectability: 'NOT TESTED', formInteraction: 'NOT TESTED', signatureValidity: 'NOT TESTED',
      displayedSummary: result.displayedSummary, downloadName: result.downloadName,
    };
    const sourcePaths = ['app/tools/compress-pdf/page.js','components/hooks/useGeneratedResult.js','lib/pdfInput.js','package-lock.json','scripts/lab/collect-compression.cjs','scripts/lab/collect-real-compression.cjs'];
    const manifest = { schemaVersion: 3, study: 'compression', runId, status: 'COMPLETE', coverageStatus: 'PARTIAL; BATCH 7C INCOMPLETE', startedAt, completedAt: new Date().toISOString(), publicationStatus: 'INTERNAL \u2014 NOT READY FOR PUBLICATION', execution: 'AUTOMATED NODE SOURCE-HANDLER; NOT REAL BROWSER', browserTested: false, visualReview: 'NOT TESTED', gitHead: cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root}).toString().trim(), sourceHashes: Object.fromEntries(sourcePaths.map(p=>[p,sha(fs.readFileSync(path.join(root,p)))])), sourceSnapshots: { 'scripts/lab/collect-compression.cjs': 'harness.cjs', 'scripts/lab/collect-real-compression.cjs': 'collector.cjs' }, environment, results: [item], missingCoverage: ['Real photographic PDF NOT TESTED','Physical scan PDF NOT TESTED','Verified Office export NOT TESTED','Real mixed-content category NOT VERIFIED','Browser/download NOT TESTED: no browser surface; native pipe unavailable','Visual review NOT TESTED','Interactive selection/form/signature checks NOT TESTED'], artifactHashes: Object.fromEntries(fs.readdirSync(directory).map(n=>[n,sha(fs.readFileSync(path.join(directory,n)))])) };
    write('manifest.json', json(manifest));
    console.log(json({ runId, manifestPath: relative + '/manifest.json', result: item }));
  } catch (e) { write('failure.json', json({runId, status:'INCOMPLETE', failedAt:new Date().toISOString(), error:String(e.stack||e)})); throw e; }
}
if (require.main === module) {
  if (![4,5].includes(process.argv.length) || process.argv[2] !== '--run-id' || (process.argv.length===5 && process.argv[4]!=='--scan')) throw Error('Usage: node scripts/lab/collect-real-compression.cjs --run-id UNIQUE-ID [--scan]');
  collect(process.argv[3]).catch(e=>{console.error(e);process.exitCode=1;});
}
module.exports = { collect };
