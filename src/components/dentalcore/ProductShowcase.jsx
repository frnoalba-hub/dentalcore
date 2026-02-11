import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Play, X, ChevronLeft, ChevronRight, Maximize2, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ImageZoom({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = React.useRef(null);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute top-5 right-5 flex gap-2 z-20">
        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.5)); }} className="border-white/10 bg-white/5 hover:bg-white/10"><ZoomOut className="w-4 h-4" /></Button>
        <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(4, z + 0.5)); }} className="border-white/10 bg-white/5 hover:bg-white/10"><ZoomIn className="w-4 h-4" /></Button>
        <Button variant="outline" size="icon" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10"><X className="w-4 h-4" /></Button>
      </div>
      <div ref={containerRef} className="relative w-full max-w-4xl aspect-square overflow-hidden rounded-2xl cursor-zoom-in" onMouseMove={handleMouseMove} onClick={(e) => e.stopPropagation()}>
        <div className="w-full h-full bg-[#0c1117] flex items-center justify-center transition-transform duration-100" style={{ transform: `scale(${zoom})`, transformOrigin: `${position.x}% ${position.y}%` }}>
          {src && <img src={src} alt={alt} className="w-full h-full object-contain" />}
        </div>
      </div>
    </motion.div>
  );
}

function VideoDemo({ videoId, title, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={onClose}>
      <Button variant="outline" size="icon" onClick={onClose} className="absolute top-5 right-5 border-white/10 bg-white/5 z-10"><X className="w-4 h-4" /></Button>
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {videoId ? <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" /> : <div className="w-full h-full bg-[#0e1319]" />}
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const [activeView, setActiveView] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showZoom, setShowZoom] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [idx, setIdx] = useState(0);

  const gallery = [
    { id: 1, label: 'UC CUT Device', src: 'https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060', dark: true },
    { id: 2, label: 'Side View', src: 'https://maruchiusa.com/cdn/shop/products/UC-CUT-side_2048x2048.png?v=1656021060', dark: true },
    { id: 4, label: 'Tips Collection', src: 'https://tricountydental.com/cdn/shop/files/epdent-uccut-gutta-percha-cutting-devices-1006-4.jpg?v=1757618951', dark: false },
    { id: 5, label: 'F Tip', src: 'https://tricountydental.com/cdn/shop/files/uccutfTip_cae217dd-dbad-48c1-a1d5-81cdba86fcbb.webp?v=1757619032', dark: true },
    { id: 6, label: 'SB Bovie Tip', src: 'https://usdentaloutlet.com/cdn/shop/files/sb-tip.png?v=1751916971', dark: true },
    { id: 8, label: 'Device in Use', src: 'https://usdentaloutlet.com/cdn/shop/files/uc-cut-3.jpg?v=1731621539', dark: false },
  ];

  const videos = [
    { id: 'ZwmWPHiCP8o', title: 'UC CUT Overview', duration: '2:45' },
    { id: 'BK_5dFZ5p8w', title: 'UC CUT In Action', duration: '1:30' },
    { id: 'Y3fF-V9SGlw', title: 'GP Cutting Demo', duration: '2:00' },
  ];

  return (
    <section id="gallery" className="relative py-28 px-6 lg:px-12 bg-[#0e1319]">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Visual Tour</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight">Explore UC CUT</h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
            {[{ id: 'gallery', icon: ImageIcon, label: 'Gallery' }, { id: 'video', icon: Video, label: 'Videos' }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveView(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeView === tab.id ? 'bg-amber-500 text-[#0c1117]' : 'text-white/35 hover:text-white/60'}`}>
                <tab.icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="max-w-3xl mx-auto mb-6">
                <div className={`relative aspect-[4/3] rounded-2xl border border-white/[0.06] overflow-hidden group cursor-pointer ${gallery[idx].dark ? 'bg-[#0c1117]' : 'bg-white'}`} onClick={() => setShowZoom(true)}>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img src={gallery[idx].src} alt={gallery[idx].label} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/50 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2"><Maximize2 className="w-3.5 h-3.5 text-amber-400" /><span className="text-[11px] text-white/50">Zoom</span></div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + gallery.length) % gallery.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"><ChevronLeft className="w-5 h-5 text-white" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % gallery.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"><ChevronRight className="w-5 h-5 text-white" /></button>
                </div>
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                {gallery.map((img, i) => (
                  <button key={img.id} onClick={() => setIdx(i)} className={`w-14 h-14 rounded-lg border-2 overflow-hidden transition-all ${idx === i ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-white/[0.06] hover:border-white/15'}`}>
                    <div className={`w-full h-full flex items-center justify-center p-0.5 ${img.dark ? 'bg-[#0e1319]' : 'bg-white'}`}><img src={img.src} alt={img.label} className="w-full h-full object-contain" /></div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {activeView === 'video' && (
            <motion.div key="video" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {videos.map((v, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} onClick={() => { setSelectedImage(v); setShowVideo(true); }} className="group cursor-pointer">
                    <div className="relative aspect-video bg-[#0e1319] rounded-xl border border-white/[0.06] overflow-hidden hover:border-amber-500/20 transition-all">
                      <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-amber-500/90 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-amber-500/20"><Play className="w-5 h-5 text-[#0c1117] ml-0.5" fill="currentColor" /></div>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white/50">{v.duration}</div>
                    </div>
                    <h4 className="text-xs font-medium mt-2.5 text-white/40 group-hover:text-amber-400/70 transition-colors">{v.title}</h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>{showZoom && <ImageZoom src={gallery[idx]?.src} alt={gallery[idx]?.label} onClose={() => setShowZoom(false)} />}</AnimatePresence>
      <AnimatePresence>{showVideo && selectedImage && <VideoDemo videoId={selectedImage.id} title={selectedImage.title} isOpen={showVideo} onClose={() => { setShowVideo(false); setSelectedImage(null); }} />}</AnimatePresence>
    </section>
  );
}