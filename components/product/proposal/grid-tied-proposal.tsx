import {
  TypographyH1,
  TypographyH3,
  TypographyH5,
} from "@/components/shared/typography";
import { GridTiedProposal } from "@/models/product";

export function ViewGridTiedProposal({
  proposal,
}: {
  proposal: GridTiedProposal;
}) {
  const details = proposal.proposalDetails;

  console.log("in");

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
        className="bg-cover bg-center w-screen h-96 relative bg-gradient-to-r from-primary via-yellow-400 to-primary"
      >
        <TypographyH1
          text="Solar Proposal"
          className="bg-gradient-to-r from-primary via-yellow-500 to-primary text-transparent bg-clip-text mx-3"
        />
        <div className="flex justify-center h-full">
          <div className="mt-4 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow h-48 p-10 lg:flex-row flex-col flex gap-6">
            <div className="text-center">
              <TypographyH5 text={"System Size"}></TypographyH5>
              <TypographyH3
                text={details.systemSize.toString() + " kw"}
              ></TypographyH3>
            </div>
            <div className="text-center">
              <TypographyH5 text={"Number Of Panels"}></TypographyH5>
              <TypographyH3
                text={details.numberOfPanels.toString()}
              ></TypographyH3>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex"></div>
    </div>
  );
}
