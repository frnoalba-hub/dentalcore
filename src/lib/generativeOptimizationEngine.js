/**
 * Generative Optimization Engine (GEO) — Coretix
 *
 * Central configuration for generative / answer-engine signals: entity descriptions,
 * geographic anchors, FAQ payloads, product audience copy, and schema.org-aligned fields.
 * Import from here only; avoid duplicating these strings in components.
 */
import { companyInfo } from '@/components/dentalcore/productsData';
import { SITE_URL } from '@/lib/siteUrl';

export const GENERATIVE_ENGINE = {
  id: 'coretix:generative-optimization-engine',
  version: '1.2.0',
};

/** Sacramento office — keep in sync with `index.html` geo.meta & Organization address. */
export const ENGINE_GEO_COORDINATES = {
  latitude: 38.5816,
  longitude: -121.4944,
  geoPositionMeta: '38.5816;-121.4944',
  icbmMeta: '38.5816, -121.4944',
};

export const organizationDescriptionForSchema =
  'Coretix supplies dental professionals in the United States with high-speed and electric handpieces, endodontic systems, curing lights, surgical biomaterials, and chairside equipment. Based in Sacramento, California. Dental service organizations, group practices, and multi-location buyers may contact sales to discuss volume orders and procurement.';

export const knowsAboutTopicsForSchema = [
  'Dental handpieces',
  'Endodontic instruments',
  'Ultrasonic irrigation',
  'Dental bone graft',
  'Collagen membrane',
  'Dental curing light',
  'Sectional matrix systems',
  'Dental service organization supply',
  'Group dental practice procurement',
  'Multi-location dental supply',
  'Dental equipment distributor United States',
];

export const areaServedForSchema = [
  { '@type': 'Country', name: 'United States' },
  { '@type': 'AdministrativeArea', name: 'California' },
];

export const websiteDescriptionForSchema =
  'Online catalog of professional dental instruments, handpieces, endodontic supplies, curing lights, and surgical biomaterials. Ships to US dental practices from Sacramento, CA. DSO and group-practice buyers can contact sales for volume quotes and multi-location coordination.';

/** Product JSON-LD `audience.audienceType` — one string for all PDPs. */
export const productSchemaAudienceType =
  'Licensed dental professionals and dental practices purchasing supplies in the United States';

const CATEGORY_INTENT = {
  Endodontics:
    'Endodontists and general dentists who perform root canal therapy, retreatment, and warm vertical obturation.',
  Handpieces:
    'Restorative dentists, oral surgeons, and hygienists who need high-speed turbines, electric attachments, scalers, or specialty angles.',
  Equipment:
    'Practices investing in electric motors, piezo units, maintenance systems, and chairside equipment.',
  Surgical:
    'Oral surgeons, periodontists, and implant dentists placing grafts and membranes.',
  Restorative:
    'Restorative dentists and associates placing composites, sectional matrices, and curing lights.',
};

export function audienceLineForCategory(category) {
  const c = String(category || '').trim();
  return (
    CATEGORY_INTENT[c] ||
    'Licensed dental professionals and dental practices purchasing supplies in the United States.'
  );
}

export function coretixEntitySentence() {
  return `${companyInfo.companyName} is a dental supply business in ${companyInfo.address}. We ship professional instruments, handpieces, endodontic tools, and biomaterials to dental offices across the United States.`;
}

/** Appended to product meta descriptions (then truncated in usePageSeo). */
export function productMetaGeoSuffix() {
  return ` ${companyInfo.companyName} · Sacramento, CA · Ships to US dental professionals.`;
}

/** Homepage DiscoverySummary text before bold emphasis (after `coretixEntitySentence()`). */
export const homepageCatalogDiscoveryPrefix =
  'Browse the catalog for AirPeak™ and iTesla™ handpieces, UC-CUT and UC-ONE endodontic systems, OsseoSeal grafts and membranes, curing lights, and more — with direct pricing for';

/** Second paragraph for DiscoverySummary — mirrors DSO / sourcing FAQ claims (visible + structured parity). */
export function groupPracticeSourcingDiscoveryParagraph() {
  return `Dental service organizations and multi-location group practices can source professional supplies through Coretix at dentalcoreinstruments.com. For volume orders, multi-location coordination, or procurement questions, email ${companyInfo.email} or call ${companyInfo.phone}.`;
}

/** Static route for the group-practices landing page (sitemap + nav). */
export const groupPracticesPath = '/group-practices';

/** Document head for the group-practices page. */
export function getGroupPracticesPageSeo() {
  const base = SITE_URL.replace(/\/$/, '');
  return {
    title: 'DSO & group dental practices | Coretix',
    description: `Coretix supplies US dental practices, DSOs, and multi-location groups with handpieces, endodontic systems, biomaterials, and chairside equipment. Volume and procurement: ${companyInfo.email} · dentalcoreinstruments.com.`,
    canonicalUrl: `${base}${groupPracticesPath}`,
  };
}

