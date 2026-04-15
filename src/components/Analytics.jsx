import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTM_ID = (import.meta.env.VITE_GTM_ID ?? '').trim();
const GOOGLE_ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID ?? '').trim();
const GA4_DISABLED = String(import.meta.env.VITE_GA4_DISABLED ?? '').toLowerCase() === 'true';
/** GA4 Measurement ID — set `VITE_GA_MEASUREMENT_ID` in `.env` or host; defaults to your GA4 property */
const GA_MEASUREMENT_ID = GA4_DISABLED
  ? ''
  : (import.meta.env.VITE_GA_MEASUREMENT_ID ?? 'G-5ZNE5MN800').toString().trim();

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

function ensureGtagStub() {
  ensureDataLayer();
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
}

/** First ID used for loading gtag/js (GA4 preferred when both exist). */
function gtagScriptId() {
  if (GA_MEASUREMENT_ID) return GA_MEASUREMENT_ID;
  if (GOOGLE_ADS_ID) return GOOGLE_ADS_ID;
  return '';
}

export default function Analytics() {
  const location = useLocation();

  // Lazy-load GTM / gtag scripts once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GTM_ID && !GOOGLE_ADS_ID && !GA_MEASUREMENT_ID) return;

    ensureGtagStub();

    const init = () => {
      if (window.__dentalcoreAnalyticsLibsInjected) return;
      window.__dentalcoreAnalyticsLibsInjected = true;

      const scriptId = gtagScriptId();
      if (scriptId) {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${scriptId}`;
        document.head.appendChild(gtagScript);
      }

      window.gtag('js', new Date());
      if (GA_MEASUREMENT_ID) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          send_page_view: false,
        });
      }
      if (GOOGLE_ADS_ID) {
        window.gtag('config', GOOGLE_ADS_ID);
      }

      if (GTM_ID) {
        const gtmBootstrap = document.createElement('script');
        gtmBootstrap.id = 'gtm-script';
        gtmBootstrap.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
        document.head.appendChild(gtmBootstrap);

        if (!document.getElementById('gtm-noscript')) {
          const noscript = document.createElement('noscript');
          noscript.id = 'gtm-noscript';
          noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
          document.body.insertBefore(noscript, document.body.firstChild);
        }
      }
    };

    const useIdle = 'requestIdleCallback' in window;
    const idleHandle = useIdle
      ? window.requestIdleCallback(init, { timeout: 3000 })
      : window.setTimeout(init, 1000);

    return () => {
      if (useIdle) {
        window.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
    };
  }, []);

  // SPA page views for GA4 (including Home `/`)
  useEffect(() => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;
    if (typeof window.gtag !== 'function') return;
    const path = location.pathname + location.search;
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
