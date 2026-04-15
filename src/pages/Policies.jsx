import { Link } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import { companyInfo } from '@/components/dentalcore/productsData';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';

export default function Policies() {
  const canonicalUrl = `${SITE_URL.replace(/\/$/, '')}/policies`;
  usePageSeo({
    variant: 'staticPage',
    staticPage: {
      title: 'Shipping, returns & warranty | Coretix',
      description:
        'Coretix policies for US dental practices: shipping timelines, returns (case-by-case), and manufacturer-backed warranty. Sacramento, CA.',
      canonicalUrl,
    },
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111]">
      <Header />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 pt-[120px] pb-24">
        <p className="text-xs uppercase tracking-[0.25em] text-[#111]/40 font-semibold mb-3">
          Coretix
        </p>
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight uppercase mb-10">
          Policies
        </h1>
        <p className="text-sm text-[#111]/55 font-body mb-12">
          Shipping, returns, and warranty summary for dental professionals. For case-specific questions, contact{' '}
          <a className="text-accent font-medium hover:underline" href={`mailto:${companyInfo.email}`}>
            {companyInfo.email}
          </a>{' '}
          or{' '}
          <a className="text-accent font-medium hover:underline" href={`tel:${companyInfo.phone}`}>
            {companyInfo.phone}
          </a>
          .
        </p>

        <section className="mb-12 border-b border-[#111]/10 pb-10">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Shipping</h2>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Orders are typically processed within <strong className="text-[#111]">1–2 business days</strong>. US
            delivery usually takes <strong className="text-[#111]">3–7 business days</strong> after shipment,
            depending on destination and carrier. Shipping cost is shown at checkout when checkout is enabled, or
            quoted by our sales team.
          </p>
        </section>

        <section className="mb-12 border-b border-[#111]/10 pb-10">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Returns</h2>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Return eligibility is evaluated <strong className="text-[#111]">case by case</strong> for licensed dental
            professionals. Contact {companyInfo.email} before returning merchandise. Opened, used, or sterile items
            may not be eligible for return, subject to manufacturer policy and applicable regulations.
          </p>
        </section>

        <section className="mb-12 border-b border-[#111]/10 pb-10">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Warranty</h2>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Warranty terms follow each product&apos;s manufacturer instructions for use (IFU) and packaging. Many
            instruments include a limited manufacturer warranty against defects; specifics appear on the product
            detail page or IFU. Warranty claims are coordinated through Coretix support with the same contact channels
            above.
          </p>
        </section>

        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-widest text-accent hover:underline"
        >
          ← Back to catalog
        </Link>
      </main>
    </div>
  );
}
