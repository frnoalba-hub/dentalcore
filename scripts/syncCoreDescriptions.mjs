/**
 * Overlay rich descriptions from productsData.jsx onto full_catalog.json rows
 * when the catalog still has stub text (usually the product name repeated).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const productsPath = path.join(root, 'src/components/dentalcore/productsData.jsx');
const catalogPath = path.join(root, 'src/components/dentalcore/full_catalog.json');

const src = fs.readFileSync(productsPath, 'utf8');
const descById = new Map();

const blockRe = /\{\s*\n\s*id:\s*"([^"]+)"[\s\S]*?\n\s*description:\s*"((?:\\.|[^"\\])*)"/g;
for (let m = blockRe.exec(src); m; m = blockRe.exec(src)) {
  const text = m[2]
    .replace(/\\n/g, '\n')
    .replace(/\\u2014/g, '\u2014')
    .replace(/\\u2019/g, '\u2019')
    .replace(/\\"/g, '"');
  descById.set(m[1], text);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
let updated = 0;

for (const row of catalog) {
  const rich = descById.get(row.id);
  if (!rich) continue;

  const current = String(row.description || '').trim();
  const name = String(row.name || '').trim();
  const isStub =
    !current ||
    current === name ||
    current.length < 48 ||
    /^[A-Z0-9][A-Z0-9\s\-().,&™]+$/i.test(current) && current.length < 80;

  if (isStub && rich.length > current.length) {
    row.description = rich;
    updated += 1;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Synced ${updated} catalog descriptions from productsData (${descById.size} core products parsed).`);
