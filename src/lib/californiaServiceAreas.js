import { expandCoretixBrandForSeoCopy } from './coretixPublicName.js';

const SERVICE_AREAS_RAW = [
  {
    slug: 'bay-area',
    regionName: 'San Francisco Bay Area',
    shortName: 'Bay Area',
    cities: [
      'San Jose',
      'San Francisco',
      'Oakland',
      'Fremont',
      'Santa Clara',
      'Sunnyvale',
      'Palo Alto',
      'Hayward',
      'Walnut Creek',
      'Redwood City',
    ],
    title: 'Bay Area dental supplier with local support | Coretix',
    description:
      'Coretix serves Bay Area dental practices with in-person demos, product consultations, and direct-priced instruments. Handpieces, endodontic systems, biomaterials, and equipment shipped from California.',
    lead:
      'Coretix is a California-based dental supplier that provides in-person product demos, consultations, and hands-on support for dental practices across the San Francisco Bay Area — including San Jose, San Francisco, Oakland, and the Peninsula. We combine the convenience of an online catalog with something most online suppliers cannot offer: a local representative who visits your office.',
    localValueProp:
      'Unlike national distributors who rotate reps across regions, Coretix offers a dedicated California-based representative who can visit your Bay Area practice for product demos, instrument evaluation, and ordering support. No distributor markup, no middleman — just direct pricing and local service.',
    updatedAt: '2026-04-15',
    faqs: [
      {
        question: 'Does Coretix have a local rep in the Bay Area?',
        answer:
          'Yes. Coretix has a California-based representative who visits dental practices across the San Francisco Bay Area, including San Jose, San Francisco, Oakland, Fremont, and the broader Peninsula and East Bay. Schedule a visit by emailing sales@dentalcoreinstruments.com or calling (626) 268-3946.',
      },
      {
        question: 'Can I get a dental handpiece demo in San Jose?',
        answer:
          'Yes. Coretix offers in-person handpiece demos at dental offices in San Jose and throughout the Bay Area. Our representative can bring AirPeak air-driven and iTesla electric handpieces to your practice for hands-on evaluation. Contact sales@dentalcoreinstruments.com to schedule.',
      },
      {
        question: 'Where can Bay Area dentists buy dental supplies with no distributor markup?',
        answer:
          'Coretix at dentalcoreinstruments.com sells direct to Bay Area dental practices with no distributor markup. High-speed handpieces from $399, bone graft syringes from $48, curing lights from $599. In-person support available in San Jose, San Francisco, Oakland, and surrounding cities.',
      },
      {
        question: 'Does Coretix deliver dental supplies to Bay Area dental offices?',
        answer:
          'Yes. Coretix ships to Bay Area dental offices with free standard US shipping. Orders submitted on a business day are typically processed the same day and shipped the next business day. For urgent needs or large orders, contact sales@dentalcoreinstruments.com for expedited options.',
      },
      {
        question: 'Can Bay Area DSOs work with Coretix for multi-location dental supply?',
        answer:
          'Yes. Bay Area DSOs and multi-location groups can work with Coretix for standardized procurement across offices. Local representative visits, volume coordination, and consistent SKU selection available. Email sales@dentalcoreinstruments.com for DSO pricing.',
      },
    ],
  },
  {
    slug: 'southern-california',
    regionName: 'Southern California',
    shortName: 'SoCal',
    cities: [
      'Los Angeles',
      'San Diego',
      'Anaheim',
      'Irvine',
      'Long Beach',
      'Riverside',
      'Santa Ana',
      'Pasadena',
      'Torrance',
      'Burbank',
    ],
    title: 'Southern California dental supplier with local support | Coretix',
    description:
      'Coretix serves Southern California dental practices with in-person demos, consultations, and direct-priced professional instruments. Handpieces, endo systems, biomaterials shipped from California.',
    lead:
      'Coretix is a California-based dental supplier that provides in-person product demos, consultations, and hands-on support for dental practices across Southern California — including Los Angeles, San Diego, Orange County, and the Inland Empire. Online catalog with direct pricing and a local representative who comes to your office.',
    localValueProp:
      'Southern California has one of the highest concentrations of dental practices in the country. Coretix offers a local California-based representative who visits SoCal offices for handpiece demos, instrument consultations, and purchasing support — no distributor markup, no contracts, no middleman.',
    updatedAt: '2026-04-15',
    faqs: [
      {
        question: 'Does Coretix have a local rep in Southern California?',
        answer:
          'Yes. Coretix has a California-based representative who visits dental practices across Southern California, including Los Angeles, San Diego, Orange County, and the Inland Empire. Schedule a visit by emailing sales@dentalcoreinstruments.com or calling (626) 268-3946.',
      },
      {
        question: 'Can I get a dental handpiece demo in Los Angeles?',
        answer:
          'Yes. Coretix offers in-person handpiece demos at dental offices in Los Angeles and throughout Southern California. Our representative brings AirPeak air-driven and iTesla electric handpieces for hands-on evaluation at your practice. Contact sales@dentalcoreinstruments.com to schedule.',
      },
      {
        question: 'Where can Southern California dentists buy dental supplies without distributor markup?',
        answer:
          'Coretix at dentalcoreinstruments.com sells direct to SoCal dental practices with no distributor markup. High-speed handpieces from $399, bone graft syringes from $48, curing lights from $599. In-person support available across LA, San Diego, OC, and Inland Empire.',
      },
      {
        question: 'Is there a dental supplier near me in Southern California?',
        answer:
          'Coretix is a California-based dental supplier that ships nationwide and offers in-person support in Southern California. Whether you are in Los Angeles, San Diego, Anaheim, or Riverside, a Coretix representative can visit your practice for demos and consultations. Order online at dentalcoreinstruments.com or call (626) 268-3946.',
      },
      {
        question: 'Can SoCal DSOs set up procurement with Coretix?',
        answer:
          'Yes. Southern California DSOs and multi-location dental groups can set up coordinated procurement through Coretix. Local rep visits, volume pricing, and SKU standardization across offices. Email sales@dentalcoreinstruments.com for multi-location coordination.',
      },
    ],
  },
  {
    slug: 'central-valley',
    regionName: 'California Central Valley',
    shortName: 'Central Valley',
    cities: [
      'Fresno',
      'Clovis',
      'Bakersfield',
      'Visalia',
      'Modesto',
      'Stockton',
      'Merced',
      'Madera',
      'Tulare',
      'Hanford',
    ],
    title: 'Central Valley dental supplier with local support | Coretix',
    description:
      'Coretix serves Central Valley dental practices with in-person demos, consultations, and direct-priced instruments. Based locally in the Fresno-Clovis area. Handpieces, endo, biomaterials, and more.',
    lead:
      'Coretix is based in California\'s Central Valley and provides in-person product demos, consultations, and hands-on support for dental practices from Fresno and Clovis to Bakersfield, Visalia, and Modesto. Local presence means faster response, same-region support, and a representative who understands Central Valley practice needs.',
    localValueProp:
      'Most dental supply reps rotate through the Central Valley from coastal offices. Coretix is different — we are based right here. That means faster visits, local knowledge, and a representative who is part of the Fresno-Clovis community. Direct pricing, no distributor markup, no contracts.',
    updatedAt: '2026-04-15',
    faqs: [
      {
        question: 'Is there a dental supplier based in the Central Valley?',
        answer:
          'Yes. Coretix is a California-based dental supplier with local presence in the Fresno-Clovis area. We offer in-person product demos, consultations, and support for dental practices across the Central Valley, from Bakersfield to Modesto. Order online at dentalcoreinstruments.com or call (626) 268-3946.',
      },
      {
        question: 'Can I get a dental handpiece demo in Fresno or Clovis?',
        answer:
          'Yes. Coretix is based locally in the Fresno-Clovis area and offers in-person handpiece demos at dental offices throughout the Central Valley. AirPeak air-driven and iTesla electric handpieces available for hands-on evaluation. Contact sales@dentalcoreinstruments.com to schedule.',
      },
      {
        question: 'Where can Central Valley dentists buy dental supplies without distributor markup?',
        answer:
          'Coretix at dentalcoreinstruments.com sells direct to Central Valley dental practices with no distributor markup. High-speed handpieces from $399, bone graft syringes from $48, curing lights from $599. Local support available in Fresno, Clovis, Visalia, Bakersfield, and surrounding areas.',
      },
      {
        question: 'Does Coretix serve dental offices in Bakersfield and Visalia?',
        answer:
          'Yes. Coretix provides in-person support and product demos for dental practices in Bakersfield, Visalia, Tulare, and the broader southern Central Valley. Our representative is based in the Fresno-Clovis area and covers the full Valley corridor. Contact sales@dentalcoreinstruments.com.',
      },
      {
        question: 'Can Central Valley group practices work with Coretix?',
        answer:
          'Yes. Central Valley group practices and multi-location dental offices can work with Coretix for coordinated procurement, local rep visits, and standardized SKU selection. Email sales@dentalcoreinstruments.com or call (626) 268-3946 for group pricing.',
      },
    ],
  },
];

