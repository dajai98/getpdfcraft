const fs = require('node:fs');
const assert = require('node:assert/strict');
const { generateSitemap } = require('../scripts/generate-sitemap.cjs');
const catalog = require('../lib/blogCatalog.json');
const primary = require('../lib/toolGuides.json');
const navigation = require('../lib/siteNavigation.json');
const { routes, redirects } = generateSitemap();
const origin = 'https://getpdfcraft.com';
const decode = s => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const visible = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
const main = html => visible(html).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || visible(html);
const links = html => [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({ href: decode(m[1]), label: decode(m[2].replace(/<[^>]*>/g, ' ')).trim() }));
const htmlPath = route => 'out/' + (route === '/' ? 'index' : route.slice(1)) + '.html';
const exportsByRoute = Object.fromEntries(routes.map(r => [r, fs.readFileSync(htmlPath(r), 'utf8')]));
const expectedPrimary = {
  'merge-pdf': 'how-to-merge-pdf-free', 'split-pdf': 'how-to-split-pdf-online',
  'compress-pdf': 'pdf-compression-real-test-results', 'pdf-to-image': 'convert-pdf-to-jpg-free',
  'jpg-to-pdf': 'how-to-convert-jpg-to-pdf', 'rotate-pdf': 'how-to-rotate-pdf',
  'watermark-pdf': 'how-to-add-watermark-to-pdf', 'delete-pages': 'how-to-extract-pages-from-pdf',
  'add-page-numbers': 'best-free-pdf-tools-online', 'reorder-pages': 'how-to-merge-pdf-free',
  'pdf-to-grayscale': 'pdf-file-size-too-large', 'protect-pdf': 'how-to-add-password-to-pdf-online',
  'unlock-pdf': 'how-to-remove-password-from-pdf',
};
// Independent editorial contract: a valid URL alone does not make a useful recommendation.
const allowedSecondary = {
  'merge-pdf': ['how-to-combine-pdf-and-images'], 'split-pdf': ['how-to-extract-pages-from-pdf'],
  'compress-pdf': ['compress-pdf-without-losing-quality', 'pdf-file-size-too-large'],
  'pdf-to-image': ['convert-pdf-to-png-free'], 'jpg-to-pdf': ['how-to-combine-pdf-and-images'],
  'rotate-pdf': [], 'watermark-pdf': ['pdf-security-guide'], 'delete-pages': ['how-to-edit-pdf-free'],
  'add-page-numbers': ['how-to-edit-pdf-free'], 'reorder-pages': ['how-to-extract-pages-from-pdf'],
  'pdf-to-grayscale': ['compress-pdf-without-losing-quality'], 'protect-pdf': ['pdf-security-guide'],
  'unlock-pdf': ['why-is-my-pdf-locked'],
};
const journeys = [
  ['/', '/tools/merge-pdf', '/blog/how-to-merge-pdf-free', '/blog/how-to-merge-pdf-on-windows'],
  ['/', '/tools/compress-pdf', '/blog/compress-pdf-without-losing-quality'],
  ['/', '/tools/protect-pdf', '/blog/pdf-security-guide', '/blog/how-to-add-password-to-pdf-online'],
  ['/', '/tools/pdf-to-image', '/blog/convert-pdf-to-png-free'],
  ['/blog', '/blog/pdf-vs-word-which-is-better', '/blog/how-to-edit-pdf-free'],
];
function validate(pages, config = navigation, guideMap = primary) {
  assert.deepEqual(Object.keys(pages).sort(), [...routes].sort(), 'Unexpected/missing public route');
  assert(!Object.keys(pages).some(r => /^\/lab(?:\/|$)/.test(r)), 'Lab publication');
  const graph = {};
  for (const [route, html] of Object.entries(pages)) {
    graph[route] = new Set();
    for (const { href, label } of links(visible(html))) {
      assert(href && label, 'Empty link');
      const url = new URL(href, origin + route);
      if (url.origin !== origin) continue;
      const target = url.pathname;
      assert(!/^\/lab(?:\/|$)/.test(target), 'Lab link');
      assert(!redirects.some(([from]) => from === target), 'Internal redirect link: ' + target);
      if (!pages[target]) {
        assert(/\.[a-z0-9]+$/i.test(target) && fs.existsSync('out' + target), 'Broken internal target: ' + target);
        continue;
      }
      assert(target === '/' || !target.endsWith('/'), 'Canonical path variant');
      if (url.hash) assert(pages[target].includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), 'Broken fragment');
    }
    for (const { href } of links(main(html))) {
      const url = new URL(href, origin + route);
      if (url.origin === origin && pages[url.pathname] && url.pathname !== route) graph[route].add(url.pathname);
    }
  }
  const articles = catalog.map(p => p.slug).sort();
  assert.deepEqual(config.articleGroups.flatMap(g => g.articles).sort(), articles, 'Article category coverage');
  const toolSlugs = routes.filter(r => r.startsWith('/tools/')).map(r => r.split('/').pop()).sort();
  assert.deepEqual(config.toolGroups.flatMap(g => g.tools).sort(), toolSlugs, 'Tool category coverage');
  for (const group of config.articleGroups) {
    assert(group.articles.length >= 2, 'Thin category');
    const block = main(pages['/blog']).match(new RegExp('<section[^>]*id="' + group.id + '"[^>]*>([\\s\\S]*?)</section>'))?.[1];
    assert(block, 'Missing rendered guide category');
    for (const slug of group.articles) assert(block.includes('href="/blog/' + slug + '"'), 'Missing category article');
  }
  for (const group of config.toolGroups) {
    const block = main(pages['/']).match(new RegExp('<section[^>]*id="tools-' + group.id + '"[^>]*>([\\s\\S]*?)</section>'))?.[1];
    assert(block, 'Missing rendered tool category');
    for (const slug of group.tools) assert(block.includes('href="/tools/' + slug + '"'), 'Missing category tool');
  }
  for (const slug of toolSlugs) {
    assert.equal(guideMap[slug][0], expectedPrimary[slug], 'Unrelated primary guide');
    assert.deepEqual(config.secondaryGuides[slug].map(([s]) => s), allowedSecondary[slug], 'Unrelated secondary guide');
    const block = main(pages['/tools/' + slug]).match(/<nav aria-label="Guides for this tool"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    assert(block, 'Missing task guide navigation');
    const expected = [expectedPrimary[slug], ...allowedSecondary[slug]].map(s => '/blog/' + s);
    assert.deepEqual(links(block).map(l => l.href), expected, 'Rendered task guides disagree');
    assert(expected.length <= 3);
    assert(graph['/tools/' + slug].has('/'), 'Tool has no broader tools path');
  }
  const reached = new Set(['/']); const queue = ['/'];
  while (queue.length) for (const next of graph[queue.shift()]) if (!reached.has(next)) { reached.add(next); queue.push(next); }
  for (const r of routes.filter(r => /^\/(blog|tools)\//.test(r))) {
    assert(reached.has(r), 'Orphan public page: ' + r);
    assert(Object.entries(graph).some(([from, outgoing]) => from !== r && outgoing.has(r)), 'No meaningful incoming link: ' + r);
    if (r.startsWith('/blog/')) assert([...graph[r]].some(target => target.startsWith('/tools/')), 'Guide has no tool path: ' + r);
  }
  for (const journey of journeys) for (let i = 1; i < journey.length; i++) assert(graph[journey[i - 1]].has(journey[i]), 'Broken decision journey');
  return graph;
}
const graph = validate(exportsByRoute);
let rejected = 0;
function reject(name, mutate, pattern) {
  const pages = structuredClone(exportsByRoute), config = structuredClone(navigation), guides = structuredClone(primary);
  mutate(pages, config, guides);
  assert.throws(() => validate(pages, config, guides), pattern);
  rejected++; console.log('REJECT ' + name);
}
const inject = href => pages => { pages['/'] = pages['/'].replace('</main>', '<a href="' + href + '">Test destination</a></main>'); };
reject('removed article', inject('/blog/what-is-pdf'), /Broken internal target/);
reject('redirect-dependent navigation', inject('/blog/how-to-sign-pdf-free'), /Internal redirect link/);
reject('Lab link', inject('/lab'), /Lab link/);
reject('Lab publication', pages => { pages['/lab'] = '<main>Lab</main>'; }, /Unexpected\/missing public route/);
reject('broken internal target', inject('/missing-navigation-target'), /Broken internal target/);
reject('orphan article', pages => {
  for (const r of routes) pages[r] = pages[r].replace(/<a\b[^>]*href="\/blog\/smallpdf-alternative"[^>]*>[\s\S]*?<\/a>/g, '');
}, /Missing category article|Orphan public page|No meaningful incoming link/);
reject('unrelated primary guide', (_, __, guides) => { guides['merge-pdf'][0] = 'how-to-remove-password-from-pdf'; }, /Unrelated primary guide/);
reject('unrelated secondary guide', (_, config) => { config.secondaryGuides['merge-pdf'] = [['why-is-my-pdf-locked', 'Password help']]; }, /Unrelated secondary guide/);
reject('empty link', pages => { pages['/'] = pages['/'].replace('</main>', '<a href="/blog"></a></main>'); }, /Empty link/);
reject('broken category anchor', inject('/blog#nonexistent-category'), /Broken fragment/);
const onlyIndex = routes.filter(r => r.startsWith('/blog/') && Object.entries(graph).filter(([, out]) => out.has(r)).every(([from]) => from === '/blog'));
assert.deepEqual([catalog.length, Object.keys(expectedPrimary).length, routes.length, redirects.length], [31, 13, 50, 19]);
console.log('Batch 8 PASS: 44 article/tool discovery paths; 5 journeys; 0 unreachable article/tool pages; 0 removed/redirect/Lab/broken links; ' + rejected + ' adversarial rejections.');
console.log('Categorized-index-only discovery: ' + onlyIndex.join(', '));
module.exports = { validate, graph, onlyIndex };
