const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
content = content.replace(/(id:\s*'prop-4'[\s\S]*?images:\s*\[\s*)'https:\/\/images\.unsplash\.com\/photo-[^']*'/m, "$1'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'");
fs.writeFileSync('src/data/mockData.ts', content, 'utf-8');
console.log('prop-4 courtyard photo updated successfully');
