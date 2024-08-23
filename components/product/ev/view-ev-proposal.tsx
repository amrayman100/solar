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
import { EVProposal } from "@/models/product";
import { ContactMe } from "../contact-me";

export function ViewEvProposal({ proposal }: { proposal: EVProposal }) {
  const details = proposal.proposalDetails;

  console.log(proposal);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
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
                <TypographyH1
                  text="Your EV Charging Solution"
                  className="mx-3 text-center"
                />
                {!details.charger && (
                  <div>
                    <div className="">
                      <ContactMe
                        proposalId={proposal.id}
                        caption="You’ll need a custom solution"
                      />
                    </div>
                  </div>
                )}
                {details.charger && (
                  <div className="flex-col flex gap-6 justify-center h-full items-center">
                    <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-1/3">
                      <TypographyH3 text="Charger" className="font-bold" />
                      <div className="flex-col flex gap-2">
                        <div className="">
                          <span className="font-bold">
                            {details.charger.power} KW
                          </span>
                        </div>
                        <div className="">
                          <span>{"Cost: "}</span>
                          <span className="">
                            {details.charger?.price.toLocaleString("en", {
                              useGrouping: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <ContactMe
                        proposalId={proposal.id}
                        caption="Interested in going solar?"
                      />
                    </div>
                  </div>
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
