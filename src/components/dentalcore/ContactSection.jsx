import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { companyInfo } from './productsData';

export default function ContactSection() {
  const phoneNum = companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="relative bg-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="py-20 lg:py-28 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-blue-400 font-semibold tracking-[0.15em] text-xs uppercase mb-3 block">Get in Touch</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">Let's Connect</h2>
            <p className="text-base text-white/40 max-w-md mx-auto">Professional support for your dental practice needs.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            <motion.a
              href={`mailto:${companyInfo.email}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-blue-400 transition-all" />
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-2">Email Support</p>
              <p className="text-lg font-semibold text-white/80 group-hover:text-blue-300 transition-colors">{companyInfo.email}</p>
            </motion.a>

            <motion.a
              href={`tel:${companyInfo.phone}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-blue-400 transition-all" />
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-2">Sales Line</p>
              <p className="text-lg font-semibold text-white/80 group-hover:text-blue-300 transition-colors">{companyInfo.phone}</p>
            </motion.a>

            <motion.a
              href={`https://wa.me/1${phoneNum}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="group bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-400/40 hover:bg-emerald-500/[0.15] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/10 group-hover:text-emerald-400 transition-all" />
              </div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-2">WhatsApp</p>
              <p className="text-lg font-semibold text-white/80 group-hover:text-emerald-300 transition-colors">Message Us</p>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-8 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">D</div>
            <span className="text-sm font-semibold text-white/60">Dental Core Instruments LLC</span>
          </div>
          <div className="flex items-center gap-2 text-white/20 text-xs">
            <MapPin className="w-3 h-3" />
            <span>California, USA</span>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} {companyInfo.companyName}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}