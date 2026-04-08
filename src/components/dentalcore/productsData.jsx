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
    slug: "uc-cut",
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
      { question: "Who should buy UC-CUT?", answer: "Practices performing warm vertical condensation, GP removal, or chairside procedures that benefit from cordless heat plus vibration—especially teams that want to avoid large electrosurgery units." },
    ],
    inStock: true,
    rating: 5.0
  },
  {
    id: "1002-1",
    slug: "uc-one",
    name: "UC-ONE (Ultrasonic Irrigation)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless ultrasonic irrigator that activates irrigant deep into canal anatomy. Supports cleaning and debris removal when used with your clinical irrigant protocol.",
    longDescription: "UC-ONE is built for clinicians who want a cordless, handheld way to ultrasonically activate sodium hypochlorite, EDTA, or other approved irrigants inside the root canal system. Ultrasonic energy improves fluid streaming and can help dislodge debris and biofilm in complex anatomy when combined with adequate irrigation volume and needle delivery. Use only irrigants and settings consistent with manufacturer directions and your training.",
    image: img.ucone,
    images: [img.ucone],
    features: [
      "Cordless design for easy access to all quadrants",
      "Ultrasonic activation of canal irrigants (per clinical protocol)",
      "Helps disrupt debris and biofilm when paired with adequate irrigation",
      "Suitable for anterior and posterior cases with proper technique",
      "Rechargeable operation for repeat use through the day",
      "Streamlined body for chairside handling alongside your file sequence",
    ],
    specs: {
      "Intended use": "Ultrasonic irrigation / irrigant activation in root canals",
      "Power": "Cordless rechargeable (charge per IFU)",
      "Compatibility": "Standard endodontic access; use with approved irrigants only",
      "Training": "Operator should follow CE guidelines for ultrasonic endodontic irrigation",
    },
    faqs: [
      { question: "What does UC-ONE do during root canal treatment?", answer: "UC-ONE ultrasonically activates irrigants inside the canal to improve cleaning and debris removal when used as part of a complete irrigation protocol with sufficient volume and proper needle placement." },
      { question: "Is UC-ONE a replacement for needle irrigation?", answer: "No. Needle irrigation and canal preparation remain essential. UC-ONE adds activation after—or alongside—conventional delivery, per accepted endodontic technique." },
      { question: "Which irrigants can I use with UC-ONE?", answer: "Use only irrigants approved for intracanal use and compatible with the device per the manufacturer IFU—commonly sodium hypochlorite and EDTA in clinical practice when indicated." },
    ],
  },
  {
    id: "1005-1",
    slug: "gp-cut-fit",
    name: "GP Cut & Fit (Standard)",
    price: 80.00,
    category: "Endodontics",
    description: "Affordable cordless GP cutter for everyday obturation. Quick-change tips, lightweight design, and reliable heating every time.",
    longDescription: "GP Cut & Fit delivers a budget-friendly path to warm GP trimming for general practices. Quick-change tips and a compact body make it easy to stage for single-visit and multi-visit endo. Pair with your preferred obturation technique and follow manufacturer guidance for tip sterilization.",
    image: img.cutfit,
    features: ["Cordless GP trimming for daily endo", "Quick-change tip system", "Lightweight handpiece", "Consistent heating for routine cases", "Value-priced for multi-op setups"],
    specs: { "Category": "Cordless gutta-percha cutter", "Use": "Obturation / GP adjustment", "Maintenance": "Per manufacturer IFU" },
  },
  {
    id: "1004-1",
    slug: "ep-plugger-set",
    name: "EP Plugger Set",
    price: 120.00,
    category: "Endodontics",
    description: "Two-piece ergonomic plugger set (FM/M and ML/L) for warm vertical condensation. Comfortable grip, precise tip control.",
    longDescription: "Warm vertical condensation demands plugger tips that feel balanced in the hand. This two-piece set covers fine-to-medium and medium-to-large canal sizes so you can adapt pluggers to anatomy without juggling mismatched handles.",
    image: img.ep_plugger,
    features: ["Two-piece set: FM/M and ML/L profiles", "Ergonomic grips for sustained condensation", "Stainless-style durability for repeat sterilization", "Pairs with warm vertical and hybrid techniques"],
    specs: { "Set contents": "2 pluggers (size ranges per packaging)", "Sterilization": "Autoclavable per IFU", "Technique": "Warm vertical condensation" },
  },
  {
    id: "1003-1",
    slug: "ep-suction-system",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction system for canal drying during endo procedures. Comes with 2 adapters and 5 disposable tips for immediate use.",
    longDescription: "Dry canals before sealer placement or between irrigant changes. The micro-suction tip helps remove residual irrigant without over-drying dentin when used with controlled vacuum.",
    image: img.ep_suction,
    features: ["Canal drying before obturation", "Includes adapters + 5 disposable tips", "Compact for chairside setup", "Reduces paper-point cycles in many cases"],
    specs: { "Kit": "2 adapters, 5 disposable tips", "Use": "Endodontic micro-suction / drying" },
  },
  {
    id: "MTA-1",
    slug: "endoseal-mta-sealer",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Premixed bioceramic sealer with high radiopacity and bioactive properties. Self-setting, hydrophilic, and ideal for single-cone obturation.",
    longDescription: "Endoseal MTA is a ready-to-use bioceramic sealer formulated for hydraulic setting in moist environments. High radiopacity aids post-op verification. Commonly selected for single-cone and carrier-based techniques when the clinician wants a hydrophilic sealer line.",
    image: img.endoseal,
    features: ["Premixed bioceramic sealer", "High radiopacity on radiographs", "Hydrophilic working properties", "Suitable for single-cone workflows", "Bioactive ceramic chemistry (per manufacturer claims)"],
    specs: { "Material": "Bioceramic / MTA-class sealer", "Handling": "Premixed syringe or delivery per IFU", "Setting": "Moisture-dependent hydraulic set" },
  },
  {
    id: "MTA-3",
    slug: "endocem-mta-root-repair",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "Fast-setting MTA cement for root-end fills, perforation repair, and pulp capping. Sets in minutes with excellent sealing ability.",
    longDescription: "Endocem MTA addresses scenarios where you need a fast-setting MTA-type cement for repair and vital pulp therapy applications. Use for root-end retrofills, strip perforations, and selective pulp capping when your diagnosis supports MTA therapy.",
    image: img.endocem,
    features: ["Fast-setting MTA repair cement", "Root-end and perforation repair", "Pulp capping applications per diagnosis", "Good sealing characteristics when placed correctly"],
    specs: { "Type": "MTA root repair / pulp capping cement", "Working time": "Per manufacturer IFU", "Storage": "Per label directions" },
  },
  {
    id: "TH-001",
    slug: "stronic-touch-heat",
    name: "Stronic Touch & Heat",
    price: 399.00,
    category: "Endodontics",
    description: "Cordless rechargeable heat pen for warm vertical obturation. Multiple tip sizes included. Lightweight and ready to use out of the box.",
    longDescription: "Stronic Touch & Heat gives you a cordless heat source for downpack and backfill steps without tethering to a wall unit. Multiple tips ship in-box so you can match canal taper on day one.",
    image: img.stronic_full,
    images: [img.stronic_full, img.stronic_tip],
    features: ["Cordless rechargeable heat pen", "Multiple tip sizes included", "Warm vertical and hybrid obturation support", "Lightweight for posterior access"],
    specs: { "Power": "Rechargeable battery", "Tips": "Multiple profiles included", "Use": "Warm GP condensation" },
  },


  // =========================================
  // HANDPIECES: AirPeak (Air Driven)
  // =========================================
  {
    id: "A1004-V2",
    slug: "airpeak-x600-s-kavo",
    name: "AirPeak™ X600-S (KaVo Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Premium titanium high-speed handpiece with fiber optics and quad-port spray. 400K RPM, 27W output. KaVo MULTIflex compatible.",
    longDescription: "AirPeak X600-S pairs a titanium body with fiber optic illumination and quad-port coolant for high-demand prep and finish work. KaVo MULTIflex–style coupling lets you drop it into existing KaVo tubing setups. Bundle with other AirPeak promos for practice-wide standardization.",
    image: img.ap_kavo,
    features: ["Titanium body", "Fiber optic illumination", "Quad-port spray", "~400K RPM class turbine", "KaVo MULTIflex compatible coupling"],
    specs: { "Coupling": "KaVo MULTIflex style", "Head": "Standard high-speed", "Coolant": "Quad port", "Illumination": "Fiber optic" },
  },
  {
    id: "A1005",
    slug: "airpeak-x600-m-nsk",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Titanium high-speed turbine with fiber optics and quad spray. Same performance as the KaVo model, built for NSK coupler systems.",
    longDescription: "Match your NSK swivel couplers without sacrificing the AirPeak cutting feel. Same turbine philosophy as the KaVo variant—titanium shell, optics, and generous coolant for long cases.",
    image: img.ap_nsk,
    features: ["NSK-compatible coupling", "Titanium construction", "Fiber optics + quad spray", "High-speed restorative and surgical prep"],
    specs: { "Coupling": "NSK style", "Illumination": "Fiber optic", "Coolant": "Quad port" },
  },
  {
    id: "A1018",
    slug: "airpeak-x600-45-surgical",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 569.00,
    category: "Handpieces",
    description: "Angled 45° surgical handpiece with rear exhaust to prevent air embolism. Designed for third molar access and oral surgery procedures.",
    longDescription: "The 45° head improves line-of-sight on third molars and posterior surgical sites. Rear exhaust routing is intended to direct air away from the surgical site per common surgical handpiece design practice.",
    image: img.ap_45,
    features: ["45° surgical head", "Rear exhaust routing", "High-speed cutting for surgical access", "Fiber-assisted visibility"],
    specs: { "Angle": "45°", "Exhaust": "Rear", "Use": "Oral surgery / third molar" },
  },
  {
    id: "A1004-V3",
    slug: "airpeak-x600-micro-kavo",
    name: "AirPeak™ X600-Micro (KaVo)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Ultra-compact head for pediatric patients and limited-opening cases. 380–450K RPM with full fiber optic illumination.",
    longDescription: "When opening is tight or patients are small, the micro head reduces interference with adjacent teeth while preserving fiber optic sight lines. Ideal for pedo, second molars, and deep Class II access.",
    image: img.ap_micro,
    features: ["Ultra-compact head", "Pediatric / limited-opening friendly", "Fiber optic", "KaVo MULTIflex style"],
    specs: { "Head size": "Micro / short-head class", "Coupling": "KaVo MULTIflex style", "RPM": "Manufacturer-rated ~380–450K class" },
  },
  {
    id: "A1009B",
    slug: "airpeak-g100-la",
    name: "AirPeak™ G100-LA (Low Speed)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 latch-type contra angle with push-button bur release. Smooth, quiet operation for restorative and prophy work.",
    longDescription: "Latch-type contra angle for finishing, polishing, and operative steps that need a quiet 1:1 drive. Push-button chuck speeds bur changes chairside.",
    image: img.ap_low_la,
    features: ["1:1 latch contra angle", "Push-button bur release", "Smooth low-speed operation"],
    specs: { "Ratio": "1:1", "Type": "Latch contra angle" },
  },
  {
    id: "A1012",
    slug: "airpeak-g100-st",
    name: "AirPeak™ G100-ST (Straight)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 straight nose cone for lab work, extraoral adjustments, and acrylic trimming. Durable stainless construction.",
    longDescription: "Straight attachment for lab adjustments, denture contouring, and extraoral trimming when paired with your low-speed motor.",
    image: img.ap_low_st,
    features: ["1:1 straight nose cone", "Durable stainless construction", "Lab and chairside trimming"],
    specs: { "Ratio": "1:1", "Type": "Straight handpiece" },
  },

  // =========================================
  // HANDPIECES: iTesla (Electric)
  // =========================================
  {
    id: "A1019",
    slug: "itesla-electric-motor",
    name: "iTesla Electric Motor System",
    price: 1299.00,
    category: "Equipment",
    description: "Brushless electric motor with built-in endodontic mode and 3.0 N·cm torque control. Pairs with all iTesla attachments for a complete system.",
    longDescription: "The iTesla motor is the hub for a full electric workflow: restorative, endodontic, and implant attachments share one brushless drive with precise torque reporting. Endo mode tailors speed/torque curves for rotary and reciprocating files per your protocol.",
    image: img.it_motor,
    features: ["Brushless electric motor", "Endodontic mode", "Torque display / control (~3.0 N·cm class)", "Accepts iTesla attachment family"],
    specs: { "Drive": "Electric brushless", "Modes": "Restorative + endodontic", "Torque": "~3.0 N·cm class (per manufacturer)" },
  },
  {
    id: "A1003",
    slug: "itesla-g600-s",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 729.00,
    category: "Handpieces",
    description: "1:5 speed-increasing electric handpiece with DLC-coated titanium body and quad spray. Exceptional cutting power and visibility.",
    longDescription: "Red-band 1:5 increasing attachment for high-speed prep under electric motor control. DLC-coated titanium and internal coolant help maintain visibility on crown preps and multi-surface cases.",
    image: img.it_g600s,
    features: ["1:5 increasing", "DLC-coated titanium body", "Quad internal spray", "Electric motor attachment"],
    specs: { "Ratio": "1:5 increasing", "Band": "Red", "Coolant": "Internal spray" },
  },
  {
    id: "A1028",
    slug: "itesla-g600-d",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 479.00,
    category: "Handpieces",
    description: "1:1 direct-drive electric contra angle with internal water spray. Versatile workhorse for restorative, prophy, and endo prep.",
    longDescription: "Blue-band 1:1 is the generalist attachment: finishing, polishing, and selective prep tasks at motor-controlled RPM with steady torque feel.",
    image: img.it_g600d,
    features: ["1:1 direct drive", "Internal water spray", "Finishing and operative versatility"],
    specs: { "Ratio": "1:1", "Band": "Blue", "Coolant": "Internal" },
  },
  {
    id: "A1020",
    slug: "itesla-g500-r20-implant",
    name: "iTesla™ G500-R20 (20:1 Implant)",
    price: 599.00,
    category: "Handpieces",
    description: "20:1 reduction implant handpiece with external irrigation clip. Precise torque delivery for implant placement and bone work.",
    longDescription: "20:1 reduction geometry slows motor output for osteotomy and implant insertion sequences. External irrigation clip keeps the field cool when using surgical-length burs and drivers.",
    image: img.it_implant,
    features: ["20:1 reduction for surgery", "External irrigation clip", "Implant motor attachment"],
    specs: { "Ratio": "20:1 reduction", "Irrigation": "External clip", "Use": "Implant / bone drilling" },
  },

  // =========================================
  // CLINICAL EQUIPMENT
  // =========================================
  {
    id: "A1619",
    slug: "stronic-x150-piezo-scaler",
    name: "STRONIC X150 Piezo Scaler",
    price: 799.00,
    category: "Equipment",
    description: "Touchscreen piezo ultrasonic scaler with dedicated Endo, Perio, and Scaling modes. Auto-frequency tuning for consistent tip performance.",
    longDescription: "STRONIC X150 packages piezo scaling, perio therapy, and endodontic ultrasonic functions in one touchscreen-driven unit. Auto-frequency tuning adapts to tip load so you spend less time adjusting power between patients.",
    image: img.x150_1,
    images: [img.x150_1, img.x150_2, img.x150_3],
    features: ["Touchscreen UI", "Scaling, perio, and endo modes", "Piezo ultrasonic stack", "Auto-frequency tuning"],
    specs: { "Technology": "Piezo ultrasonic", "Modes": "Scaling / Perio / Endo", "Control": "Touchscreen" },
  },
  {
    id: "A1061",
    slug: "stronic-x300-air-scaler",
    name: "STRONIC X300 Air Scaler",
    price: 699.00,
    category: "Handpieces",
    description: "Air-driven scaler that connects directly to your KaVo coupler. 6,000 Hz oscillation for comfortable, efficient scaling without a separate unit.",
    longDescription: "Use your existing KaVo MULTIflex air supply to drive ultrasonic scaling without investing in a separate scaler console—ideal for hygiene op overflow or mobile setups.",
    image: img.x300_1,
    images: [img.x300_1, img.x300_2, img.x300_3],
    features: ["KaVo coupler connection", "Air-driven scaler", "High-frequency oscillation", "No separate scaler base required"],
    specs: { "Drive": "Air turbine to scaler insert", "Coupling": "KaVo style", "Frequency": "~6 kHz class (per manufacturer)" },
  },
  {
    id: "A1658",
    slug: "airpeak-pro200-air-polisher",
    name: "AirPeak™ PRO200 Air Polisher",
    price: 669.00,
    category: "Equipment",
    description: "Air polishing handpiece with anti-clog design and 360° swivel nozzle. Fast biofilm removal for prophy, perio, and ortho patients.",
    longDescription: "PRO200 targets stain and biofilm with a swivel nozzle that tracks lingual and facial surfaces comfortably. Anti-clog architecture reduces downtime with glycine or prophy powders per your powder compatibility chart.",
    image: img.air_polish,
    features: ["360° swivel nozzle", "Anti-clog powder path", "Air polishing for prophy/perio", "Orthodontic debond cleanup support"],
    specs: { "Type": "Air polisher handpiece", "Nozzle": "360° swivel", "Powder": "Per manufacturer compatibility" },
  },
  {
    id: "A1030",
    slug: "mccare-x-maintenance",
    name: "McCare™ X Maintenance",
    price: 1399.00,
    category: "Equipment",
    description: "Automated 4-port handpiece maintenance station. Cleans, purges, and lubricates in one cycle — extends handpiece life and saves staff time.",
    longDescription: "McCare X runs a repeatable clean-lube-purge cycle across four handpieces so your turbines and attachments see consistent maintenance intervals—often extending service life versus ad-hoc manual drops.",
    image: img.mccare_1,
    images: [img.mccare_1, img.mccare_2, img.mccare_3, img.mccare_4],
    features: ["4 simultaneous ports", "Automated purge + lubrication", "Reduces manual maintenance variance", "Supports busy multi-hygienist practices"],
    specs: { "Ports": "4", "Function": "Clean / purge / lubricate", "Use": "High & low speed maintenance" },
  },
  {
    id: "IPR-001",
    slug: "airpeak-automatic-ipr",
    name: "AirPeak Automatic IPR",
    price: 249.00,
    category: "Handpieces",
    description: "Reciprocating IPR handpiece for precise interproximal enamel reduction. Essential for aligner cases and orthodontic finishing.",
    longDescription: "Dedicated IPR handpiece with reciprocating motion for controlled enamel reduction during clear aligner staging and finishing. Pair with your preferred IPR strips or discs per clinical protocol.",
    image: img.ipr,
    features: ["Reciprocating IPR motion", "Aligner case support", "Finishing enamel reduction"],
    specs: { "Motion": "Reciprocating", "Clinical use": "Interproximal reduction" },
  },

  // =========================================
  // BIOMATERIALS
  // =========================================
  {
    id: "OS-SEAL-SYR",
    slug: "osseoseal-prefilled-syringe",
    name: "OsseoSeal Prefilled Syringe",
    price: 48.00,
    category: "Surgical",
    description: "Ready-to-use prefilled syringe of mineralized cortico-cancellous allograft (250–800µm). No mixing, no mess — direct delivery into the defect site.",
    longDescription: "OsseoSeal syringes deliver mineralized cortico-cancellous particulate in consistent volumes for sockets, lateral windows, and localized defects. Choose 0.3cc, 0.5cc, or 1.0cc (2×0.5cc) volumes to match defect size and reduce waste.",
    image: img.osseo_syr_03,
    images: [img.osseo_syr_03, img.osseo_syr_05, img.osseo_syr_10],
    features: ["Mineralized cortico-cancellous allograft", "250–800µm particle range", "Prefilled syringe delivery", "Multiple volumes on one product card"],
    specs: { "Graft type": "Mineralized cortico-cancellous allograft", "Particle size": "250–800µm", "Sterility": "Per manufacturer / tissue bank documentation" },
    faqs: [
      { question: "What particle size is OsseoSeal syringe graft?", answer: "OsseoSeal mineralized cortico-cancellous allograft is provided in a 250–800µm particle range for predictable handling and placement." },
      { question: "Which volume should I order?", answer: "Choose 0.3cc for small sockets, 0.5cc for typical single-tooth defects, and 1.0cc (2×0.5cc) when you need more volume without opening a second syringe." },
      { question: "Do I still need a membrane?", answer: "Many ridge-preservation and GBR protocols use a collagen membrane over the graft. Follow your surgical plan and the membrane IFU when a barrier is indicated." },
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
    name: "OsseoSeal Allograft Powder",
    price: 115.00,
    category: "Surgical",
    description: "Mineralized cortico-cancellous allograft in bulk powder form (250–800µm). Cost-effective option for larger grafting cases and sinus lifts.",
    longDescription: "Bulk jar presentation for larger ridge augmentations, sinus floor grafts, and cases where you want to mix with blood, PRF, or other carriers per your protocol. Same particle band as syringe forms for blending inventories.",
    image: img.osseo_pdr_25,
    images: [img.osseo_pdr_25, img.osseo_pdr_50],
    features: ["Bulk powder presentation", "250–800µm mineralized allograft", "Economical for large defects", "Compatible with membrane coverage protocols"],
    specs: { "Form": "Powder jar", "Volumes": "2.5cc / 5cc options", "Particle size": "250–800µm" },
    variants: [
      { id: "OS_2.5cc", name: "2.5cc",           price: 115.00, image: img.osseo_pdr_25 },
      { id: "OS_5.0cc", name: "5cc (2×2.5cc)",   price: 200.00, image: img.osseo_pdr_50 },
    ]
  },
  {
    id: "OS-SEAL-MEM",
    slug: "osseoseal-collagen-membrane",
    name: "OsseoSeal Collagen Membrane",
    price: 75.00,
    category: "Surgical",
    description: "Resorbable porcine collagen membrane for guided bone regeneration. Easy to handle, conforms well to defects, and maintains barrier function during healing.",
    longDescription: "Porcine collagen barrier for GBR and extraction-site ridge preservation when used with graft particulate. Multiple sizes cover single-tooth defects through multi-tooth spans; resorption profile follows manufacturer specifications.",
    image: img.osseo_mem,
    images: [img.osseo_mem],
    features: ["Resorbable collagen membrane", "GBR and ridge preservation applications", "Conforms to defect anatomy", "Several sizes for surgical flexibility"],
    specs: { "Material": "Porcine collagen", "Sizes": "15×20mm, 20×30mm, 30×40mm", "Resorption": "Per IFU" },
    variants: [
      { id: "OS1520", name: "15×20 mm", price: 75.00,  image: img.osseo_mem },
      { id: "OS2030", name: "20×30 mm", price: 110.00, image: img.osseo_mem },
      { id: "OS3040", name: "30×40 mm", price: 150.00, image: img.osseo_mem },
    ]
  },
  {
    id: "OSTEO-PLUG",
    slug: "osteogen-plug-10x20",
    name: "OsteoGen Plug 10×20mm (Large)",
    price: 549.00,
    category: "Surgical",
    description: "Combined bone graft and collagen plug — no separate membrane needed. Bioactive calcium apatite turns radiopaque in 3–6 months, confirming regeneration. 10/Box.",
    longDescription: "OsteoGen Plug combines a collagen matrix with bioactive calcium apatite crystals for socket grafting without a separate membrane in appropriate cases. Radiopacity develops over months as remodeling progresses—follow the manufacturer surgical protocol.",
    image: img.osteogen,
    features: ["Combined graft + collagen plug", "Bioactive calcium apatite component", "Radiopacity develops over 3–6 months", "10 plugs per box"],
    specs: { "Size": "10×20mm large", "Packaging": "10 / box", "Use": "Extraction site / localized grafting" },
  },

  {
    id: "HELI-1",
    slug: "curagen-collagen-plug",
    name: "Curagen™ Collagen Wound Dressing Plug",
    price: 110.00,
    category: "Surgical",
    description: "Non-crosslinked collagen plug for extraction sites. Controls bleeding, promotes clot stabilization, and resorbs in ~4 weeks. 10/Box.",
    longDescription: "Curagen plugs provide a resorbable collagen matrix to stabilize clots in fresh extraction sockets and mucosal wounds. Typical resorption near four weeks—plan graft or restorative timing accordingly.",
    image: img.collagen,
    features: ["Non-crosslinked collagen", "Hemostasis / clot support", "Resorbs in ~4 weeks", "10 plugs per box"],
    specs: { "Material": "Collagen plug", "Resorption": "~4 weeks (typical)", "Quantity": "10 / box" },
  },

  // =========================================
  // RESTORATIVE
  // =========================================
  {
    id: "M1042X",
    slug: "modulite-x-curing-light",
    name: "ModuLite X Curing Light",
    price: 699.00,
    category: "Restorative",
    description: "Broadband LED curing light (380–520nm) with built-in resin detection mode. Aerospace-grade aluminum body, lightweight and balanced.",
    longDescription: "ModuLite X covers violet through blue emission bands to accommodate newer photoinitiator systems while still curing conventional composites. Resin-detection mode helps locate residual composite flash before finishing.",
    image: img.modulite_4,
    images: [img.modulite_4, img.modulite_1, img.modulite_2, img.modulite_3, img.modulite_5, img.modulite_6],
    features: ["380–520nm broadband LED", "Resin detection assist mode", "Aerospace-grade aluminum housing", "Balanced ergonomics"],
    specs: { "Wavelength": "380–520nm", "Body": "Aluminum", "Modes": "Cure + resin detection" },
  },
  {
    id: "1007-1",
    slug: "ep-cure-led",
    name: "EP CURE",
    price: 599.00,
    category: "Restorative",
    description: "High-intensity LED curing light with 1-second cure capability. Reduces chair time without compromising depth of cure.",
    longDescription: "EP CURE targets high-output curing for bulk-fill and posteriors where short cure cycles matter. Always verify manufacturer cure times for your specific composite shade and increment thickness.",
    image: img.ep_cure,
    features: ["High-intensity LED", "Fast (≈1s) cure cycles on compatible resins", "Reduces per-tooth curing time", "Suitable for routine restorative ops"],
    specs: { "Type": "LED curing light", "Cure time": "Material-dependent (fast mode)" },
  },
  {
    id: "1008-1",
    slug: "ep-light-transilluminator",
    name: "EP Light Transilluminator",
    price: 160.00,
    category: "Restorative",
    description: "Compact diagnostic transilluminator for detecting cracks, fracture lines, and caries. A quick chairside diagnostic tool.",
    longDescription: "Handheld transillumination for vertical fracture detection, approximal caries screening, and crack propagation checks before committing to prep design.",
    image: img.ep_light,
    features: ["Compact diagnostic light", "Crack and caries screening", "Chairside ergonomics"],
    specs: { "Use": "Transillumination diagnostics", "Power": "LED handheld" },
  },
  {
    id: "M1001",
    slug: "suretact-g3-matrix-kit",
    name: "SureTact G3 Matrix Kit",
    price: 200.00,
    originalPrice: 299.00,
    promo: "Buy 2 Kits for $400",
    category: "Restorative",
    description: "Complete sectional matrix kit: 100 assorted matrices, 2 NiTi rings, and ring forceps. Everything you need for tight, anatomical Class II restorations.",
    longDescription: "SureTact G3 bundles matrices, separating rings, and forceps so new associates can start Class II cases immediately. NiTi rings deliver strong separation for tight contacts on composite restorations.",
    image: img.suretact,
    features: ["100 assorted sectional matrices", "2 NiTi separating rings", "Ring placement forceps included", "Class II posterior workflow"],
    specs: { "Kit contents": "Matrices + 2 rings + forceps", "Ring material": "NiTi" },
  },
  {
    id: "M1002",
    slug: "suretact-g3-rings-2pk",
    name: "SureTact G3 Rings (2pk)",
    price: 129.98,
    category: "Restorative",
    description: "Replacement NiTi rings with strong spring-back memory. Universal fit for most sectional matrix systems. 2-pack.",
    longDescription: "Replacement NiTi rings for SureTact G3 or compatible sectional matrix bands when rings fatigue after repeated autoclaving.",
    image: img.suretact_r,
    images: [img.suretact_r, img.suretact_r2],
    features: ["2 replacement NiTi rings", "High spring-back memory", "Works with common sectional systems"],
    specs: { "Pack": "2 rings", "Material": "NiTi" },
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