/* Read-only static-export browser audit. Run from repository root. */
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('../../../.recovery-browser/node_modules/playwright');
const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');
const root = process.cwd();
const run = process.argv[2] || 'baseline';
const dir = path.join(__dirname, run);
if (fs.existsSync(path.join(dir,'results.json'))) throw new Error('Evidence already exists; choose a new run name');
fs.mkdirSync(dir, { recursive: true });
const report = { run, timestamp: new Date().toISOString(), scope: 'Local static export, headless Edge; no physical mobile-device claim', responsive: [], workflows: [], supplemental: [], consent: {}, errors: [], consoleErrors: [] };
const save = () => fs.writeFileSync(path.join(dir, 'results.json'), JSON.stringify(report, null, 2));
const mime = { '.html':'text/html', '.js':'application/javascript', '.mjs':'application/javascript', '.css':'text/css', '.wasm':'application/wasm', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.txt':'text/plain' };
const server = http.createServer((req,res) => {
  const url = new URL(req.url, 'http://localhost');
  let file = path.join(root, 'out', decodeURIComponent(url.pathname));
  const auditAssets = {'/__audit/pdf.mjs':'node_modules/pdfjs-dist/build/pdf.mjs','/__audit/pdf.worker.mjs':'node_modules/pdfjs-dist/build/pdf.worker.mjs'};
  if (auditAssets[url.pathname]) { fs.readFile(path.join(root,auditAssets[url.pathname]),(err,data)=>{res.writeHead(err?404:200,{'Content-Type':'application/javascript'});res.end(err?'Not found':data);});return; }
  if (!path.extname(file)) file += url.pathname === '/' ? 'index.html' : '.html';
  if (!file.startsWith(path.join(root,'out'))) { res.writeHead(403); return res.end(); }
  fs.readFile(file,(err,data) => {res.writeHead(err ? 404 : 200, {'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(err ? 'Not found' : data);});
});
async function fixtures() {
  const doc = await PDFDocument.create(); const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i=1;i<=3;i++) { const p=doc.addPage([300,400]);p.drawText(`SYNTHETIC PAGE ${i}`,{x:35,y:340,font,size:16,color:rgb(i/3,0.2,0.6)});p.drawRectangle({x:40,y:70,width:90,height:120,color:rgb(0.2,i/3,0.4)});if(i===2)p.setRotation(degrees(90)); }
  const pdf=path.join(dir,'synthetic-three-pages.pdf');fs.writeFileSync(pdf,await doc.save());
  return pdf;
}
async function inspectPdf(file,password) {
  const pdfjs=await import(require('node:url').pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
  const doc=await pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(file)),password,useSystemFonts:true,disableFontFace:true}).promise;
  const pages=[];for(let n=1;n<=doc.numPages;n++){const p=await doc.getPage(n);const t=await p.getTextContent();pages.push({page:n,rotation:p.rotate,view:p.view,text:t.items.map(x=>x.str).join(' ')});}await doc.destroy();return {parser:'PDF.js 4.4.168 (independent from pdf-lib output producer)',pages};
}
async function renderPdf(page,file,password) {
  return page.evaluate(async ({base64,password})=>{
    const pdfjs=await import('/__audit/pdf.mjs');pdfjs.GlobalWorkerOptions.workerSrc='/__audit/pdf.worker.mjs';
    const doc=await pdfjs.getDocument({data:Uint8Array.from(atob(base64),c=>c.charCodeAt(0)),password}).promise;
    const result=[];
    for(let n=1;n<=doc.numPages;n++) {const p=await doc.getPage(n);const v=p.getViewport({scale:1});const c=document.createElement('canvas');c.width=v.width;c.height=v.height;const ctx=c.getContext('2d');await p.render({canvasContext:ctx,viewport:v}).promise;const rgba=ctx.getImageData(0,0,c.width,c.height).data;let nonWhite=0,colored=0;for(let i=0;i<rgba.length;i+=4){if(Math.min(rgba[i],rgba[i+1],rgba[i+2])<235)nonWhite++;if(Math.max(rgba[i],rgba[i+1],rgba[i+2])-Math.min(rgba[i],rgba[i+1],rgba[i+2])>8)colored++;}result.push({width:c.width,height:c.height,nonWhite,colored});p.cleanup();c.width=c.height=0;}await doc.destroy();return result;
  },{base64:fs.readFileSync(file).toString('base64'),password});
}
function assertSemantics(tool,inspection) {
  const p=inspection.pages; const ids=p.map(x=>Number(x.text.match(/SYNTHETIC PAGE (\d)/)?.[1]||0));
  const order={'merge-pdf':[1,2,3,1,2,3],'split-pdf':[1],'delete-pages':[1,3],'reorder-pages':[2,1,3]};
  if(tool==='jpg-to-pdf'){assert.equal(p.length,2);p.forEach(x=>assert.deepEqual(x.view,[0,0,100,80]));return;}
  if(tool==='pdf-to-grayscale'){assert.equal(p.length,3);assert.deepEqual(p.map(x=>x.view),[[0,0,300,400],[0,0,400,300],[0,0,300,400]]);return;}
  assert.deepEqual(ids,order[tool]||[1,2,3],`${tool} page identities/order`);
  if(tool==='rotate-pdf')assert.deepEqual(p.map(x=>x.rotation),[90,180,90]);
  if(tool==='watermark-pdf')p.forEach(x=>assert.match(x.text,/SYNTHETIC PAGE \d\s+SYNTHETIC/));
  if(tool==='add-page-numbers')p.forEach((x,i)=>assert.match(x.text,new RegExp(`PAGE ${i+1}\\s+${i+1}$`)));
}
async function measure(page) { return page.evaluate(() => ({clientWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,offscreen:[...document.querySelectorAll('nav a,main button,main input,main a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,12).map(e=>({tag:e.tagName,text:(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,90),x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width})),h1:document.querySelector('h1')?.textContent})); }
async function main() {
  const crypto=require('node:crypto');
  report.harnessSha256=crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex');
  report.candidateFiles=Object.fromEntries(['out/index.html','out/contact.html','out/tools/pdf-to-image.html','out/tools/pdf-to-grayscale.html'].map(file=>[file,{sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),modified:fs.statSync(path.join(root,file)).mtime.toISOString()}]));
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--disable-gpu']});
  report.browser=browser.version();const context=await browser.newContext({acceptDownloads:true});
  const page=await context.newPage();page.setDefaultTimeout(18000);
  page.on('dialog',async d=>{report.errors.push({url:page.url(),dialog:d.message()});await d.dismiss();});
  page.on('pageerror',e=>report.errors.push({url:page.url(),message:e.message}));
  page.on('console',message=>{if(message.type()==='error')report.consoleErrors.push({url:page.url(),text:message.text()});});
  const routes=[...fs.readFileSync(path.join(root,'out/sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
  if (!process.argv.includes('--tools-only')&&!process.argv.includes('--cancellation-only')) {
    await context.addInitScript(()=>localStorage.setItem('cookies_accepted','declined'));
    for (const route of routes) {
      await page.goto(base+route,{waitUntil:'load'});
      for(const width of [320,360,390,768,1280,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(35);const m=await measure(page);report.responsive.push({route,width,...m});}
      if(route==='/'||route==='/tools/split-pdf'){await page.setViewportSize({width:320,height:900});await page.screenshot({path:path.join(dir,route==='/'?'home-320.png':'split-empty-320.png')});}
      save();
    }
    console.log(`Responsive: ${report.responsive.length} checks, ${report.responsive.filter(x=>x.overflow).length} document overflows`);
  }
  const consentContext=await browser.newContext({viewport:{width:320,height:900}}); const cp=await consentContext.newPage();const ads=[];
  cp.on('request',r=>{if(r.url().includes('pagead2.googlesyndication.com'))ads.push(r.url());});
  // Prevent actual ad delivery while verifying request gating.
  await cp.route('**/pagead2.googlesyndication.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:'/* test ad response */'}));
  await cp.goto(base);await cp.getByRole('button',{name:'Decline',exact:true}).waitFor();report.consent.beforeChoiceAds=ads.length;
  await cp.screenshot({path:path.join(dir,'consent-320.png')});
  await cp.getByRole('button',{name:'Decline',exact:true}).click();report.consent.declinedValue=await cp.evaluate(()=>localStorage.getItem('cookies_accepted'));report.consent.afterDeclineAds=ads.length;
  await cp.getByRole('button',{name:'Advertising preferences',exact:true}).click();await cp.getByRole('button',{name:'Accept',exact:true}).click();await cp.waitForTimeout(200);report.consent.afterAcceptAds=ads.length;
  await cp.getByRole('button',{name:'Advertising preferences',exact:true}).click();await cp.getByRole('button',{name:'Decline and reload',exact:true}).click();await cp.waitForLoadState('load');await cp.waitForTimeout(200);report.consent.afterWithdrawalValue=await cp.evaluate(()=>localStorage.getItem('cookies_accepted'));report.consent.afterWithdrawalAds=ads.length;
  report.consent.status=report.consent.beforeChoiceAds===0&&report.consent.afterDeclineAds===0&&report.consent.afterAcceptAds>0&&report.consent.afterWithdrawalAds===report.consent.afterAcceptAds&&report.consent.afterWithdrawalValue==='declined'?'PASS':'FAIL';
  await consentContext.close();save();
  if (process.argv.includes('--responsive-only')) {await browser.close();server.close();return;}
  const pdf=await fixtures();
  // Generate a real PNG through browser canvas, containing no personal information.
  const png=path.join(dir,'synthetic.png'),jpg=path.join(dir,'synthetic.jpg');const image=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=100;c.height=80;const x=c.getContext('2d');x.fillStyle='#f00';x.fillRect(0,0,100,80);x.fillStyle='#00f';x.fillRect(0,0,50,40);return {png:c.toDataURL('image/png').split(',')[1],jpg:c.toDataURL('image/jpeg').split(',')[1]}});fs.writeFileSync(png,Buffer.from(image.png,'base64'));fs.writeFileSync(jpg,Buffer.from(image.jpg,'base64'));
  const actions={'merge-pdf':/Merge.*PDF/i,'split-pdf':/Split PDF/i,'rotate-pdf':/Rotate 90/i,'watermark-pdf':/Add Watermark/i,'protect-pdf':/Protect PDF/i,'unlock-pdf':/Unlock PDF/i,'jpg-to-pdf':/Convert.*Image.*to PDF/i,'pdf-to-image':/Convert to Images/i,'delete-pages':/Delete.*Page/i,'add-page-numbers':/Add Page Numbers/i,'reorder-pages':/Reorder PDF|Apply New Order|Save.*Order/i,'pdf-to-grayscale':/Convert to Grayscale/i};
  for(const tool of (process.argv.includes('--cancellation-only')?[]:['merge-pdf','split-pdf','compress-pdf','rotate-pdf','watermark-pdf','protect-pdf','unlock-pdf','jpg-to-pdf','pdf-to-image','delete-pages','add-page-numbers','reorder-pages','pdf-to-grayscale'])){
    const result={tool,status:'FAIL',downloads:[],networkFailures:[]};
    const onFail=r=>result.networkFailures.push({url:r.url(),error:r.failure()?.errorText});page.on('requestfailed',onFail);
    try {
      await page.setViewportSize({width:390,height:900});await page.goto(`${base}/tools/${tool}`);await page.waitForTimeout(100);
      const input=page.locator('input[type=file]');const source=tool==='jpg-to-pdf'?png:tool==='unlock-pdf'&&fs.existsSync(path.join(dir,'protect-pdf-protected.pdf'))?path.join(dir,'protect-pdf-protected.pdf'):pdf;
      await input.setInputFiles(tool==='merge-pdf'?[pdf,pdf]:tool==='jpg-to-pdf'?[png,jpg]:source);
      if(tool==='protect-pdf'){await page.getByLabel('Password',{exact:true}).fill('test-pass-2026');await page.getByLabel('Confirm Password',{exact:true}).fill('test-pass-2026');}
      if(tool==='unlock-pdf')await page.locator('input[type=password]').fill('test-pass-2026');
      if(tool==='delete-pages')await page.getByRole('button',{name:'Page 2',exact:true}).click();
      if(tool==='reorder-pages')await page.getByRole('button',{name:'Move page 1 down',exact:true}).click();
      if(tool==='watermark-pdf')await page.locator('input[type=text]').fill('SYNTHETIC');
      if(actions[tool])await page.getByRole('button',{name:actions[tool]}).click();
      const download=tool==='pdf-to-image'?page.getByRole('link',{name:/Download page 1/}):page.getByRole('button',{name:/Download/}).first();
      await download.waitFor({state:'visible',timeout:45000});
      const dp=page.waitForEvent('download');await download.click();const d=await dp;const filename=d.suggestedFilename();const output=path.join(dir,`${tool}-${filename}`);await d.saveAs(output);
      result.downloads.push({filename,bytes:fs.statSync(output).size,error:await d.failure()});
      if(filename.endsWith('.pdf')){
        result.inspection=await inspectPdf(output,tool==='protect-pdf'?'test-pass-2026':undefined);assertSemantics(tool,result.inspection);
        result.rendering=await renderPdf(page,output,tool==='protect-pdf'?'test-pass-2026':undefined);assert(result.rendering.every(x=>x.nonWhite>100),'Output must have rendered content');
        if(tool==='pdf-to-grayscale')assert(result.rendering.every(x=>x.colored===0),'Grayscale channels must match');
        if(tool==='protect-pdf') {for(const bad of [undefined,'wrong-password']){await assert.rejects(()=>inspectPdf(output,bad),/password/i);}const text=fs.readFileSync(output).toString('latin1');assert.match(text,/\/AESV3/);assert.match(text,/\/Length 256/);result.encryption='AESV3 256; missing and wrong passwords rejected';}
        if(tool==='split-pdf') {result.additionalPages=[];const buttons=page.getByRole('button',{name:/Download/});assert.equal(await buttons.count(),3);for(let i=1;i<3;i++){const event=page.waitForEvent('download');await buttons.nth(i).click();const d=await event;const f=path.join(dir,`split-pdf-${d.suggestedFilename()}`);await d.saveAs(f);const info=await inspectPdf(f);assert.equal(info.pages.length,1);assert.match(info.pages[0].text,new RegExp(`SYNTHETIC PAGE ${i+1}`));result.additionalPages.push(info);}}
      } else {result.imageMagic=fs.readFileSync(output).subarray(0,12).toString('hex');assert(result.imageMagic.startsWith('ffd8ff'),'JPEG signature');const images=page.locator('img[alt^="Page "]');assert.equal(await images.count(),3);result.rendering=await images.evaluateAll(xs=>xs.map(x=>({width:x.naturalWidth,height:x.naturalHeight,complete:x.complete})));assert.deepEqual(result.rendering.map(x=>[x.width,x.height]),[[600,800],[800,600],[600,800]]);}
      result.mobile=await measure(page);await page.screenshot({path:path.join(dir,`${tool}-390.png`),fullPage:false});result.status='PASS';
      const remove=page.getByRole('button',{name:'Remove selected file',exact:true});
      if(await remove.count()){await remove.click();await page.waitForTimeout(50);result.removeClearedDownload=await download.count()===0||!(await download.isVisible());}
      if(result.removeClearedDownload!==undefined)assert.equal(result.removeClearedDownload,true,'Removing source clears obsolete download');
    } catch(e){result.status='FAIL';result.error=e.message;result.alerts=await page.getByRole('alert').allTextContents();result.buttons=await page.getByRole('button').allTextContents();await page.screenshot({path:path.join(dir,`${tool}-failure.png`)}).catch(()=>{});}
    page.off('requestfailed',onFail);report.workflows.push(result);save();console.log(`${tool}: ${result.status} ${result.error?.split('\n')[0]||''}`);
  }
  async function check(name,fn){if(process.argv.includes('--cancellation-only')&&!name.includes('cancel-retry'))return;const result={name,status:'FAIL'};try{Object.assign(result,await fn());result.status='PASS';}catch(e){result.error=e.message;}report.supplemental.push(result);save();console.log(`${name}: ${result.status}`);}
  async function downloadFile(locator,name){await locator.waitFor({state:'visible',timeout:45000});const pending=page.waitForEvent('download');await locator.click();const d=await pending;const output=path.join(dir,name);await d.saveAs(output);assert.equal(await d.failure(),null);return output;}
  await check('mobile-navbar-keyboard',async()=>{
    await page.goto(base);await page.setViewportSize({width:320,height:900});
    const toggle=page.locator('button[aria-controls="main-navigation-links"]');
    await toggle.waitFor({timeout:3000});
    assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).count(),1);
    assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    await toggle.focus();await page.keyboard.press('Enter');
    assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    assert.equal(await page.getByRole('button',{name:'Close menu',exact:true}).count(),1);
    assert.equal(await page.locator('#main-navigation-links a:visible').count(),5);
    await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Tools');
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    assert.equal(await toggle.evaluate(e=>e===document.activeElement),true);
    assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).count(),1);
    await page.keyboard.press('Space');
    assert.equal(await toggle.getAttribute('aria-expanded'),'true');
    await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    assert.equal(await page.locator('#main-navigation-links a:visible').count(),0);
    await toggle.click();await page.getByRole('navigation').getByRole('link',{name:'Blog',exact:true}).click();
    await page.waitForURL('**/blog');assert.equal(new URL(page.url()).pathname,'/blog');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
    await page.setViewportSize({width:1280,height:900});assert.equal(await page.locator('#main-navigation-links a:visible').count(),5);
    return {keyboard:'Enter, Tab, Escape/focus restore, Space, toggle close, link navigation',accessibleNames:['Menu','Close menu','Menu'],linksAccessible:5,desktopLinksAccessible:5};
  });
  await check('pdf-to-image-png',async()=>{
    await page.goto(base+'/tools/pdf-to-image');await page.locator('input[type=file]').setInputFiles(pdf);await page.getByRole('button',{name:'PNG',exact:true}).click();await page.getByRole('button',{name:/Convert to Images/}).click();const output=await downloadFile(page.getByRole('link',{name:/Download page 1/}),'pdf-to-image-page-1.png');assert.equal(fs.readFileSync(output).subarray(0,8).toString('hex'),'89504e470d0a1a0a');const sizes=await page.locator('img[alt^="Page "]').evaluateAll(xs=>xs.map(x=>[x.naturalWidth,x.naturalHeight]));assert.deepEqual(sizes,[[600,800],[800,600],[600,800]]);return {sizes};
  });
  await check('protect-unlock-unicode-wrong-password-retry',async()=>{
    const password='تجربة-密碼-2026';await page.goto(base+'/tools/protect-pdf');await page.locator('input[type=file]').setInputFiles(pdf);await page.getByLabel('Password',{exact:true}).fill(password);await page.getByLabel('Confirm Password',{exact:true}).fill(password);await page.getByRole('button',{name:/Protect PDF/}).click();const encrypted=await downloadFile(page.getByRole('button',{name:/Download/}),'unicode-protected.pdf');const opened=await inspectPdf(encrypted,password);assertSemantics('protect-pdf',opened);await assert.rejects(()=>inspectPdf(encrypted,'wrong'),/password/i);
    await page.goto(base+'/tools/unlock-pdf');await page.locator('input[type=file]').setInputFiles(encrypted);await page.getByLabel('Current Password',{exact:true}).fill('wrong');await page.getByRole('button',{name:/Unlock PDF/}).click();await page.getByRole('alert').filter({hasText:/password|failed|could not/i}).first().waitFor({timeout:45000});assert.equal(await page.getByRole('button',{name:/Download/}).count(),0);await page.getByLabel('Current Password',{exact:true}).fill(password);await page.getByRole('button',{name:/Unlock PDF/}).click();const unlocked=await downloadFile(page.getByRole('button',{name:/Download/}),'unicode-unlocked.pdf');const parsed=await inspectPdf(unlocked);assertSemantics('unlock-pdf',parsed);return {encryptedBytes:fs.statSync(encrypted).size,unlockedBytes:fs.statSync(unlocked).size,pageIdentities:parsed.pages.map(x=>x.text),wrongPasswordRejected:true};
  });
  for(const tool of ['pdf-to-grayscale','pdf-to-image'])await check(`${tool}-remove-replace-cancel-retry`,async()=>{
    await page.goto(base+'/tools/'+tool);await page.locator('input[type=file]').setInputFiles(pdf);
    // Hold the selected file read, then reject it after replacement. This creates
    // a deterministic stale failure rather than relying on CPU-speed timing.
    await page.evaluate(()=>{const original=File.prototype.arrayBuffer;window.__releaseAuditRead=null;File.prototype.arrayBuffer=function(){File.prototype.arrayBuffer=original;return new Promise((resolve,reject)=>{window.__releaseAuditRead=()=>reject(new Error('Synthetic obsolete read failure'));});};});
    await page.getByRole('button',{name:/Convert to/}).click();await page.waitForFunction(()=>typeof window.__releaseAuditRead==='function');
    await page.getByRole('button',{name:'Remove selected file',exact:true}).click();await page.locator('input[type=file]').setInputFiles(pdf);await page.evaluate(()=>window.__releaseAuditRead());await page.waitForTimeout(250);
    assert.equal(await page.getByRole('alert').filter({hasText:/could not|failed|invalid/i}).count(),0,'No obsolete failure on replacement');assert.equal(await page.getByRole('progressbar').count(),0,'No obsolete progress');assert.equal(await page.getByRole('button',{name:/Download/}).count(),0,'No obsolete download');
    await page.getByRole('button',{name:/Convert to/}).click();const locator=tool==='pdf-to-image'?page.getByRole('link',{name:/Download page 1/}):page.getByRole('button',{name:/Download/});await locator.waitFor({state:'visible',timeout:45000});return {method:'Held File.arrayBuffer; remove, replace, reject old read, assert no stale error/progress/download; successful retry',retry:true};
  });
  for(const tool of ['pdf-to-grayscale','pdf-to-image'])await check(`${tool}-active-worker-cancel-retry`,async()=>{
    await page.goto(base+'/tools/'+tool);await page.locator('input[type=file]').setInputFiles(pdf);
    await page.evaluate(()=>{
      window.__auditWorkers={started:0,terminated:0,heldDocumentRequests:0,holdNext:true};
      window.Worker=new Proxy(window.Worker,{construct(target,args){
        const worker=Reflect.construct(target,args);window.__auditWorkers.started++;
        const terminate=worker.terminate.bind(worker);worker.terminate=()=>{window.__auditWorkers.terminated++;return terminate();};
        const post=worker.postMessage.bind(worker);worker.postMessage=(message,...rest)=>{
          if(message?.action==='GetDocRequest'&&window.__auditWorkers.holdNext){window.__auditWorkers.holdNext=false;window.__auditWorkers.heldDocumentRequests++;return;}
          return post(message,...rest);
        };
        return worker;
      }});
    });
    await page.getByRole('button',{name:/Convert to/}).click();
    await page.waitForFunction(()=>window.__auditWorkers.heldDocumentRequests===1,{},{timeout:45000});
    await page.getByRole('button',{name:'Remove selected file',exact:true}).click();
    await page.waitForFunction(()=>window.__auditWorkers.terminated>0);
    assert.equal(await page.getByRole('progressbar').count(),0);assert.equal(await page.getByRole('button',{name:/Download/}).count(),0);
    await page.locator('input[type=file]').setInputFiles(pdf);await page.getByRole('button',{name:/Convert to/}).click();
    const result=tool==='pdf-to-image'?page.getByRole('link',{name:/Download page 1/}):page.getByRole('button',{name:/Download/});
    await result.waitFor({timeout:45000});assert.equal(await page.getByRole('alert').filter({hasText:/failed|could not/i}).count(),0);
    return {workers:await page.evaluate(()=>window.__auditWorkers),method:'Allow worker handshake, hold first GetDocRequest, remove source, observe initialized worker terminate, replace and retry',retry:true};
  });
  const zeroDoc=await PDFDocument.create();
  const zero=path.join(dir,'zero-pages.pdf');fs.writeFileSync(zero,await zeroDoc.save({addDefaultPage:false}));
  const invalid=path.join(dir,'invalid.pdf');fs.writeFileSync(invalid,'%PDF-1.7\ninvalid');
  const oneDoc=await PDFDocument.create();oneDoc.addPage([300,400]).drawText('VALID ONE PAGE');
  const one=path.join(dir,'one-page.pdf');fs.writeFileSync(one,await oneDoc.save());
  for(const tool of ['rotate-pdf','watermark-pdf','add-page-numbers','compress-pdf'])await check(`${tool}-zero-malformed-one-page`,async()=>{
    const rejected=[];
    for(const source of [zero,invalid]) {
      await page.goto(base+'/tools/'+tool);await page.locator('input[type=file]').setInputFiles(source);
      if(actions[tool])await page.getByRole('button',{name:actions[tool]}).click();
      await page.getByRole('alert').filter({hasText:/invalid|page|read|PDF/i}).first().waitFor();
      assert.equal(await page.getByRole('button',{name:/Download/}).count(),0);rejected.push(path.basename(source));
    }
    await page.goto(base+'/tools/'+tool);await page.locator('input[type=file]').setInputFiles(one);
    if(actions[tool])await page.getByRole('button',{name:actions[tool]}).click();
    const output=await downloadFile(page.getByRole('button',{name:/Download/}).first(),`${tool}-one-page.pdf`);
    const parsed=await inspectPdf(output);assert.equal(parsed.pages.length,1);assert.match(parsed.pages[0].text,/VALID ONE PAGE/);
    return {rejected,validOnePage:true,validThreePage:'covered by primary workflow'};
  });
  const hugeDoc=await PDFDocument.create();hugeDoc.addPage([3000,3000]).drawText('OVERSIZE GUARD');
  const huge=path.join(dir,'oversize-page.pdf');fs.writeFileSync(huge,await hugeDoc.save());
  for(const tool of ['pdf-to-grayscale','pdf-to-image'])await check(`${tool}-raster-guard`,async()=>{
    await page.goto(base+'/tools/'+tool);await page.locator('input[type=file]').setInputFiles(huge);await page.getByRole('button',{name:/Convert to/}).click();
    await page.getByRole('alert').filter({hasText:/16 million pixels/}).waitFor({timeout:45000});
    assert.equal(await page.getByRole('button',{name:/Download/}).count(),0);assert.equal(await page.locator('a[download]').count(),0);
    assert.equal(await page.getByRole('progressbar').count(),0);return {pagePoints:[3000,3000],noDownload:true,guard:'16 million pixels before canvas allocation'};
  });
  await check('pdf-to-image-repeated-20-pages-url-canvas-cleanup',async()=>{
    const manyDoc=await PDFDocument.create();for(let i=0;i<20;i++)manyDoc.addPage([100,120]).drawText('PAGE '+(i+1),{size:10});
    const many=path.join(dir,'twenty-pages.pdf');fs.writeFileSync(many,await manyDoc.save());
    await page.setViewportSize({width:390,height:900});await page.goto(base+'/tools/pdf-to-image');
    await page.evaluate(()=>{
      const create=URL.createObjectURL,retire=URL.revokeObjectURL,element=document.createElement.bind(document);
      window.__auditUrls={created:[],revoked:[],canvases:[]};
      URL.createObjectURL=function(blob){const url=create.call(this,blob);if(blob.type.startsWith('image/'))window.__auditUrls.created.push(url);return url;};
      URL.revokeObjectURL=function(url){window.__auditUrls.revoked.push(url);return retire.call(this,url);};
      document.createElement=function(tag,...args){const el=element(tag,...args);if(tag==='canvas')window.__auditUrls.canvases.push(el);return el;};
    });
    await page.locator('input[type=file]').setInputFiles(many);await page.getByRole('button',{name:/Convert to Images/}).click();
    await page.waitForFunction(()=>document.querySelectorAll('img[alt^="Page "]').length===20,{},{timeout:45000});
    await page.getByRole('button',{name:/Convert to Images/}).click();
    await page.waitForFunction(()=>window.__auditUrls.created.length===40&&document.querySelectorAll('img[alt^="Page "]').length===20,{},{timeout:45000});
    const repeated=await page.evaluate(()=>({created:window.__auditUrls.created.length,revoked:window.__auditUrls.created.filter(x=>window.__auditUrls.revoked.includes(x)).length,liveCanvases:window.__auditUrls.canvases.filter(x=>x.width||x.height).length}));
    assert.equal(repeated.revoked,20);assert.equal(repeated.liveCanvases,0);
    await page.getByRole('button',{name:'Remove selected file',exact:true}).click();
    const afterRemove=await page.evaluate(()=>window.__auditUrls.created.filter(x=>window.__auditUrls.revoked.includes(x)).length);assert.equal(afterRemove,40);
    assert.equal(await page.locator('img[alt^="Page "]').count(),0);
    return {pagesPerRun:20,runs:2,repeated,revokedAfterRemove:afterRemove,scope:'Small synthetic pages at a mobile viewport; no physical device memory claim'};
  });
  await check('grayscale-repeated-url-canvas-cleanup',async()=>{
    await page.goto(base+'/tools/pdf-to-grayscale');
    await page.evaluate(()=>{
      const create=URL.createObjectURL,retire=URL.revokeObjectURL,element=document.createElement.bind(document);
      window.__auditUrls={created:[],revoked:[],canvases:[]};
      URL.createObjectURL=function(blob){const url=create.call(this,blob);if(blob.type==='application/pdf')window.__auditUrls.created.push(url);return url;};
      URL.revokeObjectURL=function(url){window.__auditUrls.revoked.push(url);return retire.call(this,url);};
      document.createElement=function(tag,...args){const el=element(tag,...args);if(tag==='canvas')window.__auditUrls.canvases.push(el);return el;};
    });
    await page.locator('input[type=file]').setInputFiles(pdf);await page.getByRole('button',{name:/Convert to Grayscale/}).click();
    await page.getByRole('button',{name:/Download Grayscale/}).waitFor({timeout:45000});
    await page.getByRole('button',{name:/Convert to Grayscale/}).click();
    await page.waitForFunction(()=>window.__auditUrls.created.length===2,{},{timeout:45000});
    await page.getByRole('button',{name:/Download Grayscale/}).waitFor({timeout:45000});
    const repeated=await page.evaluate(()=>({created:window.__auditUrls.created.length,revoked:window.__auditUrls.created.filter(x=>window.__auditUrls.revoked.includes(x)).length,liveCanvases:window.__auditUrls.canvases.filter(x=>x.width||x.height).length}));
    assert.equal(repeated.revoked,1);assert.equal(repeated.liveCanvases,0);
    await page.getByRole('button',{name:'Remove selected file',exact:true}).click();
    const afterRemove=await page.evaluate(()=>window.__auditUrls.created.filter(x=>window.__auditUrls.revoked.includes(x)).length);assert.equal(afterRemove,2);
    return {pagesPerRun:3,runs:2,repeated,revokedAfterRemove:afterRemove};
  });
  report.summary={responsiveChecks:report.responsive.length,responsiveFailures:report.responsive.filter(x=>x.overflow||x.offscreen.length).length,workflowPass:report.workflows.filter(x=>x.status==='PASS').length,workflowFail:report.workflows.filter(x=>x.status==='FAIL').length,supplementalPass:report.supplemental.filter(x=>x.status==='PASS').length,supplementalFail:report.supplemental.filter(x=>x.status==='FAIL').length};
  await browser.close();server.close();save();
  if(report.summary.responsiveFailures||report.summary.workflowFail||report.summary.supplementalFail||report.consent.status!=='PASS'||report.errors.length)process.exitCode=1;
}
main().catch(e=>{report.fatal=e.stack;save();console.error(e);server.close();process.exitCode=1;});
