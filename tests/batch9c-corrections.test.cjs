const assert = require('node:assert/strict');
const fs = require('node:fs');
const catalog = require('../lib/blogCatalog.json');
const { generateSitemap } = require('../scripts/generate-sitemap.cjs');
// Independently enumerated unresolved publication histories from Batch 9.
const undated = ['how-to-merge-pdf-free', 'how-to-split-pdf-online', 'how-to-remove-password-from-pdf', 'how-to-add-password-to-pdf-online', 'how-to-combine-pdf-and-images', 'why-is-my-pdf-locked', 'how-to-lock-pdf-for-job-applications', 'how-to-secure-pdf-before-sending-email', 'how-to-protect-pdf-from-editing', 'secure-pdf-on-mac'];
const read = p => fs.readFileSync(p, 'utf8');
function dates(post, source, html) {
  assert(!Object.hasOwn(post, 'date'), 'Unverified catalog date');
  assert(!/(?:"date"\s*:|\bdate=)/.test(source), 'Unverified article date');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const article = schemas.find(s => s['@type'] === 'BlogPosting');
  assert(article); assert(!Object.hasOwn(article, 'datePublished')); assert(!Object.hasOwn(article, 'dateModified'));
}
for (const slug of undated) {
  const post = catalog.find(p => p.slug === slug), source = read('app/blog/' + slug + '/page.js'), html = read('out/blog/' + slug + '.html');
  dates(post, source, html);
  assert.throws(() => dates({ ...post, date: 'January 2026' }, source, html));
  assert.throws(() => dates(post, source + '\ndate="January 2026"', html));
  assert.throws(() => dates(post, source, html.replace('"@type":"BlogPosting"', '"@type":"BlogPosting","datePublished":"2026-01"')));
}
// Every remaining dated listing must agree at month precision with its export.
for (const post of catalog.filter(p => p.date)) {
  const html = read('out/blog/' + post.slug + '.html');
  const published = JSON.parse([...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].find(m => m[1].includes('"BlogPosting"'))[1]).datePublished;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = String(months.indexOf(post.date.slice(0, 3)) + 1).padStart(2, '0');
  assert.equal(post.date.match(/\d{4}/)[0] + '-' + month, published.slice(0, 7), post.slug);
}
function contrast(fg, bg) {
  const lum = hex => hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  return (Math.max(lum(fg), lum(bg)) + .05) / (Math.min(lum(fg), lum(bg)) + .05);
}
const home = read('out/index.html');
for (const label of ['PDFcraft behavior', '13 free tools. Local document processing. No account required.']) {
  const tag = [...home.matchAll(/<(th|p)\b([^>]*)>([^<]*)<\/(?:th|p)>/g)].find(m => m[3] === label);
  assert(tag, label); const color = tag[2].match(/color:(#[a-f\d]{6})/i)[1];
  assert(contrast(color, '#111827') >= 4.5, label);
}
assert(contrast('#6b7280', '#111827') < 4.5);
assert(read('app/about/page.js').includes('I left college in 2019.'));
assert(!read('app/about/page.js').includes('when COVID disrupted everything'));
const privacy = read('out/privacy.html');
for (const phrase of ['Where personalized advertising is enabled', 'prior visits to this site or other sites', 'https://www.google.com/settings/ads']) assert(privacy.includes(phrase));
const { routes, redirects } = generateSitemap();
assert.equal(catalog.length, 31); assert.equal(routes.filter(r => r.startsWith('/tools/')).length, 13); assert.equal(routes.length, 50); assert.equal(redirects.length, 19);
for (const route of routes) {
  const html = read('out' + (route === '/' ? '/index' : route) + '.html');
  const canonicals = [...html.matchAll(/rel="canonical" href="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(canonicals, ['https://getpdfcraft.com' + (route === '/' ? '' : route)]);
}
console.log('BATCH 9C PASS: 10 undated articles; 30 date adversaries; 21 month-consistent listings; 2 rendered contrast checks; chronology/privacy; 50 canonicals; 31/13/50/19 inventory');
