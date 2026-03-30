// --- COMPANY CONFIGURATION ---
export const companyInfo = {
  companyName: "Coretix",
  email: "sales@dentalcoreinstruments.com",
  address: "2108 N St Ste N, Sacramento, CA 95816",
  phone: "(626) 268-3946",
  logoText: "CORETIX"
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

  // Endo
  ucone:        resolveImage('UC_ONE_Ultasonic_Irrigation_1002-1.png'),
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

  // Biomaterials — OsseoSeal
  osseo_syr_03: resolveImage('OSSEOSEAL_OS_0.3CC.jpg'),
  osseo_syr_05: resolveImage('OSSEOSEAL_OS_0.5CC.webp'),
  osseo_syr_10: resolveImage('OSSEOSEAL_2x0.5CC_OS_1.0CC.webp'),
  osseo_pdr_25: resolveImage('OSSEOSEAL_OS_2.5CC.webp'),
  osseo_pdr_50: resolveImage('OSSEOSEAL_OS_5.0CC.webp'),
  osseo_mem:    resolveImage('OSSEOSEAL_Collagen_Membrane_OS1520.webp'),

  // Biomaterials — Other
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
// Apex: Apexdent_price_list_*_dental_core.xlsx — MSRP col 3, Selling col 5 (see generate_catalog.js).
// Rule: No `promo` → `price` = Apex selling only; no `originalPrice` (clean list price).
// With `promo` → `price` = promotional sell; `originalPrice` = Apex MSRP when that SKU exists in the sheet
// (otherwise a single explicit list price you set by hand — never duplicate `price` as fake MSRP).
export const products = [
  // =========================================
  // ENDODONTICS
  // =========================================
  {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless sonic GP cutter with instant 180°C heating and vibration-assisted removal. Faster, cleaner obturation with interchangeable tips.",
    image: img.uccut,
    images: [img.uccut, img.uccut_tips, img.uccut_tip90, img.uccut_tip110, img.uccut_bovie],
    features: ["Cordless Operation", "Instant Heating (180°C)", "Sonic Vibration"],
    inStock: true,
    rating: 5.0
  },
  {
    id: "1002-1",
    name: "UC-ONE (Ultrasonic Irrigation)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless ultrasonic irrigator that activates solution deep into canal anatomy. Eliminates biofilm and debris for predictable endodontic outcomes.",
    image: img.ucone
  },
  {
    id: "1005-1",
    name: "GP Cut & Fit (Standard)",
    price: 80.00,
    category: "Endodontics",
    description: "Affordable cordless GP cutter for everyday obturation. Quick-change tips, lightweight design, and reliable heating every time.",
    image: img.cutfit
  },
  {
    id: "1004-1",
    name: "EP Plugger Set",
    price: 120.00,
    category: "Endodontics",
    description: "Two-piece ergonomic plugger set (FM/M and ML/L) for warm vertical condensation. Comfortable grip, precise tip control.",
    image: img.ep_plugger
  },
  {
    id: "1003-1",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction system for canal drying during endo procedures. Comes with 2 adapters and 5 disposable tips for immediate use.",
    image: img.ep_suction
  },
  {
    id: "MTA-1",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Premixed bioceramic sealer with high radiopacity and bioactive properties. Self-setting, hydrophilic, and ideal for single-cone obturation.",
    image: img.endoseal
  },
  {
    id: "MTA-3",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "Fast-setting MTA cement for root-end fills, perforation repair, and pulp capping. Sets in minutes with excellent sealing ability.",
    image: img.endocem
  },
  {
    id: "TH-001",
    name: "Stronic Touch & Heat",
    price: 399.00,
    promo: "Buy 2, Get 1 Free",
    category: "Endodontics",
    description: "Cordless rechargeable heat pen for warm vertical obturation. Multiple tip sizes included. Lightweight and ready to use out of the box.",
    image: img.stronic_full,
    images: [img.stronic_full, img.stronic_tip],
  },


  // =========================================
  // HANDPIECES: AirPeak (Air Driven)
  // =========================================
  {
    id: "A1004-V2",
    name: "AirPeak™ X600-S (KaVo Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Premium titanium high-speed handpiece with fiber optics and quad-port spray. 400K RPM, 27W output. KaVo MULTIflex compatible.",
    image: img.ap_kavo
  },
  {
    id: "A1005",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Titanium high-speed turbine with fiber optics and quad spray. Same performance as the KaVo model, built for NSK coupler systems.",
    image: img.ap_nsk
  },
  {
    id: "A1018",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 569.00,
    category: "Handpieces",
    description: "Angled 45° surgical handpiece with rear exhaust to prevent air embolism. Designed for third molar access and oral surgery procedures.",
    image: img.ap_45
  },
  {
    id: "A1004-V3",
    name: "AirPeak™ X600-Micro (KaVo)",
    price: 499.00,
    originalPrice: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Ultra-compact head for pediatric patients and limited-opening cases. 380–450K RPM with full fiber optic illumination.",
    image: img.ap_micro
  },
  {
    id: "A1009B",
    name: "AirPeak™ G100-LA (Low Speed)",
    price: 106.00,
    originalPrice: 159.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:1 latch-type contra angle with push-button bur release. Smooth, quiet operation for restorative and prophy work.",
    image: img.ap_low_la
  },
  {
    id: "A1012",
    name: "AirPeak™ G100-ST (Straight)",
    price: 106.00,
    originalPrice: 159.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:1 straight nose cone for lab work, extraoral adjustments, and acrylic trimming. Durable stainless construction.",
    image: img.ap_low_st
  },

  // =========================================
  // HANDPIECES: iTesla (Electric)
  // =========================================
  {
    id: "A1019",
    name: "iTesla Electric Motor System",
    price: 1299.00,
    category: "Equipment",
    description: "Brushless electric motor with built-in endodontic mode and 3.0 N·cm torque control. Pairs with all iTesla attachments for a complete system.",
    image: img.it_motor
  },
  {
    id: "A1003",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 729.00,
    originalPrice: 899.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:5 speed-increasing electric handpiece with DLC-coated titanium body and quad spray. Exceptional cutting power and visibility.",
    image: img.it_g600s
  },
  {
    id: "A1028",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 479.00,
    category: "Handpieces",
    description: "1:1 direct-drive electric contra angle with internal water spray. Versatile workhorse for restorative, prophy, and endo prep.",
    image: img.it_g600d
  },
  {
    id: "A1020",
    name: "iTesla™ G500-R20 (20:1 Implant)",
    price: 599.00,
    category: "Handpieces",
    description: "20:1 reduction implant handpiece with external irrigation clip. Precise torque delivery for implant placement and bone work.",
    image: img.it_implant
  },

  // =========================================
  // CLINICAL EQUIPMENT
  // =========================================
  {
    id: "A1619",
    name: "STRONIC X150 Piezo Scaler",
    price: 799.00,
    category: "Equipment",
    description: "Touchscreen piezo ultrasonic scaler with dedicated Endo, Perio, and Scaling modes. Auto-frequency tuning for consistent tip performance.",
    image: img.x150_1,
    images: [img.x150_1, img.x150_2, img.x150_3],
  },
  {
    id: "A1061",
    name: "STRONIC X300 Air Scaler",
    price: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Air-driven scaler that connects directly to your KaVo coupler. 6,000 Hz oscillation for comfortable, efficient scaling without a separate unit.",
    image: img.x300_1,
    images: [img.x300_1, img.x300_2, img.x300_3],
  },
  {
    id: "A1658",
    name: "AirPeak™ PRO200 Air Polisher",
    price: 669.00,
    promo: "Buy 2, Get 1 Free",
    category: "Equipment",
    description: "Air polishing handpiece with anti-clog design and 360° swivel nozzle. Fast biofilm removal for prophy, perio, and ortho patients.",
    image: img.air_polish
  },
  {
    id: "A1030",
    name: "McCare™ X Maintenance",
    price: 1399.00,
    category: "Equipment",
    description: "Automated 4-port handpiece maintenance station. Cleans, purges, and lubricates in one cycle — extends handpiece life and saves staff time.",
    image: img.mccare_1,
    images: [img.mccare_1, img.mccare_2, img.mccare_3, img.mccare_4],
  },
  {
    id: "IPR-001",
    name: "AirPeak Automatic IPR",
    price: 249.00,
    originalPrice: 299.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Reciprocating IPR handpiece for precise interproximal enamel reduction. Essential for aligner cases and orthodontic finishing.",
    image: img.ipr
  },

  // =========================================
  // BIOMATERIALS
  // =========================================
  {
    id: "OS-SEAL-SYR",
    name: "OsseoSeal Prefilled Syringe",
    price: 48.00,
    category: "Surgical",
    description: "Ready-to-use prefilled syringe of mineralized cortico-cancellous allograft (250–800µm). No mixing, no mess — direct delivery into the defect site.",
    image: img.osseo_syr_03,
    images: [img.osseo_syr_03, img.osseo_syr_05, img.osseo_syr_10],
  },
  {
    id: "OS-SEAL-PDR",
    name: "OsseoSeal Allograft Powder",
    price: 115.00,
    category: "Surgical",
    description: "Mineralized cortico-cancellous allograft in bulk powder form (250–800µm). Cost-effective option for larger grafting cases and sinus lifts.",
    image: img.osseo_pdr_25,
    images: [img.osseo_pdr_25, img.osseo_pdr_50],
  },
  {
    id: "OS-SEAL-MEM",
    name: "OsseoSeal Collagen Membrane",
    price: 75.00,
    category: "Surgical",
    description: "Resorbable porcine collagen membrane for guided bone regeneration. Easy to handle, conforms well to defects, and maintains barrier function during healing.",
    image: img.osseo_mem,
    images: [img.osseo_mem],
  },
  {
    id: "OSTEO-PLUG",
    name: "OsteoGen Plug 10×20mm (Large)",
    price: 549.00,
    category: "Surgical",
    description: "Combined bone graft and collagen plug — no separate membrane needed. Bioactive calcium apatite turns radiopaque in 3–6 months, confirming regeneration. 10/Box.",
    image: img.osteogen
  },

  {
    id: "HELI-1",
    name: "Curagen™ Collagen Wound Dressing Plug",
    price: 110.00,
    category: "Surgical",
    description: "Non-crosslinked collagen plug for extraction sites. Controls bleeding, promotes clot stabilization, and resorbs in ~4 weeks. 10/Box.",
    image: img.collagen
  },

  // =========================================
  // RESTORATIVE
  // =========================================
  {
    id: "M1042X",
    name: "ModuLite X Curing Light",
    price: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Restorative",
    description: "Broadband LED curing light (380–520nm) with built-in resin detection mode. Aerospace-grade aluminum body, lightweight and balanced.",
    image: img.modulite_4,
    images: [img.modulite_4, img.modulite_1, img.modulite_2, img.modulite_3, img.modulite_5, img.modulite_6],
  },
  {
    id: "1007-1",
    name: "EP CURE",
    price: 599.00,
    category: "Restorative",
    description: "High-intensity LED curing light with 1-second cure capability. Reduces chair time without compromising depth of cure.",
    image: img.ep_cure
  },
  {
    id: "1008-1",
    name: "EP Light Transilluminator",
    price: 160.00,
    category: "Restorative",
    description: "Compact diagnostic transilluminator for detecting cracks, fracture lines, and caries. A quick chairside diagnostic tool.",
    image: img.ep_light
  },
  {
    id: "M1001",
    name: "SureTact G3 Matrix Kit",
    price: 200.00,
    originalPrice: 299.00,
    promo: "Buy 2 Kits for $400",
    category: "Restorative",
    description: "Complete sectional matrix kit: 100 assorted matrices, 2 NiTi rings, and ring forceps. Everything you need for tight, anatomical Class II restorations.",
    image: img.suretact
  },
  {
    id: "M1002",
    name: "SureTact G3 Rings (2pk)",
    price: 129.98,
    promo: "Buy 2, Get 1 Free",
    category: "Restorative",
    description: "Replacement NiTi rings with strong spring-back memory. Universal fit for most sectional matrix systems. 2-pack.",
    image: img.suretact_r,
    images: [img.suretact_r, img.suretact_r2],
  }
];