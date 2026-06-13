import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";
import { RelatedProducts } from "@/components/seo/related-products";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/seo";
import { getServiceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Off-Grid Solar Systems Egypt | Energy Independence & Backup",
  description:
    "Off-grid solar power systems with battery storage in Egypt. Energy independence, backup power, and reliable electricity for remote homes and businesses.",
  path: "/product/off-grid",
  keywords: ["off grid solar egypt", "solar battery egypt", "backup solar egypt"],
  image: "/offgrid-ai.png",
  imageAlt: "Off-grid solar system with battery storage in Egypt",
});

export default async function OffGrid() {
  return (
    <>
      <StructuredData
        id="schema-off-grid"
        data={getServiceSchema("off-grid")}
      />
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="Off-grid solar system with battery backup in Egypt by Bolt Energy"
                src={"/offgrid-ai.png"}
                blurDataURL={"/offgrid-ai.png"}
                placeholder="blur"
                quality={80}
                fill
                sizes="(max-width: 1024px) 100vw, 363px"
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                Off-Grid Solar Solutions in Egypt
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Be Energy Independent
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  Backup solar off-grid systems are your ticket to energy independence. Imagine never worrying about power outages or soaring electricity bills again!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  How it works:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Solar Panels: Capture sunlight and convert it into electricity.</li>
                  <li>Batteries: Store excess energy for use during cloudy days or at night.</li>
                  <li>Inverter: Converts DC power from the panels and batteries into AC power for your appliances.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Benefits:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Reliability: Never be left in the dark again, even during power outages.</li>
                  <li>Cost Savings: Reduce your reliance on grid electricity and save money on energy bills.</li>
                  <li>Sustainability: Harness clean, renewable energy for a greener future.</li>
                  <li>Versatility: Perfect for homes, businesses, and remote locations.</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Compare options:{" "}
                <Link href="/resources/off-grid-vs-grid-tied-egypt" className="text-[#00bd70] hover:underline">
                  Off-grid vs grid-tied solar
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            Ready to take control of your energy future?
          </p>
          <Link
            href={"/proposal/off-grid"}
            className="bg-[#00bd70] hover:bg-[#00bd70]/90 flex items-center justify-center h-[39px] px-8 py-[10px] rounded-[8px] w-full max-w-[383px] transition-colors"
          >
            <span className="font-bold text-base text-white">Calculate Now</span>
          </Link>
        </div>
        <RelatedProducts />
      </main>
      <Footer />
    </>
  );
}
