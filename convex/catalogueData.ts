export type SeedBrand = { slug: string; name: string };
export type SeedCategory = {
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  sortOrder: number;
};
export type SeedFamily = {
  slug: string;
  categorySlug: string;
  brandSlug?: string;
  nameEn: string;
  nameAr: string;
  summaryEn?: string;
  summaryAr?: string;
  sortOrder: number;
};
export type SeedProduct = {
  sku: string;
  slug: string;
  categorySlug: string;
  familySlug?: string;
  brandSlug?: string;
  nameEn: string;
  nameAr: string;
  specEn: string;
  specAr: string;
  priceEgp?: number;
  priceUnit: "each" | "per_watt" | "per_metre" | "per_kw";
  availability: "in_stock" | "on_request" | "quote_only";
  stockQty: number;
  warrantyYears?: number;
  tags: string[];
};

export const seedBrands: SeedBrand[] = [
  { slug: "tw-solar", name: "TW Solar" },
  { slug: "jinko", name: "Jinko" },
  { slug: "longi", name: "LONGi" },
  { slug: "ja-solar", name: "JA Solar" },
  { slug: "invt", name: "INVT" },
  { slug: "frecon", name: "FRECON" },
  { slug: "veichi", name: "VEICHI" },
  { slug: "vacon", name: "VACON" },
  { slug: "huawei", name: "Huawei" },
  { slug: "sungrow", name: "Sungrow" },
  { slug: "solis", name: "Solis" },
  { slug: "must", name: "MUST" },
  { slug: "felicity", name: "Felicity" },
  { slug: "dyness", name: "Dyness" },
  { slug: "kbe", name: "KBE" },
  { slug: "atork", name: "ATORK" },
  { slug: "turen", name: "Türen" },
  { slug: "sunracks", name: "SUNRACKS" },
  { slug: "suntree", name: "Suntree" },
  { slug: "kayal", name: "Kayal" },
  { slug: "linuo-ritter", name: "Linuo Ritter" },
  { slug: "nobel", name: "Nobel" },
  { slug: "heatmaster", name: "HeatMaster" },
];

export const seedCategories: SeedCategory[] = [
  {
    slug: "panels",
    nameEn: "Solar panels",
    nameAr: "ألواح الطاقة الشمسية",
    descriptionEn: "Tier-1 N-type and Mono-PERC modules, quoted per watt-peak.",
    descriptionAr: "ألواح Tier-1 من النوع N و Mono-PERC، التسعير بالواط.",
    sortOrder: 1,
  },
  {
    slug: "pump-inverters",
    nameEn: "Pump inverters",
    nameAr: "إنفرترات الطلمبات",
    descriptionEn: "Solar pump VFDs from 2.2 kW to 450 kW, 220/380 V.",
    descriptionAr: "إنفرترات طلمبات شمسية من ٢٫٢ إلى ٤٥٠ كيلوواط، ٢٢٠/٣٨٠ فولت.",
    sortOrder: 2,
  },
  {
    slug: "on-grid",
    nameEn: "On-grid inverters",
    nameAr: "إنفرترات متصلة بالشبكة",
    descriptionEn: "Three-phase grid-tied inverters, Huawei, Sungrow and Solis.",
    descriptionAr: "إنفرترات ثلاثية الطور متصلة بالشبكة من هواوي وسونجرو وسوليس.",
    sortOrder: 3,
  },
  {
    slug: "hybrid",
    nameEn: "Hybrid inverters",
    nameAr: "إنفرترات هايبرد",
    descriptionEn: "Solis S6 hybrid, HV 120–600 V and LV 40–60 V battery.",
    descriptionAr: "سوليس S6 هايبرد، بطارية جهد عالي ١٢٠–٦٠٠ فولت أو منخفض ٤٠–٦٠ فولت.",
    sortOrder: 4,
  },
  {
    slug: "off-grid",
    nameEn: "Off-grid inverters",
    nameAr: "إنفرترات منفصلة عن الشبكة",
    descriptionEn: "MUST, Felicity and Dyness off-grid inverters with MPPT.",
    descriptionAr: "إنفرترات منفصلة عن الشبكة من MUST وFelicity وDyness مع MPPT.",
    sortOrder: 5,
  },
  {
    slug: "storage",
    nameEn: "Lithium storage",
    nameAr: "بطاريات ليثيوم",
    descriptionEn: "LiFePO4 batteries and Dyness HV stack banks.",
    descriptionAr: "بطاريات ليثيوم حديد فوسفات وأنظمة دايناس ذات الجهد العالي.",
    sortOrder: 6,
  },
  {
    slug: "mounting-cable",
    nameEn: "Mounting & cable",
    nameAr: "قواعد التثبيت والكابلات",
    descriptionEn: "Galvanised mounting, DC cable and submersible pump cable, cut to length.",
    descriptionAr: "هياكل مجلفنة وكابل تيار مستمر وكابل طلمبات غاطس يُقطع حسب الطلب.",
    sortOrder: 7,
  },
  {
    slug: "protection",
    nameEn: "DC protection",
    nameAr: "الحماية",
    descriptionEn: "Suntree premium and Kayal value DC protection, plus Kayal combiner boxes.",
    descriptionAr: "حماية تيار مستمر Suntree المميزة وKayal الاقتصادية، مع لوحات تجميع Kayal.",
    sortOrder: 8,
  },
  {
    slug: "water-heating",
    nameEn: "Solar water heaters",
    nameAr: "سخانات شمسية",
    descriptionEn: "Linuo Ritter vacuum-tube and Nobel closed-loop solar water heaters.",
    descriptionAr: "سخانات شمسية Linuo Ritter بالأنابيب المفرغة وNobel بنظام الحلقة المغلقة.",
    sortOrder: 9,
  },
  {
    slug: "pool-heating",
    nameEn: "Pool heat pumps",
    nameAr: "مضخات حرارية لحمامات السباحة",
    descriptionEn: "HeatMaster inverter pool heat pumps with Wi-Fi.",
    descriptionAr: "مضخات HeatMaster عاكس لتسخين المسابح مع واي فاي.",
    sortOrder: 10,
  },
];

