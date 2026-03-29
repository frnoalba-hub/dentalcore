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
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {product.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 border border-[#111]/10 bg-white">
              <span className="text-accent font-bold text-lg leading-none mt-0.5">—</span>
              <span className="text-sm font-body text-[#111]/80 leading-relaxed">{dynamicT(f)}</span>
            </div>
          ))}
        </div>
      )}

      {active === 'Specifications' && hasSpecs && (
        <div className="max-w-2xl">
          <div className="divide-y divide-[#111]/10 border border-[#111]/10">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex items-center bg-white">
                <div className="w-1/3 px-5 py-4 bg-[#F5F5F5] border-r border-[#111]/10">
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

      {active === 'Reviews' && hasReviews && (
        <div className="space-y-6 max-w-2xl">
          {product.reviews.map((r, i) => (
            <div key={i} className="border border-[#111]/10 p-6 bg-white">
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