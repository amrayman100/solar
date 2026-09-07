export type TrackRecordProject = {
  slug: string;
  title: string;
  systemType: string;
  power: string;
  location: string;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  relatedProductPath: string;
};

export const TRACK_RECORD_PROJECTS: TrackRecordProject[] = [
  {
    slug: "13kw-grid-tied-sheikh-zayed",
    title: "13 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "13 KW",
    location: "Sheikh Zayed, Egypt",
    image: "/track-record-13kw.jpg",
    imageAlt: "13kW grid-tied solar installation in Sheikh Zayed, Egypt by Bolt Energy",
    summary:
      "Residential grid-tied solar system in Sheikh Zayed delivering reliable on-grid generation and lower electricity bills.",
    highlights: [
      "Grid-tied net metering configuration",
      "Designed for residential consumption profile",
      "Professional installation and commissioning in Sheikh Zayed",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "192kw-backup-new-administrative-capital",
    title: "192 kW Backup Solar System",
    systemType: "Back-up System",
    power: "192 KW",
    location: "New Administrative Capital, Egypt",
    image: "/track-record-192kw.jpg",
    imageAlt: "192kW backup solar system in New Administrative Capital, Egypt by Bolt Energy",
    summary:
      "Large-scale backup solar installation supporting critical loads at a commercial property in Egypt's New Administrative Capital.",
    highlights: [
      "High-capacity backup architecture",
      "Engineered for commercial reliability",
      "Full commissioning and performance verification",
    ],
    relatedProductPath: "/product/off-grid",
  },
  {
    slug: "16kw-grid-tied-allegria-sheikh-zayed",
    title: "16 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "16 KW",
    location: "Allegria, Sheikh Zayed, Egypt",
    image: "/track-record-16kw.jpg",
    imageAlt: "16kW grid-tied solar installation in Allegria, Sheikh Zayed, Egypt",
    summary:
      "Premium residential solar project in Allegria, Sheikh Zayed, optimized for high daytime consumption and grid export.",
    highlights: [
      "Tailored system sizing for villa load profile",
      "Clean rooftop integration",
      "Grid-tied inverter and monitoring setup",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "30kw-grid-tied-pyramid-hills",
    title: "30 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "30 KW",
    location: "Pyramid Hills, Egypt",
    image: "/track-record-30kw.jpg",
    imageAlt: "30kW grid-tied solar installation in Pyramid Hills, Egypt by Bolt Energy",
    summary:
      "Mid-size grid-tied solar deployment in Pyramid Hills helping the client offset a significant share of annual electricity costs.",
    highlights: [
      "30 kW capacity for sustained daily generation",
      "Net metering ready configuration",
      "Installed and supported by Bolt Energy engineering team",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "50kw-grid-tied-sheikh-zayed",
    title: "50 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "50 KW",
    location: "Sheikh Zayed, Egypt",
    image: "/track-record-50kw.jpg",
    imageAlt: "50kW grid-tied solar installation in Sheikh Zayed, Egypt",
    summary:
      "Commercial-scale 50 kW grid-tied system in Sheikh Zayed designed for high energy throughput and long-term savings.",
    highlights: [
      "Commercial-grade component selection",
      "Optimized array layout for production",
      "End-to-end project delivery by Bolt Energy",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "9-5kw-grid-tied-sheikh-zayed",
    title: "9.5 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "9.5 KW",
    location: "Sheikh Zayed, Egypt",
    image: "/track-record-9.5kw.jpg",
    imageAlt: "9.5kW grid-tied solar installation in Sheikh Zayed, Egypt",
    summary:
      "Compact 9.5 kW residential solar system in Sheikh Zayed offering strong return on investment for a typical home.",
    highlights: [
      "Right-sized for residential rooftop space",
      "Fast installation timeline",
      "Lower monthly electricity spend from day one",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "120kw-grid-tied-sheikh-zayed",
    title: "120 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "120 KW",
    location: "Sheikh Zayed, Egypt",
    image: "/track-record-120kw-sheikh.jpg",
    imageAlt: "120kW grid-tied solar installation in Sheikh Zayed, Egypt",
    summary:
      "Large 120 kW grid-tied installation in Sheikh Zayed supporting substantial commercial energy demand with solar generation.",
    highlights: [
      "Enterprise-scale solar array",
      "Engineering study and structural assessment",
      "Monitoring and post-installation support",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "120kw-grid-tied-giza",
    title: "120 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "120 KW",
    location: "Giza, Egypt",
    image: "/track-record-120kw-giza.jpg",
    imageAlt: "120kW grid-tied solar installation in Giza, Egypt by Bolt Energy",
    summary:
      "120 kW solar project in Giza demonstrating Bolt Energy's capability to deliver high-capacity on-grid systems across Greater Cairo.",
    highlights: [
      "High-output commercial installation",
      "Local Giza engineering and installation team",
      "Designed for maximum daytime offset",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "12kw-grid-tied-giza",
    title: "12 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "12 KW",
    location: "Giza, Egypt",
    image: "/track-record-12kw.jpg",
    imageAlt: "12kW grid-tied solar installation in Giza, Egypt",
    summary:
      "12 kW residential grid-tied system in Giza helping homeowners reduce dependence on rising utility tariffs.",
    highlights: [
      "Residential rooftop solar design",
      "Grid integration and permitting support",
      "Competitive installation cost structure",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "20kw-grid-tied-new-cairo",
    title: "20 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "20 KW",
    location: "New Cairo, Egypt",
    image: "/track-record-20kw.jpg",
    imageAlt: "20kW grid-tied solar installation in New Cairo, Egypt by Bolt Energy",
    summary:
      "20 kW solar installation in New Cairo built for a high-consumption home seeking long-term energy cost stability.",
    highlights: [
      "Sized for New Cairo villa energy profiles",
      "Quality panels and inverter pairing",
      "Professional handover and client training",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "9kw-grid-tied-new-cairo",
    title: "9 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "9 KW",
    location: "New Cairo, Egypt",
    image: "/drone-4-1.jpeg",
    imageAlt: "9kW grid-tied solar installation in New Cairo, Egypt",
    summary:
      "Efficient 9 kW grid-tied system in New Cairo providing meaningful bill reduction with a compact rooftop footprint.",
    highlights: [
      "Efficient use of available roof area",
      "Grid-tied savings without battery complexity",
      "Installed by Bolt Energy certified technicians",
    ],
    relatedProductPath: "/product/grid-tied",
  },
  {
    slug: "120kw-grid-tied-el-khatatba",
    title: "120 kW Grid-Tied Solar Installation",
    systemType: "Grid Tied System",
    power: "120 KW",
    location: "El Khatatba, Egypt",
    image: "/track-record-120kw-khatatba.jpg",
    imageAlt: "120kW grid-tied solar installation in El Khatatba, Egypt",
    summary:
      "Industrial-scale 120 kW solar deployment in El Khatatba supporting operational energy needs with on-site generation.",
    highlights: [
      "Industrial-grade solar engineering",
      "Remote site installation capability",
      "Durable system design for demanding environments",
    ],
    relatedProductPath: "/product/grid-tied",
  },
];

export type ResourceArticle = {
  slug: string;
  title: string;
  description: string;
  lang: "en" | "ar";
  alternateSlug?: string;
  publishedAt: string;
  sections: { heading?: string; paragraphs: string[] }[];
  relatedLinks: { href: string; label: string }[];
  ctaPath: string;
  ctaLabel: string;
};

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: "solar-panel-cost-egypt-2026",
    title: "How Much Do Solar Panels Cost in Egypt? (2026 Price Guide)",
    description:
      "A practical 2026 guide to solar panel system costs in Egypt — residential, commercial, and what drives your final quote.",
    lang: "en",
    alternateSlug: "asrar-alawah-alshamsiya-fi-misr-2026",
    publishedAt: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "Solar panel costs in Egypt depend on system size, roof type, inverter brand, mounting complexity, and whether you choose grid-tied or battery backup. In 2026, most homeowners installing grid-tied systems should budget based on kW capacity rather than panel count alone.",
          "Bolt Energy provides free technical studies so you receive a site-specific quote instead of a generic per-panel estimate.",
        ],
      },
      {
        heading: "Typical cost ranges in Egypt (2026)",
        paragraphs: [
          "Residential grid-tied systems (5–20 kW) are commonly quoted based on EGP per kW installed, including panels, inverter, mounting, cabling, protection, and labour. Larger homes and villas in Sheikh Zayed, New Cairo, and Giza often land in the 10–30 kW range.",
          "Commercial systems (30–200+ kW) benefit from economies of scale but require more engineering for structural load, cable routing, and EgyptERA grid integration.",
          "Off-grid and hybrid systems cost more per kW because batteries, charge controllers, and backup architecture add hardware and design complexity.",
        ],
      },
      {
        heading: "What affects your final price",
        paragraphs: [
          "Roof condition and shading: partial shading or weak structures can increase mounting and design costs.",
          "Consumption profile: higher evening loads may push you toward larger arrays or hybrid storage.",
          "Grid integration fees: net-metering applications and utility coordination are part of the total project cost.",
          "Component tier: premium inverters and Tier-1 panels improve longevity but raise upfront investment.",
        ],
      },
      {
        heading: "How to get an accurate quote",
        paragraphs: [
          "Use Bolt Energy's free solar calculator for a preliminary grid-tied estimate, then schedule a technical visit for a final engineered proposal. A proper quote should include generation forecast, payback estimate, warranty terms, and commissioning plan.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "Grid-tied solar systems" },
      { href: "/product/off-grid", label: "Off-grid solar systems" },
      { href: "/resources/net-metering-egypt", label: "Net metering in Egypt" },
    ],
    ctaPath: "/product/grid-tied",
    ctaLabel: "Calculate your solar quote",
  },
  {
    slug: "asrar-alawah-alshamsiya-fi-misr-2026",
    title: "أسعار الألواح الشمسية في مصر (دليل 2026)",
    description:
      "دليل عملي لأسعار أنظمة الطاقة الشمسية في مصر لعام 2026 — للمنازل والشركات والعوامل التي تحدد التكلفة النهائية.",
    lang: "ar",
    alternateSlug: "solar-panel-cost-egypt-2026",
    publishedAt: "2026-06-01",
    sections: [
      {
        paragraphs: [
          "تختلف تكلفة الألواح الشمسية في مصر حسب حجم النظام ونوع السطح وماركة الإنفرتر وتعقيد التركيب واختيارك بين النظام المتصل بالشبكة أو نظام البطاريات. في 2026، الأفضل التخطيط حسب القدرة بالكيلووات وليس عدد الألواح فقط.",
          "تقدم بولت إنرجي دراسة فنية مجانية للحصول على عرض سعر مخصص لموقعك بدلاً من تقدير عام.",
        ],
      },
      {
        heading: "نطاقات الأسعار الشائعة في مصر (2026)",
        paragraphs: [
          "أنظمة المنازل المتصلة بالشبكة (5–20 كيلووات) تُسعَّر عادة بالجنيه لكل كيلووات مثبتة شاملة الألواح والإنفرتر والهيكل والكابلات والحماية والتركيب.",
          "الأنظمة التجارية (30–200+ كيلووات) تحقق وفورات حجمية لكنها تحتاج هندسة إضافية للحمل الإنشائي وربط الشبكة عبر مصرERA.",
          "أنظمة خارج الشبكة والهجينة أغلى لكل كيلووات بسبب البطاريات ومعمارية النسخ الاحتياطي.",
        ],
      },
      {
        heading: "كيف تحصل على عرض دقيق",
        paragraphs: [
          "استخدم حاسبة بولت إنرجي المجانية لتقدير أولي، ثم احجز زيارة فنية للحصول على عرض هندسي نهائي يتضمن توقع الإنتاج وفترة الاسترداد والضمان.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "أنظمة متصلة بالشبكة" },
      { href: "/resources/solar-panel-cost-egypt-2026", label: "English version" },
    ],
    ctaPath: "/contact-us",
    ctaLabel: "اطلب عرض سعر مجاني",
  },
  {
    slug: "net-metering-egypt",
    title: "Net Metering in Egypt: How Grid-Tied Credits Work",
    description:
      "Understand EgyptERA net metering rules, grid integration fees, and how grid-tied solar offsets your electricity bill in Egypt.",
    lang: "en",
    publishedAt: "2026-06-02",
    sections: [
      {
        paragraphs: [
          "Net metering allows grid-tied solar owners in Egypt to export surplus daytime generation to the utility grid and receive credits against future consumption. It is the foundation of most residential and commercial solar economics in Egypt.",
        ],
      },
      {
        heading: "How credits work",
        paragraphs: [
          "When your solar array produces more than your property consumes, the excess flows through a bidirectional meter. Credits accumulate and offset electricity drawn from the grid at night or on cloudy days.",
          "System sizing should match your annual consumption profile — oversizing without approval can limit export benefits.",
        ],
      },
      {
        heading: "EgyptERA and grid integration",
        paragraphs: [
          "Grid-tied projects must comply with EgyptERA technical requirements, including inverter standards, protection schemes, and application paperwork. A reputable installer handles permitting, inspection, and commissioning coordination.",
          "Grid integration fees and timeline vary by distributor and project size. Factor these into your payback calculation.",
        ],
      },
      {
        heading: "Is net metering right for you?",
        paragraphs: [
          "If you have stable grid access and consume most energy at home or on-site, grid-tied solar with net metering is usually the most cost-effective path. Bolt Energy designs, installs, and supports grid-tied systems across Giza, Cairo, and nationwide.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "Grid-tied solar systems" },
      { href: "/resources/off-grid-vs-grid-tied-egypt", label: "Off-grid vs grid-tied" },
    ],
    ctaPath: "/product/grid-tied",
    ctaLabel: "Explore grid-tied solutions",
  },
  {
    slug: "solar-irrigation-farms-egypt",
    title: "Solar for Farms: Solar Irrigation in Egypt",
    description:
      "How solar-powered irrigation cuts farm electricity costs, improves water reliability, and supports sustainable agriculture in Egypt.",
    lang: "en",
    publishedAt: "2026-06-03",
    sections: [
      {
        paragraphs: [
          "Agricultural electricity costs are a major operating expense for Egyptian farms. Solar irrigation replaces diesel generators and grid pumps with sun-powered pumping, cutting fuel costs and improving uptime in remote areas.",
        ],
      },
      {
        heading: "Benefits for Egyptian farms",
        paragraphs: [
          "Lower operating cost: sunshine is free once the system is installed.",
          "Water reliability: pumps run during peak solar hours when irrigation is most needed.",
          "Sustainability: reduce diesel emissions and grid dependence.",
          "Scalability: systems from small holdings to large commercial farms.",
        ],
      },
      {
        heading: "System design considerations",
        paragraphs: [
          "Pump horsepower, well depth, daily water volume, and storage determine solar array and inverter sizing. Bolt Energy engineers irrigation systems for farms across Egypt including off-grid and hybrid configurations.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/solar-irrigation", label: "Solar irrigation systems" },
      { href: "/projects/30kw-grid-tied-pyramid-hills", label: "See our installations" },
    ],
    ctaPath: "/product/solar-irrigation",
    ctaLabel: "Get a solar irrigation quote",
  },
  {
    slug: "off-grid-vs-grid-tied-egypt",
    title: "Off-Grid vs Grid-Tied Solar: Which Is Right for Your Home?",
    description:
      "Compare off-grid and grid-tied solar in Egypt — costs, reliability, batteries, and which option fits your home or business.",
    lang: "en",
    publishedAt: "2026-06-04",
    sections: [
      {
        paragraphs: [
          "Choosing between off-grid and grid-tied solar in Egypt depends on grid reliability, your budget, backup needs, and how you use electricity throughout the day.",
        ],
      },
      {
        heading: "Grid-tied solar",
        paragraphs: [
          "Best for: homes and businesses with reliable grid access seeking maximum ROI.",
          "Pros: lower upfront cost, net metering credits, simpler maintenance.",
          "Cons: no power during grid outages unless you add a hybrid battery.",
        ],
      },
      {
        heading: "Off-grid solar",
        paragraphs: [
          "Best for: remote sites, farms, and properties needing backup independence.",
          "Pros: energy autonomy, no utility dependency, reliable backup.",
          "Cons: higher cost due to batteries, requires careful load management.",
        ],
      },
      {
        heading: "The hybrid middle ground",
        paragraphs: [
          "Many Egyptian villas combine grid-tied savings with battery backup for evening loads and outages. Bolt Energy designs both pure off-grid and grid-tied systems — contact us for a free study.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "Grid-tied systems" },
      { href: "/product/off-grid", label: "Off-grid systems" },
    ],
    ctaPath: "/contact-us",
    ctaLabel: "Get a free solar study",
  },
  {
    slug: "reduce-electricity-bill-zero-solar-egypt",
    title: "How to Reduce Your Electricity Bill to Zero with Solar in Egypt",
    description:
      "Practical steps to size a solar system that eliminates your electricity bill in Egypt using grid-tied net metering.",
    lang: "en",
    publishedAt: "2026-06-05",
    sections: [
      {
        paragraphs: [
          "Zero-bill solar in Egypt is achievable for many homes when system size, consumption timing, and net metering credits are aligned. The goal is to generate enough annual kWh to offset what you draw from the grid.",
        ],
      },
      {
        heading: "Step 1: Understand your consumption",
        paragraphs: [
          "Review 12 months of electricity bills. Note peak kWh months (summer AC load) and average monthly spend. Bolt Energy's calculator uses your consumption to estimate required system size.",
        ],
      },
      {
        heading: "Step 2: Size the system correctly",
        paragraphs: [
          "Oversizing wastes capital; undersizing leaves bill remainder. A professional study accounts for roof area, shading, inverter efficiency, and degradation over 25 years.",
        ],
      },
      {
        heading: "Step 3: Install and commission",
        paragraphs: [
          "Bolt Energy handles design, installation, EgyptERA coordination, and commissioning — typically within two weeks of approval. Monitor production to verify you are hitting generation targets.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "Grid-tied calculator" },
      { href: "/resources/solar-panel-cost-egypt-2026", label: "2026 solar costs" },
    ],
    ctaPath: "/product/grid-tied",
    ctaLabel: "Start your free quote",
  },
  {
    slug: "taqa-shamsiya-lil-manazel-misr",
    title: "الطاقة الشمسية للمنازل في مصر: دليل شامل",
    description:
      "كل ما تحتاج معرفته عن الطاقة الشمسية للمنازل في مصر — التكلفة، الربط بالشبكة، والتوفير على فاتورة الكهرباء.",
    lang: "ar",
    alternateSlug: "reduce-electricity-bill-zero-solar-egypt",
    publishedAt: "2026-06-05",
    sections: [
      {
        paragraphs: [
          "أصبحت الطاقة الشمسية للمنازل في مصر خياراً عملياً لتقليل فاتورة الكهرباء والاستقلالية عن ارتفاع التعريفات. مع نظام متصل بالشبكة وعداد صافي، يمكن لكثير من المنازل الوصول لتوفير يصل إلى 70% أو أكثر.",
        ],
      },
      {
        heading: "لماذا الطاقة الشمسية للمنازل؟",
        paragraphs: [
          "توفير شهري على الفاتورة، زيادة قيمة العقار، طاقة نظيفة، ودعم متاح للربط بالشبكة عبر الجهات المختصة.",
        ],
      },
      {
        heading: "كيف تبدأ",
        paragraphs: [
          "احسب استهلاكك السنوي، اطلب دراسة فنية مجانية من بولت إنرجي، ثم ركّب النظام واحصل على المتابعة بعد التشغيل.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/product/grid-tied", label: "أنظمة متصلة بالشبكة" },
      { href: "/resources/asrar-alawah-alshamsiya-fi-misr-2026", label: "أسعار 2026" },
    ],
    ctaPath: "/contact-us",
    ctaLabel: "تواصل معنا",
  },
];

export function getProjectBySlug(slug: string) {
  return TRACK_RECORD_PROJECTS.find((p) => p.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return RESOURCE_ARTICLES.find((a) => a.slug === slug);
}

export const RELATED_PRODUCTS = [
  { href: "/product/grid-tied", label: "Grid-Tied Solar", description: "Net metering and bill reduction" },
  { href: "/product/off-grid", label: "Off-Grid Solar", description: "Energy independence with batteries" },
  { href: "/product/solar-irrigation", label: "Solar Irrigation", description: "Farm and agricultural pumping" },
  { href: "/product/solar-heating", label: "Solar Heating", description: "Hot water and pool heating" },
] as const;
