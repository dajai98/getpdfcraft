const fs = require('node:fs');
const assert = require('node:assert/strict');
const docs = require('../lib/toolDocumentation.json');
const { routes } = require('../scripts/generate-sitemap.cjs').generateSitemap();
const decode = s => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const normalize = s => decode(s).replace(/\s+/g, ' ').trim();
const tools = routes.filter(r => r.startsWith('/tools/')).map(r => r.split('/').pop());
assert.deepEqual(Object.keys(docs).sort(), tools.sort());
const answers = new Set(), paragraphs = new Set(), headings = new Set();
for (const [slug, doc] of Object.entries(docs)) {
  assert(doc.heading && !headings.has(doc.heading), slug + ': unique heading');
  headings.add(doc.heading);
  const html = fs.readFileSync('out/tools/' + slug + '.html', 'utf8');
  const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' '));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = schemas.filter(s => s['@type'] === 'FAQPage');
  assert.equal(faq.length, 1, slug + ': exactly one FAQ schema');
  assert.deepEqual(faq[0].mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })), doc.faqs);
  const copy = [doc.heading, ...(doc.notice ? [doc.notice] : [])];
  for (const section of doc.sections) {
    copy.push(section.title);
    for (const p of section.paragraphs) {
      assert(!paragraphs.has(normalize(p)), slug + ': duplicated paragraph');
      paragraphs.add(normalize(p)); copy.push(p);
    }
  }
  for (const faq of doc.faqs) {
    assert(!answers.has(normalize(faq.a)), slug + ': duplicated FAQ answer');
    answers.add(normalize(faq.a)); copy.push(faq.q, faq.a);
  }
  for (const text of copy) assert(visible.includes(normalize(text)), slug + ': missing visible copy: ' + text);
  assert(!/href=["']\/lab(?:[\/"'])/.test(html), slug + ': unpublished Lab link');
  assert(!/(?:tests\/evidence|scripts\/lab|compression-2026|preservation-2026|[A-Z]:\\)/.test(copy.join(' ')), slug + ': internal evidence path');
}
console.log('Tool documentation PASS: ' + tools.length + ' routes; ' + paragraphs.size + ' unique paragraphs; ' + answers.size + ' unique FAQ answers; visible/schema parity; no Lab links or internal evidence paths.');
