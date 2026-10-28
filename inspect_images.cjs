const fs = require('fs');
const content = fs.readFileSync('src/data/mockData.ts', 'utf-8');

const propBlocks = content.split(/\{\s*id:\s*['"]/g).slice(1);
for (let i = 0; i < Math.min(propBlocks.length, 12); i++) {
  const block = propBlocks[i];
  const idM = block.match(/^([^'"]+)/);
  const titleM = block.match(/title:\s*['"]([^'"]+)['"]/);
  const typeM = block.match(/type:\s*['"]([^'"]+)['"]/);
  const areaM = block.match(/area:\s*['"]([^'"]+)['"]/);
  const priceM = block.match(/priceUsd:\s*(\d+)/);
  const imgMatches = [...block.matchAll(/'(https:\/\/images\.unsplash\.com\/[^']+)'/g)].map(m => m[1]);
  console.log(`[${idM ? idM[1] : '?'}] ${typeM ? typeM[1] : ''} | ${areaM ? areaM[1] : ''} | $${priceM ? priceM[1] : ''}`);
  console.log(`  Title: ${titleM ? titleM[1] : ''}`);
  console.log(`  Images (${imgMatches.length}):`, imgMatches.slice(0, 2));
}
