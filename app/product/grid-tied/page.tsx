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
  title: "Grid-Tied Solar Systems | Energy Independence",
  description:
    "Harness the sun's power for free with grid-tied solar systems. Send excess electricity back to the grid for credits and reduce your energy bills.",
  keywords:
    "grid-tied solar systems, energy independence, solar power, energy savings, renewable energy",
  openGraph: {
    title: "Grid-Tied Solar Systems | Energy Independence",
    description:
      "Harness the sun's power for free with grid-tied solar systems. Send excess electricity back to the grid for credits and reduce your energy bills.",
    images: [
      {
        url: "/grid-tied.jpeg",
        width: 600,
        height: 500,
      },
    ],
  },
};

export default async function GridTied() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="Grid Tied"
                src={"/grid-tied.jpeg"}
                blurDataURL={"/grid-tied.jpeg"}
                placeholder="blur"
                quality={100}
                fill
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                Grid Tied
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Harness the Sun's Power for Free!
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  Grid-tied solar systems are a smart investment that can significantly reduce your electricity bills. By harnessing the sun's energy, you can generate your own electricity and send any excess back to the grid for credits.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Key benefits:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Lower electricity bills: Reduce your reliance on the grid and save money on energy costs.</li>
                  <li>Environmental friendly: Contribute to a cleaner planet by reducing your carbon footprint.</li>
                  <li>Easy installation: Grid-tied systems are relatively easy to install and require minimal maintenance.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  How it works:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Solar panels: Capture sunlight and convert it into electricity.</li>
                  <li>Inverter: Converts DC power from the panels into AC power for your home.</li>
                  <li>Net Meter: Excess electricity is sent back to the grid for credits.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            Ready to start saving money and the environment?
          </p>
          <Link
            href={{
              pathname: "/proposal/grid-tied",
              query: { startFromBeginning: true },
            }}
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
