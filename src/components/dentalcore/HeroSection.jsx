import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, HeadphonesIcon, Award } from 'lucide-react';

export default function HeroSection() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatured = () => {
    const el = document.getElementById('featured');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92dvh] flex items-center overflow-hidden bg-[#fafaf8]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fafaf8] to-blue-50/20" />
        <div className="absolute top-[-15%] right-[-5%] w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="w-12 h-0.5 bg-blue-600 mb-6" />
            <span className="text-blue-600 font-semibold tracking-[0.25em] text-[11px] uppercase">
              Professional Dental Supply
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Premium Dental
            </span>
            <span className="block font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mt-1">
              <span className="text-blue-700">Instruments</span>
            </span>
            <span className="block text-2xl sm:text-3xl font-light text-slate-400 mt-4 tracking-tight">
              & Clinical Equipment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 mb-12 max-w-lg leading-relaxed font-light"
          >
            High-quality endodontic tools, handpieces, imaging systems, and surgical supplies.
            Trusted by dental professionals across the United States.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-20"
          >
            <button
              onClick={scrollToCatalog}
              className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 font-semibold text-sm rounded-full shadow-xl shadow-slate-900/15 hover:shadow-slate-900/25 transition-all duration-300"
            >
              Browse Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToFeatured}
              className="flex items-center gap-2.5 border border-slate-300 text-slate-600 px-8 py-4 font-medium text-sm rounded-full hover:border-slate-400 hover:text-slate-800 transition-all duration-300"
            >
              Featured Product
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            {[
              { icon: Truck, label: 'Fast Shipping' },
              { icon: Shield, label: '1-Year Warranty' },
              { icon: HeadphonesIcon, label: 'Direct Support' },
              { icon: Award, label: 'Premium Quality' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <item.icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-xs font-medium text-slate-400 tracking-wide">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}