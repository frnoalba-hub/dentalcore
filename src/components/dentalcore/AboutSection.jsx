import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

export default function AboutSection() {
  const { aboutContent } = useContentStore();
  const iconMap = { 'Doctor-Focused': Heart, 'Personal Support': MessageCircle, 'Curated Excellence': Award };

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-white">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-blue-600 font-semibold tracking-[0.15em] text-xs uppercase mb-3 block">{aboutContent.tagline}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">{aboutContent.title}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="bg-gradient-to-br from-slate-50 to-white p-8 lg:p-12 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-slate-700 leading-relaxed" : "text-base text-slate-500 leading-relaxed"}>{p}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutContent.values.map((item, i) => {
            const Icon = iconMap[item.title] || Heart;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                <div className="group bg-white p-7 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-300">
                  <div className="inline-flex p-3.5 bg-blue-50 rounded-xl mb-5 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}