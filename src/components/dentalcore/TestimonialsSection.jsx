import { motion } from 'framer-motion';

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

import { useTranslation } from '@/lib/i18n';

export default function TestimonialsSection() {
  const { t, dynamicT } = useTranslation();

  return (
    <section id="testimonials" className="py-24 bg-[#FDFDFD] border-b border-[#111]/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <h2 className="section-title mb-16">{t('clinical_feedback')}</h2>

        <div className="grid md:grid-cols-3 border-t border-l border-[#111]/10">
          {testimonials.map((item, i) => (
            <div key={i} className="p-8 lg:p-12 border-r border-b border-[#111]/10 flex flex-col justify-between">
              <p className="text-xl lg:text-2xl text-[#111] leading-snug font-medium mb-16 tracking-tight">
                "{dynamicT(item.text)}"
              </p>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#111]">{item.author}</p>
                <p className="text-xs uppercase tracking-widest text-[#111]/50 mt-1">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}