const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { generateSitemap } = require('../scripts/generate-sitemap.cjs');
const root = path.resolve(__dirname, '..'), origin = 'https://getpdfcraft.com';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const plain = s => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const prose = v => typeof v === 'string' ? v : !v ? '' : Object.entries(v).filter(([k]) => k !== 'href').map(([, x]) => prose(x)).join(' ');
function parse(source) {
  const object = source.match(/const article = ([\s\S]*?);\s*export/);
  if (object) return JSON.parse(object[1]);
  return {
    title: JSON.parse(source.match(/title=\{("(?:\\.|[^"])*")\}/)[1]),
    date: source.match(/date="([^"]+)"/)[1],
    intro: JSON.parse(source.match(/intro=\{([\s\S]*?)\}\s*sections=/)[1]),
    sections: JSON.parse(source.match(/sections=\{([\s\S]*?)\}\s*faqs=/)[1]),
    faqs: JSON.parse(source.match(/faqs=\{([\s\S]*?)\}\s*ctaText=/)[1]),
  };
}
const retired = ['what-is-pdf', 'pdf-to-word-free', 'how-to-convert-pdf-to-excel', 'how-to-sign-pdf-free'];
const specs = {
  'pdf-vs-word-which-is-better': {
    title: 'PDF vs Word — Which Format Should You Use?', date: 'February 2026', iso: '2026-02', faqs: 4,
    sections: {
      'Keep a working source and a delivery copy': ['authoritative working version', 'Revise wording', 'The explicitly requested format'],
      'Example: revise the report, then assemble the packet': ['Correct the paragraph in the working document first', 'Only then assemble the PDF appendix', 'do not reconstruct editable Word paragraphs'],
      'If only the PDF remains, conversion is a separate job': ['not a PDFcraft feature', 'no PDF-to-Word or OCR tool', 'compare paragraphs, tables and reading order'],
      'Let the recipient requirement override your preference': ['receiving instructions', 'not a guarantee', 'Keep the source'],
    },
  },
  'pdf-security-guide': {
    title: 'PDF Security Guide — How to Protect Your Documents', date: 'February 2026', iso: '2026-02', faqs: 2,
    sections: {
      'Choose a signing workflow before preparing the final copy': ['no electronic-signature placement or certificate-based signing workflow', 'not interchangeable', 'Finalize the unsigned document', 'signing method elsewhere', 'not a substitute for signing', 'does not validate or guarantee signature preservation'],
    },
  },
};
// Match affirmative product-operation claims; negative disclosures and
// descriptions of external editors/signature concepts remain legitimate.
const forbidden = [
  /\bPDFcraft\s+(?:(?:can|will|lets you|allows you to|helps you)\s+)?(?:converts?|exports?|generates?|produces?|extracts?)\b[^.!?]{0,90}\b(?:Word|DOCX?|Excel|XLSX?|spreadsheets?|tables?)\b/i,
  /\bUse\s+PDFcraft\s+to\s+(?:download|save|export|convert)\b[^.!?]{0,90}\b(?:DOCX?|Word|Excel|XLSX?)\b/i,
  /\bPDFcraft\s+(?:(?:can|will|lets you|allows you to|helps you)\s+)?(?:(?:digitally|electronically)\s+signs?|signs?\s+(?:PDFs?|documents?)|(?:creates?|provides?|adds?)\s+(?:(?:digital|electronic|cryptographic|certificate-based)\s+)?signatures?)\b/i,
  /\b(?:Use\s+)?Watermark\s+(?:to|can|lets you)\s+(?:(?:digitally|electronically)\s+)?sign\b/i,
  /\b(?:Password protection|Watermark)\s+(?:is|provides|creates|equals)\s+(?:an?\s+)?(?:digital|electronic|cryptographic)\s+signature\b/i,
];
function claims(text) {
  for (const pattern of forbidden) assert(!pattern.test(text), 'Unsupported capability: ' + pattern);
}
function validate(slug, source, html) {
  const spec = specs[slug], a = parse(source);
  claims(prose(a)); claims(plain(html));
  assert.equal(a.title, spec.title); assert.equal(a.date, spec.date);
  assert(source.includes('metadata = blogMetadata("' + slug + '")'));
  assert.equal(plain(html.match(/<title>(.*?)<\/title>/)[1]), spec.title + ' | PDFcraft');
  assert.equal(plain(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1]), spec.title);
  for (const key of ['rel="canonical" href="', 'property="og:url" content="']) assert(html.includes(key + origin + '/blog/' + slug + '"'));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(schemas.find(s => s['@type'] === 'BlogPosting').datePublished, spec.iso);
  assert.equal(a.faqs.length, spec.faqs);
  assert.deepEqual(schemas.find(s => s['@type'] === 'FAQPage').mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), a.faqs);
  for (const f of a.faqs) { assert(plain(html).includes(f.q)); assert(plain(html).includes(f.a)); }
  const clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''), hs = [...clean.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)];
  for (const [heading, terms] of Object.entries(spec.sections)) {
    const sourceSection = a.sections.find(s => s.heading === heading);
    assert(sourceSection, 'Required source section');
    const i = hs.findIndex(h => plain(h[1]) === heading); assert(i >= 0, 'Required rendered section');
    const block = plain(clean.slice(hs[i].index, hs[i + 1]?.index ?? clean.length));
    for (const term of terms) {
      assert(prose(sourceSection).includes(term), 'Missing source meaning: ' + term);
      assert(block.includes(term), 'Missing rendered meaning: ' + term);
    }
    function leaves(v) {
      if (typeof v === 'string') { assert(block.includes(v), 'Source/export disagreement'); return; }
      if (v) for (const [k, x] of Object.entries(v)) if (k !== 'href') leaves(x);
    }
    leaves(sourceSection);
  }
  if (slug === 'pdf-vs-word-which-is-better') {
    assert.equal(a.sections.length, 4); assert(prose(a).split(/\s+/).length < 900);
    for (const href of ['/tools/merge-pdf', '/blog/how-to-edit-pdf-free', '/blog/how-to-lock-pdf-for-job-applications', 'https://support.microsoft.com/en-us/word/opening-pdfs-in-word']) assert(html.includes('href="' + href + '"'));
  } else {
    const transfer = a.sections.find(s => s.heading === Object.keys(spec.sections)[0]);
    assert(transfer.text.split(/\s+/).length <= 110, 'Bounded transfer');
  }
}
const mutations = [
  'PDFcraft converts PDF files to Word documents.',
  'Use PDFcraft to download your PDF as DOCX.',
  'PDFcraft converts PDF tables directly to Excel.',
  'PDFcraft exports XLSX spreadsheets.',
  'PDFcraft lets you digitally sign PDFs.',
  'PDFcraft digitally signs PDFs.',
  'PDFcraft electronically signs PDFs.',
  'PDFcraft exports DOCX.',
  'Use Watermark to digitally sign your document.',
  'Password protection is a digital signature.',
  'PDFcraft can generate DOC files.',
  'PDFcraft produces Excel workbooks.',
  'PDFcraft extracts tables from your PDF.',
  'PDFcraft allows you to electronically sign documents.',
  'PDFcraft provides cryptographic signatures.',
  'Watermark can sign PDFs.',
  'Watermark creates an electronic signature.',
];
let rejected = 0;
for (const text of [
  'PDFcraft does not convert PDF to Word or Excel.',
  'PDFcraft has no signing or OCR tool.',
  'Password protection is not a digital signature.',
  'Use a separate editor for Word conversion.',
  'A certificate-based signing workflow is different from a visible mark.',
]) assert.doesNotThrow(() => claims(text));
for (const slug of Object.keys(specs)) {
  const source = read('app/blog/' + slug + '/page.js'), html = read('out/blog/' + slug + '.html');
  validate(slug, source, html);
  for (const claim of mutations) {
    let changed;
    if (source.includes('const article = ')) {
      const a = parse(source); a.intro += ' ' + claim;
      changed = source.replace(/const article = ([\s\S]*?);\s*export/, () => 'const article = ' + JSON.stringify(a) + ';\nexport');
    } else changed = source.replace(/intro=\{([\s\S]*?)\}\s*sections=/, (_, intro) => 'intro={' + JSON.stringify(JSON.parse(intro) + ' ' + claim) + '}\n      sections=');
    const rendered = html.replace('<h1', '<p>' + claim + '</p><h1');
    for (const [s, h] of [[changed, html], [source, rendered], [changed, rendered]]) {
      assert.throws(() => validate(slug, s, h), /Unsupported capability/);
      rejected++;
    }
  }
  assert.throws(() => validate(slug, source, html.replace('rel="canonical" href="' + origin + '/blog/' + slug + '"', 'rel="canonical" href="' + origin + '/blog/wrong"')));
  const answer = parse(source).faqs[0].a;
  const changedFaq = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>)|([^<]+)/g, (m, script, text) => script || text.replace(answer, 'Changed answer.'));
  assert.notEqual(changedFaq, html); assert.throws(() => validate(slug, source, changedFaq));
  rejected += 2;
  console.log('PASS survivor/transfer metadata, date, FAQ, decisions and capability boundary: ' + slug);
}
const { routes, redirects, xml } = generateSitemap(), catalog = require('../lib/blogCatalog.json');
assert.deepEqual([catalog.length, routes.filter(r => r.startsWith('/tools/')).length, routes.length, redirects.length], [31, 13, 50, 19]);
const destination = '/blog/pdf-security-guide';
for (const slug of retired) {
  const route = '/blog/' + slug;
  assert(!routes.includes(route)); assert(!catalog.some(p => p.slug === slug));
  assert(!fs.existsSync(path.join(root, 'app/blog', slug, 'page.js')));
  assert(!fs.existsSync(path.join(root, 'out/blog', slug + '.html')));
  assert(!fs.existsSync(path.join(root, 'out/blog', slug, 'index.html')));
  for (const sitemap of [xml, read('public/sitemap.xml'), read('out/sitemap.xml')]) assert(!sitemap.includes(origin + route + '</loc>'));
  const matches = redirects.filter(([from]) => from === route);
  assert.deepEqual(matches, slug === 'how-to-sign-pdf-free' ? [[route, destination, '301']] : [], 'No convenient redirect for unmatched intent');
}
assert.deepEqual(redirects.filter(([from]) => from === '/blog/pdf-vs-word-which-is-better/compress-pdf-for-whatsapp'),
  [['/blog/pdf-vs-word-which-is-better/compress-pdf-for-whatsapp', '/blog/pdf-file-size-too-large', '301']]);
for (const [from, to] of redirects) {
  assert(!routes.includes(from)); assert(routes.includes(to));
  assert(!redirects.some(([source]) => source === to), 'No redirect chains/cycles');
}
assert(fs.existsSync(path.join(root, 'out/404.html')), 'Static export retains not-found document');
assert(!routes.some(r => r === '/lab' || r.startsWith('/lab/')));
for (const route of routes) {
  const html = read('out/' + (route === '/' ? 'index' : route.slice(1)) + '.html');
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(decode(href), origin);
    if (url.origin === origin) assert(!retired.some(s => url.pathname.replace(/\/$/, '') === '/blog/' + s), 'Removed-source live link');
  }
}
console.log('PASS retirement/catalog/export/sitemap, exact 301/no-redirect decisions, legacy redirect, live links, inventory 31/13/50/19');
console.log('Batch 5: 2 content baselines; 5 positive capability cases; ' + rejected + ' adversarial rejections PASS');
