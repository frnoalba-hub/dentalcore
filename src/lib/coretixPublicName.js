/**
 * Canonical public brand strings (Node + Vite safe — no JSX, no path aliases).
 * Import from here in modules that must run under plain Node (e.g. sitemap script).
 */

export const CORETIX_PUBLIC_ENTITY_NAME = 'Coretix Dental Supplies';
export const CORETIX_BRAND_SHORT = 'Coretix';
export const CORETIX_TAGLINE = 'Dental Supplies';

/** Header ticker — short motto (not the legal name); pairs with hero headline */
export const CORETIX_HEADER_TICKER_MOTTO_PLAIN = 'Better tools. Better care.';
export const CORETIX_HEADER_TICKER_MOTTO = `\u201C${CORETIX_HEADER_TICKER_MOTTO_PLAIN}\u201D`;

/**
 * Expands standalone "Coretix" to the full public entity name for SEO/AEO copy,
 * while preserving product line names like "Coretix AirPeak" / "Coretix iTesla".
 */
export function expandCoretixBrandForSeoCopy(text) {
  if (typeof text !== 'string' || !text) return text;
  const full = CORETIX_PUBLIC_ENTITY_NAME;
  let t = text.replace(/\bCoretix\b/g, full);
  t = t.replace(new RegExp(`${full} AirPeak`, 'g'), 'Coretix AirPeak');
  t = t.replace(new RegExp(`${full} iTesla`, 'g'), 'Coretix iTesla');
  return t;
}
