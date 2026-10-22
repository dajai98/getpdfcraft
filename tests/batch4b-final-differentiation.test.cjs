const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { generateSitemap } = require('../scripts/generate-sitemap.cjs');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const origin = 'https://getpdfcraft.com';
const specs = {
  'convert-pdf-to-png-free': {
    title: 'How to Convert PDF to PNG Free Online', date: 'February 2026', iso: '2026-02', max: 850,
    headings: ['What PDFcraft renders into a PNG', 'Choose PNG or JPG for the receiving task', 'What a page image leaves behind', 'Multi-page output and download checks'],
    required: [
      ['renders whole pages', 'does not extract original embedded images', 'scale 2', 'not a controlled browser pixel test'],
      ['Neither format is always smaller or better', 'not a PNG quality control'],
      ['Rendering is not OCR', 'does not retain selectable PDF text', 'vector shapes no longer remain vector objects', 'does not promise to preserve transparency'],
      ['Every page is rendered', 'page-N.png', 'individual downloads, not a ZIP', 'authorized unlocked copy'],
    ],
    links: ['/tools/pdf-to-image'],
    forbidden: [
      /PNG\s+(?:extracts?|recovers?)\s+(?:the\s+)?original images/i,
      /PNG\s+(?:keeps?|preserves?|retains?)\s+(?:searchable|selectable)\s+text/i,
      /PNG\s+always\s+preserves?\s+transparency/i,
      /PNG\s+is\s+always\s+(?:smaller|better)/i,
      /PNG\s+(?:preserves?|retains?)\s+(?:PDF\s+)?vectors/i,
      /PNG\s+(?:performs?|provides?)\s+OCR/i,
    ],
    mutations: ['PNG extracts original images from the PDF.', 'PNG keeps searchable text.', 'PNG always preserves transparency.', 'PNG is always smaller than JPG.', 'PNG is always better than JPG.', 'PNG preserves vectors.', 'PNG performs OCR.'],
  },
  'how-to-merge-pdf-on-mac': {
    title: 'How to Merge PDF on Mac Free (3 Easy Ways)', date: 'February 2026', iso: '2026-02', max: 950,
    headings: ['Preview: assemble whole documents or selected pages', 'Finder: combine selected files with Create PDF', 'PDFcraft: append PDFs in the displayed source order', 'Choose by the control you need'],
    required: [
      ['saved automatically', 'duplicate originals', 'View > Thumbnails', 'Command-click', 'drag thumbnails'],
      ['Quick Actions > Create PDF', 'order in which files were selected', 'macOS 27'],
      ['displayed insertion order', 'no drag-to-reorder', 'Up/Down', 'AcroForm'],
      ['Native page-by-page assembly', 'Combine selected Finder files', 'PDFcraft supported browser append'],
    ],
    links: ['/tools/merge-pdf', '/tools/reorder-pages', '/blog/how-to-merge-pdf-free', 'https://support.apple.com/en-ie/guide/preview/prvw43696/mac', 'https://support.apple.com/en-ie/guide/mac-help/mchl21ac2368/27/mac/27'],
    forbidden: [
      /Preview\s+uses\s+PDFcraft\s+Merge/i,
      /PDFcraft\s+is\s+always\s+(?:better|faster|easier)/i,
      /Finder\s+preserves?\s+every\s+PDF\s+feature/i,
      /\bwe\s+(?:(?:locally|personally)\s+)?tested\b/i,
      /(?:Preview|Finder|PDFcraft)\s+is\s+(?:the\s+)?(?:fastest|easiest|best)\b/i,
    ],
    mutations: ['Preview uses PDFcraft Merge.', 'PDFcraft is always better than Preview.', 'Finder preserves every PDF feature.', 'We locally tested Preview on a Mac.', 'Finder is the fastest method.'],
  },
  'secure-pdf-on-mac': {
    title: 'How to Password-Protect a PDF on Mac', date: undefined, iso: undefined, max: 800,
    headings: ['Preview separates opening access from permissions', 'PDFcraft provides a narrower opening-password workflow', 'Choose native controls or browser protection', 'Verify the saved copy, not just the dialog'],
    required: [
      ['opening password', 'owner password', 'Permissions', 'does not establish a specific encryption algorithm'],
      ['unencrypted PDF', 'printing and extraction allowed', 'does not expose all Preview permission controls'],
      ['does not promise offline availability', 'not a guarantee against every viewer'],
      ['Close and reopen', 'incorrect password', 'recipient compatibility'],
    ],
    links: ['/tools/protect-pdf', '/blog/how-to-add-password-to-pdf-online', 'https://support.apple.com/guide/preview/password-protect-a-pdf-prvw587dd90f/mac'],
    forbidden: [
      /Preview\s+and\s+PDFcraft\s+use\s+(?:identical|the same)\s+encryption/i,
      /PDF\s+permissions\s+(?:cannot|can never)\s+be\s+bypassed/i,
      /PDFcraft\s+exposes?\s+all\s+Preview\s+permission\s+controls/i,
    ],
    mutations: ['Preview and PDFcraft use identical encryption.', 'PDF permissions cannot be bypassed.', 'PDFcraft exposes all Preview permission controls.'],
  },
  'how-to-lock-pdf-for-job-applications': {
    title: 'How to Lock PDF for Job Applications', date: undefined, iso: undefined, max: 800,
    headings: ['Make the submission decision before using a PDF tool'],
    required: [['required-document list', 'format', 'scoped USAJOBS example, not a rule for every employer or ATS', 'password-delivery method', 'unnecessary sensitive', 'Compression is conditional', 'exact attachments']],
    links: ['/blog/how-to-add-password-to-pdf-online', '/blog/pdf-file-size-too-large', 'https://usajobshelp.opm.gov/hc/en-us/articles/52839989720851-How-do-I-write-a-resume-for-a-federal-job'],
    forbidden: [
      /always\s+password.protect\s+job\s+applications/i,
      /all\s+ATS\s+portals\s+accept\s+encrypted\s+PDFs/i,
      /every\s+employer\s+requires\s+locked\s+PDFs/i,
      /compress\s+every\s+application\s+PDF/i,
    ],
    mutations: ['Always password-protect job applications.', 'All ATS portals accept encrypted PDFs.', 'Every employer requires locked PDFs.', 'Compress every application PDF.'],
  },
};
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&gt;/g, '>').replace(/&lt;/g, '<');
const visible = s => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const prose = v => typeof v === 'string' ? v : !v ? '' : Object.entries(v).filter(([k]) => k !== 'href').map(([, x]) => prose(x)).join(' ');
function parse(source) {
  return {
    title: JSON.parse(source.match(/title=\{("(?:\\.|[^"])*")\}/)[1]),
    date: source.match(/date="([^"]+)"/)?.[1],
    intro: JSON.parse(source.match(/intro=\{([\s\S]*?)\}\s*sections=/)[1]),
    sections: JSON.parse(source.match(/sections=\{([\s\S]*?)\}\s*faqs=/)[1]),
    faqs: JSON.parse(source.match(/faqs=\{([\s\S]*?)\}\s*ctaText=/)[1]),
  };
}
function claims(slug, text) {
  for (const pattern of specs[slug].forbidden) assert(!pattern.test(text), 'Forbidden claim: ' + pattern);
}
function blocks(html) {
  const clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const headings = [...clean.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  return headings.map((m, i) => ({ heading: visible(m[1]), text: visible(clean.slice(m.index, headings[i + 1]?.index ?? clean.length)) }));
}
function validate(slug, source, html) {
  const spec = specs[slug], a = parse(source), text = prose([a.intro, a.sections, a.faqs]);
  claims(slug, text); claims(slug, visible(html));
  assert.equal(a.title, spec.title); assert.equal(a.date, spec.date);
  assert(source.includes('metadata = blogMetadata("' + slug + '")'));
  assert.equal(visible(html.match(/<title>(.*?)<\/title>/)[1]), spec.title + ' | PDFcraft');
  assert.equal(visible(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1]), spec.title);
  for (const prefix of ['rel="canonical" href="', 'property="og:url" content="']) assert(html.includes(prefix + origin + '/blog/' + slug + '"'));
  const schema = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(schema.find(x => x['@type'] === 'BlogPosting').datePublished, spec.iso);
  assert.equal(a.faqs.length, 4);
  assert.deepEqual(schema.find(x => x['@type'] === 'FAQPage').mainEntity.map(x => ({ q: x.name, a: x.acceptedAnswer.text })), a.faqs);
  const rendered = visible(html);
  for (const f of a.faqs) { assert(rendered.includes(f.q)); assert(rendered.includes(f.a)); }
  assert.deepEqual(a.sections.map(s => s.heading), spec.headings);
  const exported = blocks(html);
  for (let i = 0; i < a.sections.length; i++) {
    const section = prose(a.sections[i]);
    const block = exported.find(b => b.heading === spec.headings[i]);
    assert(block, 'Missing rendered section');
    for (const required of spec.required[i]) {
      assert(section.includes(required), 'Missing source decision: ' + required);
      assert(block.text.includes(required), 'Missing rendered decision: ' + required);
    }
    // Compare all prose leaves, not just heading/keyword presence.
    function leaves(v) {
      if (typeof v === 'string') { assert(block.text.includes(v), 'Source/export disagreement: ' + v); return; }
      if (v) for (const [k, x] of Object.entries(v)) if (k !== 'href') leaves(x);
    }
    leaves(a.sections[i]);
  }
  if (slug === 'how-to-merge-pdf-on-mac') {
    assert(!/PDFcraft/.test(prose(a.sections[0])), 'Browser instructions in Preview procedure');
    assert(!/PDFcraft/.test(exported.find(b => b.heading === spec.headings[0]).text));
  }
  if (slug === 'how-to-lock-pdf-for-job-applications') {
    assert.equal(a.sections[0].steps.length, 7);
    assert(a.intro.includes('no universal rule'));
    assert(a.intro.includes('confirm with the recipient'));
  }
  assert(text.split(/\s+/).length <= spec.max, 'Word cap');
  for (const href of spec.links) assert(html.includes('href="' + href + '"'), 'Missing contextual link: ' + href);
  assert(!source.includes('/lab'));
  return text.split(/\s+/).length;
}
let rejected = 0;
for (const [slug, spec] of Object.entries(specs)) {
  const source = read('app/blog/' + slug + '/page.js'), html = read('out/blog/' + slug + '.html');
  console.log('PASS ' + slug + ': ' + validate(slug, source, html) + ' words; sections, metadata, FAQ/schema, links');
  for (const claim of spec.mutations) {
    const mutated = source.replace(/intro=\{([\s\S]*?)\}\s*sections=/, (_, intro) => 'intro={' + JSON.stringify(JSON.parse(intro) + ' ' + claim) + '}\n      sections=');
    const exportMutation = html.replace('<h1', '<p>' + claim + '</p><h1');
    for (const [s, h] of [[mutated, html], [source, exportMutation], [mutated, exportMutation]]) {
      assert.throws(() => validate(slug, s, h), /Forbidden claim/);
      rejected++;
    }
  }
  // Required meaning removed from its own block must fail even if FAQs recap it.
  const marker = spec.required[0][0];
  assert.throws(() => validate(slug, source.replace(marker, 'REMOVED'), html));
  const cleanFaq = parse(source).faqs[0].a;
  const faqMutation = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>)|([^<]+)/g,
    (m, script, text) => script || text.replace(cleanFaq, 'Conflicting visible answer.'));
  assert.notEqual(faqMutation, html);
  assert.throws(() => validate(slug, source, faqMutation));
  assert.throws(() => validate(slug, source, html.replace('rel="canonical" href="' + origin + '/blog/' + slug + '"', 'rel="canonical" href="' + origin + '/blog/wrong"')));
  rejected += 3;
}
const { routes, redirects, xml } = generateSitemap();
const from = '/blog/compress-pdf-for-whatsapp', to = '/blog/pdf-file-size-too-large';
assert.equal(routes.filter(r => r.startsWith('/blog/')).length, 31);
assert.equal(routes.filter(r => r.startsWith('/tools/')).length, 13);
assert.equal(routes.length, 50); assert.equal(redirects.length, 19);
for (const source of [from, '/blog/pdf-vs-word-which-is-better/compress-pdf-for-whatsapp']) {
  assert.deepEqual(redirects.filter(([f]) => f === source), [[source, to, '301']]);
  assert(!routes.includes(source));
}
assert(!redirects.some(([f]) => f === to));
assert(!fs.existsSync(path.join(root, 'app', from, 'page.js')));
assert(!fs.existsSync(path.join(root, 'out', from + '.html')));
assert(!require('../lib/blogCatalog.json').some(p => p.slug === 'compress-pdf-for-whatsapp'));
for (const sitemap of [xml, read('public/sitemap.xml'), read('out/sitemap.xml')]) assert(!sitemap.includes(origin + from + '</loc>'));
const destination = JSON.parse(read('app/blog/pdf-file-size-too-large/page.js').match(/const article = ([\s\S]*?);\s*export/)[1]);
const diagnostic = destination.sections.find(s => s.heading === 'Separate delivery failures from size problems').text;
assert(diagnostic.split(/\s+/).length >= 60 && diagnostic.split(/\s+/).length <= 90);
for (const required of ['actually size-related', 'current documented requirements', 'Verify the compressed output opens', 'compression alone has not diagnosed']) assert(diagnostic.includes(required));
assert(!/\b\d+\s*(?:MB|GB)\b/i.test(diagnostic));
assert(visible(read('out' + to + '.html')).includes(diagnostic));
for (const route of routes) {
  const html = read('out/' + (route === '/' ? 'index' : route.slice(1)) + '.html');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(decode(href), origin);
    if (url.origin === origin) assert(![from, '/lab'].includes(url.pathname), 'Removed/unpublished link');
  }
}
console.log('PASS WhatsApp: bounded diagnostic, source removed, both direct redirects, no chains/live source links; current inventory 31/13/50/19');
console.log('Batch 4B final: 4 baselines PASS; ' + rejected + ' adversarial rejections PASS.');
