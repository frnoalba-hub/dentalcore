import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, FileText } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = (interest) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Set the interest field after a short delay
      setTimeout(() => {
        const interestField = document.querySelector('select[name="interest"]');
        if (interestField) {
          interestField.value = interest;
        }
      }, 500);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-gray-50 to-white">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Brand mark */}
            <div className="inline-block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm font-medium tracking-wider text-cyan-600 uppercase"
              >
                Dental Core Supplies
              </motion.div>
            </div>

            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900">UC CUT</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-light text-gray-600 leading-relaxed">
                Sonic Gutta-Percha Cutter &<br />
                Gum Cauterizer in One<br />
                Compact Unit
              </h2>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
              A professional 3-in-1 device for <span className="text-gray-900 font-medium">gum cautery</span>, 
              <span className="text-gray-900 font-medium"> gutta-percha cutting</span>, and 
              <span className="text-gray-900 font-medium"> vertical condensation/down-packing</span> — 
              designed for quick, chairside use with precision and control.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToContact('Demo')}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Request Demo
              </Button>
              <Button
                size="lg"
                onClick={() => scrollToContact('Pricing')}
                variant="outline"
                className="border-2 border-gray-300 hover:border-cyan-500 text-gray-700 hover:text-cyan-600 font-semibold px-8 py-6 text-lg rounded-xl bg-white transition-all duration-300"
              >
                <FileText className="w-5 h-5 mr-2" />
                Request Intro Pricing
              </Button>
            </div>

            {/* Supporting line */}
            <p className="text-sm text-gray-500 pt-2">
              Dental Core Supplies is a dentist-focused distributor bringing UC CUT by EPDENT to local practices with personalized support.
            </p>
          </motion.div>

          {/* Right: Product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-3xl border border-gray-200 flex items-center justify-center overflow-hidden p-8 shadow-xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/30 via-transparent to-transparent" />

              {/* Product Image - UC CUT with orange tip visible from side */}
              <img 
                src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060" 
                alt="UC CUT Sonic GP Cutter"
                className="relative z-10 w-full h-full object-contain drop-shadow-lg"
              />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-200/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-cyan-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}