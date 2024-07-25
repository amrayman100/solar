"use client";
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
    <div className="m-auto place-items-center h-screen p-20 ">
      <div
        // style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
        className="flex flex-col lg:flex-row gap-2 bg-gradient-to-r from-primary via-green-400 to-primary mt-6 p-10  lg:mx-80 mx-10 border-solid rounded-xl border"
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
  );
}
