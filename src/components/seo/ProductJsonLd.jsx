import { SITE_URL, absoluteUrl, productPageUrl } from '../../lib/siteUrl';
import { companyInfo } from '../dentalcore/productsData';

/** Return policy link matches ContactSection (#shipping-returns). */
function merchantReturnPolicyBlock() {
  return {
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnLink: `${SITE_URL}/#shipping-returns`,
    },
  };
}

/**
 * Handling/transit windows match on-page shipping copy (not a guaranteed price).
 * Omit shippingRate — actual charges are at checkout or sales quote.
 */
function shippingDetailsBlock() {
  return {
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'US',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 2,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 3,
          maxValue: 7,
          unitCode: 'DAY',
        },
      },
    },
  };
}

function parsePrice(p) {
  if (typeof p.price === 'number' && !Number.isNaN(p.price)) return p.price;
  const n = parseFloat(String(p.price ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Single Product + Offer(s) for the active product detail route.
 * aggregateRating is omitted unless present on the product object (visible reviews required by Google).
 */
export default function ProductJsonLd({ product, allImages }) {
  const pageUrl = productPageUrl(product.id);
  const imageList = (allImages || [])
    .map(absoluteUrl)
    .filter(Boolean);
  const deduped = [...new Set(imageList)];

  let offers;
  if (product.variants?.length) {
    const prices = product.variants.map((v) =>
      typeof v.price === 'number' ? v.price : parsePrice(v)
    );
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    offers = {
      '@type': 'AggregateOffer',
      url: pageUrl,
      priceCurrency: 'USD',
      lowPrice: low.toFixed(2),
      highPrice: high.toFixed(2),
      offerCount: product.variants.length,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
      ...shippingDetailsBlock(),
      ...merchantReturnPolicyBlock(),
    };
  } else {
    const price = parsePrice(product);
    offers = {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'USD',
      price: price.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
      ...shippingDetailsBlock(),
      ...merchantReturnPolicyBlock(),
    };
  }

  const sku = product.sku || product.id;
  const productNode = {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: product.name,
    description: product.description || product.name,
    sku,
    brand: { '@type': 'Brand', name: companyInfo.companyName },
    offers,
  };

  if (product.mpn) productNode.mpn = String(product.mpn);
  if (product.gtin) {
    const g = String(product.gtin).replace(/\D/g, '');
    if (g.length === 12 || g.length === 13 || g.length === 14) productNode.gtin = g;
  }

  if (product.category) productNode.category = product.category;
  if (deduped.length === 1) productNode.image = deduped[0];
  else if (deduped.length > 1) productNode.image = deduped;

  if (product.aggregateRating) {
    productNode.aggregateRating = product.aggregateRating;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [productNode],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
