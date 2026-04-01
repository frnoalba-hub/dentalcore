import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Loader2, Plus, X, Eye, ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useCartStore } from '../store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { toast } from 'sonner';
import { products as localProducts, getCatalogProductImage, isDuplicateApiCatalogRow } from './productsData';
import ProductQuickView from './ProductQuickView';

export default function CatalogSection() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
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

  const SUPPRESSED_API_KEYWORDS = [
    'osteogen', 'curagen', 'heliplug', 'heli-plug', 'collagen wound',
    '0.3cc', '0.5cc', '1.0cc', '2.5cc', '5cc',
    '15x20', '20x30', '30x40', '15×20', '20×30', '30×40',
    // Apex membrane strings use spaces: "(20 x 30)" — not caught by 20x30
    '20 x 30', '30 x 40',
  ];

  const products = useMemo(() => {
    const localIds = new Set(localProducts.map(p => p.id));
    const localNames = new Set(localProducts.map(p => p.name.toLowerCase()));
    const consolidatedVariantIds = new Set();
    localProducts.forEach((p) => {
      if (p.variants) p.variants.forEach((v) => consolidatedVariantIds.add(v.id));
    });
    const apiOnly = apiProducts.filter((p) => {
      const nameLower = p.name?.toLowerCase() || '';
      const descLower = (p.description || '').toLowerCase();
      const skuLower = (p.sku || '').toLowerCase();
      const haystack = `${nameLower} ${descLower} ${skuLower}`;
      return (
        !localIds.has(p.id) &&
        !consolidatedVariantIds.has(p.id) &&
        !SUPPRESSED_API_CATEGORIES.has(p.category) &&
        !localNames.has(nameLower) &&
        !SUPPRESSED_API_KEYWORDS.some((kw) => haystack.includes(kw)) &&
        !isDuplicateApiCatalogRow(p)
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
        p.id?.toLowerCase().includes(q) ||
        p.features?.some(f => f.toLowerCase().includes(q))
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
    <section id="catalog" className="py-24 lg:py-28 bg-[#FDFDFD] scroll-mt-[100px]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#111]/35 font-semibold mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-[#111]/30" />
              {t('catalog') || 'Catalog'}
            </p>
            <h2 className="section-title mb-1">{t('index')}</h2>
            <p className="text-sm text-[#111]/40 font-body">Professional dental supplies, equipment & biomaterials.</p>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="border-b border-[#111]/10 mb-8 overflow-x-auto scrollbar-none">
          <div className="flex min-w-max">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all border-b-2 whitespace-nowrap rounded-t-sm ${
                  filter === cat
                    ? 'border-accent text-[#111]'
                    : 'border-transparent text-[#111]/35 hover:text-[#111] hover:border-[#111]/20'
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
              <button type="button" onClick={() => setSearchQuery('')} className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-sm text-[#111]/40 hover:text-[#111] hover:bg-[#111]/5">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32 border border-[#111]/10 rounded-card bg-white shadow-card">
            <Loader2 className="w-8 h-8 animate-spin text-[#111]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-[#111]/10 rounded-card bg-white shadow-card">
            <p className="text-sm text-[#111]/50 font-body mb-4">{t('no_items') || "No products found."}</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setFilter('All'); }}
              className="text-xs uppercase tracking-widest font-medium text-accent hover:text-[#111] transition-colors px-4 py-2 border border-[#111]/15 hover:border-[#111]/30 rounded-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-[#111]/10">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}>
                <Link
                  to={`/product?id=${product.id}`}
                  className="group/link block h-full rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFDFD]"
                >
                  <article className="group relative h-full flex flex-col bg-white border-r border-b border-[#111]/10 shadow-card transition-all duration-300 hover:border-[#111]/25 hover:shadow-card-hover hover:-translate-y-0.5">
                   <div className="relative aspect-square px-8 pb-8 pt-14 overflow-hidden bg-gradient-to-b from-[#FAFAFA] to-[#F2F2F2] group-hover:from-[#F5F5F5] group-hover:to-[#EBEBEB] transition-all duration-300">
                     <img
                       src={getCatalogProductImage(product)}
                       alt={dynamicT(product.name)}
                       className="w-full h-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.07]"
                     />
                     <div className="absolute top-3 left-3 flex gap-1.5">
                       <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-[#111]/40 border border-[#111]/10 px-2 py-1 bg-white/90 backdrop-blur-sm">
                         {dynamicT(product.category)}
                       </span>
                     </div>
                     {/* Quick Add button on hover */}
                     <button
                       type="button"
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         if (!product.variants?.length) {
                           handleQuickAdd(product, e);
                         } else {
                           setQuickViewProduct(product);
                         }
                       }}
                       className="absolute bottom-3 right-3 z-10 w-9 h-9 bg-[#111] text-white flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 hover:bg-accent active:scale-95 transition-all duration-200 shadow-card-hover pointer-events-none group-hover:pointer-events-auto"
                       title={product.variants?.length > 0 ? "Select Options" : "Quick add to cart"}
                     >
                       {product.variants?.length > 0 ? <Eye className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                     </button>
                   </div>

                   <div className="p-5 border-t border-[#111]/10 flex flex-col flex-1 justify-between">
                     <div>
                       {product.promo && (
                         <span className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] bg-accent text-white px-2 py-0.5 mb-2.5">
                           {product.promo}
                         </span>
                       )}
                       <h3 className="text-sm font-bold text-[#111] tracking-tight uppercase mb-1.5 leading-snug">
                         {dynamicT(product.name)}
                       </h3>
                       <p className="text-xs text-[#111]/50 font-body line-clamp-2 leading-relaxed">
                         {dynamicT(product.description)}
                       </p>
                     </div>

                     <div className="mt-5 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                       <div>
                         {product.originalPrice && (
                           <p className="text-[10px] text-[#111]/35 line-through mb-0.5">
                             ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                           </p>
                         )}
                         <p className={`text-lg font-semibold tracking-tight ${product.originalPrice ? 'text-accent' : 'text-[#111]'}`}>
                           {product.variants?.length > 0 && <span className="text-xs font-medium mr-0.5">From </span>}
                           {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (String(product.price).startsWith('$') ? product.price : `$${product.price}`)}
                         </p>
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                         {product.variants?.length > 0 ? 'Options' : t('view_details')}
                         <ArrowUpRight className="w-3 h-3" />
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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
}