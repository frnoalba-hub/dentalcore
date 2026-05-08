import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import JsonLdSchema from '@/components/seo/JsonLdSchema';
import { companyInfo } from '@/components/dentalcore/productsData';
import {
  getGroupPracticesPageSeo,
  groupPracticeSourcingDiscoveryParagraph,
} from '@/lib/generativeOptimizationEngine';
import { usePageSeo } from '@/hooks/usePageSeo';
import { trackEngagementEvent } from '@/lib/trackEvent';

export default function GroupPractices() {
  const staticPage = useMemo(() => getGroupPracticesPageSeo(), []);
  usePageSeo({ variant: 'staticPage', staticPage });

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <JsonLdSchema />
      <Header />
      <main className="pt-[var(--site-header-height)] pb-20 lg:pb-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#111]/40 mb-3">
            Procurement
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] max-w-3xl leading-[1.08]">
            Dental service organizations &amp; multi-location practices
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            {companyInfo.companyName} supplies licensed US dental teams with professional handpieces, endodontic systems,
            biomaterials, curing lights, and chairside equipment, with free standard shipping on US orders.
            DSOs and multi-location groups may review our catalog and contact sales for volume or consolidated
            orders.
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            {groupPracticeSourcingDiscoveryParagraph()}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              to="/#catalog"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#111] text-white hover:bg-[#111]/90 transition-colors rounded-sm"
            >
              Browse products
            </Link>
            <a
              href={`mailto:${companyInfo.email}`}
              onClick={() =>
                trackEngagementEvent('contact_click', {
                  method: 'email',
                  location: 'group_practices',
                })
              }
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase border border-[#111]/20 text-[#111] hover:border-[#111]/40 transition-colors rounded-sm"
            >
              Email {companyInfo.email}
            </a>
            <a
              href={`tel:${companyInfo.phone.replace(/\D/g, '')}`}
              onClick={() =>
                trackEngagementEvent('phone_click', {
                  event_category: 'engagement',
                  location: 'group_practices',
                })
              }
              className="text-sm text-[#111]/60 font-body hover:text-[#111] transition-colors"
            >
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </main>
      <CartDrawer />
    </div>
  );
}