export const seedFamilies: SeedFamily[] = [
  {
    slug: "invt-gd170",
    categorySlug: "pump-inverters",
    brandSlug: "invt",
    nameEn: "INVT GD170",
    nameAr: "إنفرتر طلمبات INVT GD170",
    summaryEn: "3–340 HP · 220/380 V · 3 phase · China",
    summaryAr: "٣–٣٤٠ حصان · ٢٢٠/٣٨٠ فولت · ثلاثي الطور · الصين",
    sortOrder: 1,
  },
  {
    slug: "frecon-pv500",
    categorySlug: "pump-inverters",
    brandSlug: "frecon",
    nameEn: "FRECON PV500",
    nameAr: "إنفرتر طلمبات FRECON PV500",
    summaryEn: "5.5–600 HP · 380 V · 3 phase · 900 VDC",
    summaryAr: "٥٫٥–٦٠٠ حصان · ٣٨٠ فولت · ثلاثي الطور · ٩٠٠ فولت مستمر",
    sortOrder: 2,
  },
  {
    slug: "veichi-si23h",
    categorySlug: "pump-inverters",
    brandSlug: "veichi",
    nameEn: "VEICHI SI23H",
    nameAr: "إنفرتر طلمبات VEICHI SI23H",
    summaryEn: "5.5–225 HP · 380 V · 900 VDC",
    summaryAr: "٥٫٥–٢٢٥ حصان · ٣٨٠ فولت · ٩٠٠ فولت مستمر",
    sortOrder: 3,
  },
  {
    slug: "vacon-n0100",
    categorySlug: "pump-inverters",
    brandSlug: "vacon",
    nameEn: "VACON N0100",
    nameAr: "إنفرتر طلمبات VACON N0100",
    summaryEn: "Heavy duty · 150–535 HP · 380 V · Finland",
    summaryAr: "خدمة شاقة · ١٥٠–٥٣٥ حصان · ٣٨٠ فولت · فنلندا",
    sortOrder: 4,
  },
  {
    slug: "huawei-sun2000",
    categorySlug: "on-grid",
    brandSlug: "huawei",
    nameEn: "Huawei SUN2000",
    nameAr: "إنفرتر شبكة Huawei SUN2000",
    summaryEn: "3–115 kW · 380 V",
    summaryAr: "٣–١١٥ كيلوواط · ٣٨٠ فولت",
    sortOrder: 1,
  },
  {
    slug: "sungrow",
    categorySlug: "on-grid",
    brandSlug: "sungrow",
    nameEn: "Sungrow",
    nameAr: "إنفرتر شبكة Sungrow",
    summaryEn: "5–150 kW · 380 V",
    summaryAr: "٥–١٥٠ كيلوواط · ٣٨٠ فولت",
    sortOrder: 2,
  },
  {
    slug: "solis-s5-gr3p",
    categorySlug: "on-grid",
    brandSlug: "solis",
    nameEn: "Solis S5-GR3P",
    nameAr: "إنفرتر شبكة Solis S5 ثلاثي الطور",
    summaryEn: "5–150 kW · 380 V · 3 phase · China",
    summaryAr: "٥–١٥٠ كيلوواط · ٣٨٠ فولت · ثلاثي الطور · الصين",
    sortOrder: 3,
  },
  {
    slug: "solis-s6-eh3p",
    categorySlug: "hybrid",
    brandSlug: "solis",
    nameEn: "Solis S6-EH3P",
    nameAr: "إنفرتر هايبرد Solis S6-EH3P",
    summaryEn: "5–125 kW · HV 120–600 V / LV 40–60 V",
    summaryAr: "٥–١٢٥ كيلوواط · جهد عالي ١٢٠–٦٠٠ فولت / منخفض ٤٠–٦٠ فولت",
    sortOrder: 1,
  },
  {
    slug: "must-eco-exp",
    categorySlug: "off-grid",
    brandSlug: "must",
    nameEn: "MUST ECO / EXP",
    nameAr: "إنفرتر منفصل MUST ECO / EXP",
    summaryEn: "1.6–12 kW · 220 V out · MPPT",
    summaryAr: "١٫٦–١٢ كيلوواط · خرج ٢٢٠ فولت · MPPT",
    sortOrder: 1,
  },
  {
    slug: "felicity-ivem",
    categorySlug: "off-grid",
    brandSlug: "felicity",
    nameEn: "Felicity IVEM",
    nameAr: "إنفرتر منفصل Felicity IVEM",
    summaryEn: "1–12 kW · 220 V out · MPPT",
    summaryAr: "١–١٢ كيلوواط · خرج ٢٢٠ فولت · MPPT",
    sortOrder: 2,
  },
  {
    slug: "dyness-prem-max",
    categorySlug: "off-grid",
    brandSlug: "dyness",
    nameEn: "Dyness PREMIUM & MAX",
    nameAr: "إنفرتر منفصل Dyness PREMIUM و MAX",
    summaryEn: "1.5–12 kW · 220 V out",
    summaryAr: "١٫٥–١٢ كيلوواط · خرج ٢٢٠ فولت",
    sortOrder: 3,
  },
  {
    slug: "felicity-fla",
    categorySlug: "storage",
    brandSlug: "felicity",
    nameEn: "Felicity LiFePO4",
    nameAr: "بطارية ليثيوم Felicity",
    summaryEn: "12/24/48 V · 6000 cycles @ 90% DOD",
    summaryAr: "١٢/٢٤/٤٨ فولت · ٦٠٠٠ دورة عند ٩٠٪ عمق تفريغ",
    sortOrder: 1,
  },
  {
    slug: "must-lifepo4",
    categorySlug: "storage",
    brandSlug: "must",
    nameEn: "MUST LiFePO4",
    nameAr: "بطارية ليثيوم MUST",
    summaryEn: "12/24/48 V · 6000 cycles @ 90% DOD",
    summaryAr: "١٢/٢٤/٤٨ فولت · ٦٠٠٠ دورة عند ٩٠٪ عمق تفريغ",
    sortOrder: 2,
  },
  {
    slug: "dyness-lifepo4",
    categorySlug: "storage",
    brandSlug: "dyness",
    nameEn: "Dyness LiFePO4",
    nameAr: "بطارية ليثيوم Dyness",
    summaryEn: "12/24/48 V · up to 8000 cycles",
    summaryAr: "١٢/٢٤/٤٨ فولت · حتى ٨٠٠٠ دورة",
    sortOrder: 3,
  },
  {
    slug: "dyness-stack-hv",
    categorySlug: "storage",
    brandSlug: "dyness",
    nameEn: "Dyness Stack HV",
    nameAr: "نظام دايناس ستاك جهد عالي",
    summaryEn: "15–2,580 kWh · 51.2 V modules · quoted as a bank",
    summaryAr: "١٥–٢٥٨٠ كيلوواط ساعة · وحدات ٥١٫٢ فولت · يُسعَّر كبنك",
    sortOrder: 4,
  },
  {
    slug: "mounting-steel",
    categorySlug: "mounting-cable",
    nameEn: "Mounting structures",
    nameAr: "هياكل التثبيت",
    summaryEn: "Egyptian galvanised steel · 20-yr warranty",
    summaryAr: "صلب مجلفن مصري · ضمان ٢٠ سنة",
    sortOrder: 1,
  },
  {
    slug: "kbe-dc",
    categorySlug: "mounting-cable",
    brandSlug: "kbe",
    nameEn: "KBE solar DC cable",
    nameAr: "كابل تيار مستمر KBE",
    summaryEn: "German · 1000 V DC · TÜV · per metre",
    summaryAr: "ألماني · ١٠٠٠ فولت مستمر · TÜV · بالمتر",
    sortOrder: 2,
  },
  {
    slug: "atork-dc",
    categorySlug: "mounting-cable",
    brandSlug: "atork",
    nameEn: "ATORK DC cable",
    nameAr: "كابل تيار مستمر ATORK",
    summaryEn: "Egyptian · per metre",
    summaryAr: "مصري · بالمتر",
    sortOrder: 3,
  },
  {
    slug: "turen-kablo",
    categorySlug: "mounting-cable",
    brandSlug: "turen",
    nameEn: "Türen Kablo pump cable",
    nameAr: "كابل طلمبات Türen",
    summaryEn: "Turkish · flat submersible · per metre",
    summaryAr: "تركي · غاطس مسطح · بالمتر",
    sortOrder: 4,
  },
  {
    slug: "atork-pump",
    categorySlug: "mounting-cable",
    brandSlug: "atork",
    nameEn: "ATORK pump cable",
    nameAr: "كابل طلمبات ATORK",
    summaryEn: "Egyptian · flat submersible · per metre",
    summaryAr: "مصري · غاطس مسطح · بالمتر",
    sortOrder: 5,
  },
  {
    slug: "suntree-dc",
    categorySlug: "protection",
    brandSlug: "suntree",
    nameEn: "Suntree DC protection",
    nameAr: "حماية تيار مستمر Suntree",
    summaryEn: "Premium · 1000 V DC",
    summaryAr: "فئة مميزة · ١٠٠٠ فولت مستمر",
    sortOrder: 1,
  },
  {
    slug: "kayal-dc",
    categorySlug: "protection",
    brandSlug: "kayal",
    nameEn: "Kayal DC protection",
    nameAr: "حماية تيار مستمر Kayal",
    summaryEn: "Value · 1000 V DC",
    summaryAr: "فئة اقتصادية · ١٠٠٠ فولت مستمر",
    sortOrder: 2,
  },
  {
    slug: "kayal-combiner",
    categorySlug: "protection",
    brandSlug: "kayal",
    nameEn: "Kayal KYV-CD combiner",
    nameAr: "لوحة تجميع Kayal KYV-CD",
    summaryEn: "Pre-wired PV combiner · fuses + SPD + MCCB",
    summaryAr: "لوحة تجميع جاهزة · فيوزات + مانع صواعق + قاطع MCCB",
    sortOrder: 3,
  },
  {
    slug: "linuo-ritter",
    categorySlug: "water-heating",
    brandSlug: "linuo-ritter",
    nameEn: "Linuo Ritter",
    nameAr: "سخان شمسي Linuo Ritter",
    summaryEn: "Vacuum tube · 304L inner tank · 1500 W heater",
    summaryAr: "أنابيب مفرغة · خزان داخلي 304L · سخان ١٥٠٠ واط",
    sortOrder: 1,
  },
  {
    slug: "nobel",
    categorySlug: "water-heating",
    brandSlug: "nobel",
    nameEn: "Nobel",
    nameAr: "سخان شمسي Nobel",
    summaryEn: "Greek flat plate · closed loop · 3000 W heater",
    summaryAr: "لوح مسطح يوناني · حلقة مغلقة · سخان ٣٠٠٠ واط",
    sortOrder: 2,
  },
  {
    slug: "heatmaster",
    categorySlug: "pool-heating",
    brandSlug: "heatmaster",
    nameEn: "HeatMaster",
    nameAr: "مضخة حرارية HeatMaster",
    summaryEn: "European certified · Wi-Fi · efficiency class A",
    summaryAr: "معتمد أوروبياً · واي فاي · كفاءة فئة A",
    sortOrder: 1,
  },
];

