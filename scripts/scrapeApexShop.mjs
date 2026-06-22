/**
 * Sync targeted ApexDent collections into Dentalcore full_catalog.json.
 *
 * Target collections requested by owner:
 * - Scaling (Shopify handle: ergo)
 * - Restorative (spident)
 * - Overdenture (overdenture)
 * - Regenerative (regenerative)
 * - Multi Unit (multi-unit)
 *
 * Run from dentalcore/: node scripts/scrapeApexShop.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'src/components/dentalcore/full_catalog.json');
const SUPPLEMENT_PATH = path.join(ROOT, 'src/components/dentalcore/apex_shop_supplement.json');
const OUT_REPORT = path.join(ROOT, 'scripts/apex_shop_scrape_report.json');

const TARGET_COLLECTIONS = [
  { handle: 'ergo', category: 'Scaling' },
  { handle: 'spident', category: 'Restorative' },
  { handle: 'overdenture', category: 'Overdenture' },
  { handle: 'regenerative', category: 'Regenerative' },
  { handle: 'multi-unit', category: 'Multi Unit' },
];

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function getHandleFromShopUrl(row) {
  return String(row?.shopUrl || '').split('/products/')[1] || '';
}

function variantImageMap(product) {
  const byId = new Map();
  for (const img of product.images || []) {
    if (img?.id) byId.set(String(img.id), img.src);
  }
  return byId;
}

function toCatalogProduct(product, category, collectionHandle) {
  const imageById = variantImageMap(product);
  const variants = (product.variants || []).map((v) => ({
    id: String(v.sku || '').trim() || `${product.handle}-${v.id}`,
    sku: String(v.sku || '').trim(),
    name: v.title && v.title !== 'Default Title' ? `${product.title} — ${v.title}` : product.title,
    price: toNumber(v.price),
    compareAt: v.compare_at_price ? toNumber(v.compare_at_price) : null,
    image: v.image_id ? imageById.get(String(v.image_id)) || '' : '',
  }));

  const variantPrices = variants
    .map((v) => v.price)
    .filter((p) => Number.isFinite(p) && p > 0);
  const minPrice = variantPrices.length ? Math.min(...variantPrices) : 0;

  return {
    id: variants[0]?.id || product.handle || String(product.id),
    name: product.title,
    category,
    description: stripHtml(product.body_html).slice(0, 1000) || product.title,
    price: minPrice,
    image: product.images?.[0]?.src || '',
    source: 'ApexShop',
    shopUrl: `https://theapexshop.com/products/${product.handle}`,
    vendor: product.vendor || 'Apexdent',
    tags: String(product.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    apexCollection: collectionHandle,
    ...(variants.length > 1 ? { variants } : {}),
  };
}

async function fetchCollectionProducts(handle) {
  const url = `https://theapexshop.com/collections/${handle}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed for ${handle}: ${res.status}`);
  const data = await res.json();
  return data.products || [];
}

async function getTargetCatalogRows() {
  const byHandle = new Map();
  const overlaps = [];

  for (const c of TARGET_COLLECTIONS) {
    const products = await fetchCollectionProducts(c.handle);
    for (const p of products) {
      if (!byHandle.has(p.handle)) {
        byHandle.set(p.handle, { product: p, category: c.category, collectionHandle: c.handle });
      } else {
        const existing = byHandle.get(p.handle);
        overlaps.push({
          handle: p.handle,
          title: p.title,
          keptCategory: existing.category,
          ignoredCategory: c.category,
        });
      }
    }
  }

  const rows = Array.from(byHandle.values()).map(({ product, category, collectionHandle }) =>
    toCatalogProduct(product, category, collectionHandle),
  );

  return { rows, overlaps };
}

function syncCatalog(existingCatalog, targetRows) {
  const targetByHandle = new Map();
  for (const row of targetRows) {
    const handle = getHandleFromShopUrl(row);
    if (handle) targetByHandle.set(handle, row);
  }

  const seenHandles = new Set();
  let updatedExistingCount = 0;
  const nextCatalog = existingCatalog.map((row) => {
    const handle = getHandleFromShopUrl(row);
    if (!handle || !targetByHandle.has(handle)) return row;
    seenHandles.add(handle);
    updatedExistingCount += 1;
    return targetByHandle.get(handle);
  });

  const addedRows = [];
  for (const [handle, row] of targetByHandle.entries()) {
    if (seenHandles.has(handle)) continue;
    nextCatalog.push(row);
    addedRows.push(row);
  }

  return { nextCatalog, addedRows, updatedExistingCount };
}

async function main() {
  const existingCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const { rows: targetRows, overlaps } = await getTargetCatalogRows();
  const { nextCatalog, addedRows, updatedExistingCount } = syncCatalog(existingCatalog, targetRows);

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(nextCatalog, null, 2));
  fs.writeFileSync(SUPPLEMENT_PATH, JSON.stringify(targetRows, null, 2));

  const byCategory = {};
  for (const row of targetRows) {
    byCategory[row.category] = (byCategory[row.category] || 0) + 1;
  }

  const report = {
    scrapedAt: new Date().toISOString(),
    shopUrl: 'https://theapexshop.com/',
    targetCollections: TARGET_COLLECTIONS,
    targetedProductCount: targetRows.length,
    updatedExistingCount,
    addedMissingCount: addedRows.length,
    totalCatalogCount: nextCatalog.length,
    categoryBreakdown: byCategory,
    overlapCount: overlaps.length,
    overlapSample: overlaps.slice(0, 20),
    addedSample: addedRows.slice(0, 40).map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      price: row.price,
      shopUrl: row.shopUrl,
    })),
  };
  fs.writeFileSync(OUT_REPORT, JSON.stringify(report, null, 2));

  console.log(`Targeted Apex products: ${targetRows.length}`);
  console.log(`Updated existing rows: ${updatedExistingCount}`);
  console.log(`Added missing rows: ${addedRows.length}`);
  console.log(`Total full catalog: ${nextCatalog.length}`);
  console.log(`Supplement file: ${SUPPLEMENT_PATH}`);
  console.log(`Report file: ${OUT_REPORT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
