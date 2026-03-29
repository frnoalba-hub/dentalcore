import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $300', min: 100, max: 300 },
  { label: '$300 – $600', min: 300, max: 600 },
  { label: '$600 – $1,000', min: 600, max: 1000 },
  { label: 'Over $1,000', min: 1000, max: Infinity },
];

const SUB_CATEGORIES = [
  { label: 'High-Speed', keywords: ['high-speed', 'turbine', 'x600', 'airpeak™ x600'] },
  { label: 'Low-Speed', keywords: ['low speed', 'g100', 'straight', 'contra angle'] },
  { label: 'Electric', keywords: ['electric', 'itesla', 'brushless'] },
  { label: 'Scalers', keywords: ['scaler', 'piezo', 'ultrasonic scal'] },
  { label: 'Curing Lights', keywords: ['curing', 'cure', 'modulite'] },
  { label: 'Bone Graft', keywords: ['graft', 'allograft', 'osseoseal', 'osteogen'] },
  { label: 'Membranes', keywords: ['membrane', 'collagen'] },
  { label: 'Obturation', keywords: ['gp', 'gutta', 'plugger', 'obturation', 'touch & heat', 'sealer'] },
  { label: 'Irrigation', keywords: ['irrigation', 'suction'] },
  { label: 'Matrix Systems', keywords: ['matrix', 'suretact', 'ring'] },
  { label: 'Surgical', keywords: ['surgical', '45°', 'implant', '20:1'] },
  { label: 'Maintenance', keywords: ['maintenance', 'mccare', 'lubrication'] },
];

const AVAILABILITY_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'On Sale', value: 'sale' },
  { label: 'New Arrivals', value: 'new' },
];

export default function CatalogFilters({ filters, onChange, activeCount }) {
  const [open, setOpen] = useState(false);

  const update = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onChange({ priceRange: 0, subCategory: '', availability: 'all' });
  };

  return (
    <div className="mb-6">
      {/* Toggle row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#111]/60 hover:text-[#111] transition-colors"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        Filters
        {activeCount > 0 && (
          <span className="bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center font-bold">
            {activeCount}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-4 p-5 border border-[#111]/10 bg-white space-y-5">
          {/* Price Range */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#111]/40 font-semibold block mb-2">Price Range</label>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((range, i) => (
                <button
                  key={i}
                  onClick={() => update('priceRange', i)}
                  className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                    filters.priceRange === i
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'border-[#111]/15 text-[#111]/60 hover:border-[#111]/40 hover:text-[#111]'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#111]/40 font-semibold block mb-2">Availability</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update('availability', opt.value)}
                  className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                    filters.availability === opt.value
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'border-[#111]/15 text-[#111]/60 hover:border-[#111]/40 hover:text-[#111]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Categories */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#111]/40 font-semibold block mb-2">Specialty</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => update('subCategory', '')}
                className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                  !filters.subCategory
                    ? 'bg-[#111] text-white border-[#111]'
                    : 'border-[#111]/15 text-[#111]/60 hover:border-[#111]/40 hover:text-[#111]'
                }`}
              >
                All
              </button>
              {SUB_CATEGORIES.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => update('subCategory', sub.label)}
                  className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                    filters.subCategory === sub.label
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'border-[#111]/15 text-[#111]/60 hover:border-[#111]/40 hover:text-[#111]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-accent hover:text-[#111] transition-colors"
            >
              <X className="w-3 h-3" /> Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export { PRICE_RANGES, SUB_CATEGORIES };