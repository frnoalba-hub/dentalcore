// --- COMPANY CONFIGURATION ---
export const companyInfo = {
  companyName: "Dental Core Instruments LLC",
  email: "frno.alba@gmail.com",
  address: "", // Hidden for privacy
  phone: "(626) 214-6598",
  logoText: "DENTALCORE"
};

// --- MASTER PRODUCT CATALOG (Apexdent & Flyers Only) ---
export const products = [
  // =========================================
  // ENDODONTICS (System UC & Accessories)
  // =========================================
  {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: 599.00,
    category: "Endodontics",
    description: "The new standard in Gutta Percha removal. Cordless, Sonic, Precision.",
    image: "/images/uc-cut-hero.jpg",
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
    image: "/images/uc-one.jpg"
  },
  {
    id: "1005-1",
    name: "GP Cut & Fit (Standard)",
    price: 80.00,
    category: "Endodontics",
    description: "Reliable cordless GP cutter with interchangeable tips.",
  },
  {
    id: "1004-1",
    name: "EP Plugger Set",
    price: 120.00,
    category: "Endodontics",
    description: "Ergonomic gutta percha plugger kit (FM/M and ML/L).",
  },
  {
    id: "1003-1",
    name: "EP Suction System",
    price: 60.00,
    category: "Endodontics",
    description: "Micro-suction tips for drying canals. Includes 2 adapters + 5 tips.",
  },
  {
    id: "MTA-1",
    name: "Endoseal MTA Sealer",
    price: 90.00,
    category: "Endodontics",
    description: "Bioactive bioceramic root canal sealer. High radiopacity.",
  },
  {
    id: "MTA-3",
    name: "Endocem MTA Root Repair",
    price: 90.00,
    category: "Endodontics",
    description: "Rapid setting MTA for root repair and apicoectomy.",
  },

  // =========================================
  // IMAGING & DIGITAL EQUIPMENT
  // =========================================
  {
    id: "S1001",
    name: "iSuni Intraoral Scanner",
    price: 5999.00,
    originalPrice: 7599.00,
    category: "Equipment",
    description: "30-second full arch scans. 10μm accuracy. No subscription fees.",
    image: "/images/isuni-scanner.jpg",
    specs: { "Accuracy": "10μm", "Depth": "20mm", "AI": "Smart Filtering" }
  },
  {
    id: "A1038",
    name: "iSuni Sensor (Size 1)",
    price: 1599.00,
    category: "Equipment",
    description: "Crystal clear CMOS imaging for Pedo/General use.",
  },
  {
    id: "A1024",
    name: "iSuni Sensor (Size 2)",
    price: 1999.00,
    category: "Equipment",
    description: "Crystal clear CMOS imaging for Adult Bitewings.",
  },
  {
    id: "A1022",
    name: "iSuni Portable X-Ray",
    price: 2899.00,
    category: "Equipment",
    description: "Lightweight, handheld X-ray generator. Shielded for safety.",
  },

  // =========================================
  // HANDPIECES: AirPeak (Air Driven)
  // =========================================
  {
    id: "A1004-V2",
    name: "AirPeak™ X600-S (KaVo Style)",
    price: 399.00,
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. 400,000 RPM.",
  },
  {
    id: "A1005",
    name: "AirPeak™ X600-M (NSK Style)",
    price: 399.00,
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. NSK Coupler compatible.",
  },
  {
    id: "A1018",
    name: "AirPeak™ X600-45 (Surgical)",
    price: 569.00,
    category: "Handpieces",
    description: "45-degree head for surgical access. Rear exhaust to prevent embolism.",
  },
  {
    id: "A1004-V3",
    name: "AirPeak™ X600-Micro (KaVo)",
    price: 499.00,
    category: "Handpieces",
    description: "Ultra-mini head for pediatric and limited opening cases.",
  },
  {
    id: "A1009B",
    name: "AirPeak™ G100-LA (Low Speed)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 Contra Angle, Latch Type, Push Button.",
  },
  {
    id: "A1012",
    name: "AirPeak™ G100-ST (Straight)",
    price: 129.00,
    category: "Handpieces",
    description: "1:1 Straight Nose Cone for extraoral adjustments.",
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
  },
  {
    id: "A1003",
    name: "iTesla™ G600-S (1:5 Red Band)",
    price: 729.00,
    category: "Handpieces",
    description: "Electric 1:5 increaser. Titanium body, DLC coating, Quattro Spray.",
  },
  {
    id: "A1028",
    name: "iTesla™ G600-D (1:1 Blue Band)",
    price: 479.00,
    category: "Handpieces",
    description: "Electric 1:1 direct drive. Internal water spray.",
  },
  {
    id: "A1020",
    name: "iTesla™ G500-R20 (20:1 Implant)",
    price: 599.00,
    category: "Handpieces",
    description: "20:1 Reduction for Implantology. External irrigation clip.",
  },

  // =========================================
  // CLINICAL EQUIPMENT (Piezo & Maint.)
  // =========================================
  {
    id: "A1619",
    name: "STRONIC X150 Piezo Scaler",
    price: 799.00,
    category: "Equipment",
    description: "Touch control ultrasonic unit. Endo/Perio/Scaling modes.",
  },
  {
    id: "A1061",
    name: "STRONIC X300 Air Scaler",
    price: 466.00,
    category: "Handpieces",
    description: "Fits KaVo coupler. 6000 Hz oscillation for gentle scaling.",
  },
  {
    id: "A1658",
    name: "AirPeak™ PRO200 Air Polisher",
    price: 446.00,
    category: "Equipment",
    description: "Anti-clogging air polishing system. 360° swivel nozzle.",
  },
  {
    id: "A1030",
    name: "McCare™ X Maintenance",
    price: 1399.00,
    category: "Equipment",
    description: "Automated handpiece cleaning and lubrication. 4 Ports.",
  },
  {
    id: "TH-001",
    name: "Stronic Touch & Heat",
    price: 199.00,
    category: "Endodontics",
    description: "Wireless obturation heating pen with multiple tips.",
  },
  {
    id: "IPR-001",
    name: "AirPeak Automatic IPR",
    price: 199.00,
    category: "Handpieces",
    description: "Ortho interproximal reduction handpiece with reciprocating motion.",
  },

  // =========================================
  // BIOMATERIALS
  // =========================================
  {
    id: "OS-ALLO",
    name: "OsseoSeal Allograft (0.5cc)",
    price: 68.00,
    category: "Surgical",
    description: "Mineralized Cortical/Cancellous Bone Graft (250-1000um).",
  },
  {
    id: "OS-MEM",
    name: "OsseoSeal Membrane (15x20)",
    price: 70.00,
    category: "Surgical",
    description: "Resorbable Porcine Collagen Membrane.",
  },
  {
    id: "OSTEO-PLUG",
    name: "OsteoGen Plug (Large)",
    price: 549.00,
    category: "Surgical",
    description: "Resorbable Bone Grafting Plug (10/Box).",
  },
  {
    id: "ORA-20",
    name: "Ora-Aid Wound Dressing",
    price: 90.00,
    category: "Surgical",
    description: "Intraoral protective dressing. 15mm x 25mm (20 Pack).",
  },
   {
    id: "HELI-1",
    name: "Collagen Wound Dressing",
    price: 110.00,
    category: "Surgical",
    description: "Resorbable collagen sponge for hemostasis (10/Box).",
  },

  // =========================================
  // RESTORATIVE
  // =========================================
  {
    id: "M1042X",
    name: "ModuLite X Curing Light",
    price: 699.00,
    category: "Restorative",
    description: "Broadband LED (380-520nm) with detection mode. Aerospace aluminum.",
  },
  {
    id: "1007-1",
    name: "EP CURE",
    price: 599.00,
    category: "Restorative",
    description: "High-intensity LED curing light. 1-sec cure capability.",
  },
  {
    id: "1008-1",
    name: "EP Light Transilluminator",
    price: 160.00,
    category: "Restorative",
    description: "Diagnostic light for crack detection.",
  },
  {
    id: "M1001",
    name: "SureTact G3 Matrix Kit",
    price: 200.00,
    category: "Restorative",
    description: "Sectional matrix system. 100 matrices, 2 rings, forceps.",
  },
  {
    id: "M1002",
    name: "SureTact G3 Rings (2pk)",
    price: 86.65,
    category: "Restorative",
    description: "Universal NiTi rings with outstanding spring memory.",
  },

  // =========================================
  // ACCESSORIES
  // =========================================
  {
    id: "1006-2",
    name: "UC-CUT Tip #90",
    price: 140.00,
    category: "Accessories",
    description: "Small Metal Posterior Tip for UC-CUT.",
  },
  {
    id: "1006-3",
    name: "UC-CUT Tip #110",
    price: 140.00,
    category: "Accessories",
    description: "Large Metal Anterior Tip for UC-CUT.",
  }
];
