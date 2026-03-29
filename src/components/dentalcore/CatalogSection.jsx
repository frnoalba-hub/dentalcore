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
import ProductQuickView from './ProductQuickView';
import CatalogFilters, { PRICE_RANGES, SUB_CATEGORIES } from './CatalogFilters';

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: 0,
    subCategory: '',
    availability: 'all',
  });
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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (advancedFilters.priceRange !== 0) count++;
    if (advancedFilters.subCategory) count++;
    if (advancedFilters.availability !== 'all') count++;
    return count;
  }, [advancedFilters]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category tab
    if (filter !== 'All') filtered = filtered.filter(p => p.category === filter);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) || 
        p.category?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q) ||
        p.features?.some(f => f.toLowerCase().includes(q))
      );
    }

    // Price range
    if (advancedFilters.priceRange !== 0) {
      const range = PRICE_RANGES[advancedFilters.priceRange];
      filtered = filtered.filter(p => {
        const price = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, ''));
        return price >= range.min && price < range.max;
      });
    }

    // Availability
    if (advancedFilters.availability === 'sale') {
      filtered = filtered.filter(p => p.originalPrice || p.promo);
    } else if (advancedFilters.availability === 'new') {
      filtered = filtered.filter(p => p.inStock !== false && !p.originalPrice);
    }

    // Sub-category (keyword match)
    if (advancedFilters.subCategory) {
      const sub = SUB_CATEGORIES.find(s => s.label === advancedFilters.subCategory);
      if (sub) {
        filtered = filtered.filter(p => {
          const text = `${p.name} ${p.description || ''} ${(p.features || []).join(' ')}`.toLowerCase();
          return sub.keywords.some(kw => text.includes(kw));
        });
      }
    }

    return [...filtered].sort((a, b) => (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0));
  }, [products, filter, searchQuery, advancedFilters]);

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

        {/* Advanced Filters */}
        <CatalogFilters filters={advancedFilters} onChange={setAdvancedFilters} activeCount={activeFilterCount} />

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
              onClick={() => { setSearchQuery(''); setFilter('All'); setAdvancedFilters({ priceRange: 0, subCategory: '', availability: 'all' }); }}
              className="text-xs uppercase tracking-widest font-medium text-accent hover:text-[#111] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                <Link to={`/product?id=${product.id}`} className="cursor-pointer block">
                  <article className="group relative h-full flex flex-col bg-white border border-[#111]/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#111]/20 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative aspect-square px-8 py-8 bg-[#F8F9FA]">
                      <img
                        src={product.image}
                        alt={dynamicT(product.name)}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 flex flex-col gap-2 items-start">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#111] border border-[#111]/10 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                          {dynamicT(product.category)}
                        </span>
                        {product.promo && (
                          <span 
                            aria-label={`Current Promotion: ${product.promo}`}
                            className="text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-2.5 py-1 rounded-full shadow-sm"
                          >
                            {product.promo}
                            <span className="sr-only"> (Special Offer)</span>
                          </span>
                        )}
                      </div>
                      {/* Quick Add button on hover */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!product.variants?.length) {
                            handleQuickAdd(product, e);
                          } else {
                            setQuickViewProduct(product);
                          }
                        }}
                        className="absolute bottom-4 right-4 w-11 h-11 bg-white text-[#111] border border-[#111]/10 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#111] hover:text-white hover:scale-110 transition-all duration-300"
                        title={product.variants?.length > 0 ? "Select Options" : "Quick add to cart"}
                      >
                        {product.variants?.length > 0 ? <Eye className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <h3 className="text-lg font-semibold text-[#111] tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors">
                          {dynamicT(product.name)}
                        </h3>
                        <p className="text-sm text-[#111]/60 font-body line-clamp-2 leading-relaxed">
                          {dynamicT(product.description)}
                        </p>
                      </div>

                      <div className="mt-8 flex items-end justify-between">
                        <div>
                          {product.originalPrice && (
                            <p className="text-xs text-[#111]/40 line-through mb-1">
                              ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                            </p>
                          )}
                          <p className={`text-xl font-bold tracking-tight ${product.originalPrice ? 'text-accent' : 'text-[#111]'}`}>
                            {product.variants?.length > 0 && <span className="text-sm font-medium text-[#111]/50 mr-1">From </span>}
                            {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (String(product.price).startsWith('$') ? product.price : `$${product.price}`)}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#111]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-accent/10 transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
}