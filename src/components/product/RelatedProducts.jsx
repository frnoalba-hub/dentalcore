import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageOff, Plus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { getCatalogProductImage } from '../dentalcore/productsData';
import { productRelativePath } from '@/lib/productPaths';

function RelatedProductCard({ product: p, dynamicT, t }) {
  const [broken, setBroken] = useState(false);
  const { addItem, openCart } = useCartStore();
  const imgSrc = getCatalogProductImage(p);
  const hasSrc = Boolean(imgSrc && String(imgSrc).trim());
  const showPlaceholder = !hasSrc || broken;
  const hasVariants = Boolean(p.variants?.length);
  const productUrl = productRelativePath(p);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...p, image: imgSrc }, 1);
    toast.success(`${dynamicT(p.name)} added`, {
      action: { label: t('cart') || 'Cart', onClick: () => openCart() },
    });
    openCart();
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white border border-[#111]/10 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link
        to={productUrl}
        className="group flex flex-1 flex-col gap-4 p-5 pb-3 min-h-0 rounded-t-card focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40"
      >
        <div className="aspect-square flex items-center justify-center bg-gradient-to-b from-[#FAFAFA] to-[#F0F0F0] border border-[#111]/8 rounded-card shadow-card transition-shadow group-hover:shadow-card-hover">
          {showPlaceholder ? (
            <div className="flex flex-col items-center gap-2 text-[#111]/25 px-4 text-center">
              <ImageOff className="w-8 h-8" strokeWidth={1.25} aria-hidden />
              <span className="text-[10px] uppercase tracking-widest">Image soon</span>
            </div>
          ) : (
            <img
              src={imgSrc}
              alt={dynamicT(p.name)}
              className="h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              onError={() => setBroken(true)}
            />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-tight text-[#111] line-clamp-2 mb-1">{dynamicT(p.name)}</p>
          <p className="text-xs text-[#111]/50 font-medium tabular-nums">
            {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}
          </p>
        </div>
      </Link>

      <div className="mt-auto border-t border-[#111]/8 p-3 pt-3">
        {hasVariants ? (
          <Link
            to={productUrl}
            className="flex w-full items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-[#111] text-white border border-[#111] rounded-sm hover:bg-accent hover:border-accent transition-colors text-center"
          >
            {t('view_details')}
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex w-full items-center justify-center gap-2 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-[#111] text-white border border-[#111] rounded-sm hover:bg-accent hover:border-accent transition-colors"
          >
            <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden />
            {t('add_to_requisition')}
          </button>
        )}
      </div>
    </div>
  );
}

export default function RelatedProducts({ products, currentCategory }) {
  const { dynamicT, t } = useTranslation();
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-24 pt-12 border-t border-[#111]/10">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-2">
        More in {dynamicT(currentCategory)}
      </h2>
      <p className="text-xs text-[#111]/45 font-body mb-8 max-w-2xl">
        Tap the product to open its page, or use Add to cart when no option pick is needed.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((p) => (
          <RelatedProductCard key={p.id} product={p} dynamicT={dynamicT} t={t} />
        ))}
      </div>
    </div>
  );
}
