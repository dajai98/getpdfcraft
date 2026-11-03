const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const previous = JSON.parse(fs.readFileSync(path.join(root, 'docs/final-adsense-recovery-2026-11-02/evidence/final-dependency-triage.json'), 'utf8'));
const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const findings = previous.findings.map(f => ({name:f.name, severity:f.severity, scope:f.scope, nodes:f.nodes.map(n => {
  const file = path.join(root, n.path, 'package.json');
  return {path:n.path, historicalVersion:n.lockedVersion, lockedVersion:lock.packages[n.path]?.version, installedVersion:fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).version : null};
})}));
const report = {reviewDate:'2026-11-03', generatedAt:new Date().toISOString(), advisoryStatus:'Historical 27-entry inventory rechecked against current installation; not a fresh audit', hashes:['package.json','package-lock.json','next.config.mjs','components/ui/CookieBanner.js','components/ui/Ads.js','components/ui/Analytics.js'].map(file=>({file,sha256:sha(file)})), findings};
fs.writeFileSync(path.join(__dirname, 'installed-recheck.json'), JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({entries:findings.length, changedNodes:findings.flatMap(f=>f.nodes.filter(n=>n.historicalVersion!==n.lockedVersion)), absentNodes:findings.flatMap(f=>f.nodes.filter(n=>!n.installedVersion).map(n=>n.path))}));
