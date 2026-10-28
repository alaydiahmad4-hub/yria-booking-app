const fs = require('fs');

const filePath = 'src/data/mockData.ts';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace literal backslash followed by n with real newline
content = content.replace(/\\n/g, '\n');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed literal \\n characters in mockData.ts');
