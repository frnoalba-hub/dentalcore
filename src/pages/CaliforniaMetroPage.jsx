import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import { companyInfo } from '@/components/dentalcore/productsData';
import { getServiceAreaBySlug, getServiceAreaPageSeo } from '@/lib/californiaServiceAreas';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';
import { trackEngagementEvent } from '@/lib/trackEvent';

export default function CaliforniaMetroPage() {
  const { metroSlug } = useParams();
  const area = getServiceAreaBySlug(metroSlug || '');

  const staticPage = useMemo(
    () =>
      area
        ? getServiceAreaPageSeo(area, SITE_URL)
        : {
            title: `California dental supplier | ${companyInfo.companyName}`,
            description: `Dental supply with local support from ${companyInfo.companyName}.`,
            canonicalUrl: `${SITE_URL}/california`,
          },
    [area],
  );

  usePageSeo({ variant: 'staticPage', staticPage });

  if (!area) return <Navigate to="/california" replace />;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: `${SITE_URL}/california/${area.slug}`,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${companyInfo.companyName} ${area.regionName} local support`,
    description: area.description,
    url: `${SITE_URL}/california/${area.slug}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: area.cities.map((city) => ({ '@type': 'City', name: city })),
    serviceType: 'Dental supply sales with in-person demos and consultations',
  };

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <JsonLdSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <main className="pt-[var(--site-header-height)] pb-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#111]/40 font-semibold mb-3">
            <Link to="/california" className="hover:text-[#111] transition-colors">
              California
            </Link>
            {' / '}
            {area.shortName}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] max-w-4xl leading-[1.08]">
            {area.regionName} dental supplier with local support
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            {area.lead}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#111]/45">
            Updated: {area.updatedAt}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${companyInfo.email}?subject=Schedule a visit — ${area.regionName}`}
              onClick={() =>
                trackEngagementEvent('contact_click', {
                  method: 'email',
                  location: `california_${area.slug}`,
                })
              }
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#111] text-white hover:bg-[#111]/90 transition-colors rounded-sm"
            >
              Schedule a visit
            </a>
            <Link
              to="/#catalog"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase border border-[#111]/20 text-[#111] hover:border-[#111]/40 transition-colors rounded-sm"
            >
              Browse products
            </Link>
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              onClick={() =>
                trackEngagementEvent('phone_click', {
                  event_category: 'engagement',
                  location: `california_${area.slug}`,
                })
              }
              className="text-sm text-[#111]/60 font-body hover:text-[#111] transition-colors"
            >
              {companyInfo.phone}
            </a>
          </div>

          <section className="mt-12 border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8 max-w-3xl">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111] mb-4">
              Why {area.shortName} practices choose {companyInfo.companyName}
            </h2>
            <p className="text-sm text-[#111]/70 font-body leading-relaxed">
              {area.localValueProp}
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111] mb-4">
              Cities we serve in the {area.regionName}
            </h2>
            <div className="flex flex-wrap gap-2">
              {area.cities.map((city) => (
                <span
                  key={city}
                  className="inline-block px-3 py-1.5 text-xs font-semibold tracking-wide uppercase border border-[#111]/10 rounded-sm bg-white text-[#111]/70"
                >
                  {city}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12 border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8 max-w-3xl">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111] mb-5">
              What we offer {area.shortName} dental offices
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  In-person demos
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  A {companyInfo.companyName} representative visits your {area.shortName} practice with
                  handpieces, curing lights, and instruments for hands-on evaluation in your operatory.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Direct pricing
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  No distributor markup. AirPeak titanium high-speed handpieces from $399, bone graft
                  syringes from $48, curing lights from $599. Same prices online and in person.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Product consultation
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  Compare handpiece systems, evaluate bone graft options, or plan equipment
                  standardization across operatories — with a representative who knows the products.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  DSO &amp; group support
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  Multi-location {area.shortName} practices can coordinate procurement, standardize SKUs,
                  and get volume pricing through a single local vendor relationship.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-6">
              {area.regionName} FAQ
            </h2>
            <div className="space-y-4 max-w-4xl">
              {area.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="border border-[#111]/10 bg-white rounded-card p-5 shadow-card"
                >
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
