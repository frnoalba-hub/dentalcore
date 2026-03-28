import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLanguageStore = create(
  persist(
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'language-storage' }
  )
);

const productTranslations = {
  es: {
    // Categories
    "Endodontics": "Endodoncia",
    "Equipment": "Equipo",
    "Handpieces": "Piezas de Mano",
    "Surgical": "Quirúrgico",
    "Restorative": "Restaurador",
    "Accessories": "Accesorios",

    // Descriptions
    "The new standard in Gutta Percha removal. Cordless, Sonic, Precision.": "El nuevo estándar en remoción de Gutapercha. Inalámbrico, Sónico, Preciso.",
    "Cordless ultrasonic irrigation for superior canal cleaning.": "Irrigación ultrasónica inalámbrica para una limpieza superior del canal.",
    "Reliable cordless GP cutter with interchangeable tips.": "Cortador de GP inalámbrico confiable con puntas intercambiables.",
    "Ergonomic gutta percha plugger kit (FM/M and ML/L).": "Kit ergonómico de obturadores de gutapercha (FM/M y ML/L).",
    "Micro-suction tips for drying canals. Includes 2 adapters + 5 tips.": "Puntas de microsucción para secar canales. Incluye 2 adaptadores + 5 puntas.",
    "Bioactive bioceramic root canal sealer. High radiopacity.": "Sellador de conductos radiculares biocerámico y bioactivo. Alta radiopacidad.",
    "Rapid setting MTA for root repair and apicoectomy.": "MTA de fraguado rápido para reparación de raíces y apicectomía.",
    
    "30-second full arch scans. 10μm accuracy. No subscription fees.": "Escaneos de arco completo en 30 segundos. Precisión de 10μm. Sin tarifas de suscripción.",
    "Crystal clear CMOS imaging for Pedo/General use.": "Imágenes CMOS nítidas para uso pediátrico/general.",
    "Crystal clear CMOS imaging for Adult Bitewings.": "Imágenes CMOS nítidas para aletas de mordida de adultos.",
    "Lightweight, handheld X-ray generator. Shielded for safety.": "Generador de rayos X portátil y ligero. Blindado para mayor seguridad.",
    
    "Titanium, Fiber Optic, Quattro Spray. 400,000 RPM.": "Titanio, Fibra Óptica, Spray Quattro. 400.000 RPM.",
    "Titanium, Fiber Optic, Quattro Spray. NSK Coupler compatible.": "Titanio, Fibra Óptica, Spray Quattro. Compatible con acople NSK.",
    "45-degree head for surgical access. Rear exhaust to prevent embolism.": "Cabezal de 45 grados para acceso quirúrgico. Escape trasero para prevenir embolia.",
    "Ultra-mini head for pediatric and limited opening cases.": "Cabezal ultra-mini para casos pediátricos y de apertura limitada.",
    "1:1 Contra Angle, Latch Type, Push Button.": "Contra-ángulo 1:1, Tipo Pestillo, Botón Pulsador.",
    "1:1 Straight Nose Cone for extraoral adjustments.": "Pieza recta 1:1 para ajustes extraorales.",
    
    "Brushless micromotor with integrated Endo function. 3.0 N.cm torque.": "Micromotor sin escobillas con función Endo integrada. Torque de 3.0 N.cm.",
    "Electric 1:5 increaser. Titanium body, DLC coating, Quattro Spray.": "Multiplicador eléctrico 1:5. Cuerpo de titanio, revestimiento DLC, Spray Quattro.",
    "Electric 1:1 direct drive. Internal water spray.": "Transmisión directa eléctrica 1:1. Spray de agua interno.",
    "20:1 Reduction for Implantology. External irrigation clip.": "Reducción 20:1 para Implantología. Clip de irrigación externo.",
    
    "Touch control ultrasonic unit. Endo/Perio/Scaling modes.": "Unidad ultrasónica con control táctil. Modos Endo/Perio/Escalado.",
    "Fits KaVo coupler. 6000 Hz oscillation for gentle scaling.": "Se adapta al acople KaVo. Oscilación de 6000 Hz para escalado suave.",
    "Anti-clogging air polishing system. 360° swivel nozzle.": "Sistema de pulido por aire anti-obstrucción. Boquilla giratoria de 360°.",
    "Automated handpiece cleaning and lubrication. 4 Ports.": "Limpieza y lubricación automatizada de piezas de mano. 4 Puertos.",
    "Wireless obturation heating pen with multiple tips.": "Lápiz de calentamiento inalámbrico para obturación con múltiples puntas.",
    "Ortho interproximal reduction handpiece with reciprocating motion.": "Pieza de mano para reducción interproximal de ortodoncia con movimiento alternativo.",
    
    "Mineralized Cortical/Cancellous Bone Graft (250-1000um).": "Injerto Óseo Cortical/Esponjoso Mineralizado (250-1000um).",
    "Resorbable Porcine Collagen Membrane.": "Membrana de Colágeno Porcino Reabsorbible.",
    "Resorbable Bone Grafting Plug (10/Box).": "Tapón de Injerto Óseo Reabsorbible (10/Caja).",
    "Intraoral protective dressing. 15mm x 25mm (20 Pack).": "Apósito protector intraoral. 15mm x 25mm (Paquete de 20).",
    "Resorbable collagen sponge for hemostasis (10/Box).": "Esponja de colágeno reabsorbible para hemostasia (10/Caja).",
    
    "Broadband LED (380-520nm) with detection mode. Aerospace aluminum.": "LED de banda ancha (380-520nm) con modo de detección. Aluminio aeroespacial.",
    "High-intensity LED curing light. 1-sec cure capability.": "Lámpara de fotocurado LED de alta intensidad. Capacidad de curado en 1 seg.",
    "Diagnostic light for crack detection.": "Luz de diagnóstico para detección de grietas.",
    "Sectional matrix system. 100 matrices, 2 rings, forceps.": "Sistema de matrices seccionales. 100 matrices, 2 anillos, fórceps.",
    "Universal NiTi rings with outstanding spring memory.": "Anillos universales de NiTi con memoria elástica excepcional.",
    
    "Small Metal Posterior Tip for UC-CUT.": "Punta Posterior de Metal Pequeña para UC-CUT.",
    "Large Metal Anterior Tip for UC-CUT.": "Punta Anterior de Metal Grande para UC-CUT.",

    // Featured Product description
    "The new standard in Gutta Percha removal. Cordless, Sonic, Precision. Eliminates cone pull-out with high-frequency sonic vibration.": "El nuevo estándar en remoción de Gutapercha. Inalámbrico, Sónico, Preciso. Elimina la extracción del cono con vibración sónica de alta frecuencia.",

    // Specs / Features
    "Cordless Operation": "Operación Inalámbrica",
    "Instant Heating (180°C)": "Calentamiento Instantáneo (180°C)",
    "Sonic Vibration": "Vibración Sónica",
    "Instant heating to 180°C in <1 sec": "Calentamiento instantáneo a 180°C en <1 seg",
    "Cordless ergonomic geometry": "Geometría ergonómica inalámbrica",
    "Sonic vibration prevents cone sticking": "Vibración sónica previene adhesión del cono",
    "1.7 oz ultra-light chassis": "Chasis ultraligero de 1.7 oz",

    "Dental Core Instruments LLC": "Dental Core Instruments LLC",
  }
};

