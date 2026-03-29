import { products, companyInfo } from '../dentalcore/productsData';

const SITE_URL = 'https://www.dentalcoreinstruments.com';

function buildOrganizationSchema() {
  return {
    "@type": ["MedicalBusiness", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    "name": companyInfo.companyName,
    "url": SITE_URL,
    "logo": "https://base44.com/logo_v2.svg",
    "email": companyInfo.email,
    "telephone": companyInfo.phone,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": companyInfo.phone,
      "contactType": "customer service",
      "email": companyInfo.email,
      "availableLanguage": "English"
    },
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
    
    const reviews = p.reviews || [];
    const ratingCount = reviews.length > 0 ? reviews.length : 1;
    const ratingValue = reviews.length > 0 
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

    const schema = {
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
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": ratingCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    if (reviews.length > 0) {
      schema.review = reviews.map(r => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.rating ? String(r.rating) : "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": r.author || "Customer"
        }
      }));
    } else {
      schema.review = {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Verified Buyer"
        }
      };
    }

    return schema;
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