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
import { ConstructionProposal } from "@/models/product";
import { ContactMe } from "../contact-me";

export function ViewConstructionProposal({
  proposal,
}: {
  proposal: ConstructionProposal;
}) {
  const details = proposal.proposalDetails;

  console.log(proposal);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh] lg:w-[100vw] md:w-[100vw]">
        <div>
          <Header />
          <div className="place-items-center items-center justify-center lg:mt-16">
            <div className="lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10 border-solid rounded-xl border lg:w-[100vw] mx-auto">
              <div className="bg-cover bg-center h-max relative to-primary pb-10">
                <TypographyH1
                  text="Your Solution"
                  className="mx-3 text-center"
                />
                {details.type === "generalContracting" && (
                  <>
                    <div className="flex-col flex gap-6 justify-center h-full items-center">
                      <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                        <TypographyH3
                          text="General Contracting"
                          className="font-bold"
                        />
                        <div className="flex-col flex gap-2">
                          <div className="">
                            <span className="font-bold">{details.subject}</span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <ContactMe
                          darkMode
                          proposalId={proposal.id}
                          caption="Interested in our contracting services?"
                        />
                      </div>
                    </div>
                  </>
                )}
                {details.type === "solar-panel-installations" && (
                  <>
                    <div className="flex-col flex gap-6 justify-center h-full items-center">
                      <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                        <TypographyH3
                          text="Solar Panel Installations"
                          className="font-bold"
                        />
                        <div className="flex-col flex gap-2">
                          <div className="">
                            <span className="font-bold">
                              {details.plantSizeKws} KW
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <ContactMe
                          darkMode
                          proposalId={proposal.id}
                          caption="Do you want a representitve to contact you?"
                        />
                      </div>
                    </div>
                  </>
                )}
                {details.type === "homeFinishing" && (
                  <>
                    <div className="flex-col flex gap-6 justify-center h-full items-center">
                      <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                        <TypographyH3
                          text="Home Finishing"
                          className="font-bold"
                        />
                        <div className="flex-col flex gap-2">
                          <div className="">
                            <span>{"Price: "}</span>
                            <span className="">
                              {details?.cost.toLocaleString("en", {
                                useGrouping: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <ContactMe
                          darkMode
                          proposalId={proposal.id}
                          caption="Do you want a representitve to contact you?"
                        />
                      </div>
                    </div>
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
