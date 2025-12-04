import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

const tips = [
  {
    id: 'bovie',
    name: 'SB Tip (Bovie)',
    itemCode: '1006-4',
    description: 'Gum cautery & gingivectomy',
    details: 'Specialized for precise soft-tissue cauterization and controlled gingivectomy procedures. Ideal for hemostasis and tissue management. Recommended for 6-8 months use.',
    image: 'https://tricountydental.com/cdn/shop/files/sb-tip.avif?v=1757618977',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: '90-tip',
    name: '#90 Tip (Small Metal)',
    itemCode: '1006-2',
    description: 'For posterior teeth',
    details: 'Small metal tip designed for posterior teeth. Reusable and autoclavable stainless steel. Recommended for 1 year use.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-2.jpg?v=1731621503',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: '110-tip',
    name: '#110 Tip (Large Metal)',
    itemCode: '1006-3',
    description: 'For anterior teeth',
    details: 'Large metal tip designed for anterior teeth. Reusable and autoclavable stainless steel. Recommended for 1 year use.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-2.jpg?v=1731621503',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'b2',
    name: 'B2 Tip',
    itemCode: '1006-8',
    description: 'Gutta-percha cutting',
    details: 'Combines localized heat and sonic vibration to cut gutta-percha cleanly and efficiently without pulling the cone from the canal. Recommended for 6-8 months use.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-2.jpg?v=1731621503',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'b8',
    name: 'B8 Tip (Ball)',
    itemCode: '1006-7',
    description: 'Ball tip for precision work',
    details: 'Ball-shaped green tip for specialized precision work and controlled heat application. Recommended for 6-8 months use.',
    image: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-2.jpg?v=1731621503',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'f-tip',
    name: 'F Tip',
    itemCode: '1006-5',
    description: 'Vertical condensation / down-packing',
    details: 'Designed for effective vertical condensation during obturation. Provides controlled compaction of gutta-percha in the canal. Recommended for 6-8 months use.',
    image: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032',
    price: '$140.00',
    msrp: '$160.00',
  },
  {
    id: 'fm-tip',
    name: 'FM Tip',
    itemCode: '1006-6',
    description: 'Vertical condensation / down-packing',
    details: 'Alternative geometry for down-packing procedures, offering versatility in obturation technique based on canal anatomy. Recommended for 6-8 months use.',
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
    <section id="tips" className="relative py-32 px-6 lg:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Tips & Versatility
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Multiple specialized tips for different clinical applications — hover or tap to see details
          </p>
        </motion.div>

        {/* Tips grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setSelectedTip(tip)}
              onHoverEnd={() => setSelectedTip(null)}
              onClick={() => setSelectedTip(selectedTip?.id === tip.id ? null : tip)}
              className="group cursor-pointer"
            >
              <div className="relative h-full p-8 bg-white rounded-2xl border border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-xl">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-cyan-50/0 group-hover:from-cyan-50 group-hover:to-transparent rounded-2xl transition-all duration-300" />
                
                <div className="relative z-10 space-y-4">
                  {/* Tip Image */}
                  <div className="aspect-square bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center mb-4 group-hover:border-cyan-300 transition-colors duration-300 overflow-hidden p-2">
                    {tip.image ? (
                      <img src={tip.image} alt={tip.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center">
                        <ZoomIn className="w-8 h-8 text-gray-400 group-hover:text-cyan-600 mx-auto mb-2 transition-colors duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Tip name */}
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                    {tip.name}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-gray-500">
                    {tip.description}
                  </p>

                  {/* Price */}
                  {tip.price && (
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-cyan-600">
                        {tip.price}
                      </p>
                      {tip.msrp && (
                        <p className="text-xs text-gray-400 line-through">
                          MSRP: {tip.msrp}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Hover indicator */}
                  <div className="flex items-center gap-2 text-xs text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-3 h-3" />
                    <span>View details</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected tip details panel */}
        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-8 lg:p-12 bg-gradient-to-br from-cyan-50 via-white to-white rounded-3xl border border-cyan-200 shadow-xl">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Large image */}
                  <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden p-4">
                    {selectedTip.image ? (
                      <img src={selectedTip.image} alt={selectedTip.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center p-8">
                        <ZoomIn className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Image placeholder</p>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-cyan-600">
                        {selectedTip.name}
                      </h3>
                      <p className="text-lg text-gray-500">
                        {selectedTip.description}
                      </p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-cyan-300 to-transparent" />
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {selectedTip.details}
                    </p>
                    {selectedTip.price && (
                      <div>
                        <p className="text-2xl font-bold text-cyan-600">
                          {selectedTip.price}
                        </p>
                        {selectedTip.msrp && (
                          <p className="text-sm text-gray-400 line-through">
                            MSRP: {selectedTip.msrp}
                          </p>
                        )}
                        {selectedTip.itemCode && (
                          <p className="text-sm text-gray-500 mt-1">
                            Item Code: {selectedTip.itemCode}
                          </p>
                        )}
                      </div>
                    )}
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Hover over or tap each tip to see enlarged details and specifications
        </motion.p>
      </div>
    </section>
  );
}