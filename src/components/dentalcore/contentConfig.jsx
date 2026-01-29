// =========================================
// CENTRALIZED CONTENT CONFIGURATION
// All website content is managed here
// =========================================

export const companyInfo = {
  name: "Dental Core Supplies",
  logoText: "Dental Core Supplies",
  tagline: "UC CUT by EPDENT",
  phone: "(626) 214-6598",
  email: "info@dentalcoresupplies.com",
  location: "California, USA",
  locationDetail: "Serving local practices",
  hours: "Mon-Fri, 9am - 5pm PST",
  copyright: "Dental Core Supplies. UC CUT by EPDENT. All rights reserved."
};

export const navigation = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tips', href: '#tips' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const heroContent = {
  badge: {
    text: "New Standard in Cautery",
    animated: true
  },
  headline: {
    line1: "Precision Control",
    line2: "Simplified.",
    highlight: "line2" // which line gets cyan color
  },
  subheadline: "The UC CUT is a 3-in-1 sonic powerhouse for gum cautery, gutta-percha cutting, and vertical condensation.",
  productName: "UC CUT",
  features: [
    "Cordless & Compact Design",
    "Instant Heating & Cooling",
    "Multiple Interchangeable Tips"
  ],
  pricing: {
    unitOnly: {
      price: "$699",
      label: "Unit Only",
      description: "Includes unit + 1 tip"
    },
    fullKit: {
      price: "$799",
      label: "Full Kit",
      description: "Includes unit + 3 tips of choice",
      badge: "Best Value"
    }
  },
  cta: {
    primary: {
      text: "Demo",
      action: "Demo"
    },
    secondary: {
      text: "Order Now",
      action: "Pricing"
    }
  },
  image: "https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060",
  floatingCards: [
    {
      icon: "Zap",
      label: "Heating Time",
      value: "Instant"
    },
    {
      icon: "FileText",
      label: "Warranty",
      value: "1 Year"
    }
  ]
};

export const featuresContent = {
  sectionTitle: "3-in-1 Versatility",
  sectionSubtitle: "One compact device replacing multiple bulky instruments.",
  badge: "Capabilities",
  features: [
    {
      icon: "Flame",
      title: "Gum Cauterization",
      subtitle: "& Gingivectomy",
      description: "Cauterize gum tissue and perform small gingivectomies with precision using a Bovie-style tip. Control minor bleeding and trim soft tissue around crown margins."
    },
    {
      icon: "Scissors",
      title: "Gutta-Percha Cutting",
      subtitle: "with Sonic Vibration",
      description: "Cut gutta-percha quickly and cleanly. The sonic vibration prevents the cone from being pulled out of the canal while localized heat ensures efficient cutting."
    },
    {
      icon: "Activity",
      title: "Vertical Condensation",
      subtitle: "/ Down-Packing",
      description: "Perform vertical condensation during root canal treatments using F / FM tips. Achieve precise, controlled obturation with ease."
    }
  ]
};

export const howItWorksContent = {
  sectionTitle: "How It Works",
  sectionSubtitle: "Advanced sonic technology meets intuitive design",
  badge: "Technology",
  videoUrl: "https://www.youtube.com/embed/PFJ9Cs6GCRc",
  keyFeatures: [
    {
      icon: "Zap",
      title: "Heat + Sonic",
      description: "Combines heat (180°C) with micro-vibration for clean cuts without pulling GP cones."
    },
    {
      icon: "Target",
      title: "Precision Tip",
      description: "Heat concentrated at the apical 2-3mm for safety and controlled performance."
    },
    {
      icon: "Shield",
      title: "Anti-Pull Tech",
      description: "Vibration prevents the GP from sticking to the hot tip—no accidental extraction."
    }
  ],
  easeOfUse: {
    title: "Ease of Use",
    benefits: [
      {
        icon: "Smile",
        title: "Zero Learning Curve",
        description: "Intuitive design, instant familiarity. No complex settings or training needed."
      },
      {
        icon: "Feather",
        title: "Ultra Lightweight",
        description: "Cordless, balanced, and ergonomic. Reduces hand fatigue during long procedures."
      }
    ]
  }
};

export const useCasesContent = {
  badge: "Versatile Applications",
  title: "One Device, Multiple Uses",
  description: "The UC CUT adapts to a wide range of clinical scenarios, from routine endodontics to minor soft tissue surgeries.",
  useCases: [
    "Crown prep tissue management",
    "Gutta-percha removal",
    "Root canal obturation",
    "Gingivectomy procedures",
    "Hemostasis control",
    "Anterior esthetic trimming"
  ],
  quote: {
    text: "I replaced three separate devices with the UC CUT. It's become essential to my daily workflow.",
    author: "Dr. M. Patel",
    title: "Endodontist, Texas"
  }
};

