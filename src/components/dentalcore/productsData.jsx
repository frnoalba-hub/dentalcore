// Per-SKU Discovery (gallery, videoUrl, discoveryHeading, discoveryParagraph): see PRODUCT_DISCOVERY_BRIEF.md in the dentalcore repo root.

import {
  CORETIX_PUBLIC_ENTITY_NAME,
  CORETIX_BRAND_SHORT,
  CORETIX_TAGLINE,
} from '../../lib/coretixPublicName.js';

// --- COMPANY CONFIGURATION ---
export const companyInfo = {
  /** Full public entity name — Organization JSON-LD, meta, GEO/AEO sentences */
  companyName: CORETIX_PUBLIC_ENTITY_NAME,
  /** Short brand for long title tags (e.g. product pages) */
  brandShort: CORETIX_BRAND_SHORT,
  /** Header / UI descriptor (uppercased in layout) */
  tagline: CORETIX_TAGLINE,
  email: 'sales@dentalcoreinstruments.com',
  address: '2108 N St Ste N, Sacramento, CA 95816',
  phone: '(626) 268-3946',
  logoText: 'CORETIX',
};

// --- REAL PRODUCT IMAGES (local /public/products/) ---
const resolveImage = (fileName) => {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}products/${encodeURIComponent(fileName)}`;
};

const img = {
  // UC-CUT
  uccut:        resolveImage('UC_CUT_Gutta_Purcha_Cutter_INFO_1006-1.png'),
  uccut_tip90:  resolveImage('UC_CUT_Tip_#90_1006-2.png'),
  uccut_tip110: resolveImage('UC_CUT_Tip_#110_1006-3.png'),
  uccut_tips:   resolveImage('UC_CUT_Gutta_Purcha_Cutter_ALL_Tips.png'),
  uccut_bovie:  resolveImage('UC_CUT_Boive_Tip.png'),

  // Endo — UC-ONE (hero + angles / spec sheet + kit / tips)
  ucone:            resolveImage('UC_ONE_Ultasonic_Irrigation_1002-1.png'),
  ucone_dual:       resolveImage('UC_ONE_1002-1_dual_angle.png'),
  ucone_sheet:      resolveImage('UC_ONE_1002-1_features_infographic.png'),
  ucone_contents:   resolveImage('UC_ONE_CONTENTS.png'),
  ucone_plastic:    resolveImage('UC_ONE_Plastic Tip_1002-2.png'),
  ucone_metal:      resolveImage('UC_ONE_Metal_Endo-Irrigation-Tip_1002-3.jpg'),
  ucone_tip_holder: resolveImage('UC_ONE_Plastic_Tip_Holder_1002-4.jpg'),
  ucone_metal_5:    resolveImage('UC_ONE_Metal_Tip_1002-5.png'),
  ucone_charge:     resolveImage('UC_ONE_Charging_INFO.png'),
  cutfit:       resolveImage('Cut_&_Fit_Gutta_Percha_Cutter_1005-1.jpg'),
  ep_plugger:   resolveImage('EP_PLUGGER_SET_1004-1.jpg'),
  ep_suction:   resolveImage('EP_SUCTION_1003-1.png'),
  endoseal:     resolveImage('ENDOSEAL_MTA-1.png'),
  endocem:      resolveImage('ENDOCE_MTA_ROOT_REPAIR_MTA_3.webp'),

  // AirPeak
  ap_kavo:      resolveImage('AIRPEAK_A1004-V2.jpg'),
  ap_nsk:       resolveImage('AIRPEAK_A1005.jpg'),
  ap_45:        resolveImage('AIRPEAK_A1018.jpg'),
  ap_micro:     resolveImage('AIRPEAK_A1004-V2.jpg'),
  ap_low_la:    resolveImage('AIRPEAK_A1009B.jpg'),
  ap_low_st:    resolveImage('AIRPEAK_A1012.jpg'),

  // iTesla
  it_g600s:     resolveImage('ITESLA_A1003.webp'),
  it_g600d:     resolveImage('ITESLA_A1028.webp'),
  it_implant:   resolveImage('ITESLA_A1020.jpg'),
  it_motor:     resolveImage('ITESLA_U_A1003.webp'),

  // Curing / Lights
  ep_cure:      resolveImage('EP_CURE_White_1007-1.png'),
  ep_light:     resolveImage('EP_CURE_MINI_White_1008-1.png'),

  // Biomaterials - OsseoSeal
  osseo_syr_03: resolveImage('OSSEOSEAL_OS_0.3CC.jpg'),
  osseo_syr_05: resolveImage('OSSEOSEAL_OS_0.5CC.webp'),
  osseo_syr_10: resolveImage('OSSEOSEAL_2x0.5CC_OS_1.0CC.webp'),
  osseo_pdr_25: resolveImage('OSSEOSEAL_OS_2.5CC.webp'),
  osseo_pdr_50: resolveImage('OSSEOSEAL_OS_5.0CC.webp'),
  osseo_mem:    resolveImage('OSSEOSEAL_Collagen_Membrane_OS1520.webp'),

  // Biomaterials - Other
  osteogen:     resolveImage('OSTEOGEN_10x20_OSTEO.webp'),
  ora_aid:      resolveImage('ORA_AID_RED_ORA20.webp'),
  collagen:     resolveImage('CURAGEN_COLL_WOUND_DRESSING_HP10.jpg'),

  // Stronix Touch & Heat pics
  stronic_tip:  'https://media.base44.com/images/public/6916a1244818477a36fdb44c/9e54afd0b_image.png',
  stronic_full: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/2cfbf012c_image.png',

  // Stronix X300 pics
  x300_1: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/7a41548a7_image.png',
  x300_2: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/540ecc84d_image.png',
  x300_3: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/af0c92809_image.png',

  // Stronix X150 pics
  x150_1: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/f8ddec0cf_image.png',
  x150_2: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/15a5cee16_image.png',
  x150_3: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/60dcd5577_image.png',

  // McCare X pics
  mccare_1: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/e88c82b35_AC6112_3_720x.png',
  mccare_2: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/80f1ad737_AC6112_5_720x.png',
  mccare_3: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/bac065e32_AC6112_6.png',
  mccare_4: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/23b103ace_AC6112_7_720x.png',

  // Equipment with real photos
  stronic300:   resolveImage('AIRPEAK_A1016.jpg'),
  air_polish:   resolveImage('AIRPEAK_A1017.jpg'),
  ipr:          resolveImage('AIRPEAK_A1043.jpg'),

  // ModuLite X pics
  modulite_1: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/285d74861_83c9bf7f86d8ae091418cab83f82240e.png',
  modulite_2: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/28a58be11_4995b8de42e71d815af77249c0c38d75.png',
  modulite_3: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/a1ca4d5bc_dc360f1692f48ff793557ddcfa32240b.png',
  modulite_4: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/8d72dc006_def6a6f696628ef3679ab45fb8b33864.png',
  modulite_5: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/d527ceacd_ea54e9bd80034d762511a77784dca835.png',
  modulite_6: 'https://media.base44.com/images/public/6916a1244818477a36fdb44c/1262b5a4b_1d5a02e010f4a34cd79047c9031f0fad.png',

  // Placeholders (no real photos yet)
  touch_heat:   'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  modulite:     'https://images.unsplash.com/photo-1583912267670-65755dd82a2d?q=80&w=1000&auto=format&fit=crop',
  mccareX:      'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  stronic150:   'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  suretact:     'https://media.base44.com/images/public/6916a1244818477a36fdb44c/02065b400_M1001_720x1.png',
  suretact_r:   'https://media.base44.com/images/public/6916a1244818477a36fdb44c/447ccae19_mfr-marksondentalsystems-suretactg3-universal-ring-blue-2pk-m1002.jpg',
  suretact_r2:  'https://media.base44.com/images/public/6916a1244818477a36fdb44c/ad28fba4d_Screenshot_2025-12-26_134411_0d1e974e-a386-4eec-ac68-d6c44c21786c.png',
};


// --- MASTER PRODUCT CATALOG ---
// Apex: Apexdent_price_list_*_dental_core.xlsx - MSRP col 3, Selling col 5 (see generate_catalog.js).
// Rule: No `promo` → `price` = Apex selling only; no `originalPrice` (clean list price).
// With `promo` → `price` = promotional sell; `originalPrice` = Apex MSRP when that SKU exists in the sheet
// (otherwise a single explicit list price you set by hand - never duplicate `price` as fake MSRP).
export const products = [
  // =========================================
  // ENDODONTICS
  // =========================================
  {
    id: "1006-1",
    slug: "uc-cut",
    mpn: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless sonic GP cutter with instant 180°C heating and vibration-assisted removal. Faster, cleaner obturation with interchangeable tips.",
    longDescription: "Designed for chairside gutta-percha cutting and soft-tissue work without a bulky electrosurgery cart. The UC-CUT combines rapid heat-up with sonic vibration to help shear GP cleanly at the orifice. Interchangeable tips (sold separately) let you match posterior, anterior, and specialty applications. Ideal for endodontists and GPs who want predictable obturation workflows with minimal footprint.",
    image: img.uccut,
    images: [img.uccut, img.uccut_tips, img.uccut_tip90, img.uccut_tip110, img.uccut_bovie],
    features: [
      "Cordless, rechargeable operation for full operatory mobility",
      "Rapid heat to ~180°C for efficient GP trimming",
      "Sonic vibration assists clean separation at the canal orifice",
      "Interchangeable tips for posterior, anterior, and specialty use",
      "Lightweight handpiece for long procedures",
      "1-year manufacturer warranty on defects (see IFU for details)",
    ],
    specs: {
      "Primary use": "Gutta-percha cutting / chairside heat procedures",
      "Tip compatibility": "UC-CUT family tips (autoclavable where specified)",
      "Sterilization": "Tips per manufacturer IFU; handpiece surface disinfection / barrier",
      "Warranty": "1 year manufacturer (materials & workmanship)",
    },
    faqs: [
      { question: "What is UC-CUT used for in endodontics?", answer: "UC-CUT is a cordless sonic gutta-percha cutter used to trim, soften, and remove GP during obturation and retreatment. It is also used for select soft-tissue procedures per the manufacturer instructions." },
      { question: "Are UC-CUT tips autoclavable?", answer: "Metal tips in the UC-CUT system are designed to be autoclavable per manufacturer guidance. The main handpiece should be barrier-protected and surface-disinfected; follow the IFU for your exact tip model." },
      { question: "Who should buy UC-CUT?", answer: "Practices performing warm vertical condensation, GP removal, or chairside procedures that benefit from cordless heat plus vibration, especially teams that want to avoid large electrosurgery units." },
      { question: "What comes with UC-CUT?", answer: "Included components are listed on the product page and may vary by package revision. Tip assortments and specialty tips can be sold separately; confirm your required setup before ordering." },
      { question: "How are shipping and delivery handled for UC-CUT orders?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the UC-CUT warranty policy?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can UC-CUT be returned if opened?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix UC-CUT canonical product page", url: "https://www.dentalcoreinstruments.com/p/uc-cut" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "CDC dental infection prevention guidance", url: "https://www.cdc.gov/oral-health/hcp/infection-control/index.html", note: "Reference for infection-control workflow standards in dental settings." },
      { label: "Request UC-CUT IFU from Coretix sales", url: "mailto:sales@dentalcoreinstruments.com", note: "Ask for current manufacturer instructions for use and sterilization details." },
    ],
    inStock: true,
    rating: 5.0
  },
  {
    id: "1002-1",
    slug: "uc-one",
    mpn: "1002-1 / 1002-Full Kit",
    name: "UC-ONE (Ultrasonic Irrigation)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless ultrasonic irrigator that activates irrigant deep into canal anatomy. Apex SKU 1002-1 is the UC-ONE unit listing (tips are not described on that row—order 1002-Full Kit for the bundled tip set, or add plastic/metal tips as separate Apex SKUs such as 1002-2).",
    longDescription: "UC-ONE is built for clinicians who want a cordless, handheld way to ultrasonically activate sodium hypochlorite, EDTA, or other approved irrigants inside the root canal system. Ultrasonic energy improves fluid streaming and can help dislodge debris and biofilm in complex anatomy when combined with adequate irrigation volume and needle delivery. Use only irrigants and settings consistent with manufacturer directions and your training.\n\nPer the Apex / Apexdent dealer export (excel_output.json, apexOverview), 1002-1 is listed only as “UC-ONE (Ultrasonic Irrigation)” with no accessories named. Disposable plastic tips are a separate line item (1002-2, “UC ONE- TIP (PLASTIC) 50EA”), which is how the list is usually read: do not assume the 1002-1 unit ships with plastic tips—confirm on your IFU and packing slip. If you need tips in the box, choose 1002-Full Kit (Apex describes that bundle with Tip Body/Short/Long/Endo + Tip Stand) or order tips separately.\n\nThe same Apex list describes 1002-Full Kit (“UC One Full Kit”) as: UC One Blue, Tip (Body, Short, Long, Endo), Tip Stand (plus the usual “do not advertise below” MAP note). Gallery images illustrate typical plastic/metal tip profiles; sterile counts and re-order codes remain per IFU.",
    image: img.ucone,
    images: [
      img.ucone,
      img.ucone_dual,
      img.ucone_sheet,
      img.ucone_contents,
      img.ucone_plastic,
      img.ucone_metal,
      img.ucone_metal_5,
      img.ucone_tip_holder,
      img.ucone_charge,
    ],
    videoUrl: "https://www.youtube.com/watch?v=Myhnt67xVMk",
    videoTitle: "UC-ONE passive ultrasonic irrigation — clinical overview",
    discoveryHeading: "Why practices add ultrasonic activation",
    discoveryParagraph:
      "Needle irrigation alone often leaves irregular canal anatomy under-challenged. A cordless ultrasonic activator like UC-ONE helps move irrigant in tight curves and fins when used as part of a complete volume-and-exchange protocol—so teams standardize on safer, more predictable cleaning steps before obturation. Coretix supplies US dental practices from Sacramento with direct pricing; watch the overview, then confirm tip selection and IFU with your clinical lead.",
    variants: [
      {
        id: "1002-1-UNIT",
        mpn: "1002-1",
        name: "Unit",
        price: 599.0,
        image: img.ucone,
      },
      {
        id: "1002-Full Kit",
        mpn: "1002-Full Kit",
        name: "Full kit",
        price: 699.0,
        image: img.ucone_contents,
      },
    ],
    features: [
      "Cordless design for easy access to all quadrants",
      "Ultrasonic activation of canal irrigants (per clinical protocol)",
      "Helps disrupt debris and biofilm when paired with adequate irrigation",
      "Suitable for anterior and posterior cases with proper technique",
      "Rechargeable operation for repeat use through the day",
      "Streamlined body for chairside handling alongside your file sequence",
      "1002-1 unit: assume handpiece + charging support only unless IFU/packing says otherwise—plastic tips sell separately (Apex 1002-2)",
      "Full kit (1002-Full Kit) matches Apex list: UC One Blue + Tip (Body, Short, Long, Endo) + Tip Stand (confirm IFU)",
    ],
    specs: {
      "Apex SKUs": "1002-1 = UC-ONE (Ultrasonic Irrigation) unit listing; 1002-Full Kit = UC One Full Kit (see Remarks on dealer price export)",
      "Order codes": "1002-1 = unit; 1002-Full Kit = full kit per Apex line item",
      "Plastic tips (Apex)": "1002-2 = UC ONE- TIP (PLASTIC) 50EA—separate SKU from 1002-1; not implied with unit-only on the price list",
      "Intended use": "Ultrasonic irrigation / irrigant activation in root canals",
      "Power": "Cordless rechargeable (charge per IFU)",
      "Compatibility": "Standard endodontic access; use with approved irrigants only",
      "Training": "Operator should follow CE guidelines for ultrasonic endodontic irrigation",
    },
    faqs: [
      { question: "Does the 1002-1 UC-ONE unit come with plastic tips?", answer: "The Apex price list does not bundle plastic tips with 1002-1—plastic disposables are listed separately as 1002-2 (50ea). Coretix does not advertise that the unit-only SKU includes tips unless your IFU or distributor packing list explicitly says so. For tips included with the device, order 1002-Full Kit (Apex describes that kit with Tip Body/Short/Long/Endo + Tip Stand) or add 1002-2 / metal tip SKUs separately." },
      { question: "What is the difference between Unit (1002-1) and Full kit (1002-Full Kit)?", answer: "On the Apex / Apexdent dealer list, 1002-1 is only the UC-ONE (Ultrasonic Irrigation) line item with no accessories named—treat tips as not included until your IFU/packing proves otherwise. 1002-Full Kit is described as UC One Blue, Tip (Body, Short, Long, Endo), and Tip Stand. Plastic (1002-2) and metal (1002-3, etc.) tips remain separate SKUs when you buy the unit alone." },
      { question: "Is there an official UC-ONE overview video?", answer: "Yes. Use the Discovery section on this page (embedded player and link to YouTube) for a manufacturer-style walkthrough, then follow your IFU and training for clinical use." },
      { question: "What does UC-ONE do during root canal treatment?", answer: "UC-ONE ultrasonically activates irrigants inside the canal to improve cleaning and debris removal when used as part of a complete irrigation protocol with sufficient volume and proper needle placement." },
      { question: "Is UC-ONE a replacement for needle irrigation?", answer: "No. Needle irrigation and canal preparation remain essential. UC-ONE adds activation after, or alongside, conventional delivery, per accepted endodontic technique." },
      { question: "Which irrigants can I use with UC-ONE?", answer: "Use only irrigants approved for intracanal use and compatible with the device per the manufacturer IFU, commonly sodium hypochlorite and EDTA in clinical practice when indicated." },
      { question: "Who is UC-ONE best for?", answer: "UC-ONE is designed for licensed dental teams performing endodontic procedures who want a cordless activation option integrated into their existing irrigation protocol." },
      { question: "How should UC-ONE be cleaned and maintained?", answer: "Follow the manufacturer IFU for cleaning and maintenance. Use proper barrier technique and sterilization workflow for compatible accessories." },
      { question: "How long does shipping usually take for UC-ONE?", answer: "Coretix typically processes orders in 1-2 business days, with US delivery usually taking 3-7 business days after shipment." },
      { question: "Does UC-ONE have a warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can UC-ONE returns be requested?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix UC-ONE canonical product page", url: "https://www.dentalcoreinstruments.com/p/uc-one" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "CDC dental infection prevention guidance", url: "https://www.cdc.gov/oral-health/hcp/infection-control/index.html", note: "Reference for clinical infection-control standards." },
      { label: "Request UC-ONE IFU from Coretix sales", url: "mailto:sales@dentalcoreinstruments.com", note: "Request current manufacturer instructions and accessory handling details." },
    ],
  },
  {
    id: "1005-1",
    slug: "gp-cut-fit",
    mpn: "1005-1",
    name: "GP Cut & Fit (Standard)",
    price: 80.00,
    category: "Endodontics",
    description: "Affordable cordless GP cutter for everyday obturation. Quick-change tips, lightweight design, and reliable heating every time.",
    longDescription: "GP Cut & Fit delivers a budget-friendly path to warm GP trimming for general practices. Quick-change tips and a compact body make it easy to stage for single-visit and multi-visit endo. Pair with your preferred obturation technique and follow manufacturer guidance for tip sterilization.",
    image: img.cutfit,
    features: ["Cordless GP trimming for daily endo", "Quick-change tip system", "Lightweight handpiece", "Consistent heating for routine cases", "Value-priced for multi-op setups"],
    specs: { "Category": "Cordless gutta-percha cutter", "Use": "Obturation / GP adjustment", "Maintenance": "Per manufacturer IFU" },
    faqs: [
      { question: "What is GP Cut & Fit used for?", answer: "GP Cut & Fit is a cordless gutta-percha cutter used to trim and adjust GP during obturation procedures in endodontic treatment." },
      { question: "Who should buy GP Cut & Fit?", answer: "General practices and endodontists looking for an affordable cordless GP cutter for routine obturation workflows without advanced features." },
      { question: "What comes in the box with GP Cut & Fit?", answer: "Package contents are listed on the product page and typically include the handpiece, charging components, and starter tips. Confirm exact contents before ordering." },
      { question: "How should GP Cut & Fit be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, sterilization of compatible tips, and handpiece surface disinfection with barrier protection." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix GP Cut & Fit canonical product page", url: "https://www.dentalcoreinstruments.com/p/gp-cut-fit" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request GP Cut & Fit IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "1004-1",
    slug: "ep-plugger-set",
    mpn: "1004-1",
    name: "EP Plugger Set",
    price: 120.00,
    category: "Endodontics",
    description: "Two-piece ergonomic plugger set (FM/M and ML/L) for warm vertical condensation. Comfortable grip, precise tip control.",
    longDescription: "Warm vertical condensation demands plugger tips that feel balanced in the hand. This two-piece set covers fine-to-medium and medium-to-large canal sizes so you can adapt pluggers to anatomy without juggling mismatched handles.",
    image: img.ep_plugger,
    features: ["Two-piece set: FM/M and ML/L profiles", "Ergonomic grips for sustained condensation", "Stainless-style durability for repeat sterilization", "Pairs with warm vertical and hybrid techniques"],
    specs: { "Set contents": "2 pluggers (size ranges per packaging)", "Sterilization": "Autoclavable per IFU", "Technique": "Warm vertical condensation" },
    faqs: [
      { question: "What is the EP Plugger Set used for?", answer: "The EP Plugger Set is used for warm vertical condensation during endodontic obturation to pack and condense heated gutta-percha into the root canal system." },
      { question: "Who should buy the EP Plugger Set?", answer: "Endodontists and general practitioners performing warm vertical condensation techniques who need ergonomic, autoclavable pluggers in multiple sizes." },
      { question: "What is included in the EP Plugger Set?", answer: "The set includes 2 pluggers with FM/M and ML/L tip profiles to cover fine-to-medium and medium-to-large canal sizes." },
      { question: "How should the EP Plugger Set be maintained or sterilized?", answer: "The pluggers are autoclavable per manufacturer IFU. Follow standard instrument sterilization protocols for stainless steel endodontic hand instruments." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix EP Plugger Set canonical product page", url: "https://www.dentalcoreinstruments.com/p/ep-plugger-set" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request EP Plugger Set IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "1003-1",
    slug: "ep-suction-system",
    mpn: "1003-1",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction system for canal drying during endo procedures. Comes with 2 adapters and 5 disposable tips for immediate use.",
    longDescription: "Dry canals before sealer placement or between irrigant changes. The micro-suction tip helps remove residual irrigant without over-drying dentin when used with controlled vacuum.",
    image: img.ep_suction,
    features: ["Canal drying before obturation", "Includes adapters + 5 disposable tips", "Compact for chairside setup", "Reduces paper-point cycles in many cases"],
    specs: { "Kit": "2 adapters, 5 disposable tips", "Use": "Endodontic micro-suction / drying" },
    faqs: [
      { question: "What is the EP Suction System used for?", answer: "The EP Suction System is used for canal drying during endodontic procedures to remove residual irrigant before sealer placement or between irrigant changes." },
      { question: "Who should buy the EP Suction System?", answer: "Endodontists and general practitioners performing root canal treatments who want an efficient micro-suction option for canal drying to complement or reduce paper point usage." },
      { question: "What is included in the EP Suction System?", answer: "The system includes 2 adapters and 5 disposable tips for immediate use. Additional tips may be purchased separately." },
      { question: "How should the EP Suction System be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and sterilization of adapters. Disposable tips are single-use. Use proper infection control protocols per CDC guidelines." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix EP Suction System canonical product page", url: "https://www.dentalcoreinstruments.com/p/ep-suction-system" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request EP Suction System IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "MTA-1",
    slug: "endoseal-mta-sealer",
    mpn: "MTA-1",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Premixed injectable bioceramic sealer from Maruchi (Korea). 3g syringe with 20 tips, eugenol-free, sets in 10-12 minutes with high pH antibacterial properties.",
    longDescription: "Endoseal MTA is a ready-to-use bioceramic sealer formulated for hydraulic setting in moist environments. High radiopacity from zirconium oxide aids post-op verification. Commonly selected for single-cone and carrier-based techniques when the clinician wants a hydrophilic sealer line. Composition includes calcium silicates, calcium aluminates, and zirconium oxide radiopacifier with high pH antibacterial activity against E. faecalis.",
    image: img.endoseal,
    features: ["Premixed injectable bioceramic sealer", "3g syringe with 20 tips included", "Eugenol-free formulation", "Fast setting time: 10-12 minutes", "High pH antibacterial properties against E. faecalis", "Zirconium oxide radiopacifier for superior radiographic visibility"],
    specs: { 
      "Manufacturer": "Maruchi (Korea)", 
      "Material": "Calcium silicates, calcium aluminates, zirconium oxide", 
      "Handling": "Premixed 3g syringe with 20 tips", 
      "Setting time": "10-12 minutes",
      "Properties": "Eugenol-free, high pH, antibacterial",
    },
    faqs: [
      { question: "What is Endoseal MTA Sealer?", answer: "Endoseal MTA is a premixed injectable bioceramic endodontic sealer manufactured by Maruchi in Korea, containing calcium silicates, calcium aluminates, and zirconium oxide for root canal obturation." },
      { question: "Who should buy Endoseal MTA Sealer?", answer: "Endodontists and general practitioners performing single-cone or carrier-based obturation techniques who prefer a ready-to-use, eugenol-free bioceramic sealer with fast setting and antibacterial properties." },
      { question: "What is included with Endoseal MTA?", answer: "Each package includes a 3g premixed syringe and 20 application tips for immediate clinical use." },
      { question: "How should Endoseal MTA be maintained or sterilized?", answer: "Store per manufacturer instructions. Application tips are disposable. Follow standard infection control protocols for delivery systems." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix Endoseal MTA canonical product page", url: "https://www.dentalcoreinstruments.com/p/endoseal-mta-sealer" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Maruchi manufacturer information", url: "https://www.maruchi.com/", note: "Korean manufacturer of bioceramic endodontic materials." },
      { label: "Request Endoseal MTA IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "MTA-3",
    slug: "endocem-mta-root-repair",
    mpn: "MTA-3",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "FDA 510(k) cleared MTA cement from Maruchi (Korea). Available as premixed 2g syringe or powder-liquid format. Prevents discoloration with zirconium oxide, not bismuth oxide.",
    longDescription: "Endocem MTA addresses scenarios where you need a fast-setting MTA-type cement for repair and vital pulp therapy applications. Composition includes tricalcium silicate and zirconium oxide with hemostatic phyllosilicate ingredients. FDA 510(k) cleared as a Class II device. Use for root-end retrofills, strip perforations, apexification, pulpotomy, direct pulp capping, and perforation repair when your diagnosis supports MTA therapy. Zirconium oxide radiopacifier prevents the tooth discoloration sometimes associated with bismuth oxide formulations.",
    image: img.endocem,
    features: ["FDA 510(k) cleared Class II device", "Premixed 2g syringe or powder-liquid (300mg/0.12cc) formats", "Tricalcium silicate with zirconium oxide radiopacifier", "Prevents tooth discoloration (no bismuth oxide)", "Hemostatic phyllosilicate ingredients", "Multiple indications: pulp capping, pulpotomy, root-end filling, apexification, perforation repair"],
    specs: { 
      "Manufacturer": "Maruchi (Korea)",
      "Type": "MTA root repair / pulp capping cement", 
      "Composition": "Tricalcium silicate, zirconium oxide, phyllosilicate",
      "Formats": "Premixed 2g syringe or powder-liquid (300mg/0.12cc)",
      "FDA status": "510(k) cleared, Class II device",
      "Radiopacifier": "Zirconium oxide (non-discoloring)",
    },
    faqs: [
      { question: "What is Endocem MTA used for?", answer: "Endocem MTA is used for pulp capping, pulpotomy, root-end filling, apexification, and perforation repair in endodontic and restorative procedures." },
      { question: "Who should buy Endocem MTA?", answer: "Endodontists and general practitioners performing vital pulp therapy, perforation repairs, apexification, or surgical endodontics who need an FDA-cleared MTA cement that prevents tooth discoloration." },
      { question: "What is included with Endocem MTA?", answer: "Endocem MTA is available as a premixed 2g syringe or powder-liquid format (300mg powder with 0.12cc liquid). Confirm format when ordering." },
      { question: "How should Endocem MTA be maintained or sterilized?", answer: "Store per manufacturer IFU. Material is supplied sterile or for aseptic handling. Follow standard infection control protocols for delivery." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix Endocem MTA canonical product page", url: "https://www.dentalcoreinstruments.com/p/endocem-mta-root-repair" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Maruchi manufacturer information", url: "https://www.maruchi.com/", note: "Korean manufacturer of bioceramic endodontic materials." },
      { label: "Request Endocem MTA IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "TH-001",
    slug: "stronic-touch-heat",
    mpn: "TH-001",
    name: "Stronic Touch & Heat",
    price: 399.00,
    category: "Endodontics",
    description: "Cordless rechargeable heat pen for warm vertical obturation. Multiple tip sizes included. Lightweight and ready to use out of the box.",
    longDescription: "Stronic Touch & Heat gives you a cordless heat source for downpack and backfill steps without tethering to a wall unit. Multiple tips ship in-box so you can match canal taper on day one.",
    image: img.stronic_full,
    images: [img.stronic_full, img.stronic_tip],
    features: ["Cordless rechargeable heat pen", "Multiple tip sizes included", "Warm vertical and hybrid obturation support", "Lightweight for posterior access"],
    specs: { "Power": "Rechargeable battery", "Tips": "Multiple profiles included", "Use": "Warm GP condensation" },
    faqs: [
      { question: "What is Stronic Touch & Heat used for?", answer: "Stronic Touch & Heat is a cordless heat pen used for warm vertical condensation during endodontic obturation, including downpack and backfill techniques." },
      { question: "Who should buy Stronic Touch & Heat?", answer: "Endodontists and general practitioners performing warm vertical or hybrid obturation techniques who want cordless mobility without tethering to a wall unit." },
      { question: "What is included with Stronic Touch & Heat?", answer: "The device includes multiple tip sizes in-box for matching different canal tapers, plus rechargeable battery and charging components." },
      { question: "How should Stronic Touch & Heat be maintained or sterilized?", answer: "Follow manufacturer IFU for tip sterilization and handpiece maintenance. Use barrier protection and surface disinfection for the handpiece body." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix Stronic Touch & Heat canonical product page", url: "https://www.dentalcoreinstruments.com/p/stronic-touch-heat" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request Stronic Touch & Heat IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },


  // =========================================
  // HANDPIECES: AirPeak (Air Driven)
  // =========================================
  {
    id: "A1004-V2",
    slug: "airpeak-x600-s-kavo",
    mpn: "A1004-V2",
    name: "AirPeak™ X600-S (KaVo Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "KaVo MULTIflex compatible high-speed handpiece with titanium body, fiber optics, and quad-port spray for restorative and surgical workflows.",
    longDescription: "AirPeak X600-S is built for practices already using KaVo style couplers and needing a direct-fit high-speed option. The handpiece pairs a titanium body with fiber optic illumination and quad-port coolant for high-demand prep and finish work. Bundle with other AirPeak promos for practice-wide standardization.",
    image: img.ap_kavo,
    features: ["Titanium body", "Fiber optic illumination", "Quad-port spray", "~400K RPM class turbine", "KaVo MULTIflex compatible coupling"],
    specs: { "Coupling": "KaVo MULTIflex style", "Head": "Standard high-speed", "Coolant": "Quad port", "Illumination": "Fiber optic" },
    faqs: [
      { question: "Is AirPeak X600-S compatible with KaVo MULTIflex style couplers?", answer: "Yes. AirPeak X600-S is configured for KaVo MULTIflex style compatibility as listed on the product page." },
      { question: "Who should choose the X600-S model?", answer: "Practices using KaVo style couplers that want a high-speed titanium handpiece with fiber optic illumination and quad-port spray." },
      { question: "How should this handpiece be maintained?", answer: "Follow manufacturer cleaning, lubrication, and sterilization instructions for your handpiece and compatible accessories." },
      { question: "What is the shipping timeline for this SKU?", answer: "Orders are typically processed in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty coverage?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can opened handpieces be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak X600-S canonical page", url: "https://www.dentalcoreinstruments.com/p/airpeak-x600-s-kavo" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "KaVo product information", url: "https://www.kavo.com/en-us", note: "Reference manufacturer site for KaVo system terminology and coupler ecosystem context." },
      { label: "Request AirPeak IFU from Coretix sales", url: "mailto:sales@dentalcoreinstruments.com", note: "Request current IFU and maintenance guidance for your exact model." },
    ],
  },
  {
    id: "A1005",
    slug: "airpeak-x600-m-nsk",
    mpn: "A1005",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "NSK style compatible high-speed handpiece with titanium construction, fiber optics, and quad spray for daily operative use.",
    longDescription: "AirPeak X600-M is built for practices standardized on NSK style couplers and needing consistent high-speed performance. It follows the same AirPeak turbine approach as the KaVo variant with titanium construction, optics, and generous coolant for long cases.",
    image: img.ap_nsk,
    features: ["NSK-compatible coupling", "Titanium construction", "Fiber optics + quad spray", "High-speed restorative and surgical prep"],
    specs: { "Coupling": "NSK style", "Illumination": "Fiber optic", "Coolant": "Quad port" },
    faqs: [
      { question: "Is AirPeak X600-M compatible with NSK style couplers?", answer: "Yes. AirPeak X600-M is designed for NSK style compatibility as listed on the product page." },
      { question: "What is the difference between X600-M and X600-S?", answer: "The main difference is coupler ecosystem: X600-M is NSK style while X600-S is KaVo style." },
      { question: "Is this model appropriate for high-throughput restorative ops?", answer: "It is intended for high-speed restorative and surgical prep workflows where NSK style compatibility is required." },
      { question: "How should the handpiece be sterilized and maintained?", answer: "Use manufacturer IFU instructions for cleaning, lubrication, and sterilization workflow." },
      { question: "How long does shipping usually take?", answer: "Orders are typically processed in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "Can my practice request a return if needed?", answer: "Yes, returns can be requested, but eligibility is case-by-case and opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak X600-M canonical page", url: "https://www.dentalcoreinstruments.com/p/airpeak-x600-m-nsk" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "NSK Dental product site", url: "https://www.nskdental.com/", note: "Reference manufacturer site for NSK system naming and compatibility context." },
      { label: "Request AirPeak IFU from Coretix sales", url: "mailto:sales@dentalcoreinstruments.com", note: "Request current IFU and maintenance guidance before deployment." },
    ],
  },
  {
    id: "A1018",
    slug: "airpeak-x600-45-surgical",
    mpn: "A1018",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 569.00,
    category: "Handpieces",
    description: "Angled 45° surgical handpiece with rear exhaust to prevent air embolism. Designed for third molar access and oral surgery procedures.",
    longDescription: "The 45° head improves line-of-sight on third molars and posterior surgical sites. Rear exhaust routing is intended to direct air away from the surgical site per common surgical handpiece design practice.",
    image: img.ap_45,
    features: ["45° surgical head", "Rear exhaust routing", "High-speed cutting for surgical access", "Fiber-assisted visibility"],
    specs: { "Angle": "45°", "Exhaust": "Rear", "Use": "Oral surgery / third molar" },
    faqs: [
      { question: "What is the AirPeak X600-45 Surgical handpiece used for?", answer: "The X600-45 is a 45° angled surgical handpiece designed for third molar extractions and posterior oral surgery procedures where improved line-of-sight and rear exhaust are beneficial." },
      { question: "Who should buy the AirPeak X600-45?", answer: "Oral surgeons and general practitioners performing surgical extractions, third molar surgery, and procedures requiring angled access with rear exhaust to minimize air embolism risk." },
      { question: "What is included with the X600-45?", answer: "Package contents are listed on the product page. Confirm exact components and coupler compatibility before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for surgical handpieces per infection control standards." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak X600-45 canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-x600-45-surgical" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak X600-45 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1004-V3",
    slug: "airpeak-x600-micro-kavo",
    mpn: "A1004-V3",
    name: "AirPeak™ X600-Micro (KaVo)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Ultra-compact head for pediatric patients and limited-opening cases. 380-450K RPM with full fiber optic illumination.",
    longDescription: "When opening is tight or patients are small, the micro head reduces interference with adjacent teeth while preserving fiber optic sight lines. Ideal for pedo, second molars, and deep Class II access.",
    image: img.ap_micro,
    features: ["Ultra-compact head", "Pediatric / limited-opening friendly", "Fiber optic", "KaVo MULTIflex style"],
    specs: { "Head size": "Micro / short-head class", "Coupling": "KaVo MULTIflex style", "RPM": "Manufacturer-rated ~380-450K class" },
    faqs: [
      { question: "What is the AirPeak X600-Micro used for?", answer: "The X600-Micro is designed for pediatric patients and limited-opening cases where an ultra-compact head reduces interference with adjacent teeth while maintaining fiber optic visibility." },
      { question: "Who should buy the X600-Micro?", answer: "Pediatric dentists and general practitioners treating pediatric patients, performing deep Class II preps, or working in tight posterior access situations." },
      { question: "What is included with the X600-Micro?", answer: "Package contents and coupler compatibility are listed on the product page. KaVo MULTIflex style coupling. Confirm contents before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for high-speed handpieces." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak X600-Micro canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-x600-micro-kavo" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak X600-Micro IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1009B",
    slug: "airpeak-g100-la",
    mpn: "A1009B",
    name: "AirPeak™ G100-LA (Low Speed)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 latch-type contra angle with push-button bur release. Smooth, quiet operation for restorative and prophy work.",
    longDescription: "Latch-type contra angle for finishing, polishing, and operative steps that need a quiet 1:1 drive. Push-button chuck speeds bur changes chairside.",
    image: img.ap_low_la,
    features: ["1:1 latch contra angle", "Push-button bur release", "Smooth low-speed operation"],
    specs: { "Ratio": "1:1", "Type": "Latch contra angle" },
    faqs: [
      { question: "What is the AirPeak G100-LA used for?", answer: "The G100-LA is a 1:1 latch-type contra angle low-speed handpiece used for finishing, polishing, and restorative procedures requiring smooth, quiet operation." },
      { question: "Who should buy the AirPeak G100-LA?", answer: "General practitioners and hygienists performing finishing, polishing, and prophy work who need a reliable latch-type contra angle with push-button bur release." },
      { question: "What is included with the G100-LA?", answer: "Package contents are listed on the product page. Confirm exact components and coupler compatibility before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for low-speed handpieces." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak G100-LA canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-g100-la" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak G100-LA IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1012",
    slug: "airpeak-g100-st",
    mpn: "A1012",
    name: "AirPeak™ G100-ST (Straight)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 straight nose cone for lab work, extraoral adjustments, and acrylic trimming. Durable stainless construction.",
    longDescription: "Straight attachment for lab adjustments, denture contouring, and extraoral trimming when paired with your low-speed motor.",
    image: img.ap_low_st,
    features: ["1:1 straight nose cone", "Durable stainless construction", "Lab and chairside trimming"],
    specs: { "Ratio": "1:1", "Type": "Straight handpiece" },
    faqs: [
      { question: "What is the AirPeak G100-ST used for?", answer: "The G100-ST is a 1:1 straight nose cone handpiece used for lab work, extraoral adjustments, denture contouring, and acrylic trimming." },
      { question: "Who should buy the AirPeak G100-ST?", answer: "Dental labs and practices performing lab adjustments, denture work, extraoral trimming, and acrylic contouring that need a durable straight handpiece." },
      { question: "What is included with the G100-ST?", answer: "Package contents are listed on the product page. Confirm exact components and motor compatibility before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for straight handpieces." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak G100-ST canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-g100-st" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak G100-ST IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },

  // =========================================
  // HANDPIECES: iTesla (Electric)
  // =========================================
  {
    id: "A1019",
    slug: "itesla-electric-motor",
    mpn: "A1019",
    name: "iTesla Electric Motor System",
    price: 1299.00,
    category: "Equipment",
    description: "Brushless electric motor with built-in endodontic mode and 3.0 N*cm torque control. Pairs with all iTesla attachments for a complete system.",
    longDescription: "The iTesla motor is the hub for a full electric workflow: restorative, endodontic, and implant attachments share one brushless drive with precise torque reporting. Endo mode tailors speed/torque curves for rotary and reciprocating files per your protocol.",
    image: img.it_motor,
    features: ["Brushless electric motor", "Endodontic mode", "Torque display / control (~3.0 N*cm class)", "Accepts iTesla attachment family"],
    specs: { "Drive": "Electric brushless", "Modes": "Restorative + endodontic", "Torque": "~3.0 N*cm class (per manufacturer)" },
    faqs: [
      { question: "What is the iTesla Electric Motor System?", answer: "The iTesla Electric Motor System is a brushless electric motor hub for restorative, endodontic, and implant procedures that accepts iTesla attachment family handpieces with precise torque control and endodontic mode." },
      { question: "Who should buy the iTesla Electric Motor System?", answer: "Practices transitioning to electric handpiece workflows who want a single motor platform for restorative, endodontic, and implant procedures with precise torque control." },
      { question: "What is included with the iTesla Motor?", answer: "Package contents are listed on the product page. Motor base, control unit, and compatible attachments are typically sold separately. Confirm exact contents before ordering." },
      { question: "How should this motor be maintained or sterilized?", answer: "Follow manufacturer IFU for motor maintenance and cleaning. Attachments require separate sterilization per their individual instructions." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix iTesla Electric Motor canonical product page", url: "https://www.dentalcoreinstruments.com/p/itesla-electric-motor" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request iTesla Electric Motor IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1003",
    slug: "itesla-g600-s",
    mpn: "A1003",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 729.00,
    category: "Handpieces",
    description: "1:5 red-band electric handpiece attachment with DLC-coated titanium body and quad spray for high-speed prep under motor control.",
    longDescription: "iTesla G600-S is a 1:5 speed-increasing attachment for practices using electric motor workflows and seeking strong cutting consistency. The DLC-coated titanium body and internal coolant support visibility during crown prep and multi-surface restorative cases.",
    image: img.it_g600s,
    features: ["1:5 increasing", "DLC-coated titanium body", "Quad internal spray", "Electric motor attachment"],
    specs: { "Ratio": "1:5 increasing", "Band": "Red", "Coolant": "Internal spray" },
    faqs: [
      { question: "What does 1:5 red-band mean on iTesla G600-S?", answer: "It indicates a speed-increasing electric attachment used for high-speed restorative prep when paired with a compatible electric motor." },
      { question: "Is iTesla G600-S air-driven or electric?", answer: "It is an electric motor attachment and is intended to be used with a compatible electric motor system." },
      { question: "Who should consider this model?", answer: "Practices that prefer electric handpiece workflows and want a 1:5 option for high-speed cutting applications." },
      { question: "How should this product be cleaned and maintained?", answer: "Follow manufacturer instructions for cleaning, lubrication, sterilization, and routine maintenance." },
      { question: "How long does shipping typically take?", answer: "Orders are typically processed in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What are the return and warranty terms?", answer: "Returns are case-by-case and warranty follows manufacturer terms. Contact Coretix sales for return eligibility and warranty support." },
    ],
    sources: [
      { label: "Coretix iTesla G600-S canonical page", url: "https://www.dentalcoreinstruments.com/p/itesla-g600-s" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "CDC dental infection prevention guidance", url: "https://www.cdc.gov/oral-health/hcp/infection-control/index.html", note: "Reference for infection-control workflow context." },
      { label: "Request iTesla IFU from Coretix sales", url: "mailto:sales@dentalcoreinstruments.com", note: "Request current manufacturer instructions and compatibility details." },
    ],
  },
  {
    id: "A1028",
    slug: "itesla-g600-d",
    mpn: "A1028",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 479.00,
    category: "Handpieces",
    description: "1:1 direct-drive electric contra angle with internal water spray. Versatile workhorse for restorative, prophy, and endo prep.",
    longDescription: "Blue-band 1:1 is the generalist attachment: finishing, polishing, and selective prep tasks at motor-controlled RPM with steady torque feel.",
    image: img.it_g600d,
    features: ["1:1 direct drive", "Internal water spray", "Finishing and operative versatility"],
    specs: { "Ratio": "1:1", "Band": "Blue", "Coolant": "Internal" },
    faqs: [
      { question: "What is the iTesla G600-D used for?", answer: "The G600-D is a 1:1 direct-drive electric contra angle used for finishing, polishing, restorative prep, prophy, and endo prep tasks with motor-controlled RPM and steady torque." },
      { question: "Who should buy the iTesla G600-D?", answer: "Practices using iTesla electric motor systems who need a versatile 1:1 blue-band attachment for finishing, polishing, and general operative procedures." },
      { question: "What is included with the G600-D?", answer: "Package contents are listed on the product page. Requires compatible iTesla electric motor (sold separately). Confirm compatibility before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for electric handpiece attachments." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix iTesla G600-D canonical product page", url: "https://www.dentalcoreinstruments.com/p/itesla-g600-d" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request iTesla G600-D IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1020",
    slug: "itesla-g500-r20-implant",
    mpn: "A1020",
    name: "iTesla™ G500-R20 (20:1 Implant)",
    price: 599.00,
    category: "Handpieces",
    description: "20:1 reduction implant handpiece with external irrigation clip. Precise torque delivery for implant placement and bone work.",
    longDescription: "20:1 reduction geometry slows motor output for osteotomy and implant insertion sequences. External irrigation clip keeps the field cool when using surgical-length burs and drivers.",
    image: img.it_implant,
    features: ["20:1 reduction for surgery", "External irrigation clip", "Implant motor attachment"],
    specs: { "Ratio": "20:1 reduction", "Irrigation": "External clip", "Use": "Implant / bone drilling" },
    faqs: [
      { question: "What is the iTesla G500-R20 used for?", answer: "The G500-R20 is a 20:1 reduction implant handpiece attachment used for osteotomy preparation, implant insertion, and bone drilling with precise torque control during implant surgery." },
      { question: "Who should buy the iTesla G500-R20?", answer: "Implant surgeons and practices placing dental implants who use iTesla electric motor systems and need a 20:1 reduction attachment with external irrigation for surgical procedures." },
      { question: "What is included with the G500-R20?", answer: "Package contents are listed on the product page. Requires compatible iTesla electric motor (sold separately). Confirm compatibility and contents before ordering." },
      { question: "How should this handpiece be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for surgical implant handpiece attachments." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix iTesla G500-R20 canonical product page", url: "https://www.dentalcoreinstruments.com/p/itesla-g500-r20-implant" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request iTesla G500-R20 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },

  // =========================================
  // CLINICAL EQUIPMENT
  // =========================================
  {
    id: "A1619",
    slug: "stronic-x150-piezo-scaler",
    mpn: "A1619",
    name: "STRONIC X150 Piezo Scaler",
    price: 799.00,
    category: "Equipment",
    description: "Piezo ultrasonic scaler operating at 28,000 Hz with Smart Response Technology for auto power adjustment. Integrated LED lighting (5,500K, 25,500 LUX) and dedicated Endo, Perio, Scaling modes.",
    longDescription: "STRONIC X150 packages piezo scaling, perio therapy, and endodontic ultrasonic functions in one touchscreen-driven unit. Smart Response Technology auto-adjusts power based on tip load so you spend less time manually tuning between patients. Integrated LED provides 25,500 LUX at 5,500K color temperature for superior visibility. Movement amplitude ranges from 0.02mm to 0.08mm for precise control.",
    image: img.x150_1,
    images: [img.x150_1, img.x150_2, img.x150_3],
    features: ["Touchscreen UI", "28,000 Hz ± 3kHz piezo frequency", "Smart Response Technology for auto power adjustment", "Integrated LED lighting: 5,500K, 25,500 LUX", "Scaling, perio, and endo modes", "Movement amplitude: 0.02mm to 0.08mm"],
    specs: { 
      "Technology": "Piezo ultrasonic", 
      "Frequency": "28,000 Hz ± 3kHz",
      "Smart Response": "Auto power adjustment based on tip load",
      "LED lighting": "5,500K color temp, 25,500 LUX",
      "Movement amplitude": "0.02mm to 0.08mm",
      "Input": "110V, 50Hz/60Hz",
      "Modes": "Scaling / Perio / Endo", 
      "Control": "Touchscreen" 
    },
    faqs: [
      { question: "What is the STRONIC X150 Piezo Scaler?", answer: "The STRONIC X150 is a piezo ultrasonic scaler operating at 28,000 Hz with Smart Response Technology, integrated LED lighting, and dedicated modes for scaling, perio therapy, and endodontic ultrasonic procedures." },
      { question: "Who should buy the STRONIC X150?", answer: "Hygienists, periodontists, endodontists, and general practitioners who need a versatile piezo scaler with auto-frequency tuning, bright LED lighting, and multiple clinical modes in one unit." },
      { question: "What is included with the STRONIC X150?", answer: "Package contents are listed on the product page and typically include the base unit, handpiece, starter tips, and power cable. Confirm exact contents before ordering." },
      { question: "How should the STRONIC X150 be maintained or sterilized?", answer: "Follow manufacturer IFU for unit cleaning and maintenance. Handpiece and tips require sterilization per infection control protocols. Use proper barrier protection." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix STRONIC X150 canonical product page", url: "https://www.dentalcoreinstruments.com/p/stronic-x150-piezo-scaler" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request STRONIC X150 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1061",
    slug: "stronic-x300-air-scaler",
    mpn: "A1061",
    name: "STRONIC X300 Air Scaler",
    price: 699.00,
    category: "Handpieces",
    description: "Air-driven scaler that connects directly to your KaVo coupler. 6,000 Hz oscillation for comfortable, efficient scaling without a separate unit.",
    longDescription: "Use your existing KaVo MULTIflex air supply to drive ultrasonic scaling without investing in a separate scaler console, ideal for hygiene op overflow or mobile setups.",
    image: img.x300_1,
    images: [img.x300_1, img.x300_2, img.x300_3],
    features: ["KaVo coupler connection", "Air-driven scaler", "High-frequency oscillation", "No separate scaler base required"],
    specs: { "Drive": "Air turbine to scaler insert", "Coupling": "KaVo style", "Frequency": "~6 kHz class (per manufacturer)" },
    faqs: [
      { question: "What is the STRONIC X300 Air Scaler?", answer: "The STRONIC X300 is an air-driven ultrasonic scaler that connects directly to your existing KaVo MULTIflex coupler, providing 6,000 Hz oscillation for scaling without a separate scaler console." },
      { question: "Who should buy the STRONIC X300?", answer: "Practices with KaVo MULTIflex air systems who want to add ultrasonic scaling capability to hygiene operatories without purchasing a separate scaler base unit." },
      { question: "What is included with the STRONIC X300?", answer: "Package contents are listed on the product page. Requires existing KaVo MULTIflex compatible air supply. Confirm compatibility and contents before ordering." },
      { question: "How should the STRONIC X300 be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning, lubrication, and sterilization. Use proper maintenance protocols for air-driven scalers and tips." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix STRONIC X300 canonical product page", url: "https://www.dentalcoreinstruments.com/p/stronic-x300-air-scaler" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request STRONIC X300 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1658",
    slug: "airpeak-pro200-air-polisher",
    mpn: "A1658",
    name: "AirPeak™ PRO200 Air Polisher",
    price: 669.00,
    category: "Equipment",
    description: "Air polishing handpiece with anti-clog design and 360° swivel nozzle. Fast biofilm removal for prophy, perio, and ortho patients.",
    longDescription: "PRO200 targets stain and biofilm with a swivel nozzle that tracks lingual and facial surfaces comfortably. Anti-clog architecture reduces downtime with glycine or prophy powders per your powder compatibility chart.",
    image: img.air_polish,
    features: ["360° swivel nozzle", "Anti-clog powder path", "Air polishing for prophy/perio", "Orthodontic debond cleanup support"],
    specs: { "Type": "Air polisher handpiece", "Nozzle": "360° swivel", "Powder": "Per manufacturer compatibility" },
    faqs: [
      { question: "What is the AirPeak PRO200 Air Polisher?", answer: "The PRO200 is an air polishing handpiece with a 360° swivel nozzle and anti-clog design for fast biofilm removal during prophy, perio, and ortho procedures." },
      { question: "Who should buy the AirPeak PRO200?", answer: "Hygienists, periodontists, and practices performing prophy, perio maintenance, and orthodontic debond cleanup who want efficient stain and biofilm removal with a swivel nozzle." },
      { question: "What is included with the PRO200?", answer: "Package contents are listed on the product page. Powder media typically sold separately. Confirm exact contents and powder compatibility before ordering." },
      { question: "How should the PRO200 be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and sterilization. Use proper maintenance protocols for air polishing handpieces and verify powder compatibility." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak PRO200 canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-pro200-air-polisher" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak PRO200 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "A1030",
    slug: "mccare-x-maintenance",
    mpn: "A1030",
    name: "McCare™ X Maintenance",
    price: 1399.00,
    category: "Equipment",
    description: "Automated 4-port handpiece maintenance station with 3 cycle modes (S: 35s, M: 45s, L: 50s). Universal voltage (100-240V), 300ml oil reservoir, operates at 60-80 PSI.",
    longDescription: "McCare X runs a repeatable clean-lube-purge cycle across four handpieces simultaneously so your turbines and attachments see consistent maintenance intervals, often extending service life versus ad-hoc manual drops. Three selectable cycle modes allow customization based on handpiece type and contamination level. Compact footprint (11.4\" x 7.6\" x 16\", 15.85 lbs) with universal voltage compatibility for global use. Note: lubrication oil not included.",
    image: img.mccare_1,
    images: [img.mccare_1, img.mccare_2, img.mccare_3, img.mccare_4],
    features: ["4 simultaneous ports for batch processing", "3 cycle modes: S (35s), M (45s), L (50s)", "Universal voltage: 100-240V, 50/60Hz", "Working air pressure: 60-80 PSI", "300ml oil reservoir capacity", "Compact: 11.4\" x 7.6\" x 16\", 15.85 lbs", "Reduces manual maintenance variance"],
    specs: { 
      "Ports": "4 simultaneous",
      "Cycle modes": "S: 35 seconds, M: 45 seconds, L: 50 seconds",
      "Dimensions": "11.4\" x 7.6\" x 16\"",
      "Weight": "15.85 lbs",
      "Voltage": "100-240V, 50/60Hz (universal)",
      "Working air pressure": "60-80 PSI",
      "Oil reservoir": "300ml (oil not included)",
      "Function": "Clean / purge / lubricate", 
      "Use": "High & low speed maintenance" 
    },
    faqs: [
      { question: "What is the McCare X Maintenance station?", answer: "The McCare X is an automated 4-port handpiece maintenance station that cleans, purges, and lubricates high-speed and low-speed handpieces in repeatable cycles (35s, 45s, or 50s) to extend service life and reduce manual maintenance variance." },
      { question: "Who should buy the McCare X?", answer: "Busy multi-operatory practices, group practices, and institutions that want to standardize handpiece maintenance, extend turbine life, and reduce staff time spent on manual lubrication." },
      { question: "What is included with the McCare X?", answer: "The McCare X unit is included. Lubrication oil is NOT included and must be purchased separately. Confirm exact package contents before ordering." },
      { question: "How should the McCare X be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and maintenance of the unit itself. Handpieces processed through McCare X still require sterilization per infection control protocols." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix McCare X canonical product page", url: "https://www.dentalcoreinstruments.com/p/mccare-x-maintenance" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request McCare X IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "IPR-001",
    slug: "airpeak-automatic-ipr",
    mpn: "IPR-001",
    name: "AirPeak Automatic IPR",
    price: 249.00,
    category: "Handpieces",
    description: "Reciprocating IPR handpiece for precise interproximal enamel reduction. Essential for aligner cases and orthodontic finishing.",
    longDescription: "Dedicated IPR handpiece with reciprocating motion for controlled enamel reduction during clear aligner staging and finishing. Pair with your preferred IPR strips or discs per clinical protocol.",
    image: img.ipr,
    features: ["Reciprocating IPR motion", "Aligner case support", "Finishing enamel reduction"],
    specs: { "Motion": "Reciprocating", "Clinical use": "Interproximal reduction" },
    faqs: [
      { question: "What is the AirPeak Automatic IPR handpiece used for?", answer: "The AirPeak IPR handpiece is used for precise interproximal enamel reduction during clear aligner treatment and orthodontic finishing to create space for tooth movement." },
      { question: "Who should buy the AirPeak Automatic IPR?", answer: "General practitioners and orthodontists providing clear aligner treatment (Invisalign, ClearCorrect, etc.) who need controlled, precise IPR for space creation and finishing." },
      { question: "What is included with the AirPeak IPR?", answer: "Package contents are listed on the product page. IPR strips or discs may be sold separately. Confirm exact contents before ordering." },
      { question: "How should the AirPeak IPR be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and sterilization. Use proper maintenance protocols for reciprocating handpieces and IPR instruments." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix AirPeak Automatic IPR canonical product page", url: "https://www.dentalcoreinstruments.com/p/airpeak-automatic-ipr" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request AirPeak IPR IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },

  // =========================================
  // BIOMATERIALS
  // =========================================
  {
    id: "OS-SEAL-SYR",
    slug: "osseoseal-prefilled-syringe",
    mpn: "OS-SEAL-SYR",
    name: "OsseoSeal Prefilled Syringe",
    price: 48.00,
    category: "Surgical",
    description: "Human FDBA (Freeze-Dried Bone Allograft) prefilled syringe, 50% cortical / 50% cancellous blend. Particle size 250-800µm (syringe) for predictable socket preservation and GBR.",
    longDescription: "OsseoSeal syringes deliver human-derived FDBA mineralized cortico-cancellous particulate processed to AATB and FDA standards in consistent volumes for sockets, lateral windows, and localized defects. The 50/50 cortical-cancellous blend provides osteoconductive 3D lattice structure for bone regeneration. Choose 0.3cc, 0.5cc, or 1.0cc (2x0.5cc) volumes to match defect size and reduce waste.",
    image: img.osseo_syr_03,
    images: [img.osseo_syr_03, img.osseo_syr_05, img.osseo_syr_10],
    features: ["Human-derived FDBA (Freeze-Dried Bone Allograft)", "50% cortical / 50% cancellous blend", "Particle size: 250-800µm (syringe format)", "Processed to AATB and FDA standards", "Osteoconductive 3D lattice structure", "Prefilled syringe delivery", "Multiple volumes: 0.3cc, 0.5cc, 1.0cc"],
    specs: { 
      "Graft type": "Human FDBA (Freeze-Dried Bone Allograft)",
      "Composition": "50% cortical / 50% cancellous",
      "Particle size": "250-800µm (syringe format)",
      "Processing": "AATB and FDA standards",
      "Structure": "Osteoconductive 3D lattice",
      "Sterility": "Per tissue bank documentation" 
    },
    faqs: [
      { question: "What is OsseoSeal Prefilled Syringe?", answer: "OsseoSeal is a human-derived FDBA (Freeze-Dried Bone Allograft) in a 50% cortical / 50% cancellous blend, particle size 250-800µm, processed to AATB and FDA standards for socket preservation and GBR." },
      { question: "Who should buy OsseoSeal syringes?", answer: "Oral surgeons, periodontists, and implant surgeons performing socket preservation, ridge augmentation, sinus lifts, and GBR procedures who need predictable human allograft in convenient prefilled syringes." },
      { question: "Which volume should I order?", answer: "Choose 0.3cc for small sockets, 0.5cc for typical single-tooth defects, and 1.0cc (2x0.5cc) when you need more volume without opening a second syringe." },
      { question: "Do I still need a membrane?", answer: "Many ridge-preservation and GBR protocols use a collagen membrane over the graft. Follow your surgical plan and the membrane IFU when a barrier is indicated." },
      { question: "How should OsseoSeal be stored or maintained?", answer: "Store per tissue bank and manufacturer instructions. Material is supplied sterile. Do not resterilize. Follow aseptic technique during surgical use." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix OsseoSeal Prefilled Syringe canonical product page", url: "https://www.dentalcoreinstruments.com/p/osseoseal-prefilled-syringe" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "AATB standards for tissue banking", url: "https://www.aatb.org/", note: "American Association of Tissue Banks standards reference." },
      { label: "Request OsseoSeal IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
    variants: [
      { id: "OS_0.3cc", name: "0.3cc",           price: 48.00,  image: img.osseo_syr_03 },
      { id: "OS_0.5cc", name: "0.5cc",           price: 68.00,  image: img.osseo_syr_05 },
      { id: "OS_1.0cc", name: "1.0cc (2×0.5cc)", price: 100.00, image: img.osseo_syr_10 },
    ]
  },
  {
    id: "OS-SEAL-PDR",
    slug: "osseoseal-allograft-powder",
    mpn: "OS-SEAL-PDR",
    name: "OsseoSeal Allograft Powder",
    price: 115.00,
    category: "Surgical",
    description: "Human FDBA (Freeze-Dried Bone Allograft) bulk powder, 50% cortical / 50% cancellous blend. Particle size 250-1000µm for larger grafting cases and sinus lifts.",
    longDescription: "Bulk jar presentation for larger ridge augmentations, sinus floor grafts, and cases where you want to mix with blood, PRF, or other carriers per your protocol. Human-derived FDBA processed to AATB and FDA standards with osteoconductive 3D lattice structure. Same composition as syringe forms (slightly larger particle range 250-1000µm for powder) for blending inventories when needed.",
    image: img.osseo_pdr_25,
    images: [img.osseo_pdr_25, img.osseo_pdr_50],
    features: ["Human-derived FDBA bulk powder", "50% cortical / 50% cancellous blend", "Particle size: 250-1000µm (powder format)", "Processed to AATB and FDA standards", "Economical for large defects", "Compatible with membrane coverage protocols", "Mix with blood, PRF, or other carriers per protocol"],
    specs: { 
      "Form": "Powder jar", 
      "Graft type": "Human FDBA (Freeze-Dried Bone Allograft)",
      "Composition": "50% cortical / 50% cancellous",
      "Particle size": "250-1000µm (powder format)",
      "Volumes": "2.5cc / 5cc options",
      "Processing": "AATB and FDA standards",
    },
    faqs: [
      { question: "What is OsseoSeal Allograft Powder?", answer: "OsseoSeal Powder is human-derived FDBA (Freeze-Dried Bone Allograft) in a 50% cortical / 50% cancellous blend, particle size 250-1000µm, processed to AATB and FDA standards for larger grafting cases and sinus lifts." },
      { question: "Who should buy OsseoSeal powder?", answer: "Oral surgeons, periodontists, and implant surgeons performing larger ridge augmentations, sinus floor elevations, and multi-site grafting who need cost-effective bulk allograft that can be mixed with blood or PRF." },
      { question: "What is the difference between powder and syringe OsseoSeal?", answer: "Powder format has slightly larger particle range (250-1000µm vs 250-800µm syringe) and comes in bulk jars for larger volume cases. Both are the same 50/50 cortical-cancellous FDBA composition." },
      { question: "How should OsseoSeal powder be stored or maintained?", answer: "Store per tissue bank and manufacturer instructions. Material is supplied sterile. Do not resterilize. Follow aseptic technique during surgical use." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix OsseoSeal Allograft Powder canonical product page", url: "https://www.dentalcoreinstruments.com/p/osseoseal-allograft-powder" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "AATB standards for tissue banking", url: "https://www.aatb.org/", note: "American Association of Tissue Banks standards reference." },
      { label: "Request OsseoSeal IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
    variants: [
      { id: "OS_2.5cc", name: "2.5cc",           price: 115.00, image: img.osseo_pdr_25 },
      { id: "OS_5.0cc", name: "5cc (2×2.5cc)",   price: 200.00, image: img.osseo_pdr_50 },
    ]
  },
  {
    id: "OS-SEAL-MEM",
    slug: "osseoseal-collagen-membrane",
    mpn: "OS-SEAL-MEM",
    name: "OsseoSeal Collagen Membrane",
    price: 75.00,
    category: "Surgical",
    description: "Resorbable porcine collagen membrane for guided bone regeneration. Easy to handle, conforms well to defects, and maintains barrier function during healing.",
    longDescription: "Porcine collagen barrier for GBR and extraction-site ridge preservation when used with graft particulate. Multiple sizes cover single-tooth defects through multi-tooth spans; resorption profile follows manufacturer specifications.",
    image: img.osseo_mem,
    images: [img.osseo_mem],
    features: ["Resorbable collagen membrane", "GBR and ridge preservation applications", "Conforms to defect anatomy", "Several sizes for surgical flexibility"],
    specs: { "Material": "Porcine collagen", "Sizes": "15x20mm, 20x30mm, 30x40mm", "Resorption": "Per IFU" },
    faqs: [
      { question: "What is OsseoSeal Collagen Membrane?", answer: "OsseoSeal Collagen Membrane is a resorbable porcine collagen barrier membrane for guided bone regeneration (GBR) and ridge preservation procedures to maintain space over bone graft particulate during healing." },
      { question: "Who should buy OsseoSeal Collagen Membrane?", answer: "Oral surgeons, periodontists, and implant surgeons performing GBR, ridge preservation, and socket grafting who need a resorbable barrier membrane in multiple size options." },
      { question: "Which size should I order?", answer: "Choose 15x20mm for single-tooth defects, 20x30mm for moderate defects or ridge preservation, and 30x40mm for multi-tooth spans or larger augmentation sites." },
      { question: "How should OsseoSeal Membrane be stored or maintained?", answer: "Store per manufacturer instructions. Material is supplied sterile. Do not resterilize. Use aseptic technique during surgical placement." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix OsseoSeal Collagen Membrane canonical product page", url: "https://www.dentalcoreinstruments.com/p/osseoseal-collagen-membrane" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request OsseoSeal Membrane IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
    variants: [
      { id: "OS1520", name: "15×20 mm", price: 75.00,  image: img.osseo_mem },
      { id: "OS2030", name: "20×30 mm", price: 110.00, image: img.osseo_mem },
      { id: "OS3040", name: "30×40 mm", price: 150.00, image: img.osseo_mem },
    ]
  },
  {
    id: "OSTEO-PLUG",
    slug: "osteogen-plug-10x20",
    mpn: "OSTEO-PLUG",
    name: "OsteoGen Plug 10×20mm (Large)",
    price: 549.00,
    category: "Surgical",
    description: "One-step socket preservation plug by Impladent Ltd: bioactive calcium apatite crystals + bovine Type I collagen. No separate membrane needed. Insert dry, becomes radiopaque in 3-6 months. 10/Box.",
    longDescription: "OsteoGen Plug combines bovine Achilles tendon Type I collagen with bioactive resorbable calcium apatite crystals for socket grafting without a separate membrane in appropriate cases. Insert dry into the socket where it absorbs blood for immediate stabilization. Initially radiolucent at placement, the material becomes radiopaque in 3-6 months as host bone replaces the graft, confirming regeneration progress. Manufactured by Impladent Ltd. Follow the manufacturer surgical protocol for case selection and placement technique.",
    image: img.osteogen,
    features: ["One-step socket preservation (no separate membrane)", "Bioactive calcium apatite crystals + bovine Type I collagen", "Insert dry - absorbs blood for stabilization", "Radiolucent at placement, radiopaque in 3-6 months", "Manufactured by Impladent Ltd", "10 plugs per box"],
    specs: { 
      "Size": "10x20mm large", 
      "Manufacturer": "Impladent Ltd",
      "Composition": "Bioactive resorbable calcium apatite + bovine Achilles tendon Type I collagen",
      "Placement": "Insert dry (absorbs blood)",
      "Radiopacity": "Radiolucent initially, becomes radiopaque in 3-6 months",
      "Packaging": "10 / box", 
      "Use": "Extraction site / socket preservation / localized grafting" 
    },
    faqs: [
      { question: "What is OsteoGen Plug?", answer: "OsteoGen Plug is a one-step socket preservation device combining bioactive resorbable calcium apatite crystals with bovine Type I collagen. No separate membrane is needed. Manufactured by Impladent Ltd." },
      { question: "Who should buy OsteoGen Plug?", answer: "Oral surgeons, periodontists, and general practitioners performing socket preservation after extractions who want a simplified one-step grafting solution without a separate membrane." },
      { question: "What is included in the OsteoGen Plug box?", answer: "Each box contains 10 plugs at 10x20mm size (large) for typical extraction socket preservation cases." },
      { question: "How should OsteoGen Plug be stored or maintained?", answer: "Store per manufacturer instructions. Material is supplied sterile. Do not resterilize. Insert dry into the socket where it absorbs blood for stabilization." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix OsteoGen Plug canonical product page", url: "https://www.dentalcoreinstruments.com/p/osteogen-plug-10x20" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Impladent Ltd manufacturer information", url: "https://www.impladent.com/", note: "Manufacturer of OsteoGen bone graft materials." },
      { label: "Request OsteoGen Plug IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },

  {
    id: "HELI-1",
    slug: "curagen-collagen-plug",
    mpn: "HELI-1",
    name: "Curagen™ Collagen Wound Dressing Plug",
    price: 110.00,
    category: "Surgical",
    description: "Non-crosslinked collagen plug for extraction sites. Controls bleeding, promotes clot stabilization, and resorbs in ~4 weeks. 10/Box.",
    longDescription: "Curagen plugs provide a resorbable collagen matrix to stabilize clots in fresh extraction sockets and mucosal wounds. Typical resorption near four weeks, plan graft or restorative timing accordingly.",
    image: img.collagen,
    features: ["Non-crosslinked collagen", "Hemostasis / clot support", "Resorbs in ~4 weeks", "10 plugs per box"],
    specs: { "Material": "Collagen plug", "Resorption": "~4 weeks (typical)", "Quantity": "10 / box" },
    faqs: [
      { question: "What is Curagen Collagen Wound Dressing Plug?", answer: "Curagen is a non-crosslinked resorbable collagen plug for extraction sites that controls bleeding, promotes clot stabilization, and resorbs in approximately 4 weeks." },
      { question: "Who should buy Curagen Collagen Plug?", answer: "General practitioners, oral surgeons, and periodontists performing extractions who need hemostasis and clot stabilization without long-term grafting or bone regeneration goals." },
      { question: "What is included in the Curagen box?", answer: "Each box contains 10 collagen wound dressing plugs for extraction site hemostasis and clot support." },
      { question: "How should Curagen plugs be stored or maintained?", answer: "Store per manufacturer instructions. Material is supplied sterile. Do not resterilize. Use aseptic technique during surgical placement." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix Curagen Collagen Plug canonical product page", url: "https://www.dentalcoreinstruments.com/p/curagen-collagen-plug" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request Curagen IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },

  // =========================================
  // RESTORATIVE
  // =========================================
  {
    id: "M1042X",
    slug: "modulite-x-curing-light",
    mpn: "M1042X",
    name: "ModuLite X Curing Light",
    price: 699.00,
    category: "Restorative",
    description: "Multi-wavelength LED curing light (380-520nm, ~1800 mW/cm²) by Markson Dental. 4 custom LEDs, 10mm collimated lens, 360° rotatable head, detection mode (380-420nm). Charging base with radiometer.",
    longDescription: "ModuLite X covers violet through blue emission bands (380-520nm) to accommodate newer photoinitiator systems while still curing conventional composites. 4 custom multi-wavelength LEDs deliver approximately 1800 mW/cm² irradiance through a 10mm collimated lens for consistent depth of cure. Detection mode uses 380-420nm LED for caries and resin detection before finishing. 360-degree rotatable head improves access. Charging base includes built-in radiometer for periodic output verification. Manufactured by Markson Dental Systems with Li-ion 3.7V 300mAh battery. Lightweight at 63.6g. AC 100-240V, 50-60Hz universal voltage.",
    image: img.modulite_4,
    images: [img.modulite_4, img.modulite_1, img.modulite_2, img.modulite_3, img.modulite_5, img.modulite_6],
    features: ["4 custom multi-wavelength LEDs (380-520nm)", "Irradiance: ~1800 mW/cm²", "Detection mode: 380-420nm for caries/resin detection", "10mm collimated lens for consistent output", "360° rotatable head for access", "Charging base with built-in radiometer", "Aerospace-grade aluminum housing", "Lightweight: 63.6g", "Li-ion battery: 3.7V 300mAh", "Universal voltage: 100-240V, 50-60Hz"],
    specs: { 
      "Manufacturer": "Markson Dental Systems",
      "Wavelength": "380-520nm",
      "Irradiance": "~1800 mW/cm²",
      "Detection mode": "380-420nm LED (caries/resin detection)",
      "Lens": "10mm collimated",
      "Head rotation": "360°",
      "Battery": "Li-ion 3.7V 300mAh",
      "Weight": "63.6g",
      "AC Input": "100-240V, 50-60Hz",
      "Charging base": "Includes built-in radiometer",
      "Body": "Aluminum", 
      "Modes": "Cure + resin detection" 
    },
    faqs: [
      { question: "What is ModuLite X Curing Light?", answer: "ModuLite X is a multi-wavelength LED curing light (380-520nm, ~1800 mW/cm²) manufactured by Markson Dental Systems with 4 custom LEDs, detection mode, 360° rotatable head, and charging base with built-in radiometer." },
      { question: "Who should buy ModuLite X?", answer: "General practitioners and specialists performing restorative procedures who need a broadband curing light compatible with modern photoinitiators, plus detection mode for locating residual composite and caries." },
      { question: "What is included with ModuLite X?", answer: "Package includes the ModuLite X handpiece, charging base with built-in radiometer, battery (Li-ion 3.7V 300mAh), and accessories per product listing. Confirm exact contents before ordering." },
      { question: "How should ModuLite X be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and maintenance. Use barrier sleeves for infection control. The handpiece body is not autoclavable; use surface disinfection per IFU." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix ModuLite X canonical product page", url: "https://www.dentalcoreinstruments.com/p/modulite-x-curing-light" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Markson Dental Systems manufacturer site", url: "https://www.marksondental.com/", note: "Manufacturer of ModuLite X and SureTact systems." },
      { label: "Request ModuLite X IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "1007-1",
    slug: "ep-cure-led",
    mpn: "1007-1",
    name: "EP CURE",
    price: 599.00,
    category: "Restorative",
    description: "High-intensity LED curing light with 1-second cure capability. Reduces chair time without compromising depth of cure.",
    longDescription: "EP CURE targets high-output curing for bulk-fill and posteriors where short cure cycles matter. Always verify manufacturer cure times for your specific composite shade and increment thickness.",
    image: img.ep_cure,
    features: ["High-intensity LED", "Fast (~1s) cure cycles on compatible resins", "Reduces per-tooth curing time", "Suitable for routine restorative ops"],
    specs: { "Type": "LED curing light", "Cure time": "Material-dependent (fast mode)" },
    faqs: [
      { question: "What is EP CURE used for?", answer: "EP CURE is a high-intensity LED curing light designed for rapid polymerization of light-cured dental composites, with fast cure cycles (~1 second on compatible materials) to reduce chair time." },
      { question: "Who should buy EP CURE?", answer: "General practitioners and restorative specialists performing high-volume composite procedures who want to reduce curing time while maintaining adequate depth of cure with compatible materials." },
      { question: "What is included with EP CURE?", answer: "Package contents are listed on the product page and typically include the curing light handpiece, charging components, and accessories. Confirm exact contents before ordering." },
      { question: "How should EP CURE be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and maintenance. Use barrier sleeves for infection control. The handpiece body is not autoclavable; use surface disinfection per IFU." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix EP CURE canonical product page", url: "https://www.dentalcoreinstruments.com/p/ep-cure-led" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request EP CURE IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "1008-1",
    slug: "ep-light-transilluminator",
    mpn: "1008-1",
    name: "EP Light Transilluminator",
    price: 160.00,
    category: "Restorative",
    description: "Compact diagnostic transilluminator for detecting cracks, fracture lines, and caries. A quick chairside diagnostic tool.",
    longDescription: "Handheld transillumination for vertical fracture detection, approximal caries screening, and crack propagation checks before committing to prep design.",
    image: img.ep_light,
    features: ["Compact diagnostic light", "Crack and caries screening", "Chairside ergonomics"],
    specs: { "Use": "Transillumination diagnostics", "Power": "LED handheld" },
    faqs: [
      { question: "What is EP Light Transilluminator used for?", answer: "EP Light is a compact handheld transilluminator used for detecting vertical fractures, approximal caries, and crack propagation in teeth before treatment planning." },
      { question: "Who should buy EP Light Transilluminator?", answer: "General practitioners and specialists who want a quick chairside diagnostic tool for screening cracks, fractures, and interproximal caries during exams and treatment planning." },
      { question: "What is included with EP Light?", answer: "Package contents are listed on the product page and typically include the transilluminator handpiece and power components. Confirm exact contents before ordering." },
      { question: "How should EP Light be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and maintenance. Use barrier protection for infection control. Surface disinfection per IFU; not autoclavable unless specified." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix EP Light Transilluminator canonical product page", url: "https://www.dentalcoreinstruments.com/p/ep-light-transilluminator" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request EP Light IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "M1001",
    slug: "suretact-g3-matrix-kit",
    mpn: "M1001",
    name: "SureTact G3 Matrix Kit",
    price: 200.00,
    originalPrice: 299.00,
    promo: "Buy 2 Kits for $400",
    category: "Restorative",
    description: "Complete sectional matrix kit by Markson Dental: 100 matrices (25 each: 3.5mm, 4.5mm, 5.5mm, 6.5mm), 75 wedges (S/M/L), 2 NiTi ELAMAX rings, forceps, pin tweezers. MirrorCoat & XtraTite bands, Smart-Loop design.",
    longDescription: "SureTact G3 bundles matrices, separating rings, wedges, and forceps so new associates can start Class II cases immediately. NiTi rings use ELAMAX technology for strong separation on composite restorations. ATR (Advance Thermal Resistant) tines resist distortion. MirrorCoat and XtraTite matrix bands ensure smooth finish and tight contacts. Smart-Loop design improves placement ergonomics. Manufactured by Markson Dental Systems. Kit A (M1001) includes 100 matrices (25 each of 3.5mm, 4.5mm, 5.5mm, 6.5mm heights), 75 wedges (25 small, 25 medium, 25 large), 2 universal NiTi rings, 1 ring placement forceps, and 1 pin tweezers.",
    image: img.suretact,
    features: ["100 sectional matrices: 25 each of 3.5mm, 4.5mm, 5.5mm, 6.5mm", "75 wedges: 25 small, 25 medium, 25 large", "2 NiTi universal rings (ELAMAX technology)", "ATR (Advance Thermal Resistant) tines", "MirrorCoat & XtraTite matrix bands", "Smart-Loop design for placement", "Ring placement forceps + pin tweezers included", "Manufactured by Markson Dental Systems"],
    specs: { 
      "Manufacturer": "Markson Dental Systems",
      "Kit": "Kit A (M1001)",
      "Matrices": "100 total (25 each: 3.5mm, 4.5mm, 5.5mm, 6.5mm)",
      "Wedges": "75 total (25 S, 25 M, 25 L)",
      "Rings": "2 NiTi universal (ELAMAX technology)",
      "Tines": "ATR (Advance Thermal Resistant)",
      "Bands": "MirrorCoat & XtraTite",
      "Design": "Smart-Loop",
      "Instruments": "1 forceps, 1 pin tweezers",
      "Ring material": "NiTi" 
    },
    faqs: [
      { question: "What is SureTact G3 Matrix Kit?", answer: "SureTact G3 is a complete sectional matrix system by Markson Dental Systems with 100 matrices (4 sizes), 75 wedges (3 sizes), 2 NiTi ELAMAX rings, forceps, and pin tweezers for Class II posterior composite restorations." },
      { question: "Who should buy SureTact G3 Matrix Kit?", answer: "General practitioners, new associates, and restorative specialists performing Class II posterior composite restorations who need a complete sectional matrix system with multiple sizes and strong NiTi separation rings." },
      { question: "What is included in SureTact G3 Kit A (M1001)?", answer: "Kit A includes 100 matrices (25 each: 3.5mm, 4.5mm, 5.5mm, 6.5mm), 75 wedges (25 S/M/L), 2 NiTi universal rings, 1 ring forceps, and 1 pin tweezers." },
      { question: "How should SureTact G3 components be maintained or sterilized?", answer: "Follow manufacturer IFU for cleaning and sterilization. Matrices and wedges are typically disposable. Rings, forceps, and tweezers should be cleaned and autoclaved per infection control protocols." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix SureTact G3 Matrix Kit canonical product page", url: "https://www.dentalcoreinstruments.com/p/suretact-g3-matrix-kit" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Markson Dental Systems manufacturer site", url: "https://www.marksondental.com/", note: "Manufacturer of SureTact G3 and ModuLite X systems." },
      { label: "Request SureTact G3 IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  },
  {
    id: "M1002",
    slug: "suretact-g3-rings-2pk",
    mpn: "M1002",
    name: "SureTact G3 Rings (2pk)",
    price: 129.98,
    category: "Restorative",
    description: "Replacement NiTi rings with strong spring-back memory. Universal fit for most sectional matrix systems. 2-pack.",
    longDescription: "Replacement NiTi rings for SureTact G3 or compatible sectional matrix bands when rings fatigue after repeated autoclaving.",
    image: img.suretact_r,
    images: [img.suretact_r, img.suretact_r2],
    features: ["2 replacement NiTi rings", "High spring-back memory", "Works with common sectional systems"],
    specs: { "Pack": "2 rings", "Material": "NiTi" },
    faqs: [
      { question: "What are SureTact G3 Rings used for?", answer: "SureTact G3 Rings are replacement NiTi separating rings for sectional matrix systems used during Class II posterior composite restorations to create tight interproximal contacts." },
      { question: "Who should buy SureTact G3 Rings?", answer: "Practices using SureTact G3 or compatible sectional matrix systems who need replacement rings after fatigue from repeated autoclaving or to expand inventory for multiple operatories." },
      { question: "What is included in the SureTact G3 Rings 2-pack?", answer: "The package includes 2 NiTi universal separating rings compatible with SureTact G3 and most sectional matrix band systems." },
      { question: "How should SureTact G3 Rings be maintained or sterilized?", answer: "Clean and autoclave the rings per manufacturer IFU and infection control protocols. NiTi rings can be autoclaved repeatedly but will eventually fatigue and require replacement." },
      { question: "How long does shipping take?", answer: "Coretix typically processes orders in 1-2 business days, and US delivery is usually 3-7 business days after shipment." },
      { question: "What is the warranty?", answer: "Warranty follows manufacturer terms for defects in materials and workmanship. Contact Coretix sales for support." },
      { question: "Can it be returned?", answer: "Returns are evaluated case-by-case. Contact sales before returning merchandise. Opened or sterile items may not be eligible." },
    ],
    sources: [
      { label: "Coretix SureTact G3 Rings canonical product page", url: "https://www.dentalcoreinstruments.com/p/suretact-g3-rings-2pk" },
      { label: "Coretix shipping and returns policy", url: "https://www.dentalcoreinstruments.com/#shipping-returns" },
      { label: "Request SureTact G3 Rings IFU", url: "mailto:sales@dentalcoreinstruments.com" },
    ],
  }
];

/** Maps parent product id + every variant id → hero image (for API duplicate rows with broken CDN URLs). */
export const catalogImageByKey = (() => {
  const m = new Map();
  for (const p of products) {
    m.set(p.id, p.image);
    if (p.variants) {
      for (const v of p.variants) {
        m.set(v.id, v.image);
      }
    }
  }
  return m;
})();

const SKU_IN_TEXT = /SKU:\s*([A-Za-z0-9_.]+)/i;

/**
 * Prefer a working /products/… URL from the local catalog when the row is a Base44 duplicate
 * (same variant id or "SKU: …" in description) but `product.image` is missing or remote-only.
 */
export function getCatalogProductImage(product) {
  const primary = product?.image;
  if (typeof primary === 'string' && primary.includes('/products/')) return primary;

  const keys = [product?.id, product?.sku].filter(Boolean);
  const fromDesc = String(product?.description || '').match(SKU_IN_TEXT);
  if (fromDesc) keys.push(fromDesc[1]);

  for (const k of keys) {
    const hit = catalogImageByKey.get(k);
    if (hit) return hit;
  }
  return primary || '';
}

/** True when a Base44 Product row mirrors a local consolidated variant (OsseoSeal, etc.). */
export function isDuplicateApiCatalogRow(p) {
  const id = String(p?.id || '').trim();
  const sku = String(p?.sku || '').trim();
  const name = String(p?.name || '').toLowerCase();
  const desc = String(p?.description || '').toLowerCase();
  const pack = `${id} ${sku} ${name} ${desc}`.toLowerCase();

  if (/\bsku:\s*os[_\d]/i.test(pack)) return true;
  if (pack.includes('osseoseal') || pack.includes('osseo seal')) return true;
  if (/^os\d{4}$/i.test(id) || /^os\d{4}$/i.test(sku)) return true;
  if (/^os_[\d.]+cc$/i.test(id) || /^os_[\d.]+cc$/i.test(sku)) return true;
  return false;
}