import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const tips = [
  { id: 'bovie', name: 'SB Tip (Bovie)', itemCode: '1006-4', description: 'Gum cautery & gingivectomy', details: 'Specialized for precise soft-tissue cauterization and controlled gingivectomy procedures.', image: 'https://usdentaloutlet.com/cdn/shop/files/sb-tip.png?v=1751916971', price: '$160' },
  { id: '90-tip', name: '#90 Tip', itemCode: '1006-2', description: 'For posterior teeth', details: 'Small metal tip for posterior teeth. Reusable and autoclavable stainless steel.', image: 'https://cdn.shopify.com/s/files/1/0699/5378/1926/files/UC_CUT_90_Metal_Tip.webp?v=1753651035', price: '$160' },
  { id: '110-tip', name: '#110 Tip', itemCode: '1006-3', description: 'For anterior teeth', details: 'Large metal tip for anterior teeth. Reusable and autoclavable stainless steel.', image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-110.jpg?v=1751916973', price: '$160' },
  { id: 'b2', name: 'B2 Tip', itemCode: '1006-8', description: 'Gutta-percha cutting', details: 'Combines heat and sonic vibration for clean, efficient GP cutting.', image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-b2-metal.png?v=1751916972', price: '$160' },
  { id: 'b8', name: 'B8 Tip (Ball)', itemCode: '1006-7', description: 'Ball tip for precision', details: 'Ball-shaped tip for specialized precision work and controlled heat application.', image: 'https://usdentaloutlet.com/cdn/shop/files/UC-CUT-TIP-B8.png?v=1751916973', price: '$160' },
  { id: 'f-tip', name: 'F Tip', itemCode: '1006-5', description: 'Vertical condensation', details: 'For effective vertical condensation during obturation.', image: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032', price: '$160' },
  { id: 'fm-tip', name: 'FM Tip', itemCode: '1006-6', description: 'Down-packing', details: 'Alternative geometry for down-packing based on canal anatomy.', image: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032', price: '$160' },
  { id: 'stand', name: 'Tip Stand', itemCode: '1006-9', description: 'Organized storage', details: 'Convenient stand for tip organization during procedures.', image: 'https://cdn.shopify.com/s/files/1/0699/5378/1926/files/UC_CUT_Tip_Stand.webp?v=1753651036', price: '$200' },
];

export default function TipsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="tips" className="relative py-28 px-6 lg:px-12 bg-[#0e1319]">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Accessories</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-3">Specialized Tips</h2>
          <p className="text-base text-white/30 max-w-xl mx-auto">Interchangeable tips for every clinical scenario.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(selected?.id === tip.id ? null : tip)}
              className={`group cursor-pointer bg-white/[0.02] rounded-xl p-4 border transition-all duration-300 ${
                selected?.id === tip.id ? 'border-amber-500/40 bg-amber-500/[0.04] ring-1 ring-amber-500/15' : 'border-white/[0.05] hover:border-amber-500/15'
              }`}
            >
              <div className="aspect-square bg-[#0c1117] rounded-lg mb-3 p-3 flex items-center justify-center border border-white/[0.04]">
                <img src={tip.image} alt={tip.name} className="w-full h-full object-contain brightness-95" />
              </div>
              <h3 className="text-sm font-semibold text-white/80 mb-0.5 group-hover:text-amber-300/80 transition-colors truncate">{tip.name}</h3>
              <p className="text-[11px] text-white/25 mb-2 truncate">{tip.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400/80">{tip.price}</span>
                <Info className="w-3.5 h-3.5 text-white/15 group-hover:text-amber-400/50 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, y: 12, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: 12, height: 0 }} className="overflow-hidden">
              <div className="bg-white/[0.025] rounded-2xl border border-amber-500/20 p-8 lg:p-10">
                <div className="grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-1">
                    <div className="aspect-square bg-[#0c1117] rounded-xl p-6 flex items-center justify-center border border-white/[0.05]">
                      <img src={selected.image} alt={selected.name} className="w-full h-full object-contain brightness-95" />
                    </div>
                  </div>
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white/90">{selected.name}</h3>
                      <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400/80 text-xs font-bold rounded-full border border-amber-500/20">{selected.itemCode}</span>
                    </div>
                    <p className="text-base text-white/40 leading-relaxed mb-6">{selected.details}</p>
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05] w-fit">
                      <p className="text-[10px] text-white/25 uppercase tracking-widest font-semibold mb-0.5">Price</p>
                      <p className="text-3xl font-bold text-amber-400">{selected.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}