import fs from 'fs';
import * as XLSX from 'xlsx';

const dowellPath = 'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Dowell_Dealer_Docs/Dowell Dealer Price for DentalCore.xlsx';
const apexPath = 'C:/Users/sebas/OneDrive/Desktop/VC_CORE_HQ/05_Companies/Dental_Core_Supplies/_PRODUCT_HUB/Dental Core Files/docs/Apex_Dealer_Docs/Apexdent_price_list_11-11-25_dental_core.xlsx';

function readExcel(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    // If XLSX is a default export with properties vs namespace
    const xlsxLib = XLSX.read ? XLSX : (XLSX.default || XLSX);
    const workbook = xlsxLib.read(buf, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsxLib.utils.sheet_to_json(sheet, { header: 1 });
    return data;
  } catch (err) {
    console.error('Error reading', filePath, err.message);
    return null;
  }
}

const dowellData = readExcel(dowellPath);
const apexData = readExcel(apexPath);

const output = {
  dowellOverview: dowellData ? dowellData.slice(0, 15) : null,
  apexOverview: apexData ? apexData.slice(0, 15) : null
};

fs.writeFileSync('excel_output.json', JSON.stringify(output, null, 2));
console.log('Successfully wrote excel_output.json');
