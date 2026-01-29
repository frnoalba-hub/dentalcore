import React from 'react';
    import { products } from './productsData';
    
    const HeroSection = () => {
      const heroProduct = products.find(p => p.id === "1006-1");
    
      return (
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">New Precision Standard</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight silver-gradient">
                {heroProduct?.name || "Premium Dental Instruments"}
              </h1>
              <p className="text-lg text-secondary/60 mb-8 max-w-lg">
                {heroProduct?.description || "High-performance tools for modern practice."}
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-primary text-background px-8 py-4 font-bold rounded-sm hover:bg-accent transition-all">
                  SHOP NOW — ${heroProduct?.price || "599"}
                </button>
                <span className="text-secondary/40 line-through text-sm">
                  REG: ${heroProduct?.originalPrice || "699"}
                </span>
              </div>
            </div>
            <div className="relative glass-card rounded-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[100px] font-bold text-white/5 select-none tracking-tighter">CORE</div>
              <img src={heroProduct?.image} alt="Hero Product" className="relative z-10 w-full rounded-lg mix-blend-lighten" />
            </div>
          </div>
        </section>
      );
    };
    export default HeroSection;
