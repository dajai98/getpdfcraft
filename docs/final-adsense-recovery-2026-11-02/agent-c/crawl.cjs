// Read-only network audit. Writes evidence only to this script's directory.
// Run from repository root: node docs/final-adsense-recovery-2026-11-02/agent-c/crawl.cjs
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../../..');
const { generateSitemap } = require(path.join(root, 'scripts/generate-sitemap.cjs'));
const { routes, redirects } = generateSitemap();
const origin = 'https://getpdfcraft.com';
const retired = ['/blog/pdf-to-word-free', '/blog/how-to-convert-pdf-to-excel', '/blog/what-is-pdf'];
const supportPaths = ['/robots.txt', '/sitemap.xml', '/ads.txt', '/icon.png', '/og.svg'];
const cases = [...routes.map(route => ({ route, expected: 200 })), ...redirects.map(([route, target, code]) => ({ route, target, expected: +code })), ...retired.map(route => ({ route, expected: 404 })), ...supportPaths.map(route => ({ route, expected: 200 })), { route: '/audit-nonexistent-20261102', expected: 404 }];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const decode = value => value.replaceAll('&amp;', '&');
const attr = (html, key, value, result) => (html.match(/<(?:meta|link)\b[^>]*>/g) || []).find(tag => tag.includes(key + '="' + value + '"'))?.match(new RegExp(result + '="([^"]*)"'))?.[1] ?? null;
const schema = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const visible = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const htmlPath = route => path.join(root, 'out', (route === '/' ? 'index' : route.slice(1)) + '.html');
async function pool(items, fn) { let index = 0; await Promise.all(Array.from({ length: 6 }, async () => { while (index < items.length) await fn(items[index++]); })); }

