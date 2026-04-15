import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { base44 } from '@/api/base44Client';
import { canonicalBusinessInfo } from '@/lib/companyDefaults';

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

      // Actions
      fetchContentFromGitHub: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await base44.functions.invoke('fetchGitHubContent', {
            filePath: 'src/components/dentalcore/productsData.jsx'
          });

          if (response.data.error) {
            throw new Error(response.data.error);
          }

          const content = response.data.content;
          
          // Parse companyInfo from the JSX file
          const companyName = content.match(/companyName:\s*"([^"]*)"/)?.[1];
          const email = content.match(/email:\s*"([^"]*)"/)?.[1];
          const phone = content.match(/phone:\s*"([^"]*)"/)?.[1];
          if (companyName || email || phone) {
            set({
              businessInfo: {
                name: companyName || get().businessInfo.name,
                phone: phone || get().businessInfo.phone,
                email: email || get().businessInfo.email,
                location: get().businessInfo.location,
              },
            });
          }
          
          set({ 
            lastFetched: new Date().toISOString(),
            isLoading: false 
          });

          return content;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error('Failed to fetch content from GitHub:', error);
        }
      },

      refreshContent: async () => {
        set({ lastFetched: null });
        await get().fetchContentFromGitHub();
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