/* Independent static-export UI verification. Run from repository root. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { chromium } = require('../../../.recovery-browser/node_modules/playwright');

const root = process.cwd();
const dir = path.join(__dirname, process.argv[2] || 'rerun');
fs.mkdirSync(dir, {recursive:true});
const out = path.join(root, 'out');
const resultFile = path.join(dir, 'browser-results.json');
if (fs.existsSync(resultFile)) throw new Error('Browser evidence exists; preserve it and choose a new evidence directory');
const navigation = JSON.parse(fs.readFileSync(path.join(root, 'lib/siteNavigation.json')));
const routes = [...fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const widths = [320, 360, 390, 768, 1280, 1440];
const report = {scope:'Local static export in headless Microsoft Edge. No physical mobile-device or production claim.', time:new Date().toISOString(), routes:routes.length, widths, buildFiles:{}, responsive:[], metadata:[], contrast:[], checks:[], consoleErrors:[], pageErrors:[], requestFailures:[], screenshots:[], limitations:[]};
for (const file of ['out/index.html','out/blog.html','out/tools/merge-pdf.html','out/sitemap.xml']) report.buildFiles[file] = crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
report.scriptSha256 = crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex');
const save = () => fs.writeFileSync(resultFile,JSON.stringify(report,null,2));
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.json':'application/json','.xml':'application/xml','.wasm':'application/wasm'};
const server=http.createServer((req,res)=>{
  const u=new URL(req.url,'http://localhost');
  let f=path.resolve(out,'.'+decodeURIComponent(u.pathname));
  if (!f.startsWith(out+path.sep) && f!==out) {res.writeHead(403);return res.end();}
  if (!path.extname(f)) f += u.pathname==='/'?path.sep+'index.html':'.html';
  fs.readFile(f,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(err?'not found':data);});
});
async function check(name,fn){const r={name,status:'FAIL'};try{r.detail=await fn();r.status='PASS';}catch(e){r.error=e.stack||String(e);}report.checks.push(r);save();console.log(`${r.status} ${name}${r.error?' '+r.error.split('\n')[0]:''}`);}
function contrast(foreground,background){
  const parse=value=>{const parts=value.match(/[\d.]+/g)?.slice(0,3).map(Number);assert(parts?.length===3,`Unsupported computed color ${value}`);return parts.map(v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;});};
  const light=value=>{const [r,g,b]=parse(value);return .2126*r+.7152*g+.0722*b;};
  const a=light(foreground),b=light(background);return Number(((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(3));
}
async function recordContrast(name,locator){
  const colors=await locator.evaluate(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return {foreground:c.color,background:c.backgroundColor,visible:r.width>0&&r.height>0,disabled:e.matches(':disabled'),text:e.textContent.trim().slice(0,80)};});
  const ratio=contrast(colors.foreground,colors.background);const sample={name,...colors,ratio};report.contrast.push(sample);
  assert(colors.visible&&!colors.disabled&&ratio>=4.5,JSON.stringify(sample));return sample;
}
async function main(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  report.browser=browser.version();
  const context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true});
  await context.addInitScript(()=>localStorage.setItem('cookies_accepted','declined'));
  const page=await context.newPage();page.setDefaultTimeout(15000);
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push({url:page.url(),message:m.text()});});
  page.on('pageerror',e=>report.pageErrors.push({url:page.url(),message:e.message}));
  page.on('requestfailed',r=>report.requestFailures.push({url:page.url(),request:r.url(),error:r.failure()?.errorText}));
  for (const route of routes){
    await page.goto(base+route,{waitUntil:'load'});
    report.metadata.push({route,...await page.evaluate(()=>({title:document.title,ogTitle:document.querySelector('meta[property="og:title"]')?.content,ogSiteName:document.querySelector('meta[property="og:site_name"]')?.content,ogImage:document.querySelector('meta[property="og:image"]')?.content,twitterImage:document.querySelector('meta[name="twitter:image"]')?.content,legacyBrand:(document.body.innerText.match(/\bPDFcraft\b/g)||[]).length}))});
    for(const width of widths){
      await page.setViewportSize({width,height:900});
      const measurement=await page.evaluate(()=>{
        const nav=document.querySelector('nav[aria-label="Main navigation"]');
        const main=document.querySelector('main');
        const heading=document.querySelector('main h1');
        const brand=nav?.querySelector('a[href="/"]');
        const toggle=nav?.querySelector('button[aria-controls="main-navigation-links"]');
        const visible=e=>!!e&&e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0;
        const offscreen=[...document.querySelectorAll('main a,main button,main input,nav a,nav button')].filter(e=>{const r=e.getBoundingClientRect();return visible(e)&&(r.right>innerWidth+1||r.left< -1);}).slice(0,8).map(e=>({tag:e.tagName,text:(e.textContent||e.getAttribute('aria-label')||'').slice(0,60),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}));
        return {scrollWidth:document.documentElement.scrollWidth,innerWidth,bodyWidth:document.body.scrollWidth,heading:heading?.textContent,mainVisible:visible(main),brandVisible:visible(brand),toggleVisible:visible(toggle),desktopLinksVisible:[...nav?.querySelectorAll('#main-navigation-links a')||[]].filter(visible).length,offscreen};
      });
      report.responsive.push({route,width,...measurement,pass:measurement.scrollWidth<=width+1&&measurement.bodyWidth<=width+1&&measurement.mainVisible&&measurement.brandVisible&&!!measurement.heading&&measurement.offscreen.length===0&&(width<=390?measurement.toggleVisible:measurement.desktopLinksVisible===5)});
    }
    if(route==='/'||route==='/blog'||route==='/tools/merge-pdf'){
      for(const width of [390,1280]){await page.setViewportSize({width,height:900});const name=`${route==='/'?'home':route==='/blog'?'blog':'merge'}-${width}.png`;await page.screenshot({path:path.join(dir,name),fullPage:width===1280});report.screenshots.push(name);}
    }
    save();
  }
  console.log(`Responsive ${report.responsive.filter(x=>x.pass).length}/${report.responsive.length}`);
  await check('all 50 routes at six widths, no overflow or offscreen controls',async()=>{assert.equal(routes.length,50);const failures=report.responsive.filter(x=>!x.pass);assert.deepEqual(failures,[]);return {measurements:report.responsive.length};});
  await check('all 50 routes use current brand and images in Open Graph/Twitter',async()=>{const failures=report.metadata.filter(x=>!x.title.includes('GetPDFCraft')||!x.ogTitle?.includes('GetPDFCraft')||x.ogSiteName!=='GetPDFCraft'||!x.ogImage?.endsWith('/og.svg')||!x.twitterImage?.endsWith('/og.svg')||x.legacyBrand!==0);assert.deepEqual(failures,[]);return {routes:report.metadata.length};});
  await page.setViewportSize({width:1280,height:900});
  await page.goto(base+'/');
  await check('homepage categories and exact anchors',async()=>{
    const links=page.locator('nav[aria-label="Tool categories"] a');assert.equal(await links.count(),4);
    for(const group of navigation.toolGroups){const href=`/#tools-${group.id}`;const link=page.locator(`nav[aria-label="Tool categories"] a[href="${href}"]`);assert.equal(await link.count(),1);await link.click();await page.waitForURL('**/#tools-'+group.id);const x=await page.locator('#tools-'+group.id).evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,margin:getComputedStyle(e).scrollMarginTop}));assert(Number.parseFloat(x.margin)>=64,`${group.id} lacks sticky offset`);assert(x.top>=45&&x.top<900,`${group.id} destination hidden or offscreen: ${JSON.stringify(x)}`);}
    return {anchors:navigation.toolGroups.map(g=>'#tools-'+g.id)};
  });
  await page.goto(base+'/');
  await check('all 13 homepage tool links resolve to named tool pages',async()=>{
    const slugs=navigation.toolGroups.flatMap(g=>g.tools);assert.equal(slugs.length,13);assert.equal(new Set(slugs).size,13);
    const cards=page.locator('#tools a[href^="/tools/"]');assert.equal(await cards.count(),13);
    for(const slug of slugs){const l=page.locator(`#tools a[href="/tools/${slug}"]`);assert.equal(await l.count(),1);assert.equal(fs.existsSync(path.join(out,'tools',slug+'.html')),true);}
    await cards.first().click();await page.waitForURL('**/tools/merge-pdf');assert.match(await page.locator('h1').first().textContent(),/Merge PDF/i);
    return {slugs};
  });
  await page.goto(base+'/');
  await check('home hero and bottom action contrast',async()=>{
    const links=page.locator('main a[href="/#tools"]');assert.equal(await links.count(),2);
    return [await recordContrast('home hero CTA',links.first()),await recordContrast('home bottom CTA',links.last())];
  });
  await page.goto(base+'/blog');
  await check('blog six categories, exact anchors and sticky offset',async()=>{
    const links=page.locator('nav[aria-label="Guide categories"] a');assert.equal(await links.count(),6);
    const targets=[];for(const g of navigation.articleGroups){const href=`/blog#${g.id}`;const link=page.locator(`nav[aria-label="Guide categories"] a[href="${href}"]`);assert.equal(await link.count(),1);await link.click();await page.waitForURL('**/blog#'+g.id);const x=await page.locator('[id="'+g.id+'"]').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,margin:getComputedStyle(e).scrollMarginTop}));assert(Number.parseFloat(x.margin)>=64);assert(x.bottom>70&&x.top<900,`${g.id} not visible after navigation ${JSON.stringify(x)}`);targets.push({id:g.id,...x});}
    return targets;
  });
  await page.goto(base+'/blog');
  await check('three featured guides and article link discoverability',async()=>{
    const slugs=['how-browser-based-pdf-processing-works','pdf-compression-real-test-results','pdf-tool-not-working-troubleshooting'];
    const links=page.locator('.featured-guide-card');assert.equal(await links.count(),3);
    for(const slug of slugs){const l=page.locator(`.featured-guide-card[href="/blog/${slug}"]`);assert.equal(await l.count(),1);assert.equal(fs.existsSync(path.join(out,'blog',slug+'.html')),true);}
    const article=page.locator('.blog-article-card');assert.equal(await article.count(),31);assert.equal(await article.first().evaluate(e=>getComputedStyle(e).cursor),'pointer');
    await links.first().click();await page.waitForURL('**/blog/how-browser-based-pdf-processing-works');
    return {featured:slugs,articleLinks:31};
  });
  await page.setViewportSize({width:320,height:900});await page.goto(base+'/');
  await check('mobile menu keyboard, Escape and focus return',async()=>{
    const toggle=page.locator('button[aria-controls="main-navigation-links"]');assert.equal(await toggle.getAttribute('aria-expanded'),'false');await toggle.focus();await page.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await page.locator('#main-navigation-links a:visible').count(),5);await page.keyboard.press('Tab');assert.equal((await page.evaluate(()=>document.activeElement.textContent)).trim(),'Tools');await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.equal(await toggle.evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Blog'}).click();await page.waitForURL('**/blog');assert.equal(await toggle.getAttribute('aria-expanded'),'false');return {links:5,keyboard:['Enter','Tab','Escape','Space','click']};
  });
  await check('keyboard focus is visibly outlined',async()=>{
    const l=page.locator('nav[aria-label="Guide categories"] a').first();await l.focus();const style=await l.evaluate(e=>({outline:getComputedStyle(e).outline,offset:getComputedStyle(e).outlineOffset,focus:e.matches(':focus-visible')}));assert(style.focus);assert(!style.outline.startsWith('none')&&!style.outline.startsWith('0px'),JSON.stringify(style));return style;
  });
  await check('branding, title, Open Graph and schema on home/blog/tool',async()=>{
    const sampled=[];for(const route of ['/','/blog','/tools/merge-pdf']){await page.goto(base+route);const d=await page.evaluate(()=>({title:document.title,brand:document.querySelector('nav[aria-label="Main navigation"] a[href="/"]')?.textContent,og:document.querySelector('meta[property="og:site_name"]')?.content,ogTitle:document.querySelector('meta[property="og:title"]')?.content,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent))}));assert.match(d.title,/GetPDFCraft/);assert.match(d.brand,/GetPDFCraft/);assert.equal(d.og,'GetPDFCraft');assert.match(d.ogTitle,/GetPDFCraft/);assert(d.schemas.some(x=>x.name==='GetPDFCraft'&&x.publisher?.name==='Dajai Studio'));sampled.push({route,...d});}return sampled;
  });
  await check('About and 404 action contrast',async()=>{
    await page.goto(base+'/about');const about=await recordContrast('About CTA',page.locator('main a[href="https://www.youtube.com/@dajaistudio"]'));
    await page.goto(base+'/404');const missing=await recordContrast('404 return',page.locator('main a[href="/"]'));
    return [about,missing];
  });
  await check('focused PDF upload, merge and download',async()=>{
    const {PDFDocument}=require('pdf-lib');
    const fixture=await PDFDocument.create();fixture.addPage([300,400]).drawText('UX TEST');
    const source=path.join(dir,'synthetic.pdf');fs.writeFileSync(source,await fixture.save());
    await page.goto(base+'/tools/merge-pdf');await recordContrast('UploadZone Select Files',page.getByRole('button',{name:'Select Files',exact:true}));
    await page.locator('input[type=file]').setInputFiles([source,source]);
    const merge=page.getByRole('button',{name:/Merge.*PDF/i});await recordContrast('Merge submit',merge);await merge.click();
    const button=page.getByRole('button',{name:/Download/}).first();await button.waitFor({state:'visible',timeout:45000});
    await recordContrast('Merge download',button);
    const pending=page.waitForEvent('download');await button.click();const download=await pending;
    const output=path.join(dir,'merged-synthetic.pdf');await download.saveAs(output);assert.equal(await download.failure(),null);
    const pdfjs=await import(require('node:url').pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
    const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(output))}).promise;
    assert.equal(doc.numPages,2);const texts=[];for(let i=1;i<=2;i++){const p=await doc.getPage(i);texts.push((await p.getTextContent()).items.map(x=>x.str).join(' '));}
    assert(texts.every(x=>x.includes('UX TEST')),JSON.stringify(texts));await doc.destroy();
    return {inputBytes:fs.statSync(source).size,outputBytes:fs.statSync(output).size,outputSha256:crypto.createHash('sha256').update(fs.readFileSync(output)).digest('hex'),parser:'PDF.js',pages:2,texts};
  });
  await check('selected PDF-to-Image format contrast',async()=>{
    await page.goto(base+'/tools/pdf-to-image');await page.locator('input[type=file]').setInputFiles(path.join(dir,'synthetic.pdf'));
    return await recordContrast('PDF-to-Image selected JPG',page.locator('button[aria-pressed="true"]'));
  });
  await check('no unexpected browser console, page or request failures',async()=>{assert.deepEqual(report.pageErrors,[]);assert.deepEqual(report.consoleErrors,[]);assert.deepEqual(report.requestFailures,[]);return {consoleErrors:0,pageErrors:0,requestFailures:0};});
  const consent=await browser.newContext({viewport:{width:320,height:900}});const cp=await consent.newPage();await cp.goto(base+'/');
  await check('consent banner usable without blocking menu or tools',async()=>{
    const panel=cp.getByRole('region',{name:'Advertising preferences'});await panel.waitFor();await recordContrast('CookieBanner Accept',cp.getByRole('button',{name:'Accept',exact:true}));const before=await cp.evaluate(()=>({panel:document.querySelector('#advertising-preferences').getBoundingClientRect().top,menu:document.querySelector('.navbar-toggle').getBoundingClientRect().bottom}));assert(before.panel>before.menu);await cp.getByRole('button',{name:'Menu',exact:true}).click();assert.equal(await cp.locator('#main-navigation-links a:visible').count(),5);await cp.getByRole('button',{name:'Decline',exact:true}).click();await panel.waitFor({state:'detached'});await cp.locator('a[href="/#tools-pages"]').click();await cp.waitForURL('**/#tools-pages');return {panelTop:before.panel,menuBottom:before.menu,declineWorks:true,categoryWorks:true};
  });
  await check('all nine representative enabled actions meet 4.5:1 text contrast',async()=>{assert.equal(report.contrast.length,9);assert(report.contrast.every(x=>x.visible&&!x.disabled&&x.ratio>=4.5));return {samples:report.contrast};});
  await consent.close();await context.close();await browser.close();save();
  console.log(`Checks ${report.checks.filter(x=>x.status==='PASS').length}/${report.checks.length}; responsive ${report.responsive.filter(x=>x.pass).length}/${report.responsive.length}`);
}
main().catch(e=>{report.fatal=e.stack||String(e);save();console.error(e);process.exitCode=1;}).finally(()=>server.close());
