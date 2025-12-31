import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Check, ChevronLeft, ChevronRight, Package, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { products } from '../components/dentalcore/productsData';
import { createPageUrl } from '../utils';

export default function ProductDetail() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  const product = products.find(p => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate(createPageUrl('Home'))}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(createPageUrl('Home'))}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-6 border border-gray-100"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {product.popular && (
                <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                  Popular Choice
                </Badge>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-4" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <Badge className="mb-3 bg-cyan-50 text-cyan-700 hover:bg-cyan-100">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews?.length || 0} reviews
                </span>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Separator className="my-6" />

            {/* Price & Add to Cart */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-4xl font-bold text-gray-900">{product.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Package, text: 'Free Shipping' },
                { icon: Shield, text: 'Warranty Included' },
                { icon: Truck, text: 'Fast Delivery' }
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                  <item.icon className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.features?.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0 w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-cyan-600" />
                </div>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {Object.entries(product.specs || {}).map(([key, value], idx) => (
              <div
                key={idx}
                className={`grid grid-cols-2 gap-4 p-6 ${
                  idx !== Object.keys(product.specs).length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <p className="font-semibold text-gray-900">{key}</p>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => {
                    window.location.href = createPageUrl('ProductDetail') + `?id=${relatedProduct.id}`;
                  }}
                >
                  <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-cyan-600 font-semibold mb-1">{relatedProduct.category}</p>
                    <h3 className="font-bold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold text-gray-900">{relatedProduct.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}