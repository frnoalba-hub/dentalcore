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
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold">
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-gray-500 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-200"
            >
              <img
                src={allImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {product.popular && (
                <Badge className="absolute top-4 left-4 bg-amber-500 text-white font-bold shadow-lg">
                  Popular Choice
                </Badge>
              )}
            </motion.div>

            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-amber-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
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
            <Badge className="mb-3 bg-amber-50 text-amber-700 border border-amber-200">
              {product.category}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.reviews?.length || 0} reviews</span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <Separator className="my-6" />

            {/* Price & Cart */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Price</p>
                  <p className="text-4xl font-bold text-slate-900">{product.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center text-slate-900 font-semibold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center text-slate-900 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-base shadow-lg shadow-amber-500/20"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
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
                <div key={idx} className="text-center p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <item.icon className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        {product.features?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-gray-700 text-sm font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
              {Object.entries(product.specs).map(([key, value], idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-2 gap-4 p-5 ${
                    idx !== Object.keys(product.specs).length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <p className="font-semibold text-slate-900 text-sm">{key}</p>
                  <p className="text-gray-500 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8 bg-gray-50 rounded-2xl border border-gray-200">No reviews yet.</p>
          )}
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} to={`${createPageUrl('ProductDetail')}?id=${rp.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center">
                      <img src={rp.image} alt={rp.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider mb-1">{rp.category}</p>
                      <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">{rp.name}</h3>
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