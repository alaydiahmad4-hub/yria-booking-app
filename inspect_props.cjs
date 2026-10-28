const fs = require('fs');

const content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
const lines = content.split('\n');
let currentProp = null;
const props = [];

for (const line of lines) {
  const idM = line.match(/['"]?id['"]?:\s*['"]([^'"]+)['"]/);
  if (idM && !idM[1].startsWith('r-') && !idM[1].startsWith('room-')) {
    currentProp = { id: idM[1] };
    props.push(currentProp);
  }
  const typeM = line.match(/['"]?type['"]?:\s*['"]([^'"]+)['"]/);
  if (typeM && currentProp && !currentProp.type) {
    currentProp.type = typeM[1];
  }
  const govM = line.match(/['"]?governorate['"]?:\s*['"]([^'"]+)['"]/);
  if (govM && currentProp && !currentProp.gov) {
    currentProp.gov = govM[1];
  }
  const titleM = line.match(/['"]?title['"]?:\s*['"]([^'"]+)['"]/);
  if (titleM && currentProp && !currentProp.title) {
    currentProp.title = titleM[1];
  }
  const areaM = line.match(/['"]?area['"]?:\s*['"]([^'"]+)['"]/);
  if (areaM && currentProp && !currentProp.area) {
    currentProp.area = areaM[1];
  }
  const priceM = line.match(/['"]?priceUsd['"]?:\s*(\d+)/);
  if (priceM && currentProp && !currentProp.priceUsd) {
    currentProp.priceUsd = parseInt(priceM[1]);
  }
}

console.log('Total properties parsed:', props.length);
const byType = {};
props.forEach(p => { byType[p.type] = (byType[p.type] || 0) + 1; });
console.log('Breakdown by type:', byType);
props.forEach(p => console.log(p.id, '|', p.type, '|', p.gov, '|', p.area, '|', p.priceUsd + '$ |', p.title));
