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

export function ViewConstructionProposal({
  proposal,
}: {
  proposal: ConstructionProposal;
}) {
  const details = proposal.proposalDetails;

  console.log(proposal);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh] lg:w-[100vw] md:w-[100vw] max-w">
        <div>
          <Header />
          <div className="place-items-center items-center justify-center lg:mt-16">
            <div className="lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10 border-solid rounded-xl border w-[100vw] mx-auto">
              <div className="bg-cover bg-center h-max relative to-primary pb-10">
                <TypographyH1
                  text="Your Preliminary Solution"
                  className="mx-3 text-center"
                />
                {details.type === "generalContracting" && (
                  <div className="flex-col flex gap-6 justify-center h-full items-center">
                    <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                      <TypographyH3
                        text="Amazing, we will contact you as soon as possible!"
                        className="font-bold"
                      />
                    </div>
                  </div>
                )}
                {details.type === "solar-panel-installations" && (
                  <div className="flex-col flex gap-6 justify-center h-full items-center">
                    <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max">
                      <TypographyH3
                        text="Amazing, we will contact you as soon as possible!"
                        className="font-bold"
                      />
                    </div>
                  </div>
                )}
                {details.type === "homeFinishing" && (
                  <div className="flex-col flex gap-6 justify-center h-full items-center text-center">
                    <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 lg:w-max ">
                      <TypographyH3
                        text="Home Finishing"
                        className="font-bold"
                      />
                      <div className="flex-col flex gap-2">
                        <div className="">
                          <span>{"Price: "}</span>
                          <span className="font-bold">
                            {details?.cost.toLocaleString("en", {
                              useGrouping: true,
                            }) + " EGP"}
                          </span>
                        </div>
                      </div>
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
