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

export const metadata: Metadata = {
  title: "Renewable Energy Solutions | Solar, Energy Storage",
  description:
    "Explore our comprehensive range of renewable energy solutions including solar energy systems, wind energy, solar heaters, solar pumps, heat pumps, on-grid and off-grid solutions, batteries (lithium-ion and lead-acid), solar lamps, and more.",
  keywords:
    "solar energy, renewable energy, wind energy, solar heaters, solar pumps, heat pumps, on grid, off grid, batteries, lithium ion, lead acid, solar lamps, solar headlights, watt, energy, power",
  openGraph: {
    title: "Renewable Energy Solutions | Solar, Wind & Energy Storage",
    description:
      "Comprehensive renewable energy solutions for sustainable power generation and storage.",
    images: [
      {
        url: "/drone-4-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Renewable Energy Solutions",
      },
    ],
  },
};

export default async function Home() {
  return (
    <>
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
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-white text-center mb-2">
                  Get Your Free Solar
                </h1>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-white text-center">
                  Quote Instantly
                </h1>
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
              calculateLink="/product/grid-tied"
              learnMoreLink="/product/grid-tied"
            />
            <ProductCard
              title="Off Grid"
              description="Backup solar off-grid systems are your ticket to energy independence"
              image="/off-grid.png"
              calculateLink="/product/off-grid"
              learnMoreLink="/product/off-grid"
            />
            <ProductCard
              title="Solar Irrigation"
              description="Imagine growing healthier crops, saving money, and becoming more eco-friendly all at the same time."
              image="/solar-irrig.jpg"
              calculateLink="/product/solar-irrigation"
              learnMoreLink="/product/solar-irrigation"
            />
            <ProductCard
              title="Solar Heating"
              description="Tired of Gas and Electric Bills, Smoke Them Out With Solar Heating!"
              image="/solar-heating.jpg"
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
            {/* Row 1 */}
            <TrackRecordCard
              title="Grid Tied System"
              power="13 KW"
              location="SKEIKH ZAYED, EGYPT"
              image="https://www.figma.com/api/mcp/asset/176702e1-5452-4fcd-93d5-a9300705d6d7"
            />
            <TrackRecordCard
              title="Back-up System"
              power="192 KW"
              location="New Administrative Capital, EGYPT"
              image="https://www.figma.com/api/mcp/asset/00342762-4a4f-441c-b126-ea6babf42217"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="16 KW"
              location="Allegria, SKEIKH ZAYED, EGYPT"
              image="https://www.figma.com/api/mcp/asset/0e49c53e-df84-4411-8a7f-b68b4c6a6314"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="30 KW"
              location="Pyramid Hills, EGYPT"
              image="https://www.figma.com/api/mcp/asset/b8965f67-8206-463b-9707-b590d8d27443"
            />
            {/* Row 2 */}
            <TrackRecordCard
              title="Grid Tied System"
              power="50 KW"
              location="SKEIKH ZAYED, EGYPT"
              image="https://www.figma.com/api/mcp/asset/70155e8a-b61d-4f97-afaa-277e73d2870e"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="9.5 KW"
              location="SKEIKH ZAYED, EGYPT"
              image="https://www.figma.com/api/mcp/asset/6ea1dde8-4cfc-4625-8668-7da714c83743"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="120 KW"
              location="SKEIKH ZAYED, EGYPT"
              image="https://www.figma.com/api/mcp/asset/6550483e-cca7-4bb3-9cc6-4112c7f31e8a"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="120 KW"
              location="GIZA, EGYPT"
              image="https://www.figma.com/api/mcp/asset/1e4e56e7-ceb2-4715-b767-86a81eb4b659"
            />
            {/* Row 3 */}
            <TrackRecordCard
              title="Grid Tied System"
              power="12 KW"
              location="Giza, EGYPT"
              image="https://www.figma.com/api/mcp/asset/401851c8-db6a-45d8-93ae-9324f5e1e545"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="20 KW"
              location="New Cairo, EGYPT"
              image="https://www.figma.com/api/mcp/asset/14e62a9b-5dc8-4213-915a-b2ed6e1651af"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="9 KW"
              location="New Cairo, EGYPT"
              image="/drone-7.jpeg"
            />
            <TrackRecordCard
              title="Grid Tied System"
              power="120 KW"
              location="EL KHATATBA, EGYPT"
              image="https://www.figma.com/api/mcp/asset/5d7d613e-26e8-4b16-8acd-0284fd72906d"
            />
          </div>
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
            <TestimonialCard
              name="Fady Iskandar"
              text="The level of professionalism was exemplary. All promises were fulfilled and there were no surprises. The installation process was seamless."
            />
            <TestimonialCard
              name="Walid Bazan"
              text="Bolt Energy is a good start up company, with more projects under their belt. Over all acceptable experience the system was delivered and installed and commissioned as designed and they have good follow up on trouble shooting and follow up until successful commissioning was achieved."
            />
            <TestimonialCard
              name="Stefano Soldi"
              text="I didn't expect to find such a great and professional people. Bolt Energy team is simply perfect. In few days I got an offer for my unit, and the installation procedure had been easy and smooth. I highly recommend this company to all my friends, neighbors and people that are interested in invest some money for a better and green future."
            />
            <TestimonialCard
              name="Ali Dessouki"
              text="Everyone was extremely professional and friendly and did everything to make the experience smooth and easy for me. I'm extremely satisfied with my experience and would definitely recommend to anyone."
            />
            <TestimonialCard
              name="Mohamed Fekry Aziz Saber Khalil"
              text="Professional company with good service and competitive prices"
            />
            <TestimonialCard
              name="Amr Ayman"
              text="Very professional and experienced team"
            />
          </div>
        </div>
        {/* Your installation in 4 simple steps Section */}
        <div className="flex flex-col place-items-center justify-center mt-16 gap-5 mb-12 px-4">
          <h2 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight text-center text-[#015231]">
            Your installation in 4 simple steps
          </h2>
          <p className="text-lg md:text-2xl font-medium text-center text-[#015231] max-w-4xl">
            We will accompany you through the whole process to make your path to
            clean energy as easy as possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mt-8 w-full">
            <div className="bg-[#f1f1f1] rounded-[28px] p-4 md:p-6 min-h-[160px] flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                Calculate your quote
              </h3>
              <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                Run your solar simulation or contact our solar specialists.
              </p>
            </div>
            <div className="bg-[#f1f1f1] rounded-[28px] p-4 md:p-6 min-h-[160px] flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                Your study at 0 cost
              </h3>
              <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                Get a personalized study of the installation you need
              </p>
            </div>
            <div className="bg-[#f1f1f1] rounded-[28px] p-4 md:p-6 min-h-[160px] flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                We perform the technical visit
              </h3>
              <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                We will schedule a technical visit to examine the feasibility of
                the project
              </p>
            </div>
            <div className="bg-[#f1f1f1] rounded-[28px] p-4 md:p-6 min-h-[160px] flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-semibold text-xl md:text-[32px] text-[#015231] text-center">
                Bring your bill to 0 EGP
              </h3>
              <p className="font-normal text-base md:text-2xl text-[#015231] text-center">
                Schedule the installation in less than two weeks and bring your
                bill to 0 EGP
              </p>
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
            <AccordionItem value="item-1" className="border-b border-[#015231]">
              <AccordionTrigger className="text-2xl font-bold text-[#015231] hover:no-underline">
                Why should I go solar?
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#015231] pt-4">
                Photovoltaic energy is emerging as a solid alternative to large
                electricity companies. The installation of solar panels offers
                clear benefits, including savings of up to 70% on electricity
                bills, driving many families towards solar self-consumption in
                our country. It also provides energy independence, increases the
                value of the property, contributes to combating climate change,
                and offers access to various grants and subsidies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-[#015231]">
              <AccordionTrigger className="text-2xl font-bold text-[#015231] hover:no-underline">
                How do solar panels work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#015231] pt-4">
                Solar panels convert sunlight into electricity through the
                photovoltaic process. Solar cells absorb sunlight to generate
                electricity, then an inverter converts this current into usable
                form for the home.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-[#015231]">
              <AccordionTrigger className="text-2xl font-bold text-[#015231] hover:no-underline">
                What is the maintenance of solar panels?
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#015231] pt-4">
                The care of solar panels is simple and minimal, we can usually
                take care of them ourselves. They are built to withstand weather
                conditions and usually only need occasional cleaning and checks
                to ensure they are working properly and to prevent damage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-[#015231]">
              <AccordionTrigger className="text-2xl font-bold text-[#015231] hover:no-underline">
                How are solar panels cleaned?
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#015231] pt-4">
                Solar panels usually require little maintenance thanks to their
                glass cover, which tends to keep them clean. Occasionally, if
                dirt such as leaves or debris accumulates, a gentle wash with
                water from a hose or using a soft sponge or brush is sufficient.
                Regular observation is key to identifying build-up that may
                affect its efficiency. In general, the protective coating on the
                panels allows rain and sun to keep them clean, minimizing the
                need for frequent cleaning.
              </AccordionContent>
            </AccordionItem>
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
