// Offline rendering only. Does not modify source PDFs or immutable run directories.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..');
const canvasPath=process.env.PDFCRAFT_REVIEW_CANVAS || path.join(os.tmpdir(),'pdfcraft-7c-render/node_modules/@napi-rs/canvas');
const canvas=require(canvasPath);
for(const name of ['DOMMatrix','Path2D','ImageData'])globalThis[name]=canvas[name];
class Factory {
 create(width,height){const c=canvas.createCanvas(width,height);return {canvas:c,context:c.getContext('2d')};}
 reset(target,width,height){target.canvas.width=width;target.canvas.height=height;}
 destroy(target){target.canvas.width=0;target.canvas.height=0;target.canvas=null;target.context=null;}
}
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
 const reviewId=process.argv[2];if(!/^[a-zA-Z0-9_-]+$/.test(reviewId||''))throw Error('Supply unique review ID');
 const base=path.join(root,'tests/evidence/compression/reviews');fs.mkdirSync(base,{recursive:true});
 const dir=path.join(base,reviewId);fs.mkdirSync(dir);
 const pdfjs=await import(pathToFileURL(path.join(root,'node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href);
 const record={reviewId,createdAt:new Date().toISOString(),renderer:'PDF.js '+require('pdfjs-dist/package.json').version,canvas:require(path.join(canvasPath,'package.json')).version,node:process.version,os:os.type()+' '+os.release(),browser:'NOT TESTED: inventory empty; iab browser unavailable',visualReview:'PENDING; rendered images require inspection',items:[]};
 fs.copyFileSync(__filename,path.join(dir,'renderer.cjs'),fs.constants.COPYFILE_EXCL);
 for(const id of ['compression-20261016-realworld-01','compression-20261016-scan-01']){
  const rel='tests/evidence/compression/runs/'+id+'/manifest.json',m=JSON.parse(fs.readFileSync(path.join(root,rel))),r=m.results[0];
  const tasks=[r.inputPath,r.outputPath].map(p=>pdfjs.getDocument({data:new Uint8Array(fs.readFileSync(path.join(root,p))),canvasFactory:new Factory(),standardFontDataUrl:path.join(root,'node_modules/pdfjs-dist/standard_fonts/')+path.sep,useSystemFonts:false}));
  try{
   const docs=await Promise.all(tasks.map(t=>t.promise));
   for(const n of [1,Math.ceil(docs[0].numPages/2),docs[0].numPages]){
    const rendered=[];
    for(const doc of docs){const page=await doc.getPage(n),v=page.getViewport({scale:1}),vp=page.getViewport({scale:750/v.height}),c=canvas.createCanvas(Math.ceil(vp.width),Math.ceil(vp.height));await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;rendered.push(c);}
    const combined=canvas.createCanvas(rendered[0].width+rendered[1].width+12,780),ctx=combined.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,combined.width,combined.height);ctx.fillStyle='black';ctx.font='14px sans-serif';ctx.fillText('INPUT page '+n,5,20);ctx.fillText('OUTPUT page '+n,rendered[0].width+17,20);ctx.drawImage(rendered[0],0,30);ctx.drawImage(rendered[1],rendered[0].width+12,30);
    const name=id+'-page-'+n+'.png',bytes=combined.toBuffer('image/png');fs.writeFileSync(path.join(dir,name),bytes,{flag:'wx'});
    record.items.push({runId:id,page:n,inputPath:r.inputPath,inputSha256:r.inputSha256,outputPath:r.outputPath,outputSha256:r.outputSha256,runManifest:rel,runManifestSha256:sha(fs.readFileSync(path.join(root,rel))),image:name,imageSha256:sha(bytes),renderHeight:750});
   }
  }finally{await Promise.all(tasks.map(t=>t.destroy()));}
 }
 record.artifactHashes=Object.fromEntries(fs.readdirSync(dir).map(n=>[n,sha(fs.readFileSync(path.join(dir,n)))]));
 fs.writeFileSync(path.join(dir,'render-manifest.json'),JSON.stringify(record,null,2)+'\n',{flag:'wx'});console.log(dir);
})().catch(e=>{console.error(e);process.exitCode=1;});
