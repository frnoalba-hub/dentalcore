import fs from 'fs';

const products = JSON.parse(fs.readFileSync('src/components/dentalcore/full_catalog.json', 'utf8'));

const missingByCategory = {};
let totalMissing = 0;

products.forEach(p => {
  if (!p.image || p.image.trim() === '') {
    totalMissing++;
    const cat = p.category || 'Uncategorized';
    missingByCategory[cat] = (missingByCategory[cat] || 0) + 1;
  }
});

console.log(`Total Products Missing Pictures: ${totalMissing}`);
console.log('Breakdown by Category:');
Object.entries(missingByCategory)
  .sort((a, b) => b[1] - a[1]) // highest first
  .forEach(([cat, count]) => {
    console.log(`- ${cat}: ${count} missing`);
  });
