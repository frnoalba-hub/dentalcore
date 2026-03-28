// --- COMPANY CONFIGURATION ---
export const companyInfo = {
  companyName: "Coretix",
  email: "frno.alba@gmail.com",
  address: "", // Hidden for privacy
  phone: "(626) 214-6598",
  logoText: "CORETIX"
};

// --- REAL PRODUCT IMAGES (local /public/products/) ---
const img = {
  uccut:        '/products/UC_CUT_Gutta_Purcha_Cutter_INFO_1006-1.png',
  uccut_tip90:  '/products/UC_CUT_Tip_#90_1006-2.png',
  uccut_tip110: '/products/UC_CUT_Tip_#110_1006-3.png',
  uccut_tips:   '/products/UC_CUT_Gutta_Purcha_Cutter_ALL_Tips.png',
  uccut_bovie:  '/products/UC_CUT_Boive_Tip.png',
  ucone:        '/products/UC_ONE_Ultasonic_Irrigation_1002-1.png',
  cutfit:       '/products/Cut_&_Fit_Gutta_Percha_Cutter_1005-1.jpg',
  ep_plugger:   '/products/EP_PLUGGER_SET_1004-1.jpg',
  ep_suction:   '/products/EP_SUCTION_1003-1.png',
  endoseal:     '/products/ENDOSEAL_MTA-1.png',
  endocem:      '/products/ENDOCE_MTA_ROOT_REPAIR_MTA_3.webp',
  touch_heat:   '/products/UC_CUT_Boive_Tip.png',
  ap_kavo:      '/products/AIRPEAK_A1004-V2.jpg',
  ap_nsk:       '/products/AIRPEAK_A1005.jpg',
  ap_45:        '/products/AIRPEAK_A1018.jpg',
  ap_micro:     '/products/AIRPEAK_A1004-V2.jpg',
  ap_low_la:    '/products/AIRPEAK_A1009B.jpg',
  ap_low_st:    '/products/AIRPEAK_A1012.jpg',
  it_g600s:     '/products/ITESLA_A1003.webp',
  it_g600d:     '/products/ITESLA_A1028.webp',
  it_implant:   '/products/ITESLA_A1020.jpg',
  it_motor:     '/products/ITESLA_U_A1003.webp',
  ep_cure:      '/products/EP_CURE_White_1007-1.png',
  ep_light:     '/products/EP_LIGHT_1001-1_U1.png',
  modulite:     '/products/EP_CURE_White_Black.png',
  osseo_allo:   '/products/OSSEOSEAL_OS_0.5CC.webp',
  osseo_mem:    '/products/OSSEOSEAL_Collagen_Membrane_OS1520.webp',
  osteogen:     '/products/OSTEOGEN_10x20_OSTEO.webp',
  ora_aid:      '/products/ORA_AID_RED_ORA20.webp',
  collagen:     '/products/CURAGEN_COLL_WOUND_DRESSING_HP10.jpg',
  isuni_scan:   '/products/UC_ONE_UNIT_INFO.png',
  isuni_sensor: '/products/UC_ONE_Metal_Endo-Irrigation-Tip_1002-3.jpg',
  isuni_xray:   '/products/UC_ONE_Metal_Tip_1002-5.png',
  mccareX:      '/products/AIRPEAK_A1043.jpg',
  stronic150:   '/products/ENDOSEAL_MTA-1.png',
  stronic300:   '/products/AIRPEAK_A1016.jpg',
  air_polish:   '/products/AIRPEAK_A1017.jpg',
  ipr:          '/products/AIRPEAK_A1043.jpg',
  suretact:     '/products/EP_PLUGGER_SET_CLOSEUP_1004-1.webp',
  suretact_r:   '/products/EP_PLUGGER_SET_1004-1.jpg',
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
    image: img.ucone
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
    image: img.ep_plugger
  },
  {
    id: "1003-1",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction tips for drying canals. Includes 2 adapters + 5 tips.",
    image: img.ep_suction
  },
  {
    id: "MTA-1",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Bioactive bioceramic root canal sealer. High radiopacity.",
    image: img.endoseal
  },
  {
    id: "MTA-3",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "Rapid setting MTA for root repair and apicoectomy.",
    image: img.endocem
  },
  {
    id: "TH-001",
    name: "Stronic Touch & Heat",
    price: 199.50,
    originalPrice: 399.00,
    promo: "Buy 2, Get 1 Free",
    category: "Endodontics",
    description: "Wireless obturation heating pen. Cordless, rechargeable, multiple tips.",
    image: img.touch_heat
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
    id: "A1038",
    name: "iSuni Sensor (Size 1)",
    price: 1599.00,
    originalPrice: 2499.00,
    category: "Equipment",
    description: "Crystal clear CMOS imaging for Pedo/General use. 24-month warranty.",
    image: img.isuni_sensor
  },
  {
    id: "A1024",
    name: "iSuni Sensor (Size 2)",
    price: 1999.00,
    originalPrice: 2999.00,
    category: "Equipment",
    description: "Crystal clear CMOS imaging for Adult Bitewings. 24-month warranty.",
    image: img.isuni_sensor
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
    price: 333.33,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. 400,000 RPM. 27W Power.",
    image: img.ap_kavo
  },
  {
    id: "A1005",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 333.33,
    originalPrice: 599.00,
    promo: "3 Handpieces + 1 Coupler for $1,000",
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. NSK Coupler compatible.",
    image: img.ap_nsk
  },
  {
    id: "A1018",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 459.00,
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
    price: 106.00,
    originalPrice: 159.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "1:1 Contra Angle, Latch Type, Push Button.",
    image: img.ap_low_la
  },
  {
    id: "A1012",
    name: "AirPeak™ G100-ST (Straight)",
    price: 106.00,
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
    image: img.it_motor
  },
  {
    id: "A1003",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 599.33,
    originalPrice: 899.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Electric 1:5 increaser. Titanium body, DLC coating, Quattro Spray.",
    image: img.it_g600s
  },
  {
    id: "A1028",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 399.00,
    originalPrice: 599.00,
    category: "Handpieces",
    description: "Electric 1:1 direct drive. Internal water spray.",
    image: img.it_g600d
  },
  {
    id: "A1020",
    name: "iTesla™ G500-R20 (20:1 Implant)",
    price: 499.00,
    originalPrice: 799.00,
    category: "Handpieces",
    description: "20:1 Reduction for Implantology. External irrigation clip.",
    image: img.it_implant
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
    id: "A1061",
    name: "STRONIC X300 Air Scaler",
    price: 466.00,
    originalPrice: 699.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Fits KaVo coupler. 6000 Hz oscillation for gentle scaling.",
    image: img.stronic300
  },
  {
    id: "A1658",
    name: "AirPeak™ PRO200 Air Polisher",
    price: 446.00,
    originalPrice: 669.00,
    promo: "Buy 2, Get 1 Free",
    category: "Equipment",
    description: "Anti-clogging air polishing system. 360° swivel nozzle.",
    image: img.air_polish
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
    id: "IPR-001",
    name: "AirPeak Automatic IPR",
    price: 199.33,
    originalPrice: 299.00,
    promo: "Buy 2, Get 1 Free",
    category: "Handpieces",
    description: "Ortho interproximal reduction handpiece with reciprocating motion.",
    image: img.ipr
  },

  // =========================================
  // BIOMATERIALS / SURGICAL
  // =========================================
  {
    id: "OS-ALLO",
    name: "OsseoSeal Allograft (0.5cc)",
    price: 68.00,
    category: "Surgical",
    description: "Mineralized Cortical/Cancellous Bone Graft (250-1000um).",
    image: img.osseo_allo
  },
  {
    id: "OS-MEM",
    name: "OsseoSeal Membrane (15x20)",
    price: 70.00,
    category: "Surgical",
    description: "Resorbable Porcine Collagen Membrane.",
    image: img.osseo_mem
  },
  {
    id: "OSTEO-PLUG",
    name: "OsteoGen Plug (Large)",
    price: 549.00,
    category: "Surgical",
    description: "Resorbable Bone Grafting Plug (10/Box).",
    image: img.osteogen
  },
  {
    id: "ORA-20",
    name: "Ora-Aid Wound Dressing",
    price: 90.00,
    category: "Surgical",
    description: "Intraoral protective dressing. 15mm x 25mm (20 Pack).",
    image: img.ora_aid
  },
  {
    id: "HELI-1",
    name: "Collagen Wound Dressing",
    price: 110.00,
    category: "Surgical",
    description: "Resorbable collagen sponge for hemostasis (10/Box).",
    image: img.collagen
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