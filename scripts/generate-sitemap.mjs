/**
 * Build-time sitemap for dentalcoreinstruments.com (www canonical).
 * Collects parent product ids from productsData.jsx (4-space `id:` lines only).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.dentalcoreinstruments.com';
const productsPath = path.join(root, 'src', 'components', 'dentalcore', 'productsData.jsx');

function extractParentProductIds(source) {
  const start = source.indexOf('export const products = [');
  if (start === -1) throw new Error('productsData.jsx: export const products = [ not found');
  const slice = source.slice(start);
  const lines = slice.split('\n');
  const ids = [];
  for (const line of lines) {
    const m = line.match(/^    id:\s*"([^"]+)",\s*$/);
    if (m) ids.push(m[1]);
  }
  return [...new Set(ids)];
}

function xmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function urlEntry(loc, changefreq, priority) {
  return `    <url>
        <loc>${xmlEscape(loc)}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

function main() {
  const source = fs.readFileSync(productsPath, 'utf8');
  const productIds = extractParentProductIds(source);

  const staticUrls = [
    [SITE_URL + '/', 'weekly', '1.0'],
    [SITE_URL + '/track-order', 'weekly', '0.8'],
  ];

  const productUrls = productIds.map((id) => [
    `${SITE_URL}/product?id=${encodeURIComponent(id)}`,
    'weekly',
    '0.9',
  ]);

  const all = [...staticUrls, ...productUrls];
  const body = all.map(([loc, ch, pr]) => urlEntry(loc, ch, pr)).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  const outDir = path.join(root, 'public');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'sitemap.xml');
  fs.writeFileSync(outFile, xml, 'utf8');
  console.log(`Wrote ${outFile} (${all.length} URLs)`);
}

main();
