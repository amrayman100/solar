export type ProductPageContent = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  heading: string;
  subheading: string;
  intro: string;
  sections: Array<{ title: string; items: string[] }>;
  moreLabel?: string;
  more?: Array<{ href: string; label: string }>;
  cta: string;
  schemaKey?: "grid-tied" | "off-grid" | "solar-irrigation" | "solar-heating";
  /** Partial Arabic overrides (meta + hero first; full body can be added later). */
  ar?: Partial<
    Pick<
      ProductPageContent,
      | "title"
      | "metaTitle"
      | "metaDescription"
      | "keywords"
      | "imageAlt"
      | "heading"
      | "subheading"
      | "intro"
      | "sections"
      | "moreLabel"
      | "more"
      | "cta"
    >
  >;
};

export function pickLocaleContent(
  content: ProductPageContent,
  locale: string
): ProductPageContent {
  if (locale !== "ar" || !content.ar) return content;
  const { ar: _ar, ...rest } = content;
  return { ...rest, ...content.ar };
}

export const PRODUCT_PAGES: Record<string, ProductPageContent> = {
  "grid-tied": {
    slug: "grid-tied",
    path: "/product/grid-tied",
    title: "Grid-Tied Solar Systems Egypt | Net Metering & Bill Reduction",
    metaTitle: "Grid-Tied Solar Systems Egypt | Net Metering & Bill Reduction",
    metaDescription:
      "Grid-tied solar systems in Egypt with net metering. Generate your own electricity, send excess to the grid for credits, and reduce your energy bills with Bolt Energy.",
    keywords: [
      "grid tied solar egypt",
      "net metering egypt",
      "solar panels egypt",
      "grid connected solar",
    ],
    image: "/grid-tied.jpeg",
    imageAlt: "Grid-tied solar panel system installation in Egypt by Bolt Energy",
    heading: "Grid-Tied Solar Systems in Egypt",
    subheading: "Harness the Sun's Power for Free!",
    intro:
      "Grid-tied solar systems are a smart investment that can significantly reduce your electricity bills. By harnessing the sun's energy, you can generate your own electricity and send any excess back to the grid for credits.",
    sections: [
      {
        title: "Key benefits:",
        items: [
          "Lower electricity bills: Reduce your reliance on the grid and save money on energy costs.",
          "Environmental friendly: Contribute to a cleaner planet by reducing your carbon footprint.",
          "Easy installation: Grid-tied systems are relatively easy to install and require minimal maintenance.",
        ],
      },
      {
        title: "How it works:",
        items: [
          "Solar panels: Capture sunlight and convert it into electricity.",
          "Inverter: Converts DC power from the panels into AC power for your home.",
          "Net Meter: Excess electricity is sent back to the grid for credits.",
        ],
      },
    ],
    moreLabel: "Learn more:",
    more: [
      { href: "/resources/net-metering-egypt", label: "Net metering in Egypt" },
      { href: "/resources/solar-panel-cost-egypt-2026", label: "2026 solar panel costs" },
    ],
    cta: "Ready to start saving money and the environment?",
    schemaKey: "grid-tied",
    ar: {
      title: "أنظمة الطاقة الشمسية المتصلة بالشبكة في مصر | صافي القياس وخفض الفاتورة",
      metaTitle: "أنظمة الطاقة الشمسية المتصلة بالشبكة في مصر | صافي القياس وخفض الفاتورة",
      metaDescription:
        "أنظمة طاقة شمسية متصلة بالشبكة في مصر مع صافي القياس. ولّد كهرباءك، أرسل الفائض للشبكة مقابل أرصدة، وخفّض فاتورتك مع بولت إنرجي.",
      keywords: [
        "طاقة شمسية على الشبكة مصر",
        "صافي القياس مصر",
        "ألواح شمسية مصر",
        "grid tied solar egypt",
      ],
      imageAlt: "تركيب نظام ألواح شمسية متصل بالشبكة في مصر من بولت إنرجي",
      heading: "أنظمة الطاقة الشمسية المتصلة بالشبكة في مصر",
      subheading: "استغل طاقة الشمس مجاناً!",
      intro:
        "أنظمة الطاقة الشمسية المتصلة بالشبكة استثمار ذكي يمكنه خفض فواتير الكهرباء بشكل كبير. باستغلال طاقة الشمس يمكنك توليد كهربائك وإرسال أي فائض إلى الشبكة مقابل أرصدة.",
      sections: [
        {
          title: "المزايا الرئيسية:",
          items: [
            "فواتير كهرباء أقل: قلّل اعتمادك على الشبكة ووفّر في تكاليف الطاقة.",
            "صديقة للبيئة: ساهم في كوكب أنظف بتقليل بصمتك الكربونية.",
            "تركيب سهل: الأنظمة المتصلة بالشبكة سهلة التركيب نسبياً وتتطلب صيانة بسيطة.",
          ],
        },
        {
          title: "كيف تعمل:",
          items: [
            "الألواح الشمسية: تلتقط ضوء الشمس وتحوّله إلى كهرباء.",
            "العاكس: يحوّل تيار المستمر من الألواح إلى تيار متردد لمنزلك.",
            "عداد صافي القياس: يُرسل فائض الكهرباء إلى الشبكة مقابل أرصدة.",
          ],
        },
      ],
      moreLabel: "اعرف المزيد:",
      more: [
        { href: "/resources/net-metering-egypt", label: "صافي القياس في مصر" },
        { href: "/resources/solar-panel-cost-egypt-2026", label: "أسعار الألواح الشمسية ٢٠٢٦" },
      ],
      cta: "هل أنت مستعد لتوفير المال وحماية البيئة؟",
    },
  },
  "off-grid": {
    slug: "off-grid",
    path: "/product/off-grid",
    title: "Off-Grid Solar Systems Egypt | Energy Independence & Backup",
    metaTitle: "Off-Grid Solar Systems Egypt | Energy Independence & Backup",
    metaDescription:
      "Off-grid solar power systems with battery storage in Egypt. Energy independence, backup power, and reliable electricity for remote homes and businesses.",
    keywords: ["off grid solar egypt", "solar battery egypt", "backup solar egypt"],
    image: "/offgrid-ai.png",
    imageAlt: "Off-grid solar system with battery backup in Egypt by Bolt Energy",
    heading: "Off-Grid Solar Solutions in Egypt",
    subheading: "Be Energy Independent",
    intro:
      "Backup solar off-grid systems are your ticket to energy independence. Imagine never worrying about power outages or soaring electricity bills again!",
    sections: [
      {
        title: "How it works:",
        items: [
          "Solar Panels: Capture sunlight and convert it into electricity.",
          "Batteries: Store excess energy for use during cloudy days or at night.",
          "Inverter: Converts DC power from the panels and batteries into AC power for your appliances.",
        ],
      },
      {
        title: "Benefits:",
        items: [
          "Reliability: Never be left in the dark again, even during power outages.",
          "Cost Savings: Reduce your reliance on grid electricity and save money on energy bills.",
          "Sustainability: Harness clean, renewable energy for a greener future.",
          "Versatility: Perfect for homes, businesses, and remote locations.",
        ],
      },
    ],
    moreLabel: "Compare options:",
    more: [{ href: "/resources/off-grid-vs-grid-tied-egypt", label: "Off-grid vs grid-tied solar" }],
    cta: "Ready to take control of your energy future?",
    schemaKey: "off-grid",
    ar: {
      title: "أنظمة الطاقة الشمسية المستقلة في مصر | استقلال طاقي واحتياطي",
      metaTitle: "أنظمة الطاقة الشمسية المستقلة في مصر | استقلال طاقي واحتياطي",
      metaDescription:
        "أنظمة طاقة شمسية مستقلة مع تخزين بطاريات في مصر. استقلال طاقي، طاقة احتياطية، وكهرباء موثوقة للمنازل والأعمال البعيدة.",
      keywords: [
        "طاقة شمسية خارج الشبكة مصر",
        "بطاريات شمسية مصر",
        "طاقة شمسية احتياطية مصر",
        "off grid solar egypt",
      ],
      imageAlt: "نظام طاقة شمسية مستقل مع بطاريات احتياطية في مصر من بولت إنرجي",
      heading: "حلول الطاقة الشمسية المستقلة في مصر",
      subheading: "كن مستقلاً طاقياً",
      intro:
        "أنظمة الطاقة الشمسية المستقلة مع التخزين هي طريقك للاستقلال الطاقي. تخيّل ألا تقلق بعد اليوم من انقطاع الكهرباء أو ارتفاع الفواتير!",
      sections: [
        {
          title: "كيف تعمل:",
          items: [
            "الألواح الشمسية: تلتقط ضوء الشمس وتحوّله إلى كهرباء.",
            "البطاريات: تخزّن الطاقة الفائضة للاستخدام في الأيام الغائمة أو ليلاً.",
            "العاكس: يحوّل تيار المستمر من الألواح والبطاريات إلى تيار متردد لأجهزتك.",
          ],
        },
        {
          title: "المزايا:",
          items: [
            "الموثوقية: لن تبقى في الظلام حتى أثناء انقطاع الكهرباء.",
            "توفير التكلفة: قلّل اعتمادك على كهرباء الشبكة ووفّر في الفواتير.",
            "الاستدامة: استغل طاقة نظيفة ومتجددة لمستقبل أخضر.",
            "المرونة: مثالية للمنازل والأعمال والمواقع النائية.",
          ],
        },
      ],
      moreLabel: "قارن الخيارات:",
      more: [
        { href: "/resources/off-grid-vs-grid-tied-egypt", label: "مستقلة مقابل متصلة بالشبكة" },
      ],
      cta: "هل أنت مستعد للتحكم في مستقبلك الطاقي؟",
    },
  },
  "solar-irrigation": {
    slug: "solar-irrigation",
    path: "/product/solar-irrigation",
    title: "Solar Irrigation Systems Egypt | Farm & Agricultural Solar",
    metaTitle: "Solar Irrigation Systems Egypt | Farm & Agricultural Solar",
    metaDescription:
      "Solar-powered irrigation for farms in Egypt. Cut pumping costs, improve water reliability, and power agricultural operations with Bolt Energy.",
    keywords: ["solar irrigation egypt", "solar farm egypt", "solar pumping egypt"],
    image: "/solar-irrig.jpg",
    imageAlt: "Solar-powered irrigation system for agricultural farms in Egypt",
    heading: "Solar Irrigation Systems for Farms in Egypt",
    subheading:
      "Imagine growing healthier crops, saving money, and becoming more eco-friendly – all at the same time.",
    intro:
      "Solar irrigation makes it possible! Harness the power of the sun to irrigate your crops, saving you money and helping the planet.",
    sections: [
      {
        title: "Key benefits:",
        items: [
          "Slash Electricity Bills: Ditch the grid and power your irrigation system with free sunshine. Sun = Savings!",
          "Drought-Proof Your Farm: Reliable access to water, even in remote areas or during power outages.",
          "Sustainable Superhero: Reduce your farm's carbon footprint and leave a lighter footprint on the planet.",
          "Boost Crop Quality: Consistent watering leads to healthier, more vibrant crops that fetch premium prices.",
        ],
      },
    ],
    moreLabel: "Read our guide:",
    more: [
      { href: "/resources/solar-irrigation-farms-egypt", label: "Solar irrigation for farms in Egypt" },
    ],
    cta: "Solar irrigation is an investment that pays you back in sunshine and success.",
    schemaKey: "solar-irrigation",
    ar: {
      title: "أنظمة الري الشمسي في مصر | طاقة شمسية للمزارع والزراعة",
      metaTitle: "أنظمة الري الشمسي في مصر | طاقة شمسية للمزارع والزراعة",
      metaDescription:
        "ري بالطاقة الشمسية للمزارع في مصر. خفّض تكاليف الضخ، حسّن موثوقية المياه، وشغّل العمليات الزراعية مع بولت إنرجي.",
      keywords: [
        "ري شمسي مصر",
        "طاقة شمسية للمزارع مصر",
        "ضخ شمسي مصر",
        "solar irrigation egypt",
      ],
      imageAlt: "نظام ري يعمل بالطاقة الشمسية للمزارع الزراعية في مصر",
      heading: "أنظمة الري الشمسي للمزارع في مصر",
      subheading: "تخيّل محاصيل أوفر صحة، وتوفيراً في التكلفة، ومزرعة أكثر صداقة للبيئة — في آنٍ واحد.",
      intro:
        "الري الشمسي يجعل ذلك ممكناً! استغل طاقة الشمس لري محاصيلك، ووفّر المال وساهم في حماية الكوكب.",
      sections: [
        {
          title: "المزايا الرئيسية:",
          items: [
            "خفّض فواتير الكهرباء: اترك الشبكة وشبّك نظام الري بأشعة الشمس المجانية. الشمس = توفير!",
            "مزرعتك محصّنة من الجفاف: وصول موثوق للمياه حتى في المناطق النائية أو أثناء انقطاع الكهرباء.",
            "خيار مستدام: قلّل البصمة الكربونية لمزرعتك واترك أثراً أخف على الكوكب.",
            "جودة محاصيل أعلى: الري المنتظم ينتج محاصيل أوفر صحة وحيوية بأسعار أفضل.",
          ],
        },
      ],
      moreLabel: "اقرأ دليلنا:",
      more: [
        { href: "/resources/solar-irrigation-farms-egypt", label: "الري الشمسي للمزارع في مصر" },
      ],
      cta: "الري الشمسي استثمار يعود عليك بالشمس والنجاح.",
    },
  },
  "solar-heating": {
    slug: "solar-heating",
    path: "/product/solar-heating",
    title: "Solar Heating Systems Egypt | Hot Water & Pool Heating",
    metaTitle: "Solar Heating Systems Egypt | Hot Water & Pool Heating",
    metaDescription:
      "Solar water heating and pool heating systems in Egypt. Reduce gas and electric bills with renewable solar thermal solutions from Bolt Energy.",
    keywords: ["solar heating egypt", "solar hot water egypt", "solar pool heating"],
    image: "/solar-heat-ai.png",
    imageAlt: "Solar water and pool heating system installation in Egypt",
    heading: "Solar Heating Solutions in Egypt",
    subheading: "Tired of Gas and Electric Bills, Smoke Them Out With Solar Heating!",
    intro:
      "This innovative system harnesses the power of the sun to provide hot water and pool heating, saving you money and helping the planet.",
    sections: [
      {
        title: "Key benefits:",
        items: [
          "Lower Energy Bills: Reduce your reliance on traditional water heaters and pool heaters. Sunshine is free, so are your savings!",
          "Endless Hot Water: Enjoy consistent hot showers and baths, even on cloudy days (with a backup system).",
          "Sustainable Choice: Go green and reduce your carbon footprint with a clean, renewable energy source.",
        ],
      },
    ],
    cta: "Ready to unlock the power of the sun?",
    schemaKey: "solar-heating",
    ar: {
      title: "أنظمة التسخين الشمسي في مصر | مياه ساخنة وتدفئة المسابح",
      metaTitle: "أنظمة التسخين الشمسي في مصر | مياه ساخنة وتدفئة المسابح",
      metaDescription:
        "أنظمة تسخين المياه والمسابح بالطاقة الشمسية في مصر. خفّض فواتير الغاز والكهرباء بحلول حرارية متجددة من بولت إنرجي.",
      keywords: [
        "تسخين شمسي مصر",
        "مياه ساخنة شمسية مصر",
        "تدفئة مسابح شمسية",
        "solar heating egypt",
      ],
      imageAlt: "تركيب نظام تسخين مياه ومسابح بالطاقة الشمسية في مصر",
      heading: "حلول التسخين الشمسي في مصر",
      subheading: "سئمت فواتير الغاز والكهرباء؟ استبدلها بالتسخين الشمسي!",
      intro:
        "هذا النظام المبتكر يستغل طاقة الشمس لتوفير المياه الساخنة وتدفئة المسابح، ليوفر عليك المال ويساعد الكوكب.",
      sections: [
        {
          title: "المزايا الرئيسية:",
          items: [
            "فواتير طاقة أقل: قلّل اعتمادك على سخانات المياه والمسابح التقليدية. أشعة الشمس مجانية، وكذلك توفيرك!",
            "مياه ساخنة بلا انقطاع: استمتع بدُش وحمام ساخن ثابت حتى في الأيام الغائمة (مع نظام احتياطي).",
            "اختيار مستدام: اختر الأخضر وقلّل بصمتك الكربونية بمصدر طاقة نظيف ومتجدد.",
          ],
        },
      ],
      cta: "هل أنت مستعد لاستغلال قوة الشمس؟",
    },
  },
  ev: {
    slug: "ev",
    path: "/product/ev",
    title: "EV Charging Stations Egypt | Home & Business EV Chargers",
    metaTitle: "EV Charging Stations Egypt | Home & Business EV Chargers",
    metaDescription:
      "EV charging solutions for homes and businesses in Egypt. Fast, convenient, and solar-compatible electric vehicle charging from Bolt Energy.",
    keywords: ["ev charger egypt", "electric vehicle charging egypt"],
    image: "/ev-ai.png",
    imageAlt: "Electric vehicle charging station for home and business in Egypt",
    heading: "EV Chargers",
    subheading: "Power Up Your Ride in a Flash: All About EV Chargers!",
    intro:
      "Electric vehicles (EVs) are the future, but what about fueling them? Enter EV chargers, your personal gas station at home or on the go!",
    sections: [
      {
        title: "Key benefits:",
        items: [
          "Fast & Convenient: No more waiting in line at gas stations. Plug in at home or a charging station and top up your battery quickly.",
          "Save Money: Electricity typically costs less than gas, so fill 'er up for less!",
          "Peace of Mind: Always know you have a way to recharge, no matter where your adventures take you.",
          "Eco-Friendly Choice: Power your car with clean electricity, reducing emissions and your impact on the environment.",
        ],
      },
      {
        title: "EV chargers come in all shapes and sizes:",
        items: [
          "Home Chargers: Install a charger in your garage for convenient overnight charging.",
          "Public Chargers: Find charging stations at malls, workplaces, and even along highways for on-the-go top-ups.",
          "Fast Chargers: These powerful stations can give your EV a significant boost in battery life in just minutes, perfect for long trips.",
        ],
      },
    ],
    cta: "EV chargers are an essential part of the electric vehicle revolution.",
    ar: {
      title: "محطات شحن السيارات الكهربائية في مصر | شواحن للمنازل والأعمال",
      metaTitle: "محطات شحن السيارات الكهربائية في مصر | شواحن للمنازل والأعمال",
      metaDescription:
        "حلول شحن السيارات الكهربائية للمنازل والأعمال في مصر. شحن سريع ومريح ومتوافق مع الطاقة الشمسية من بولت إنرجي.",
      keywords: [
        "شاحن سيارات كهربائية مصر",
        "شحن مركبات كهربائية مصر",
        "ev charger egypt",
      ],
      imageAlt: "محطة شحن سيارات كهربائية للمنازل والأعمال في مصر",
      heading: "شواحن السيارات الكهربائية",
      subheading: "اشحن سيارتك بسرعة: كل ما تحتاج معرفته عن شواحن السيارات الكهربائية!",
      intro:
        "السيارات الكهربائية هي المستقبل، لكن ماذا عن شحنها؟ شواحن السيارات الكهربائية هي محطتك الشخصية في المنزل أو أثناء التنقل!",
      sections: [
        {
          title: "المزايا الرئيسية:",
          items: [
            "سريعة ومريحة: لا مزيد من الانتظار في طوابير محطات الوقود. وصّل في المنزل أو محطة الشحن واملأ البطارية بسرعة.",
            "وفّر المال: الكهرباء عادة أرخص من البنزين، فاشحن بتكلفة أقل!",
            "راحة بال: اعرف دائماً أن لديك طريقة لإعادة الشحن أينما أخذتك مغامراتك.",
            "خيار صديق للبيئة: شغّل سيارتك بكهرباء نظيفة وقلّل الانبعاثات وأثرها على البيئة.",
          ],
        },
        {
          title: "شواحن السيارات الكهربائية بأنواع وأحجام مختلفة:",
          items: [
            "شواحن منزلية: ركّب شاحناً في الجراج للشحن المريح طوال الليل.",
            "شواحن عامة: اعثر على محطات في المولات وأماكن العمل وحتى على الطرق للشحن أثناء التنقل.",
            "شواحن سريعة: محطات قوية تمنح سيارتك دفعة كبيرة في دقائق، مثالية للرحلات الطويلة.",
          ],
        },
      ],
      cta: "شواحن السيارات الكهربائية جزء أساسي من ثورة المركبات الكهربائية.",
    },
  },
  construction: {
    slug: "construction",
    path: "/product/construction",
    title: "Solar Construction & Installation Egypt | Bolt Construction",
    metaTitle: "Solar Construction & Installation Egypt | Bolt Construction",
    metaDescription:
      "Professional solar construction and installation services in Egypt. Residential and commercial mounting, racking, and renewable energy infrastructure.",
    keywords: ["solar construction egypt", "solar installation egypt", "bolt construction"],
    image: "/contact-man.jpeg",
    imageAlt: "Bolt Construction solar installation team working on a project in Egypt",
    heading: "Construction",
    subheading: "Bolt construction is Bolt's civil and implementation arm.",
    intro:
      "Our expert team provides professional construction and installation services for solar projects and beyond.",
    sections: [
      {
        title: "Our services are spread across three segments:",
        items: ["Solar plants Installations", "Home finishing", "General contracting"],
      },
    ],
    cta: "Ready to start your construction project?",
    ar: {
      title: "الإنشاءات والتركيب الشمسي في مصر | بولت للإنشاءات",
      metaTitle: "الإنشاءات والتركيب الشمسي في مصر | بولت للإنشاءات",
      metaDescription:
        "خدمات إنشاء وتركيب شمسي احترافية في مصر. هياكل وتركيبات سكنية وتجارية وبنية تحتية للطاقة المتجددة.",
      keywords: [
        "إنشاءات شمسية مصر",
        "تركيب شمسي مصر",
        "بولت للإنشاءات",
        "bolt construction",
      ],
      imageAlt: "فريق بولت للإنشاءات يعمل على مشروع تركيب شمسي في مصر",
      heading: "الإنشاءات",
      subheading: "بولت للإنشاءات هي الذراع المدني والتنفيذي لبولت.",
      intro:
        "يقدّم فريقنا المتخصص خدمات إنشاء وتركيب احترافية لمشاريع الطاقة الشمسية وما بعدها.",
      sections: [
        {
          title: "خدماتنا موزعة على ثلاثة قطاعات:",
          items: ["تركيب المحطات الشمسية", "تشطيب منزلي", "مقاولات عامة"],
        },
      ],
      cta: "هل أنت مستعد لبدء مشروعك الإنشائي؟",
    },
  },
  "whole-sale": {
    slug: "whole-sale",
    path: "/proposal/whole-sale",
    title: "Wholesale Solar Panels Egypt | Bulk Solar Equipment",
    metaTitle: "Wholesale Solar Panels Egypt | Bulk Solar Equipment",
    metaDescription:
      "Wholesale solar panels and equipment in Egypt. Bulk pricing on inverters, panels, and components for installers, contractors, and businesses.",
    keywords: ["wholesale solar egypt", "bulk solar panels egypt", "solar distributor egypt"],
    image: "/grid-tied.jpeg",
    imageAlt: "Wholesale solar panels and equipment in Egypt",
    heading: "Wholesale Solar Equipment in Egypt",
    subheading: "Bulk pricing for installers, contractors, and businesses",
    intro:
      "Tell us what you need — panels, inverters, cables, or street lights — and our team will quote.",
    sections: [
      {
        title: "What we supply:",
        items: [
          "Solar panels and inverters",
          "Cables, mounting, and protection",
          "Street lights and meters",
        ],
      },
    ],
    cta: "Ready to request a wholesale quote?",
    ar: {
      title: "ألواح شمسية بالجملة في مصر | معدات شمسية بكميات",
      metaTitle: "ألواح شمسية بالجملة في مصر | معدات شمسية بكميات",
      metaDescription:
        "ألواح ومعدات شمسية بالجملة في مصر. أسعار كميات على العاكسات والألواح والمكونات للمثبتين والمقاولين والأعمال.",
      keywords: [
        "جملة طاقة شمسية مصر",
        "ألواح شمسية بالجملة مصر",
        "موزع طاقة شمسية مصر",
        "wholesale solar egypt",
      ],
      imageAlt: "ألواح ومعدات شمسية بالجملة في مصر",
      heading: "معدات الطاقة الشمسية بالجملة في مصر",
      subheading: "أسعار كميات للمثبتين والمقاولين والأعمال",
      intro:
        "أخبرنا بما تحتاجه — ألواح، عواكس، كابلات، أو إنارة شوارع — وسيقدّم فريقنا عرض السعر.",
      sections: [
        {
          title: "ما نوفره:",
          items: [
            "ألواح شمسية وعواكس",
            "كابلات وتركيبات وحماية",
            "إنارة شوارع وعدادات",
          ],
        },
      ],
      cta: "هل أنت مستعد لطلب عرض جملة؟",
    },
  },
};

export function getProductPage(slug: string, locale = "en"): ProductPageContent {
  const content = PRODUCT_PAGES[slug];
  if (!content) throw new Error(`Missing product page: ${slug}`);
  return pickLocaleContent(content, locale);
}
