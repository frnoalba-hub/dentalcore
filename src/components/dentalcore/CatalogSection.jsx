import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    id: 'uc-one-metal-tip',
    name: 'UC One Metal Tip',
    category: 'Accessories',
    price: '$80.00',
    description: 'Replacement metal tip for UC ONE ultrasonic irrigation system. Durable and autoclavable.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/a9c9658c0_image.png',
    popular: false
  },
  {
    id: 'uc-one-plastic-tips',
    name: 'UC One Plastic Tips',
    category: 'Accessories',
    price: '$60.00',
    description: 'Disposable plastic tips for UC ONE. Flexible design for curved canals. 50 pcs/pack.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/8e30013bb_image.png',
    popular: false
  }
];

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (filter !== 'All') {
      filtered = filtered.filter(p => p.category === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceA - priceB;
        case 'price-desc':
          const priceA2 = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB2 = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceB2 - priceA2;
        case 'popular':
        default:
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
    });

    return sorted;
  }, [filter, searchQuery, sortBy]);

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

        {/* Search and Filter Bar */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-gray-200 focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 bg-white border-gray-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>

            {/* Toggle Filters */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-gray-200 md:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Count */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}
            {filter !== 'All' && ` in ${filter}`}
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilter('All');
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredAndSortedProducts.map((product, index) => (
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
        )}
      </div>
    </section>
  );
}