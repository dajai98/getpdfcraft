const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const slug = 'how-to-merge-pdf-on-windows';
const source = read('app/blog/' + slug + '/page.js');
const html = read('out/blog/' + slug + '.html');
const decode = s => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
function validate(source, html) {
const sections = JSON.parse(source.match(/sections=\{(\[[\s\S]*?\n\])\}/)[1]);
const faqs = JSON.parse(source.match(/faqs=\{(\[[\s\S]*?\n\])\}/)[1]);
const title = 'How to Merge PDF on Windows Without Installing an App';
assert(source.includes('metadata = blogMetadata("' + slug + '")'));
assert(source.includes('title={' + JSON.stringify(title) + '}'));
assert(source.includes('date="February 2026"'));
assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), title + ' | PDFcraft');
assert.equal(decode(html.match(/<h1[^>]*>(.*?)<\/h1>/)[1]), title);
for (const pattern of ['rel="canonical" href="', 'property="og:url" content="']) {
  assert(html.includes(pattern + 'https://getpdfcraft.com/blog/' + slug + '"'));
}
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
assert.equal(schemas.find(x => x['@type'] === 'BlogPosting').datePublished, '2026-02');
assert.equal(sections.length, 4);
assert.equal(faqs.length, 4);
assert.deepEqual(schemas.find(x => x['@type'] === 'FAQPage').mainEntity.map(x => ({ q: x.name, a: x.acceptedAnswer.text })), faqs);
const mergeHeading = 'Combine existing pages, then check A1, A2 and B1';
const wordHeading = 'Opening a PDF in Word converts its content';
const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
const plain = value => decode(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
function renderedSection(heading) {
  const headings = [...visibleHtml.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)];
  const matches = headings.filter(m => plain(m[1]) === heading);
  assert.equal(matches.length, 1, 'Exactly one rendered section: ' + heading);
  const index = headings.indexOf(matches[0]);
  return visibleHtml.slice(matches[0].index + matches[0][0].length, headings[index + 1]?.index ?? visibleHtml.length);
}
function sourceSection(heading) {
  const matches = sections.filter(section => section.heading === heading);
  assert.equal(matches.length, 1, 'Exactly one source section: ' + heading);
  return matches[0];
}
// Independent fixture contract: A has A1/A2; B has B1; append A before B.
const expectedOrder = 'A1 \u2192 A2 \u2192 B1';
function checkExample(text) {
  assert(/input A contains A1 and A2/i.test(text), 'Example input A');
  assert(/input B contains B1/i.test(text), 'Example input B');
  const orders = [...text.matchAll(/With A before B, the expected order is ([^.]+)\./g)];
  assert.equal(orders.length, 1, 'One intended merge order');
  assert.equal(orders[0][1], expectedOrder, 'Intended merge order');
}
const merge = sourceSection(mergeHeading);
const example = merge.steps.filter(step => step.title === 'Merge and download');
assert.equal(example.length, 1);
checkExample(example[0].body);
const renderedMerge = renderedSection(mergeHeading);
const stepMatch = renderedMerge.match(/<h3[^>]*>Merge and download<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/);
assert(stepMatch, 'Rendered merge example step');
checkExample(plain(stepMatch[1]));
function checkWord(text) {
  assert(/makes a copy of a PDF and converts it into an editable Word document/i.test(text), 'Word copy/conversion');
  assert(/attempting to reproduce the layout.*result can differ/i.test(text), 'Word layout uncertainty');
  assert(/(?:conceptually different from|not the same (?:operation )?as) appending (?:finished |existing )?PDF pages/i.test(text), 'Word must distinguish conversion from merge');
  // Inspect affirmative equivalence statements in this section, not the word "same" globally.
  const contradiction = /(?:is|are|equals?|constitutes?|performs?)\s+(?:(?:conceptually|essentially|exactly)\s+)?(?:the same (?:operation|process|thing)?\s*as\s+(?:structural (?:PDF )?merging|appending (?:finished |existing )?PDF pages)|equivalent to\s+(?:structural (?:PDF )?merging|appending (?:finished |existing )?PDF pages)|(?:a |an )?(?:structural )?PDF page merg(?:e|ing) operation)/i;
  assert(!contradiction.test(text), 'Contradictory Word operation classification');
}
checkWord(sourceSection(wordHeading).text);
checkWord(plain(renderedSection(wordHeading)));
assert(source.includes('Structural page combination'));
assert(source.includes('Do not rely on separate print jobs to merge files'));
assert(source.includes('converts it into an editable Word document'));
assert(source.includes('layout'));
assert(!/PDF24|\/lab|\/blog\/merge-pdf-on-iphone/.test(source));
assert(!/Windows (?:has no|lacks|cannot)|tested (?:in|on) (?:Chrome|Edge|Windows)/i.test(source));
for (const link of ['/tools/merge-pdf', '/tools/reorder-pages', '/blog/how-to-merge-pdf-free']) {
  assert(html.includes('href="' + link + '"'));
}
for (const faq of faqs) {
  const visible = decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' '));
  assert(visible.includes(faq.q));
  assert(visible.includes(faq.a));
}
}
validate(source, html);
console.log('Windows differentiation PASS: metadata/date, four sections/FAQs, visible-schema parity, decision boundaries, example and links.');

