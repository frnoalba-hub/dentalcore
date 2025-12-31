import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Thermometer, Battery, Shield, Zap, Box } from 'lucide-react';

const specs = [
  {
    icon: Thermometer,
    label: "Temperature",
    value: "Up to 180°C (Instant Heat)"
  },
  {
    icon: Zap,
    label: "Technology",
    value: "Sonic Vibration + Heat"
  },
  {
    icon: Battery,
    label: "Power Source",
    value: "Rechargeable Lithium Battery"
  },
  {
    icon: Shield,
    label: "Warranty",
    value: "1 Year Manufacturer Warranty"
  },
  {
    icon: Box,
    label: "Weight",
    value: "Ultra-lightweight Cordless Design"
  },
  {
    icon: Settings,
    label: "Tip Compatibility",
    value: "Proprietary UC CUT Tips (Autoclavable)"
  }
];

export default function TechSpecsSection() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/20 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Technical Specifications
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Engineered in Korea by EPDENT, the UC CUT combines precision mechanics with advanced thermal technology to deliver reliable performance in every procedure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 bg-gray-800 rounded-lg text-cyan-400">
                    <spec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                      {spec.label}
                    </p>
                    <p className="text-white font-medium">
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
              <img 
                src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060" 
                alt="UC CUT Technical Diagram" 
                className="w-full h-full object-contain p-8 mix-blend-lighten opacity-80"
              />
              
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-cyan-400 font-bold text-lg">EPDENT UC CUT</p>
                <p className="text-gray-500 text-sm">Professional Grade Endodontic Device</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}