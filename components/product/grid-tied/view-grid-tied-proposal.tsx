"use client";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
} from "@/components/shared/typography";
import { GridTiedProposal, calculateCumulativeSavings } from "@/models/product";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Tooltip,
} from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Header from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ContactMe } from "../contact-me";

export function ViewGridTiedProposal({
  proposal,
}: {
  proposal: GridTiedProposal;
}) {
  const details = proposal.proposalDetails;

  const firstYearMonthlyBill = proposal.proposalDetails.firstYearMonthlyBill;

  console.log(firstYearMonthlyBill, details.currentMonthlyBill);

  const firstYearMonthlyBillSavingsBarChartData = [
    {
      name: "Old Bill",
      bill: details.currentMonthlyBill,
    },
    {
      name: "New Bill",
      bill:
        firstYearMonthlyBill < 0
          ? 0
          : Math.round(firstYearMonthlyBill).toLocaleString("en", {
              useGrouping: true,
            }),
    },
  ];

  const cumulativeSavingsBarChartData = [
    {
      name: "1 year",
      Savings: details.firstYearSavings,
    },
    {
      name: "5 year",
      Savings: calculateCumulativeSavings(
        5,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: "10 years",
      Savings: calculateCumulativeSavings(
        10,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: "15 years",
      Savings: calculateCumulativeSavings(
        15,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: "20 years",
      Savings: calculateCumulativeSavings(
        20,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
    {
      name: "25 years",
      Savings: calculateCumulativeSavings(
        25,
        details.firstYearSavings,
        details.panelDegradation,
        details.tarifEscalation
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div
        style={{ backgroundImage: `url(${"/drone-4.jpeg"})` }}
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
            <TypographyH3 text="Solar Panels" className="font-bold" />
            <div className="lg:flex-row flex-col flex gap-6">
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
                  {details.inverter.inverterInfo.capacity.toString() + " kw "}
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
                    <TableHead className="text-right">Amount (EGP)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">
                      Total System Price
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {Math.round(
                        proposal.proposalDetails.sellingCost
                      ).toLocaleString("en", { useGrouping: true })}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <p className="mt-2">
                  Kindly note there is an additional utility meter cost
                </p>
              </Table>
            </div>
            <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4">
              <TypographyH4 text="Payment Milestones" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="text-right">Amount (EGP)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Down Payment</TableCell>
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
                        proposal.proposalDetails.billing?.componentsSupplyFee
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
            <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
              Need back-up storage for excess energy?{"  "}
              <Link
                className="scroll-m-20 font-extrabold tracking-tight text-primary"
                href={{
                  pathname: "/proposal/off-grid",
                  query: { useCache: true },
                }}
              >
                Click here for a quote
              </Link>
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
      <div className="bg-cover bg-center w-screen h-max relative pb-10">
        <div className="p-4">
          <TypographyH2 text="Electricity Bill Savings" />
          <div className="lg:flex-row flex-col flex gap-6 h-full mx-4">
            <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max">
              <TypographyH3
                text="First Year Monthly Bill Savings"
                className="font-bold text-center p-2"
              />
              <div className="lg:flex-row flex-col flex gap-6">
                <div className="text-center w-full">
                  <BarChart
                    width={400}
                    height={300}
                    data={firstYearMonthlyBillSavingsBarChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <Tooltip />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) => value && value.toLocaleString()}
                    />
                    <Bar
                      dataKey="bill"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-10 rounded-xl border bg-card text-card-foreground shadow p-4 h-max w-full">
              <TypographyH3
                text="Cumulative Bill Savings"
                className="font-bold text-center p-2"
              />
              <div className="lg:flex-row flex-col flex gap-6 w-full">
                <div
                  className="text-center w-full"
                  style={{ width: "100%", height: 300 }}
                >
                  <ResponsiveContainer>
                    <ComposedChart
                      width={500}
                      height={400}
                      data={cumulativeSavingsBarChartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <Tooltip
                        label="Savings"
                        formatter={(value) =>
                          value && value.toLocaleString() + " EGP"
                        }
                      />
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="name" scale="band" />
                      <YAxis
                        tickFormatter={(value) =>
                          value && value.toLocaleString()
                        }
                      />
                      <Bar
                        dataKey="Savings"
                        barSize={20}
                        fill="#413ea0"
                        label="Savings"
                      />
                      <Line
                        tooltipType="none"
                        type="monotone"
                        dataKey="Savings"
                        stroke="#ff7300"
                        label="Savings"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
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
