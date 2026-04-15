import { products, companyInfo } from '../dentalcore/productsData';
import { SITE_URL, productPageUrl, absoluteUrl } from '../../lib/siteUrl';
import {
  organizationDescriptionForSchema,
  knowsAboutTopicsForSchema,
  areaServedForSchema,
  websiteDescriptionForSchema,
} from '@/lib/generativeOptimizationEngine';

function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": companyInfo.companyName,
    "alternateName": companyInfo.brandShort,
    "url": SITE_URL,
    "email": companyInfo.email,
    "telephone": companyInfo.phone,
    "description": organizationDescriptionForSchema,
    "knowsAbout": knowsAboutTopicsForSchema,
    "areaServed": areaServedForSchema,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sacramento",
      "addressRegion": "CA",
      "postalCode": "95816",
      "addressCountry": "US",
    },
    "sameAs": [],
  };
}

function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": companyInfo.companyName,
    "inLanguage": "en-US",
    "description": websiteDescriptionForSchema,
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "about": { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * Homepage ItemList entries use WebPage, not Product. Nested Product here made Google
 * treat each row as a product rich result and flag missing aggregateRating / review.
 * Full Product + Offer JSON-LD lives on each product route (ProductJsonLd).
 */
function buildCatalogItemListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#catalog-itemlist`,
    "name": `${companyInfo.companyName} product catalog`,
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => {
      const img = absoluteUrl(p.image);
      const item = {
        "@type": "WebPage",
        "name": p.name,
        "url": productPageUrl(p),
      };
      if (img) item.image = img;
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": item,
      };
    }),
  };
}

export default function JsonLdSchema() {
  const graph = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildCatalogItemListSchema(),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}