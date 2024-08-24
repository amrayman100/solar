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
import { WholeSaleProposal } from "@/models/product";

export function ViewWholeSaleProposal({
  proposal,
}: {
  proposal: WholeSaleProposal;
}) {
  return (
    <>
      <div className="flex flex-col justify-between h-[100vh] w-[100vw]">
        <Header />
        <div className="place-items-center items-center justify-center text-center">
          <div
            style={{ backgroundImage: `url(${"/warehouse.jpeg"})` }}
            className="bg-cover bg-center w-screen h-[70vh] pt-1"
          >
            <div className="mt-10 h-max">
              <div className="flex-col rounded-xl border bg-card lg:w-max p-4 h-max m-auto">
                <TypographyH1
                  text="Wholesale Order"
                  className="bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text mx-3"
                />
                {
                  <div>
                    <TypographyH3
                      text="Your request has been sent and our team will get in contact within 48 hours"
                      className="mt-4"
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
