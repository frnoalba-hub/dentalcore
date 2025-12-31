import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 'endoseal',
    name: 'Endoseal MTA',
    category: 'Bioceramics',
    price: '$90.00',
    description: 'Paste-type root canal sealer and filler based on pozzolan cement. Excellent physical and biological properties of MTA.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/379589678_image.png',
    popular: true
  },
  {
    id: 'gp-cut-fit',
    name: 'GP Cut & Fit',
    category: 'Instruments',
    price: '$45.00',
    description: 'Cordless Gutta Percha Cutter. Features interchangeable tips (0.5mm, 1.2mm, 2.0mm) for precise sizing and clean cuts.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/GP-CUT-_-Fit-1_de2c8b15-4775-44fe-a2b6-f05c5e08ce48.jpg?v=1752124007&width=600',
    popular: false
  },
  {
    id: 'uc-one',
    name: 'UC ONE',
    category: 'Endodontics',
    price: '$480.00',
    description: 'Cordless Passive Ultrasonic Irrigation. 30,000 vibrations/sec with flexible 90° bendable tips for curved canals.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/UCONE-1_74a6c9ab-0980-4277-8c6d-b81e124cde28.jpg?v=1752124058&width=600',
    popular: true
  },
  {
    id: 'ep-cure',
    name: 'EP Cure',
    category: 'Curing Lights',
    price: '$599.00',
    description: 'High-performance curing light with 1,200 mW/cm² intensity. Features 3s/5s modes and built-in light guides.',
    image: 'https://dowelldentalproducts.com/cdn/shop/files/EPCUREW.png?v=1728590132&width=800',
    popular: false
  },
  {
    id: 'ep-cure-mini',
    name: 'EP Cure Mini',
    category: 'Curing Lights',
    price: '$550.00',
    description: 'Compact and lightweight curing light. Available in Black, White, and Green. Perfect for quick procedures.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/black.jpg?v=1752123906&width=416',
    popular: false
  },
  {
    id: 'ep-light',
    name: 'EP Light',
    category: 'Diagnostics',
    price: '$160.00',
    description: 'LED Transilluminator for detecting fractures, caries, and root canal orifices. Compact and battery operated.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/388efd2cf_image.png',
    popular: false
  },
  {
    id: 'uc-one-tips',
    name: 'UC One Tips',
    category: 'Accessories',
    price: 'Contact for Price',
    description: 'Replacement tips for UC ONE. Available in Metal and Plastic (50pcs/pack).',
    image: 'https://kdentalsupplies.com/cdn/shop/files/UCONE-1_74a6c9ab-0980-4277-8c6d-b81e124cde28.jpg?v=1752124058&width=600', // Using UC One image for context
    popular: false
  }
];

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Complete Lineup
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Innovative Dental Solutions
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Discover our full range of EPDENT products designed to enhance your clinical workflow.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
                {product.popular && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-orange-500 text-white border-0">Popular</Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-cyan-600 font-semibold uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                    {product.price}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                  {product.description}
                </p>

                <Button className="w-full bg-white border-2 border-gray-100 text-gray-900 hover:border-cyan-600 hover:text-cyan-600 hover:bg-cyan-50 font-semibold group-hover:border-cyan-600 group-hover:text-cyan-600 transition-all duration-300">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}