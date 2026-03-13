import fs from 'node:fs';

const path = 'sanity/seed/seed.ndjson';
const content = fs.readFileSync(path, 'utf8').trim();
const lines = content.split('\n');

for (const line of lines) {
  JSON.parse(line);
}

console.log(`Verified ${lines.length} JSON documents in ${path}`);
