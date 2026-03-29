const faqs = [
  {
    question: "What types of dental handpieces does Coretix sell?",
    answer: "Coretix offers high-speed air-driven handpieces (AirPeak series), electric handpieces (iTesla series), low-speed contra angles, straight nosecones, and specialty surgical handpieces. All are built with titanium bodies and fiber optic illumination."
  },
  {
    question: "Do you sell endodontic instruments and materials?",
    answer: "Yes. Our endodontic line includes the UC-CUT sonic GP cutter, UC-ONE ultrasonic irrigator, EP Plugger sets, bioceramic sealers (Endoseal MTA), and MTA root repair cement (Endocem). Everything you need for modern obturation and retreatment."
  },
  {
    question: "What bone graft materials are available?",
    answer: "We carry OsseoSeal mineralized cortico-cancellous allograft in prefilled syringes (0.3cc–1.0cc) and bulk powder (2.5cc–5cc), resorbable collagen membranes (15×20mm to 30×40mm), and OsteoGen bioactive bone graft plugs."
  },
  {
    question: "What curing lights does Coretix offer?",
    answer: "We offer the ModuLite X broadband LED curing light (380–520nm) with resin detection mode, and the EP CURE high-intensity light with 1-second cure capability. Both are designed to reduce chair time without compromising cure depth."
  },
  {
    question: "Do you ship dental supplies nationwide?",
    answer: "Yes, Coretix ships to dental offices across the United States. We are based in Sacramento, CA and offer direct pricing to dental professionals with no middleman markup."
  },
  {
    question: "What is the AirPeak 3+1 handpiece deal?",
    answer: "Purchase any 3 AirPeak high-speed handpieces and receive 1 coupler free, all for $1,000. This bundle covers both KaVo MULTIflex and NSK compatible models."
  },
  {
    question: "Are your dental instruments covered by warranty?",
    answer: "All Coretix instruments come with a 1-Year Manufacturer's Warranty covering defects in materials and workmanship. Autoclavable components are clearly identified in each product listing."
  },
  {
    question: "What sectional matrix systems do you carry?",
    answer: "The SureTact G3 Matrix Kit includes 100 assorted matrices, 2 NiTi rings, and ring forceps for Class II restorations. Replacement NiTi rings are also available separately in a 2-pack."
  }
];

export default function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}