export const tipsContent = {
  sectionTitle: "Specialized Tips for Every Case",
  sectionSubtitle: "Each tip is engineered for specific clinical applications. All tips are fully autoclavable.",
  badge: "Accessories",
  tips: [
    {
      id: "tip-90",
      name: "Metal Tip #90",
      itemCode: "1006-2",
      description: "Small posterior tip ideal for tight spaces",
      details: "The #90 tip features a fine, tapered design perfect for accessing posterior molars and narrow canals. Heat is focused at the apical portion for precision work.",
      image: "https://maruchiusa.com/cdn/shop/products/tips_2048x2048.png?v=1656021083",
      price: "$140.00"
    },
    {
      id: "tip-110",
      name: "Metal Tip #110",
      itemCode: "1006-3",
      description: "Large anterior tip for broader access",
      details: "The #110 is a larger, robust tip designed for anterior cases and wider canals. Its broader profile ensures efficient heat distribution.",
      image: "https://maruchiusa.com/cdn/shop/products/tips_2048x2048.png?v=1656021083",
      price: "$140.00"
    },
    {
      id: "tip-bovie",
      name: "Bovie (SB) Tip",
      itemCode: "1006-4",
      description: "Soft tissue cautery & gingivectomy",
      details: "Specially shaped for gum tissue management. Use this tip for minor gingivectomies, hemostasis, and crown margin adjustments.",
      image: "https://maruchiusa.com/cdn/shop/products/tips_2048x2048.png?v=1656021083",
      price: "$140.00"
    },
    {
      id: "tip-fm",
      name: "F / FM Tip",
      itemCode: "1006-5",
      description: "Vertical condensation / down-packing",
      details: "Designed for obturation techniques requiring controlled vertical condensation. Ideal for warm GP compaction.",
      image: "https://maruchiusa.com/cdn/shop/products/tips_2048x2048.png?v=1656021083",
      price: "$140.00"
    },
    {
      id: "stand",
      name: "UC CUT Stand",
      itemCode: "1006-10",
      description: "Desktop charging & storage stand",
      details: "Keep your UC CUT organized and charged. The stand holds the unit upright and includes slots for tip storage.",
      image: "https://maruchiusa.com/cdn/shop/products/stand_2048x2048.png?v=1656021060",
      price: "$60.00"
    }
  ]
};

export const comparisonContent = {
  sectionTitle: "Why Choose UC CUT Over Larger Units?",
  badge: "Comparison",
  benefits: [
    {
      icon: "Zap",
      title: "Instant On/Off",
      description: "No warm-up time. Unlike bulky electrosurgery units that need to stabilize, the UC CUT heats up instantly and cools down just as fast."
    },
    {
      icon: "PackageOpen",
      title: "No Foot Pedal",
      description: "Cordless and pedal-free design. Save operatory space and eliminate tripping hazards."
    },
    {
      icon: "DollarSign",
      title: "Lower Cost",
      description: "Fraction of the price of full electrosurgery systems. Get professional results without the premium price tag."
    },
    {
      icon: "Smartphone",
      title: "Portable & Compact",
      description: "Fits in your pocket. Take it anywhere—perfect for mobile dentistry or shared operatories."
    }
  ],
  conclusion: "The UC CUT is designed for dentists who need targeted cautery, GP cutting, and condensation—not a massive unit for full surgical procedures."
};

export const techSpecsContent = {
  sectionTitle: "Technical Specifications",
  badge: "Specifications",
  description: "Engineered for precision, reliability, and everyday clinical use.",
  specs: [
    {
      icon: "Thermometer",
      label: "Max Temperature",
      value: "180°C"
    },
    {
      icon: "Gauge",
      label: "Heat Zone",
      value: "2-3mm apical"
    },
    {
      icon: "Vibrate",
      label: "Sonic Frequency",
      value: "Variable"
    },
    {
      icon: "Battery",
      label: "Battery Life",
      value: "Full Day"
    },
    {
      icon: "Zap",
      label: "Charge Time",
      value: "~2 Hours"
    },
    {
      icon: "Scale",
      label: "Weight",
      value: "Ultra-light"
    }
  ],
  productImage: "https://maruchiusa.com/cdn/shop/products/Black_2048x2048.png?v=1656021060",
  productName: "UC CUT",
  productTagline: "The New Standard in Cautery"
};

export const testimonialsContent = {
  sectionTitle: "Trusted by Clinicians",
  description: "See why dental professionals are upgrading to the UC CUT for their endodontic and soft tissue procedures.",
  testimonials: [
    {
      text: "The vibration feature is a game-changer. It cuts through gutta-percha cleanly without ever pulling the cone out of the canal. It's significantly faster than my old heat carrier.",
      author: "Endodontic Specialist",
      location: "California",
      rating: 5
    },
    {
      text: "I use the Bovie tip for gingivectomies almost daily. It heats up instantly and offers incredible control for soft tissue management. A true 3-in-1 device.",
      author: "General Dentist",
      location: "New York",
      rating: 5
    },
    {
      text: "Finally, a cordless unit that maintains consistent temperature. The battery life is excellent for a full day of cases, and the tips are durable and easy to autoclave.",
      author: "Dr. R. Chen",
      location: "Clinical Review",
      rating: 5
    }
  ]
};

