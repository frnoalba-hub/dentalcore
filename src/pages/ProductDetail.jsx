import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Check, Package, Shield, Truck, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { createPageUrl } from '../utils';
import { useCartStore } from '../components/store/cartStore';
import { toast } from 'sonner';

export default function ProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const product = products.find(p => p.id === productId);

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const allImages = product ? [product.image, ...(product.images || [])].filter(Boolean) : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`, {
      action: { label: 'View Cart', onClick: () => openCart() },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky back bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900 font-medium text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-14 mb-24">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-[#f8f8f6] rounded-2xl overflow-hidden mb-4"
            >
              <img
                src={allImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-10"
              />
              {product.popular && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Popular
                </span>
              )}
            </motion.div>

            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-1 aspect-square bg-[#f8f8f6] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-blue-600' : 'border-transparent hover:border-slate-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <span className="text-blue-600 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">
              {product.category}
            </span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">{product.reviews?.length || 0} reviews</span>
            </div>
            <p className="text-base text-slate-500 leading-relaxed mb-8 font-light">{product.description}</p>

            <Separator className="my-8 bg-slate-100" />

            {/* Price & Cart */}
            <div className="bg-[#fafaf8] rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.15em] font-medium mb-1">Price</p>
                  <p className="text-4xl font-bold text-slate-900">{product.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-600 font-medium"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-lg text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-600 font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full h-13 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-full"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Package, text: 'Free Shipping' },
                { icon: Shield, text: 'Warranty' },
                { icon: Truck, text: 'Fast Delivery' }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 bg-[#fafaf8] rounded-xl">
                  <item.icon className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        {product.features?.length > 0 && (
          <div className="mb-20">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#fafaf8] rounded-xl">
                  <div className="flex-shrink-0 w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <p className="text-slate-600 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mb-20">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
            <div className="bg-[#fafaf8] rounded-2xl overflow-hidden">
              {Object.entries(product.specs).map(([key, value], idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-2 gap-4 p-5 ${
                    idx !== Object.keys(product.specs).length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <p className="font-medium text-slate-900 text-sm">{key}</p>
                  <p className="text-slate-500 text-sm font-light">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-20">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="bg-[#fafaf8] rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-900 mb-1 text-sm">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8 bg-[#fafaf8] rounded-2xl text-sm">No reviews yet.</p>
          )}
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} to={`${createPageUrl('ProductDetail')}?id=${rp.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <div className="aspect-square bg-[#f8f8f6] p-6 flex items-center justify-center">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mb-1">{rp.category}</p>
                      <h3 className="font-medium text-slate-900 text-sm mb-1 line-clamp-1">{rp.name}</h3>
                      <p className="text-lg font-bold text-slate-900">{rp.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}