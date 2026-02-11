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

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    if (filter !== 'All') filtered = filtered.filter(p => p.category === filter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return (parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0) - (parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0);
        case 'price-desc': return (parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0) - (parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0);
        default: return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
    });
  }, [products, filter, searchQuery, sortBy]);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`, { action: { label: 'View Cart', onClick: () => openCart() } });
  };

  return (
    <section id="catalog" className="py-28 bg-[#0c1117]">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Full Catalog</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-3">Innovative Dental Solutions</h2>
          <p className="text-base text-white/30 max-w-xl mx-auto">Discover the full range of EPDENT products.</p>
        </motion.div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <Input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11 bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 focus:border-amber-500/30 rounded-xl" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"><X className="w-4 h-4" /></button>}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] h-11 bg-white/[0.03] border-white/[0.06] text-white/60 rounded-xl"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-11 px-5 border-white/[0.06] bg-white/[0.03] md:hidden rounded-xl">
              <SlidersHorizontal className="w-4 h-4 mr-2" />Filters
            </Button>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.04]">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat ? 'bg-amber-500 text-[#0c1117]' : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.06] hover:text-white/60'}`}>{cat}</button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 text-center text-[11px] text-white/20">
            {filteredAndSortedProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}{filter !== 'All' && ` in ${filter}`}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-amber-400/50" /></div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-white/10 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white/60 mb-1">No products found</h3>
            <p className="text-sm text-white/25 mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(''); setFilter('All'); }} variant="outline" className="border-white/[0.08] text-white/40 hover:bg-white/[0.04] text-xs">Clear filters</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                  <div className="group bg-white/[0.02] rounded-xl border border-white/[0.05] overflow-hidden hover:border-amber-500/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="relative aspect-square bg-white/[0.02] p-5 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      {product.popular && <div className="absolute top-2.5 left-2.5"><Badge className="bg-amber-500 text-[#0c1117] border-0 font-bold text-[10px] px-2 py-0.5">Popular</Badge></div>}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="min-w-0 flex-1 mr-2">
                          <p className="text-[10px] text-amber-400/50 font-semibold uppercase tracking-wider mb-0.5">{product.category}</p>
                          <h3 className="text-sm font-semibold text-white/80 leading-snug truncate">{product.name}</h3>
                        </div>
                        <span className="text-sm font-bold text-white/70 bg-white/[0.04] px-2 py-0.5 rounded-md flex-shrink-0">{product.price}</span>
                      </div>
                      <p className="text-xs text-white/25 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                      <Button onClick={(e) => handleQuickAdd(product, e)} className="w-full h-9 bg-white/[0.04] border border-white/[0.06] text-white/50 hover:border-amber-500/30 hover:bg-amber-500/[0.06] hover:text-amber-400/80 font-medium text-xs transition-all">
                        <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />Add to Cart
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