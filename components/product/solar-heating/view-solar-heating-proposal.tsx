"use client";
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
    <div className="m-auto place-items-center h-screen p-20 ">
      <div
        // style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
        className="flex flex-col lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10  lg:mx-80 mx-10 border-solid rounded-xl border"
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
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 w-1/3">
                    <TypographyH3 text="Heater" className="font-bold" />
                    <div className="flex-col flex gap-2">
                      <div className="">
                        <span className="font-bold">
                          {details.heater?.brand}
                        </span>
                      </div>
                      <div className="">
                        <span>{"Cost: "}</span>
                        <span className="">
                          {details.heater?.price.toLocaleString("en", {
                            useGrouping: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 w-1/3">
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
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 w-1/3">
                    <TypographyH3 text="Heater" className="font-bold" />
                    <div className="flex-col flex gap-2">
                      <div className="">
                        <span className="font-bold">
                          {details.heater?.brand}
                        </span>
                      </div>
                      <div className="">
                        <span>{"Cost: "}</span>
                        <span className="">
                          {details.heater?.price.toLocaleString("en", {
                            useGrouping: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 w-1/3">
                    <TypographyH3 text="Pool Volume" className="font-bold" />
                    <div className="flex-col flex gap-2">
                      <div>
                        <TypographyH5
                          className=""
                          text={details.poolVolume?.toString() || "0" + " mm3"}
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
  );
}
