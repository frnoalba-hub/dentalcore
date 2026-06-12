import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { canonicalBusinessInfo } from '@/lib/companyDefaults';
import { companyInfo } from '@/components/dentalcore/productsData';

const useContentStore = create(
  persist(
    (set, get) => ({
      // Content data (defaults; GitHub fetch may refresh company fields when available)
      businessInfo: { ...canonicalBusinessInfo },
      
      headerNav: [
        { label: 'Features', id: 'features' },
        { label: 'Use Cases', id: 'use-cases' },
        { label: 'How It Works', id: 'how-it-works' },
        { label: 'Gallery', id: 'gallery' },
        { label: 'Products', id: 'catalog' },
        { label: 'Specs', id: 'specs' },
        { label: 'FAQ', id: 'faq' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' },
      ],

      heroContent: {
        badge: 'Revolutionary Endo Technology',
        headline: 'UC CUT by EPDENT',
        subheadline: 'Cordless Sonic Gutta-Percha Cutter',
        tagline: 'The new standard in Gutta Percha removal. Cordless, Sonic, Precision.',
        features: [
          'Instant heating to 180°C in <1 second',
          'Cordless operation - no wires, no hassle',
          'Sonic vibration prevents cone sticking',
          'Ultra-lightweight ergonomic design'
        ],
        pricing: {
          device: '$599',
          tips: 'from $140'
        },
        highlights: [
          { label: 'Heating Time', value: '<1 sec' },
          { label: 'Warranty', value: '2 Years' }
        ]
      },

      aboutContent: {
        tagline: 'Our Story',
        title: 'About Coretix',
        paragraphs: [
          'Coretix is a dentist-focused distributor based in California. We are dedicated to bringing practical, high-value innovations like the UC CUT by EPDENT directly to local dental practices.',
          'We believe in a simple approach: start with local practices, build real relationships, and provide personal support. Unlike massive corporate distributors, we are agile, responsive, and truly care about your clinical success.'
        ],
        values: [
          {
            title: 'Doctor-Focused',
            desc: 'Built for dentists, by people who understand the demands of modern dentistry.'
          },
          {
            title: 'Personal Support',
            desc: 'Direct access to our team. No call centers, just real people ready to help.'
          },
          {
            title: 'Curated Excellence',
            desc: 'We only carry equipment that delivers proven clinical value and reliability.'
          }
        ]
      },

      // Loading states
      isLoading: false,
      lastFetched: null,
      error: null,

      // Actions — business info comes from the bundled productsData companyInfo.
      // (Previously fetched the same file via a backend GitHub proxy, which
      // exposed an unauthenticated repo-read endpoint for no benefit.)
      refreshContent: () => {
        set({
          businessInfo: {
            name: companyInfo.companyName || get().businessInfo.name,
            phone: companyInfo.phone || get().businessInfo.phone,
            email: companyInfo.email || get().businessInfo.email,
            location: get().businessInfo.location,
          },
          lastFetched: new Date().toISOString(),
          isLoading: false,
          error: null,
        });
      },

      updateBusinessInfo: (info) => set({ businessInfo: info }),
      updateHeroContent: (content) => set({ heroContent: content }),
      updateAboutContent: (content) => set({ aboutContent: content }),
    }),
    {
      name: 'dental-core-content-v2',
      partialize: (state) => ({
        businessInfo: state.businessInfo,
        headerNav: state.headerNav,
        heroContent: state.heroContent,
        aboutContent: state.aboutContent,
        lastFetched: state.lastFetched,
      }),
    }
  )
);

export { useContentStore };