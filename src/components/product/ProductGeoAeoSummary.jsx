import { useTranslation } from '@/lib/i18n';
import { companyInfo } from '@/components/dentalcore/productsData';
import { audienceLineForCategory, coretixEntitySentence } from '@/lib/geoAeoHelpers';

/**
 * Visible, structured “answer-style” facts for AEO / generative search extraction.
 * Keep copy factual; avoid therapeutic claims beyond product listing text.
 */
export default function ProductGeoAeoSummary({ product }) {
  const { dynamicT } = useTranslation();
  if (!product) return null;

  const categoryLabel = dynamicT(product.category);
  const audience = audienceLineForCategory(product.category);

  return (
    <section
      className="product-geo-aeo-summary mt-12 w-full border border-[#111]/10 rounded-card bg-white shadow-card p-6 sm:p-8"
      aria-labelledby="product-geo-aeo-heading"
    >
      <h2
        id="product-geo-aeo-heading"
        className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111]/45 mb-6"
      >
        Quick facts
      </h2>
      <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 text-sm font-body text-[#111]/75 leading-relaxed">
        <div>
          <dt className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-1">What it is</dt>
          <dd>{dynamicT(product.name)} — {dynamicT(product.description)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-1">Category</dt>
          <dd>{categoryLabel}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-1">Who it&apos;s for</dt>
          <dd>{audience}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-1">Where to buy</dt>
          <dd>
            {coretixEntitySentence()}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50 mb-1">Seller</dt>
          <dd>
            {companyInfo.companyName} — {companyInfo.email} · {companyInfo.phone}
          </dd>
        </div>
      </dl>
    </section>
  );
}
