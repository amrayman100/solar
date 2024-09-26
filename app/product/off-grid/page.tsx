import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";

export default async function OffGrid() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3 text="Off Grid" className="font-bold self-center" />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <div>
              <Image
                alt="Off Grid"
                src={"/offgrid-ai.png"}
                blurDataURL={"/offgrid-ai.png"}
                placeholder="blur"
                quality={100}
                height={500}
                width={600}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex justify-center h-full">
              <div className="m-auto flex flex-col">
                <TypographyH3 text="Be Energy Independent" />
                <TypographyH3
                  text="Backup solar off-grid systems are your ticket to energy independence. Imagine never worrying about power outages or soaring electricity bills again!"
                  className="font-normal mt-2"
                />
                <TypographyH3
                  text="How it works:"
                  className="font-normal mt-2"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Solar Panels: Capture sunlight and convert it into electricity." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Batteries: Store excess energy for use during cloudy days or at night." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Inverter: Converts DC power from the panels and batteries into AC power for your appliances." />
                  </li>
                </ul>
                <TypographyH3 text="Benefits:" className="font-normal mt-4" />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Reliability: Never be left in the dark again, even during power outages." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Cost Savings: Reduce your reliance on grid electricity and save money on energy bills." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Sustainability: Harness clean, renewable energy for a greener future." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Versatility: Perfect for homes, businesses, and remote locations." />
                  </li>
                </ul>
                <TypographyH3
                  text="Whether you're looking to:"
                  className="font-normal mt-4"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Power your home: Enjoy uninterrupted electricity even during grid failures." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Run a business: Ensure critical operations continue without interruption." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Live off the grid: Achieve complete energy independence." />
                  </li>
                </ul>
                <TypographyH3
                  text="Backup solar off-grid systems are the solution."
                  className="font-normal mt-4"
                />
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    Ready to take control of your energy future? Let us discuss
                    how a backup solar off-grid system can benefit you!
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={"/proposal/off-grid"}
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
