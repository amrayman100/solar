import { MonthlyConsumptionForm } from "@/components/product/grid-tied/monthly-consumption-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TypographyH2, TypographyH4 } from "@/components/shared/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/home/product-card";
import { TrackRecordCard } from "@/components/home/track-record-card";
import { TestimonialCard } from "@/components/home/testimonial-card";
import { ProductsDropdown } from "@/components/home/products-dropdown";
import Link from "next/link";
import { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import { TRACK_RECORD_PROJECTS } from "@/lib/site-content";
import {
  FAQ_ITEMS,
  TESTIMONIALS,
  getFaqPageSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "Solar Energy Egypt | Bolt Energy Solar Solutions",
  description:
    "Bolt Energy delivers solar energy solutions in Egypt: grid-tied, off-grid, irrigation, and heating systems with expert design, installation, and monitoring.",
  path: "/",
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

export default async function Home() {
  return (
    <>
      <StructuredData
        id="schema-home"
        data={[
          getLocalBusinessSchema(),
          getWebSiteSchema(),
          getFaqPageSchema(),
        ]}
      />
      <main className="flex-grow w-screen">
        <Header />
        <div
          style={{ backgroundImage: `url(${"/drone-4-1.jpeg"})` }}
          className="bg-cover bg-center w-full h-96 lg:h-[600px] relative mt-2"
        >
          {/* Dark green overlay */}
          <div className="absolute inset-0 bg-emerald-950/60"></div>

          <div className="relative flex flex-col items-center justify-center h-full px-4 z-10">
            <div className="flex flex-col items-center gap-6 max-w-2xl w-full">
              <div className="text-center">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-white text-center leading-tight">
                  Solar Energy Solutions in Egypt — Design, Installation &amp;
                  Monitoring
                </h1>
                <p className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl text-white/90 text-center mt-3">
                  Get Your Free Solar Quote Instantly
                </p>
              </div>
              <MonthlyConsumptionForm />
            </div>
          </div>
        </div>

        {/* Our Products Section */}
        <div className="flex flex-col place-items-center w-100 justify-center mt-16 gap-8 mb-12">
          <ProductsDropdown />
          <div className="flex flex-wrap justify-center gap-4 px-4 max-w-7xl mx-auto">
            <ProductCard
              title="Grid Tied"
              description="By harnessing the sun's energy, you can generate your own electricity and send any excess back to the grid for credits."
              image="/grid-tied.jpeg"
              imageAlt="Grid-tied solar panel system for homes in Egypt by Bolt Energy"
              calculateLink="/product/grid-tied"
              learnMoreLink="/product/grid-tied"
            />
            <ProductCard
              title="Off Grid"
              description="Backup solar off-grid systems are your ticket to energy independence"
              image="/off-grid.png"
              imageAlt="Off-grid solar system with battery backup in Egypt"
              calculateLink="/product/off-grid"
              learnMoreLink="/product/off-grid"
            />
            <ProductCard
              title="Solar Irrigation"
              description="Imagine growing healthier crops, saving money, and becoming more eco-friendly all at the same time."
              image="/solar-irrig.jpg"
              imageAlt="Solar-powered irrigation system for farms in Egypt"
              calculateLink="/product/solar-irrigation"
              learnMoreLink="/product/solar-irrigation"
            />
            <ProductCard
              title="Solar Heating"
              description="Tired of Gas and Electric Bills, Smoke Them Out With Solar Heating!"
              image="/solar-heating.jpg"
              imageAlt="Solar water heating system for homes in Egypt"
              calculateLink="/product/solar-heating"
              learnMoreLink="/product/solar-heating"
            />
          </div>
        </div>

        {/* Track Record Section */}
        <div className="flex flex-col place-items-center w-100 justify-center mt-16 gap-8 mb-12">
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-center text-[#015231]">
            Track Record
          </h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 max-w-7xl mx-auto">
            {TRACK_RECORD_PROJECTS.map((project) => (
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
          <Link
            href="/projects"
            className="text-[#00bd70] font-semibold hover:underline"
          >
            View all installation projects →
          </Link>
        </div>
        {/* What our customers think Section */}
        <div className="flex flex-col place-items-center w-100 justify-center mt-16 gap-8 mb-12">
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-center text-[#015231]">
            What our customers think?
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 px-4 max-w-7xl mx-auto"
            style={{ overflow: "visible" }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                text={testimonial.text}
              />
            ))}
          </div>
        </div>
        {/* Your installation in 4 simple steps Section */}
        <div className="flex flex-col place-items-center w-full justify-center mt-16 gap-8 mb-12 px-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
            <h2 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight text-center text-[#015231]">
              Your installation in 4 simple steps
            </h2>
            <p className="text-lg md:text-2xl font-medium text-center text-[#015231] max-w-4xl mx-auto">
              We will accompany you through the whole process to make your path
              to clean energy as easy as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 w-full max-w-7xl justify-items-center">
              <div className="bg-[#f1f1f1] rounded-[28px] p-5 md:p-6 min-h-[180px] flex flex-col gap-[18px] justify-center items-center text-center w-full max-w-[580px]">
                <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                  Calculate your quote
                </h3>
                <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                  Run your solar simulation or contact our solar specialists.
                </p>
              </div>
              <div className="bg-[#f1f1f1] rounded-[28px] p-5 md:p-6 min-h-[180px] flex flex-col gap-[18px] justify-center items-center text-center w-full max-w-[580px]">
                <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                  Your study at 0 cost
                </h3>
                <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                  Get a personalized study of the installation you need
                </p>
              </div>
              <div className="bg-[#f1f1f1] rounded-[28px] p-5 md:p-6 min-h-[180px] flex flex-col gap-[18px] justify-center items-center text-center w-full max-w-[580px]">
                <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                  We perform the technical visit
                </h3>
                <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                  We will schedule a technical visit to examine the feasibility
                  of the project
                </p>
              </div>
              <div className="bg-[#f1f1f1] rounded-[28px] p-5 md:p-6 min-h-[180px] flex flex-col gap-[18px] justify-center items-center text-center w-full max-w-[580px]">
                <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                  Bring your bill to 0 EGP
                </h3>
                <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                  Schedule the installation in less than two weeks and bring
                  your bill to 0 EGP
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQs Section */}
        <div className="flex flex-col place-items-center w-100 justify-center mt-16 gap-8 mb-12">
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-center text-[#015231]">
            FAQs
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl px-4"
          >
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index + 1}`}
                className="border-b border-[#015231]"
              >
                <AccordionTrigger className="text-2xl font-bold text-[#015231] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#015231] pt-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Us Now Button */}
        <div className="flex justify-center mt-12 mb-16">
          <Button
            asChild
            className="bg-[#00bd70] hover:bg-[#00bd70]/90 h-[3.75rem] px-[67px] py-[10px] rounded-[0.8125rem] text-[1.5rem] font-semibold text-white"
          >
            <Link href="/contact-us">Contact Us Now</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
