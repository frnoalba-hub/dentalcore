import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { companyInfo } from './productsData';

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-[#030303] overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-3 block">Get in Touch</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Professional support for your dental practice. We're here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.a
            href={`mailto:${companyInfo.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Email Support</p>
            <p className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {companyInfo.email}
            </p>
          </motion.a>

          <motion.a
            href={`tel:${companyInfo.phone}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                <Phone className="w-6 h-6 text-cyan-400" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Sales Line</p>
            <p className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {companyInfo.phone}
            </p>
          </motion.a>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-10 border-t border-gray-800/50 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>California, USA</span>
          </div>
          <p className="text-gray-700 text-xs">
            © {new Date().getFullYear()} {companyInfo.companyName}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;