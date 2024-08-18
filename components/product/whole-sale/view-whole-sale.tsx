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
import { EVProposal, WholeSaleProposal } from "@/models/product";

export function ViewWholeSaleProposal({
  proposal,
}: {
  proposal: WholeSaleProposal;
}) {
  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <div className="place-items-center items-center justify-center text-center">
          <Header />
          <div
            // style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
            className="flex flex-col lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10 w-max mx-auto border-solid rounded-xl border"
          >
            <div
              //   style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
              className="bg-cover bg-center h-max relative to-primary pb-10"
            >
              <TypographyH1 text="" className="mx-3" />
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
        <Footer />
      </div>
    </>
  );
}
