import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, CheckCircle2 } from 'lucide-react';
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
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-gray-100">
      <div className="container mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Get Started with UC CUT
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Request a quick demo (in-office or virtual) or get intro pricing and availability information. 
            We'll reach out within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative p-10 lg:p-12 bg-white rounded-3xl border border-gray-200 shadow-xl">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-transparent to-transparent rounded-3xl" />
            
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                  placeholder="Dr. John Smith"
                />
              </div>

              {/* Practice name */}
              <div className="space-y-2">
                <Label htmlFor="practice_name" className="text-gray-700">
                  Practice Name *
                </Label>
                <Input
                  id="practice_name"
                  required
                  value={formData.practice_name}
                  onChange={(e) => handleChange('practice_name', e.target.value)}
                  className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                  placeholder="Smith Family Dentistry"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                    placeholder="drsmith@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                    placeholder="Los Angeles"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-700">
                    State *
                  </Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900 placeholder:text-gray-400"
                    placeholder="CA"
                  />
                </div>
              </div>

              {/* Interest */}
              <div className="space-y-2">
                <Label htmlFor="interest" className="text-gray-700">
                  I'm interested in: *
                </Label>
                <Select
                  value={formData.interest}
                  onValueChange={(value) => handleChange('interest', value)}
                >
                  <SelectTrigger 
                    id="interest"
                    name="interest"
                    className="bg-gray-50 border-gray-300 focus:border-cyan-500 text-gray-900"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Demo">Requesting a Demo</SelectItem>
                    <SelectItem value="Pricing">Requesting Intro Pricing</SelectItem>
                    <SelectItem value="Both">Both Demo & Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Request Submitted!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 text-center pt-2">
                We'll respond within 24 hours. Your information is kept confidential.
              </p>
            </form>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16 space-y-4"
        >
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>Dental Core Supplies</p>
            <p>California, USA</p>
            <p className="font-medium">(626) 214-6598</p>
            <p>
              <a href="mailto:info@dentalcoresupplies.com" className="text-cyan-600 hover:text-cyan-500 transition-colors">
                info@dentalcoresupplies.com
              </a>
            </p>
          </div>
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              © 2025 Dental Core Supplies. UC CUT by EPDENT. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}