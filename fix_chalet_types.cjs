const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf-8');
content = content.replace(/(id:\s*'prop-3'[\s\S]*?type:\s*)'villa'/m, "$1'chalet'");
content = content.replace(/(id:\s*'prop-7'[\s\S]*?type:\s*)'villa'/m, "$1'chalet'");
fs.writeFileSync('src/data/mockData.ts', content, 'utf-8');
console.log('prop-3 and prop-7 type updated to chalet successfully');
