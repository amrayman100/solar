import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HomeQuoteForm } from "@/components/home-quote-form";
import { HomeProductCard } from "@/components/home-product-card";
import { ProductsDropdown } from "@/components/products-dropdown";
import { TrackRecordCard } from "@/components/track-record-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { getTrackRecordProjects } from "@/lib/site-content";
import { createPageMetadata } from "@/lib/seo";
import {
  getFaqItems,
  getTestimonials,
  getFaqPageSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";
  return createPageMetadata({
    title: isAr
      ? "الطاقة الشمسية في مصر | حلول بولت إنرجي الشمسية"
      : "Solar Energy Egypt | Bolt Energy Solar Solutions",
    description: isAr
      ? "بولت إنرجي تقدم حلول الطاقة الشمسية في مصر: أنظمة مربوطة بالشبكة ومستقلة، وري وتسخين شمسي مع تصميم وتركيب ومراقبة احترافية."
      : "Bolt Energy delivers solar energy solutions in Egypt: grid-tied, off-grid, irrigation, and heating systems with expert design, installation, and monitoring.",
    path: `/${locale}`,
    keywords: [
      "solar egypt",
      "solar energy egypt",
      "solar panels egypt",
      "solar company egypt",
      "bolt energy egypt",
      "grid tied solar egypt",
      "off grid solar egypt",
      "solar irrigation egypt",
      "solar heating egypt",
      "solar installer egypt",
      "طاقة شمسية مصر",
      "شركات الطاقة الشمسية في مصر",
    ],
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const faqItems = await getFaqItems(locale);
  const testimonials = await getTestimonials(locale);
  const trackRecordProjects = getTrackRecordProjects(locale);

  return (
    <main className="w-full flex-1">
      <StructuredData
        id="schema-home"
        data={[
          getLocalBusinessSchema(testimonials),
          getWebSiteSchema(),
          getFaqPageSchema(faqItems),
        ]}
      />

      <section className="relative mt-2 flex min-h-[28rem] w-full items-center justify-center overflow-hidden py-10 sm:min-h-96 lg:h-[600px] lg:py-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/drone-4-1.jpeg)" }}
        />
        <div className="absolute inset-0 bg-emerald-950/60" />
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center text-white sm:gap-6">
          <div className="w-full">
            <h1 className="text-[1.65rem] font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-5xl">
              {t("titleFull")}
            </h1>
            <p className="mt-2 text-xl font-bold text-white/90 sm:mt-3 sm:text-2xl lg:text-4xl">
              {t("instantQuote")}
            </p>
          </div>
          <HomeQuoteForm />
        </div>
      </section>

      <section className="mb-12 mt-16 flex w-full flex-col items-center justify-center gap-8">
        <ProductsDropdown
          triggerText={t("ourProducts")}
          triggerClassName="flex items-center gap-2 rounded-md px-2 py-1 text-center text-4xl font-bold tracking-tight text-[#015231] hover:text-[#00bd70]"
        />
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4">
          <HomeProductCard
            title={t("products.gridTiedTitle")}
            description={t("products.gridTiedDescription")}
            image="/grid-tied.jpeg"
            imageAlt="Grid-tied solar panel system for homes in Egypt by Bolt Energy"
            href="/product/grid-tied"
          />
          <HomeProductCard
            title={t("products.offGridTitle")}
            description={t("products.offGridDescription")}
            image="/off-grid.png"
            imageAlt="Off-grid solar system with battery backup in Egypt"
            href="/product/off-grid"
          />
          <HomeProductCard
            title={t("products.irrigationTitle")}
            description={t("products.irrigationDescription")}
            image="/solar-irrig.jpg"
            imageAlt="Solar-powered irrigation system for farms in Egypt"
            href="/product/solar-irrigation"
          />
          <HomeProductCard
            title={t("products.heatingTitle")}
            description={t("products.heatingDescription")}
            image="/solar-heating.jpg"
            imageAlt="Solar water heating system for homes in Egypt"
            href="/product/solar-heating"
          />
        </div>
      </section>

      <section className="mb-12 mt-16 flex w-full flex-col items-center justify-center gap-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#015231]">
          {t("trackRecord")}
        </h2>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-4">
          {trackRecordProjects.map((project) => (
            <TrackRecordCard
              key={project.slug}
              title={project.systemType}
              power={project.power}
              location={project.location}
              image={project.image}
              imageAlt={project.imageAlt}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>
        <Link href="/projects" className="font-semibold text-[#00bd70] hover:underline">
          {t("viewAllProjects")}
        </Link>
      </section>

      <section className="mb-12 mt-16 flex w-full flex-col items-center justify-center gap-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#015231]">
          {t("testimonials")}
        </h2>
        <div
          className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-x-4 gap-y-8 px-4 md:grid-cols-2 lg:grid-cols-3"
          style={{ overflow: "visible" }}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              text={testimonial.text}
            />
          ))}
        </div>
      </section>

      <section className="mb-12 mt-16 flex w-full flex-col items-center justify-center gap-8 px-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#015231] md:text-4xl">
            {t("stepsTitle")}
          </h2>
          <p className="mx-auto max-w-4xl text-center text-lg font-medium text-[#015231] md:text-2xl">
            {t("stepsSubtitle")}
          </p>
          <div className="grid w-full max-w-7xl grid-cols-1 justify-items-center gap-2 md:grid-cols-2 md:gap-3">
            {(
              [
                ["step1Title", "step1Body"],
                ["step2Title", "step2Body"],
                ["step3Title", "step3Body"],
                ["step4Title", "step4Body"],
              ] as const
            ).map(([titleKey, bodyKey]) => (
              <div
                key={titleKey}
                className="flex min-h-[180px] w-full max-w-[580px] flex-col items-center justify-center gap-[18px] rounded-[28px] bg-[#f1f1f1] p-5 text-center md:p-6"
              >
                <h3 className="text-center text-xl font-semibold text-[#015231] md:text-[32px]">
                  {t(titleKey)}
                </h3>
                <p className="text-center text-base font-normal text-[#015231] md:text-2xl">
                  {t(bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12 mt-16 flex w-full flex-col items-center justify-center gap-8">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#015231]">
          {t("faqs")}
        </h2>
        <FaqAccordion items={faqItems} />
      </section>

      <div className="mb-16 mt-12 flex justify-center">
        <Link
          href="/contact-us"
          className="flex h-[3.75rem] items-center justify-center rounded-[0.8125rem] bg-[#00bd70] px-[67px] py-[10px] text-[1.5rem] font-semibold text-white hover:bg-[#00bd70]/90"
        >
          {t("contactNow")}
        </Link>
      </div>
    </main>
  );
}
