import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I sterilize the UC CUT tips?",
    answer: "All UC CUT tips (Metal #90, #110, Bovie, etc.) are fully autoclavable. They can be sterilized in a standard steam autoclave at 134°C (273°F). The main handpiece unit should be wiped down with a disinfectant and barrier-protected; it is NOT autoclavable."
  },
  {
    question: "What is the warranty period?",
    answer: "The UC CUT unit comes with a 1-Year Manufacturer's Warranty covering defects in materials and workmanship. This ensures peace of mind for your practice."
  },
  {
    question: "How does the vibration feature help?",
    answer: "The unique sonic vibration (unlike standard heat carriers) helps to cut through gutta-percha cleanly. This micro-vibration prevents the heated tip from sticking to the cone, ensuring you don't accidentally pull the obturation material out of the canal."
  },
  {
    question: "How fast does it heat up?",
    answer: "The UC CUT features instantaneous heating, reaching up to 180°C at the tip within seconds. The heat is concentrated at the apical 2-3mm of the tip for safety and precision."
  },
  {
    question: "Is the battery replaceable?",
    answer: "The UC CUT uses a high-performance built-in rechargeable battery designed for long-lasting use. It charges quickly via the included charging base."
  },
  {
    question: "Can I use it for soft tissue?",
    answer: "Yes! With the specialized 'Bovie' (SB) tip, the UC CUT functions as a precise gum cautery device for gingivectomies and hemostasis."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Support</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-800/80 rounded-2xl px-6 bg-gray-900/40 backdrop-blur-sm hover:border-gray-700 transition-colors data-[state=open]:border-cyan-500/30 data-[state=open]:bg-gray-900/60"
              >
                <AccordionTrigger className="text-left text-white font-medium py-5 hover:no-underline text-[15px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}