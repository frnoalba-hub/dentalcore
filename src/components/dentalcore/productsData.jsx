// --- COMPANY CONFIGURATION ---
export const companyInfo = {
  companyName: "Coretix",
  email: "frno.alba@gmail.com",
  address: "", // Hidden for privacy
  phone: "(626) 214-6598",
  logoText: "CORETIX"
};

// --- REAL PRODUCT IMAGES (local /public/products/) ---
const resolveImage = (fileName) => {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  // encodeURIComponent for the filename to handle spaces/symbols gracefully
  return `${prefix}products/${encodeURIComponent(fileName)}`;
};

const img = {
  uccut:        resolveImage('UC_CUT_Gutta_Purcha_Cutter_INFO_1006-1.png'),
  uccut_tip90:  resolveImage('UC_CUT_Tip_#90_1006-2.png'),
  uccut_tip110: resolveImage('UC_CUT_Tip_#110_1006-3.png'),
  uccut_tips:   resolveImage('UC_CUT_Gutta_Purcha_Cutter_ALL_Tips.png'),
  uccut_bovie:  resolveImage('UC_CUT_Boive_Tip.png'),
  ucone:        resolveImage('UC_ONE_Ultasonic_Irrigation_1002-1.png'),
  cutfit:       resolveImage('Cut_&_Fit_Gutta_Percha_Cutter_1005-1.jpg'),
  ep_plugger:   resolveImage('EP_PLUGGER_SET_1004-1.jpg'),
  ep_suction:   resolveImage('EP_SUCTION_1003-1.png'),
  endoseal:     resolveImage('ENDOSEAL_MTA-1.png'),
  endocem:      resolveImage('ENDOCE_MTA_ROOT_REPAIR_MTA_3.webp'),
  
  ap_kavo:      resolveImage('AIRPEAK_A1004-V2.jpg'),
  ap_nsk:       resolveImage('AIRPEAK_A1005.jpg'),
  ap_45:        resolveImage('AIRPEAK_A1018.jpg'),
  ap_micro:     resolveImage('AIRPEAK_A1004-V2.jpg'),
  ap_low_la:    resolveImage('AIRPEAK_A1009B.jpg'),
  ap_low_st:    resolveImage('AIRPEAK_A1012.jpg'),
  
  it_g600s:     resolveImage('ITESLA_A1003.webp'),
  it_g600d:     resolveImage('ITESLA_A1028.webp'),
  it_implant:   resolveImage('ITESLA_A1020.jpg'),
  it_motor:     resolveImage('ITESLA_U_A1003.webp'),
  
  ep_cure:      resolveImage('EP_CURE_White_1007-1.png'),
  ep_light:     resolveImage('EP_CURE_MINI_White_1008-1.png'),
  
  osseo_allo:   resolveImage('OSSEOSEAL_OS_0.5CC.webp'),
  osseo_mem:    resolveImage('OSSEOSEAL_Collagen_Membrane_OS1520.webp'),
  osteogen:     resolveImage('OSTEOGEN_10x20_OSTEO.webp'),
  ora_aid:      resolveImage('ORA_AID_RED_ORA20.webp'),
  collagen:     resolveImage('CURAGEN_COLL_WOUND_DRESSING_HP10.jpg'),

  // Corrected Equipment Mappings from the real files
  ap_prophy_la: resolveImage('AIRPEAK_A1016.jpg'),
  ap_prophy_sc: resolveImage('AIRPEAK_A1017.jpg'),
  ap_prophy_sn: resolveImage('AIRPEAK_A1043.jpg'),

  it_45:        resolveImage('ITESLA_A1002.webp'),
  it_endo:      resolveImage('ITESLA_A1037.jpg'),
  it_st:        resolveImage('ITESLA_A1047.jpg'),

  // Fallback to aesthetic placeholders since we don't have real photos yet
  touch_heat:   'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  stronic_full: 'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  stronic_tip:  'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  modulite:     'https://images.unsplash.com/photo-1583912267670-65755dd82a2d?q=80&w=1000&auto=format&fit=crop',
  // iSuni equipment — using the standard resolveImage after moving files locally
  isuni_scan:   resolveImage('isuni_1.webp'),
  isuni_sensor: resolveImage('isuni_1.webp'),
  isuni_xray:   resolveImage('isuni3.webp'),

  // Equipment placeholders for items we still don't have photos for
  mccareX:      'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  stronic150:   'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  suretact:     'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
  suretact_r:   'https://images.unsplash.com/photo-1516549655169-df83a0833860?q=80&w=1000&auto=format&fit=crop',
};


