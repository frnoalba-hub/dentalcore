import { CORETIX_PUBLIC_ENTITY_NAME } from './coretixPublicName.js';

/**
 * Canonical public business contact — keep aligned with `productsData.jsx` `companyInfo`.
 * Used as contentStore defaults before remote content loads.
 */
export const canonicalBusinessInfo = {
  name: CORETIX_PUBLIC_ENTITY_NAME,
  phone: '(626) 268-3946',
  email: 'sales@dentalcoreinstruments.com',
  location: 'Sacramento, CA',
};
