import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Solar Construction & Installation Egypt | Bolt Construction",
  description:
    "Professional solar construction and installation services in Egypt. Residential and commercial mounting, racking, and renewable energy infrastructure.",
  path: "/product/construction",
  keywords: ["solar construction egypt", "solar installation egypt", "bolt construction"],
  image: "/construction-man.jpeg",
  imageAlt: "Solar construction and installation team in Egypt",
});

export default async function Construction() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="Bolt Construction solar installation team working on a project in Egypt"
                src={"/contact-man.jpeg"}
                blurDataURL={"/contact-man.jpeg"}
                placeholder="blur"
                quality={80}
                fill
                sizes="(max-width: 1024px) 100vw, 363px"
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                Construction
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Bolt construction is Bolt&apos;s civil and implementation arm.
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  Our expert team provides professional construction and installation services for solar projects and beyond.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Our services are spread across three segments:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Solar plants Installations</li>
                  <li>Home finishing</li>
                  <li>General contracting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            Ready to start your construction project?
          </p>
          <Link
            href={"/proposal/construction"}
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
