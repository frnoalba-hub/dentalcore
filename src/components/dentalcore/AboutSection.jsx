import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { ArrowUpRight, Zap, Wind, Thermometer } from 'lucide-react';

const specs = [
  { label: 'Heating Time', value: '<1 sec', icon: Thermometer },
  { label: 'Temperature', value: '180°C', icon: Zap },
  { label: 'Technology', value: 'Sonic', icon: Wind },
  { label: 'Warranty', value: '2 Years', icon: null },
];

export default function AboutSection() {
  const { addItem, openCart } = useCartStore();
  const { t } = useTranslation();

  const product = {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: "$599",
    image: "https://kdentalsupplies.com/cdn/shop/files/UC-CUT_Heat_Vibration_Sonic_GP_Cutter_4_colors.jpg?v=1710953457",
  };

  return (
    <section id="about" className="py-24 bg-[#FDFDFD] border-b border-[#111]/10 scroll-mt-[100px]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">New Arrival</span>
          <div className="h-px flex-1 bg-[#111]/10" />
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border border-[#111]/10">
          
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#F5F5F5] flex items-center justify-center p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-[#111]/10 min-h-[400px]"
          >
            <img
              src={product.image}
              alt="UC-CUT Sonic GP Cutter"
              className="w-full max-w-sm object-contain mix-blend-multiply"
            />
            <div className="absolute top-6 left-6">
              <span className="text-[10px] font-bold uppercase tracking-widest border border-[#111]/20 px-3 py-1.5 bg-white text-[#111]">
                Featured
              </span>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 lg:p-16 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tighter uppercase text-[#111] leading-[1.05] mb-4">
                UC-CUT<span className="text-accent">.</span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-[#111]/40 mb-8 font-medium">
                Sonic GP Cutter — by EPDENT
              </p>

              <p className="text-lg text-[#111]/70 font-body leading-relaxed mb-10 max-w-md">
                The new standard in Gutta Percha removal. Cordless, sonic vibration eliminates cone pull-out while instant 180°C heating delivers a clean, precise cut every time.
              </p>

              {/* Spec boxes */}
              <div className="grid grid-cols-2 border-t border-l border-[#111]/10 mb-10">
                {specs.map((spec, i) => (
                  <div key={i} className="border-b border-r border-[#111]/10 p-5">
                    <p className="text-xs uppercase tracking-widest text-[#111]/40 mb-1 font-medium">{spec.label}</p>
                    <p className="text-2xl font-semibold tracking-tight text-[#111]">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { addItem(product, 1); openCart(); }}
                className="group flex-1 flex items-center justify-between border border-[#111] bg-[#111] text-white px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-accent hover:border-accent transition-colors"
              >
                <span>Add to Cart — $599</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none border border-[#111]/20 text-[#111] px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#111]/5 transition-colors"
              >
                View All Endo
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}