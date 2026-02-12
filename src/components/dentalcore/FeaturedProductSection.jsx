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
      "Cordless operation — no wires, no hassle",
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
    <section id="featured" className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white/5 rounded-3xl border border-white/10 p-12 lg:p-16">
              <img
                src={product.image}
                alt={product.name}
                className="w-full drop-shadow-2xl"
              />
              <div className="absolute top-5 left-5 px-3 py-1.5 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg">
                Best Seller
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400 font-semibold tracking-[0.15em] text-xs uppercase mb-4 block">Featured Product</span>

            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-white/40 ml-2">5.0 Rating</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">{product.name}</h3>
            <p className="text-base text-white/50 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-3 mb-8">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-white">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-white/30 line-through">{product.originalPrice}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="group flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
              >
                ADD TO CART
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500/60" />
                <span>Instant Heat</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500/60" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}