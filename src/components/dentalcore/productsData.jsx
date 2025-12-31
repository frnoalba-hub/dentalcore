export const products = [
  {
    id: 'endoseal',
    name: 'Endoseal MTA',
    category: 'Bioceramics',
    price: '$90.00',
    description: 'Paste-type root canal sealer and filler based on pozzolan cement. Excellent physical and biological properties of MTA.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/379589678_image.png',
    popular: true,
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/379589678_image.png',
    ],
    specs: {
      'Type': 'Paste-type sealer',
      'Base Material': 'Pozzolan cement (MTA)',
      'Setting Time': '4 hours',
      'Working Time': '30 minutes',
      'Radiopacity': 'High',
      'Biocompatibility': 'Excellent',
      'Package': '2g syringe + tips'
    },
    features: [
      'Excellent sealing ability',
      'Superior biocompatibility',
      'No shrinkage during setting',
      'Radiopaque for easy visualization',
      'Easy to use paste consistency'
    ],
    reviews: [
      { author: 'Dr. Sarah Chen', rating: 5, text: 'Best MTA sealer I\'ve used. Easy to work with and excellent results.', date: '2025-01-10' },
      { author: 'Dr. Michael Roberts', rating: 5, text: 'Outstanding biocompatibility. My go-to for all endo cases.', date: '2025-01-05' }
    ]
  },
  {
    id: 'gp-cut-fit',
    name: 'GP Cut & Fit',
    category: 'Instruments',
    price: '$45.00',
    description: 'Cordless Gutta Percha Cutter. Features interchangeable tips (0.5mm, 1.2mm, 2.0mm) for precise sizing and clean cuts.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/GP-CUT-_-Fit-1_de2c8b15-4775-44fe-a2b6-f05c5e08ce48.jpg?v=1752124007&width=600',
    popular: false,
    images: [
      'https://kdentalsupplies.com/cdn/shop/files/GP-CUT-_-Fit-1_de2c8b15-4775-44fe-a2b6-f05c5e08ce48.jpg?v=1752124007&width=600',
    ],
    specs: {
      'Type': 'Cordless GP Cutter',
      'Tips Included': '0.5mm, 1.2mm, 2.0mm',
      'Battery': 'Rechargeable lithium',
      'Heating Time': 'Instant',
      'Weight': '85g',
      'Warranty': '1 year'
    },
    features: [
      'Three interchangeable tips',
      'Cordless convenience',
      'Instant heating',
      'Clean, precise cuts',
      'Ergonomic design'
    ],
    reviews: [
      { author: 'Dr. James Park', rating: 4, text: 'Great little device. Makes GP cutting so much easier.', date: '2024-12-28' }
    ]
  },
  {
    id: 'uc-one',
    name: 'UC ONE',
    category: 'Endodontics',
    price: '$480.00',
    description: 'Cordless Passive Ultrasonic Irrigation. 30,000 vibrations/sec with flexible 90° bendable tips for curved canals.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/UCONE-1_74a6c9ab-0980-4277-8c6d-b81e124cde28.jpg?v=1752124058&width=600',
    popular: true,
    images: [
      'https://kdentalsupplies.com/cdn/shop/files/UCONE-1_74a6c9ab-0980-4277-8c6d-b81e124cde28.jpg?v=1752124058&width=600',
    ],
    specs: {
      'Type': 'Ultrasonic Irrigator',
      'Frequency': '30,000 vibrations/sec',
      'Power': 'Cordless rechargeable',
      'Tip Flexibility': '90° bendable',
      'Modes': '3 power levels',
      'Battery Life': '60 minutes',
      'Warranty': '1 year'
    },
    features: [
      '30,000 vibrations per second',
      'Flexible 90° bendable tips',
      'Cordless operation',
      'Ideal for curved canals',
      'Three power settings'
    ],
    reviews: [
      { author: 'Dr. Emily Wong', rating: 5, text: 'Game changer for my endo practice. The bendable tips are brilliant!', date: '2025-01-12' },
      { author: 'Dr. David Martinez', rating: 5, text: 'Exceptional irrigation system. Worth every penny.', date: '2025-01-08' }
    ]
  },
  {
    id: 'ep-cure',
    name: 'EP Cure',
    category: 'Curing Lights',
    price: '$599.00',
    description: 'High-performance curing light with 1,200 mW/cm² intensity. Features 3s/5s modes and built-in light guides.',
    image: 'https://dowelldentalproducts.com/cdn/shop/files/EPCUREW.png?v=1728590132&width=800',
    popular: false,
    images: [
      'https://dowelldentalproducts.com/cdn/shop/files/EPCUREW.png?v=1728590132&width=800',
    ],
    specs: {
      'Intensity': '1,200 mW/cm²',
      'Wavelength': '420-480nm',
      'Modes': '3s / 5s turbo',
      'Battery': 'Rechargeable',
      'Light Guide': 'Built-in, 8mm',
      'Warranty': '2 years'
    },
    features: [
      'High 1,200 mW/cm² output',
      'Fast 3-5 second cure times',
      'Built-in light guides',
      'Uniform light distribution',
      'Cordless convenience'
    ],
    reviews: [
      { author: 'Dr. Lisa Thompson', rating: 5, text: 'Incredibly fast curing. My composite work has never been better.', date: '2025-01-14' }
    ]
  },
  {
    id: 'ep-cure-mini',
    name: 'EP Cure Mini',
    category: 'Curing Lights',
    price: '$550.00',
    description: 'Compact and lightweight curing light. Available in Black, White, and Green. Perfect for quick procedures.',
    image: 'https://kdentalsupplies.com/cdn/shop/files/black.jpg?v=1752123906&width=416',
    popular: false,
    images: [
      'https://kdentalsupplies.com/cdn/shop/files/black.jpg?v=1752123906&width=416',
    ],
    specs: {
      'Intensity': '1,000 mW/cm²',
      'Weight': '95g',
      'Modes': '3s / 5s / 10s',
      'Colors': 'Black, White, Green',
      'Battery Life': '90 minutes',
      'Warranty': '2 years'
    },
    features: [
      'Ultra-compact design',
      'Three color options',
      'Lightweight at 95g',
      'Multiple curing modes',
      'Long battery life'
    ],
    reviews: [
      { author: 'Dr. Alex Kim', rating: 4, text: 'Love the compact size. Perfect for my operatory setup.', date: '2024-12-30' }
    ]
  },
  {
    id: 'ep-light',
    name: 'EP Light',
    category: 'Diagnostics',
    price: '$160.00',
    description: 'LED Transilluminator for detecting fractures, caries, and root canal orifices. Compact and battery operated.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/388efd2cf_image.png',
    popular: false,
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/388efd2cf_image.png',
    ],
    specs: {
      'Type': 'LED Transilluminator',
      'Light Source': 'High-intensity LED',
      'Power': 'Battery operated',
      'Weight': '45g',
      'Uses': 'Fracture/caries detection',
      'Warranty': '1 year'
    },
    features: [
      'Detects fractures and caries',
      'Locates root canal orifices',
      'Compact and lightweight',
      'High-intensity LED',
      'Battery operated'
    ],
    reviews: [
      { author: 'Dr. Rachel Green', rating: 5, text: 'Essential diagnostic tool. Found cracks I would have missed.', date: '2025-01-06' }
    ]
  },
  {
    id: 'uc-one-metal-tip',
    name: 'UC One Metal Tip',
    category: 'Accessories',
    price: '$80.00',
    description: 'Replacement metal tip for UC ONE ultrasonic irrigation system. Durable and autoclavable.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/a9c9658c0_image.png',
    popular: false,
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/a9c9658c0_image.png',
    ],
    specs: {
      'Material': 'Stainless steel',
      'Compatibility': 'UC ONE system',
      'Sterilization': 'Autoclavable',
      'Quantity': '1 tip',
      'Flexibility': 'Rigid',
      'Warranty': '6 months'
    },
    features: [
      'Durable stainless steel',
      'Fully autoclavable',
      'Compatible with UC ONE',
      'Long-lasting performance',
      'Easy to clean'
    ],
    reviews: [
      { author: 'Dr. Mark Davis', rating: 4, text: 'Good quality replacement tip. Works perfectly with my UC ONE.', date: '2024-12-20' }
    ]
  },
  {
    id: 'uc-one-plastic-tips',
    name: 'UC One Plastic Tips',
    category: 'Accessories',
    price: '$60.00',
    description: 'Disposable plastic tips for UC ONE. Flexible design for curved canals. 50 pcs/pack.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/8e30013bb_image.png',
    popular: false,
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6916a1244818477a36fdb44c/8e30013bb_image.png',
    ],
    specs: {
      'Material': 'Medical-grade plastic',
      'Compatibility': 'UC ONE system',
      'Quantity': '50 tips per pack',
      'Type': 'Single-use disposable',
      'Flexibility': 'Flexible for curved canals',
      'Package': 'Sterile pack'
    },
    features: [
      'Flexible for curved canals',
      'Single-use convenience',
      '50 tips per pack',
      'Pre-sterilized',
      'Cost-effective'
    ],
    reviews: [
      { author: 'Dr. Nina Patel', rating: 5, text: 'Love the disposable option. Great for curved canals!', date: '2025-01-02' }
    ]
  }
];