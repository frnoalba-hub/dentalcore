const fs = require('fs');
const txt = fs.readFileSync('src/components/dentalcore/productsData.jsx', 'utf8');
const p = txt.substring(txt.indexOf('export const products = ['), txt.lastIndexOf('];') + 2);

const arr = [...p.matchAll(/\{\s*id:\s*['"](.*?)['"].*?name:\s*['"](.*?)['"].*?price:\s*([\d.]+).*?(?:originalPrice:\s*([\d.]+))?[^}]*\}/gs)];

let csv = 'SKU,Product Name,MSRP,Selling Price\n';
arr.forEach(m => {
  const [ , id, name, pr, orig] = m;
  const msrp = orig ? '$' + parseFloat(orig).toFixed(2) : '';
  const sell = '$' + parseFloat(pr).toFixed(2);
  const sn = '"' + name.replace(/"/g, '""') + '"';
  csv += id + ',' + sn + ',' + msrp + ',' + sell + '\n';
});

fs.writeFileSync('public/Coretix_Retail_Price_List.csv', csv);
console.log('Successfully updated Coretix_Retail_Price_List.csv');
