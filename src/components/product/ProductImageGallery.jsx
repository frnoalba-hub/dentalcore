import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductImageGallery({ images, productName, selectedVariant }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allImages = images.filter((img, i, arr) => img && arr.indexOf(img) === i);
  const activeImage = selectedVariant?.image || allImages[selectedIndex] || allImages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <motion.div
        key={activeImage}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="aspect-square bg-[#F8F9FA] rounded-3xl border border-[#111]/5 flex items-center justify-center p-8 lg:p-12 overflow-hidden relative shadow-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] to-transparent pointer-events-none" />
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
        />
      </motion.div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3 mt-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square bg-[#F8F9FA] rounded-xl p-2 transition-all duration-200 overflow-hidden ${
                selectedIndex === idx && !selectedVariant?.image
                  ? 'ring-2 ring-accent ring-offset-2 border-transparent bg-white shadow-sm'
                  : 'border border-[#111]/10 hover:border-[#111]/30 hover:bg-white'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}