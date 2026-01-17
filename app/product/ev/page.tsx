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
  title: "EV Chargers | Electric Vehicle Charging Solutions",
  description:
    "Explore our range of EV chargers for your home or business. Fast, convenient, and eco-friendly, we offer a variety of options to suit your needs.",
  keywords:
    "EV chargers, electric vehicle charging solutions, home chargers, public chargers, fast chargers",
  openGraph: {
    title: "EV Chargers | Electric Vehicle Charging Solutions",
    description:
      "Explore our range of EV chargers for your home or business. Fast, convenient, and eco-friendly, we offer a variety of options to suit your needs.",
    images: [
      {
        url: "/ev-ai.png",
        width: 600,
        height: 500,
      },
    ],
  },
};

export default async function EV() {
  return (
    <>
      <main className="flex-grow w-screen">
        <Header />
        <div className="flex justify-center px-4 py-8 lg:py-16">
          <div className="bg-[#f6f6f6] rounded-[39px] flex flex-col lg:flex-row gap-6 lg:gap-[21px] items-center overflow-hidden w-full max-w-[1122px] p-6 lg:p-0">
            <div className="flex items-center justify-center relative shrink-0 w-full lg:w-[363px] h-[300px] lg:h-[646px]">
              <Image
                alt="EV Chargers"
                src={"/ev-ai.png"}
                blurDataURL={"/ev-ai.png"}
                placeholder="blur"
                quality={100}
                fill
                className="object-cover rounded-lg lg:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[16px] items-start text-black w-full lg:w-[703px] px-4 lg:px-0 pb-6 lg:pb-0">
              <h1 className="font-bold text-2xl lg:text-[32px] text-[#015231] leading-normal">
                EV Chargers
              </h1>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Power Up Your Ride in a Flash: All About EV Chargers!
                </h2>
                <p className="font-normal text-base lg:text-[16px] text-black leading-normal">
                  Electric vehicles (EVs) are the future, but what about fueling them? Enter EV chargers, your personal gas station at home or on the go!
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  Key benefits:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Fast & Convenient: No more waiting in line at gas stations. Plug in at home or a charging station and top up your battery quickly.</li>
                  <li>Save Money: Electricity typically costs less than gas, so fill 'er up for less!</li>
                  <li>Peace of Mind: Always know you have a way to recharge, no matter where your adventures take you.</li>
                  <li>Eco-Friendly Choice: Power your car with clean electricity, reducing emissions and your impact on the environment.</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl lg:text-[24px] text-[#015231]">
                  EV chargers come in all shapes and sizes:
                </h3>
                <ul className="list-disc list-inside font-normal text-base lg:text-[16px] text-black space-y-1">
                  <li>Home Chargers: Install a charger in your garage for convenient overnight charging.</li>
                  <li>Public Chargers: Find charging stations at malls, workplaces, and even along highways for on-the-go top-ups.</li>
                  <li>Fast Chargers: These powerful stations can give your EV a significant boost in battery life in just minutes, perfect for long trips.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-4 py-8 lg:py-12">
          <p className="font-bold text-xl lg:text-[24px] text-black text-center">
            EV chargers are an essential part of the electric vehicle revolution.
          </p>
          <Link
            href={"/proposal/ev"}
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
