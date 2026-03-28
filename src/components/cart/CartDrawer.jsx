import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Loader2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { t, dynamicT } = useTranslation();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    if (window.self !== window.top) {
      toast.error('Checkout is disabled in the preview editor. Please publish your app and open it in a new tab to test payments.');
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await base44.functions.invoke('createCheckoutSession', {
        items,
        origin: window.location.origin
      });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to initiate checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-[#111]/40 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFDFD] border-l border-[#111]/10 shadow-2xl z-50 flex flex-col">
            
            <div className="flex items-center justify-between p-6 border-b border-[#111]/10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#111]">{t('active_requisition')}</h2>
              <button onClick={closeCart} className="text-[#111]/50 hover:text-[#111]"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <p className="text-sm text-[#111]/50 font-body">{t('no_items')}</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-[#111]/10 pb-6">
                    <div className="w-20 h-20 bg-white border border-[#111]/10 flex items-center justify-center p-2 mix-blend-multiply">
                      <img src={item.image} alt={dynamicT(item.name)} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium uppercase tracking-tight text-[#111] mb-1 leading-tight">{dynamicT(item.name)}</h3>
                      <p className="text-sm text-[#111] mb-3">{item.price}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#111]/20">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[#111]/60 hover:text-[#111] hover:bg-[#111]/5">-</button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[#111]/60 hover:text-[#111] hover:bg-[#111]/5">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{t('remove')}</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#111]/10 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#111]/50">{t('subtotal')}</span>
                  <span className="text-xl font-medium text-[#111]">${getTotal().toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout} 
                  disabled={isCheckingOut}
                  className="w-full bg-[#111] text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {t('processing')}
                    </>
                  ) : (
                    t('secure_checkout')
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