// --- MASTER PRODUCT CATALOG ---
// Pricing sourced from ApexDent Dealer Price List (Nov 2025)
export const products = [
  // =========================================
  // ENDODONTICS
  // =========================================
  {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: 599.00,
    category: "Endodontics",
    description: "The new standard in Gutta Percha removal. Cordless, Sonic, Precision.",
    image: img.uccut,
    images: [
      resolveImage('UC_CUT_Gutta_Purcha_Cutter_INFO_1006-1.png'),
      resolveImage('UC_Cut_-_Full_Device.jpg'),
      resolveImage('UC_CUT_Gutta_Purcha_Cutter_Unit_1006-1_Close-up.jpg'),
      resolveImage('UC_CUT_Gutta_Purcha_Cutter_Unit_Tip_1006-1.jpg'),
      resolveImage('UC_CUT_Gutta_Purcha_Cutter_ALL_Tips.png'),
      resolveImage('UC_CUT_Stand_1006-9.png')
    ],
    features: ["Cordless Operation", "Instant Heating (180°C)", "Sonic Vibration"],
    inStock: true,
    rating: 5.0
  },
  {
    id: "1002-1",
    name: "UC-ONE (Ultrasonic Irrigation)",
    price: 599.00,
    category: "Endodontics",
    description: "Cordless ultrasonic irrigation for superior canal cleaning.",
    image: img.ucone,
    images: [
      resolveImage('UC_ONE_Ultasonic_Irrigation_1002-1.png'),
      resolveImage('UC_ONE_INFO_2.png'),
      resolveImage('UC_ONE_UNIT_INFO.png'),
      resolveImage('UC_ONE_Charging_INFO.png'),
      resolveImage('UC_ONE_TIPS_INFO.png'),
      resolveImage('UC_ONE_TIP_INFO_1.png'),
      resolveImage('UC_ONE_CONTENTS.png')
    ]
  },
  {
    id: "1005-1",
    name: "GP Cut & Fit (Standard)",
    price: 80.00,
    category: "Endodontics",
    description: "Reliable cordless GP cutter with interchangeable tips.",
    image: img.cutfit
  },
  {
    id: "1004-1",
    name: "EP Plugger Set",
    price: 120.00,
    category: "Endodontics",
    description: "Ergonomic gutta percha plugger kit (FM/M and ML/L).",
    image: img.ep_plugger,
    images: [
      resolveImage('EP_PLUGGER_SET_1004-1.jpg'),
      resolveImage('EP_PLUGGER_SET_CLOSEUP_1004-1.webp')
    ]
  },
  {
    id: "1003-1",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction tips for drying canals. Includes 2 adapters + 5 tips.",
    image: img.ep_suction,
    images: [
      resolveImage('EP_SUCTION_1003-1.png'),
      resolveImage('EP_SUCTION_SETUP-1003-1.jpg')
    ]
  },
  {
    id: "MTA-1",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Bioactive bioceramic root canal sealer. High radiopacity.",
    image: img.endoseal,
    images: [
      resolveImage('ENDOSEAL_MTA-1.png'),
      resolveImage('ENDOSEAL_MTA_SEALER_WHITE_MTA-2.jpg')
    ]
  },
  {
    id: "MTA-3",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "Rapid setting MTA for root repair and apicoectomy.",
    image: img.endocem,
    images: [
      resolveImage('ENDOCE_MTA_ROOT_REPAIR_MTA_3.webp'),
      resolveImage('ENDOCE_MTA_ROOT_REPAIR_MTA_3_(2).webp'),
      resolveImage('Endocempremix_1.webp'),
      resolveImage('Endocempremix_2.webp')
    ]
  },
  {
    id: "TH-001",
    name: "Stronic Touch & Heat",
    price: 199.50,
    originalPrice: 399.00,
    promo: "Buy 2, Get 1 Free",
    category: "Endodontics",
    description: "Cordless sonic GP cutter with instant 180°C heating and vibration-assisted removal. Faster, cleaner obturation with interchangeable tips.",
    image: img.stronic_full,
    images: [img.stronic_full, img.stronic_tip],
  },
  // Accessories
  {
    id: "1006-2",
    name: "UC-CUT Tip #90",
    price: 140.00,
    category: "Accessories",
    description: "Small Metal Posterior Tip for UC-CUT.",
    image: img.uccut_tip90
  },
  {
    id: "1006-3",
    name: "UC-CUT Tip #110",
    price: 140.00,
    category: "Accessories",
    description: "Large Metal Anterior Tip for UC-CUT.",
    image: img.uccut_tip110
  },

  // =========================================
  // IMAGING & DIGITAL EQUIPMENT
  // =========================================
  {
    id: "S1001",
    name: "iSuni Intraoral Scanner",
    price: 5999.00,
    originalPrice: 7599.00,
    promo: "Intro Price — Limited to 500 units",
    category: "Equipment",
    description: "30-second full arch scans. 10μm accuracy. No subscription fees.",
    image: img.isuni_scan,
    specs: { "Accuracy": "10μm", "Depth": "20mm", "AI": "Smart Filtering" }
  },
  {
    id: "ISUNI-SENSORS",
    name: "iSuni Sensor Series (Different Sizes)",
    price: 1599.00,
    originalPrice: 2499.00,
    category: "Equipment",
    description: "Thinnest in the market at 4.4mm. Durable cable endures 100N pull force. 25 lp/mm crystal clear CMOS imaging. Available in multiple sizes for pediatric to adult patients.",
    image: img.isuni_sensor,
    images: [
      resolveImage('isuni_1.webp'),
      resolveImage('isuni3.webp'),
      resolveImage('isuni_4.webp'),
      resolveImage('isuni6.webp'),
      resolveImage('17341645630822_.pic.webp'),
      resolveImage('17351645630822_.pic.webp'),
      resolveImage('17361645630822_.pic.jpg'),
      resolveImage('test_test_2025-06-06_12.35.24.webp'),
      resolveImage('test_test_2025-06-06_12.35.46.webp'),
      resolveImage('test_test_2025-06-06_12.36.27.webp'),
      resolveImage('test_test_2025-06-06_12.36.48.webp')
    ],
    variants: [
      { id: "A1038", name: "Size 0 (Pediatric)", price: 1599.00, originalPrice: 2499.00 },
      { id: "A1023", name: "Size 1 (Universal)", price: 1599.00, originalPrice: 2499.00 },
      { id: "A1024", name: "Size 2 (Adult)", price: 1999.00, originalPrice: 2999.00 }
    ]
  },
  {
    id: "A1022",
    name: "iSuni Portable X-Ray",
    price: 2899.00,
    originalPrice: 3999.00,
    category: "Equipment",
    description: "Lightweight, handheld X-ray generator. Shielded for safety.",
    image: img.isuni_xray
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
    description: "Titanium, Fiber Optic, Quattro Spray. 400,000 RPM. 27W Power.",
    image: img.ap_kavo
  },
  {
    id: "A1005",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 399.00,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. NSK Coupler compatible.",
    image: img.ap_nsk
  },
  {
    id: "A1018",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 569.00,
    originalPrice: 699.00,
    category: "Handpieces",
    description: "45-degree head for surgical access. Rear exhaust to prevent embolism.",
    image: img.ap_45
  },
  {
    id: "A1004-V3",
    name: "AirPeak™ X600-Micro (KaVo)",
    price: 499.00,
    originalPrice: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Ultra-mini head for pediatric and limited opening cases. 380–450k RPM.",
    image: img.ap_micro
  },
  {
    id: "A1009B",
    name: "AirPeak™ G100-LA (Low Speed)",
    price: 129.00,
    originalPrice: 159.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:1 Contra Angle, Latch Type, Push Button.",
    image: img.ap_low_la
  },
  {
    id: "A1012",
    name: "AirPeak™ G100-ST (Straight)",
    price: 129.00,
    originalPrice: 159.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:1 Straight Nose Cone for extraoral adjustments.",
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
    description: "Brushless micromotor with integrated Endo function. 3.0 N.cm torque.",
    image: img.it_motor,
    images: [
      resolveImage('ITESLA_U_A1003.webp'),
      resolveImage('ITESLA_U_A1002.avif')
    ]
  },
  {
    id: "A1003",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 729.00,
    originalPrice: 899.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Electric 1:5 increaser. Titanium body, DLC coating, Quattro Spray.",
    image: img.it_g600s
  },
  {
    id: "A1028",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 479.00,
    originalPrice: 599.00,
    category: "Handpieces",
    description: "Electric 1:1 direct drive. Internal water spray.",
    image: img.it_g600d
  },
  {
    id: "A1020",
    name: "iTesla™ G600-R20:1 (20:1 Implant)",
    price: 599.00,
    originalPrice: 799.00,
    category: "Handpieces",
    description: "20:1 Reduction for Implantology. External irrigation clip.",
    image: img.it_implant
  },
  {
    id: "A1002",
    name: "iTesla™ G450-S/I (45-Degree 1:5)",
    price: 799.00,
    originalPrice: 899.00,
    category: "Handpieces",
    description: "Electric Surgical Handpiece, 45° 1:5, Internal Triple Jet.",
    image: img.it_45
  },
  {
    id: "A1037",
    name: "iTesla™ G500-R6:1 (Endo Motor CA)",
    price: 569.00,
    originalPrice: 599.00,
    category: "Handpieces",
    description: "Contra Angle for E-Type Endo Motor, Latch Type File.",
    image: img.it_endo
  },
  {
    id: "A1047",
    name: "iTesla™ G600-ST (Straight HP)",
    price: 479.00,
    originalPrice: 599.00,
    category: "Handpieces",
    description: "Expert Electric Handpiece, 1:1 Direct, HP, Optic, Single Spray.",
    image: img.it_st
  },

  // =========================================
  // CLINICAL EQUIPMENT
  // =========================================
  {
    id: "A1619",
    name: "STRONIC X150 Piezo Scaler",
    price: 799.00,
    originalPrice: 1199.00,
    category: "Equipment",
    description: "Touch control ultrasonic unit. Endo/Perio/Scaling modes.",
    image: img.stronic150
  },
  {
    id: "A1016",
    name: "AirPeak™ G200-LA (Latch Prophy)",
    price: 159.00,
    originalPrice: 199.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Latch Prophy Cup 4:1. Non-Optic.",
    image: img.ap_prophy_la
  },
  {
    id: "A1017",
    name: "AirPeak™ G200-SC (Screw-on Prophy)",
    price: 159.00,
    originalPrice: 199.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Screw-on Prophy Cup 4:1. Non-Optic.",
    image: img.ap_prophy_sc
  },
  {
    id: "A1030",
    name: "McCare™ X Maintenance",
    price: 1399.00,
    originalPrice: 1999.00,
    category: "Equipment",
    description: "Automated handpiece cleaning and lubrication. 4 Ports.",
    image: img.mccareX
  },
  {
    id: "A1043",
    name: "AirPeak™ G200-SN (Snap-on Prophy)",
    price: 159.00,
    originalPrice: 199.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Snap-on Prophy Cup 4:1. Non-Optic.",
    image: img.ap_prophy_sn
  },

  // =========================================
  // BIOMATERIALS
  // =========================================
  {
    id: "OS_0.5cc",
    name: "OsseoSeal Allograft (0.5cc)",
    price: 68.00,
    category: "Surgical",
    description: "Mineralized Cortical/Cancellous Bone Graft (250-1000um).",
    image: img.osseo_allo,
    images: [
      resolveImage('OSSEOSEAL_OS_0.5CC.webp'),
      resolveImage('OSSEOSEAL_2x0.5CC_OS_1.0CC.webp'),
      resolveImage('OSSEOSEAL_INFO_1.webp'),
      resolveImage('OSSEOSEAL_INFO_2.webp'),
      resolveImage('OSSEOSEAL_INFO_3.webp')
    ]
  },
  {
    id: "OS1520",
    name: "OsseoSeal Membrane (15x20)",
    price: 75.00,
    category: "Surgical",
    description: "Resorbable Porcine Collagen Membrane.",
    image: img.osseo_mem,
    images: [
      resolveImage('OSSEOSEAL_Collagen_Membrane_OS1520.webp'),
      resolveImage('OSSEOSEAL_Collagen_Membrane_U2_OS1520.webp'),
      resolveImage('OSSEOSEAL_Collagen_Membrane_U_OS1520.webp'),
      resolveImage('OSSEOSEAL_Collagen_Membrane_U3_OS1520.avif')
    ]
  },
  {
    id: "OSTEO",
    name: "OsteoGen Plug (Large)",
    price: 549.00,
    category: "Surgical",
    description: "Resorbable Bone Grafting Plug (10/Box).",
    image: img.osteogen,
    images: [
      resolveImage('OSTEOGEN_10x20_OSTEO.webp'),
      resolveImage('OSTEOGEN_PLUG_INFO.webp')
    ]
  },
  {
    id: "ORA20",
    name: "Ora-Aid Wound Dressing",
    price: 90.00,
    category: "Surgical",
    description: "Intraoral protective dressing. 15mm x 25mm (20 Pack).",
    image: img.ora_aid,
    images: [
      resolveImage('ORA_AID_RED_ORA20.webp'),
      resolveImage('ORA_AID_RED_INFO_ORA20.webp'),
      resolveImage('ORA_AID_INFO_1.webp'),
      resolveImage('ORA_AID_INFO_2.webp')
    ]
  },
  {
    id: "HP10",
    name: "Curagen Collagen Wound Dressing",
    price: 110.00,
    category: "Surgical",
    description: "Resorbable collagen sponge for hemostasis (10/Box).",
    image: img.collagen,
    images: [
      resolveImage('CURAGEN_COLL_WOUND_DRESSING_HP10.jpg')
    ]
  },

  // =========================================
  // RESTORATIVE
  // =========================================
  {
    id: "M1042X",
    name: "ModuLite X Curing Light",
    price: 466.00,
    originalPrice: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Restorative",
    description: "Broadband LED (380-520nm) with detection mode. Aerospace aluminum.",
    image: img.modulite
  },
  {
    id: "1007-1",
    name: "EP CURE",
    price: 599.00,
    category: "Restorative",
    description: "High-intensity LED curing light. 1-sec cure capability.",
    image: img.ep_cure
  },
  {
    id: "1008-1",
    name: "EP Light Transilluminator",
    price: 160.00,
    category: "Restorative",
    description: "Diagnostic light for crack detection.",
    image: img.ep_light
  },
  {
    id: "M1001",
    name: "SureTact G3 Matrix Kit",
    price: 200.00,
    originalPrice: 299.00,
    promo: "Buy 2 Kits for $400",
    category: "Restorative",
    description: "Sectional matrix system. 100 matrices, 2 rings, forceps.",
    image: img.suretact
  },
  {
    id: "M1002",
    name: "SureTact G3 Rings (2pk)",
    price: 86.65,
    originalPrice: 129.98,
    promo: "Buy 2, Get 1 Free",
    category: "Restorative",
    description: "Universal NiTi rings with outstanding spring memory.",
    image: img.suretact_r
  }
];