export const translations = {
  en: {
    lang_name: 'EN',
    catalog: 'Catalog',
    featured: 'Featured',
    about: 'About',
    contact: 'Contact',
    cart: 'Cart',
    
    clinical_precision: 'Clinical',
    clinical_precision_2: 'Precision',
    hero_desc: 'Engineered for modern dentistry. Uncompromising quality for professionals who demand the absolute best.',
    explore_collection: 'Explore Collection',
    iso_certified: 'ISO Certified',
    warranty: '1-Year Warranty',
    next_day: 'Next-Day Dispatch',
    clinical_support: 'Direct Clinical Support',

    index: 'Index',
    all: 'All',
    view_details: 'View Details',
    loading: 'Loading...',

    flagship: 'Flagship',
    acquire_unit: 'Acquire Unit',

    clinical_feedback: 'Clinical Feedback',

    about_title: 'About Dental Core Supplies',

    operate_with: 'Operate with',
    precision: 'Precision.',
    direct_line: 'Direct Line',
    digital_support: 'Digital Support',
    headquarters: 'Headquarters',
    all_rights_reserved: 'All Rights Reserved',

    back_to_index: 'Back to Index',
    add_to_requisition: 'Add to Requisition',
    core_specifications: 'Core Specifications',

    active_requisition: 'Active Requisition',
    no_items: 'No items in requisition.',
    subtotal: 'Subtotal',
    secure_checkout: 'Secure Checkout',
    processing: 'Processing...',
    remove: 'Remove',
  },
  es: {
    lang_name: 'ES',
    catalog: 'Catálogo',
    featured: 'Destacado',
    about: 'Nosotros',
    contact: 'Contacto',
    cart: 'Carrito',

    clinical_precision: 'Precisión',
    clinical_precision_2: 'Clínica',
    hero_desc: 'Diseñado para la odontología moderna. Calidad intransigente para profesionales que exigen lo mejor.',
    explore_collection: 'Explorar Colección',
    iso_certified: 'Certificado ISO',
    warranty: '1 Año de Garantía',
    next_day: 'Envío al Día Siguiente',
    clinical_support: 'Soporte Clínico Directo',

    index: 'Índice',
    all: 'Todos',
    view_details: 'Ver Detalles',
    loading: 'Cargando...',

    flagship: 'Insignia',
    acquire_unit: 'Adquirir Unidad',

    clinical_feedback: 'Comentarios Clínicos',

    about_title: 'Sobre Dental Core Supplies',

    operate_with: 'Opere con',
    precision: 'Precisión.',
    direct_line: 'Línea Directa',
    digital_support: 'Soporte Digital',
    headquarters: 'Sede Central',
    all_rights_reserved: 'Todos los derechos reservados',

    back_to_index: 'Volver al Índice',
    add_to_requisition: 'Agregar a la Requisición',
    core_specifications: 'Especificaciones Principales',

    active_requisition: 'Requisición Activa',
    no_items: 'No hay artículos en la requisición.',
    subtotal: 'Subtotal',
    secure_checkout: 'Pago Seguro',
    processing: 'Procesando...',
    remove: 'Eliminar',
    ...productTranslations.es
  }
};

export const useTranslation = () => {
  const { lang, setLang } = useLanguageStore();
  
  const t = (key) => translations[lang]?.[key] || key;
  
  const dynamicT = (text) => {
    if (!text) return text;
    return translations[lang]?.[text] || text;
  };

  return { t, dynamicT, lang, setLang };
};