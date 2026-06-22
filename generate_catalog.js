import fs from 'fs';
import * as XLSX from 'xlsx';

const dowellPath = 'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Dowell_Dealer_Docs/Dowell Dealer Price for DentalCore.xlsx';
const apexPath = 'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Apex_Dealer_Docs/Apexdent_price_list_11-11-25_dental_core.xlsx';

function readExcel(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    const xlsxLib = XLSX.read ? XLSX : (XLSX.default || XLSX);
    const workbook = xlsxLib.read(buf, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // Start from row index where actual data is. Skip header if necessary.
    const data = xlsxLib.utils.sheet_to_json(sheet, { header: 1 });
    return data;
  } catch (err) {
    return null;
  }
}

const dowellData = readExcel(dowellPath) || [];
const apexData = readExcel(apexPath) || [];

const products = [];

// Removed Dowell parse code per user request.

// Parse Apex - assume row 0 is header
for (let i = 1; i < apexData.length; i++) {
  const row = apexData[i];
  if (!row || row.length < 6) continue;
  const category = row[0];
  const name = row[1];
  const id = row[2];
  const msrp = row[3];
  const price = row[5]; // Selling Price
  
  if (!id || !name) continue;
  
  products.push({
    id: String(id),
    name: String(name),
    category: String(category),
    description: String(name),
    price: Number(price || msrp || 0),
    image: '',
    source: 'Apex'
  });
}

const catalogPath = 'src/components/dentalcore/full_catalog.json';
const supplementPath = 'src/components/dentalcore/apex_shop_supplement.json';

function keyFor(row) {
  const shopUrl = String(row?.shopUrl || '');
  const handle = shopUrl.split('/products/')[1];
  if (handle) return `shop:${handle}`;
  if (row?.id) return `id:${String(row.id).trim().toUpperCase()}`;
  if (row?.name) return `name:${String(row.name).trim().toLowerCase()}`;
  return null;
}

const existing = fs.existsSync(catalogPath)
  ? JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
  : [];
const supplement = fs.existsSync(supplementPath)
  ? JSON.parse(fs.readFileSync(supplementPath, 'utf8'))
  : [];

const index = new Map();

// Keep existing catalog rows first.
for (const row of existing) {
  const key = keyFor(row);
  if (!key || index.has(key)) continue;
  index.set(key, row);
}

// Add legacy Apex Excel rows only when missing.
let excelAdded = 0;
for (const row of products) {
  const key = keyFor(row);
  if (!key || index.has(key)) continue;
  index.set(key, row);
  excelAdded++;
}

// ApexShop supplement is authoritative for matching shop products (new prices/images/descriptions).
let supplementUpserts = 0;
for (const row of supplement) {
  const key = keyFor(row);
  if (!key) continue;
  index.set(key, row);
  supplementUpserts++;
}

const merged = Array.from(index.values());
fs.writeFileSync(catalogPath, JSON.stringify(merged, null, 2));
console.log('Existing rows: ' + existing.length);
console.log('Excel rows parsed: ' + products.length + ' (added ' + excelAdded + ')');
console.log('Supplement rows upserted: ' + supplementUpserts);
console.log('Saved ' + merged.length + ' products to full_catalog.json');
