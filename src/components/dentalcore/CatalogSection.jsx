import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, X, Loader2, ArrowRight } from 'lucide-react';
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
    <section id="catalog" className="py-24 lg:py-32 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-label">Full Catalog</span>
            <h2 className="section-title">Our Products</h2>
            <div className="section-divider mt-4" />
          </motion.div>
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-blue-400/20"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] h-11 border-slate-200 rounded-xl">
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
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  filter === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs text-slate-400">
            {filteredAndSortedProducts.length} of {products.length} products
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No products found</h3>
            <p className="text-sm text-slate-400 mb-5">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(''); setFilter('All'); }} variant="outline" size="sm">Clear filters</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300">

                    <div className="relative aspect-square overflow-hidden bg-[#f8f8f6] p-6 pt-10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden relative z-10 w-full h-full items-center justify-center flex-col gap-2 text-slate-300">
                        <ShoppingBag className="w-10 h-10" />
                      </div>

                      <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5">
                        <span className="bg-white/95 backdrop-blur-sm text-slate-500 text-[10px] px-2.5 py-1 font-medium uppercase tracking-[0.15em] rounded-md border border-slate-200/60">
                          {product.category}
                        </span>
                        {product.popular && (
                          <span className="bg-blue-600 text-white font-medium text-[10px] px-2.5 py-1 rounded-md">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between border-t border-slate-100 px-5 pb-5 pt-4" style={{ minHeight: '200px' }}>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-slate-400 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3 pt-4 border-t border-slate-50">
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Price</p>
                          <p className="text-xl font-bold tracking-tight text-slate-900">{product.price}</p>
                        </div>
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add
                          <ArrowRight className="w-3 h-3 opacity-60" />
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}