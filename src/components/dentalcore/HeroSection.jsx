import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, FileText, Check } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

export default function HeroSection() {
  const { heroContent } = useContentStore();
  
  const scrollToContact = (interest) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const interestField = document.querySelector('select[name="interest"]');
        if (interestField) {
          interestField.value = interest;
        }
      }, 500);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505] pt-20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent skew-x-12 transform origin-top" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-400 tracking-wide uppercase">{heroContent.badge}</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                {heroContent.headline.includes('by') ? (
                  <>
                    {heroContent.headline.split(' by ')[0]} <br />
                    <span className="text-cyan-400">by {heroContent.headline.split(' by ')[1]}</span>
                  </>
                ) : heroContent.headline}
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                {heroContent.tagline}
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3">
              {heroContent.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card */}
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl shadow-black/50 max-w-md">
              <div className="flex items-baseline gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Device</p>
                  <p className="text-4xl font-bold text-white">{heroContent.pricing.device}</p>
                </div>
                <div className="w-px h-12 bg-gray-700" />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Tips</p>
                  <p className="text-2xl font-bold text-cyan-400">{heroContent.pricing.tips}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToContact('Demo')}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 rounded-xl"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Demo
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToContact('Pricing')}
                  variant="outline"
                  className="w-full border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-cyan-400 font-semibold h-12 rounded-xl"
                >
                  Order Now
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
              
              {/* Image Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <img 
                  src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060" 
                  alt="UC CUT Sonic GP Cutter"
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Floating Cards */}
              {heroContent.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, idx === 0 ? -10 : 10, 0] }}
                  transition={{ duration: idx === 0 ? 4 : 5, repeat: Infinity, ease: "easeInOut", delay: idx }}
                  className={`absolute ${idx === 0 ? 'top-10 right-0' : 'bottom-20 left-0'} bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-800 z-20 hidden md:block`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      {idx === 0 ? <Zap className="w-5 h-5 text-cyan-400" /> : <FileText className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase">{highlight.label}</p>
                      <p className="text-sm font-bold text-white">{highlight.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}