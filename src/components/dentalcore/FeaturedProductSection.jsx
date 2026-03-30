import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';

export default function FeaturedProductSection() {
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const product = {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: "$599",
    description: "The new standard in Gutta Percha removal. Cordless, Sonic, Precision. Eliminates cone pull-out with high-frequency sonic vibration.",
    image: "https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060",
    features: [
      "Instant heating to 180°C in <1 sec",
      "Cordless ergonomic geometry",
      "Sonic vibration prevents cone sticking",
      "1.7 oz ultra-light chassis"
    ]
  };

  return (
    <section id="featured" className="py-24 bg-[#111] text-white scroll-mt-[100px]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 border border-white/10">
          
          {/* Image Side */}
          <div className="relative p-12 lg:p-24 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 bg-white/5">
            <motion.img 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              src={product.image} 
              alt={dynamicT(product.name)} 
              className="w-full max-w-md object-contain drop-shadow-2xl" 
            />
            <div className="absolute top-6 left-6 border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium">
              {t('flagship')}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter uppercase mb-6 leading-[1.1]">
                {dynamicT(product.name)}
              </h2>
              
              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-white/10">
                <span className="text-3xl font-medium">{product.price}</span>
              </div>

              <p className="text-lg text-white/60 font-body leading-relaxed mb-10 max-w-md">
                {dynamicT(product.description)}
              </p>

              <ul className="space-y-4 mb-12">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex gap-4 text-sm font-body text-white/80 border-b border-white/10 pb-4">
                    <span className="text-accent font-medium tracking-widest">0{i + 1}</span>
                    {dynamicT(feature)}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { addItem(product, 1); openCart(); }}
                className="group w-full flex items-center justify-between border border-white p-5 hover:bg-white hover:text-[#111] transition-colors"
              >
                <span className="text-sm uppercase tracking-[0.2em] font-medium">{t('acquire_unit') || 'Add to Cart'}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}