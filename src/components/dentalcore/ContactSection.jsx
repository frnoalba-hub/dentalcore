import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContentStore } from '../store/contentStore';

export default function ContactSection() {
  const { businessInfo } = useContentStore();
  
  const [formData, setFormData] = useState({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    interest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        practiceName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        interest: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-30" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Request Demo or Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with us to experience the UC CUT firsthand or discuss pricing for your practice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-3xl border border-gray-800">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Practice Name</label>
                  <Input
                    value={formData.practiceName}
                    onChange={(e) => handleChange('practiceName', e.target.value)}
                    placeholder="Smith Dental"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Los Angeles"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300">State</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    placeholder="CA"
                    className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">I'm Interested In</label>
                <Select name="interest" value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
                  <SelectTrigger className="bg-[#050505] border-gray-700 text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Demo">Requesting a Demo</SelectItem>
                    <SelectItem value="Pricing">Getting Pricing Information</SelectItem>
                    <SelectItem value="Purchase">Ready to Purchase</SelectItem>
                    <SelectItem value="Support">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us more about your needs..."
                  rows={4}
                  className="bg-[#050505] border-gray-700 text-white focus:border-cyan-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : isSubmitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-8">
              {[
                { icon: Phone, label: 'Phone', value: businessInfo.phone, href: `tel:${businessInfo.phone.replace(/\D/g, '')}` },
                { icon: Mail, label: 'Email', value: businessInfo.email, href: `mailto:${businessInfo.email}` },
                { icon: MapPin, label: 'Location', value: businessInfo.location, href: null }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-6 p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
                    <item.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-bold text-white hover:text-cyan-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-8 rounded-3xl border border-cyan-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                {[
                  'Schedule an in-person demo at your practice',
                  'Get detailed pricing and package options',
                  'Learn about financing and bulk discounts',
                  'Ask technical questions from our experts'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 py-8 text-center mt-16">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}