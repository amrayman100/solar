"use client";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { SolarHeatingProposal } from "@/models/product";

export function ViewSolarHeatingProposal({
  proposal,
}: {
  proposal: SolarHeatingProposal;
}) {
  const details = proposal.proposalDetails;

  return (
    <>
      <div className="flex flex-col justify-between lg:h-[100vh] lg:w-[100vw] md:w-[100vw] mt-0">
        <div>
          <Header />
          <div className="place-items-center items-center justify-center lg:mt-16">
            <div className="lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10 border-solid rounded-xl border lg:w-[100vw] mx-auto">
              <div className="bg-cover bg-center h-max relative to-primary pb-10">
                {details.type == "house-hold" && (
                  <>
                    <TypographyH1
                      text="Your House-hold Heating Solution"
                      className="mx-3 text-center"
                    />
                    {details.heater && (
                      <div className="lg:flex-row flex-col flex gap-6 justify-center h-full">
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                          <TypographyH3 text="Heater" className="font-bold" />
                          <div className="flex-col flex gap-2">
                            <div className="">
                              <span className="font-bold">
                                {details.heater?.brand}
                              </span>
                            </div>
                            <div className="font-bold">
                              <span>{"Price: "}</span>
                              <span className="">
                                {details.heater?.price.toLocaleString("en", {
                                  useGrouping: true,
                                }) + " EGP"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:max">
                          <TypographyH3
                            text="Number Of Rooms"
                            className="font-bold"
                          />
                          <div className="flex-col flex gap-2 mt-6">
                            <div>
                              <TypographyH5
                                className="font-bold"
                                text={
                                  (details.numberOfRooms?.toString() || "0") +
                                  " bathrooms and kitchens"
                                }
                              ></TypographyH5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {details.type == "pool" && (
                  <>
                    <TypographyH1
                      text="Your Pool Heating Solution"
                      className="mx-3"
                    />
                    {details.heater && (
                      <div className="lg:flex-row flex-col flex gap-6 justify-center h-full">
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-1/3">
                          <TypographyH3 text="Heater" className="font-bold" />
                          <div className="flex-col flex gap-2">
                            <div className="">
                              <span className="font-bold">
                                {details.heater?.brand}
                              </span>
                            </div>
                            <div className="">
                              <span>{"Price: "}</span>
                              <span className="font-bold">
                                {details.heater?.price.toLocaleString("en", {
                                  useGrouping: true,
                                }) + " EGP"}
                              </span>
                            </div>
                          </div>
                          <span className="">
                            Prices may vary upon site assessment
                          </span>
                        </div>
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-1/3">
                          <TypographyH3
                            text="Pool Volume"
                            className="font-bold"
                          />
                          <div className="flex-col flex gap-2">
                            <div>
                              <TypographyH5
                                className="font-bold"
                                text={
                                  details.poolVolume?.toString() + " mm3" ||
                                  "0" + " mm3"
                                }
                              ></TypographyH5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
