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
    <section id="catalog" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-blue-600 font-semibold tracking-[0.15em] text-xs uppercase mb-3 block">Full Catalog</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">Our Products</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
          </motion.div>
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm">
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
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  filter === cat
                    ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-3 text-sm text-slate-400">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
                  <article className="group relative h-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative aspect-[1/1] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-7 pb-6 pt-12">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%)] opacity-70" />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden relative z-10 w-full h-full items-center justify-center flex-col gap-2 text-slate-300">
                        <ShoppingBag className="w-12 h-12" />
                        <span className="text-xs uppercase tracking-[0.2em]">{product.category}</span>
                      </div>

                      <div className="absolute left-4 top-3 z-20 flex items-center gap-2">
                        <Badge className="border border-slate-200/80 bg-white/90 text-slate-600 backdrop-blur-sm text-[10px] px-2.5 py-1 font-semibold uppercase tracking-[0.18em] shadow-sm">
                          {product.category}
                        </Badge>
                        {product.popular && (
                          <Badge className="bg-slate-900 text-white border-0 font-semibold text-[10px] px-2.5 py-1 shadow-lg">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex h-[220px] flex-col justify-between border-t border-slate-100 px-5 pb-5 pt-4">
                      <div>
                        <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900 leading-6 line-clamp-2 min-h-[3rem]">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-3 min-h-[4.5rem]">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Price</p>
                          <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-slate-900">{product.price}</p>
                        </div>
                        <Button
                          onClick={(e) => handleQuickAdd(product, e)}
                          size="sm"
                          className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Quick Add
                          <ArrowRight className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Button>
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