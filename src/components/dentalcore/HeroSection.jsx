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
    <section className="relative min-h-[85dvh] flex items-center overflow-hidden bg-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-[-20%] right-[-5%] w-[600px] h-[600px] bg-amber-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">EPDENT Authorized Dealer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.08] tracking-tight"
          >
            <span className="text-white">Premium Dental</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Instruments
            </span>
            <br />
            <span className="text-white/80 text-3xl sm:text-4xl lg:text-5xl">& Equipment</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed"
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
              className="group flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
            >
              BROWSE CATALOG
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToFeatured}
              className="flex items-center gap-2.5 border border-white/20 text-white/70 px-8 py-4 font-semibold text-sm rounded-xl hover:border-white/40 hover:text-white transition-all duration-300"
            >
              Featured Product
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-8"
          >
            {[
              { icon: Truck, label: 'Fast Shipping' },
              { icon: Shield, label: '1-Year Warranty' },
              { icon: HeadphonesIcon, label: 'Direct Support' },
              { icon: Award, label: 'Premium Quality' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-amber-400/60" />
                <span className="text-xs font-medium text-white/40 tracking-wide">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}