// Mutate only in-memory strings. No article or export is written by this suite.
let rejected = 0;
function rejects(name, changedSource, changedHtml, expectedError) {
  assert(changedSource !== source || changedHtml !== html, 'Mutation must change its input: ' + name);
  assert.throws(() => validate(changedSource, changedHtml), expectedError);
  rejected++;
  console.log('PASS adversarial: ' + name);
}
rejects('PDF24 restored', source.replace('On Windows,', 'PDF24 is an alternative. On Windows,'), html, /PDF24/);
rejects('canonical changed', source, html.replace('rel="canonical" href="https://getpdfcraft.com/blog/' + slug + '"', 'rel="canonical" href="https://getpdfcraft.com/blog/wrong"'), /assert/);
const faqScript = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].find(m => JSON.parse(m[1])['@type'] === 'FAQPage');
const changedSchema = JSON.parse(faqScript[1]);
changedSchema.mainEntity[0].acceptedAnswer.text = 'A deliberately incorrect schema answer.';
rejects('FAQ/schema disagreement', source, html.replace(faqScript[0], '<script type="application/ld+json">' + JSON.stringify(changedSchema) + '</script>'), /deep-equal/);
rejects('absolute Windows-native claim', source.replace('On Windows,', 'Windows cannot merge PDFs natively. On Windows,'), html, /Windows/);

const intended = 'the expected order is A1 \u2192 A2 \u2192 B1';
const wrong = 'the expected order is B1 \u2192 A2 \u2192 A1';
const wrongSource = source.replace(intended, wrong);
const wrongHtml = html.replaceAll(intended, wrong);
// A correct sequence remains in printing prose: the old global check would pass.
assert(wrongSource.includes('A1 \u2192 A2 \u2192 B1'));
rejects('wrong intended order: source', wrongSource, html, /Intended merge order/);
rejects('wrong intended order: export', source, wrongHtml, /Intended merge order/);
rejects('wrong intended order: source and export', wrongSource, wrongHtml, /Intended merge order/);

const distinction = 'It is conceptually different from appending finished PDF pages.';
for (const statement of [
  'Opening the PDF in Word is the same operation as appending finished PDF pages.',
  'Word conversion is equivalent to appending finished PDF pages.',
  'Word conversion is a PDF page merge operation.',
  'Word conversion is the same as structural merging.',
]) {
  // Keep the positive distinction as well: negative checks must catch contradiction,
  // not pass merely because conversion/layout and a correct sentence still occur.
  rejects('Word contradiction in source: ' + statement, source.replace(distinction, distinction + ' ' + statement), html, /Contradictory Word/);
  rejects('Word contradiction in export: ' + statement, source, html.replaceAll(distinction, distinction + ' ' + statement), /Contradictory Word/);
}
rejects('Word distinction replaced', source.replace(distinction, 'It is the same operation as appending finished PDF pages.'), html, /Word must distinguish/);
rejects('rendered Word distinction removed', source, html.replaceAll(distinction, ''), /Word must distinguish/);
console.log('Windows adversarial regressions: ' + rejected + ' rejected; baseline PASS.');
