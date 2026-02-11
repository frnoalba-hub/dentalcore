import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { companyInfo } from './productsData';

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-28 px-6 lg:px-12 bg-[#0a0e14] overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-amber-400/70 font-semibold tracking-[0.2em] text-[11px] uppercase mb-3 block">Get in Touch</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white/90 tracking-tight mb-3">Let's Connect</h2>
          <p className="text-base text-white/30">Professional support for your dental practice.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.a href={`mailto:${companyInfo.email}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
            className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:border-amber-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 bg-amber-500/[0.06] rounded-xl flex items-center justify-center border border-amber-500/10"><Mail className="w-5 h-5 text-amber-400/70" /></div>
              <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-amber-400/50 transition-all" />
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-semibold mb-1.5">Email Support</p>
            <p className="text-base font-semibold text-white/70 group-hover:text-amber-300/80 transition-colors">{companyInfo.email}</p>
          </motion.a>

          <motion.a href={`tel:${companyInfo.phone}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}
            className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl p-7 hover:border-amber-500/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 bg-amber-500/[0.06] rounded-xl flex items-center justify-center border border-amber-500/10"><Phone className="w-5 h-5 text-amber-400/70" /></div>
              <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-amber-400/50 transition-all" />
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-widest font-semibold mb-1.5">Sales Line</p>
            <p className="text-base font-semibold text-white/70 group-hover:text-amber-300/80 transition-colors">{companyInfo.phone}</p>
          </motion.a>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-16 pt-8 border-t border-white/[0.04] text-center">
          <div className="flex items-center justify-center gap-1.5 text-white/15 text-xs mb-2"><MapPin className="w-3 h-3" /><span>California, USA</span></div>
          <p className="text-white/10 text-[11px]">© {new Date().getFullYear()} {companyInfo.companyName}</p>
        </motion.div>
      </div>
    </section>
  );
}