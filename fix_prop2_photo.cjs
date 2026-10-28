const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
content = content.replace(/(id:\s*'prop-2'[\s\S]*?images:\s*\[\s*)'https:\/\/images\.unsplash\.com\/photo-1502672260266-1c1ef2d93688[^']*'/m, "$1'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'");
fs.writeFileSync('src/data/mockData.ts', content, 'utf-8');
console.log('prop-2 sea photo updated successfully');