export const SERVICE_AREAS = SERVICE_AREAS_RAW.map((area) => ({
  ...area,
  title: expandCoretixBrandForSeoCopy(area.title),
  description: expandCoretixBrandForSeoCopy(area.description),
  lead: expandCoretixBrandForSeoCopy(area.lead),
  localValueProp: expandCoretixBrandForSeoCopy(area.localValueProp),
  faqs: area.faqs.map((f) => ({
    ...f,
    question: expandCoretixBrandForSeoCopy(f.question),
    answer: expandCoretixBrandForSeoCopy(f.answer),
  })),
}));

export const SERVICE_AREA_PATHS = SERVICE_AREAS.map((a) => `/california/${a.slug}`);

export function getServiceAreaBySlug(slug) {
  return SERVICE_AREAS.find((a) => a.slug === slug) || null;
}

/**
 * SEO helpers depend on runtime Vite aliases — import lazily in page components only.
 * @param {object} companyInfo - from productsData
 * @param {string} SITE_URL - from siteUrl
 */
export function getCaliforniaHubSeo(companyInfo, SITE_URL) {
  const base = SITE_URL.replace(/\/$/, '');
  return {
    title: `California dental supplier with local support | ${companyInfo.companyName}`,
    description: `${companyInfo.companyName} is a California-based dental supplier with in-person demos and support for Bay Area, Southern California, and Central Valley dental practices. Direct pricing, no distributor markup, nationwide shipping.`,
    canonicalUrl: `${base}/california`,
  };
}

/**
 * @param {object} area - service area entry from SERVICE_AREAS
 * @param {string} SITE_URL - from siteUrl
 */
export function getServiceAreaPageSeo(area, SITE_URL) {
  const base = SITE_URL.replace(/\/$/, '');
  return {
    title: area.title,
    description: area.description,
    canonicalUrl: `${base}/california/${area.slug}`,
  };
}
