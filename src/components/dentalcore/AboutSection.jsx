import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award } from 'lucide-react';
import { useContentStore } from '../store/contentStore';

export default function AboutSection() {
  const { aboutContent } = useContentStore();
  const iconMap = { 'Doctor-Focused': Heart, 'Personal Support': MessageCircle, 'Curated Excellence': Award };

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">{aboutContent.tagline}</span>
          <h2 className="section-title">{aboutContent.title}</h2>
          <div className="section-divider mt-4" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="bg-white p-10 lg:p-14 rounded-2xl border border-slate-100">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-slate-700 leading-relaxed" : "text-base text-slate-500 leading-relaxed font-light"}>{p}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {aboutContent.values.map((item, i) => {
            const Icon = iconMap[item.title] || Heart;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                <div className="group bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300">
                  <div className="inline-flex p-3 bg-slate-50 rounded-xl mb-6 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}