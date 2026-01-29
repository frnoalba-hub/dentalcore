import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    practice_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    interest: 'Both',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Request submitted successfully! We\'ll be in touch soon.');

    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        practice_name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        interest: 'Both',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-[#0a0a0a] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 -skew-y-3 origin-top-left z-0" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Ready to upgrade your practice with UC CUT? Request a demo or intro pricing today. We usually respond within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                  <a href="tel:6262146598" className="text-gray-400 hover:text-cyan-400 transition-colors text-lg">
                    (626) 214-6598
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am - 5pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                  <a href="mailto:info@dentalcoresupplies.com" className="text-gray-400 hover:text-cyan-400 transition-colors text-lg">
                    info@dentalcoresupplies.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400 text-lg">
                    California, USA
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Serving local practices</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative p-8 lg:p-10 bg-gray-900 rounded-3xl border border-gray-800 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300 font-medium">Your Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                    placeholder="Dr. John Smith"
                  />
                </div>

                {/* Practice name */}
                <div className="space-y-2">
                  <Label htmlFor="practice_name" className="text-gray-300 font-medium">Practice Name</Label>
                  <Input
                    id="practice_name"
                    required
                    value={formData.practice_name}
                    onChange={(e) => handleChange('practice_name', e.target.value)}
                    className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                    placeholder="Smith Family Dentistry"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300 font-medium">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300 font-medium">City</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-gray-300 font-medium">State</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white"
                      placeholder="State"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-gray-300 font-medium">I'm interested in</Label>
                  <Select
                    value={formData.interest}
                    onValueChange={(value) => handleChange('interest', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 focus:border-cyan-500 focus:ring-cyan-500/20 h-12 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Demo">Requesting a Demo</SelectItem>
                      <SelectItem value="Pricing">Requesting Intro Pricing</SelectItem>
                      <SelectItem value="Both">Both Demo & Pricing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-6 text-lg rounded-xl mt-2"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Request Sent
                    </>
                  ) : isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting, you agree to our privacy policy. Your data is safe.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dental Core Supplies. UC CUT by EPDENT. All rights reserved.
        </div>
      </div>
    </section>
  );
}