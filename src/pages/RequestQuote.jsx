import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { companyInfo } from '@/components/dentalcore/productsData';
import { base44 } from '@/api/base44Client';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';
import { trackEngagementEvent } from '@/lib/trackEvent';
import { toast } from 'sonner';

function sanitizePhoneForHref(phone) {
  return `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
}

function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RequestQuote() {
  const location = useLocation();
  const routeState = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState('');

  const prefilledLines = useMemo(() => {
    const lines = [];
    if (Array.isArray(routeState.cartItems) && routeState.cartItems.length > 0) {
      routeState.cartItems.forEach((item) => {
        lines.push(`- ${item.name} x${item.quantity}`);
      });
    } else if (routeState.product?.name) {
      lines.push(`- ${routeState.product.name} x${routeState.quantity || 1}`);
      if (routeState.product.variantName) {
        lines.push(`  Variant: ${routeState.product.variantName}`);
      }
      if (routeState.product.sku) {
        lines.push(`  SKU: ${routeState.product.sku}`);
      }
    }
    return lines;
  }, [routeState]);

  const [formData, setFormData] = useState(() => ({
    contactName: '',
    officeName: '',
    email: '',
    phone: '',
    needBy: '',
    requestDetails:
      prefilledLines.length > 0
        ? `Please quote the following:\n${prefilledLines.join('\n')}`
        : '',
    notes: routeState.orderNotes || '',
  }));

  usePageSeo({
    variant: 'staticPage',
    staticPage: {
      title: `Request Quote | ${companyInfo.brandShort}`,
      description: `Request office pricing from ${companyInfo.companyName}. Submit your dental supply quote request and our team will follow up.`,
      canonicalUrl: `${SITE_URL}/request-quote`,
    },
    robots: 'noindex, follow',
  });

  useEffect(() => {
    trackEngagementEvent('quote_form_view', {
      event_category: 'lead_gen',
      source: routeState.source || 'request_quote_page',
      has_cart_items: Array.isArray(routeState.cartItems) && routeState.cartItems.length > 0,
      has_product: Boolean(routeState.product?.id),
    });
  }, [routeState]);

  const fallbackMailtoHref = useMemo(() => {
    const subject = `Quote request - ${formData.officeName || formData.contactName || 'Dental office'}`;
    const body = [
      'Hello Coretix Sales,',
      '',
      'Please send a quote for:',
      formData.requestDetails || '(details not provided)',
      '',
      `Contact name: ${formData.contactName || '-'}`,
      `Office name: ${formData.officeName || '-'}`,
      `Email: ${formData.email || '-'}`,
      `Phone: ${formData.phone || '-'}`,
      `Need-by date: ${formData.needBy || '-'}`,
      '',
      `Additional notes: ${formData.notes || '-'}`,
      '',
      `Source page: ${routeState.sourcePageUrl || window.location.href}`,
    ].join('\n');
    return `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [formData, routeState.sourcePageUrl]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.contactName.trim()) {
      toast.error('Please add a contact name.');
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error('Please provide an email or phone number.');
      return;
    }
    if (!isValidEmail(formData.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.requestDetails.trim()) {
      toast.error('Please describe what you need quoted.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await base44.functions.invoke('submitQuoteRequest', {
        source: routeState.source || 'request_quote_page',
        sourcePageUrl: routeState.sourcePageUrl || window.location.href,
        contactName: formData.contactName.trim(),
        officeName: formData.officeName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        needBy: formData.needBy || null,
        requestDetails: formData.requestDetails.trim(),
        notes: formData.notes.trim(),
        product: routeState.product || null,
        quantity: routeState.quantity || null,
        cartItems: Array.isArray(routeState.cartItems) ? routeState.cartItems : [],
        estimatedTotal: routeState.estimatedTotal || null,
      });

      const newRequestId = response?.data?.requestId;
      if (!newRequestId) {
        throw new Error('No quote request ID returned.');
      }

      setRequestId(newRequestId);
      trackEngagementEvent('quote_form_submit_success', {
        event_category: 'lead_gen',
        request_id: newRequestId,
      });
      toast.success('Quote request sent. Sales will follow up shortly.');
    } catch (error) {
      console.error(error);
      trackEngagementEvent('quote_form_submit_error', {
        event_category: 'lead_gen',
        message: error instanceof Error ? error.message : 'unknown_error',
      });
      toast.error('Could not submit quote request. You can still email sales below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="antialiased min-h-screen bg-[#FDFDFD]">
      <main className="pt-[var(--site-header-height)] pb-16 lg:pb-24">
        <section className="max-w-[980px] mx-auto px-6 lg:px-12 pt-10">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#111]/40 mb-3">Office Pricing</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tighter uppercase text-[#111] leading-[1.08]">
            Request a quote
          </h1>
          <p className="mt-5 text-sm sm:text-base text-[#111]/70 font-body leading-relaxed max-w-3xl">
            Tell us what your office needs and the Coretix team will follow up with pricing and availability.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={sanitizePhoneForHref(companyInfo.phone)}
              onClick={() =>
                trackEngagementEvent('phone_click', {
                  event_category: 'engagement',
                  location: 'request_quote_page',
                })
              }
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-widest uppercase border border-[#111]/20 text-[#111] hover:border-[#111]/40 transition-colors rounded-sm"
            >
              Call {companyInfo.phone}
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-sm text-[#111]/60 hover:text-[#111] transition-colors"
            >
              {companyInfo.email}
            </a>
            <Link
              to="/#catalog"
              className="text-sm text-[#111]/50 hover:text-[#111] transition-colors underline-offset-4 hover:underline"
            >
              Continue browsing catalog
            </Link>
          </div>
        </section>

        <section className="max-w-[980px] mx-auto px-6 lg:px-12 mt-10">
          <form onSubmit={handleSubmit} className="bg-white border border-[#111]/10 rounded-card shadow-card p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Contact Name *</span>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={handleChange('contactName')}
                  className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]/40"
                  placeholder="Jane Smith"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Office Name</span>
                <input
                  type="text"
                  value={formData.officeName}
                  onChange={handleChange('officeName')}
                  className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]/40"
                  placeholder="Downtown Dental"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]/40"
                  placeholder="you@office.com"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Phone</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]/40"
                  placeholder="(###) ###-####"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Need-by Date</span>
              <input
                type="date"
                value={formData.needBy}
                onChange={handleChange('needBy')}
                className="mt-2 w-full sm:w-64 border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#111]/40"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">What do you need quoted? *</span>
              <textarea
                rows={7}
                value={formData.requestDetails}
                onChange={handleChange('requestDetails')}
                className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm leading-relaxed resize-y focus:outline-none focus:border-[#111]/40"
                placeholder="List products, quantities, and any preferred brands or specs."
                required
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#111]/55">Additional Notes</span>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={handleChange('notes')}
                className="mt-2 w-full border border-[#111]/15 rounded-sm px-3 py-2.5 text-sm leading-relaxed resize-y focus:outline-none focus:border-[#111]/40"
                placeholder="Delivery notes, preferred carrier, budget ranges, or anything else."
              />
            </label>

            {requestId ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-sm px-4 py-3 text-sm">
                Quote request submitted. Reference ID: <span className="font-semibold">{requestId}</span>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#111] text-white hover:bg-accent transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
              <a
                href={fallbackMailtoHref}
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase border border-[#111]/20 text-[#111] hover:border-[#111]/40 transition-colors rounded-sm"
              >
                Email Instead
              </a>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