(async () => {
  const report = { observedAt: new Date().toISOString(), baselineHead: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), method: 'Actual HTTP GET; manual redirect handling; six concurrent workers; metadata, schema, visible text and SHA-256 artifact comparisons against existing local out. Asset filenames differ by build; matching content does not establish exact deployed Git commit.', routes: [], assets: [], support: [], brokenLinks: [], brokenAnchors: [] };
  const local = new Map(routes.map(route => [route, fs.readFileSync(htmlPath(route), 'utf8')]));
  const live = new Map();
  const assetUrls = new Set();
  await pool(cases, async test => {
    const row = { requested: origin + test.route, path: test.route, expectedStatus: test.expected, expectedTarget: test.target ? origin + test.target : null, chain: [], sitemapMembership: routes.includes(test.route), internalLinkReferences: [], result: 'NOT TESTED' };
    let url = row.requested;
    try {
      for (let hop = 0; hop < 8; hop++) {
        const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
        const bytes = Buffer.from(await response.arrayBuffer());
        const location = response.headers.get('location');
        row.chain.push({ url, status: response.status, location, date: response.headers.get('date'), contentType: response.headers.get('content-type'), xRobotsTag: response.headers.get('x-robots-tag') });
        if (response.status >= 300 && response.status < 400 && location) { url = new URL(location, url).href; continue; }
        row.finalUrl = url; row.sha256 = sha(bytes);
        const html = bytes.toString('utf8');
        row.canonical = attr(html, 'rel', 'canonical', 'href');
        row.robots = attr(html, 'name', 'robots', 'content');
        row.indexability = response.status === 200 && !!row.canonical && !/noindex/i.test((row.robots || '') + (response.headers.get('x-robots-tag') || '')) ? 'indexable' : 'not indexable as a canonical HTML page';
        if (local.has(test.route)) {
          live.set(test.route, html);
          row.title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
          const reference = local.get(test.route);
          row.titleMatch = row.title === reference.match(/<title>([\s\S]*?)<\/title>/)?.[1];
          row.h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] === reference.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
          row.schema = schema(html); row.schemaMatch = JSON.stringify(row.schema) === JSON.stringify(schema(reference));
          row.visibleTextMatch = visible(html) === visible(reference);
          if (!row.visibleTextMatch) { const a = visible(html), b = visible(reference); let index = 0; while (a[index] === b[index] && index < a.length) index++; row.firstTextDifference = { live: a.slice(Math.max(0, index - 40), index + 100), local: b.slice(Math.max(0, index - 40), index + 100) }; }
          for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) { const target = new URL(decode(match[1]), url); if (target.origin === origin && (/\.[a-z0-9]+$/i.test(target.pathname) || target.pathname.startsWith('/_next/'))) assetUrls.add(target.href); }
        }
        if (supportPaths.includes(test.route)) { const source = fs.readFileSync(path.join(root, 'public', test.route)); report.support.push({ path: test.route, status: response.status, liveSha256: sha(bytes), sourceSha256: sha(source), byteMatch: bytes.equals(source), newlineNormalizedMatch: bytes.toString('utf8').replaceAll('\r\n', '\n') === source.toString('utf8').replaceAll('\r\n', '\n') }); }
        row.result = row.chain[0].status === test.expected && (!test.target || (row.chain.length === 2 && response.status === 200 && url === origin + test.target)) && (!routes.includes(test.route) || (row.canonical?.replace(/\/$/, '') === row.requested.replace(/\/$/, '') && row.indexability === 'indexable')) ? 'PASS' : 'FAIL';
        break;
      }
    } catch (error) { row.error = error.message; row.cause = error.cause?.message; }
    report.routes.push(row);
  });
  await pool([...assetUrls], async url => {
    try { const response = await fetch(url, { signal: AbortSignal.timeout(20000) }); const bytes = Buffer.from(await response.arrayBuffer()); const localPath = path.join(root, 'out', new URL(url).pathname); const exists = fs.existsSync(localPath); const contentType = response.headers.get('content-type'); report.assets.push({ url, status: response.status, contentType, bytes: bytes.length, sha256: sha(bytes), localExists: exists, localHashMatch: exists ? sha(fs.readFileSync(localPath)) === sha(bytes) : null, result: response.status === 200 && !contentType?.includes('text/html') ? 'PASS' : 'FAIL' }); }
    catch (error) { report.assets.push({ url, result: 'NOT TESTED', error: error.message }); }
  });
  for (const [route, html] of live) for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const target = new URL(decode(match[1]), origin + route);
    if (target.origin !== origin || !['http:', 'https:'].includes(target.protocol)) continue;
    const row = report.routes.find(row => row.path === target.pathname);
    if (row && !row.internalLinkReferences.includes(route)) row.internalLinkReferences.push(route);
    if (/\.[a-z0-9]+$/i.test(target.pathname) || target.pathname.startsWith('/_next/') || target.pathname.startsWith('/cdn-cgi/')) continue;
    if (!live.has(target.pathname)) report.brokenLinks.push({ from: route, to: target.href });
    else if (target.hash && !live.get(target.pathname).includes('id="' + target.hash.slice(1) + '"')) report.brokenAnchors.push({ from: route, to: target.href });
  }
  report.routes.sort((a, b) => a.path.localeCompare(b.path)); report.assets.sort((a, b) => a.url.localeCompare(b.url));
  report.summary = { canonicalRoutes: routes.length, articles: routes.filter(route => route.startsWith('/blog/')).length, tools: routes.filter(route => route.startsWith('/tools/')).length, redirects: redirects.length, retired: retired.length, routeChecks: report.routes.length, routePass: report.routes.filter(row => row.result === 'PASS').length, routeFail: report.routes.filter(row => row.result === 'FAIL').length, routeNotTested: report.routes.filter(row => row.result === 'NOT TESTED').length, assets: report.assets.length, assetPass: report.assets.filter(row => row.result === 'PASS').length, assetFail: report.assets.filter(row => row.result === 'FAIL').length, assetNotTested: report.assets.filter(row => row.result === 'NOT TESTED').length, orphanCanonicalRoutes: report.routes.filter(row => row.sitemapMembership && !row.internalLinkReferences.length).map(row => row.path), brokenLinks: report.brokenLinks.length, brokenAnchors: report.brokenAnchors.length, liveDatedArticles: report.routes.filter(row => row.schema?.some(schema => schema['@type'] === 'BlogPosting' && schema.datePublished)).length };
  fs.writeFileSync(path.join(__dirname, 'production-crawl.json'), JSON.stringify(report, null, 2) + '\n');
  const matrix = '# Actual production URL matrix\n\nObserved: ' + report.observedAt + '\n\nOrigin: ' + origin + '. Paths below expand against that origin. Internal references list the unique referring canonical routes in production-crawl.json.\n\n| Requested path | Expected | Actual chain | Final path | Canonical | Indexability | Sitemap | Internal referring pages | Result |\n|---|---|---|---|---|---|---|---|---|\n' + report.routes.map(row => '| ' + [row.path, row.expectedStatus + (row.expectedTarget ? ' → ' + new URL(row.expectedTarget).pathname : ''), row.chain.map(hop => hop.status).join(' → '), row.finalUrl ? new URL(row.finalUrl).pathname : 'NOT TESTED', row.canonical || 'none', row.indexability || 'NOT TESTED', row.sitemapMembership ? 'yes' : 'no', row.internalLinkReferences.length, row.result].join(' | ') + ' |').join('\n') + '\n';
  fs.writeFileSync(path.join(__dirname, 'URL_MATRIX.md'), matrix);
  console.log(JSON.stringify(report.summary, null, 2));
})();
