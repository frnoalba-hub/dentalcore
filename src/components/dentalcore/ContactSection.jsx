import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { companyInfo } from './productsData';

export default function ContactSection() {
  const phoneNum = companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="relative bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-blue-500/[0.05] rounded-full blur-[180px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-slate-600/[0.05] rounded-full blur-[150px]" />
      </div>

      <div className="py-24 lg:py-32 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="w-10 h-0.5 bg-blue-400 mx-auto mb-5" />
            <span className="text-blue-400 font-semibold tracking-[0.2em] text-[11px] uppercase mb-4 block">Get in Touch</span>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">Let's Connect</h2>
            <p className="text-base text-white/40 max-w-md mx-auto font-light">Professional support for your dental practice needs.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            <motion.a
              href={`mailto:${companyInfo.email}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 bg-white/[0.06] rounded-xl flex items-center justify-center border border-white/[0.08]">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-blue-400 transition-all" />
              </div>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium mb-2">Email Support</p>
              <p className="text-base font-medium text-white/70 group-hover:text-blue-300 transition-colors">{companyInfo.email}</p>
            </motion.a>

            <motion.a
              href={`tel:${companyInfo.phone}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 bg-white/[0.06] rounded-xl flex items-center justify-center border border-white/[0.08]">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-blue-400 transition-all" />
              </div>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium mb-2">Sales Line</p>
              <p className="text-base font-medium text-white/70 group-hover:text-blue-300 transition-colors">{companyInfo.phone}</p>
            </motion.a>

            <motion.a
              href={`https://wa.me/1${phoneNum}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="group bg-emerald-500/[0.08] border border-emerald-500/[0.15] rounded-2xl p-8 hover:border-emerald-400/30 hover:bg-emerald-500/[0.12] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 bg-emerald-500/[0.08] rounded-xl flex items-center justify-center border border-emerald-500/[0.15]">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-emerald-400 transition-all" />
              </div>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium mb-2">WhatsApp</p>
              <p className="text-base font-medium text-white/70 group-hover:text-emerald-300 transition-colors">Message Us</p>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.05] py-8 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center font-bold text-white/60 text-xs">D</div>
            <span className="text-sm font-medium text-white/40">Dental Core Instruments LLC</span>
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