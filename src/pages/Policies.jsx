import { Link } from 'react-router-dom';
import { companyInfo } from '@/components/dentalcore/productsData';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';

export default function Policies() {
  const canonicalUrl = `${SITE_URL.replace(/\/$/, '')}/policies`;
  usePageSeo({
    variant: 'staticPage',
    staticPage: {
      title: `Shipping, returns & warranty | ${companyInfo.companyName}`,
      description: `${companyInfo.companyName} policies for US dental practices: free standard US shipping, 30-day returns on eligible unopened products, and manufacturer-backed warranty support.`,
      canonicalUrl,
    },
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111]">
      <main className="max-w-3xl mx-auto px-6 lg:px-12 pt-[calc(var(--site-header-height)+2.25rem)] pb-24">
        <p className="text-xs uppercase tracking-[0.25em] text-[#111]/40 font-semibold mb-3">
          {companyInfo.companyName}
        </p>
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight uppercase mb-10">
          Policies
        </h1>
        <p className="text-sm text-[#111]/55 font-body mb-12">
          Shipping, returns, and warranty summary for dental professionals. For product-specific questions, contact{' '}
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
          <p className="text-sm text-[#111]/65 font-body leading-relaxed mb-4">
            <strong className="text-[#111]">Free standard shipping</strong> is available on US orders. Orders
            submitted on a business day are typically processed the same day and shipped the next business day.
            Orders may ship from {companyInfo.companyName} or directly from an approved supplier, manufacturer,
            or warehouse partner.
          </p>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Most US orders arrive within <strong className="text-[#111]">3–10 business days</strong> after shipment,
            depending on destination, carrier, supplier availability, and product type.
          </p>
        </section>

        <section className="mb-12 border-b border-[#111]/10 pb-10">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Returns</h2>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed mb-4">
            Returns are accepted within <strong className="text-[#111]">30 days</strong> for eligible unopened,
            unused, non-sterile products. Contact {companyInfo.email} before returning merchandise so our team can
            confirm eligibility and provide return instructions.
          </p>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Opened, used, installed, custom, special-order, or sterile dental products may not be eligible for
            return. Customers are responsible for return shipping unless the item is defective or the wrong item was
            shipped.
          </p>
        </section>

        <section className="mb-12 border-b border-[#111]/10 pb-10">
          <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">Warranty</h2>
          <p className="text-sm text-[#111]/65 font-body leading-relaxed">
            Warranty terms follow each product&apos;s manufacturer instructions for use (IFU) and packaging. Many
            instruments include a limited manufacturer warranty against defects; specifics appear on the product
            detail page or IFU. Warranty claims are coordinated through {companyInfo.companyName} support with the same contact channels
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
