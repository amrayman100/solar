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
import { GridTiedProposal, SolarIrrigationProposal } from "@/models/product";
import { ContactMe } from "../contact-me";

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
            style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
            className="bg-cover bg-center w-screen h-max relative bg-gradient-to-r from-primary via-yellow-400 to-primary pb-10"
          >
            <div className="flex pt-4 flex-col">
              <TypographyH1
                text="Your Solution"
                className="bg-gradient-to-r from-primary via-green-400 to-primary text-white bg-clip-text mx-3"
              />
              <div className="mx-3">
                <ContactMe
                  proposalId={proposal.id}
                  caption="Interested in going solar?"
                />
              </div>
            </div>
            <div className="lg:flex-row flex-col flex gap-6 justify-center h-full">
              <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                <TypographyH3 text="Irrigation Unit" className="font-bold" />
                <div className="flex-col flex gap-2">
                  <div className="text-center">
                    <span>{"Cost: "}</span>
                    <span className="font-bold">{details.cost}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                <TypographyH3 text="Pump Capacity" className="font-bold" />
                <div className="flex-col flex gap-2">
                  <div>
                    <TypographyH5
                      className="font-bold"
                      text={details.pumpCapacity.toString() + " HP"}
                    ></TypographyH5>
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
