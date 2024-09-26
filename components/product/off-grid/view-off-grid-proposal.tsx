"use client";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import {
  GridTiedProposal,
  OffGridProposal,
  calculateCumulativeSavings,
} from "@/models/product";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ContactMe } from "../contact-me";

export function ViewOffGridProposal({
  proposal,
}: {
  proposal: OffGridProposal;
}) {
  const details = proposal.proposalDetails;

  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <div>
        <Header />
        <div>
          <div
            style={{ backgroundImage: `url(${"/drone-2.jpg"})` }}
            className="bg-cover bg-center w-screen h-max relative bg-gradient-to-r from-primary via-yellow-400 to-primary pb-10"
          >
            <div className="flex pt-4 flex-col">
              <TypographyH1
                text="Your Preliminary Solution"
                className="bg-gradient-to-r from-primary via-green-400 to-primary text-white bg-clip-text mx-3"
              />
            </div>
            <div className="lg:flex-row flex-col flex gap-6 justify-center h-full">
              <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                <TypographyH3 text="Battery" className="font-bold" />
                <div className="flex-col flex gap-2">
                  <div className="text-center">
                    <span>{"Number of Batteries: "}</span>
                    <span className="font-bold">
                      {details.numberOfBatteries}
                    </span>
                  </div>
                </div>
              </div>
              {!proposal.proposalDetails.isConnectedToGrid && (
                <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                  <TypographyH3 text="Panel" className="font-bold" />
                  <div className="flex-col flex gap-2">
                    <div>
                      <TypographyH5
                        className="font-bold"
                        text={details.panel.brand}
                      ></TypographyH5>
                    </div>
                    <div className="text-center">
                      <span>{"Number of Panels: "}</span>
                      <span className="font-bold">
                        {details.numberOfPanels}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
                <TypographyH3 text="Inverter" className="font-bold" />
                <div className="flex-col flex gap-2">
                  <div>
                    <TypographyH5
                      className="font-bold"
                      text={details.inverter.inverterInfo.brand}
                    ></TypographyH5>
                  </div>
                  <div className="text-center">
                    <span className="font-bold">
                      {details.inverter.inverterInfo.capacity.toString() +
                        " kw "}
                    </span>
                    <span>{"Total inverter rating"}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4">
                  <TypographyH4 text="Your Quotation" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="text-right">
                          Amount (EGP)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold">Price</TableCell>
                        <TableCell className="text-right font-bold">
                          {Math.round(
                            proposal.proposalDetails.sellingCost
                          ).toLocaleString("en", { useGrouping: true })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4">
                  <TypographyH4 text="Payment Milestones" />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="text-right">
                          Amount (EGP)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Down Payment
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.round(
                            proposal.proposalDetails.billing?.downPaymentFee
                          ).toLocaleString("en", { useGrouping: true })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Upon Components Supply
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.round(
                            proposal.proposalDetails.billing
                              ?.componentsSupplyFee
                          ).toLocaleString("en", { useGrouping: true })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Upon Installation
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.round(
                            proposal.proposalDetails.billing?.installationFee
                          ).toLocaleString("en", { useGrouping: true })}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Upon Commissioning
                        </TableCell>
                        <TableCell className="text-right">
                          {Math.round(
                            proposal.proposalDetails.billing?.commissionFee
                          ).toLocaleString("en", { useGrouping: true })}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mx-auto mt-4 align-center justify-center">
          <ContactMe
            darkMode
            proposalId={proposal.id}
            caption="Interested in going solar?"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
