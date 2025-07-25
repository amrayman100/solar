import { MonthlyConsumptionForm } from "@/components/product/grid-tied/monthly-consumption-form";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { TypographyH2, TypographyH4 } from "@/components/shared/typography";
import { LuWallet, LuThumbsUp } from "react-icons/lu";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FiBatteryCharging } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { BrandAmbassadorForm } from "@/components/brand-ambassador/brand-ambassador-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renewable Energy Solutions | Solar, Energy Storage",
  description:
    "Explore our comprehensive range of renewable energy solutions including solar energy systems, wind energy, solar heaters, solar pumps, heat pumps, on-grid and off-grid solutions, batteries (lithium-ion and lead-acid), solar lamps, and more.",
  keywords:
    "solar energy, renewable energy, wind energy, solar heaters, solar pumps, heat pumps, on grid, off grid, batteries, lithium ion, lead acid, solar lamps, solar headlights, watt, energy, power",
  openGraph: {
    title: "Renewable Energy Solutions | Solar, Wind & Energy Storage",
    description:
      "Comprehensive renewable energy solutions for sustainable power generation and storage.",
    images: [
      {
        url: "/drone-4-1.jpeg",
        width: 1200,
        height: 630,
        alt: "Renewable Energy Solutions",
      },
    ],
  },
};

