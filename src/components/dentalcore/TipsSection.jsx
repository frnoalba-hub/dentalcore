import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tips = [
  {
    id: 'bovie',
    name: 'SB Tip (Bovie)',
    itemCode: '1006-4',
    description: 'Gum cautery & gingivectomy',
    details: 'Specialized for precise soft-tissue cauterization and controlled gingivectomy procedures. Ideal for hemostasis and tissue management.',
    image: 'https://tricountydental.com/cdn/shop/files/sb-tip.avif?v=1757618977',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: '90-tip',
    name: '#90 Tip (Small Metal)',
    itemCode: '1006-2',
    description: 'For posterior teeth',
    details: 'Small metal tip designed for posterior teeth. Reusable and autoclavable stainless steel.',
    image: 'https://dowelldentalproducts.com/cdn/shop/products/90_small_metal_2048x2048.png?v=1656021060',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: '110-tip',
    name: '#110 Tip (Large Metal)',
    itemCode: '1006-3',
    description: 'For anterior teeth',
    details: 'Large metal tip designed for anterior teeth. Reusable and autoclavable stainless steel.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-110.jpg?v=1751916973',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'b2',
    name: 'B2 Tip',
    itemCode: '1006-8',
    description: 'Gutta-percha cutting',
    details: 'Combines localized heat and sonic vibration to cut gutta-percha cleanly and efficiently without pulling the cone from the canal.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-b2-metal.png?v=1751916972',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'b8',
    name: 'B8 Tip (Ball)',
    itemCode: '1006-7',
    description: 'Ball tip for precision work',
    details: 'Ball-shaped green tip for specialized precision work and controlled heat application.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/UC-CUT-TIP-B8.png?v=1751916973',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'f-tip',
    name: 'F Tip',
    itemCode: '1006-5',
    description: 'Vertical condensation / down-packing',
    details: 'Designed for effective vertical condensation during obturation. Provides controlled compaction of gutta-percha in the canal.',
    image: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'fm-tip',
    name: 'FM Tip',
    itemCode: '1006-6',
    description: 'Vertical condensation / down-packing',
    details: 'Alternative geometry for down-packing procedures, offering versatility in obturation technique based on canal anatomy.',
    image: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'stand',
    name: 'Tip Stand',
    itemCode: '1006-9',
    description: 'Storage for tips',
    details: 'Convenient tip stand for organized storage and easy access to your UC CUT tips during procedures.',
    image: 'https://tricountydental.com/cdn/shop/files/epdent-uccut-gutta-percha-cutting-devices-1006-4.jpg?v=1757618951',
    price: '$160.00',
    msrp: '$200.00',
  },
];

export default function TipsSection() {
  const [selectedTip, setSelectedTip] = useState(null);

  return (
    <section id="tips" className="relative py-32 px-6 lg:px-12 bg-gray-50/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Accessories</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Specialized Tips
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
            Interchangeable tips for every clinical scenario. All available with introductory pricing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onClick={() => setSelectedTip(selectedTip?.id === tip.id ? null : tip)}
              className={`group cursor-pointer relative bg-white rounded-3xl p-6 border transition-all duration-300 ${
                selectedTip?.id === tip.id 
                  ? 'border-cyan-500 ring-4 ring-cyan-500/10 shadow-xl scale-[1.02] z-10' 
                  : 'border-gray-100 hover:border-cyan-200 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              <div className="aspect-square bg-gray-50 rounded-2xl mb-6 p-4 flex items-center justify-center overflow-hidden relative">
                {tip.image ? (
                  <img src={tip.image} alt={tip.name} className="w-full h-full object-contain mix-blend-multiply" />
                ) : (
                  <ZoomIn className="w-10 h-10 text-gray-300" />
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-cyan-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-cyan-600 transition-colors">
                {tip.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {tip.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <span className="block text-lg font-bold text-cyan-600">{tip.price}</span>
                  {tip.msrp && <span className="block text-xs text-gray-400 line-through">MSRP {tip.msrp}</span>}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                  <Info className="w-4 h-4 text-gray-400 group-hover:text-cyan-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-[2rem] border border-cyan-100 shadow-2xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-bl-full -mr-20 -mt-20 opacity-50" />
                
                <div className="grid lg:grid-cols-3 gap-12 relative z-10">
                  <div className="lg:col-span-1">
                    <div className="aspect-square bg-gray-50 rounded-2xl p-8 flex items-center justify-center border border-gray-100">
                      {selectedTip.image && (
                        <img src={selectedTip.image} alt={selectedTip.name} className="w-full h-full object-contain mix-blend-multiply" />
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-3xl font-bold text-gray-900">{selectedTip.name}</h3>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-bold rounded-full">
                          {selectedTip.itemCode}
                        </span>
                      </div>
                      <p className="text-xl text-gray-600 leading-relaxed font-light">
                        {selectedTip.details}
                      </p>
                    </div>

                    <div className="flex items-center gap-12 p-6 bg-gray-50 rounded-2xl w-fit">
                      <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Our Price</p>
                        <p className="text-4xl font-bold text-cyan-600">{selectedTip.price}</p>
                      </div>
                      <div className="h-12 w-px bg-gray-200" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Retail Price</p>
                        <p className="text-2xl font-bold text-gray-400 line-through">{selectedTip.msrp}</p>
                      </div>
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