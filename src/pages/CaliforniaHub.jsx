import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import { companyInfo } from '@/components/dentalcore/productsData';
import { SERVICE_AREAS, getCaliforniaHubSeo } from '@/lib/californiaServiceAreas';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';
import { trackEngagementEvent } from '@/lib/trackEvent';

export default function CaliforniaHub() {
  const staticPage = useMemo(() => getCaliforniaHubSeo(companyInfo, SITE_URL), []);
  usePageSeo({ variant: 'staticPage', staticPage });

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${companyInfo.companyName} California local support`,
    description: staticPage.description,
    url: `${SITE_URL}/california`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: SERVICE_AREAS.flatMap((area) =>
      area.cities.map((city) => ({ '@type': 'City', name: city })),
    ),
    serviceType: 'Dental supply sales with in-person demos and consultations',
  };

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <JsonLdSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main className="pt-[var(--site-header-height)] pb-20 lg:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#111]/40 mb-3">
            Local support
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] max-w-4xl leading-[1.08]">
            California dental supplier with in-person support
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            {companyInfo.companyName} is a California-based dental supplier that combines an online
            catalog with something most online suppliers cannot offer: a local representative who
            visits your office. We provide in-person product demos, consultations, and hands-on
            support for dental practices across California — while shipping nationwide to every US
            dental office.
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            Whether you need to evaluate a handpiece before buying, compare bone graft options with a
            knowledgeable rep, or standardize equipment across multiple locations, {companyInfo.companyName} brings
            the product to you — at direct pricing with no distributor markup.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href={`mailto:${companyInfo.email}?subject=Schedule a visit`}
              onClick={() =>
                trackEngagementEvent('contact_click', {
                  method: 'email',
                  location: 'california_hub',
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
                  location: 'california_hub',
                })
              }
              className="text-sm text-[#111]/60 font-body hover:text-[#111] transition-colors"
            >
              {companyInfo.phone}
            </a>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-8">
              Regions we serve in person
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICE_AREAS.map((area) => (
                <Link
                  key={area.slug}
                  to={`/california/${area.slug}`}
                  className="border border-[#111]/10 rounded-card bg-white shadow-card p-6 hover:border-[#111]/25 transition-colors"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#111]/45 mb-2">
                    {area.shortName}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-[#111] mb-3">
                    {area.regionName}
                  </h3>
                  <p className="text-sm text-[#111]/65 leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <p className="text-xs text-[#111]/50 font-body leading-relaxed">
                    {area.cities.join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16 border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8 max-w-3xl">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#111] mb-5">
              Why local matters for dental supply
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Hands-on evaluation
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  Try handpieces, curing lights, and instruments in your operatory before committing.
                  No guessing from a catalog photo.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Direct pricing + personal service
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  Traditional distributors charge markup for rep visits. {companyInfo.companyName} offers direct
                  pricing and a local rep — you get both, not one or the other.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Multi-location coordination
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  DSOs and group practices across California can standardize instruments with one local
                  vendor relationship instead of juggling regional distributor contracts.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.15em] text-[#111]/55 font-semibold mb-1">
                  Nationwide catalog, California roots
                </dt>
                <dd className="text-sm text-[#111]/70 font-body leading-relaxed">
                  Every product ships to any US dental office. California practices get the added
                  benefit of in-person support from a representative who knows the local market.
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </main>
    </div>
  );
}
