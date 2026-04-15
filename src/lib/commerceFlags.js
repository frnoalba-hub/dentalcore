/**
 * Set VITE_CHECKOUT_DISABLED=true to turn off payment (catalog / lead-gen only).
 * Cart and catalog still work; Pay button shows a contact-sales message instead.
 */
export function isCheckoutEnabled() {
  const v = String(import.meta.env.VITE_CHECKOUT_DISABLED ?? '').toLowerCase();
  return v !== 'true' && v !== '1';
}
