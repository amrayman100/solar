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
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3 text="Grid Tied" className="font-bold self-center" />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="Grid Tied"
              src={"/grid-tied.jpeg"}
              blurDataURL={"/grid-tied.jpeg"}
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
                <TypographyH3 text="Harness the Sun's Power for Free! " />
                <TypographyH3
                  text="Grid-tied solar systems are a smart investment that can significantly reduce your electricity bills. By harnessing the sun's energy, you can generate your own electricity and send any excess back to the grid for credits. "
                  className="font-normal mt-2"
                />
                <TypographyH3
                  text="Key benefits:"
                  className="font-normal mt-2"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Lower electricity bills: Reduce your reliance on the grid and save money on energy costs." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Environmental friendly: Contribute to a cleaner planet by reducing your carbon footprint." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Easy installation: Grid-tied systems are relatively easy to install and require minimal maintenance." />
                  </li>
                </ul>
                <TypographyH3
                  text="How it works:"
                  className="font-normal mt-2"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Solar panels: Capture sunlight and convert it into electricity." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Inverter: Converts DC power from the panels into AC power for your home." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Net Meter: Excess electricity is sent back to the grid for credits." />
                  </li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    Ready to start saving money and the environment?
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={{
                      pathname: "/proposal/grid-tied",
                      query: { startFromBeginning: true },
                    }}
                  >
                    Contact us today for a free consultation!
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
