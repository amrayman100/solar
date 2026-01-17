import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Irrigation | Solar Irrigation Solutions",
  description:
    "Harness the power of the sun to irrigate your crops, saving you money and helping the planet.",
  keywords:
    "solar irrigation, solar irrigation solutions, irrigation, crops, water, energy savings, renewable energy",
  openGraph: {
    title: "Solar Irrigation | Solar Irrigation Solutions",
    description:
      "Harness the power of the sun to irrigate your crops, saving you money and helping the planet.",
    images: [
      {
        url: "/solar-irrig.jpg",
        width: 600,
        height: 500,
      },
    ],
  },
};

export default async function SolarIrrigationPage() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="Solar Irrigation"
                src={"/solar-irrig.jpg"}
                blurDataURL={"/solar-irrig.jpg"}
                placeholder="blur"
                quality={100}
                fill
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                Solar Irrigation
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Imagine growing healthier crops, saving money, and becoming more eco-friendly – all at the same time.
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  Solar irrigation makes it possible! Harness the power of the sun to irrigate your crops, saving you money and helping the planet.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Key benefits:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Slash Electricity Bills: Ditch the grid and power your irrigation system with free sunshine. Sun = Savings!</li>
                  <li>Drought-Proof Your Farm: Reliable access to water, even in remote areas or during power outages.</li>
                  <li>Sustainable Superhero: Reduce your farm's carbon footprint and leave a lighter footprint on the planet.</li>
                  <li>Boost Crop Quality: Consistent watering leads to healthier, more vibrant crops that fetch premium prices.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            Solar irrigation is an investment that pays you back in sunshine and success.
          </p>
          <Link
            href={"/proposal/solar-irrigation"}
            className="bg-[#00bd70] hover:bg-[#00bd70]/90 flex items-center justify-center h-[39px] px-8 py-[10px] rounded-[8px] w-full max-w-[383px] transition-colors"
          >
            <span className="font-bold text-base text-white">Calculate Now</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
