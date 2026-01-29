import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createPageUrl } from '../../utils';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem, openCart } = useCartStore();
  
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filter !== 'All') {
      filtered = filtered.filter(p => p.category === filter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

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
  }, [products, filter, searchQuery, sortBy]);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`, {
      action: {
        label: 'View Cart',
        onClick: () => openCart(),
      },
    });
  };

  return (
    <section id="catalog" className="py-24 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Complete Lineup
          </span>
          <h2 className="text-4xl font-bold text-white mb-6">
            Innovative Dental Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our full range of EPDENT products designed to enhance your clinical workflow.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-[#0a0a0a] border-gray-800 text-white focus:border-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12 bg-[#0a0a0a] border-gray-800 text-white">
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

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 border-gray-800 md:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-800">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        filter === cat
                          ? 'bg-cyan-500 text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}
            {filter !== 'All' && ` in ${filter}`}
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilter('All');
              }}
              variant="outline"
              className="border-gray-700 hover:bg-gray-800"
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
            >
              <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                <div className="group bg-[#0a0a0a] rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-square bg-gray-900 p-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.popular && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-cyan-500 text-black border-0 font-bold">Popular</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-1">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {product.name}
                        </h3>
                      </div>
                      <span className="font-bold text-white bg-gray-800 px-2 py-1 rounded-lg">
                        {product.price}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                      {product.description}
                    </p>

                    <Button 
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-full bg-gray-800 border border-gray-700 text-white hover:border-cyan-500 hover:bg-cyan-500/10 font-semibold transition-all duration-300"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}