import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Video,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ProductShowcase({ 
  images = [], 
  videoUrl = null, 
  productName = 'Product',
  description = ''
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const rotationInterval = useRef(null);

  // Auto-rotate through images for 360° effect
  useEffect(() => {
    if (isRotating && images.length > 1) {
      rotationInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setRotationAngle((prev) => (prev + (360 / images.length)) % 360);
      }, 150);
    }
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [isRotating, images.length]);

  // Handle mouse drag for manual rotation
  const handleMouseDown = (e) => {
    if (images.length > 1 && !isZoomed) {
      setIsDragging(true);
      setDragStart(e.clientX);
      setIsRotating(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && images.length > 1) {
      const delta = e.clientX - dragStart;
      if (Math.abs(delta) > 20) {
        const direction = delta > 0 ? 1 : -1;
        setCurrentImageIndex((prev) => {
          const newIndex = prev + direction;
          if (newIndex < 0) return images.length - 1;
          if (newIndex >= images.length) return 0;
          return newIndex;
        });
        setRotationAngle((prev) => (prev + (direction * (360 / images.length))) % 360);
        setDragStart(e.clientX);
      }
    }

    // Track mouse for zoom lens effect
    if (isZoomed && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
    }
  };

  const handleZoomChange = (value) => {
    setZoomLevel(value[0]);
    if (value[0] > 1) {
      setIsZoomed(true);
    } else {
      setIsZoomed(false);
    }
  };

  // Placeholder images if none provided
  const displayImages = images.length > 0 ? images : [
    { url: null, label: 'Front View' },
    { url: null, label: 'Side View' },
    { url: null, label: 'Back View' },
    { url: null, label: 'Top View' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="relative aspect-square bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-gray-800 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Image Display */}
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-100"
          style={{
            transform: isZoomed 
              ? `scale(${zoomLevel})` 
              : 'scale(1)',
            transformOrigin: isZoomed 
              ? `${mousePosition.x}% ${mousePosition.y}%` 
              : 'center',
          }}
        >
          {displayImages[currentImageIndex]?.url ? (
            <img 
              src={displayImages[currentImageIndex].url}
              alt={`${productName} - ${displayImages[currentImageIndex].label}`}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          ) : (
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
                <RotateCcw className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm">
                {displayImages[currentImageIndex]?.label || 'Product Image'}
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Upload 360° images here
              </p>
            </div>
          )}
        </div>

        {/* Rotation Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <RotateCw 
              className="w-4 h-4 text-cyan-400"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            />
            <span className="text-xs text-gray-300">
              {Math.round(rotationAngle)}°
            </span>
          </div>
        )}

        {/* Zoom Lens Indicator */}
        {isZoomed && (
          <div 
            className="absolute w-24 h-24 border-2 border-cyan-400/50 rounded-full pointer-events-none"
            style={{
              left: `calc(${mousePosition.x}% - 48px)`,
              top: `calc(${mousePosition.y}% - 48px)`,
            }}
          />
        )}

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {/* Zoom Toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleZoom}
            className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border border-gray-700"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </Button>

          {/* 360 Rotate */}
          {images.length > 1 && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsRotating(!isRotating)}
              className={`bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border border-gray-700 ${
                isRotating ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              <RotateCcw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
            </Button>
          )}

          {/* Video Demo */}
          {videoUrl && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowVideo(true)}
              className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border border-gray-700"
            >
              <Video className="w-4 h-4" />
            </Button>
          )}

          {/* Fullscreen */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.requestFullscreen?.();
              }
            }}
            className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white border border-gray-700"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Drag Hint */}
        {images.length > 1 && !isDragging && !isRotating && !isZoomed && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <ChevronLeft className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Drag to rotate</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>
        )}
      </div>

      {/* Zoom Slider */}
      {isZoomed && (
        <div className="flex items-center gap-4 px-4">
          <ZoomOut className="w-4 h-4 text-gray-500" />
          <Slider
            value={[zoomLevel]}
            onValueChange={handleZoomChange}
            min={1}
            max={4}
            step={0.1}
            className="flex-1"
          />
          <ZoomIn className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-400 w-12">{zoomLevel.toFixed(1)}x</span>
        </div>
      )}

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setRotationAngle((index / displayImages.length) * 360);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                currentImageIndex === index 
                  ? 'border-cyan-400 ring-2 ring-cyan-400/30' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {img.url ? (
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-[10px] text-gray-500">{index + 1}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white"
              >
                <X className="w-5 h-5" />
              </Button>
              <iframe
                src={`${videoUrl}?autoplay=1`}
                title={`${productName} Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}