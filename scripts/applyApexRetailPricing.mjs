/**
 * Apply Coretix retail markup to productsData.jsx + full_catalog.json from Apex Excel.
 * Run: node scripts/applyApexRetailPricing.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  loadApexSheet,
  retailFromApexRow,
  isPromoUnitId,
  MANUAL_PRICE_IDS,
  SINGLE_MARKUP,
} from './lib/apexPricing.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PRODUCTS_PATH = path.join(ROOT, 'src/components/dentalcore/productsData.jsx');
const CATALOG_PATH = path.join(ROOT, 'src/components/dentalcore/full_catalog.json');
const CSV_PATH = path.join(ROOT, 'public/Coretix_Retail_Price_List.csv');

const apex = loadApexSheet();
const report = { productsData: [], catalog: [], skipped: [] };

// --- productsData.jsx ---
let src = fs.readFileSync(PRODUCTS_PATH, 'utf8');

const blockRe = /(\{\s*\n\s*id:\s*"([^"]+)"[\s\S]*?\n\s*price:\s*)([\d.]+)/g;
src = src.replace(blockRe, (match, prefix, id, priceStr) => {
  if (MANUAL_PRICE_IDS.has(id) && !isPromoUnitId(id)) {
    report.skipped.push({ id, reason: 'manual', current: Number(priceStr) });
    return match;
  }
  const apexRow = apex.get(id);
  if (!apexRow) return match;

  const hasPromo = /promo:\s*"/.test(match);
  const promoUnit = isPromoUnitId(id, hasPromo);
  const next = retailFromApexRow(apexRow, { isPromoUnit: promoUnit });
  const current = Number(priceStr);
  if (Math.abs(current - next) < 0.001) return match;

  report.productsData.push({
    id,
    name: apexRow.name,
    current,
    apexSelling: apexRow.selling,
    msrp: apexRow.msrp,
    promoUnit,
    next,
  });
  return `${prefix}${next.toFixed(2)}`;
});

// Ensure B2G1 lines show promo badge in UI where missing
const B2G1_PROMO = 'Buy 2, Get 1 Free';
for (const id of ['A1003', 'A1009B', 'A1012', 'M1042X', 'TH-001', 'A1061', 'A1658', 'IPR-001', 'M1002']) {
  const idRe = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?price:[\\s\\S]*?)(\\n\\s*category:)`, 'm');
  if (!idRe.test(src)) continue;
  if (new RegExp(`id:\\s*"${id}"[\\s\\S]*?promo:`).test(src)) continue;
  src = src.replace(idRe, `$1\n    promo: "${B2G1_PROMO}",$2`);
  report.productsData.push({ id, addedPromo: B2G1_PROMO });
}

fs.writeFileSync(PRODUCTS_PATH, src);

// --- full_catalog.json ---
const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
for (const row of catalog) {
  const apexRow = apex.get(row.id);
  if (apexRow && row.source !== 'ApexShop') {
    if (MANUAL_PRICE_IDS.has(row.id)) {
      report.skipped.push({ id: row.id, reason: 'manual-catalog', current: row.price });
      continue;
    }
    const next = retailFromApexRow(apexRow, {
      isPromoUnit: isPromoUnitId(row.id),
    });
    if (row.price !== next) {
      report.catalog.push({ id: row.id, from: row.price, to: next });
      row.price = next;
    }
    continue;
  }
  // ApexShop / supplement rows: +10% on scraped price unless already has compareAt promo
  if (row.source === 'ApexShop' || row.shopUrl) {
    if (isPromoUnitId(row.id)) continue;
    const base = Number(row.price) || 0;
    if (base <= 0) continue;
    const hasCompare = row.variants?.some((v) => v.compareAt && v.compareAt > v.price);
    const next = hasCompare ? base : Math.round(base * SINGLE_MARKUP * 100) / 100;
    if (row.price !== next) {
      report.catalog.push({ id: row.id, from: row.price, to: next, source: 'ApexShop' });
      row.price = next;
      if (row.variants) {
        for (const v of row.variants) {
          if (v.price > 0 && !(v.compareAt && v.compareAt > v.price)) {
            v.price = Math.round(v.price * SINGLE_MARKUP * 100) / 100;
          }
        }
      }
    }
  }
}
fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));

// --- Retail CSV sync for core SKUs ---
if (fs.existsSync(CSV_PATH)) {
  let csv = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = csv.split('\n');
  const out = [lines[0]];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const sku = line.split(',')[0];
    const apexRow = apex.get(sku);
    if (!apexRow || MANUAL_PRICE_IDS.has(sku)) {
      out.push(line);
      continue;
    }
    const promoUnit = isPromoUnitId(sku, /M1001/.test(sku));
    const price = retailFromApexRow(apexRow, { isPromoUnit: promoUnit });
    const nameMatch = line.match(/^([^,]+),(".*?"|[^,]*),/);
    const name = nameMatch ? nameMatch[2] : '""';
    out.push(`${sku},${name},,$${price.toFixed(2)}`);
  }
  fs.writeFileSync(CSV_PATH, out.join('\n') + '\n');
}

console.log(JSON.stringify(report, null, 2));
console.log(`\nUpdated ${report.productsData.length} productsData prices, ${report.catalog.length} catalog rows.`);
