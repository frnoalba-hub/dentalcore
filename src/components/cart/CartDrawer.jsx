import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0c1117] border-l border-white/[0.06] z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4.5 h-4.5 text-amber-400/70" />
                <h2 className="text-base font-semibold text-white/80">Cart ({getItemCount()})</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-white/[0.04] rounded-lg transition-colors"><X className="w-4 h-4 text-white/30" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-white/[0.06] mx-auto mb-3" />
                  <p className="text-sm text-white/25">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 80 }} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5">
                      <div className="flex gap-3.5">
                        <div className="w-16 h-16 bg-white/[0.03] rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white/70 text-sm mb-0.5 truncate">{item.name}</h3>
                          <p className="text-amber-400/70 text-sm font-bold mb-2">{item.price}</p>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-white/[0.04] hover:bg-white/[0.08] rounded flex items-center justify-center transition-colors"><Minus className="w-3 h-3 text-white/40" /></button>
                            <span className="w-7 text-center text-white/60 text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-white/[0.04] hover:bg-white/[0.08] rounded flex items-center justify-center transition-colors"><Plus className="w-3 h-3 text-white/40" /></button>
                            <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 hover:bg-red-900/15 rounded transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-400/60" /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/[0.06] p-5 bg-[#0a0e14]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/30 font-medium">Total</span>
                  <span className="text-xl font-bold text-white/85">${getTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-[#0c1117] font-bold text-sm">Checkout</Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}