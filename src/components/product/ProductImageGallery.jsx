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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-square bg-white border border-[#111]/10 flex items-center justify-center p-8 lg:p-12"
      >
        <img
          src={activeImage}
          alt={productName}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </motion.div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`aspect-square bg-white border p-2 transition-all ${
                selectedIndex === idx && !selectedVariant?.image
                  ? 'border-[#111] ring-1 ring-[#111]'
                  : 'border-[#111]/10 hover:border-[#111]/40'
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