import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-gray-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Cart ({getItemCount()})</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-[#050505] border border-gray-800 rounded-xl p-4"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-cyan-400 text-sm font-bold mb-2">{item.price}</p>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3 text-gray-300" />
                            </button>
                            <span className="w-8 text-center text-white text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3 text-gray-300" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto p-2 hover:bg-red-900/20 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-800 p-6 bg-[#050505]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 font-medium">Total</span>
                  <span className="text-2xl font-bold text-white">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                <Button className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}