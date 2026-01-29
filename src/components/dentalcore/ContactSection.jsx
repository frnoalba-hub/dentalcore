import React from 'react';
    import { companyInfo } from './productsData';
    
    const ContactSection = () => {
      return (
        <section id="contact" className="py-24 px-6 border-t border-muted bg-surface/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 silver-gradient italic uppercase tracking-widest">Connect with Us</h2>
            <p className="text-secondary/60 mb-12">Professional support for Dental Core Instruments.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="glass-card p-8 rounded-sm">
                <div className="text-accent mb-2 text-sm uppercase tracking-widest font-bold">Email Support</div>
                <a href={`mailto:${companyInfo.email}`} className="text-xl font-medium hover:text-accent transition-colors">
                  {companyInfo.email}
                </a>
              </div>
              <div className="glass-card p-8 rounded-sm">
                <div className="text-accent mb-2 text-sm uppercase tracking-widest font-bold">Sales Line</div>
                <div className="text-xl font-medium">{companyInfo.phone}</div>
              </div>
            </div>
          </div>
        </section>
      );
    };
    export default ContactSection;
