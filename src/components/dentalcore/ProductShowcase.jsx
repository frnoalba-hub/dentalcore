import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ZoomIn, ZoomOut, Play, X, ChevronLeft, ChevronRight, Maximize2,
  Video, Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function ImageZoom({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute top-6 right-6 flex gap-2 z-20">
        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.5)); }} className="border-gray-700 bg-gray-900/80 hover:bg-gray-800">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(4, z + 0.5)); }} className="border-gray-700 bg-gray-900/80 hover:bg-gray-800">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onClose} className="border-gray-700 bg-gray-900/80 hover:bg-gray-800">
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
          style={{ transform: `scale(${zoom})`, transformOrigin: `${position.x}% ${position.y}%` }}
        >
          {src ? (
            <img src={src} alt={alt} className="w-full h-full object-contain" />
          ) : (
            <div className="text-center p-8">
              <ZoomIn className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">Image placeholder</p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        Zoom: {zoom}x · Move mouse to pan
      </div>
    </motion.div>
  );
}

function VideoDemo({ videoId, title, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Button variant="outline" size="icon" onClick={onClose} className="absolute top-6 right-6 border-gray-700 bg-gray-900/80 z-10">
        <X className="w-4 h-4" />
      </Button>
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <Video className="w-16 h-16 text-gray-600" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const [activeView, setActiveView] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const galleryImages = [
    { id: 1, label: 'UC CUT Device', src: 'https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060', darkBg: true },
    { id: 2, label: 'UC CUT Side View', src: 'https://maruchiusa.com/cdn/shop/products/UC-CUT-side_2048x2048.png?v=1656021060', darkBg: true },
    { id: 4, label: 'Tips Collection', src: 'https://tricountydental.com/cdn/shop/files/epdent-uccut-gutta-percha-cutting-devices-1006-4.jpg?v=1757618951', darkBg: false },
    { id: 5, label: 'F Tip', src: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032', darkBg: true },
    { id: 6, label: 'SB Bovie Tip', src: 'https://usdentaloutlet.com/cdn/shop/files/sb-tip.png?v=1751916971', darkBg: true },
    { id: 7, label: 'Full Kit', src: 'https://tricountydental.com/cdn/shop/files/epdent-uccut-gutta-percha-cutting-devices-1006-4.jpg?v=1757618951', darkBg: false },
    { id: 8, label: 'Device in Use', src: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-3.jpg?v=1731621539', darkBg: false },
  ];

  const productVideos = [
    { id: 'ZwmWPHiCP8o', title: 'UC CUT Overview Demo', duration: '2:45' },
    { id: 'BK_5dFZ5p8w', title: 'UC CUT In Action', duration: '1:30' },
    { id: 'Y3fF-V9SGlw', title: 'Gutta-Percha Cutting Demo', duration: '2:00' },
  ];

  return (
    <section id="gallery" className="relative py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Visual Tour</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">Explore UC CUT</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Zoomable images and video demonstrations of every angle.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900/80 border border-gray-800 rounded-xl p-1">
            {[
              { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
              { id: 'video', icon: Video, label: 'Videos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeView === tab.id
                    ? 'bg-cyan-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="max-w-3xl mx-auto mb-8">
                <div
                  className={`relative aspect-[4/3] rounded-2xl border border-gray-800 overflow-hidden group cursor-pointer ${
                    galleryImages[currentGalleryIndex].darkBg
                      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                      : 'bg-white'
                  }`}
                  onClick={() => setShowZoom(true)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img src={galleryImages[currentGalleryIndex].src} alt={galleryImages[currentGalleryIndex].label} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-300">Click to zoom</span>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentGalleryIndex(i => (i - 1 + galleryImages.length) % galleryImages.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors">
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentGalleryIndex(i => (i + 1) % galleryImages.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                {galleryImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentGalleryIndex(index)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      currentGalleryIndex === index ? 'border-cyan-500 ring-2 ring-cyan-500/30' : 'border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-full h-full flex items-center justify-center p-1 ${img.darkBg ? 'bg-gray-800' : 'bg-white'}`}>
                      <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'video' && (
            <motion.div key="video" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {productVideos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => { setSelectedImage(video); setShowVideo(true); }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/40 transition-all duration-300">
                      <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-cyan-500/90 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-cyan-500/30">
                          <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-300">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="text-sm font-medium mt-3 text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {video.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showZoom && (
          <ImageZoom src={galleryImages[currentGalleryIndex]?.src} alt={galleryImages[currentGalleryIndex]?.label} onClose={() => setShowZoom(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVideo && selectedImage && (
          <VideoDemo videoId={selectedImage.id} title={selectedImage.title} isOpen={showVideo} onClose={() => { setShowVideo(false); setSelectedImage(null); }} />
        )}
      </AnimatePresence>
    </section>
  );
}