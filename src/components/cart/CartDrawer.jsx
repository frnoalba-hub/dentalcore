import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Loader2, Gift } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n';
import { calculatePromos } from '../store/promoEngine';
import { Tag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { t, dynamicT } = useTranslation();
  const { promos, totalDiscount, hints } = calculatePromos(items);
  const { addItem } = useCartStore();
  const subtotal = getTotal();
  const finalTotal = Math.max(0, subtotal - totalDiscount);

  const handleStripeCheckout = async () => {
    if (items.length === 0) return;
    
    if (window.self !== window.top) {
      toast.error('Checkout is disabled in preview. Open in a new tab to test.');
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await base44.functions.invoke('createCheckoutSession', {
        items,
        origin: window.location.origin,
        promos,
      });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Checkout unavailable. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-[#111]/40 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26, stiffness: 210 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFDFD] border-l border-[#111]/10 shadow-drawer z-50 flex flex-col">
            
            <div className="flex items-center justify-between p-6 border-b border-[#111]/10 bg-[#FDFDFD]/95 backdrop-blur-sm">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#111]">{t('active_requisition')} ({getItemCount()})</h2>
              <button type="button" onClick={closeCart} aria-label="Close cart" className="p-2 rounded-sm text-[#111]/50 hover:text-[#111] hover:bg-[#111]/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-7">
              {items.length === 0 ? (
                <div className="py-12 text-center px-4">
                  <p className="text-base font-medium text-[#111]/70 font-body mb-1">{t('no_items')}</p>
                  <p className="text-xs text-[#111]/40 uppercase tracking-widest">Browse the catalog to add parts</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-7 border-b border-[#111]/10 last:border-b-0 last:pb-0">
                    <div className="w-20 h-20 shrink-0 bg-white border border-[#111]/10 rounded-card shadow-card flex items-center justify-center p-2 mix-blend-multiply">
                      <img src={item.image} alt={dynamicT(item.name)} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium uppercase tracking-tight text-[#111] mb-1 leading-tight">{dynamicT(item.name)}</h3>
                      <p className="text-sm font-semibold text-[#111] mb-3">
                        {typeof item.price === 'number' 
                          ? `$${item.price.toFixed(2)}` 
                          : typeof item.price === 'string' && item.price.startsWith('$') 
                            ? item.price 
                            : `$${item.price}`}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#111]/20 rounded-sm overflow-hidden bg-white">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#111]/60 hover:text-[#111] hover:bg-[#111]/5 transition-colors">-</button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#111]/60 hover:text-[#111] hover:bg-[#111]/5 transition-colors">+</button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-widest text-red-600 font-bold hover:underline">{t('remove')}</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo hints — add items to unlock deals */}
            {hints.length > 0 && items.length > 0 && (
              <div className="px-6 pb-2 space-y-2">
                {hints.map((hint, i) => (
                  <div key={i} className="flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-lg p-3">
                    <Gift className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-[11px] text-[#111]/70 font-body leading-tight flex-1">{hint.message}</span>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(hint.action, hint.action.quantity);
                        toast.success('Added to cart!');
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 hover:bg-accent/20 px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="p-6 border-t border-[#111]/10 bg-white shadow-[0_-4px_24px_rgba(17,17,17,0.06)] space-y-3">
                {/* Promos */}
                {promos.length > 0 && (
                  <div className="space-y-2 mb-3 pb-3 border-b border-[#111]/10">
                    {promos.map((p, i) => (
                      <div key={i} className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3 h-3 text-accent flex-shrink-0" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent leading-tight">{p.label}</span>
                        </div>
                        {p.discount > 0 ? (
                          <span className="text-xs font-bold text-green-600 whitespace-nowrap">-${p.discount.toFixed(2)}</span>
                        ) : p.info ? (
                          <span className="text-[10px] text-green-600 whitespace-nowrap">{p.info}</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}

                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#111]/40 uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm text-[#111]/40 line-through">${subtotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#111]/50">{totalDiscount > 0 ? 'Total' : (t('subtotal') || 'Subtotal')}</span>
                  <span className="text-xl font-medium text-[#111]">${finalTotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleStripeCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#111] text-white py-4 text-sm font-medium uppercase tracking-widest rounded-sm shadow-card hover:bg-accent hover:shadow-card-hover active:scale-[0.99] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {t('processing')}
                    </>
                  ) : (
                    t('secure_checkout') || "Pay with Card"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}