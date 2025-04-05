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
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3
              text="Solar Irrigation"
              className="font-bold self-center"
            />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="Solar Irrigation"
              src={"/solar-irrig.jpg"}
              blurDataURL={"/solar-irrig.jpg"}
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
                <TypographyH3
                  text="Imagine growing healthier crops, saving money, and becoming more
          eco-friendly – all at the same time. Solar irrigation makes it
          possible! "
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light
                      text="• Slash Electricity Bills: Ditch the grid and power your
              irrigation system with free sunshine. Sun = Savings!"
                    />
                  </li>
                  <li>
                    <TypographyH4Light
                      text="• Drought-Proof Your Farm: Reliable access to water, even in
                remote areas or during power outages."
                    />
                  </li>
                  <li>
                    <TypographyH4Light
                      text="• Sustainable Superhero: Reduce your farm's carbon footprint and
                leave a lighter footprint on the planet."
                    />
                  </li>
                  <li>
                    <TypographyH4Light
                      text="• Boost Crop Quality: Consistent watering leads to healthier,
                more vibrant crops that fetch premium prices."
                    />
                  </li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    Solar irrigation is an investment that pays you back in
                    sunshine and success.
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    Interested to get a quotation?{" "}
                  </span>
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={"/proposal/solar-irrigation"}
                  >
                    Click here
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
