import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2, Plus, X, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';
import { products as localProducts } from './productsData';

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  // Use local products as primary (they have promo pricing).
  // Suppress API products whose category is fully covered by a local consolidated card.
  const SUPPRESSED_API_CATEGORIES = new Set([
    'Allograft / Osseoseal Membrane',
    'Allograft',
    'Osseoseal',
    'Wound Dressing',
    'Collagen Dressing',
    'Osteogen Plug',
  ]);

  const SUPPRESSED_API_KEYWORDS = ['osteogen', 'curagen', 'heliplug', 'heli-plug', 'collagen wound'];


  const products = useMemo(() => {
    const localIds = new Set(localProducts.map(p => p.id));
    const localNames = new Set(localProducts.map(p => p.name.toLowerCase()));
    const apiOnly = apiProducts.filter(p => {
      const nameLower = p.name?.toLowerCase() || '';
      return (
        !localIds.has(p.id) &&
        !SUPPRESSED_API_CATEGORIES.has(p.category) &&
        !localNames.has(nameLower) &&
        !SUPPRESSED_API_KEYWORDS.some(kw => nameLower.includes(kw))
      );
    });
    return [...localProducts, ...apiOnly];
  }, [apiProducts]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filter !== 'All') filtered = filtered.filter(p => p.category === filter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) || 
        p.category?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q)
      );
    }
    return [...filtered].sort((a, b) => (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0));
  }, [products, filter, searchQuery]);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name}`, { 
      action: { label: t('view_cart') || 'View Cart', onClick: () => openCart() }
    });
  };

  return (
    <section id="catalog" className="py-24 bg-[#FDFDFD]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="section-title mb-2">{t('index')}</h2>
          <p className="text-sm text-[#111]/50 font-body">Professional dental supplies, equipment & biomaterials.</p>
        </motion.div>

        {/* Category Tabs — full width prominent row */}
        <div className="border-t border-b border-[#111]/10 mb-8 overflow-x-auto">
          <div className="flex min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                  filter === cat
                    ? 'border-[#111] text-[#111]'
                    : 'border-transparent text-[#111]/40 hover:text-[#111] hover:border-[#111]/30'
                }`}
              >
                {cat === 'All' ? t('all') || 'All' : dynamicT(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Results row */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="text-xs uppercase tracking-widest text-[#111]/40 font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            {filter !== 'All' && ` — ${filter}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
          <div className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111]/40" />
            <input
              type="text"
              placeholder={t('search_products') || "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[260px] bg-transparent border-b border-[#111]/20 focus:border-[#111] pl-6 pr-8 py-2 text-sm font-body text-[#111] placeholder:text-[#111]/30 outline-none transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#111]/40 hover:text-[#111]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32 border border-[#111]/10">
            <Loader2 className="w-8 h-8 animate-spin text-[#111]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-[#111]/10">
            <p className="text-sm text-[#111]/50 font-body mb-4">{t('no_items') || "No products found."}</p>
            <button 
              onClick={() => { setSearchQuery(''); setFilter('All'); }}
              className="text-xs uppercase tracking-widest font-medium text-accent hover:text-[#111] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[#111]/10">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}>
                <Link to={`/ProductDetail?id=${product.id}`}>
                  <article className="group relative h-full flex flex-col bg-[#FDFDFD] border-r border-b border-[#111]/10 hover:bg-[#F5F5F5] transition-colors">
                    <div className="relative aspect-square px-8 pb-8 pt-16 overflow-hidden">
                      <img
                        src={product.image}
                        alt={dynamicT(product.name)}
                        className="w-full h-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#111]/50 border border-[#111]/10 px-2 py-1 bg-white/80">
                          {dynamicT(product.category)}
                        </span>
                      </div>
                      {/* Quick Add / Options button on hover */}
                      <button
                        onClick={(e) => {
                          if (!product.variants?.length) {
                            handleQuickAdd(product, e);
                          }
                          // If variants exist, do not prevent default, so the Link navigates naturally
                        }}
                        className="absolute bottom-4 right-4 w-10 h-10 bg-[#111] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-accent transition-all duration-200"
                        title={product.variants?.length > 0 ? "Select Options" : "Quick add to cart"}
                      >
                        {product.variants?.length > 0 ? <Eye className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="p-6 border-t border-[#111]/10 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {product.promo && (
                          <span className="inline-block text-[9px] font-bold uppercase tracking-widest bg-accent text-white px-2 py-0.5 mb-2">
                            {product.promo}
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-[#111] tracking-tight uppercase mb-2">
                          {dynamicT(product.name)}
                        </h3>
                        <p className="text-sm text-[#111]/60 font-body line-clamp-2 leading-relaxed">
                          {dynamicT(product.description)}
                        </p>
                      </div>

                      <div className="mt-6 flex items-end justify-between">
                        <div>
                          {product.originalPrice && (
                            <p className="text-xs text-[#111]/40 line-through mb-0.5">
                              ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                            </p>
                          )}
                          <p className={`text-xl font-medium tracking-tight ${product.originalPrice ? 'text-accent' : 'text-[#111]'}`}>
                            {product.variants?.length > 0 && <span className="text-sm">From </span>}
                            {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (String(product.price).startsWith('$') ? product.price : `$${product.price}`)}
                          </p>
                        </div>
                        <span className="text-xs font-medium uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          {product.variants?.length > 0 ? 'Select Option' : t('view_details')}
                        </span>
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