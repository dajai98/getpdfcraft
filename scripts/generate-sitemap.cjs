const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const catalog = require('../lib/blogCatalog.json');
const { origin } = require('../lib/siteConfig.json');

function pageRoutes(directory = path.join(root, 'app'), parts = []) {
  const routes = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) continue; // Next private folders are not routes.
      if (/[[\]()@]/.test(entry.name)) throw new Error('Review non-static route: ' + entry.name);
      routes.push(...pageRoutes(path.join(directory, entry.name), [...parts, entry.name]));
    } else if (/^page\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      routes.push('/' + parts.join('/'));
    }
  }
  return routes.sort();
}

function generateSitemap() {
  const routes = pageRoutes();
  if (new Set(routes).size !== routes.length) throw new Error('Duplicate source route');
  const articles = routes.filter(route => route.startsWith('/blog/'));
  const catalogRoutes = catalog.map(post => '/blog/' + post.slug);
  if (new Set(catalogRoutes).size !== catalogRoutes.length) throw new Error('Duplicate catalog slug');
  if (JSON.stringify([...catalogRoutes].sort()) !== JSON.stringify(articles)) {
    throw new Error('Blog catalog and actual article routes differ. Review both before building.');
  }
  for (const post of catalog) {
    for (const field of ['slug', 'title', 'description', 'date', 'tag', 'tagColor', 'tagBg']) {
      if (typeof post[field] !== 'string' || !post[field]) throw new Error('Missing catalog field: ' + post.slug + '.' + field);
    }
    if (!/^[a-z0-9-]+$/.test(post.slug)) throw new Error('Unsupported article slug: ' + post.slug);
  }
  const redirects = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8')
    .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'))
    .map(line => {
      const fields = line.split(/\s+/);
      if (fields.length !== 3 || !/^30[1278]$/.test(fields[2])) throw new Error('Review redirect syntax: ' + line);
      return fields;
    });
  const sources = new Set(redirects.map(([from]) => from));
  if (sources.size !== redirects.length) throw new Error('Duplicate redirect source');
  for (const [from, to] of redirects) {
    if (routes.includes(from)) throw new Error('Redirect source is still an indexable route: ' + from);
    if (sources.has(to) || !routes.includes(to)) throw new Error('Redirect chain or missing destination: ' + to);
  }
  const priorities = { '/': '1.0', '/blog': '0.9', '/about': '0.5', '/contact': '0.6', '/privacy': '0.5', '/terms': '0.4' };
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + routes.map(route => {
      const priority = priorities[route] || (route.startsWith('/tools/') ? '0.9' : '0.8');
      const url = new URL(route, origin).href.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
      return '  <url><loc>' + url + '</loc><priority>' + priority + '</priority></url>';
    }).join('\n') + '\n</urlset>\n';
  return { xml, routes, redirects };
}

if (require.main === module) {
  if (!['--write', '--check'].includes(process.argv[2]) || process.argv.length !== 3) throw new Error('Use --write or --check');
  const { xml, routes } = generateSitemap();
  const file = path.join(root, 'public/sitemap.xml');
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n') : '';
  if (process.argv[2] === '--write') {
    if (current !== xml) fs.writeFileSync(file, xml);
  } else if (current !== xml) {
    throw new Error('Sitemap is stale. Run npm run build and review the generated sitemap.');
  }
  console.log('Sitemap: ' + routes.length + ' validated static routes; ' + process.argv[2]);
}
module.exports = { generateSitemap, pageRoutes };
