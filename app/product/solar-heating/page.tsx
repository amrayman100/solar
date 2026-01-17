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
  title: "Solar Heating | Solar Heating Solutions",
  description:
    "Harness the power of the sun to provide hot water and pool heating, saving you money and helping the planet.",
  keywords:
    "solar heating, solar heating solutions, hot water, pool heating, solar power, energy savings, renewable energy",
  openGraph: {
    title: "Solar Heating | Solar Heating Solutions",
    description:
      "Harness the power of the sun to provide hot water and pool heating, saving you money and helping the planet.",
    images: [
      {
        url: "/solar-heat-ai.png",
        width: 600,
        height: 500,
      },
    ],
  },
};

export default async function SolarHeating() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="Solar Heating"
                src={"/solar-heat-ai.png"}
                blurDataURL={"/solar-heat-ai.png"}
                placeholder="blur"
                quality={100}
                fill
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                Solar Heating
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Tired of Gas and Electric Bills, Smoke Them Out With Solar Heating!
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  This innovative system harnesses the power of the sun to provide hot water and pool heating, saving you money and helping the planet.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Key benefits:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Lower Energy Bills: Reduce your reliance on traditional water heaters and pool heaters. Sunshine is free, so are your savings!</li>
                  <li>Endless Hot Water: Enjoy consistent hot showers and baths, even on cloudy days (with a backup system).</li>
                  <li>Sustainable Choice: Go green and reduce your carbon footprint with a clean, renewable energy source.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            Ready to unlock the power of the sun?
          </p>
          <Link
            href={"/proposal/solar-heating"}
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
