import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH4Light,
  TypographyH5,
} from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";

export default async function EV() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <div className="m-10">
          <div className="flex place-items-center gap-3">
            <TypographyH3
              text="EV Chargers"
              className="font-bold self-center"
            />
          </div>
          <div className="mt-2 lg:flex gap-4 flex-row">
            <Image
              alt="EV Chargers"
              src={"/ev.jpg"}
              blurDataURL={"/ev.jpg"}
              placeholder="blur"
              quality={100}
              height={500}
              width={500}
              sizes="100vw"
              className="lg:w-1/3 h-auto"
            />
            <div className="flex justify-center h-full">
              <div className="m-auto flex flex-col">
                <TypographyH3 text="Power Up Your Ride in a Flash: All About EV Chargers!" />
                <TypographyH3
                  text="Electric vehicles (EVs) are the future, but what about fueling them? Enter EV chargers, your personal gas station at home or on the go!"
                  className="font-normal mt-2"
                />
                <TypographyH3 text="Imagine:" className="font-normal mt-2" />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Fast & Convenient: No more waiting in line at gas stations. Plug in at home or a charging station and top up your battery quickly." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Save Money: Electricity typically costs less than gas, so fill 'er up for less!" />
                  </li>
                  <li>
                    <TypographyH4Light text="• Peace of Mind: Always know you have a way to recharge, no matter where your adventures take you." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Eco-Friendly Choice: Power your car with clean electricity, reducing emissions and your impact on the environment." />
                  </li>
                </ul>
                <TypographyH3
                  text="EV chargers come in all shapes and sizes"
                  className="font-normal mt-4"
                />
                <ul className="mt-4">
                  <li>
                    <TypographyH4Light text="• Home Chargers: Install a charger in your garage for convenient overnight charging." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Public Chargers: Find charging stations at malls, workplaces, and even along highways for on-the-go top-ups." />
                  </li>
                  <li>
                    <TypographyH4Light text="• Fast Chargers: These powerful stations can give your EV a significant boost in battery life in just minutes, perfect for long trips." />
                  </li>
                </ul>
                <div className="mt-4">
                  <span className="text-2xl font-semibold tracking-tight">
                    EV chargers are an essential part of the electric vehicle
                    revolution. They make owning an EV convenient, affordable,
                    and eco-friendly.
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    className="text-2xl scroll-m-20 font-extrabold tracking-tight text-primary"
                    href={"/proposal/ev"}
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
