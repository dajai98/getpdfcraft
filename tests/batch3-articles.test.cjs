const fs = require('node:fs');
const assert = require('node:assert/strict');
const expected = {
  "how-to-merge-pdf-free": {
    "title": "How to Merge PDF Files Free Online — No Sign Up | PDFcraft",
    "h1": "How to Merge PDF Files Free Online — No Sign Up",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-merge-pdf-free\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-merge-pdf-free\"/>",
    "date": null
  },
  "compress-pdf-without-losing-quality": {
    "title": "How to Compress PDF Without Losing Quality | PDFcraft",
    "h1": "How to Compress PDF Without Losing Quality",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/compress-pdf-without-losing-quality\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/compress-pdf-without-losing-quality\"/>",
    "date": "January 18, 2026"
  },
  "convert-pdf-to-jpg-free": {
    "title": "How to Convert PDF to JPG Free — No Watermark | PDFcraft",
    "h1": "How to Convert PDF to JPG Free — No Watermark",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/convert-pdf-to-jpg-free\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/convert-pdf-to-jpg-free\"/>",
    "date": "January 20, 2026"
  },
  "how-to-split-pdf-online": {
    "title": "How to Split PDF Online Free — No Sign Up | PDFcraft",
    "h1": "How to Split PDF Online Free — No Sign Up",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-split-pdf-online\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-split-pdf-online\"/>",
    "date": null
  },
  "how-to-remove-password-from-pdf": {
    "title": "How to Remove a PDF Password You Already Know | PDFcraft",
    "h1": "How to Remove a PDF Password You Already Know",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-remove-password-from-pdf\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-remove-password-from-pdf\"/>",
    "date": null
  },
  "how-to-add-password-to-pdf-online": {
    "title": "How to Add Password to PDF Online Free | PDFcraft",
    "h1": "How to Add Password to PDF Online Free",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-add-password-to-pdf-online\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-add-password-to-pdf-online\"/>",
    "date": null
  },
  "how-to-add-watermark-to-pdf": {
    "title": "How to Add Watermark to PDF Free Online | PDFcraft",
    "h1": "How to Add Watermark to PDF Free Online",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-add-watermark-to-pdf\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-add-watermark-to-pdf\"/>",
    "date": "February 2026"
  },
  "best-free-pdf-tools-online": {
    "title": "13 Free PDFcraft Tools: What Each One Actually Does | PDFcraft",
    "h1": "13 Free PDFcraft Tools: What Each One Actually Does",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/best-free-pdf-tools-online\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/best-free-pdf-tools-online\"/>",
    "date": "February 2026"
  },
  "how-to-convert-jpg-to-pdf": {
    "title": "How to Convert JPG to PDF Free Online | PDFcraft",
    "h1": "How to Convert JPG to PDF Free Online",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-convert-jpg-to-pdf\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-convert-jpg-to-pdf\"/>",
    "date": "February 2026"
  },
  "how-to-edit-pdf-free": {
    "title": "How to Edit PDF Free Online (No Adobe Needed) | PDFcraft",
    "h1": "How to Edit PDF Free Online (No Adobe Needed)",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-edit-pdf-free\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-edit-pdf-free\"/>",
    "date": "February 2026"
  },
  "pdf-file-size-too-large": {
    "title": "PDF File Size Too Large? How to Fix It Free | PDFcraft",
    "h1": "PDF File Size Too Large? How to Fix It Free",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/pdf-file-size-too-large\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/pdf-file-size-too-large\"/>",
    "date": "February 2026"
  },
  "how-to-rotate-pdf": {
    "title": "How to Rotate PDF Pages Free Online | PDFcraft",
    "h1": "How to Rotate PDF Pages Free Online",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-rotate-pdf\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-rotate-pdf\"/>",
    "date": "February 2026"
  },
  "how-to-extract-pages-from-pdf": {
    "title": "How to Extract Selected PDF Pages and Ranges | PDFcraft",
    "h1": "How to Extract Selected PDF Pages and Ranges",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-extract-pages-from-pdf\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-extract-pages-from-pdf\"/>",
    "date": "February 2026"
  },
  "pdf-security-guide": {
    "title": "PDF Security Guide — How to Protect Your Documents | PDFcraft",
    "h1": "PDF Security Guide — How to Protect Your Documents",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/pdf-security-guide\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/pdf-security-guide\"/>",
    "date": "February 2026"
  },
  "how-to-combine-pdf-and-images": {
    "title": "How to Combine PDF and Images Into One File Free | PDFcraft",
    "h1": "How to Combine PDF and Images Into One File Free",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-combine-pdf-and-images\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-combine-pdf-and-images\"/>",
    "date": null
  },
  "how-to-secure-pdf-before-sending-email": {
    "title": "How to Secure a PDF Before Sending by Email | PDFcraft",
    "h1": "How to Secure a PDF Before Sending by Email",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/how-to-secure-pdf-before-sending-email\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/how-to-secure-pdf-before-sending-email\"/>",
    "date": null
  },
  "pdf-compression-real-test-results": {
    "title": "How Much Can You Compress a PDF? Measure Your Own Result | PDFcraft",
    "h1": "How Much Can You Compress a PDF? Measure Your Own Result",
    "canonical": "<link rel=\"canonical\" href=\"https://getpdfcraft.com/blog/pdf-compression-real-test-results\"/>",
    "og": "<meta property=\"og:url\" content=\"https://getpdfcraft.com/blog/pdf-compression-real-test-results\"/>",
    "date": "August 2026"
  }
};
const clean = s => s.replace(/<[^>]*>/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const withoutScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
function readTables(html) {
  return [...withoutScripts(html).matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)].map(m => ({
    headers: [...m[1].matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map(c => clean(c[1])),
    rows: [...m[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
      .map(r => [...r[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(c => clean(c[1])))
      .filter(r => r.length),
  }));
}
function checkStructuredExport(article, html) {
  assert.deepEqual(readTables(html), article.sections.filter(s => s.table).map(s => s.table), 'rendered tables differ');
  const lists = [...withoutScripts(html).matchAll(/<ul\b[^>]*>([\s\S]*?)<\/ul>/g)].map(m =>
    [...m[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(li => clean(li[1])));
  for (const section of article.sections.filter(s => s.list)) {
    const wanted = section.list.map(item => typeof item === 'string' ? item : item.text);
    assert(lists.some(list => JSON.stringify(list) === JSON.stringify(wanted)), 'rendered list missing or altered');
  }
}
function checkEncoding(value) {
  if (typeof value === 'string') {
    // Require adjoining tokens or notation context, not a terminal number/bytes.
    // Keep ordinary sentence-ending questions valid, including numeric questions.
    const corruptToken = /[\uFFFD]|[\p{L}\p{N}]\?[\p{L}\p{N}]|\d%?\s*\?\s*\d|^\?\S/u;
    const corruptDegree = /\d\?\s+(?:right|left|clockwise|counterclockwise)\b/iu;
    const corruptMath = /\bbytes\s*\?\s*(?:(?:input|output)\s+bytes\b|\d)/iu;
    assert(![corruptToken, corruptDegree, corruptMath].some(pattern => pattern.test(value)), 'suspicious editorial encoding: ' + value);
  } else if (Array.isArray(value)) value.forEach(checkEncoding);
  else if (value && typeof value === 'object') Object.values(value).forEach(checkEncoding);
}
const paragraphs = [], answers = [], intros = [], sentences = new Map();
let checked = 0;
for (const [slug, baseline] of Object.entries(expected)) {
  const src = fs.readFileSync('app/blog/' + slug + '/page.js', 'utf8');
  const article = JSON.parse(src.match(/const article = ([\s\S]*?);\s*export default/)[1]);
  checkEncoding(article);
  assert.equal(article.date, baseline.date === null ? undefined : baseline.date);
  const html = fs.readFileSync('out/blog/' + slug + '.html', 'utf8');
  checkStructuredExport(article, html);
  assert.equal(html.match(/<title>(.*?)<\/title>/)[1], baseline.title);
  assert.equal(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1], baseline.h1);
  assert(html.includes(baseline.canonical)); assert(html.includes(baseline.og));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert(!/name="robots"[^>]*noindex/.test(html)); assert(!/href="\/lab/.test(html));
  const visible = clean(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = schemas.filter(s => s['@type'] === 'FAQPage'); assert.equal(faq.length, 1);
  assert.deepEqual(faq[0].mainEntity.map(q => ({q:q.name,a:q.acceptedAnswer.text})), article.faqs);
  intros.push(article.intro);
  const texts = [article.intro, ...article.sections.flatMap(s => [s.text, ...(s.steps || []).map(x => x.body)].filter(Boolean))];
  for (const t of texts) { assert(visible.includes(t), slug + ': missing body text'); if (t.split(/\s+/).length >= 20) paragraphs.push(t); }
  for (const q of article.faqs) { assert(visible.includes(q.q)); assert(visible.includes(q.a)); answers.push(q.a); }
  for (const t of [...texts,...article.faqs.map(q=>q.a)]) for (const sentence of t.split(/(?<=[.!?])\s+/)) {
    if (sentence.split(/\s+/).length >= 12) sentences.set(sentence, (sentences.get(sentence) || 0) + 1);
  }
  assert(!/(?:tests\/evidence|scripts\/lab|preservation-2026|compression-2026)/.test(JSON.stringify(article)));
  checked++;
}
for (const items of [paragraphs,answers,intros]) assert.equal(new Set(items).size,items.length,'duplicate editorial copy');
assert.deepEqual([...sentences].filter(([,n])=>n>1),[],'repeated 12+ word sentences');
const evidence = require('../scripts/lab/prepare-compression-publication.cjs').prepare();
const source = fs.readFileSync('app/blog/pdf-compression-real-test-results/page.js','utf8');
const results = JSON.parse(source.match(/const article = ([\s\S]*?);\s*export default/)[1]);
// Explicit accepted identities and editorial labels; never derive identity from
// the mutable article. The projection separately validates registered artifacts.
const syntheticRun = 'compression-20261015-hardening-02';
const identities = [
  [syntheticRun, 'text-heavy', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic text-heavy PDF'],
  [syntheticRun, 'image-heavy-synthetic', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic image-heavy noise proxy'],
  [syntheticRun, 'scan-style-synthetic', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic scan-style raster proxy'],
  [syntheticRun, 'mixed', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic mixed text/image/vector PDF'],
  [syntheticRun, 'presentation-style', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic presentation-style pages'],
  [syntheticRun, 'form', 'SYNTHETIC', 'SUCCESS', 'REDUCTION', 'Synthetic AcroForm PDF'],
  [syntheticRun, 'already-object-streams', 'SYNTHETIC', 'SUCCESS', 'GROWTH', 'Synthetic already-object-stream control'],
  [syntheticRun, 'minimal-control', 'SYNTHETIC', 'SUCCESS', 'GROWTH', 'Synthetic minimal PDF'],
  [syntheticRun, 'unsupported-input', 'SYNTHETIC', 'FAILURE', 'FAILURE', 'Invalid synthetic input'],
  [syntheticRun, 'encrypted-input', 'SYNTHETIC', 'FAILURE', 'FAILURE', 'Encrypted synthetic input'],
  ['compression-20261016-realworld-01', 'nasa-access-plan', 'REAL_WORLD', 'SUCCESS', 'REDUCTION', 'Real NASA Public Access Plan'],
  ['compression-20261016-scan-01', 'apollo11-press-kit', 'REAL_WORLD', 'SUCCESS', 'REDUCTION', 'Real Apollo 11 press kit archival scan'],
];
assert.equal(evidence.rows.length, identities.length);
const acceptedRows = identities.map(([runId, fixtureId, kind, status, outcome, label]) => {
  const matches = evidence.rows.filter(r => r.runId === runId && r.fixtureId === fixtureId);
  assert.equal(matches.length, 1, 'accepted fixture must resolve exactly once');
  const r = matches[0]; assert.equal(r.fixtureKind, kind); assert.equal(r.status, status);
  if (status === 'FAILURE') {
    assert.equal(r.outputBytes, null); assert.equal(r.byteChange, null); assert.equal(r.percentChange, null);
    return [label, String(r.inputBytes), 'No output', 'Not measured', 'Not measured', 'Rejected; no output'];
  }
  const delta = r.outputBytes - r.inputBytes, percent = delta / r.inputBytes * 100;
  assert.equal(delta, r.byteChange); assert.equal(percent, r.percentChange);
  assert.equal(delta > 0 ? 'GROWTH' : delta < 0 ? 'REDUCTION' : 'UNCHANGED', outcome);
  return [label, String(r.inputBytes), String(r.outputBytes), String(delta), (percent > 0 ? '+' : '') + percent.toFixed(4) + '%', 'Output reparsed'];
});
const acceptedTable = { headers: ['Input type', 'Input bytes', 'Output bytes', 'Byte change', 'Size change', 'Outcome'], rows: acceptedRows };
const checkEvidenceTable = table => assert.deepEqual(table, acceptedTable, 'evidence identity/classification/measurement differs');
function checkEvidenceExport(html) {
  const tables = readTables(html); assert.equal(tables.length, 1, 'exactly one evidence table required');
  checkEvidenceTable(tables[0]);
}
checkEvidenceTable(results.sections[0].table);
const evidenceHtml = fs.readFileSync('out/blog/pdf-compression-real-test-results.html', 'utf8');
checkEvidenceExport(evidenceHtml);
let adversarial = 0;
function rejects(name, mutate, validate) {
  const candidate = mutate();
  assert.throws(() => validate(candidate), assert.AssertionError, name);
  adversarial++; console.log('PASS adversarial: ' + name);
}
rejects('source synthetic relabeled real', () => {
  const table = JSON.parse(JSON.stringify(results.sections[0].table));
  table.rows[1][0] = 'Real photographic document'; return table;
}, checkEvidenceTable);
const tableMarkup = evidenceHtml.match(/<table\b[^>]*>[\s\S]*?<\/table>/)[0];
const rowMarkup = [...tableMarkup.matchAll(/<tr\b[^>]*>[\s\S]*?<\/tr>/g)].map(m => m[0]).slice(1);
function mutateMarkup(old, replacement) { assert(evidenceHtml.includes(old)); return evidenceHtml.replace(old, replacement); }
rejects('entire results table removed', () => mutateMarkup(tableMarkup, ''), checkEvidenceExport);
rejects('one result row removed', () => mutateMarkup(rowMarkup[0], ''), checkEvidenceExport);
rejects('rendered synthetic relabeled real', () => mutateMarkup(rowMarkup[1], rowMarkup[1].replace(identities[1][5], 'Real photographic document')), checkEvidenceExport);
rejects('rendered measurement changed', () => mutateMarkup(rowMarkup[0], rowMarkup[0].replace('28359', '28360')), checkEvidenceExport);
rejects('table header changed', () => mutateMarkup('Input bytes</th>', 'Input KB</th>'), checkEvidenceExport);
for (const i of [6, 7, 8, 9]) {
  const status = i < 8 ? 'Output reparsed' : 'Rejected; no output';
  rejects('outcome omitted: ' + identities[i][1], () => mutateMarkup(rowMarkup[i], rowMarkup[i].replace(status, '')), checkEvidenceExport);
  rejects('outcome changed: ' + identities[i][1], () => mutateMarkup(rowMarkup[i], rowMarkup[i].replace(status, 'Unverified success')), checkEvidenceExport);
  rejects('growth/failure row hidden: ' + identities[i][1], () => mutateMarkup(rowMarkup[i], ''), checkEvidenceExport);
}
rejects('growth sign changed', () => mutateMarkup(rowMarkup[6], rowMarkup[6].replace('+0.1766%', '-0.1766%')), checkEvidenceExport);
const listSection = results.sections.find(s => s.list && typeof s.list[0] === 'string');
rejects('limitation list item missing', () => {
  const escaped = listSection.list[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('<li\\b[^>]*>' + escaped + '</li>');
  assert(re.test(evidenceHtml)); return evidenceHtml.replace(re, '');
}, html => checkStructuredExport(results, html));
for (const bad of ["file?s", 'PDFcraft?s', 'NASA?s', 'cover?report?appendix', '10%?80%', '4?6', '12?14', '1200 ? 800', '90? right', '?Without losing quality?', '(output bytes ? input bytes) ? input bytes ? 100', 'broken\uFFFDtext']) {
  rejects('encoding: ' + bad, () => bad, checkEncoding);
}
const validEncoding = [
  'Why did the output grow?', 'PDF File Size Too Large? How to Fix It Free',
  'Does this preserve every feature? No.', '90 degrees right', '10%-80%',
  'Why does the PDF open on page 1?', 'What is the output size in bytes?',
  'Can I merge more than two PDFs?', 'Why did my compressed file get larger?',
  'Does PDFcraft preserve bookmarks?', 'What happens if the output is larger?',
  'Should I start on page 27? Yes.', 'Is the size measured in bytes? Check the file properties.',
];
for (const value of validEncoding) {
  checkEncoding(value);
  console.log('PASS legitimate encoding: ' + value);
}
console.log('BATCH 3: '+checked+' article metadata/date/export/FAQ checks PASS; unique intros/paragraphs/answers; no repeated long sentences; all 12 source AND rendered evidence rows agree; '+adversarial+' adversarial rejections PASS.');
