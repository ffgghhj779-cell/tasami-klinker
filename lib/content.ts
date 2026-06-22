export type Language = 'ar' | 'en';

export const content = {
  header: {
    nav: {
      ar: [
        { label: 'لماذا تسامي؟', href: '#why-tasami' },
        { label: 'الأسواق والطلب', href: '#market' },
        { label: 'المنتج والمواصفات', href: '#product' },
        { label: 'الجودة والشهادات', href: '#quality' },
        { label: 'اللوجستيات والتسليم', href: '#logistics' },
        { label: 'كيف نعمل', href: '#how-we-work' },
        { label: 'تواصل وطلب عرض', href: '#contact' },
      ],
      en: [
        { label: 'Why Tasami?', href: '#why-tasami' },
        { label: 'Markets & Demand', href: '#market' },
        { label: 'Product & Specifications', href: '#product' },
        { label: 'Quality & Certifications', href: '#quality' },
        { label: 'Logistics & Delivery', href: '#logistics' },
        { label: 'How We Work', href: '#how-we-work' },
        { label: 'Contact & Request Quote', href: '#contact' },
      ]
    },
    cta: {
      ar: 'طلب ملف فني كامل',
      en: 'Request Full Technical File'
    }
  },
  hero: {
    title: {
      ar: 'تسامي الصناعية – مواد · لوجستيات · حلول',
      en: 'TASAMI INDUSTRIAL – Materials · Logistics · Solutions'
    },
    subtitle: {
      ar: 'توريد كلنكر سعودي عالي الجودة – مطابق للمعايير العالمية، توثيق كامل، وجداول تسليم دقيقة',
      en: 'Premium Saudi clinker supply – global standards, full documentation, and reliable delivery schedules'
    },
    btnStart: {
      ar: 'ابدأ مسار الثقة الآن',
      en: 'Start Trust Journey Now'
    },
    btnReport: {
      ar: 'تحميل تقرير الطلب السوقي 2026',
      en: 'Download 2026 Market Demand Report'
    }
  },
  whyTasami: {
    title: {
      ar: 'ميزة تنافسية لا تتوفر في غيرنا',
      en: 'Competitive Advantage You Won’t Find Elsewhere'
    },
    points: {
      ar: [
        'منتج سعودي أصلي: طاقة إنتاجية فائضة، جودة مستقرة، توفر دائم',
        'شفافية كاملة: كل شحنة مع تقرير SGS، شهادة منشأ، ومستندات جاهزة',
        'شروط آمنة: دفع عبر LC، شحنات تجريبية، وحد أدنى مرن للكميات'
      ],
      en: [
        'Authentic Saudi Product: Surplus production capacity, stable quality, permanent availability',
        'Full Transparency: Every shipment comes with an SGS report, Certificate of Origin, and ready documentation',
        'Secure Terms: LC payments, trial shipments, and flexible minimum quantities'
      ]
    },
    metrics: {
      ar: ['24–48h', 'SGS', 'LC at sight'],
      en: ['24–48h', 'SGS', 'LC at sight']
    },
    metricLabels: {
      ar: ['جاهزية الشحن', 'توثيق لكل شحنة', 'دفع آمن'],
      en: ['Shipping ready', 'Per-shipment docs', 'Secure payment']
    }
  },
  about: {
    title: {
      ar: 'من نحن',
      en: 'About Tasami'
    },
    paragraphs: {
      ar: [
        'تسامي الصناعية مورّد سعودي متخصص في توريد الكلنكر عالي الجودة للأسواق الإقليمية في الشرق الأوسط وشمال أفريقيا.',
        'نعمل من المملكة العربية السعودية مع جاهزية مخزون في موانئ الجبيل وجازان، ونوفر توثيقاً كاملاً يشمل تقارير SGS وشهادات المنشأ وفق أعلى المعايير العالمية.',
        'عضو في اتحاد منتجي الأسمنت السعودي — مرخص من الهيئة العامة للتجارة الخارجية.'
      ],
      en: [
        'TASAMI INDUSTRIAL is a Saudi supplier specialized in premium clinker for regional markets across the Middle East and North Africa.',
        'Operating from the Kingdom of Saudi Arabia with ready stock at Jubail and Jazan ports, we provide full documentation including SGS reports and Certificates of Origin to the highest global standards.',
        'Member of the Saudi Cement Producers Association — Licensed by the General Authority for Foreign Trade.'
      ]
    }
  },
  marketStatus: {
    title: {
      ar: 'الطلب والفرص في الأسواق المستهدفة',
      en: 'Demand & Opportunities in Target Markets'
    },
    tableHeaders: {
      ar: ['الدولة', 'حجم الاستيراد 2025 (طن)', 'الأولوية', 'ملاحظات'],
      en: ['Country', 'Import Volume 2025 (tons)', 'Priority', 'Notes']
    },
    tableData: {
      ar: [
        ['سوريا', '1,100,000 – 1,250,000', '⭐⭐⭐⭐⭐', 'إعادة إعمار، طلب متزايد'],
        ['لبنان', '420,000 – 490,000', '⭐⭐⭐⭐', 'محور لوجستي هام'],
        ['الأردن', '300,000 – 340,000', '⭐⭐⭐⭐', 'سوق مستقر ومنظم'],
        ['اليمن', '190,000 – 220,000', '⭐⭐⭐', 'شروط لوجستية خاصة'],
        ['ليبيا', '170,000 – 200,000', '⭐⭐⭐', 'يفضل وجود شريك محلي'],
        ['تونس', '120,000 – 150,000', '⭐⭐', 'سوق تنافسي بكميات أقل'],
        ['السودان', '70,000 – 90,000', '⭐⭐', 'فرص متوسطة حالياً']
      ],
      en: [
        ['Syria', '1,100,000 – 1,250,000', '⭐⭐⭐⭐⭐', 'Reconstruction, increasing demand'],
        ['Lebanon', '420,000 – 490,000', '⭐⭐⭐⭐', 'Important logistics hub'],
        ['Jordan', '300,000 – 340,000', '⭐⭐⭐⭐', 'Stable and organized market'],
        ['Yemen', '190,000 – 220,000', '⭐⭐⭐', 'Special logistics conditions'],
        ['Libya', '170,000 – 200,000', '⭐⭐⭐', 'Local partner preferred'],
        ['Tunisia', '120,000 – 150,000', '⭐⭐', 'Competitive market with fewer quantities'],
        ['Sudan', '70,000 – 90,000', '⭐⭐', 'Medium opportunities currently']
      ]
    },
    btnDownload: {
      ar: 'تحميل التقرير السوقي الكامل (PDF)',
      en: 'Download Full Market Report (PDF)'
    }
  },
  product: {
    status: {
      ar: '✅ متوفر حالياً – مخزون جاهز في ميناء الجبيل وجازان، جاهز للشحن خلال 24–48 ساعة',
      en: '✅ Currently Available – Ready stock at Jubail and Jazan ports, ready to ship within 24–48 hours'
    },
    tableHeaders: {
      ar: ['المؤشر', 'نطاق تسامي', 'ASTM C150', 'EN 197-1'],
      en: ['Indicator', 'Tasami Range', 'ASTM C150', 'EN 197-1']
    },
    tableData: [
      ['LSF', '0.90–0.94', '0.88–0.95', '0.90–0.94'],
      ['SM', '2.30–2.50', '2.20–2.60', '2.30–2.50'],
      ['AM', '1.10–1.40', '1.00–1.50', '1.10–1.40'],
      ['MgO', '< 2.5%', '< 5.0%', '< 5.0%'],
      ['SO₃', '< 1.0%', '< 1.5%', '< 1.5%'],
      ['Free Lime (الجير الحر)', '< 1.2%', '< 1.5%', '< 1.5%'],
      ['Moisture (الرطوبة)', '< 0.8%', '< 1.0%', '< 1.0%']
    ],
    quality: {
      title: {
        ar: 'الجودة والشهادات',
        en: 'Quality & Certifications'
      },
      text: {
        ar: 'ISO 9001, ISO 14001, تقرير SGS, علامة صنع في السعودية',
        en: 'ISO 9001, ISO 14001, SGS Report, Saudi Made Mark'
      }
    },
    btnChemical: {
      ar: 'عرض تقرير التحليل الكيميائي',
      en: 'View Chemical Analysis Report'
    },
    btnCertificates: {
      ar: 'تحميل جميع الشهادات',
      en: 'Download All Certificates'
    }
  },
  logistics: {
    title: {
      ar: 'اللوجستيات والتسليم',
      en: 'Logistics & Delivery'
    },
    flow: {
      ar: 'مصنع الجبيل → ميناء جازان → شحن بحري → وصول الميناء → تخليص جمركي → التسليم',
      en: 'Jubail Plant → Jazan Port → Sea Freight → Port Arrival → Customs Clearance → Delivery'
    },
    tableHeaders: {
      ar: ['الوجهة', 'الميناء', 'مدة الشحن', 'الحد الأدنى للشحنة', 'الشروط التجارية'],
      en: ['Destination', 'Port', 'Shipping Duration', 'Min. Shipment', 'Commercial Terms']
    },
    tableData: {
      ar: [
        ['سوريا', 'اللاذقية', '7–9 أيام', '5,000 طن', 'FOB / CFR / CIF'],
        ['لبنان', 'بيروت', '6–8 أيام', '3,000 طن', 'FOB / CFR / CIF'],
        ['الأردن', 'العقبة', '5–7 أيام', '3,000 طن', 'FOB / CFR / CIF'],
        ['اليمن', 'عدن', '8–11 أيام', '5,000 طن', 'FOB / CFR']
      ],
      en: [
        ['Syria', 'Latakia', '7–9 days', '5,000 tons', 'FOB / CFR / CIF'],
        ['Lebanon', 'Beirut', '6–8 days', '3,000 tons', 'FOB / CFR / CIF'],
        ['Jordan', 'Aqaba', '5–7 days', '3,000 tons', 'FOB / CFR / CIF'],
        ['Yemen', 'Aden', '8–11 days', '5,000 tons', 'FOB / CFR']
      ]
    },
    btnCustomSchedule: {
      ar: 'احصل على جدول شحن مخصص',
      en: 'Get Customized Shipping Schedule'
    }
  },
  howWeWork: {
    title: {
      ar: 'نبني الشراكات خطوة بخطوة',
      en: 'Building Partnerships Step by Step'
    },
    steps: {
      ar: [
        'عينة فنية: 50 كجم + تقرير معمل – تسليم خلال 5 أيام',
        'التحقق المستقل: يمكنكم إعادة الفحص في مختبركم المعتمد',
        'شحنة تجريبية: 5,000 طن – دفع عبر LC at sight',
        'توريد مستمر: اتفاقية شهرية بعد نجاح التجربة'
      ],
      en: [
        'Technical Sample: 50 kg + lab report – delivered within 5 days',
        'Independent Verification: You can re-test in your certified laboratory',
        'Trial Shipment: 5,000 tons – payment via LC at sight',
        'Continuous Supply: Monthly agreement after successful trial'
      ]
    },
    btnStart: {
      ar: 'ابدأ مسار الثقة الآن',
      en: 'Start Trust Journey Now'
    }
  },
  faq: {
    ar: [
      {
        q: 'هل العينات مجانية؟',
        a: 'نعم، العينات الفنية (حتى 50 كجم) مجانية لعملائنا الجادين لبناء مسار الثقة.'
      },
      {
        q: 'ما هي طرق الدفع المقبولة؟',
        a: 'نلتزم بشروط الدفع الآمنة بشكل رئيسي عبر الاعتمادات المستندية (LC at sight).'
      },
      {
        q: 'هل تقدمون خدمات التخليص الجمركي؟',
        a: 'نعم، نحن نقدم الدعم اللازم بالتعاون مع شركائنا المحليين في الموانئ المستهدفة لضمان وصول سلس.'
      },
      {
        q: 'هل يمكن تعديل المواصفات حسب الطلب؟',
        a: 'منتجنا يطابق أعلى المعايير العالمية بشكل ثابت، يمكننا مناقشة التفاصيل لبعض المتطلبات الخاصة للكميات الكبيرة.'
      },
      {
        q: 'ما مدة صلاحية العرض السعري؟',
        a: 'نظراً لتغير أسعار الشحن والخدمات اللوجستية، تتراوح صلاحية العروض بين 7 إلى 14 يوماً.'
      }
    ],
    en: [
      {
        q: 'Are samples free?',
        a: 'Yes, technical samples (up to 50 kg) are free for serious clients to build the trust journey.'
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We adhere to secure payment terms, primarily via Letters of Credit (LC at sight).'
      },
      {
        q: 'Do you offer customs clearance services?',
        a: 'Yes, we provide necessary support in collaboration with our local partners at target ports for seamless delivery.'
      },
      {
        q: 'Can specifications be customized upon request?',
        a: 'Our product consistently matches the highest global standards. We can discuss specific details for bulk orders.'
      },
      {
        q: 'How long is the quotation valid?',
        a: 'Due to fluctuations in shipping and logistics, quotes are usually valid for 7 to 14 days.'
      }
    ]
  },
  contact: {
    title: {
      ar: 'تواصل وطلب عرض',
      en: 'Contact & Request Quote'
    },
    fields: {
      company: { ar: 'اسم الشركة', en: 'Company Name' },
      countryPort: { ar: 'الدولة والميناء', en: 'Country & Port' },
      quantity: { ar: 'الكمية المطلوبة', en: 'Required Quantity' },
      email: { ar: 'البريد الإلكتروني', en: 'Email' },
      phone: { ar: 'رقم الهاتف / واتساب', en: 'Phone / WhatsApp' },
      notes: { ar: 'ملاحظات إضافية', en: 'Additional Notes' }
    },
    submitBtn: {
      ar: 'إرسال الطلب',
      en: 'Submit Request'
    },
    successMsg: {
      ar: 'تم استلام طلبكم بنجاح. سنتواصل معكم قريباً.',
      en: 'Your request has been received successfully. We will contact you soon.'
    },
    btnSavePdf: {
      ar: 'حفظ العرض كملف PDF',
      en: 'Save Request as PDF'
    },
    info: {
      email: 'info@tasami-industrial.com',
      phone: '+966 XX XXX XXXX',
      address: {
        ar: 'جدة – المملكة العربية السعودية',
        en: 'Jeddah - Kingdom of Saudi Arabia'
      }
    }
  },
  footer: {
    links: {
      ar: ['سياسة الخصوصية', 'الشروط والأحكام', 'الشهادات'],
      en: ['Privacy Policy', 'Terms & Conditions', 'Certifications']
    },
    text: {
      ar: 'عضو في اتحاد منتجي الأسمنت السعودي | مرخص من الهيئة العامة للتجارة الخارجية',
      en: 'Member of the Saudi Cement Producers Association | Licensed by the General Authority for Foreign Trade'
    },
    tagline: {
      ar: 'تسامي الصناعية – نرتقي بمستوى التوريد الصناعي',
      en: 'TASAMI INDUSTRIAL – Elevating Industrial Supply'
    },
    badge: {
      ar: 'صنع في السعودية',
      en: 'Made in Saudi Arabia'
    }
  }
};