export const faqContent = {
  sectionTitle: "Frequently Asked Questions",
  badge: "Common Questions",
  faqs: [
    {
      question: "How do I sterilize the UC CUT tips?",
      answer: "All UC CUT tips (Metal #90, #110, Bovie, etc.) are fully autoclavable. They can be sterilized in a standard steam autoclave at 134°C (273°F). The main handpiece unit should be wiped down with a disinfectant and barrier-protected; it is NOT autoclavable."
    },
    {
      question: "What is the warranty period?",
      answer: "The UC CUT unit comes with a 1-Year Manufacturer's Warranty covering defects in materials and workmanship. This ensures peace of mind for your practice."
    },
    {
      question: "How does the vibration feature help?",
      answer: "The unique sonic vibration (unlike standard heat carriers) helps to cut through gutta-percha cleanly. This micro-vibration prevents the heated tip from sticking to the cone, ensuring you don't accidentally pull the obturation material out of the canal."
    },
    {
      question: "How fast does it heat up?",
      answer: "The UC CUT features instantaneous heating, reaching up to 180°C at the tip within seconds. The heat is concentrated at the apical 2-3mm of the tip for safety and precision."
    },
    {
      question: "Is the battery replaceable?",
      answer: "The UC CUT uses a high-performance built-in rechargeable battery designed for long-lasting use. It charges quickly via the included charging base."
    },
    {
      question: "Can I use it for soft tissue?",
      answer: "Yes! With the specialized 'Bovie' (SB) tip, the UC CUT functions as a precise gum cautery device for gingivectomies and hemostasis."
    }
  ]
};

export const aboutContent = {
  sectionTitle: "About Dental Core Supplies",
  badge: "Our Story",
  description: "Dental Core Supplies is a dentist-centered distributor focused on practical, high-quality instruments that solve real clinical problems. We cut through the noise of oversized catalogs and bring you only what works—tested by practitioners, priced for local practices.",
  mission: "Our mission is to provide local dental practices with reliable, innovative instruments that enhance patient care without breaking the bank.",
  values: [
    {
      icon: "Stethoscope",
      title: "Doctor-Focused",
      description: "We listen to clinicians first. Every product we carry has been vetted by practicing dentists who understand the demands of daily chairside work."
    },
    {
      icon: "Headphones",
      title: "Personal Support",
      description: "No phone trees, no runaround. Reach a real person who knows the products and can answer technical questions."
    },
    {
      icon: "Award",
      title: "Curated Excellence",
      description: "We don't sell everything—only the best. Each item in our catalog is hand-selected for quality and reliability."
    }
  ]
};

export const contactContent = {
  sectionTitle: "Get in Touch",
  description: "Ready to upgrade your practice with UC CUT? Request a demo or intro pricing today. We usually respond within 24 hours.",
  formLabels: {
    name: "Your Name",
    practice: "Practice Name",
    email: "Email",
    phone: "Phone",
    city: "City",
    state: "State",
    interest: "I'm interested in"
  },
  formPlaceholders: {
    name: "Dr. John Smith",
    practice: "Smith Family Dentistry",
    email: "email@example.com",
    phone: "(555) 123-4567",
    city: "City",
    state: "State"
  },
  interestOptions: [
    { value: "Demo", label: "Requesting a Demo" },
    { value: "Pricing", label: "Requesting Intro Pricing" },
    { value: "Both", label: "Both Demo & Pricing" }
  ],
  submitButton: {
    default: "Submit Request",
    submitting: "Sending...",
    success: "Request Sent"
  },
  privacyNote: "By submitting, you agree to our privacy policy. Your data is safe.",
  successMessage: "Request submitted successfully! We'll be in touch soon."
};

// Product catalog
export const products = [
  {
    id: "1006-1",
    name: "UC-CUT (Sonic GP Cutter)",
    price: "$599.00",
    category: "Endodontics",
    description: "The new standard in Gutta Percha removal. Cordless, Sonic, Precision.",
    image: "/images/uc-cut-hero.jpg",
    features: ["Cordless Operation", "Instant Heating (180°C)", "Sonic Vibration"],
    popular: true
  },
  {
    id: "1002-1",
    name: "UC-ONE (Ultrasonic Irrigation)",
    price: "$599.00",
    category: "Endodontics",
    description: "Cordless ultrasonic irrigation for superior canal cleaning.",
    image: "/images/uc-one.jpg"
  },
  {
    id: "1005-1",
    name: "GP Cut & Fit (Standard)",
    price: "$80.00",
    category: "Endodontics",
    description: "Reliable cordless GP cutter with interchangeable tips.",
    image: "https://via.placeholder.com/400"
  },
  {
    id: "S1001",
    name: "iSuni Intraoral Scanner",
    price: "$5,999.00",
    originalPrice: "$7,599.00",
    category: "Equipment",
    description: "30-second full arch scans. 10μm accuracy. No subscription fees.",
    image: "/images/isuni-scanner.jpg",
    specs: { "Accuracy": "10μm", "Depth": "20mm", "AI": "Smart Filtering" },
    popular: true
  },
  {
    id: "A1004-V2",
    name: "AirPeak™ X600-S (KaVo Style)",
    price: "$399.00",
    category: "Handpieces",
    description: "Titanium, Fiber Optic, Quattro Spray. 400,000 RPM.",
    image: "https://via.placeholder.com/400"
  }
];