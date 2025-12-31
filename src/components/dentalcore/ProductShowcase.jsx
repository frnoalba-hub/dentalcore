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
  Box,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// 360 View Component
function Product360View({ images, productName }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Placeholder frames (in production, these would be actual 360 images)
  const frameCount = images?.length || 36;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % frameCount);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, frameCount]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX);
    setIsPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const diff = currentX - startX;
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? 1 : -1;
      setCurrentFrame(prev => (prev + direction + frameCount) % frameCount);
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="aspect-square bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Placeholder for 360 images */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <Box className="w-20 h-20 text-cyan-200 mx-auto mb-4" />
              <p className="text-gray-900 text-sm font-medium">
                360° View - Frame {currentFrame + 1}/{frameCount}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Drag to rotate • Upload 360° images
              </p>
            </div>
          </div>

          {/* Rotation indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <RotateCcw className="w-4 h-4 text-cyan-600 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-xs text-gray-600 font-medium">Drag to rotate</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="ml-2">{isPlaying ? 'Pause' : 'Auto Rotate'}</span>
        </Button>

        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <Slider
            value={[currentFrame]}
            max={frameCount - 1}
            step={1}
            onValueChange={([value]) => {
              setCurrentFrame(value);
              setIsPlaying(false);
            }}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

// Interactive Zoom Component
function ImageZoom({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.5)); }}
          className="border-gray-700 bg-gray-900/50"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(4, z + 0.5)); }}
          className="border-gray-700 bg-gray-900/50"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="border-gray-700 bg-gray-900/50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-4xl aspect-square overflow-hidden rounded-2xl cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center transition-transform duration-100"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${position.x}% ${position.y}%`
          }}
        >
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-contain" />
          ) : (
            <div className="text-center p-8">
              <ZoomIn className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">Image placeholder</p>
              <p className="text-xs text-gray-600 mt-2">Move mouse to pan • Scroll or use buttons to zoom</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-400">
        Zoom: {zoom}x • Move mouse to pan
      </div>
    </motion.div>
  );
}

// Video Demo Component
function VideoDemo({ videoId, title, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 border-gray-700 bg-gray-900/50 z-10"
      >
        <X className="w-4 h-4" />
      </Button>

      <div 
        className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center p-8">
              <Video className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">{title}</p>
              <p className="text-xs text-gray-600 mt-2">Video demo placeholder</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main Product Showcase Component
export default function ProductShowcase() {
  const [activeView, setActiveView] = useState('gallery'); // '360', 'gallery', 'video'
  const [selectedImage, setSelectedImage] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const galleryImages = [
    { id: 1, label: 'UC CUT Device', src: 'https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060', darkBg: true },
    { id: 2, label: 'UC CUT Side View', src: 'https://maruchiusa.com/cdn/shop/products/UC-CUT-side_2048x2048.png?v=1656021060', darkBg: true },
    { id: 3, label: 'UC CUT Colors', src: 'https://maruchiusa.com/cdn/shop/products/UC-CUT_2048x2048.png?v=1656021060', darkBg: true },
    { id: 4, label: 'Tips Collection', src: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-2.jpg?v=1731621503', darkBg: false },
    { id: 5, label: 'F Tip', src: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032', darkBg: true },
    { id: 6, label: 'SB Bovie Tip', src: 'https://tricountydental.com/cdn/shop/files/sb-tip.avif?v=1757618977', darkBg: true },
    { id: 7, label: 'Full Kit', src: 'https://tricountydental.com/cdn/shop/files/epdent-uccut-gutta-percha-cutting-devices-1006-4.jpg?v=1757618951', darkBg: false },
    { id: 8, label: 'Device in Use', src: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-3.jpg?v=1731621539', darkBg: false },
  ];

  const productVideos = [
    { id: 'ZwmWPHiCP8o', title: 'UC CUT Overview Demo', duration: '2:45' },
    { id: 'BK_5dFZ5p8w', title: 'UC CUT In Action', duration: '1:30' },
    { id: 'Y3fF-V9SGlw', title: 'Gutta-Percha Cutting Demo', duration: '2:00' },
    { id: null, title: 'Vertical Condensation Guide', duration: '1:45' },
  ];

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Explore UC CUT
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Get an up-close look at the UC CUT device with interactive 360° views, zoomable images, and detailed video demonstrations
          </p>
        </motion.div>

        {/* View selector tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {[
              { id: '360', icon: RotateCcw, label: '360° View' },
              { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
              { id: 'video', icon: Video, label: 'Video Demos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeView === tab.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          {activeView === '360' && (
            <motion.div
              key="360"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <Product360View productName="UC CUT" />
              <p className="text-center text-gray-500 text-sm mt-6">
                Click and drag to rotate the product • Use controls to auto-rotate
              </p>
            </motion.div>
          )}

          {activeView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Main image */}
              <div className="max-w-3xl mx-auto mb-8">
                <div 
                  className={`relative aspect-[4/3] rounded-2xl border border-gray-700 overflow-hidden group cursor-pointer ${
                    galleryImages[currentGalleryIndex].darkBg 
                      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
                      : 'bg-white'
                  }`}
                  onClick={() => setShowZoom(true)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    {galleryImages[currentGalleryIndex].src ? (
                      <img 
                        src={galleryImages[currentGalleryIndex].src} 
                        alt={galleryImages[currentGalleryIndex].label}
                        className="max-w-full max-h-full object-contain drop-shadow-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-20 h-20 text-cyan-400 mx-auto mb-4 opacity-50" />
                        <p className="text-gray-500">{galleryImages[currentGalleryIndex].label}</p>
                      </div>
                    )}
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-300">Click to zoom</span>
                    </div>
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentGalleryIndex(i => (i + 1) % galleryImages.length);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-3 flex-wrap">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentGalleryIndex(index)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                      currentGalleryIndex === index
                        ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-full h-full flex items-center justify-center p-1 ${
                      img.darkBg ? 'bg-gray-800' : 'bg-white'
                    }`}>
                      {img.src ? (
                        <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {productVideos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedImage(video);
                      setShowVideo(true);
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                      {video.id ? (
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-600" />
                        </div>
                      )}

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30">
                          <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-300">
                        {video.duration}
                      </div>
                    </div>

                    <h4 className="text-lg font-medium mt-4 text-white group-hover:text-cyan-400 transition-colors">
                      {video.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {showZoom && (
          <ImageZoom
            src={galleryImages[currentGalleryIndex]?.src}
            alt={galleryImages[currentGalleryIndex]?.label}
            onClose={() => setShowZoom(false)}
          />
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && selectedImage && (
          <VideoDemo
            videoId={selectedImage.id}
            title={selectedImage.title}
            isOpen={showVideo}
            onClose={() => {
              setShowVideo(false);
              setSelectedImage(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}