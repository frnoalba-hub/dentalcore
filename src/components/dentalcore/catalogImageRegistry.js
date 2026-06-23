/**
 * Resolves product hero images for API / full_catalog SKUs.
 * Normalizes legacy /product_images/… paths to /products/{filename} (what actually deploys).
 */
import fullCatalog from './full_catalog.json';

function publicProductImage(fileName) {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}products/${encodeURIComponent(fileName)}`;
}

/** Filenames that differ from full_catalog paths or use # in the name. */
const SKU_IMAGE_FILE = {
  '1006-1': 'UC_CUT_Full_Device_1006-1.jpg',
  '1006-Full Kit': 'UC_CUT_Gutta_Purcha_Cutter_INFO_1006-1.png',
  '1006-2': 'UC_CUT_Gutta_Purcha_Cutter_Tip_1006-2.jpg',
  '1006-3': 'UC_CUT_Gutta_Purcha_Cutter_Tip_#110_1006-3.jpg',
  '1006-4': 'UC_CUT_Tip_SB_1006-4.png',
  '1006-5': 'UC_CUT_Gutta_Purcha_Cutter_-Tips_F_1006-5.png',
  '1006-6': 'UC_CUT_Gutta_Purcha_Cutter_-Tips_FM_1006-6.png',
  '1006-7': 'UC_CUT_Tip_B8_1006-7.png',
  '1006-8': 'UC_CUT_Tip_B2_1006-8.png',
  '1006-9': 'UC_CUT_Stand_1006-9.png',
  A1004-V2: 'AIRPEAK_A1004-V2.jpg',
  A1005: 'AIRPEAK_A1005.jpg',
  A1006: 'AIRLED_A1006.jpg',
  A1007: 'AIRLED_A1007.jpg',
  A1009B: 'AIRPEAK_A1009B.jpg',
  A1009C: 'AIRPEAK_A1009C.jpg',
  A1012: 'AIRPEAK_A1012.jpg',
  A1016: 'AIRPEAK_A1016.jpg',
  A1017: 'AIRPEAK_A1017.jpg',
  A1018: 'AIRPEAK_A1018.jpg',
  A1043: 'AIRPEAK_A1043.jpg',
};

function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const fileName = decodeURIComponent(url.split('/').pop() || '');
  if (!fileName) return '';
  return publicProductImage(fileName);
}

const REGISTRY = new Map();

for (const [sku, file] of Object.entries(SKU_IMAGE_FILE)) {
  REGISTRY.set(sku, publicProductImage(file));
}

for (const row of fullCatalog) {
  if (!row?.id) continue;
  const id = String(row.id).trim();
  if (REGISTRY.has(id)) continue;
  if (row.image) REGISTRY.set(id, normalizeImageUrl(row.image));
}

export function lookupCatalogImage(idOrSku) {
  if (!idOrSku) return '';
  const key = String(idOrSku).trim();
  return REGISTRY.get(key) || REGISTRY.get(key.toUpperCase()) || '';
}
