import { motion } from 'framer-motion';
import { useContentStore } from '../store/contentStore';

export default function AboutSection() {
  const { aboutContent } = useContentStore();

  return (
    <section id="about" className="py-24 bg-[#FDFDFD]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="section-title">{aboutContent.title}</h2>
            <div className="space-y-6 text-lg text-[#111]/70 font-body leading-relaxed max-w-xl">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="border border-[#111]/10 divide-y divide-[#111]/10">
            {aboutContent.values.map((item, i) => (
              <div key={i} className="p-8 lg:p-10 hover:bg-[#F5F5F5] transition-colors">
                <span className="text-xs font-bold text-accent tracking-widest uppercase mb-4 block">0{i + 1}</span>
                <h3 className="text-xl font-medium uppercase tracking-tight text-[#111] mb-3">{item.title}</h3>
                <p className="text-sm font-body text-[#111]/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}