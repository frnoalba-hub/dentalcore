import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "How do I sterilize the UC CUT tips?", answer: "All UC CUT tips are fully autoclavable at 134°C (273°F). The main handpiece should be wiped down with disinfectant and barrier-protected; it is NOT autoclavable." },
  { question: "What is the warranty period?", answer: "The UC CUT comes with a 1-Year Manufacturer's Warranty covering defects in materials and workmanship." },
  { question: "How does the vibration feature help?", answer: "The sonic vibration prevents the heated tip from sticking to gutta-percha, ensuring you don't accidentally pull obturation material out of the canal." },
  { question: "How fast does it heat up?", answer: "Instantaneous heating up to 180°C. Heat is concentrated at the apical 2-3mm of the tip for safety and precision." },
  { question: "Is the battery replaceable?", answer: "The UC CUT uses a high-performance built-in rechargeable battery. It charges quickly via the included charging base." },
  { question: "Can I use it for soft tissue?", answer: "Yes! With the specialized 'Bovie' (SB) tip, it functions as a precise gum cautery device for gingivectomies and hemostasis." },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-28 bg-[#0e1319]">
      <div className="container mx-auto px-6 lg:px-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Support</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-white/[0.05] rounded-xl px-5 bg-white/[0.015] hover:bg-white/[0.025] transition-colors data-[state=open]:border-amber-500/20 data-[state=open]:bg-white/[0.025]">
                <AccordionTrigger className="text-left text-white/70 font-medium py-4 hover:no-underline text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-white/30 leading-relaxed pb-4 text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}