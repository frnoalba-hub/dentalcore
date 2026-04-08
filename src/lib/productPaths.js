import { products as localProducts } from '@/components/dentalcore/productsData';

/**
 * URL policy: one canonical page per catalog card (parent product).
 * Variants (e.g. OsseoSeal sizes) are selected on the same /p/{slug} page — no per-variant URLs.
 */

/** Local catalog id → slug (explicit slugs in productsData). */
const localIdToSlug = new Map(
  localProducts.filter((p) => p.slug).map((p) => [p.id, p.slug])
);

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-+/g, '-');
}

function idToSlugSegment(id) {
  return String(id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

/**
 * Stable public slug for any catalog row (local or Base44).
 * Prefer explicit `product.slug`, then local registry, then name+id fallback (API-only SKUs).
 */
export function getProductSlug(product) {
  if (!product) return null;
  if (product.slug) return product.slug;
  const registered = localIdToSlug.get(product.id);
  if (registered) return registered;
  const namePart = slugify(product.name);
  const idPart = idToSlugSegment(product.id);
  if (namePart) return `${namePart}-${idPart}`.slice(0, 96);
  return `item-${idPart}`;
}

/** In-app path: `/p/{slug}` */
export function productRelativePath(product) {
  const s = getProductSlug(product);
  if (!s) return '/';
  return `/p/${encodeURIComponent(s)}`;
}
