// Source-handler and exported-output regressions. Canvas/viewer appearance is not tested here.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..').replaceAll('\\','/'),req=require('module').createRequire(root+'/package.json'),lib=req('pdf-lib'),swc=req('next/dist/build/swc');
const compiled={},results=[];let pdfjs;
const jpeg=Buffer.from('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8rZ55LmaSaaRpZZGLvI7EszE5JJPUmiiijbRDbcm23ds//9k=','base64'),png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY9sAAAAASUVORK5CYII=','base64');
const read=f=>fs.readFileSync(root+'/'+f,'utf8');
const walk=d=>fs.readdirSync(root+'/'+d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
async function test(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS '+name)}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL '+name,e.message)}}
function qfactory(){throw Error('Unexpected qpdf call in a pre-runtime failure test')}
function harness(file,{storage=null,storageFailure=false,pdfOverride,documentOverride,windowOverride={},storageWriteFailure=false}={}){let cursor=0,slots=[],pending=[],cache={},tree,alerts=[],revoked=[],objects=new Map(),sequence=0,stored=storage;
const same=(a,b)=>a&&b&&a.length===b.length&&a.every((v,i)=>Object.is(v,b[i]));
const React={useState:init=>{let i=cursor++;if(!(i in slots))slots[i]=typeof init==='function'?init():init;return[slots[i],v=>slots[i]=typeof v==='function'?v(slots[i]):v]},useRef:init=>{let i=cursor++;return slots[i]??(slots[i]={current:init})},useCallback:(fn,deps)=>{let i=cursor++;if(!slots[i]||!same(slots[i].deps,deps))slots[i]={deps,fn};return slots[i].fn},useEffect:(fn,deps)=>{let i=cursor++;if(!slots[i]||!same(slots[i].deps,deps)){const previous=slots[i];slots[i]={deps};pending.push(()=>{previous?.cleanup?.();slots[i].cleanup=fn()})}},createElement:(type,props,...children)=>({type,props:{...props,children}})};
const Url={createObjectURL:b=>{let u='blob:test-'+sequence++;objects.set(u,b);return u},revokeObjectURL:u=>{revoked.push(u);objects.delete(u)}};
function load(p){if(cache[p])return cache[p].exports;let mod={exports:{}};cache[p]=mod;vm.compileFunction(compiled[p],['module','exports','require','React','URL','window','alert','localStorage','document'])(mod,mod.exports,n=>{if(n==='react')return React;if(n==='pdf-lib')return lib;if(n==='pdfjs-dist')return pdfOverride||pdfjs;if(n==='@neslinesli93/qpdf-wasm')return qfactory;if(n.startsWith('@/')){let relative=n.slice(2)+'.js';return compiled[relative]?load(relative):n}if(n==='next/script'||n==='next/link')return n;return req(n)},React,Url,windowOverride,s=>alerts.push(s),{getItem:()=>{if(storageFailure)throw Error('storage denied');return stored},setItem:(k,v)=>{if(storageFailure||storageWriteFailure)throw Error('storage denied');stored=v}},documentOverride);return mod.exports}
const component=load(file).default;const text=n=>Array.isArray(n)?n.map(text).join(''):n&&typeof n==='object'?text(n.props?.children):typeof n==='boolean'?'':String(n??'');const nodes=n=>Array.isArray(n)?n.flatMap(nodes):n&&typeof n==='object'?[n,...nodes(n.props?.children)]:[];const render=()=>{cursor=0;tree=component();for(const effect of pending.splice(0))effect();return tree};render();render();
const api={objects,render,text:()=>text(tree),nodes:()=>nodes(tree),alerts,revoked,stored:()=>stored,find:f=>{let n=nodes(tree).find(f);assert(n,'control missing: '+file);return n},hasDownload:()=>nodes(tree).some(n=>typeof n.type==='string'&&n.type.endsWith('/DownloadButton')),click:async re=>{let n=api.find(n=>n.type==='button'&&re.test(text(n)));assert(!n.props.disabled,'disabled button');await n.props.onClick();render()},upload:async files=>{await api.find(n=>typeof n.type==='string'&&n.type.endsWith('/UploadZone')).props.onFiles(files);render()},imageUpload:async files=>{await api.find(n=>n.type==='input'&&n.props.type==='file').props.onChange({target:{files,value:''}});render()},change:(type,value,index=0)=>{const n=nodes(tree).filter(n=>n.type==='input'&&n.props.type===type)[index];assert(n);n.props.onChange({target:{value}});render()},output:async()=>{let n=api.find(n=>typeof n.type==='string'&&n.type.endsWith('/DownloadButton'));return{url:n.props.url,bytes:Buffer.from(await objects.get(n.props.url).arrayBuffer())}},unmount:()=>slots.forEach(s=>s?.cleanup?.())};return api}
const tool=(slug,opts)=>harness('app/tools/'+slug+'/page.js',opts);const file=(name,bytes,type='application/pdf')=>new File([bytes],name,{type});
async function inspect(bytes,password){const doc=await pdfjs.getDocument({data:new Uint8Array(bytes),password}).promise;let pages=[];for(let i=1;i<=doc.numPages;i++){let p=await doc.getPage(i);pages.push({size:p.getViewport({scale:p.userUnit}).viewBox,physical:[p.getViewport({scale:p.userUnit}).width,p.getViewport({scale:p.userUnit}).height],rotation:p.rotate,text:(await p.getTextContent()).items.map(x=>x.str).join('|'),annotations:(await p.getAnnotations()).length})}await doc.destroy();return pages}

