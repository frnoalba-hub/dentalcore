/**
 * Pushes to dataLayer (GTM) and gtag when present. Safe to call before scripts finish loading.
 */
export function trackEngagementEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
