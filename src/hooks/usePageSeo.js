import { useEffect } from 'react';
import { SITE_URL, absoluteUrl } from '@/lib/siteUrl';
import { productMetaGeoSuffix } from '@/lib/generativeOptimizationEngine';
import { companyInfo } from '@/components/dentalcore/productsData';

const DESC_MAX = 158;

/** Matches index.html defaults; home route resets head to these after product pages. */
export const DEFAULT_SEO = {
  title: companyInfo.companyName,
  description: `Shop professional dental instruments at ${companyInfo.companyName}. High-speed handpieces, endodontic systems, curing lights, bone graft materials & more. Direct pricing for dentists. Sacramento, CA.`,
  canonicalUrl: `${SITE_URL}/`,
  ogImage: `${SITE_URL}/og-coretix.png?v=3`,
};

function truncateDescription(text) {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= DESC_MAX) return t;
  return `${t.slice(0, DESC_MAX - 1).trim()}…`;
}

function setMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaByProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function applyHead({ title, description, canonicalUrl, ogImage, robots }) {
  document.title = title;
  const desc = truncateDescription(description);
  const metaDesc = document.head.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', desc);

  setMetaByProperty('og:title', title);
  setMetaByProperty('og:description', desc);
  setMetaByProperty('og:url', canonicalUrl);
  setMetaByProperty('og:image', ogImage);
  setMetaByName('twitter:title', title);
  setMetaByName('twitter:description', desc);
  setMetaByName('twitter:image', ogImage);
  setCanonical(canonicalUrl);

  const robotsMeta = document.head.querySelector('meta[name="robots"]');
  if (robotsMeta) {
    robotsMeta.setAttribute('content', robots || 'index, follow');
  }
}

/**
 * Client-side document head for SPA routes (title, description, canonical, OG/Twitter).
 * @param {'default' | 'product' | 'notFound' | 'staticPage'} variant
 * @param {{ title: string, description: string, canonicalUrl?: string }} [staticPage] — required when variant is staticPage
 */
export function usePageSeo({
  variant = 'default',
  productName,
  productSku,
  productDescription,
  canonicalUrl,
  ogImagePathOrUrl,
  robots,
  staticPage,
}) {
  useEffect(() => {
    if (variant === 'staticPage' && staticPage?.title && staticPage?.description) {
      applyHead({
        title: staticPage.title,
        description: staticPage.description,
        canonicalUrl: staticPage.canonicalUrl || DEFAULT_SEO.canonicalUrl,
        ogImage: ogImagePathOrUrl
          ? absoluteUrl(ogImagePathOrUrl) || DEFAULT_SEO.ogImage
          : DEFAULT_SEO.ogImage,
        robots: robots || 'index, follow',
      });
      return () => {
        applyHead({
          title: DEFAULT_SEO.title,
          description: DEFAULT_SEO.description,
          canonicalUrl: DEFAULT_SEO.canonicalUrl,
          ogImage: DEFAULT_SEO.ogImage,
          robots: 'index, follow',
        });
      };
    }

    if (variant === 'default') {
      applyHead({
        title: DEFAULT_SEO.title,
        description: DEFAULT_SEO.description,
        canonicalUrl: canonicalUrl || DEFAULT_SEO.canonicalUrl,
        ogImage: ogImagePathOrUrl
          ? absoluteUrl(ogImagePathOrUrl) || DEFAULT_SEO.ogImage
          : DEFAULT_SEO.ogImage,
        robots: 'index, follow',
      });
      return;
    }

    if (variant === 'notFound') {
      applyHead({
        title: `Product not found | ${companyInfo.companyName}`,
        description: DEFAULT_SEO.description,
        canonicalUrl: canonicalUrl || DEFAULT_SEO.canonicalUrl,
        ogImage: DEFAULT_SEO.ogImage,
        robots: 'noindex, follow',
      });
      return () => {
        applyHead({
          title: DEFAULT_SEO.title,
          description: DEFAULT_SEO.description,
          canonicalUrl: DEFAULT_SEO.canonicalUrl,
          ogImage: DEFAULT_SEO.ogImage,
          robots: 'index, follow',
        });
      };
    }

    if (variant === 'product' && productName && productSku) {
      const title = `${productName} | ${productSku} | ${companyInfo.brandShort}`;
      const baseDesc =
        productDescription ||
        `Buy ${productName} (${productSku}) — professional dental supply from ${companyInfo.companyName}, Sacramento CA.`;
      const description = `${baseDesc.replace(/\s+/g, ' ').trim()}${productMetaGeoSuffix()}`;
      const canon = canonicalUrl || DEFAULT_SEO.canonicalUrl;
      const og =
        absoluteUrl(ogImagePathOrUrl) || DEFAULT_SEO.ogImage;
      applyHead({
        title,
        description,
        canonicalUrl: canon,
        ogImage: og,
        robots: robots || 'index, follow',
      });
      return () => {
        applyHead({
          title: DEFAULT_SEO.title,
          description: DEFAULT_SEO.description,
          canonicalUrl: DEFAULT_SEO.canonicalUrl,
          ogImage: DEFAULT_SEO.ogImage,
          robots: 'index, follow',
        });
      };
    }
  }, [
    variant,
    productName,
    productSku,
    productDescription,
    canonicalUrl,
    ogImagePathOrUrl,
    robots,
    staticPage,
  ]);
}
