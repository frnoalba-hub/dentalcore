import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { products } from './productsData';

export default function HeroSection() {
  const heroProduct = products.find(p => p.id === "1006-1");

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-[72px] overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-[#0c1117]" />
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-amber-500/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/[0.08] border border-amber-500/15 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/90 text-xs font-semibold tracking-widest uppercase">New Precision Standard</span>
            </motion.div>

            <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold mb-6 leading-[1.08] tracking-[-0.02em]">
              <span className="text-white/95">{heroProduct?.name?.split('(')[0] || "UC-CUT"}</span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Sonic GP Cutter
              </span>
            </h1>

            <p className="text-base lg:text-lg text-white/40 mb-10 max-w-md leading-relaxed">
              {heroProduct?.description || "The new standard in Gutta Percha removal. Cordless, Sonic, Precision."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={scrollToCatalog}
                className="group flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-[#0c1117] px-7 py-3.5 font-bold text-sm rounded-xl hover:shadow-xl hover:shadow-amber-500/15 transition-all duration-300"
              >
                SHOP NOW — ${heroProduct?.price || "599"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              {heroProduct?.originalPrice && (
                <span className="text-white/25 line-through text-sm">REG: ${heroProduct.originalPrice}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[13px] text-white/30">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-500/70" />
                <span>Instant Heat</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-amber-500/70" />
                <span>1-Year Warranty</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-500/70" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-500/[0.06] via-transparent to-blue-500/[0.03] blur-3xl scale-110" />

            <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm rounded-[2rem] border border-white/[0.06] p-10 lg:p-16 overflow-hidden">
              <div className="absolute -top-8 -right-6 text-[140px] font-black text-white/[0.015] select-none leading-none tracking-[-0.05em]">UC</div>

              <img
                src={heroProduct?.image}
                alt={heroProduct?.name || "UC CUT"}
                className="relative z-10 w-full drop-shadow-2xl"
              />

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute bottom-5 right-5 bg-[#0c1117]/80 backdrop-blur-lg rounded-xl border border-white/[0.06] px-4 py-2.5"
              >
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold mb-0.5">Heating</p>
                <p className="text-xl font-bold text-amber-400">{'<'}1 sec</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}