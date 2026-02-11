import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Thermometer, Battery, Shield, Zap, Box } from 'lucide-react';

const specs = [
  { icon: Thermometer, label: "Temperature", value: "Up to 180°C", detail: "Instant Heat" },
  { icon: Zap, label: "Technology", value: "Sonic + Heat", detail: "Dual Action" },
  { icon: Battery, label: "Power", value: "Li-ion Battery", detail: "Rechargeable" },
  { icon: Shield, label: "Warranty", value: "1 Year", detail: "Manufacturer" },
  { icon: Box, label: "Weight", value: "1.7 oz", detail: "Ultra-light" },
  { icon: Settings, label: "Tips", value: "Autoclavable", detail: "Proprietary" },
];

export default function TechSpecsSection() {
  return (
    <section id="specs" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-900/5 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Engineering</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Technical Specifications
            </h2>
            <p className="text-gray-400 text-lg mb-14 leading-relaxed max-w-lg">
              Engineered in Korea by EPDENT, combining precision mechanics with advanced thermal technology.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors"
                >
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 flex-shrink-0">
                    <spec.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                      {spec.label}
                    </p>
                    <p className="text-white font-semibold text-sm">{spec.value}</p>
                    <p className="text-gray-500 text-xs">{spec.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-600/5 rounded-3xl blur-xl" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-800/60 bg-gradient-to-br from-gray-900 via-gray-900/80 to-gray-950">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
              <img
                src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060"
                alt="UC CUT Technical Diagram"
                className="w-full h-full object-contain p-12 relative z-0"
              />

              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-cyan-400 font-bold text-xl">EPDENT UC CUT</p>
                <p className="text-gray-500 text-sm">Professional Grade Endodontic Device</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}