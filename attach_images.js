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
  // e.g., '1006-1'
  const matchedImage = allImages.find(img => img.includes(p.id));
  if (matchedImage) {
    // Strip public/ to get absolute web path
    p.image = matchedImage.replace('public', '');
    matchCount++;
  }
}

fs.writeFileSync(catalogPath, JSON.stringify(products, null, 2));
console.log('Matched ' + matchCount + ' images to products.');
