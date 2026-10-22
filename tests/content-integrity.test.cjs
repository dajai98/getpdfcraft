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
test('Source inventory: 13 tools, 31 articles, 50 indexable routes', () => {
  assert.equal(routes.filter(r => r.startsWith('/tools/')).length, 13);
  assert.equal(posts.length, 31); assert.equal(routes.length, 50);
  assert.equal(redirects.length, 19);
});

const batch4Merges = {
  'how-to-sign-pdf-free': 'pdf-security-guide',
  'compress-pdf-for-whatsapp': 'pdf-file-size-too-large',
  'merge-pdf-on-android': 'how-to-merge-pdf-free',
  'how-to-compress-pdf-for-email': 'pdf-file-size-too-large',
  'split-pdf-into-two': 'how-to-split-pdf-online',
  'how-to-compress-pdf-on-iphone': 'compress-pdf-without-losing-quality',
  'reduce-pdf-size-without-software': 'pdf-file-size-too-large',
  'how-to-encrypt-pdf-files-free': 'how-to-add-password-to-pdf-online',
  'how-to-lock-pdf-without-adobe': 'how-to-add-password-to-pdf-online',
  'password-protect-pdf-on-android': 'how-to-add-password-to-pdf-online',
  'lock-pdf-on-iphone': 'how-to-add-password-to-pdf-online',
};
for (const [source, destination] of Object.entries(batch4Merges)) test('Batch 4 direct redirect and removed route ' + source, () => {
  const from = '/blog/' + source, to = '/blog/' + destination;
  assert.deepEqual(redirects.filter(([f]) => f === from), [[from, to, '301']]);
  assert(!routeSet.has(from)); assert(routeSet.has(to));
  assert(!posts.some(p => p.slug === source)); assert(posts.some(p => p.slug === destination));
  assert(!fs.existsSync(path.join(root, 'app/blog', source, 'page.js')));
  assert(!fs.existsSync(path.join(root, htmlPath(from))));
  assert(!fs.existsSync(path.join(root, 'out/blog', source, 'index.html')));
  for (const sitemap of [xml, read('public/sitemap.xml'), read('out/sitemap.xml')]) {
    assert(!sitemap.includes('<loc>' + origin + from + '</loc>'));
    assert(sitemap.includes('<loc>' + origin + to + '</loc>'));
  }
  assert.equal(attr(read(htmlPath(to)), 'rel', 'canonical', 'href'), origin + to);
});
test('All redirects are direct, unique and exported unchanged', () => {
  const sources = new Set(redirects.map(([from]) => from));
  assert.equal(sources.size, redirects.length);
  for (const [from, to] of redirects) { assert(!routeSet.has(from)); assert(routeSet.has(to)); assert(!sources.has(to)); }
  assert.equal(read('public/_redirects'), read('out/_redirects'));
  assert.equal((xml.match(/<loc>/g) || []).length, 50);
});
test('No exported HTML links or canonicals refer to merged source URLs', () => {
  const removed = new Set(Object.keys(batch4Merges).map(s => '/blog/' + s));
  function inspect(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) inspect(file);
      else if (entry.name.endsWith('.html')) {
        for (const m of fs.readFileSync(file, 'utf8').matchAll(/href="([^"]+)"/g)) {
          const url = new URL(decode(m[1]), origin);
          if (url.origin === origin) assert(!removed.has(url.pathname.replace(/\/$/, '')), 'Removed URL in ' + file + ': ' + url.pathname);
        }
      }
    }
  }
  inspect(path.join(root, 'out'));
});
test('Consolidated tool guides link directly to retained destinations', () => {
  assert.equal(guides['pdf-to-grayscale'][0], 'pdf-file-size-too-large');
  assert.equal(guides['protect-pdf'][0], 'how-to-add-password-to-pdf-online');
  for (const tool of ['pdf-to-grayscale', 'protect-pdf']) assert(read('out/tools/' + tool + '.html').includes('href="/blog/' + guides[tool][0] + '"'));
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
test('Blog index uses catalog and includes exactly all 31 article URLs', () => {
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
  for (const guide of [article, ...require('../lib/siteNavigation.json').secondaryGuides[slug].map(([guide]) => guide)]) assert(html.includes('href="/blog/' + guide + '"'));
});
test('Article publisher label agrees with organization schema without personal authorship claims', () => {
  for (const post of posts) {
    const html = read('out/blog/' + post.slug + '.html');
    const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' '));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const articles = schemas.filter(s => s['@type'] === 'BlogPosting');
    assert.equal(articles.length, 1, post.slug);
    const article = articles[0];
    assert.equal(article.publisher['@type'], 'Organization');
    assert.equal(article.publisher.name, 'Dajai Studio');
    assert.equal(article.author['@type'], 'Organization');
    assert.equal(article.author.name, article.publisher.name);
    assert(visible.includes('Published by ' + article.publisher.name), post.slug);
    assert(!visible.includes('By PDFcraft'), post.slug);
    assert(!/\b(?:Written|Tested) by Rai Dajai\b/i.test(visible), post.slug);
  }
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
test('Retained format/security guides clearly disclose missing tools', () => {
  for (const slug of ['pdf-vs-word-which-is-better', 'pdf-security-guide']) {
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
