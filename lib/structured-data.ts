export const SITE_URL = "https://www.boltenergy.me";

export const BUSINESS_INFO = {
  name: "Bolt Energy",
  email: "info@bolt-energy.me",
  telephone: "+201044438446",
  address: {
    streetAddress: "6th of October",
    addressLocality: "Giza",
    addressRegion: "Giza",
    addressCountry: "EG",
  },
  logo: `${SITE_URL}/footer-logo-white.svg`,
  sameAs: [
    "https://www.facebook.com/boltenergy.me",
    "https://www.instagram.com/bolt.energy.eg",
  ],
  description:
    "Leading solar energy company in Egypt providing grid-tied, off-grid, irrigation, and heating solar solutions with professional installation and monitoring.",
};

export const FAQ_ITEMS = [
  {
    question: "Why should I go solar?",
    answer:
      "Photovoltaic energy is emerging as a solid alternative to large electricity companies. The installation of solar panels offers clear benefits, including savings of up to 70% on electricity bills, driving many families towards solar self-consumption in our country. It also provides energy independence, increases the value of the property, contributes to combating climate change, and offers access to various grants and subsidies.",
  },
  {
    question: "How do solar panels work?",
    answer:
      "Solar panels convert sunlight into electricity through the photovoltaic process. Solar cells absorb sunlight to generate electricity, then an inverter converts this current into usable form for the home.",
  },
  {
    question: "What is the maintenance of solar panels?",
    answer:
      "The care of solar panels is simple and minimal, we can usually take care of them ourselves. They are built to withstand weather conditions and usually only need occasional cleaning and checks to ensure they are working properly and to prevent damage.",
  },
  {
    question: "How are solar panels cleaned?",
    answer:
      "Solar panels usually require little maintenance thanks to their glass cover, which tends to keep them clean. Occasionally, if dirt such as leaves or debris accumulates, a gentle wash with water from a hose or using a soft sponge or brush is sufficient. Regular observation is key to identifying build-up that may affect its efficiency. In general, the protective coating on the panels allows rain and sun to keep them clean, minimizing the need for frequent cleaning.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Fady Iskandar",
    text: "The level of professionalism was exemplary. All promises were fulfilled and there were no surprises. The installation process was seamless.",
    rating: 5,
  },
  {
    name: "Walid Bazan",
    text: "Bolt Energy is a good start up company, with more projects under their belt. Over all acceptable experience the system was delivered and installed and commissioned as designed and they have good follow up on trouble shooting and follow up until successful commissioning was achieved.",
    rating: 5,
  },
  {
    name: "Stefano Soldi",
    text: "I didn't expect to find such a great and professional people. Bolt Energy team is simply perfect. In few days I got an offer for my unit, and the installation procedure had been easy and smooth. I highly recommend this company to all my friends, neighbors and people that are interested in invest some money for a better and green future.",
    rating: 5,
  },
  {
    name: "Ali Dessouki",
    text: "Everyone was extremely professional and friendly and did everything to make the experience smooth and easy for me. I'm extremely satisfied with my experience and would definitely recommend to anyone.",
    rating: 5,
  },
  {
    name: "Mohamed Fekry Aziz Saber Khalil",
    text: "Professional company with good service and competitive prices",
    rating: 5,
  },
  {
    name: "Amr Ayman",
    text: "Very professional and experienced team",
    rating: 5,
  },
] as const;

export const PRODUCT_SERVICES = {
  "grid-tied": {
    name: "Grid-Tied Solar Systems",
    description:
      "Grid-tied solar systems let you generate your own electricity and send excess power back to the grid for credits, significantly reducing your electricity bills in Egypt.",
    path: "/product/grid-tied",
    image: "/grid-tied.jpeg",
  },
  "off-grid": {
    name: "Off-Grid Solar Solutions",
    description:
      "Complete off-grid solar power systems with battery storage for energy independence. Ideal for remote locations and backup power solutions across Egypt.",
    path: "/product/off-grid",
    image: "/offgrid-ai.png",
  },
  "solar-irrigation": {
    name: "Solar Irrigation Systems",
    description:
      "Harness the power of the sun to irrigate your crops, saving money on electricity and ensuring reliable water access for farms in Egypt.",
    path: "/product/solar-irrigation",
    image: "/solar-irrig.jpg",
  },
  "solar-heating": {
    name: "Solar Heating Solutions",
    description:
      "Solar heating systems provide hot water and pool heating using renewable energy, reducing gas and electric bills for homes and businesses in Egypt.",
    path: "/product/solar-heating",
    image: "/solar-heat-ai.png",
  },
} as const;

type JsonLd = Record<string, unknown>;

function businessProvider(): JsonLd {
  return {
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.name,
    url: SITE_URL,
  };
}

export function getLocalBusinessSchema(): JsonLd {
  const reviewCount = TESTIMONIALS.length;
  const ratingValue =
    TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / reviewCount;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    logo: BUSINESS_INFO.logo,
    image: `${SITE_URL}/drone-4-1.jpeg`,
    email: BUSINESS_INFO.email,
    telephone: BUSINESS_INFO.telephone,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address,
    },
    sameAs: BUSINESS_INFO.sameAs,
    description: BUSINESS_INFO.description,
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount: String(reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(testimonial.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: testimonial.text,
    })),
  };
}

export function getWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: BUSINESS_INFO.name,
    publisher: businessProvider(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/contact-us?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function getFaqPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getServiceSchema(
  productKey: keyof typeof PRODUCT_SERVICES
): JsonLd {
  const product = PRODUCT_SERVICES[productKey];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: product.name,
    description: product.description,
    url: `${SITE_URL}${product.path}`,
    image: `${SITE_URL}${product.image}`,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
      telephone: BUSINESS_INFO.telephone,
      address: {
        "@type": "PostalAddress",
        ...BUSINESS_INFO.address,
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    serviceType: product.name,
  };
}
