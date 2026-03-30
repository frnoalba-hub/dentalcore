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

export function productPageUrl(productId) {
  return `${SITE_URL}/product?id=${encodeURIComponent(productId)}`;
}
