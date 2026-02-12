import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

export default function FeaturedProductSection() {
  const { addItem, openCart } = useCartStore();

  const product = {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: "$599",
    originalPrice: "$699",
    description: "The new standard in Gutta Percha removal. Cordless, Sonic, Precision.",
    image: "https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060",
    features: [
      "Instant heating to 180°C in <1 second",
      "Cordless operation - no wires, no hassle",
      "Sonic vibration prevents cone sticking",
      "Ultra-lightweight at just 1.7 oz",
      "Interchangeable autoclavable tips",
      "1-Year manufacturer warranty"
    ]
  };

  const handleAddToCart = () => {
    addItem({ ...product, price: product.price }, 1);
    toast.success(`Added ${product.name} to cart`, { action: { label: 'View Cart', onClick: () => openCart() } });
  };

  return (
    <section id="featured" className="relative py-28 px-6 lg:px-12 bg-[#0a0e14]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Featured Product</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight">Our Flagship Device</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/[0.05] to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-[#0c1117] rounded-2xl border border-white/[0.06] p-10 lg:p-16">
              <img
                src={product.image}
                alt={product.name}
                className="w-full drop-shadow-2xl"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-500 text-[#0c1117] text-[10px] font-bold rounded-full uppercase tracking-wider">
                Best Seller
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-white/30 ml-1">5.0 Rating</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white/90 mb-2">{product.name}</h3>
            <p className="text-base text-white/40 mb-6 leading-relaxed">{product.description}</p>

            <div className="space-y-2.5 mb-8">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/50">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-white/90">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-white/25 line-through">{product.originalPrice}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#0c1117] px-7 py-3.5 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-amber-500/15 transition-all duration-300"
              >
                ADD TO CART
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-8 text-[12px] text-white/25">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-500/60" />
                <span>Instant Heat</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-amber-500/60" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}