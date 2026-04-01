import { products, companyInfo } from '../dentalcore/productsData';
import { SITE_URL, productPageUrl, absoluteUrl } from '../../lib/siteUrl';

function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": companyInfo.companyName,
    "url": SITE_URL,
    "email": companyInfo.email,
    "telephone": companyInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2108 N St Ste N",
      "addressLocality": "Sacramento",
      "addressRegion": "CA",
      "postalCode": "95816",
      "addressCountry": "US"
    },
    "sameAs": []
  };
}

function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Coretix",
    "description": "Professional dental instruments, handpieces, endodontic supplies, curing lights, and surgical biomaterials at direct pricing.",
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
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
    "name": "Coretix product catalog",
    "numberOfItems": products.length,
    "itemListElement": products.map((p, i) => {
      const img = absoluteUrl(p.image);
      const item = {
        "@type": "WebPage",
        "name": p.name,
        "url": productPageUrl(p.id),
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