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
import { SolarIrrigationProposal } from "@/models/product";

export function ViewSolarIrrigationProposal({
  proposal,
}: {
  proposal: SolarIrrigationProposal;
}) {
  const details = proposal.proposalDetails;

  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <div>
        <Header />
        <div>
          <div
            style={{ backgroundImage: `url(${"/drone-7.jpeg"})` }}
            className="bg-cover bg-center w-screen lg:h-[70vh] pt-1"
          >
            <div className="mt-3 h-max">
              <div className="flex-col-max p-4 mx-4 h-max">
                <TypographyH1
                  text="Your Preliminary Solution"
                  className="mx-3 text-white"
                />
              </div>
            </div>
            <div>
              <div className="">
                <div className="lg:flex-row flex-col flex gap-6 justify-center h-full p-4">
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                    <TypographyH3
                      text="Irrigation Unit"
                      className="font-bold"
                    />
                    <div className="flex-col flex gap-2">
                      <div className="text-center">
                        <span>{"Price: "}</span>
                        <span className="font-bold">
                          {details?.cost.toLocaleString("en", {
                            useGrouping: true,
                          }) + " EGP"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                    <TypographyH3 text="Pump Capacity" className="font-bold" />
                    <div className="flex-col flex gap-2">
                      <div>
                        <TypographyH5
                          className="font-bold text-center"
                          text={details.pumpCapacity.toString() + " HP"}
                        ></TypographyH5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
