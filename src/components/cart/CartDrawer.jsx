import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { companyInfo } from '../dentalcore/productsData';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-semibold text-slate-900">Cart ({getItemCount()})</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-4 h-4 text-gray-400" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 80 }} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="flex gap-3.5">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-900 text-sm mb-0.5 truncate">{item.name}</h3>
                          <p className="text-amber-600 text-sm font-bold mb-2">{item.price}</p>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"><Minus className="w-3 h-3 text-gray-500" /></button>
                            <span className="w-8 text-center text-slate-900 text-xs font-semibold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"><Plus className="w-3 h-3 text-gray-500" /></button>
                            <button onClick={() => removeItem(item.id)} className="ml-auto p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 p-5 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 font-medium">Total</span>
                  <span className="text-xl font-bold text-slate-900">${getTotal().toFixed(2)}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm shadow-lg shadow-amber-500/20"
                >
                  Send Order via WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}