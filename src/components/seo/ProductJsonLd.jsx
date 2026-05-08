import { SITE_URL, absoluteUrl, productPageUrl } from '../../lib/siteUrl';
import { companyInfo } from '../dentalcore/productsData';
import { parseYouTubeVideoId, youtubeEmbedUrl, youtubeWatchUrl } from '@/lib/youtubeEmbed';

/** Merchant Center-compatible return policy. */
function merchantReturnPolicyBlock() {
  return {
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/ReturnShippingFees',
      merchantReturnLink: `${SITE_URL}/policies`,
    },
  };
}

/**
 * Free US standard shipping. Orders are usually submitted same day and shipped next business day.
 */
function shippingDetailsBlock() {
  return {
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0.00',
        currency: 'USD',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'US',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 1,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 3,
          maxValue: 10,
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
  const pageUrl = productPageUrl(product);
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
  const fullDescription = [product.description, product.longDescription]
    .filter(Boolean)
    .join(' ')
    .trim();
  const productNode = {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: product.name,
    description: fullDescription || product.name,
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

  const webPageDescription = (fullDescription || product.name).slice(0, 400);
  const webPageNode = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: product.name,
    description: webPageDescription,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${pageUrl}#product` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
  if (deduped[0]) {
    webPageNode.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: deduped[0],
    };
  }

  const graph = [productNode, webPageNode];
  const youtubeId = product.videoUrl ? parseYouTubeVideoId(product.videoUrl) : null;
  if (youtubeId) {
    const videoNode = {
      '@type': 'VideoObject',
      '@id': `${pageUrl}#video`,
      name: product.videoTitle || `${product.name} — overview`,
      description: webPageDescription,
      thumbnailUrl: deduped[0] || undefined,
      contentUrl: youtubeWatchUrl(youtubeId),
      embedUrl: youtubeEmbedUrl(youtubeId),
      publisher: { '@id': `${SITE_URL}/#organization` },
      isAccessibleForFree: true,
      inLanguage: 'en-US',
    };
    graph.push(videoNode);
    productNode.subjectOf = { '@id': `${pageUrl}#video` };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
