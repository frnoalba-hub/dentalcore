import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';

export default function RelatedProducts({ products, currentCategory }) {
  const { dynamicT } = useTranslation();
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-[#111]/10">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-8">
        More in {dynamicT(currentCategory)}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px border border-[#111]/10 bg-[#111]/10">
        {products.map(p => (
          <Link key={p.id} to={`/product?id=${p.id}`}>
            <div className="bg-white group p-6 flex flex-col gap-4 hover:bg-[#F5F5F5] transition-colors h-full">
              <div className="aspect-square flex items-center justify-center">
                <img src={p.image} alt={dynamicT(p.name)} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-tight text-[#111] line-clamp-2 mb-1">{dynamicT(p.name)}</p>
                <p className="text-xs text-[#111]/50 font-medium">
                  {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}