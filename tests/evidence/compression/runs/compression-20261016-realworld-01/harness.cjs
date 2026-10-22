// Internal evidence collection. Executes the current page handler in Node, NOT a browser.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const vm = require('node:vm');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '../..');
const lib = require('pdf-lib');
const swc = require('next/dist/build/swc');
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const read = f => fs.readFileSync(path.join(root, f));
const fixedDate = new Date('2020-01-01T00:00:00Z'); // fixture metadata, not publication/test date
const fixtureDir = 'tests/fixtures/compression';
const resultDir = 'tests/evidence/compression';

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const b of bytes) { crc ^= b; for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0); }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type), len = Buffer.alloc(4), crc = Buffer.alloc(4);
  len.writeUInt32BE(data.length); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
function syntheticPng(scan = false) {
  const width = 768, height = 1024, raw = Buffer.alloc((width * 3 + 1) * height);
  let seed = 123456789;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    const offset = y * (width * 3 + 1) + 1 + x * 3;
    const bar = y > 90 && y < 900 && y % 36 < 5 && x > 60 && x < 600 + (Math.floor(y / 36) % 3) * 20;
    for (let c = 0; c < 3; c++) raw[offset + c] = scan ? (bar ? 35 : 246 + ((seed >>> c) % 10)) : ((seed >>> (c * 8)) & 255);
  }
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 2;
  return Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), chunk('IHDR', header), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