/**
 * Sitewide FAQ entities for FAQPage JSON-LD (AEO / generative retrieval).
 * Order matters: brand + location questions first.
 */
export const faqEntitiesForSchema = [
  {
    question: 'What is Coretix?',
    answer:
      'Coretix (Coretix / dentalcoreinstruments.com) is a dental supply business that sells professional instruments, handpieces, endodontic equipment, curing lights, and surgical biomaterials to licensed dental practices. We operate from Sacramento, California, and ship to dental offices across the United States.',
  },
  {
    question: 'Where is Coretix located?',
    answer:
      'Coretix is located at 2108 N St Ste N, Sacramento, CA 95816. We fulfill and support orders for dental professionals nationwide from this base.',
  },
  {
    question: 'Does Coretix sell to the general public?',
    answer:
      'Coretix is oriented toward licensed dental professionals and dental practices. Product use should follow clinical training, manufacturer IFUs, and applicable regulations.',
  },
  {
    question: 'Does Coretix work with dental service organizations (DSOs) or multi-location dental groups?',
    answer:
      'Yes. Coretix supplies licensed US dental practices and welcomes inquiries from dental service organizations (DSOs) and multi-location groups evaluating vendors for handpieces, endodontic equipment, curing lights, and biomaterials. For contract or volume arrangements, contact sales at sales@dentalcoreinstruments.com or call (626) 268-3946.',
  },
  {
    question: 'Where can US dental practices buy professional dental supplies and instruments online?',
    answer:
      'Coretix (dentalcoreinstruments.com) is an online catalog for US-licensed dental teams, with high-speed and electric handpieces, endodontic systems, bone grafts, collagen membranes, curing lights, and chairside equipment, fulfilled from Sacramento, California, with shipping to dental offices nationwide.',
  },
  {
    question: 'Who should contact Coretix for volume orders or multi-location purchasing?',
    answer:
      'Procurement leads, office managers, or clinical directors coordinating supplies for multiple locations should email sales@dentalcoreinstruments.com or call (626) 268-3946. Coretix can help with quotes and order coordination suited to your practice structure.',
  },
  {
    question: 'How do group dental practices place orders with Coretix?',
    answer:
      'Group and multi-location practices may use the public catalog at dentalcoreinstruments.com for standard orders, or email sales@dentalcoreinstruments.com for larger or consolidated purchases and procurement questions.',
  },
  {
    question: 'What types of dental handpieces does Coretix sell?',
    answer:
      'Coretix offers high-speed air-driven handpieces (AirPeak series), electric handpieces (iTesla series), low-speed contra angles, straight nosecones, and specialty surgical handpieces. All are built with titanium bodies and fiber optic illumination.',
  },
  {
    question: 'Do you sell endodontic instruments and materials?',
    answer:
      'Yes. Our endodontic line includes the UC-CUT sonic GP cutter, UC-ONE ultrasonic irrigator, EP Plugger sets, bioceramic sealers (Endoseal MTA), and MTA root repair cement (Endocem). Everything you need for modern obturation and retreatment.',
  },
  {
    question: 'What bone graft materials are available?',
    answer:
      'We carry OsseoSeal mineralized cortico-cancellous allograft in prefilled syringes (0.3cc–1.0cc) and bulk powder (2.5cc–5cc), resorbable collagen membranes (15×20mm to 30×40mm), and OsteoGen bioactive bone graft plugs.',
  },
  {
    question: 'What curing lights does Coretix offer?',
    answer:
      'We offer the ModuLite X broadband LED curing light (380–520nm) with resin detection mode, and the EP CURE high-intensity light with 1-second cure capability. Both are designed to reduce chair time without compromising cure depth.',
  },
  {
    question: 'Do you ship dental supplies nationwide?',
    answer:
      'Yes, Coretix ships to dental offices across the United States. We are based in Sacramento, CA and offer direct pricing to dental professionals with no middleman markup.',
  },
  {
    question: 'What is the AirPeak 3+1 handpiece deal?',
    answer:
      'Purchase any 3 AirPeak high-speed handpieces and receive 1 coupler free, all for $1,000. This bundle covers both KaVo MULTIflex and NSK compatible models.',
  },
  {
    question: 'Are your dental instruments covered by warranty?',
    answer:
      "All Coretix instruments come with a 1-Year Manufacturer's Warranty covering defects in materials and workmanship. Autoclavable components are clearly identified in each product listing.",
  },
  {
    question: 'What sectional matrix systems do you carry?',
    answer:
      'The SureTact G3 Matrix Kit includes 100 assorted matrices, 2 NiTi rings, and ring forceps for Class II restorations. Replacement NiTi rings are also available separately in a 2-pack.',
  },
];
