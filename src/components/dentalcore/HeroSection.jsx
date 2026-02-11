import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import { products } from './productsData';

const HeroSection = () => {
  const heroProduct = products.find(p => p.id === "1006-1");

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/3 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 text-sm font-semibold tracking-wide">New Precision Standard</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
              <span className="text-white">{heroProduct?.name?.split('(')[0] || "UC-CUT"}</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                Sonic GP Cutter
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-light">
              {heroProduct?.description || "The new standard in Gutta Percha removal. Cordless, Sonic, Precision."}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={scrollToCatalog}
                className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-8 py-4 font-bold rounded-xl hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
              >
                SHOP NOW — ${heroProduct?.price || "599"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {heroProduct?.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  REG: ${heroProduct.originalPrice}
                </span>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span>Instant Heat</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-500" />
                <span>1-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-cyan-500" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-600/5 blur-2xl scale-110" />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-3xl border border-white/5 p-10 lg:p-14 overflow-hidden">
                {/* Decorative text */}
                <div className="absolute -top-6 -right-4 text-[120px] font-black text-white/[0.02] select-none leading-none tracking-tighter">
                  UC
                </div>

                <img
                  src={heroProduct?.image}
                  alt={heroProduct?.name || "UC CUT"}
                  className="relative z-10 w-full drop-shadow-2xl"
                />

                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-3"
                >
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Heating</p>
                  <p className="text-2xl font-bold text-cyan-400">{'<'}1 sec</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;