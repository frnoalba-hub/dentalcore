import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductShowcase from './ProductShowcase';
import { Zap, Flame, Activity } from 'lucide-react';

const products = [
  {
    id: 'uc-cut',
    name: 'UC CUT Unit',
    icon: Zap,
    description: 'The complete UC CUT device - Sonic GP Cutter & Gum Cauterizer. Lightweight at just 1.7 oz with ergonomic design for comfortable chairside use.',
    videoUrl: 'https://www.youtube.com/embed/ZwmWPHiCP8o?mute=1',
    features: [
      'Instantaneous heat generation',
      'Sonic vibration technology',
      '180°C focused tip heat',
      'Lightweight 1.7 oz design',
    ],
    images: [
      { url: null, label: 'Front View' },
      { url: null, label: 'Side View' },
      { url: null, label: 'Angled View' },
      { url: null, label: 'Back View' },
      { url: null, label: 'Top View' },
      { url: null, label: 'With Tip' },
    ],
  },
  {
    id: 'bovie-tip',
    name: 'Bovie Tip',
    icon: Flame,
    description: 'Specialized tip for precise gum cauterization and controlled gingivectomy procedures. Ideal for hemostasis and soft tissue management.',
    videoUrl: null,
    features: [
      'Precision cauterization',
      'Controlled tissue removal',
      'Quick hemostasis',
      'Easy attachment',
    ],
    images: [
      { url: null, label: 'Tip Overview' },
      { url: null, label: 'Close-up' },
      { url: null, label: 'Working End' },
      { url: null, label: 'Attachment Point' },
    ],
  },
  {
    id: 'endo-tip',
    name: 'Endo Tip',
    icon: Activity,
    description: 'Combines localized heat and sonic vibration to cut gutta-percha cleanly without pulling the cone from the canal.',
    videoUrl: null,
    features: [
      'Heat + vibration cutting',
      'Prevents cone pull-out',
      'Clean GP removal',
      'Precise depth control',
    ],
    images: [
      { url: null, label: 'Tip Overview' },
      { url: null, label: 'Close-up' },
      { url: null, label: 'Working End' },
      { url: null, label: 'Attachment Point' },
    ],
  },
  {
    id: 'f-fm-tips',
    name: 'F / FM Tips',
    icon: Activity,
    description: 'Designed for effective vertical condensation during obturation. Provides controlled compaction of gutta-percha in the canal.',
    videoUrl: null,
    features: [
      'Vertical condensation',
      'Down-packing precision',
      'Multiple size options',
      'Consistent heat delivery',
    ],
    images: [
      { url: null, label: 'F Tip' },
      { url: null, label: 'FM Tip' },
      { url: null, label: 'Size Comparison' },
      { url: null, label: 'Working Ends' },
    ],
  },
];

export default function ProductGallerySection() {
  const [activeProduct, setActiveProduct] = useState('uc-cut');

  return (
    <section id="products" className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Explore UC CUT In Detail
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive 360° views, zoom capabilities, and video demonstrations — see every detail before you buy
          </p>
        </motion.div>

        {/* Product Tabs */}
        <Tabs value={activeProduct} onValueChange={setActiveProduct} className="space-y-8">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0">
            {products.map((product) => (
              <TabsTrigger
                key={product.id}
                value={product.id}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900/60 border border-gray-800 data-[state=active]:bg-cyan-500/20 data-[state=active]:border-cyan-500/50 data-[state=active]:text-cyan-400 transition-all"
              >
                <product.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{product.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Product Showcase */}
                <div className="lg:sticky lg:top-28">
                  <ProductShowcase
                    images={product.images}
                    videoUrl={product.videoUrl}
                    productName={product.name}
                    description={product.description}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                        <product.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-3xl font-bold">{product.name}</h3>
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-300">Key Features</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-gray-900/60 rounded-xl border border-gray-800"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interaction Instructions */}
                  <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 rounded-2xl border border-gray-800">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                      How to Interact
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs">1</span>
                        <span><strong className="text-white">Drag</strong> the image left/right to rotate 360°</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs">2</span>
                        <span><strong className="text-white">Click zoom</strong> icon to magnify details</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs">3</span>
                        <span><strong className="text-white">Move mouse</strong> while zoomed to explore</span>
                      </li>
                      {product.videoUrl && (
                        <li className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs">4</span>
                          <span><strong className="text-white">Watch video</strong> demo for full demonstration</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href="#contact"
                      className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl text-center transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
                    >
                      Request Demo
                    </a>
                    <a
                      href="#contact"
                      className="flex-1 border-2 border-gray-600 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 rounded-xl text-center transition-all"
                    >
                      Get Pricing
                    </a>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}