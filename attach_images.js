import fs from 'fs';
import path from 'path';

const catalogPath = 'src/components/dentalcore/full_catalog.json';
const imagesDir = 'public/product_images';

const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Find all images recursively
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file).replace(/\\/g, '/'));
    }
  });

  return arrayOfFiles;
}

const allImages = getAllFiles(imagesDir);

let matchCount = 0;

for (let p of products) {
  if (!p.id) continue;
  // look for an image that contains the product ID
  let matchId = p.id.toLowerCase();
  if (matchId === '1006-full kit') matchId = '1006-1';
  if (matchId === '1002-full kit') matchId = '1002-1.png'; // or UC_ONE_CONTENTS
  if (matchId === 'mta-3') matchId = 'mta_3';
  if (matchId === 'os2030') matchId = 'os1520'; // use same membrane image
  if (matchId === 'os3040') matchId = 'os1520'; // use same membrane image
  
  const matchedImage = allImages.find(img => img.toLowerCase().includes(matchId));
  if (matchedImage) {
    // Strip public/ to get absolute web path
    p.image = matchedImage.replace('public', '');
    matchCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
console.log('Matched ' + matchCount + ' images to products.');
