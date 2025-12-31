import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, FileText, ArrowRight, Check } from 'lucide-react';

export default function HeroSection() {
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-cyan-50/50 to-transparent skew-x-12 transform origin-top" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent" />
      
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-100 rounded-full"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-600 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-800 tracking-wide uppercase">New Standard in Cautery</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
                Precision Control <br />
                <span className="text-cyan-600">Simplified.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                The <span className="font-bold text-gray-900">UC CUT</span> is a 3-in-1 sonic powerhouse for gum cautery, gutta-percha cutting, and vertical condensation.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-3">
              {[
                "Cordless & Compact Design",
                "Instant Heating & Cooling",
                "Multiple Interchangeable Tips"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing Card - Integrated */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 max-w-md">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Starting Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">$599</span>
                    <span className="text-sm text-gray-400 line-through">MSRP $699</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                    Save $100
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToContact('Demo')}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-cyan-600/20"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Demo
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToContact('Pricing')}
                  variant="outline"
                  className="w-full border-gray-200 hover:border-cyan-200 text-gray-700 hover:text-cyan-600 font-semibold h-12 rounded-xl"
                >
                  Details
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
              {/* Main Background Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-cyan-100/40 via-purple-50/40 to-transparent rounded-full blur-3xl" />
              
              {/* Image Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <img 
                  src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060" 
                  alt="UC CUT Sonic GP Cutter"
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase">Heating Time</p>
                    <p className="text-sm font-bold text-gray-900">Instant</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase">Warranty</p>
                    <p className="text-sm font-bold text-gray-900">1 Year</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}