async function document() {
  const d = await lib.PDFDocument.create();
  d.setCreationDate(fixedDate); d.setModificationDate(fixedDate);
  d.setCreator('PDFcraft synthetic benchmark fixture generator'); d.setProducer('pdf-lib 1.17.1 fixture generator');
  return d;
}
function minimalPdf() {
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 300] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
  const stream = 'BT /F1 12 Tf 20 150 Td (MINIMAL SIZE CONTROL) Tj ET';
  objects.push('<< /Length ' + Buffer.byteLength(stream) + ' >>\nstream\n' + stream + '\nendstream');
  let s = '%PDF-1.4\n', offsets = [0];
  for (let i = 0; i < objects.length; i++) { offsets.push(Buffer.byteLength(s)); s += (i + 1) + ' 0 obj\n' + objects[i] + '\nendobj\n'; }
  const start = Buffer.byteLength(s);
  s += 'xref\n0 6\n0000000000 65535 f \n' + offsets.slice(1).map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('');
  return Buffer.from(s + 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + start + '\n%%EOF\n');
}
async function fixtures() {
  const list = [], add = (id, type, bytes, provenance, expected) => list.push({ id, type, bytes: Buffer.from(bytes), provenance, expected });
  let d = await document(), font = await d.embedFont(lib.StandardFonts.Helvetica);
  for (let p = 1; p <= 24; p++) { const page = d.addPage([612, 792]); for (let l = 0; l < 45; l++) page.drawText('TEXT PAGE ' + p + ' LINE ' + (l + 1) + ': deterministic local compression fixture.', { x: 36, y: 750 - l * 15, size: 10, font }); }
  const text = await d.save({ useObjectStreams: false });
  add('text-heavy', 'text-heavy', text, '24 synthetic text pages; uncompressed object serialization; no user data.', 'success');
  d = await document(); const noise = await d.embedPng(syntheticPng());
  for (let p = 0; p < 4; p++) d.addPage([612, 792]).drawImage(noise, { x: 0, y: 0, width: 612, height: 792 });
  add('image-heavy-synthetic', 'image-heavy proxy', await d.save({ useObjectStreams: false }), 'Seeded RGB noise raster reused on four pages. NOT a photograph and NOT representative of JPEG camera compression.', 'success');
  d = await document(); const scan = await d.embedPng(syntheticPng(true));
  for (let p = 0; p < 6; p++) d.addPage([612, 792]).drawImage(scan, { x: 0, y: 0, width: 612, height: 792 });
  add('scan-style-synthetic', 'scan-style proxy', await d.save({ useObjectStreams: false }), 'Raster line patterns with seeded background noise; no OCR layer. NOT a physical scanner capture or readable document scan.', 'success');
  d = await document(); font = await d.embedFont(lib.StandardFonts.Helvetica); const pic = await d.embedPng(syntheticPng());
  for (let p = 1; p <= 5; p++) { const page = d.addPage([612, 792]); page.drawText('MIXED PAGE ' + p, { x: 36, y: 750, font, size: 20 }); page.drawImage(pic, { x: 36, y: 100, width: 400, height: 550 }); page.drawRectangle({ x: 460, y: 150, width: 70, height: 250, color: lib.rgb(0.2, 0.4, 0.7) }); }
  add('mixed', 'mixed text/image/vector', await d.save({ useObjectStreams: false }), 'Five generated text/image/vector pages using the same synthetic noise image.', 'success');
  d = await document(); font = await d.embedFont(lib.StandardFonts.Helvetica);
  for (let p = 1; p <= 8; p++) { const page = d.addPage([960, 540]); page.drawText('SYNTHETIC SLIDE ' + p, { x: 48, y: 470, font, size: 28 }); for (let j = 0; j < 5; j++) { page.drawText('Point ' + (j + 1) + ': sample benchmark content', { x: 60, y: 390 - j * 50, size: 18, font }); page.drawRectangle({ x: 650, y: 90 + j * 55, width: 100 + j * 30, height: 30, color: lib.rgb(0.1, 0.4, 0.6) }); } }
  add('presentation-style', 'presentation-style proxy', await d.save({ useObjectStreams: false }), 'Eight generated landscape slides. NOT exported from PowerPoint, Keynote or another presentation application.', 'success');
  d = await document(); font = await d.embedFont(lib.StandardFonts.Helvetica); const page = d.addPage([612, 792]);
  page.drawText('SYNTHETIC FORM', { x: 40, y: 730, size: 20, font }); const form = d.getForm(); const name = form.createTextField('sampleName'); name.setText('Benchmark Example'); name.addToPage(page, { x: 40, y: 600, width: 260, height: 30 }); const check = form.createCheckBox('sampleConsent'); check.addToPage(page, { x: 40, y: 540, width: 18, height: 18 }); check.check(); form.updateFieldAppearances(font);
  add('form', 'AcroForm', await d.save({ useObjectStreams: false }), 'Generated text field and checked checkbox with explicit appearances; synthetic values only.', 'success');
  d = await lib.PDFDocument.load(text, { updateMetadata: false });
  add('already-object-streams', 'already object-stream serialized', await d.save({ useObjectStreams: true }), 'Same text fixture serialized with object streams. Optimized only in this specific sense; not globally optimal.', 'success');
  add('minimal-control', 'small valid PDF growth control', minimalPdf(), 'Hand-built valid one-page PDF with a short text stream and no Info metadata.', 'success');
  add('unsupported-input', 'invalid/unsupported negative', Buffer.from('This is deliberately not a PDF. Synthetic negative input.\n'), 'Plain text saved with .pdf extension to exercise parser rejection; no user data.', 'failure');
  return list;
}

