/**
 * Regenerates full_catalog.json from Apex Excel, then reports storefront SKUs
 * that differ from Apex selling price (non-promo rows only).
 *
 * Run from dentalcore/: node scripts/syncApexPrices.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

execSync('node generate_catalog.js', { cwd: root, stdio: 'inherit' });

const catalog = JSON.parse(
  fs.readFileSync(path.join(root, 'src/components/dentalcore/full_catalog.json'), 'utf8')
);
const priceMap = new Map(catalog.map((p) => [p.id, Number(p.price)]));

const jsxPath = path.join(root, 'src/components/dentalcore/productsData.jsx');
const text = fs.readFileSync(jsxPath, 'utf8');

/** SKUs where storefront id != Apex row meaning (do not auto-match by id). */
const SKIP_IDS = new Set(['1008-1']); // Listed as transilluminator; Apex 1008-1 is EP CURE MINI

const idAliases = { 'OSTEO-PLUG': 'OSTEO', 'HELI-1': 'HP10' };

const productBlocks = text.split(/\n  \{\n/).slice(1);
let inPromo = false;
let currentId = null;
let currentPrice = null;
let issues = [];

for (const block of productBlocks) {
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  if (!idMatch) continue;
  const id = idMatch[1];
  const hasPromo = /promo:\s*"/.test(block);
  const priceMatch = block.match(/price:\s*([\d.]+)/);
  const price = priceMatch ? Number(priceMatch[1]) : null;
  if (hasPromo) continue;

  const apexId = idAliases[id] || id;
  if (SKIP_IDS.has(id)) continue;
  if (!priceMap.has(apexId)) continue;
  const apex = priceMap.get(apexId);
  if (price != null && Math.abs(price - apex) > 0.001) {
    issues.push({ id, storefront: price, apex, apexId: apexId !== id ? apexId : undefined });
  }
}

if (issues.length) {
  console.log('Non-promo SKUs still differing from Apex selling (manual review):');
  console.table(issues);
} else {
  console.log('All matched non-promo parent SKUs align with full_catalog.json.');
}
