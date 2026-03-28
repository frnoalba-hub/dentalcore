import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star, CheckCircle2, ShoppingBag } from 'lucide-react';
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
    <section id="featured" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200/80 p-12 lg:p-16 shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full drop-shadow-xl"
              />
              <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-blue-700 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-blue-700/20">
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
            <span className="text-blue-600 font-semibold tracking-[0.15em] text-xs uppercase mb-4 block">Featured Product</span>

            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
              <span className="text-xs text-slate-400 ml-2">5.0 Rating</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{product.name}</h3>
            <p className="text-base text-slate-500 mb-8 leading-relaxed">{product.description}</p>

            <div className="space-y-3 mb-8">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-slate-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-300 line-through">{product.originalPrice}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="group flex items-center gap-2.5 bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 font-bold text-sm rounded-xl shadow-lg shadow-blue-700/20 hover:shadow-blue-600/40 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO CART
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Heat</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>1-Year Warranty</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}