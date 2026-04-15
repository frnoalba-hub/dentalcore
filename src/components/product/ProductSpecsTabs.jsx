import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function ProductSpecsTabs({ product }) {
  const { dynamicT } = useTranslation();
  const hasFeatures = product.features?.length > 0;
  const hasSpecs = product.specs && Object.keys(product.specs).length > 0;
  const hasReviews = product.reviews?.length > 0;
  const hasFaqs = product.faqs?.length > 0;
  const hasSources = product.sources?.length > 0;

  const tabs = [];
  if (hasFeatures) tabs.push('Features');
  if (hasSpecs) tabs.push('Specifications');
  if (hasFaqs) tabs.push('FAQ');
  if (hasSources) tabs.push('Sources');
  if (hasReviews) tabs.push('Reviews');

  const [active, setActive] = useState(tabs[0] ?? '');
  if (tabs.length === 0) return null;

  return (
    <div className="border-t border-[#111]/10 mt-16 pt-12">
      {/* Tab bar */}
      <div className="flex border-b border-[#111]/10 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            type="button"
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all border-b-2 whitespace-nowrap rounded-t-sm ${
              active === tab
                ? 'border-accent text-[#111]'
                : 'border-transparent text-[#111]/40 hover:text-[#111]'
            }`}
          >
            {tab}
            {tab === 'Reviews' && hasReviews && (
              <span className="ml-2 text-[10px] text-accent">({product.reviews.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {active === 'Features' && hasFeatures && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 border border-[#111]/10 bg-white rounded-card shadow-card">
              <span className="text-accent font-bold text-lg leading-none mt-0.5">—</span>
              <span className="text-sm font-body text-[#111]/80 leading-relaxed">{dynamicT(f)}</span>
            </div>
          ))}
        </div>
      )}

      {active === 'Specifications' && hasSpecs && (
        <div className="w-full">
          <div className="divide-y divide-[#111]/10 border border-[#111]/10 rounded-card overflow-hidden">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex items-center bg-white">
                <div className="w-1/3 lg:w-1/4 px-5 py-4 bg-[#F5F5F5] border-r border-[#111]/10">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-[#111]/60">{key}</p>
                </div>
                <div className="flex-1 px-5 py-4">
                  <p className="text-sm text-[#111] font-medium">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'FAQ' && hasFaqs && (
        <div className="grid sm:grid-cols-2 gap-5">
          {product.faqs.map((faq, i) => (
            <div key={i} className="border border-[#111]/10 rounded-card shadow-card p-6 bg-white">
              <h3 className="text-sm font-bold text-[#111] mb-2">{dynamicT(faq.question)}</h3>
              <p className="text-sm text-[#111]/70 font-body leading-relaxed">{dynamicT(faq.answer)}</p>
            </div>
          ))}
        </div>
      )}

      {active === 'Sources' && hasSources && (
        <div className="grid sm:grid-cols-2 gap-4">
          {product.sources.map((source, i) => (
            <article key={`${source.url}-${i}`} className="border border-[#111]/10 rounded-card shadow-card p-5 bg-white">
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#111] hover:text-accent transition-colors break-all"
              >
                {source.label}
              </a>
              {source.note && (
                <p className="text-sm text-[#111]/60 font-body leading-relaxed mt-1">{source.note}</p>
              )}
            </article>
          ))}
        </div>
      )}

      {active === 'Reviews' && hasReviews && (
        <div className="grid sm:grid-cols-2 gap-5">
          {product.reviews.map((r, i) => (
            <div key={i} className="border border-[#111]/10 rounded-card shadow-card p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#111] text-white flex items-center justify-center text-xs font-bold uppercase">
                    {r.author?.[0] || '?'}
                  </div>
                  <span className="text-sm font-semibold text-[#111]">{r.author}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={`text-xs ${s < (r.rating || 5) ? 'text-accent' : 'text-[#111]/20'}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#111]/70 font-body leading-relaxed">{r.text}</p>
              {r.date && <p className="text-[10px] text-[#111]/30 mt-3 uppercase tracking-widest">{r.date}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}