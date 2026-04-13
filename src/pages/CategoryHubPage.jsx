import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import {
  getCategoryHubBySlug,
  BUYER_GUIDES,
} from '@/lib/retailSeoContent';
import { products as localProducts, getCatalogProductImage } from '@/components/dentalcore/productsData';
import { productRelativePath } from '@/lib/productPaths';
import { SITE_URL } from '@/lib/siteUrl';
import { usePageSeo } from '@/hooks/usePageSeo';

function formatUpdatedLabel(dateString) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CategoryHubPage() {
  const { categorySlug } = useParams();
  const hub = getCategoryHubBySlug(categorySlug || '');
  const products = useMemo(
    () => (hub ? localProducts.filter((p) => p.category === hub.categoryName) : []),
    [hub],
  );
  const guides = useMemo(
    () => (hub ? BUYER_GUIDES.filter((guide) => hub.guideSlugs.includes(guide.slug)) : []),
    [hub],
  );

  const staticPage = useMemo(
    () =>
      hub
        ? {
            title: hub.title,
            description: hub.description,
            canonicalUrl: `${SITE_URL}/c/${hub.slug}`,
          }
        : {
            title: 'Category | Coretix',
            description: 'Dental product category at Coretix.',
            canonicalUrl: `${SITE_URL}/`,
          },
    [hub],
  );

  usePageSeo({ variant: 'staticPage', staticPage });

  if (!hub) return <Navigate to="/" replace />;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: `${SITE_URL}/c/${hub.slug}`,
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${hub.categoryName} products`,
    numberOfItems: products.length,
    itemListElement: products.map((product, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `${SITE_URL}${productRelativePath(product)}`,
      },
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.title,
    description: hub.description,
    url: `${SITE_URL}/c/${hub.slug}`,
    inLanguage: 'en-US',
    dateModified: hub.updatedAt,
    hasPart: products.map((product) => ({
      '@type': 'WebPage',
      name: product.name,
      url: `${SITE_URL}${productRelativePath(product)}`,
    })),
  };

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <JsonLdSchema />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main className="pt-[100px] pb-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/40 font-semibold mb-3">
            Category Hub
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] max-w-4xl leading-[1.08]">
            {hub.categoryName} at Coretix
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            {hub.lead}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#111]/45">
            Last updated: {formatUpdatedLabel(hub.updatedAt)}
          </p>

          <section className="mt-12 border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111] mb-5">
              How to choose
            </h2>
            <dl className="space-y-4">
              {hub.howToChoose.map((row) => (
                <div key={row.key}>
                  <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">{row.key}</dt>
                  <dd className="text-sm text-[#111]/70 font-body leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-12">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111]">
                {hub.categoryName} products
              </h2>
              <Link
                to="/#catalog"
                className="text-xs uppercase tracking-widest text-accent hover:text-[#111] transition-colors"
              >
                View full catalog
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[#111]/10">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={productRelativePath(product)}
                  className="block border-r border-b border-[#111]/10 bg-white hover:bg-[#FAFAFA] transition-colors p-5"
                >
                  <div className="aspect-square bg-[#F7F7F7] border border-[#111]/10 rounded-sm p-4 mb-4">
                    <img
                      src={getCatalogProductImage(product)}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#111]/45 mb-1">{product.id}</p>
                  <h3 className="text-sm font-semibold text-[#111] leading-snug">{product.name}</h3>
                  <p className="mt-2 text-xs text-[#111]/60 line-clamp-2">{product.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-6">
              Buyer guides
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  to={`/guides/${guide.slug}`}
                  className="border border-[#111]/10 rounded-card bg-white shadow-card p-6 hover:border-[#111]/25 transition-colors"
                >
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#111]/45 mb-2">Guide</p>
                  <h3 className="text-base font-semibold tracking-tight text-[#111] mb-2">{guide.title}</h3>
                  <p className="text-sm text-[#111]/65 leading-relaxed">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-6">
              Category FAQ
            </h2>
            <div className="space-y-4 max-w-4xl">
              {hub.faqs.map((faq) => (
                <article key={faq.question} className="border border-[#111]/10 bg-white rounded-card p-5 shadow-card">
                  <h3 className="text-sm font-semibold text-[#111] mb-2">{faq.question}</h3>
                  <p className="text-sm text-[#111]/70 font-body leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <CartDrawer />
    </div>
  );
}

