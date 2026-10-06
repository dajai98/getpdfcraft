const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { generateSitemap } = require('../scripts/generate-sitemap.cjs');
const posts = require('../lib/blogCatalog.json');
const guides = require('../lib/toolGuides.json');
const { origin } = require('../lib/siteConfig.json');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const normalize = s => decode(s).replace(/\s+/g, ' ').trim();
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch(e) { failed++; console.error('FAIL ' + name + ': ' + e.message); } }
const { xml, routes, redirects } = generateSitemap();
const routeSet = new Set(routes);
const htmlPath = route => 'out/' + (route === '/' ? 'index' : route.slice(1)) + '.html';
const attr = (html, key, value, result) => {
  const tag = (html.match(/<(?:meta|link)\b[^>]*>/g) || []).find(t => t.includes(key + '="' + value + '"'));
  return tag && decode(tag.match(new RegExp(result + '="([^"]*)"'))?.[1] || '');
};
test('Source inventory: 13 tools, 45 articles, 64 indexable routes', () => {
  assert.equal(routes.filter(r => r.startsWith('/tools/')).length, 13);
  assert.equal(posts.length, 45); assert.equal(routes.length, 64);
  assert.equal(redirects.length, 8);
});
test('Deterministic public and exported sitemap; no invented lastmod', () => {
  assert.equal(xml, generateSitemap().xml);
  assert.equal(read('public/sitemap.xml').replaceAll('\r\n', '\n'), xml);
  assert.equal(read('out/sitemap.xml').replaceAll('\r\n', '\n'), xml);
  assert(!xml.includes('<lastmod>'));
});
test('Robots permits crawling and points to canonical sitemap', () => {
  assert.equal(read('public/robots.txt'), read('out/robots.txt'));
  assert(read('out/robots.txt').includes('Sitemap: ' + origin + '/sitemap.xml'));
  assert(!/Disallow:\s*\/\s*(?:\r?\n|$)/.test(read('out/robots.txt')));
});
test('Blog index uses catalog and includes exactly all 45 article URLs', () => {
  assert(read('app/blog/page.js').includes('import posts from "@/lib/blogCatalog.json"'));
  assert(!read('app/blog/page.js').includes('const posts = ['));
  const slugs = [...new Set([...read('out/blog.html').matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map(m => m[1]))].sort();
  assert.deepEqual(slugs, posts.map(p => p.slug).sort());
});
for (const route of routes) test('Export metadata, schema and links ' + route, () => {
  const html = read(htmlPath(route));
  const expected = new URL(route, origin).href;
  const canonical = attr(html, 'rel', 'canonical', 'href');
  assert.equal(new URL(canonical).href, expected);
  assert.equal(new URL(attr(html, 'property', 'og:url', 'content')).href, expected);
  assert(attr(html, 'name', 'description', 'content'));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' '));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  for (const schema of schemas) {
    assert(!schema.aggregateRating && !schema.review);
    if (schema['@type'] === 'FAQPage') for (const q of schema.mainEntity) {
      assert(visible.includes(normalize(q.name)), 'FAQ question missing from visible copy');
      assert(visible.includes(normalize(q.acceptedAnswer.text)), 'FAQ answer missing from visible copy');
    }
  }
  for (const m of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = new URL(decode(m[1]), origin);
    if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol)) continue;
    const p = url.pathname;
    if (path.posix.extname(p) || p.startsWith('/_next/')) assert(fs.existsSync(path.join(root, 'out', p)), 'Missing asset ' + p);
    else assert(routeSet.has(p), 'Missing or redirected internal route ' + p);
  }
});
for (const post of posts) test('Shared article metadata ' + post.slug, () => {
  const source = read('app/blog/' + post.slug + '/page.js');
  assert(source.includes('metadata = blogMetadata(' + JSON.stringify(post.slug) + ')'));
  const html = read('out/blog/' + post.slug + '.html');
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), post.title + ' | PDFcraft');
  assert.equal(attr(html, 'name', 'description', 'content'), post.description);
  assert.equal(attr(html, 'property', 'og:title', 'content'), post.title + ' | PDFcraft');
  assert.equal(normalize(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]), post.title);
});
for (const [slug, [article]] of Object.entries(guides)) test('Relevant guide links ' + slug, () => {
  assert(posts.some(p => p.slug === article));
  const html = read('out/tools/' + slug + '.html');
  for (const guide of [article, 'how-browser-based-pdf-processing-works', 'pdf-tool-not-working-troubleshooting']) assert(html.includes('href="/blog/' + guide + '"'));
});
test('Existing favicon exported without changes; no duplicate icon tags', () => {
  const icon = fs.readFileSync(path.join(root, 'public/icon.png'));
  assert.equal(icon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(icon.readUInt32BE(16), 512); assert.equal(icon.readUInt32BE(20), 512);
  assert(icon.equals(fs.readFileSync(path.join(root, 'out/icon.png'))));
  for (const r of routes) {
    const tags = read(htmlPath(r)).match(/<link[^>]+rel="[^"]*icon[^"]*"[^>]*>/g) || [];
    assert.equal(tags.length, 1); assert(tags[0].includes('href="/icon.png"'));
  }
});
test('Unsupported conversion guides clearly disclose missing tools', () => {
  for (const slug of ['pdf-to-word-free', 'how-to-convert-pdf-to-excel', 'how-to-sign-pdf-free']) {
    const html = read('out/blog/' + slug + '.html');
    assert(/PDFcraft (?:does not|has no)/.test(html), slug);
  }
});
test('Measurement guide has no Tested badge or invented benchmark', () => {
  assert.equal(posts.find(p => p.slug === 'pdf-compression-real-test-results').tag, 'Measurement');
  const html = read('out/blog/pdf-compression-real-test-results.html');
  assert(!/>Tested</.test(html)); assert(read('out/blog.html').includes('Measurement'));
});
test('Generator rejects missing/extra catalog routes without writing', () => {
  const post = posts.pop();
  try { assert.throws(() => generateSitemap(), /catalog and actual/); } finally { posts.push(post); }
  posts.push({ ...post, slug: 'nonexistent-test-article' });
  try { assert.throws(() => generateSitemap(), /catalog and actual/); } finally { posts.pop(); }
});
test('Generator rejects duplicate catalog entries', () => {
  posts.push(posts[0]);
  try { assert.throws(() => generateSitemap(), /Duplicate catalog/); } finally { posts.pop(); }
});
test('Generator rejects incomplete listing metadata', () => {
  const title = posts[0].title; posts[0].title = '';
  try { assert.throws(() => generateSitemap(), /Missing catalog field/); } finally { posts[0].title = title; }
});
console.log(`TOTAL ${passed + failed} PASS ${passed} FAIL ${failed}`);
process.exitCode = failed ? 1 : 0;
