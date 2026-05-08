import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = join(__dirname, '..', 'public');

await sharp(join(pub, 'og-coretix.svg')).png().toFile(join(pub, 'og-coretix.png'));

await sharp(join(pub, 'favicon.svg'))
  .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toFile(join(pub, 'favicon-32x32.png'));

await sharp(join(pub, 'og-coretix.svg'))
  .resize(180, 180, { fit: 'cover', position: 'centre' })
  .png()
  .toFile(join(pub, 'apple-touch-icon.png'));

await sharp(join(pub, 'coretix-pfp.svg'))
  .resize(1024, 1024, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(join(pub, 'coretix-pfp.png'));

await sharp(join(pub, 'coretix-symbol.svg'))
  .resize(1024, 1024, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toFile(join(pub, 'coretix-symbol.png'));

await sharp(join(pub, 'coretix-cover.svg'))
  .resize(1640, 624, { fit: 'contain', background: { r: 17, g: 17, b: 17, alpha: 1 } })
  .png()
  .toFile(join(pub, 'coretix-cover.png'));

console.log('Wrote og-coretix.png, favicon-32x32.png, apple-touch-icon.png, coretix-pfp.png, coretix-symbol.png, coretix-cover.png');
