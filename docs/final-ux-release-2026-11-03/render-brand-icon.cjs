// Render the existing code-native P emblem as a 512px favicon, with no wordmark.
// This script is evidence for the committed asset and is not part of the build.
const fs = require('node:fs');
const path = require('node:path');
const { createCanvas } = require(path.resolve('.recovery-browser/node_modules/@napi-rs/canvas'));
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#FCFAF8';
ctx.fillRect(0, 0, 512, 512);
ctx.fillStyle = '#E8380D';
ctx.beginPath();
ctx.roundRect(22, 22, 468, 468, 104);
ctx.fill();
ctx.fillStyle = '#fff';
ctx.font = '800 330px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('P', 256, 263);
fs.writeFileSync('public/icon.png', canvas.toBuffer('image/png'));
console.log('Rendered public/icon.png from the existing P mark at 512x512.');
