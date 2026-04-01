import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';
import { getCatalogProductImage } from './productsData';

export default function ProductQuickView({ product, onClose }) {
  const { addItem, openCart } = useCartStore();
  const { dynamicT } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.length ? product.variants[0] : null
  );

  const hero = getCatalogProductImage(product);
  const images = (product.images?.length ? product.images : [hero]).filter(Boolean);
  const activePrice = selectedVariant?.price ?? product.price;
  const displayPrice = typeof activePrice === 'number' ? `$${activePrice.toFixed(2)}` : `$${activePrice}`;

  const handleAdd = () => {
    const cartItem = selectedVariant
      ? {
          ...product,
          id: selectedVariant.id,
          name: `${product.name} — ${selectedVariant.name}`,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice,
          image: selectedVariant.image || hero,
        }
      : product;
    addItem(cartItem, quantity);
    toast.success(`Added ${quantity}x ${cartItem.name}`, {
      action: { label: 'View Cart', onClick: () => openCart() },
    });
    onClose();
  };

  const prevImage = () => setCurrentImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setCurrentImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#111]/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden border border-[#111]/10 rounded-card shadow-modal"
        >
          {/* Close */}
          <div className="sticky top-0 z-10 flex justify-end items-center min-h-[52px] px-4 border-b border-[#111]/10 bg-white/95 backdrop-blur-sm">
            <button type="button" onClick={onClose} aria-label="Close" className="p-2 rounded-sm text-[#111]/50 hover:text-[#111] hover:bg-[#111]/5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="bg-gradient-to-b from-[#F5F5F5] to-[#EEEEEE] p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-[#111]/10">
              <div className="relative w-full aspect-square flex items-center justify-center">
                {images.length > 0 ? (
                <img
                  src={images[currentImage]}
                  alt={dynamicT(product.name)}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
                ) : (
                  <span className="text-xs uppercase tracking-widest text-[#111]/30">No image</span>
                )}
                {images.length > 1 && (
                  <>
                    <button type="button" onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[#111]/15 rounded-sm shadow-card flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-[#111]/15 rounded-sm shadow-card flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-14 h-14 flex-shrink-0 border-2 p-1 rounded-sm transition-all ${
                        i === currentImage ? 'border-[#111] ring-2 ring-accent/35 ring-offset-2 ring-offset-[#F5F5F5]' : 'border-[#111]/10 hover:border-[#111]/30'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-2">
                {dynamicT(product.category)}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight uppercase text-[#111] mb-3">
                {dynamicT(product.name)}
              </h2>

              {product.promo && (
                <span className="inline-block self-start text-[9px] font-bold uppercase tracking-widest bg-accent text-white px-2 py-0.5 mb-3">
                  {product.promo}
                </span>
              )}

              <p className="text-sm text-[#111]/60 font-body leading-relaxed mb-6">
                {dynamicT(product.description)}
              </p>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {product.features.map((f, i) => (
                      <li key={i} className="text-sm font-body text-[#111]/70">— {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/40 mb-2">Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          if (v.image) {
                            const idx = images.indexOf(v.image);
                            if (idx !== -1) setCurrentImage(idx);
                          }
                        }}
                        className={`px-4 py-2 text-xs font-medium uppercase tracking-wider border rounded-sm transition-all ${
                          selectedVariant?.id === v.id
                            ? 'border-[#111] bg-[#111] text-white shadow-card ring-2 ring-accent/25 ring-offset-2 ring-offset-white'
                            : 'border-[#111]/20 text-[#111] hover:border-[#111]/45 hover:bg-[#111]/[0.03]'
                        }`}
                      >
                        {v.name} — ${v.price?.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price + Add to Cart */}
              <div className="mt-auto pt-6 border-t border-[#111]/10 bg-[#FDFDFD]/80">
                <div className="flex items-end gap-3 mb-4">
                  {product.originalPrice && !selectedVariant && (
                    <span className="text-sm text-[#111]/40 line-through">
                      ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                    </span>
                  )}
                  <span className={`text-2xl font-medium tracking-tight ${product.originalPrice ? 'text-accent' : 'text-[#111]'}`}>
                    {displayPrice}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#111]/20 rounded-sm overflow-hidden bg-white">
                    <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#111]/5 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button type="button" onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#111]/5 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 bg-[#111] text-white py-3 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-card hover:bg-accent hover:shadow-card-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}