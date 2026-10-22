// Validate append-only visual evidence and its references without rendering or collecting.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p)),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const index=JSON.parse(read('data/lab/manifest.json')),study=index.studies.find(s=>s.name==='compression');
assert.equal(study.activeRunId,'compression-20261015-hardening-02');assert.equal(study.reviews.length,1);
const ref=study.reviews[0];assert.equal(sha(read(ref.path)),ref.sha256);const review=JSON.parse(read(ref.path));
assert.equal(sha(read(review.renderManifest)),review.renderManifestSha256);
const render=JSON.parse(read(review.renderManifest)),dir=path.posix.dirname(review.renderManifest);
assert.equal(render.items.length,6);assert.equal(review.pages.length,6);
assert(review.reviewer.includes('Codex'));assert(review.limitations.some(s=>s.includes('No browser')));
assert.equal(index.publicationStatus,'INTERNAL \u2014 NOT READY FOR PUBLICATION');
for(const [n,h]of Object.entries(render.artifactHashes)){assert.equal(path.posix.basename(n),n);assert.equal(sha(read(dir+'/'+n)),h);}
for(const item of render.items){
 assert.equal(sha(read(item.inputPath)),item.inputSha256);assert.equal(sha(read(item.outputPath)),item.outputSha256);
 assert.equal(sha(read(item.runManifest)),item.runManifestSha256);assert.equal(sha(read(dir+'/'+item.image)),item.imageSha256);
 const observed=review.pages.find(p=>p.runId===item.runId&&p.page===item.page);assert(observed);assert.equal(observed.image,dir+'/'+item.image);assert.equal(observed.imageSha256,item.imageSha256);
 const png=read(observed.image);assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert(observed.observation.includes('at this review scale'));
}
const failed=JSON.parse(read('tests/evidence/compression/reviews/review-20261016-limited-01/failure.json'));assert(failed.status.startsWith('FAILED'));
console.log('VISUAL REVIEW REFERENCES: 6 paired page renders, hashes, limitations and retained failure PASS');
