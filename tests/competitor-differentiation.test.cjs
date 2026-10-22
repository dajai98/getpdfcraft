const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const specs = {
  'ilovepdf-alternative': { title: 'An iLovePDF Alternative for Local PDF Workflows', date: 'February 1, 2026', iso: '2026-02-01', min: 600, max: 800,
    links: ['/tools/merge-pdf', '/tools/split-pdf', '/tools/pdf-to-image', '/blog/how-browser-based-pdf-processing-works'] },
  'adobe-acrobat-alternative-free': { title: 'A Free Adobe Acrobat Alternative for Core PDF Tasks', date: 'February 3, 2026', iso: '2026-02-03', min: 650, max: 850,
    links: ['/tools/merge-pdf', '/tools/split-pdf', '/tools/pdf-to-image', '/tools/protect-pdf', '/blog/how-to-edit-pdf-free', '/blog/how-to-add-password-to-pdf-online'] },
};
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const decode = s => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const plain = h => decode(h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const parse = s => JSON.parse(s.match(/const article = ([\s\S]*?);\s*export/)[1]);
function prose(value) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return Object.entries(value).filter(([k]) => k !== 'href').map(([, v]) => prose(v)).join(' ');
}
function claims(text) {
  for (const re of [
    /PDFcraft\s+(?:is|offers|provides)\s+(?:better|superior|more private)/i,
    /iLovePDF\s+(?:requires?|needs?)\s+(?:a\s+)?(?:login|account|sign.in)/i,
    /iLovePDF\s+always\s+uploads?/i,
    /PDFcraft\s+(?:(?:fully|completely)\s+replaces?|is\s+(?:a\s+)?(?:full|complete)\s+replacement\s+for)\s+(?:Adobe\s+)?Acrobat/i,
    /PDF[- ]to[- ]Image\s+(?:performs?|provides?|does|supports?)\s+OCR/i,
    /all\s+Acrobat\s+features\s+are\s+free/i,
    // Require a universal product-tier subject followed by affirmative
    // capability inclusion, rather than banning individual vocabulary.
    /\b(?:every|all)\s+(?:(?:Adobe\s+)?Acrobat\s+(?:editions?|versions?|plans?)|(?:editions?|versions?|plans?)\s+of\s+(?:Adobe\s+)?Acrobat)\s+(?:(?:always|each)\s+)?(?:includes?|provides?|contains?|offers?|supports?|has|have|comes?\s+with)\s+(?:the\s+)?(?:same\s+(?:features?|capabilities|feature\s+set)|all\s+(?:(?:these|discussed|of\s+these|the)\s+)?(?:features?|capabilities)|these\s+(?:features?|capabilities)|OCR\b|forms?\b|signing\b|every\s+feature\b)/i,
    /(?:US\$|\$|€|£)\s*\d|\b\d+(?:\.\d+)?\s*(?:USD|dollars|euros)\b/i,
  ]) assert(!re.test(text), 'Forbidden comparison claim: ' + re);
}
function validate(slug, source, html) {
  const spec = specs[slug], a = parse(source), visible = plain(html);
  assert.equal(a.title, spec.title); assert.equal(a.date, spec.date);
  assert(source.includes('metadata = blogMetadata("' + slug + '")'));
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), spec.title + ' | PDFcraft');
  assert.equal(plain(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1]), spec.title);
  for (const prefix of ['rel="canonical" href="', 'property="og:url" content="']) assert(html.includes(prefix + 'https://getpdfcraft.com/blog/' + slug + '"'));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(schemas.find(x => x['@type'] === 'BlogPosting').datePublished, spec.iso);
  assert.equal(a.faqs.length, 4);
  assert.deepEqual(schemas.find(x => x['@type'] === 'FAQPage').mainEntity.map(x => ({q:x.name,a:x.acceptedAnswer.text})), a.faqs);
  for (const faq of a.faqs) { assert(visible.includes(faq.q)); assert(visible.includes(faq.a)); }
  const text = prose([a.intro, a.sections, a.faqs]);
  const words = text.trim().split(/\s+/).length;
  assert(words >= spec.min && words <= spec.max, 'Bounded article depth');
  claims(text); claims(visible);
  assert(!/\/lab/.test(source));
  for (const link of spec.links) assert(html.includes('href="' + link + '"'));
  // Compare each section's rendered text with its source; unrelated correct prose
  // elsewhere cannot mask a missing or contradictory section in the export.
  const clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const hs = [...clean.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)];
  for (const section of a.sections) {
    const i = hs.findIndex(m => plain(m[1]) === section.heading); assert(i >= 0);
    const rendered = plain(clean.slice(hs[i].index, hs[i+1]?.index ?? clean.length));
    assert(rendered.includes(section.text));
    claims(rendered);
  }
  if (slug === 'ilovepdf-alternative') {
    assert(a.sections[0].table.rows.length <= 4);
    assert(a.sections[0].text.includes('file selection and drag ordering'));
    assert(a.sections[2].text.includes('PDFcraft is not a full substitute'));
    assert(a.sections[3].text.includes('does not establish offline availability'));
  } else {
    assert(a.intro.includes('not a full Acrobat replacement'));
    const editing = a.sections.find(x => x.heading === 'When an editor or broader workflow is required').text;
    assert(editing.includes('not an equivalent editor'));
    assert(editing.includes('Availability depends on the product and edition'));
    const ocr = a.sections.find(x => x.heading === 'A scanned page image is not searchable text').text;
    assert(ocr.includes('PDFcraft does not provide OCR'));
    assert(ocr.includes('it does not recognize words or add a searchable text layer'));
  }
  console.log('PASS ' + slug + ': ' + words + ' words; metadata, claims, sections, links and FAQ/schema');
}
let rejected = 0;
for (const qualification of [
  'Acrobat is a product family. Capabilities vary by product and edition.',
  'Do not assume every feature is available in every Acrobat edition.',
  'All users should check their edition before choosing OCR, forms or signing.',
]) {
  assert.doesNotThrow(() => claims(qualification));
}
for (const slug of Object.keys(specs)) {
  const source = read('app/blog/' + slug + '/page.js'), html = read('out/blog/' + slug + '.html');
  validate(slug, source, html);
  const mutations = slug === 'ilovepdf-alternative' ? [
    'PDFcraft is better than iLovePDF.', 'iLovePDF requires login.', 'iLovePDF always uploads your files.',
    'PDFcraft is more private than iLovePDF.',
  ] : [
    'PDFcraft fully replaces Acrobat.', 'PDF-to-Image performs OCR.', 'All Acrobat features are free.',
    'Every Acrobat edition includes OCR, forms and signing.',
    'All Acrobat editions include OCR.',
    'Every Acrobat plan provides forms and signing.',
    'All versions of Acrobat contain these features.',
    'Every Acrobat plan includes forms and signing.',
    'All Acrobat versions have the same feature set.',
  ];
  for (const claim of mutations) {
    const a = parse(source); a.sections[0].text += ' ' + claim;
    const mutated = source.replace(/const article = ([\s\S]*?);\s*export/, 'const article = ' + JSON.stringify(a, null, 2) + ';\nexport');
    assert.throws(() => validate(slug, mutated, html), /Forbidden comparison claim/);
    assert.throws(() => validate(slug, source, html.replace('<h1', '<p>' + claim + '</p><h1')), /Forbidden comparison claim/);
    assert.throws(() => validate(slug, mutated, html.replace('<h1', '<p>' + claim + '</p><h1')), /Forbidden comparison claim/);
    rejected += 3;
    console.log('REJECT source, export and consistent source + export: ' + claim);
  }
  const faq = parse(source).faqs[0];
  const visibleFaqMutation = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>)|([^<]+)/g,
    (match, script, text) => script || text.replace(faq.a, 'A contradictory visible answer.'));
  assert.notEqual(visibleFaqMutation, html, 'FAQ mutation must change visible content');
  assert.throws(() => validate(slug, source, visibleFaqMutation));
  assert.throws(() => validate(slug, source, html.replace(
    'rel="canonical" href="https://getpdfcraft.com/blog/' + slug + '"',
    'rel="canonical" href="https://getpdfcraft.com/blog/wrong-target"')));
  rejected += 2;
}
console.log('Competitor differentiation: 2 baselines PASS; ' + rejected + ' adversarial rejections PASS.');
