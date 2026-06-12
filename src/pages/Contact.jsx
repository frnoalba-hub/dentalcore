import { Link } from 'react-router-dom';
import { companyInfo } from '@/components/dentalcore/productsData';
import { trackEngagementEvent } from '@/lib/trackEvent';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';

export default function Contact() {
  usePageSeo({
    variant: 'staticPage',
    staticPage: {
      title: `Contact Us | ${companyInfo.companyName}`,
      description: `Contact ${companyInfo.companyName} in Sacramento, CA — sales, orders, and clinical support for dental professionals. Call ${companyInfo.phone} or email ${companyInfo.email}.`,
      canonicalUrl: `${SITE_URL}/contact`,
    },
  });

  return (
    <main className="min-h-screen bg-[#FDFDFD]" style={{ paddingTop: 'var(--site-header-height)' }}>
      {/* Hero */}
      <section className="bg-[#111] text-white py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-semibold mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-white/25" />
            Get in Touch
          </p>
          <h1 className="text-5xl lg:text-7xl font-medium tracking-tighter uppercase leading-[1.05] text-white">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg text-white/55 font-body max-w-xl leading-relaxed">
            Our sales and clinical support team is based in Sacramento, CA. We typically respond within one business day.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5] rounded-card overflow-hidden mb-16">
            {/* Phone */}
            <div className="bg-white px-8 py-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-4">Phone</p>
              <a
                href={`tel:${companyInfo.phone}`}
                onClick={() => trackEngagementEvent('phone_click', { location: 'contact_page' })}
                className="text-2xl font-medium text-[#111] hover:text-accent transition-colors"
              >
                {companyInfo.phone}
              </a>
              <p className="text-sm text-[#111]/45 font-body mt-3 leading-relaxed">
                Mon – Fri, 9 am – 5 pm PT
              </p>
            </div>

            {/* Email */}
            <div className="bg-white px-8 py-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-4">Email</p>
              <a
                href={`mailto:${companyInfo.email}`}
                onClick={() => trackEngagementEvent('contact_click', { method: 'email', location: 'contact_page' })}
                className="text-xl font-medium text-[#111] hover:text-accent transition-colors break-all"
              >
                {companyInfo.email}
              </a>
              <p className="text-sm text-[#111]/45 font-body mt-3 leading-relaxed">
                Sales, orders, and clinical inquiries.
              </p>
            </div>

            {/* Address */}
            <div className="bg-white px-8 py-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-4">Headquarters</p>
              <p className="text-xl font-medium text-[#111]">{companyInfo.address}</p>
              <p className="text-sm text-[#111]/45 font-body mt-3 leading-relaxed">
                US shipping only. Not a walk-in location.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[
              { label: 'Track Your Order', desc: 'Look up your shipment status by order ID or email.', to: '/track-order' },
              { label: 'Shipping & Returns', desc: 'View our shipping timelines and return eligibility guidelines.', to: '/policies' },
              { label: 'DSOs & Group Practices', desc: 'Volume pricing and dedicated support for multi-location practices.', to: '/group-practices' },
            ].map(({ label, desc, to }) => (
              <Link
                key={to}
                to={to}
                className="block border border-[#E5E5E5] rounded-card px-6 py-6 hover:border-[#111] hover:shadow-card-hover transition-all group"
              >
                <p className="text-sm font-semibold text-[#111] uppercase tracking-tight group-hover:text-accent transition-colors">
                  {label} →
                </p>
                <p className="text-sm text-[#111]/50 font-body mt-2 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>

          {/* About link */}
          <div className="border-t border-[#E5E5E5] pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[#111]/50 font-body">
              Want to learn more about who we are?
            </p>
            <Link
              to="/about"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111] hover:text-accent transition-colors"
            >
              About Coretix →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}