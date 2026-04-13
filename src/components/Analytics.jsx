import { useEffect } from 'react';

const GTM_ID = (import.meta.env.VITE_GTM_ID ?? '').trim();
const GOOGLE_ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID ?? '').trim();

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

function ensureAdsGtagStub() {
  if (!GOOGLE_ADS_ID || window.__dentalcoreAdsStubDone) return;
  window.__dentalcoreAdsStubDone = true;
  ensureDataLayer();
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);
}

export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!GTM_ID && !GOOGLE_ADS_ID) return;

    ensureDataLayer();
    if (GOOGLE_ADS_ID) ensureAdsGtagStub();

    const init = () => {
      if (window.__dentalcoreAnalyticsLibsInjected) return;
      window.__dentalcoreAnalyticsLibsInjected = true;

      if (GOOGLE_ADS_ID) {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
        document.head.appendChild(gtagScript);
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

  return null;
}
