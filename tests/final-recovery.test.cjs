// Current source-handler tests: actual PDF serialization + independent PDF.js parse.
// Controlled async adapters test cancellation; they are not real-browser rendering.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { PDFDocument } = require('pdf-lib');
const { harness } = require('../scripts/lab/preservation-postrepair.cjs');
let passed = 0;
const test = async (name, fn) => { await fn(); console.log('PASS ' + name); passed++; };
const buttonText = n => JSON.stringify(n.props?.children);
const operations = { 'rotate-pdf': /Rotate 90/, 'watermark-pdf': /Add Watermark/, 'add-page-numbers': /Add Page Numbers/ };
async function fixture(count) { const d = await PDFDocument.create(); for(let i=0;i<count;i++)d.addPage([300,400]).drawText('PAGE '+(i+1)); return d.save({addDefaultPage:false}); }
(async () => {
  const pdfjs = await import(pathToFileURL(path.resolve('node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
  const h = await harness({adapter:pdfjs});
  const zero = await fixture(0);
  const evidenceDir = 'docs/final-adsense-recovery-2026-11-02/evidence';
  fs.mkdirSync(evidenceDir,{recursive:true}); fs.writeFileSync(evidenceDir+'/zero-pages.pdf',zero);
  for(const slug of [...Object.keys(operations),'compress-pdf']) {
    for(const [name,bytes] of [['zero-page',zero],['empty',new Uint8Array()],['malformed',Buffer.from('%PDF-1.7\ninvalid')],['wrong extension content',Buffer.from('not a PDF')]]) {
      await test(`${slug} rejects ${name} without a download`,async()=>{
        const t=h.tool(slug); await t.upload([h.file('invalid.pdf',bytes)]);
        if(operations[slug])await t.click(operations[slug]);
        assert(!t.hasDownload());assert(t.nodes().some(n=>n.props?.role==='alert'),'clear inline error');t.unmount();
      });
    }
    for(const count of [1,3]) await test(`${slug} preserves ${count} valid pages (mislabeled filename)`,async()=>{
      const t=h.tool(slug);await t.upload([h.file('valid.txt',await fixture(count))]);if(operations[slug])await t.click(operations[slug]);
      const out=await t.output();const task=pdfjs.getDocument({data:new Uint8Array(out.bytes)});const d=await task.promise;
      assert.equal(d.numPages,count); for(let i=1;i<=count;i++){const p=await d.getPage(i);assert((await p.getTextContent()).items.some(x=>x.str==='PAGE '+i));}
      await task.destroy();t.unmount();assert.equal(t.objects.size,0);
    });
  }
  for(const slug of Object.keys(operations)) for(const action of ['remove','replace','unmount']) await test(`${slug} ignores obsolete failure after ${action}`,async()=>{
    const t=h.tool(slug), f=h.file('old.pdf',await fixture(1));let reject;f.arrayBuffer=()=>new Promise((_,r)=>{reject=r;});await t.upload([f]);
    const job=t.find(n=>n.type==='button'&&operations[slug].test(buttonText(n))).props.onClick();
    while(!reject) await new Promise(r=>setImmediate(r));
    if(action==='unmount')t.unmount();else{t.find(n=>n.props?.['aria-label']==='Remove selected file').props.onClick();t.render();if(action==='replace')await t.upload([h.file('new.pdf',await fixture(1))]);}
    reject(Error('obsolete'));await job;t.render();assert.equal(t.alerts.length,0);assert(!t.nodes().some(n=>n.props?.role==='alert'));assert(!t.hasDownload());
    if(action==='replace'){await t.click(operations[slug]);assert(t.hasDownload());}t.unmount();
  });
  for(const number of ['',-1,0,1.5,Number.MAX_SAFE_INTEGER]) await test(`page numbers reject invalid/overflowing start ${number}`,async()=>{
    const t=h.tool('add-page-numbers');await t.upload([h.file('three.pdf',await fixture(3))]);t.change('number',String(number));await t.click(/Add Page Numbers/);assert(!t.hasDownload());assert(t.text().includes('positive whole'));t.unmount();
  });
  for(const action of ['remove','replace','unmount']) await test(`grayscale destroys pending task and suppresses stale state after ${action}`,async()=>{
    let reject, destroys=0;
    const adapter={GlobalWorkerOptions:{},version:pdfjs.version,getDocument:()=>({promise:new Promise((_,r)=>{reject=r;}),destroy:async()=>{destroys++;}})};
    const g=await harness({adapter}), t=g.tool('pdf-to-grayscale');await t.upload([g.file('old.pdf',await fixture(1))]);
    const job=t.find(n=>n.type==='button'&&/Convert to Grayscale/.test(buttonText(n))).props.onClick();
    while(!reject)await new Promise(r=>setImmediate(r));
    if(action==='unmount')t.unmount();else{t.find(n=>n.props?.['aria-label']==='Remove selected file').props.onClick();t.render();if(action==='replace')await t.upload([g.file('new.pdf',await fixture(1))]);}
    assert(destroys>0,'loading task cancelled immediately');reject(Error('old failure'));await job;t.render();assert(!t.hasDownload());assert(!t.nodes().some(n=>n.props?.role==='alert'));if(action!=='unmount')assert(!t.nodes().some(n=>n.props?.role==='progressbar'));
    if(action==='replace')assert(!t.find(n=>n.type==='button'&&/Convert to Grayscale/.test(buttonText(n))).props.disabled);t.unmount();
  });
  console.log(`TOTAL ${passed} PASS ${passed} FAIL 0`);
})().catch(e=>{console.error(e);process.exitCode=1;});
