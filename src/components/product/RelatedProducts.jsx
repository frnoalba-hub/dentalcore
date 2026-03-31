import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import { ImageOff } from 'lucide-react';

function RelatedProductCard({ product: p, dynamicT }) {
  const [broken, setBroken] = useState(false);
  const hasSrc = Boolean(p.image && String(p.image).trim());
  const showPlaceholder = !hasSrc || broken;

  return (
    <Link to={`/product?id=${p.id}`} className="block h-full min-h-0 rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFDFD]">
      <div className="bg-white group p-6 flex flex-col gap-4 h-full transition-all duration-300 hover:bg-[#FAFAFA] hover:shadow-card-hover border border-transparent hover:border-[#111]/10">
        <div className="aspect-square flex items-center justify-center bg-gradient-to-b from-[#FAFAFA] to-[#F0F0F0] border border-[#111]/8 rounded-card shadow-card group-hover:shadow-card-hover transition-shadow">
          {showPlaceholder ? (
            <div className="flex flex-col items-center gap-2 text-[#111]/25 px-4 text-center">
              <ImageOff className="w-8 h-8" strokeWidth={1.25} aria-hidden />
              <span className="text-[10px] uppercase tracking-widest">Image soon</span>
            </div>
          ) : (
            <img
              src={p.image}
              alt={dynamicT(p.name)}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              onError={() => setBroken(true)}
            />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-tight text-[#111] line-clamp-2 mb-1">{dynamicT(p.name)}</p>
          <p className="text-xs text-[#111]/50 font-medium">
            {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function RelatedProducts({ products, currentCategory }) {
  const { dynamicT } = useTranslation();
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-[#111]/10">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-8">
        More in {dynamicT(currentCategory)}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px border border-[#111]/10 bg-[#111]/10">
        {products.map((p) => (
          <RelatedProductCard key={p.id} product={p} dynamicT={dynamicT} />
        ))}
      </div>
    </div>
  );
}