async function sourceHarness() {
  const files = ['app/tools/compress-pdf/page.js', 'components/hooks/useGeneratedResult.js', 'lib/pdfInput.js'];
  const compiled = {};
  for (const f of files) compiled[f] = (await swc.transform(read(f).toString(), { filename: f, jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'classic' } }, target: 'es2022' }, module: { type: 'commonjs' } })).code;
  return async bytes => {
    let cursor = 0, states = [], effects = [], tree, sequence = 0; const objects = new Map(), cache = {};
    const React = {
      useState: initial => { const i = cursor++; if (!(i in states)) states[i] = initial; return [states[i], v => { states[i] = typeof v === 'function' ? v(states[i]) : v; }]; },
      useRef: initial => { const i = cursor++; return states[i] ||= { current: initial }; },
      useCallback: fn => { cursor++; return fn; },
      useEffect: fn => { const i = cursor++; if (!(i in states)) { states[i] = true; effects.push(fn); } },
      createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
    };
    const url = { createObjectURL: blob => { const u = 'blob:evidence-' + sequence++; objects.set(u, blob); return u; }, revokeObjectURL: u => objects.delete(u) };
    function load(f) {
      if (cache[f]) return cache[f].exports;
      const mod = { exports: {} }; cache[f] = mod;
      vm.compileFunction(compiled[f], ['module', 'exports', 'require', 'React', 'URL'])(mod, mod.exports, name => {
        if (name === 'react') return React;
        if (name === 'pdf-lib') return lib;
        if (name.startsWith('@/')) { const target = name.slice(2) + '.js'; return compiled[target] ? load(target) : name; }
        throw Error('Unexpected dependency: ' + name);
      }, React, url);
      return mod.exports;
    }
    const component = load(files[0]).default;
    const render = () => { cursor = 0; tree = component(); };
    const nodes = n => Array.isArray(n) ? n.flatMap(nodes) : n && typeof n === 'object' ? [n, ...nodes(n.props?.children)] : [];
    const text = n => Array.isArray(n) ? n.map(text).join('') : n && typeof n === 'object' ? text(n.props?.children) : typeof n === 'boolean' ? '' : String(n ?? '');
    render();
    const cleanups = effects.map(fn => fn());
    const input = new File([bytes], 'fixture.pdf', { type: 'application/pdf' });
    try {
      await nodes(tree).find(n => n.type === '@/components/ui/UploadZone').props.onFiles([input]); render();
      const download = nodes(tree).find(n => n.type === '@/components/ui/DownloadButton');
      const alert = nodes(tree).find(n => n.props?.role === 'alert');
      return { output: download ? Buffer.from(await objects.get(download.props.url).arrayBuffer()) : null, error: alert ? text(alert) : null, displayedSummary: nodes(tree).filter(n => n.props?.role === 'status').map(text), downloadName: download?.props.filename || null };
    } finally { cleanups.forEach(fn => fn?.()); }
  };
}

async function independentInspect(pdfjs, bytes) {
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes), standardFontDataUrl: path.join(root, 'node_modules/pdfjs-dist/standard_fonts/') + path.sep, useSystemFonts: false });
  try {
    const doc = await task.promise, pages = [];
    for (let i = 1; i <= doc.numPages; i++) { const p = await doc.getPage(i); const txt = (await p.getTextContent()).items.filter(x => 'str' in x).map(x => x.str).join('\n'); const operators = await p.getOperatorList(); pages.push({ page: i, widthPoints: p.getViewport({ scale: p.userUnit }).width, heightPoints: p.getViewport({ scale: p.userUnit }).height, rotation: p.rotate, text: txt, textSha256: sha(txt), textCharacters: txt.length, operatorCount: operators.fnArray.length, annotations: (await p.getAnnotations()).map(a => ({ subtype: a.subtype, fieldName: a.fieldName || null, fieldValue: a.fieldValue ?? null })) }); }
    return { opens: true, pageCount: doc.numPages, pages, fields: await doc.getFieldObjects(), metadata: (await doc.getMetadata()).info };
  } catch (e) { return { opens: false, error: e.name + ': ' + e.message }; }
  finally { await task.destroy(); }
}
async function imageStreams(bytes) {
  const d = await lib.PDFDocument.load(bytes, { updateMetadata: false });
  return d.context.enumerateIndirectObjects().filter(([,o]) => o instanceof lib.PDFRawStream && o.dict.get(lib.PDFName.of('Subtype'))?.toString() === '/Image').map(([,o]) => ({ sha256: sha(o.contents), bytes: o.contents.length, width: o.dict.get(lib.PDFName.of('Width'))?.toString(), height: o.dict.get(lib.PDFName.of('Height'))?.toString() })).sort((a,b)=>a.sha256.localeCompare(b.sha256));
}

