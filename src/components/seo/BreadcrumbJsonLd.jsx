import { SITE_URL, productPageUrl } from '@/lib/siteUrl';

/**
 * BreadcrumbList for product detail. Catalog/category share `/#catalog` (no per-category URLs yet).
 */
export default function BreadcrumbJsonLd({ categoryLabel, productName, productId }) {
  const catalogUrl = `${SITE_URL}/#catalog`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catalog',
        item: catalogUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryLabel || 'Products',
        item: catalogUrl,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: productName,
        item: productPageUrl(productId),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
