const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const oldBrand = /\b(?:PDFcraft|PDFCraft|PDFCRAFT|Pdfcraft)\b/g;
const malformed = /\uFFFD|\u00C3[\u0080-\u00BF]|\u00C2[\u0080-\u00BF]|\u00E2(?:\u0080|\u20AC)/g;
const rows = [];
for(const match of read('public/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)) {
 const url = match[1], route = new URL(url).pathname;
 const file = route === '/' ? 'out/index.html' : 'out'+route+'.html';
 const html = read(file);
 const meta = name => html.match(new RegExp('<meta (?:name|property)="'+name+'" content="([^"]*)"'))?.[1] ?? null;
 const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const site = schemas.find(s=>s['@type']==='WebSite');
 const post = schemas.find(s=>s['@type']==='BlogPosting');
 const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g,'').replace(/<[^>]*>/g,' ');
 rows.push({route,file,sha256:hash(file),title:html.match(/<title>(.*?)<\/title>/)?.[1],oldBrandMatches:html.match(oldBrand)||[],encodingMatches:html.match(malformed)||[],ogTitle:meta('og:title'),ogSiteName:meta('og:site_name'),ogImage:meta('og:image'),ogImageAlt:meta('og:image:alt'),twitterTitle:meta('twitter:title'),twitterImage:meta('twitter:image'),websiteName:site?.name,publisher:site?.publisher?.name,blogPublisher:post?.publisher?.name,blogAuthor:post?.author?.name,visibleBrand:visible.includes('GetPDFCraft'),icon:html.match(/<link rel="icon"[^>]*href="([^"]*)"/)?.[1]});
}
const sourceIssues=[];
function scan(dir) { for(const f of fs.readdirSync(path.join(root,dir),{withFileTypes:true})) { const p=dir+'/'+f.name; if(f.isDirectory())scan(p);else if(/\.(js|json|svg|css|txt)$/.test(p)){ const s=read(p); const old=s.match(oldBrand)||[],bad=s.match(malformed)||[];if(old.length||bad.length)sourceIssues.push({file:p,oldBrandMatches:old,encodingMatches:bad}); } } }
for(const dir of ['app','components','lib','public']) scan(dir);
const report={reviewedAt:new Date().toISOString(),canonicalCount:rows.length,sourceIssues,routeFailures:rows.filter(r=>r.oldBrandMatches.length||r.encodingMatches.length||!r.visibleBrand||!r.title.includes('GetPDFCraft')||!r.ogTitle?.includes('GetPDFCraft')||!r.twitterTitle?.includes('GetPDFCraft')||r.websiteName!=='GetPDFCraft'||r.publisher!=='Dajai Studio'||r.blogPublisher&&r.blogPublisher!=='Dajai Studio'||r.ogImage!=='https://getpdfcraft.com/og.svg'||r.twitterImage!=='https://getpdfcraft.com/og.svg'||r.ogSiteName!=='GetPDFCraft'),assetHashes:['public/icon.png','out/icon.png','public/og.svg','out/og.svg'].map(p=>({file:p,sha256:hash(p)})),rows};
fs.writeFileSync(path.join(__dirname,'agent-d-final-check-2.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({canonicalCount:report.canonicalCount,sourceIssues,routeFailures:report.routeFailures,ogMissingSiteName:rows.filter(r=>!r.ogSiteName).length,ogMissingImages:rows.filter(r=>!r.ogImage).length,twitterMissingImages:rows.filter(r=>!r.twitterImage).length,assetHashes:report.assetHashes},null,2));
