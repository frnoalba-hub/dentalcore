import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

const testimonials = [

  {
    text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. Significantly faster than my old heat carrier.",
    author: "Endodontic Specialist",
    location: "California"
  },
  {
    text: "I use the Bovie tip for gingivectomies almost daily. It heats up instantly and offers incredible control for soft tissue management. A true 3-in-1 device.",
    author: "General Dentist",
    location: "New York"
  },
  {
    text: "Finally, a cordless unit that maintains consistent temperature. The battery life is excellent for a full day of cases, and the tips are durable and easy to autoclave.",
    author: "Dr. R. Chen",
    location: "Clinical Review"
  },
];

export default function TestimonialsSection() {
  const { t, dynamicT } = useTranslation();

  return (
    <section id="testimonials" className="py-24 bg-[#111] border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold mb-3 flex items-center gap-3">
              <span className="inline-block w-6 h-px bg-white/20" />
              {t('clinical_feedback') || 'Clinical Feedback'}
            </p>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter uppercase text-white leading-[1.05]">
              What Clinicians<br /><span className="text-white/40">Are Saying</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 lg:p-10 bg-[#111] flex flex-col justify-between min-h-[260px] hover:bg-white/[0.03] transition-colors"
            >
              <p className="text-lg lg:text-xl text-white/80 leading-snug font-medium mb-10 tracking-tight">
                "{dynamicT(item.text)}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white">{item.author}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}