import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ShoppingBag, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useCartStore } from '../components/store/cartStore';
import { useTranslation } from '@/lib/i18n';
import { products as localProducts } from '../components/dentalcore/productsData';
import { motion } from 'framer-motion';

const SUPPRESSED_API_CATEGORIES = new Set([
  'Allograft / Osseoseal Membrane', 'Allograft', 'Osseoseal',
  'Wound Dressing', 'Collagen Dressing', 'Osteogen Plug',
]);
const SUPPRESSED_KEYWORDS = ['osteogen', 'curagen', 'heliplug', 'heli-plug', 'collagen wound'];

export default function ProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { t, dynamicT } = useTranslation();

  const { data: apiProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const allProducts = useMemo(() => {
    const localIds = new Set(localProducts.map(p => p.id));
    const localNames = new Set(localProducts.map(p => p.name.toLowerCase()));
    const consolidatedVariantIds = new Set();
    localProducts.forEach(p => {
      if (p.variants) p.variants.forEach(v => consolidatedVariantIds.add(v.id));
    });
    const apiOnly = apiProducts.filter(p => {
      const nameLower = p.name?.toLowerCase() || '';
      return (
        !localIds.has(p.id) &&
        !consolidatedVariantIds.has(p.id) &&
        !SUPPRESSED_API_CATEGORIES.has(p.category) &&
        !localNames.has(nameLower) &&
        !SUPPRESSED_KEYWORDS.some(kw => nameLower.includes(kw))
      );
    });
    return [...localProducts, ...apiOnly];
  }, [apiProducts]);

  const product = allProducts.find(p => p.id === productId);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product?.variants?.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedVariant(null);
    setQuantity(1);
    setAdded(false);
  }, [productId]);

  const allImages = product
    ? [product.image, ...(product.images || [])].filter((img, i, arr) => img && arr.indexOf(img) === i)
    : [];

  const activePrice = selectedVariant ? selectedVariant.price : product?.price;
  const activeOriginal = selectedVariant ? selectedVariant.originalPrice : product?.originalPrice;
  const activeImage = selectedVariant?.image || allImages[selectedImage];

  const isLoading_ = isLoading && !localProducts.find(p => p.id === productId);
  if (isLoading_) return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#111]/20 border-t-[#111] rounded-full animate-spin" />
    </div>
  );
  if (!product) return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center flex-col gap-4">
      <p className="text-sm text-[#111]/50 uppercase tracking-widest">Product not found</p>
      <Link to="/" className="text-xs uppercase tracking-widest font-semibold text-accent hover:underline">← Back to catalog</Link>
    </div>
  );

  const handleAddToCart = () => {
    const itemToAdd = selectedVariant
      ? { ...product, id: selectedVariant.id, name: `${product.name} — ${selectedVariant.name}`, price: selectedVariant.price, originalPrice: selectedVariant.originalPrice }
      : product;
    addItem(itemToAdd, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  // Related products: same category, exclude self
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-[#111]/10 px-6 lg:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 text-xs uppercase tracking-widest text-[#111]/40">
          <Link to="/#catalog" className="hover:text-[#111] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Catalog
          </Link>
          <span>/</span>
          <span className="text-accent">{dynamicT(product.category)}</span>
          <span>/</span>
          <span className="text-[#111] truncate max-w-[200px]">{dynamicT(product.name)}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* ── LEFT: Image Gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white border border-[#111]/10 flex items-center justify-center p-12"
            >
              <img
                src={activeImage}
                alt={dynamicT(product.name)}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </motion.div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setSelectedVariant(null); }}
                    className={`aspect-square bg-white border p-2 transition-all ${
                      selectedImage === idx && !selectedVariant?.image
                        ? 'border-[#111]'
                        : 'border-[#111]/10 hover:border-[#111]/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ── */}
          <div className="flex flex-col">
            {/* Category + promo badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{dynamicT(product.category)}</span>
              {product.promo && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-2 py-1">
                  {product.promo}
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-medium tracking-tighter uppercase text-[#111] mb-6 leading-[1.1]">
              {dynamicT(product.name)}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-[#111]/10">
              <span className={`text-3xl font-medium tracking-tight ${activeOriginal ? 'text-accent' : 'text-[#111]'}`}>
                {product.variants?.length > 0 && !selectedVariant && <span className="text-lg mr-1">From</span>}
                {typeof activePrice === 'number' ? `$${activePrice.toFixed(2)}` : activePrice}
              </span>
              {activeOriginal && (
                <span className="text-lg text-[#111]/30 line-through">${Number(activeOriginal).toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-[#111]/70 font-body leading-relaxed mb-8">
              {dynamicT(product.description)}
            </p>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-3">Select Option</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`flex flex-col items-start p-3 border text-left transition-all ${
                          isSelected
                            ? 'border-[#111] bg-[#111] text-white'
                            : 'border-[#111]/15 hover:border-[#111]/40 bg-white text-[#111]'
                        }`}
                      >
                        <span className="text-xs font-semibold tracking-wide uppercase">{v.name}</span>
                        <span className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#111]/50'}`}>
                          ${Number(v.price).toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-stretch gap-3 mb-10">
              <div className="flex items-center border border-[#111] bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors text-sm">−</button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-[#111] hover:text-white transition-colors text-sm">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.variants?.length > 0 && !selectedVariant}
                className={`flex-1 flex items-center justify-between px-6 h-12 transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-[#111] text-white hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                <span className="text-xs uppercase tracking-widest font-medium">
                  {added ? 'Added!' : product.variants?.length > 0 && !selectedVariant ? 'Select an Option' : 'Add to Cart'}
                </span>
                {added ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </button>
            </div>

            {/* Features */}
            {product.features?.length > 0 && (
              <div className="border-t border-[#111]/10 pt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-body text-[#111]/70">
                      <span className="text-accent mt-0.5">—</span>
                      {dynamicT(f)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="border-t border-[#111]/10 pt-8 mt-8">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[10px] uppercase tracking-widest text-[#111]/40 mb-0.5">{key}</p>
                      <p className="text-sm text-[#111] font-medium">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#111]/10">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#111] mb-8">More in {dynamicT(product.category)}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px border border-[#111]/10 bg-[#111]/10">
              {related.map(p => (
                <Link key={p.id} to={`/ProductDetail?id=${p.id}`}>
                  <div className="bg-white group p-6 flex flex-col gap-4 hover:bg-[#F5F5F5] transition-colors h-full">
                    <div className="aspect-square flex items-center justify-center">
                      <img src={p.image} alt={dynamicT(p.name)} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-tight text-[#111] line-clamp-2 mb-1">{dynamicT(p.name)}</p>
                      <p className="text-xs text-[#111]/50 font-medium">
                        {typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}