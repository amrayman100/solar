import { MonthlyConsumptionForm } from "@/components/product/grid-tied/monthly-consumption-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TypographyH2, TypographyH4 } from "@/components/shared/typography";
import { LuWallet, LuThumbsUp } from "react-icons/lu";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FiBatteryCharging } from "react-icons/fi";

export default async function Home() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div
          style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
          className="bg-cover bg-center w-full h-96 lg:h-156 relative mt-2 bg-gradient-to-r from-primary via-yellow-400 to-primary"
        >
          <div className="flex justify-center h-full">
            <div className="m-auto flex flex-col">
              <div>
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
                  Get Your Free Solar Quote{" "}
                </span>
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
                  Instantly
                </span>
              </div>
              <MonthlyConsumptionForm />
            </div>
          </div>
        </div>
        <div className="flex flex-col place-items-center w-100 justify-center mt-6 gap-5 mb-2">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Maximum savings from day one
          </div>
          <TypographyH2
            text="It's time to generate your own energy and save"
            className="text-2xl bg-gradient-to-r from-primary via-green-400 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <LuWallet className="text-primary text-4xl" />
            <TypographyH4 text="Get your bill at 0 EGP" className="" />
            <div className="text-[0px]">
              <span className="text-base scroll-m">
                Thanks to the combination of our careful design services,
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                we offer savings that can eliminate your entire bill
              </span>
              <span className="text-base">
                {" "}
                in correspondence to your roofs pace and average consumption.
              </span>{" "}
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <HiOutlineDevicePhoneMobile className="text-primary text-4xl" />
            <TypographyH4 text="Cutting-edge technology" className="" />
            <div className="text-[0px]">
              <span className="text-base">
                You will be able to visualize your
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                production in real time
              </span>
              <span className="text-base">
                {" "}
                and optimize your consumption to make your home more efficient.
              </span>{" "}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <LuThumbsUp className="text-primary text-4xl" />
            <TypographyH4 text="Pay in installments" className="" />
            <div className="text-[0px]">
              <span className="text-base">Pay a</span>
              <span className="text-base text-primary font-bold">
                {" "}
                comfortable monthly fee
              </span>
              <span className="text-base">
                {" "}
                with minimum initial investment, and an all maintenance
                included.
              </span>{" "}
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <FiBatteryCharging className="text-primary text-4xl" />
            <TypographyH4 text="Virtual Battery and Community" className="" />
            <div className="text-[0px]">
              <span className="text-base">Choose what to do with the</span>
              <span className="text-base text-primary font-bold">
                {" "}
                surplus energy
              </span>
              <span className="text-base">
                {" "}
                you generate: offset your bill or store It for use as a backup.
              </span>{" "}
            </div>
          </div>
        </div>

        <div className="flex flex-col place-items-center w-100 justify-center mt-10 gap-5 mb-2">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Different options , for different needs
          </div>
          <TypographyH2
            text="we have multiple procurement options to suit your needs"
            className="text-2xl bg-gradient-to-r from-primary via-green-400 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10  lg:mx-80 mx-10 border-solid rounded-xl border">
          <div
            className="flex flex-col gap-3 mx-auto border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4 text="Buy" className="text-center" />
            <div className="text-[0px]"></div>
            <div className="text-[0px]">
              <span className="text-base">
                Buy your solution from the beginning with a quick
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                return on investment
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4 text="Financing" className="text-center" />
            <div className="text-[0px]"></div>
            <div className="text-[0px]">
              <span className="text-base">
                Finance your soluion to adjust so you can pay
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                at your own pace
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4 text="Renting" className="text-center" />
            <div className="text-[0px]"></div>
            <div className="text-[0px]">
              <span className="text-base">
                Let your worries slip away. No initial investment
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                save from day one.
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