function loadModule(p,cache={}) {
  if(cache[p])return cache[p].exports;
  const m={exports:{}};cache[p]=m;
  vm.compileFunction(compiled[p],['module','exports','require'])(m,m.exports,n=>n.startsWith('@/')?loadModule(n.slice(2)+'.js',cache):req(n));
  return m.exports;
}
(async()=>{
  for(const p of [...walk('lib'),...walk('components/hooks'),...walk('app/tools').filter(p=>p.endsWith('/page.js')),'components/ui/CookieBanner.js']) {
    compiled[p]=(await swc.transform(read(p),{filename:p,jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'classic'}},target:'es2022'},module:{type:'commonjs'}})).code;
  }
  pdfjs=await import('file:///'+root+'/node_modules/pdfjs-dist/legacy/build/pdf.mjs');
  const {readSupportedImage}=loadModule('lib/imageInput.js');
  for(const [name,bytes,type] of [['valid JPEG',jpeg,'jpeg'],['valid PNG',png,'png']])
    await test(name,async()=>assert.equal((await readSupportedImage(file(name,bytes))).type,type));
  await test('Every proper JPEG prefix is rejected',async()=>{
    for(let n=0;n<jpeg.length;n++) await assert.rejects(()=>readSupportedImage(file('truncated.jpg',jpeg.subarray(0,n),'image/jpeg')));
  });
  await test('JPEG frame without scans even with appended EOI is rejected',async()=>{
    await assert.rejects(()=>readSupportedImage(file('fake.jpg',Buffer.concat([jpeg.subarray(0,168),Buffer.from([255,217])]))));
  });
  await test('Malformed segment length is rejected',async()=>{
    const b=Buffer.from(jpeg);b[4]=255;b[5]=255;await assert.rejects(()=>readSupportedImage(file('bad.jpg',b)));
  });
  await test('Malformed scan header is rejected',async()=>{
    const b=Buffer.from(jpeg),i=b.indexOf(Buffer.from([255,218]));assert(i>0);b[i+4]=0;
    await assert.rejects(()=>readSupportedImage(file('bad-scan.jpg',b)));
  });
  await test('JPEG with no entropy data is rejected',async()=>{
    const i=jpeg.indexOf(Buffer.from([255,218])),end=i+2+jpeg.readUInt16BE(i+2);
    await assert.rejects(()=>readSupportedImage(file('empty-scan.jpg',Buffer.concat([jpeg.subarray(0,end),Buffer.from([255,217])]))));
  });
  for(const signature of ['GIF89a','RIFF0000WEBP','BMmalformed'])
    await test('Mislabeled '+signature+' is rejected',async()=>assert.rejects(()=>readSupportedImage(file('renamed.jpg',Buffer.from(signature),'image/jpeg'))));
  await test('Valid image bytes determine type despite misleading label',async()=>assert.equal((await readSupportedImage(file('photo.jpg',png,'image/jpeg'))).type,'png'));
  await test('Truncated JPEG never reaches tool download',async()=>{
    const t=tool('jpg-to-pdf');await t.imageUpload([file('truncated.jpg',jpeg.subarray(0,168),'image/jpeg')]);
    assert(t.alerts.length);assert(!t.hasDownload());assert(!t.nodes().some(n=>n.type==='img'));
  });
  const cases=[['normal',0,false],['crop',0,true],['rotate90',90,false],['rotate180',180,false],['rotate270',270,false],['crop90',90,true],['crop180',180,true],['crop270',270,true]];
  const positions=['bottom-center','bottom-right','bottom-left','top-center','top-right','top-left'];
  const input=async(angle,crop)=>{
    const d=await lib.PDFDocument.create(),p=d.addPage([600,800]);if(crop)p.setCropBox(100,120,240,320);p.setRotation(lib.degrees(angle));return file('geometry.pdf',await d.save());
  };
  async function checkOutput(t,fontName,text,position) {
    const bytes=(await t.output()).bytes,d=await lib.PDFDocument.load(bytes),p=d.getPage(0);
    const contents=p.node.Contents().asArray().map(r=>lib.decodePDFRawStream(d.context.lookup(r)).decode()).map(b=>new TextDecoder().decode(b)).join('\n');
    const matrix=contents.match(/([-\d.e+]+) ([-\d.e+]+) ([-\d.e+]+) ([-\d.e+]+) ([-\d.e+]+) ([-\d.e+]+) Tm/);
    assert(matrix,'text matrix');const [a,b,c,e,x,y]=matrix.slice(1).map(Number),size=Number(contents.match(/ ([\d.e+-]+) Tf/)[1]);
    const font=await d.embedFont(fontName),w=font.widthOfTextAtSize(text,size),asc=font.heightAtSize(size,{descender:false}),desc=font.heightAtSize(size)-asc;
    const task=pdfjs.getDocument({data:new Uint8Array(bytes)}),pdf=await task.promise,view=(await pdf.getPage(1)).getViewport({scale:1});
    const point=(px,py)=>{const q=view.convertToViewportPoint(x+a*px+c*py,y+b*px+e*py);return[q[0],view.height-q[1]]};
    const corners=[[0,-desc],[w,-desc],[w,asc],[0,asc]].map(v=>point(...v));
    for(const [cx,cy]of corners)assert(cx>=-1e-6&&cx<=view.width+1e-6&&cy>=-1e-6&&cy<=view.height+1e-6,JSON.stringify({corners,view:[view.width,view.height],matrix}));
    const origin=point(0,0),axis=point(1,0),angle=Math.atan2(axis[1]-origin[1],axis[0]-origin[0])*180/Math.PI;
    assert(Math.abs(angle-(position?0:45))<1e-6,'displayed angle');
    const xs=corners.map(v=>v[0]),ys=corners.map(v=>v[1]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
    if(position){assert(position.startsWith('top')?cy>view.height/2:cy<view.height/2);if(position.endsWith('center'))assert(Math.abs(cx-view.width/2)<1e-6);else assert(position.endsWith('left')?cx<view.width/2:cx>view.width/2)}
    else {assert(Math.abs(cx-view.width/2)<1e-6);assert(Math.abs(cy-view.height/2)<1e-6)}
    await task.destroy();t.unmount();
  }
  for(const [name,angle,crop]of cases){
    for(const position of positions)await test('Page number '+name+' '+position,async()=>{
      const t=tool('add-page-numbers');await t.upload([await input(angle,crop)]);
      t.nodes().find(n=>n.type==='button'&&n.props['aria-pressed']!==undefined&&String(n.props.children).toLowerCase().includes(position.split('-').join(' '))).props.onClick();t.render();
      await t.click(/Add Page Numbers/);await checkOutput(t,lib.StandardFonts.Helvetica,'1',position);
    });
    await test('Watermark '+name+' visible and centered',async()=>{
      const t=tool('watermark-pdf');await t.upload([await input(angle,crop)]);await t.click(/Add Watermark/);await checkOutput(t,lib.StandardFonts.HelveticaBold,'CONFIDENTIAL');
    });
  }
  await test('Long watermark fits cropped rotated page',async()=>{
    const t=tool('watermark-pdf');await t.upload([await input(270,true)]);const text='LONG '.repeat(30).trim();t.change('text',text);await t.click(/Add Watermark/);await checkOutput(t,lib.StandardFonts.HelveticaBold,text);
  });
  const simple=()=>input(0,false);
  for(const slug of ['protect-pdf','unlock-pdf']){
    for(const change of ['remove','replace','password',...(slug==='protect-pdf'?['confirmation']:[]),'unmount'])await test('Late '+slug+' error ignored after '+change,async()=>{
      let reject;const f=await simple();f.arrayBuffer=()=>new Promise((_,r)=>reject=r);
      const t=tool(slug);await t.upload([f]);t.change('password','Test-Only-123',0);if(slug==='protect-pdf')t.change('password','Test-Only-123',1);
      const button=t.find(n=>n.type==='button'&&String(n.props.children).includes(slug==='protect-pdf'?'Protect PDF':'Unlock PDF'));
      const job=button.props.onClick();t.render();await Promise.resolve();
      if(change==='remove'){t.find(n=>n.props['aria-label']==='Remove selected file').props.onClick();t.render()}
      else if(change==='replace')await t.upload([await simple()]);
      else if(change==='unmount')t.unmount();
      else t.change('password','Changed-123',change==='confirmation'?1:0);
      reject(Error('obsolete failure'));await job;t.render();assert(!t.text().includes('obsolete failure'));assert(!t.hasDownload());
    });
    await test(slug+' current error clears on password edit',async()=>{
      const t=tool(slug),f=await simple();f.arrayBuffer=async()=>{throw Error('current failure')};await t.upload([f]);t.change('password','Test-Only-123',0);if(slug==='protect-pdf')t.change('password','Test-Only-123',1);
      await t.click(slug==='protect-pdf'?/Protect PDF/:/Unlock PDF/);assert(t.text().includes('current failure'));t.change('password','Changed');assert(!t.text().includes('current failure'));
    });
  }
  const hasAd=t=>t.nodes().some(n=>n.type==='next/script');
  for(const saved of [null,'accepted','declined','true','false','invalid'])await test('Consent initial '+saved,()=>{
    const t=harness('components/ui/CookieBanner.js',{storage:saved});assert.equal(hasAd(t),['true','accepted'].includes(saved));
  });
  await test('Consent can change from declined to accepted without reload',async()=>{
    let reloads=0;const t=harness('components/ui/CookieBanner.js',{storage:'declined',windowOverride:{location:{reload:()=>reloads++}}});
    await t.click(/^Advertising preferences$/);await t.click(/^Accept$/);assert.equal(t.stored(),'accepted');assert(hasAd(t));assert.equal(reloads,0);
  });
  await test('Consent withdrawal warns and reloads after saving decline',async()=>{
    let reloads=0;const t=harness('components/ui/CookieBanner.js',{storage:'accepted',windowOverride:{location:{reload:()=>reloads++}}});
    await t.click(/^Advertising preferences$/);assert(t.text().includes('unsaved results'));assert(hasAd(t));await t.click(/^Decline and reload$/);assert.equal(t.stored(),'declined');assert.equal(reloads,1);assert(!hasAd(t));
    assert(!hasAd(harness('components/ui/CookieBanner.js',{storage:t.stored()})));
  });
  await test('Closing preference editor preserves choice',async()=>{const t=harness('components/ui/CookieBanner.js',{storage:'declined'});await t.click(/^Advertising preferences$/);await t.click(/^Keep current choice$/);assert.equal(t.stored(),'declined');assert(!hasAd(t))});
  await test('Storage failure still allows decline for current page',async()=>{const t=harness('components/ui/CookieBanner.js',{storageFailure:true});await t.click(/^Decline$/);assert(!hasAd(t));await t.click(/^Advertising preferences$/);assert(t.text().includes('Decline'))});
  await test('Failed withdrawal storage is reported without unsafe reload',async()=>{let reloads=0;const t=harness('components/ui/CookieBanner.js',{storage:'accepted',storageWriteFailure:true,windowOverride:{location:{reload:()=>reloads++}}});await t.click(/^Advertising preferences$/);await t.click(/^Decline and reload$/);assert.equal(reloads,0);assert.equal(t.stored(),'accepted');assert(t.text().includes('could not save the change'));assert(hasAd(t));});
  const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;/g,"'");
  await test('Unsupported compression benchmark removed',()=>assert(!/ran real tests|four PDF types|measured the results/i.test(read('app/tools/compress-pdf/layout.js'))));
  await test('Unsupported image-format wording removed',()=>assert(!read('app/blog/how-to-combine-pdf-and-images/page.js').includes('and other image formats')));
  await test('Offline and mobile statements qualified',()=>{
    assert(read('app/blog/how-to-merge-pdf-on-mac/page.js').includes('does not guarantee offline'));
    for(const f of walk('app/blog').filter(f=>f.endsWith('page.js')))assert(!/once loaded can work offline|works immediately|without downloading anything|for in your browser access/.test(read(f)),f);
    assert(!read('app/tools/split-pdf/page.js').includes('Yes. PDFcraft works on iPhone'));
    assert(read('app/tools/split-pdf/page.js').includes('Compatibility and practical file limits'));
  });
  await test('Homepage ranking titles replaced with destination titles',()=>{
    const s=read('app/page.js');assert(!/Best Free/.test(s));
    for(const slug of ['ilovepdf-alternative','best-free-pdf-tools-online']){const a=JSON.parse(read('app/blog/'+slug+'/page.js').match(/const article = ([\s\S]*?);\s*export default/)[1]);assert(s.includes(a.title))}
  });
  await test('Unlock FAQ avoids a legal assurance',()=>{const s=read('app/tools/unlock-pdf/page.js');assert(s.includes('Laws, agreements, and permissions may vary'));assert(!/Yes.*if you own the document/.test(s))});
  for(const route of ['blog','about','contact','privacy','terms'])await test('Exported social metadata '+route,()=>{
    const h=read('out/'+route+'.html'),v=key=>decode(h.match(new RegExp('property="'+key+'" content="([^"]+)"'))[1]);
    assert.equal(v('og:url'),'https://getpdfcraft.com/'+route);assert.equal(v('og:title'),decode(h.match(/<title>(.*?)<\/title>/)[1]));
    assert(h.includes('rel="canonical" href="https://getpdfcraft.com/'+route+'"'));assert(!v('og:title').startsWith('Free PDF Tools Online'));
  });
  await test('CTA contrast at least 4.5',()=>{
    assert(read('components/ui/BlogPost.js').includes('color: "#9ca3af", marginBottom: 24'));
    const luminance=s=>s.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
    const ratio=(luminance('9ca3af')+.05)/(luminance('111827')+.05);console.log('CTA contrast',ratio);assert(ratio>=4.5);
  });
  await test('ESLint configuration loads',async()=>{const r=req('child_process').spawnSync(process.execPath,[root+'/node_modules/eslint/bin/eslint.js','--config','eslint.config.mjs','--format','json','app/page.js'],{cwd:root,encoding:'utf8'});assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(r.stdout)[0].errorCount,0)});
  await test('Icon is the existing 512x512 PNG and exported unchanged',()=>{
    const b=fs.readFileSync(root+'/public/icon.png');assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(16),512);assert.equal(b.readUInt32BE(20),512);assert.deepEqual(fs.readFileSync(root+'/out/icon.png'),b);
    const candidates=walk('app').concat(walk('public')).filter(f=>/(?:favicon|apple-icon|\/icon\.)/i.test(f));assert.deepEqual(candidates,['public/icon.png']);
    for(const f of walk('out').filter(f=>f.endsWith('.html'))){const links=[...read(f).matchAll(/<link[^>]*rel="([^"]*icon[^"]*)"[^>]*>/g)].map(m=>m[0]);assert.equal(links.length,1,f);assert(links[0].includes('href="/icon.png"'));assert(links[0].includes('sizes="512x512"'))}
  });
  await test('No obsolete ad wrappers or dead navigation state',()=>{
    assert(!read('components/ui/Navbar.js').includes('menuOpen'));assert(!read('components/ui/Ads.js').includes('function AdUnit'));
    for(const f of ['app/page.js','components/ui/BlogPost.js'])assert(!/<div[^\n]*>\s*<AdLeaderboard/.test(read(f)));
    assert(!read('app/tools/reorder-pages/page.js').includes('file, pageCount'));
  });
  await test('Editorial typos and duplicate FAQ answers removed',()=>{
    assert(!read('lib/toolMetadata.js').includes('Free ? PDFcraft'));assert(!read('app/tools/watermark-pdf/page.js').includes('page?s'));
    const s=read('app/blog/how-to-merge-pdf-on-windows/page.js');assert(s.includes('does not verify a direct PDF-merge workflow in Word'));assert(s.includes('does not establish a built-in merge feature'));
  });
  console.log('TOTAL '+results.length+' PASS '+results.filter(r=>r.status==='PASS').length+' FAIL '+results.filter(r=>r.status==='FAIL').length);
  process.exitCode=results.some(r=>r.status==='FAIL')?1:0;
})().catch(e=>{console.error(e);process.exitCode=1});
