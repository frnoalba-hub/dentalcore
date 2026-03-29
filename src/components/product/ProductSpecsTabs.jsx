import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function ProductSpecsTabs({ product }) {
  const { dynamicT } = useTranslation();
  const hasFeatures = product.features?.length > 0;
  const hasSpecs = product.specs && Object.keys(product.specs).length > 0;
  const hasReviews = product.reviews?.length > 0;

  const tabs = [];
  if (hasFeatures) tabs.push('Features');
  if (hasSpecs) tabs.push('Specifications');
  if (hasReviews) tabs.push('Reviews');
  if (tabs.length === 0) return null;

  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="border-t border-[#111]/10 mt-16 pt-12">
      {/* Tab bar */}
      <div className="flex border-b border-[#111]/10 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all border-b-2 whitespace-nowrap ${
              active === tab
                ? 'border-[#111] text-[#111]'
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
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mt-6">
          {product.features.map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-[#111]/5 bg-[#F8F9FA] hover:bg-white hover:shadow-sm hover:border-[#111]/10 transition-all duration-300">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent font-bold text-xs">—</span>
              </div>
              <span className="text-sm font-body text-[#111]/80 leading-relaxed font-medium">{dynamicT(f)}</span>
            </div>
          ))}
        </div>
      )}

      {active === 'Specifications' && hasSpecs && (
        <div className="max-w-2xl mt-6">
          <div className="divide-y divide-[#111]/10 border border-[#111]/10 rounded-2xl overflow-hidden shadow-sm">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex items-center bg-white hover:bg-[#F8F9FA] transition-colors duration-200">
                <div className="w-1/3 px-6 py-5 bg-[#F8F9FA] border-r border-[#111]/5">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-[#111]/50">{key}</p>
                </div>
                <div className="flex-1 px-6 py-5">
                  <p className="text-sm text-[#111] font-semibold">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'Reviews' && hasReviews && (
        <div className="space-y-4 max-w-2xl mt-6">
          {product.reviews.map((r, i) => (
            <div key={i} className="border border-[#111]/5 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#111]/5 text-[#111] flex items-center justify-center text-sm font-bold uppercase shadow-sm">
                    {r.author?.[0] || '?'}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[#111] leading-none">{r.author}</span>
                    {r.date && <span className="block text-[10px] text-[#111]/40 mt-1 uppercase tracking-widest">{r.date}</span>}
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={`text-sm drop-shadow-sm ${s < (r.rating || 5) ? 'text-accent' : 'text-[#111]/10'}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#111]/70 font-body leading-relaxed pl-14">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}