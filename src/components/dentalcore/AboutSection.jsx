import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Award, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 opacity-50 z-0" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Our Story</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            About Dental Core Supplies
          </h2>
          <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative mb-20"
        >
          <div className="p-10 lg:p-14 bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50">
            <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                Dental Core Supplies is a <span className="text-gray-900 font-medium">dentist-focused distributor</span> based in California. 
                We are dedicated to bringing practical, high-value innovations like the 
                <span className="text-cyan-600 font-medium"> UC CUT by EPDENT</span> directly to local dental practices.
              </p>
              
              <div className="w-full h-px bg-gray-100 my-8" />
              
              <p className="text-lg text-gray-500 leading-relaxed">
                We believe in a simple approach: <span className="text-gray-900 font-medium">start with local practices, build real relationships, and provide personal support</span>. 
                Unlike massive corporate distributors, we are agile, responsive, and truly care about your clinical success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Core values */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Doctor-Focused",
              desc: "Built for dentists, by people who understand the demands of modern dentistry."
            },
            {
              icon: MessageCircle,
              title: "Personal Support",
              desc: "Direct access to our team. No call centers, just real people ready to help."
            },
            {
              icon: Award,
              title: "Curated Excellence",
              desc: "We only carry equipment that delivers proven clinical value and reliability."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-cyan-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="inline-flex p-4 bg-cyan-50 group-hover:bg-cyan-100 rounded-2xl mb-6 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}