// New runs are write-once directories. Historical evidence is never a write target.
const publicationStatus = 'INTERNAL \u2014 NOT READY FOR PUBLICATION';
const missingCoverage = [
  'Real photographic PDF: NOT AVAILABLE / NOT TESTED; synthetic noise is not photography.',
  'Physical scanned document: NOT AVAILABLE / NOT TESTED; raster bars are only a synthetic proxy.',
  'Genuine office/presentation export: NOT AVAILABLE / NOT TESTED; no local export application used.',
  'Real browser execution/download: NOT TESTED.',
  'Visual review, interactive selection and form interaction: NOT TESTED.',
  'Signatures, links, bookmarks and attachments: NOT TESTED.'
];
function reserveRun(runId, base = path.join(root, 'tests/evidence/compression/runs')) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(runId)) throw Error('Invalid run ID');
  fs.mkdirSync(base, { recursive: true });
  const directory = path.join(base, runId);
  fs.mkdirSync(directory); // EEXIST is fatal, including incomplete previous runs.
  return directory;
}
function writeOnce(directory, name, bytes) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(name)) throw Error('Invalid artifact name');
  fs.writeFileSync(path.join(directory, name), bytes, { flag: 'wx' });
}
const json = value => JSON.stringify(value, null, 2) + '\n';
async function encryptedFixture(bytes) {
  const create = require('@neslinesli93/qpdf-wasm');
  const qpdf = await create({ noInitialRun: true, wasmBinary: fs.readFileSync(path.join(root, 'node_modules/@neslinesli93/qpdf-wasm/dist/qpdf.wasm')), print: () => {}, printErr: () => {} });
  try {
    qpdf.FS.writeFile('/input.pdf', bytes);
    const status = qpdf.callMain(['--encrypt', 'SyntheticFixture7A!', 'SyntheticFixtureOwner7A!', '256', '--', '/input.pdf', '/output.pdf']);
    if (status !== 0) throw Error('Synthetic fixture encryption failed: ' + status);
    return Buffer.from(qpdf.FS.readFile('/output.pdf'));
  } finally { for (const name of ['/input.pdf','/output.pdf']) { try { qpdf.FS.unlink(name); } catch {} } }
}
async function collect(runId) {
  const directory = reserveRun(runId), relative = path.relative(root, directory).split(path.sep).join('/');
  const startedAt = new Date().toISOString();
  writeOnce(directory, 'started.json', json({runId, startedAt, status:'STARTED; only manifest.json status COMPLETE establishes completion'}));
  try {
    const set = await fixtures(), repeated = await fixtures();
    assert.deepEqual(set.map(f=>sha(f.bytes)), repeated.map(f=>sha(f.bytes)));
    for (const f of set) assert.equal(sha(f.bytes), sha(read(fixtureDir+'/'+f.id+'.pdf')), 'Historical fixture drift: '+f.id);
    set.push({ id:'encrypted-input', type:'encrypted synthetic negative', bytes:await encryptedFixture(set[0].bytes), provenance:'AES-256 qpdf-wasm encryption of the generated text-heavy fixture. Public synthetic test passwords only; no user data. Random encryption salt means regeneration is not byte deterministic; retain the exact input.', expected:'failure' });
    const run = await sourceHarness();
    const pdfjs = await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
    const sourcePaths = ['app/tools/compress-pdf/page.js','components/hooks/useGeneratedResult.js','lib/pdfInput.js','package-lock.json','scripts/lab/collect-compression.cjs'];
    const environment = {node:process.version,os:os.type(),release:os.release(),arch:process.arch,totalMemoryBytes:os.totalmem(),pdfLib:require('pdf-lib/package.json').version,pdfjs:require('pdfjs-dist/package.json').version,next:require('next/package.json').version,qpdfWasm:require('@neslinesli93/qpdf-wasm/package.json').version,browser:'NOT TESTED',network:'No network resources requested by collector; installed local libraries/WASM'};
    const report = {schemaVersion:2,study:'compression',runId,status:'COMPLETE',startedAt,publicationStatus,execution:'AUTOMATED NODE SOURCE-HANDLER; NOT REAL BROWSER',browserTested:false,visualReview:'NOT TESTED',gitHead:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:root}).toString().trim(),sourceHashes:Object.fromEntries(sourcePaths.map(f=>[f,sha(read(f))])),environment,missingCoverage,results:[]};
    writeOnce(directory,'collector.cjs',read('scripts/lab/collect-compression.cjs'));
    writeOnce(directory,'environment.json',json(environment));
    for (const f of set) {
      const inputName=f.id+'.input.pdf'; writeOnce(directory,inputName,f.bytes);
      const warnings=[],log=console.log,warn=console.warn;
      let before,after=null,images=null,result;
      try {
        console.log=(...a)=>warnings.push(a.map(String).join(' '));console.warn=console.log;
        before=await independentInspect(pdfjs,f.bytes); result=await run(f.bytes);
        if(result.output){after=await independentInspect(pdfjs,result.output);images={before:await imageStreams(f.bytes),after:await imageStreams(result.output)};}
      } finally {console.log=log;console.warn=warn;}
      const outputName=result.output?f.id+'.output.pdf':null;
      if(outputName)writeOnce(directory,outputName,result.output);
      const inspectionName=f.id+'.inspection.json';
      const inspection={before,after,images,warnings,unsupported:['Visual fidelity','Interactive selection','Form interaction','Signature validity','Links/bookmarks/attachments behavior']};
      writeOnce(directory,inspectionName,json(inspection));
      const delta=result.output?result.output.length-f.bytes.length:null;
      const comparable=before.opens&&after?.opens;
      const item={fixtureId:f.id,type:f.type,fixtureKind:'SYNTHETIC',provenance:f.provenance,expectedStatus:f.expected.toUpperCase(),status:result.output&&after?.opens?'SUCCESS':'FAILURE',inputPath:relative+'/'+inputName,inputBytes:f.bytes.length,inputSha256:sha(f.bytes),outputPath:outputName?relative+'/'+outputName:null,outputBytes:result.output?.length??null,outputSha256:result.output?sha(result.output):null,byteChange:delta,percentChange:delta===null?null:delta/f.bytes.length*100,percentConvention:'positive=increase; negative=reduction',independentOutputOpens:after?.opens??null,textExtractionMatches:comparable?JSON.stringify(before.pages.map(p=>p.text))===JSON.stringify(after.pages.map(p=>p.text)):null,geometryMatches:comparable?JSON.stringify(before.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation]))===JSON.stringify(after.pages.map(p=>[p.widthPoints,p.heightPoints,p.rotation])):null,formFieldsMatch:comparable?JSON.stringify(before.fields)===JSON.stringify(after.fields):null,formAnnotationsMatch:comparable?JSON.stringify(before.pages.map(p=>p.annotations))===JSON.stringify(after.pages.map(p=>p.annotations)):null,metadataBefore:before.metadata??null,metadataAfter:after?.metadata??null,browserVerification:'NOT TESTED',visualQuality:'NOT TESTED',interactiveSelectability:'NOT TESTED',formInteraction:'NOT TESTED',signatureValidity:'NOT TESTED',error:result.error,inspectionError:after&&!after.opens?after.error:null,warnings,rawInspectionPath:relative+'/'+inspectionName,inspectionSha256:sha(read(relative+'/'+inspectionName)),displayedSummary:result.displayedSummary,downloadName:result.downloadName};
      report.results.push(item); console.log(f.id,item.inputBytes,item.outputBytes,item.status);
    }
    report.completedAt=new Date().toISOString();
    report.artifactHashes=Object.fromEntries(fs.readdirSync(directory).map(name=>[name,sha(fs.readFileSync(path.join(directory,name)))]));
    writeOnce(directory,'manifest.json',json(report));
    console.log('Immutable run complete: '+relative+'/manifest.json');
    return report;
  } catch(error) {
    writeOnce(directory,'failure.json',json({runId,status:'INCOMPLETE',failedAt:new Date().toISOString(),error:String(error.stack||error)}));
    throw error;
  }
}
if (require.main===module) {
  const args=process.argv.slice(2);
  if(args.length && (args.length!==2||args[0]!=='--run-id')) throw Error('Usage: node scripts/lab/collect-compression.cjs [--run-id ID]');
  const id=args[1]||new Date().toISOString().replace(/[^0-9TZ]/g,'')+'-'+crypto.randomUUID();
  collect(id).catch(e=>{console.error(e);process.exitCode=1});
}
module.exports={collect,reserveRun,writeOnce};
