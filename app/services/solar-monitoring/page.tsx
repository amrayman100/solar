import { MonitoringForm } from "@/components/services/monitoring/monitoring-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH3,
  TypographyH4Light,
} from "@/components/shared/typography";
import Image from "next/image";

export default async function SolarMonitoring() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3
              text="Smart Monitoring"
              className="font-bold self-center"
            />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="Smart Monitoring"
              src={"/monit.jpg"}
              blurDataURL={"/monit.jpg"}
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
                <TypographyH3 text="Take Control of Your Energy Bill with Smart Monitoring!" />
                <TypographyH4Light text="Feeling like your energy bills are a mystery? Want to slash those costs and become more eco-friendly? Energy monitoring is your secret weapon!" />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• See Where Your Energy Goes: Identify 'energy vampires' in your home - those appliances secretly sucking up power." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Track Your Savings: Monitor your energy usage in real-time and see the impact of your efforts to conserve." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Gain Control: Make informed decisions about your energy consumption and adjust habits to save money." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Empower Your Eco Efforts: See the environmental impact of your energy use and reduce your carbon footprint." />
                  </li>
                </ul>

                <TypographyH4Light text="Energy monitoring is simple:" />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Smart Devices: Install smart plugs or a whole-home energy monitor to track overall usage." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Real-Time Data: Access easy-to-understand reports to see exactly how much energy you're using." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Gain Control: Make informed decisions about your energy consumption and adjust habits to save money." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Actionable Insights: Gain valuable insights to identify areas for improvement." />
                  </li>
                </ul>
                <div className="mt-10">
                  <div className="text-[0px]">
                    <span className="text-2xl text-primary font-bold">
                      Stop wondering where your money goes!
                    </span>
                    <span className="text-2xl">
                      {" "}
                      Start monitoring your energy use today and take control of
                      your bills and your environmental impact.
                    </span>{" "}
                  </div>

                  <div className="lg:w-[80%] mt-5">
                    <MonitoringForm />
                  </div>
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
