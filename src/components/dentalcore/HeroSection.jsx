import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, HeadphonesIcon } from 'lucide-react';

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
    <section className="relative min-h-[90dvh] flex items-center pt-[72px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0c1117]" />
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-amber-500/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/[0.08] border border-amber-500/15 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400/90 text-xs font-semibold tracking-widest uppercase">California-Based Dental Supplier</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 leading-[1.1] tracking-[-0.02em]"
          >
            <span className="text-white/95">Premium Dental</span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Instruments & Equipment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-base lg:text-lg text-white/40 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            High-quality endodontic tools, handpieces, imaging equipment, and surgical supplies. 
            Direct from trusted manufacturers to your practice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-16"
          >
            <button
              onClick={scrollToCatalog}
              className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#0c1117] px-8 py-4 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-amber-500/15 transition-all duration-300"
            >
              BROWSE CATALOG
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={scrollToFeatured}
              className="flex items-center gap-2.5 border border-white/10 text-white/60 px-8 py-4 font-semibold text-sm rounded-xl hover:border-amber-500/30 hover:text-amber-400/80 transition-all duration-300"
            >
              View Featured Product
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-8 lg:gap-12"
          >
            {[
              { icon: Truck, label: 'Fast Shipping' },
              { icon: Shield, label: '1-Year Warranty' },
              { icon: HeadphonesIcon, label: 'Direct Support' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-white/25">
                <item.icon className="w-4 h-4 text-amber-500/50" />
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Category cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { name: 'Endodontics', count: '8 products', color: 'from-rose-500/10 to-rose-500/5' },
            { name: 'Handpieces', count: '10 products', color: 'from-blue-500/10 to-blue-500/5' },
            { name: 'Equipment', count: '7 products', color: 'from-emerald-500/10 to-emerald-500/5' },
            { name: 'Surgical', count: '5 products', color: 'from-purple-500/10 to-purple-500/5' },
          ].map((cat, i) => (
            <button
              key={i}
              onClick={scrollToCatalog}
              className={`group p-5 rounded-2xl bg-gradient-to-br ${cat.color} border border-white/[0.04] hover:border-amber-500/20 transition-all duration-300 text-left`}
            >
              <h3 className="text-sm font-semibold text-white/70 group-hover:text-amber-300/80 transition-colors mb-1">{cat.name}</h3>
              <p className="text-[11px] text-white/25">{cat.count}</p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}