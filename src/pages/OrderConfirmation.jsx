import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/dentalcore/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import { companyInfo } from '@/components/dentalcore/productsData';
import { base44 } from '@/api/base44Client';
import { useCartStore } from '@/components/store/cartStore';
import { usePageSeo } from '@/hooks/usePageSeo';
import { SITE_URL } from '@/lib/siteUrl';

function renderGoogleCustomerReviewOptIn(optIn) {
  if (!optIn || typeof window === 'undefined') return;

  window.renderOptIn = function renderOptIn() {
    window.gapi?.load('surveyoptin', function loadSurveyOptIn() {
      window.gapi.surveyoptin.render({
        merchant_id: optIn.merchant_id,
        order_id: optIn.order_id,
        email: optIn.email,
        delivery_country: optIn.delivery_country,
        estimated_delivery_date: optIn.estimated_delivery_date,
      });
    });
  };

  if (window.gapi?.load) {
    window.renderOptIn();
    return;
  }

  const existing = document.querySelector('script[data-google-customer-reviews]');
  if (existing) return;

  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
  script.async = true;
  script.defer = true;
  script.dataset.googleCustomerReviews = 'true';
  document.body.appendChild(script);
}

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const clearCart = useCartStore((state) => state.clearCart);
  const [optIn, setOptIn] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(Boolean(sessionId));

  const staticPage = useMemo(
    () => ({
      title: `Order confirmation | ${companyInfo.companyName}`,
      description: `Order confirmation for ${companyInfo.companyName}.`,
      canonicalUrl: `${SITE_URL}/order-confirmation`,
    }),
    [],
  );
  usePageSeo({ variant: 'staticPage', staticPage, robots: 'noindex, nofollow' });

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      setError('Missing checkout session. If you completed an order, check your email for confirmation.');
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    base44.functions.invoke('getGoogleCustomerReviewOptIn', { sessionId })
      .then((response) => {
        if (cancelled) return;
        setOptIn(response.data || response);
        setError('');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.error || err?.message || 'Unable to load order confirmation details.');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (optIn?.order_id && optIn?.email) renderGoogleCustomerReviewOptIn(optIn);
  }, [optIn]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111]">
      <Header />
      <main className="max-w-3xl mx-auto px-6 lg:px-12 pt-[calc(var(--site-header-height)+3rem)] pb-24">
        <p className="text-xs uppercase tracking-[0.25em] text-[#111]/40 font-semibold mb-3">
          {companyInfo.companyName}
        </p>
        <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight uppercase mb-6">
          Order confirmed
        </h1>
        <p className="text-sm sm:text-base text-[#111]/65 font-body leading-relaxed mb-8">
          Thank you for your order. We&apos;ll email confirmation details and process eligible business-day orders as
          quickly as possible.
        </p>

        <section className="rounded-card border border-[#111]/10 bg-white shadow-card p-6 sm:p-8 mb-8">
          {isLoading ? (
            <p className="text-sm text-[#111]/55">Loading confirmation details...</p>
          ) : error ? (
            <p className="text-sm text-[#111]/65">{error}</p>
          ) : (
            <div className="space-y-3 text-sm text-[#111]/65">
              <p>
                <span className="font-semibold text-[#111]">Order ID:</span> {optIn?.order_id}
              </p>
              <p>
                <span className="font-semibold text-[#111]">Estimated delivery:</span>{' '}
                {optIn?.estimated_delivery_date}
              </p>
              <p>
                Google may ask if you want to review your purchase experience. Participation is optional.
              </p>
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/track-order"
            className="h-11 px-5 inline-flex items-center justify-center rounded-sm bg-[#111] text-white text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
          >
            Track order
          </Link>
          <Link
            to="/"
            className="h-11 px-5 inline-flex items-center justify-center rounded-sm border border-[#111]/15 text-[#111] text-xs font-bold uppercase tracking-widest hover:border-[#111] transition-colors"
          >
            Back to catalog
          </Link>
        </div>
      </main>
      <CartDrawer />
    </div>
  );
}
