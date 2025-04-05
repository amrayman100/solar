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
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3
              text="Solar Heating"
              className="font-bold self-center"
            />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="Solar Heating"
              src={"/solar-heat-ai.png"}
              blurDataURL={"/solar-heat-ai.png"}
              placeholder="blur"
              quality={100}
              height={500}
              width={500}
              style={{
                objectFit: "cover",
              }}
            />
            <div className="flex justify-center h-full">
              <div className="m-auto flex flex-col">
                <TypographyH3 text="Tired of Gas and Electric Bills, Smoke Them Out With Solar Heating! " />
                <TypographyH3
                  text="This innovative system harnesses the power of the sun to provide hot water and pool heating, saving you money and helping the planet. "
                  className="font-normal mt-2"
                />
                <TypographyH3 text="Imagine:" className="font-normal mt-2" />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Lower Energy Bills: Reduce your reliance on traditional water heaters and pool heaters. Sunshine is free, so are your savings!" />
                  </li>
                  <li>
                    <TypographyH4Light text="• Endless Hot Water: Enjoy consistent hot showers and baths, even on cloudy days (with a backup system)." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Sustainable Choice: Go green and reduce your carbon footprint with a clean, renewable energy source." />
                  </li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    Ready to unlock the power of the sun?
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={"/proposal/solar-heating"}
                  >
                    Click here for a free consultation!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
