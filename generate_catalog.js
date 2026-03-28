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
    price: price || msrp,
    image: '',
    source: 'Apex'
  });
}

fs.writeFileSync('src/components/dentalcore/full_catalog.json', JSON.stringify(products, null, 2));
console.log('Saved ' + products.length + ' products to full_catalog.json');
