/**
 * Compare Coretix productsData prices vs Apex dealer Excel.
 * Run: node scripts/auditApexPricing.mjs
 */
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const apexPath =
  'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Apex_Dealer_Docs/Apexdent_price_list_11-11-25_dental_core.xlsx';

const buf = fs.readFileSync(apexPath);
const wb = XLSX.read(buf, { type: 'buffer' });
const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 });

const apex = new Map();
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (!row?.[2]) continue;
  apex.set(String(row[2]).trim(), {
    name: row[1],
    msrp: Number(row[3]) || 0,
    dealer: Number(row[4]) || 0,
    selling: Number(row[5]) || 0,
    remarks: String(row[6] || ''),
  });
}

const src = fs.readFileSync(path.join(ROOT, 'src/components/dentalcore/productsData.jsx'), 'utf8');

/** Minimal parse: id, price, optional promo/originalPrice */
const products = [];
const blockRe = /\{\s*\n\s*id:\s*"([^"]+)"([\s\S]*?)\n\s*\},?\s*\n/g;
for (const m of src.matchAll(blockRe)) {
  const id = m[1];
  const body = m[2];
  const priceM = body.match(/\n\s*price:\s*([\d.]+)/);
  const promoM = body.match(/\n\s*promo:\s*"([^"]+)"/);
  const origM = body.match(/\n\s*originalPrice:\s*([\d.]+)/);
  if (!priceM) continue;
  products.push({
    id,
    price: Number(priceM[1]),
    promo: promoM?.[1] || null,
    originalPrice: origM ? Number(origM[1]) : null,
  });
}

const MARKUP = 1.1; // 10% on Apex selling for non-promo singles

function retailFromApex(a) {
  const raw = a.selling * MARKUP;
  return Math.ceil(raw) - (Math.ceil(raw) % 1 === 0 && raw > 20 ? 0.01 : 0) || Math.round(raw * 100) / 100;
}

function nicePrice(n) {
  // Round to .00 or .99 for display
  const r = Math.round(n * 100) / 100;
  if (r >= 50) return Math.ceil(r) - 0.01 > r ? Math.ceil(r) - 1 + 0.99 : Math.round(r);
  return r;
}

console.log('=== CORETIX vs APEX (non-promo → suggest selling × 1.10) ===\n');
const changes = [];
for (const p of products) {
  const a = apex.get(p.id);
  if (!a) continue;
  const suggested = nicePrice(a.selling * MARKUP);
  const atApexSelling = p.price === a.selling;
  const belowMsrp = p.price < a.msrp;
  if (p.promo) {
    console.log(`[PROMO] ${p.id} current=$${p.price} orig=$${p.originalPrice} | Apex sell=$${a.selling} msrp=$${a.msrp} | ${p.promo}`);
    continue;
  }
  const needsBump = p.price <= a.selling;
  if (needsBump || atApexSelling) {
    changes.push({ id: p.id, name: a.name, current: p.price, apexSelling: a.selling, msrp: a.msrp, suggested });
    console.log(
      `${needsBump ? 'BUMP' : 'OK  '} ${p.id.padEnd(14)} current=$${String(p.price).padEnd(7)} apex=$${a.selling} msrp=$${a.msrp} → suggest=$${suggested}`,
    );
  }
}

console.log(`\n${changes.length} single SKUs to bump (at or below Apex selling).`);

// full_catalog apex rows sample
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/components/dentalcore/full_catalog.json'), 'utf8'));
let catalogBelow = 0;
for (const row of catalog) {
  const a = apex.get(row.id);
  if (!a || row.source === 'ApexShop') continue;
  if (row.price <= a.selling) catalogBelow++;
}
console.log(`full_catalog.json: ${catalogBelow} Apex Excel rows at/below dealer selling (excl ApexShop).`);
