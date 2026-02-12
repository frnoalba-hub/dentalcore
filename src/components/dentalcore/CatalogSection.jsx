import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, X, Loader2, Grid3X3, List } from 'lucide-react';
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
    <section id="catalog" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-amber-600 font-semibold tracking-[0.15em] text-xs uppercase mb-3 block">Full Catalog</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">Our Products</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-400 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-gray-200 rounded-xl"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] h-11 border-gray-200 rounded-xl">
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
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-3 text-sm text-gray-400">
            {filteredAndSortedProducts.length} of {products.length} products
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-sm text-gray-400 mb-5">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(''); setFilter('All'); }} variant="outline" size="sm">Clear filters</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                  <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center flex-col gap-2 text-gray-300">
                        <ShoppingBag className="w-12 h-12" />
                        <span className="text-xs">{product.category}</span>
                      </div>
                      {product.popular && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-amber-500 text-white border-0 font-bold text-[10px] px-2.5 py-1 shadow-lg shadow-amber-500/20">
                            Popular
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">{product.price}</span>
                        <Button
                          onClick={(e) => handleQuickAdd(product, e)}
                          size="sm"
                          className="bg-slate-900 hover:bg-slate-800 text-white text-xs h-9 px-4 rounded-lg shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                          Add
                        </Button>
                      </div>
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