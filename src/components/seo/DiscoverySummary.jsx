import { companyInfo } from '@/components/dentalcore/productsData';
import {
  coretixEntitySentence,
  homepageCatalogDiscoveryPrefix,
  groupPracticeSourcingDiscoveryParagraph,
} from '@/lib/generativeOptimizationEngine';

/**
 * Short, crawlable entity summary for homepage GEO / generative answers (complements FAQ JSON-LD).
 */
export default function DiscoverySummary() {
  return (
    <section
      className="border-y border-[#111]/10 bg-[#FAFAFA]"
      aria-labelledby="discovery-summary-heading"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 lg:py-12">
        <h2
          id="discovery-summary-heading"
          className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#111]/40 mb-3"
        >
          About Coretix
        </h2>
        <p className="text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
          {coretixEntitySentence()} {homepageCatalogDiscoveryPrefix}{' '}
          <strong className="font-semibold text-[#111]">licensed dental professionals</strong> in the{' '}
          <strong className="font-semibold text-[#111]">United States</strong>.
        </p>
        <p className="mt-4 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
          {groupPracticeSourcingDiscoveryParagraph()}
        </p>
        <p className="mt-3 text-xs text-[#111]/45 font-body">
          Business address: {companyInfo.address}
        </p>
      </div>
    </section>
  );
}
