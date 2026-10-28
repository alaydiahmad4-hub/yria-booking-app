const fs = require('fs');
const content = fs.readFileSync('src/data/mockData.ts', 'utf-8');

const propBlocks = content.split(/\{\s*id:\s*['"]/g).slice(1);
const hotels = [];
for (const block of propBlocks) {
  const idM = block.match(/^([^'"]+)/);
  const titleM = block.match(/title:\s*['"]([^'"]+)['"]/);
  const typeM = block.match(/type:\s*['"]([^'"]+)['"]/);
  const areaM = block.match(/area:\s*['"]([^'"]+)['"]/);
  const priceM = block.match(/priceUsd:\s*(\d+)/);
  const imgMatches = [...block.matchAll(/'(https:\/\/images\.unsplash\.com\/[^']+)'/g)].map(m => m[1]);
  if (typeM && typeM[1] === 'hotel') {
    hotels.push({
      id: idM ? idM[1] : '?',
      title: titleM ? titleM[1] : '',
      area: areaM ? areaM[1] : '',
      price: priceM ? priceM[1] : '',
      images: imgMatches
    });
  }
}

console.log('Total hotels:', hotels.length);
hotels.forEach(h => {
  console.log(`- [${h.id}] ${h.title} | ${h.area} | $${h.price}`);
  console.log(`  Img1: ${h.images[0]}`);
});
