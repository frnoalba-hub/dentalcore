import { productRelativePath } from './productPaths';

/** Canonical origin (must match index.html rel=canonical). */
export const SITE_URL = 'https://www.dentalcoreinstruments.com';

/** Turn a site path or absolute URL into a full https URL for JSON-LD. */
export function absoluteUrl(path) {
  if (path == null || path === '') return undefined;
  const trimmed = String(path).trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const base = SITE_URL.replace(/\/$/, '');
  const p = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${base}${p}`;
}

/**
 * Canonical HTTPS URL for a product detail page (`/p/{slug}`).
 * @param {object} product — catalog row with `id` (and usually `slug` from productsData or Base44).
 */
export function productPageUrl(product) {
  if (!product || typeof product !== 'object' || product.id == null || product.id === '') {
    const base = SITE_URL.replace(/\/$/, '');
    return `${base}/`;
  }
  const base = SITE_URL.replace(/\/$/, '');
  return `${base}${productRelativePath(product)}`;
}

/** Legacy query URL (only for redirects / external bookmarks). */
export function legacyProductQueryUrl(productId) {
  return `${SITE_URL.replace(/\/$/, '')}/product?id=${encodeURIComponent(productId)}`;
}
