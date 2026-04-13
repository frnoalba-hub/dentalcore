import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import {
  BUYER_GUIDES,
  getGuideBySlug,
  getCategoryHubBySlug,
} from '@/lib/retailSeoContent';
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

export default function BuyerGuidePage() {
  const { guideSlug } = useParams();
  const guide = getGuideBySlug(guideSlug || '');

  const staticPage = useMemo(
    () =>
      guide
        ? {
            title: `${guide.title} | Cortex Supplies`,
            description: guide.description,
            canonicalUrl: `${SITE_URL}/guides/${guide.slug}`,
          }
        : {
            title: 'Buyer guide | Cortex Supplies',
            description: 'Buyer guide for dental procurement teams.',
            canonicalUrl: `${SITE_URL}/`,
          },
    [guide],
  );
  usePageSeo({ variant: 'staticPage', staticPage });

  const relatedCategories = useMemo(
    () =>
      guide
        ? guide.relatedCategorySlugs.map((slug) => getCategoryHubBySlug(slug)).filter(Boolean)
        : [],
    [guide],
  );
  const relatedGuides = useMemo(
    () => (guide ? BUYER_GUIDES.filter((candidate) => candidate.slug !== guide.slug).slice(0, 3) : []),
    [guide],
  );

  if (!guide) return <Navigate to="/" replace />;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    datePublished: guide.updatedAt,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'Cortex Supplies',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cortex Supplies',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
  };

  const faqSchema = guide.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <JsonLdSchema />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />
      <main className="pt-[104px] pb-24">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.24em] text-[#111]/40 font-semibold mb-3">Buyer Guide</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter text-[#111] leading-[1.08] max-w-5xl">
            {guide.title}
          </h1>
          <p className="mt-6 text-base text-[#111]/72 leading-relaxed max-w-3xl">
            {guide.intro}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#111]/45">
            Last updated: {formatUpdatedLabel(guide.updatedAt)}
          </p>

          <div className="mt-10 space-y-8">
            {guide.sections.map((section) => (
              <section key={section.heading} className="border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#111] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm sm:text-base text-[#111]/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {guide.faqs?.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-6">Guide FAQ</h2>
              <div className="space-y-4">
                {guide.faqs.map((faq) => (
                  <article key={faq.question} className="border border-[#111]/10 rounded-card bg-white shadow-card p-5">
                    <h3 className="text-sm font-semibold text-[#111] mb-2">{faq.question}</h3>
                    <p className="text-sm text-[#111]/70 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="mt-12 grid gap-4 md:grid-cols-2">
            <article className="border border-[#111]/10 rounded-card bg-white shadow-card p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#111]/45 mb-2">Related categories</p>
              <div className="space-y-2">
                {relatedCategories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/c/${category.slug}`}
                    className="block text-sm text-[#111] hover:text-accent transition-colors"
                  >
                    {category.categoryName} hub
                  </Link>
                ))}
              </div>
            </article>
            <article className="border border-[#111]/10 rounded-card bg-white shadow-card p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#111]/45 mb-2">More guides</p>
              <div className="space-y-2">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/guides/${related.slug}`}
                    className="block text-sm text-[#111] hover:text-accent transition-colors"
                  >
                    {related.title}
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
      <CartDrawer />
    </div>
  );
}

