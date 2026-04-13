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
    <section id="specs" className="py-28 bg-[#0e1319] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/[0.02] blur-3xl" />
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Engineering</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white/90 mb-4 tracking-tight">Technical Specifications</h2>
            <p className="text-base text-white/30 mb-12 leading-relaxed max-w-md">Engineered in Korea by EPDENT, combining precision mechanics with advanced thermal technology.</p>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {specs.map((spec, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="p-2 bg-amber-500/[0.06] rounded-lg border border-amber-500/10 flex-shrink-0">
                    <spec.icon className="w-4 h-4 text-amber-400/70" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-wider font-semibold">{spec.label}</p>
                    <p className="text-sm text-white/75 font-semibold">{spec.value}</p>
                    <p className="text-[11px] text-white/20">{spec.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-4 bg-amber-500/[0.02] rounded-3xl blur-2xl" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0c1117] to-[#0e1319]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1117] via-transparent to-transparent z-10" />
              <img src="https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060" alt="UC CUT" className="w-full h-full object-contain p-12 relative z-0" />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="text-amber-400/80 font-bold text-lg">EPDENT UC CUT</p>
                <p className="text-white/20 text-xs">Professional Grade Endodontic Device</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}