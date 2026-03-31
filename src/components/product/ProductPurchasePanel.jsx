import { useState } from 'react';
import { ArrowUpRight, Check, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';

export default function ProductPurchasePanel({ product, selectedVariant, setSelectedVariant }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { dynamicT } = useTranslation();

  const activePrice = selectedVariant ? selectedVariant.price : product?.price;
  const activeOriginal = selectedVariant ? selectedVariant.originalPrice : product?.originalPrice;

  const handleAddToCart = () => {
    const itemToAdd = selectedVariant
      ? {
          ...product,
          id: selectedVariant.id,
          name: `${product.name} — ${selectedVariant.name}`,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          image: selectedVariant.image || product.image,
        }
      : product;
    addItem(itemToAdd, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  return (
    <div className="flex flex-col">
      {/* Category + promo badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{dynamicT(product.category)}</span>
        {product.promo && (
          <span className="text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-2 py-1">
            {product.promo}
          </span>
        )}
      </div>

      <h1 className="text-3xl lg:text-4xl font-medium tracking-tighter uppercase text-[#111] mb-6 leading-[1.1]">
        {dynamicT(product.name)}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-[#111]/10">
        <span className={`text-3xl font-medium tracking-tight ${activeOriginal ? 'text-accent' : 'text-[#111]'}`}>
          {product.variants?.length > 0 && !selectedVariant && <span className="text-lg mr-1">From</span>}
          {typeof activePrice === 'number' ? `$${activePrice.toFixed(2)}` : activePrice}
        </span>
        {activeOriginal && (
          <span className="text-lg text-[#111]/30 line-through">${Number(activeOriginal).toFixed(2)}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-base text-[#111]/70 font-body leading-relaxed mb-8">
        {dynamicT(product.description)}
      </p>

      {/* Variants */}
      {product.variants?.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-3">Select Option</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {product.variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`flex flex-col items-start p-3 border rounded-sm text-left transition-all ${
                    isSelected
                      ? 'border-[#111] bg-[#111] text-white shadow-card ring-2 ring-accent/30 ring-offset-2 ring-offset-[#FDFDFD]'
                      : 'border-[#111]/15 hover:border-[#111]/40 bg-white text-[#111] hover:shadow-card'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wide uppercase">{v.name}</span>
                  <span className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#111]/50'}`}>
                    ${Number(v.price).toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-stretch gap-3 mb-8">
        <div className="flex items-center border border-[#111] bg-white rounded-sm overflow-hidden shadow-card">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors text-sm">−</button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors text-sm">+</button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.variants?.length > 0 && !selectedVariant}
          className={`flex-1 flex items-center justify-between px-6 h-12 rounded-sm transition-all text-sm font-medium uppercase tracking-widest shadow-card active:scale-[0.99] disabled:active:scale-100 ${
            added
              ? 'bg-green-600 text-white shadow-card-hover'
              : 'bg-[#111] text-white hover:bg-accent hover:shadow-card-hover disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none'
          }`}
        >
          <span>
            {added ? 'Added!' : product.variants?.length > 0 && !selectedVariant ? 'Select an Option' : 'Add to Cart'}
          </span>
          {added ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Truck, label: 'Free Shipping', sub: 'Orders over $500' },
          { icon: Shield, label: 'Warranty', sub: '2-Year Coverage' },
          { icon: RotateCcw, label: 'Easy Returns', sub: '30-Day Policy' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center p-3 border border-[#111]/10 bg-white rounded-card shadow-card">
            <Icon className="w-4 h-4 text-[#111]/40 mb-1.5" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#111]">{label}</span>
            <span className="text-[9px] text-[#111]/40 mt-0.5">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}