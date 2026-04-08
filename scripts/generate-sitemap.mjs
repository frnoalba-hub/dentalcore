/**
 * Build-time sitemap for dentalcoreinstruments.com (www canonical).
 * Emits `/p/{slug}` URLs from parent `id:` + `slug:` lines in productsData.jsx (4-space indent only).
 * Merges optional scripts/sitemap-extras.json for Base44-only SKUs not in the local file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.dentalcoreinstruments.com';
const productsPath = path.join(root, 'src', 'components', 'dentalcore', 'productsData.jsx');
const extrasPath = path.join(__dirname, 'sitemap-extras.json');

/** Parent catalog rows only: `    id:` then later `    slug:` before next parent id. */
function extractSlugEntries(source) {
  const entries = [];
  let pendingId = null;
  for (const line of source.split('\n')) {
    const idm = line.match(/^    id: "([^"]+)",?\s*$/);
    if (idm) {
      pendingId = idm[1];
      continue;
    }
    const slm = line.match(/^    slug: "([^"]+)",?\s*$/);
    if (slm && pendingId) {
      entries.push({ id: pendingId, slug: slm[1] });
      pendingId = null;
    }
  }
  return entries;
}

function loadExtras() {
  try {
    const raw = fs.readFileSync(extrasPath, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((x) => x && typeof x.slug === 'string' && x.slug.trim());
  } catch {
    return [];
  }
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
  const slugEntries = extractSlugEntries(source);
  const slugSet = new Set(slugEntries.map((e) => e.slug));

  const staticUrls = [
    [SITE_URL + '/', 'weekly', '1.0'],
    [SITE_URL + '/group-practices', 'monthly', '0.75'],
    [SITE_URL + '/track-order', 'weekly', '0.8'],
  ];

  const productUrls = slugEntries.map(({ slug }) => [
    `${SITE_URL}/p/${encodeURIComponent(slug)}`,
    'weekly',
    '0.9',
  ]);

  const extras = loadExtras();
  const extraUrls = [];
  for (const row of extras) {
    const s = row.slug.trim();
    if (!s || slugSet.has(s)) continue;
    slugSet.add(s);
    extraUrls.push([`${SITE_URL}/p/${encodeURIComponent(s)}`, 'weekly', '0.85']);
  }

  const all = [...staticUrls, ...productUrls, ...extraUrls];
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
  console.log(`Wrote ${outFile} (${all.length} URLs, ${slugEntries.length} local + ${extraUrls.length} extras)`);
}

main();
