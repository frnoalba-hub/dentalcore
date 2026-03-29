import { products, companyInfo } from '../dentalcore/productsData';

const SITE_URL = 'https://www.dentalcoreinstruments.com';

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
    "name": "Coretix — Premium Dental Instruments",
    "description": "Professional dental instruments, handpieces, endodontic supplies, curing lights, and surgical biomaterials at direct pricing.",
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

function buildProductSchemas() {
  return products.slice(0, 20).map((p) => {
    const price = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, ''));
    return {
      "@type": "Product",
      "name": p.name,
      "description": p.description,
      "image": p.image,
      "category": p.category,
      "sku": p.id,
      "brand": {
        "@type": "Brand",
        "name": "Coretix"
      },
      "offers": {
        "@type": "Offer",
        "url": `${SITE_URL}/product/${p.id}`,
        "priceCurrency": "USD",
        "price": price.toFixed(2),
        "availability": "https://schema.org/InStock",
        "seller": { "@id": `${SITE_URL}/#organization` }
      }
    };
  });
}

export default function JsonLdSchema() {
  const graph = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    ...buildProductSchemas()
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