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
    <section className="relative min-h-[88dvh] flex items-center overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30" />
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-amber-100/40 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.35]" style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 0.8px, transparent 0.8px)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-xs font-semibold tracking-widest uppercase">Authorized EPDENT Dealer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.08] tracking-tight"
          >
            <span className="text-slate-900">Premium Dental</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Instruments
            </span>
            <br />
            <span className="text-slate-400 text-3xl sm:text-4xl lg:text-5xl font-semibold">&amp; Equipment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed"
          >
            High-quality endodontic tools, handpieces, imaging systems, and surgical supplies.
            Trusted by dental professionals across the United States.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button
              onClick={scrollToCatalog}
              className="group flex items-center gap-2.5 bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 font-bold text-sm rounded-xl shadow-lg shadow-blue-700/25 hover:shadow-blue-600/40 transition-all duration-300"
            >
              BROWSE CATALOG
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToFeatured}
              className="flex items-center gap-2.5 border-2 border-slate-200 text-slate-600 px-8 py-4 font-semibold text-sm rounded-xl hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50 transition-all duration-300"
            >
              Featured Product
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {[
              { icon: Truck, label: 'Fast Shipping' },
              { icon: Shield, label: '1-Year Warranty' },
              { icon: HeadphonesIcon, label: 'Direct Support' },
              { icon: Award, label: 'Premium Quality' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-slate-500 tracking-wide">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}