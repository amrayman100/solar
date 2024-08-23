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
import { ContactMe } from "../contact-me";

export function ViewSolarHeatingProposal({
  proposal,
}: {
  proposal: SolarHeatingProposal;
}) {
  const details = proposal.proposalDetails;

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh] w-[100vw] mt-0">
        <div>
          <Header />
          <div className="place-items-center items-center justify-center">
            <div
              // style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
              className="lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10 border-solid rounded-xl border w-max mx-auto"
            >
              <div
                //   style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
                className="bg-cover bg-center h-max relative to-primary pb-10"
              >
                {details.type == "house-hold" && (
                  <>
                    <TypographyH1
                      text="Your House Hold Heating Solution"
                      className="mx-3"
                    />
                    {!details.heater && (
                      <div className="flex mx-auto justify-center mt-2">
                        <ContactMe
                          darkMode
                          proposalId={proposal.id}
                          caption="You need a custom solution"
                        />
                      </div>
                    )}
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
                              <span className="">
                                {details.heater?.price.toLocaleString("en", {
                                  useGrouping: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-1/3">
                          <TypographyH3
                            text="Number Of Rooms"
                            className="font-bold"
                          />
                          <div className="flex-col flex gap-2 mt-6">
                            <div>
                              <TypographyH5
                                className=""
                                text={
                                  (details.numberOfRooms?.toString() || "0") +
                                  " bathrooms and kitchens"
                                }
                              ></TypographyH5>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <ContactMe
                            darkMode
                            proposalId={proposal.id}
                            caption="Interested in going solar?"
                          />
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
                    {!details.heater && (
                      <div>
                        <TypographyH3
                          text=" You’ll need a custom solution, our team will get in contact
                    within 48 hours"
                          className="mt-4"
                        />
                      </div>
                    )}
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
                              <span className="">
                                {details.heater?.price.toLocaleString("en", {
                                  useGrouping: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-1/3">
                          <TypographyH3
                            text="Pool Volume"
                            className="font-bold"
                          />
                          <div className="flex-col flex gap-2">
                            <div>
                              <TypographyH5
                                className=""
                                text={
                                  details.poolVolume?.toString() || "0" + " mm3"
                                }
                              ></TypographyH5>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <ContactMe
                            darkMode
                            proposalId={proposal.id}
                            caption="Interested in going solar?"
                          />
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