export default async function Home() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div
          style={{ backgroundImage: `url(${"/drone-4-1.jpeg"})` }}
          className="bg-cover bg-center w-full h-96 lg:h-156 relative mt-2 bg-gradient-to-r from-primary via-yellow-400 to-primary p-1"
        >
          <div className="flex mx-auto mt-2 justify-cente lg:w-max">
            <div className="flex flex-col p-10 rounded-lg to-primary w-fit">
              <div className="text-center rounded-xl lg:border lg:bg-white shadow lg:p-4">
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl lg:text-emerald-950 text-white text-center">
                  Get Your Free Solar Quote{" "}
                </span>
                <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl lg:text-primary text-primary text-center">
                  Instantly
                </span>
              </div>
              <MonthlyConsumptionForm />
            </div>
          </div>
        </div>
        <div className="flex flex-col place-items-center w-100 justify-center mt-6 gap-5 mb-2">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center text-emerald-950">
            Maximum savings from day one
          </div>
          <TypographyH2
            text="It's time to generate your own energy and save"
            className="text-2xl bg-gradient-to-r from-primary via-green-400 to-primary text-transparent bg-clip-text mx-3 text-center"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow lg:w-[50%]"
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
                in relation to your roof space and average consumption.
              </span>{" "}
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
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
                production in real-time
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
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
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
                with minimum initial investment,with all maintenance included.
              </span>{" "}
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
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
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center text-emerald-950">
            Different options , for different needs
          </div>
          <TypographyH2
            text="we have multiple procurement options to suit your needs"
            className="text-center text-2xl bg-gradient-to-r from-primary via-green-400 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-20 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10  lg:mx-80 mx-10 border-solid rounded-xl border">
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
                Finance your solution to adjust so you can pay
              </span>
              <span className="text-base text-primary font-bold">
                {" "}
                at your own pace
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col place-items-center justify-center mt-10 gap-5 mb-2">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center text-emerald-950">
            Your installation in 4 simple steps
          </div>
          <TypographyH2
            text="We will accompany you through the whole process to make your path to clean energy as easy as possible."
            className="text-center text-2xl bg-gradient-to-r from-primary via-green-400 to-primary text-transparent bg-clip-text mx-3"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow lg:w-[50%]"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4 text="Calculate your quote" className="text-center" />
            <div className="text-[0px]"></div>
            <div className="text-[0px] text-center">
              <span className="text-base">
                Run your solar simulation or contact our solar specialists.
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4 text="Your study at 0 cost" className="text-center" />
            <div className="text-[0px]"></div>
            <div className="text-[0px] text-center">
              <span className="text-base">
                Get a personalized study of the installation you need
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:mx-80 mx-10">
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4
              text="We perform the technical visit"
              className="text-center"
            />
            <div className="text-[0px]"></div>
            <div className="text-[0px] text-center">
              <span className="text-base">
                We will schedule a technical visit to examine the feasibility of
                the project
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-3 mx-auto mt-10 border-solid p-10 rounded-xl border bg-card text-card-foreground shadow  lg:w-[50%]"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4
              text="Bring your bill to 0 EGP"
              className="text-center"
            />
            <div className="text-[0px]"></div>
            <div className="text-[0px] text-center">
              <span className="text-base">
                Schedule the installation in less than two weeks and bring your
                bill to 0 EGP{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col place-items-center w-100 justify-center mt-10 gap-5">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-center text-emerald-950">
            What our customers think?
          </div>
          <Carousel className="w-2/3 max-h-max">
            <CarouselContent className="-ml-1">
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Walid Bazan</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        {" "}
                        Bolt Energy is a good start up company, with more
                        projects under their belt. Over all acceptable
                        experience the system was delivered and installed and
                        commissioned as designed and they have good follow up on
                        trouble shooting and follow up until successful
                        commissioning was achieved.
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hussein Mourad</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        {" "}
                        I called a couple of other companies that dealt with
                        Bolt Energy in Egypt before stumbling upon Solar
                        Solutions, but most, if not all of them, were very
                        unsatisfactory. Bolt Energy on the other hand were
                        extremely helpful the whole way through, despite
                        expected hiccups with the government&apos;s electrical
                        company. The team were professional and were working on
                        the system as if it were their own. I would recommend
                        them to anyone, and already did.
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stefano Soldi</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        {" "}
                        I didn&apos;t expect to find such a great and
                        professional people. Bolt Energy team is simply perfect.
                        In few days I got an offer for my unit, and the
                        installation procedure had been easy and smooth. I
                        highly recommend this company to all my friends,
                        neighbors and people that are interested in invest some
                        money for a better and green future.
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ali Dessouki</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        {" "}
                        Everyone was extremely professional and friendly and did
                        everything to make the experience smooth and easy for
                        me. I&apos;m extremely satisfied with my experience and
                        would definitely recommend to anyone.
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fady Iskandar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        The level of professionalism was exemplary. All promises
                        were fulfilled and there were no surprises. The
                        installation process was seamless
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Amr Ayman</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        Very professional and experienced team
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mohamed Fekry Aziz Saber Khalil</CardTitle>
                    </CardHeader>
                    <CardContent className="flex p-6">
                      <span className="">
                        Professional company with good service and competitive
                        prices
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="lg:mt-10 flex flex-col lg:flex-row mx-4 gap-2">
          <Image
            alt="logo-bg"
            src={"/logo-bg.jpg"}
            blurDataURL={"/logo-bg.jpg"}
            placeholder="blur"
            quality={100}
            height={500}
            width={500}
            style={{
              objectFit: "cover",
            }}
          />
          <div
            className="flex flex-col gap-3 mx-auto border-solid p-10 rounded-xl border bg-card text-card-foreground shadow w-fit"
            style={{ flex: "1 1 0px;" }}
          >
            <TypographyH4
              text="Become a brand ambassador now and earn incentives for every new
                customer!"
              className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-emerald-950"
            />
            <div className="text-[0px]">
              <span className=" text-primary font-bold text-2xl">
                {" "}
                Get from 10,000 EGP for every new customer you bring to Bolt
                Energy
              </span>
            </div>
            <BrandAmbassadorForm />
          </div>
        </div>
        <div className="flex flex-col place-items-center w-100 justify-center mt-10 gap-5 mb-2">
          <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-emerald-950">
            FAQS
          </div>
          <Accordion type="single" collapsible className="w-2/3">
            <AccordionItem value="item-1">
              <AccordionTrigger>Why should I go solar?</AccordionTrigger>
              <AccordionContent>
                Photovoltaic energy is emerging as a solid alternative to large
                electricity companies. The installation of solar panels offers
                clear benefits, including savings of up to 70% on electricity
                bills, driving many families towards solar self-consumption in
                our country. It also provides energy independence, increases the
                value of the property, contributes to combating climate change,
                and offers access to various grants and subsidies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do solar panels work?</AccordionTrigger>
              <AccordionContent>
                Solar panels convert sunlight into electricity through the
                photovoltaic process. Solar cells absorb sunlight to generate
                electricity, then an inverter converts this current into usable
                form for the home.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is the maintenance of solar panels?
              </AccordionTrigger>
              <AccordionContent>
                The care of solar panels is simple and minimal, we can usually
                take care of them ourselves. They are built to withstand weather
                conditions and usually only need occasional cleaning and checks
                to ensure they are working properly and to prevent damage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How are solar panels cleaned?</AccordionTrigger>
              <AccordionContent>
                Solar panels usually require little maintenance thanks to their
                glass cover, which tends to keep them clean. Occasionally, if
                dirt such as leaves or debris accumulates, a gentle wash with
                water from a hose or using a soft sponge or brush is sufficient.
                Regular observation is key to identifying build-up that may
                affect its efficiency. In general, the protective coating on the
                panels allows rain and sun to keep them clean, minimizing the
                need for frequent cleaning.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </>
  );
}