type ProductDraft = Omit<
  SeedProduct,
  "slug" | "nameAr" | "specAr" | "priceUnit" | "availability" | "stockQty" | "tags"
> &
  Partial<
    Pick<
      SeedProduct,
      "slug" | "nameAr" | "specAr" | "priceUnit" | "availability" | "stockQty" | "tags"
    >
  >;

function toSlug(sku: string): string {
  return sku
    .trim()
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/\./g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function kwFromSpec(specEn: string): number | undefined {
  const match = specEn.match(/(\d+(?:\.\d+)?)\s*kW/i);
  return match ? Number(match[1]) : undefined;
}

function product(draft: ProductDraft): SeedProduct {
  const kw = kwFromSpec(draft.specEn);
  const largePump =
    (draft.familySlug === "frecon-pv500" || draft.familySlug === "vacon-n0100") &&
    kw !== undefined &&
    kw > 200;
  const availability: SeedProduct["availability"] =
    draft.availability ??
    (draft.priceEgp === undefined
      ? "quote_only"
      : largePump
        ? "on_request"
        : "in_stock");
  const stockQty =
    draft.stockQty ??
    (availability === "quote_only" ? 0 : availability === "on_request" ? 5 : 25);
  return {
    sku: draft.sku,
    slug: draft.slug ?? toSlug(draft.sku),
    categorySlug: draft.categorySlug,
    familySlug: draft.familySlug,
    brandSlug: draft.brandSlug,
    nameEn: draft.nameEn,
    nameAr: draft.nameAr ?? draft.nameEn,
    specEn: draft.specEn,
    specAr: draft.specAr ?? draft.specEn,
    priceEgp: draft.priceEgp,
    priceUnit: draft.priceUnit ?? "each",
    availability,
    stockQty,
    warrantyYears: draft.warrantyYears,
    tags: draft.tags ?? [],
  };
}

function familyRows(
  defaults: Pick<
    ProductDraft,
    "categorySlug" | "familySlug" | "brandSlug" | "warrantyYears" | "priceUnit" | "tags"
  >,
  rows: Array<{
    sku: string;
    specEn: string;
    priceEgp?: number;
    nameEn?: string;
    nameAr?: string;
    availability?: SeedProduct["availability"];
    stockQty?: number;
    tags?: string[];
  }>,
): SeedProduct[] {
  return rows.map((row) =>
    product({
      ...defaults,
      sku: row.sku,
      nameEn: row.nameEn ?? row.sku,
      nameAr: row.nameAr,
      specEn: row.specEn,
      priceEgp: row.priceEgp,
      availability: row.availability,
      stockQty: row.stockQty,
      tags: row.tags ?? defaults.tags,
    }),
  );
}

const panelProductsFixed: SeedProduct[] = [
  product({
    sku: "TW-550",
    categorySlug: "panels",
    brandSlug: "tw-solar",
    nameEn: "TW Solar 550 Wp",
    nameAr: "لوح TW Solar 550 واط",
    specEn: "550 Wp · Mono-PERC · 1500 V",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
  product({
    sku: "JINKO-580",
    categorySlug: "panels",
    brandSlug: "jinko",
    nameEn: "Jinko 580 Wp",
    nameAr: "لوح Jinko 580 واط",
    specEn: "580 Wp · N-type TOPCon · 1500 V",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
  product({
    sku: "LONGI-600",
    categorySlug: "panels",
    brandSlug: "longi",
    nameEn: "LONGi 600 Wp",
    nameAr: "لوح LONGi 600 واط",
    specEn: "600 Wp · N-type bifacial · 1500 V",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
  product({
    sku: "JA-615",
    categorySlug: "panels",
    brandSlug: "ja-solar",
    nameEn: "JA Solar 615 Wp",
    nameAr: "لوح JA Solar 615 واط",
    specEn: "615 Wp · N-type bifacial · glass-glass",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
  product({
    sku: "TW-630",
    categorySlug: "panels",
    brandSlug: "tw-solar",
    nameEn: "TW Solar 630 Wp",
    nameAr: "لوح TW Solar 630 واط",
    specEn: "630 Wp · N-type bifacial · glass-glass",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
  product({
    sku: "JINKO-700",
    categorySlug: "panels",
    brandSlug: "jinko",
    nameEn: "Jinko 700 Wp",
    nameAr: "لوح Jinko 700 واط",
    specEn: "700 Wp · N-type bifacial · large format",
    priceUnit: "per_watt",
    availability: "quote_only",
    stockQty: 0,
    warrantyYears: 12,
    tags: ["tier1", "quote_only"],
  }),
];

const invtProducts = familyRows(
  {
    categorySlug: "pump-inverters",
    familySlug: "invt-gd170",
    brandSlug: "invt",
    warrantyYears: 2,
  },
  [
    { sku: "GD170-2R2G-S2-PV", specEn: "2.2 kW · 3 HP · 10 A · 220 V", priceEgp: 5225 },
    { sku: "GD170-2R2G-SS2-PV", specEn: "2.2 kW · 3 HP · 14 A · 220 V", priceEgp: 5730 },
    { sku: "GD170-004G-4-PV", specEn: "4 kW · 5.5 HP · 9.5 A · 380 V", priceEgp: 6865 },
    { sku: "GD170-5R5G-4-PV", specEn: "5.5 kW · 7.5 HP · 14 A", priceEgp: 7865 },
    { sku: "GD170-7R5G-4-PV", specEn: "7.5 kW · 10 HP · 18.5 A", priceEgp: 9995 },
    { sku: "GD170-011G-4-PV", specEn: "11 kW · 15 HP · 25 A", priceEgp: 13260 },
    { sku: "GD170-015G-4-PV", specEn: "15 kW · 20 HP · 32 A", priceEgp: 15860 },
    { sku: "GD170-018G-4-PV", specEn: "18.5 kW · 25 HP · 38 A", priceEgp: 19990 },
    { sku: "GD170-022G-4-PV", specEn: "22 kW · 30 HP · 45 A", priceEgp: 23225 },
    { sku: "GD170-030G-4-PV", specEn: "30 kW · 40 HP · 60 A", priceEgp: 29385 },
    { sku: "GD170-037G-4-PV", specEn: "37 kW · 50 HP · 75 A", priceEgp: 36320 },
    { sku: "GD170-045G-4-PV", specEn: "45 kW · 60 HP · 92 A", priceEgp: 43840 },
    { sku: "GD170-055G-4-PV", specEn: "55 kW · 75 HP · 115 A", priceEgp: 58070 },
    { sku: "GD170-075G-4-PV", specEn: "75 kW · 100 HP · 150 A", priceEgp: 70840 },
    { sku: "GD170-090G-4-PV", specEn: "90 kW · 125 HP · 180 A", priceEgp: 81145 },
    { sku: "GD170-110G-4-PV", specEn: "110 kW · 150 HP · 215 A", priceEgp: 94455 },
    { sku: "GD170-132G-4-PV", specEn: "132 kW · 175 HP · 260 A", priceEgp: 124890 },
    { sku: "GD170-160G-4-PV", specEn: "160 kW · 215 HP · 305 A", priceEgp: 139710 },
    { sku: "GD100-200G-4-PV", specEn: "200 kW · 270 HP · 380 A", priceEgp: 198545 },
    { sku: "GD100-250G-4-PV", specEn: "250 kW · 340 HP · 480 A", priceEgp: 270835 },
  ],
);

const freconProducts = familyRows(
  {
    categorySlug: "pump-inverters",
    familySlug: "frecon-pv500",
    brandSlug: "frecon",
    warrantyYears: 3,
    tags: ["bolt_core_line"],
  },
  [
    { sku: "PV150A-2S-2.2", specEn: "2.2 kW · 3 HP · 9.5 A · 220 V", priceEgp: 8345 },
    { sku: "PV500-4T-4.0B", specEn: "4 kW · 5.5 HP · 9.5 A", priceEgp: 9175 },
    { sku: "PV500-4T-5.5B", specEn: "5.5 kW · 7.5 HP · 13 A", priceEgp: 10450 },
    { sku: "PV500-4T-7.5B", specEn: "7.5 kW · 10 HP · 17 A", priceEgp: 12880 },
    { sku: "PV500-4T-011", specEn: "11 kW · 15 HP · 25 A", priceEgp: 16500 },
    { sku: "PV500-4T-015", specEn: "15 kW · 20 HP · 32 A", priceEgp: 19800 },
    { sku: "PV500-4T-018", specEn: "18.5 kW · 25 HP · 37 A", priceEgp: 24200 },
    { sku: "PV500-4T-022", specEn: "22 kW · 30 HP · 45 A", priceEgp: 28600 },
    { sku: "PV500-4T-030", specEn: "30 kW · 40 HP · 60 A", priceEgp: 35200 },
    { sku: "PV500-4T-037", specEn: "37 kW · 50 HP · 75 A", priceEgp: 42900 },
    { sku: "PV500-4T-045", specEn: "45 kW · 60 HP · 91 A", priceEgp: 52800 },
    { sku: "PV500-4T-055", specEn: "55 kW · 75 HP · 112 A", priceEgp: 68200 },
    { sku: "PV500-4T-075", specEn: "75 kW · 100 HP · 150 A", priceEgp: 89545 },
    { sku: "PV500-4T-090", specEn: "90 kW · 125 HP · 176 A", priceEgp: 104500 },
    { sku: "PV500-4T-110", specEn: "110 kW · 150 HP · 210 A", priceEgp: 121000 },
    { sku: "PV500-4T-132", specEn: "132 kW · 175 HP · 253 A", priceEgp: 154000 },
    { sku: "PV500-4T-160", specEn: "160 kW · 215 HP · 304 A", priceEgp: 176000 },
    { sku: "PV500-4T-200", specEn: "200 kW · 270 HP · 377 A", priceEgp: 231000 },
    { sku: "PV500-4T-250", specEn: "250 kW · 340 HP · 470 A", priceEgp: 308000 },
    { sku: "PV500-4T-280", specEn: "280 kW · 370 HP · 520 A", priceEgp: 352000 },
    { sku: "PV500-4T-315", specEn: "315 kW · 420 HP · 600 A", priceEgp: 396000 },
    { sku: "PV500-4T-355", specEn: "355 kW · 470 HP · 650 A", priceEgp: 440000 },
    { sku: "PV500-4T-400", specEn: "400 kW · 530 HP · 725 A", priceEgp: 484000 },
    { sku: "PV500-4T-450", specEn: "450 kW · 600 HP · 800 A", priceEgp: 524160 },
  ],
);

const veichiProducts = familyRows(
  {
    categorySlug: "pump-inverters",
    familySlug: "veichi-si23h",
    brandSlug: "veichi",
    warrantyYears: 2,
    tags: ["bolt_core_line"],
  },
  [
    { sku: "SI23H-4KW", specEn: "4 kW · 5.5 HP · 10 A", priceEgp: 9000 },
    { sku: "SI23H-5.5KW", specEn: "5.5 kW · 7.5 HP · 13 A", priceEgp: 11000 },
    { sku: "SI23H-7.5KW", specEn: "7.5 kW · 10 HP · 17 A", priceEgp: 13500 },
    { sku: "SI23H-11KW", specEn: "11 kW · 15 HP · 25 A", priceEgp: 18000 },
    { sku: "SI23H-15KW", specEn: "15 kW · 20 HP · 32 A", priceEgp: 22000 },
    { sku: "SI23H-18.5KW", specEn: "18.5 kW · 25 HP · 38 A", priceEgp: 27000 },
    { sku: "SI23H-22KW", specEn: "22 kW · 30 HP · 45 A", priceEgp: 32000 },
    { sku: "SI23H-30KW", specEn: "30 kW · 40 HP · 60 A", priceEgp: 42000 },
    { sku: "SI23H-37KW", specEn: "37 kW · 50 HP · 75 A", priceEgp: 52000 },
    { sku: "SI23H-45KW", specEn: "45 kW · 60 HP · 90 A", priceEgp: 64000 },
    { sku: "SI23H-55KW", specEn: "55 kW · 75 HP · 110 A", priceEgp: 82000 },
    { sku: "SI23H-75KW", specEn: "75 kW · 100 HP · 150 A", priceEgp: 110000 },
    { sku: "SI23H-90KW", specEn: "90 kW · 125 HP · 180 A", priceEgp: 128000 },
    { sku: "SI23H-110KW", specEn: "110 kW · 150 HP · 210 A", priceEgp: 148000 },
    { sku: "SI23H-132KW", specEn: "132 kW · 175 HP · 250 A", priceEgp: 162000 },
    { sku: "SI23H-160KW", specEn: "160 kW · 215 HP · 310 A", priceEgp: 172975 },
  ],
);

const vaconProducts = familyRows(
  {
    categorySlug: "pump-inverters",
    familySlug: "vacon-n0100",
    brandSlug: "vacon",
    warrantyYears: 1,
  },
  [
    { sku: "VACON-110KW", specEn: "110 kW · 150 HP · 205 A", priceEgp: 220665 },
    { sku: "VACON-160KW", specEn: "160 kW · 215 HP · 310 A", priceEgp: 330000 },
    { sku: "VACON-200KW", specEn: "200 kW · 270 HP · 386 A", priceEgp: 420000 },
    { sku: "VACON-250KW", specEn: "250 kW · 340 HP · 480 A", priceEgp: 620000 },
    { sku: "VACON-400KW", specEn: "400 kW · 535 HP · 725 A", priceEgp: 1037125 },
  ],
);

const huaweiProducts = familyRows(
  {
    categorySlug: "on-grid",
    familySlug: "huawei-sun2000",
    brandSlug: "huawei",
    warrantyYears: 5,
  },
  [
    { sku: "SUN2000-3KTL-M1", specEn: "3 kW · 2 MPPT", priceEgp: 51820 },
    { sku: "SUN2000-5KTL-M1", specEn: "5 kW · 2 MPPT", priceEgp: 57245 },
    { sku: "SUN2000-10KTL-M1", specEn: "10 kW · 2 MPPT", priceEgp: 83235 },
    { sku: "SUN2000-15KTL-M5", specEn: "15 kW · 2 MPPT", priceEgp: 100595 },
    { sku: "SUN2000-20KTL-M5", specEn: "20 kW · 2 MPPT", priceEgp: 108090 },
    { sku: "SUN2000-25KTL-M5", specEn: "25 kW · 2 MPPT", priceEgp: 109220 },
    { sku: "SUN2000-30KTL-M3", specEn: "30 kW · 4 MPPT", priceEgp: 128430 },
    { sku: "SUN2000-40KTL-M3", specEn: "40 kW · 4 MPPT", priceEgp: 152230 },
    { sku: "SUN2000-50KTL-M3", specEn: "50 kW · 4 MPPT", priceEgp: 164885 },
    { sku: "SUN2000-60KTL-M0", specEn: "60 kW · 6 MPPT", priceEgp: 179195 },
    { sku: "SUN2000-100KTL-M2", specEn: "100 kW · 10 MPPT", priceEgp: 265400 },
    { sku: "SUN2000-115KTL-M2", specEn: "115 kW · 10 MPPT", priceEgp: 281315 },
  ],
);

const sungrowProducts = familyRows(
  {
    categorySlug: "on-grid",
    familySlug: "sungrow",
    brandSlug: "sungrow",
    warrantyYears: 5,
  },
  [
    { sku: "SG5.0RT", specEn: "5 kW · 2 MPPT", priceEgp: 63595 },
    { sku: "SG6.0RT", specEn: "6 kW · 2 MPPT", priceEgp: 71270 },
    { sku: "SG8.0RT", specEn: "8 kW · 2 MPPT", priceEgp: 78945 },
    { sku: "SG10RT", specEn: "10 kW · 2 MPPT", priceEgp: 87170 },
    { sku: "SG12RT", specEn: "12 kW · 2 MPPT", priceEgp: 94845 },
    { sku: "SG15RT", specEn: "15 kW · 2 MPPT", priceEgp: 99230 },
    { sku: "SG20RT", specEn: "20 kW · 2 MPPT", priceEgp: 103615 },
    { sku: "SG25RT", specEn: "25 kW · 3 MPPT", priceEgp: 125545 },
    { sku: "SG33CX-P2", specEn: "33 kW · 3 MPPT", priceEgp: 139255 },
    { sku: "SG36CX-P2", specEn: "36 kW · 4 MPPT", priceEgp: 146380 },
    { sku: "SG40CX-P2", specEn: "40 kW · 4 MPPT", priceEgp: 156250 },
    { sku: "SG50CX-P2", specEn: "50 kW · 4 MPPT", priceEgp: 175435 },
    { sku: "SG125CX-P2", specEn: "125 kW · 12 MPPT", priceEgp: 315785 },
    { sku: "SG125CX", specEn: "150 kW · 7 MPPT", priceEgp: 350875 },
  ],
);

const solisOnGridProducts = familyRows(
  {
    categorySlug: "on-grid",
    familySlug: "solis-s5-gr3p",
    brandSlug: "solis",
    warrantyYears: 5,
  },
  [
    { sku: "S5-GR3P5K", specEn: "5 kW · 3 phase", priceEgp: 42325 },
    { sku: "S5-GR3P6K", specEn: "6 kW · 3 phase", priceEgp: 43920 },
    { sku: "S5-GR3P8K", specEn: "8 kW · 3 phase", priceEgp: 47115 },
    { sku: "S5-GR3P10K", specEn: "10 kW · 3 phase", priceEgp: 50310 },
    { sku: "S5-GR3P12K", specEn: "12 kW · 3 phase", priceEgp: 54300 },
    { sku: "S5-GR3P15K", specEn: "15 kW · 3 phase", priceEgp: 57495 },
    { sku: "S5-GR3P17K", specEn: "17 kW · 3 phase", priceEgp: 61490 },
    { sku: "S5-GR3P20K", specEn: "20 kW · 3 phase", priceEgp: 65480 },
    { sku: "S5-GR3P25K", specEn: "25 kW · 3 phase", priceEgp: 85980 },
    { sku: "S5-GR3P30K", specEn: "30 kW · 3 phase", priceEgp: 101150 },
    { sku: "S5-GR3P33K", specEn: "33 kW · 3 phase", priceEgp: 105410 },
    { sku: "S5-GR3P40K", specEn: "40 kW · 3 phase", priceEgp: 122270 },
    { sku: "S5-GR3P50K", specEn: "50 kW · 3 phase", priceEgp: 126440 },
    { sku: "S5-GR3P60K", specEn: "60 kW · 3 phase", priceEgp: 134865 },
    { sku: "S5-GR3P80K", specEn: "80 kW · 3 phase", priceEgp: 219160 },
    { sku: "S5-GR3P100K", specEn: "100 kW · 3 phase", priceEgp: 223420 },
    { sku: "S5-GR3P110K", specEn: "110 kW · 3 phase", priceEgp: 227590 },
    { sku: "S5-GR3P125K", specEn: "125 kW · 3 phase", priceEgp: 252880 },
    { sku: "S5-GR3P150K", specEn: "150 kW · 3 phase", priceEgp: 283935 },
    {
      sku: "WIFI-DATALOGGER",
      nameEn: "Solis WiFi datalogger",
      nameAr: "عصا مراقبة Solis WiFi",
      specEn: "Monitoring stick",
      priceEgp: 15625,
    },
  ],
);

const hybridProducts = familyRows(
  {
    categorySlug: "hybrid",
    familySlug: "solis-s6-eh3p",
    brandSlug: "solis",
    warrantyYears: 5,
  },
  [
    { sku: "S6-EH3P5K2-H", specEn: "5 kW · HV 120-600 V", priceEgp: 78085 },
    { sku: "S6-EH3P10K2-H", specEn: "10 kW · HV 120-600 V", priceEgp: 96640 },
    { sku: "S6-EH3P20K-H", specEn: "20 kW · HV 120-600 V", priceEgp: 146405 },
    { sku: "S6-EH3P30K-H", specEn: "30 kW · HV 120-600 V", priceEgp: 269380 },
    { sku: "S6-EH3P40K-H", specEn: "40 kW · HV 120-600 V", priceEgp: 329900 },
    { sku: "S6-EH3P50K-H", specEn: "50 kW · HV 120-600 V", priceEgp: 341610 },
    { sku: "S6-EH3P80K-H", specEn: "80 kW · HV 120-600 V", priceEgp: 536830 },
    { sku: "S6-EH3P100K-H", specEn: "100 kW · HV 120-600 V", priceEgp: 610020 },
    { sku: "S6-EH3P125K-H", specEn: "125 kW · HV 120-600 V", priceEgp: 683220 },
    { sku: "S6-EH3P10K02-NV-YD-L", specEn: "10 kW · LV 40-60 V", priceEgp: 126890 },
    { sku: "S6-EH3P12K02-NV-YD-L", specEn: "12 kW · LV 40-60 V", priceEgp: 131760 },
    { sku: "S6-EH3P15K02-NV-YD-L", specEn: "15 kW · LV 40-60 V", priceEgp: 141530 },
    { sku: "S6-EH3P18K02-NV-YD-L", specEn: "18 kW · LV 40-60 V", priceEgp: 165585 },
  ],
);

const mustOffGridProducts = familyRows(
  {
    categorySlug: "off-grid",
    familySlug: "must-eco-exp",
    brandSlug: "must",
    warrantyYears: 1,
  },
  [
    { sku: "ECO1.6", specEn: "1.6 kW · 12 V · 80 A", priceEgp: 10835 },
    { sku: "ECO3.6", specEn: "3.6 kW · 24 V · 100 A", priceEgp: 13105 },
    { sku: "EXP4", specEn: "4 kW · 24 V · 100 A", priceEgp: 19915 },
    { sku: "ECO5.5", specEn: "5.5 kW · 48 V · 100 A", priceEgp: 18245 },
    { sku: "ECO6", specEn: "6 kW · 48 V · 120 A", priceEgp: 18800 },
    { sku: "EXP6", specEn: "6 kW · 48 V · 120 A", priceEgp: 26655 },
    { sku: "EXP8", specEn: "8 kW · 48 V · 120 A", priceEgp: 38000 },
    { sku: "EXP10", specEn: "10 kW · 48 V · 150 A", priceEgp: 40320 },
    { sku: "EXP12", specEn: "12 kW · 48 V · 150 A", priceEgp: 46365 },
  ],
);

const felicityIvemProducts = familyRows(
  {
    categorySlug: "off-grid",
    familySlug: "felicity-ivem",
    brandSlug: "felicity",
    warrantyYears: 3,
  },
  [
    { sku: "IVEM1012", specEn: "1 kW · 12 V · 80 A", priceEgp: 9735 },
    { sku: "IVEM3024", specEn: "4 kW · 24 V · 100 A", priceEgp: 17570 },
    { sku: "IVEM6048", specEn: "6 kW · 48 V · 100 A", priceEgp: 23455 },
    { sku: "IVEM8048", specEn: "8 kW · 48 V · 120 A", priceEgp: 35140 },
    { sku: "IVEM12048", specEn: "12 kW · 48 V · 120 A", priceEgp: 48585 },
  ],
);

const dynessOffGridProducts = familyRows(
  {
    categorySlug: "off-grid",
    familySlug: "dyness-prem-max",
    brandSlug: "dyness",
    warrantyYears: 3,
  },
  [
    { sku: "DYS-PREM1.512", specEn: "1.5 kW · 12 V · 100 A", priceEgp: 11985 },
    { sku: "DYS-PREM0324", specEn: "3 kW · 24 V · 100 A", priceEgp: 12880 },
    { sku: "DYS-PREM4.224", specEn: "4.2 kW · 24 V · 120 A", priceEgp: 16015 },
    { sku: "DYS-PREM6.248", specEn: "6.2 kW · 48 V · 100 A", priceEgp: 18480 },
    { sku: "DYS-PREM0848", specEn: "8 kW · 48 V · 150 A", priceEgp: 32480 },
    { sku: "DYS-MAX0848", specEn: "8 kW · 48 V · 120 A", priceEgp: 38080 },
    { sku: "DYS-PREM1248", specEn: "12 kW · 48 V · 200 A", priceEgp: 38080 },
    { sku: "DYS-MAX1248", specEn: "12 kW · 48 V · 150 A", priceEgp: 46145 },
  ],
);

const felicityStorageProducts = familyRows(
  {
    categorySlug: "storage",
    familySlug: "felicity-fla",
    brandSlug: "felicity",
    warrantyYears: 5,
  },
  [
    { sku: "FLA12-200", specEn: "12 V · 200 Ah · 2.4 kWh", priceEgp: 22225 },
    { sku: "FLA24-100", specEn: "24 V · 100 Ah · 2.4 kWh", priceEgp: 27620 },
    { sku: "FLA24-200", specEn: "24 V · 200 Ah · 4.8 kWh", priceEgp: 47030 },
    { sku: "FLA24-300", specEn: "24 V · 300 Ah · 7.2 kWh", priceEgp: 70145 },
    { sku: "FLA48-100", specEn: "48 V · 100 Ah · 5.12 kWh", priceEgp: 48050 },
    { sku: "FLA48-200", specEn: "48 V · 200 Ah · 10.24 kWh", priceEgp: 91225 },
    { sku: "FLA48-300", specEn: "48 V · 300 Ah · 15.36 kWh", priceEgp: 123985 },
  ],
);

const mustStorageProducts = familyRows(
  {
    categorySlug: "storage",
    familySlug: "must-lifepo4",
    brandSlug: "must",
    warrantyYears: 5,
  },
  [
    { sku: "MUST-12-100", specEn: "12 V · 100 Ah · 1.2 kWh", priceEgp: 12245 },
    { sku: "MUST-12-200", specEn: "12 V · 200 Ah · 2.4 kWh", priceEgp: 22480 },
    { sku: "MUST-24-100", specEn: "24 V · 100 Ah · 2.4 kWh", priceEgp: 28525 },
    { sku: "MUST-24-200", specEn: "24 V · 200 Ah · 4.8 kWh", priceEgp: 53375 },
    { sku: "MUST-48-100", specEn: "48 V · 100 Ah · 4.8 kWh", priceEgp: 47880 },
    { sku: "MUST-48-200", specEn: "48 V · 200 Ah · 9.6 kWh", priceEgp: 94700 },
    { sku: "MUST-48-300", specEn: "48 V · 300 Ah · 14.4 kWh", priceEgp: 121865 },
  ],
);

const dynessStorageProducts = familyRows(
  {
    categorySlug: "storage",
    familySlug: "dyness-lifepo4",
    brandSlug: "dyness",
    warrantyYears: 10,
  },
  [
    { sku: "LR1.2", specEn: "12 V · 100 Ah · 3000 cycles", priceEgp: 11540, tags: [] },
    { sku: "DL2.5", specEn: "24 V · 100 Ah · 6000 cycles", priceEgp: 26325 },
    { sku: "DL5.0C", specEn: "48 V · 100 Ah · 5.12 kWh", priceEgp: 45920 },
    { sku: "Powerbox-G2", specEn: "48 V · 200 Ah · IP65 · 10.24 kWh", priceEgp: 97440 },
    { sku: "Powerbrick", specEn: "48 V · 280 Ah · 13.44 kWh", priceEgp: 117600 },
  ],
);

const dynessStackProducts = familyRows(
  {
    categorySlug: "storage",
    familySlug: "dyness-stack-hv",
    brandSlug: "dyness",
    warrantyYears: 10,
    tags: ["stack_bank"],
  },
  [
    { sku: "Stack-100", specEn: "51.2 V · 100 A module", priceEgp: 57835 },
    { sku: "SBDU100", specEn: "Stack 100 base unit", priceEgp: 54345 },
    { sku: "S51100-Expand", specEn: "Expansion module", priceEgp: 17325 },
    { sku: "Stack-280", specEn: "51.2 V · 280 A module", priceEgp: 129250 },
    { sku: "SBDU280", specEn: "Stack 280 base unit", priceEgp: 95760 },
    { sku: "S51280-Expand", specEn: "Expansion module", priceEgp: 34720 },
  ],
);

const mountingProducts: SeedProduct[] = [
  product({
    sku: "Galvanised-3mm",
    categorySlug: "mounting-cable",
    familySlug: "mounting-steel",
    nameEn: "Galvanised 3 mm",
    nameAr: "هيكل مجلفن 3 مم",
    specEn: "Fixed + aluminium clamp · per 1 kW",
    specAr: "ثابت + كلامب ألومنيوم · لكل 1 كيلوواط",
    priceEgp: 1815,
    priceUnit: "per_kw",
    warrantyYears: 20,
  }),
  product({
    sku: "Galvanised-2mm",
    categorySlug: "mounting-cable",
    familySlug: "mounting-steel",
    nameEn: "Galvanised 2 mm",
    nameAr: "هيكل مجلفن 2 مم",
    specEn: "Fixed + bolts · per 2 panels",
    specAr: "ثابت + مسامير · لكل لوحين",
    priceEgp: 1615,
    warrantyYears: 20,
  }),
  product({
    sku: "Aluminium-rail-set",
    categorySlug: "mounting-cable",
    familySlug: "mounting-steel",
    brandSlug: "sunracks",
    nameEn: "Aluminium rail set",
    nameAr: "طقم قضبان ألومنيوم",
    specEn: "SUNRACKS · clamp system · per 1 kW",
    specAr: "SUNRACKS · نظام كلامب · لكل 1 كيلوواط",
    priceUnit: "per_kw",
    availability: "quote_only",
    stockQty: 0,
    tags: ["quote_only"],
  }),
];

const kbeProducts = familyRows(
  {
    categorySlug: "mounting-cable",
    familySlug: "kbe-dc",
    brandSlug: "kbe",
    warrantyYears: 10,
    priceUnit: "per_metre",
    tags: ["cut_to_length"],
  },
  [
    { sku: "KBE-4", specEn: "4 mm² · 1000 V DC · TÜV", priceEgp: 64.1 },
    { sku: "KBE-6", specEn: "6 mm² · 1000 V DC · TÜV", priceEgp: 88.7 },
    { sku: "KBE-10", specEn: "10 mm² · 1000 V DC · TÜV", priceEgp: 240.2 },
    { sku: "KBE-16", specEn: "16 mm² · 1000 V DC · TÜV", priceEgp: 345 },
    { sku: "KBE-25", specEn: "25 mm² · 1000 V DC · TÜV", priceEgp: 455.8 },
    { sku: "KBE-35", specEn: "35 mm² · 1000 V DC · TÜV", priceEgp: 609.8 },
  ],
);

const atorkDcProducts = familyRows(
  {
    categorySlug: "mounting-cable",
    familySlug: "atork-dc",
    brandSlug: "atork",
    priceUnit: "per_metre",
    tags: ["cut_to_length"],
  },
  [
    { sku: "ATORK-1x4", specEn: "1×4 mm² · single core", priceEgp: 41.5 },
    { sku: "ATORK-1x6", specEn: "1×6 mm² · single core", priceEgp: 57.2 },
    { sku: "ATORK-2x4-round", specEn: "2×4 mm² · double · round", priceEgp: 94.6 },
    { sku: "ATORK-2x4-flat", specEn: "2×4 mm² · double · flat", priceEgp: 87.4 },
    { sku: "ATORK-2x6-round", specEn: "2×6 mm² · double · round", priceEgp: 135.4 },
    { sku: "ATORK-2x6-flat", specEn: "2×6 mm² · double · flat", priceEgp: 123.8 },
    { sku: "ATORK-10", specEn: "10 mm² · single core", priceEgp: 115 },
    { sku: "ATORK-16", specEn: "16 mm² · single core", priceEgp: 179.1 },
    { sku: "ATORK-25", specEn: "25 mm² · single core", priceEgp: 324.7 },
    { sku: "ATORK-35", specEn: "35 mm² · single core", priceEgp: 426.6 },
    { sku: "ATORK-50", specEn: "50 mm² · single core", priceEgp: 541.6 },
  ],
);

const turenProducts = familyRows(
  {
    categorySlug: "mounting-cable",
    familySlug: "turen-kablo",
    brandSlug: "turen",
    warrantyYears: 10,
    priceUnit: "per_metre",
    tags: ["cut_to_length"],
  },
  [
    { sku: "Turen-3x4", specEn: "3×4 mm² · flat submersible", priceEgp: 200.5 },
    { sku: "Turen-3x6", specEn: "3×6 mm² · flat submersible", priceEgp: 309.1 },
    { sku: "Turen-3x10", specEn: "3×10 mm² · flat submersible", priceEgp: 455.8 },
    { sku: "Turen-3x16", specEn: "3×16 mm² · flat submersible", priceEgp: 711.2 },
    { sku: "Turen-3x25", specEn: "3×25 mm² · flat submersible", priceEgp: 1065 },
    { sku: "Turen-3x35", specEn: "3×35 mm² · flat submersible", priceEgp: 1510 },
    { sku: "Turen-3x50", specEn: "3×50 mm² · flat submersible", priceEgp: 2165 },
    { sku: "Turen-3x70", specEn: "3×70 mm² · flat submersible", priceEgp: 3045 },
    { sku: "Turen-3x95", specEn: "3×95 mm² · flat submersible", priceEgp: 4095 },
  ],
);

const atorkPumpProducts = familyRows(
  {
    categorySlug: "mounting-cable",
    familySlug: "atork-pump",
    brandSlug: "atork",
    warrantyYears: 1,
    priceUnit: "per_metre",
    tags: ["cut_to_length"],
  },
  [
    { sku: "ATORK-pump-3x4", specEn: "3×4 mm² · flat submersible", priceEgp: 127.7 },
    { sku: "ATORK-pump-3x6", specEn: "3×6 mm² · flat submersible", priceEgp: 189.3 },
    { sku: "ATORK-pump-3x10", specEn: "3×10 mm² · flat submersible", priceEgp: 301.3 },
    { sku: "ATORK-pump-3x16", specEn: "3×16 mm² · flat submersible", priceEgp: 487.2 },
    { sku: "ATORK-pump-3x25", specEn: "3×25 mm² · flat submersible", priceEgp: 760.5 },
    { sku: "ATORK-pump-3x35", specEn: "3×35 mm² · flat submersible", priceEgp: 1090 },
    { sku: "ATORK-pump-3x50", specEn: "3×50 mm² · flat submersible", priceEgp: 1540 },
  ],
);

const suntreeProducts = familyRows(
  {
    categorySlug: "protection",
    familySlug: "suntree-dc",
    brandSlug: "suntree",
    warrantyYears: 2,
  },
  [
    { sku: "SUNTREE-FUSE-1P-32", specEn: "Fuse + holder 1P · 25–32 A · 1000 V DC", priceEgp: 207.5 },
    { sku: "SUNTREE-FUSE-1P-50", specEn: "Fuse + holder 1P · 40–50 A · 1000 V DC", priceEgp: 446.9 },
    { sku: "SUNTREE-CB-4P-63", specEn: "C.B. 4P · 32–63 A · 1000 V DC", priceEgp: 1140 },
    { sku: "SUNTREE-MCCB-4P-80", specEn: "MCCB 4P · 80 A", priceEgp: 3140 },
    { sku: "SUNTREE-MCCB-2P-250", specEn: "MCCB 2P · 125–250 A", priceEgp: 4045 },
    { sku: "SUNTREE-MCCB-2P-320", specEn: "MCCB 2P · 320 A", priceEgp: 6385 },
    { sku: "SUNTREE-MCCB-2P-400", specEn: "MCCB 2P · 400 A", priceEgp: 11170 },
    { sku: "SUNTREE-MCCB-2P-630", specEn: "MCCB 2P · 630 A", priceEgp: 19895 },
    { sku: "SUNTREE-MCCB-2P-800", specEn: "MCCB 2P · 800 A", priceEgp: 29155 },
    { sku: "SUNTREE-MC4-PAIR", specEn: "MC4 pair · 1000 V · 30 A", priceEgp: 58.5 },
    { sku: "SUNTREE-SPD-T2", specEn: "Surge protector · Type II · 1000 V DC", priceEgp: 2130 },
  ],
);

const kayalDcProducts = familyRows(
  {
    categorySlug: "protection",
    familySlug: "kayal-dc",
    brandSlug: "kayal",
    warrantyYears: 1,
  },
  [
    { sku: "KAYAL-FUSE-1P-32", specEn: "Fuse + holder 1P · 15–32 A", priceEgp: 127.7 },
    { sku: "KAYAL-FUSE-1P-50", specEn: "Fuse + holder 1P · 40–50 A", priceEgp: 354.3 },
    { sku: "KAYAL-CB-2P-63", specEn: "C.B. 2P · 32–63 A", priceEgp: 262.8 },
    { sku: "KAYAL-CB-4P-63", specEn: "C.B. 4P · 32–63 A", priceEgp: 354.3 },
    { sku: "KAYAL-MCCB-4P-125", specEn: "MCCB 4P · 100–125 A", priceEgp: 1700 },
    { sku: "KAYAL-MCCB-4P-250", specEn: "MCCB 4P · 160–250 A", priceEgp: 2480 },
    { sku: "KAYAL-MCCB-4P-400", specEn: "MCCB 4P · 400 A", priceEgp: 6385 },
    { sku: "KAYAL-MCCB-4P-800", specEn: "MCCB 4P · 800 A", priceEgp: 21280 },
    { sku: "KAYAL-MC4-SINGLE", specEn: "MC4 single · 1000 V", priceEgp: 28.7 },
    { sku: "KAYAL-MC4-DOUBLE", specEn: "MC4 double · 1000 V · 2x1", priceEgp: 262.8 },
  ],
);

const kayalCombinerProducts = familyRows(
  {
    categorySlug: "protection",
    familySlug: "kayal-combiner",
    brandSlug: "kayal",
    warrantyYears: 1,
  },
  [
    { sku: "KYV-CD06", specEn: "6 DC inputs · 160 A MCCB", priceEgp: 10640 },
    { sku: "KYV-CD08", specEn: "8 DC inputs · 160 A", priceEgp: 11650 },
    { sku: "KYV-CD10", specEn: "10 DC inputs · 200 A", priceEgp: 13830 },
    { sku: "KYV-CD12", specEn: "12 DC inputs · 260 A", priceEgp: 15320 },
    { sku: "KYV-CD14", specEn: "14 DC inputs · 250 A", priceEgp: 18725 },
    { sku: "KYV-CD16", specEn: "16 DC inputs · 320 A", priceEgp: 20145 },
    { sku: "KYV-CD20", specEn: "20 DC inputs · 500 A", priceEgp: 26955 },
  ],
);

const linuoProducts = familyRows(
  {
    categorySlug: "water-heating",
    familySlug: "linuo-ritter",
    brandSlug: "linuo-ritter",
    warrantyYears: 5,
  },
  [
    {
      sku: "LINUO-200",
      nameEn: "Linuo Ritter 200 L",
      nameAr: "سخان Linuo Ritter 200 لتر",
      specEn: "Non-pressurised 200 L · 20 vacuum tubes",
      priceEgp: 39425,
    },
    {
      sku: "LINUO-250",
      nameEn: "Linuo Ritter 250 L",
      nameAr: "سخان Linuo Ritter 250 لتر",
      specEn: "Non-pressurised 250 L · 25 vacuum tubes",
      priceEgp: 46695,
    },
    {
      sku: "LINUO-300",
      nameEn: "Linuo Ritter 300 L",
      nameAr: "سخان Linuo Ritter 300 لتر",
      specEn: "Non-pressurised 300 L · 30 vacuum tubes",
      priceEgp: 56795,
    },
    {
      sku: "LINUO-360",
      nameEn: "Linuo Ritter 360 L",
      nameAr: "سخان Linuo Ritter 360 لتر",
      specEn: "Non-pressurised 360 L · 36 vacuum tubes",
      priceEgp: 67390,
    },
    {
      sku: "LINUO-P240",
      nameEn: "Linuo Ritter 240 L pressurised",
      nameAr: "سخان Linuo Ritter 240 لتر مضغوط",
      specEn: "Pressurised 240 L · 24 tubes · copper coil",
      priceEgp: 69980,
    },
    {
      sku: "LINUO-P300",
      nameEn: "Linuo Ritter 300 L pressurised",
      nameAr: "سخان Linuo Ritter 300 لتر مضغوط",
      specEn: "Pressurised 300 L · 30 tubes · copper coil",
      priceEgp: 86485,
    },
  ],
);

const nobelProducts = familyRows(
  {
    categorySlug: "water-heating",
    familySlug: "nobel",
    brandSlug: "nobel",
    warrantyYears: 5,
  },
  [
    {
      sku: "NOBEL-200",
      nameEn: "Nobel 200 L",
      nameAr: "سخان Nobel 200 لتر",
      specEn: "Closed loop 200 L · enamelled double jacket",
      priceEgp: 101640,
    },
    {
      sku: "NOBEL-300",
      nameEn: "Nobel 300 L",
      nameAr: "سخان Nobel 300 لتر",
      specEn: "Closed loop 300 L · enamelled double jacket",
      priceEgp: 127140,
    },
  ],
);

const heatmasterProducts = familyRows(
  {
    categorySlug: "pool-heating",
    familySlug: "heatmaster",
    brandSlug: "heatmaster",
    warrantyYears: 3,
  },
  [
    {
      sku: "X20-10P",
      specEn: "R290 · full inverter · 9.8 kW · COP 16.1 · hot tub",
      priceEgp: 109000,
    },
    {
      sku: "HeatMaster-I",
      specEn: "R410 · inverter · 13.3 kW · COP 15.0 · 15–30 m³",
      priceEgp: 159000,
    },
    {
      sku: "X20-24P",
      specEn: "R290 · full inverter · 24 kW · COP 17 · 25–45 m³",
      priceEgp: 219000,
    },
    {
      sku: "X20-34P",
      specEn: "R290 · full inverter · 33.8 kW · COP 17 · 40–60 m³",
      priceEgp: 299000,
    },
    {
      sku: "HeatMaster-III",
      specEn: "R32 · turbo silence · 3-phase · 40 kW · COP 20.1 · 50–75 m³",
      priceEgp: 439000,
    },
    {
      sku: "HeatMaster-IV",
      specEn: "R32 · turbo silence · 3-phase · 60 kW · COP 17 · 70–120 m³",
      priceEgp: 595000,
    },
    {
      sku: "HeatMaster-E4-70",
      specEn: "R32 · heat & cool · 3-phase · 70 kW · COP 16.1 · 100–160 m³",
      priceEgp: 549000,
    },
  ],
);

export const seedProducts: SeedProduct[] = [
  ...panelProductsFixed,
  ...invtProducts,
  ...freconProducts,
  ...veichiProducts,
  ...vaconProducts,
  ...huaweiProducts,
  ...sungrowProducts,
  ...solisOnGridProducts,
  ...hybridProducts,
  ...mustOffGridProducts,
  ...felicityIvemProducts,
  ...dynessOffGridProducts,
  ...felicityStorageProducts,
  ...mustStorageProducts,
  ...dynessStorageProducts,
  ...dynessStackProducts,
  ...mountingProducts,
  ...kbeProducts,
  ...atorkDcProducts,
  ...turenProducts,
  ...atorkPumpProducts,
  ...suntreeProducts,
  ...kayalDcProducts,
  ...kayalCombinerProducts,
  ...linuoProducts,
  ...nobelProducts,
  ...heatmasterProducts,
];
